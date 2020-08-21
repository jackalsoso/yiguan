<template>
  <div class="content">
    <div class="success">
      <img src="@/static/img/success-up.png" alt="">
      <label>成功上传</label>
      <span>审核通过后我们会站内信通知您</span>
      <div class="but">确 定</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'publishSuccess',
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
    width: 100%;
    height: 100%;
    background-color: #EFEEEC;
    position: relative;
    .success{
      width: 240px;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        display: block;
        width: 44px;
        height: 44px;
        margin: 0 auto 15px;
      }
      label{
        display: block;
        font-size: 18px;
        color: #000;
        margin-bottom: 15px;
        text-align: center;
      }
      span{
        display: block;
        font-size: 16px;
        color: #3D4249;
        margin-bottom: 60px;
        text-align: center;
      }
      .but{
        width:137px;
        height:41px;
        background:rgba(61,66,73,1);
        border-radius:20px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 41px;
        margin: 0 auto;
      }
    }
  }
</style>
