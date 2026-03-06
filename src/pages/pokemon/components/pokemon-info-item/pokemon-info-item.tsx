export const InfoItem = ({ label, value, theme }) => (
	// <div className="bg-white rounded-2xl p-2 shadow-md text-center  transition hover:scale-105">
	// 	<p className="text-gray-400 uppercase text-xs">{label}</p>
	// 	<p className="font-semibold capitalize">{value}</p>
	// </div>

	<div className="flex flex-col gap-1">
		<span
			className={`text-xs font-bold text-${theme.base}-700 dark:text-${theme.base}-400 uppercase tracking-widest`}
		>
			{label}
		</span>
		<p className={`text-lg font-bold text-${theme.base}-950 dark:text-white`}>
			{value}
		</p>
	</div>
);
