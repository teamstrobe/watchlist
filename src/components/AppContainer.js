// Libs
import React from 'react';
import Reflux from 'reflux';

// Stores
import UserStore from '../stores/UserStore';
import MovieStore from '../stores/MovieStore';
import WatchlistStore from '../stores/WatchlistStore';

// Actions
import UserActions from '../actions/UserActions';
import WatchlistActions from '../actions/WatchlistActions';

// Components
import App from './App';

var AppContainer = React.createClass({
	mixins: [
		Reflux.connect(UserStore),
		Reflux.connect(MovieStore),
		Reflux.connect(WatchlistStore)
	],

	statics: {
		resolve: {
			user: function() {
				debugger;
				// tmdbAPI.get('/account/' + )
			},

			watchlist: function() {

			}
		}
	},

	componentWillMount: function() {
		var _this = this;

		UserActions.userFetch();
	},

	render: function() {
		// Set the full URL for the poster, based on the host and path
		var movies = this.state.movies.map(function(movie, i) {
			movie.poster_url = 'http://image.tmdb.org/t/p/w300' + movie.poster_path;
			return movie;
		}.bind(this));

		return (
			<App
				user={this.state.user}
				movies={movies}
				results={this.state.results} />
		);
	}
});

export default AppContainer;