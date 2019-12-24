const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: './',
    assetsDir: 'static', // 打包后静态资源路径
    css: {
        sourceMap: true,
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    /* rem适配忽略文件目录 */
                    require('postcss-px2rem-exclude')({
                        remUnit: 75,
                        exclude: /node_modules|vant/i
                    })
                ]
            }
        },
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://bigdata.yiche.com/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/Employee': {
                target: 'http://api.hr.oa.bitauto.com/Employee/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/Employee': ''
                }
            },
            '/nbi': {
                target: 'http://norbi.yccdn.com/nbi/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/nbi': ''
                }
            },
            '/indictor': {
                target: 'http://172.20.33.144:8081/indictor/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/indictor': ''
                }
            },
        }
    },
    productionSourceMap: false,
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        } else {
            config.devtool = 'source-map'
        }
        config.plugins.push(new webpack.BannerPlugin({
            banner: `hash:[hash], chunkhash:[chunkhash], file:[file] \n@Version: 1.4.0 \n@Author: zmnaer(zxf) \n@Description: A web project based on Vue family barrel , @vue/cli and vantUI.`,
            entryOnly: true,
        }))
    },

}