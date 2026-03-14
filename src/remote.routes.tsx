import { HashRouter } from "react-router-dom";
import "./index.css";
import RoutesPage from "./pages/routes.tsx";
function RemoteRoutes() {
	return (
		<div className="pokemon-hub">
			<HashRouter>
				<RoutesPage />
			</HashRouter>
		</div>
	);
}

export default RemoteRoutes;
