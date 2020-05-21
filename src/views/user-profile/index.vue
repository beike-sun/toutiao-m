<template>
  <div class="user-profile">
    <van-nav-bar
    class="userNewsTitle"
    title="个人信息"
    left-arrow
/>
<van-cell title="头像" is-link center>
  <van-image
  width="30px"
  height="30px"
  round
  fit="cover"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
</van-cell>
<van-cell title="昵称" is-link  value="帅哥一枚"/>
<van-cell title="性别" is-link  value="男"/>
<van-cell title="生日" is-link />
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>

<style>
html{
  background: #f4f5f6;
}
.userNewsTitle{
  background-color: #3296fa;
}
.van-nav-bar__title{
  color: #fff;
}
.van-icon-arrow-left::before{
  color: #fff;
}
</style>
