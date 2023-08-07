<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Icon,
		XMark,
		Trash,
		Pencil,
		ArrowsPointingOut,
		ArrowRight,
		ArrowRightCircle
	} from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();

	export let showSidebar: boolean;

	let container: HTMLDivElement;

	const action = (e) => {
		// hide sidebar if clicked outside
		if (container && container !== e.target && !container.contains(e.target)) showSidebar = false;
	};

	onMount(() => {
		document.addEventListener('click', action, true);
		return () => document.removeEventListener('click', action, true);
	});
</script>

{#if showSidebar}
	<div
		bind:this={container}
		class=" sidebarTab drop-shadow-lg z-[100] transition-all fixed inset-y-0 right-0 overflow-y-auto bg-[#ffffff] scroller w-full
"
		transition:fly={{ x: 100, y: 0 }}
	>
		<div role="dialog" aria-modal="true" aria-labelledby="modal-headline">
			<div class="flex justify-start px-6 py-3">
				<div class="flex items-center space-x-2">
					<button
						on:click={() => {
							showSidebar = false;
						}}
					>
						<Icon src={ArrowRightCircle} class="w-12 h-12" />
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-3 px-6">ABC</div>
		</div>
	</div>
{/if}
