import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoaderComponent } from "../../../components/loader/loader.tsx";
import { PokemonHeroDetails } from "../components/pokemon-hero-details/pokemon-hero-details.tsx";
import { typeTheme } from "../components/pokemon-hero/index.ts";
import PokemonHeroOverlay from "../components/pokemon-overlay/pokemon-overlay.tsx";
import "./pokemon-details.scss";

// hooks
import { usePokemonDetails } from "../hooks/usePokemonDetails.ts";
import { usePokemonNavigation } from "../hooks/usePokemonNavigation.ts";

// ============ HELPER FUNCTIONS ============
const getThemeByType = (pokemonTypes: any[]) => {
	const mainType = pokemonTypes?.[0]?.name as string | undefined;
	return typeTheme[mainType || "electric"]; // fallback to "electric"
};

// ============ COMPONENT ============
export default function PokemonDetail() {
	const { pokemon } = useParams<{ pokemon: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	// get pokemon from router state (comes from list), fallback to param
	const { pokemon: pokemonFromState } = location.state || {};
	const currentPokemon = pokemonFromState || pokemon;

	// extract pokemon name correctly whether it's a state object or param string
	const pokemonName =
		typeof currentPokemon === "string" ? currentPokemon : currentPokemon?.name;

	// fetch pokemon details and navigation in parallel
	const {
		details: pokemonDetails,
		loading,
		error,
		silhouette,
	} = usePokemonDetails(pokemonName);
	const { prev, next } = usePokemonNavigation(pokemonName);
	// get theme based on main type
	const theme = getThemeByType(pokemonDetails?.types);
	const navigateTo = (navigateToPokemon) => {
		navigate(`/pokemon/${navigateToPokemon}`);
	};
	// guard against loading/missing data
	if (!pokemonName) {
		return (
			<section className="min-h-[calc(100vh-var(--header-h))] flex items-center justify-center">
				<div className="text-lg text-gray-600">Pokémon not found</div>
			</section>
		);
	}

	console.log("silhouette", silhouette);

	if (loading || !pokemonDetails) {
		return <LoaderComponent image={silhouette} />;
	}

	if (error && !pokemonDetails) {
		return (
			<section className="min-h-[calc(100vh-var(--header-h))] flex items-center justify-center">
				<div className="text-lg text-red-600">{error}</div>
			</section>
		);
	}

	return (
		<section
			className={`font-display ${theme.light} dark:${theme.dark}  min-h-screen flex items-center justify-center p-4 md:p-10 relative overflow-hidden transition-colors duration-500`}
		>
			<PokemonHeroOverlay>
				{prev && (
					<div
						className={`hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-2 group cursor-pointer text-${theme.base}-800 dark:text-${theme.base}-100 opacity-60 hover:opacity-100 transition-all`}
						onClick={() => navigateTo(prev.name)}
					>
						<span className="material-symbols-outlined text-4xl">
							<ChevronLeft />
						</span>
						<div className="text-center">
							<p className="text-xs font-bold uppercase tracking-widest">{`#${String(prev.id).padStart(4, "0")}`}</p>
							<p className="text-sm capitalize">{prev.name}</p>
						</div>
					</div>
				)}
				{next && (
					<div
						className={`hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-2 group cursor-pointer text-${theme.base}-800 dark:text-${theme.base}-100 opacity-60 hover:opacity-100 transition-all`}
						onClick={() => navigateTo(next.name)}
					>
						<span className="material-symbols-outlined text-4xl">
							<ChevronRight />
						</span>
						<div className="text-center">
							<p className="text-xs font-bold uppercase tracking-widest">{`#${String(next.id).padStart(4, "0")}`}</p>
							<p className="text-sm capitalize">{next.name}</p>
						</div>
					</div>
				)}
				<div className="glass-panel w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 p-6 md:p-10 flex flex-col gap-8 transition-all duration-300">
					<PokemonHeroDetails
						id={pokemonDetails?.id}
						name={pokemonDetails?.name}
						image={
							pokemonDetails?.sprites?.other?.["official-artwork"]
								?.front_default
						}
						shinyImage={
							pokemonDetails?.sprites?.other?.["official-artwork"]?.front_shiny
						}
						types={pokemonDetails?.types}
						height={pokemonDetails?.height / 10}
						weight={pokemonDetails?.weight / 10}
						baseExperience={pokemonDetails?.base_experience}
						onBack={() => navigate("/pokemon")}
						pokemonDetails={pokemonDetails}
						theme={theme}
					/>
				</div>
				<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
					<div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-green-300 dark:bg-green-900 rounded-full filter blur-[120px] opacity-20 dark:opacity-10 mix-blend-multiply"></div>
					<div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-emerald-200 dark:bg-emerald-800 rounded-full filter blur-[120px] opacity-20 dark:opacity-10 mix-blend-multiply"></div>
				</div>{" "}
			</PokemonHeroOverlay>
		</section>
	);
}
