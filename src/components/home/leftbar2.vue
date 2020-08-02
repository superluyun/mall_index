<template>
  <div id='leftbar'>
    <ul class="cat">
      <li v-for="(v,i) in category" :key="i">
        <div class="cat1 float_left"> <router-link :to="`/store/${store_id}?cid1=${v.id}`"><span>{{v.name}}</span></router-link></div>
        <div class="cat2 float_right" v-for="(val,index) in v.children" :key="index">
          <ul>
            <li> <router-link :to="`/store/${store_id}?cid2=${val.id}`"><span>{{val.name}}</span></router-link></li>
          </ul>
        </div>
      </li>
      
    </ul>
  </div>
</template>

<script>

export default {
  props:["category","store_id"],
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#leftbar{
  // width: 300px;
  background-color: rgba(255,255,255,1);
  position: absolute;
  left: 0;
  box-sizing: border-box;
  .cat{
    width: 167px;
    height: 410px;
    overflow-y: auto;
    display: block;
  }
  .cat1{
    width: 150px;
    height: 40px;
  }
  .cat1:hover{
    cursor: pointer;
    background-color: #f5f5f5;
  }
  .cat1:hover + .cat2{
    display: block;
  }
  .cat2{
    width: 150px;
    height: 410px;
    background-color: #f5f5f5;
    display: none;
    position: absolute;
    overflow-y: auto;
    top: 0;
    left: 150px;
  }
  .cat2:hover{
    display: block;
  }
  .cat2 li:hover{
    cursor: pointer;
    background-color: #f0f0f0;
  }
  span{
    display: block;
    margin-left:10px;
    color: #3c3c3c;
  }
}
</style>