<template>
  <div class="comment-list">
      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
>
<!-- 评论项 -->
<comment-item
v-for="(comment, index) in commentList"
:key="index"
:comment="comment"
@reply-comment="$emit('reply-comment', $event)"
></comment-item>
</van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    commentList: {
      type: [Array, String, Number, Object],
      default: function () {
        return []
      }
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // commentList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
    // 1获取评论接口
      const data = await getComment(
        {
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        }
      )
      console.log(data)
      // 获取的评论数量
      this.$emit('total_count', data.data.data.total_count)
      const results = data.data.data.results
      this.commentList.push(...results)
      // 2将获取的评论放到评论列表中
      this.loading = false
      // 3关闭加载
      if (results.length) {
        this.offset = data.data.data.last_id
      } else {
        this.finished = true
      }
      // 4判断是否还有评论,有的话加载下一页评论,否则关闭finished
    }
  }
}
</script>

<style>

</style>
