import ReactDOM from "react-dom/client";
import App from "./App";

// Patch federation runtime to load dynamic chunks relative to current page
if (typeof window.__federation_fn_import__ === "undefined") {
	// This will override the internal dynamic import to use relative path
	window.__federation_fn_import__ = (url) =>
		import(window.location.pathname.replace(/\/$/, "") + "/" + url);
}

const mount = (el) => {
	const root = ReactDOM.createRoot(el);
	root.render(<App />);
};

// Auto-mount if standalone
if (!window.__IS_REMOTE_APP__) {
	const devRoot = document.getElementById("root");
	if (devRoot) mount(devRoot);
}

export { mount };
