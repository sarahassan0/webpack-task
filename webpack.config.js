const pathModule = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "script.bundle.js",
    path: pathModule.resolve(__dirname, "dist"),         //to reach the absolute path 
    assetModuleFilename: 'images/[name][ext]'            // do not hash the images name
  },
  module: {
    rules: [
      {
        test: /\.css$/i,                                   //rules for css files  loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,                   //sass lader and compile it to css code
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,              //rules for css files  loader
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin({ filename: "style.min.css" }),

  ],
  optimization: {                                        //minify the images
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg", { quality: 60 }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertShapeToPath: {
                        convertArcs: true
                      },
                      convertPathData: false
                    }
                  }
                }
              ],
            ],
          },
        },
      }),
    ],
  }

}