module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath:"/cclhunter/",
  assetsDir:"static",
  outputDir:"./cclhunter",
  devServer:{
    proxy:{
      '/cclhunter/api': {
        target: 'http://192.168.164.80:5598/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //   '^/api': ''//请求的时候使用这个api就可以写公共地址后的地址
        // },
        logLevel: 'debug' // 用于检查代理的真实地址
    }
  }
  }
}
