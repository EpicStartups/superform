<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let customClass1 = '';
	export { customClass1 as class };
</script>

<section class="{customClass1} opacity-60 lg:opacity-100 lg:rounded-full fixed bottom-0 lg:bottom-3 left-0 right-0 drop-shadow-md border-primary-900 h-1/5 bg-primary-1000 w-full lg:w-[90%] lg:mx-auto h-fit pt-4 pb-6 lg:py-2">
	<slot />
</section>
