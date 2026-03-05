export const InfoItem = ({ label, value }) => (
	<div className="bg-white rounded-2xl p-2 shadow-md text-center  transition hover:scale-105">
		<p className="text-gray-400 uppercase text-xs">{label}</p>
		<p className="font-semibold capitalize">{value}</p>
	</div>
);
