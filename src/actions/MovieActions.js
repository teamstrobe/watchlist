import Reflux from 'reflux';

var MovieActions = Reflux.createActions({
	'movieSearch': { asyncResult: true }
});

MovieActions.clearSearch = Reflux.createAction();

export default MovieActions;