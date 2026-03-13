import { DatabaseZap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonStore } from "../app/providers/pokemon.provider.tsx";
import type { Pokemon } from "../services/models/pokemon.model.ts";

export const useGetPokemonList = () => {
	const [pokemonListData, setPokemonListData] = useState<Pokemon[]>([]);
	const store = usePokemonStore();
	const { getPokemonList } = store || {};
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchingRef = useRef(false);

	const getPokemon = useCallback(async () => {
		setLoading(true);

		try {
			const data = await getPokemonList();
			setPokemonListData(data);
		} catch (_err) {
			console.log(_err);
			setError("Failed to fetch Pokémon.");
		} finally {
			setLoading(false);
		}
	}, [getPokemonList]);

	useEffect(() => {
		getPokemon();
	}, [getPokemonList]);

	return { pokemonListData, loading, error };
};

export default function Home() {
	const [featuredPokemon, setFeaturedPokemon] = useState();
	const { pokemonListData, loading, error } = useGetPokemonList();
	const navigate = useNavigate();

	// Fetch random featured Pokémon
	useEffect(() => {
		const fetchRandomPokemon = async () => {
			console.log(pokemonListData);
			if (!pokemonListData || !pokemonListData.length) return;

			// Pick a random Pokémon from your existing list
			const randomIndex =
				Math.floor(Math.random() * pokemonListData.length) + 1;
			const pokemon = pokemonListData[randomIndex];
			console.log(pokemonListData, randomIndex, pokemon);
			if (!pokemon) {
				return;
			}
			const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

			// If your pokemon object doesn't have image, fetch official artwork
			console.log(image);
			setFeaturedPokemon({
				...pokemon,
				image,
			});
		};

		fetchRandomPokemon();
	}, [pokemonListData]);

	const openFeaturedPokemon = () => navigate(`pokemon/${featuredPokemon.name}`);
	const openQuiz = () => navigate("pokemon/pokemon-quiz");
	const openPokemonList = () => navigate("pokemon");

	return (
		<div className="p-4 max-w-6xl mx-auto">
			<header className="text-center mb-12" data-purpose="hero-header">
				<h1 className="text-4xl md:text-6xl font-extrabold text-black drop-shadow-md tracking-tight">
					Pokémon Hub
				</h1>
				<p className="text-black/80 mt-4 text-lg md:text-xl font-medium">
					Catch 'em all, test your knowledge, and explore the Dex.
				</p>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
				{featuredPokemon && (
					<div
						className="rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition
                 bg-linear-to-br from-yellow-400 to-yellow-600 text-white md:h-64"
						onClick={openFeaturedPokemon}
					>
						<h2 className="text-xl font-bold mb-2">Featured Pokémon</h2>
						<img
							src={featuredPokemon.image}
							alt={featuredPokemon.name}
							loading="lazy"
							className="w-32 h-32 object-contain mb-2"
						/>
						<p className="font-semibold capitalize">{featuredPokemon.name}</p>
					</div>
				)}

				{/* Pokémon Quiz */}
				<div
					className="rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition
                 bg-linear-to-br from-red-500 to-red-700 text-white md:h-64"
					onClick={openQuiz}
				>
					<h2 className="text-xl font-bold mb-2">Pokémon Quiz</h2>
					<img
						src="https://cdn-icons-png.flaticon.com/512/188/188987.png"
						alt="Quiz"
						className="w-24 h-24 object-contain mb-2"
					/>

					<p className="text-center">Test your knowledge!</p>
				</div>

				{/* Pokémon List */}
				<div
					className="rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition
                 bg-linear-to-br from-blue-500 to-blue-700 text-white md:col-span-2 md:h-48"
					onClick={openPokemonList}
				>
					<h2 className="text-xl font-bold mb-2">Pokémon List</h2>
					{/* <img
						src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png"
						alt="List"
						className="w-24 h-24 object-contain mb-2"
					/> */}
					<DatabaseZap className="w-24 h-24" />
					<p className="text-center">Explore all Pokémon</p>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className="p-4">
	// 		<h1 className="text-3xl font-bold text-center mb-6">PokéFunverse</h1>

	// 		<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
	// 			{featuredPokemon && (
	// 				<div
	// 					className="bg-yellow-400 p-4 rounded-lg cursor-pointer hover:scale-105 transition"
	// 					onClick={openFeaturedPokemon}
	// 				>
	// 					<h3 className="font-bold text-lg mb-2 text-center">
	// 						Pokémon of the Day
	// 					</h3>
	// 					<img
	// 						src={featuredPokemon.image}
	// 						alt={featuredPokemon.name}
	// 						className="w-full h-40 object-contain mb-2"
	// 					/>
	// 					<p className="text-center font-semibold">
	// 						{featuredPokemon.name.toUpperCase()}
	// 					</p>
	// 				</div>
	// 			)}

	// 			<div
	// 				className="bg-red-400 p-4 rounded-lg cursor-pointer hover:scale-105 transition flex flex-col justify-center items-center"
	// 				onClick={openQuiz}
	// 			>
	// 				<h3 className="font-bold text-lg mb-2 text-center">Pokémon Quiz</h3>
	// 				<p className="text-center">Test your knowledge!</p>
	// 			</div>

	// 			<div
	// 				className="bg-blue-400 p-4 rounded-lg cursor-pointer hover:scale-105 transition flex flex-col justify-center items-center"
	// 				onClick={openPokemonList}
	// 			>
	// 				<h3 className="font-bold text-lg mb-2 text-center">Pokémon List</h3>
	// 				<p className="text-center">Explore all Pokémon</p>
	// 			</div>
	// 		</section>
	// 	</div>
	// );

	// const categories = [
	// 	{
	// 		title: "Pokémon",
	// 		description: "Catch 'em all!",
	// 		link: "/pokemon",
	// 	},
	// 	{
	// 		title: "Dogs",
	// 		description: "Random dog pics",
	// 		link: "/dogs",
	// 	},
	// 	{
	// 		title: "Cats",
	// 		description: "Fun cat facts",
	// 		link: "/cats",
	// 	},
	// 	{
	// 		title: "Jokes",
	// 		description: "Random jokes",
	// 		link: "/jokes",
	// 	},
	// ];
	// return (
	// 	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
	// 		{categories.map((cat) => (
	// 			<CategoryCard key={cat.title} {...cat} />
	// 		))}
	// 	</div>
	// );
}
