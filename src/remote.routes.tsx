import { HashRouter } from "react-router-dom";
import "./index.css";
import RoutesPage from "./pages/routes.tsx";

function RemoteRoutes() {
	return (
		<HashRouter>
			<RoutesPage />
		</HashRouter>
	);
}

export default RemoteRoutes;
