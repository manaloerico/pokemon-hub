import CategoryCard from "../components/CategoryCard.js";

export default function Home() {
	const categories = [
		{
			title: "Pokémon",
			description: "Catch 'em all!",
			//image: pokemonImg,
			link: "/pokemon",
		},
		{
			title: "Dogs",
			description: "Random dog pics",
			//image: dogImg,
			link: "/dogs",
		},
		{
			title: "Cats",
			description: "Fun cat facts",
			//image: catImg,
			link: "/cats",
		},
		{
			title: "Jokes",
			description: "Random jokes",
			//	image: jokeImg,
			link: "/jokes",
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
			{categories.map((cat) => (
				<CategoryCard key={cat.title} {...cat} />
			))}
		</div>
	);
}
