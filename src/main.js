import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'
import './styles/icon.css'
// 加载全局样式
import './styles/index.css'
import './utlis/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
