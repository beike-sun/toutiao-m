<template>
   <div class="comment-item">
       <van-cell center>
       <!-- 用户头像部分 -->
        <van-image
        slot="icon"
        class="avatar"
        round
        :src="comment.aut_photo" />
 <!-- 用户昵称部分 -->
 <div slot="title">
     <div class="commentFirst-row">
         <p>{{comment.aut_name}}</p>
         <div class="like">
        <!-- 点赞及点赞数 -->
        <van-icon name="good-job-o" class="goodJob"></van-icon>
        <span>{{comment.like_count}}</span>
         </div>
     </div>
     <div class="comment-content">{{comment.content}}</div>
 </div>
 <div slot="label" class="comment-bottom">
     <div class="comment-date">{{comment.pubdate | dateFormat('MM-DD HH:mm')}}</div>
     <van-button type="default" size="mini" round>
         <span>{{comment.reply_count}}</span>
         <span>回复</span>
     </van-button>
 </div>
 </van-cell>
   </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: [Object, String, Number],
      required: true
    }
  }
}
</script>

<style>
.commentFirst-row{
    display: flex;
    justify-content:space-between;
    align-items: center
}
.avatar{
width: 40px;
height: 40px;
margin-right: 12px;
background-size: cover;
}
p{
    font-size: 14px;
    color: #406599;
}
.goodJob{
    font-size: 15px;
    margin-right: 8px;
}
.comment-content{
    font-size: 14px;
    font-weight: bold;
}
.comment-bottom{
    display: flex;
}
.comment-date{
    margin-right: 24px;
}
</style>
