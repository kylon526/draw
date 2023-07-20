import * as THREE from 'three';

export class Grid {
    private _grid: THREE.LineSegments;

    public get object() {
        return this._grid;
    }

    constructor(private width: number, private height: number, private cellSize: number) {
        this._grid = this.createGrid();
    }

    private createGrid(): THREE.LineSegments {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });

        const vertices = [];

        for (let x = this.width / -2; x <= this.width / 2; x += this.cellSize) {
            vertices.push(x, this.height / -2, 0, x, this.height / 2, 0);
        }

        for (let y = this.height / 2; y >= this.height / -2; y -= this.cellSize) {
            vertices.push(this.width / -2, y, 0, this.width / 2, y, 0);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

        return new THREE.LineSegments(geometry, material);
    }
}