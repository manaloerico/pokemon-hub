import { BrowserRouter } from "react-router-dom";
import "./index.css";
import RoutesPage from "./pages/routes.tsx";

export default function RemoteRoutes() {
	return (
		<BrowserRouter>
			<RoutesPage />
		</BrowserRouter>
	);
}
