import { Link } from "react-router-dom";

export default function CategoryCard({ title, description, image, link }) {
	return (
		<Link to={link}>
			<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
				<img src={image} alt={title} className="w-32 h-32 mx-auto" />
				<h2 className="text-xl font-bold mt-4 text-center">{title}</h2>
				<p className="text-gray-600 text-center mt-2">{description}</p>
			</div>
		</Link>
	);
}
