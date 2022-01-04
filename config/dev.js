/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 14:37:19
 * @LastEditors: rodchen
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
})