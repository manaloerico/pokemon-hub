import { Route, Routes } from "react-router-dom";
import { PokemonProvider } from "../app/providers/pokemon.provider.tsx";
import Home from "./Home.tsx";
import PokemonDetail from "./pokemon/pokemon-details/pokemon-details.tsx";
import Pokemon from "./pokemon/pokemon-list/pokemon.tsx";
import PokemonQuizPage from "./pokemon/pokemon-quiz/pokemon-quiz-page.tsx";
import PokemonLayout from "./pokemon/PokemonLayout.tsx";

function RoutesPage() {
	return (
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
	);
}

export default RoutesPage;
