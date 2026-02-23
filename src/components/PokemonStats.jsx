import { statColors } from "../const/StatsColors";
export default function PokemonStats({ stats }) {
	return (
		<div className="w-full mt-2 space-y-1">
			{stats?.map(({ stat, base_stat }) => (
				<div key={stat.name} className="flex items-center space-x-2">
					<span className="capitalize w-50 text-sm font-semibold">
						{stat.name}
					</span>
					<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
						<div
							className={`${statColors[stat.name] || "bg-gray-400"} h-3 rounded-full transition-all duration-500`}
							style={{ width: `${(base_stat / 150) * 100}%` }}
						></div>
					</div>
					<span className="w-8 text-sm text-right font-bold">{base_stat}%</span>
				</div>
			))}
		</div>
	);
}
