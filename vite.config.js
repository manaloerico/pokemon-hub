import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
	base: "/pokemon-hub/",
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "pokedex",
			filename: "remoteEntry.js",
			exposes: {
				"./PokedexApp": "./src/mount.tsx",
			},
			shared: ["react", "react-dom", "react-router-dom"],
		}),
	],
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
