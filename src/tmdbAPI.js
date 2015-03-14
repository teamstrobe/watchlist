/*global fetch:false*/

import 'whatwg-fetch';
import CONFIG from '../app.config';

let tmdbAPI = { };

tmdbAPI.sessionId = null;

if(localStorage && localStorage.getItem('sessionId')) {
	tmdbAPI.sessionId = localStorage.getItem('sessionId');
}

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

	if(tmdbAPI.sessionId) {
		params.session_id = tmdbAPI.sessionId;
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

function authorize(username, password) {

	if(typeof tmdbAPI.sessionId !== 'undefined' && tmdbAPI.sessionId) {
		return Promise.resolve(tmdbAPI.sessionId);
	}

	return action('/authentication/token/new')
		.then(function(body) {
			return action('/authentication/token/validate_with_login', {
				request_token: body.request_token,
				username: username,
				password: password
			});
		})
		.then(function(body) {
			return action('/authentication/session/new', {
				request_token: body.request_token
			});
		})
		.then(function(body) {
			tmdbAPI.sessionId = body.session_id;
			if(localStorage) localStorage.setItem('sessionId', tmdbAPI.sessionId);
			return tmdbAPI.sessionId;
		})
}

function authorizedCall(uri, data, isPost) {
	return authorize()
		.then(function() {
			return action(uri, data, isPost);
		});
}

tmdbAPI.get = function(uri, data) {
	return action(uri, data);
};

tmdbAPI.post = function(uri, data) {
	return action(uri, data, true);
};

tmdbAPI.authorize = authorize;

export default tmdbAPI;
