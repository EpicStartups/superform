<script lang="ts">
	import ProductDetail from '$lib/component/Superform/Module/ProductDetail.svelte';
	import matches from '../../../stores/match.json';
	import { selectedProductId } from '../../../stores/product';

	$: match = matches.filter((match) => match.id === $selectedProductId)[0];
</script>

<ProductDetail {match} />
