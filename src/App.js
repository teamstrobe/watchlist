var React = require('react');
var SearchBox = require('./SearchBox')

var App = React.createClass({

	render: function() {
		return (
			<SearchBox onChange={function(value) { console.log(value) }}/>
		)
	}
});

module.exports = App;