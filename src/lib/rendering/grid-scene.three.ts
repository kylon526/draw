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
    private offset: THREE.Vector2 = new THREE.Vector2(0, 0);

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

        // const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const mesh = new THREE.Mesh(geometry, gridMaterial);

        this.scene.add(mesh);
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => this.render());
    }

    public zoom(event: WheelEvent): void {
        // this.camera.zoom += event.deltaY * 0.001;
        // this.camera.updateProjectionMatrix();
    }

    public pan(event: MouseEvent): void {
        if (this.panning) {
            this.offset.x -= event.movementX;
            this.offset.y += event.movementY;
            this.drawGrid();
        }
        // if (this.panning) {
        //     this.camera.translateX(-event.movementX);
        //     this.camera.translateY(event.movementY);
        // }
    }

    public setPanning(flag: boolean): void {
        this.panning = flag;
    }
}