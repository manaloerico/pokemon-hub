import { HashRouter } from "react-router-dom";
import ShadowWrapper from "./components/shadow-wrapper/shadow-wrapper.tsx";
import styles from "./index.css?inline";
import RoutesPage from "./pages/routes.tsx";
function RemoteRoutes() {
	return (
		<ShadowWrapper styles={styles}>
			<HashRouter>
				<RoutesPage />
			</HashRouter>
		</ShadowWrapper>
	);
}

export default RemoteRoutes;
