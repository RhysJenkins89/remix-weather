import { Link } from "@remix-run/react";

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div>
			<h1>Welcome to Remix</h1>
			<Link to='/login'>Login page</Link>
		</div>
	);
}
