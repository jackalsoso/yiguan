<template>
  <div class="content">
    <div class="search-wrap">
      <div class="search" @click="$router.push({ path: '/search', query:{ type: 'teacher' } })">
        <img src="@/static/img/search.png" alt="">
        <input type="text" v-model="keywords" readonly placeholder="搜索">
      </div>
    </div>
    <div class="menu">
      <div class="tab">
        <span :class="tabIndex === 0? 'active' : '' " @click="chooseTab(0)">本地活动</span>
        <span :class="tabIndex === 1? 'active' : '' " @click="chooseTab(1)">全国活动</span>
      </div>
      <a @click="$router.push({ path: '/moreList', query:{ type: 'activity',index: tabIndex } })">更多></a>
    </div>

    <div class="reading-tab">
      <div class="list" v-for="v in activityList" :key="v.activity_id" @click="$router.push({ path: `/activity/${v.activity_id}` })">
        <img class="img" :src="v.image" alt="">
        <div class="cont">
          <label>{{v.title}}</label>
          <span>活动时间：{{v.start_time}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab">
      <div class="tab">
        <label>优秀学员</label>
        <a @click="$router.push('/studentList')">更多></a>
      </div>
      <div class="list-2">
        <div v-for="v in memberList" :key="v.member_id" @click="$router.push({ path: `/student/${v.member_id}` })">
          <img :src="v.face" alt="">
          <span>{{v.nickname}}</span>
        </div>
      </div>
    </div>

    <div class="student-tab reading-tab great">
      <div class="tab mb12">
        <label>大师课</label>
        <a @click="$router.push({ path: '/moreList', query:{ type: 'teacher' } })">更多></a>
      </div>
      <div class="list" v-for="v in courselist" :key="v.course_id" @click="$router.push({ path: `/teacher/${v.teacher_id}?course_id=${v.course_id}` })">
        <img class="img" :src="v.image" alt="">
        <div class="cont">
          <label>{{v.title}}——{{v.teacher.name}}</label>
          <span>上课时间：{{v.start_time}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Activity from '@/api/activity'
export default {
  name: 'activityHome',
  data(){
    return{
      keywords: '',
      tabIndex: 0,
      activityList: [],
      memberList: [],
      courselist: [],

    }
  },
  created(){
    this.init();
    this.get_activity();
  },
  methods:{
    chooseTab(index){
      this.tabIndex = index;
      this.get_activity();
    },
    init(){
      Activity.memberList().then( res => {
        this.memberList = res.data;
        console.log('222',res)
      })
      Activity.courselist().then( res => {
        this.courselist = res.data;
        console.log('333ttt',res)
      })
    },
    get_activity(){
      Activity.activityList({ gid: this.tabIndex }).then( res => {
        this.activityList = res.data;
        console.log('111',res)
      })
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
      padding: 15px 15px 0;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100000;
      .search{
        width: 267px;
        height: 24px;
        background: rgba(244,244,244,1);
        box-shadow: 0px 2px 6px rgba(229,229,229,1);
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
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
      }
    }
    .menu{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 12px;
      margin-top: 24px;
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
      .list-2{
        display: flex;
        align-items: center;
        div{
          width: 78px;
          height: 97px;
          background: url(../../../static/img/stu-bg.png) center / cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-bottom: 5px;
          }
          span{
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
    .mb12{
      margin-bottom: 12px;
    }
  }
</style>