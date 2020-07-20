<template>
  <div class="goods_info">
    <div class="shop_top"><shop-head :store_info.sync='store_info'></shop-head></div>
    <div class="goods_info_top width_center_1200">
      <div class="goods_info_top_left" >
        <div class="goods_image_item">
          <pic-zoom :url="goods_images_thumb[chose_img_pos]+'?x-oss-process=image/resize,h_400,w_400/quality,Q_100'" :highUrl="goods_images[chose_img_pos]"></pic-zoom>
        </div>
        <div class="pic_zoom_list">
          <div class="pic_zoom_list_left" @click="pre_img()">
            <i class="el-icon-arrow-left"></i>
          </div>
          <ul>
            <li v-for="(v,k) in goods_images_thumb" :key="k" @click="click_silde_img(k)" :class="chose_img_pos==k?'border_color':''"><img :src="v" alt=""></li>
          </ul>
          <div class="pic_zoom_list_right" @click="next_img()">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="goods_info_top_right" >
        <div class="goods_info_title">{{goods_info.name+" "+spec_name||'加载中...'}}
          <p>{{goods_info.subtitle||'加载中...'}}</p>
        </div>
        <div class="goods_info_group">
          <div class="goods_info_price"><span>商城价：</span>￥{{sale_price||goods_info.price}}</div>
          <div class="goods_info_market_price"><span>市场价：</span><div class="overx_goods_info">￥{{market_price||goods_info.market_price}}</div></div>
        </div>
        
        <div class="goods_info_spec" v-for="(v,i) in specs" :key="i">
          <span class="float_left">{{v.spec_name}}：</span>
          <div :class="vo.is_check?'spec_item float_left checked':'spec_item float_left'" v-for="(vo,index) in v.spec_values" :key="index" @click="spec_check(vo,v.spec_values)">
            <span>{{vo.name}}</span>
            <i class="iconfont icon-xuanzegougou"></i>
          </div>
        </div>

        <div class="goods_info_num">
          <div class="goods_info_num_title">购买数量：</div>
          <el-input-number class="goods_info_num_input" size="mini" :min='0' :max='Number(num || goods_info.num)' v-model="buy_num" :step="1" step-strictly></el-input-number>
          <div class="goods_info_num_stock">&nbsp;&nbsp;{{num || goods_info.num}} 库存</div>
        </div>

        <div class="goods_info_btn">
          <el-button type="primary" @click="buy()">立即购买</el-button>
          <el-button type="primary" @click="add_cart()" plain> <i class="icon iconfont">&#xe6dc;</i> 加入购物车</el-button>
        </div>
      </div>

      
    </div>
    <div class="goods_info_content width_center_1200">
      <div class="goods_info_store float_left">
        <div class="store_title">
          <span>{{store_info.store_name}}</span>
        </div>
        <div class="store_score">
          <ul>
            <li class="float_left"><span>100</span> <span>质量</span></li>
            <li class="float_left"><span>100</span> <span>服务</span></li>
            <li class="float_left"><span>100</span> <span>时间</span></li>
            <li class="float_left"><span>100</span> <span>价格</span></li>
          </ul>
        </div>
        <div class="store_btn">
          <div class="store_btn_one">
            <span><i class="iconfont icon-home"></i>进入店铺</span>
          </div>
          <div class="store_btn_two">
            <span><i class="iconfont icon-dianhua"></i>联系客服</span>
          </div>
        </div>
      </div>
      <div class="goods_info_detail float_left">
        <div class="info_nav"></div>
        <div class="info_table">
          <div class="info_table_title"><span>核心参数</span><span></span></div>
          <div class="info_table_centent">
            <el-row>
              <el-col :span="12"><span>商品名称：{{goods_info.name}}</span></el-col>
              <el-col :span="12"><span>单位：{{goods_info.unit_name}}</span></el-col>
              <el-col :span="12"><span v-if="goods_info.brand_info">品牌：{{goods_info.brand_info.name}}</span></el-col>
              <el-col :span="12"><span>商品重量：{{unit+'kg'}}</span></el-col>
              <el-col :span="12"><span>商品编号：{{goods_sn || '请选择商品规格'}}</span></el-col>
            </el-row>
          </div>
        </div>
        <div class="goods_info_intro" v-html="goods_info.intro"></div>
      </div>
    </div>
  </div>
</template>


