// PokemonHeroOverlay.tsx
import React from "react";

type PokemonHeroOverlayProps = {
	children: React.ReactNode;
	accent?: string;
};

const PokemonHeroOverlay: React.FC<PokemonHeroOverlayProps> = ({
	children,
}) => {
	return (
		<>
			<div className="absolute top-[-10%] left-[-10%] w-96 h-96 opacity-10 dark:opacity-5">
				<svg className="text-primary" fill="currentColor" viewBox="0 0 100 100">
					<path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 10c20.3 0 37.1 15.1 39.7 34.6H66.4c-2.3-7.5-9.2-13.1-17.4-13.1s-15.1 5.6-17.4 13.1H10.3C12.9 25.1 29.7 10 50 10zm0 80C29.7 90 12.9 74.9 10.3 55.4h28.7c2.3 7.5 9.2 13.1 17.4 13.1s15.1-5.6 17.4-13.1h28.7C87.1 74.9 70.3 90 50 90z"></path>
					<circle cx="50" cy="50" r="7.5"></circle>
				</svg>
			</div>
			<div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] opacity-10 dark:opacity-5">
				<svg
					className="text-primary "
					fill="currentColor"
					viewBox="0 0 100 100"
				>
					<path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 10c20.3 0 37.1 15.1 39.7 34.6H66.4c-2.3-7.5-9.2-13.1-17.4-13.1s-15.1 5.6-17.4 13.1H10.3C12.9 25.1 29.7 10 50 10zm0 80C29.7 90 12.9 74.9 10.3 55.4h28.7c2.3 7.5 9.2 13.1 17.4 13.1s15.1-5.6 17.4-13.1h28.7C87.1 74.9 70.3 90 50 90z"></path>
					<circle cx="50" cy="50" r="7.5"></circle>
				</svg>
			</div>
			<div
				className="absolute inset-0 pointer-events-none 
              bg-[radial-gradient(circle,white_3px,transparent_3px)]
              bg-size-[24px_24px]
              mix-blend-overlay opacity-10"
			/>
			{children}
		</>
	);
};

export default PokemonHeroOverlay;
