const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpng|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      },
    ]
  },
  plugins: [
    // 壓縮 js 檔案
    new TerserPlugin(),

    //  移除 style 標籤另外引入 css file
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),

    //  每次運行時先清空之前打包過的檔案
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*')
      ]
    }),

    //  使用 HTML template
    new HtmlWebpackPlugin({
      title: 'My App',
    }),
  ]
}