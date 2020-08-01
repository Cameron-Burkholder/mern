const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: path.join(__dirname, "/src/", "index.js"),
   output: {
      path: path.join(__dirname, "/public"),
      filename: "index_bundle.js"
   },
   devServer: {
      inline: true,
      port: 5000
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
               presets: ["@babel/preset-env", "@babel/preset-react"]
            }
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: path.join(__dirname, "/public/", "index.html")
      })
   ]
}
