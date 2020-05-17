import request from '@/utlis/request.js'
// 获取联想列表
export const getThinkList = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
