import { ChevronsRightIcon } from "lucide-react";

interface Pokemon {
	id: number;
	name: string;
	image?: string;
}

interface EvolutionSectionProps {
	chain?: Pokemon[];
	currentId?: number;
	theme: Record<string, string>;
}

export const EvolutionSection = ({
	chain,
	theme,
	currentId,
}: EvolutionSectionProps) => {
	return (
		<div className="w-full mt-8 inner-glass p-6 rounded-3xl">
			<h3
				className={`text-sm font-bold text-${theme.base}-900 dark:text-${theme.base}-200 mb-6 uppercase tracking-wider`}
			>
				Evolution Chain
			</h3>
			<div className="flex flex-wrap items-center justify-between gap-2">
				{chain?.map((pokemon: Pokemon, index) => {
					const borderClass =
						pokemon?.id === currentId
							? `border-3 border-${theme.base}-500`
							: "border border-white/40";
					const imageContainerClass = `w-16 h-16 rounded-2xl bg-white/30 dark:bg-white/10 flex items-center justify-center p-2 ${borderClass}`;

					return (
						<>
							<div className="flex flex-col items-center gap-2">
								<div className={imageContainerClass}>
									<img
										src={pokemon.image}
										alt={pokemon.name}
										className="w-full"
									/>
								</div>
								<span
									className={`text-[10px] font-bold text-${theme.base}-900 dark:text-${theme.base}-300`}
								>
									{`#${String(pokemon.id).padStart(4, "0")}`}
								</span>
							</div>
							{index < chain.length - 1 && (
								<div
									className={`flex-1 h-px bg-${theme.base}-900/10 dark:bg-white/10 relative`}
								>
									<span
										className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 material-symbols-outlined text-${theme.base}-600/30 text-xs`}
									>
										<ChevronsRightIcon />
									</span>
								</div>
							)}{" "}
						</>
					);
				})}
			</div>
		</div>
	);
};
