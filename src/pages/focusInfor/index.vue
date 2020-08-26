<template>
  <div class="content">

    <div class="infor-wrap">
      <div class="search-warp">
        <div class="search">
          <img class="back" src="@/static/img/back-icon2.png" alt="" @click="$router.push('/focusPersonal')" >
        </div>
      </div>

      <div class="author">
        <div class="name">
          <img src="@/static/img/headImg.jpeg" alt="">
          <div class="cont">
            <label>作者昵称</label>
            <span>贫穷的纠缠，坚强的意识...</span>
          </div>
        </div>
        <div class="add">
          <img src="@/static/img/add-bt2.png" alt="">
        </div>
      </div>

      <div class="product animated fadeInUp">
        <div class="number">
          <span class="l">他的作品</span>
          <span class="r">
            <span @click="$router.push('/fansList')">
              <i>135</i>
              <i>粉丝</i>
            </span>
            <span @click="$router.push('/fansList')">
              <i>246</i>
              <i>关注</i>
            </span>
          </span>
        </div>
        <div class="list-content">
          <div class="list-wrap">
            <div class="list" v-for="v in 4" :key="v">
              <div class="img">
                <img src="@/static/img/item-1.jpeg" alt="" v-for="v2 in 4" :key="v2" @click="$router.push('/focusWorks')">
              </div>
              <label class="l">夜景</label>
              <span class="s">Night  View</span>
            </div>
          </div>
        </div>  
      </div>

    </div>  
    
  </div>
</template>

<script>
export default {
  name: 'focusInfor',
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
      .author{
        padding: 0 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name{
          width: 80%;
          display: flex;
          align-items: center;
          img{
            width: 53px;
            height: 53px;
            border-radius: 50%;
            margin-right: 15px;
          }
          .cont{
            width: 60%;
            label, span{
              display: block;
              color: #fff;
            }
            label{
              font-size: 16px;
              margin-bottom: 3px;
            }
            span{
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .add{
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 15px;
            height: 15px;
          }
        }
      }
    }
    .product{
      background-color: #fff;
      border-radius:20px 20px 0px 0px;
      padding: 30px 15px 0;
      height: 17.1rem;
      .number{
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        justify-content: space-between;
        .l{
          width:100px;
          height:36px;
          background:rgba(242,100,14,1);
          border-radius:18px;
          line-height: 36px;
          text-align: center;
          font-size: 16px;
          color: #fff;
        }
        .r{
          display: flex;
          align-items: center;
          span{
            display: flex;
            flex-direction: column;
            margin-left: 15px;
            i{
              &:first-child{
                color: #000;
                font-size: 14px;
              }
              &:last-child{
                color: #708292;
                font-size: 12px;
              }
            }
          }
        }
      }
      .list-content{
        height: 15rem;
        padding-bottom: 40px;
        box-sizing: border-box;
        overflow: auto;
        .list-wrap{
          display: flex;
          flex-wrap: wrap;
          .list{
            width: 160px;
            margin: 0 25px 40px 0;
            &:nth-child(2n){
              margin-right: 0;
            }
            .img{
              border-radius: 10px;
              width: 160px;
              height: 160px;
              overflow: hidden;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              margin-bottom: 12px;
              img{
                width: 77px;
                height: 77px;
              }
            }
            .l{
              display: block;
              font-size: 16px;
              color: #000;
              margin-bottom: 5px;
            }
            .s{
              display: block;
              font-size: 12px;
              color: #708292;
            }
          }
        }
      }
      
    }
  }
</style>
