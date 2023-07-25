export class Rect {
	public readonly vertices: Float32Array;
	public readonly indices: number[];

	constructor(
		protected readonly left: number,
		protected readonly top: number,
		protected readonly right: number,
		protected readonly bottom: number
	) {
		this.vertices = new Float32Array([
			left,
			top,
			0,
			right,
			top,
			0,
			right,
			bottom,
			0,
			left,
			bottom,
			0
		]);

		this.indices = [0, 1, 2, 2, 3, 0];
	}
}
