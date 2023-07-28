import { gridShader } from './grid-shader.three';
import { clamp } from 'three/src/math/MathUtils';
import { Rect } from '../geometry/rect.three';
import { OrthographicCamera, Scene, Uniform, Vector2, WebGLRenderer } from 'three';
import { gridScale, gridTranslation } from './grid.store';

export class GridScene {
	// THREE utilities
	private renderer: WebGLRenderer | undefined;
	private readonly scene: Scene = new Scene();
	private camera: OrthographicCamera | undefined;

	// Grid
	private readonly gridGeometry: Rect;

	// Canvas properties
	private width: number;
	private height: number;
	private origin: Vector2;

	// Scene Navigation
	private offset: Vector2 = new Vector2();
	private scale: number = 1.0;
	private mouse: Vector2 = new Vector2();
	private maxZoomOut: number = 0.3;
	private maxZoomIn: number = 48.0;
	private zoomSpeed: number = 0.1;

	constructor(private readonly canvas: HTMLCanvasElement) {
		this.width = document.documentElement.clientWidth || window.innerWidth;
		this.height = document.documentElement.clientHeight || window.innerHeight;

		this.origin = new Vector2(this.width / 2, this.height / 2);

		this.gridGeometry = new Rect(-1, -1, 2, 2);
		this.createThreeScene();

		this.drawGrid();

		this.render();
	}

	private createThreeScene() {
		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
		this.renderer.setSize(this.width, this.height);

		this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1000);
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(0, 0, 0);
	}

	private render(): void {
		this.renderer!.render(this.scene, this.camera!);

		window.requestAnimationFrame(() => this.render());
	}

	public screenToGrid(mouseX: number, mouseY: number): Vector2 {
		const virtualXOrigin = this.origin.x - this.offset.x;
		const virtualYOrigin = this.origin.y + this.offset.y;

		const scaledDistanceFromXAxis = (mouseX - virtualXOrigin) / this.scale;
		const scaledDistanceFromYAxis = (virtualYOrigin - mouseY) / this.scale;
		return new Vector2(Math.round(scaledDistanceFromXAxis), Math.round(scaledDistanceFromYAxis));
	}

	public drawGrid() {
		this.scene.clear();

		gridShader.uniforms.translation = new Uniform(this.offset);
		gridShader.uniforms.scale = new Uniform(this.scale);
		gridShader.uniforms.origin = new Uniform(new Vector2(this.width / 2, this.height / 2));
		gridShader.uniforms.mouse = new Uniform(this.mouse);

		this.scene.add(this.gridGeometry.createMesh(gridShader));
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

		gridTranslation.set(this.offset);
		gridScale.set(this.scale);
	}

	public pan(event: MouseEvent): void {
		this.offset.x -= event.movementX;
		this.offset.y += event.movementY;

		gridTranslation.set(this.offset);
	}
}
