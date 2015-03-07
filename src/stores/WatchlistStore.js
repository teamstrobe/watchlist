// Libs
import Reflux from 'reflux';
import _ from 'lodash';
import tmdbAPI from './tmdbAPI';

// Actions
import WatchlistActions from '../actions/WatchlistActions';

const WatchlistStore = Reflux.createStore({
	init() {
		this.movies = [];
		this.listenToMany(WatchlistActions);
	},

	getInitialState() {
		return {
			movies: this.movies
		};
	},

	onWatchlistAdd(data) {
		if(_.filter(this.movies, function(v) {
			return data.movie.id === v.id;
		}).length) {
			return;
		}

		this.movies.push(data.movie);

		this.trigger({
			movies: this.movies
		});

		tmdbAPI.post('/account/' + data.user.id + '/watchlist', WatchlistActions.watchlistAdd, {
			media_type: 'movie',
			media_id: data.movie.id,
			watchlist: true
		});
	},

	onWatchlistAddFailed(movie) {
		this.movies = _.filter(this.movies, function(v) {
			return movie.id !== v.id;
		});

		this.trigger({
			movies: this.movies
		});
	},

	onWatchlistRemove(data) {
		this.movies = _.filter(this.movies, function(v) {
			return data.movie.id !== v.id;
		});

		this.trigger({
			movies: this.movies
		});

		tmdbAPI.post('/account/' + data.user.id + '/watchlist', WatchlistActions.watchlistRemove, {
			media_type: 'movie',
			media_id: data.movie.id,
			watchlist: false
		});
	},

	onWatchlistRemoveFailed(movie) {
		this.movies.push(movie);
		this.trigger({
			movies: this.movies
		});
	},

	onWatchlistFetch(data) {
		var uri = '/account/' + data.user.id + '/watchlist/movies';
		tmdbAPI.get(uri, WatchlistActions.watchlistFetch);
	},

	onWatchlistFetchCompleted(body) {
		this.movies = body.results;
		this.trigger({
			movies: this.movies
		});
	}
});

export default WatchlistStore;
