<template>
  <div id="search-container">
      <!-- 搜索栏 -->
      <van-search
       v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
         />
         <!-- 联想栏 -->
         <search-think></search-think>
         <!-- 历史记录栏 -->
         <search-history></search-history>
         <!-- 搜索结果栏 -->
         <search-result></search-result>
  </div>
</template>

<script>
import searchThink from './compontents/think'
import searchHistory from './compontents/history'
import searchResult from './compontents/result'
export default {
  name: 'searchIndex',
  components: {
    searchThink,
    searchHistory,
    searchResult
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      console.log('搜索')
    }
  }
}
</script>

<style>

</style>
