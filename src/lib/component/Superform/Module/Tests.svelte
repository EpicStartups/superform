<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Get all input elements
		let inputs = document.querySelectorAll('input');

		// Add a focus event listener to each input element
		inputs.forEach(function (input) {
			input.addEventListener('focus', function () {
				// Get the top offset of the focused input element
				let inputHeight = this.getBoundingClientRect().top + window.scrollY;

				// Scroll to the input element smoothly
				window.scrollTo({
					top: inputHeight,
					behavior: 'smooth'
				});

				// Prevent the default behavior of the focus event
				return false;
			});
		});
	});
</script>

<div class="gdbox flex flex-col gap-[100px] mb-40">
	<div id="gdb1" class="gdbutton fontwhitenshadow">Q</div>
	<input id="one" type="text" /><br /><br />
	<input id="two" type="text" /><br /><br />
	<input id="one" type="text" /><br /><br /><input type="text" />
</div>

<div>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam beatae quas esse explicabo modi
	odio nesciunt vero error obcaecati ea sequi alias quam facilis delectus odit aperiam repellat
	similique corrupti.
</div>

<style>
	input {
		height: 40px;
	}

	.gdbox {
		height: 1000px;
	}
</style>
