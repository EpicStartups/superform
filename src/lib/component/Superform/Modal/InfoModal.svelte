<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Icon, User, XMark } from 'svelte-hero-icons';
	import { fly } from 'svelte/transition';
	import { adjustTextareaHeight, checkTextareaHeight, fullTextareaHeight } from '$lib';

	export let isShowUserCard: any;
	export let information: any;

	onMount(() => {
		checkTextareaHeight(information.id);
		const textarea = document.getElementById(`myTextarea-${information.id}`);
		adjustTextareaHeight(textarea);
	});

	onDestroy(() => {
		isShowUserCard = false;
	});

</script>

<div
	class="overscroll-contain fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-[1000]"
>
	<div
		transition:fly={{ y: -50, duration: 800 }}
		class="overscroll-contain relative w-[500px] h-fit bg-[#ffffff] border-0 rounded-md p-5 flex flex-col gap-4"
	>
		<div class="flex justify-end w-full">
			<button class="" on:click={() => (isShowUserCard = false)}>
				<Icon src={XMark} class="w-5 h-5 hover:cursor-pointer" />
			</button>
		</div>

		<!-- Info card  -->
		<div class=" w-full p-4 overflow-y-auto h-[500px] 2xl:h-[550px]">
			<!-- Icon and title -->
			<div class="flex items-center justify-start gap-2 mb-2">
				{#if information.image_url}
					<img src={information.image_url} alt="" class="w-12 2xl:w-16 h-12 2xl:h-16" />
				{/if}
				<div class="text-[#191C1B] font-[800] text-2xl 2xl:text-3xl">{information.title}</div>
			</div>

			<div class="flex-col h-[450px] 2xl:h-[500px] ">
				<!-- Description  -->
				<textarea
					disabled
					class="flex-1 resize-none bg-[#ffffff] overflow-hidden flex-grow text-[#434350] font-[400] text-sm 2xl:text-lg w-full h-fit"
					id="myTextarea-{information.id}"
					value={information.description}
				/>

				<!-- Video -->
				{#if information.video_url}
					<div
						style="position:relative;padding-top:72%;"
						class=" w-[100%] bg-[#000000] mt-4 "
					>
						<iframe
							style="position:absolute;top:0;width:100%;height:100%;"
							src={information.video_url}
							title="video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
