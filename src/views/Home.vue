<template>
  <div class="home">
    <div class="shop_top"><shop-head></shop-head></div>
    <div><banner :list="banner_list"></banner></div>
    <div class="shop_content">
      <brand :brand_list='brand_list'></brand>
      <div v-for="(v,k) in goods_list" :key="k">
        <shop-product-block :goods_list.sync="v" v-if="v.items.length>0"></shop-product-block>
      </div>
    </div>
    <li v-for="(v,i) in index_banner_url" :key="i">{{v.url}}</li>
  </div>
</template>

<script>
// @ is an alias to /src
import storage from '@/utils/storage.js'
import userApi from '@/api/userApi'
import goodsApi from '@/api/goodsApi'

export default {
  name: 'Home',
  data(){
    return{
      banner_list:[{url:"/images/banner/banner_home_1.png"},{url:"/images/banner/banner_home_2.png"},{url:"/images/banner/banner_home_3.png"}],
      goods_list:[],
      brand_list:[],
      goods_list_left_adv:[],
      index_banner_url:[]
    }
  },
  components:{
    ShopHead: () => import('@/components/home/head'),
    banner: ()=> import('@/components/home/banner'),
    brand: ()=> import('@/components/home/brand'),
    ShopProductBlock: ()=> import('@/components/home/shop_product_block'),
  },
  mounted(){
    // this.get_goods_list()
    // this.getUserInfo()
    this.get_goods_list()
    // storage.set('jj','wyh')
    this.$axios.get('https://www.12306.cn/index/otn/index12306/getBanner')
    .then(res=>{
      var that = this
      
      that.index_banner_url =  res.data.data.index_banner_url
    })
  },
  methods:{
    get_goods_list(){
      goodsApi.getIndex().then(res=>{
        this.goods_list = res.data.goods
        this.banner_list = res.data.banner.items
        this.brand_list = res.data.stores.items
      })
    },
    
    
  },
}
</script>

<style scoped>
.shop_content{
  background: #f5f5f5;
  padding:20px 0 60px 0;
}
.shop_top{
  /* position: relative; */
  /* height:30px; */
  /* z-index: 666; */
  /* position: fixed; */
  /* background-color: #ff0; */
  /* left:0;
  right: 0; */
}
</style>