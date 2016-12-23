// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var devApiHost=require('../src/settings/api-host').devProxyHost
var devStaticHost=require('../src/settings/static-host').devStaticHost

// console.log('dev api host: ',devApiHost)
// console.log('dev static host: ',devStaticHost)

module.exports = {
  build: { 
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../dist/index.html'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    index: path.resolve(__dirname, '../static/www/new/index.html'),
    assetsRoot: path.resolve(__dirname, '../static/www/new'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'), 
    port: 3333,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/rest':{target:devApiHost,changeOrigin:true},
        '/api':{target:devApiHost,changeOrigin:true},
        '/upload':{target:devStaticHost,changeOrigin:true},
        '/article':{target:devStaticHost,changeOrigin:true}
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
