// Libs
import Reflux from 'reflux';
import _ from 'lodash';
import tmdbAPI from './tmdbAPI';

// Stores
import UserStore from './UserStore';

// Actions
import UserActions from '../actions/UserActions';
import WatchlistActions from '../actions/WatchlistActions';

var WatchlistStore = Reflux.createStore({
	init: function() {
		this.movies = [];
		this.listenToMany(WatchlistActions);
	},

	getInitialState: function() {
		return {
			movies: this.movies
		};
	},

	onWatchlistAdd: function(data) {
		if(_.filter(this.movies, function(v, i) {
			return data.movie.id === v.id;
		}).length) return;

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

	onWatchlistAddFailed: function(movie, ex) {
		this.movies = _.filter(this.movies, function(v, i) {
			return movie.id !== v.id;
		});

		this.trigger({
			movies: this.movies
		});
	},

	onWatchlistRemove: function(data) {
		this.movies = _.filter(this.movies, function(v, i) {
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

	onWatchlistRemoveFailed: function(movie, ex) {
		this.movies.push(movie);
		this.trigger({
			movies: this.movies
		})
	},

	onWatchlistFetch: function(data) {
		var uri = '/account/' + data.user.id + '/watchlist/movies';
		tmdbAPI.get(uri, WatchlistActions.watchlistFetch);
	},

	onWatchlistFetchCompleted: function(body) {
		this.movies = body.results;
		this.trigger({
			movies: this.movies
		});
	}
});

export default WatchlistStore;