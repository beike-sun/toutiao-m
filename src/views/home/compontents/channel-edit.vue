<template>
  <div class="channel-edit">
    <van-cell-group>
  <van-cell title="单元格" value="内容" center  >
  <div slot="title">我的频道</div>
  <div>
    <van-button
      plain
      type="danger"
      round
      size="small"
 >编辑</van-button>
  </div>
  </van-cell>
</van-cell-group>
<van-grid :gutter="10">
  <van-grid-item v-for="value in 8" :key="value"  text="文字" />
</van-grid>
<van-cell-group>
  <van-cell>
    <div slot="title">频道推荐</div>
  </van-cell>
</van-cell-group>
<van-grid :gutter="10">
  <van-grid-item v-for="value in 8" :key="value"  text="文字" />
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
}
</style>
