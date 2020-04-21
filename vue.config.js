const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('lin', resolve('src/lin'))
      .set('assets', resolve('src/assets'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/share.scss";',
      },
    },
  },
  devServer: {
    proxy: {
      '/cms': {
        target: 'http://pedro.7yue.pro/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/cms': 'cms',
        },
      },
      '/v1': {
        target: 'http://pedro.7yue.pro/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/v1': 'v1',
        },
      },
    },
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist'],
}
