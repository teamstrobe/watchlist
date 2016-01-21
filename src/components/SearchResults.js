import _ from 'lodash';
import React from 'react';

const SearchResults = React.createClass({

	render() {
		if(!this.props.results) {
			return null;
		}

		var style = _.extend({
			fontSize: '1rem',
			padding: '1rem 3em'
		}, this.props.style);

		if(this.props.results.length) {
			return (
				<ul style={style}>
					{this.props.results.map(function(result) {
						var isAdded = _.filter(this.props.watchlist, function(movie) {
							return result.id === movie.id;
						}).length;

						var itemStyle = {
							color: '#fff',
							fontSize: '1.6rem',
							opacity: isAdded ? 0.5 : 1,
							paddingTop: '0.5em',
							borderBottom: isAdded ? 0 : '1px solid rgba(255, 255, 255, 0.5)',
							display: 'inline-block',
							cursor: isAdded ? 'default' : 'pointer',
							textAlign: 'left',
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							maxWidth: '100%',
							overflow: 'hidden'
						};

						if(this.props.windowWidth) {
							itemStyle.fontSize = '1rem';
						}

						return isAdded ? (
							<li key={result.id}>
								<span style={itemStyle}>
									{result.title}
								</span>
							</li>
						) : (
							<li key={result.id}>
								<button style={itemStyle} onClick={this.onItemClick.bind(this, result)}>
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
		if(this.props.onItemClick) {
			this.props.onItemClick(result);
		}
	}
});

export default SearchResults;
