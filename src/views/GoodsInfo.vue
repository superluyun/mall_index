<template>
  <div class="goods_info">
    <div class="shop_top"><shop-head></shop-head></div>

    <div class="goods_info_top width_center_1200">
      <div class="goods_info_top_left" >
        <div class="goods_image_item">
          <pic-zoom :url="goods_images_thumb[chose_img_pos]" :highUrl="goods_images[chose_img_pos]"></pic-zoom>
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
        <div class="goods_info_title">{{goods_info.name||'加载中...'}}
          <p>{{goods_info.subtitle||'加载中...'}}</p>
        </div>
        <div class="goods_info_group">
          <div class="goods_info_price"><span>商城价：</span>￥{{goods_info.price||'0.00'}}</div>
          <div class="goods_info_market_price"><span>市场价：</span><div class="overx_goods_info">￥{{goods_info.market_price||'0.00'}}</div></div>
        </div>
        


      <div class="goods_info_num">
        <div class="goods_info_num_title">购买数量：</div>
        <div class="goods_info_num_jian" @click="change_buy_num(false)"><i class="el-icon-minus"></i></div>
        <div class="goods_info_num_input"><input v-model="buy_num" type="text" value="1"></div>
        <div class="goods_info_num_jia" @click="change_buy_num(true)"><i class="el-icon-plus"></i></div>
        <div class="goods_info_num_stock">&nbsp;&nbsp;{{goods_info.num}} 库存</div>
        <!-- <div class="clear"></div> -->
      </div>

      <div class="goods_info_btn">
        <el-button type="primary" @click="buy()">立即购买</el-button>
        <el-button type="primary" @click="add_cart()" plain>加入购物车</el-button>
      </div>
    </div>

    <div class="content">
      
    </div>
    </div>
  </div>
</template>


