import type { Pokemon } from "../services/models/pokemon.model.ts";
import PokemonTypes from "./pokemon-types/pokemon-types.js";

interface PokemonCardProps {
	pokemon: Pokemon;
	onPokemonClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({
	pokemon,
	onPokemonClick,
}: PokemonCardProps) {
	const { name, url, types = [], id } = pokemon;
	const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

	return (
		<div
			onClick={() => onPokemonClick(pokemon)}
			key={name}
			className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center capitalize transition-transform transform hover:scale-105 cursor-pointer"
		>
			<img
				src={img}
				alt={name}
				className="w-30 h-30 mx-auto mb-2"
				loading="lazy"
			/>
			<h2 className="capitalize font-bold text-gray-900 text-lg mb-2">
				{name}
			</h2>
			{/* Type Badges or Skeleton Loader */}
			{types.length === 0 ? (
				<div className=" flex flex-wrap justify-center">
					<div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
				</div>
			) : (
				<PokemonTypes types={types} />
			)}
		</div>
	);
}
