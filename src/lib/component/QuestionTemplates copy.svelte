<script lang="ts">
	import { onMount } from 'svelte';

	// import Swiper bundle with all modules installed
	import Swiper from 'swiper/bundle';

	// import styles bundle
	import 'swiper/css/bundle';

	onMount(() => {
		// init Swiper:
		const swiper = new Swiper('.swiper', {
			// Optional parameters
			direction: 'horizontal',
			loop: false,
			speed: 1000,
			effect: 'slide',

			// If we need pagination
			pagination: {
				el: '.swiper-pagination'
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}

			// And if we need scrollbar
			// scrollbar: {
			// 	el: '.swiper-scrollbar'
			// }
		});
	});
</script>

<!-- Slider main container -->
<section class="swiper bg-red-400 flex flex-col">
	<!-- Additional required wrapper -->
	<section class="swiper-wrapper">
		<!-- Slides -->
		<div class="swiper-slide">Slide 1</div>
		<div class="swiper-slide">Slide 2</div>
		<div class="swiper-slide">Slide 3</div>
	</section>
	<!-- If we need pagination -->
	<!-- <div class="swiper-pagination"></div> -->

	<!-- If we need navigation buttons -->
	<section class="border bg-primary-300">
		<button class="swiper-button-prev" />

		<button class="border swiper-button-next" />
	</section>

	<!-- If we need scrollbar -->
	<!-- <div class="swiper-scrollbar"></div> -->
</section>

<style>
	.swiper {
		width: screen;
		height: 100vh;
	}
</style>
