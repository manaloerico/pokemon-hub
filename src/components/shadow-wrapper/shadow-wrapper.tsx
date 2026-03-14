import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

interface ShadowWrapperProps {
	children: React.ReactNode;
	styles?: string;
}

const ShadowWrapper: React.FC<ShadowWrapperProps> = ({ children, styles }) => {
	const hostRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!hostRef.current) return;

		// Attach shadow root
		const shadowRoot = hostRef.current.attachShadow({ mode: "open" });
		// Inject styles if provided
		if (styles) {
			const styleTag = document.createElement("style");
			styleTag.textContent = styles;
			shadowRoot.appendChild(styleTag);
		}

		// Create a div to render React content
		const mountPoint = document.createElement("div");
		shadowRoot.appendChild(mountPoint);

		// Render React content inside shadow
		const root = createRoot(mountPoint);
		root.render(<>{children}</>);

		// Optional: clean up
		return () => {
			root.unmount();
		};
	}, [children, styles]);

	return <div ref={hostRef}></div>;
};

export default ShadowWrapper;
