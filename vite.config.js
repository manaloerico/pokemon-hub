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
			extraOptions: {
				runtimeChunkPrefix: "federation-runtime-", // instead of __federation_fn_import
			},
		}),
	],
	build: {
		target: "esnext",
		outDir: "dist",
		minify: false,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				chunkFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
	},
});
