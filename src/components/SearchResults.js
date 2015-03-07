import _ from 'lodash';
import React from 'react';

const SearchResults = React.createClass({

	render() {
		if(this.props.results.length) {
			return (
				<ul className="search-results">
					{this.props.results.map(function(result) {
						var isAdded = _.filter(this.props.movies, function(movie) {
							return result.id === movie.id;
						}).length;

						return isAdded ? (
							<li key={result.id}>
								{result.title}
							</li>
						) : (
							<li key={result.id}>
								<button onClick={this.onItemClick.bind(this, result)}>
									{result.title}
								</button>
							</li>
						);
					}.bind(this))}
				</ul>
			);
		}
		else {
			return (
				<p>Sorry, there are no results. Try typing something else.</p>
			);
		}
	},

	onItemClick(result) {
		this.props.onItemClick(result);
	}
});

export default SearchResults;
