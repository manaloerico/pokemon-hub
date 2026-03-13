import { useEffect, useState } from "react";
import { usePokemonStore } from "../../../app/providers/pokemon.provider.tsx";

export const usePokemonNavigation = (pokemonName: string | undefined) => {
	const [prev, setPrev] = useState<any>(null);
	const [next, setNext] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const store = usePokemonStore();
	const { getPokemonList } = store || {};

	useEffect(() => {
		if (!pokemonName || !getPokemonList) return;

		const fetchNavigation = async () => {
			setLoading(true);
			try {
				const pokemonList = await getPokemonList();
				const currentIndex = pokemonList.findIndex(
					(p: any) => p.name === pokemonName,
				);

				if (currentIndex === -1) {
					setError("Pokémon not found in list.");
					return;
				}

				setPrev(pokemonList[currentIndex - 1] || null);
				setNext(pokemonList[currentIndex + 1] || null);
			} catch (err) {
				setError("Failed to fetch navigation.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchNavigation();
	}, [pokemonName, getPokemonList]);

	return { prev, next, loading, error };
};
