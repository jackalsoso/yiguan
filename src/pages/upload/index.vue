<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <img src="@/static/img/back-icon.png" alt="" class="back">
        <span>上传作品</span>
        <img src="@/static/img/set.png" alt="" class="set" >
      </div>
    </div>
    <div class="hint-wrap">
      <div class="hint">
        <span>每次最多上传<i>6</i>/40张，单张文件不超过30MB</span>
        <img src="@/static/img/select-hl.png" alt="">
      </div>
    </div>
    <div class="list" v-for="v in 12" :key="v">
      <div class="img">
        <img src="@/static/img/item-1.jpeg" alt="">
      </div>
      <div class="cont">
        <div class="o">
          <span class="l"><i>标题：</i><a>红至高</a></span>
          <span class="r">
            <img src="@/static/img/u-edit.png" alt="">
            <img src="@/static/img/u-del.png" alt="">
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
    <div class="submit-but">
      <span>
        <img src="@/static/img/add-bt.png" alt="">
        <i>继续添加</i>
      </span>
      <span>
        <img src="@/static/img/up-t.png" alt="">
        <i>确认上传</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data(){
    return{

    }
  },
  created(){

  },
  methods:{

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
        .back{
          width: 10px;
          height: 17px;
        }
        span{
          font-size: 18px;
          color: #000101;
        }
        .set{
          width: 18px;
          height: 17px;
        }
      }
    }
    .hint-wrap{
      height: 48px;
      .hint{
        border-top: 6px solid #F5F5F5;
        width: 100%;
        height: 42px;
        background-color: #6F8191;
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        left: 0;
        top: 50px;
        z-index: 10000;
        span{
          width: 90%;
          font-size: 14px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          i{
            color: #F2630D;
            display: inline;
          }
        }
        img{
          width: 26px;
          height: 26px;
        }
      }
    }
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
              &:first-child{
                width: 15px;
                height: 16px;
              }
              &:last-child{
                width: 15px;
                height: 15px;
                margin-left: 12px;
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
      span{
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          font-size: 16px;
          margin-left: 5px;
        }
        &:first-child{
          background-color: #EFEEEC;
          border-radius: 14px 0 0 14px;
          img{
            width: 16px;
            height: 16px;
          }
          i{
            color: #000;
          } 
        }
        &:last-child{
          border-radius:0px 14px 14px 0px;
          background-color: #F2630D;
          img{
            width: 17px;
            height: 17px;
          }
          i{
            color: #fff;
          }
        }
      }
    }
  }
</style>
