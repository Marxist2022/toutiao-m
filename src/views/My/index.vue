<template>
  <div class="my-container">
    <!--一已登录 头像 编辑资料 头条  关注  粉丝 获赞-->
    <div class="header user-info" v-if="user">
      <!-- 头像 编辑资料 -->
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button>编辑资料</van-button>
        </div>
      </div>
      <!-- /头像 编辑资料 -->

      <!--  头条  关注  粉丝 获赞-->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
      <!--/  头条  关注  粉丝 获赞-->
    </div>
    <!--/ 已登录 头像 编辑资料 头条  关注  粉丝 获赞-->

    <!-- 未登录/注册 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!--/ 未登录/注册 -->

    <!-- 公格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"> </i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"> </i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!--/ 公格导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" />
    <van-cell
      title="退出登录"
      class="logout-cell"
      v-if="user"
      @click="onLogout"
      clickable
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          // on confirm
          // console.log('确认执行这里')
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    // 加载用户资料
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {

  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-container {
  // 头部
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  //* 头部
  // 未登录
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  //* 未登录
  // 用户信息 样式
  .user-info {
    .base-info {
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      // 头像和编辑资料按钮水平对齐
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          // 图片大小
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // background-color: #ccc;
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column; // 主线垂直
        justify-content: center; // 对齐
        align-items: center; // 主线对齐
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  //* 用户信息 样式
  // 收藏 历史 样式
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  // *收藏 历史 样式
  .mb-9 {
    margin-bottom: 10px;
  }
  .logout-cell {
    color: #eb5253;
  }
}
</style>
