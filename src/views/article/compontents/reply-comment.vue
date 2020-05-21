<template>
  <div class="reply-comment">
      <!-- 头部区域 -->
      <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
       name="cross"
        slot="left"
        @click="$emit('close')"
        ></van-icon>
</van-nav-bar>
<!-- 当前评论项 -->
<comment-item
:comment="comment"
></comment-item>
  </div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  name: 'ReplyComment',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
