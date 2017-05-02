const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const autoprefixer = require('autoprefixer')

const sourcePath = path.join(__dirname, 'src/client/assets/style')
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProduction = env === 'production'
const extractSass = new ExtractTextPlugin({
  filename: '[name].css?[contenthash]',
})

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Page Index',
    template: path.join(__dirname, 'src/client/templates/index.html'),
    filename: path.join(__dirname, 'dist/templates/index.twig'),
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [autoprefixer()],
      context: sourcePath,
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `"${env}"`,
  }),
]

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
      output: {
        comments: false,
      },
    }),
    extractSass
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  )
}

const rules = [{
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]?[hash]'
  },
}, {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    compact: false,
    presets: [['es2015', {'modules': false}]]
  },
}]

if (isProduction) {
  rules.push({
    test: /\.scss$/,
    loader: extractSass.extract({
      use: 'css-loader?importLoaders=1&minimize=true!postcss-loader!sass-loader',
      fallback: 'style-loader',
    }),
  })
} else {
  rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader',],
  });
}

module.exports = {
  devtool: isProduction ? 'eval' : 'source-map',
  entry: './src/client/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js?[hash]',
  },
  devServer: {
    historyApiFallback: true,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    port: 4002,
  },
  module: {
    rules,
  },
  plugins,
}
