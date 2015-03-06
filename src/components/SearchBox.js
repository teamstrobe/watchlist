import React from 'react';

var SearchBox = React.createClass({

	render: function() {
		return (
			<input onChange={this._onChange} className="search-box" type="text" placeholder="Add a film" />
		);
	},

	_onChange: function(event) {
		if(this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
});

export default SearchBox;