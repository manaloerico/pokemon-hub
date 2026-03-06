import { statColors, statName } from "../../../../const/StatsColors.js";

export const PokemonStats = ({ stats, theme }) => {
	return (
		<>
			<h3
				className={`text-sm font-bold text-${theme.base}-900 dark:text-${theme.base}-200 uppercase tracking-widest`}
			>
				Base Stats
			</h3>
			<div className="space-y-4">
				{stats?.map(({ stat, base_stat }) => (
					<div key={stat.name} className="flex items-center gap-4">
						<span
							className={`w-16 text-xs font-bold text-${theme.base}-700 dark:text-${theme.base}-400 uppercase`}
						>
							{`${statName[stat.name] || stat.name}`}
						</span>

						<div className="flex-1 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
							<div
								className={`h-full ${statColors[stat.name] || "bg-gray-400"} rounded-full`}
								style={{ width: `${(base_stat / 150) * 100}%` }}
							></div>
						</div>
						<span
							className={`w-8 text-right text-xs font-bold text-${theme.base}-950 dark:text-white`}
						>
							{base_stat}
						</span>
					</div>
				))}
			</div>
		</>
	);
};
