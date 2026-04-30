import type { Avatar } from "../data/avatars";
import { useCopy } from "../hooks/useCopy";
import type { ResolvedTheme } from "../hooks/useTheme";
import { buildSnippet } from "../lib/buildSnippet";
import { cn } from "../lib/cn";
import AvatarSvg from "./AvatarSvg";
import CodeBlock from "./CodeBlock";

type Props = {
	avatar: Avatar | null;
	resolved: ResolvedTheme;
	onClose: () => void;
};

function CommandBar({ avatar, resolved, onClose }: Readonly<Props>) {
	const { copiedKey, copy } = useCopy();
	const open = avatar !== null;

	const snippet = avatar ? buildSnippet(avatar.id) : "";
	const discord = `\`\`\`js\n${snippet}\n\`\`\``;

	return (
		<>
			<button
				type="button"
				aria-label="Close"
				onClick={onClose}
				className={cn(
					"fixed inset-0 z-40 bg-brand-dark/40 transition-opacity duration-200",
					open
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0",
				)}
			/>
			<dialog
				open
				aria-label="Avatar command"
				aria-hidden={!open}
				className={cn(
					"fixed inset-x-0 bottom-0 z-50 m-0 w-full max-h-none max-w-none border-0 bg-transparent p-0 transition-transform duration-300 ease-out",
					open ? "translate-y-0" : "translate-y-full",
				)}
			>
				<div className="mx-auto max-w-4xl px-4">
					<div className="rounded-t-3xl border border-border border-b-0 bg-surface px-5 pt-3 pb-5 shadow-[0_-12px_40px_rgba(20,20,19,0.18)]">
						<div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
						{avatar && (
							<div className="flex items-start gap-4">
								<div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-border/40">
									<AvatarSvg avatar={avatar} size={56} />
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-2 flex items-center justify-between gap-3">
										<div className="flex items-baseline gap-2">
											<span className="font-heading text-muted text-xs uppercase tracking-wide">
												Selected
											</span>
											<span className="font-heading font-semibold text-fg text-lg tabular-nums">
												avatar = {avatar.id}
											</span>
										</div>
										<div className="flex shrink-0 gap-2">
											<button
												type="button"
												onClick={() => copy(snippet, "raw")}
												className="rounded-lg bg-brand-orange px-3 py-1.5 font-heading font-medium text-brand-light text-xs transition-colors hover:bg-brand-orange/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
											>
												{copiedKey === "raw" ? "Copied!" : "Copy"}
											</button>
											<button
												type="button"
												onClick={() => copy(discord, "discord")}
												className="rounded-lg border border-border bg-surface px-3 py-1.5 font-heading font-medium text-fg text-xs transition-colors hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
											>
												{copiedKey === "discord"
													? "Copied!"
													: "Copy for Discord"}
											</button>
											<button
												type="button"
												onClick={onClose}
												aria-label="Close"
												className="rounded-lg border border-border bg-surface px-3 py-1.5 font-heading font-medium text-fg text-xs transition-colors hover:border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
											>
												Close
											</button>
										</div>
									</div>
									<CodeBlock
										code={snippet}
										resolved={resolved}
										className={cn(
											"max-h-[40vh] overflow-auto whitespace-pre rounded-lg p-4 font-mono text-[11px] leading-relaxed",
											resolved === "dark"
												? "bg-brand-dark"
												: "bg-brand-light-gray/40",
										)}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</dialog>
		</>
	);
}

export default CommandBar;