<script>
import goodsApi from '@/api/goodsApi.js'
export default {   
  data(){
    return{
      goods_info:{},
      store_info:{},
      buy_num:1, // 购买数量
      chose_img_pos:0,
      goods_images_thumb:[],
      goods_images:[],
      comment_image:[],
      specs:[],
      specs_check_list:[],
      goods_sn:'',
      unit:'',// 重量 为什么叫这个 问后端
      sale_price:'',
      market_price:'',
      spec_name:'',
      num:'',// 库存
      
    }
  }, 
  mounted(){
    // this.get_goods_info()
    this.get_goods_info()
  },
  components:{
    ShopHead: () => import('@/components/store/head'),
    picZoom: () => import('@/components/home/vue-piczoom.vue')
  },
  methods:{
    get_goods_info(){
      goodsApi.getGoodsInfo(this.$route.query.id).then(res=>{
        this.goods_info = res.data
        this.goods_images_thumb = res.data.images.map(item=> item.url)
        this.goods_images = res.data.images.map(item=>item.url)
        this.store_info = res.data.store
        this.specs = this.set_specs(res.data.specs)
        
      })
      // console.log(goodsApi)
    },
    set_specs(specs){
      specs.forEach(element => {
        var arr = []
        element.spec_values.split(',').forEach(item=>{
          var obj = {}
          obj.name = item
          obj.is_check = false
          obj.spec_id = element.id
          arr.push(obj)
        })
        element.spec_values = arr
      });
      return specs
    },
    click_silde_img(k){
      this.chose_img_pos = k
    },
    pre_img(){
      if(this.chose_img_pos>0)
        this.chose_img_pos -= 1
      else
        this.chose_img_pos = this.goods_images_thumb.length-1
    },
    next_img(){
      if(this.chose_img_pos<(this.goods_images_thumb.length-1))
        this.chose_img_pos += 1
      else
        this.chose_img_pos = 0
    },
    spec_check(v,spec_values){
      spec_values.forEach(item=>{
        item.is_check = false
      })
      v.is_check = !v.is_check
      var arr = []
      this.specs.forEach(item=>{
        arr.push(...item.spec_values.filter(i=> i.is_check))
      })
      this.specs_check_list = arr.map(item=>item.name)
      this.goods_info.goods.forEach(item=>{
        if(item.spec_name == this.specs_check_list.join(' ')+' '){
          this.goods_sn = item.goods_sn
          this.unit = item.unit
          this.sale_price = item.sale_price
          this.market_price = item.market_price
          this.spec_name = item.spec_name
          this.num = item.num
        }
          
          // console.log(item)
      })
    },
    buy(){},
    add_cart(){},
  }
}

</script>

