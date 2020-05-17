<template>
  <div id="think-container">
     <van-cell
      :title="think"
      icon="search"
      v-for="(think, index) in thinkList"
      :key="index"
        />
  </div>
</template>

<script>
import { getThinkList } from '@/api/search'
export default {
  name: 'thinkIndex',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      thinkList: []
    }
  },
  watch: {
    searchText: {
      async handler () {
        const data = await getThinkList(this.searchText)
        // console.log(data)
        this.thinkList = data.data.data.options
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>
