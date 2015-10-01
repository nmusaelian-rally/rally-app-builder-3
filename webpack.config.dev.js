var path = require('path');
var webpack = require('webpack');
var fs = require('fs-extra');

var BABEL_CACHE_TEMP_DIR = path.resolve(__dirname, './.temp/babel');
var version = require('./package.json').version;

fs.mkdirpSync(BABEL_CACHE_TEMP_DIR);

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.js$/,
      loader: 'babel-loader?stage=1&optional=runtime&loose=es6.classes&cacheDirectory=' + BABEL_CACHE_TEMP_DIR + '&cacheIdentifier=' + version,
      devLoader: 'babel-loader?stage=1&optional=runtime&loose=es6.classes&cacheDirectory=' + BABEL_CACHE_TEMP_DIR + '&cacheIdentifier=' + version,
      exclude: /node_modules\/(?!sombrero)/
    },
    {
      test: /\.scss$/,
      exclude: /.*sombrero.*\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "ie >= 9"]}!sass-loader'
    },
    {
      test: /.*sombrero.*\.scss$/,
      loader: 'css!sass'
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.png/,
      loader: 'url?limit=10000&minetype=image/png'
    },
    {
      test: /\.woff$/,
      loader: "url?limit=10000&minetype=application/font-woff"
    },
    {
      test: /\.ttf$/,
      loader: "file"
    },
    {
      test: /\.eot$/,
      loader: "file"
    },
    {
      test: /\.svg$/,
      loader: "file"
    }]
  }
};
