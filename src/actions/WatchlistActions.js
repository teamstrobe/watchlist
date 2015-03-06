import Reflux from 'reflux';

export default Reflux.createActions({
	'watchlistAdd': { asyncResult: true },
	'watchlistRemove': { asyncResult: true },
	'watchlistFetch': { asyncResult: true }
});