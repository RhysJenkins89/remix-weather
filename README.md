# Remixing the Weather

The classic weather app built with the Remix framework. There will be a lot of Googling!

## To do

* Allow the user to delete cities
    * Add a better method for delete functionality
* Add a stylesheet
* Bring in the MUI framework
    * Sort fonts
    * Sort icons 
* Fetch weather data from somewhere somehow
* Fix the click boundary of the city items

## Nice to have

* A clear all button for the cities

## Notes 

This has a been quite a tricky development experience so far. At the moment, I'm thinking like a React developer, with all of my data-fetching happening on the client-side. Remix doesn't quite work like this.

Talk about the useSubmit error that Max helped with. 

At the moment I'm getting a bug with the delete funcitonality. Prisma expects that the data I pass into the method is unique, but because the db can accept multiple items that have the same name, the name field doesn't quality as a unique field.

