import { createContext, ReactNode, useContext, useRef, useState } from "react";

import {
	fetchFullEvolutionChain,
	fetchPokemonDetails,
	fetchPokemonList,
	fetchPokemonSpecies,
} from "../pokemon.service.js";

interface Pokemon {
	id: number;
	name: string;
	types: string[];
	[key: string]: any;
}

interface EvolutionChainResult {
	evolutionChain: Pokemon[];
	color?: string;
}

interface PokemonStoreContextType {
	getPokemon: (name: string) => Promise<Pokemon | undefined>;
	getEvolutionChain: (
		name: string,
		url: string,
	) => Promise<EvolutionChainResult>;
	getPokemonList: (limit?: number, offset?: number) => Promise<Pokemon[]>;
	getPokemonListInStore: () => Promise<Pokemon[]>;
	setPokemonListInStore: React.Dispatch<React.SetStateAction<Pokemon[]>>;
	getPokemonSpecies: (name: string) => Promise<any>;
}

const PokemonStoreContext = createContext<PokemonStoreContextType | undefined>(
	undefined,
);

export const PokemonStoreProvider = ({ children }: { children: ReactNode }) => {
	const pokemonCache = useRef(new Map());
	const [pokemonListInStore, setPokemonListInStore] = useState([]);
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
		console.log("Getting evolution chain for", name, "with URL:", url);
		const { chainArray, color } = await fetchFullEvolutionChain(name, url);

		const resolvedChain = await Promise.all(
			chainArray.map((p) => getPokemon(p.name)),
		);

		// store everything in cache
		const result = { evolutionChain: resolvedChain, color };
		return result;
	};

	const getPokemonList = async (limit = 20, offset = 0) => {
		const data = await fetchPokemonList(limit, offset);
		return Promise.all(data.map(getPokemon));
	};

	const getPokemonListInStore = async () => {
		if (pokemonListInStore?.length > 0) {
			return pokemonListInStore;
		}
		const list = await getPokemonList();
		setPokemonListInStore(list);
		return list;
	};

	return (
		<PokemonStoreContext.Provider
			value={{
				getPokemon,
				getEvolutionChain,
				getPokemonList,
				getPokemonListInStore,
				setPokemonListInStore,
				getPokemonSpecies,
			}}
		>
			{children}
		</PokemonStoreContext.Provider>
	);
};

export const usePokemonStore = () => useContext(PokemonStoreContext);
