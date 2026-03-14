import ReactDOM from "react-dom/client";
import RemoteRoutes from "./remote.routes";

const mount = (el) => {
	const root = ReactDOM.createRoot(el);
	root.render(<RemoteRoutes />);
};

// Auto-mount for standalone
if (!window.__IS_REMOTE_APP__) {
	const devRoot = document.getElementById("root");
	if (devRoot) mount(devRoot);
}

export { mount };
