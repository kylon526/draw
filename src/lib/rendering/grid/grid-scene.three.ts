import { gridMaterial } from './grid-shader.three';
import { clamp } from 'three/src/math/MathUtils';
import { Rect } from '../geometry/rect.three';
import { Ruler } from '../rulers/ruler.three';
import {
	BufferAttribute,
	BufferGeometry,
	Mesh,
	OrthographicCamera,
	Scene,
	Uniform,
	Vector2,
	WebGLRenderer
} from 'three';
import { horizontalRulerShader } from '../rulers/ruler-shader.three';

export class GridScene {
	// THREE utilities
	private readonly renderer: WebGLRenderer;
	private readonly scene: Scene = new Scene();
	private readonly camera: OrthographicCamera;

	// Grid Display
	private readonly vertices: Float32Array;
	private readonly indices: number[];
	private readonly hRuler: Ruler;
	private readonly vRuler: Ruler;

	// Canvas properties
	private width: number;
	private height: number;
	private origin: Vector2;

	// Scene Navigation
	private panning: boolean = false;
	private offset: Vector2 = new Vector2();
	private scale: number = 1.0;
	private mouse: Vector2 = new Vector2();
	private maxZoomOut: number = 0.3;
	private maxZoomIn: number = 48.0;
	private zoomSpeed: number = 0.1;

	constructor(readonly canvas: HTMLCanvasElement) {
		this.width = document.documentElement.clientWidth || window.innerWidth;
		this.height = document.documentElement.clientHeight || window.innerHeight;

		this.origin = new Vector2(this.width / 2, this.height / 2);

		const fullScreenRect = new Rect(
			this.width / -2,
			this.height / -2,
			this.width / 2,
			this.height / 2
		);

		this.vertices = fullScreenRect.vertices;
		this.indices = fullScreenRect.indices;

		this.hRuler = new Ruler(-1, 1 - 32 / this.height, 1, 1);
		this.vRuler = new Ruler(-1, -1, -1 + 32 / this.width, 1);

		this.renderer = new WebGLRenderer({ canvas, antialias: true });
		this.renderer.setSize(this.width, this.height);

		this.scene = new Scene();

		this.camera = new OrthographicCamera(
			this.width / -2,
			this.width / 2,
			this.height / 2,
			this.height / -2
		);
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(0, 0, 0);

		this.drawGrid();

		this.render();
	}

	private drawGrid() {
		this.scene.clear();

		const geometry = new BufferGeometry();

		geometry.setAttribute('position', new BufferAttribute(this.vertices, 3));
		geometry.setIndex(this.indices);

		gridMaterial.uniforms.translation = new Uniform(this.offset);
		gridMaterial.uniforms.scale = new Uniform(this.scale);
		gridMaterial.uniforms.origin = new Uniform(new Vector2(this.width / 2, this.height / 2));
		gridMaterial.uniforms.mouse = new Uniform(this.mouse);

		const mesh = new Mesh(geometry, gridMaterial);

		this.scene.add(mesh);

		this.hRuler.setUniform('translation', new Uniform(this.offset));
		this.scene.add(this.hRuler.create());
		this.scene.add(this.vRuler.create());
	}

	private render(): void {
		this.renderer.render(this.scene, this.camera);

		window.requestAnimationFrame(() => this.render());
	}

	public zoom(event: WheelEvent): void {
		const oldYAxis = this.origin.y + this.offset.y;
		const oldXAxis = this.origin.x - this.offset.x;

		const scaledDistanceFromYAxis = (event.y - oldYAxis) / this.scale;
		const scaledDistanceFromXAxis = (event.x - oldXAxis) / this.scale;

		const oldScale = this.scale;

		const delta = Math.sign(-event.deltaY);
		this.scale *= Math.exp(delta * this.zoomSpeed);
		this.scale = clamp(this.scale, this.maxZoomOut, this.maxZoomIn);

		const dScale = this.scale - oldScale;

		const newDistanceFromYAxis = scaledDistanceFromYAxis * dScale;
		const newDistanceFromXAxis = scaledDistanceFromXAxis * dScale;

		this.offset.x += newDistanceFromXAxis;
		this.offset.y -= newDistanceFromYAxis;

		this.drawGrid();
	}

	public pan(event: MouseEvent): void {
		if (this.panning) {
			this.offset.x -= event.movementX;
			this.offset.y += event.movementY;
			this.drawGrid();
		}
	}

	public setPanning(flag: boolean): void {
		this.panning = flag;
	}
}
