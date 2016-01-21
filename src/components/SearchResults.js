import _ from 'lodash';
import React from 'react/addons';

const SearchResults = React.createClass({

	render() {
		if(!this.props.results) {
			return null;
		}

		var style = _.extend({
			fontSize: '1rem',
			padding: '1rem 3em'
		}, this.props.style);

		const watchlistIds = this.props.watchlist && this.props.watchlist.map(v => v.get('id'));

		if(this.props.results.size) {
			return (
				<ul style={style}>
					{this.props.results.map(function(result) {
						var isAdded = watchlistIds && watchlistIds.indexOf(result.get('id')) !== -1;
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
							<li key={result.get('id')}>
								<span style={itemStyle}>
									{result.get('title')}
								</span>
							</li>
						) : (
							<li key={result.get('id')}>
								<button style={itemStyle} onClick={this.onItemClick.bind(this, result)}>
									{result.get('title')}
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
