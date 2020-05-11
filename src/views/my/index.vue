<template>
  <div class="my-container">
    <van-cell-group>
  <van-cell
   title="单元格"
    center
     >
    <van-image
      slot="icon"
      round
      width="50px"
      height="50px"
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
   <div slot="title" class="nickname">用户昵称</div>
   <van-button
   round
   size="mini"
   >编辑资料</van-button>
 </van-cell>
<van-grid>
  <van-grid-item  text="文字" >
    <div slot="text" class="number">167372</div>
    <div slot="text" class="title">头条</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">5</div>
    <div slot="text" class="title">关注</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">278</div>
    <div slot="text" class="title">粉丝</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">1172</div>
    <div slot="text" class="title">获赞</div>
  </van-grid-item>
</van-grid>
</van-cell-group>
<!-- 收藏历史 -->
<van-grid :column-num="2" icon-size="20px">
  <van-grid-item icon="star-o" text="文字">
    <div slot="text" class="collect">收藏</div>
  </van-grid-item>
  <van-grid-item icon="browsing-history-o"  text="文字">
        <div slot="text" class="collect">历史</div>
  </van-grid-item>
</van-grid>
<van-cell  class="user" title="小智同学" is-link />
<van-button type="default" block="">退出登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style>
.number{
  font-size: 18px;
}
.title{
  font-size: 12px;
}
.collect{
  font-size: 14px;
}
.user{
  margin: 4px 0;
}
</style>
