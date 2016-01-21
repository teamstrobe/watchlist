import React from 'react';

const SearchBox = React.createClass({
	getInitialState() {
		return {
			isFocused: false
		};
	},

	render() {
		var inputStyle = {
			padding: '0.7em 1em',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			color: '#42aaf3',
			width: '100%',
			border: 0,
			outline: 0
		};

		if(this.props.windowWidth > 400) {
			inputStyle.fontSize = '3rem';
		}
		else {
			inputStyle.fontSize = '1.5rem';
		}

		return (
			<input
				style={inputStyle}
				value={this.props.value}
				onChange={this.handleChange}
				type="text"
				placeholder="Add a film"
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
			/>
		);
	},

	handleChange(event) {
		if(event.target.value && this.props.onSearch) {
			this.props.onSearch(event.target.value);
		} else if(this.props.onClear) {
			this.props.onClear();
		}
	},

	handleFocus() {
		this.setState({
			isFocused: true
		});
	},

	handleBlur() {
		this.setState({
			isFocused: false
		});
	}
});

export default SearchBox;
