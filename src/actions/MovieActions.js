import Reflux from 'reflux';

const MovieActions = Reflux.createActions({
	'movieSearch': { asyncResult: true }
});

MovieActions.clearSearch = Reflux.createAction();

export default MovieActions;
