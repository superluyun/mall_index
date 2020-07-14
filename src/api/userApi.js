import request from "@/utils/request";

const user = {
  //登录
  login({ name, password }) {
    return request({
      url: "/login",
      method: "post",
      params: {
        name,
        password
      }
    });
  },
  //用户信息
  getUserInfo() {
    return request({
      url: "/user",
      method: "get",
    });
  },
  //登出
  logOut({ token }) {
    return request({
      url: "/userLogout",
      method: "post",
      params: {
        token
      }
    });
  }
};
export default user;