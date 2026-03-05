export type PokemonHeroProps = {
	id: number;
	name: string;
	image: string;
	types: string[];
	height: number;
	weight: number;
	baseExperience?: number;
	shinyImage: string;
	pokemonDetails: any; // detailed shape varies
	onNext?: () => void;
	onPrev?: () => void;
	theme: Record<string, string>;
	evolutionChain: any;
};
