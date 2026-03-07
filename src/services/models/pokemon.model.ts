export interface Pokemon {
	id: number;
	name: string;
	types?: { name: string; url: string }[];
	url: string;
}
