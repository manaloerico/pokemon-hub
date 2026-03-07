import { useEffect, useRef, useState } from "react";
import { Grid } from "react-window"; // use FixedSizeGrid (typing is loose)
import type { Pokemon } from "../services/models/pokemon.model.ts";
import PokemonCell from "./PokemonCell.js";

interface PokemonListProps {
	pokemonList?: Pokemon[];
	fetchMore?: () => Promise<void>;
	onPokemonClick: (pokemon: Pokemon) => void;
	onVisiblePokemonChange?: (visiblePokemon: Pokemon[]) => void;
}

const ITEMS_PER_PAGE = 20;

export default function PokemonList({
	pokemonList = [],
	fetchMore,
	onPokemonClick,
	onVisiblePokemonChange,
}: PokemonListProps) {
	const loadingRef = useRef(false);
	const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

	// responsive columns based on window width
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const getColumnCount = () => {
		if (windowWidth >= 1024) return 5;
		if (windowWidth >= 640) return 4;
		return 2;
	};

	const columnCount = getColumnCount();
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
		<div className="w-full h-[calc(100vh-(var(--header-h)+var(--footer-h)))] bg-sky-50">
			<Grid
				columnCount={columnCount}
				columnWidth={columnWidth}
				height={1200} // fixed height for simplicity
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
					// Load more when scrolling near the bottom
					if (
						rowStopIndex >= rowCount - 1 &&
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
