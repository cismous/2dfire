const path = require('path')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = env === 'production'
const root = path.normalize(path.join(__dirname, '../../'))
const templatePath = path.join(root, '/dist/templates')

module.exports = {
  root,
  env,
  isProduction,
  port: 4001,
  hotPort: 4002,
  templatePath,
}
