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
    <van-button
     size="small"
      round
      class="send-btn"
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
import { login } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^d{6}$/, message: '验证码格式错误' }
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
      } catch (err) {
        Toast.fail('登录失败，手机号或验证码失败')
      }
    },
    //
    onFailed (error) {
      if (error.errors[0]) {
        Toast(
          {
            message: error.errors[0].message,
            position: top
          }
        )
      }
    }
    // onSendCode () {
    //   this.$refs['login-form'].validate('mobile').then(data => {
    //     console.log(data)
    //   })
    // }
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
