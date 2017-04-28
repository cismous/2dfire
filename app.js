const Koa = require('koa')
const app = new Koa()
const config = require('./src/config/index')

require('./src/server/koa')(app, config)
require('./src/server/templates')(app, config)
require('./src/server/routes/routes')(app, config)

if (!module.parent) {
  app.listen(config.port)
  console.log('http://localhost:' + config.port);
}
