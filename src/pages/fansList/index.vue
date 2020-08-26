<template>
  <div class="content">

    <div class="infor-wrap">
      <div class="infor-wrap">
        <div class="search-warp">
          <div class="search">
            <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.back(-1)" >
          </div>
        </div>

        <div class="product">
          <div class="list" v-for="(v,i) in list" :key="i">
            <div class="name">
              <img class="h animated rotateIn" src="@/static/img/item-1.jpeg" alt="">
              <div class="r">
                <label>作者昵称</label>
                <span>作品 80 &nbsp;&nbsp;&nbsp;&nbsp; 粉丝 100</span>
              </div>
            </div>
            <img class="zan" src="@/static/img/zan-o.png" alt="" v-show="v.isZan" @click="zan(v,false)">
            <img class="zan" src="@/static/img/no-zan.png" alt="" v-show="!v.isZan" @click="zan(v,true)">
          </div>
          
        </div>

      </div>  
    </div> 

  </div>
</template>

<script>
export default {
  name: 'fansList',
  data(){
    return{
      list: [
        { isZan: false },{ isZan: false },{ isZan: false },{ isZan: false },{ isZan: false },
        { isZan: false },{ isZan: false },{ isZan: false },{ isZan: false },{ isZan: false },
      ]
    }
  },
  created(){

  },
  methods:{
    zan(v,flag){
      v.isZan = flag;
    }
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
        .back{
          margin-left: 15px;
        }
      }
    }
    width: 100%;
    height: 100%;
    position: relative;
    .infor-wrap{
      height: 100%;
      background: #3D4249;
      .product{
        background-color: #fff;
        border-radius:20px 20px 0px 0px;
        padding: 30px 15px;
        box-sizing: border-box;
        height: calc(100% - 70px);
        overflow: auto;
        .list{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          .name{
            width: 80%;
            display: flex;
            align-items: center;
            .h{
              width: 48px;
              height: 48px;
              border-radius: 50%;
              margin-right: 15px;
            }
            .r{
              width: 70%;
              label, span{
                display: block;
              }
              label{
                font-size: 16px;
                color: #000;
                margin-bottom: 3px;
              }
              span{
                font-size: 12px;
                color: #708292;
              }
            }
          }
          .zan{
            width: 30px;
            height: 30px;
          }
        }
        
      }
    }  
  }
</style>
