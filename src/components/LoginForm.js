import React from 'react';
import _ from 'lodash';

const LoginForm = React.createClass({
	render() {
		var styles = _.extend({
			// Reset
			fontSize: '1rem',
			// Layout
			padding: '1rem',
			maxWidth: 500,
			margin: '0 auto',
			// Color
			background: '#333333',
			color: '#efefef'
		}, this.props.style);

		var inputStyles = {
			fontSize: '1.5rem',
			width: '100%',
			padding: '1rem 0.5rem',
			color: '#fff',
			backgroundColor: '#272727',
			border: '1px solid transparent',
			outline: 0
		};

		var buttonStyles = {
			fontSize: '1.5rem',
			backgroundColor: '#42aaf3',
			color: '#fff',
			width: '100%',
			padding: '1rem 0'
		};

		return (
			<form style={styles} onSubmit={this.handleSubmit}>
				<input autoFocus={true} className="login-input" style={inputStyles} type="text" ref="usernameInput" placeholder="tMDB username" />
				<input className="login-input" style={_.extend({}, inputStyles, {marginTop: '1rem'})} type="password" ref="passwordInput" placeholder="tMDB Password" />
				<button style={_.extend(buttonStyles, {marginTop: '1rem'})} type="submit">Log in</button>
				<p style={{marginTop: '1em'}}><a href="https://www.themoviedb.org/account/signup" target="_blank" style={{color: 'inherit'}}>Register on tMDB</a></p>
			</form>
		);
	},

	handleSubmit: function(event) {
		event.preventDefault();
		if(this.props.onSubmit) {
			this.props.onSubmit({
				username: this.refs.usernameInput.getDOMNode().value,
				password: this.refs.passwordInput.getDOMNode().value
			});
		}
	}
});

export default LoginForm;
