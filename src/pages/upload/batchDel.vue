<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <i @click="$router.back(-1)">取消</i>
        <span>已选定0张</span>
        <i @click="selectAll">全选</i>
      </div>
    </div>
    <div class="top-bg"></div>
    <div class="list-wrap">
      <div class="list" v-for="(v,i) in list" :key="i">
        <div class="img">
          <img src="@/static/img/item-1.jpeg" alt="">
        </div>
        <div class="cont">
          <div class="o">
            <span class="l"><i>标题：</i><a>红至高</a></span>
            <span class="r">
              <img src="@/static/img/gouxuan.png" alt="" v-show="v.checked" @click="choose(v,false)">
              <img src="@/static/img/no-gouxuan.png" alt="" v-show="!v.checked" @click="choose(v,true)">
            </span>
          </div>
          <div class="t">
            <i>分类：</i><a>人物</a>
          </div>
          <div class="t">
            <i>详情：</i><a>风格写实，神情生动......</a>
          </div>
          <div class="t">
            <i>价格：</i><a>¥2500</a>
          </div>
        </div>
      </div>
    </div>  
    <div class="submit-but">
      <div class="del">
        <img src="@/static/img/del.png" alt="">
        <i>删除</i>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'batchDel',
  data(){
    return{
      list: [
        { checked: false },{ checked: false },{ checked: false },{ checked: false },
        { checked: false },{ checked: false },{ checked: false },{ checked: false },
      ],
      isAll: false,

    }
  },
  created(){

  },
  methods:{
    choose(v,flag){
      v.checked = flag;
    },
    selectAll(){
      this.isAll = !this.isAll;
      this.list.forEach(v => {
        this.$set(v,'checked',this.isAll);
      });
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .nav-wrap{
      height: 50px;
      .nav{
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding: 0 15px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        i{
          font-size: 16px;
          color: #000101;
        }
        span{
          font-size: 18px;
          color: #000101;
        }
      }
    }
    .top-bg{
      height: 6px;
      background-color: #F5F5F5;
    }
    .list-wrap{
      padding-bottom: 80px;
      .list{
        padding: 15px;
        display: flex;
        border-bottom: 1px solid #DEDEDE;
        .img{
          width:77px;
          height:103px;
          border-radius:3px;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin-right: 15px;
          img{
            width: 100%;
          }
        } 
        .cont{
          width: 252px;
          .t{
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #999;
            i{
              width: 45px;
            }
            a{
              color: #000;
              width: 205px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            } 
          }
          .o{
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l{
              @extend .t;
              margin-bottom: 0;
              a{
                width: 145px;
              }
            }
            .r{
              display: flex;
              align-items: center;
              img{
                width: 19px;
                height: 19px;
              }
            }
          }
        }
      }
    }
    .submit-but{
      width: 100%;
      height: auto;
      padding: 15px 0;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10000;
      .del{
        width: 300px;
        height: 40px;
        background-color: #F2630D;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 15px;
          height: 16px;
          margin-right: 6px;
        } 
        i{
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
</style>
