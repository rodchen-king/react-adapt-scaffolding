/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-11-25 21:58:10
 * @LastEditTime: 2022-01-04 11:13:45
 * @LastEditors: rodchen
 */

const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build') // __dirname代表当前文件的目录绝对路径，nodejs的变量
  },
  // loader配置
  module: {
    rules: [
      
    ]
  },
  // plugins
  plugins: [

  ],
  // mode 模式
  mode: 'development'
}