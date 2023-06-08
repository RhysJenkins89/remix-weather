import { db } from "~/utils/db.server";
import { Link } from "@remix-run/react";
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import ResponsiveAppBar from "./components/Navbar";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from 'react'

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async () => {
	return json({
		cities: await db.city.findMany()
	})
};

// To do 
// Save the user's choice of city to a db somewhere
// Render the contents of the db on the page

export default function Index() {
	const { cities } = useLoaderData();

	// React data fetching
	const [text, setText] = useState('')
	const [userSearch, setUserSearch] = useState('')

	const handleChange = async (event) => {
		setText(event.target.value)
		if (event.target.value.length >= 1) {
			const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}&count=10`)
			const resData = await response.json()
			setUserSearch(resData)
			// reset(false)
		} else {
			setText('')
			setUserSearch('')
		}
	}

	return (
		<div>
			{/* <ResponsiveAppBar /> */}
			{/* <Typography variant="h4" component="h1" gutterBottom>
				Welcome to Remix!
			</Typography> */}
			<h1>Welcome to Remix!</h1>
			<div>
				<Link to='/login'>
					<Button variant="contained">Login page</Button>
				</Link>
			</div>
			<input value={text} onChange={handleChange} placeholder='Search' />
			{
				userSearch.results ?
					userSearch.results.map((item, index) => {
						return (
							<div key={index}>
								<p>{item.name}, {item.country}</p>
							</div>
							// It's bad practice to use the array index as the key, but it'll do for now.
						)
					})
					:
					null
			}
			{
				cities.map((city) => {
					return (
						<div key={city.id}>
							<p>{city.name}</p>
						</div>
					)
				})
			}
		</div>
	);
}
