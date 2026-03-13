import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import PokemonRoutes from "./pokemon.routes.tsx";

export function mount(el: HTMLElement) {
	const root = ReactDOM.createRoot(el);
	root.render(
		<HashRouter>
			<PokemonRoutes />
		</HashRouter>,
	);
}
