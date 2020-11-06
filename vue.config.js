module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: false,
  devServer: {
    open: true, // 自动打开浏览器
    host: "0.0.0.0", // 真机模拟，使用
    port: "8080", // 前台代理端口号
    https: false, // https： {type: Booleam}
    hotOnly: false, // 热更新
    // proxy: {}, // 设置代理
  },
  chainWebpack(config) {
    // 移除打包后 index.html 所有打包好的文件都预加载行为
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
};
