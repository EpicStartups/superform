<script lang="ts">
	import QuestionTemplates from '../Superform/Module/QuestionTemplates.svelte';
	import questions from '../../../stores/questions.json';
	import MatchTemplate from './Module/MatchTemplate.svelte';
	import Tests from './Module/Tests.svelte';

	// State variable to track the current question index
	let currentIndex = 0;

	// Function to handle the next button click
	const handleNext = () => {
		currentIndex++;
	};

	// Function to handle the previous button click
	const handlePrev = () => {
		currentIndex--;
	};

</script>

<section class="md:bg-primary-25 min-h-screen">
	<!-- Before submission -->
	{#if currentIndex >= 0}
		{#each questions.pages as page, index (index)}
			{#if currentIndex === index}
				<QuestionTemplates
					bind:currentIndex
					questions={page.questions}
					pageTitle={page.page_title}
					totalQuestions={Object.entries(page).length}
					icons={questions.pages.map((elem) => elem.icon)}
				/>
			{/if}
		{/each}
	{/if}
	<!-- <Tests /> -->

	<!-- After submission -->
	<!-- {#if currentIndex < 0} -->
		<!-- <MatchTemplate /> -->
	<!-- {/if} -->
</section>
