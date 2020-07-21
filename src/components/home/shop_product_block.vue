<template>
    <div class="shop_product_block width_center_1200">
        <div class="seckill_title">{{goods_list.name}}<span><router-link :to="goods_list.link">查看更多</router-link></span></div>
        <div class="product_left">
            <el-image :src="goods_list.items[0].image" alt="" lazy></el-image>
        </div>
        <div class="product_right">
            <ul>
                <li v-for="(v,k) in goods_list.items.slice(1,Infinity)" :key="k"><router-link :to="`/goodsinfo/${v.id}`">
                    <div class="product_act_in">
                        <dl>
                            <dt><el-image :src="v.goods.image_url" alt="" lazy></el-image></dt>
                            <dd class="product_title" :title="v.goods.name">{{v.goods.name}}</dd>
                            <dd class="product_subtitle">{{v.goods.subtitle}}</dd>
                            <dd class="product_price">￥{{v.goods.sale_price}}<span>{{v.goods.market_price}}元</span></dd>
                        </dl>
                    </div>
                </router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        goods_list:{
            type:Object,
        },
        class_info:{
            type:Object,
            default:()=>{
                return {name:'加载中...'}
            }
        },
        adv:{
            type:Object,
        }
    },
    data() {
      return {
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.product_left{
    width: 234px;
    height: 614px;
    float: left;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
}
.product_left:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.product_right{
    width: 966px;
    float: left;
    ul li{
        width: 220px;
        height: 300px;
        margin-bottom: 14px;
        margin-left: 20px;
        box-sizing: border-box;
        float: left;
        .product_act_in{
            width: 220px;
            height: 300px;
            background: #fff;
            box-sizing: border-box;
            -webkit-transition: all .2s linear;
            transition: all .2s linear;
        }
        dl dt{
            width: 140px;
            height: 140px;
            margin:0 auto;
            padding-top: 20px;
        }
        dl dt img{
            width: 180px;
            height: 180px;
        }
        dl dd{
            width: 190px;
            overflow: hidden;
            text-align: center;
            margin:0 auto;
        }
        dl dd.product_title{
            font-size: 14px;
            margin-top: 25px;
            height: 30px;
            line-height: 30px;
        }
        dl dd.product_subtitle{
            margin-top: 0px;
            font-size: 12px;
            color:#b0b0b0;
            line-height: 14px;
        }
        dl dd.product_price{
            margin-top: 10px;
            font-size: 16px;
            color:#f25c19 ;
            line-height: 34px;
            span{
                font-size: 14px;
                color:#b0b0b0;
                margin-left: 8px;
                text-decoration: line-through;
            }
        }
    }
    
    ul li:hover .product_act_in{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top:-3px;
    }
    
}
.seckill_title{
    font-size: 22px;
    margin-bottom: 20px;
    span{
        float:right;
        font-size: 14px;
        padding-right: 15px;
    }
    a:hover{
        color:#f25c19 ;
    }
}
</style>