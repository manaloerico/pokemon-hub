// PokemonCell.jsx

import PokemonCard from "./PokemonCard";
export default function PokemonCell({ pokemonList,columnIndex,rowIndex, style,columnCount ,onPokemonClick}) {
const index = rowIndex * columnCount + columnIndex;
    const item = pokemonList[index];
    if (!item) return null;

    return (
      <div style={style} className="p-2">
        <PokemonCard pokemon={item} onPokemonClick={onPokemonClick} />
      </div>
    );
}

 