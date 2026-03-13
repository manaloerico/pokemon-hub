import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/pokemon-hub/",
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "pokemonHub",
			filename: "remoteEntry.js",
			exposes: {
				"./App": "./src/bootstrap.jsx",
			},
			shared: ["react", "react-dom"],
			base: "./", // <-- makes dynamic imports relative
		}),
	],
	build: {
		target: "esnext",
		rollupOptions: {
			output: {
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
	},
});
