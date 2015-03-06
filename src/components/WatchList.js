import React from 'react';

var WatchList = React.createClass({

	render: function() {
		var latestMovies = (this.props.movies) ? this.props.movies.slice(0).reverse() : [];

		if(latestMovies.length) {
			return (
				<ul className="watch-list">
					{latestMovies.map(function(movie, i) {
						return (
							<li className="watch-list-item" key={movie.id}>
								<button className="watch-list-item__delete-btn" onClick={this.onItemDeleteBtnClick.bind(this, movie)}>
										Delete
								</button>
								<img className="watch-list-item__image" src={movie.poster_url} width="200" height="300" />
								{movie.title}
							</li>
						);
					}.bind(this))}
				</ul>
			);
		}
		else {
			return (
				<p>Movies on your watchlist will appear here :-)</p>
			);
		}
	},

	onItemDeleteBtnClick: function(movie) {
		this.props.onItemDeleteBtnClick(movie);
	}
});

export default WatchList;