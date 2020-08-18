<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/img/back-2.png" alt="">
        <span class="tit">更多分类</span>
      </div>
    </div>
    <div class="student-tab">
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
        <van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
          <div class="list-3">
            <div class="item" v-for="v in list" :key="v.class_id" @click="$router.push({ path: '/moreList', query:{ type: 'classify',title: v.class_name,class_id: v.class_id,info: $route.query.info }})" >
              <img :src="v.cover_img" alt="">
              <div>
                <label>{{v.class_name}}</label>
                <span>{{v.c_count}}篇</span>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>    
    </div>
  </div>
</template>

<script>
import Book from '@/api/books'
export default {
  name: 'moreList',
  data(){
    return{
      list_loading: false,
			finished: false,
			page: 0,
			pull_loading: false,
			off_h: 10,
      finished_text: '没有更多了',
      list: [],

    }
  },
  created(){

  },
  methods:{
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.page = 1;
        this.finished = false;
        //请求接口
        this.get_list();
      },800);
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.page = this.page + 1;
        //请求接口
        this.get_list();
      }, 500);
    },
    get_list(){
      let params = {
        page: this.page
      }
      Book.classify_more_list(params).then( res => {
        let data = res.data;
        console.log('res',res);
        if (this.page == 1) {
          this.list = data;
        }else {
          this.list.push(...data);
        }
        this.list_loading = false;
        this.pull_loading = false;
        if (!data.length) {
          this.finished = true;
        }
      }).catch( () => {
        this.list_loading = false;
				this.pull_loading = false;
				this.finished = true;
				this.finished_text = '加载失败,请重新下拉刷新';
      })
    },


  }
}
</script>

<style lang="scss" scoped>
  .content{
    .student-tab{
      padding: 0 15px;
      .list-3{
        display: flex;
        flex-wrap: wrap;
        .item{
          width: 140px;
          height: 64px;
          background: url(../../static/img/book-bg.png) center / cover no-repeat;
          margin: 0 10px 10px 0;
          display: flex;
          align-items: center;
          padding-left: 5px;
          box-sizing: border-box; 
          &:nth-child(2n){
            margin-right: 0;
          }
          img{
            width: 52px;
            height: 52px;
            margin-right: 10px;
          }
          div{
            width: 70px;
            font-size: 14px;
            label, span{
              display: block;
            }
            label{
              display: block;
              color: #333;
              margin-bottom: 5px;
            }
            span{
              color: #999;
            }
          }
        }
      }
    }
  }
</style>