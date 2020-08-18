<template>
  <div class="friendList">
      <div class="group_list" v-for="(val,key) in grouplist" :key="key" @click="$router.push({ path: '/moreChat' ,query:{group_id:val.group_id}})">
          <div class="preson_info">
             <div class="img_box">
               <img :src="val.picture" alt="">
             </div>
             <div class="">
                <p class="nickname">{{val.name}}</p>
             </div>
          </div>
      </div>
  </div>
</template>

<script>
import Connection from '@/api/connection'
export default {
  name: 'moreChatList',
  components:{
   
  },
  data(){
    return{
      grouplist:[]
    }
  },
  created(){
    this.init()
  },
  methods:{
      init(){
        let params = {
          member_id: this.$memberId()
        }
        Connection.groupList(params).then( res => {
          this.grouplist=res.data
          console.log(this.grouplist)
        })
    },
  }
}
</script>

<style lang="scss" scoped>
  
.friendList{
  .group_list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    .preson_info{
      // width: 70%;
      display: flex;
      justify-content: flex-start;
      margin-right: 6px;
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
