<script lang="ts">
	import QuestionTemplates from './QuestionTemplates.svelte';
	import questions from '../../../stores/questions.json';

	// Get the list of questions
	const questionList = questions.pages;

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

<section class="bg-primary-25 min-h-screen">
	{#each questions.pages as page, index (index)}
		{#if currentIndex === index}
			<QuestionTemplates
				bind:currentIndex
				questions={page.questions}
				pageTitle={page.page_title}
				{index}
				totalQuestions={Object.entries(page).length}
				icons={questions.pages.map((elem) => elem.icon)}
			/>
		{/if}
	{/each}
</section>
