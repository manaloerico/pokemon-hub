import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PokemonEvolutionChain from "../../../components/PokemonEvolutionChain";
import PokemonStats from "../../../components/PokemonStats";
import PokemonTypes from "../../../components/pokemon-types/pokemon-types";
import { IconButton } from "../../../components/ui/components/icon-button";
import { ArrowLeft, ArrowRight } from "../../../components/ui/icons";
import { typeBgColors } from "../../../const/typeColors";
import { usePokemonStore } from "../../../services/apis/pokemon/context/PokemonStore";
import "./pokemon-details.scss";
export default function PokemonDetail() {
	const { pokemon } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { pokemon: pokemonData } = location.state || {};
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const fetchingRef = useRef(false);
	const [pokemonDetails, setPokemonDetails] = useState(pokemonData || null);
	const { getPokemon, getEvolutionChain, getPokemonListInStore } =
		usePokemonStore();

	const [prev, setPrev] = useState(null);
	const [next, setNext] = useState(null);

	const getPokemonDetails = async () => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		setLoading(true);

		try {
			const data = await getPokemon(pokemonData?.name);
			const { evolutionChain, color } = await getEvolutionChain(
				pokemonData?.name,
			);
			console.log("evolutionChain", evolutionChain);
			setPokemonDetails({ ...data, evolutionChain, color });
		} catch (_err) {
			setError("Failed to fetch Pokémon details.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	};

	const getPokemonListForReference = async () => {
		try {
			const pokemonListInStore = await getPokemonListInStore();
			const index = pokemonListInStore.findIndex((p) => p.name === pokemon);
			if (index === -1) return;
			setPrev(pokemonListInStore[index - 1] || null);
			setNext(pokemonListInStore[index + 1] || null);
		} catch (err) {
			setError("Failed to fetch Pokémon details.");
		} finally {
			fetchingRef.current = false;
			setLoading(false);
		}
	};
	useEffect(() => {
		if (!pokemon) {
			navigate("/pokemon");
		}

		getPokemonListForReference();
		getPokemonDetails();
	}, [pokemonData]);

	const handleNavigate = (targetPokemon) => {
		navigate(`/pokemon/${targetPokemon.name}`, {
			state: { ...location.state, pokemon: targetPokemon },
		});
	};
	const [primary, secondary] = pokemonDetails?.types || [];

	const primaryColors = typeBgColors[primary] || ["#ccc", "#999"];
	const secondaryColors = secondary
		? typeBgColors[secondary]
		: ["#ccc", "#999"];

	// Create CSS gradient string
	const backgroundStyle = secondary
		? {
				background: `linear-gradient(to bottom right, ${primaryColors[0]}, ${primaryColors[1]}, ${secondaryColors[0]}, ${secondaryColors[1]})`,
			}
		: {
				background: `linear-gradient(to bottom right, ${primaryColors[0]}, ${primaryColors[1]})`,
			};
	return (
		<div
			className={"pokemon-details p-40 pt-10 pb-10 h-screen"}
			style={backgroundStyle}
		>
			<div className=" flex flex-col gap-6 rounded-xl shadow-md bg-white/90 backdrop-blur-sm  p-6 ">
				<div className="flex flex-row gap-6  justify-between">
					<div className="flex flex-col gap-6 text-center self-center">
						{prev && (
							<div
								className="flex items-right flex-col space-x-2 cursor-pointer"
								onClick={() => handleNavigate(prev)}
							>
								<div className="flex items-center flex-row gap-1 font-bold mr-0">
									<IconButton
										icon={ArrowLeft}
										size="md"
										color="text-red-500"
										className="font-black"
									/>
									<h5 className="text-xl">#000{prev.id}</h5>
								</div>
								<h6 className="text-xs  capitalize text-right">{prev.name}</h6>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-6 text-center self-center">
						<button
							onClick={() => navigate("/pokemon")}
							className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-1 px-4 rounded-lg transition-colors cursor-pointer self-start"
						>
							Explore More Pokémon
						</button>
						<div className="flex flex-row gap-6">
							<div className="flex flex-col gap-6">
								<h1 className="text-4xl font-bold capitalize">{pokemon}</h1>
								<div className="pokemon-details__types">
									<PokemonTypes types={pokemonDetails?.types || []} />
								</div>
								<img
									src={pokemonData?.image}
									alt={pokemon}
									className="w-80 h-80"
								/>
								<PokemonEvolutionChain
									evolutionChain={pokemonDetails?.evolutionChain || null}
								/>
							</div>
							<div className="flex flex-col gap-6">
								<PokemonStats stats={pokemonDetails?.stats || []} />
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-6  text-center self-center">
						{next && (
							<div
								className="flex items-right flex-col space-x-2 cursor-pointer"
								onClick={() => handleNavigate(next)}
							>
								<div className="flex items-center flex-row gap-1 font-bold mr-0">
									<h5 className="text-xl">#000{next.id}</h5>
									<IconButton
										icon={ArrowRight}
										size="md"
										color="text-red-500"
										className="font-black"
									/>
								</div>
								<h6 className="text-xs  capitalize text-left">{next.name}</h6>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-row gap-6"></div>
			</div>

			{/* fetch and show Pokémon details here */}
		</div>
	);
}
