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

	async userLogin(formData) {
		return await tmdbAPI.authorize(formData.username, formData.password);
	}

	userLogout() {
		tmdbAPI.sessionId = null;
		if(localStorage) {
			localStorage.removeItem('sessionId');
		}
		return true;
	}

	userSkipLogin() {
		return true;
	}

}
