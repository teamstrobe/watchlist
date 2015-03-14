var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, '/src/'),
		filename: 'bundle.js',
		publicPath: '/src/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{ test: /\.js$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
		]
	}
};
