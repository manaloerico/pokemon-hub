import axios from "axios";

export const fetchPokemonDataList = (limit = 20, offset = 0) =>
	axios.get(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
	);

export const fetchPokemonDataByName = (name) =>
	axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

export const fetchPokemonDataSpecies = (name) =>
	axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

export const fetchPokemonDataEvolutionChainByUrl = (url) => axios.get(url);

export const fetchPokemonDataTypeByUrl = (url) => axios.get(url);
