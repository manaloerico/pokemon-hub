import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import PokemonDetail from "./pages/pokemon/pokemon-details/pokemon-details.js";
import Pokemon from "./pages/pokemon/pokemon.js";
import PokemonLayout from "./pages/pokemon/PokemonLayout.js";
import { PokemonStoreProvider } from "./services/apis/pokemon/context/PokemonStore.js";
//import Dogs from "./pages/dogs/dogs";
//import Cats from "./pages/cats/cats";
//import Jokes from "./pages/jokes/jokes";
function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />

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
				</Route>
				{/*<Route path="/dogs" element={<Dogs />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/jokes" element={<Jokes />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
