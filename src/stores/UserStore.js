import { Store } from 'flummox';
import flux from '../flux';

export default class UserStore extends Store {

	constructor(flux) {
		super();

		this.state = {
			user: null,
			authorized: false
		};

		let userActionIds = flux.getActionIds('user');
		this.registerAsync(userActionIds.userLogin, null, this.onUserLoginCompleted, this.onUserLoginFailed);
		this.register(userActionIds.userSkipLogin, this.onUserLoginCompleted);
		this.register(userActionIds.userLogout, this.onUserLogoutCompleted);
		this.register(userActionIds.userFetch, this.onUserFetchCompleted);
	}

	onUserLoginCompleted() {
		this.setState({
			authorized: true
		});
	}

	onUserLoginFailed() {
		alert('Login failed. Please check your details.');
	}

	onUserLogoutCompleted() {
		this.setState({
			authorized: false
		});
	}

	onUserFetchCompleted(user) {
		this.setState({
			user: user
		});
	}

	getUser() {
		return this.state.user;
	}

	getAuthorized() {
		return this.state.authorized;
	}

}
