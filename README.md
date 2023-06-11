# Remixing the Weather

The classic weather app built with the Remix framework. There will be a lot of Googling!

## To do

* Add a stylesheet
* Bring in the MUI framework
    * Sort fonts
    * Sort icons 
* Fetch weather data from somewhere somehow
* Fix the click boundary of the city items
* If the user navigates to main without logging in, redirect to login
* Look into the delete method

## Nice to have

* A clear all button for the cities
* Fade in/out the error messages

## Notes 

This has a been quite a tricky development experience so far. At the moment, I'm thinking like a React developer, with all of my data-fetching happening on the client-side. Remix doesn't quite work like this.

Talk about the useSubmit error that Max helped with. 

At the moment I'm getting a bug with the delete funcitonality. Prisma expects that the data I pass into the method is unique, but because the db can accept multiple items that have the same name, the name field doesn't quality as a unique field.

## Known bugs

At the moment, I save the city in the db using the city name. However, many cities around the world share the same name, which means if I wanted to add both Birmingham in the UK and Birmingha in Alabama, I wouldn't be able to. If I were to spend more time on this app, I would certainly fix this bug, but because I have limited time, I'll have to leave it as it is for the moment.   
