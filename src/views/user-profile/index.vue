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
<van-cell
 title="性别"
 is-link
 @click="isGenderShow = true"
 :value="user.gender===0 ? '男' : '女'"/>
<van-cell title="生日" is-link  :value="user.birthday"/>
<!-- 更新昵称的弹出框 -->
<van-popup
 v-model="isNickShow"
 position="bottom"
 :style="{ height: '100%' }"
   >
<update-name
v-if="isNickShow"
@close="isNickShow = false"
v-model="user.name"
@input="user.name = $event"
></update-name>
  </van-popup>
  <!-- 更新性别的弹出框 -->
  <van-popup
    v-model="isGenderShow"
      position="bottom"
    :style="{ height: '50%' }"
   >
   <update-gender
   v-if="isGenderShow"
   @close="isGenderShow = false"
   v-model="user.gender"
   ></update-gender>
  </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './compontents/update-name'
import UpdateGender from './compontents/update-gender'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender
  },
  data () {
    return {
      // 用户信息数据
      user: {},
      // 修改昵称的弹出框
      isNickShow: false,
      // 修改性别的弹出框
      isGenderShow: false
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
