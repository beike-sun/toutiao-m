import axios from 'axios'
// 在非组件中通过加载容器获取共享数据状态
import store from '@/store/'
const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log(config)
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
