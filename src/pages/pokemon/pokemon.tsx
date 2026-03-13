// Pokemon.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pokemon as PokemonModel } from "../../app/models/pokemon.model.tsx";
import { usePokemonStore } from "../../app/providers/pokemon.provider.js";
import { fetchPokemonDetails } from "../../app/services/pokemon.service.tsx";
import PokemonList from "../../components/PokemonCardList.js";

export default function Pokemon() {
	const [pokemonList, setPokemonList] = useState<PokemonModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [offset, setOffset] = useState<number>(0);
	const fetchingRef = useRef(false);
	const LIMIT = 2000;

	const { getPokemonList } = usePokemonStore();

	const getPokemon = useCallback(async () => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		setLoading(true);

		try {
			const data = await getPokemonList(LIMIT, offset);
			setPokemonList(data);
		} catch (_err) {
			setError("Failed to fetch Pokémon.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	}, [offset, getPokemonList]);

	const fetchDetailsForVisiblePokemon = useCallback(
		async (visiblePokemon: PokemonModel[]) => {
			const pokemonToFetch = visiblePokemon.filter((p) => !p.types);

			if (pokemonToFetch.length === 0) return;

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
		});
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
