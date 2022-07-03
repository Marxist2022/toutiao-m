<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <!-- //1文章列表项目 -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: { // 传递过来的列表
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: [], // 存储竖向列表数据
      loading: false, // 控 制加 载中的效果loading状态
      finished: false, // 控制数据 结束数据加载结束的状态————没有更多了
      timestamp: null, // 时间戳
      error: false, // 加载失败
      isLoading: false, // 下拉刷新按钮开关
      successText: ''// 下拉刷新成功的显示的文字
    }
  },
  methods: {
    // 初始化或滚动

    // onLoad () {
    //   // 如果数据太少就触发两次
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     // 判断数据是否加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad () {
      // 如果数据太少就触发两次
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // 获取文章列表数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now()
        })
        // 测试如果数据加载失败了
        // if (Math.random() > 0.5) {
        //   this.error = true
        // }
        const { results } = data.data// 解构获取来的数据中的results
        console.log('文章', data)// 打印获取来的数据

        this.list.push(...results)// 添加上获取的文章
        this.loading = false// 让上拉显示更多文章
        if (results.length) {
          this.timestamp = data.pre_timestamp// 承接刚才加载的时间戳
        } else {
          this.finished = true// 加载完毕
        }
      } catch (error) {
        this.error = true// 数据加载失败了，就在底部显示
        this.loading = false
        console.log(error)
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        // 接口函数
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now()// 时间戳
        })
        const { results } = data.data// 解构数据
        this.list.unshift(...results)// 把新数据放在列表的头部
        this.isLoading = false// 关闭下拉
        this.successText = `刷新成功,更新了${results.length}条数据`// 下拉刷新更新成功显示的内容
      } catch (error) {
        console.log(error)
        this.isLoading = false// 关闭下拉
        this.successText = '刷新失败！请稍后重试'// 下拉刷新更新失败的时候
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
