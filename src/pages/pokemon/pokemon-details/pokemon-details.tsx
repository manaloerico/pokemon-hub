import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePokemonStore } from "../../../services/apis/pokemon/context/PokemonStore.tsx";
import { PokemonHeroDetails } from "../components/pokemon-hero-details/pokemon-hero-details.tsx";
import { typeTheme } from "../components/pokemon-hero/index.ts";
import PokemonHeroOverlay from "../components/pokemon-overlay/pokemon-overlay.tsx";
export default function PokemonDetail() {
	const { pokemon } = useParams<{ pokemon: string }>();
	const location = useLocation();
	const navigate = useNavigate();
	const { pokemon: pokemonData } = (location.state as any) || {};

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const fetchingRef = useRef(false);
	const [pokemonDetails, setPokemonDetails] = useState<any>(
		pokemonData || null,
	);
	const [prev, setPrev] = useState<any>(null);
	const [next, setNext] = useState<any>(null);

	const {
		getPokemon,
		getEvolutionChain,
		getPokemonListInStore,
		getPokemonSpecies,
	} = usePokemonStore();

	const getPokemonDetails = async () => {
		setLoading(true);
		try {
			const data = await getPokemon(pokemonData?.name);
			const speciesData = await getPokemonSpecies(pokemonData?.name);

			setPokemonDetails((prev) => ({ ...prev, ...data, speciesData }));

			const { evolutionChain } = await getEvolutionChain(
				pokemonData?.name,
				speciesData.evolution_chain.url,
			);

			setPokemonDetails((prev) => ({ ...prev, evolutionChain }));
		} catch (_err) {
			setError("Failed to fetch Pokémon details.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	};

	const getPokemonListForReference = async () => {
		setLoading(true);
		try {
			const pokemonListInStore = await getPokemonListInStore();
			const index = pokemonListInStore.findIndex(
				(p: any) => p.name === pokemon,
			);
			if (index === -1) return;

			setPrev(pokemonListInStore[index - 1] || null);
			setNext(pokemonListInStore[index + 1] || null);
		} catch (err) {
			setError("Failed to fetch Pokémon list.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	};

	useEffect(() => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;

		if (!pokemon) {
			navigate("/pokemon");
			return;
		}

		getPokemonListForReference();
		getPokemonDetails();
	}, [pokemonData, pokemon, navigate]);

	const mainType = pokemonDetails?.types?.[0] as string | undefined;
	const theme = typeTheme[mainType || "electric"]; // fallback to "electric"

	return (
		<section
			className={`p-20 pt-10 pb-10 min-h-[92.5vh] flex relative overflow-hidden 
  bg-linear-to-br ${theme?.gradient ?? "from-slate-900 to-slate-800"}`}
		>
			<PokemonHeroOverlay accent={theme?.accent}>
				<div className="w-full relative">
					<div className="rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 p-6 shadow-lg">
						<PokemonHeroDetails
							id={pokemonDetails?.id}
							name={pokemonDetails?.name}
							image={
								pokemonDetails?.sprites?.other?.["official-artwork"]
									?.front_default
							}
							shinyImage={
								pokemonDetails?.sprites?.other?.["official-artwork"]
									?.front_shiny
							}
							types={pokemonDetails?.types}
							height={pokemonDetails?.height / 10}
							weight={pokemonDetails?.weight / 10}
							baseExperience={pokemonDetails?.base_experience}
							onNext={() => navigate("/pokemon")}
							onPrev={() => navigate("/pokemon")}
							pokemonDetails={pokemonDetails}
							theme={theme}
						/>
					</div>
				</div>
			</PokemonHeroOverlay>
		</section>
	);
}
