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
  // 列表页
  getList(data){
    return request({
      url:'/goods/search',
      method:'get',
      params:data
    })
  },
  // 店铺列表页
  getStoreList(data,id){
    return request({
      url:'/store/goods/'+id,
      method:'get',
      params:data
    })
  },
  // 获取店铺详情
  getSotreInfo(id){
    return request({
      url:'/store/'+id,
      method:'get'
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
