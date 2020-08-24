<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <img src="@/static/img/back-icon.png" alt="" class="back" @click="$router.back(-1)">
        <span>上传作品</span>
        <img src="@/static/img/set.png" alt="" class="set" @click="openSet" >
      </div>
    </div>
    <div class="hint-wrap">
      <div class="hint">
        <span>每次最多上传<i>6</i>/40张，单张文件不超过30MB</span>
        <img src="@/static/img/select-hl.png" alt="" @click="$router.push('/batchDel')" >
      </div>
    </div>
    <div class="list-wrap">
      <div class="list" v-for="v in 12" :key="v">
        <div class="img">
          <img src="@/static/img/item-1.jpeg" alt="">
        </div>
        <div class="cont">
          <div class="o">
            <span class="l"><i>标题：</i><a>红至高</a></span>
            <span class="r">
              <img src="@/static/img/u-edit.png" alt="" @click="$router.push('/productEdit')">
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
    </div>  
    <div class="submit-but">
      <span @click="addImg">
        <img src="@/static/img/add-bt.png" alt="">
        <i>继续添加</i>
      </span>
      <span @click="isShowProgress = true">
        <img src="@/static/img/up-t.png" alt="">
        <i>确认上传</i>
      </span>
    </div>
    <!-- 继续添加 -->
    <div class="addPop" v-if="isShowAdd" :class="{'active': isAddActive}" @click.self="closeAddPop">
      <div class="bottom">
        <div class="options">
          <span>现场拍照</span>
          <span>相册选择</span>
          <span>......</span>
        </div>
        <div class="button" @click.stop="closeAddPop">
          <span class="cancel">取消</span>
        </div>
      </div>
    </div>

    <!-- 设置 -->
    <div class="addPop" v-if="isShowSet" :class="{'active': isSetActive}" @click.self="closeSetPop">
      <div class="bottom">
        <div class="options">
          <span>设置画框尺寸（cm）</span>
          <span v-for="v in sizeList" :key="v.id">
            <i>{{v.size}}</i>
            <img class="icon" src="@/static/img/gouxuan.png" alt="" v-show="tabId == v.id"> 
            <img class="icon" src="@/static/img/no-gouxuan.png" alt="" v-show="tabId !== v.id" @click="tabId = v.id" >
          </span>
        </div>
        <div class="button" @click.stop="closeSetPop">
          <span class="cf">确认</span>
          <span class="cf">取消</span>
        </div>
      </div>
    </div>

    <!-- 确认上传 -->
    <div class="addPop" v-if="isShowProgress">
      <div class="progress" @click="$router.push('/showGallery')">
        <img src="@/static/img/jindu-logo.png" alt="">
        <div class="hint">作品上传中...</div>
        <van-progress
          :percentage="75"
          show-pivot="false"
          color="#F2630D"
        />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'upload',
  data(){
    return{
      isShowProgress: false,
      isShowAdd: false,
      isAddActive: false,
      isShowSet: false,
      isSetActive: false,
      tabId: 0,
      sizeList: [
        { id:1, size: '81×60'},{ id:2, size: '100×81'},{ id:3, size: '146×97'},{ id:4, size: '162×130'},
      ],
    }
  },
  created(){

  },
  methods:{
    // 打开添加弹窗
    addImg(){
      this.isShowAdd = true;
      setTimeout(() => {
        this.isAddActive = true;
      },50);
    },
    // 关闭添加弹窗
    closeAddPop(){
      this.isAddActive = false;
      setTimeout(() => {
        this.isShowAdd = false;
      },500);
    },
    // 打开设置弹窗
    openSet(){
      this.isShowSet = true;
      setTimeout(() => {
        this.isSetActive = true;
      },50);
    },
    // 关闭设置弹窗
    closeSetPop(){
      this.isSetActive = false;
      setTimeout(() => {
        this.isShowSet = false;
      },500);
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
    .addPop{
      .progress{
        width: 275px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img{
          display: block;
          width: 58px;
          height: 46px;
          margin: 0 auto 12px;
        }
        .hint{
          font-size: 16px;
          color: #fff;
          text-align: center;
          margin-bottom: 15px;
        }

      }
    }
  }
</style>
