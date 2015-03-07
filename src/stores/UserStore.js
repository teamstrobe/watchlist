// Libs
import Reflux from 'reflux';
import tmdbAPI from './tmdbAPI';

// Actions
import UserActions from '../actions/UserActions';
import WatchlistActions from '../actions/WatchlistActions';

const UserStore = Reflux.createStore({
	init() {
		this.listenToMany(UserActions);
	},

	getInitialState() {
		return {
			user: null
		};
	},

	onUserFetch() {
		tmdbAPI.get('/account', UserActions.userFetch);
	},

	onUserFetchCompleted(user) {
		WatchlistActions.watchlistFetch({
			user: user
		});

		this.trigger({
			user: user
		});
	}
});

export default UserStore;
