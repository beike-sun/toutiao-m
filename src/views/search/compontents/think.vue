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
import { debounce } from 'lodash'
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
      handler: debounce(async function () {
        const data = await getThinkList(this.searchText)
        // console.log(data)
        this.thinkList = data.data.data.options
      }, 200),
      // async handler () {
      //   const data = await getThinkList(this.searchText)
      //   // console.log(data)
      //   this.thinkList = data.data.data.options
      // },
      immediate: true
    }
  }
}
</script>

<style>

</style>
