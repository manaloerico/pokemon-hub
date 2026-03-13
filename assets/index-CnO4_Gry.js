import { importShared } from './__federation_fn_import-DhUBeXoq.js';
import { j as jsxRuntimeExports, P as PokemonRoutes, R as ReactDOM } from './pokemon.routes-B9hkF2K-.js';

true              &&(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
}());

const {Link} = await importShared('react-router-dom');

function Header() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-blue-600 text-white shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto text-center px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-2xl font-bold hover:text-yellow-300", children: "Pokémon Hub" }) }) });
}

const {HashRouter} = await importShared('react-router-dom');
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(HashRouter, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PokemonRoutes, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-gray-800 text-white p-4 text-center", children: "© 2026 My Website. All rights reserved." })
  ] });
}

const React = await importShared('react');
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
