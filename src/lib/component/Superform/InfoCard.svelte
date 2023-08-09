<script lang="ts">
	import InfoSidebar from './SideTable/InfoSidebar.svelte';

	export let question = {};

	let showSidebar = false;
	// let showMore: any = {};

	// Function to toggle sidebar at mobile view
	const openSidebar = () => {
		showSidebar = true;
	};

	const toggleShowMore = (id: any) => {
		// showMore[id] = !showMore[id];
	};
</script>

<!-- Non mobile view info card  -->
{#each question.infos as info}
	<div
		class="relative hidden md:block md:w-[40%] border border-[#D5D5D5] rounded-md mt-8 p-4 md:ml-20 2xl:ml-32 2xl:ml-20 bg-[#ffffff] h-fit"
	>
		<div class=" flex flex-col overflow-x-hidden">
			<!-- Bulb Icon  -->
			<div class="absolute w-full flex justify-end top-[-38px]">
				<img src="/bulb.svg" alt="bulb" />
			</div>

			<!-- Info card  -->
			<div class=" w-full flex-col">
				<!-- Icon and title -->
				<div class="flex flex-col items-start justify-start gap-2 mb-2">
					{#if info.image_url}
						<img src={info.image_url} alt="" class="w-12 2xl:w-16 h-12 2xl:h-16" />
					{/if}
					<div class="text-[#434350] font-[800] text-2xl 2xl:text-3xl">{info.title}</div>
				</div>

				<!-- Description  -->
				<textarea
					disabled
					class="flex-1 resize-none bg-[#ffffff] flex-grow text-[#191C1B] font-[400] text-sm 2xl:text-lg w-full overflow-y-hidden text-ellipsis"
					id="textarea-{info.id}"
					value={info.description}
				/>
				<button
					id="learnMoreButton-{info.id}"
					on:click={() => toggleShowMore(info.id)}
					class="self-end text-primary-500 font-[700] text:base 2xl:text-lg">Learn More</button
				>

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
	</div>
{/each}

<!-- Mobile info sidebar toggle-->
<button
	on:click={openSidebar}
	class="slider fixed bg-[#77F8DF] h-fit w-fit border flex justify-center items-center inset-y-[300px] right-0"
>
	<div class="">
		<p>{question.infos[0].title}</p>
	</div>
</button>

<!-- Mobile info sidebar -->
<InfoSidebar infos={question.infos} bind:showSidebar />
