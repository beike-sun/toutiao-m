import request from '@/utlis/request.js'
// 获取频道新闻
export const getChannelsNew = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
