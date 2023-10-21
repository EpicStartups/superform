<script lang="ts">
	import { fly } from 'svelte/transition';
	import GeneralTopNav from '../GeneralTopNav.svelte';
	import Dropdown from '../Input/Dropdown.svelte';
	import Input from '../Input/Input.svelte';
	import { Icon, ChevronDown, Home, type IconSource } from 'svelte-hero-icons';
	import SelectPill from '../Input/SelectPill.svelte';
	import SelectCard from '../Input/SelectCard.svelte';
	import InfoCard from '../Card/InfoCard.svelte';
	import DoubleRangeSlider from '../Input/DoubleRangeSlider.svelte';
	import InputTag from '../Input/InputTag.svelte';

	import { onMount, createEventDispatcher } from 'svelte';
	import Slider from '../Input/Slider/Slider.svelte';

	const dispatch = createEventDispatcher();

	export let questionData: any;
	export let currentIndex: number;

	let section: any;
	let loading = false;

	/* Function to handle Enter key */
	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			if (handleValidation()) dispatch('handleSubmit');
		}
	};

	/* Function to validate answer value */
	const handleValidation = () => {
		let isValidated = true;
		if (questionData.value === undefined) {
			isValidated = false;
			return isValidated;
		}
		if (questionData.value === null) {
			isValidated = false;
			return isValidated;
		}
		if (questionData.value.length === 0) {
			isValidated = false;
			return isValidated;
		}

		return isValidated;
	};
</script>

<svelte:window on:keypress={handleKeyPress} />

<GeneralTopNav class="lg:hidden">
	<span class="{currentIndex > 0 ? 'block' : 'hidden'} flex items-center" slot="back-button">
		<button
			on:click={() => {
				dispatch('gotoPrevQuestion');
			}}
		>
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
	class="min-h-screen lg:bg-primary-800 relative w-[90%] md:w-full mx-auto lg:w-[100%] text-base 2xl:text-xl flex"
>
	<div
		bind:this={section}
		class="h-full sideShadow lg:z-[10] lg:px-12 bg-[#ffffff] lg:rounded-r-[4px] md:w-full lg:w-[55%] flex flex-col"
	>
		<!-- Navbar -->
		<section class="hidden lg:block bg-[#ffffff] fixed z-[50] w-[45%] h-fit">
			<div
				class="text-sm 2xl:text-base hidden lg:flex px-14 2xl:px-16 py-6 justify-start items-center gap-4"
			>
				<span class="{currentIndex > 0 ? 'block' : 'hidden'} flex items-center w-fit">
					<button
						on:click={() => {
							dispatch('gotoPrevQuestion');
						}}
					>
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

				<img class="w-12 lg:w-36 2xl:w-40" src="/project-logo.svg" alt="project-name" />
			</div>
		</section>

		<!-- Content -->
		<div class=" min-h-screen px-8 md:px-20 lg:px-16 pt-14 pb-16 flex justfy-center items-center">
			<!-- Question -->
			<form
				on:submit={() => {
					return false;
				}}
				class="h-full mt-16 lg:mt-12 mb-40 flex flex-col gap-8 w-full"
			>
				<h1 class="w-[80%] uppercase text-primary-900 font-[700] text-3xl lg:text-4xl 2xl:text-5xl">
					{questionData.label}
				</h1>
				<!-- Different types of questions   -->
				{#if questionData.question_type === 'text_input'}
					<Input
						type="input"
						required={true}
						bind:value={questionData.value}
						id={questionData.id}
						autofocus={true}
					>
						<span slot="tail">
							<button
								on:click|preventDefault={() => {
									if (handleValidation()) dispatch('handleSubmit');
								}}
								class="block"
							>
								<img src="/nextInputButton.svg" alt="nextInputButton" />
							</button>
						</span>
					</Input>
				{:else if questionData.question_type === 'dropdown'}
					<Dropdown bind:showDropdown={questionData.showDropdown}>
						<Input
							slot="trigger"
							placeholder={'Select here'}
							required={true}
							readonly={true}
							on:focus={() => (questionData.showDropdown = true)}
							bind:value={questionData.value}
							backIcon={ChevronDown}
							autofocus={false}
						>
							<span slot="tail">
								<button
									on:click|preventDefault={() => {
										if (handleValidation()) dispatch('handleSubmit');
									}}
									class=" block"
								>
									<img src="/nextInputButton.svg" alt="nextInputButton" />
								</button>
							</span>
						</Input>
						<span class="dropdown-toggle" slot="menu-items">
							{#if questionData.question_selection.selection_value.length <= 0}
								<p class="dropdown-toggle menu-item flex space-x-2 items-center" tabindex="-1">
									No result
								</p>
							{:else}
								{#each questionData.question_selection.selection_value as selection}
									<button
										class=" dropdown-toggle menu-item w-full flex space-x-2 py-2 px-4 hover:bg-primary-100 items-center text-xl 2xl:text-2xl text-primary-500 font-[700]"
										role="menuitem"
										tabindex="-1"
										id="menu-item-0"
										on:click={() => {
											questionData.showDropdown = false;
											questionData.value = selection;
										}}
									>
										{selection}
									</button>
								{/each}
							{/if}
						</span>
					</Dropdown>
				{:else if questionData.question_type === 'select_pill'}
					<SelectPill
						selectionArr={questionData.question_selection}
						required={true}
						bind:value={questionData.value}
					/>
				{:else if questionData.question_type === 'select_card'}
					<SelectCard
						selectionArr={questionData.question_selection}
						required={true}
						bind:value={questionData.value}
					/>
				{:else if questionData.question_type === 'range_slider'}
					<!-- <Slider
						bind:value={questionData.value}
						min={questionData.question_selection.min}
						max={questionData.question_selection.max}
						step={questionData.question_selection.step}
						range={false}
					>
					</Slider> -->
					<DoubleRangeSlider
						bind:start={questionData.question_selection.min}
						bind:end={questionData.question_selection.max}
						bind:step={questionData.question_selection.step}
						required={true}
						bind:value={questionData.value}
					/>
				{:else if questionData.question_type === 'tag'}
					<InputTag
						table={questionData.table}
						required={true}
						bind:value={questionData.value}
						id={questionData.id}
					/>
				{/if}
			</form>
		</div>
	</div>

	<!-- Info cards  -->
	<div
		style={'position: -webkit-fixed; position: fixed;right: 0; width: 45%; '}
		class="z-[100] lg:z-0"
	>
		<InfoCard bind:loading question={questionData} />
	</div>
</section>

{#if loading}
	<div class="loader w-screen h-screen z-[1000]" />
{/if}

<style>
	@media only screen and (min-width: 768px) {
		.sideShadow {
			box-shadow: 5px 5px 20px #31138b;
		}
	}

	@media only screen and (max-width: 765px) {
		.sideShadow {
			box-shadow: none;
		}
	}
</style>
