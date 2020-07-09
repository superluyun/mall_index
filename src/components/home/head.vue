<template>
  <div class="head">
    <div class="head_in">
      <div class="top_shop_left">
        <ul>
          <li><router-link to="/">寻源采购</router-link></li>
          <li><router-link to="/">商城官网</router-link></li>
          <li>欢迎您，<router-link to="/user/index" style="color:#ca151e"></router-link></li>
        </ul>
      </div>
      <div class="top_shop_right">
        <ul>
          <li><a href="">ERP平台</a></li>
          <li><a href="">我的工作台</a></li>
          <li><router-link to="/">登录</router-link></li>
          <li><router-link to="/">注册</router-link></li>
          <li><a href="tel:400-999-2350">服务热线：400-999-2350</a></li>   
        </ul>
      </div>
    </div>
    <!-- logo search -->
    <div class="center_top width_center_1200">
      <div class="shop_logo float_left">
        <router-link to="/"><img width="180px"  height="55px" src="/images/logo_new.svg" alt="食采云商城"></router-link>
      </div>
      <div class="shop_top_seach float_left">
        <ul>
          <li><input class="search_input" type="text" placeholder="手机 笔记本电脑"></li>
          <li><button class="search_button" type="button"><i class="icon iconfont">&#xeba0;</i></button></li>
          <li>
            <div class="index_my_car">
              <span><router-link to="/cart/index">我的购物车<i class="icon iconfont">&#xe602;</i></router-link><div class="shop_car_dot"></div></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

     <!-- nav -->
        <div class="shop_top_nav">
            <div class="width_center_1200">
                <div class="shop_top_nav_left" >
                    全部商品
                    <transition name="el-zoom-in-top"><leftBar ></leftBar></transition>
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
            </div>
        </div>

  </div>
</template>

<script>

export default {
  components:{
    leftBar:()=>import('@/components/home/leftbar.vue')
  }
}

</script>

<style lang="scss" scoped>
.head{
  border-bottom: 1px solid #efefef;
  height: 30px;
  background: #f9f9f9;
  font-size: 12px;
  line-height: 30px;

  .head_in{
    width: 1200px;
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
        color:#ca151e;
      }
    }
  }
  .head_in:after{
    display: block;
    clear: both;
    content:'';
  }
  .head_in a:hover{
    color:#ca151e;
  }
}

.shop_head{
    z-index: 666;
    position: fixed;
    background: #fff;
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
        background:#ca151e;
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
            color:#ca151e;
        }
        span{
            margin-right: 20px;
            position: relative;
            i{
                font-size: 13px;
                margin-left: 6px;
            }
            a:hover{
                color:#ca151e;
            }
            .shop_car_dot {
                position: absolute;
                top: -24px;
                line-height: 16px;
                background: #ca151e;
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