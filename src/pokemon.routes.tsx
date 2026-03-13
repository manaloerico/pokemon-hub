import { Route, Routes } from "react-router-dom";
import { PokemonProvider } from "./app/providers/pokemon.provider.tsx";

import Home from "./pages/Home.js";
import PokemonDetail from "./pages/pokemon/pokemon-details/pokemon-details.js";
import PokemonQuizPage from "./pages/pokemon/pokemon-quiz/pokemon-quiz-page.tsx";
import Pokemon from "./pages/pokemon/pokemon.js";
import PokemonLayout from "./pages/pokemon/PokemonLayout.js";

export default function PokemonRoutes() {
	return (
		<main>
			<Routes>
				<Route
					path="/"
					element={
						<PokemonProvider>
							<Home />
						</PokemonProvider>
					}
				/>

				<Route
					path="/pokemon/*"
					element={
						<PokemonProvider>
							<PokemonLayout />
						</PokemonProvider>
					}
				>
					<Route index element={<Pokemon />} />
					<Route path=":pokemon" element={<PokemonDetail />} />
					<Route path="pokemon-quiz" element={<PokemonQuizPage />} />
				</Route>
			</Routes>
		</main>
	);
}
