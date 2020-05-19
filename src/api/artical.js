import request from '@/utlis/request.js'
// 获取频道新闻
export const getChannelsNew = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取文章详情
export const getUserArtical = articalId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articalId}`
  })
}
