import React from 'react/addons';

const SearchBox = React.createClass({
	render() {
		return (
			<input
				value={this.props.value}
				autoFocus={true}
				onChange={this.handleChange}
				className="search-box"
				type="text"
				placeholder="Add a film"
			/>
		);
	},

	handleChange(event) {
		if(event.target.value && this.props.onSearch) {
			this.props.onSearch(event.target.value);
		} else if(this.props.onClear) {
			this.props.onClear();
		}
	}
});

export default SearchBox;
