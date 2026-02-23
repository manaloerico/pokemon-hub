export const EvolutionSection = ({ chain, currentId }) => {
	return (
		<div className="flex gap-8 overflow-x-auto py-6 justify-center">
			{chain?.map((pokemon) => (
				<div
					key={pokemon.id}
					className={`bg-white rounded-2xl p-6 shadow-md text-center w-40 transition
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
