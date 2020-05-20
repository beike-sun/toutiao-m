<template>
  <div class="postComment">
        <!-- 多文本输入框 -->
  <van-field
  v-model="message"
  rows="3"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="优质评论会被优先展示"
  show-word-limit
/>
<!-- 发布按钮 -->
<van-button
 type="default"
 size="small"
 @click="onPostComment"
 >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [String, Object, Number],
      required: true
    },
    commentId: {
      type: [String, Object, Number],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPostComment () {
      const data = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.commentId ? this.commentId.toString() : null
      })
      console.log(data)
    }
  }
}
</script>

<style>
.postComment{
  display: flex;
  align-items: center;
}
</style>
