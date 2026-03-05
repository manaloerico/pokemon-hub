interface Pokemon {
	id: number;
	name: string;
	image?: string;
}

interface EvolutionSectionProps {
	chain?: Pokemon[];
	currentId?: number;
}

export const EvolutionSection = ({
	chain,
	currentId,
}: EvolutionSectionProps) => {
	console.log("evolution chain", chain);
	return (
		<div className="flex gap-6 overflow-x-auto py-2 justify-center">
			{chain?.map((pokemon: Pokemon) => (
				<div
					key={pokemon.id}
					className={`bg-white rounded-2xl p-2 shadow-md text-center  transition
            ${
							pokemon.id === currentId
								? "ring-4 ring-yellow-400 scale-105"
								: "hover:scale-105"
						}`}
				>
					<img src={pokemon.image} className="w-20 mx-auto" />
					<p className="mt-3 font-semibold capitalize">{pokemon.name}</p>
				</div>
			))}
		</div>
	);
};
