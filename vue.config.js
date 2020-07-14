const path = require("path")

module.exports = {
    configureWebpack:()=>({
        resolve:{
            alias:{
                '@views':path.resolve('./src/views'),
                '@admin':path.resolve('./src/views/admin')
            }
        },
        
    }),
    devServer:{
        // proxy: process.env.BASE_URL,
        proxy:{
            '/api':{
                target:'http://demo.acuit.net:9000',
                ws:true,
                changeOrigin:true,
                pathRewrite: {
                    '^/api':'/' 
                  },
            }
        }
    },
    chainWebpack: config => { // 配置虚拟环境
        config.plugin("define").tap(args => {
            args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
            return args;
        });
    }
}