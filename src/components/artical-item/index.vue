<template>
  <div class="artical-item">
    <van-cell
    :to="{
      name: 'article',
      params: {
        articleId: artical.art_id
      }
    }"
    >
      <div slot="title" class="title-text van-multi-ellipsis--l3">{{artical.title}}</div>
      <div slot="label">
      <div
       class="cover-wrap"
        v-if="artical.cover.type=== 3"
>
<div
 v-for="(img, index) in artical.cover.images"
  :key="index"
  class="cover-wrap-item"
  >
<van-image
        fit="cover"
        :src="img"
        class="cover-item"
/>
</div>
      </div>
      </div>
      <div slot="label" class="label-wrap">
        <span>{{artical.aut_name}}</span>
        <span>{{artical.comm_count}}评论</span>
        <span>{{artical.pubdate | relativeTime}}</span>
      </div>
      <div slot="default">
        <van-image
        v-if="artical.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="artical.cover.images[0]"
/>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticalItem',
  props: {
    artical: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="less">
.title-text{
  font-size: 16px;
  color: #3a3a3a;
}
.van-cell__title{
  flex: unset;
  height: 73px;
}
.van-cell__value{
  flex: 1;
   width: 116px;
  height: 73px;
  margin-left: 12px;
}
.right-cover{
  width: 116px;
  height: 73px;
}
.cover-wrap{
  display: flex;
  .cover-wrap-item{
    flex: 1;
    height: 73px;
    margin-right: 2px;
  }
  .cover-item{
    width: 100%;
    height: 73px;
    margin-right: 2px;
  }
}
.label-wrap{
  font-size: 12px;
   color: #b4b4b4;
   span{
     margin-right: 12px;
   }
}
.van-tabs__line{
  width: 15px !important;
  height: 3px;
  background: #3296fa;
  margin-bottom: 4px;
}
.van-tab{
  border-right: 1px solid #edeff3;
  border-bottom: 2px solid #edeff3;
}
</style>
