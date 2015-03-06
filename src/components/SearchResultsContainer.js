// Libs
import React from 'react';

// Actions
import WatchlistActions from '../actions/WatchlistActions';

// Components
import SearchResults from './SearchResults';

var SearchResultsContainer = React.createClass({

	render: function() {
		return (
			<SearchResults movies={this.props.movies} results={this.props.results} onItemClick={this.onItemClick} />
		);
	},

	onItemClick: function(result, event) {
		WatchlistActions.watchlistAdd({
			movie: result,
			user: this.props.user
		});
	}
});

export default SearchResultsContainer;