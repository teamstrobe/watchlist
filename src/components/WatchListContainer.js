// Libs
import React from 'react';

// Components
import WatchList from './WatchList';

// Actions
import WatchlistActions from '../actions/WatchlistActions';

const WatchListContainer = React.createClass({

	render() {
		return (
			<WatchList
				movies={this.props.movies}
				onItemDeleteBtnClick={this.onItemDeleteBtnClick} />
		);
	},

	onItemDeleteBtnClick(movie) {
		if(!confirm('Delete this movie from your watchlist?')) {
			return;
		}

		WatchlistActions.watchlistRemove({
			movie: movie,
			user: this.props.user
		});
	}

});

module.exports = WatchListContainer;
