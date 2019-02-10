/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pathConfig = require('../../app/config/path');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[md5:contenthash:hex:20].css',
  disable: true,
});

module.exports = options => ({
  node: {
    fs: 'empty',
  },
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: pathConfig.publicPath,
    },
    options.output,
  ), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules\/(?!@capillarytech)/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!@capillarytech)/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader', 'sass-loader?sourceMap'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules\/(?!@capillarytech)/,
        use: extractSass.extract({
          use: ['style-loader', 'css-loader', 'less-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        // // Do not transform vendor's CSS with CSS-modules
        // // The point is that they remain in global scope.
        // // Since we require these CSS files in our JS or CSS files,
        // // they will be a part of our compilation either way.
        // // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    extractSass,

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      moment$: 'moment/moment.js',
    },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
