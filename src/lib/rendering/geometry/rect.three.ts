export class Rect {
	public readonly vertices: Float32Array;
	public readonly indices: number[];

	constructor(
		protected readonly top: number,
		protected readonly left: number,
		protected readonly width: number,
		protected readonly height: number
	) {
		this.vertices = new Float32Array([
			left,
			top,
			0,
			left + width,
			top,
			0,
			left + width,
			top + height,
			0,
			left,
			top + height,
			0
		]);

		this.indices = [0, 1, 2, 2, 3, 0];
	}
}
