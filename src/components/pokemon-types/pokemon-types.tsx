import { typeTheme } from "../../pages/pokemon/components/pokemon-hero/index.ts";

interface PokemonTypesProps {
	types?: Record<string, string>[];
}

export default function PokemonTypes({ types = [] }: PokemonTypesProps) {
	return (
		// <div className="pokemon__types-badge space-x-2 mb-3">
		// 	{types.map((type) => (
		// 		<span
		// 			key={type.name}
		// 			className={`${typeColors[type["name"]] || "bg-gray-400"} text-white text-xs font-semibold px-2 py-1 rounded-full`}
		// 		>
		// 			{type.name}
		// 		</span>
		// 	))}
		// </div>
		<div className="gap-1">
			{types.map((type) => (
				<span
					key={type.name}
					className={`${typeTheme[type["name"]].badge || "bg-gray-400"} capitalize px-4 py-1 rounded-full text-white text-sm font-bold shadow-lg shadow-primary/20`}
				>
					{type.name}
				</span>
			))}
		</div>
	);
}
