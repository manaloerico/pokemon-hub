import "./loader.scss";

interface LoaderProps {
	children?: any;
	image?: string | undefined;
}

export const LoaderComponent = ({ children, image }: LoaderProps) => (
	// <section className="min-h-[calc(100vh-var(--header-h))] flex items-center justify-center">

	// 	<div className="relative w-16 h-16   animate-bounce">
	// 		<div className="absolute top-0 w-full h-1/2 bg-red-500 rounded-t-full border-4 border-black"></div>

	// 		<div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-4 border-black"></div>

	// 		<div className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2"></div>

	// 		<div className="absolute w-5 h-5 bg-white border-4 border-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
	// 	</div>
	// </section>

	// <div className="flex items-center justify-center h-40 perspective-1000">
	// 	<div className="relative w-20 h-20 animate-pokeball-spin">

	// 		<div className="absolute top-0 w-full h-1/2 bg-red-500 rounded-t-full border-4 border-black"></div>

	// 		<div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-4 border-black"></div>

	// 		<div className="absolute top-1/2 w-full h-[4px] bg-black -translate-y-1/2"></div>
	// <div className="absolute w-6 h-6 bg-white border-4 border-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
	// 	</div>
	// </div>

	// <div className="flex items-center justify-center h-48">
	// 	<div className="relative w-40 h-40 rounded-full border-4 border-green-500 overflow-hidden">

	// 		<div className="absolute inset-0 animate-radar-scan">
	// 			<div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
	// 		</div>

	// 		<div className="absolute inset-0 border border-green-500 rounded-full opacity-40"></div>
	// 		<div className="absolute inset-4 border border-green-500 rounded-full opacity-40"></div>
	// 		<div className="absolute inset-8 border border-green-500 rounded-full opacity-40"></div>

	// 		<div className="absolute w-3 h-3 bg-green-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
	// 	</div>
	// </div>

	// <p className="text-green-400 text-center mt-4 animate-pulse">
	// 	Scanning Pokémon...
	// </p>

	<div className="min-h-[calc(100vh-var(--header-h))]  flex flex-col items-center justify-center gap-4 h-60">
		<div className="relative w-80 h-80 mx-auto">
			<img
				src={image}
				className="w-full h-full object-contain brightness-0 animate-pulse"
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-scan"></div>
		</div>

		<p className="font-bold text-lg tracking-wider animate-pulse">
			Who’s that Pokémon?
		</p>
	</div>
);
