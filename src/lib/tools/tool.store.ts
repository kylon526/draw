import { writable, type Writable } from 'svelte/store';
import { cameraTool } from './camera.tool';

export interface Tool {
	mousedown(e: MouseEvent): void;
	mouseup(e: MouseEvent): void;
	mousemove(e: MouseEvent): void;
	name: string;
}

export const tool: Writable<Tool> = writable(cameraTool);
