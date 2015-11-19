'use strict'
// imports
var webpack = require('webpack')

module.exports = function(options){

  // base set of plugins, used in any configuration
  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.nodeEnv)
    })
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
