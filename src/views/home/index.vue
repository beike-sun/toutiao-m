<template>
  <div class="home-container">
    <!-- 导航栏 -->
  <van-nav-bar class="nav-container">
 <van-button
   slot="title"
   round
   type="info"
   icon="search"
   class="search-box"
   >搜索</van-button>
</van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="less">
/* 导航栏样式 */
.nav-container{
  height: 48px;
  background-color: #3296fa;
   .van-nav-bar__title {
    max-width: none;
  }
  .search-box{
    height: 34px;
    width: 227px;
    background-color: #5babfb;
  }
  .van-icon{
    font-size: 16px;
    color: #fff;
  }
  .van-button_text{
    font-size: 14px;
  }
}
</style>
