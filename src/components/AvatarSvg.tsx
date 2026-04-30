import type { Avatar } from "../data/avatars";

type Props = {
	avatar: Avatar;
	size?: number;
};

function AvatarSvg({ avatar, size = 56 }: Readonly<Props>) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<title>Claude avatar {avatar.id}</title>
			<circle cx="14" cy="14" r="14" fill={avatar.bg} />
			<path d={avatar.d} fill={avatar.fg} />
		</svg>
	);
}

export default AvatarSvg;
