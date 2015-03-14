import React from 'react';
import _ from 'lodash';

// Components
import App from './App';
import FluxComponent from 'flummox/component';

const AppContainer = React.createClass({
	componentWillMount() {
		this.fetchData();
	},

	async fetchData() {
		var user = await this.props.flux.getActions('user').userFetch();
		this.props.flux.getActions('watchlist').watchlistFetch(user);
	},

	render() {
		return (
			<FluxComponent flux={this.props.flux} connectToStores={{
				results: (store) => ({results: store.getResults(), query: store.getQuery()}),
				user: (store) => ({user: store.getUser()}),
				watchlist: (store) => ({watchlist: store.getWatchlist()})
			}}>
				<App />
			</FluxComponent>
		);
	}
});

export default AppContainer;
