import { useState } from "react";

const tabs = ["overview", "moves"];

export const PokemonTabs = ({ children }) => {
	const [active, setActive] = useState("overview");

	return (
		<div className=" relative z-20">
			<div className="flex justify-start gap-1">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActive(tab)}
						className={`px-4 py-2 font-semibold uppercase border-b-2 transition  cursor-pointer text-black/80
              ${
								active === tab
									? "border-yellow-300"
									: "border-transparent  hover:border-b-yellow-300"
							}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="p-8 px-0">{children(active)}</div>
		</div>
	);
};
