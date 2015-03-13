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
				user: store => ({
					user: store.getUser()
				}),
				results: store => ({
					results: store.getResults()
				}),
				watchlist: store => ({
					watchlist: store.getWatchlist().map(movie => 
						_.extend(movie, {
							poster_url: 'http://image.tmdb.org/t/p/w300' + movie.poster_path
						})
					)
				})
			}}>
				<App />
			</FluxComponent>
		);
	}
});

export default AppContainer;
