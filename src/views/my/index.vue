<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
  <van-cell
    center
    class="base-info"
    :border="false"
     >
    <van-image
      slot="icon"
      round
      class="avatar"
      fit="cover"
      :src="userMessage.photo"
/>
   <div slot="title" class="nickname">{{userMessage.name}}</div>
   <van-button
   round
   class="editBtn"
   to="/user/profile"
   >编辑资料</van-button>
 </van-cell>
<van-grid :border="false" class="data-info">
  <van-grid-item  text="文字" >
    <div slot="text" class="number">{{userMessage.art_count}}</div>
    <div slot="text" class="title">头条</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">{{userMessage.follow_count}}</div>
    <div slot="text" class="title">关注</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">{{userMessage.fans_count}}</div>
    <div slot="text" class="title">粉丝</div>
  </van-grid-item>
  <van-grid-item  text="文字" >
     <div slot="text" class="number">{{userMessage.like_count}}</div>
    <div slot="text" class="title">获赞</div>
  </van-grid-item>
</van-grid>
</van-cell-group>
<!-- 未登录状态下的样式 -->
<div v-else class="not-login">
  <div @click="$router.push('./login')">
     <img src="./mobile.png" alt="" class="mobile">
  </div>
  <div class="text">登录 / 注册</div>
</div>
<!-- 收藏历史 -->
<van-cell-group>
  <van-cell  value="内容" class="nav-gird" >
    <van-grid :column-num="2" >
  <van-grid-item icon="star-o" text="文字">
    <div slot="text" class="van-grid-item-text">收藏</div>
  </van-grid-item>
  <van-grid-item icon="browsing-history-o"  text="文字">
        <div slot="text" class="van-grid-item-text">历史</div>
  </van-grid-item>
</van-grid>
  </van-cell>
</van-cell-group>
<van-cell  class="message" title="消息通知" is-link />
<van-cell
   title="小智同学"
   to="/user/chat"
    is-link />
<van-button
  type="default"
  block
  class="login-out"
  v-if="user"
  @click="onLogout"
    >退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getLoginUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userMessage: {}
    }
  },
  computed: {
    // 将容器中的共享数据映射到本地
    ...mapState(['user'])
  },
  created () {
    // 获取登录的用户信息
    this.loadUserM()
  },
  methods: {
    onLogout () {
      // 点击退出弹出提示框
      this.$dialog.confirm({
        title: '用户确认',
        message: '退出当前头条账号,将不能同步收藏'
      })
        .then(() => {
          // 确认退出执行这里清除用户登录状态state.user即修改state,通过提交mutation实现
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserM () {
      const data = await getLoginUser()
      // console.log(data)
      this.userMessage = data.data.data
    }
  }
}
</script>

<style lang="less">
.my-info{
  background: url('banner.png') no-repeat;
  background-size: cover;
}
.base-info{
  background-color: unset;
  box-sizing: border-box;
  height: 115px;
  padding-top: 38px;
  padding-bottom: 11px;
}
.van-grid-item{
  height: 65px;
}
 .avatar{
   box-sizing: border-box;
  margin-right: 11px;
  width: 66px;
  height: 66px;
  border: 1px solid #fff;
 }
.van-grid-item__content {
  background-color: unset;
}
.nickname{
  color: #fff;
  font-size: 15px;
}
.editBtn{
  height: 16px;
  color: #8c8c8c;
  font-size: 10px;
}
.data-info{
  height: 65px;
}
.number{
  font-size: 18px;
    color: #fff;
}
.title{
  font-size: 12px;
    color: #fff;
}
.collect{
  font-size: 14px;
}
.login-bt{
  color: #d86262;
}
/* 收藏历史样式部分 */
.nav-gird{
  height: 70px;
  .van-icon-star-o{
    font-size: 22px;
    color: #ee6a6b;
  }
  .collect{
    font-size: 10px;
  }
  .van-icon-browsing-history-o{
    font-size: 22px;
    color: #ffae44;
  }
  .van-grid-item-text{
    font-size: 10px;
    color: #333333;
  }
}
// 消息通知与小智部分
.message{
  margin-top: 4px;
  padding-left: 16px;
}
.login-out{
  margin-top: 4px;
  color: #d86262;
}
// 未登录状态下的样式
.not-login{
  height:180px;
  background: url('banner.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .mobile{
  width: 66px;
  height: 66px;
  }
  .text{
    color: #fff;
    font-size: 14px;
  }
}
</style>
