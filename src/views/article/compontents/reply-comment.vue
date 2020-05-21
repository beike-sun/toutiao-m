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
<!-- 评论的评论列表项 -->
<comment-list
:source="comment.com_id"
 type="c"
 :commentList="replyList"
></comment-list>
<!-- 发布评论回复 -->
  <van-cell  value="内容" class="replaybtn" >
      <van-button
      class="replyPublish"
      type="default"
      round
      @click="isReplyPublish=true"
      >写评论</van-button>
  </van-cell>
  <!-- 回复评论发布弹层框 -->
  <van-popup
   v-model.trim="isReplyPublish"
   position="bottom"
    >
    <post-comment
     :target="comment.com_id"
     :article-id="articleId"
     @postCommentSuccess="onPostComment"
     ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'ReplyComment',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      isReplyPublish: false,
      message: '',
      replyList: []
    }
  },
  methods: {
    onPostComment (comment) {
      this.replyList.unshift(comment)
      this.isReplyPublish = false
      this.comment.reply_count++
      this.message = ''
    }
  }
}
</script>

<style>
.replyPublish{
    width: 100%;
}
.replaybtn{
    position: fixed;
    bottom: 0;
}
</style>
