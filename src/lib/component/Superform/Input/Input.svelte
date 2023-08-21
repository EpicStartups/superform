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
	export let autofocus = false;
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

<div class={`${customClass} focus:text-black  text-[#191C1B]`} bind:this={container}>
	{#if label}
		<label class="text-xl md:text-base 2xl:text-lg font-[500] text-[#191C1B]" for={name}>
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
			class="hover bg-primary-25 text-2xl md:text-xl 2xl:text-2xl text-primary-700 font-[700] py-2 focus:outline-none w-full {disabled
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
			{autofocus}
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

<style>
	.hover {
		border-bottom: 4px solid;
		border-image: repeating-linear-gradient(135deg, #f8ca00 0 10px, #e97f02 0 20px, #bd1550 0 30px)
			8;
		-webkit-mask: conic-gradient(from 180deg at top 8px right 8px, #0000 90deg, #000 0)
				var(--_i, 200%) 0 /200% var(--_i, 8px) border-box no-repeat,
			conic-gradient(at bottom 8px left 8px, #0000 90deg, #000 0) 0 var(--_i, 200%) / var(--_i, 8px)
				200% border-box no-repeat,
			linear-gradient(#000 0 0) padding-box no-repeat;
		transition: 0.3s, -webkit-mask-position 0.3s 0.3s;
	}
	.hover:hover, .hover:focus {
		--_i: 100%;
		/* color: #cc333f; */
		transition: 0.3s, -webkit-mask-size 0.3s 0.3s;
	}
</style>
