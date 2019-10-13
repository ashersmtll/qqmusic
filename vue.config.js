const path = require('path');

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    css: {
        modules: false,
        //extract: false,
        sourceMap: false
    },
    productionSourceMap: false,
    publicPath: '/',
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));
        //config.optimization.minimize(true);
    },
    configureWebpack: () => {},
    pwa: {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        open: true,
        proxy: 'http://localhost'
    }
};

function addStyleResource (rule) {
    rule.use('style-resource').loader('style-resources-loader')
    .options({
        patterns: [
            path.resolve(__dirname, './src/common/css/variable.styl'),
            path.resolve(__dirname, './src/common/css/mixin.styl'),
        ],
    })
}
