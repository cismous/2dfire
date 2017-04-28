const serve = require('koa-static')

module.exports = function (app, config) {
  if (config.env === 'development') {
    const proxy = require('koa-proxy')({
      host: 'http://localhost:' + config.hotPort,
      match: /^\/assets\//,
    })
    app.use(proxy)
  } else {
    app.use(serve(config.root + '/dist'))
  }
}
