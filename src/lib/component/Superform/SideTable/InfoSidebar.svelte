<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { adjustTextareaHeight, checkTextareaHeight } from '$lib';
	import { ChevronLeft, Icon } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();

	export let infos: any[] = [];
	export { customClass as class };

	let customClass = '';
	let textarea: any = {};

	afterUpdate(() => {
		infos.forEach((info) => {
			adjustTextareaHeight(textarea[info.id]);
			console.log(textarea[info.id]?.scrollHeight, 'textarea elem');
		});
	});
</script>

<div
	class="absolute top-80 left-0 slider bg-primary-900 w-12 px-2 py-4 text-[#ffffff] font-bold flex animate-pulse"
>
	<Icon src={ChevronLeft} class="flex-shrink-0 h-6 w-6 text-gray-700 " />
</div>

<div class="  w-full h-full flex justify-end overscroll-contain">
	<div
		style="overflow-y:auto; "
		class="w-[90%] bg-primary-800 overscroll-contain rounded-l-3xl drop-shadow-2xl"
	>
		{#each infos as info}
			<div class="relative flex flex-col px-6 py-8 overscroll-contain">
				<!-- Bulb Icon  -->
				<!-- <div class="w-full flex justify-end">
					<img src="/bulb.svg" alt="bulb" />
				</div> -->

				<!-- Info card  -->
				<div class="w-full flex-col overscroll-contain">
					<!-- Icon and title -->
					<div class="flex-col items-center gap-2 mb-2">
						<div
							style="position:relative;padding-top:72%;"
							class=" w-[115%] bg-[#000000] ml-[-24px] mr-[-100px]"
						>
							<!-- Image and video -->
							{#if info.image_url}
								<img src={info.image_url} alt="" class="absolute top-0 w-full h-full" />
							{:else if info.video_url}
								<iframe
									style="position:absolute;top:0;width:100%;height:100%;"
									src={info.video_url}
									title="video player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								/>
							{/if}
						</div>

						<div class="text-white font-[800] text-5xl my-5">{info.title}</div>
					</div>

					<!-- Description  -->
					<textarea
						style="pointer-events: none;"
						bind:this={textarea[info.id]}
						disabled
						class="resize-none bg-[#ffffff] flex-grow text-[#191C1B] font-[400] text-lg w-full overflow-y-auto text-ellipsis overscroll-contain"
						id="myTextarea-{info.id}"
						value={info.description}
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
