import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
	if (globalThis.window === undefined) return "light";
	return globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function readStored(): Theme {
	if (globalThis.window === undefined) return "system";
	const v = localStorage.getItem(STORAGE_KEY);
	if (v === "light" || v === "dark" || v === "system") return v;
	return "system";
}

function nextTheme(prev: Theme): Theme {
	if (prev === "light") return "dark";
	if (prev === "dark") return "system";
	return "light";
}

function applyTheme(theme: ResolvedTheme) {
	const root = document.documentElement;
	const css = document.createElement("style");
	css.textContent = "*,*::before,*::after{transition:none!important}";
	document.head.appendChild(css);
	root.dataset.mode = theme;
	root.style.colorScheme = theme;
	// double rAF: applies after the browser has flushed style/layout for the swap
	requestAnimationFrame(() => {
		requestAnimationFrame(() => css.remove());
	});
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => readStored());
	const [resolved, setResolved] = useState<ResolvedTheme>(() =>
		theme === "system" ? getSystemTheme() : theme,
	);

	useEffect(() => {
		const next = theme === "system" ? getSystemTheme() : theme;
		setResolved(next);
		applyTheme(next);
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	useEffect(() => {
		if (theme !== "system") return;
		const mq = globalThis.window.matchMedia("(prefers-color-scheme: dark)");
		function handleChange() {
			const next = mq.matches ? "dark" : "light";
			setResolved(next);
			applyTheme(next);
		}
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, [theme]);

	const cycle = useCallback(() => {
		setTheme(nextTheme);
	}, []);

	return { theme, resolved, setTheme, cycle };
}
