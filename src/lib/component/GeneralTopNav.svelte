<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let customClass1 = '';
	export { customClass1 as class };
</script>

<section class="{customClass1} sticky absolute top-0 left-0 bg-[#ffffff] z-[1000] w-full h-fit pt-4 pb-4 md:py-2">
	<!-- Mobile view  -->
	<div class="md:hidden font-[700] text-base flex gap-4  w-[90%] mx-auto">
		<div class="flex gap-12 items-center">
			<slot name="back-button" />
            <img class="h-12 w-12 " src="/favicon.png" alt="project-name" />
		</div>
	</div>

	<!-- Non mobile view  -->
	<div class="text-sm 2xl:text-base hidden md:flex px-28 2xl:px-32 justify-between items-center">
		<img class="h-8 w-8 md:h-12 md:w-12 2xl:h-16 2xl:w-16" src="/favicon.png" alt="project-name" />
	</div>
</section>
