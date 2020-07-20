import Storage from '@/utils/storage'
import userApi from '@/api/userApi'

const user = {
  state : {
    jwt: Storage.get('jwt') || null,
    userInfo: ''
  },
  mutations:{
    SET_JWT:(state,jwt) =>{
      Storage.set('jwt',jwt)
      state.jwt = jwt
    },
    SET_USER_INFO:(state,userInfo) => {
      Storage.set('userinfo',userInfo)
      state.userInfo = userInfo
    }
  },
  actions:{
    setJwt({ commit }, jwt) {
      commit("SET_JWT", jwt);
    },
    //用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .getUserInfo()
          .then(res => {
            if (res.data) {
              commit("SET_USER_INFO", res.data.userInfo);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit, state }) {
      return new Promise((resolve,reject)=>{
        userApi.logOut().then(res=>{
          commit("SET_JWT", "");
          Storage.cle();
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  }
}
export default user