import axios from 'axios'
import store from '@/store'
import storage from './storage'
import { Message } from 'element-ui'

const service = axios.create({ // axios 实例
    baseURL:'/api',
    timeout:5000
})

service.interceptors.request.use( // request 拦截
    config =>{
        if(storage.get('jwt')){
            config.headers['xl-shop'] = storage.get('jwt')
        }
        if(config.method === 'post'){
            config.data = config.params
            config.params = ''
        }
        return config
    },
    error =>{
        console.log(error)
        Promise.reject(error)
    }
)

service.interceptors.response.use( // response 拦截
    response =>{
        // let {data,code,msg,result,message} = response.data;
        if(response.data.code != 200){
            console.error(response.data.msg);
            Message.error(response.data.msg);
            return Promise.reject(response.data);
        }else{
            return response.data
        }
    },
    error =>{
        console.log(error)
        return Promise.reject(error)
    }

)

export default service