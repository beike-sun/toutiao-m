<template>
  <div class="artical-item">
    <van-cell>
      <div slot="title" class="title-text van-multi-ellipsis--l3">{{artical.title}}</div>
      <div slot="label">
      <div
       class="cover-item"
        v-if="artical.cover.type=== 3"
>
<div
 v-for="(img, index) in artical.cover.images"
  :key="index"
  class="cover-wrap"
  >
<van-image
        fit="cover"
        :src="img"
/>
</div>
      </div>
      </div>
      <div slot="label">
        <span>{{artical.aut_name}}</span>
        <span>{{artical.comm_count}}</span>
        <bdspan>{{artical.pubdate}}</bdspan>
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
.van-cell__value{
  flex: unset;
   width: 116px;
  height: 73px;
  margin-left: 12px;
}
.right-cover{
  width: 116px;
  height: 73px;
}
.cover-item{
  display: flex;
  .cover-wrap{
    flex: 1;
    width: 100%;
    height: 73px;
  }
}
</style>
