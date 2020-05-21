<template>
  <div class="update-name">
    <van-nav-bar
       title="修改昵称"
       left-text="取消"
       right-text="完成"
       @click-left="$emit('close')"
       @click-right="onConfirm"
    />
    <van-field
       class="textbox"
       v-model="localName"
       rows="2"
       autosize
       type="textarea"
       maxlength="7"
       show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      await updateUserProfile({
        name: this.localName
      })
      this.$toast.success('修改成功')
      //   关闭弹层
      this.$emit('close')
      this.$emit('input', this.localName)
    }
  }
}
</script>

<style>
.van-nav-bar__title{
    color: #333!important;
}
.textbox{
margin: 10px;
}
.van-cell{
    width: unset;
}
</style>
