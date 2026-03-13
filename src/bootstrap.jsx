import ReactDOM from "react-dom/client";
import App from "./App";

const mount = (el) => {
	const root = ReactDOM.createRoot(el);
	root.render(<App />);
};

// Auto-mount for standalone
if (!window.__IS_REMOTE_APP__) {
	const devRoot = document.getElementById("root");
	if (devRoot) mount(devRoot);
}

export { mount };
