# Remixing the Weather

The classic weather app built with the Remix framework.

## How to run

1. Clone the repo
2. Run ```npm i```
3. Run ```npm run dev```

Log in with the following details: 

* Username: ipgautomotive
* Password: carmaker

To show the weather data for a city, simply type in the search box and click on one of the suggested locations.

## To do

## Nice to have

* A clear all button for the cities
* Fade in/out the error messages
* If the user navigates to main without logging in, redirect to login
* A show password button

## Notes 

### General notes

Initially, this was quite a tricky development experience. When I started the project, I was thinking like a React developer, with all of my data-fetching happening on the client-side. Remix doesn't quite work like this.

However, after spending some time with the framework and becoming more comfortable with full-stack developepment -- at least in this small context -- I've found that Remix has become more comfortable and intuitive to use.

My experience here highlights a self-evident truth of software development: the more a developer uses a framework, the better he or she will get with it. And while this certianly applies across many different fields of learning, it's an essential concept in software development.

Often, new languages and frameworks can be quite intimidating for those who haven't used them before, and, what's more, the less experience a developer has, the more he or she is likely to be intimidated by the software. But the more time the developer spends building a project, the more familiar the language or framework will become. 

As I mention above, time with the software is essential, but I would also argue that a positive attitude to problem solving is particularly useful. It is this attitude that I wanted to maintain throughout this project.  

### App design notes

I've tried to keep the overall design of the app relatively simple, allowing the MUI components themselves to shine. Generally speaking, I prefer a dark mode over a light mode, and the default MUI dark mode palette is very tastful.   

### useSubmit error

One of the trickier bugs I came across early in development was pushing data to the database from an onClick handler. I spent a little too long trying to have the user submit a form instead of simply click a Typography element, which certainly wasn't the right approach. 

Of course, I need to call the ```useSubmit``` function, which takes in a FormData object with the appropriated data appended to it. ```useSubmit``` then talks to the ```action``` function on the route, allowing me to update the database with a create or a delete action depending on what the user has clicked.

When I first looked at this problem, I found it difficult to visualise exactly what I was doing with the data because I didn't see ```action``` as a server-side function. This, I think, comes from my experience with React and JavaScript on the frontend. I'm not used to the blend of client-side and server-side functionality that Remix offers the developer. 

However, once this distinction -- or lack thereof -- became clear, I found it much easier to visualise exacly what I was doing with the data.

### Delete method

During the development process, I had a bug with the delete funcitonality. Prisma expects that the data I pass into the method be unique, but because the db can accept multiple items that have the same name, the name field doesn't qualify as a unique field. I fixed this issue with the deleteMany method, and while it works for the moment, if the project were continued this method could certainly cause some problems.  

### TypeScript

I didn't use TypeScript on this project for a simple reason: I wasn't familiar with Remix or MUI, so I didn't want to add further complications to the project. I'm still learning TypeScript, and while I'm sure I could add some basic type-safety across the application, adding TypeScript throughout would've cost me more time than I had. With this in mind, I decided to stick with standard JavaScript .jsx files for this app.  

### getWeatherIcon function

This function is a bit of a monster, and there's undoubtedly a more elegant way to fetch icons based on a number, but it does the job for the time being.  

### react-icons

I chose to use icons from the ```react-icons``` package instead of the icons that the weather api fetches. This was purely a personal design choice. In my opinion, the bold, simple designs of the React icons complement the minimalistic theme of the app.  

### Accessibility

Unfortunately, I did not build this app with accessibility in mind. While accessibility is an essential aspect of modern web development, time constraints dictated that it be put to one side in this case. 

## Known bugs

At the moment, I save the city in the db using the city name. However, many cities around the world share the same name, which means if I wanted to add both Birmingham in the UK and Birmingham in Alabama, I wouldn't be able to. If I were to spend more time on this app, I would certainly fix this bug, but because I have limited time, I'll have to leave it as it is for the moment.   

The welcome message on the city search page is hard-coded. While this isn't the worst thing in the world and doesn't really qualify as a bug per se, I would've liked to have gotten logged-in user data in order to render the correct username. 

The way that the data populates the weather card isn't particularly elegant. Once I set the loading state to false in the useEffect, the data simply snaps in. A fade-in would be much easier on the eyes. As above, this issue isn't exactly a bug, but it is something that I would've liked to improve if I had more time. 

The heading 'Known bugs' implies the existance of unknown bugs. While I have taken every effort to produce a bug-free app, there is of course a chance that bugs will exist. In fact, as with almost any application, it's almost certain that there are bugs. It's just a matter of finding them.   