<script>
import goodsApi from '@/api/goodsApi.js'
export default {   
  data(){
    return{
      activeName:'first',
      goods_id:0,   // 商品ID
      goods_info:{
        comment_num:0,
        goods_images_thumb_200:['/pc/loading_pic_200.png']
      },
      store_info:{},
      buy_num:1, // 购买数量
      chose_spec:[], // 选择的规格属性
      chose_spec_info:{},
      chose_img_pos:0,
      goods_images_thumb:[],
      goods_images:[],
      comment_list:[], // 评论
      cart_change:0,
      is_fav:false,
      save_history:true, // 是否需要存储
    //   isSkeleton:false, // false 骨架显示
      comment_image:[],

      // 评论的东西
      total_data:0, // 总条数
      page_size:20,
      current_page:1,
      comment_type:0,
      bfb:100,
      star:5.0,
      comment_num:{
        good:0,
        secondary:0,
        bad:0,
        all:0,
      },

      // 秒杀活动显示
      seckill_intvalobj:null,
      seckill_hour:0,
      seckill_min:0,
      seckill_secs:0,
    }
  }, 
  created(){
    // this.get_goods_info()
    this.get_goods_info2()
  },
  components:{
    ShopHead: () => import('@/components/home/head'),
    picZoom: () => import('@/components/home/vue-piczoom.vue' )
  },
  methods:{
    get_goods_info(){
      this.$axios.post('http://api.qingwuit.com/api/goods/get_goods_info',{goods_id: 33}).then(res=>{
        // console.log(res.data.data.goods_images_thumb)
        this.goods_info = res.data.data;
        this.store_info = res.data.data.store_info;
        this.goods_images_thumb = res.data.data.goods_images_thumb;
        this.goods_images = res.data.data.goods_images;
        this.buy_num = 1; // 初始化购买数量
        this.chose_spec = [];
        this.chose_spec_info = {};
      })
    },
    get_goods_info2(){
      goodsApi.getGoodsInfo(this.$route.query.id).then(res=>{
        this.goods_info = res.data
        this.goods_images_thumb = res.data.images.map(item=> item.url);
      })
      // console.log(goodsApi)
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
  }
}

</script>

<style lang="scss" scoped>
    .goods_info_comment_list{
    ul li{
        padding-top: 20px;
        border-bottom: 1px solid #efefef;
        padding-bottom: 30px;
        
    }
    ul li:after{
        clear: both;
        display: block;
        content:'';
    }
    .comment_avatar{
        width: 40px;
        height: 40px;
        float: left;
        border-radius: 50%;
        background: #efefef;
        margin-right: 15px;
    }
    .comment_nickname{
        font-size: 14px;
        color:#666;
        font-weight: bold;
    }
    .comment_star{
        height: 30px;
        font-size: 14px;
        color:#666;
        line-height: 30px;
        font{
            float: left;
            margin-right: 10px;
        }
        .store_star_in{
            float: left;
            margin-top: 5px;
        }
    }
    .comment_content{
        margin-top: 10px;
        border-top: 1px dashed #efefef;;
        padding-top: 10px;
        margin-left: 55px;
        font-size: 14px;
        color:#666;
    }
    .comment_images{
        margin-left: 55px;
        margin-top: 20px;
        .comment_image{
            height: 90px;
            width: 90px;
            border:1px solid #efefef;
            margin-right: 20px;
            float: left;
        }
    }
}
.comment_list_top{
    margin-bottom: 15px;
    .left_bfb{
        float: left;
        font-size: 48px;
        color:#f25c19 ;
        line-height: 95px;
        width: 190px;
        text-align: center;
        position: relative;
        border-right: 1px solid #efefef;
        padding-right: 35px;
        span{
            font-size: 14px;
            color:#999;
            position: absolute;
            top:-16px;
            left: 140px;
        }
    }
    .right_comment_list{
        ul li{
            float: left;
            line-height: 48px;
            margin-left: 35px;
            margin-top: 25px;
            color:#666;
            height: 48px;
            padding:0 40px;
            font-size: 14px;
            background: #efefef;
            border-radius: 3px;
        }
        ul li.red{
            background: #efefef;
            color:#f25c19 ;
        }
        ul li.red:hover{
            background: #e1e1e1;
            color:#f25c19 ;
        }
        ul li:hover{
            background: #e1e1e1;
            color:#666;
            -webkit-transition: all .2s linear;
            transition: all .2s linear;
        }
    }
}
.comment_list_top:after{
    clear:both;
    display: block;
    content:'';
}
.goods_info_sc{
    background: #f6f6f6;
    border-radius: 6px;
    font-size: 14px;
    line-height: 25px;
    color:#666;
    position: absolute;
    top:0;
    right: 8px;
    padding:0 10px;
    i{
        margin-left: 6px;
        font-size: 12px;
    }
}
.goods_info_sc.red_color{
    color:#fff;
    background: #f25c19 ;
}
.goods_info_sc:hover{
    color:#fff;
    background: #f25c19 ;
}
.after_sale_content{
    font-size: 14px;
}
.goods_info_spec{
    margin-top: 20px;
    padding-left:10px; 
    line-height: 20px;
    color:#666;
    .spec_list{
        margin-bottom: 10px;
        span{float: left;width: 84px;}
        ul{
            float: left;
            li{
                float: left;
                color:#666;
                border:1px solid #e1e1e1;
                border-radius: 2px;
                font-size: 12px;
                padding: 0 8px;
                margin-right: 10px;
            }
            li.red{
                border:1px solid #f25c19 ;
                color:#f25c19 ;
            }
            li:hover{
                border:1px solid #f25c19 ;
                color:#f25c19 ;
            }
        }
    }
    :after{
        content:'';
        display: block;
        clear:both;
    }
}
.goods_info_text{
    margin-top: 30px;
    .goods_info_text_left{
        width: 234px;
        float: left;
        margin-right: 20px;
    }
    .goods_info_text_right{
        margin-top: 20px;
        width: 946px;
        box-sizing: border-box;
        min-height: 900px;
        padding:20px;
        float: left;
        border:1px solid #efefef;
    }
}
.goods_info_top_right{
    margin-top:20px;
    float: left;
    width: 770px;
    font-size: 14px;
    
    .goods_info_num{
        padding: 10px;
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
    .goods_info_sale_num{
        position:absolute;
        font-size: 12px;
        right: 16px;
        color:#333;
        top: 30px;
        font{
            margin-left: 10px;
            margin-right: 10px;
        }
    }
    .goods_info_phone_read{
        position:absolute;
        right: 24px;
        font-size: 12px;
        color:#999;
        top: 140px;
        i{
            margin-left: 10px;
            color:#666;
        }
    }
    
    .goods_info_active{
        margin-top: 20px;
        span{
            color:#999;
        }
        font{
            background: #ff6590;
            color:#fff;
            line-height: 34px;
            padding: 4px 8px;
            margin-right: 10px;
            border-radius: 3px;
        }
        font.noy{
            background: #67c23a;
        }
        font.noz{
            background: #999;
        }
        .goods_skill{
            margin-bottom: 10px;
            background: #fef0f0;
            border:1px solid  #fde2e2;
            font-size: 14px;
            span{
                color:#f56c6c;
                line-height: 40px;
                i{
                    font-size: 18px;
                    line-height: 40px;
                    margin-right: 20px;
                    margin-left: 20px;
                    float: left;
                }
            }
            span.span_time{
                float: right;
                margin-right: 30px;
            }
        }
        .tuan_active{
            background: #f0f9eb;
            border: 1px solid #e1f3d8;
            span{
                color:#67c23a;
            }
        }
    }
}
.goods_info_top_mbx{
    margin:30px auto;
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
</style>
