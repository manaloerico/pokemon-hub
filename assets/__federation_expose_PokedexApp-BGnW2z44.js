import { importShared } from './__federation_fn_import-DhUBeXoq.js';
import { R as ReactDOM, j as jsxRuntimeExports, P as PokemonRoutes } from './pokemon.routes-B9hkF2K-.js';

const {HashRouter} = await importShared('react-router-dom');
function mount(el) {
  const root = ReactDOM.createRoot(el);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(HashRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PokemonRoutes, {}) })
  );
}

export { mount };
