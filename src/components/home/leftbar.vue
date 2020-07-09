<template>
    <div :class="change_color?'leftbar2':'leftbar'">
        <ul>
            <li class="left_bar_block" v-for="(v,k) in goods_class" :key="k">
                <div class="class_1"><router-link :to="'/goods/params/class_id.'+v.id">{{v.name}}</router-link></div>
                <div class="class_2">
                    <ul>
                        <li v-for="(vo,key) in v.children" :key="key" v-show="key<3"><router-link :to="'/goods/params/class_id.'+vo.id">{{vo.name}}</router-link></li>
                    </ul>
                </div>
                <div class="subbar">
                    <div class="subbar_subnav">
                        <div class="class2_title"  v-for="(vo,key) in v.children" :key="key">
                            <h4>{{vo.name}}</h4>
                            <ul>
                                <li v-for="(item,index) in vo.children" :key="index"><router-link :to="'/goods/params/class_id.'+item.id">{{item.name}}</router-link></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        change_color:{
            type:Boolean,
            default:false,
        }
    },
    data() {
      return {
          goods_class:[{
id: 13,
pid: 0,
name: "家用电器",
thumb: "",
rate: "0.00",
tags: "手机,电脑",
is_sort: 0,
lev: 0,
children: [
{
id: 19,
pid: 13,
name: "大家电",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 1,
children: [
{
id: 43,
pid: 19,
name: "洗衣机",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 2
},
{
id: 42,
pid: 19,
name: "平板电视",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 2
},
{
id: 24,
pid: 19,
name: "空调",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 2
}
]
},
{
id: 20,
pid: 13,
name: "生活电器",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 1,
children: [
{
id: 23,
pid: 20,
name: "电视剧",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 2
},
{
id: 21,
pid: 20,
name: "电饭煲",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 2
}
]
},
{
id: 22,
pid: 13,
name: "节能电器",
thumb: "",
rate: "0.00",
tags: "",
is_sort: 0,
lev: 1,
children: [
{
id: 41,
pid: 22,
name: "净水器",
thumb: "",
rate: "0.00",
tags: "净水器",
is_sort: 0,
lev: 2
}
]
}
]
},],
          goods_brand:[],
          goods_brand_adv:{},
      };
    },
    watch: {},
    computed: {},
    methods: {
        // 获取首页左侧导航信息
        get_subnav_info:function(){
            this.$get(this.$api.homeGetSubNavInfo).then(res=>{
                this.goods_class = res.data.goods_class;
                this.goods_brand = res.data.goods_brand;
                this.goods_brand_adv = res.data.goods_brand_adv;
            });
        }
    },
    created() {
        // this.get_subnav_info();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.leftbar{
    width: 240px;
    position: absolute;
    left: 0px;
    height: 450px;
    display: block;
    z-index: 998;
    color:#333;
    // background: rgba(255,255,255,.7);
    background:#fff;
    // overflow: hidden;
    // padding:0 15px;
    .class_1{
        padding: 8px 15px 0 15px;
        a{
            // font-weight: bold;
        }
    }
    
    .class_2{
        padding: 0 0 6px 15px;
        font-size: 12px;
        overflow: hidden;
        box-sizing: border-box;
        width: 240px;
        height: 24px;
        ul:after{
            display: block;
            clear: both;
            content:'';
        }
        ul li{
            line-height: 18px;
            float: left;
            a{
                color:#999;
                margin-right: 15px;
            }
        }
    }
    .class_2:after{
        display: block;
        clear: both;
        content:'';
    }
    
    .left_bar_block:hover{
        background: #f5f5f5;
        .subbar{
            display: block;
        }
    }
    .subbar{
        background: #f5f5f5;
        width: 960px;
        height: 450px;
        position: absolute;
        top:0;
        left: 240px;
        z-index: 999;
        display: none;
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .subbar_top{
            padding: 20px 0 0 20px;
            width: 680px;
            float: left;
            ul li{
                float: left;
                line-height: 25px;
                padding: 0 8px;
                background: #5f4f4f;
                margin-right: 20px;
                a{
                    color:#fff;
                    font-size: 12px;
                }
            }
            :after{
                display: block;
                content: "";
                clear: both;
            }
        }
        .subbar_right{
            float: right;
            width: 220px;
            height: 450px;
            ul{
                margin-top:20px;
            }
            ul li{
                float: left;
                height: 50px;
                border:1px solid #eee;
                border-bottom: none;
            }
            ul li:nth-child(2n){
                border-left: none;
            }
        }
    }
    .subbar_subnav{
        margin-left: 20px;
        margin-top: 15px;
        width: 680px;
        display: block;
        float: left;
        .class2_title{
            h4{
                width: 60px;
                text-align: right;
                float: left;
                margin-right: 20px;
            }
            ul{
                float: left;
                width: 600px;
                li{
                    float: left;
                    padding-left: 20px;
                    padding-right: 20px;
                    margin-top: 13px;
                    border-left: 1px solid #ddd;
                    line-height: 12px;
                    a{
                        font-size: 12px;
                        color:#999;
                        
                    }
                    a:hover{
                        color:#ca151e;
                    }
                    
                }
                li:last-child{
                    margin-bottom: 14px;
                }
                // border-bottom: 1px dashed #ccc;
            }
            
        }
        .class2_title:after{
            display: block;
            clear: both;
            content:'';
        }
    }
    
}
.leftbar2{
    width: 240px;
    position: absolute;
    left: 0px;
    height: 450px;
    display: block;
    z-index: 998;
    color:#fff;
    background: rgba(0,0,0,.6);
    // overflow: hidden;
    // padding:0 15px;
    .class_1{
        padding: 8px 15px 0 15px;
        a{
            // font-weight: bold;
            color:#fff;
        }
    }
    
    .class_2{
        padding: 0 0 6px 15px;
        font-size: 12px;
        overflow: hidden;
        box-sizing: border-box;
        width: 240px;
        height: 24px;
        ul:after{
            display: block;
            clear: both;
            content:'';
        }
        ul li{
            line-height: 18px;
            float: left;
            a{
                color:#bfbfbf;
                margin-right: 15px;
            }
        }
    }
    .class_2:after{
        display: block;
        clear: both;
        content:'';
    }
    
    .left_bar_block:hover{
        // background: #000;
        .subbar{
            display: block;
        }
    }
    .subbar{
        background: #fff;
        width: 960px;
        height: 450px;
        position: absolute;
        top:0;
        left: 240px;
        z-index: 999;
        display: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .subbar_top{
            padding: 20px 0 0 20px;
            width: 680px;
            float: left;
            ul li{
                float: left;
                line-height: 25px;
                padding: 0 8px;
                background: #5f4f4f;
                margin-right: 20px;
                a{
                    color:#fff;
                    font-size: 12px;
                }
            }
            :after{
                display: block;
                content: "";
                clear: both;
            }
        }
        .subbar_right{
            float: right;
            width: 220px;
            height: 450px;
            ul{
                margin-top:20px;
            }
            ul li{
                float: left;
                height: 50px;
                border:1px solid #eee;
                border-bottom: none;
            }
            ul li:nth-child(2n){
                border-left: none;
            }
        }
    }
    .subbar_subnav{
        margin-left: 20px;
        margin-top: 15px;
        width: 680px;
        display: block;
        float: left;
        .class2_title{
            h4{
                width: 60px;
                text-align: right;
                float: left;
                margin-right: 20px;
                color:#333;
            }
            ul{
                float: left;
                width: 600px;
                li{
                    float: left;
                    padding-left: 20px;
                    padding-right: 20px;
                    margin-top: 13px;
                    border-left: 1px solid #ddd;
                    line-height: 12px;
                    a{
                        font-size: 12px;
                        color:#999;
                        
                    }
                    a:hover{
                        color:#ca151e;
                    }
                    
                }
                li:last-child{
                    margin-bottom: 14px;
                }
                border-bottom: 1px dashed #ccc;
            }
            
        }
        .class2_title:after{
            display: block;
            clear: both;
            content:'';
        }
    }
    
}
</style>