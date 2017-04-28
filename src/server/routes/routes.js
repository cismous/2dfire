const Router = require('koa-router')
const indexController = require('../controller/index')

module.exports = async (app) => {
  const router = new Router()
  router.get('/', indexController)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
