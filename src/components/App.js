// Libs
import React from 'react';

// Components
import SearchBoxContainer from './SearchBoxContainer';
import SearchResultsContainer from './SearchResultsContainer';
import WatchListContainer from './WatchListContainer';

const App = React.createClass({
	render: function() {
		return (
			<div className="wrapper">
				{this.props.user && (
					<div>
						<SearchBoxContainer />
						{this.props.results &&
							<SearchResultsContainer results={this.props.results} movies={this.props.movies} user={this.props.user} />
						}
						<WatchListContainer movies={this.props.movies} user={this.props.user} />
					</div>
				) || (
					<p>Logging in&hellip;</p>
				)}
			</div>
		);
	}
});

export default App;
