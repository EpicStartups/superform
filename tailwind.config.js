/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		colors: {
			primary: {
				25: '#F9F8FC',
				50: '#EAE7F9',
				100: '#DBD5F7',
				200: '#CCC2F4',
				300: '#BDACF2',
				400: '#AE95EF',
				500: '#9F7EEC',
				600: '#8E66FF',
				700: '#6E3DFF',
				800: '#4D17BF',
				// 900: '#2E1A69',
				900: '#42307D',
				1000: '#140D1C'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
