<template>
  <div class="article-container">
<!-- 导航栏 -->
<van-nav-bar
  class="nav-bar"
  title="文章详情"
  left-arrow
  @click-left="$router.back()"
/>
<!-- 详情文章标题 -->
<div class="user-info">
<h1>{{article.title}}</h1>
<van-cell center >
  <div slot="icon">
    <van-image
    class="avatar"
  fit="cover"
  round
  :src="article.aut_photo"
/>
  </div>
  <div slot="title" class="title">{{article.aut_name}}</div>
  <div slot="label" class="pudate">{{article.pubdate | relativeTime}}</div>
  <van-button
  class="attention"
  round
   :icon="article.is_followed? ' ': 'plus '"
   :type="article.is_followed ? 'default': 'info'"
   size="small"
   :loading="isFollowLoading"
   @click="onFollow"
   >{{article.is_followed? '已关注': '关注'}}</van-button>
</van-cell>
<div class="markdown-body" v-html="article.content" ref="article-content">
</div>
 <!-- 评论 -->
        <comment-list
        :source="articleId"
        :commentList="commentList"
        @total_count="totalCommentCount=$event"
        @reply-comment="replyComment"
        ></comment-list>
</div>
<!-- 底部区域 -->
  <van-cell class="article-bottom" center >
     <div slot="title">
       <van-button
       class="comment-button"
        plain
        type="default"
        round
        size="small"
        @click="onpopupShow"
        >写评论</van-button>
        <!-- 点赞 -->
        <van-icon
         :color="article.attitude ===1? 'purple' :'#777 '"
         :name="article.attitude === 1? 'good-job':'good-job-o'"
         @click="onAttitude"
          ></van-icon>
          <!-- 回复数量 -->
        <van-icon
         name="comment-o"
         :info="totalCommentCount"
          />
        <!-- 收藏 -->
        <van-icon
         :color="article.is_collected?'purple':'#777'"
         :name="article.is_collected? 'star':'star-o'"
         @click="onCollect"
          ></van-icon>
          <!-- 分享 -->
        <van-icon name="share"></van-icon>
</div>
  </van-cell>
  <!-- 发布评论 -->
  <van-popup
   v-model="ispopupShow"
   position="bottom"
   >
  <post-comment
  :target="articleId"
  @postCommentSuccess="onPostSuccess"
  ></post-comment>
  </van-popup>
  <!-- 回复评论 -->
  <van-popup
   v-model="isReplyShow"
    position="bottom"
   :style="{ height: '30%' }" >
   </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import CommentList from './compontents/comment-list'
import {
  getUserArtical,
  collectArtical,
  uncollectArtical,
  ArticalLike,
  unArticalLike
} from '@/api/artical'
import { ImagePreview } from 'vant'
import { followUser, unfollowUser } from '@/api/user'
import PostComment from './compontents/post-comment'
export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentList,
    PostComment
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false,
      ispopupShow: false,
      message: '',
      // 文章评论列表
      commentList: [],
      totalCommentCount: 0,
      isReplyShow: false
    }
  },
  created () {
    this.loadUserArtical()
  },
  methods: {
    async loadUserArtical () {
      const data = await getUserArtical(this.articleId)
      // console.log(data)
      this.article = data.data.data
      this.$nextTick(() => {
        this.handlePreviewImgs()
      })
    },
    handlePreviewImgs () {
      // 获取文章内容容器
      const articleContent = this.$refs['article-content']
      // console.log(articleContent)
      // 获取到内容容器中的所有img标签
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      // 给img标签进行点击事件注册
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index, // 起始位置
            showIndicators: true
          })
        }
      })
      // 使用vant提供的图片预览
    },
    async onFollow () {
      this.isFollowLoading = true
      // 点击判断是否关注，如果关注，则发送不关注请求接口，反之，发送关注请求接口
      if (this.article.is_followed) {
        // 已关注，请求取消
        await unfollowUser(this.article.aut_id)
        // this.article.is_followed = false
      } else {
        // 未关注，请求关注
        await followUser(this.article.aut_id)
        // this.article.is_followed = true
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.isCollectLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 点击判断是否关注，如果关注，则发送不关注请求接口，反之，发送关注请求接口
      if (this.article.is_collected) {
        // 已收藏，请求取消收藏
        await uncollectArtical(this.articleId)
        // this.article.is_followed = false
      } else {
        // 未收藏，请求收藏
        await collectArtical(this.articleId)
        // this.article.is_followed = true
      }
      this.article.is_collected = !this.article.is_collected
      this.isCollectLoading = false
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onAttitude () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        // 等于1表示已点赞,则请求取消点赞
        await unArticalLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 没有点赞,请求点赞
        await ArticalLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    onpopupShow () {
      this.ispopupShow = true
    },
    onPostSuccess (comment) {
      // 发布评论成功后将评论内容放在评论列表项的第一个，清除弹层框
      this.commentList.unshift(comment)
      this.ispopupShow = false
    },
    replyComment () {
      this.isReplyShow = true
    }
  }
}

</script>

<style  lang="less">
.nav-bar{
  background-color: #3296fa;
  height: 48px;
.van-nav-bar__title{
  color: #fff;
}
 .van-icon-arrow-left::before {
    color: #fff;
    font-size: 20px;
}
}
.user-info{
 background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 50px;
    overflow-y: auto;
  .van-cell{
  margin-bottom: 27px;
  }
  h1{
    font-size: 20px;
    color: #3a3a3a;
    padding: 24px 15px;
  }
  .avatar{
    width: 35px;
    height: 35px;
    margin-right: 7px;
  }
  .title{
    font-size: 12px;
    color: #333333;
  }
  .pudate{
    font-size:12px;
    color: #d6d6d6;
  }
  .attention{
    width: 85px;
    height: 29px;
  }
}
.markdown-body{
  padding: 0 20px;
}
.article-bottom{
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  .comment-button{
    width: 141px;
    height: 23px;
    font-size: 14px;
    color: #a7a7a7;
  }
  .van-icon{
    font-size: 20px;
    margin: 0 15px;
  }
}
</style>
