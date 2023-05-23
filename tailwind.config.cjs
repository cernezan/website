/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	
		extend: {
			colors: {
				specialIndigo: '#567EEF',
				specialBlue: '#71C7FE',
				specialGreen: '#D9E6D4',
	
			  },
			animation: {
			  blob: "blob 7s infinite",
			},
			keyframes: {
			  blob: {
				"0%": {
				  transform: "translate(0px, 0px) scale(1)",
				},
				"33%": {
				  transform: "translate(30px, -50px) scale(1.1)",
				},
				"66%": {
				  transform: "translate(-20px, 20px) scale(0.9)",
				},
				"100%": {
				  transform: "tranlate(0px, 0px) scale(1)",
				},
			  },
			},
		  },
	},
	plugins: [],
}
