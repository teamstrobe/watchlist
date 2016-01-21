import React from 'react';

const WatchListItem = React.createClass({
	getDefaultProps() {
		return {
			deleteBtnSize: 30
		}
	},

	getInitialState() {
		return {
			isOver: false,
			// isSelected: false
		};
	},

	render() {
		var styles = _.extend({
			position: 'relative',
			fontSize: '1rem'
		}, this.props.style);

		var deleteBtnStyles = {
			// Layout
			position: 'absolute',
			left: 0 - this.props.deleteBtnSize / 2,
			top: 0 - this.props.deleteBtnSize / 2,
			width: this.props.deleteBtnSize,
			height: this.props.deleteBtnSize,
			borderRadius: '50%',
			lineHeight: this.props.deleteBtnSize / 2  + 'px',
			fontWeight: 'bold',
			fontSize: '1em',
			// Color
			backgroundColor: '#000',
			color: '#fff',
			// Visibility
			opacity: this.state.isOver ? 1 : 0,
			WebkitTransition: 'opacity 0.2s ease'
		};

		var imageContainerStyles = {
			paddingTop: '146%',
			// Content
			background: 'url(' + this.props.movie.poster_url + ') no-repeat 50% 50%',
			backgroundSize: '100% auto',
			boxShadow: '0 0 100px rgba(0, 0, 0, 0.5)',
			// border: this.state.isSelected ? '3px solid #2c74de' : '3px solid transparent'
		};

		var imageStyles = {
			// Layout
			width: '100%',
			height: 'auto',
			WebkitTransform: 'translate(0, -50%)',
			top: '50%',
			position: 'relative'
		};

		var headingStyles = {
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			width: '100%',
			marginTop: '1em',
			fontSize: '1em'
		};

		return (
			<article style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onTouchEnd={this.handleTouchEnd}>
				<button style={deleteBtnStyles} onClick={this.handleDeleteBtnClick}>
					X
				</button>
				<div style={imageContainerStyles}></div>
				<h2 style={headingStyles}>{this.props.movie.title}</h2>
			</article>
		);

	},

	handleMouseOver() {
		this.setState({
			isOver: true
		});
	},

	handleMouseOut() {
		this.setState({
			isOver: false
		});
	},

	handleTouchEnd() {
		this.setState({
			isOver: !this.state.isOver
		});
	},

	// handleClick(event) {
	// 	this.setState({
	// 		isSelected: !this.state.isSelected
	// 	});
	// },

	handleDeleteBtnClick(movie) {
		if(!confirm('Delete this movie from your watchlist?')) {
			return;
		}

		if(this.props.onDeleteBtnClick) {
			this.props.onDeleteBtnClick(movie);
		}
	}
});

export default WatchListItem;
