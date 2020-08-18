<template>
  <div class="section">
    <div class="section-list">
      <div class="lan" @click="choose_book(v)" :class="tabIndex === v.catalog_id? 'active' : '' " v-for="v in list" :key="v.catalog_id">
        <div class="left" :class="v.need_pay? 'no' : '' ">
          <label>{{v.catalog_index}}</label><span>{{v.catalog_title}}</span> 
        </div>
        <img class="img" src="@/static/img/money.png" alt="" v-show="v.need_pay">
      </div>
    </div>
  </div>
</template>

<script>
import Book from '@/api/books'
export default {
  name: 'sectionList',
  data(){
    return{
      tabIndex: 0,
      list: [],

    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      Book.section({ member_id: this.$memberId(),book_id:this.$route.params.detailId }).then( res => {
        this.list = res.data.catalogs;
        console.log('章节内容',res)
      })
    },
    choose_book(v){
      this.tabIndex = v.catalog_id;
      window.SDJSBridge.toBookRead(this.$route.params.detailId,v.catalog_id);
    },

  }
}
</script>

<style lang="scss" scoped>
  .section{
    max-height: 330px;
    overflow: auto;
    .section-list{
      .lan{
        padding: 15px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        .left{
          width: 70%;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333;
          label{
            width: 60px;
            margin-right: 5px;
          }
          span{
            width: 150px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &.no{
            color: #999 !important;
          }
        }
        .img{
          width: 14px;
          height: 14px;
        }
        &.active{
          .left{
            color: #699EF6;
          }
        } 
      }

    }

  }
</style>