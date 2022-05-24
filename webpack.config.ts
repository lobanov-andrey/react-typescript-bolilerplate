import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'

const config: webpack.Configuration = {
  target: 'web',
  entry: {
    index: ['./src/index.tsx'],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/public'),
    },
    port: 7777,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      edge: '17',
                      firefox: '60',
                      chrome: '67',
                      safari: '11.1',
                      ie: '11',
                    },
                    useBuiltIns: 'usage',
                    corejs: '3.22.5',
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
}

export default config
