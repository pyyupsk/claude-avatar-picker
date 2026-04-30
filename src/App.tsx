import { useState } from "react";
import AvatarTile from "./components/AvatarTile";
import CommandBar from "./components/CommandBar";
import { avatars } from "./data/avatars";

function App() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const selected = avatars.find((a) => a.id === selectedId) ?? null;

	return (
		<div className="mx-auto max-w-6xl px-6 py-12">
			<header className="mb-10">
				<p className="font-heading text-brand-mid-gray text-xs uppercase tracking-widest">
					claude.ai · account_profile
				</p>
				<h1 className="mt-1 font-heading text-4xl text-brand-dark sm:text-5xl">
					Avatar Picker
				</h1>
				<p className="mt-3 max-w-2xl text-brand-dark/70">
					All {avatars.length} built-in Claude avatars. Pick one and copy the
					console command to apply it to your account.
				</p>
			</header>

			<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
				{avatars.map((a) => (
					<AvatarTile
						key={a.id}
						avatar={a}
						selected={a.id === selectedId}
						onSelect={setSelectedId}
					/>
				))}
			</div>

			<footer className="mt-16 mb-32 space-y-1 text-brand-mid-gray text-sm">
				<p>
					ID 0 clears the avatar (renders initials). The server stores any
					integer, but only IDs 1–{avatars.length} have a designed shape —
					anything else renders as a blank circle.
				</p>
				<p className="text-xs">
					Last verified against claude.ai on{" "}
					<time dateTime="2026-04-30">2026-04-30</time>.
				</p>
			</footer>

			<CommandBar avatar={selected} onClose={() => setSelectedId(null)} />
		</div>
	);
}

export default App;
