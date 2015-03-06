// Libs
import React from 'react';

// Components
import WatchList from './WatchList';

// Actions
import WatchlistActions from '../actions/WatchlistActions';

var WatchListContainer = React.createClass({

	render: function() {
		return (
			<WatchList
				movies={this.props.movies}
				onItemDeleteBtnClick={this.onItemDeleteBtnClick} />
		);
	},

	onItemDeleteBtnClick: function(movie, event) {
		if(!confirm('Delete this movie from your watchlist?'))
			return;

		WatchlistActions.watchlistRemove({
			movie: movie,
			user: this.props.user
		});
	}

});

module.exports = WatchListContainer;