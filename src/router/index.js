import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'LayoutIndex',// 没有意义
    component: () => import('@/views/Layout/index.vue'),
    // 子路由
    children: [{
      // 首页
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/index.vue')
    }, {
      // 问答
      path: '/qa',
      name: 'qa',
      component: () => import('@/views/Qa/index.vue')
    }, {
      // 视频
      path: '/video',
      name: 'video',
      component: () => import('@/views/Video/index.vue')
    }, {
      // 我的
      path: '/my',
      name: 'my',
      component: () => import('@/views/My/index.vue')
    }]
  }
]
const router = new VueRouter({
  routes
})

export default router
