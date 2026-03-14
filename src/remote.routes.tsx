import { HashRouter } from "react-router-dom";
import { ShadowRoot } from "react-shadow";
import "./index.css";
import RoutesPage from "./pages/routes.tsx";
function RemoteRoutes() {
	return (
		<ShadowRoot>
			<HashRouter>
				<RoutesPage />
			</HashRouter>
		</ShadowRoot>
	);
}

export default RemoteRoutes;
