import {
	fetchPokemonDataByName,
	fetchPokemonDataEvolutionChainByUrl,
	fetchPokemonDataList,
	fetchPokemonDataSpecies,
} from "./pokemon-data.service";

export const fetchPokemonList = async (limit = 20, offset = 0) => {
	try {
		const { data } = await fetchPokemonDataList(limit, offset);

		// Fetch details for each Pokémon in parallel
		const detailedList = await Promise.all(
			data.results.map((p) => fetchPokemonDetails(p.name)),
		);
		// Filter out any failed fetches (null)
		return detailedList.filter(Boolean).map((p) => p.name);
	} catch (err) {
		console.error("Failed to fetch Pokémon list:", err);
		return [];
	}
};

export const fetchPokemonDetails = async (name) => {
	try {
		const { data } = await fetchPokemonDataByName(name);
		return {
			...data,
			types: data.types.map((t) => t.type.name),
			image: data.sprites.other["official-artwork"].front_default,
		}; // return the full data along with the URL
	} catch (err) {
		console.error("Failed to fetch Pokémon detail:", err);
		return null;
	}
};

export const fetchFullEvolutionChain = async (pokemonName) => {
	try {
		// 1️⃣ Get the species info
		const { data: species } = await fetchPokemonDataSpecies(pokemonName);
		// 2️⃣ Get the evolution chain
		const { data: evolutionData } = await fetchPokemonDataEvolutionChainByUrl(
			species.evolution_chain.url,
		);

		const chainArray = [];

		// 3️⃣ Recursive function to traverse chain
		const traverseChain = (chainNode) => {
			chainArray.push({ name: chainNode.species.name }); // add this species
			if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
				chainNode.evolves_to.forEach((next) => traverseChain(next));
			}
		};

		traverseChain(evolutionData.chain); // start traversal with the root of the chain

		return { chainArray, color: species.color.name }; // return the full chain as an array of names along with the color
	} catch (err) {
		console.error("Failed to fetch full evolution chain:", err);
		return [];
	}
};
