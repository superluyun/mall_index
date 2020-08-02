const path = require("path")
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
    // outputDir: process.env.NODE_ENV === 'production'? '/dist_index/dist': '/',
    configureWebpack:()=>({
        resolve:{
            alias:{
                '@views':path.resolve('./src/views'),
                '@admin':path.resolve('./src/views/admin')
            }
        },
        plugins: process.env.NODE_ENV=='production'?[
            new PrerenderSPAPlugin({
                // Required - The path to the webpack-outputted app to prerender.
                staticDir: path.join(__dirname, 'dist'),
                // Required - Routes to render.
                routes: [ '/'],
                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    headless: false, //渲染时显示浏览器窗口。对调试很有用。  
                    //等待渲染，直到检测到指定元素。
                    //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))` 
                    renderAfterDocumentEvent: 'render-event'
                })
            })
        ]:[]
        
    }),
    devServer:{
        // proxy: process.env.BASE_URL,
        proxy:{
            '/api':{
                target:'http://demo.acuit.net:9000',
                ws:true,
                changeOrigin:true
            }
        }
    },
    chainWebpack: config => { // 打包自动压缩 zip 与预渲染冲突
        // setTimeout(()=>{
            config.plugin('filemanager').use(FileManagerPlugin).tap(c=>{
                c[0] = {}
                c[0].onEnd = {
                    archive:[
                        {source:'./dist',destination:'./dist_index.zip'}
                    ]
                }
                return c
            })
        //  },1000)
    }
    
}