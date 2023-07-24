import * as THREE from 'three';
import { gridMaterial } from './grid-shader.three';
import { clamp } from 'three/src/math/MathUtils';

export class GridScene {
	// THREE utilities
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private readonly camera: THREE.OrthographicCamera;

	// Grid Display
	private readonly vertices: Float32Array;
	private readonly indices = [0, 1, 2, 2, 3, 0];

	// Canvas properties
	private width: number;
	private height: number;
	private origin: THREE.Vector2;

	// Scene Navigation
	private panning: boolean = false;
	private offset: THREE.Vector2 = new THREE.Vector2();
	private scale: number = 1.0;
	private mouse: THREE.Vector2 = new THREE.Vector2();
	private maxZoomOut: number = 0.3;
	private maxZoomIn: number = 48.0;
	private zoomSpeed: number = 0.1;

	constructor(private readonly canvas: HTMLCanvasElement) {
		this.width = document.documentElement.clientWidth || window.innerWidth;
		this.height = document.documentElement.clientHeight || window.innerHeight;

		this.origin = new THREE.Vector2(this.width / 2, this.height / 2);

		this.vertices = new Float32Array([
			this.width / -2,
			this.height / -2,
			0,
			this.width / 2,
			this.height / -2,
			0,
			this.width / 2,
			this.height / 2,
			0,
			this.width / -2,
			this.height / 2,
			0
		]);

		this.renderer = new THREE.WebGLRenderer({ canvas });
		this.renderer.setSize(this.width, this.height);

		this.scene = new THREE.Scene();

		this.camera = new THREE.OrthographicCamera(
			this.width / -2,
			this.width / 2,
			this.height / 2,
			this.height / -2
		);
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(0, 0, 0);

		this.drawGrid();

		this.scene.add(this.camera);

		this.render();
	}

	private drawGrid() {
		this.scene.clear();
		const geometry = new THREE.BufferGeometry();

		geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
		geometry.setIndex(this.indices);

		gridMaterial.uniforms.translation = new THREE.Uniform(this.offset);
		gridMaterial.uniforms.scale = new THREE.Uniform(this.scale);
		gridMaterial.uniforms.origin = new THREE.Uniform(
			new THREE.Vector2(this.width / 2, this.height / 2)
		);
		gridMaterial.uniforms.mouse = new THREE.Uniform(this.mouse);

		const mesh = new THREE.Mesh(geometry, gridMaterial);

		this.scene.add(mesh);
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
