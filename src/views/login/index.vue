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
<van-cell-group>
  <van-field
    v-model="user.mobile"
    icon-prefix="icon"
    left-icon="shouji"
    placeholder="请输入手机号"
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="icon"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
  >
    <template #button>
    <van-button
     size="small"
      round
      class="send-btn"
      >获取验证码</van-button>
  </template>
  </van-field>
</van-cell-group>
<!-- 底部 -->
<div class="login-btn-wrap">
  <van-button
   type="info"
    block
    class="login-btn"
    @click="onLogin()"
    >登录</van-button>
</div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    async onLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log('登录失败', err)
      }
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
