/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2022-01-04 14:32:16
 * @LastEditTime: 2022-01-04 20:17:42
 * @LastEditors: rodchen
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配哪些文件
        use: [ // use数组中的loader顺序是从右到左，从下到上的执行顺序
          MiniCssExtractPlugin.loader,
          'css-loader', // 将css文件变成commonjs模块加载js中，里面内容是样式字符串，=
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // post插件
                // eslint-disable-next-line global-require
                require('postcss-preset-env')(), // 帮postcss找到package.json中browserslist里面的配置，通过配置加载制定的css兼容性样式，默认是使用生产环境配置
              ],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 复制文件，并且加上自动引入打包输出的所有资源
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  devtool: 'cheap-module-source-map',
});
