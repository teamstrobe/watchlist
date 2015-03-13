import React from 'react';

const SearchBox = React.createClass({
	render() {
		return (
			<input
				autoFocus={true}
				value={this.props.value}
				onChange={this.onChange}
				className="search-box"
				type="text"
				placeholder="Add a film"
			/>
		);
	},

	onChange(event) {
		if(event.target.value && this.props.onSearch) {
			this.props.onSearch(event.target.value);
		} else if(this.props.onClear) {
			this.props.onClear();
		}
	}
});

export default SearchBox;
