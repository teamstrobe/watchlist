// Libs
import React from 'react/addons';

// Components
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import WatchList from './WatchList';

const App = React.createClass({
	componentWillMount: function() {
		window.addEventListener('resize', this.handleWindowResize.bind(this));
		this.setState({
			windowWidth: window.innerWidth
		});
	},

	handleWindowResize: function(event) {
		this.setState({
			windowWidth: window.innerWidth
		});
	},

	render() {
		var resultsActions = this.props.flux.getActions('results');

		var watchlist = this.props.watchlist ? this.props.watchlist.map(movie => _.extend(movie, {
			poster_url: 'http://image.tmdb.org/t/p/w300' + movie.poster_path
		})) : null;

		var wrapperStyle = {
			// Reset
			fontSize: '1rem',
			// Color
			backgroundColor: '#272727',
			color: '#efefef'
		};

		var headerStyles = {
			position: 'fixed',
			bottom: 0,
			left: 0,
			zIndex: 1,
			width: '100%',
			background: '-webkit-linear-gradient(bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 100%)',
			color: '#fff',
			padding: '4rem 2rem 2rem'
		};

		var headerTitleStyles = {
			fontSize: '2rem'
		};

		var headerDescStyles = {
			paddingTop: '1em',
			lineHeight: 1.4
		};

		return (
			<section style={wrapperStyle}>

				<header style={headerStyles}>
					<h1 style={headerTitleStyles}>Watchlist.</h1>
					<p style={headerDescStyles}>A movie list app built with React. Acts as a training ground for devs.</p>
				</header>

				{this.props.user && <SearchBox
					value={this.props.query}
					onSearch={resultsActions.movieQuery}
					onClear={resultsActions.clearSearch}
					windowWidth={this.state.windowWidth}
				/>}

				{this.props.user && (
					<div>
						
						<SearchResults
							results={this.props.results}
							watchlist={watchlist}
							user={this.props.user}
							onItemClick={this.onSearchResultsItemClick}
							windowWidth={this.state.windowWidth}
						/>

						<WatchList
							watchlist={watchlist}
							onItemDeleteBtnClick={this.onWatchListItemDelete}
							style={{paddingTop: 50}}
							windowWidth={this.state.windowWidth}
						/>

					</div>
				) || (
					<p style={{
						padding: '3em'
					}}>Logging in&hellip;</p>
				)}

			</section>
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
