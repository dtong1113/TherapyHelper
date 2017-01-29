module.exports = {
	entry: "./js/entry.js",
	output: {
		path: __dirname + '/build',
		filename: "bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: "style!css"
			},
		    {
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},
	vue: {
    	loaders: {
      		js: 'babel'
    	}
  	}
};