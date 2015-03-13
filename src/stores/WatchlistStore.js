import _ from 'lodash';
import { Store } from 'flummox';
import flux from '../flux';

export default class WatchlistStore extends Store {

	constructor(flux) {
		super();

		this.state = {
			watchlist: []
		};

		let actionIds = flux.getActionIds('watchlist');
		this.register(actionIds.watchlistFetch, this.onWatchlistFetchCompleted);
		this.registerAsync(actionIds.watchlistAdd, this.onWatchlistAddBegin, null, this.onWatchlistAddFailed);
		this.registerAsync(actionIds.watchlistRemove, this.onWatchlistRemoveBegin, null, this.onWatchlistRemoveFailed);
	}

	onWatchlistFetchCompleted(watchlist) {
		this.setState({
			watchlist: watchlist.results
		});
	}

	onWatchlistAddBegin(movie) {
		if(this.isInWatchlist(movie))
			return;
		
		this.addMovie(movie, true);
	}

	onWatchlistAddFailed(error, movie) {
		this.removeMovie(movie);
	}

	onWatchlistRemoveBegin(movie) {
		this.removeMovie(movie);
	}

	onWatchlistRemoveFailed(error, movie) {
		this.addMovie(movie);
	}

	isInWatchlist(movie) {
		return !!(_.filter(this.state.watchlist, function(v) {
			return movie.id === v.id;
		}).length);
	}

	addMovie(movie, pending) {
		this.state.watchlist.push(movie);
		this.setState({
			watchlist: this.state.watchlist
		});
	}

	removeMovie(movie) {
		var watchlist = _.filter(this.state.watchlist, function(v) {
			return movie.id !== v.id;
		});

		this.setState({
			watchlist: watchlist
		});
	}

	getWatchlist() {
		return this.state.watchlist;
	}

}
