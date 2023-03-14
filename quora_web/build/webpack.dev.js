const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common")
const portfinder = require('portfinder');

const devConfig = merge({
  mode: "development",
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    client: {
      progress: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9000/v1',
        pathRewrite: {
          '/api': ''
        },
        "headers": {
          "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQYXNzd29yZCI6ImMyMGFkNGQ3NmZlOTc3NTlhYTI3YTBjOTliZmY2NzEwIiwiVXNlcm5hbWUiOiIxMiIsImlzcyI6InRlc3QiLCJzdWIiOiJzb21lYm9keSIsImF1ZCI6WyJzb21lYm9keV9lbHNlIl0sImV4cCI6MTY3ODg4Nzk3OCwibmJmIjoxNjc4ODAxNTc4LCJpYXQiOjE2Nzg4MDE1NzgsImp0aSI6IjEifQ.lpNXY1jIVXfuWN1dkg3Sf_9ztQydnxYRwK8mcB95TpA"
        },
        changeOrigin: true
      }
    }
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