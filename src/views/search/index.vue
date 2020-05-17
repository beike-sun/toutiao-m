<template>
  <div id="search-container">
      <!-- 搜索栏 -->
      <van-search
       v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow=false"
         />
        <!-- 搜索结果栏 -->
         <search-result
         v-if="isResultShow"
         class="search-result"
         :search-text = "searchText"
         ></search-result>
         <!-- 联想栏 -->
         <search-think
         v-else-if="searchText"
         :search-text="searchText"
         ></search-think>
         <!-- 历史记录栏 -->
         <search-history
         v-else
         ></search-history>
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
      searchText: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    }
  }
}
</script>

<style>
.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow: auto
}
</style>
