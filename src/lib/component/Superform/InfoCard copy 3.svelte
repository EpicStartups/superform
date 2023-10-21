<script lang="ts">
	import InfoSidebar from './SideTable/InfoSidebar.svelte';

	export let question = {};

	let loading = false;

	let showSidebar = false;
	// let showMore: any = {};

	// Function to toggle sidebar at mobile view
	const openSidebar = () => {
		// showSidebar = true;
	};

	const toggleShowMore = (id: any) => {
		// showMore[id] = !showMore[id];
	};
</script>

<!-- Non mobile view info card  -->
{#each question.infos as info}
	<div
		class="relative hidden lg:block lg:w-[40%] border border-[#D5D5D5] rounded-md mt-24 h-[450px] 2xl:h-[600px] p-4 lg:ml-20 2xl:ml-32 2xl:ml-20 bg-[#ffffff]"
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
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
							allowfullscreen
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/each}

{#if loading}
	<div class="loader" />
{/if}

<!-- Slider main container -->
<div class="scrollbar-hide container h-screen">
	<!-- Additional required wrapper -->
	<!-- <div class="wrapper"> -->

	<!-- First Slides -->
	<div class="box relative bg-primary-50 bg-primary-500 slider-1">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- on:mousedown={() => {
			const container = document.querySelector('.container');
				container.style.pointerEvents = 'auto';
			}}
			on:mouseleave={() => {
				const container = document.querySelector('.container');
				container.style.pointerEvents = 'none';
			}} -->
		<div class="absolute top-80 right-2 slide-button bg-[#000000]">Herehererer</div>
	</div>

	<!-- Second Slides -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- on:mousedown={() => {
		const container = document.querySelector('.container');
		container.style.pointerEvents = 'auto';
	}} -->
	<div class="box info-slide">
		<InfoSidebar infos={question.infos} />
	</div>

	<!-- </div> -->
</div>

<style>
	@media only screen and (min-width: 768px) {
		/* For mobile phones: */
		.container,
		.box {
			/* display: none;
			width: 0; */
		}
	}

	.container {
		overflow: auto;
		display: flex;
		position: fixed;
		width: 100vw;
		height: screen;
		z-index: 1000;
		scroll-snap-type: x mandatory;
		overscroll-behavior: contain;
		pointer-events: none;
	}

	.box {
		height: 100vh;
		width: 100vw;
		background: red;
		flex-shrink: 0;
		scroll-snap-align: start;
		pointer-events: auto;
		z-index: 200;
	}

	.slider-1 {
		height: 0%;
		width: 100%;
		z-index: -10;
		pointer-events: none;
	}

	.slide-button {
		height: 0%;
		pointer-events: auto; 
		z-index: 10000;
	}

	.info-slide {
		height: 100vh;
		overscroll-behavior: contain;
	}
</style>
