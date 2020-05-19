import request from '@/utlis/request.js'
// 获取评论
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
