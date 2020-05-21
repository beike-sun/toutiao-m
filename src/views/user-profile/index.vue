<template>
  <div class="user-profile">
    <van-nav-bar
    class="userNewsTitle"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
/>
<van-cell title="头像" is-link center>
  <van-image
  class="avatar"
  round
  fit="cover"
  :src="user.photo"
/>
</van-cell>
<van-cell title="昵称" is-link  :value="user.name" @click="isNickShow = true">
</van-cell>
<van-cell title="性别" is-link  :value="user.gender===0 ? '男' : '女'"/>
<van-cell title="生日" is-link  :value="user.birthday"/>
<van-popup
 v-model="isNickShow"
 position="bottom"
 :style="{ height: '100%' }"
   >
<update-name
@close="isNickShow = false"
:nickname="user.name"
@update-nickname="user.name = $event"
></update-name>
  </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './compontents/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  data () {
    return {
      // 用户信息数据
      user: {},
      // 修改昵称的弹出框
      isNickShow: true
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const data = await getUserProfile()
      // console.log(data)
      this.user = data.data.data
    }
  }
}
</script>

<style>
.van-popup{
    background-color: #f4f5f6;
}
.userNewsTitle{
  background-color: #3296fa;
}
.van-nav-bar__title{
  color: #fff;
}
.van-icon-arrow-left::before{
  color: #fff;
}
.avatar{
  width:30px;
  height:30px
}
</style>
