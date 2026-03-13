import { useCallback, useEffect, useRef, useState } from "react";

import { usePokemonStore } from "../../../app/providers/pokemon.provider.tsx";
import type { Pokemon } from "../../../services/models/pokemon.model.ts";
import PokemonQuiz from "./components/pokemon-quiz.tsx";

export const useGetPokemonList = () => {
	const [pokemonListData, setPokemonListData] = useState<Pokemon[]>([]);
	const store = usePokemonStore();
	const { getPokemonList } = store || {};
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchingRef = useRef(false);

	const getPokemon = useCallback(async () => {
		if (!getPokemonList) return;
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
export default function PokemonQuizPage() {
	const { pokemonListData, loading, error } = useGetPokemonList();
	if (loading || pokemonListData.length === 0) {
		return <div>loading</div>;
	}
	if (error) {
		return <div>{error}</div>;
	}
	return <PokemonQuiz pokemonList={pokemonListData} />;
}
