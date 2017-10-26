module.exports = {
  entry: './components',
  output: {
    path: __dirname,
    filename: './public/js/bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
    ],
  },
};
