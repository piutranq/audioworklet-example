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
  devtool: 'cheap-module-source-map'
}

module.exports = config
