import { useState } from "react";
import "./pokemon-quiz.scss";

import { useEffect } from "react";

type Pokemon = {
	id: number;
	name: string;
	image: string;
};

type Stage = "loading" | "silhouette" | "reveal";

const MAX_POKEMON = 1000;

export default function PokemonQuiz({ pokemonList }) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [options, setOptions] = useState<string[]>([]);
	const [stage, setStage] = useState<Stage>("loading");
	const [selected, setSelected] = useState<string | null>(null);
	const [score, setScore] = useState(0);

	const getRandomId = () => Math.floor(Math.random() * MAX_POKEMON) + 1;

	async function loadQuestion() {
		setStage("loading");
		setSelected(null);

		const id = getRandomId();

		const data = pokemonList.find((a) => parseInt(a.id) === id);
		if (!data) {
			return;
		}
		const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

		const pokemonData = { ...data, image };

		setPokemon(pokemonData);

		const wrongOptions: number[] = [];
		while (wrongOptions.length < 3) {
			const randomId = getRandomId();
			if (randomId !== parseInt(pokemonData.id)) {
				const d = pokemonList.find((a) => parseInt(a.id) === randomId);
				if (d) {
					wrongOptions.push(d.name);
				}
			}
		}

		const shuffled = [...wrongOptions, pokemonData.name].sort(
			() => Math.random() - 0.5,
		);

		setOptions(shuffled);

		setTimeout(() => {
			setStage("silhouette");
		}, 1000);
	}

	useEffect(() => {
		loadQuestion();
	}, []);

	const handleSelect = (option: string) => {
		if (!pokemon) return;

		setSelected(option);
		setStage("reveal");

		if (option === pokemon.name) {
			setScore((s) => s + 1);
		}

		// play pokemon cry
		const cry = new Audio(
			`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`,
		);
		cry.play();
	};

	if (!pokemon) return null;

	return (
		<div className="@container">
			<div className="flex flex-col items-center gap-6  mt-6">
				<h2 className="text-xl font-bold">Score: {score}</h2>

				{/* Pokemon image */}
				<div className="relative mx-auto">
					<img
						src={pokemon.image}
						className={`w-44 h-44 object-contain transition-all duration-700
          ${
						stage === "loading"
							? "blur-xl brightness-75"
							: stage === "silhouette"
								? "brightness-0 contrast-200"
								: "brightness-100 blur-0"
					}`}
					/>

					{stage === "silhouette" && (
						<div className="absolute inset-0 overflow-hidden">
							<div className="w-full h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-scan" />
						</div>
					)}
				</div>

				<p className="font-bold text-lg">Who's that Pokémon?</p>

				{/* options */}
				<div className="grid grid-cols-2 gap-3 w-65 mx-auto">
					{options.map((opt) => {
						let style =
							"border rounded-lg p-2 transition capitalize cursor-pointer ";

						if (stage === "reveal") {
							if (opt === pokemon.name) style += " bg-green-200";
							else if (opt === selected) style += " bg-red-200";
						} else {
							style += " hover:bg-black/10";
						}

						return (
							<button
								key={opt}
								onClick={() => handleSelect(opt)}
								disabled={stage !== "silhouette"}
								className={style}
							>
								{opt}
							</button>
						);
					})}
				</div>

				{stage === "reveal" && (
					<button
						onClick={loadQuestion}
						className="px-4 py-2 bg-yellow-400 rounded font-semibold"
					>
						Next Pokémon
					</button>
				)}
			</div>
		</div>
	);
}
