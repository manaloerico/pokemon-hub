export const MovesTab = ({ moves }) => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{moves.slice(0, 12).map((move) => (
				<div
					key={move.move.name}
					className="bg-gray-100 rounded-xl p-3 text-sm font-medium capitalize hover:bg-gray-200 transition"
				>
					{move.move.name.replace("-", " ")}
				</div>
			))}
		</div>
	);
};
