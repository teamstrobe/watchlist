import { Store } from 'flummox';
import { fromJS } from 'immutable';

export default class ResultStore extends Store {

	constructor(flux) {
		super();

		this.state = {
			results: null,
			query: ''
		};

		let resultActionIds = flux.getActionIds('results');

		this.register(resultActionIds.movieQuery, this.onMovieQuery);
		this.register(resultActionIds.movieSearch, this.onMovieSearchCompleted);
		this.register(resultActionIds.clearSearch, this.onClearSearch);
	}

	onMovieQuery(query) {
		this.setState({
			query: query
		});
	}

	onMovieSearchCompleted(data) {
		this.setState({
			results: fromJS(data.results)
		});
	}

	onClearSearch() {
		this.setState({
			results: null,
			query: ''
		});
	}

	getResults() {
		return this.state.results;
	}

	getQuery() {
		return this.state.query;
	}

}
