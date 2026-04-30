import type { Theme } from "../hooks/useTheme";
import { cn } from "../lib/cn";

type Props = {
	theme: Theme;
	onCycle: () => void;
};

const LABELS: Record<Theme, string> = {
	light: "Light",
	dark: "Dark",
	system: "System",
};

const ICONS: Record<Theme, string> = {
	light: "☀",
	dark: "☾",
	system: "◐",
};

function ThemeToggle({ theme, onCycle }: Readonly<Props>) {
	return (
		<button
			type="button"
			onClick={onCycle}
			aria-label={`Theme: ${LABELS[theme]}. Click to cycle.`}
			className={cn(
				"inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-heading font-medium text-fg text-xs transition-colors",
				"hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60",
			)}
		>
			<span aria-hidden="true" className="text-base leading-none">
				{ICONS[theme]}
			</span>
			<span>{LABELS[theme]}</span>
		</button>
	);
}

export default ThemeToggle;
