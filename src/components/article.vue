<template>
  <div class="article">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(v,i) in banner_info.top_banners" :key="i">
          <img class="banner-img" :src="v" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>推荐文章</label>
        <a @click="$router.push({ path: '/moreList', query:{ type: 'article' } })">更多></a>
      </div>
      <div class="list" v-for="v in article.top_articles" :key="v.article_id" @click="toAndroid(v)">
        <img class="img" :src="v.header_picture" alt="">
        <div class="cont">
          <label>{{v.title}} - {{v.author}}</label>
          <span>发布时间：{{v.create_time}}</span>
        </div>
      </div>
    </div>

    <div class="custom-bg">
      <img :src="banner_info.center_banner" alt="">
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>悬赏比读</label>
        <a @click="$router.push({ path: '/moreList', query:{ type: 'xuanshang' } })">更多></a>
      </div>
      <div class="list" v-for="v in article.reward_articles" :key="v.article_id" @click="toAndroid(v)">
        <img class="img" :src="v.header_picture" alt="">
        <div class="cont">
          <label>{{v.title}} - {{v.author}}</label>
          <span>发布时间：{{v.create_time}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>原创文章</label>
        <a @click="$router.push({ path: '/moreList', query:{ type: 'original' } })">更多></a>
      </div>
      <div class="list" v-for="v in article.origin_articles" :key="v.article_id" @click="toAndroid(v)">
        <img class="img" :src="v.header_picture" alt="">
        <div class="cont">
          <label>{{v.title}} - {{v.author}}</label>
          <span>发布时间：{{v.create_time}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab">
      <div class="tab">
        <label>分类</label>
        <a @click="$router.push({ path: '/moreClassify', query: { info: 'article' } })">更多></a>
      </div>
      <div class="list-3">
        <div class="item" @click="$router.push({ path: '/moreList', query:{ type: 'classify',title: v.class_name,class_id: v.class_id,info: 'article' }})" v-for="v in article.article_class_list" :key="v.class_id" >
          <img :src="v.cover_img" alt="">
          <div>
            <label>{{v.class_name}}</label>
            <span>{{v.c_count}}篇</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Book from '@/api/books'
export default {
  name: 'articles',
  data(){
    return{
      article: {},
      banner_info: {},
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      Book.article({ member_id: this.$memberId() }).then( res => {
        this.article = res.data;
        this.banner_info = res.data.banner_info;
        console.log(res)
      })
    },
    toAndroid(v){
      let artId = v.article_id.toString();
      window.SDJSBridge.toArticleDetail(artId);
    },
  }
}
</script>

<style lang="scss" scoped>
  .article{    
    .banner{
      height: 100px;
      /deep/ .van-swipe{
        height: 88px;
        transform: translateZ(0)
      }
      .banner-img{
        width: 100%;
        height: 88px;
      }
    }
    .custom-bg{
      height: 40px;
      margin-bottom: 15px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .reading-tab{
      margin-bottom: 15px;
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
    .reading-tab.great{
      .list:last-child{
        border-bottom: none; 
      }
    }
    .student-tab{
      .tab{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        label{
          font-size: 16px;
          color: #333;
          position: relative;
        }
        label::before{
          display: inline-block;
          content: '';
          width:2px;
          height:12px;
          background:linear-gradient(180deg,rgba(151,190,255,1) 0%,rgba(105,158,246,1) 100%);
          border-radius:1px;
          margin-right: 3px;
        }
        a{
          font-size: 10px;
          color: #699EF6;
        }
      }
      .list-3{
        display: flex;
        flex-wrap: wrap;
        .item{
          width: 140px;
          height: 64px;
          background: url(../static/img/book-bg.png) center / cover no-repeat;
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
    .mb12{
      margin-bottom: 12px;
    }
  }
</style>