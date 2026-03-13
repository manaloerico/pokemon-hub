import { get } from "lodash";
import {
	fetchPokemonDataByName,
	fetchPokemonDataEvolutionChainByUrl,
	fetchPokemonDataList,
	fetchPokemonDataSpecies,
	fetchPokemonDataTypeByUrl,
} from "../api/pokemon.api.tsx";

export const fetchPokemonList = async (limit = 20, offset = 0) => {
	try {
		const cached = localStorage.getItem("pokemons");

		if (cached) return JSON.parse(cached);

		const { data } = await fetchPokemonDataList(limit, offset);

		localStorage.setItem("pokemons", JSON.stringify(data.results));

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

		const traverseChain = (chainNode) => {
			if (!chainNode) return;

			chainArray.push({ name: get(chainNode, "species.name") }); // add this species
			const evolvesTo = get(chainNode, "evolves_to");
			if (evolvesTo && evolvesTo.length > 0) {
				evolvesTo.forEach((next) => traverseChain(next));
			}
		};

		traverseChain(evolutionData.chain);
		return chainArray;
	} catch (err) {
		console.error("Failed to fetch full evolution chain:", err);
		return [];
	}
};

export const fetchPokemonWeakness = async (typeUrl: string[]) => {
	if (!typeUrl.length) {
		return;
	}
	const weaknesses: string[] = [];

	for (const type of typeUrl) {
		const data = await fetchPokemonTypeByUrl(type);
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

export const fetchPokemonTypeByUrl = async (type: string) => {
	try {
		const { data } = await fetchPokemonDataTypeByUrl(type);

		return data;
	} catch (err) {
		console.error("Failed to fetch PokemonType:", err);
		return {};
	}
};
