<template>
  <div class="section">
    <div class="section-list-no">
      <div class="lan" @click="play(v)" v-for="v in list" :key="v.catalog_id">
        <div class="left" :class="playId == v.catalog_id? 'active' : '' " ><label v-show="v.catalog_index">{{v.catalog_index}}</label><span v-show="v.catalog_title">{{v.catalog_title}}-录音</span></div>
        <img class="img" src="@/static/img/play-zt.png" alt="" v-show="playId !== v.catalog_id">
        <img class="img" src="@/static/img/play-bf.png" alt="" v-show="playId === v.catalog_id">
      </div> 
      <!-- 播放提示音 -->
      <audio ref="audioPlay" :src="audioSrc" hidden />
    </div>
  </div>
</template>

<script>
import Book from '@/api/books'
export default {
  name: 'record',
  data(){
    return{
      playId: 0,
      detailId: '',
      list: [],
      audioSrc: '',
    }
  },
  created(){
    this.detailId = this.$route.params.detailId;
    this.init();
  },
  methods:{
    init(){
      Book.getRecordList({ member_id: this.$memberId(),book_id: this.detailId }).then( res => {
        this.list =  res.data.catalogs;
      })
    },
    play(v){
      this.playId = v.catalog_id;
      this.audioSrc = v.recording_file;
      setTimeout(() => {
        this.$refs.audioPlay.currentTime = 0; 
        this.$refs.audioPlay.play();
      },800);
    },

  }
}
</script>

<style lang="scss" scoped>
  .section{
    max-height: 330px;
    overflow: auto;
    .section-list-no{
      .lan{
        padding: 15px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          width: 70%;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333;
          label{
            width: 60px;
            margin-right: 5px;
          }
          span{
            width: 150px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &.active{
            color: #699EF6;
          }
        }
        .img{
          width: 22px;
          height: 22px;
        }
      }
    }

  }
</style>