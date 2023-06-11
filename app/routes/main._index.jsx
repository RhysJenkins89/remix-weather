import { db } from "~/utils/db.server";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, useSubmit } from "@remix-run/react";
import { useState } from 'react'

// MUI components
import {
	Container,
	Typography,
	Input,
	Button,
	Box
} from "@mui/material";

// React components
import WeatherCard from "../components/WeatherCard";

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
	const lat = form.get('lat');
	const long = form.get('long');

	if (form.get('method') === 'delete') {
		await db.city.deleteMany({ where: { name: city } })
		// the .deleteMany method works, but of course we only want to delete one item.
	} else {
		await db.city.create({
			data: {
				name: city,
				lat,
				long,
			}
		});
	}

	return null
}

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

	const addCities = (city, lat, long) => {
		let formData = new FormData();
		formData.append("name", city);
		formData.append("lat", lat);
		formData.append("long", long);
		submit(formData, {
			method: "post",
		});
	}

	// Call the submit function here
	const handleClick = async (event) => {
		const city = event.currentTarget.getAttribute('data-city')
		const latitude = event.currentTarget.getAttribute('data-lat')
		const longitude = event.currentTarget.getAttribute('data-long')

		if (cities.length === 5) {
			setText('')
			setUserSearch('')
			setCityLimit(true)
			return
		}

		if (cities.length === 0) {
			addCities(city, latitude, longitude)
		}

		if (cities.length > 0) {
			// There's probably a shorter way to write this
			let cityAdded
			cities.forEach((cityObj) => {
				if (city === cityObj.name) {
					setCityAlreadyAdded(true)
					cityAdded = true
					return
				}
			})
			if (!cityAdded) {
				addCities(city, latitude, longitude)
			}
		}
		setText('')
		setUserSearch('')
	}

	// Delete the city from the db
	const handleDelete = async (city, methodType) => {
		let formData = new FormData();
		formData.append("name", city);
		formData.append("method", methodType);
		submit(formData, {
			method: "delete",
		});
	}

	return (
		<Container> 
			<Typography variant="h3" sx={{ my: 4, textAlign: 'center' }}>
				Welcome to Remix!
			</Typography>
			<div>
				<Link to='/'>
					<Button variant="contained">Login page</Button>
				</Link>
			</div>
			<Input value={text} onChange={handleChange} placeholder='Search' />
			{
				cityAlreadyAdded ?
					<Typography>You've already added that city.</Typography>
					:
					null
			}
			{
				userSearch.results ?
					userSearch.results.map((item, index) => {
						return (
							<Typography sx={{ p: 1 }}
								key={index}
								onClick={handleClick}
								data-city={item.name}
								data-lat={item.latitude}
								data-long={item.longitude}
							>
								{item.name}
							</Typography>
							// Have these items appear on top of the cards?
						)
					})
					:
					null
			}
			{
				cityLimit ?
					<Typography>You may add no more than five cities.</Typography>
					:
					null
			}
			<Box 
				sx={{ 
					display: 'flex', 
					flexDirection: {xs: 'column', md: 'row'},
					justifyContent: 'space-between',
					gap: 4 
				}}
			>
				{cities.length > 0 ?
					cities.map((city) => {
						return (
							<WeatherCard
								key={city.id}
								city={city.name}
								lat={city.lat}
								long={city.long}
								deleteItem={handleDelete}
							/>
						)
					})
					:
					<Typography>Search for a city!</Typography>}
			</Box>
		</Container>
	);
}
