<script lang="ts">
	import QuestionTemplates from './QuestionTemplates.svelte';
	import questions from '../../stores/questions.json';

	// Get the list of questions
	const questionList = questions.questions;

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

{#each questions.questions as question, index (index)}
	{#if currentIndex === index}
		<QuestionTemplates
			bind:currentIndex
			{question}
			{index}
			totalQuestions={questions.questions.length}
		/>
	{/if}
{/each}
