import autoprefixer from "autoprefixer";
import prefixwrap from "postcss-prefixwrap";
export default {
	plugins: [autoprefixer(), prefixwrap(".pokemon-hub")],
};
