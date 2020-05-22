<template>
  <div class="update-photo">
      <img :src="previewImg" alt="">
      <van-nav-bar
        class="updatePhoto-bottom"
        left-text="取消"
        right-text="完成"
        left-arrow
        @click-left="$emit('close')"
        @click-right="onConfirm"
        />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      previewImg: window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      const fd = new FormData()
      fd.append('photo', this.file)
      await updateUserPhoto(fd)
      //   console.log(data)
      // 更新父组件的头像
      this.$emit('update-photo', this.previewImg)
      this.$toast.success('修改成功')
      this.$emit('close')
    }
  }
}
</script>

<style>
.updatePhoto-bottom{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
