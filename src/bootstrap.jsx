import ReactDOM from "react-dom/client";
import RemoteRoutes from "./remote.routes";
const mount = (el) => {
	const root = ReactDOM.createRoot(el);
	root.render(<RemoteRoutes />);
};

export { mount };
