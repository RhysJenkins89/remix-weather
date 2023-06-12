# Remixing the Weather

The classic weather app built with the Remix framework.

## To do

## Nice to have

* A clear all button for the cities
* Fade in/out the error messages
* If the user navigates to main without logging in, redirect to login
* A show password button

## Notes 

### General notes

This has a been quite a tricky development experience so far. At the moment, I'm thinking like a React developer, with all of my data-fetching happening on the client-side. Remix doesn't quite work like this.

However, after spending some time with the framework and becoming more comfortable with full-stack developepment -- at least in this small context -- I've found that Remix has become more comfortable and intuitive to use. 

### useSubmit error

Talk about the useSubmit error that Max helped with.

### Delete method

During the development process, I had a bug with the delete funcitonality. Prisma expects that the data I pass into the method be unique, but because the db can accept multiple items that have the same name, the name field doesn't qualify as a unique field. I fixed this issue with the deleteMany method, and while it works for the moment, if the project were continued this method could certainly cause some problems.  

### TypeScript

I didn't use TypeScript on this project for a simple reason: I wasn't familiar with Remix or MUI, so I didn't want to add further complications to the project. I'm still learning TypeScript, and while I'm sure I could add some basic type-safety across the application, adding TypeScript throughout would've cost me more time than I had. With this in mind, I decided to stick with standard JavaScript .jsx files for this app.  

## Known bugs

At the moment, I save the city in the db using the city name. However, many cities around the world share the same name, which means if I wanted to add both Birmingham in the UK and Birmingha in Alabama, I wouldn't be able to. If I were to spend more time on this app, I would certainly fix this bug, but because I have limited time, I'll have to leave it as it is for the moment.   

The city cards don't have a loading state, which means that the weather data doesn't populate in the most elegant manner. While this isn't a big deal, I would've liked to have fixed it if I had more time. 

The welcome message on the city search page is hard-coded. While this isn't the worst thing in the world and doesn't really qualify as a bug per se, I would've liked to have gotten logged-in user data in order to render the correct username. 
