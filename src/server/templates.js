const views = require('koa-views')
const nunjucks = require('nunjucks')

module.exports = (app, config) => {
  app.use(views(config.templatePath, {
    extension: 'twig',
    map: {
      twig: 'nunjucks'
    }
  }))
}
