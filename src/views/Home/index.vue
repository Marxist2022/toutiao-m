<template>
  <div class="home-container">
    <!-- //1顶部导航栏 s-->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索
      </van-button>
    </van-nav-bar>
    <!-- //1顶部导航栏e -->
    <!-- //2频道列表 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable border>
      <!-- 标签遍历 -->
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- //4频道显示的竖文章列表 -->
        <ArticleList :channel="channel"> </ArticleList>
        <!-- //4频道显示的竖文章列表 -->
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- //2频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/home'
import ArticleList from './components/article-list.vue'
export default {

  name: 'HomeIndex',
  created () {
    this.loadChannels()// 获取频道列表
  },
  data () {
    return {
      active: 0, // 默认标签第一个显示
      channels: []// 获取频道列表
    }
  },
  methods: {
    async loadChannels () { // 获取频道函数
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels// 赋值给频道列表
      } catch (err) {
        console.log('获取数据失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleList }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-bottom: 100px; //显示 “没有更多了”
  padding-top: 174px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  // 搜索栏
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  // 标签栏
  /deep/.channel-tabs {
    // 标签栏
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }

    .van-tab {
      // 各个标签栏的统一样式
      border: 1px soild #333 !important;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    // 被选定的样式
    .van-tab--active {
      color: #333;
    }
    // 小斜杠到底部的距离
    .van-tabs__nav {
      padding-bottom: 0;
    }
    // 标签篮的底部小斜杠
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      border-radius: 3px;
      bottom: 8px;
    }

    .hamburger-btn {
      //汉堡按钮样式设置
      position: fixed; //固定在窗口
      right: 0; //固定在窗口做右边
      display: flex; //脱标
      justify-content: center; //水平剧中
      align-items: center; // 垂直居中
      width: 66px;
      height: 82px;
      background-color: #fff; //背景色白色
      opacity: 0.9; //透明

      i.toutiao {
        //汉堡按钮logo大小
        font-size: 33px; //字体大小
      }
      &::before {
        //伪元素设置
        content: ""; //伪元素必须要有的
        position: absolute; //绝对定位
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url("@/assets/gradient-gray-line.png"); //灰色条
        background-size: contain; //长宽那个先触碰到边缘就停止
      }
    }
    // 占位空格
    .placeholder {
      flex-shrink: 0; //不参与和兄弟占位
      // 和汉堡按钮的宽高一样
      width: 66px;
      height: 82px;
    }
  }
}
</style>
