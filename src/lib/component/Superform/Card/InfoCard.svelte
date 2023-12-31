<script lang="ts">
	import InfoSidebar from '../SideTable/InfoSidebar.svelte';

	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Swiper from 'swiper';
	import { register } from 'swiper/element/bundle';
	import { FreeMode } from 'swiper/modules';

	// import Swiper and modules styles
	import 'swiper/css';
	import 'swiper/css/free-mode';
	import { fly } from 'svelte/transition';

	export let question = {};
	export let loading = true;

	let swiper: Swiper | undefined;

	// init Swiper:
	onMount(() => {
		register();

		swiper = new Swiper('.swiper', {
			modules: [FreeMode],
			freeMode: {
				enabled: true,
				sticky: true,
				momentum: true,
				momentumBounce: true,
				momentumBounceRatio: 1,
				minimumVelocity: 0.02,
				momentumRatio: 1,
				momentumVelocityRatio: 5
			}
		});
	});

	onDestroy(() => {
		swiper = undefined;
	});

	$: if (!swiper) {
		loading = true;
	} else {
		setTimeout(() => {
			loading = false;
		}, 500);
	}
</script>

<!-- Non mobile view info card  -->
{#each question.infos as info}
	<div
		class="relative hidden lg:block transition-all duration-300 overflow-auto lg:w-[100%]"
	>
		<div class=" flex flex-col overflow-x-hidden w-full">
			<!-- Image  -->
			{#if info.image_url}
				<div class="absolute w-[105%] right-0 top-[0px] h-[35%]">
					<img src={info.image_url} alt="bulb" class="w-full h-full object-center object-cover" />
				</div>
			{/if}

			<!-- Info card  -->
			<div
				class="px-16 {info.video_url ? 'py-4 2xl:py-12' : 'py-12'} {info.image_url
					? 'mt-[40%] lg:mt-[40%] xl:mt-[35%] 2xl:mt-[38%] 3xl:mt-[40%] w-full '
					: 'mt-4 overflow-y-auto '} w-full flex flex-col"
			>
				<!-- Icon and title -->
				<div class="flex flex-col w-full justify-start gap-2 mb-2">
					<div class="text-[#ffffff] font-[800] text-4xl 2xl:text-5xl">{info.title}</div>
				</div>

				<!-- Video -->
				{#if info.video_url}
					<div style="padding-bottom: 56.25%;" class="relative w-full bg-[#000000] mt-4 mb-2">
						<iframe
							class="absolute w-full h-full"
							src={info.video_url}
							title="video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
							allowfullscreen
						/>
					</div>
				{/if}

				<!-- Description  -->
				<textarea
					disabled
					class="border-none flex-1 resize-none bg-primary-800 flex-grow text-[#ffffff] font-[400] text-sm 2xl:text-lg w-full overscroll-contain overflow-y-auto text-ellipsis"
					value={info.description}
					rows={info.video_url ? 5 : 12}
				/>
			</div>
		</div>
	</div>
{/each}

<!-- Slider main container for mobile -->
<div class="swiper h-screen">
	<!-- Additional required wrapper -->
	<swiper class="swiper-wrapper">
		<!-- Slides -->
		<div class=" relative bg-primary-50 swiper-slide slider-1 bg-primary-500">
			<div
				class="absolute top-80 right-0 slider text-[#ffffff] bg-primary-900 px-0 py-2 rounded-l-full animate-pulse"
			>
				<img src="/bulb.svg" alt="bulb" />
			</div>
		</div>

		<div class="swiper-slide info-slide">
			<InfoSidebar infos={question.infos} />
		</div>
	</swiper>
</div>

<style>
	@media only screen and (min-width: 821px) {
		/* For mobile phones: */
		.swiper {
			display: none;
		}
	}

	.swiper {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0%;
		width: 100vw;
		height: screen;
		z-index: 100;
		scroll-snap-type: x mandatory;
		pointer-events: none; /* To prevent the div from capturing interactions */
		overscroll-behavior: contain;
		overflow-y: auto;

		/* padding-bottom: 30px !important; */
		/* overflow-y: visible !important; */
	}

	/* .swiper-wrapper {
		overscroll-behavior: contain;
	} */

	.slider-1 {
		height: 0%;
		z-index: -10;
	}

	.swiper-slide {
		z-index: 200;
		pointer-events: visible; /* To prevent the div from capturing interactions */
		flex-shrink: 0;
		scroll-snap-align: start;
		pointer-events: auto;
	}

	.info-slide {
		/* border-radius: 10px; */
		/* overscroll-behavior: contain; */
		/* overflow-y: auto; */
		/* background: #ffffff; */
		/* width: 90%; */
		height: 100vh;
		overscroll-behavior: contain;
	}
</style>
