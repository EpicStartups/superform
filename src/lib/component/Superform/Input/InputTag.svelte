<script lang="ts">
	import { onMount } from 'svelte';
	import Input from './Input.svelte';
	import hobbies from '../../../../stores/hobbies.json';

	export let name = '';
	export let validation = false;
	export let label: string;
	export let value: any[] = [];
	export let rangeArr: any[] = [];
	export let required = false;
	export let table: any;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';
	let input = '';
	let timer: number | undefined;
	let showDropDown = false;

	$: options = [];
	$: container = '';

	const action = (e: any) => {
		// hide dropdown if clicked outside
		if (
			container &&
			!container.contains(e.target) &&
			!e.target.classList.contains('dropdown-toggle')
		) {
			showDropDown = false;
		}
	};

	const toggleDropdown = () => {
		showDropDown = !showDropDown;
	};

	onMount(async () => {
		document.addEventListener('click', action, true);
		return () => document.removeEventListener('click', action, true);
	});

	const removeTag = (name: any) => {
		value = value.filter((elem) => elem.name !== name);
		value = value;
	};

	const addTag = (inputValue: any) => {
		// Your code to handle Enter key press here
		const containsOnlyWhitespace = /^\s*$/.test(inputValue);

		if (inputValue.length > 0 && !containsOnlyWhitespace) value.push({ name: inputValue });
		value = value;
		input = '';
		showDropDown = false;
	};

	const validateInput = (selection: '') => {
		if (selection.length > 0) {
			if (!value.some((tag) => tag.name === selection)) addTag(selection);
		} else {
			if (!value.some((tag) => tag.name === input)) addTag(input);
		}
	};

	async function handleQuery() {
		// Assume this json is coming from backend
		options = hobbies.filter((hobby) => hobby.includes(input)).slice(0, 5);
	}

	const debounce = (v: any) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			await handleQuery();
		}, 500);
	};

	// $: value = value;
</script>

<section class="{customClass} relative">
	{#if label}
		<label class="text-xl lg:text-base 2xl:text-lg font-[500] text-black" for={name}>
			{label}
			{#if validation}
				<span class="ml-1 text-red-500 font-bold">*</span>
			{/if}</label
		>
	{/if}

	<div class="relative flex gap-2 flex-wrap mt-3">
		{#each value as tag, index}
			<div
				class="{tag.class} bg-[#ffffff] border-[#D0D5DD] text-base lg:text-sm lg:text-sm py-1 px-3 flex items-center gap-2 border rounded-full leading-[150%] font-[400]"
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
			on:enter={validateInput}
			on:keyup={async () => {
				debounce(value);
			}}
			on:focus={async () => {
				showDropDown = true;
				await handleQuery();
			}}
			type="input"
			label={''}
			placeholder={'Type and click enter'}
			required={false}
			autofocus={false}
			bind:value={input}
			bind:container
		/>
	</div>

	{#if showDropDown}
		<div
			id="dropdown"
			class="origin-top-right absolute shadow-lg bg-white ring-1 w-full rounded-md ring-black ring-opacity-5 focus:outline-none z-20 max-h-[150px] overflow-y-auto mt-1"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class=" bg-[#ffffff] py-1" role="none">
				{#if options.length <= 0}
					<p class="menu-item flex space-x-2 items-center" tabindex="-1">No result</p>
				{:else}
					{#each options as selection}
						<button
							class="dropdown-toggle menu-item w-full flex space-x-2 py-2 px-4 hover:bg-primary-100 items-center text-xl 2xl:text-2xl text-primary-500 font-[700]"
							role="menuitem"
							tabindex="-1"
							id="menu-item-0"
							on:click={() => {
								validateInput(selection);
								input = '';
							}}
						>
							{selection}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</section>
