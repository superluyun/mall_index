import request from "@/utils/request";

export default {
    // 获取site配置信息
    getSiteInfo(){
        return request({
            url:'/site',
            method:'get'
        })
    }
};