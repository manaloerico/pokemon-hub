import { HashRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import "./index.css";
import RoutesPage from "./pages/routes.tsx";
function App() {
	return (
		<HashRouter>
			<Header />
			<main>
				<RoutesPage />
			</main>
			{/* <Routes>
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
				</Routes> */}
			<footer className="bg-gray-800 text-white p-4 text-center">
				&copy; 2026 My Website. All rights reserved.
			</footer>
		</HashRouter>
	);
}

export default App;
