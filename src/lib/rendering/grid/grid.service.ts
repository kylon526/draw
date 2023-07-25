import { GridScene } from './grid-scene.three';

class GridService {
	public gridScene: GridScene | undefined = undefined;

	constructor() {}

	public createGridScene(canvas: HTMLCanvasElement): void {
		this.gridScene = new GridScene(canvas);
	}

	public pan(e: MouseEvent): void {
		this.gridScene?.pan(e);
	}

	public zoom(e: WheelEvent): void {
		this.gridScene?.zoom(e);
	}
}

export const gridService = new GridService();
