import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#6b42b7',
  			'primary-content': '#fcfbfd',
  			'primary-dark': '#6504bf',
  			'primary-light': '#8765c7',
  			secondary: '#b742a1',
  			'secondary-content': '#fdfbfd',
  			'secondary-dark': '#913480',
  			'secondary-light': '#c765b5',
  			background: '#171122',
  			foreground: '#221934',
  			border: '#392956',
  			copy: '#fbfafd',
  			'copy-light': '#d5cbe6',
  			'copy-lighter': '#9c87c5',
  			success: '#42b742',
  			warning: '#b7b742',
  			error: '#b74242',
  			'success-content': '#000000',
  			'warning-content': '#000000',
  			'error-content': '#fdfbfb'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
