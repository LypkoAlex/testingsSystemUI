var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.jsx', 'whatwg-fetch' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders.concat([{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		},
		{ test: /\.json$/, loader: "json-loader"}
	])
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './index.html'
		}]),
	]
};
