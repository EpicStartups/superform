<script lang="ts">
	import Input from './Input.svelte';

	export let name = '';
	export let validation = false;
	export let label: string;
	export let value: any[] = [];
	export let rangeArr: any[] = [];
	export let required = false;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';
	let input = '';

	const removeTag = (name: any) => {
		value = value.filter((elem) => elem.name !== name);
		value = value;
	};

	const addTag = (event: any) => {
		// Your code to handle Enter key press here
		value.push({ name: input });
		value = value;
		input = '';
	};

	// $: value = value;
</script>

<section class={customClass}>
	{#if label}
		<label class="text-xl md:text-base 2xl:text-lg font-[500] text-black" for={name}>
			{label}
			{#if validation}
				<span class="ml-1 text-red-500 font-bold">*</span>
			{/if}</label
		>
	{/if}

	<div class="flex gap-2 flex-wrap mt-3">
		{#each value as tag, index}
			<div
				class="{tag.class} bg-[#ffffff] border-[#D0D5DD] text-base md:text-sm md:text-sm py-1 px-3 flex items-center gap-2 border rounded-md leading-[150%] font-[400]"
			>
				{tag.name}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<svg
					on:click={() => removeTag(tag.name)}
					class="cursor-pointer"
					width="11"
					height="11"
					viewBox="0 0 12 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.8926 1L1.89258 10M1.89258 1L10.8926 10"
						stroke="#667085"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		{/each}
		<Input
			on:enter={addTag}
			type="input"
			label={''}
			placeholder={'Type and click enter'}
			required={false}
			autofocus={true}
			bind:value={input}
		/>
	</div>
</section>
