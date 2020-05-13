<template>
  <div>
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  class="van-list"
>
<van-pull-refresh
 v-model="isRefreshLoading"
 @refresh="onRefresh"
 :success-text="successText"
 success-duration="1500"
   >
   <artical-item
    v-for="(artical, index) in articals"
    :key="index"
    :artical="artical"
   ></artical-item>
  <!-- <van-cell
   v-for="(artical, index) in articals"
   :key="index"
   :title="artical.title" /> -->
</van-pull-refresh>
</van-list>
  </div>
</template>

<script>
import { getChannelsNew } from '@/api/artical.js'
import ArticalItem from '@/components/artical-item'
export default {
  name: 'channelArticalIndex',
  components: {
    ArticalItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articals: [],
      loading: false,
      finished: false,
      // 下一页时间戳
      timestamp: null,
      isRefreshLoading: false,
      successText: ''
    }
  },
  methods: {
    async onLoad () {
    //  1获取接口数据
      const data = await getChannelsNew({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   console.log(data)
      // 2将数据放到文章列表中
      const { results } = data.data.data
      this.articals.push(...results)
      // 3停止加载
      this.loading = false
      if (results.length) {
        //   4如果还有下一页数据，加载下一页时间戳数据
        this.timestamp = data.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const data = await getChannelsNew({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      //   console.log(data)
      // 2将数据放到文章列表中
      const { results } = data.data.data
      this.articals.unshift(...results)
      // 3停止加载
      this.isRefreshLoading = false
      // 4给出更新提示
      this.successText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style>
.van-list{
    position: fixed;
    left: 0;
    right: 0;
    overflow: auto;
    bottom: 50px;
    top: 91px;
}
</style>
