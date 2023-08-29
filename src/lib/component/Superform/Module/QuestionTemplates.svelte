<script lang="ts">
	import { fly } from 'svelte/transition';
	import GeneralBottomNav from '../GeneralBottomNav.svelte';
	import GeneralTopNav from '../GeneralTopNav.svelte';
	import Dropdown from '../Input/Dropdown.svelte';
	import Input from '../Input/Input.svelte';
	import { Icon, ChevronDown, Home, type IconSource } from 'svelte-hero-icons';
	import SelectPill from '../Input/SelectPill.svelte';
	import SelectCard from '../Input/SelectCard.svelte';
	import InfoCard from '../Card/InfoCard.svelte';
	import DoubleRangeSlider from '../Input/DoubleRangeSlider.svelte';
	import InputTag from '../Input/InputTag.svelte';

	export let questions: any;
	export let totalQuestions: number;
	export let currentIndex: number;
	export let icons: any[];
	export let pageTitle: any;

	let selectedQuestion = 0;
	let isExpand = false;

	// Function to change slider shape
	// const changeSliderShape = (e) => {
	// 	const slider = document.getElementsByClassName('slider')[0];
	// };

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

	// Function to go to a specific question
	const goToQuestion = (index: number) => {
		currentIndex = Math.max(Math.min(index, totalQuestions - 1), 0);
	};

	// Function to submit answers
	const submitAnswers = () => {
		// Temporary way to indicate submission
		currentIndex = -1;
		window.scrollTo(0, 0);
	};
</script>

<GeneralTopNav class="lg:hidden">
	<span class="{currentIndex > 0 ? 'block' : 'hidden'} flex items-center" slot="back-button">
		<button on:click={prevQuestion}>
			<svg
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

<!-- Questions and Info -->
<!-- transition:fly={{ x: -1000, duration: 300 }} -->
<section
	class="lg:bg-primary-800 h-screen {isExpand ? 'overflow-y-auto' : ''}
		   relative w-[90%] mx-auto lg:w-[100%] text-base 2xl:text-xl flex"
