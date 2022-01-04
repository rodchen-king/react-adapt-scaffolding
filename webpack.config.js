/* eslint-disable */


const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',   // 将js中css内容提取放，添加style标签放在head中生效
          MiniCssExtractPlugin.loader, // css文件不用直接添加header中，而是提取单独的css文件
          'css-loader', // 将css文件处理成commonjs模块，加载在js模块中，内部是css样式内容
          {
            loader: 'postcss-loader',   // package中的browserslist配置
            options: {
              ident: 'postcss',
              plugins: () => [
                // post插件
                require('postcss-preset-env')()
              ]
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader', // less-loader将less文件处理成css文件
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // post插件
                require('postcss-preset-env')()
              ]
            }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        enforce: 'pre',
        use: [
          // 'eslint-loader'   // eslint规则在package.json中配置，eslintConfig配置的从airbnb-base继承得到的结果
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [[
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: '3'
                  },
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]],
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',  // 一个load的写法，下载url-loader，file-loader
        options: {
          limit: 8 * 1024, // 图片小于8kb，就会被base64处理。优点：减少请求数量（江青服务器压力）。缺点：图片体积变大，文件请求数独更大
          esModule: false, // url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs格式，解析出问题，方法：关闭url-loader的es6模块化，使用commonjs解析
          name: '[hash:10].[ext]', // ext取文件的原来扩展名
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'  // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
      },
      // 打包其他资源除了html｜css｜js
      {
        exclude: /\.(css|js|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]', // ext取文件的原来扩展名
          outputPath: 'media'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[hash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
}