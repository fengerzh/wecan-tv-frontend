// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index',
  ],
  output: {
    publicPath: '/build/',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js', // 生成的结果文件
  },
  resolve: {
    extensions: ['', '.js', '.jsx'], // 这样在import的时候不用写全部名字
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // 找到所有后缀为jsx的文件，并进行编译
        // include: path.join(__dirname, 'src'),
        exclude: [
          /node_modules/, // 排除node_modules文件夹
          /cyberplayer/,
        ],
        loader: 'babel', // 用babel来加载，把所有代码编译为普通浏览器可以使用的代码
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0', // 配合使用async/await
            'react-hmre',
          ],
        },
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css', // Run both loaders
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         NODE_ENV: JSON.stringify('production'),
    //     },
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //     minimize: true,
    // }),
  ],
};
