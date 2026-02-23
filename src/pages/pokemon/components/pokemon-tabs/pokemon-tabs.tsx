import { useState } from "react";

const tabs = ["overview", "stats", "evolution", "moves"];

export const PokemonTabs = ({ children }) => {
	const [active, setActive] = useState("overview");

	return (
		<div className="bg-white rounded-t-3xl -mt-10 relative z-20 shadow-xl">
			<div className="flex justify-center gap-8 border-b">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActive(tab)}
						className={`px-6 py-4 font-semibold capitalize border-b-2 transition
              ${
								active === tab
									? "border-black text-black"
									: "border-transparent text-gray-400 hover:text-black"
							}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="p-8">{children(active)}</div>
		</div>
	);
};
