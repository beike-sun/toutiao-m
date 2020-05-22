<template>
  <div class="update-photo">
      <img
       :src="previewImg"
        class="image"
        ref="image"
        >
      <van-nav-bar
        class="updatePhoto-bottom"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
        />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
      previewImg: window.URL.createObjectURL(this.file),
      // 裁切器实例
      cropper: null
    }
  },
  mounted () {
    //   获取裁切的图片dom
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      // aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        // 展示时间，0表示持续展示
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserPhoto(fd)
      //   console.log(data)
      // 更新父组件的头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
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
.image{
   display: block;
   max-width: 100%;
}
.van-nav-bar{
    background-color: unset;
}
.van-popup--bottom{
    background: #000 !important;
}
</style>
