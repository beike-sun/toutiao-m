<template>
  <div class="update-name">
    <van-nav-bar
       title="修改昵称"
       left-text="取消"
       right-text="完成"
       @click-left="$emit('close')"
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
export default {
  name: 'UpdateName',
  props: {
    nickname: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.nickname
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
