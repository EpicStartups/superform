<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { FreeMode } from 'swiper/modules';
	// import Swiper and modules styles
	import 'swiper/css';
	import 'swiper/css/free-mode';

	// init Swiper:
	onMount(() => {
		const swiper = new Swiper('.swiper', {
			modules: [FreeMode],
			freeMode: {
				enabled: true,
				sticky: true,
				momentum: true,
				momentumBounce: true,
				momentumBounceRatio: 1,
				minimumVelocity: 0.02,
				momentumRatio: 1,
				momentumVelocityRatio: 1
			}
		});
	});
</script>

<!-- Slider main container -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="swiper h-screen">
	<!-- Additional required wrapper -->
	<swiper class="swiper-wrapper">
		<!-- Slides -->
		<div class="bg-primary-50 swiper-slide">Slide 1</div>
		<div class="bg-primary-100 swiper-slide">Slide 2</div>
		<div class="bg-primary-500 swiper-slide">Slide 3</div>
	</swiper>
</div>
