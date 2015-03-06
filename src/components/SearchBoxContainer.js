// Libs
import React from 'react';

// Actions
import MovieActions from '../actions/MovieActions';

// Components
import SearchBox from './SearchBox';

var SearchBoxContainer = React.createClass({

	render: function() {
		return (
			<SearchBox onChange={this.onChange} />
		);
	},

	onChange: function(value, event) {
		if(value) {
			MovieActions.movieSearch({
				query: value
			});
		} else {
			MovieActions.clearSearch();
		}
	}

});

export default SearchBoxContainer;