/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 20:56:57
 * @LastEditors: rodchen
 */
const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  module: {
    rules: [
    ],
  },
  plugins: [
    new ESLintPlugin({
      fix: true
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'eval-source-map',
});
