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
				"./App": "./src/bootstrap.jsx", // bootstrap exposes mount function
			},
			shared: ["react", "react-dom"],
			base: "./", // <-- ensures dynamic federation chunks load relative to URL
		}),
	],
	build: {
		target: "esnext",
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith(".css")) {
						return "assets/remote.css";
					}
					return "assets/[name].[ext]";
				},
			},
		},
	},
});
