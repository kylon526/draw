import { gridService } from '$lib/rendering/grid/grid.service';
import type { Tool } from '$lib/tools/tool.store';

export class CameraTool implements Tool {
	private panning: boolean = false;

	name = 'Camera Tool';

	mousedown(): void {
		this.panning = true;
	}

	mouseup(): void {
		this.panning = false;
	}

	mousemove(e: MouseEvent): void {
		if (this.panning) gridService.pan(e);
	}
}

export const cameraTool = new CameraTool();
