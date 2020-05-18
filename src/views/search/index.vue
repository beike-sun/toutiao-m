<template>
  <div id="search-container">
      <!-- 搜索栏 -->
      <van-search
       v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
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
         @search="onSearch"
         ></search-think>
         <!-- 历史记录栏 -->
         <search-history
         v-else
         :searchHistories="searchHistories"
         @search="onSearch"
         @delete-histories="searchHistories=$event"
         ></search-history>
  </div>
</template>

<script>
import searchThink from './compontents/think'
import searchHistory from './compontents/history'
import searchResult from './compontents/result'
import {
  setItem,
  getItem
} from '@/utlis/storage'
// import { getSearchHistory } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'searchIndex',
  components: {
    searchThink,
    searchHistory,
    searchResult
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: []
    }
  },
  created () {
    this.loadHistoryResult()
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      this.isResultShow = true
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
      // 不等于-1说明有重复文本
        this.searchHistories.splice(index, 1)
      }
      //  把最新历史结果放在顶部
      this.searchHistories.unshift(searchText)
      // 将搜索结果数据持久化
      setItem('searchHistories', this.searchHistories)
    },
    async loadHistoryResult () {
      // 加载搜索历史结果
      // 如果未登录获取本地结果
      const searchHistory = getItem('searchHistories') || []
      // 如果用户已登录
      // if (this.user) {
      // const data = await getSearchHistory()
      // console.log(data.data.data.keywords)
      // searchHistory = [...new Set([...searchHistory, ...data.data.data.keywords])]
      // }
      // console.log(searchHistory)
      this.searchHistories = searchHistory
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
