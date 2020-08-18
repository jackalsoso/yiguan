<template>
  <div class="bookIntro">
    <div class="author">
      <label class="tit">作者介绍</label>
      <p class="word-2">{{detailData.intro}}</p>
    </div>
    <div class="author">
      <label class="tit">课程简介</label>
      <div class="author-name">
        <img :src="detailData.au_face" alt="">
        <div>
          <label>{{detailData.author_chs}}<i>（{{detailData.author_eng}}）</i></label>
          <span>{{detailData.intro_place}}</span>
        </div>
      </div>
      <p class="word-2">{{detailData.intro_work}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookIntro',
  props: {
    detailData: {
      type: Object,
      default(){
        return {}
      }
    }
  },
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
  .bookIntro{
    max-height: 330px;
    overflow: auto;
    padding: 0 12px;
    .author{
      padding: 15px 0;
      .tit{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        color: #333;
        &::before{
          content: '';
          width: 12px;
          height: 12px;
          background: url(../static/img/dot.png) no-repeat;
          margin-right: 3px;
        }
      }
      .author-name{
        display: flex;
        margin-bottom: 12px;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%; 
          margin-right: 6px;
        }
        div{
          width: 200px;
          label, span{
            display: block;
          }
          label{
            font-size: 12px;
            color: #333;
            margin-bottom: 6px;
            i{
              font-size: 10px;
              color: #999;
            }
          }
          span{
            font-size: 10px;
            color: #666;
          }
        }
      }
      .word-2{
        font-size: 12px;
        line-height: 20px;
        color: #666;
        text-indent: 15px;
      }
    }
  }
</style>