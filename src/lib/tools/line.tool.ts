import type { Tool } from '$lib/tools/tool.store';

export class LineTool implements Tool {
	private drawing: boolean = false;

	name: string = 'Line Tool';

	mousedown(e: MouseEvent): void {}

	mouseup(e: MouseEvent): void {}

	mousemove(e: MouseEvent): void {}
}

export const lineTool = new LineTool();
