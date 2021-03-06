import Vue from 'vue'
import dayjs from 'dayjs'
// 配置中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 利用全局过滤去处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// 处理时间格式
Vue.filter('dateFormat', (value, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
