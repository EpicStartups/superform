<script lang="ts">
	import { Icon, Home, HandRaised, Heart, type IconSource } from 'svelte-hero-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let name = '';
	export let validation = false;
	export let label: string;
	export let value: any;
	export let selectionArr: any[] = [];
	export let required = false;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';

	const onClick = (e: any) => {
		// Select Card function
		// If question.value is not already an array, it will be initialized as an empty array.
		value = value ?? [];

		// Convert the existing question.value array to a Set to remove duplicates.
		const valueSet = new Set(value);

		// Check if the value exists in the array, and if it does, remove it.
		if (valueSet.has(e)) {
			valueSet.delete(e);
		} else {
			// Add the new value to the Set if it doesn't exist in the array.
			valueSet.add(e);
		}

		// Convert the Set back to an array and update question.value.
		value = Array.from(valueSet);

		// return value;
	};
</script>

<div class={customClass}>
	{#if label}
		<label class="text-xl lg:text-base 2xl:text-lg font-[500] text-black" for={name}>
			{label}
			{#if validation}
				<span class="ml-1 text-red-500 font-bold">*</span>
			{/if}</label
		>
	{/if}
	<div class="mt-4 p-4 relative flex flex-row w-[285px] overflow-x-auto md:w-[700px] lg:overflow-hidden lg:w-full lg:flex-row gap-4 lg:gap-6">
		{#each selectionArr as elem (elem.value)}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				id={elem.value}
				style={value
					? [
							value.includes(elem.value)
								? 'border-width: 4px;'
								: 'box-shadow: -3px 4px 5px 0px rgba(0, 0, 0, 0.25);'
					  ]
					: 'box-shadow: -3px 4px 5px 0px rgba(0, 0, 0, 0.25);'}
				class="transform transition duration-600 lg:hover:scale-110 flex flex-col gap-6 shadow-[-3px_4px_605px_0px_rgba(0, 0, 0.25)] rounded-md items-center py-4 lg:py-6 px-6 lg:px-4 cursor-pointer text-lg text-black font-[400] w-full border border-4 {value
					? [
							value.includes(elem.value)
								? 'border-primary-800 border-2 bg-primary-25'
								: 'border-[#EFEFEF]'
					  ]
					: 'border-[#EFEFEF]'}"
				on:click={() => {
					onClick(elem.value);
				}}
			>
				{#if elem.topIcon}
					<div class="">
						<Icon src={Home} class="h-24 w-24 lg:h-16 lg:w-16 2xl:h-24 2xl:w-24 text-primary-800" />
					</div>
				{/if}
				<!-- <input type="text" value={elem.value} class="focus:outline-none focus:border-none bg-transparent w-fit" /> -->
				{elem.value}
				{#if elem.bottomIcon}
					<div class="">
						<Icon
							src={elem.bottomIcon}
							class="h-24 w-24 lg:h-16 lg:w-16 2xl:h-24 2xl:w-24 text-primary-500"
						/>
					</div>
				{/if}
			</div>
		{/each}

		<div class="absolute inset-y-0 right-0 flex items-center">
			<slot name="tail" />
		</div>
	</div>
</div>
