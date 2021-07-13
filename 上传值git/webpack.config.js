/*
 * @Author: your name
 * @Date: 2021-07-11 20:51:14
 * @LastEditTime: 2021-07-12 23:01:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript学习\part02\webpack.config.js
 */
const path = require("path") //引入 node 的一个模块，作用是拼接路径

//配置插件 html-webpack-plugin@next
//“HtmlwebpackPlugin”这个名字随便起
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports  = {

  mode:'development',
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后名称
    filename: "bundle.js",
    // 告诉 webpack 不适用箭头函数
    environment: {
      arrowFunction: false
    }
  },

  // 指定webpack打包时使用的模块
  module: {
    // 指定加载规则
    rules:[
      {
        // test指定的时规则生成的文件,/\.ts$/转义为以 ts 结尾的文件
        test: /\.ts$/,
        // 要使用的loader，从后往前执行顺序
        use: [
          // 配置babel
          {
            //指定加载器
            loader: "babel-loader",
            // 设置 babel
            options: {
              // 设置预定义的环境
              presets: [ 
                //指定环境的插件
                [
                   "@babel/preset-env",
                   //配置信息
                   {
                    // 要兼容的浏览器
                    targets:{
                      "chrome": "86",
                      // "ie": "11"
                    },
                    // 指定corejs版本
                    "corejs": "3",
                    // 使用 corejs 的方式”usage“ 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
               
              ]
            }
          }
          ,'ts-loader'
        ],
        // 指定排除的文件，即不处理的文件
        exclude: /node_modules/
      }
    ]
  },

  // 配置 webpack 的插件
  plugins: [
    // new htmlPlugin({ template: path.resolve(__dirname, './src/index.html'), // 模板的路径 filename: 'index.html', // 生成的文件名 }),
    new HtmlWebpackPlugin({
      title: '学习中', // html的 title 属性
      filename:"app.html", // html生成名
      path: __dirname + '/dist',
      template: './src/index.html' //指定模板，
    }),
    new CleanWebpackPlugin()
],

// 设置引用的模块,那些文件可以作为模块
resolve: {
   extensions: ['.ts','.js']
}


}