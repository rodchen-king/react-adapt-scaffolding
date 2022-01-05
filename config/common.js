/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-25 21:58:10
 * @LastEditTime: 2022-01-04 21:33:20
 * @LastEditors: rodchen
 */

const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, '../build'), // __dirname代表当前文件的目录绝对路径，nodejs的变量
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配哪些文件
        use: [ // use数组中的loader顺序是从右到左，从下到上的执行顺序
          'style-loader', // 将css-laoder生成的js文件， 创建styles标签，将js的css央视资源插入，添加到head中生效
          'css-loader', // 将css文件变成commonjs模块加载js中，里面内容是样式字符串，=
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 图片小于8kb，就会被base64处理。优点：减少请求数量（减轻服务器压力）。缺点：图片体积变大，文件请求数独更大
              esModule: false, // url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs格式，解析出问题，方法：关闭url-loader的es6模块化，使用commonjs解析
              name: '[hash:10].[ext]', // ext取文件的原来扩展名,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader', // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
      },
      {
        exclude: /\.(less|css|js|html)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.jsx?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          loader: 'babel-loader',
        }
    }
    ],
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 复制文件，并且加上自动引入打包输出的所有资源
    }),
  ],
};
