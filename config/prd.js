/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 14:39:22
 * @LastEditors: rodchen
 */
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'production'
})