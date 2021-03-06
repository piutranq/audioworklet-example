const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

const config = {
  entry: {
    window: './src/window/index.js',
    audioWorklet: './src/audioWorklet/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: '[name].bundled.js'
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new ESLintPlugin()]
}

module.exports = config
