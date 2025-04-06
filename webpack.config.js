const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'dom-toolkit.min.js' : 'dom-toolkit.js',
      library: {
        name: 'DOMToolkit',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: []
            }
          }
        }
      ]
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
          extractComments: false,
        }),
      ],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
}; 