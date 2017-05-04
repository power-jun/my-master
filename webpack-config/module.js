const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config.js');

var modules = {
  rules: [{
      test: /\.css$/,
      // include: config.srcDir,
      use: ExtractTextPlugin.extract({
        fallback: "vue-style-loader",
        use: 'happypack/loader?id=css',
        publicPath: '../'
      })
    },
    {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      // include: config.srcDir,
      exclude: /node_modules/
    },
    {
      test: /\.ttf\??.*$/,
     // include: path.resolve('./src/assets/vendors/'),
      loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/octet-stream'
    }, {
      test: /\.eot\??.*$/,
    //  include: path.resolve('./src/assets/vendors/'),
      loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]'
    }, {
      test: /\.svg\??.*$/,
    //  include: path.resolve('./src/assets/vendors/'),
      loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=image/svg+xml'
    }, {
      test: /\.(woff|woff2)\??.*$/,
    //  include: path.resolve('./src/assets/vendors/'),
      loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/font-woff'
    },
    {
      test: /\.(jpg|png|gif|jpeg)$/,
      use: 'file-loader?name=static/img/[name]-[hash:8].[ext]'
    }
  ]
};

module.exports = modules;