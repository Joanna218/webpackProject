const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.(png|jpg)/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'index.[hash].css' }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "static", to: "dist/" },
      ],
    }),
    new webpack.DefinePlugin({
      // Definitions...
      PRODUCTION: JSON.stringify(true),
    }),
    new CompressionPlugin(),
  ],
  devtool: 'source-map',

};