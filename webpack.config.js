var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./src/index.jsx',
		'whatwg-fetch'// Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
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
	devServer: {
		contentBase: "./public",
		noInfo: true, //  --no-info option
		hot: true,
		historyApiFallback: true,
		inline: true
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new CopyWebpackPlugin([{
			from: './src/index.html'
		}])
	]
};
