import { Highlight, themes } from "prism-react-renderer";
import type { ResolvedTheme } from "../hooks/useTheme";

type Props = {
	code: string;
	resolved: ResolvedTheme;
	className?: string;
};

function CodeBlock({ code, resolved, className }: Readonly<Props>) {
	const theme = resolved === "dark" ? themes.vsDark : themes.vsLight;

	return (
		<Highlight code={code} language="jsx" theme={theme}>
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={className}
					style={{ ...style, background: "transparent" }}
				>
					<code>
						{tokens.map((line) => {
							const lineKey = line.map((t) => t.content).join("");
							let offset = 0;
							return (
								<div key={lineKey} {...getLineProps({ line })}>
									{line.map((token) => {
										const key = `${offset}-${token.content}`;
										offset += token.content.length || 1;
										return <span key={key} {...getTokenProps({ token })} />;
									})}
								</div>
							);
						})}
					</code>
				</pre>
			)}
		</Highlight>
	);
}

export default CodeBlock;
