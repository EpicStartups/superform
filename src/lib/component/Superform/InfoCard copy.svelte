<script lang="ts">
	import InfoSidebar from './SideTable/InfoSidebar.svelte';

	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { FreeMode } from 'swiper/modules';
	// import Swiper and modules styles
	import 'swiper/css';
	import 'swiper/css/free-mode';

	export let question = {};

	// init Swiper:
	onMount(() => {
		const swiper = new Swiper('.swiper', {
			modules: [FreeMode],
			freeMode: {
				enabled: true,
				sticky: true,
				momentum: true,
				momentumBounce: true,
				momentumBounceRatio: 1,
				minimumVelocity: 0.02,
				momentumRatio: 1,
				momentumVelocityRatio: 1
			}
		});
	});

	let showSidebar = false;
	// let showMore: any = {};

	// Function to toggle sidebar at mobile view
	const openSidebar = () => {
		// showSidebar = true;
	};

	const toggleShowMore = (id: any) => {
		// showMore[id] = !showMore[id];
	};

	const changeClass = () => {
		const swiper = document.querySelector('.swiper');

		swiper.style.height = '100vh'; // Set height to 100vh for full screen height
		swiper.style.width = '100vw'; // Set width to 100vw for full screen width
		swiper.style.position = 'fixed'; // Fix the position to keep it in view
		swiper.style.top = '0'; // Align it to the top of the screen
		swiper.style.left = '0'; // Align it to the left of the screen
	};
</script>

<!-- Non mobile view info card  -->
{#each question.infos as info}
	<div
		class="relative hidden lg:block lg:w-[40%] border border-[#D5D5D5] rounded-md mt-8 p-4 lg:ml-20 2xl:ml-32 2xl:ml-20 bg-[#ffffff] h-fit"
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

<!-- Slider main container -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:pointerdown={changeClass} class="swiper lg:hidden bg-[#77F8DF]">
	<!-- Additional required wrapper -->
	<swiper class="swiper-wrapper">
		<!-- Slides -->
		<!-- Mobile info sidebar toggle-->
		<!-- First Slide (Button) -->

		<div class="swiper-slide border flex justify-center items-center">
			<div class="">
				<p>{question.infos[0].title}</p>
			</div>
		</div>

		<!-- Mobile info sidebar -->
		<!-- First Slide (Button) -->

		<InfoSidebar class={'swiper-slide info-slide'} infos={question.infos} bind:showSidebar />
	</swiper>
</div>

<style>
	@media only screen and (min-width: 768px) {
		/* For mobile phones: */
		.swiper {
			display: none;
		}
	}

	.swiper {
		position: fixed;
		bottom: 0;
		top: 40%;
		left: 90%;
		/* width: 100%; */
		height: 100px;
		z-index: 1000; /* Adjust as needed */
	}

	/* Make the InfoSidebar full-screen */
	#info-slide {
		/* position: fixed;
		bottom: -300px;
		top: 0;
		left: 0;
		width: 100%;
		height: screen; */
		background-color: white;
	}
</style>
