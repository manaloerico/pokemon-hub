import PokemonTypes from "./pokemon-types/pokemon-types.js";

interface Pokemon {
	id?: number;
	name: string;
	image?: string;
	types?: string[];
}

interface EvolutionChainProps {
	evolutionChain?: Pokemon[];
}

export default function PokemonEvolutionChain({
	evolutionChain,
}: EvolutionChainProps) {
	if (!evolutionChain) return;

	return (
		<div className="bg-white p-4 rounded-xl shadow text-center capitalize">
			<h3 className="text-lg font-bold mb-4">Evolution Chain</h3>
			<div className="flex flex-row justify-center gap-4">
				{evolutionChain.map((pokemon, index) => (
					<div key={index} className="bg-gray-100 p-2 rounded-lg">
						<img
							src={pokemon.image}
							alt={pokemon.name}
							className="w-20 h-20 mx-auto mb-2"
						/>
						{pokemon.name}

						<PokemonTypes types={pokemon?.types || []} />
					</div>
				))}
			</div>
		</div>
	);
}
