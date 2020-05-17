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
   v-for="(channel, index) in userChannels"
   :key="index"
   :text="channel.name"
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
   v-for="(channel,index ) in recommendChannels"
   :key="index"
   :text="channel.name"
   @click="onAdd(channel)"
    />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels.js'
export default {
  name: 'channelEditIndex',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
    recommendChannels () {
      // 使用filter过滤满足条件的所有元素，根据方法返回的布尔值true来收集数据
      return this.allChannels.filter(channel => {
      //  find方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.onLoadAllChannel()
  },
  methods: {
    async onLoadAllChannel () {
      const data = await getAllChannels()
      this.allChannels = data.data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    }
  }
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
