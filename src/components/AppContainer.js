import React from 'react';
import _ from 'lodash';
import fluxMixin from 'flummox/mixin';

// Components
import App from './App';
import FluxComponent from 'flummox/component';

const AppContainer = React.createClass({
	mixins: [fluxMixin({
		results: (store) => ({results: store.getResults(), query: store.getQuery()}),
		user: (store) => ({user: store.getUser()}),
		watchlist: (store) => ({watchlist: store.getWatchlist()})
	})],

	componentWillMount() {
		this.fetchData();
	},

	async fetchData() {
		var user = await this.props.flux.getActions('user').userFetch();
		this.props.flux.getActions('watchlist').watchlistFetch(user);
	},

	render() {
		return (
			<App
				flux={this.flux}
				results={this.state.results}
				watchlist={this.state.watchlist}
				user={this.state.user}
				query={this.state.query}
			/>
		);
	}
});

export default AppContainer;
