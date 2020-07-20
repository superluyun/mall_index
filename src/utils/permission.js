import router from '@/router'
import store from '@/store'
import Storage from '@/utils/storage'

const whiteList = ['/','/goodslist','/goodsinfo'] // 不重定向白名单
router.beforeEach((to,from,next)=>{  
    console.log(to)
    if(Storage.get('token')){
        if(to.path == '/login'){
            next({path:'/'}) // 重定向到首页
        }else{
            if(!store.getters.userInfo){
                store.dispatch('getUserInfo')
            }
            next()
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next() // 重定向到登录页
        }
    }
})