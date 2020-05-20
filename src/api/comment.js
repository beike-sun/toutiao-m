import request from '@/utlis/request.js'
// 获取评论
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 对评论或评论回复点赞
export const addCommentLike = addCommentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: addCommentId
    }
  })
}
// 取消评论或评论回复点赞
export const deleteCommentLike = deleteCommentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${deleteCommentId}`
  })
}
