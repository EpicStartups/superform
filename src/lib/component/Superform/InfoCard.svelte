<script lang="ts">
	import InfoSidebar from './SideTable/InfoSidebar.svelte';

	export let question = {};

	let showSidebar = false;

	// Function to toggle sidebar at mobile view
	const openSidebar = () => {
		showSidebar = true;
	};
</script>

<!-- Non mobile view info card  -->
<div class="hidden md:block md:w-[40%] border py-12">
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id modi dolorum eaque veniam rerum,
	nihil distinctio numquam, dolor cumque, natus labore assumenda tempore odio maxime atque possimus
	neque quas esse qui ab. Iusto consectetur maxime quasi nostrum nemo laborum quia. Corporis in
	quibusdam beatae dicta, sed ab est suscipit, nulla officiis et, esse dolorem eligendi quo eveniet
	provident. Iure perferendis, quisquam tempore quo ea reprehenderit in numquam repellendus minima
	veniam, totam error dolorem ipsam, repudiandae ipsum sed animi neque illum reprehenderit.
	Molestias nulla ipsum totam quasi molestiae commodi nisi nam corrupti amet itaque eum omnis cum
	assumenda eius harum sit, perspiciatis aliquid repellendus repudiandae asperiores illo officia
	deserunt. Sapiente atque, iusto rem consequatur aliquam reprehenderit! Aperiam laborum, explicabo,
	ipsum excepturi consequatur, maiores nesciunt illum incidunt magni dolore cum modi maxime
	reiciendis itaque nisi mollitia. Ad excepturi ipsa porro sequi facilis.
</div>

<!-- Mobile info sidebar toggle-->
<button
	on:click={openSidebar}
	class="slider fixed bg-[#77F8DF] h-fit w-fit border flex justify-center items-center inset-y-[300px] right-0"
>
	<div class="">
		<p>{question.infos[0].title}</p>
	</div>
</button>

<!-- Mobile info sidebar -->
<InfoSidebar infos={question.infos} bind:showSidebar />
