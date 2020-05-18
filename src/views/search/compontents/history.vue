<template>
  <div id="history-container">
  <van-cell title="历史记录" value="内容" >
      <div>
          <span>全部删除   </span>
          <span>完成</span>
      </div>
  </van-cell>
    <van-cell
     :title="history"
      value="内容"
      v-for="(history, index) in searchHistories"
      :key="index"
       >
     <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'historyIndex',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
