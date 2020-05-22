<template>
  <div class="user-chat">
    <van-nav-bar
        title="小智同学"
        left-arrow
        @click-left="$router.back()"
        class="student"
    />
    <!-- 聊天区 -->
    <van-cell-group class="message-list">
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
</van-cell-group>
<!-- 底部发送区 -->
<van-cell-group class="send">
  <van-field
    v-model="message"
    placeholder="请输入发送信息" >
  </van-field>
  <van-icon name="close" size="20"/>
    <van-button
     type="primary"
     size="small"
     >发送</van-button>
</van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  date () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped>
.student{
    background-color:#3296fa;
}
.van-nav-bar__title{
  color: #fff;
}
.van-icon-arrow-left::before{
  color: #fff;
}
.send{
    height: 55px;
    padding: 10px;
    display: flex;
    align-items: center;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
}
.message-list{
    position: fixed;
    right: 0;
    left: 0;
    top: 46px;
    bottom: 55px;
    overflow: auto
}
.van-icon-close::before {
    margin-right: 6px;
}
</style>
