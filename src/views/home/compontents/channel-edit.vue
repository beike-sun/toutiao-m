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
      @click="isEdit=!isEdit"
 >{{isEdit? '完成': '编辑'}}</van-button>
  </div>
  </van-cell>
</van-cell-group>
<van-grid :gutter="10" >
  <van-grid-item
   class="grid-item"
   :class="{ active: index === active }"
   :icon="(isEdit && index !== 0) ? 'clear' : ''"
   v-for="(channel, index) in userChannels"
   :key="index"
   :text="channel.name"
   @click="onUserChannelClick(index,channel)"
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
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utlis/storage'
export default {
  name: 'channelEditIndex',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
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
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 使添加的数据持久化
      if (this.user) {
        // 将添加的数据存储在线上，使之切换设备之后任然获取原来的数据
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 将添加的数据存储在本地
        console.log('本地存储')
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (index, channel) {
      if (this.isEdit && index !== 0) {
        // 点击的时候，如果是编辑状态就删除频道index
        this.deleteChannel(index, channel)
      } else {
        //  如果是非编辑状态就切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (index, channel) {
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 处理频道删除持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      this.$emit('close')
      this.$emit('update-active', index)
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
/deep/.van-grid-item__icon {
    font-size: 20px;
    position: absolute;
    top: -9px;
    right: -7px;
    font-size: 20px;
}
 .van-grid-item__content {
    position: relative;
}
.active{
 /deep/ .van-grid-item__text{
    color: red !important;
  }
}
</style>
