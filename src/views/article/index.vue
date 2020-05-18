<template>
  <div class="article-container">文章详情组件</div>
</template>

<script>
export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
