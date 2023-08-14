<script lang="ts">
	import InfoSidebar from './SideTable/InfoSidebar.svelte';

	import { onDestroy, onMount } from 'svelte';
	import Swiper from 'swiper';
	import { register } from 'swiper/element/bundle';
	import { FreeMode } from 'swiper/modules';
	// import Swiper and modules styles
	import 'swiper/css';
	import 'swiper/css/free-mode';

	export let question = {};

	let swiper: Swiper | undefined;
	let loading = true;

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

	let showSidebar = false;
	// let showMore: any = {};

	// Function to toggle sidebar at mobile view
	const openSidebar = () => {
		// showSidebar = true;
	};

	const toggleShowMore = (id: any) => {
		// showMore[id] = !showMore[id];
	};

	// const changeClass = () => {
	// 	const swiper = document.querySelector('.swiper');

	// 	swiper.style.height = '100vh'; // Set height to 100vh for full screen height
	// 	swiper.style.width = '100vw'; // Set width to 100vw for full screen width
	// 	swiper.style.position = 'fixed'; // Fix the position to keep it in view
	// 	swiper.style.top = '0'; // Align it to the top of the screen
	// 	swiper.style.left = '0'; // Align it to the left of the screen
	// 	console.log(swiper, 'swiper');

	// 	console.log(swiper, 'swiper');
	// };

	$: if (!swiper) {
		console.log(swiper, 'no swiper');
		loading = true;
	} else {
		setTimeout(() => {
			loading = false;
		}, 500);
	}

	$: console.log(swiper, 'ahs swiper');
</script>

<!-- Non mobile view info card  -->
{#each question.infos as info}
	<div
		class="relative hidden md:block md:w-[40%] border border-[#D5D5D5] rounded-md mt-24 h-[450px] 2xl:h-[600px] p-4 md:ml-20 2xl:ml-32 2xl:ml-20 bg-[#ffffff] "
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

<!-- Slider main container -->
<div class="swiper h-screen">
	<!-- Additional required wrapper -->
	<swiper class="swiper-wrapper">
		<!-- Slides -->
		<div class=" relative bg-primary-50 swiper-slide slider-1 bg-primary-500">
			<div class="absolute top-80 right-2 slider">Here</div>
		</div>

		<div class="swiper-slide info-slide">
			<!-- <div class="">Here</div> -->
			<InfoSidebar infos={question.infos} />
		</div>
	</swiper>
</div>

{#if loading}
	<div class="loader" />
{/if}

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
		top: 0;
		left: 0%;
		width: 100vw;
		height: screen;
		z-index: 100;
		pointer-events: none; /* To prevent the div from capturing interactions */
		overscroll-behavior: contain;
		/* padding-bottom: 30px !important; */
		/* overflow-y: visible !important; */
	}

	.swiper-wrapper {
		overscroll-behavior: contain;
	}

	.slider-1 {
		height: 0%;
		z-index: -10;
	}

	.swiper-slide {
		z-index: 200;
		pointer-events: visible; /* To prevent the div from capturing interactions */
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
