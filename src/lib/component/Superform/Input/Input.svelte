<script lang="ts">
	import { Icon } from 'svelte-hero-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id = 'input';
	export let name = 'input';
	export let required = false;
	export let validation = false;
	export let autocomplete = 'off';
	export let label: string;
	export let value: any;
	export let placeholder = '';
	export let type = 'input';
	export let disabled = false;
	export let min = '';
	export let max = '';
	export let frontIcon = '';
	export let backIcon = '';
	export let readonly = false;
	export let container: HTMLElement;

	let customClass = '';
	export { customClass as class };
	let disabledClass = 'cursor-not-allowed opacity-80 hover:opacity-80';
	let enabledClass = '';

	const onInput = (e) => {
		value = type.match(/^(number|range)$/)
			? e.target.value.length === 0
				? null
				: Math.abs(e.target.value)
			: e.target.value;
		dispatch('input', value);
	};
	const onFocus = (e) => {
		value = type.match(/^(number|range)$/)
			? e.target.value.length === 0
				? null
				: Math.abs(e.target.value)
			: e.target.value;
		dispatch('focus', value);
	};
	const onBlur = (e) => {
		value = type.match(/^(number|range)$/)
			? e.target.value.length === 0
				? null
				: Math.abs(e.target.value)
			: e.target.value;
		dispatch('blur', value);
	};

	onMount(() => {
		if (type === 'number' && value === undefined) placeholder = 0;
		dispatch('blur', value);
	});
</script>

<div class={customClass} bind:this={container}>
	{#if label}
		<label class="text-2xl font-[500] text-black" for={name}>
			{label}
			{#if validation}
				<span class="ml-1 text-red-500 font-bold">*</span>
			{/if}</label
		>
	{/if}
	<div class="p-0 relative flex">
		{#if frontIcon}
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Icon src={frontIcon} class="flex-shrink-0 h-4 w-4 text-gray-700" />
			</div>
		{/if}
		<input
			{id}
			{name}
			placeholder={placeholder || 'Type your answer here'}
			class="text-3xl text-primary-500 font-[700] py-2 focus:outline-none w-full {disabled
				? disabledClass
				: enabledClass}
				{frontIcon ? 'pl-10' : null} {backIcon ? 'pr-10' : null}"
			value={value || ''}
			{type}
			{disabled}
			{min}
			{max}
			{required}
			{autocomplete}
			{readonly}
			on:focus={onFocus}
			on:blur={onBlur}
			on:input={onInput}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					dispatch('enter');
				}
			}}
			on:keyup={(e) => {
				dispatch('keyup');
			}}
		/>
		{#if backIcon}
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
				<Icon src={backIcon} class="flex-shrink-0 h-8 w-8 text-gray-700" />
			</div>
		{/if}
		<div class="absolute inset-y-0 right-0 flex items-center">
			<slot name="tail" />
		</div>
	</div>
</div>
