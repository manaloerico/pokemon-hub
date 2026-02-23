export type PokemonHeroProps = {
	id: number;
	name: string;
	image: string;
	types: string[];
	height: number;
	weight: number;
	baseExperience?: number;

	onNext?: () => void;
	onPrev?: () => void;
};
