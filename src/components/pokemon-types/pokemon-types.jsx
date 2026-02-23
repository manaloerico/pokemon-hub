import { typeColors } from "../../const/typeColors";
import "./pokemon-types.scss";

export default function PokemonTypes({ types = [] }) {
	return (
		<div className="pokemon__types-badge space-x-2 mb-3">
			{types.map((type) => (
				<span
					key={type}
					className={`${typeColors[type] || "bg-gray-400"} text-white text-xs font-semibold px-2 py-1 rounded-full`}
				>
					{type}
				</span>
			))}
		</div>
	);
}
