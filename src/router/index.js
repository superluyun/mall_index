import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/goodslist/:id',
    name:'List',
    component:()=> import('@/views/List.vue')
  },
  {
    path:'/goodsinfo/:id',
    name:'Info',
    component:()=>import('@/views/GoodsInfo.vue')
  },
  {
    path:'/store/:id',
    name:'Store',
    component:()=>import('@/views/Store.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.NODE_ENV=='production'?'/admin':'/',
  routes
})

export default router
