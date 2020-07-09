<template>
  <div class="home">
    <div class="shop_top"><shop-head></shop-head></div>
    <div><banner :list="banner_list"></banner></div>
    <div class="shop_content">
      <brand></brand>
      <div v-for="(v,k) in goods_list" :key="k">
        <shop-product-block :class_info="v.class_info"  :goods_list="v.list" :adv="goods_list_left_adv[k]"></shop-product-block>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      banner_list:[{url:"/images/banner/banner_home_1.png"},{url:"/images/banner/banner_home_2.png"},{url:"/images/banner/banner_home_3.png"}],
      goods_list:[],
      goods_list_left_adv:[],
    }
  },
  components:{
    ShopHead: () => import('@/components/home/head'),
    banner: ()=> import('@/components/home/banner'),
    brand: ()=> import('@/components/home/brand'),
    ShopProductBlock: ()=> import('@/components/home/shop_product_block'),
  },
  mounted(){
    this.get_goods_list()
  },
  methods:{
    get_goods_list(){
      this.$axios.get('http://api.qingwuit.com/api/index/get_index_info').then(res=>{
        this.goods_list = res.data.data.goods_list;
        this.goods_list_left_adv = res.data.data.goods_list_left_adv
        console.log( res.data.data.goods_list_left_adv.adv)
      })
    }
  }
}
</script>

<style scoped>
.shop_content{
  background: #f5f5f5;
  padding:20px 0 60px 0;
}
</style>