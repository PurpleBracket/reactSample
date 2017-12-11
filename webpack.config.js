const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const WebpackOnBuildPlugin = require('on-build-webpack')
const fs = require('fs-extra')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const shell = require('shelljs')
// const WriteFilePlugin = require('write-file-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-intl', 'react-redux', 'react-router', 'react-router-dom', 'recharts',
  'redux', 'redux-form', 'redux-promise', 'react-ga', 'prop-types'
]

const config = function (env) {
  return {  // devtool: 'source-map',
    // devtool: 'cheap-module-eval-sourcemap',
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /(node_modules|bower_components|express-enrouten)/,
          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
      new webpack.DefinePlugin({
        CONFIG_ENV: JSON.stringify(env.CONFIG_ENV),
        'process.env.NODE_ENV': JSON.stringify(env.CONFIG_ENV)
      })
    ]
  }
}

const server = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  entry: {
    server: './src/server/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new CopyWebpackPlugin([
        {from: 'src/packages/express-plus/src/config', to: 'config'},
        {from: './src/config', to: 'config'},
        {from: 'webpack.config.js', to: 'config'}
    ],
      {
        ignore: ['**/tests/*']
      }),
    new WebpackOnBuildPlugin(function (stats) {
      // if (shell.exec('babel src/packages/express-plus/src/controllers -d dist/controllers').code !== 0) {
      //   throw new Error('On build babel transpile controllers failed!')
      // }

      let files = ['dist', 'package.json']

      files.forEach(function (f) {
        fs.copySync(f, 'bundle/' + f)
      })
    })
    // new WriteFilePlugin()
  ]
}

const client = {
  entry: {
    client: './src/client/client.js',
    vendor: VENDOR_LIBS
  },
  target: 'web',
  // externals: {
  //   fs: 'fs',
  //   module: 'module',
  //   net: 'net',
  //   tls: 'tls',
  //   'plaid.interface': 'plaid.interface'
  // },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    // filename: '[name].[hash].js',
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true
              }
            },
            'postcss-loader?parser=postcss-scss',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 40000}
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new StyleLintPlugin(),
    new ExtractTextPlugin('style-[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    new HtmlWebPackPlugin({
      template: 'src/client/static/index.html'
    }),
    new WebpackOnBuildPlugin(function (stats) {
      let files = ['dist/public']

      files.forEach(function (f) {
        fs.copySync(f, 'bundle/' + f)
      })
    })
  ]
}

module.exports = function (env) {
  if (env.CONFIG_ENV === 'production') {
    client.plugins.push(new UglifyJsPlugin())
  }

  let sharedConfig = config(env)
  if (env.CONFIG_ENV !== 'production') {
    sharedConfig.devtool = 'cheap-module-eval-sourcemap'
  }

  return [merge.smart(client, sharedConfig), merge.smart(server, sharedConfig)]
}
