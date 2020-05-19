import axios from 'axios'
import jsonBig from 'json-bigint'
// 在非组件中通过加载容器获取共享数据状态
import store from '@/store/'
const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
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
