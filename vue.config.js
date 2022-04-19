module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  publicPath: process.env.NODE_ENV==='production' ? '/apps/portalpeticiones/' : '/',
  pwa: {
    workboxOptions:{
      skipWating:true
    }
  }
}
