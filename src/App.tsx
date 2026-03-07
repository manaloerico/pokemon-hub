import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.js";
import PokemonDetail from "./pages/pokemon/pokemon-details/pokemon-details.js";
import PokemonQuizPage from "./pages/pokemon/pokemon-quiz/pokemon-quiz-page.tsx";
import Pokemon from "./pages/pokemon/pokemon.js";
import PokemonLayout from "./pages/pokemon/PokemonLayout.js";
import { PokemonStoreProvider } from "./services/apis/pokemon/context/PokemonStore.js";
//import Dogs from "./pages/dogs/dogs";
//import Cats from "./pages/cats/cats";
//import Jokes from "./pages/jokes/jokes";
function App() {
	const basename = process.env.NODE_ENV === "production" ? "/pokemon-hub" : "/";
	return (
		<HashRouter>
			<Header />
			<main>
				<Routes>
					<Route
						path="/"
						element={
							<PokemonStoreProvider>
								<Home />
							</PokemonStoreProvider>
						}
					/>

					{/* Pokémon routes wrapped with context */}
					<Route
						path="/pokemon/*"
						element={
							<PokemonStoreProvider>
								<PokemonLayout />
							</PokemonStoreProvider>
						}
					>
						<Route index element={<Pokemon />} />
						<Route path=":pokemon" element={<PokemonDetail />} />

						<Route path="pokemon-quiz" element={<PokemonQuizPage />} />
					</Route>
				</Routes>
			</main>
			<footer className="bg-gray-800 text-white p-4 text-center">
				&copy; 2026 My Website. All rights reserved.
			</footer>
		</HashRouter>
	);
}

export default App;
