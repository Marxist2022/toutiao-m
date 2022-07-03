<template>
  <div class="login-container">
    <!-- //1顶部导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- /顶部导航栏 -->
    <!-- 表单登录 -->
    <!--
    表单验证：
      1、给van-field组件配置rules
          验证规则去bant
      2、当表单提交的时候会自动触发表单验证
        如果验证通过，会触发submit事件
        如果验证失败，不会触发submit
      -->
    <!-- //1登录按钮 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        type="number"
        name="mobile"
        maxlength="11"
        placeholder="请填写手机号"
        :rules="[
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请填写正确的手机号格式',
          },
        ]"
      >
        <!-- 手机logo -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        <!--/ 手机logo -->
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        maxlength="6"
        name="code"
        placeholder="请填写验证码"
        :rules="[
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码格式' },
        ]"
      >
        <!-- 验证码logo -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!--/ 验证码logo -->
        <!-- //1发送验证码按钮 -->
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            class="send-yzm-btn"
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
        <!--/ 发送验证码按钮 -->
        <!-- //2登录按钮 -->
      </van-field>
      <div style="margin: 16px">
        <van-button block class="login-btn" type="info" native-type="primary"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /表单登录 -->
  </div>
</template>

<script>
import '@/styles/icon.less'
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  created () { },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      time: 2 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 1。0登录按钮时间
    async onSubmit () {
      // 1.1 获取表单数据
      // 1.2 表单验证
      // 轻提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      // 1.3 提交表单请求登录
      try {
        // const res = await login(user)
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        // 如果登录成功轻提示显示登录成功
        this.$toast.success('登录成功')
        // *不严谨
        this.$router.back()
      } catch (err) {
        if (err.request.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log(err, '登录失败，请稍后重试')
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 1.4 根据请求响应结果处理后续操作
    },
    // 2.0
    async onSendSms () {
      // 2.1验证手机号
      console.log('onSendSms')
      try {
        this.$refs.loginForm.validate('mobile')
        console.log('发送成功')
      } catch (err) {
        return console.log(err, '验证失败')
      }
      // 2.2 验证通过，显示倒计时
      this.isCountDownShow = true

      // 2.3请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log('验证码发送成功', res)
        this.$toast.success('验证码发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('获取验证码忙碌')
        } else {
          this.$toast.fail('获取验证码失败，请稍后重试')
        }
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 填写表单的大小设置
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
// 头部导航栏的样式
.page-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
// 发送验证码按钮设置
.send-yzm-btn {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border: none;
  color: #666666;
  font-size: 22px;
}
// 登录按钮设置
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 30px;
}
</style>