<style lang="scss" scoped>
.shop_top{
  height: 316px;
}
.goods_info_top_right{
    margin-top:20px;
    float: left;
    width: 770px;
    font-size: 14px;
    
    .goods_info_num{
        // padding: 10px;
        margin-top: 10px;
        .goods_info_num_title{
            color:#666;
            float: left;
            line-height: 25px;
            margin-right: 15px;
        }
        .goods_info_num_jian,.goods_info_num_jia{
            border:1px solid #efefef;
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            float: left;
            margin-right: 10px;
            color:#666;
        }
        .goods_info_num_stock{
            float: left;
            width: 100px;
            margin-left: 10px;
            line-height: 25px;
            color:#999;
        }
        .goods_info_num_input{
            float: left;
        }
        .goods_info_num_input input{
            height: 27px;
            border:1px solid #efefef;
            outline: none;
            width: 50px;
            margin-right: 10px;
            box-sizing: border-box;
            padding: 0 8px;
            color:#666;
        }
    }
    .goods_info_num:after{
      clear: both;
      display: block;
      content: '';
    }
    .goods_info_btn{
      clear: both;
      margin-top: 20px;
    }
    
    .goods_info_add_cart,.goods_info_buy{
        line-height: 40px;
        float: left;
        margin-right: 20px;
        background: #ff5c14;
        border-radius: 3px;
        color:#fff;
        padding: 0 15px;
        i{
            margin-right: 6px;
        }
    }
    .goods_info_buy{
        background: #f25c19 ;
        i{
            font-size: 12px;
        }
    }

    .goods_info_add_groupbuy{
        line-height: 40px;
        float: left;
        margin-right: 20px;
        background: #67c23a;
        border-radius: 3px;
        color:#fff;
        padding: 0 15px;
        i{
            margin-right: 6px;
        }
    }
    
    .goods_info_title{
        position: relative;
        font-size: 18px;
        margin-bottom: 15px;
        p{
            color:#999;
            line-height: 35px;
            font-size: 14px;
        }
    }
    .goods_info_group{
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        // padding-bottom: 90px;
        height: 140px;
        // background: url("/pc/summary-bg.jpg");
        background-color: rgba(242,92,25,0.1);
        // opacity: 0.1;
    }
    .goods_info_spec{
      margin: 10px 0;
      .spec_item{
        min-width: 80px;
        height: 40px;
        color:#3c3c3c;
        text-align: center;
        margin-right: 10px;
        border: 1px solid #e1e1e1;
        box-sizing: border-box;
        position: relative;
        i{
          display: none;
        }
      }
      .checked{
        border: 1px solid #f25c19;
        i{
          display: block;
          position: absolute;
          top: 0px;
          right: -1px;
          color:#f25c19;
        }
      }
      .spec_item:hover{
        cursor: pointer;
        border: 1px solid #f25c19;
      }
      span{
        // margin-right: 10px;
        line-height: 40px;
        color:#666
      }
    }
    .goods_info_spec:after{
      clear: both;
      display: block;
      content: '';
    }
    .goods_info_price{
        color:#f25c19 ;
        font-size: 28px;
        line-height: 28px;
        span{
            line-height: 28px;
            color:#999;
            font-size: 14px;
        }
    }
    .goods_info_market_price{
        margin-top: 10px;
        span{
            color:#999;
        }
        .overx_goods_info{
            text-decoration: line-through;
            display: inline-block;
        }
    }
    
    
    
}
.goods_info_top_left{
    width: 402px;
    border: 1px solid #efefef;
    margin-top:20px;
    margin-right: 28px;
    float: left;
    box-sizing: border-box;
    .goods_image_item{
        width: 400px;
        height: 400px;
        display: block;
        border-bottom: 1px solid #efefef;
    }
    .pic_zoom_list{
        ul li{
            float: left;
            margin:10px 10px 10px 0; 
            border:1px solid #efefef;
            img{
                width: 60px;
                height: 60px;
            }
        }
        ul li:hover{
            border-color:#f25c19 ;
        }
        ul li:last-child{
            margin-right: 0;
        }
        ul li.border_color{
            border-color:#f25c19 ;
        }
        .pic_zoom_list_left{
            font-size: 24px;
            float: left;
            line-height: 80px;
            color:#666;
            margin-right: 10px;
            margin-left: 10px;
            :hover{
                color:#f25c19 ;
            }
        }
        .pic_zoom_list_right{
            font-size: 24px;
            float: right;
            line-height: 80px;
            color:#666;
            margin-right: 10px;
            margin-left: 10px;
            :hover{
                color:#f25c19 ;
            }
        }
    }
}
.goods_info_content{
  margin-top: 40px;
  height: auto;
  // background-color: #ccc;
    .goods_info_store{
      width: 300px;
      min-height: 300px;
      border: 1px solid #efefef;
      box-sizing: border-box;
      .store_title{
        width: 100%;
        height: 70px;
        border-bottom:1px solid #efefef;
        color: #3c3c3c;
        line-height: 70px;
        text-align: center;
      }
      .store_score{
        width: 280px;
        margin: 25px auto;
        span{
          margin: 8px 0;
          width: 70px;
          display: block;
          text-align: center;
          color:#999
        }
        span:first-child{
          color:#f25c19;
          font-weight: bold;
        }
      }
      .store_score:after{
        clear: both;
        display: block;
        content: "";
      }
      .store_btn{
        width: 284px;
        margin: 50px auto;
        .store_btn_one, .store_btn_two{
          width: 130px;
          height: 40px;
          border:1px solid #e1e1e1;
          border-radius: 1px;
          float: left;
          margin: 0 5px;
          text-align: center;
          line-height: 40px;
          i{
            margin: 0 3px;
            color: #fcfcfc;
            display: inline-block;
            width: 22px;
            height: 22px;
            line-height: 22px;
            // text-align: center;
            border-radius: 50%;
            background-color: #f25c19;
          }
        }
        .store_btn_one:hover,.store_btn_two:hover{
          cursor: pointer;
          border:1px solid #f25c19;
          color: #f25c19;
        }
      }
      .store_btn:after{
        clear: both;
        display: block;
        content:'';
      }
    }
    .goods_info_detail{
      margin-left: 20px;
      width: 880px;
      min-height: 800px;
      border: 1px solid #efefef;
      box-sizing: border-box;
      .info_nav{
        height: 70px;
        width: 100%;
        border-bottom: 1px solid #efefef;
      }
      .info_table{
        width: 800px;
        height: 180px;
        margin: 30px auto;
        border:1px solid #efefef;
        // background-color: #f00;
        .info_table_title{
          width: 100%;
          height: 30px;
          background-color: #efefef;
          line-height: 30px;
          font-size: 14px;
          color:#3c3c3c;
          display: flex;
          flex-direction:row;
          justify-content:space-between;
          span{
            margin:0 10px;
          }
        }
        .info_table_centent{
          width: 100%;
          // height: 100%;
          padding: 10px 40px;
          box-sizing: border-box;
          color:#999;
          font-size: 14px;
          span{
            line-height:40px;
          }
        }
      }
      .goods_info_intro{
        padding: 0 20px;
      }
    }
}
</style>
