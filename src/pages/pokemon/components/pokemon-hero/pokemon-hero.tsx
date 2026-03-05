import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { typeTheme } from "./const/pokemon-theme.model.js";
import type { PokemonHeroProps } from "./model/pokemon-hero.model.js";

export const PokemonHero = ({
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
}: PokemonHeroProps) => {
	const mainType = types[0] || "electric";
	const theme = typeTheme[mainType] || typeTheme["electric"];

	const [isShiny, setIsShiny] = useState(false);

	const displayImage = isShiny && shinyImage ? shinyImage : image;

	return (
		<section
			className={`relative bg-linear-to-br ${theme.gradient} min-h-[85vh] flex items-center overflow-hidden`}
		>
			{/* Background Glow */}
			<div
				className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 ${theme.accent} top-10 left-10`}
			/>

			<div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center w-full relative z-10">
				{/* LEFT SIDE */}
				<div className="relative flex justify-center">
					{/* Previous Button */}
					{onPrev && (
						<button
							onClick={onPrev}
							className="absolute left-0 md:-left-16 bg-white/30 backdrop-blur p-3 rounded-full hover:scale-110 transition"
						>
							<ChevronLeft className="text-white" />
						</button>
					)}

					{/* SHINY TOGGLE */}
					{shinyImage && (
						<button
							onClick={() => setIsShiny((prev) => !prev)}
							className={`absolute top-6 right-6 px-4 py-2 rounded-full 
            backdrop-blur bg-white/30 text-white text-sm font-medium
            flex items-center gap-2 transition
            ${isShiny ? "ring-2 ring-yellow-300" : ""}`}
						>
							<Sparkles size={16} />
							{isShiny ? "Shiny" : "Normal"}
						</button>
					)}

					{/* <img
						src={image}
						alt={name}
						className="w-80 md:w-[420px] drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
					/> */}

					<img
						src={displayImage}
						className="transition duration-500 ease-in-out 
                   animate-[float_4s_ease-in-out_infinite]"
					/>

					{/* Next Button */}
					{onNext && (
						<button
							onClick={onNext}
							className="absolute right-0 md:-right-16 bg-white/30 backdrop-blur p-3 rounded-full hover:scale-110 transition"
						>
							<ChevronRight className="text-white" />
						</button>
					)}
				</div>

				{/* RIGHT SIDE */}
				<div className="text-white">
					<p className="text-lg font-semibold opacity-70">
						#{id.toString().padStart(3, "0")}
					</p>

					<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-2 capitalize">
						{name}
					</h1>

					<div className="flex gap-3 mt-6">
						{types.map((type) => (
							<span
								key={type}
								className="px-4 py-1 rounded-full bg-white/30 backdrop-blur text-sm font-medium capitalize"
							>
								{type}
							</span>
						))}
					</div>

					<div className="flex gap-10 mt-8 text-white/90">
						<div>
							<p className="text-xs uppercase opacity-70">Height</p>
							<p className="font-semibold">{height} m</p>
						</div>

						<div>
							<p className="text-xs uppercase opacity-70">Weight</p>
							<p className="font-semibold">{weight} kg</p>
						</div>

						{baseExperience && (
							<div>
								<p className="text-xs uppercase opacity-70">Base XP</p>
								<p className="font-semibold">{baseExperience}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
