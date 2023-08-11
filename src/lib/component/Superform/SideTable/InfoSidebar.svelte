<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { adjustTextareaHeight, checkTextareaHeight } from '$lib';

	const dispatch = createEventDispatcher();

	export let infos: any[] = [];

	let showMore: any = {};
	let customClass = '';
	export { customClass as class };

	const toggleShowMore = (id) => {
		showMore[id] = !showMore[id];
		console.log(showMore, 'dsfsf');
	};

	afterUpdate(() => {
		Object.keys(showMore).forEach((id) => {
			if (showMore[id]) {
				const textarea = document.getElementById(`myTextarea-${id}`);
				adjustTextareaHeight(textarea, id);
			}
		});
	});

	onMount(() => {
		infos.forEach((info) => {
			checkTextareaHeight(info.id);
		});
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

<div
	class=" rounded-lg drop-shadow-lg  w-full h-full flex justify-end"
>
	<div class="w-[90%] bg-[#ffffff] ">
		{#each infos as info}
			<div class="relative flex flex-col px-6 ">
				<!-- Bulb Icon  -->
				<div class="w-full flex justify-end">
					<img src="/bulb.svg" alt="bulb" />
				</div>

				<!-- Info card  -->
				<div class="w-full flex-col">
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
						<div
							style="position:relative;padding-top:72%;"
							class=" w-[115%] bg-[#000000] mt-4 ml-[-24px] mr-[-100px]"
						>
							<iframe
								style="position:absolute;top:0;width:100%;height:100%;"
								src={info.video_url}
								title="video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							/>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
