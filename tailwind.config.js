import defaultTheme from 'tailwindcss/defaultTheme';
import tailwind_scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				zinc: {
					850: '#202023',
					925: '#111113'
				},
				brand: {
					bgDark: '#121212',

					dark1: '#1D1D1D',
					dark2: '#222222',
					dark3: '#222222',
					dark4: '#272727',
					dark5: '#2C2C2C',
					dark6: '#2E2E2E',
					dark7: '#333333',
					dark8: '#323232',
					dark9: '#353535',
					dark10: '#383838',

					blue_light_2: '#007BFF',
					blue_light: '#036CE4',
					blue: '#065CC8',
					blue_text: '#094DAD',
					blue_dark: '#0B3D91',
					blue_dark_2: '#002F7A',

					green_light_2: '#10E387',
					green_light: '#0EC274',
					green: '#0BA160',
					green_text: '#148e58',
					green_dark: '#07663D',
					green_dark_2: '#054429'
				},
				text: {
					50: '#505050'
				}
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [tailwind_scrollbar({ nocompatible: true })]
};
