import request from "@/utils/request";

export default {
  //首页数据
  getIndex() {
    return request({
      url: "/index",
      method: "get"
    });
  },
  // 分类数据
  getCategory(){
      return request({
          url:'/category/tree',
          method:'get'
      })
  },
  getList(data){
    return request({
      url:'/goods/search',
      method:'get',
      params:data
    })
  },
  // 获取商品详情
  getGoodsInfo(data){
    return request({
      url:'/goods/item/'+data,
      method:'get'
    })
  }
};
