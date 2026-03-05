// IconButton.tsx
interface IconButtonProps {
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onClick?: () => void;
	size?: "sm" | "md" | "lg";
	color?: string;
	hoverColor?: string;
	className?: string;
}

export default function IconButton({
	icon: Icon,
	onClick,
	size = "md", // sm | md | lg
	color = "text-gray-700",
	hoverColor = "hover:text-gray-900 cursor-pointer",
	className = "",
}: IconButtonProps) {
	// Tailwind padding based on size
	const sizeClasses = {
		sm: "p-1 h-6 w-6",
		md: "p-2 h-8 w-8",
		lg: "p-3 h-10 w-10",
	};

	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center rounded-full transition ${color} ${hoverColor} ${sizeClasses[size]} ${className}`}
		>
			{Icon && <Icon className="h-full w-full" />}
		</button>
	);
}
