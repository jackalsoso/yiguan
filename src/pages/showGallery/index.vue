<template>
  <div class="content">
    <div class="search-warp">
      <div class="search">
        <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.back(-1)" >
        <img class="qiu" src="@/static/img/2D.png" alt="" v-show="!isThree" @click="isThree = true" >
        <img class="qiu" src="@/static/img/3D.png" alt="" v-show="isThree" @click="isThree = false">
        <span class="upload" @click="$router.push('/upload')">上传画作</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'showGallery',
  data(){
    return{
      isThree: false,
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
    .search-warp{
      background: none;
      .search{
        background: none;
        padding: 20px 0;
        justify-content: space-between;
        .back{
          margin-left: 15px;
        }
        .qiu{
          width: 37px;
          height: 37px;
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
  }
</style>
