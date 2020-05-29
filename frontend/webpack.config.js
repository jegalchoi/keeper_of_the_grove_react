const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.'],
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    watchContentBase: true,
    historyApiFallback: true,
    open: false,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
  ],
}
