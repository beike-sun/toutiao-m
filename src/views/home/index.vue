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
   <!-- 一个频道对应一个组件，通过其传入对应频道名字获取对应频道数据列表部分 -->
   <artical-list
   :channel="channel"
   ></artical-list>
   </van-tab>
   <div
    slot="nav-right"
    class="wap-nav-placehodel"
    ></div>
      <div
       slot="nav-right"
       class="wap-nav-icon"
 >
    <van-icon
     name="wap-nav"
     @click="isPopupshow=true"
      />
  </div>
</van-tabs>
<van-popup
  v-model="isPopupshow"
  position="bottom"
  get-container="body"
  closeable
  close-icon-position="top-left"
  :style="{ height: '100%' }"
    >
    <channel-edit
     :user-channels="channels"
     :active="active"
     @close="isPopupshow = false"
     @update-active="onUpdateActive"
     ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
// 对其子组件加载、注册、再使用
import articalList from './compontents/artical-list'
import channelEdit from './compontents/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    articalList,
    channelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isPopupshow: true
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
    },
    onUpdateActive (index) {
      this.active = index
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
// 图标样式
.wap-nav-placehodel{
  width: 33px;
   flex-shrink: 0;
}
.wap-nav-icon{
  position: fixed;
  height: 42px;
  line-height: 42px;
  right: 0;
  background-color: #fff;
  opacity: .9;
    // &:before {
    //   content: ' ';
    //   // width: 3px;
    //   // height: 29px;
    //   background: url('渐变.png') no-repeat;
    //   background-size: cover;
    // }
   .van-icon {
      font-size: 24px;
    }
}
</style>
