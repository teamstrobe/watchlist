// Libs
import React from 'react';

// Actions
import MovieActions from '../actions/MovieActions';

// Components
import SearchBox from './SearchBox';

const SearchBoxContainer = React.createClass({

	render() {
		return (
			<SearchBox onChange={this.onChange} />
		);
	},

	onChange(value) {
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
