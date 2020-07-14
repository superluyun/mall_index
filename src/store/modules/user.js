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
  action:{
    setJwt({ commit }, jwt) {
      commit("SET_JWT", jwt);
    },
    //用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .getUserInfo()
          .then(res => {
            if (res.result) {
              commit("SET_USER_INFO", res.result.userInfo);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit, state }) {
      commit("SET_JWT", "");
      Storage.cle();
    }
  }
}
export default user