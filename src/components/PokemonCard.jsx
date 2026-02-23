import PokemonTypes from "./pokemon-types/pokemon-types";
export default function PokemonCard({ pokemon, onPokemonClick }) {
	const pokemonId = pokemon.id;
	const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
	return (
		<div
			onClick={() => onPokemonClick(pokemon)}
			key={pokemon.name}
			className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center capitalize  transition-transform transform hover:scale-105 cursor-pointer"
		>
			<img
				src={img}
				alt={pokemon.name}
				className="w-30 h-30 mx-auto mb-2"
				loading="lazy"
			/>{" "}
			<h2 className="capitalize font-bold text-gray-900 text-lg mb-2">
				{pokemon.name}
			</h2>
			{/* Type Badges */}
			<PokemonTypes types={pokemon.types} />
		</div>
	);
}
