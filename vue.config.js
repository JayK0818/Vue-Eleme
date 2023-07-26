const { defineConfig } = require('@vue/cli-service')
const { seller, goods, ratings } = require('./data.json')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      setupMiddlewares: function(middlewares, devServer) {
        devServer.app.get('/api/seller/seller_detail', (req, res) => {
          res.json({
            code: 1,
            message: '请求成功',
            data: seller
          })
        })
        devServer.app.get('/api/seller/goods', (req, res) => {
          res.json({
            code: 1,
            message: '请求成功',
            data: goods
          })
        })
        devServer.app.get('/api/seller/ratings', (req, res) => {
          res.json({
            code: 1,
            message: '请求成功',
            data: ratings
          })
        })
        return middlewares
      }
    }
  }
})
