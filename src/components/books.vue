<template>
  <div class="books">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(v,i) in banner_info.top_banners" :key="i">
          <img class="banner-img" :src="v" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>推荐书籍</label>
        <a @click="$router.push({ path: '/moreBooks', query:{ type: 'recom' } })">更多></a>
      </div>
      <div class="list" v-for="v in books.tops" :key="v.book_id" @click="$router.push({ path: `/books/${v.book_id}` })">
        <img class="img" :src="v.cover_img" alt="">
        <div class="cont">
          <label>{{v.book_name}}</label>
          <i>{{v.intro}}</i>
          <span>{{v.author}}</span>
        </div>
      </div>
    </div>

    <div class="custom-bg">
      <img :src="banner_info.center_banner" alt="">
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>悬赏比读</label>
        <a @click="$router.push({ path: '/moreBooks', query:{ type: 'xuanshang' } })">更多></a>
      </div>
      <div class="list" v-for="v in books.rewards" :key="v.book_id" @click="$router.push({ path: `/books/${v.book_id}` })">
        <img class="img" :src="v.cover_img" alt="">
        <div class="cont">
          <label>{{v.book_name}}</label>
          <i>{{v.intro}}</i>
          <span>{{v.author}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>畅销书排行榜</label>
        <a @click="$router.push('/moreRank')">更多></a>
      </div>
      <div class="rank">
        <div class="two" @click="$router.push({ path: `/books/${rank_2.book_id}` })">
          <img class="m" src="@/static/img/rank-m2.png" alt="">
          <img class="h" :src="rank_2.cover_img" alt="">
          <span>{{rank_2.book_name}}</span>
        </div>
        <div class="one" @click="$router.push({ path: `/books/${rank_1.book_id}` })">
          <img class="m" src="@/static/img/rank-m1.png" alt="">
          <img class="h" :src="rank_1.cover_img" alt="">
          <span>{{rank_1.book_name}}</span>
        </div>
        <div class="three" @click="$router.push({ path: `/books/${rank_3.book_id}` })">
          <img class="m" src="@/static/img/rank-m3.png" alt="">
          <img class="h" :src="rank_3.cover_img" alt="">
          <span>{{rank_3.book_name}}</span>
        </div>
      </div>
      <div class="list list-3" v-for="(v,i) in books.populars" :key="v.book_id" @click="$router.push({ path: `/books/${v.book_id}` })">
        <span class="num">{{i+4}}</span>
        <img class="img" :src="v.cover_img" alt="">
        <div class="cont">
          <label>{{v.book_name}}</label>
          <i>{{v.intro}}</i>
          <span>{{v.author}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab">
      <div class="tab">
        <label>分类</label>
        <a @click="$router.push({ path: '/moreClassify', query: { info: 'book' } })">更多></a>
      </div>
      <div class="list-3">
        <div class="item" v-for="v in books.book_class_list" :key="v.class_id" @click="$router.push({ path: '/moreList', query:{ type: 'classify',title: v.class_name,class_id: v.class_id,info: 'book' } })">
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
  name: 'books',
  data(){
    return{
      books: {},
      banner_info: {},
      rank_1: {},
      rank_2: {},
      rank_3: {},
      
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      Book.books({ member_id: this.$memberId() }).then( res => {
        this.books = res.data;
        this.rank_1 = this.books.populars[0];
        this.rank_2 = this.books.populars[1];
        this.rank_3 = this.books.populars[2];
        this.banner_info = res.data.banner_info;
        console.log('书籍',res)
      })
    },

  }
}
</script>

<style lang="scss" scoped>
  .books{    
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
      .rank{
        width: 100%;
        height: 188px;
        background: url(../static/img/rank-bg.png) center / cover no-repeat;
        margin: 0 auto 6px;
        display: flex;
        align-items: flex-end;
        .two, .three, .one{
          width: 90px;
          height: 121px;
          background: url(../static/img/rank-t-bg2.png) center / cover no-repeat;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .m{
            width: 40px;
            height: 40px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
          }
          .h{
            width: 48px;
            height: 65px;
            margin-bottom: 6px;
          }
          span{
            width: 70%;
            font-size: 12px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .three{
          background: url(../static/img/rank-t-bg3.png) center / cover no-repeat;
        }
        .one{
          width: 110px;
          height: 157px;
          background: url(../static/img/rank-t-bg1.png) center / cover no-repeat;
          .m{
            width: 46px;
            height: 46px;
          }
          .h{
            width: 64px;
            height: 86px;
            margin-bottom: 6px;
          }
        }
      }
      .list{
        display: flex;
        padding-bottom: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid #E5E5E5;
        &.list-3{
          align-items: center;
          .num{
            font-size: 16px;
            color: #333;
            padding: 0 5px;
          }
          .img{
            width: 56px;
            height: 76px;
          }
          .cont{
            width: 200px;
          }
        }
        .img{
          width: 60px;
          height: 82px;
          border-radius: 5px;
          margin-right: 8px; 
        }
        .cont{
          width: 230px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          label{
            font-size: 16px;
            color: #333;
            margin-bottom: 3px;
          }
          i{
            line-height: 18px;
            margin-bottom: 5px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          i,span{
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