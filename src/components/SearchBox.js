import React from 'react';
import PureMixin from 'react-pure-render/mixin';

const SearchBox = React.createClass({
	mixins: [PureMixin],

	propTypes: {
		onSearch: React.PropTypes.func,
		onClear: React.PropTypes.func,
		value: React.PropTypes.string,
		windowWidth: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			value: '',
			windowWidth: 500,
			onSearch: () => null,
			onClear: () => null
		};
	},

	render() {
		var inputStyle = {
			padding: '0.7em 1em',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			color: '#42aaf3',
			width: '100%',
			border: 0,
			outline: 0,
			fontSize: this.props.windowWidth > 400 ? '3rem' : '1.5rem'
		};

		return (
			<input
				style={inputStyle}
				value={this.props.value}
				onChange={this.handleChange}
				type="text"
				placeholder="Add a film"
			/>
		);
	},

	handleChange(event) {
		if(event.target.value) {
			this.props.onSearch(event.target.value);
		} else {
			this.props.onClear();
		}
	}
});

export default SearchBox;
