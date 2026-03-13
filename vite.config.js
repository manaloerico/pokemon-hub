import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "/pokemon-hub/", // needed for GitHub Pages standalone
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "pokemonHub",
			filename: "remoteEntry.js",
			exposes: {
				"./App": "./src/bootstrap.js", // use bootstrap.js
			},
			shared: ["react", "react-dom"],
		}),
	],
	build: {
		target: "esnext",
	},
});
