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
<h1>牛逼程序员都用的开源工具，你用了几个?</h1>
<van-cell center >
  <div slot="icon">
    <van-image
    class="avatar"
  fit="cover"
  round
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
  </div>
  <div slot="title" class="title">天涯小型客</div>
  <div slot="label" class="pudate">14小时前</div>
  <van-button
  class="attention"
  round
  icon="plus"
   type="info"
   size="small"
   >关注</van-button>
</van-cell>
<div class="markdown-body">
  <p>hello</p>
  <ul>
    <li>12</li>
    <li>12</li>
    <li>12</li>
    <li>12</li>
    <li>12</li>
  </ul>
</div>
</div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getUserArtical } from '@/api/artical'
export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {
    this.loadUserArtical()
  },
  methods: {
    async loadUserArtical () {
      const data = await getUserArtical(this.articleId)
      console.log(data)
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
</style>
