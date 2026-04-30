import { useCallback, useEffect, useRef, useState } from "react";

type UseCopy = {
	copiedKey: string | null;
	copy: (text: string, key?: string) => Promise<boolean>;
};

export function useCopy(timeout = 1500): UseCopy {
	const [copiedKey, setCopiedKey] = useState<string | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const copy = useCallback(
		async (text: string, key = "default"): Promise<boolean> => {
			try {
				await navigator.clipboard.writeText(text);
				setCopiedKey(key);
				if (timerRef.current) clearTimeout(timerRef.current);
				timerRef.current = setTimeout(() => setCopiedKey(null), timeout);
				return true;
			} catch {
				return false;
			}
		},
		[timeout],
	);

	return { copiedKey, copy };
}
