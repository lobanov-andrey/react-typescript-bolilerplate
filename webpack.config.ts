import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlInlineScriptPlugin from 'html-inline-script-webpack-plugin'
import HTMLInlineCSSWebpackPlugin from 'html-inline-css-webpack-plugin'
import commonWebpackConfig from './common.webpack.config'

console.log({
  commonWebpackConfig,
})

// @ts-ignore
module.exports = (env, args): webpack.Configuration => {
  const production = args.mode == 'production'

  const remote = 'remote'
  const start = 'start'

  const plugins: webpack.Configuration['plugins'] = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ]

  if (production) {
    plugins.push(
      new HtmlInlineScriptPlugin({
        scriptMatchPattern: [/start.+[.]js$/],
      })
    )
    plugins.push(
      new HTMLInlineCSSWebpackPlugin({
        filter: filename => {
          return filename != `${remote}.css`
        },
      })
    )
  }

  return {
    target: 'web',
    entry: {
      [remote]: [`./src/${remote}/${remote}.tsx`],
      [start]: [`./src/${start}/${start}.tsx`],
    },
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'eval',
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
        {
          test: /\.s[ac]ss$/i,
          use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
  }
}
