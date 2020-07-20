import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import '@/utils/permission'

import ElementUI from 'element-ui';
import '@/assets/theme/index.css'
import '../public/style.css' // 公共CSS
import '../public/fonts/iconfont.css' // 阿里图标

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = Axios

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
