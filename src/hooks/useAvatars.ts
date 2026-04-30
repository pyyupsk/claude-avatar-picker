import { useEffect, useState } from "react";
import { safe } from "../lib/safe";
import type { Avatar } from "../types/avatar";

type State =
	| { status: "loading"; data: null; error: null }
	| { status: "ready"; data: readonly Avatar[]; error: null }
	| { status: "error"; data: null; error: Error };

export function useAvatars(): State {
	const [state, setState] = useState<State>({
		status: "loading",
		data: null,
		error: null,
	});

	useEffect(() => {
		const ctrl = new AbortController();

		async function load() {
			const [err, res] = await safe(
				fetch("avatars.json", { signal: ctrl.signal }),
			);
			if (err) {
				if (err.name === "AbortError") return;
				setState({ status: "error", data: null, error: err });
				return;
			}
			if (!res.ok) {
				setState({
					status: "error",
					data: null,
					error: new Error(`Failed to load avatars: ${res.status}`),
				});
				return;
			}
			const [parseErr, data] = await safe(res.json() as Promise<Avatar[]>);
			if (parseErr) {
				setState({ status: "error", data: null, error: parseErr });
				return;
			}
			if (ctrl.signal.aborted) return;
			setState({ status: "ready", data, error: null });
		}

		load();
		return () => ctrl.abort();
	}, []);

	return state;
}
