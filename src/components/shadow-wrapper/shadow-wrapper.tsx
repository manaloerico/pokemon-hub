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

		// Copy all existing stylesheets into shadow
		Array.from(document.styleSheets).forEach((sheet) => {
			try {
				const rules = sheet.cssRules;
				if (!rules) return;
				const style = document.createElement("style");
				Array.from(rules).forEach((rule) => {
					style.appendChild(document.createTextNode(rule.cssText));
				});
				shadowRoot.appendChild(style);
			} catch (e) {
				// Some stylesheets (like from other domains) might throw CORS errors
			}
		});

		// Create a div to render React content
		const mountPoint = document.createElement("div");
		shadowRoot.appendChild(mountPoint);

		// Inject styles if provided
		if (styles) {
			const styleTag = document.createElement("style");
			styleTag.textContent = styles;
			shadowRoot.appendChild(styleTag);
		}

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
