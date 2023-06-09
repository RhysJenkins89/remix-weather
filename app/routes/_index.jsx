import { db } from "~/utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, useSubmit } from "@remix-run/react";
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
export const action = async ({request}) => {
	const form = await request.formData();
    const city = form.get('name');
	await db.city.create({ data: {name: city} });
	return null
}

export default function Index() {
	// Standard React data fetching
	const [text, setText] = useState('')
	const [userSearch, setUserSearch] = useState('')

	const handleChange = async (event) => {
		setText(event.target.value)
		if (event.target.value.length >= 1) {
			const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}&count=10`)
			const resData = await response.json()
			setUserSearch(resData)
		} else {
			setText('')
			setUserSearch('')
		}
	}

	const { cities } = useLoaderData();
	const submit = useSubmit()
	
	// Call the submit function here
	const handleClick = async (event) => {
		const city = event.currentTarget.getAttribute('data-city')
		let formData = new FormData();
		formData.append("name", city);
		submit(formData, {
			method: "post",
		});
	}

	return (
		<div>
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
							<p key={index} onClick={handleClick} data-city={item.name}>{item.name}</p>
						)
					})
					:
					null
			}
			<h3>The below items come from the db</h3>
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
