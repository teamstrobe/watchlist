require('whatwg-fetch');
var CONFIG = require('../../app.config');
var Utils = require('./utils');

var sessionId = null;

function serializeParams(obj) {
	var str = "";
	for (var key in obj) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + encodeURIComponent(obj[key]);
	}
	return str;
}

function authorize() {
	return action('/authentication/token/new')
		.then(function(body) {
			return action('/authentication/token/validate_with_login', null, {
				request_token: body.request_token,
				username: CONFIG.API_USERNAME,
				password: CONFIG.API_PASSWORD
			});
		})
		.then(function(body) {
			return action('/authentication/session/new', null, {
				request_token: body.request_token
			})
		})
		.then(function(body) {
			sessionId = body.session_id;
		})
		.catch(function(ex) {
			console.error('Failed to authorize user.')
		});
}

function action(uri, asyncActions, data, isPost) {
	data = data || null;
	isPost = isPost || false;

	var opts = {};

	if(data && isPost) {
		opts['body'] = JSON.stringify(data);
		opts['method'] = 'post';
		opts['headers'] = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}

	var params = {
		api_key: CONFIG.API_KEY
	};

	if(sessionId) {
		params['session_id'] = sessionId;
	}

	if(data && !isPost) {
		for(var i in data) {
			params[i] = data[i];
		}
	}

	return fetch(CONFIG.API_BASE + uri + '?' + serializeParams(params), opts)
		.then(Utils.status)
		.then(Utils.json)
		.then(function(body) {
			if(asyncActions) {
				asyncActions.completed(body);
			}
			return body;
		})
		.catch(function(ex) {
			if(asyncActions)
				asyncActions.failed(ex);
		})
}

function actionWithSession(uri, asyncActions, data, isPost) {
	if(typeof sessionId === 'undefined' || sessionId === null) {
		authorize()
			.then(function(body) {
				action(uri, asyncActions, data, isPost);
			})
	}
	else {
		action(uri, asyncActions, data, isPost);
	}
}

var tmdbAPI = {
	get: function(uri, asyncActions, data) {
		actionWithSession(uri, asyncActions, data);
	},

	post: function(uri, asyncActions, data) {
		actionWithSession(uri, asyncActions, data, true);
	}
};

module.exports = tmdbAPI;