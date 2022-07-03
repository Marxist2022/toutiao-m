<template>
  <div class="layout-container">
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- /二级路由 -->

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="search">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text"> 首页 </span></van-tabbar-item
      >
      <van-tabbar-item replace to="/qa" icon="search">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text"> 问答 </span></van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="search">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text"> 视频 </span></van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="search">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">
          {{ $store.state.user ? "我的" : "未登录" }}
        </span></van-tabbar-item
      >
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  created () { },
  data () {
    return {
      // 路由导航栏
      active: 'home'
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.layout-container {
  .layout-tabbar {
    // 字体图标
    i.toutiao {
      font-size: 40px;
      // 字体图标下方字体
      span.text {
        font-size: 20px;
      }
    }
  }
}
</style>
