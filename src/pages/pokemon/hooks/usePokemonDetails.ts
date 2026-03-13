import { get } from "lodash";
import { useEffect, useState } from "react";
import { usePokemonStore } from "../../../app/providers/pokemon.provider.tsx";

// helper function used only inside this hook
const extractEnglishGenus = (genera: any[]) => {
	return genera
		.filter((lang) => lang.language.name === "en")
		.map((item) => item.genus)[0];
};

export const usePokemonDetails = (pokemonName: string | undefined) => {
	const [details, setDetails] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [silhouette, setSilhouette] = useState<string>();
	const store = usePokemonStore();
	const {
		getPokemon,
		getEvolutionChain,
		getPokemonSpecies,
		getPokemonTypeByUrl,
	} = store || {};

	useEffect(() => {
		if (
			!pokemonName ||
			!getPokemon ||
			!getEvolutionChain ||
			!getPokemonSpecies ||
			!getPokemonTypeByUrl
		)
			return;

		const fetchDetails = async () => {
			setLoading(true);
			try {
				// parallel fetch of pokemon and species data
				const [pokemonData, speciesData] = await Promise.all([
					getPokemon(pokemonName),
					getPokemonSpecies(pokemonName),
				]);
				console.log("pokemonData", pokemonData);
				setSilhouette(pokemonData?.image);

				// fetch type details for all pokemon types
				const typeUrls = pokemonData?.types?.map((t: any) => t.url) || [];
				const weakness =
					typeUrls.length > 0 ? await getPokemonTypeByUrl(typeUrls) : null;

				// then fetch evolution chain
				const { evolutionChain } = await getEvolutionChain(
					pokemonName,
					get(speciesData, "evolution_chain.url"),
				);
				console.log("evolutionChain", evolutionChain);

				// extract category from species data
				const category = extractEnglishGenus(get(speciesData, "genera", []));

				// combine all data
				setDetails({
					...pokemonData,
					speciesData,
					evolutionChain,
					category,
					weakness,
				});
			} catch (err) {
				setError("Failed to fetch Pokémon details.");
				console.error(err);
			} finally {
				setTimeout(() => setLoading(false), 1000);
				// setLoading(false);
			}
		};

		fetchDetails();
	}, [
		pokemonName,
		getPokemon,
		getEvolutionChain,
		getPokemonSpecies,
		getPokemonTypeByUrl,
	]);

	return { details, loading, error, silhouette };
};
