import { get } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "react-window";
import type { Pokemon } from "../services/models/pokemon.model.ts";
import PokemonCell from "./PokemonCell.js";
interface PokemonListProps {
	pokemonList?: Pokemon[];
	fetchMore?: () => Promise<void>;
	onPokemonClick: (pokemon: Pokemon) => void;
	onVisiblePokemonChange?: (visiblePokemon: Pokemon[]) => void;
}

const ITEMS_PER_PAGE = 20;
const LOAD_MORE_THRESHOLD = 2;
export default function PokemonList({
	pokemonList = [],
	fetchMore,
	onPokemonClick,
	onVisiblePokemonChange,
}: PokemonListProps) {
	const loadingRef = useRef(false);
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

	const [windowWidth, setWindowWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(500);
	const wrapperRef = useCallback((el: HTMLDivElement | null) => {
		if (!el) return;

		const observer = new ResizeObserver(() => {
			const element = get(el, "parentElement");
			setWindowWidth(element.clientWidth);
			setContainerHeight(element.clientHeight);
		});
		observer.observe(el);

		return () => observer.disconnect();
	}, []);
	const getColumnCount = (windowWidth) => {
		if (windowWidth >= 1024) return 5;
		if (windowWidth >= 640) return 4;
		return 2;
	};

	const columnCount = getColumnCount(windowWidth);
	const rowHeight = 250;
	const columnWidth = Math.floor(windowWidth / columnCount - 3);

	// Only display the first `displayCount` items
	const displayedPokemon = pokemonList.slice(0, displayCount);
	const rowCount = Math.ceil(displayedPokemon.length / columnCount);

	// Notify parent when visible Pokemon change
	useEffect(() => {
		if (onVisiblePokemonChange && displayedPokemon.length > 0) {
			onVisiblePokemonChange(displayedPokemon);
		}
	}, [displayedPokemon, onVisiblePokemonChange]);

	return (
		<div
			className="w-full h-[calc(100vh-(var(--header-h)+var(--footer-h)))] bg-sky-50"
			ref={wrapperRef}
		>
			<Grid
				columnCount={columnCount}
				columnWidth={columnWidth}
				height={containerHeight}
				rowCount={rowCount}
				rowHeight={rowHeight}
				width={windowWidth}
				cellComponent={PokemonCell}
				cellProps={{
					pokemonList: displayedPokemon,
					columnCount,
					onPokemonClick,
				}} // pass additional props
				onCellsRendered={({ rowStopIndex }) => {
					if (
						rowStopIndex >= rowCount - 1 - LOAD_MORE_THRESHOLD &&
						displayCount < pokemonList.length &&
						!loadingRef.current
					) {
						loadingRef.current = true;
						setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
						loadingRef.current = false;
					}
				}}
			></Grid>
		</div>
	);
}
