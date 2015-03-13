/*global fetch:false*/

import 'whatwg-fetch';
import CONFIG from '../app.config';

var sessionId = null;

function serializeParams(obj) {
	var str = '';
	for (var key in obj) {
		if (str !== '') {
			str += '&';
		}
		str += key + '=' + encodeURIComponent(obj[key]);
	}
	return str;
}

function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function json(response) {
	if(typeof response.json === 'function') {
		return response.json();
	}
}

function action(uri, data, isPost) {
	data = data || null;
	isPost = isPost || false;

	var opts = {};

	if(data && isPost) {
		opts.body = JSON.stringify(data);
		opts.method = 'post';
		opts.headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
	}

	var params = {
		api_key: CONFIG.API_KEY
	};

	if(sessionId) {
		params.session_id = sessionId;
	}

	if(data && !isPost) {
		for(var i in data) {
			params[i] = data[i];
		}
	}

	return fetch(CONFIG.API_BASE + uri + '?' + serializeParams(params), opts)
		.then(status)
		.then(json);
}

function authorize() {
	if(typeof sessionId !== 'undefined' && sessionId) {
		return Promise.resolve(sessionId);
	}

	return action('/authentication/token/new')
		.then(function(body) {
			return action('/authentication/token/validate_with_login', {
				request_token: body.request_token,
				username: CONFIG.API_USERNAME,
				password: CONFIG.API_PASSWORD
			});
		})
		.then(function(body) {
			return action('/authentication/session/new', {
				request_token: body.request_token
			});
		})
		.then(function(body) {
			sessionId = body.session_id;
			return sessionId;
		})
		.catch(function(ex) {
			console.error('Failed to authorize user.', ex);
		});
}

function authorizedCall(uri, data, isPost) {
	return authorize()
		.then(function() {
			return action(uri, data, isPost);
		});
}

const tmdbAPI = {
	get: function(uri, data) {
		return authorizedCall(uri, data);
	},

	post: function(uri, data) {
		return authorizedCall(uri, data, true);
	}
};

export default tmdbAPI;
