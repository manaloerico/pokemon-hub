import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonTypes from "../../../../components/pokemon-types/pokemon-types.js";
import { EvolutionSection } from "../pokemon-evolution/pokemon-evolution.js";
import type { PokemonHeroProps } from "../pokemon-hero/model/pokemon-hero.model.js";
import { MovesTab } from "../pokemon-moves-tab/pokemon-moves-tab.js";
import { PokemonOverview } from "../pokemon-overview-tab/pokemon-overview-tab.js";
import { PokemonTabs } from "../pokemon-tabs/pokemon-tabs.js";
export const PokemonHeroDetails = ({
	id,
	name,
	image,
	shinyImage,
	types,
	height,
	weight,
	baseExperience,
	onNext,
	onPrev,
	pokemonDetails,
	evolutionChain,
	theme,
}: PokemonHeroProps) => {
	const [isShiny, setIsShiny] = useState(false);
	const displayImage = isShiny && shinyImage ? shinyImage : image;
	const navigate = useNavigate();

	return (
		<>
			{onPrev && (
				<div
					className="flex items-right flex-col space-x-2 cursor-pointer"
					onClick={onPrev}
				>
					<div className="flex items-center flex-row gap-1 font-bold mr-0">
						<button
							onClick={onPrev}
							className="absolute left-0 md:-left-16 bg-white/30 backdrop-blur p-3 rounded-full hover:scale-110 transition"
						>
							<ChevronLeft className="text-white" />
						</button>
						{/* <h5 className="text-xl">#000{prev.id}</h5> */}
					</div>
					{/* <h6 className="text-xs  capitalize text-right">{prev.name}</h6> */}
				</div>
			)}
			{onNext && (
				<div
					className="flex items-right flex-col space-x-2 cursor-pointer"
					onClick={onNext}
				>
					<div className="flex items-center flex-row gap-1 font-bold mr-0">
						{/* <h5 className="text-xl">#000{next.id}</h5> */}
						<button
							onClick={onNext}
							className="absolute right-0 md:-right-16 bg-white/30 backdrop-blur p-3 rounded-full hover:scale-110 transition"
						>
							<ChevronRight className="text-white" />
						</button>
					</div>
					{/* <h6 className="text-xs  capitalize text-left">{next.name}</h6> */}
				</div>
			)}
			<div className=" relative flex flex-col gap-6">
				{/* Background Glow */}

				<div className="flex flex-row gap-6  justify-between">
					<div className="flex flex-col gap-6 text-center self-center  w-full">
						<button
							onClick={() => navigate("/pokemon")}
							className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-1 px-4 rounded-lg transition-colors cursor-pointer self-start"
						>
							Explore More Pokémon
						</button>
						<div className="grid grid-cols-[380px_1fr] gap-10 ">
							<div className="flex flex-col gap-6 flex-1">
								<PokemonTabs>
									{(active) => {
										if (active === "moves")
											return <MovesTab moves={pokemonDetails.moves} />;

										return (
											<>
												<PokemonOverview
													pokemon={pokemonDetails}
													species={pokemonDetails?.speciesData}
													theme={theme}
													stats={pokemonDetails.stats}
												/>
											</>
										);
									}}
								</PokemonTabs>
							</div>
							<div className="flex flex-col gap-2 flex-1">
								<h1 className="text-4xl font-bold capitalize text-left">
									{name}
								</h1>
								<div className="pokemon-details__types">
									<PokemonTypes types={types || []} />
								</div>
								<div className="relative align-items-center flex justify-center">
									<div
										className={`absolute w-[250px] h-[250px] rounded-full blur-3xl opacity-30 ${theme.accent} top-10 left-auto `}
									/>
									<img src={image} alt={name} className="w-100 h-100" />
								</div>
								<EvolutionSection
									chain={pokemonDetails?.evolutionChain}
									currentId={id}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-row gap-6"></div>
			</div>
		</>
	);
};
