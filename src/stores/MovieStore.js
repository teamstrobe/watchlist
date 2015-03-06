// Libs
import Reflux from 'reflux';
import _ from 'lodash';
import tmdbAPI from './tmdbAPI';

// Stores
import WatchlistStore from './WatchlistStore';

// Actions
import UserActions from '../actions/UserActions';
import WatchlistActions from '../actions/WatchlistActions';
import MovieActions from '../actions/MovieActions';

var MovieStore = Reflux.createStore({
	init: function() {
		this.listenToMany(MovieActions);
		this.listenTo(WatchlistStore, this.onWatchlistStoreChange);
	},

	getInitialState: function() {
		return {
			results: null
		};
	},

	onMovieSearch: function(data) {
		tmdbAPI.get('/search/movie', MovieActions.movieSearch, {
			query: data.query
		});
	},

	onMovieSearchCompleted: function(body) {
		this.trigger({
			results: body.results
		});
	},

	onClearSearch: function() {
		this.trigger({
			results: null
		});
	},

	onWatchlistStoreChange: function(data) {
		if(typeof data.movies !== 'undefined') {
			this.trigger({
				results: null
			});
		}
	}
});

export default MovieStore;