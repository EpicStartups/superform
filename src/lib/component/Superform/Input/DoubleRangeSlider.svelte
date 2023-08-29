<script lang="ts">
	import { clamp } from 'yootils';
	export let name = '';
	export let validation = false;
	export let label: string;
	export let value: any = 0;
	export let rangeArr: any[] = [];
	export let required = false;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';
	export let start = 0;
	export let end = 0;

	$: if (end > 1) {
		value = end;
		end = end / end;
	}
	let leftHandle: any;
	let body: any;
	let slider: any;

	function draggable(node: HTMLDivElement) {
		let x: number;
		let y: number;
		function handleMousedown(event: { type: string; touches: any[]; clientX: any; clientY: any }) {
			if (event.type === 'touchstart') {
				event = event.touches[0];
			}
			x = event.clientX;
			y = event.clientY;
			node.dispatchEvent(
				new CustomEvent('dragstart', {
					detail: { x, y }
				})
			);
			window.addEventListener('mousemove', handleMousemove);
			window.addEventListener('mouseup', handleMouseup);
			window.addEventListener('touchmove', handleMousemove);
			window.addEventListener('touchend', handleMouseup);
		}
		function handleMousemove(event: {
			type: string;
			changedTouches: any[];
			clientX: number;
			clientY: number;
		}) {
			if (event.type === 'touchmove') {
				event = event.changedTouches[0];
			}
			const dx = event.clientX - x;
			const dy = event.clientY - y;
			x = event.clientX;
			y = event.clientY;
			node.dispatchEvent(
				new CustomEvent('dragmove', {
					detail: { x, y, dx, dy }
				})
			);
		}
		function handleMouseup(event: { clientX: any; clientY: any }) {
			x = event.clientX;
			y = event.clientY;
			node.dispatchEvent(
				new CustomEvent('dragend', {
					detail: { x, y }
				})
			);
			window.removeEventListener('mousemove', handleMousemove);
			window.removeEventListener('mouseup', handleMouseup);
			window.removeEventListener('touchmove', handleMousemove);
			window.removeEventListener('touchend', handleMouseup);
		}
		node.addEventListener('mousedown', handleMousedown);
		node.addEventListener('touchstart', handleMousedown);
		return {
			destroy() {
				node.removeEventListener('mousedown', handleMousedown);
				node.removeEventListener('touchstart', handleMousedown);
			}
		};
	}

	function setHandlePosition(which: string) {
		return function (evt: { detail: { x: number } }) {
			const { left, right } = slider.getBoundingClientRect();
			const parentWidth = right - left;

			const p = Math.min(Math.max((evt.detail.x - left) / parentWidth, 0), 1);
			if (which === 'start') {
				start = p;
				end = Math.max(end, p);
			} else {
				start = Math.min(p, start);
				end = p;
			}
		};
	}

	function setHandlesFromBody(evt: any) {
		const { width } = body.getBoundingClientRect();
		const { left, right } = slider.getBoundingClientRect();
		const parentWidth = right - left;
		const leftHandleLeft = leftHandle.getBoundingClientRect().left;
		const pxStart = clamp(leftHandleLeft + event.detail.dx - left, 0, parentWidth - width);
		const pxEnd = clamp(pxStart + width, width, parentWidth);
		const pStart = pxStart / parentWidth;
		const pEnd = pxEnd / parentWidth;
		start = pStart;
		end = pEnd;
	}
</script>

<div class={customClass}>
	{#if label}
		<label class="text-xl lg:text-base 2xl:text-lg font-[500] text-black" for={name}>
			{label}
			{#if validation}
				<span class="ml-1 text-red-500 font-bold">*</span>
			{/if}</label
		>
	{/if}

	<div class="double-range-container mt-4">
		<div class="slider" bind:this={slider}>
			<div
				class="body"
				bind:this={body}
				use:draggable
				on:dragmove|preventDefault|stopPropagation={setHandlesFromBody}
				style="
				left: {100 * start}%;
				right: {100 * (1 - end)}%;
			"
			/>

			<div
				class="handle relative"
				bind:this={leftHandle}
				data-which="start"
				on:dragmove|preventDefault|stopPropagation={setHandlePosition('start')}
				style="cursor: default;left: {100 * start}%"
			>
				<div class="text-primary-900 font-[500] absolute top-3 -inset-x-1" data-which="start">
					{start}
				</div>
			</div>
			<div
				class="handle"
				data-which="end"
				use:draggable
				on:dragmove|preventDefault|stopPropagation={setHandlePosition('end')}
				style="
				left: {100 * end}%
			"
			>
				<div class="text-primary-900 font-[500] absolute top-3 -inset-x-4" data-which="start" >
					{(value * end).toFixed(2)}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.double-range-container {
		width: 100%;
		height: 20px;
		user-select: none;
		box-sizing: border-box;
		white-space: nowrap;
	}
	.slider {
		position: relative;
		width: 95%;
		height: 8px;
		top: 50%;
		transform: translate(0, -50%);
		background-color: #e2e2e2;
		box-shadow: inset 0 7px 10px -5px #eaecf0, inset 0 -1px 0px 0px white;
		border-radius: 1px;
	}
	.handle {
		position: absolute;
		top: 50%;
		width: 0;
		height: 0;
		cursor: pointer;
	}
	.handle:after {
		content: ' ';
		box-sizing: border-box;
		position: absolute;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		background-color: #fdfdfd;
		border: 3px solid var(--primary-900);
		transform: translate(-50%, -50%);
	}
	/* .handle[data-which="end"]:after{
		transform: translate(-100%, -50%);
	} */
	.handle:active:after {
		background-color: #ddd;
		z-index: 9;
	}
	.body {
		top: 0;
		position: absolute;
		background-image: linear-gradient(to right, var(--primary-900), var(--primary-300));
		bottom: 0;
	}
</style>
