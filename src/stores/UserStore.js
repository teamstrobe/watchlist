import { Store } from 'flummox';
import flux from '../flux';

export default class UserStore extends Store {

	constructor(flux) {
		super();

		this.state = {
			user: null
		};

		let userActionIds = flux.getActionIds('user');
		this.register(userActionIds.userFetch, this.onUserFetchCompleted);
	}

	onUserFetchCompleted(user) {
		this.setState({
			user: user
		});
	}

	getUser() {
		return this.state.user;
	}

}
