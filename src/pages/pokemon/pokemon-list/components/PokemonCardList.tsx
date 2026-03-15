import { debounce } from "lodash";
import React, { useMemo, useRef, useState } from "react";
import { Grid } from "react-window";
import PokemonCell from "../../../../components/PokemonCell.tsx";
import type { Pokemon } from "../../../../services/models/pokemon.model.ts";
import { createHandleCellsRendered } from "../utils/create-handle-cells-rendered.ts";
import { useContainerSize } from "./hooks/useContainerSize.ts";

interface PokemonListProps {
	pokemonList?: Pokemon[];
	fetchMore?: () => Promise<void>;
	onPokemonClick: (pokemon: Pokemon) => void;
	onVisiblePokemonChange?: (visiblePokemon: Pokemon[]) => void;
}

const ITEMS_PER_PAGE = 20;
const LOAD_MORE_THRESHOLD = 2;
const rowHeight = 250;

export default function PokemonList({
	pokemonList = [],
	onPokemonClick,
	onVisiblePokemonChange,
}: PokemonListProps) {
	const loadingRef = useRef(false);
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
	const lastRangeRef = useRef({ start: -1, end: -1 });
	const lastVisiblePokemonRef = useRef<Pokemon[]>([]);

	const { ref, size } = useContainerSize();

	const columnCount = size.width >= 1024 ? 5 : size.width >= 640 ? 4 : 2;

	const columnWidth = Math.floor(size.width / columnCount);

	const displayedPokemon = pokemonList.slice(0, displayCount);
	const rowCount = Math.ceil(displayedPokemon.length / columnCount);

	const debouncedVisibleChange = useRef(
		debounce((visible: Pokemon[]) => {
			onVisiblePokemonChange?.(visible);
		}, 50),
	).current;

	const Cell = React.memo(PokemonCell) as typeof PokemonCell;
	const handleCellsRendered = useMemo(
		() =>
			createHandleCellsRendered({
				pokemonList,
				displayCount,
				columnCount,
				rowCount,
				lastRangeRef,
				lastVisiblePokemonRef,
				loadingRef,
				setDisplayCount,
				onVisiblePokemonChange: onVisiblePokemonChange ?? (() => {}),
				itemsPerPage: ITEMS_PER_PAGE,
				loadMoreThreshold: LOAD_MORE_THRESHOLD,
				debounced: true,
			}),
		[
			pokemonList,
			displayCount,
			columnCount,
			rowCount,
			lastRangeRef,
			lastVisiblePokemonRef,
			loadingRef,
			setDisplayCount,
			onVisiblePokemonChange,
		],
	);
	return (
		<div className="w-full bg-sky-50" style={{ height: size.height }} ref={ref}>
			<Grid
				columnCount={columnCount}
				columnWidth={columnWidth}
				height={size.height + 100}
				rowCount={rowCount}
				rowHeight={rowHeight}
				width={size.width}
				cellComponent={Cell}
				cellProps={{
					pokemonList: displayedPokemon,
					columnCount,
					onPokemonClick,
				}}
				onCellsRendered={handleCellsRendered}
			/>
		</div>
	);
}
