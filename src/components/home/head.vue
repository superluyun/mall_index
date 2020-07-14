<template>
  <div class="head shop_head">
    <div style="border-bottom:1px solid #efefef">
    <div class="head_in">
      <div class="top_shop_left">
        <ul>
          <li><router-link to="/">寻源采购</router-link></li>
          <li><router-link to="/">商城官网</router-link></li>
          <li v-if="userInfo.name">欢迎您，<a style="color:#f25c19 ">{{userInfo.name}}</a></li>
          <!-- <el-dropdown size="mini" placement='bottom-start' v-if="userInfo.name">
            <span>欢迎您，<a style="color:#f25c19 ">{{userInfo.name}}</a></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </ul>
      </div>
      <div class="top_shop_right">
        <ul>
          <li><a href="http://demo.acuit.net" target="_blank">ERP平台</a></li>
          <li><a :href="`http://192.168.2.119:8080/?jwt=${jwt}`" target="_blank"><i class="icon iconfont">&#xe600;</i> 我的工作台</a></li>
          <li><a :href="`http://192.168.2.119:8083/#login?redirect=http://192.168.2.119:8082`" v-if="!userInfo.name">登录</a></li>
          <li><a href="http://demo.acuit.net:96/#/register/reg" _blank v-if="!userInfo.name">注册</a></li>
          <li><a href="tel:400-999-2350"><i class="icon iconfont">&#xe603;</i> 服务热线：400-999-2350</a></li>   
        </ul>
      </div>
    </div>
    </div>
    <!-- logo search -->
    <div class="center_top " v-if="center_top" style="background-color:#fff">
      <div class="width_center_1200">
        <div class="shop_logo float_left">
          <router-link to="/"><img width="180px"  height="55px" src="/images/logo_scy.png" alt="食采云商城"></router-link>
        </div>
        <div class="shop_top_seach float_left">
          <ul>
            <li><input class="search_input" type="text" placeholder="花生 瓜子 火腿肠 啤酒 饮料 矿泉水 "></li>
            <li><button class="search_button" type="button"><i class="icon iconfont">&#xe640;</i></button></li>
            <li>
              <div class="index_my_car">
                <span><router-link to="/cart/index">我的购物车<i class="icon iconfont">&#xe602;</i></router-link><div class="shop_car_dot"></div></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

     <!-- nav -->
    <div class="shop_top_nav">
      <div class="width_center_1200">
        <div class="shop_top_nav_left" @mouseover="subnav=true" @mouseleave="$route.path=='/'?scrollTop?subnav=false:'':subnav=false">
          全部商品
          <transition name="el-zoom-in-top"><leftBar v-show="subnav" :category='category'></leftBar></transition>
        </div>
        <div class="shop_top_nav_right">
          <ul>
            <li>
              <router-link to="/">电子商城</router-link>
            </li>
            <li>
              <router-link to="/goods/seckill">寻源采购</router-link>
            </li>
            <li>
              <router-link to="/groupbuy/list/keywords.">供应商入驻</router-link>
            </li>
            <li>
              <router-link to="/integral/index">采购方入驻</router-link>
            </li>
          </ul>
        </div>
        <!-- <div class="welcome" v-show="welcome">welcome</div> -->
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import goodsApi from '@/api/goodsApi'

export default {
  data(){
    return{
      center_top:true,
      subnav:this.$route.path=='/',
      welcome:this.$route.path=='/',
      scrollTop:0,
      category:[],
    }
  },
  created(){
    // 监听滚动条
    window.addEventListener('scroll', ()=>{
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop
      if(scrollTop>210){
        this.center_top = false;
      }else{
        this.center_top = true;
      }
      if(scrollTop>20){
        this.welcome = false;
        this.subnav = false; 
      }else{
        if(this.$route.path=='/'){
          this.welcome = true;
          this.subnav = true;
        }
      }
    }, true);
  },
  mounted(){
    this.get_category()
  },
  components:{
    leftBar:()=>import('@/components/home/leftbar.vue')
  },
  computed:{
    ...mapGetters(['userInfo','jwt'])
  },
  methods:{
    get_category(){
      goodsApi.getCategory().then(res=>{
        this.category = res.data
        // console.log(this.category)
      })
    },
  }
}

</script>

<style lang="scss" scoped>
.head{
  // border-bottom: 1px solid #efefef;
  height: 30px;
  background: #f9f9f9;
  font-size: 12px;
  line-height: 30px;

  .head_in{
    width: 1200px;
    height: 30px;
    margin:0 auto;
    .top_shop_left{
      float: left;
      ul li{
        float: left;
        padding:0 5px;
      }
    }
    .top_shop_right{
      float: right;
      ul li{
        float: left;
        padding:0 5px;
      }
      li:hover{
        color:#f25c19 ;
      }
    }
  }
  .head_in:after{
    display: block;
    clear: both;
    content:'';
  }
  .head_in a:hover{
    color:#f25c19 ;
  }
}

.shop_head{
    z-index: 666;
    position: fixed;
    background-color: #f9f9f9;
    left:0;
    right: 0;
}

.center_top:after{
    display: block;
    clear:both;
    content:'';
}

.shop_logo{
    margin-top: 40px;
    margin-bottom: 40px;
}
.shop_top_nav{
    height: 40px;
    background:#333;
    font-size: 14px;
    line-height: 40px;
    color:#fff;
    .shop_top_nav_left{
        float: left;
        width: 240px;
        background:#f25c19 ;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
    }
    .shop_top_nav_right{
        padding-left: 20px;
        float: left;
        ul li{
            float: left;
        }
        ul li a{
            line-height: 40px;
            padding:0 30px;
            color:#fff;
            display: block;
        }
        ul li a:hover{
            background: #000;
        }
    }
    .welcome{
      float: right;
      width: 200px;
      height: 400px;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: #fff;
      color:#000
    }
}
.shop_top_seach{
    margin-top: 44px;
    margin-left: 200px;
    ul li{
        float: left;
    }
    .search_input{
        width: 434px;
        height: 38px;
        padding: 10px;
        outline: 0;
        border: 1px solid #efefef;
        border-right: none;
        float: left;
        box-sizing: border-box;
        font-size: 12px;
    }
    .search_button{
        border: 1px solid #efefef;
        float: left;
        width: 38px;
        height: 38px;
        background: #fff;
        outline: 0;
        text-align: center;
    }
    .search_button:hover{
        color:#fff;
        background:#333;
    }
    .index_my_car{
        height: 38px;
        border: 1px solid #efefef;
        margin-left: 30px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 38px;
        padding: 0 20px;
        span:hover{
            color:#f25c19 ;
        }
        span{
            margin-right: 20px;
            position: relative;
            i{
                font-size: 13px;
                margin-left: 6px;
            }
            a:hover{
                color:#f25c19 ;
            }
            .shop_car_dot {
                position: absolute;
                top: -24px;
                line-height: 16px;
                background: #f25c19 ;
                padding: 0 4px;
                color: #fff;
                border-radius: 4px;
                right: -10px;
            }
        }
        span:last-child{
            margin-right: 0;
            i{
                font-size: 14px;
            }
        }
        
    }
}
</style>