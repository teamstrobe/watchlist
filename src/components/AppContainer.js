// Libs
import React from 'react';
import Reflux from 'reflux';

// Stores
import UserStore from '../stores/UserStore';
import MovieStore from '../stores/MovieStore';
import WatchlistStore from '../stores/WatchlistStore';

// Actions
import UserActions from '../actions/UserActions';

// Components
import App from './App';

const AppContainer = React.createClass({
	mixins: [
		Reflux.connect(UserStore),
		Reflux.connect(MovieStore),
		Reflux.connect(WatchlistStore)
	],

	componentWillMount() {
		UserActions.userFetch();
	},

	render() {
		// Set the full URL for the poster, based on the host and path
		var movies = this.state.movies.map(function(movie) {
			movie.poster_url = 'http://image.tmdb.org/t/p/w300' + movie.poster_path;
			return movie;
		});

		return (
			<App
				user={this.state.user}
				movies={movies}
				results={this.state.results} />
		);
	}
});

export default AppContainer;
