<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/img/back-2.png" alt="">
        <span class="tit">{{titleObj[type]}}</span>
      </div>
    </div>
    <div class="reading-tab" v-if="type === 'activity'">
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
				<van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
          <div class="list" v-for="v in alist" :key="v.activity_id" @click="$router.push({ path: `/activity/${v.activity_id}` })">
            <img class="img" :src="v.image" alt="">
            <div class="cont">
              <label>{{v.title}}</label>
              <span>{{type === 'activity'? '活动时间：' : '发布时间：'}}{{v.start_time}}</span>
            </div>
          </div>
        </van-list>
			</van-pull-refresh>
    </div>
    <div class="reading-tab" v-else-if="type === 'teacher'">
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
				<van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
          <div class="list" v-for="v in tlist" :key="v.course_id" @click="$router.push({ path: `/teacher/${v.course_id}` })">
            <img class="img" :src="v.image" alt="">
            <div class="cont">
              <label>{{v.title}}</label>
              <span>{{type === 'activity'? '活动时间：' : '发布时间：'}}{{v.start_time}}</span>
            </div>
          </div>
        </van-list>
			</van-pull-refresh>
    </div>
    <div class="reading-tab" v-else>
      <van-pull-refresh v-model="pull_loading" @refresh="onRefresh" success-text="刷新成功">
				<van-list v-model="list_loading" :finished="finished" loading-text="加载中..." :offset="off_h" :finished-text="finished_text" @load="onLoad">
          <div class="list" v-for="v in list" :key="v.article_id" @click="toDetail(v)">
            <img class="img" :src="v.header_picture" alt="">
            <div class="cont">
              <label>{{v.title}} - {{v.author}}</label>
              <span>{{type === 'activity'? '活动时间：' : '发布时间：'}}{{v.create_time}}</span>
            </div>
          </div>
        </van-list>
			</van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Book from '@/api/books'
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
      alist: [],
      tlist:[],
      titleObj: {
        'activity': '更多活动',
        'article': '更多推荐文章',
        'xuanshang': '更多悬赏比读',
        'teacher': '更多大师课',
        'classify': '分类列表',
        'original': '更多原创文章',
      },
      type: '',
      class_id: '',
      tabIndex: '',
      artInfo: '',
    }
  },
  created(){
    this.type = this.$route.query.type;
    this.tabIndex = this.$route.query.index;
    this.class_id = this.$route.query.class_id;
    this.artInfo = this.$route.query.info;
    this.$set(this.titleObj,'classify',this.$route.query.title);
  },
  methods:{
    toDetail(v){
      if(this.artInfo === 'article'){
        let artId = v.article_id.toString();
        window.SDJSBridge.toArticleDetail(artId);
      }else if(this.artInfo === 'book'){
        this.$router.push({ path: `/books/${v.article_id}` })
      }
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.page = 1;
        this.finished = false;
        if(this.type === 'article'){
          // 获取文章更多列表
          this.get_article_list();
        }else if(this.type === 'xuanshang'){
          // 获取悬赏更多列表
          this.reward_more_art();
        }else if(this.type === 'original'){
          // 获取原创更多列表
          this.origin_more_art();
        }else if(this.type === 'classify'){
          // 获取分类更多列表
          this.classify_more_art();
        }else if(this.type === 'activity'){
          // 获取活动列表
          this.activity_list();
        }else if(this.type === 'teacher'){
          // 获取大师课列表
          this.teacher_list();
        }
      },800);
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.page = this.page + 1;
        if(this.type === 'article'){
          // 获取文章更多列表
          this.get_article_list();
        }else if(this.type === 'xuanshang'){
          // 获取悬赏更多列表
          this.reward_more_art();
        }else if(this.type === 'original'){
          // 获取原创更多列表
          this.origin_more_art();
        }else if(this.type === 'classify'){
          // 获取分类更多列表
          this.classify_more_art();
        }else if(this.type === 'activity'){
          // 获取活动列表
          this.activity_list();
        }else if(this.type === 'teacher'){
          // 获取大师课列表
          this.teacher_list();
        }
      }, 500);
    },
    // 获取文章更多列表
    get_article_list(){
      let params = {
        member_id: this.$memberId(),
        page: this.page
      }
      Book.recom_more_art(params).then( res => {
        let data = res.data;
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
    // 获取悬赏更多列表
    reward_more_art(){
      let params = {
        member_id: this.$memberId(),
        page: this.page
      }
      Book.reward_more_art(params).then( res => {
        let data = res.data;
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
    // 获取原创更多列表
    origin_more_art(){
      let params = {
        member_id: this.$memberId(),
        page: this.page
      }
      Book.origin_more_art(params).then( res => {
        let data = res.data;
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
    // 获取分类更多列表
    classify_more_art(){
      let params = {
        member_id: this.$memberId(),
        class_id: this.class_id,
        page: this.page
      }
      Book.classify_more_art(params).then( res => {
        let data = res.data;
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
    // 获取活动列表
    activity_list(){
      let params = {
        gid: this.tabIndex,
        page: this.page
      }
      Activity.activityList(params).then( res => {
        let data = res.data;
        if (this.page == 1) {
          this.alist = data;
        }else {
          this.alist.push(...data);
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
    // 获取大师课列表
    teacher_list(){
      let params = {
        page: this.page
      }
      Activity.courselist(params).then( res => {
        let data = res.data;
        if (this.page == 1) {
          this.tlist = data;
        }else {
          this.tlist.push(...data);
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
</style>