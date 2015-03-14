# Watchlist

Watchlist is a React.js demo, which communicates with the TMDB API to search for movies and sync your watchlist.

![Screenshot of Watchlist](http://f.cl.ly/items/0d2r3H45003i0g0z1e14/Screen%20Shot%202015-03-14%20at%2016.49.40.png)

## Get started

+ Sign up for TMDB (https://www.themoviedb.org/) and verify your account 
+ Copy `app.config.default.js` and paste into a new file called `app.config.js` in the same folder, then change to your own TMDB username and password
+ Install dependencies with `npm install`
+ Install Flummox dependencies by going to `node_modules/flummox` and running `npm install`
+ Run webpack with `npm start` from the project root
+ Go to `http://localhost:3000`

## Notable dependencies

+ [React](https://github.com/facebook/react)
+ [Flummox](https://github.com/acdlite/flummox)
+ [Webpack](https://github.com/webpack/webpack)
+ [Babel](https://babeljs.io)

## Roadmap

+ Unit tests!
+ Type annotation with Flow
+ ~~Better store dependencies (UserStore currently depends on WatchlistStore... meh)~~
+ Try out React Resolver with Flux ?!
+ ~~Swap Reflux in favour of Flummox ?~~