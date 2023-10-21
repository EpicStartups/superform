<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	export let showDropdown = false;
	let customClass = '';
	export { customClass as class };

	let container: HTMLElement;
	let trigger: HTMLElement;

	const action = (e) => {
		// hide dropdown if clicked outside or clicked on the trigger again
		// if (container && container !== e.target && !container.contains(e.target)) {
		// 	showDropdown = false;
		// }

		if (
			container &&
			!container.contains(e.target) &&
			!e.target.classList.contains('dropdown-toggle')
		) {
			showDropdown = false;
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('click', action, true);
			return () => document.removeEventListener('click', action, true);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', action);
		}
	});
</script>

<div class="relative {customClass}" bind:this={container}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="h-full" bind:this={trigger}>
		<slot name="trigger" />
	</div>
	{#if showDropdown}
		<div
			id="dropdown"
			class=" origin-top-right absolute shadow-lg bg-white ring-1 w-full rounded-md ring-black ring-opacity-5 focus:outline-none z-[100] max-h-[400px] overflow-y-auto mt-1"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="bg-[#ffffff] py-1" role="none">
				<slot name="menu-items" />
			</div>
		</div>
	{/if}
</div>
