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
</div>
  <van-cell class="article-bottom" center >
     <div slot="title">
       <van-button
       class="comment-button"
        plain
        type="default"
        round
        size="small"
        >写评论</van-button>
        <van-icon name="good-job-o" />
        <van-icon name="comment-o" />
        <van-icon name="star-o" />
        <van-icon name="share"></van-icon>

</div>
  </van-cell>
  </div>
</template>

<script>
import './github-markdown.css'
import { getUserArtical } from '@/api/artical'
import { ImagePreview } from 'vant'
import { followUser, unfollowUser } from '@/api/user'
export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false
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
  margin-top: -14px;
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
  height: 43px;
  line-height: 43px;
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
