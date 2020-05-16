<template>
  <div class="channel-edit">
    <van-cell-group>
  <van-cell center >
  <div
   slot="title"
   class="channel-title"
   >我的频道</div>
  <div>
    <van-button
      plain
      type="danger"
      round
      size="mini"
 >编辑</van-button>
  </div>
  </van-cell>
</van-cell-group>
<van-grid :gutter="10" >
  <van-grid-item
   class="grid-item"
   v-for="value in 8"
   :key="value"
   text="文字"
       />
</van-grid>
<van-cell-group>
  <van-cell>
    <div
     slot="title"
    class="channel-title"
     >频道推荐</div>
  </van-cell>
</van-cell-group>
<van-grid :gutter="10">
  <van-grid-item
    class="grid-item"
    v-for="value in 8"
    :key="value"
    text="文字" />
</van-grid>
  </div>
</template>

<script>
export default {
  name: 'channelEditIndex'
}
</script>

<style scoped  lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333;
  }
}
.grid-item{
  width: 80px;
  height: 43px;
}
/deep/.van-grid-item__content{
background-color: #f4f5f6;
}
/deep/.van-grid-item__text{
  color: #222;
}
.van-grid{
  margin-top: -24px;
  margin-bottom: 38px;
}
</style>
