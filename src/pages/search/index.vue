<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/img/back-2.png" alt="">
        <div class="search-cont">
          <div class="search">
            <img src="@/static/img/search.png" alt="" v-show="!isShowIcon">
            <form action="javascript:return true;">
              <input :class="keywords? 'hi' : '' " type="search" @keyup.enter="confirm" v-model="keywords" placeholder="搜索">
            </form>
          </div>
          <span class="qx" @click="keywords = ''" >取消</span>
        </div>
      </div>
    </div>
    <History v-if="!isResult" :history="history" @removeHis="removeHis" @searchHistory="searchHistory" />
    <SearchResult v-else :resultList="resultList" :type="type" />
  </div>
</template>

<script>
import Search from '@/api/search'
import History from '@/components/history'
import SearchResult from '@/components/searchResult'
export default {
  name: 'moreList',
  components:{
    History,
    SearchResult,
  },
  data(){
    return{
      keywords: '',
      isShowIcon: false,
      isResult: false,
      type: '',
      history: [],
      resultList: [],

    }
  },
  watch:{
    keywords(n){
      this.isShowIcon = n? true : false;
    }
  },
  created(){
    this.type = this.$route.query.type;
    this.get_history();
  },
  methods:{
    searchHistory(key){
      this.keywords = key;
      this.confirm();
    },
    removeHis(){
      let params = {
        member_id: this.$memberId(),
        mod_iden: this.type
      }
      Search.removeHistory(params).then(res => {
        if(res.status === 1000){
          this.$toast.success(res.message);
          this.history = [];
        }
        console.log('删除历史', res)
      });
    },
    get_history(){
      let params = {
        member_id: this.$memberId(),
        mod_iden: this.type
      }
      Search.getHistory(params).then(res => {
        this.history = res.data;
        console.log('搜索历史', res)
      });
    },
    confirm(){
      let params = {
        member_id: this.$memberId(),
        mod_iden: this.type,
        keywords: this.keywords
      }
      Search.search(params).then(res => {
        this.resultList = res.data;
        this.isResult = true;
        console.log('搜索结果',res);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    .search-cont{
      display: flex;
      align-items: center;
      .search{
        width: 195px;
        height: 24px;
        background: rgba(244,244,244,1);
        box-shadow: 0px 2px 6px rgba(229,229,229,1);
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 5px;
        box-sizing: border-box;
        position: relative;
        img{
          width: 14px;
          height: 14px;
        }
        input{
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 12px;
          color: #999;
          padding-left: 22px;
          &.hi{
            padding-left: 15px;
          }
        }
      }
      .qx{
        font-size: 14px;
        color: #666;
        margin-left: 12px;
      }
    }
    
  }
</style>