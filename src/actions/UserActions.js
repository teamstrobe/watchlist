import { Actions } from 'flummox';
import tmdbAPI from '../tmdbAPI';

export default class UserActions extends Actions {

	async userFetch(query) {
		try {
			return await tmdbAPI.get('/account');
		} catch(error) {
			console.error('Could not fetch account info', error);
		}
	}

}
