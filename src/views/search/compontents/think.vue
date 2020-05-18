<template>
  <div id="think-container">
     <van-cell
      icon="search"
      v-for="(think, index) in thinkList"
      :key="index"
     @click="$emit('search', think)"
        >
        <div slot="title" v-html="hightlight(think)"></div>
        </van-cell>
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
  },
  methods: {
    hightlight (think) {
      return think.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style>

</style>
