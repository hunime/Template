const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "./src/main.ts"),
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./public"),
    },
    compress: true,
    port: 4200,
  },

  output: {
    path: path.resolve(__dirname, "./public/static"),
    filename: "js/[name].min.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
      chunkFilename: "css/[name]-chunk.css",
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
      }),

      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssnanoMinify,
      }),
    ],
  },
};