>
	<div
		class="sideShadow lg:z-[10] lg:px-12 bg-[#ffffff] lg:rounded-r-[36px] {isExpand
			? 'hidden'
			: 'lg:w-[55%]'} flex flex-col"
	>
		<!-- Navbar -->
		<section class="hidden lg:block bg-[#ffffff] fixed z-[50] w-[45%] h-fit">
			<div
				class="text-sm 2xl:text-base hidden lg:flex px-14 2xl:px-16 py-6 justify-between items-center"
			>
				<img class="w-12 lg:w-36 2xl:w-40" src="/project-logo.svg" alt="project-name" />
			</div>
		</section>

		<!-- Content -->
		<div class="md:h-screen md:overflow-auto px-8 lg:px-16 pt-14 pb-16">
			<!-- Question -->
			<form class=" mt-16 lg:mt-12 mb-40 flex flex-col gap-4 jusitfy-start">
				<!-- on:submit={() => {
				currentIndex + 1 === totalQuestions ? submitAnswers() : nextQuestion();
			}} -->
				<h1 class="w-[80%] uppercase text-primary-900 font-[700] text-3xl lg:text-4xl 2xl:text-5xl">
					{pageTitle}
				</h1>
				{#each questions as question, index}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:focusin|preventDefault={() => {
							selectedQuestion = index;
							// const elem = document
							// 	.getElementsByClassName(`elem-${index}`)[0]
							// 	.getBoundingClientRect();
							// const elem = document.getElementsByClassName(`elem-${index}`)[0].scrollIntoView()
							// location.href = `#elem-${index}`;							const offset = 20; // Adjust this value as needed

							// window.scrollTo(0, 0);
							// document.body.scrollTo({ top: 0 })
						}}
						on:mouseenter={() => {
							selectedQuestion = index;
						}}
						class="mt-6 lg:flex lg:flex-col opacity-60 hover:opacity-100 focus-within:opacity-100"
					>
						<!-- Different types of questions   -->
						{#if question.question_type === 'text_input'}
							<Input
								type="input"
								label={question.name}
								required={true}
								bind:value={question.value}
								class={`elem-${index}`}
							/>
						{:else if question.question_type === 'dropdown'}
							<Dropdown bind:showDropdown={question.showDropdown} class={`elem-${index}`}>
								<Input
									slot="trigger"
									label={question.name}
									placeholder={'Select here'}
									required={true}
									readonly={true}
									on:focus={() => (question.showDropdown = true)}
									bind:value={question.value}
									backIcon={ChevronDown}
								/>
								<span class="dropdown-toggle" slot="menu-items">
									{#if question.question_selection.selection_value.length <= 0}
										<p class="dropdown-toggle menu-item flex space-x-2 items-center" tabindex="-1">
											No result
										</p>
									{:else}
										{#each question.question_selection.selection_value as selection}
											<button
												class="dropdown-toggle menu-item w-full flex space-x-2 py-2 px-4 hover:bg-primary-100 items-center text-xl 2xl:text-2xl text-primary-500 font-[700]"
												role="menuitem"
												tabindex="-1"
												id="menu-item-0"
												on:click={() => {
													question.showDropdown = false;
													question.value = selection;
												}}
											>
												{selection}
											</button>
										{/each}
									{/if}
								</span>
							</Dropdown>
						{:else if question.question_type === 'select_pill'}
							<SelectPill
								selectionArr={question.question_selection}
								required={true}
								label={question.name}
								bind:value={question.value}
								class={`elem-${index}`}
							/>
						{:else if question.question_type === 'select_card'}
							<SelectCard
								selectionArr={question.question_selection}
								required={true}
								label={question.name}
								bind:value={question.value}
								class={`elem-${index}`}
							/>
						{:else if question.question_type === 'range_slider'}
							<DoubleRangeSlider
								bind:start={question.question_selection.min}
								bind:end={question.question_selection.max}
								required={true}
								label={question.name}
								bind:value={question.value}
								class={`elem-${index}`}
							/>
						{:else if question.question_type === 'tag'}
							<InputTag
								table={question.table}
								required={true}
								label={question.name}
								bind:value={question.value}
								class={`elem-${index}`}
							/>
						{/if}
					</div>
				{/each}
			</form>
		</div>
	</div>

	<!-- Info cards  -->
	<InfoCard bind:isExpand question={questions[selectedQuestion]} />
</section>

<GeneralBottomNav class="z-40 {isExpand ? 'hidden' : 'block'}">
	<!-- Mobile view  -->
	<button
		on:click={currentIndex + 1 === totalQuestions ? submitAnswers : nextQuestion}
		class="lg:hidden w-[90%] bg-primary-500 mx-auto text-[#FFFFFF] rounded-md py-4 px-12 font-[700] text-base flex items-center gap-4 justify-between"
	>
		{currentIndex + 1}/{totalQuestions} to your results
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.93955 2.45401C7.65834 2.7353 7.50037 3.11676 7.50037 3.51451C7.50037 3.91226 7.65834 4.29372 7.93955 4.57501L15.3645 12L7.93955 19.425C7.66631 19.7079 7.51512 20.0868 7.51853 20.4801C7.52195 20.8734 7.67971 21.2496 7.95782 21.5277C8.23593 21.8059 8.61215 21.9636 9.00544 21.967C9.39874 21.9704 9.77764 21.8192 10.0605 21.546L18.546 13.0605C18.8273 12.7792 18.9852 12.3978 18.9852 12C18.9852 11.6023 18.8273 11.2208 18.546 10.9395L10.0605 2.45401C9.77925 2.1728 9.39779 2.01483 9.00005 2.01483C8.6023 2.01483 8.22084 2.1728 7.93955 2.45401Z"
				fill="white"
			/>
		</svg>
	</button>

	<!-- Not mobile view  -->
	<section
		class="text-sm text-[#FFFFFF] 2xl:text-base hidden lg:flex py-2 px-28 2xl:px-32 justify-between items-center"
	>
		<!-- Left section  -->
		<div class="flex gap-4 items-center">
			{#each icons as icon, i}
				<!-- <div>{icon}</div> -->
				{#if currentIndex + 1 > i}
					<Icon src={Home} solid class="bg-[#FEAC4B] rounded-full h-10 w-10 p-2 text-white" />
				{:else}
					<Icon src={Home} solid class="bg-[#CDCDCD] rounded-full h-10 w-10 p-2 text-white" />
				{/if}
			{/each}
			<div class="uppercase font-[700]">
				{totalQuestions - 1 - currentIndex}
				{totalQuestions - 1 - currentIndex > 1 ? 'questions' : 'question'} before your results!
			</div>
		</div>

		<!-- Right section  -->
		<div class="flex gap-4 items-center">
			{#if currentIndex > 0}
				<button
					on:click={prevQuestion}
					class="bg-[#ffffff] text-[#000000] font-[700] rounded-full px-6 py-3 2xl:px-8 2xl:py-4"
					>Back</button
				>
			{/if}
			{#if currentIndex + 1 === totalQuestions}
				<button
					type="submit"
					on:click={submitAnswers}
					class="bg-primary-600 text-[#ffffff] font-[700] rounded-full px-6 py-3 2xl:px-8 2xl:py-4"
					>Submit</button
				>
			{:else}
				<button
					type="submit"
					on:click={nextQuestion}
					class="bg-primary-600 text-[#ffffff] font-[700] rounded-full px-6 py-3 2xl:px-8 2xl:py-4"
					>Next</button
				>
			{/if}
		</div>
	</section>
</GeneralBottomNav>

<style>
	.questionFocus {
		opacity: 60%;
	}

	.questionFocus:hover,
	.questionFocus:focus-within {
		opacity: 100%;
	}

	@media only screen and (min-width: 768px) {
		.sideShadow {
			box-shadow: 5px 5px 20px lightblue;
		}
	}

	@media only screen and (max-width: 765px) {
		.sideShadow {
			box-shadow: none;
		}
	}
</style>
