import { useState } from "react";
import AvatarTile from "./components/AvatarTile";
import CommandBar from "./components/CommandBar";
import ThemeToggle from "./components/ThemeToggle";
import { useAvatars } from "./hooks/useAvatars";
import { useTheme } from "./hooks/useTheme";

const SKELETON_COUNT = 72;

function App() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { theme, resolved, cycle } = useTheme();
	const avatarsState = useAvatars();

	const avatars = avatarsState.status === "ready" ? avatarsState.data : [];
	const selected = avatars.find((a) => a.id === selectedId) ?? null;

	return (
		<div className="mx-auto max-w-6xl px-6 py-12">
			<header className="mb-10 flex items-start justify-between gap-4">
				<div>
					<p className="font-heading text-muted text-xs uppercase tracking-widest">
						claude.ai · account_profile
					</p>
					<h1 className="mt-1 font-heading text-4xl text-fg sm:text-5xl">
						Avatar Picker
					</h1>
					<p className="mt-3 max-w-2xl text-fg/70">
						All {avatars.length || SKELETON_COUNT} built-in Claude avatars. Pick
						one and copy the console command to apply it to your account.
					</p>
				</div>
				<ThemeToggle theme={theme} onCycle={cycle} />
			</header>

			{avatarsState.status === "error" ? (
				<div className="rounded-2xl border border-border bg-surface p-6 text-fg">
					<p className="font-heading font-semibold text-fg">
						Failed to load avatars
					</p>
					<p className="mt-1 text-muted text-sm">
						{avatarsState.error.message}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
					{avatarsState.status === "loading"
						? Array.from({ length: SKELETON_COUNT }, (_, i) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders are positional
									key={`skel-${i}`}
									className="aspect-square animate-pulse rounded-2xl border border-border bg-surface"
								/>
							))
						: avatars.map((a) => (
								<AvatarTile
									key={a.id}
									avatar={a}
									selected={a.id === selectedId}
									onSelect={setSelectedId}
								/>
							))}
				</div>
			)}

			<footer className="mt-16 mb-32 space-y-1 text-muted text-sm">
				<p>
					ID 0 clears the avatar (renders initials). The server stores any
					integer, but only IDs 1–{avatars.length || SKELETON_COUNT} have a
					designed shape — anything else renders as a blank circle.
				</p>
				<p className="text-xs">
					Last verified against claude.ai on{" "}
					<time dateTime="2026-04-30">2026-04-30</time>.
				</p>
			</footer>

			<CommandBar
				avatar={selected}
				resolved={resolved}
				onClose={() => setSelectedId(null)}
			/>
		</div>
	);
}

export default App;
