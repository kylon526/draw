<script lang="ts">
	import { onMount } from 'svelte';
	import { GridScene } from './rendering/grid-scene.three';

	let canvas: HTMLCanvasElement;
	let gridScene: GridScene;

	onMount(() => {
		gridScene = new GridScene(canvas);
	});

	const zoom = (event: WheelEvent) => gridScene.zoom(event);
	const setPanning = (flag: boolean) => gridScene.setPanning(flag);
	const moveGridScene = (event: MouseEvent) => gridScene.pan(event);
</script>

<canvas
	bind:this={canvas}
	on:wheel={zoom}
	on:mousedown={() => setPanning(true)}
	on:mouseup={() => setPanning(false)}
	on:mousemove={moveGridScene}
/>

<style lang="scss">
	canvas {
		display: block;
	}
</style>
