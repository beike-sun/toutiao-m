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
// 收藏文章
export const collectArtical = collectArticalId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: collectArticalId
    }
  })
}
// 取消收藏文章
export const uncollectArtical = uncollectArticalId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${uncollectArticalId}`
  })
}
// 对文章点赞
export const ArticalLike = likeArticleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: likeArticleId
    }
  })
}
// 取消对文章点赞
export const unArticalLike = unlikeArticleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${unlikeArticleId}`
  })
}
