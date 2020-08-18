<template>
  <div class="history">
    <div class="delete" v-if="history.length">
      <span class="time">
        <img src="@/static/img/time-2.png" alt="">
        历史记录
      </span>
      <img class="del" src="@/static/img/del.png" alt="" @click="removeHistory">
    </div>
    <ul class="chunk">
      <li v-for="v in hisList" :key="v.history_id" @click="searchHis(v)">{{v.keywords}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'history',
  props:{
    history: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      hisList: [],
    }
  },
  watch:{
    history: {
      handler(n,o){
        console.log(o)
        this.hisList = n;
      },
      deep: true
    }
  },
  methods:{
    clear(){
      this.history = []
      console.log('清空')
    },
    removeHistory(){
      this.$emit('removeHis');
    },
    searchHis(v){
      this.$emit('searchHistory',v.keywords);
    }
  }
}
</script>

<style lang="scss" scoped>
  .history{
    .delete{
      display: flex;
      padding: 0 12px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .time{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
        img{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
      .del{
        width: 14px;
        height: 14px;
      }
    }
    .chunk{
      display: flex;
      flex-wrap: wrap;
      padding-left: 12px;
      li{
        background-color: #F4F4F4;
        font-size: 11px;
        color: #696969;
        padding: 8px 14px;
        border-radius: 5px;
        min-width: 50px;
        box-sizing: border-box;
        text-align: center;
        margin-right: 8px;
        margin-bottom: 8px; 
      }
    }
  }
</style>