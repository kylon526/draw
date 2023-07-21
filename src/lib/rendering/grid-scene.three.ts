import * as THREE from 'three';
import { gridMaterial } from './grid-shader.three';

export class GridScene {
    // THREE utilities
    private readonly renderer: THREE.WebGLRenderer;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.OrthographicCamera;

    // Grid Display
    private readonly vertices: Float32Array;
    private readonly indices = [
        0, 1, 2, 
        2, 3, 0
    ];

    // Canvas properties
    private width: number;
    private height: number;

    // Scene Navigation
    private panning: boolean = false;
    private offset: THREE.Vector2 = new THREE.Vector2();
    private scale: number = 1.0;
    private mouse: THREE.Vector2 = new THREE.Vector2();

    constructor(private readonly canvas: HTMLCanvasElement) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.vertices = new Float32Array([
            this.width / -2, this.height / -2, 0,
            this.width / 2, this.height / -2, 0,
            this.width / 2, this.height / 2, 0,
            this.width / -2, this.height / 2, 0
        ]);

        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(this.width, this.height);
        
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2);
        this.camera.position.set(0, 0, 1);
        this.camera.lookAt(0, 0, 0);

        // const grid = new Grid(this.width, this.height, 16);
        // this.scene.add(grid.object);

        this.drawGrid();

        this.scene.add(this.camera);

        this.render();
    }

    private drawGrid() {
        this.scene.clear();
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
        // geometry.setAttribute('translation', new THREE.BufferAttribute());
        geometry.setIndex(this.indices);

        gridMaterial.uniforms.translation = new THREE.Uniform(this.offset);
        // gridMaterial.uniforms.cellSize = new THREE.Uniform(this.scale * 8.0);
        gridMaterial.uniforms.scale = new THREE.Uniform(this.scale);
        gridMaterial.uniforms.origin = new THREE.Uniform(new THREE.Vector2(this.width / 2, this.height / 2));
        gridMaterial.uniforms.mouse = new THREE.Uniform(this.mouse);


        // const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const mesh = new THREE.Mesh(geometry, gridMaterial);

        this.scene.add(mesh);
    }

    private getPointerFromOrigin(x: number, y: number): THREE.Vector2 {
        return new THREE.Vector2(
            x - this.width / 2,
            -y + this.height / 2
        );
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => this.render());
    }

    public zoom(event: WheelEvent): void {
        // this.camera.zoom += event.deltaY * 0.001;
        // this.camera.updateProjectionMatrix();
        const oldScale = this.scale;
        const delta = Math.sign(event.deltaY);
        
        this.scale *= Math.exp(delta * 0.01);

        const mouseFromOrigin = this.getPointerFromOrigin(event.x, event.y);

        const xOrg = mouseFromOrigin.x / oldScale;
        const xNew = xOrg * this.scale;
        const xDiff = mouseFromOrigin.x - xNew;

        this.offset.x += xDiff;

        this.drawGrid();
    }

    public pan(event: MouseEvent): void {
        if (this.panning) {
            this.offset.x -= event.movementX;
            this.offset.y += event.movementY;
            console.log(this.offset);
            this.drawGrid();
        }
    }

    public setPanning(flag: boolean): void {
        this.panning = flag;
    }
}