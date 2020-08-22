<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.back(-1)" >
        <span class="upload" @click="$router.push('/upload')">上传画作</span>
      </div>
    </div>

    <div class="popup-bottom">
      <div class="pop-type">
        <div class="tit" @click="isShowHk = !isShowHk,isShowBz = false"><span></span><span></span></div>
        <div class="type">画框类别</div>
        <div class="choose" v-if="isShowHk">
          <label>画框类型:</label>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">欧式</van-radio>
            <van-radio name="2">中式</van-radio>
            <van-radio name="3">极简</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="pop-bz">
        <div class="tit" @click="isShowBz = true">壁纸</div>
        <div class="backdrop" v-if="isShowBz">
          <span v-for="(v,i) in 8" :key="v" @click="choose(i)">
            <img src="@/static/img/gouxuan.png" alt="" v-show="checkIndex == i">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'galleryDetail',
  data(){
    return{
      radio: '1',
      checkIndex: -1,
      isShowHk: false,
      isShowBz: false,
      gouH: 0,
    }
  },
  created(){

  },
  methods:{
    choose(i){
      this.checkIndex = i;
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    .search-warp{
      background: none;
      .search{
        background: none;
        padding: 20px 0;
        justify-content: space-between;
        .back{
          margin-left: 15px;
        }
        .upload{
          width:74px;
          height:28px;
          background:rgba(241,99,13,1);
          border-radius:14px 0px 0px 14px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 28px;
        }
      }
    }
    width: 100%;
    height: 100%;
    background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
    position: relative;
    .popup-bottom{
      width: 100%;
      height: auto;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 10000;
      background: #fff;
      .pop-type{
        border-radius:14px 14px 0px 0px;
        .tit{
          padding: 5px 20px;
          border-bottom: 1px dashed #CBD1D9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span{
            width: 45px;
            height: 2px;
            background-color: #CBD1D9;
            margin-bottom: 3px;
          }
        }
        .type{
          padding: 10px 25px;
          font-size: 16px;
          color: #000;
          text-align: center;
        }
        .choose{
          padding: 0 28px 30px;
          display: flex;
          flex-wrap: wrap;
          label{
            width: 65px;
            text-align: center;
            font-size: 14px;
            color: #000;
            margin-right: 10px;
          }
          /deep/ .van-radio-group--horizontal{
            width: 240px;
          }
          /deep/ .van-radio--horizontal{
            margin-right: 30px;
            margin-bottom: 12px;
          }
        }
      }
      .pop-bz{
        width: 100%;
        height: auto;
        background:rgba(61,65,73,1);
        border-radius:14px;
        box-sizing: border-box;
        padding: 6px 0;
        position: relative;
        top: 0;
        left: 0;
        .tit{
          text-align: center;
          font-size: 16px;
          color: #fff;
          margin-bottom: 12px;
        }
        .backdrop{
          display: flex;
          flex-wrap: wrap;
          padding-left: 28px;
          span{
            background: #FFDBE3;
            width:65px;
            height:20px;
            border-radius:10px;
            position: relative;
            margin: 0 15px 12px 0;
            img{
              width: 15px;
              height: 15px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
            }
          }
        }

      }
    }
  }
</style>
