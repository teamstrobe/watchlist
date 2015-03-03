var React = require('react');
var SearchBox = require('./SearchBox')
var SearchResults = require('./SearchResults');
var WatchList = require('./WatchList');

var AppLocal = React.createClass({
	getDefaultProps: function() {
		return {
			collection: [
				{id: 1, title: '300', poster_url: '//placehold.it/300'},
				{id: 2, title: 'It\s a big question', poster_url: '//placehold.it/300'},
				{id: 3, title: 'Die Hard 2', poster_url: '//placehold.it/300'},
				{id: 4, title: 'Titanic', poster_url: '//placehold.it/300'}
			]
		};
	},

	getInitialState: function() {
		return {
			movies: [],
			results: null,
			user: true
		};
	},

	render: function() {
		return (
			<div className="wrapper">
				{this.state.user && (
					<div>
						<SearchBox onChange={this.onSearchBoxChange} />
						{this.state.results &&
							<SearchResults results={this.state.results} movies={this.state.movies} onItemClick={this.onSearchResultItemClick} />
						}
						<WatchList movies={this.state.movies} onItemDeleteBtnClick={this.onWatchListItemDeleteBtnClick} />
					</div>
				) || (
					<p>Logging in&hellip;</p>
				)}
			</div>
		);
	},

	onSearchBoxChange: function(value) {
		if(value) {
			// Look through the collection to find a matching film
			var results = [];
			this.props.collection.forEach(function(movie) {
				if(movie.title.toLowerCase() === value.toLowerCase()) {
					results.push(movie);
				}
			});

			this.setState({
				results: results
			});
		} else {
			// Clear the results
			this.setState({
				results: null
			});
		}
	},

	onSearchResultItemClick: function(movie, event) {
		var movies = this.state.movies;
		movies.push(movie);

		this.setState({
			movies: movies
		});
	},

	onWatchListItemDeleteBtnClick: function(movie, event) {
		var movies = this.state.movies;
		var newMovies = [];
		movies.forEach(function(m) {
			if(m.id !== movie.id) {
				newMovies.push(m);
			}
		});
		this.setState({
			movies: newMovies
		});
	}
});

module.exports = AppLocal;
