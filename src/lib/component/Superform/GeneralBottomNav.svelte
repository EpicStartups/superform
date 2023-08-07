<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let customClass1 = '';
	export { customClass1 as class };
</script>

<section class="{customClass1} sticky absolute bottom-0 left-0 drop-shadow-md border-primary-50 h-1/5 bg-primary-50 w-full h-fit pt-4 pb-6 md:py-2">
	<slot />
</section>
