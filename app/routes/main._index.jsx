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
			<Typography variant="h2" sx={{ my: 4, textAlign: 'center' }}>
				Welcome, ipgautomotive
			</Typography>
			<Typography variant="h4" sx={{ mt: 8, textAlign: 'center' }}>
				Search for a city.
			</Typography>
			<Box style={{position: 'relative'}} sx={{ my: 10, mx: 'auto', width: 250, display: 'flex', flexDirection: 'column' }}>
				<Input value={text} onChange={handleChange} placeholder='Search' />
				{cityAlreadyAdded ?
					<Typography style={{position: 'absolute', top: '35px'}} sx={{ mt: 2, color: 'error.main' }} >You've already added that city.</Typography>
					:
					null
				}
				{userSearch.results ? (
					<Box style={{position: 'absolute', top: '50px'}} sx={{ backgroundColor: 'background.default', zIndex: 100}}> 
						{userSearch.results.map((item, index) => {
							return (
								<Typography 
									sx={{ p: 1, width: 250, cursor: 'pointer' }}
									key={index}
									onClick={handleClick}
									data-city={item.name}
									data-lat={item.latitude}
									data-long={item.longitude}
								>
									{item.name}
								</Typography>
							)
						})}
					</Box>
					)
					:
					null
				}
				{cityLimit ?
					<Typography style={{position: 'absolute', top: '35px'}} sx={{ mt: 2, color: 'error.main' }} >You may add no more than five cities.</Typography>
					:
					null
				}
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					justifyContent: 'space-evenly',
					alignItems: 'center',
					gap: 4,
					mb: 2
				}}
			>
				{cities.map((city) => {
					return (
						<WeatherCard
							key={city.id}
							city={city.name}
							lat={city.lat}
							long={city.long}
							deleteItem={handleDelete}
						/>
					)
				})}
			</Box>
		</Container>
	);
}
