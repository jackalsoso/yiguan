<template>
  <div class="content">
    <div class="reading-tab" v-if="type === 'teacher'">
      <div class="list" v-for="v in resultList" :key="v.activity_id">
        <img class="img" :src="v.image" alt="">
        <div class="cont">
          <label>{{v.title}}</label>
          <span>活动时间：{{v.summary}}</span>
        </div>
      </div>
    </div>
    <div class="reading-tab" v-else-if="type === 'book'" >
      <div class="list" v-for="v in resultList" :key="v.book_id">
        <img class="img" :src="v.cover_img" alt="">
        <div class="cont">
          <label>{{v.book_name}}</label>
          <span>发布时间：{{v.create_time}}</span>
        </div>
      </div>
    </div>
    <div class="reading-tab" v-else >
      <div class="list" v-for="v in resultList" :key="v.member_id">
        <img class="img bo" :src="v.face" alt="">
        <div class="cont">
          <label>{{v.nickname}}</label>
          <span>{{v.birth }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  props: {
    resultList: {
      type: Array,
      default(){
        return []
      }
    },
    type: {
      type: String,
      default: 'teacher'
    }
  },
  data(){
    return{
      
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .reading-tab{
      padding: 0 15px;
      .list{
        display: flex;
        padding-bottom: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E5E5E5;
        .img{
          width: 80px;
          height: 48px;
          border-radius: 5px;
          margin-right: 8px; 
        }
        .cont{
          width: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          label{
            font-size: 16px;
            color: #333;
          }
          span{
            font-size: 12px;
            color: #999;
          }
        } 
      }
      .list:last-child{
        margin-bottom: 0;
      }
    }
  }
  .bo{
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important; 
  }
</style>