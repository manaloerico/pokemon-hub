import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "/", // <-- root path for Vercel
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "pokemonHub",
			filename: "remoteEntry.js",
			exposes: {
				"./Routes": "./src/bootstrap.jsx", // bootstrap exposes mount function
			},
			shared: ["react", "react-dom"],
			base: "./", // <-- ensures dynamic federation chunks load relative to URL
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
