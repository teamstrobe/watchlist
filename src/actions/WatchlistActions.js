import { Actions } from 'flummox';
import tmdbAPI from '../tmdbAPI';

export default class WatchlistActions extends Actions {

	constructor(resultActions) {
		super();
		this.resultActions = resultActions;
	}

	async watchlistFetch(user) {
		try {
			return await tmdbAPI.get('/account/' + user.id + '/watchlist/movies');
		} catch(error) {
			console.error('Could not fetch watchlist', error);
		}
	}

	async watchlistAdd(movie, user) {
		this.resultActions.clearSearch();
		return await tmdbAPI.post('/account/' + user.id + '/watchlist', {
			media_type: 'movie',
			media_id: movie.id,
			watchlist: true
		});
	}

	async watchlistRemove(movie, user) {
		return await tmdbAPI.post('/account/' + user.id + '/watchlist', {
			media_type: 'movie',
			media_id: movie.id,
			watchlist: false
		});
	}

}
