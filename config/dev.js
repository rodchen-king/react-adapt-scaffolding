/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 20:17:31
 * @LastEditors: rodchen
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'eval-source-map',
});
