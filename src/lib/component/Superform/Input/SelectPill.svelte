<script lang="ts">
	import { Home, Icon, type IconSource } from 'svelte-hero-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let name = '';
	export let validation = false;
	export let label: string = '';
	export let value: any;
	export let selectionArr: any[] = [];
	export let required = false;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';

	const onClick = (e: any) => {
		// Select Pill function
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
	<div class="mt-4 relative flex flex-col gap-2 lg:gap-2">
		{#each selectionArr as elem}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				id={elem.value}
				class="transform transition duration-600 hover:scale-110 flex bg-[#ffffff] items-center gap-4 px-6 cursor-pointer text-base 2xl:text-lg text-[#475467] font-[600] py-2 w-full border border-2 shadow-md {value
					? [value.includes(elem.value) ? 'border-[#FDA31C] border-4' : ' border-[#D0D5DD]']
					: 'border-[#D0D5DD]'} rounded-full
					{elem.frontIcon ? 'pl-10' : null} {elem.backIcon ? 'pr-10' : null}"
				on:click={() => {
					onClick(elem.value);
				}}
			>
				{#if elem.frontIcon}
					<div class="">
						<Icon src={Home} class="h-8 w-8" />
					</div>
				{/if}
				<!-- <input value={elem.value} /> -->

				{elem.value}
				{#if elem.backIcon}
					<div class="">
						<Icon src={elem.backIcon} class="h-8 w-8" />
					</div>
				{/if}
			</div>
		{/each}

		<div class="absolute inset-y-0 right-0 flex items-center">
			<slot name="tail" />
		</div>
	</div>
</div>
