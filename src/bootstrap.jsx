import ReactDOM from "react-dom/client";
import App from "./App";

__webpack_public_path__ = window.location.origin + "/pokemon-hub/";
const mount = (el) => {
	const root = ReactDOM.createRoot(el);
	root.render(<App />);
};

// Auto-mount if running standalone (dev or GitHub Pages)
if (!window.__IS_REMOTE_APP__) {
	const devRoot = document.getElementById("root");
	if (devRoot) mount(devRoot);
}

// Export mount for Angular host
export { mount };
