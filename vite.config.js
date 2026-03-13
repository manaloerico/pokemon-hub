// vite.config.js
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
			base: "", // <-- empty string makes federation use relative paths
		}),
	],
	build: {
		target: "esnext",
		rollupOptions: {
			output: {
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
				// ensure chunks are loaded relative to current path
				// so GitHub Pages /pokemon-hub/ works
				dir: "dist",
				manualChunks(id) {
					if (id.includes("node_modules")) return "vendor";
				},
			},
		},
	},
});
