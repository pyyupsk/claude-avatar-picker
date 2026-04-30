import type { Avatar } from "../data/avatars";
import { cn } from "../lib/cn";
import AvatarSvg from "./AvatarSvg";

type Props = {
	avatar: Avatar;
	selected: boolean;
	onSelect: (id: number) => void;
};

function AvatarTile({ avatar, selected, onSelect }: Readonly<Props>) {
	return (
		<button
			type="button"
			onClick={() => onSelect(avatar.id)}
			aria-pressed={selected}
			aria-label={`Avatar ${avatar.id}`}
			className={cn(
				"group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border bg-surface p-4 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60",
				selected
					? "border-brand-orange shadow-[0_0_0_3px_rgba(217,119,87,0.18)]"
					: "border-border hover:-translate-y-0.5 hover:border-muted",
			)}
		>
			<AvatarSvg avatar={avatar} />
			<span className="font-heading text-muted text-xs tabular-nums group-hover:text-fg">
				{avatar.id}
			</span>
		</button>
	);
}

export default AvatarTile;
