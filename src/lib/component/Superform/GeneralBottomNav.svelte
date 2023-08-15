<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let customClass1 = '';
	export { customClass1 as class };
</script>

<section class="{customClass1} z-30 fixed bottom-0 left-0 drop-shadow-md border-primary-900 h-1/5 bg-primary-900 w-full h-fit pt-4 pb-6 md:py-2">
	<slot />
</section>
