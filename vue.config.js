const path = require("path")
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
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
    // chainWebpack: config => { // 配置虚拟环境
    //     config.plugin("define").tap(args => {
    //         args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
    //         return args;
    //     });
    // }
    
}