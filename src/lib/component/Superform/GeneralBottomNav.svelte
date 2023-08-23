<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let customClass1 = '';
	export { customClass1 as class };
</script>

<section class="{customClass1} opacity-60 md:opacity-100 md:rounded-full z-30 fixed bottom-0 md:bottom-3 left-0 right-0 drop-shadow-md border-primary-900 h-1/5 bg-primary-1000 w-full md:w-[90%] md:mx-auto h-fit pt-4 pb-6 md:py-2">
	<slot />
</section>
