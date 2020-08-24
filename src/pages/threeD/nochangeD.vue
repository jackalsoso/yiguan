<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img
          class="back"
          src="@/static/img/back-icon2.png"
          alt=""
          @click="$router.push('/focusPersonal')"
        />
        <i></i>
      </div>
    </div>
    <div  @click="$router.push('/browse')" style="position:absolute;top:50%;z-index:3000;">3d</div>
    
  </div>
</template>

<script>
export default {
  name: "nochangeD",
  data() {
    return {
      showPicker: true,
      isPlay: false,
    };
  },
  created() {},
  methods: {
    play(flag) {
      this.isPlay = flag;
      if (this.isPlay) {
        this.$refs.videoPlay.play();
      } else {
        this.$refs.videoPlay.pause();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.anniu {
  width: 100%;
  height: 0.7rem;
  position: fixed;
  bottom: 0;
  z-index: 2003;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  background: white;
  // padding: 8px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.anniu  span {
  width: 45px;
  height: 2px;
  background-color: #cbd1d9;
  margin-bottom: 3px;
}
.content {
  /deep/ .van-overlay {
    background: rgba(0, 0, 0, 0);
  }
  .search-warp {
    background: none;
    .search {
      background: none;
      padding: 20px 0;
      justify-content: space-between;
      .back {
        margin-left: 15px;
      }
      .upload {
        width: 74px;
        height: 28px;
        background: rgba(241, 99, 13, 1);
        border-radius: 14px 0px 0px 14px;
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
  .edit {
    padding-bottom: 15px;
    .tit-1 {
      padding: 8px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        width: 45px;
        height: 2px;
        background-color: #cbd1d9;
        margin-bottom: 3px;
      }
    }
    .browse {
      padding: 15px;
      .voice-wrap {
        padding-bottom: 15px;
        border-bottom: 1px solid #dedede;
        margin-bottom: 15px;
        .voice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          span {
            width: 50%;
            display: flex;
            align-items: center;
            font-size: 20px;
            color: #010000;
            img {
              width: 17px;
              height: 15px;
              margin-left: 8px;
            }
            i {
              font-size: 16px;
              color: #3d4249;
              margin-left: 3px;
            }
            &:last-child {
              justify-content: flex-end;
              font-size: 16px;
              color: #f2630d;
              img {
                width: 20px;
                height: 15px;
                margin-left: 8px;
              }
            }
          }
        }
        .yh {
          display: inline-block;
          padding: 3px 10px;
          background-color: #efeeec;
          font-size: 10px;
          color: #6f8191;
        }
      }
      .cont {
        font-size: 12px;
        line-height: 25px;
        color: #3d4249;
        text-indent: 15px;
      }
      .video {
        width: 305px;
        height: 140px;
        margin: 15px auto 0;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
        video {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
        img {
          width: 31px;
          height: 31px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
