
const webpack = require('webpack');

module.exports = function(env){

	// Check for production flag
	var PROD = process.env.NODE_ENV == 'production';

	return {

		// Have webpack watch for changes, not gulp, because webpack does the linting
		watch: true,

		// Node server for quick local dev
		devServer: {
			contentBase: './public_html', // static files (index.html) to serve on URL
			watchContentBase: true, // watch dist folder for changes and refresh
			publicPath: PROD ? '/build/' : '/dist/', // put bundled JS here
			historyApiFallback: true, // show index.html for 404s
			inline: true, // inline the webpack stuff that allows for refresh on change
			port: 8080, // pick a port
			watchOptions: {
				poll: 1000 // check for changes every second
			}
		},

		// Sourcemaps: simpler and faster one for development, slower and more secure one for production
		devtool: PROD ? 'source-map' : 'cheap-module-eval-source-map',

		// File extensions that can be omitted in import and require statements
		resolve: {
			extensions: [
				'.js',
				'.json'
			]
		},

		// Entry point(s)
		entry: [
			'./public_html/app/app.js'
		],

		// Destination for bundles
		output: {
			filename: 'bundle.js',
			path: PROD ? __dirname + '/public_html/build' : __dirname + '/public_html/dist',
		},

		// Rules for bundling 
		module: {

			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude:  __dirname + '/node_modules',
					use: [

						// Linting
						{
							loader: 'eslint-loader'	
						}

					]
				},
				{
					test: /\.js$/,
					exclude:  __dirname + '/node_modules',
					use: [

						// Babel for ES6
						{
							loader: 'babel-loader'
						}
					]
				}
			]
		},

		plugins: [
	        new webpack.LoaderOptionsPlugin({
	            minimize: true,
	            debug: false
	        }),
	        new webpack.optimize.UglifyJsPlugin({
	            beautify: false,
	            mangle: {
	                screw_ie8: true,
	                keep_fnames: true
	            },
	            compress: {
	                screw_ie8: true
	            },
	            comments: false
	        })
   		]
	}
};