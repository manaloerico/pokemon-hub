export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
	darkMode: "class",
	theme: {
		extend: {
			keyframes: {
				blob: {
					"0%": { transform: "translate(0px, 0px) scale(1)" },
					"33%": { transform: "translate(30px, -50px) scale(1.1)" },
					"66%": { transform: "translate(-20px, 20px) scale(0.9)" },
					"100%": { transform: "translate(0px, 0px) scale(1)" },
				},
			},
			animation: {
				blob: "blob 8s infinite",
			},

			fontFamily: {
				display: ["Plus Jakarta Sans", "sans-serif"],
			},
			borderRadius: {
				DEFAULT: "1.5rem",
			},
		},
	},
	plugins: [],
};
