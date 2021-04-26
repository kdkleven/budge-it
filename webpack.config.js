// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  mode: 'development',
  entry: './public/index.js',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      inject: false,
      fingerprints: false,
      name: "Budge-it Tracker App",
      short_name: "Budge-it App",
      description: "The best bang for the buck budget tracker application.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      start_url: "/",
      display: "standalone",
      icons: [
        {
          src: path.resolve("public/icons/icon-192x192.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("images", "icons")
        }
      ]
    }),
    // Add your plugins here
    // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};
