<template>
  <div class="content">
    <div class="search-wrap">
      <div class="search" @click="$router.push({ path: '/search', query:{ type: 'book' } })">
        <img src="@/static/img/search.png" alt="">
        <input type="text" v-model="keywords" readonly placeholder="搜索" >
      </div>
    </div>
    <div class="menu">
      <div class="tab">
        <span :class="tabIndex === 0? 'active' : '' " @click="chooseTab(0)">文章</span>
        <span :class="tabIndex === 1? 'active' : '' " @click="chooseTab(1)">书籍</span>
      </div>
    </div>
    <div class="cont-scroll">
      <Article v-if="!tabIndex" />
      <Books v-else />
    </div>
  </div>
</template>

<script>
import Article from '@/components/article'
import Books from '@/components/books'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'activityHome',
  components:{
    Article,
    Books,
  },
  data(){
    return{
      isShowIcon: false,
      keywords: '',
      tabIndex: 0,

    }
  },
  computed:{
    ...mapState('books',{
      tab_index: 'tabIndex'
    }),

  },
  created(){
    this.tabIndex = this.tab_index;
  },
  methods:{
    ...mapMutations('books',{
      set_tabIndex: 'set_tabIndex'
    }),
    chooseTab(index){
      this.tabIndex = index;
      this.set_tabIndex(index);
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding: 15px;
    .search-wrap{
      width: 100%;
      height: 40px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100000;
      .search{
        width: 267px;
        height: 24px;
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 10000;
        background: rgba(244,244,244,1);
        box-shadow: 0px 2px 6px rgba(229,229,229,1);
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 14px;
          height: 14px;
          margin-right: 45px;
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
          text-align: center;
        }
        &.focus{
          text-align: left;
          padding-left: 5px;
          img{
            margin-right: 0;
          }
          input{
            text-align: left;
            padding: 0 20px;
          }
        }
      }
    }
    .menu{
      width: 100%;
      height: auto;
      position: fixed;
      top: 40px;
      left: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 16px 15px 12px;
      box-sizing: border-box;
      .tab{
        width: 70%;
        display: flex;
        align-items: center;
        span{
          color: #999;
          font-size: 12px;
          margin-right: 20px;
          position: relative;
        }
        span.active{
          font-size: 16px;
          color: #333;
        }
        span.active::after{
          content: '';
          width:16px;
          height:16px;
          background:rgba(105,158,246,1);
          border-radius:50%;
          position: absolute;
          left: 0;
          top: 8px;
          z-index: -1;
        }
      }
      a{
        font-size: 10px;
        color: #699EF6;
      }
    }
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
          background: url(../../../static/img/book-bg.png) center / cover no-repeat;
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
    .cont-scroll{
      padding-top: 75px;
    }
  }
</style>