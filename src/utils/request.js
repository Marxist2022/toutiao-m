import axios from 'axios'
import store from '@/store'
//  ?不推荐使用挂载在原型对象上

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 请求发起会经过这里
  console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须有下面这句话，不让就不放行
  return config
}, function (error) {
  // Do something with request error
  // 如果请求出错 还没发出去 会进入这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
