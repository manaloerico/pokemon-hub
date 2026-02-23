import { InfoItem } from "../pokemon-info-item/pokemon-info-item";

export const PokemonOverview = ({ pokemon, species, typeData }) => {
	const description = species?.flavor_text_entries
		?.find((entry) => entry.language.name === "en")
		?.flavor_text.replace(/\f/g, " ");

	const abilities = pokemon.abilities;

	const totalStats = pokemon.stats.reduce(
		(acc, stat) => acc + stat.base_stat,
		0,
	);

	return (
		<div className="space-y-12 max-w-5xl mx-auto">
			{/* 📝 Description */}
			<section className="bg-gray-50 rounded-3xl p-8 shadow-sm">
				<h2 className="text-xl font-bold mb-4">Pokédex Entry</h2>
				<p className="text-gray-600 leading-relaxed">{description}</p>
			</section>

			{/* 🧬 Abilities + Total Power */}
			<section className="grid md:grid-cols-2 gap-8">
				{/* Abilities */}
				<div className="bg-white rounded-3xl p-8 shadow-md">
					<h3 className="font-bold text-lg mb-6">Abilities</h3>

					<div className="flex flex-wrap gap-3">
						{abilities.map((ability) => (
							<span
								key={ability.ability.name}
								className={`px-4 py-2 rounded-xl text-sm font-medium capitalize
                ${
									ability.is_hidden
										? "bg-yellow-100 text-yellow-700"
										: "bg-gray-100"
								}`}
							>
								{ability.ability.name.replace("-", " ")}
								{ability.is_hidden && " (Hidden)"}
							</span>
						))}
					</div>
				</div>

				{/* Total Stats */}
				<div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-3xl p-8 shadow-md flex flex-col justify-center">
					<h3 className="text-lg font-semibold opacity-80">Base Stat Total</h3>
					<p className="text-5xl font-extrabold mt-3">{totalStats}</p>
				</div>
			</section>

			{/* 📊 Basic Info */}
			<section className="bg-white rounded-3xl p-8 shadow-md">
				<h3 className="font-bold text-lg mb-6">Basic Information</h3>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
					<InfoItem label="Height" value={`${pokemon.height / 10} m`} />
					<InfoItem label="Weight" value={`${pokemon.weight / 10} kg`} />
					<InfoItem label="Base XP" value={pokemon.base_experience} />
					<InfoItem label="Capture Rate" value={species.capture_rate} />
					<InfoItem label="Growth Rate" value={species.growth_rate?.name} />
					<InfoItem
						label="Habitat"
						value={species.habitat?.name || "Unknown"}
					/>
				</div>
			</section>
		</div>
	);
};
