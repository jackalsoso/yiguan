<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/img/back-2.png" alt="">
        <span class="tit">更多学员列表</span>
      </div>
    </div>
    <div class="reading-tab">
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
				<van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
          <div class="list" v-for="v in list" :key="v.member_id" @click="$router.push({ path: `/student/${v.member_id}` })">
            <img class="img" :src="v.face" alt="">
            <div class="cont">
              <label>{{v.nickname}}</label>
              <!-- <span>女， 98年</span> -->
            </div>
          </div>
        </van-list>
			</van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Activity from '@/api/activity'
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
      Activity.memberList().then( res => {
        if (this.page == 1) {
          this.list = res.data;
        }else {
          this.list.push(...res.data);
        }
        this.list_loading = false;
        this.pull_loading = false;
        if (!res.data.length) {
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
    .reading-tab{
      padding: 0 15px;
      .list{
        display: flex;
        padding-bottom: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E5E5E5;
        .img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
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
</style>