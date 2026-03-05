// PokemonHeroOverlay.tsx
import React from "react";

type PokemonHeroOverlayProps = {
	children: React.ReactNode;
	accent: string;
};

const PokemonHeroOverlay: React.FC<PokemonHeroOverlayProps> = ({
	children,
	accent,
}) => {
	return (
		<>
			{/* <div
				className={`absolute -top-32 -left-32 w-100 h-100 
            ${accent} rounded-full blur-3xl opacity-20 animate-blob pointer-events-none`}
			/>
			<div
				className={`absolute -bottom-32 -right-32 w-100 h-100 
            ${accent} rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none`}
			/> */}
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
