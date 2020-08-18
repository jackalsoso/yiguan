<template>
  <div class="friendList">
      <div class="group_list" @click="$router.push({ path: '/chat' ,query:{member_id:val.member_id,f_pk_id:val.f_pk_id,title: val.nickname}})" v-for="(val,key) in friendlist" :key="key">
          <div class="preson_info">
             <div class="img_box">
               <img :src="val.face" alt="">
             </div>
            
             <div class="">
                <p class="nickname" v-if="val.remark">{{val.remark}}</p>
                <p class="nickname" v-else>{{val.nickname}}</p>
             </div>
          </div>
      </div>
      <div class="conten_none" v-if="friendlist==''">
          <img src="@/static/image/icon_2.png" alt="">
          <p>你还没有添加好友~</p>
          <div class="loading" @click="addfriend">添加好友</div>
      </div>
  </div>
</template>

<script>
import Connection from '@/api/connection'
export default {
  name: 'friendList',
  components:{
   
  },
  data(){
    return{
      status:0,
      friendlist:[]
    }
  },
  created(){
    this.init()
  },
  methods:{
    // 获取好友列表
    init(){
      let params = {
        member_id: this.$memberId()
      }
      Connection.accountData(params).then( res => {
        this.friendlist=res.data
      })
    },
    // 去添加好友
    addfriend(){
      this.$emit('childFn', this.status);
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading{
  width:130px;
  height:32px;
  background:rgba(105,158,246,1);
  box-shadow:0px 3px 12px rgba(151,190,255,0.8);
  opacity:1;
  border-radius:19px;
  margin: 50px auto 0;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 14px;
}
.conten_none p{
  text-align: center;
  color: #699EF6;
  font-size: 12px;
}
.conten_none img{
    display:block;
    width: 168px;
    height: 111px;
    margin: 95px auto 0;
}
.friendList{
  .group_list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    .preson_info{
      width: 70%;
      display: flex;
      justify-content: flex-start;
      .img_box{
        width: 40px;
        height: 40px;
        margin-right: 8px;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      
    }
  }
  .nickname{
    font-size: 14px;
    color: #333333;
    // margin-bottom: 6px;
    margin-top: 10px;
  }
  .info{
      font-size: 12px;
      color: #999999;
  }
  .timer{
    font-size: 10px;
    color: #999999;
  }
}



</style>
