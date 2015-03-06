module.exports = {
	status: function(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(new Error(response.statusText))
		}
	},

	json: function(response) {
		if(typeof response.json === 'function') {
			return response.json()
		}
	}
};