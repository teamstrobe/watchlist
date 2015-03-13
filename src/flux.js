import { Flux } from 'flummox';
import ResultActions from './actions/ResultActions';
import ResultStore from './stores/ResultStore';
import UserActions from './actions/UserActions';
import UserStore from './stores/UserStore';
import WatchlistActions from './actions/WatchlistActions';
import WatchlistStore from './stores/WatchlistStore';

class AppFlux extends Flux {

	constructor() {
		super();

		this.createActions('user', UserActions);
		this.createStore('user', UserStore, this);

		var resultActions = this.createActions('results', ResultActions);
		this.createStore('results', ResultStore, this);

		this.createActions('watchlist', WatchlistActions, resultActions);
		this.createStore('watchlist', WatchlistStore, this);
	}

}

export default AppFlux;
