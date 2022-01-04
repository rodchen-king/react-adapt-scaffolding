/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 14:52:41
 * @LastEditors: rodchen
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common')

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,  // 匹配哪些文件
        use: [ // use数组中的loader顺序是从右到左，从下到上的执行顺序
          MiniCssExtractPlugin.loader,
          'css-loader',  // 将css文件变成commonjs模块加载js中，里面内容是样式字符串，=
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ]
})