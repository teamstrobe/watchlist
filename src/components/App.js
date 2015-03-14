// Libs
import React from 'react';

// Components
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import WatchList from './WatchList';

const App = React.createClass({
	render() {
		var resultsActions = this.props.flux.getActions('results');

		var watchlist = this.props.watchlist ? this.props.watchlist.map(movie => _.extend(movie, {
			poster_url: 'http://image.tmdb.org/t/p/w300' + movie.poster_path
		})) : null;

		return (
			<div className="wrapper">

				{this.props.user && <SearchBox
					value={this.props.query}
					onSearch={resultsActions.movieQuery}
					onClear={resultsActions.clearSearch}
				/>}

				{this.props.user && (
					<div>
						
						<SearchResults
							results={this.props.results}
							watchlist={watchlist}
							user={this.props.user}
							onItemClick={this.onSearchResultsItemClick}
						/>

						<WatchList
							watchlist={watchlist}
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
