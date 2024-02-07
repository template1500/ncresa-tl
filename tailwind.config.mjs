import animations from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#4be3eb',
				secondary: '#4fffdf'
			},
			fontFamily: {
				jost: ['Jost Variable', 'sans-serif'],
				openSans: ['Open Sans Variable', 'sans-serif'],
			},
		},
	},
	plugins: [animations],
}
