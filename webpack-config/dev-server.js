const devServer = {
  port: 8989,
  hot: true,
  compress: true,
  host: '0.0.0.0',
  historyApiFallback: false,
  inline: true,
  publicPath: '/',
  headers: {
    'X-My-Header': '^_^'
  }, //自定义返回头
  proxy: {
    "/api": {
      target: "http://localhost:8989",
      pathRewrite: {
        "^/api": ""
      }
    }
  }
}

module.exports = devServer;