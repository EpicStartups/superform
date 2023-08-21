<script lang="ts">
	import { EllipsisHorizontal, Icon } from 'svelte-hero-icons';

	export let match = {};
</script>

<section class="rounded-lg border flex flex-col">
	<!-- Image -->
	<div>
		<img src="" alt="" />
	</div>

	<!-- Details -->
	<div class="flex flex-col">
		<div class="flex justify-between items-center">
			<!-- Address -->
			<div class="flex flex-col">
				<p>
					{match?.property_name}
				</p>
				<p>
					{match?.address}
				</p>
			</div>

			<!-- Three dot button -->
			<Icon src={EllipsisHorizontal} solid class="w-6 h-6 font-bold" />
		</div>

		<div class="flex justify-between">
			<!-- Price -->
			<div class="flex gap-4">
				<p>RM</p>
				<p>
					{match?.property_price}
				</p>
			</div>

			<!-- Three icons -->
            <div class="flex items-center gap-2">
                <div class="flex items-center gap-1">
                    <img src={'/bed.svg'} alt="bedroom" class="w-5 h-5" />
                    <p>{match?.num_bedrooms}</p>
                </div>

                <div class="flex items-center gap-1">
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
