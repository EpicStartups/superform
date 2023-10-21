<script lang="ts">
	import QuestionTemplates from './Module/QuestionTemplates.svelte';
	import questionsData from '../../../stores/questions.json';

	// State variable to track the current question index
	let currentIndex = 0;

	// Function to handle the next button click
	const handleNext = () => {
		currentIndex++;
		window.scrollTo(0, 0);
	};

	// Function to handle the previous button click
	const handlePrev = () => {
		currentIndex--;
		window.scrollTo(0, 0);
	};

	/* Function to handle submission or pagination */
	const handleSubmit = (index: number) => {
		if (index === questionsData.questions.length) handleAnswerSubmission();
		else handleNext();
	};

	/* Function to submit answer to backend */
	const handleAnswerSubmission = async () => {};
</script>

<section class="md:bg-primary-25 min-h-screen">
	<!-- Before submission -->
	{#if currentIndex >= 0}
		{#each questionsData.questions as question, index (index)}
			{#if currentIndex === index}
				<QuestionTemplates
					on:gotoPrevQuestion={handlePrev}
					on:handleSubmit={() => handleSubmit(index)}
					bind:currentIndex
					questionData={question}
				/>
			{/if}
		{/each}
	{/if}
</section>
