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
			name: "pokedex",
			filename: "remoteEntry.js",
			exposes: {
				"./PokedexApp": "./src/mount.tsx",
			},
			shared: ["react", "react-dom", "react-router-dom"],
			extraOptions: {
				runtimeChunkPrefix: "federation-runtime-", // avoids GH Pages blocking __ files
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
				entryFileNames: "assets/[name]-[hash].js",
				chunkFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
	},
});
