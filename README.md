# Remixing the Weather

The classic weather app built with the Remix framework.

## How to run

1. Clone the repo
2. Run ```npm i```
3. Run ```npm run dev```

## To do

## Nice to have

* A clear all button for the cities
* Fade in/out the error messages
* If the user navigates to main without logging in, redirect to login
* A show password button

## Notes 

* The position absolute style props
* React useState functionality
* useSubmit error with Max

### General notes

Initially, this was quite a tricky development experience. When I started the project, I was thinking like a React developer, with all of my data-fetching happening on the client-side. Remix doesn't quite work like this.

However, after spending some time with the framework and becoming more comfortable with full-stack developepment -- at least in this small context -- I've found that Remix has become more comfortable and intuitive to use.

My experience here highlights a self-evident truth of software development: the more a developer uses a framework, the better he or she will get with it. And while this certianly applies across many different fields of learning, it's an essential concept in software development.

Often, new languages and frameworks can be quite intimidating for those who haven't used them before, and, what's more, the less experience a developer has, the more he or she is likely to be intimidated by the software. But the more time the developer spends building a project, the more familiar the language or framework will become. 

As I mention above, time with the software is essential, but I would also argue that a positive attitude to problem solving is particularly useful. It is this attitude that I wanted to maintain throughout this project.  

### useSubmit error

Talk about the useSubmit error that Max helped with.

### Delete method

During the development process, I had a bug with the delete funcitonality. Prisma expects that the data I pass into the method be unique, but because the db can accept multiple items that have the same name, the name field doesn't qualify as a unique field. I fixed this issue with the deleteMany method, and while it works for the moment, if the project were continued this method could certainly cause some problems.  

### TypeScript

I didn't use TypeScript on this project for a simple reason: I wasn't familiar with Remix or MUI, so I didn't want to add further complications to the project. I'm still learning TypeScript, and while I'm sure I could add some basic type-safety across the application, adding TypeScript throughout would've cost me more time than I had. With this in mind, I decided to stick with standard JavaScript .jsx files for this app.  

### Style attributes on MUI components

z-index on the city suggestions dropdown, absolute position on the error messages

### getWeatherIcon function

This function is a bit of a monster, and there's undoubtedly a more elegant way to fetch icons based on a number, but it does the job for the time being.  

### react-icons

I chose to use icons from the ```react-icons``` package instead of the icons that the weather api fetches. This was purely a personal design choice. In my opinion, the bold, simple designs of the React icons complement the minimalistic theme of the app.  

## Known bugs

At the moment, I save the city in the db using the city name. However, many cities around the world share the same name, which means if I wanted to add both Birmingham in the UK and Birmingham in Alabama, I wouldn't be able to. If I were to spend more time on this app, I would certainly fix this bug, but because I have limited time, I'll have to leave it as it is for the moment.   

The welcome message on the city search page is hard-coded. While this isn't the worst thing in the world and doesn't really qualify as a bug per se, I would've liked to have gotten logged-in user data in order to render the correct username. 

The way that the data populates the weather card ins't particularly elegant. Once I set the loading state to false in the useEffect, the data simply snaps in. A fade-in would be much easier on the eyes. As above, this issue isn't exactly a bug, but it is something that I would've liked to improve if I had more time. 
