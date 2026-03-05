import { EyeOff } from "lucide-react";
import { InfoItem } from "../pokemon-info-item/pokemon-info-item.js";
import { PokemonStats } from "../pokemon-stats/pokemon-stats.js";
type PokemonOverviewProps = {
	pokemon: Record<string, any>;
	species: Record<string, any>;
	typeData?: unknown;
	theme: Record<string, string>;
	stats: unknown;
};

export const PokemonOverview = ({
	pokemon,
	species,
	typeData,
	theme,
	stats,
}: PokemonOverviewProps) => {
	const description = species?.flavor_text_entries
		?.find((entry) => entry.language.name === "en")
		?.flavor_text.replace(/\f/g, " ");

	const abilities = pokemon.abilities;

	const totalStats = pokemon.stats.reduce(
		(acc, stat) => acc + stat.base_stat,
		0,
	);

	return (
		<>
			<div className="space-y-2 max-w-5xl mx-auto">
				<section className=" ">
					<h2 className="text-left text-xl font-bold mb-4 uppercase text-black/80">
						Pokédex Entry
					</h2>
					<p className="text-left text-black/80 leading-relaxed">
						{description}
					</p>
				</section>

				<section className="grid md:grid-cols-2 gap-8">
					<div className="text-black/80">
						<h3 className="font-bold text-lg mb-6 uppercase">Abilities</h3>

						<div className="flex flex-wrap gap-3">
							{abilities.map((ability) => (
								<span
									key={ability.ability.name}
									className={`px-4 py-2 rounded-xl text-sm font-medium capitalize
                ${ability.is_hidden ? "bg-gray-100 text-gray-800" : `${theme.badge}`}`}
								>
									{ability.ability.name.replace("-", " ")}
									{ability.is_hidden && (
										<EyeOff className="text-gray-500 inline ml-1" size={15} />
									)}
								</span>
							))}
						</div>
					</div>

					{/* Total Stats */}
					<div>
						<h3 className="text-lg font-semibold opacity-80">
							Base Stat Total
						</h3>
						<p className="text-5xl font-extrabold mt-3">{totalStats}</p>
					</div>
				</section>

				{/* 📊 Basic Info */}
				<section>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
						<InfoItem label="Height" value={`${pokemon.height / 10} m`} />
						<InfoItem label="Weight" value={`${pokemon.weight / 10} kg`} />
						<InfoItem label="Base XP" value={pokemon.base_experience} />
						<InfoItem label="Capture Rate" value={species?.capture_rate} />
						<InfoItem label="Growth Rate" value={species?.growth_rate?.name} />
						<InfoItem
							label="Habitat"
							value={species?.habitat?.name || "Unknown"}
						/>
					</div>
				</section>
			</div>

			<PokemonStats stats={stats} />
		</>
	);
};
