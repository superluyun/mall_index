<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import userApi from '@/api/userApi'
import baseApi from '@/api/baseApi'


export default {
  data(){
    return {
      meta_info:{
        title:'',
        keywords:'',
        description:''
      }
    }
  },
  mounted(){
    this.getUserInfo();
    this.get_meta_info()
  },
  watch:{
    $route:function(to){
      this.getUserInfo()
    }
  },
  methods:{
    getUserInfo(){
      if(this.$route.query.jwt){
        var jwt = this.$route.query.jwt
        this.$store.commit('SET_JWT',jwt)
        userApi.getUserInfo().then(res=>{
          this.$store.commit('SET_USER_INFO',res.data)
          // this.$router.push({path:'/'}) // 去除URL中jwt
        }).catch(err=>{
          // this.$message.error(err);
          // this.$router.push({path:'/'}) // 去除URL中jwt
        })
      }
    },
    get_meta_info(){
      baseApi.getSiteInfo().then(res=>{
        this.meta_info.title = res.data.title
        this.meta_info.keywords = res.data.seo_keywords
        this.meta_info.description = res.data.seo_desc
      })
    }
  },
  metaInfo(){//设置网站 meta 信息
    return{
      title: this.meta_info.title, // set a title
      meta: [
        {                 // set meta
          name: 'keywords',
          content: this.meta_info.keywords
        },
        {
          name:'description',
          content:this.meta_info.description
        }
      ]
    }
  }
}
</script>

<style>
html,body,#app {
  height: 100%;
  margin:0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* font-size: 12px; */
  /* font: 12px/1.5 tahoma,arial,'Hiraginl Sans GB','\5b8b\4f53',sans-serif; */
}
ol,ul {list-style:none} 
a{text-decoration: none;color:#333;}
</style>
