var path = require('path');
var webpack = require('webpack');

var BABEL_CACHE_TEMP_DIR = path.resolve(__dirname, './.temp/babel');
var version = require('./package.json').version;
var HtmlWebpackPlugin = require('html-webpack-plugin');

HtmlWebpackPlugin.prototype.emitHtml = function(compilation, htmlTemplateContent, templateParams, outputFilename) {
  compilation.assets[outputFilename] = {
    source: function() {
      return htmlTemplateContent;
    },
    size: function() {
      return htmlTemplateContent.length;
    }
  };
};

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      templateContent: function(templateParams, compilation) {
        var code = compilation.assets['bundle.js'].children[0]._value;

        return ['<!DOCTYPE html> <html><title>My Rally App</title> <head> <script type="text/javascript">',
                code,
                '</script><meta http-equiv="Content-type" content="text/html; charset=utf-8"/>  </head> <body> </body> </html>'].join('');
      }
    })  
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
