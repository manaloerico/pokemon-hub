import { useEffect, useRef, useState } from "react";
import { Grid } from "react-window"; // use FixedSizeGrid (typing is loose)
import PokemonCell from "./PokemonCell.js";

interface Pokemon {
	id: number;
	name: string;
	types: string[];
}

interface PokemonListProps {
	pokemonList?: Pokemon[];
	fetchMore: () => Promise<void>;
	onPokemonClick: (pokemon: Pokemon) => void;
}

export default function PokemonList({
	pokemonList = [],
	fetchMore,
	onPokemonClick,
}: PokemonListProps) {
	const loadingRef = useRef(false);

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
	const rowCount = Math.ceil(pokemonList.length / columnCount);

	return (
		<div className="w-full h-[92.5vh] bg-sky-50">
			{" "}
			{/* @ts-ignore */}{" "}
			<Grid
				columnCount={columnCount}
				columnWidth={columnWidth}
				height={1200} // fixed height for simplicity
				rowCount={rowCount}
				rowHeight={rowHeight}
				width={windowWidth}
				cellComponent={PokemonCell}
				cellProps={{ pokemonList, columnCount, onPokemonClick }} // pass additional props
				onCellsRendered={({ rowStopIndex }) => {
					if (rowStopIndex >= rowCount - 1 && !loadingRef.current) {
						loadingRef.current = true;
						fetchMore().finally(() => {
							loadingRef.current = false;
						});
					}
				}}
			></Grid>
		</div>
	);
}
