const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const MODE = 'development'
const enabledSourceMap = MODE === 'development'

module.exports = {
  mode: MODE,
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/docs`,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  ["autoprefixer", { grid: true }],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  devServer: {
    contentBase: "docs",
    open: true
  }
}
