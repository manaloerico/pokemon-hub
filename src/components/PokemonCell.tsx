// PokemonCell.tsx

import type { Pokemon } from "../services/models/pokemon.model.ts";
import PokemonCard from "./PokemonCard.js";

interface PokemonCellProps {
	pokemonList: Pokemon[];
	columnIndex: number;
	rowIndex: number;
	style: React.CSSProperties;
	columnCount: number;
	onPokemonClick: (pokemon: Pokemon) => void;
}

export default function PokemonCell({
	pokemonList,
	columnIndex,
	rowIndex,
	style,
	columnCount,
	onPokemonClick,
}: PokemonCellProps) {
	const index = rowIndex * columnCount + columnIndex;
	const item = pokemonList[index];
	if (!item) return null;

	return (
		<div style={style} className="p-2">
			<PokemonCard pokemon={item} onPokemonClick={onPokemonClick} />
		</div>
	);
}
