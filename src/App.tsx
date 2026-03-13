import { HashRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import PokemonRoutes from "./pokemon.routes.tsx";
//import Dogs from "./pages/dogs/dogs";
//import Cats from "./pages/cats/cats";
//import Jokes from "./pages/jokes/jokes";
function App() {
	const basename = process.env.NODE_ENV === "production" ? "/pokemon-hub" : "/";
	return (
		<HashRouter>
			<Header />
			<PokemonRoutes />
			<footer className="bg-gray-800 text-white p-4 text-center">
				&copy; 2026 My Website. All rights reserved.
			</footer>
		</HashRouter>
	);
}

export default App;
