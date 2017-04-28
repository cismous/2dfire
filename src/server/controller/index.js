const config = require('../../config/index')

module.exports = async (ctx) => {
  await ctx.render('index')
}
