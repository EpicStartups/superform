<script lang="ts">
	import matches from '../../../../stores/match.json';
	import { selectedProductId } from '../../../../stores/product';

	$: match = matches.filter((match) => match.id === $selectedProductId)[0];

	$: console.log(match, 'ath');
</script>

<section>
	<!-- Mobile view  -->

	<!-- Non mobile view -->
	<div class="hidden md:flex gap-12">
		<!-- Left static pictures -->

		<!-- Right details -->
		<div class="flex flex-col gap-4">
			<!-- Name and seller -->
			<div class="flex flex-col gap-1">
				<p>{match?.property_name}</p>
				<p>{match?.owner_name}</p>
			</div>

			<!-- Price and description -->
			<div class="flex flex-col gap-8">
				<p>{match?.property_price}</p>
				<p>{match?.description}</p>
			</div>

			<!-- Specs -->
			<div class="flex flex-col gap-8">
				<div class="flex gap-8">
					<p>Bathroom</p>
					<p>{match?.num_toilets}</p>
				</div>
                <div class="flex gap-8">
					<p>Bedroom</p>
					<p>{match?.num_bedrooms}</p>
				</div>
                <div class="flex gap-8">
					<p>Lot size</p>
					<p>{match?.lot_size_sqft}</p>
				</div>
			</div>

            <!-- Extra specs -->

            <!-- Checkout button -->
            <button>Checkout</button>
		</div>
	</div>
</section>
