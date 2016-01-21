import React from 'react';
import _ from 'lodash';
import fluxMixin from 'flummox/mixin';

// Components
import App from './App';

const AppContainer = React.createClass({
	mixins: [fluxMixin({
		results: (store) => ({results: store.getResults(), query: store.getQuery()}),
		user: (store) => ({user: store.getUser(), authorized: store.getAuthorized()}),
		watchlist: (store) => ({watchlist: store.getWatchlist()})
	})],

	render() {
		return (
			<App
				flux={this.flux}
				results={this.state.results}
				watchlist={this.state.watchlist}
				user={this.state.user}
				query={this.state.query}
				authorized={this.state.authorized}
			/>
		);
	}
});

export default AppContainer;
