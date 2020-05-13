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
<!-- 文章频道部分 -->
<van-tabs v-model="active">
  <van-tab
   :title="channel.name"
   v-for="channel in channels"
   :key="channel.id"
   >
   <!-- 一个频道对应一个组件，通过其传入对应频道名字获取对应频道数据列表 -->
   <artical-list
   :channel="channel"
   ></artical-list>
   </van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
// 对其子组件加载、注册、再使用
import articalList from './compontents/artical-list'
export default {
  name: 'HomeIndex',
  components: {
    articalList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  }
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
