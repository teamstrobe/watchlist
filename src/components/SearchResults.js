import _ from 'lodash';
import React from 'react';

var SearchResults = React.createClass({

	render: function() {
		if(this.props.results.length) {
			return (
				<ul className="search-results">
					{this.props.results.map(function(result, i) {
						var isAdded = _.filter(this.props.movies, function(movie, i) {
							return result.id === movie.id;
						}).length;

						return isAdded ? (
							<li key={result.id}>
								{result.title}
							</li>
						) : (
							<li key={result.id}>
								<a onClick={this.props.onItemClick.bind(this, result)} href="javascript:;">
									{result.title}
								</a>
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
	}
});

export default SearchResults;