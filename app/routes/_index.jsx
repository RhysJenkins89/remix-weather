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
export const action = async ({ request }) => {
	const form = await request.formData();
	const city = form.get('name');

	if (form.get('method') === 'delete') {
		await db.city.deleteMany({ where: { name: city } })
		// the .deleteMany method works, but of course we only want to delete one item.
	} else {
		await db.city.create({ data: { name: city } });
	}

	return null
}

// In a handle click, use the useSubmit method with the delete method
// I think the useSubmit will call the action funciton outside of the return 
// We'll need a way to differentiate the delete method from the add method

export default function Index() {
	const [text, setText] = useState('')
	const [userSearch, setUserSearch] = useState('')
	const [cityLimit, setCityLimit] = useState(false)
	const [cityAlreadyAdded, setCityAlreadyAdded] = useState(false)

	// Standard React client-side data fetching
	const handleChange = async (event) => {
		setText(event.target.value)
		if (event.target.value.length >= 1) {
			setCityLimit(false)
			setCityAlreadyAdded(false)
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
		console.log('cities:', cities)

		// If the cities array is empty, do not check for duplicates
		// If the city array contains one or more items, check for duplicates

		if (cities.length === 5) {
			setText('')
			setUserSearch('')
			setCityLimit(true)
			return
			// Show an error message here
		}

		if (cities.length === 0) {
			// As we're re-using this code, put it in a function
			let formData = new FormData();
			formData.append("name", city);
			submit(formData, {
				method: "post",
			});
		}

		if (cities.length > 0) {
			// This definitely isn't the right way to do this.
			let cityAdded
			cities.forEach((cityObj) => {
				if (city === cityObj.name) {
					console.log('city already added')
					setCityAlreadyAdded(true)
					cityAdded = true
					// Add error text on the ui
					return
				}
			})
			if (!cityAdded) {
				let formData = new FormData();
				formData.append("name", city);
				submit(formData, {
					method: "post",
				});
			}
		}
		setText('')
		setUserSearch('')

	}

	// Delete the city from the db
	const handleDelete = async (event) => {
		console.log(`Delete this city: ${event.currentTarget.getAttribute('data-city')}`)
		const city = event.currentTarget.getAttribute('data-city')
		const methodType = event.currentTarget.getAttribute('data-method')
		let formData = new FormData();
		formData.append("name", city);
		formData.append("method", methodType);
		submit(formData, {
			method: "delete",
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
				cityAlreadyAdded ?
					<p>You've already added that city.</p>
					:
					null
			}
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
				cityLimit ? 
					<p>You may add no more than five cities.</p>
					:
					null
			}
			{
				cities.length > 0 ?
					cities.map((city) => {
						return (
							<div key={city.id}>
								<p>{city.name}</p>
								<p onClick={handleDelete} data-city={city.name} data-method='delete'>Delete {city.name}</p>
							</div>
						)
					})
					:
					<p>Search for a city!</p>
			}
		</div>
	);
}
