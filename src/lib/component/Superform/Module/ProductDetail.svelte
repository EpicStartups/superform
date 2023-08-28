<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { formatNumberWithCommas } from '$lib/utils/general';

	import GeneralTopNav from '../GeneralTopNav.svelte';
	import GeneralBottomNav from '../GeneralBottomNav.svelte';
	import { Carousel, CarouselTransition } from 'flowbite-svelte';

	export let match = {};
	let loading = true;

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 500);
	});

	$: console.log(match, 'ath');
</script>

<section>
	<GeneralTopNav class="">
		<span class="flex items-center" slot="back-button">
			<button on:click={() => goto('/')}>
				<svg
					class="md:w-[80%]"
					width="41"
					height="41"
					viewBox="0 0 41 41"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="20.5" cy="20.5" r="20" fill="primary-500" stroke="#DAF0E7" />
					<path
						d="M15.1 21L22.5667 28.4667L20.6667 30.3333L10 19.6667L20.6667 9L22.5667 10.8667L15.1 18.3333H31.3333V21H15.1Z"
						fill="black"
					/>
				</svg>
			</button>
		</span>
	</GeneralTopNav>

	<!-- Mobile view  -->
	<div class="md:hidden flex flex-col gap-0 mt-20 mb-40">
		<!-- Top static pictures -->
		<div class="w-full">
			<CarouselTransition
				images={match.img_urls}
				transitionType="fade"
				transitionParams={{ delay: 300, duration: 500 }}
				showCaptions={false}
				classSlide="flex items-center justify-center h-full w-full !rounded-none !bg-transparent"
				classDiv="w-full !h-[300px] sm:!h-[400px] !rounded-none !bg-transparent"
				imgFit="contain"
				classImg="!bg-none !rounded-md animate-[fadeIn_.5s_ease-in-out_1] h-full"
				classThumb="p-0 rounded-md shadow-xl hover:outline hover:outline-primary-500 hover:scale-[1.25] transform transition duration-600"
				classThumbDiv="bg-transparent"
				thumbBtnClass="m-2"
			/>
		</div>

		<!-- Bottom details -->
		<div class="flex flex-col gap-4 px-4 py-8">
			<!-- Name and seller -->
			<div class="flex flex-col gap-1">
				<p class="text-primary-900 font-[900] text-3xl">{match?.property_name}</p>
				<p class="text-primary-500 font-[500]">{match?.owner_name}</p>
			</div>

			<!-- Price and description -->
			<div class="flex flex-col gap-8 text-lg">
				<!-- Price -->
				<div class="flex gap-4 text-primary-900">
					<p>RM</p>
					<p class="font-[800]">
						{formatNumberWithCommas(match?.property_price)}
					</p>
				</div>
				<p class="mt-6">{match?.description}</p>
			</div>

			<!-- Specs -->
			<div class="flex flex-col gap-8 mt-6">
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Bathroom</p>
					<p class="text-xl">{match?.num_toilets}</p>
				</div>
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Bedroom</p>
					<p class="text-xl">{match?.num_bedrooms}</p>
				</div>
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Lot size</p>
					<p class="text-xl">{formatNumberWithCommas(match?.lot_size_sqft)}&nbsp;sqft</p>
				</div>
			</div>

			<!-- Extra specs -->

			<!-- Checkout button -->
			<GeneralBottomNav class="">
				<!-- Mobile view  -->
				<button
					class="md:hidden w-[90%] bg-primary-500 mx-auto text-[#FFFFFF] rounded-md py-4 px-12 font-[700] text-base flex items-center gap-4 justify-between"
				>
					Checkout
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.93955 2.45401C7.65834 2.7353 7.50037 3.11676 7.50037 3.51451C7.50037 3.91226 7.65834 4.29372 7.93955 4.57501L15.3645 12L7.93955 19.425C7.66631 19.7079 7.51512 20.0868 7.51853 20.4801C7.52195 20.8734 7.67971 21.2496 7.95782 21.5277C8.23593 21.8059 8.61215 21.9636 9.00544 21.967C9.39874 21.9704 9.77764 21.8192 10.0605 21.546L18.546 13.0605C18.8273 12.7792 18.9852 12.3978 18.9852 12C18.9852 11.6023 18.8273 11.2208 18.546 10.9395L10.0605 2.45401C9.77925 2.1728 9.39779 2.01483 9.00005 2.01483C8.6023 2.01483 8.22084 2.1728 7.93955 2.45401Z"
							fill="white"
						/>
					</svg>
				</button>
			</GeneralBottomNav>
		</div>
	</div>

	<!-- Non mobile view -->
	<div class="hidden md:flex gap-12 px-32 mt-24">
		<!-- Left static pictures -->
		<div class="w-1/2">
			<CarouselTransition
				images={match.img_urls}
				transitionType="fade"
				transitionParams={{ delay: 300, duration: 500 }}
				showCaptions={false}
				classSlide="flex items-center justify-center h-full w-full !rounded-none !bg-transparent"
				classDiv="w-full !h-[300px] sm:!h-[400px] !rounded-none !bg-transparent"
				imgFit="contain"
				classImg="!bg-none !rounded-md animate-[fadeIn_.5s_ease-in-out_1] h-full"
				classThumb="p-0 rounded-md shadow-xl hover:outline hover:outline-primary-500 hover:scale-[1.25] transform transition duration-600"
				classThumbDiv="bg-transparent"
				thumbBtnClass="m-2"
			/>
		</div>

		<!-- Right details -->
		<div class="w-1/2 flex flex-col gap-4 px-4 pb-8">
			<!-- Name and seller -->
			<div class="flex flex-col gap-1">
				<p class="text-primary-900 font-[900] text-3xl">{match?.property_name}</p>
				<p class="text-primary-500 font-[500]">{match?.owner_name}</p>
			</div>

			<!-- Price and description -->
			<div class="flex flex-col gap-8">
				<!-- Price -->
				<div class="flex gap-4 text-primary-900 text-lg">
					<p>RM</p>
					<p class="font-[800]">
						{formatNumberWithCommas(match?.property_price)}
					</p>
				</div>
				<p class="mt-6 text-sm">{match?.description}</p>
			</div>

			<!-- Specs -->
			<div class="flex flex-col gap-4 mt-6">
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Bathroom</p>
					<p class="text-md">{match?.num_toilets}</p>
				</div>
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Bedroom</p>
					<p class="text-md">{match?.num_bedrooms}</p>
				</div>
				<div class="flex items-center gap-8">
					<p class="font-[900] w-[100px]">Lot size</p>
					<p class="text-md">{formatNumberWithCommas(match?.lot_size_sqft)}&nbsp;sqft</p>
				</div>
			</div>

			<!-- Extra specs -->
		</div>
	</div>
</section>

{#if loading}
	<div class="loader" />
{/if}
