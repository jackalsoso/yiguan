<template>
  <div class="content">
    <img class="back" @click="$router.back(-1)" src="@/static/img/back.png" alt="">
    <div class="banner">
      <img class="bg" src="@/static/img/books-det-bg.png" alt="">
      <div class="figure">
        <img class="head-img" :src="detailData.cover_img" alt="">
        <div class="name">
          <label>{{detailData.book_name}}</label>
          <i>{{detailData.author_chs}}</i>
          <span>{{detailData.read_count}}人正在阅读</span>
        </div>
        <img v-show="!isCollect" class="collect" @click="collect(true)" src="@/static/img/collect.png" alt="">
        <img v-show="isCollect" class="collect" @click="collect(false)" src="@/static/img/collect-v.png" alt="">
      </div>
    </div>
    <div class="cont">
      <div class="book-tab">
        <div class="tab-index">
          <span :class="tabIndex===0? 'active' : '' " @click="tabIndex = 0">书本简介</span>
          <span :class="tabIndex===1? 'active' : '' " @click="tabIndex = 1">章节目录</span>
          <span :class="tabIndex===2? 'active' : '' " v-if="detailData.can_record" @click="tabIndex = 2">录音列表</span>
        </div>
        <div class="apply-luzhi" v-if="!detailData.can_record" @click="isShowPop = true">申请录制</div>
      </div>
      
      <BookIntro v-if="tabIndex === 0" :detailData="detailData" />
      <Section v-else-if="tabIndex === 1" />
      <Record v-else />

    </div>
    <!-- <div class="apply">开始阅读</div> -->

     <!-- 弹窗 -->
    <div class="pop" v-if="isShowPop" @click.self="isShowPop = false">
      <div class="pop-cont">
        <div class="wirte">
          <div class="money">
            <span>您需要提交申请，管理员通过后，才能进行语音录制噢~</span>
          </div>
          <div class="apply-button" @click="submit_luzhi">立即提交</div>
        </div>
        <img @click.stop="isShowPop = false" class="close" src="@/static/img/close.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
import Book from '@/api/books'
import BookIntro from '@/components/bookIntro'
import Section from '@/components/section'
import Record from '@/components/record'
export default {
  name: 'booksDetails',
  components:{
    BookIntro,
    Section,
    Record
  },
  data(){
    return{
      isShowPop: false,
      is_luzhi: false,
      tabIndex: 0,
      detailData: {},
      isCollect: false,
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      Book.booksDetails({ member_id: this.$memberId(),book_id: this.$route.params.detailId }).then( res => {
        this.detailData = res.data;
        console.log('书籍详情',res)
      })
    },
    submit_luzhi(){ 
      Book.applyLuzhi({ member_id: this.$memberId(),book_id: this.$route.params.detailId }).then( res => {
        this.isShowPop = false;
        this.$toast(res.message)
      })
    },
    // 收藏
    collect(flag){
      this.isCollect = flag;
      let params = {
        book_id: this.$route.params.detailId,
        is_store: flag? 1 : 2
      }
      Book.collect(params).then(res => {
        if(res.status === 1000){
          if(flag){
            this.$toast('收藏成功');
          }else{
            this.$toast('取消收藏成功');
          }
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .banner{
      position: relative;
      padding-top: 50px;
      .bg{
        width: 100%;
        height: 196px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
      .figure{
        padding: 0 12px 30px;
        display: flex;
        position: relative;
        .collect{
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0;
          right: 12px;
        }
        .head-img{
          width: 63px;
          height: 86px;
          border-radius: 5px; 
          margin-right: 10px;
        }
        .name{
          width: 190px;
          label, i, span{
            display: block;
          } 
          label{
            color: #fff;
            font-size: 16px;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          i{
            font-size: 12px;
            color: #fff;
            margin-bottom: 24px;
          }
          span{
            font-size: 10px;
            color: #fff;
          }
        }
      }

    }
    .cont{
      position: relative;
      z-index: 10;
      background: #fff;
      border-radius:20px 20px 10px 10px;
      .book-tab{
        height: 44px;
        padding: 15px 12px 8px;
        border-bottom: 1px solid #E5E5E5;
        box-sizing: border-box;
        position: relative;
        .tab-index{
          display: flex;
          align-items: flex-end;
          span{
            font-size: 12px;
            color: #999;
            margin-right: 20px;
            &.active{
              font-size: 16px;
              color: #699EF6;
              position: relative;
            }
            &.active::after{
              content: '';
              width: 20px;
              height: 2px;
              background-color: #699EF6;
              position: absolute;
              left: 50%;
              bottom: -6px;
              transform: translate(-50%,0);
            }
          }
        }
        .apply-luzhi{
          width: 90px;
          height: 24px;
          background-color: #699EF6;
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
          position: absolute;
          bottom: 8px;
          right: 12px;
          border-radius: 20px; 
        }
      }
      .author{
        padding: 15px 0;
        .tit{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 12px;
          color: #333;
          &::before{
            content: '';
            width: 12px;
            height: 12px;
            background: url(../../../static/img/dot.png) no-repeat;
            margin-right: 3px;
          }
        }
        .author-name{
          display: flex;
          margin-bottom: 12px;
          img{
            width: 40px;
            height: 40px;
            margin-right: 6px;
          }
          div{
            width: 200px;
            label, span{
              display: block;
            }
            label{
              font-size: 12px;
              color: #333;
              margin-bottom: 6px;
              i{
                font-size: 10px;
                color: #999;
              }
            }
            span{
              font-size: 10px;
              color: #666;
            }
          }
        }
        .word-2{
          font-size: 12px;
          line-height: 20px;
          color: #666;
          text-indent: 15px;
        }
      }
      
    }
    .apply{
      width: 100%;
      height: 40px;
      background-color: #699EF6;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }

    
    .pop{
      .pop-cont{
        top: 55%;
        .wirte{
          height: 140px;
          padding-top: 30px;
          background: #fff;
          .money{
            text-align: center;
            margin-bottom: 24px;
            span{
              display: block;
              margin: 0 auto;
              width: 180px;
              font-size: 12px;
              color: #999;
              line-height: 20px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>