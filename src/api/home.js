import request from '@/utils/request'
// 获取用户频道列表 就是顶部的横向标签
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels' // 注意空格
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
// 获取用户频道列表 就是顶部的横向标签
export const getUserChannelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels' // 注意空格
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles', // 注意空格
    params
  })
}
