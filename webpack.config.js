

module.exports = {

	// File extensions that can be omitted in `require()` statements
	resolve: {
		extensions: [
			'.js',
			'.json'
		]
	},

	// Have webpack watch for changes, not gulp, because webpack does the linting
	watch: false,

	// Entry points 
	entry: [
		'./public_html/app/app.js'
	],

	// Dist (path set by gulp)
	output: {
		filename: 'app.js'
	},

	module: {

		rules: [
			{
				test: /\.js$/,
				exclude:  __dirname + '/node_modules',
				use: [

					// Linting
					{
						loader: 'jshint-loader'	
					},

					// Babel for ES6
					{
						loader: 'babel-loader'
					}
				]
			}
		]

	},

	// JSHint options
 //    jshint: {

	// 	// jshint errors are displayed by default as warnings 
	// 	// set emitErrors to true to display them as errors 
	// 	emitErrors: false,

	// 	// jshint to not interrupt the compilation 
	// 	// if you want any file with jshint errors to fail 
	// 	// set failOnHint to true 
	// 	failOnHint: false,

	// 	// Custom reporter with colors
	// 	reporter: require('jshint-loader-stylish')({
	// 		style: 'default'
	// 	})

	// },
};