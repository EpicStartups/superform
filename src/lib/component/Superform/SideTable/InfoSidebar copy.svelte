<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { adjustTextareaHeight, checkTextareaHeight } from '$lib';

	const dispatch = createEventDispatcher();

	export let showSidebar: boolean;
	export let infos: any[] = [];

	let container: HTMLDivElement;
	let showMore: any = {};
	let customClass = '';
	export { customClass as class };

	const toggleShowMore = (id) => {
		showMore[id] = !showMore[id];
	};

	afterUpdate(() => {
		Object.keys(showMore).forEach((id) => {
			if (showMore[id]) {
				const textarea = document.getElementById(`myTextarea-${id}`);
				adjustTextareaHeight(textarea, id);
			}
		});
	});

	const action = (e) => {
		// hide sidebar if clicked outside
		if (container && container !== e.target && !container.contains(e.target)) showSidebar = false;
	};

	onMount(() => {
		infos.forEach((info) => {
			checkTextareaHeight(info.id);
		});
		document.addEventListener('click', action, true);
		return () => document.removeEventListener('click', action, true);
	});

	onDestroy(() => {
		Object.keys(showMore).forEach((id) => {
			if (showMore[id]) {
				const textarea = document.getElementById(`myTextarea-${id}`);
				adjustTextareaHeight(textarea, id);
			}
		});
	});
</script>

<!-- {#if showSidebar} -->
	<section class="{customClass} h-screen fixed z-[100] inset-0 bg-[#000000] bg-opacity-50 overscroll-contain">
		<div
			bind:this={container}
			class="h-screen rounded-lg drop-shadow-lg transition-all overscroll-contain fixed inset-y-0 right-0 overflow-y-auto bg-[#ffffff] scroller w-[90%]
"
			transition:fly={{ x: 600, y: 0 }}
		>
			<div role="dialog" aria-modal="true" aria-labelledby="modal-headline">
				<div class="flex justify-start px-6 py-5">
					<div class="flex items-center space-x-2">
						<button
							on:click={() => {
								showSidebar = false;
							}}
						>
							<svg
								width="41"
								height="41"
								viewBox="0 0 41 41"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="20.5"
									cy="20.5"
									r="20"
									transform="rotate(-180 20.5 20.5)"
									fill="#EDF5F2"
									stroke="#DAF0E7"
								/>
								<path
									d="M25.9 20L18.4333 12.5333L20.3333 10.6667L31 21.3333L20.3333 32L18.4333 30.1333L25.9 22.6667L9.66667 22.6667L9.66667 20L25.9 20Z"
									fill="black"
								/>
							</svg>
						</button>
					</div>
				</div>

				{#each infos as info}
					<div class="relative flex flex-col px-6  overflow-x-hidden">
						<!-- Bulb Icon  -->
						<div class="w-full flex justify-end">
							<img src="/bulb.svg" alt="bulb" />
						</div>

						<!-- Info card  -->
						<div class=" w-full flex-col">
							<!-- Icon and title -->
							<div class="flex items-center gap-2 mb-2">
								{#if info.image_url}
									<img src={info.image_url} alt="" class="w-12 h-12" />
								{/if}
								<div class="text-[#434350] font-[800] text-3xl">{info.title}</div>
							</div>

							<!-- Description  -->
							{#if showMore[info.id]}
								<textarea
									disabled
									class="flex-1 resize-none bg-[#ffffff] flex-grow text-[#191C1B] font-[400] text-lg w-full overflow-y-hidden text-ellipsis"
									id="myTextarea-{info.id}"
									value={info.description}
								/>
								<button
									id="showMoreButton-{info.id}"
									on:click={() => toggleShowMore(info.id)}
									class="self-end text-primary-500 font-[700] text-lg">Show less</button
								>
							{:else}
								<textarea
									disabled
									class="flex-1 resize-none bg-[#ffffff] flex-grow text-[#191C1B] font-[400] text-lg w-full overflow-y-hidden text-ellipsis"
									id="myTextarea-{info.id}"
									value={info.description}
								/>
								<button
									id="showMoreButton-{info.id}"
									on:click={() => toggleShowMore(info.id)}
									class="self-end text-primary-500 font-[700] text-lg">Learn More</button
								>
							{/if}

							<!-- Video -->
							{#if info.video_url}
								<div style="position:relative;padding-top:72%;" class=" w-[115%] bg-[#000000] mt-4 ml-[-24px] mr-[-100px]">
									<iframe
									style="position:absolute;top:0;width:100%;height:100%;"
										src={info.video_url}
										title="video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
										allowfullscreen
									/>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
<!-- {/if} -->
