export const PokemonStats = ({ stats }) => {
	return (
		<div className="space-y-5 max-w-2xl mx-auto">
			{stats.map((stat) => {
				const percent = (stat.base_stat / 150) * 100;

				return (
					<div key={stat.stat.name}>
						<div className="flex justify-between text-sm font-semibold">
							<span>{stat.stat.name.toUpperCase()}</span>
							<span>{stat.base_stat}</span>
						</div>

						<div className="h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
							<div
								className="h-full bg-gradient-to-r from-indigo-400 to-blue-500 transition-all duration-700"
								style={{ width: `${percent}%` }}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
