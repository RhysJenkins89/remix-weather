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
export const action = async (formData) => {
	// console.log({formData})

	// const form = await request.formData();
	// const city = form.get('city');

	// We won't need form validation like this. We might need something else, however. 
	// if (typeof city !== "string" || city === "") {
	//     redirect('/new-quote')
	//     throw new Error(`Form not submitted correctly.`);
	// }
	// const fields = { by, quote };

	await db.city.create({ data: formData });
	// return redirect('/');
}

export default function Index() {
	const { cities } = useLoaderData();
	const submit = useSubmit()

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

	const handleClick = async (event) => {
		console.log('item clicked')
		console.log(event.currentTarget.getAttribute('data-city'))
		// debugger
		
		// const form = await request.formData();
		// const city = form.get('city');
		const city = event.currentTarget.getAttribute('data-city') 
		console.log('City form data:', city)
		console.log(typeof city)
		// let formData = new FormData();
		// formData.append('name', 'new city');
		// console.log('formData in handleClick:', formData)

		// submit('city', {
		// 	method: 'post'
		// });



		// submit()

		// submit(null, {
		// 	action: "/logout",
		// 	method: "post",
		// });
		  
		// // same as
		// <Form action="/logout" method="post" />;
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
							// <div onClick={handleClick} key={index}>
							// 	<p>{item.name}, {item.country}</p>
							// </div>
							// It's bad practice to use the array index as the key, but it'll do for now.

							<form onClick={handleClick} key={index} data-city={item.name}>
								<input name="city" value={item.name} readOnly/>
							</form>
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
