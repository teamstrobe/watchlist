import { Actions } from 'flummox';
import tmdbAPI from '../tmdbAPI';

export default class ResultActions extends Actions {

	movieQuery(query) {
		this.movieSearch(query);
		return query;
	}

	async movieSearch(query) {
		try {
			return await tmdbAPI.get('/search/movie', {
				query: query
			});
		} catch(error) {
			console.log('Errorz', error);
		}
	}

	clearSearch() {
		return '';
	}

}
