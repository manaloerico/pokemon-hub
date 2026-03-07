import { ArrowLeft, EyeOff, Heart, Moon, Sun, Volume2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EvolutionSection } from "../pokemon-evolution/pokemon-evolution.tsx";
import { typeTheme } from "../pokemon-hero/const/pokemon-theme.model.tsx";
import type { PokemonHeroProps } from "../pokemon-hero/model/pokemon-hero.model.js";
import { InfoItem } from "../pokemon-info-item/pokemon-info-item.tsx";
import { PokemonStats } from "../pokemon-stats/pokemon-stats.tsx";
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
	onBack,
}: PokemonHeroProps) => {
	const [isShiny, setIsShiny] = useState(false);
	const displayImage = isShiny && shinyImage ? shinyImage : image;
	const navigate = useNavigate();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	console.log(types);

	// Guard against null pokemonDetails
	if (!pokemonDetails) {
		return (
			<div className="p-4 text-center text-gray-600">
				Loading Pokémon details...
			</div>
		);
	}
	const playCry = () => {
		audioRef.current?.play();
	};
	return (
		<>
			<div
				className="flex justify-between items-center"
				data-theme={theme.base}
			>
				<button
					className={`flex items-center gap-2 text-${theme.base}-800 dark:text-${theme.base}-100 font-medium hover:translate-x-[-4px] transition-transform cursor-pointer`}
					onClick={() => onBack()}
				>
					<span className="material-symbols-outlined">
						<ArrowLeft />
					</span>
					Pokedex
				</button>
				<div className="flex gap-4">
					<button
						className={`w-10 h-10 rounded-full inner-glass flex items-center justify-center text-${theme.base}-900 dark:text-${theme.base}-50 cursor-pointer`}
						onClick={() => document.documentElement.classList.toggle("dark")}
					>
						<span className="material-symbols-outlined dark:hidden">
							<Moon />
						</span>
						<span className="material-symbols-outlined hidden dark:block">
							<Sun />
						</span>
					</button>
					<button
						className={`w-10 h-10 rounded-full inner-glass flex items-center justify-center text-${theme.base}-900 dark:text-${theme.base}-50`}
					>
						<span className="material-symbols-outlined">
							<Heart />
						</span>
					</button>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 gap-10 items-start">
				<div className="flex flex-col items-center lg:items-start">
					<div className="mb-4 text-center lg:text-left">
						<div className="flex items-baseline gap-3 mb-1 flex-wrap">
							<h1
								className={`text-5xl font-extrabold text-${theme.base}-950 dark:text-white capitalize`}
							>
								{name}
							</h1>
							<span
								className={`text-2xl font-bold text-${theme.base}-700/50 dark:text-${theme.base}-400/50`}
							>
								{`#${String(id).padStart(4, "0")}`}
							</span>
						</div>
						<span
							className={`capitalize ${theme.badge} px-4 py-1 rounded-full text-white text-sm font-bold shadow-lg shadow-primary/20`}
						>
							{types?.map((a) => a.name).join(" / ")}
						</span>
					</div>
					<div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
						<div
							className={`absolute inset-0 ${theme.accent}/20 blur-[80px] rounded-full`}
						></div>
						<img
							src={image}
							alt={name}
							className="relative z-10 w-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
						/>
					</div>
					<EvolutionSection
						chain={pokemonDetails?.evolutionChain}
						currentId={pokemonDetails?.id}
						theme={theme}
					/>
				</div>
				<div className="flex flex-col gap-6">
					<div
						className={`flex gap-6 border-b border-${theme.base}-900/10 dark:border-white/10 pb-2 overflow-x-auto no-scrollbar`}
					>
						<button
							className={`text-${theme.base}-950 dark:text-white font-bold border-b-2 border-primary pb-2 whitespace-nowrap cursor-pointer`}
						>
							About
						</button>
						{/* <button
							className={`cursor-pointer text-${theme.base}-900/50 dark:text-white/50 font-medium hover:text-${theme.base}-700 transition-colors pb-2 whitespace-nowrap`}
						>
							Base Stats
						</button>
						<button
							className={`cursor-pointer text-${theme.base}-900/50 dark:text-white/50 font-medium hover:text-${theme.base}-700 transition-colors pb-2 whitespace-nowrap`}
						>
							Evolution
						</button>
						<button
							className={`cursor-pointer text-${theme.base}-900/50 dark:text-white/50 font-medium hover:text-${theme.base}-700 transition-colors pb-2 whitespace-nowrap`}
						>
							Moves
						</button> */}
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
						<InfoItem
							label={"Height"}
							value={`${height || "0"} m`}
							theme={theme}
						/>
						<InfoItem
							label={"Weight"}
							value={`${weight || "0"} kg`}
							theme={theme}
						/>
						<InfoItem
							label={"Category"}
							value={pokemonDetails?.category
								?.split(" ")
								.slice(0, -1)
								.join(" ")}
							theme={theme}
						/>

						<div className="flex flex-col gap-2 col-span-2 md:col-span-3">
							<span
								className={`text-xs font-bold text-${theme.base}-700 dark:text-${theme.base}-400 uppercase tracking-widest`}
							>
								Abilities
							</span>
							<div className="flex gap-2">
								{pokemonDetails?.abilities?.map((abilities) => (
									<span
										key={abilities.ability.name}
										className={`px-3 py-1 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold text-${theme.base}-900 dark:text-${theme.base}-100 border border-white/20`}
									>
										{abilities.ability.name.replace("-", " ")}
										{abilities.is_hidden && (
											<EyeOff className=" inline ml-1" size={15} />
										)}
									</span>
								))}
								{/* <span className="px-3 py-1 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold text-green-900 dark:text-green-100 border border-white/20">
									Overgrow
								</span>
								<span className="px-3 py-1 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold text-green-900 dark:text-green-100 border border-white/20">
									Chlorophyll (Hidden)
								</span> */}
							</div>
						</div>
					</div>
					<div className="inner-glass p-6 md:p-8 rounded-[2.5rem] flex flex-col gap-6">
						<PokemonStats stats={pokemonDetails?.stats} theme={theme} />
						{/* <h3 className="text-sm font-bold text-green-900 dark:text-green-200 uppercase tracking-widest">
							Base Stats
						</h3>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									HP
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-green-500 rounded-full w-[45%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									45
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									ATK
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-red-500 rounded-full w-[49%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									49
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									DEF
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-blue-500 rounded-full w-[49%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									49
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									SP ATK
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-cyan-400 rounded-full w-[65%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									65
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									SP DEF
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-purple-500 rounded-full w-[65%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									65
								</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="w-16 text-xs font-bold text-green-700 dark:text-green-400 uppercase">
									SPD
								</span>
								<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
									<div className="h-full bg-orange-400 rounded-full w-[45%]"></div>
								</div>
								<span className="w-8 text-right text-xs font-bold text-green-950 dark:text-white">
									45
								</span>
							</div>
						</div> */}
						<div className="pt-4 flex flex-col gap-4">
							<span
								className={`text-xs font-bold text-${theme.base}-700 dark:text-${theme.base}-400 uppercase tracking-widest`}
							>
								Weaknesses
							</span>
							<div className="flex flex-wrap gap-2">
								{pokemonDetails?.weakness?.map((weakness) => (
									<span
										className={` capitalize px-4 py-1.5 ${typeTheme[weakness].badge} text-white rounded-full text-xs font-bold shadow-md shadow-orange-500/20`}
									>
										{weakness}
									</span>
								))}
								{/* <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs font-bold shadow-md shadow-orange-500/20">
									Fire
								</span>
								<span className="px-4 py-1.5 bg-cyan-400 text-white rounded-full text-xs font-bold shadow-md shadow-cyan-400/20">
									Ice
								</span>
								<span className="px-4 py-1.5 bg-blue-300 text-white rounded-full text-xs font-bold shadow-md shadow-blue-300/20">
									Flying
								</span>
								<span className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-xs font-bold shadow-md shadow-pink-500/20">
									Psychic
								</span> */}
							</div>
						</div>
						<button
							onClick={playCry}
							className="cursor-pointer mt-4 w-full py-4 rounded-2xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-all flex items-center justify-center gap-2 group"
						>
							<span className="material-symbols-outlined text-green-800 dark:text-white group-hover:scale-110 transition-transform">
								<Volume2Icon />
							</span>
							<span className="text-green-950 dark:text-white font-bold text-sm ">
								Listen to Cry
							</span>
							<audio ref={audioRef}>
								<source src={pokemonDetails?.cries?.latest} type="audio/ogg" />
							</audio>
						</button>
					</div>
				</div>
			</div>
			{/* <div className=" relative flex flex-col gap-6"> 

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
			</div> */}
		</>
	);
};
