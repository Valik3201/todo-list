const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GhPagesWebpackPlugin = require("gh-pages-webpack-plugin");

module.exports = {
  // The entry point file described above
  entry: "./src/script.js",
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: "eval-source-map",

  resolve: {
    extensions: [".js", ".mjs"],
  },

  devServer: {
    open: true,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "public" },
        { from: "public/index.html", to: "index.html" },
      ],
    }),
    new GhPagesWebpackPlugin({
      path: "./public",
      options: {
        message: "Update Home Page",
        user: {
          name: "Valik3201",
          email: "valik3201@gmail.com",
        },
      },
    }),
  ],
};
