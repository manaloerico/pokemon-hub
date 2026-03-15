import { get } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

export const useContainerSize = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	const handleWindowResize = useCallback(() => {
		const element = get(ref, "current.parentElement");
		if (!element) return;
		const { clientWidth, clientHeight } = element;
		setSize((prev) =>
			prev.width !== clientWidth || prev.height !== clientHeight
				? { width: clientWidth, height: clientHeight }
				: prev,
		);
	}, []);

	useEffect(() => {
		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, [handleWindowResize]);

	return { ref, size };
};
