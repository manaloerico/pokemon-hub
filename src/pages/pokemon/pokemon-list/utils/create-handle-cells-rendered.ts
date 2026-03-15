import { debounce } from "lodash";
import type { Pokemon } from "../../../../../app/models/pokemon.model.tsx";
interface HandleCellsRenderedArgs {
	pokemonList: Pokemon[];
	displayCount: number;
	columnCount: number;
	rowCount: number;
	lastRangeRef: React.MutableRefObject<{ start: number; end: number }>;
	lastVisiblePokemonRef: React.MutableRefObject<Pokemon[]>;
	loadingRef: React.MutableRefObject<boolean>;
	setDisplayCount: React.Dispatch<React.SetStateAction<number>>;
	onVisiblePokemonChange?: (visiblePokemon: Pokemon[]) => void;
	itemsPerPage: number;
	loadMoreThreshold: number;
	debounced?: boolean;
}
export function createHandleCellsRendered({
	pokemonList,
	displayCount,
	columnCount,
	rowCount,
	lastRangeRef,
	lastVisiblePokemonRef,
	loadingRef,
	setDisplayCount,
	onVisiblePokemonChange,
	itemsPerPage,
	loadMoreThreshold,
	debounced = true,
}: HandleCellsRenderedArgs) {
	// optional debounce wrapper
	const invokeVisibleChange = (visible: Pokemon[]) => {
		if (!onVisiblePokemonChange) return;

		if (debounced) {
			debounce(() => onVisiblePokemonChange(visible), 50)();
		} else {
			onVisiblePokemonChange(visible);
		}
	};

	return ({
		rowStartIndex,
		rowStopIndex,
	}: {
		rowStartIndex: number;
		rowStopIndex: number;
	}) => {
		if (!pokemonList.length) return;

		const start = rowStartIndex * columnCount;
		const end = Math.min(
			(rowStopIndex + 1) * columnCount,
			displayCount,
			pokemonList.length,
		);

		// Skip same range
		if (
			lastRangeRef.current.start === start &&
			lastRangeRef.current.end === end
		)
			return;
		lastRangeRef.current = { start, end };

		// Visible Pokémon
		const visiblePokemon = pokemonList.slice(start, end);
		const lastVisible = lastVisiblePokemonRef.current;
		const hasChanged =
			visiblePokemon.length !== lastVisible.length ||
			visiblePokemon.some((p, i) => p !== lastVisible[i]);

		if (hasChanged) {
			lastVisiblePokemonRef.current = visiblePokemon;
			invokeVisibleChange(visiblePokemon);
		}

		// Infinite scroll
		const shouldLoadMore =
			rowStopIndex >= rowCount - loadMoreThreshold &&
			displayCount < pokemonList.length &&
			!loadingRef.current;

		if (shouldLoadMore) {
			loadingRef.current = true;
			setDisplayCount((prev) => prev + itemsPerPage);
			requestAnimationFrame(() => (loadingRef.current = false));
		}
	};
}
