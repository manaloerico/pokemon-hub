// Pokemon.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonList from "../../components/PokemonCardList.js";
import { usePokemonStore } from "../../services/apis/pokemon/context/PokemonStore.js";
import { fetchPokemonDetails } from "../../services/apis/pokemon/pokemon.service.js";
import type { Pokemon as PokemonModel } from "../../services/models/pokemon.model.ts";

export default function Pokemon() {
	const [pokemonList, setPokemonList] = useState<PokemonModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [offset, setOffset] = useState<number>(0);
	const fetchingRef = useRef(false);
	const LIMIT = 2000;

	const { getPokemonList, setPokemonListInStore } = usePokemonStore();

	const getPokemon = useCallback(async () => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		setLoading(true);

		try {
			const data = await getPokemonList(LIMIT, offset);
			setPokemonList((prev) => [...prev, ...data]);
			setPokemonListInStore((prev) => [...prev, ...data]);
			setOffset((prev) => prev + LIMIT);
		} catch (_err) {
			console.log(_err);
			setError("Failed to fetch Pokémon.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	}, [offset, getPokemonList, setPokemonListInStore]);

	// Fetch details only for currently displayed Pokemon
	const fetchDetailsForVisiblePokemon = useCallback(
		async (visiblePokemon: PokemonModel[]) => {
			const pokemonToFetch = visiblePokemon.filter((p) => !p.types);

			if (pokemonToFetch.length === 0) return;

			// Batch fetch details for visible Pokemon
			const detailPromises = pokemonToFetch.map(async (pokemon) => {
				try {
					const details = await fetchPokemonDetails(pokemon.name);
					return { name: pokemon.name, types: details?.types || [] };
				} catch (err) {
					console.error(`Failed to load details for ${pokemon.name}:`, err);
					return { name: pokemon.name, types: [] };
				}
			});

			const results = await Promise.all(detailPromises);

			// Update state with all fetched details at once
			setPokemonList((prevList) =>
				prevList.map((pokemon) => {
					const result = results.find((r) => r.name === pokemon.name);
					return result ? { ...pokemon, types: result.types } : pokemon;
				}),
			);
		},
		[],
	);

	useEffect(() => {
		getPokemon();
	}, []);

	const navigate = useNavigate();

	const onPokemonClick = (pokemon) => {
		navigate(`/pokemon/${pokemon.name}`, {
			state: {
				pokemon,
			},
		}); // pass pokemon data in state
	};

	return (
		<>
			{error && <p className="text-red-500 p-6">{error}</p>}
			<PokemonList
				pokemonList={pokemonList}
				fetchMore={getPokemon}
				onPokemonClick={onPokemonClick}
				onVisiblePokemonChange={fetchDetailsForVisiblePokemon}
			/>
			{loading && <p className="text-center p-6">Loading Pokémon...</p>}
		</>
	);
}
