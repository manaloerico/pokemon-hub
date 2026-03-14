import { HashRouter } from "react-router-dom";
import ShadowWrapper from "./components/shadow-wrapper/shadow-wrapper.tsx";
import RoutesPage from "./pages/routes.tsx";
function RemoteRoutes() {
	return (
		<ShadowWrapper>
			<HashRouter>
				<RoutesPage />
			</HashRouter>
		</ShadowWrapper>
	);
}

export default RemoteRoutes;
