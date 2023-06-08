import { Link } from "@remix-run/react";
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import ResponsiveAppBar from "./components/Navbar";

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div>
			{/* <ResponsiveAppBar /> */}
			{/* <Typography variant="h4" component="h1" gutterBottom>
				Welcome to Remix!
			</Typography> */}
			<h1>Welcome to Remix!</h1>
			<Link to='/login'> 
				<Button variant="contained">Login page</Button>
			</Link>
		</div>
	);
}
