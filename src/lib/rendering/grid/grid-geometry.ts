import { BufferAttribute, BufferGeometry } from 'three';

export class GridGeometry {
	public readonly geometry: BufferGeometry;

	constructor(protected readonly vertices: Float32Array, protected readonly indices: number[]) {
		this.geometry = new BufferGeometry();
		this.geometry.setAttribute('position', new BufferAttribute(vertices, 3));
		this.geometry.setIndex(indices);
	}
}
