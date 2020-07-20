<template>
  <div id="List">
    <div class="shop_top"><shop-head></shop-head></div>
    <div class="search-breadcrumb width_center_1200">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if='crumb.group.id' :to="{ path: '/goodslist?gid='+crumb.group.id }">{{crumb.group.name}}</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="(v,i) in crumb.categories" :to="{ path: i==0?'/goodslist?cid1='+v.id:'/goodslist?cid2='+v.id }" :key="i">{{v.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="goods_where width_center_1200">
      <div class="goods_class" v-if="categories.length>0" ref='goods_class'>
        <ul class="float_left">
          <li class="float_left">商品分类：</li>
          <li class="float_left" v-for="(v,i) in categories" :key="i"><router-link :to="{ path: `/goodslist?cid2=${v.id}` }">{{v.name}}</router-link></li>
        </ul>
        <div class="float_right">
          <el-button :icon="cate_more?'el-icon-arrow-up':'el-icon-arrow-down'" size="mini" @click="foo('goods_class')">{{cate_more?'收起':'更多'}}</el-button>
        </div>
      </div>

      <div class="goods_brand" ref='goods_brand'>
        <ul class="float_left" v-show="!is_checkbox">
          <li class="float_left">品牌：</li>
          <li class="float_left" v-for="(v,i) in brand_list" :key="i"><router-link :to="{ path: `/goodslist?bids=${v.id}` }">{{v.name}}</router-link></li>
        </ul>
        <ul class="float_left" v-show="is_checkbox">
          <li class="float_left">品牌：</li>
          <!-- <label>品牌：</label> -->
          <el-checkbox-group v-model="bid_list" class="float_left" style="width:970px">
             <el-checkbox v-for="(v,i) in brand_list" :label="v.id" :key="i">{{v.name}}</el-checkbox>
             <!-- <el-checkbox> </el-checkbox> -->
          </el-checkbox-group>         
        </ul>
        <div class="float_right" >
          <el-button :icon="is_checkbox?'el-icon-minus':'el-icon-plus'" size="mini" @click="check_bids">{{is_checkbox?'单选':'多选'}}</el-button>
          <el-button :icon="brand_more?'el-icon-arrow-up':'el-icon-arrow-down'" size="mini" @click="foo('goods_brand')">{{brand_more?'收起':'更多'}}</el-button>
        </div>
        <div class="btn" v-show="is_checkbox">
          <el-button type="primary" size="mini" @click="onsubmit">提交</el-button>
          <el-button size='mini' @click="oncance">取消</el-button>
        </div>
        
      </div>
      
      <div class="goods_screen">
        <ul>
          <li class="float_left">筛选排序：</li>
          <li class="float_left">
            <a @click="search_data.sort='normal';search_data.sort_type=''">默认<span :class="search_data.sort=='normal'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>            
          </li>
          <li class="float_left">
            <a @click="search_data.sort='new';search_data.sort_type='desc'">新品<span :class="search_data.sort=='new'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>            
          </li>
          <li class="float_left">
            <a @click="search_data.sort='sale';search_data.sort_type='desc'">销量<span :class="search_data.sort=='sale'?'icon iconfont active':'icon iconfont'">&#xe601;</span></a>
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
        <router-link :to="'/goodsinfo?id='+v.id">
          <dl>
            <dt><el-image :src="v.image_url+'?x-oss-process=image/resize,h_400,w_400/quality,Q_80'" alt="" lazy></el-image></dt>
            <dd class="price">￥{{v.sale_price}} <span class="sale">已售{{v.sale_num | sale_num}}</span></dd>
            <dd class="title">{{v.name}}少时诵诗书所所所所所所所所少时诵诗书所所</dd>
            <dd class="store"> <span class="store_name">{{v.store_name}}苹果旗舰店</span> </dd>
            <dd class="purchase"><span class="icon iconfont "> 立即购买</span><span class="icon iconfont">&#xe602; 加入购物车</span></dd>
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
      brand_list:[],
      crumb:[],
      categories:[],
      is_checkbox:false,
      cate_more:false,
      brand_more:false,
      bid_list:[],
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
    // this.get_goods_list()
      this.search_data.gid = JSON.parse(this.$route.params.id).gid
      this.search_data.cid1 = JSON.parse(this.$route.params.id).cid1
      this.search_data.cid2 = JSON.parse(this.$route.params.id).cid2
  },
  filters:{
    sale_num(val){
      if(val==null){
        return 0
      }
    }
  },
  methods:{
    get_goods_list(){
      
      // console.log(this.$route.query.gid)
      goodsApi.getList(this.search_data).then(res=>{
        this.goods_list = res.data.goods.data
        this.brand_list = res.data.brand
        this.crumb = res.data.crumb
        this.categories = res.data.categories
      })
    },
    foo(item){
      item == "goods_brand"
        ?this.brand_more = !this.brand_more
        :this.cate_more = !this.cate_more
      this.$refs[item].style.height == 'auto'
       ?this.$refs[item].style.height = '50px'
       :this.$refs[item].style.height = 'auto'
    },
    check_bids(){
      this.is_checkbox = !this.is_checkbox;
      this.foo('goods_brand')
      this.oncance()
    },
    onsubmit(){
      this.search_data.bids = this.bid_list.join(',')
      // console.log(this.bid_list.join(','))
    },
    oncance(){
      this.bid_list = []
      this.search_data.bids = ''
    },
  },
  components:{
    ShopHead: () => import('@/components/home/head'),
  },
  watch:{
    search_data:{
      handler(new_data){
        // console.log(newdata)
        this.get_goods_list()
      },
      deep:true
    },
    $route:{
      handler:function(new_data,old_data){
        this.search_data.gid = new_data.query.gid
        this.search_data.cid1 =  new_data.query.cid1
        this.search_data.cid2 =  new_data.query.cid2   
        this.search_data.bids = new_data.query.bids   
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
      // min-height: 150px;
      border:1px solid #efefef;
      font-size: 14px;
      line-height: 30px;
      .goods_class{
        padding: 10px;
        height: 50px;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;
        overflow: hidden;
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
        height: 50px;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;
        overflow: hidden;
        .btn{
          width: 122px;
          margin:0 auto;
        }
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
                width: 200px;
                height: 200px;
                margin: 20px auto 0px auto;
                display: block;
            }
        }
        dl dt img{
            width: 200px;
            height: 200px;
            margin:20px auto 20px auto;
            display: block;
        }
        dl dd{
            font-size: 14px;
        }
        dl dd.title{
            color: #000;
            height: 40px;
            padding: 0 15px;
            overflow: hidden;
        }
        dl dd.price {
            color: #e01d20;
            line-height: 35px;
            // text-align: center;
            padding: 0 15px;
            font-size: 20px;
            overflow: hidden;
            .sale{
              color: #757575;
              font-size:14px;
              float: right;
            }
        }
        dl dd.store{
          line-height: 25px;
          padding: 0 15px;
          overflow: hidden;
          color: #757575;
          font-size:14px;
        }
        .purchase span:first-child{
            box-sizing: border-box;
            border-right: 1px solid #efefef;
        }
        .purchase span:first-child:hover{
            color:#fff;
            background: #f25c19 ;
        }
        .purchase span:last-child:hover{
            color:#fff;
            background: #f25c19 ;
            opacity: 0.5;
        }
        .purchase span{
            width: 50%;
            display: block;
            border: 1px solid #efefef;
            float: left;
            line-height: 41px;
            text-align: center;
            box-sizing: border-box;
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