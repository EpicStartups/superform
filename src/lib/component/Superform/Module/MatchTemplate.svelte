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
	class="relative w-[90%] mx-auto md:w-[100%] md:px-28 2xl:px-32 2xl:px-20 text-base 2xl:text-xl flex flex-col"
>
	<div class="flex">
		<div class="bg-[#81800F] md:h-screen md:overflow-auto px-8 md:px-16 py-16 md:w-[80%]">
			<h1>Your matching result</h1>
			<p>Here is a list of 6 matching properties based on the information you’ve provided</p>
			{#each matches as match}
				<MatchCard {match} />
			{/each}
		</div>
	</div>
</section>

<GeneralBottomNav class="" />
