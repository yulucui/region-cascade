var path = require('path');
var config = {
  // devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'region-cascade.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,  //对这个不做处理
        use: {
          loader: 'babel-loader',
          options: {
            "plugins": ["transform-decorators-legacy"],
            presets: ['es2015', 'stage-0', 'react']    //在react环境下,也可以进行打包
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          { loader: 'url-loader?limit=8192' },
        ]
      }
    ]
  }
};

module.exports = config;