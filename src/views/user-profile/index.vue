<template>
  <div class="user-profile">
    <van-nav-bar
    class="userNewsTitle"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
/>
<input
   type="file"
   hidden
   accept="image/*"
   ref="file"
   @change="onChange"
   >
<van-cell
  title="头像"
  is-link
  center
  @click="$refs.file.click()" >
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
<van-cell
 title="生日"
  is-link
  :value="user.birthday"
  @click="isBirthdayShow = true"
  />
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
  <!-- 更新生日的弹出层 -->
  <van-popup
     v-model="isBirthdayShow"
     position="bottom"
     :style="{ height: '50%' }"
   >
   <update-birthday
   v-if="isBirthdayShow"
   v-model="user.birthday"
   @close="isBirthdayShow = false"
   ></update-birthday>
  </van-popup>
  <!-- 更新头像的弹层 -->
    <van-popup
     v-model="isPhotoShow"
     position="bottom"
     :style="{ height: '100%' }"
   >
   <update-photo
   :file="previewPhoto"
   @close="isPhotoShow = false"
   @updatePhoto="user.photo = $event"
   ></update-photo>
  </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './compontents/update-name'
import UpdateGender from './compontents/update-gender'
import UpdateBirthday from './compontents/udate-birthday'
import UpdatePhoto from './compontents/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      // 用户信息数据
      user: {},
      // 修改昵称的弹出框
      isNickShow: false,
      // 修改性别的弹出框
      isGenderShow: false,
      // 修改生日的弹层框
      isBirthdayShow: false,
      // 修改用户头像的弹出框
      isPhotoShow: false,
      // 预览图片的src
      previewPhoto: null
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
    },
    onChange () {
      // 当触发选中文件的时候，展示弹层、进行头像裁切、确认
      // console.log('change')
      // 展示弹出层
      this.isPhotoShow = true
      // 在弹出层中预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      // console.log(blob)
      this.previewPhoto = file
      // 清空
      this.$refs.file.value = ''
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
