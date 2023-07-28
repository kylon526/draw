import { writable } from 'svelte/store';
import { Vector2 } from 'three';

export const gridTranslation = writable(new Vector2());
export const gridScale = writable(1.0);
