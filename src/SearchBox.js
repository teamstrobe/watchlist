var React = require('react');

var SearchBox = React.createClass({
	render: function() {
		return (
			<input type="text" placeholder="Search to Add" onChange={this.onTextChange}/>
		)
	},
	onTextChange: function(event) {
		this.props.onChange(event.target.value);
	}
});

module.exports = SearchBox;