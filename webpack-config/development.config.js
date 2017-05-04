var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  devServer: require('./dev-server'),
  entry: require('./entry.js'),
  output: require('./output.js'),
  module: require('./module.js'),
  plugins: require('./plugins.js'),
  resolve: {
    extensions: ['.js', '.vue'],
    modules: ['node_modules', 'src', 'src/views', 'src/assets','entry'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  }
}
  