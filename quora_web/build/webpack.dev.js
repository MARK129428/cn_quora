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
          "Authorization" :
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwiVXNlcm5hbWUiOiLlvKDkuIkiLCJpc3MiOiJ0ZXN0Iiwic3ViIjoic29tZWJvZHkiLCJhdWQiOlsic29tZWJvZHlfZWxzZSJdLCJleHAiOjE2NzkwMzUxMDgsIm5iZiI6MTY3ODk0ODcwOCwiaWF0IjoxNjc4OTQ4NzA4LCJqdGkiOiIxIn0.CdD8wXvPAHjoZW0Qmj94VDw-z2TDgKidSvl0dS3EXzs"
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