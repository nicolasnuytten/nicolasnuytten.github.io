const path = require(`path`);
const webpack = require(`webpack`);

const ImageminPlugin = require(`imagemin-webpack-plugin`).default;
const imageminJpegRecompress = require(`imagemin-jpeg-recompress`);

const merge = require(`webpack-merge`);
const parts = require(`./webpack.parts.js`);

const PATHS = {
  src: path.join(__dirname, `src`),
  dist: path.join(__dirname, `dist`),
};

const commonConfig = merge([ {
  entry: [
    path.join(PATHS.src, `css/style.css`),
    path.join(PATHS.src, `js/script.js`),
  ],
  devtool: `sourcemap`,
  devServer: {
    contentBase: `./src`,
    historyApiFallback: true,
    hot: true,
    host: `0.0.0.0`,
    port: 8008,
  },
  output: {
    path: PATHS.dist,
    filename: `js/script.js`,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [{
          loader: `babel-loader`,
        },
        {
          loader: `eslint-loader`,
          options: {
            fix: true,
          },
        },
        ],
      }, {
        test: /\.html$/,
        loader: `html-loader`
      }, {
        test: /\.php$/,
        loaders: [
          `html-minify`,
          `php-loader`
        ]
      }, {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              limit: 1000,
              context: `./src`,
              name: `[path][name].[ext]`
            }
          }, {
            loader: `image-webpack-loader`,
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: `65-90`,
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: `es6-promise`,
      fetch: `imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch`,
    }),
  ],
}]);

const productionConfig = merge([
  parts.extractCSS(),
  {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g)$/i,
        plugins: [
          imageminJpegRecompress({})
        ]
      }),
    ]
  }
]);
const developmentConfig = merge([
  {
    devServer: {overlay: true,
      contentBase: PATHS.src},
  },
  parts.loadCSS(),
]);

if (process.env.NODE_ENV === `production`) {
  console.log(`Building production`);
  module.exports = merge(commonConfig, productionConfig);
} else {
  module.exports = merge(commonConfig, developmentConfig);
}
