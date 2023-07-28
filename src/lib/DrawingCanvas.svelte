<script lang="ts">
	import { onMount } from 'svelte';
	import { gridService } from './rendering/grid/grid.service';
	import { tool } from './tools/tool.store';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		gridService.createGridScene(canvas);
	});
</script>

<canvas
	bind:this={canvas}
	on:wheel={(e) => gridService.zoom(e)}
	on:mousedown={$tool.mousedown}
	on:mouseup={$tool.mouseup}
	on:mousemove={$tool.mousemove}
/>

<style lang="scss">
	canvas {
		display: block;
	}
</style>
