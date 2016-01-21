import React from 'react';
import WatchListItem from './WatchListItem';
import PureMixin from 'react-pure-render/mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';

const WatchList = React.createClass({
	mixins: [PureMixin],

	propTypes: {
		windowWidth: React.PropTypes.number.isRequired,
		onItemDeleteBtnClick: React.PropTypes.func.isRequired,
		itemSpacing: React.PropTypes.number.isRequired,
		watchlist: ImmutablePropTypes.list.isRequired
	},

	getDefaultProps() {
		return {
			itemSpacing: 50
		};
	},

	render() {
		var styles = _.extend({
			paddingLeft: 50,
			paddingRight: 50
		}, this.props.style);

		var listStyles = {
			fontSize: 0,
			marginTop: -this.props.itemSpacing,
			marginLeft: -this.props.itemSpacing,
		};

		var itemStyles = {
			display: 'inline-block',
			fontSize: '1rem',
			verticalAlign: 'top',
			paddingLeft: this.props.itemSpacing,
			paddingTop: this.props.itemSpacing,
		};

		if(this.props.windowWidth > 1200) {
			itemStyles.width = 100 / 6 + '%';
		}
		else if(this.props.windowWidth > 800) {
			itemStyles.width = 100 / 5 + '%';
		}
		else if(this.props.windowWidth > 500) {
			itemStyles.width = 100 / 3 + '%';
		}
		else if(this.props.windowWidth > 350) {
			itemStyles.width = 100 / 2 + '%';
		}
		else {
			itemStyles.width = '100%';
		}

		if(this.props.watchlist.size) {
			return (
				<div style={styles}>
					<ul style={listStyles}>
						{this.props.watchlist.reverse().map((movie) =>
							<li key={movie.get('id')} style={itemStyles}>
								<WatchListItem movie={movie} onDeleteBtnClick={this.handleItemDeleteBtnClick.bind(this, movie)} />
							</li>
						)}
					</ul>
				</div>
			);
		}
		else {
			return (
				<p style={{padding: '3rem'}}>Movies on your watchlist will appear here :-)</p>
			);
		}
	},

	handleItemDeleteBtnClick(movie) {
		this.props.onItemDeleteBtnClick(movie);
	}
});

export default WatchList;
