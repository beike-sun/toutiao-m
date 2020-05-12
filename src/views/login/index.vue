<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="top-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
/>
    <!-- 表单 -->
<van-form
:show-error ="false"
:show-error-message ="false"
 ref="login-form"
 validate-first="true"
 @submit="onLogin"
 @failed ="onFailed"
 >
  <van-field
    v-model="user.mobile"
    icon-prefix="icon"
    left-icon="shouji"
    name='mobile'
    placeholder="请输入手机号"
    :rules="formRules.mobile"
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="icon"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    name='code'
    :rules="formRules.code"
  >
    <template #button>
    <van-count-down
     :time="1000*6"
     format="ss s"
     v-if="isCountDown"
     @finish="isCountDown=false"
       />
    <van-button
      v-else
     size="small"
      round
      class="send-btn"
      :loading="isSendSmsLoading"
      @click.prevent="onSendSms"
      >获取验证码</van-button>
  </template>
  </van-field>
  <!-- 底部 -->
<div class="login-btn-wrap">
  <van-button
   type="info"
    block
    class="login-btn"
    >登录</van-button>
</div>
</van-form>
  </div>
</template>

<script>
import {
  login,
  sendSms
} from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDown: false,
      isSendSmsLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
        // 登录成功之后，返回原来页面
        this.$router.back()
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        Toast.fail('登录失败，手机号或验证码失败')
      }
    },
    // 点击登录，自定义提示错误信息
    onFailed (error) {
      if (error.errors[0]) {
        Toast(
          {
            message: error.errors[0].message,
            position: top
          }
        )
      }
    },
    async onSendSms () {
      // 发送验证码，校验手机号，向后台发请求，得到成功的请求之后，隐藏‘发送验证码’创建显示倒计时
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过发请求
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDown = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败给出的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        Toast(
          {
            message,
            position: 'bottom'
          }
        )
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style>
.icon{
  margin-right: 20px;
}
.send-btn{
  background-color: #ededed;
  font-size: 11px;
}
.login-btn-wrap{
  padding: 26px 16px;
}
.login-btn{
  border:  none;
  background-color: #6db4fb;
  font-size: 15px;
}

</style>
