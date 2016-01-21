import { Store } from 'flummox';
import flux from '../flux';
import { List, fromJS } from 'immutable';

export default class WatchlistStore extends Store {

	constructor(flux) {
		super();

		this.state = {
			watchlist: new List()
		};

		let actionIds = flux.getActionIds('watchlist');
		this.register(actionIds.watchlistFetch, this.onWatchlistFetchCompleted);
		this.registerAsync(actionIds.watchlistAdd, this.onWatchlistAddBegin, null, this.onWatchlistAddFailed);
		this.registerAsync(actionIds.watchlistRemove, this.onWatchlistRemoveBegin, null, this.onWatchlistRemoveFailed);
	}

	onWatchlistFetchCompleted(watchlist) {
		this.setState({
			watchlist: fromJS(watchlist.results)
		});
	}

	onWatchlistAddBegin(movie) {
		if(!this.isInWatchlist(movie)) {
			this.addMovie(movie, true);
		}
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
		return !!(this.state.watchlist.filter(function(v) {
			return movie.get('id') === v.get('id');
		}).size);
	}

	addMovie(movie, pending) {
		this.setState({
			watchlist: this.state.watchlist.push(movie)
		});
	}

	removeMovie(movie) {
		this.setState({
			watchlist: this.state.watchlist.filter(function(v) {
				return movie.get('id') !== v.get('id');
			})
		});
	}

	getWatchlist() {
		return this.state.watchlist;
	}

}
