import {
	fetchPokemonDataByName,
	fetchPokemonDataEvolutionChainByUrl,
	fetchPokemonDataList,
	fetchPokemonDataSpecies,
	fetchPokemonDataTypeByUrl,
} from "./pokemon-data.service.js";

import { get } from "lodash";

export const fetchPokemonList = async (limit = 20, offset = 0) => {
	try {
		const { data } = await fetchPokemonDataList(limit, offset);

		return data.results;
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
			types: data.types.map((t) => t.type),
			image: data.sprites.other["official-artwork"].front_default,
		};
	} catch (err) {
		console.error("Failed to fetch Pokémon detail:", err);
		return null;
	}
};

export const fetchPokemonSpecies = async (name) => {
	try {
		const { data } = await fetchPokemonDataSpecies(name);
		return data;
	} catch (err) {
		console.error("Failed to fetch Pokémon species:", err);
		return null;
	}
};

export const fetchFullEvolutionChain = async (
	pokemonName,
	url,
): Promise<Record<string, any>> => {
	try {
		const { data: evolutionData } =
			await fetchPokemonDataEvolutionChainByUrl(url);

		const chainArray: Record<string, string>[] = [];

		// 3️⃣ Recursive function to traverse chain
		const traverseChain = (chainNode) => {
			chainArray.push({ name: get(chainNode, "species.name") }); // add this species
			if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
				chainNode.evolves_to.forEach((next) => traverseChain(next));
			}
		};

		traverseChain(evolutionData.chain); // start traversal with the root of the chain
		return chainArray; // return the full chain as an array of names along with the color
	} catch (err) {
		console.error("Failed to fetch full evolution chain:", err);
		return [];
	}
};

export const fetchPokemonTypeByUrl = async (typeUrl: string[]) => {
	if (!typeUrl.length) {
		return;
	}
	const weaknesses: string[] = [];

	for (const type of typeUrl) {
		const { data } = await fetchPokemonDataTypeByUrl(type);
		const doubleDamageFrom = get(
			data,
			"damage_relations.double_damage_from",
			[],
		);

		doubleDamageFrom?.forEach((t: any) => {
			weaknesses.push(t.name);
		});
	}

	return [...new Set(weaknesses)];
};
