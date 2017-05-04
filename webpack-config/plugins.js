const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Happypack = require('happypack');
const happypackThreadPool = Happypack.ThreadPool({
  size: 8
});
function createHappyPlugin(id, loaders) {
  return new Happypack({
    id: id,
    loaders: loaders,
    threadPool: happypackThreadPool,
    cache: true
  })
}

const pages = require('./pages.js');

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'js/[name].js',
    minChunks: 2
  }),

  // 手工复制指定文件到目标目录
  // new CopyWebpackPlugin([{
  //   from: './build/bundle.js',
  //   to: path.join(__dirname, '../dist/js')
  // }]),

  //createHappyPlugin('html', ['coala-dot-loader']),
  createHappyPlugin('css', ['css-loader!sass-loader?minimize']),
  createHappyPlugin('js', ['babel-loader']),
  createHappyPlugin('image', ['file-loader?name=static/img/[name]-[hash:8].[ext]']),

  createHappyPlugin('font-ttf', ['file-loader?minetype=application/octet-stream&name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-eot', ['file-loader?name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-svg', ['file-loader?minetype=image/svg+xml&name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-woff', ['file-loader?minetype=application/font-woff&name=static/fonts/[name]-[hash:8].[ext]']),

  new ExtractTextPlugin({
    filename: 'css/[name].css'
  })
];

pages.forEach(function(page) {
  plugins.push(new HtmlWebpackPlugin({
    title: pages,
    filename: page + '.html',
    template: path.resolve(__dirname, '../template.html'),
    chunks: [page, 'common'],
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }))
});

module.exports = plugins;