<template>
  <div class="head shop_head">
    <div style="border-bottom:1px solid #efefef">
    <div class="head_in">
      <div class="top_shop_left">
        <ul>
          <li><router-link to="/">寻源采购</router-link></li>
          <li><router-link to="/">商城官网</router-link></li>
          <li v-if="userInfo">你好！<a style="color:#f25c19 ">{{userInfo.name || '未知'}}</a></li>
          <li v-if='userInfo'> <a @click.stop="quit">退出</a>  </li>
        </ul>
      </div>
      <div class="top_shop_right">
        <ul>
          <li><a href="http://demo.acuit.net" target="_blank">ERP平台</a></li>
          <li v-if='userInfo'><a :href="`http://localhost:8081/?jwt=${jwt}`" target="_blank"><i class="icon iconfont">&#xe600;</i> 我的工作台</a></li>
          <li><a :href="`http://demo.acuit.net:96/index.html#/login?redirect=${redirect_url}`" v-if="!userInfo.name">登录</a></li>
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
            <li>
              <button class="search_button search_all" type="button">搜全站</button>
              <button class="search_button" type="button">搜本店</button>
            </li>
            <li>
              <div class="index_my_car">
                <span><router-link to="/cart/index">我的购物车<i class="icon iconfont">&#xe642;</i></router-link><div class="shop_car_dot"></div></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-divider></el-divider>
      <div class='shop_store width_center_1200'>
        <div class="store_left">
          <img class="float_left" :src="store_info.logo || '/'" />
          <div class="float_left">{{store_info.store_name}}</div>
          <div class="store_score float_left">
            <ul>
              <li class="float_left"><span>100</span> <span>质量</span></li>
              <li class="float_left"><span>100</span> <span>服务</span></li>
              <li class="float_left"><span>100</span> <span>时间</span></li>
              <li class="float_left"><span>100</span> <span>价格</span></li>
            </ul>
          </div>
        </div>
        <div class="store_right">
          <div class="store_btn_one">
            <span> <router-link :to='`/store/${store_info.id}`'><i class="iconfont icon-home"></i>进入店铺</router-link></span>
          </div>
          <div class="store_btn_two">
            <span><i class="iconfont icon-dianhua"></i>联系商家：{{store_info.contact_phone}}</span>
          </div>
        </div>
      </div>
    </div>

     <!-- nav -->
    <div class="shop_top_nav">
      <div class="width_center_1200">
        <div class="shop_top_nav_left" @mouseover="subnav=true" @mouseleave="$route.path=='/'?scrollTop?subnav=false:'':subnav=false">
          店铺商品
          <!-- <transition name="el-zoom-in-top"><left-bar v-show="subnav" :category='category'></left-bar></transition> -->
          <transition name='el-zoom-in-top'>
            <left-bar2  v-show="subnav" :category='category' :store_id='store_info.id'></left-bar2>
          </transition>
        </div>
        <div class="shop_top_nav_right">
          <ul>
            <li>
              <router-link to="/">店铺首页</router-link>
            </li>
            <li>
              <router-link to="/companystory">企业故事</router-link>
            </li>
          </ul>
        </div>
        <!-- <div class="welcome" v-show="welcome">welcome</div> -->
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import goodsApi from '@/api/goodsApi'
import userApi from '@/api/userApi'

export default {
  props:{
    store_info:{tyep:Object}
  },
  data(){
    return{
      center_top:true,
      subnav:this.$route.path=='/',
      welcome:this.$route.path=='/',
      scrollTop:0,
      category:[],
      redirect_url:window.location.href
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
    leftBar2:()=>import('@/components/home/leftbar2.vue')
  },
  computed:{
    ...mapGetters(['userInfo','jwt'])
  },
  methods:{
    get_category(){
      goodsApi.getCategoryStore().then(res=>{
        this.category = res.data
        // console.log(this.category)
      })
    },
    toadmin(){},
    quit(){
      this.$store.dispatch("logOut").then(res=>{
        // this.$route.push(this.$route.path)
        location.reload()
      });
    }
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

.shop_store{
  color:#333;
  height: 62px;
  .store_left{
    float: left;
    img{
      width: 130px;
    }
    span{
      color:#333;
    }
    .store_score{
      width: 280px;
      float: right;
      span{
        margin: 1px 0;
        width: 50px;
        display: block;
        line-height: 20px;
        text-align: center;
        color:#999
      }
      span:first-child{
        color:#f25c19;
        font-weight: bold;
      }
    }
  }
  .store_right{
    float:right;
    .store_btn_one, .store_btn_two{
      margin: 0 5px;
      i{
        margin: 0 10px;
        color: #fcfcfc;
        width: 22px;
        height: 22px;
        line-height: 22px;
        display: inline-block;
        text-align: center;
        border-radius: 50%;
        background-color: #f25c19;
      }
    }
  }
}

.shop_store:after{
  clear: both;
  display: block;
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
      border: 1px solid #f25c19;
      float: left;
      width: 65px;
      height: 38px;
      background: #fff;
      outline: 0;
      text-align: center;
      transition: background-color 150ms;
    }
    .search_all{
      color:#fff;
      background:#f25c19;
    }
    .search_button:hover{
      color:#fff;
      background-color:#f25c19;
      cursor: pointer;
    }
    .index_my_car{
        height: 38px;
        border: 1px solid #f25c19;
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
            a{
              color:#f25c19;
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