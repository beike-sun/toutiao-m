<template>
  <div id="history-container">
  <van-cell title="历史记录" value="内容" >
      <div  v-if="isDeleteShow">
          <span @click="$emit('delete-histories', [])">全部删除   </span>
          <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon
       name="delete"
        v-else
        @click="isDeleteShow=true"
         />
  </van-cell>
    <van-cell
     :title="history"
      value="内容"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDeleteHistory(history, index)"
       >
     <van-icon
      name="close"
      v-show="isDeleteShow"
       />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utlis/storage.js'
export default {
  name: 'historyIndex',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDeleteHistory (history, index) {
      // 先判断是删除状态还是不删除状态
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 删除后处理数据持久化
        setItem('search-histories', this.searchHistories)
        return
      }
      // 如果不是删除状态，点击单元格获取搜索结果
      this.$emit('search', history)
    }
  }
}
</script>

<style>

</style>
