import React from 'react';

const SearchBox = React.createClass({

	render() {
		return (
			<input onChange={this.onChange} className="search-box" type="text" placeholder="Add a film" />
		);
	},

	onChange(event) {
		if(this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
});

export default SearchBox;
