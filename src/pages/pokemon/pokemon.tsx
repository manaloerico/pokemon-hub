// Pokemon.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonList from "../../components/PokemonCardList.js";
import { usePokemonStore } from "../../services/apis/pokemon/context/PokemonStore.js";

interface Pokemon {
	id: number;
	name: string;
	types: string[];
}

export default function Pokemon() {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [offset, setOffset] = useState<number>(0);
	const fetchingRef = useRef(false);
	const LIMIT = 20;

	const { getPokemonList, setPokemonListInStore } = usePokemonStore();
	const getPokemon = useCallback(async () => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		setLoading(true);

		try {
			const data = await getPokemonList(LIMIT, offset);
			const updatedList = (prev) => [...prev, ...data];
			setPokemonList(updatedList);
			setPokemonListInStore(updatedList);
			setOffset((prev) => prev + LIMIT);
		} catch (_err) {
			console.log(_err);
			setError("Failed to fetch Pokémon.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	}, [offset]);

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
			/>
			{loading && <p className="text-center p-6">Loading Pokémon...</p>}
		</>
	);
}
