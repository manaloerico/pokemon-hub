import { createContext, useContext, useRef, useState } from "react";

import type { Pokemon } from "../../../models/pokemon.model.ts";
import {
	fetchFullEvolutionChain,
	fetchPokemonDetails,
	fetchPokemonList,
	fetchPokemonSpecies,
	fetchPokemonTypeByUrl,
} from "../pokemon.service.js";

interface DetailedPokemon extends Pokemon {
	[key: string]: any;
}

interface EvolutionChainResult {
	evolutionChain: Pokemon[];
	color?: string;
}

interface PokemonStoreContextType {
	getPokemon: (name: string) => Promise<DetailedPokemon | undefined>;
	getEvolutionChain: (
		name: string,
		url: string,
	) => Promise<EvolutionChainResult>;
	getPokemonList: (limit?: number, offset?: number) => Promise<Pokemon[]>;
	getPokemonListInStore: () => Promise<Pokemon[]>;
	getPokemonSpecies: (name: string) => Promise<any>;
	getPokemonTypeByUrl: (urls: string[]) => Promise<any>;
}

const PokemonStoreContext = createContext<PokemonStoreContextType | undefined>(
	undefined,
);

export const PokemonStoreProvider = ({ children }: { children }) => {
	const pokemonCache = useRef(new Map());
	const [pokemonListInStore, setPokemonListInStore] = useState<Pokemon[]>([]);
	const [speciesCache, setSpeciesCache] = useState(new Map());

	const getPokemon = async (name) => {
		if (pokemonCache.current.has(name)) {
			return pokemonCache.current.get(name);
		}

		const data = await fetchPokemonDetails(name);

		pokemonCache.current.set(name, data);
		return data;
	};

	const getPokemonSpecies = async (name) => {
		if (speciesCache.has(name)) {
			return speciesCache.get(name);
		}
		const data = await fetchPokemonSpecies(name);
		setSpeciesCache((prev) => new Map(prev.set(name, data)));
		return data;
	};

	const getEvolutionChain = async (name, url) => {
		const chainArray = await fetchFullEvolutionChain(name, url);

		const resolvedChain = await Promise.all(
			chainArray.map((p) => getPokemon(p.name)),
		);
		const result = { evolutionChain: resolvedChain };
		return result;
	};
	const getPokemonList = async (
		limit = 2000,
		offset = 0,
	): Promise<Pokemon[]> => {
		if (pokemonListInStore?.length > 0) {
			return pokemonListInStore;
		}
		const data = await fetchPokemonList(limit, offset);
		const mapToReadableCardList = data.map((d) => {
			const id = d.url.split("/").at(-2);
			return { ...d, id };
		});
		setPokemonListInStore(mapToReadableCardList);
		return mapToReadableCardList;
	};

	const getPokemonListInStore = async () => {
		if (pokemonListInStore?.length > 0) {
			return pokemonListInStore;
		}
		const list = await getPokemonList();
		setPokemonListInStore(list);
		return list;
	};

	const getPokemonTypeByUrl = async (urls: string[]) => {
		const weakness = await fetchPokemonTypeByUrl(urls);
		return weakness;
	};

	return (
		<PokemonStoreContext.Provider
			value={{
				getPokemon,
				getEvolutionChain,
				getPokemonList,
				getPokemonListInStore,
				getPokemonSpecies,
				getPokemonTypeByUrl,
			}}
		>
			{children}
		</PokemonStoreContext.Provider>
	);
};
export const usePokemonStore = () => {
	const context = useContext(PokemonStoreContext);
	if (!context) {
		throw new Error(
			"usePokemonStore must be used within a PokemonStoreProvider",
		);
	}
	return context;
};
