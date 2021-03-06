/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations', // 注意空格
    data
  })
}
// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}` // 注意空格
  })
}

// 用户的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user' // 注意空格
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
