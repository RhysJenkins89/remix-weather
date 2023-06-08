import { db } from "~/utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from 'react'

// MUI components
import Button from '@mui/material/Button';

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

// Get the cities from the db
export const loader = async () => {
	return json({
		cities: await db.city.findMany()
	})
};

// Update the db with the user's input
export const action = async ({ request }) => {
	const form = await request.formData();
	const city = form.get('city');

	// We won't need form validation like this. We might need something else, however. 
	// if (typeof city !== "string" || city === "") {
	//     redirect('/new-quote')
	//     throw new Error(`Form not submitted correctly.`);
	// }
	// const fields = { by, quote };

	await db.city.create({ data: city });
	// return redirect('/');
}

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

			{/* <form method="post">
				<label>
					Quote Master (Quote By):
					<input
						type="text"
						className={inputClassName}
						name="by"
						required
					/>
				</label>
				<label>
					Quote Content:
					<textarea required className={`${inputClassName} resize-none `} id="" cols={30} rows={10} name="quote"></textarea>
				</label>
				<button type="submit">Add</button>
			</form> */}
		</div>
	);
}
