/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-11-25 21:58:10
 * @LastEditTime: 2022-01-04 13:55:11
 * @LastEditors: rodchen
 */

const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build') // __dirname代表当前文件的目录绝对路径，nodejs的变量
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.less$/,  // 匹配哪些文件
        use: [ // use数组中的loader顺序是从右到左，从下到上的执行顺序
          'style-loader', // 将css-laoder生成的js文件， 创建styles标签，将js的css央视资源插入，添加到head中生效
          'css-loader',  // 将css文件变成commonjs模块加载js中，里面内容是样式字符串，=
          'less-loader'
        ]
      }
    ]
  },
  // plugins
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html' //复制文件，并且加上自动引入打包输出的所有资源
    })
  ],
  // mode 模式
  mode: 'development'
}