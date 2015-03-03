var React = require('react');

var SearchResults = React.createClass({

    render: function() {
        console.log(this.props);

        return (
            <ul>
                {this.props.results.map(function(result) {
                    return (
                        <li onClick={this.onItemClick.bind(this, result)}>{result.title}</li>
                    )
                }.bind(this))}
            </ul>
        );
    },

    onItemClick: function(result) {
        this.props.onItemClick(result);
    }
});

module.exports = SearchResults;