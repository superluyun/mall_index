import axios from 'axios'
import store from '@/store'

const service = axios.create({ // axios 实例
    baseURL:'',
    timeout:5000
})

service.interceptors.request.use( // request 拦截
    config =>{
        if(store.getters.token){
            config.headers['X-Token'] = store.getters.token
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
        if(response.code !== 200){
            return Promise.reject(false)
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