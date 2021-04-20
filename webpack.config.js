const path = require("path");
//const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  mode: 'production',
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: DIST_DIR,
    filename: "reviews_bundle.js",
  },
  plugins: [
    new BrotliPlugin({
      asset: '[file].br',
      test: /\.js$/
    })
  ]

};