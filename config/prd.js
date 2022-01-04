/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 15:16:21
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
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // post插件
                require('postcss-preset-env')() // 帮postcss找到package.json中browserslist里面的配置，通过配置加载制定的css兼容性样式，默认是使用生产环境配置
              ]
            }
          },
          'less-loader',
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