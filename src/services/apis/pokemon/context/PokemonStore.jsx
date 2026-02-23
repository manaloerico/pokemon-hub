import { createContext, useContext, useRef, useState } from "react";

import {
	fetchFullEvolutionChain,
	fetchPokemonDetails,
	fetchPokemonList,
} from "../pokemon.service";
const PokemonStoreContext = createContext();

export const PokemonStoreProvider = ({ children }) => {
	const pokemonCache = useRef(new Map());
	const [pokemonListInStore, setPokemonListInStore] = useState([]);

	const getPokemon = async (name) => {
		if (pokemonCache.current.has(name)) {
			return pokemonCache.current.get(name);
		}

		const data = await fetchPokemonDetails(name);

		pokemonCache.current.set(name, data);

		return data;
	};

	const getEvolutionChain = async (name) => {
		const { chainArray, color } = await fetchFullEvolutionChain(name);

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
			}}
		>
			{children}
		</PokemonStoreContext.Provider>
	);
};

export const usePokemonStore = () => useContext(PokemonStoreContext);
