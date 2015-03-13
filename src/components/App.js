// Libs
import React from 'react';

// Components
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import WatchList from './WatchList';

const App = React.createClass({
	render() {
		var resultsActions = this.props.flux.getActions('results');

		return (
			<div className="wrapper">
				{this.props.user && (
					<div>
						<SearchBox
							onSearch={resultsActions.movieQuery}
							onClear={resultsActions.clearSearch}
						/>

						<SearchResults
							results={this.props.results}
							watchlist={this.props.watchlist}
							user={this.props.user}
							onItemClick={this.onSearchResultsItemClick}
						/>

						<WatchList
							watchlist={this.props.watchlist}
							onItemDelete={this.onWatchListItemDelete}
						/>
					</div>
				) || (
					<p>Logging in&hellip;</p>
				)}
			</div>
		);
	},

	onSearchResultsItemClick: function(movie) {
		this.props.flux.getActions('watchlist').watchlistAdd(movie, this.props.user);
	},

	onWatchListItemDelete: function(movie) {
		this.props.flux.getActions('watchlist').watchlistRemove(movie, this.props.user);
	}
});

export default App;
