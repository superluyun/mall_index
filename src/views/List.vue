<template>
  <div id="List">
    <div class="shop_top"><shop-head></shop-head></div>
    <div class="search-breadcrumb width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>一级分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="goods_where width_center_1200">
      <div class="goods_class">
        <ul class="float_left">
          <li class="float_left">商品分类：</li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          <li class="float_left" ><a href="#">分类二</a></li>
          <li class="float_left" ><a href="#">分类一</a></li>
          
        </ul>
        <div class="float_right">
          <el-button icon="el-icon-arrow-down" size="mini">更多</el-button>
          <!-- <el-button>多选</el-button> -->
        </div>
      </div>
      <div class="goods_brand">
        <ul class="float_left">
          <li class="float_left">品牌筛选：</li>
          <li class="float_left" ><a href="#">品牌一</a></li>
          <li class="float_left" ><a href="#">品牌二</a></li>
        </ul>
        <div class="float_right">
          <el-button icon="el-icon-arrow-down" size="mini">更多</el-button>
          <!-- <el-button>多选</el-button> -->
        </div>
      </div>
      <div class="goods_screen">
        <ul>
          <li class="float_left">筛选排序：</li>
          <li class="float_left">
            <a @click="search_data.sort='normal';search_data.sort_type=''">默认<span :class="search_data.sort=='normal'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>            
          </li>
          <li class="float_left">
            <a @click="search_data.sort='new';search_data.sort_type=''">新品<span :class="search_data.sort=='new'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>            
          </li>
          <li class="float_left">
            <a @click="search_data.sort='sale';search_data.sort_type=''">销量<span :class="search_data.sort=='sale'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>
          </li>
          <li class="float_left">
            <a @click="search_data.sort='price';search_data.sort_type=='desc'?search_data.sort_type='asc':search_data.sort_type='desc'">
              价格
              <span class="sort_icon">
                <div :class="search_data.sort_type=='asc'?'icon iconfont active':'icon iconfont'">&#xe7fe;</div>
                <div :class="search_data.sort_type=='desc'?'icon iconfont active':'icon iconfont'">&#xe60d;</div>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="goods_list width_center_1200" v-if="goods_list.length>0">
      <div class="goods_list_item" v-for="(v,k) in goods_list" :key="k">
        <router-link :to="'/goods/info/'+v.id">
          <dl>
            <dt><el-image :src="v.image_url" alt="" lazy></el-image></dt>
            <dd class="title">{{v.name}}</dd>
            <dd class="price">￥{{v.sale_price}}</dd>
            <dd><span class="icon iconfont"> 立即购买</span><span class="icon iconfont">&#xe602; 加入购物车</span></dd>
          </dl>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import goodsApi from '@/api/goodsApi'

export default {
  data(){
    return{
      goods_list:[],
      search_data:{//搜索数据
        gid:'',
        cid1:'',
        cid2:'',
        bids:'',
        keywords:'',
        sort:'normal',
        sort_type:''
      }
    }
  },
  mounted(){
    // this.$axios.post('http://api.qingwuit.com/api/goods/search_goods',{goods_info:13}).then(res=>{
    //   this.goods_list = res.data.data.data
    // });
    this.get_goods_list()
  },
  methods:{
    get_goods_list(){
      this.search_data.gid = this.$route.query.gid
      this.search_data.cid1 = this.$route.query.cid1
      this.search_data.cid2 = this.$route.query.cid2
      // console.log(this.$route.query.gid)
      goodsApi.getList(this.search_data).then(res=>{
        this.goods_list = res.data.goods.data
      })
    }
  },
  components:{
    ShopHead: () => import('@/components/home/head'),
  },
  watch:{
    search_data:{
      handler(newdata){
        // console.log(newdata)
        this.get_goods_list()
      },
      deep:true
    }
  }
}
</script>

<style lang="scss" scoped>
$mincolor: #f25c19 ;

  #List{
    .search-breadcrumb{
      margin-top: 20px;
    }
    .goods_where{
      margin-top: 20px;
      min-height: 150px;
      border:1px solid #efefef;
      font-size: 14px;
      line-height: 30px;
      .goods_class{
        padding: 10px;
        min-height: 50px;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;
        ul{
          width: 900px;
          height: 100%;
        }
      }
      .goods_class:after{
        display: block;
        clear:both;
        content:'';
      }
      .goods_brand{
        padding: 10px;
        min-height: 50px;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;
      }
      .goods_brand{
        display: block;
        clear: both;
        content: '';
      }
      .goods_screen{
        padding: 10px;
        min-height: 50px;
        box-sizing: border-box;
        .active{
          color:$mincolor
        }
      }
      a{
        padding: 10px;
      }
      a:hover{
        color:$mincolor;
        cursor: pointer;
      }
    }
    .sort_icon{
      width: 20px;
      height: 20px;
      display: inline-block;
      div{
        width: 6px;
        height: 0px;
      }
    }
    .sort_icon:after{
      display: block;
      clear:both;
      content:'';
    }
  }

  .goods_list{
    margin:40px auto;
    .goods_list_item{
        float: left;
        width: 224px;
        height: 364px;
        box-sizing: border-box;
        margin: 0 20px 20px 0;
        dl{
            border: 1px solid #efefef;
            box-sizing: border-box;
            width: 224px;
            height: 364px;
            -webkit-transition: all .2s linear;
            transition: all .2s linear;
            .el-image{
                width: 180px;
                height: 180px;
                margin:30px auto 25px auto;
                display: block;
            }
        }
        dl dt img{
            width: 180px;
            height: 180px;
            margin:30px auto 25px auto;
            display: block;
        }
        dl dd{
            font-size: 14px;
        }
        dl dd.title{
            color: #000;
            height: 36px;
            text-align: center;
            padding: 0 15px;
            overflow: hidden;
        }
        dl dd.price {
            color: #e01d20;
            line-height: 50px;
            text-align: center;
            padding: 0 15px;
            font-size: 20px;
            overflow: hidden;
        }
        dl dd span:first-child{
            box-sizing: border-box;
            border-right: 1px solid #efefef;
        }
        dl dd span:first-child:hover{
            color:#fff;
            background: #f25c19 ;
        }
        dl dd span:last-child:hover{
            color:#fff;
            background: #f25c19 ;
            opacity: 0.5;
        }
        dl dd span{
            width: 50%;
            display: block;
            border-top: 1px solid #efefef;
            float: left;
            line-height: 41px;
            text-align: center;
        }
    }
    .goods_list_item:nth-child(5n){
        margin-right: 0;
    }
    // .goods_list_item:hover{
    //     // border:1px solid #f25c19 ;
    // }
    .goods_list_item:hover dl{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top:-3px;
    }
}
  
</style>