// Libs
import Reflux from 'reflux';
import _ from 'lodash';
import tmdbAPI from './tmdbAPI';

// Actions
import UserActions from '../actions/UserActions';
import WatchlistActions from '../actions/WatchlistActions';

var UserStore = Reflux.createStore({
	init: function() {
		this.listenToMany(UserActions);
	},

	getInitialState: function() {
		return {
			user: null
		};
	},

	onUserFetch: function() {
		tmdbAPI.get('/account', UserActions.userFetch);
	},

	onUserFetchCompleted: function(user) {
		WatchlistActions.watchlistFetch({
			user: user
		});

		this.trigger({
			user: user
		});
	}
});

export default UserStore;