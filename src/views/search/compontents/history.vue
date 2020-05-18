<template>
  <div id="history-container">
  <van-cell title="历史记录" value="内容" >
      <div  v-if="isDeleteShow">
          <span>全部删除   </span>
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
       >
     <van-icon
      name="close"
      v-show="isDeleteShow"
       />
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
  },
  data () {
    return {
      isDeleteShow: false
    }
  }
}
</script>

<style>

</style>
