// Libs
import Reflux from 'reflux';
import tmdbAPI from './tmdbAPI';

// Stores
import WatchlistStore from './WatchlistStore';

// Actions
import MovieActions from '../actions/MovieActions';

const MovieStore = Reflux.createStore({
	init() {
		this.listenToMany(MovieActions);
		this.listenTo(WatchlistStore, this.onWatchlistStoreChange);
	},

	getInitialState() {
		return {
			results: null
		};
	},

	onMovieSearch(data) {
		tmdbAPI.get('/search/movie', MovieActions.movieSearch, {
			query: data.query
		});
	},

	onMovieSearchCompleted(body) {
		this.trigger({
			results: body.results
		});
	},

	onClearSearch() {
		this.trigger({
			results: null
		});
	},

	onWatchlistStoreChange(data) {
		if(typeof data.movies !== 'undefined') {
			this.trigger({
				results: null
			});
		}
	}
});

export default MovieStore;
