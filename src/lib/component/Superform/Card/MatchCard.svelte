<script lang="ts">
	import { goto } from '$app/navigation';
	import { EllipsisHorizontal, Icon } from 'svelte-hero-icons';
	import { selectedProductId } from '../../../../stores/product';
	import { formatNumberWithCommas } from '$lib/utils/general';

	export let match = {};

	const selectedProduct = () => {
		$selectedProductId = match?.id;
		goto(`product/${$selectedProductId}`);
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
	on:click|preventDefault={selectedProduct}
	class="hover:scale-105 transform transition duration-600 hover:drop-shadow-lg cursor-pointer rounded-lg flex flex-col gap-4 md:gap-1"
>
	<!-- Image -->
	<div class="">
		<img class="rounded-3xl md:rounded-2xl h-54 md:h-40 2xl:h-30 w-full" src={match.img_urls[0].imgurl} alt="" />
	</div>

	<!-- Details -->
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<!-- Address -->
			<div class="flex flex-col w-[80%]">
				<p class="text-[#000000] font-[900] text-xl md:text-lg 2xl:text-xl">
					{match?.property_name}
				</p>
				<p class="text-[#8E918F] font-[600] whitespace-nowrap truncate md:text-sm 2xl:text-base">
					{match?.address}
				</p>
			</div>

			<!-- Three dot button -->
			<Icon src={EllipsisHorizontal} solid class="w-6 h-6 font-[900]" />
		</div>

		<div class="flex justify-between">
			<!-- Price -->
			<div class="flex gap-4 text-primary-800">
				<p>RM</p>
				<p class="font-[800]">
					{formatNumberWithCommas(match?.property_price)}
				</p>
			</div>

			<!-- Three icons -->
			<div class="flex items-center gap-3 md:gap-5 font-bold md:text-sm">
				<div class="flex items-center gap-1">
					<img src={'/bed.svg'} alt="bedroom" class="w-5 h-5" />
					<p>{match?.num_bedrooms}</p>
				</div>

				<div class="flex items-center gap-1 -mr-1">
					<img src={'/bathroom.svg'} alt="bathroom" class="w-4 h-4 mb-1" />
					<p>{match?.num_toilets}</p>
				</div>

				<div class="flex items-center gap-1">
					<img src={'/car.svg'} alt="carpark" class="w-6 h-6" />
					<p>{match?.num_carparks}</p>
				</div>
			</div>
		</div>
	</div>
</section>
