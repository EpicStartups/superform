<script lang="ts">
	import { fly } from 'svelte/transition';
	import GeneralBottomNav from '../GeneralBottomNav.svelte';
	import GeneralTopNav from '../GeneralTopNav.svelte';
	import { Icon, ChevronDown, Home, type IconSource } from 'svelte-hero-icons';
	import matches from '../../../../stores/match.json';
	import MatchCard from '../Card/MatchCard.svelte';

	let totalQuestions: number = 5;
	let currentIndex: number = 0;
	let icons: any[];

	// Function to go to the next question
	const nextQuestion = () => {
		currentIndex = Math.min(currentIndex + 1, totalQuestions - 1);
		window.scrollTo(0, 0);
	};

	// Function to go to the previous question
	const prevQuestion = () => {
		currentIndex = Math.max(currentIndex - 1, 0);
		window.scrollTo(0, 0);
	};

	// Function to submit answers
	const submitAnswers = () => {
		// Temporary way to indicate submission
		currentIndex = currentIndex + 1;
		window.scrollTo(0, 0);
	};
</script>

<GeneralTopNav class="">
	<span class="{currentIndex > 0 ? 'block' : 'hidden'} flex items-center" slot="back-button">
		<button on:click={prevQuestion}>
			<svg
				width="41"
				height="41"
				viewBox="0 0 41 41"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="20.5" cy="20.5" r="20" fill="primary-500" stroke="#2E1A69" />
				<path
					d="M15.1 21L22.5667 28.4667L20.6667 30.3333L10 19.6667L20.6667 9L22.5667 10.8667L15.1 18.3333H31.3333V21H15.1Z"
					fill="black"
				/>
			</svg>
		</button>
	</span>
</GeneralTopNav>

<section
	transition:fly={{ x: -1000, duration: 300 }}
	class="relative w-[90%] mx-auto md:w-[100%] md:px-28 2xl:px-32  text-base 2xl:text-xl flex flex-col"
>
	<div class="flex">
		<div class="md:h-screen md:overflow-auto md:px-16 py-16 md:w-[80%]">
			<h1 class="mt-8 text-5xl font-[900] text-primary-900 md:text-primary-800 md:text-center">Your Matching results</h1>
			<p class="text-lg md:text-base font-[500] text-primary-900 md:text-center md:w-2/3 md:mx-auto md:mt-4">Here is a list of 6 matching properties based on the information you’ve provided</p>
			<button class="hidden md:block md:mt-8 md:mx-auto md:p-3 md:bg-primary-800 md:rounded-full"
				><svg
					width="24"
					height="24"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6.90625 8.2375C9.1 5.65625 12.3438 4 16 4C22.6313 4 28 9.36875 28 16H32C32 7.1625 24.8375 0 16 0C11.2375 0 6.98125 2.0875 4.05625 5.3875L0 1.33125V12H10.6687L6.90625 8.2375ZM25.0938 23.7625C22.8937 26.3438 19.6562 28 16 28C9.36875 28 4 22.6313 4 16H0C0 24.8375 7.1625 32 16 32C20.7625 32 25.0188 29.9125 27.9438 26.6125L32 30.6688V20H21.3312L25.0938 23.7625Z"
						fill="white"
					/>
				</svg>
			</button>
			<div class="my-14 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-8 2xl:gap-16">
				{#each matches as match}
					<MatchCard {match} />
				{/each}
			</div>
		</div>
	</div>
</section>

<GeneralBottomNav class="" />
