'use strict'
// imports
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(options){

  // base set of plugins, used in any configuration
  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.nodeEnv)
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]

  // production configuration
  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
    )
  }

  return {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },{
        test: /\.(svg|ttf|woff2?)$/,
        loaders: ['url?limit=10000'],
        exclude: /node_modules/
      },{
        test: /^((?!\.module).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        )
      }, {
        test: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        )
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    externals: [
      'wcjs-renderer',
      'react'
    ],
    output: {
      library: 'react-wcjs-player',
      libraryTarget: 'umd'
    },
    plugins: plugins
  }
}
