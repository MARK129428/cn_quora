const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")
const portfinder = require('portfinder');

const devConfig = merge({
  mode: "development",
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    client: {
      progress: true,
    },
  },
}, commonConfig)

module.exports =  new Promise((resolve, reject) => {
  portfinder.getPort((err, port) => {
    if(err){
      reject(err);
      return;
    }
    devConfig.devServer.port = process.env.PORT = port;
    resolve(devConfig);
  });
});