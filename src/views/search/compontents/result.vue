<template>
  <div id="result-container">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
   v-for="(result, index) in resultList"
    :key="index"
     :title="result.title" />
</van-list>
  </div>
</template>

<script>
import { getResultList } from '@/api/search'
export default {
  name: 'resultIndex',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
    //  请求数据接口，
      const data = await getResultList({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      // console.log(data)
      //  将数据结果push到list中,
      const results = data.data.data.results
      this.resultList.push(...results)
      //  关闭加载
      this.loading = false
      //  判断是否还有数据，如果有则加载下一页，如果没有则停止加载更多
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
