<template>
  <div class="content" :class="{ 'send-up':is_up_img, 'send-face':is_face }">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/image/back-2.png" alt />
        <p class="title">{{group_name}}</p>
        <img
          class="more"
          @click="$router.push({ path: `/setgroupWhat`,query:{type:1,group_id: group_id} })"
          src="@/static/image/more.png"
          alt
        />
      </div>
    </div>

    <div class="chat" ref="chatCont" @click="$refs.msgInput.blur(),is_up_img = false,is_face = false">
      <!-- loading -->
      <van-loading size="0.75rem" v-if="isLoading" type="spinner" />
      <div class="chat_list" v-for="(val,lIndex) in messageList" :key="lIndex">
        <div class="timer" v-show="val.create_time"><span>{{val.create_time}}</span></div>
        <div class="self" v-if="loginId == val.sent_id">
          <span v-if="val.content_type == 0" >
            <label class="back-text" v-for="(val, i) in face_analysis(val.content)" :key="i">
              <img v-show="val.name === 'img'" :src="val.src" alt="">
              <em v-show="val.name === 'text'">{{ val.text }}</em> 
            </label>
          </span>
          <div class="voice" v-if="val.content_type == 1" @click="playAudio(val)">
            <a class="text">{{val.second}}″</a><i></i>
          </div>
          <div class="video" v-if="val.content_type == 3" @click="playSelfVideo(lIndex)">
            <video :id="`videoSelf-${lIndex}`" :src="val.content"></video>
            <img src="@/static/img/play-video.png" alt="">
          </div>
          <div class="img" v-if="val.content_type == 2">
            <img :src="val.content" alt="" @click="previewImg(val.content)"/>
          </div>
          <div class="img_box">
            <img class="icon" :src="val.headimg? val.headimg : '@/static/img/moren.png'" alt />
          </div>
        </div>
        <div class="other" v-else>
          <div class="img_box">
            <img class="icon" :src="val.headimg? val.headimg : '@/static/img/moren.png'" alt @click="$router.push({ path: '/goodsInfo' ,query:{type:2,member_id: val.sent_id,f_pk_id:$route.query.f_pk_id}})" />
          </div>
          <span v-if="val.content_type == 0" >
            <label class="back-text" v-for="(val, i) in face_analysis(val.content)" :key="i">
              <img v-show="val.name === 'img'" :src="val.src" alt="">
              <em v-show="val.name === 'text'">{{ val.text }}</em> 
            </label>
          </span>
          <div class="voice" v-if="val.content_type == 1" @click="playAudio(val)">
            <i></i><a class="text">{{val.second}}″</a>
          </div>
          <div class="video" v-if="val.content_type == 3" @click="playOtherVideo(lIndex)">
            <video :id="`videoOther-${lIndex}`" :src="val.content" ></video>
            <img src="@/static/img/play-video.png" alt="">
          </div>
          <div class="img" v-if="val.content_type == 2">
            <img :src="val.content" alt="" @click="previewImg(val.content)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="send-msg" :class="{ 'send-up':is_up_img, 'send-face':is_face }">
      <div class="input">
        <img src="@/static/img/voice-2.png" alt="" class="yuyin" v-show="!is_speak"  @click="is_speak = true" >
        <img src="@/static/img/jianpan.png" alt="" class="jianpan" v-show="is_speak" @click="is_speak = false">
        <form action="javascript:return true">
          <input ref="msgInput" class="text" type="text" v-model="message" v-show="!is_speak" @keyup.enter="sendMessage" /> 
        </form>
        <span class="speak" v-show="is_speak" @click="start_speak">{{speakTxt}}</span>
        <img src="@/static/img/face.png" alt="" class="face" @click="is_face = !is_face,is_up_img = false" >
        <img src="@/static/img/jia.png" alt="" class="up" @click="is_up_img = !is_up_img,is_face = false" >
      </div>
      <div class="upload" v-if="is_up_img">
        <div class="media">
          <input class="file" type="file" accept="*" multiple @change="sendFiles" />
          <div><img src="@/static/img/up-img.png" alt=""></div>
          <span>图片</span>
        </div>
        <div class="media">
          <div @click="shootVideo"><img src="@/static/img/paishe.png" alt=""></div>
          <span>拍摄</span>
        </div>
      </div>
      <div class="face-list" v-if="is_face">
        <img :src="faceUrl+v" @click="choose_face(i)" alt="" v-for="(v,i) in face_list" :key="i">
      </div>
    </div>
    <!-- 播放音频 -->
    <audio ref="audioPlay" :src="audioUrl" hidden />
  </div>
</template>

<script>
import Chat from "@/api/chat";
import Connection from "@/api/connection";
import {face_collect} from '@/utils/face'
export default {
  name: "moreChat",
  data() {
    return {
      websocket: null,
      timer: null,
      faceUrl: 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/',
      message: '',
      is_speak: false,
      is_up_img: false,
      is_face: false,
      face_list: {},
      audio: null,
      loop: null,
      content_type: 0,
      messageList: [],
      loginId: 1,
      page: 1,
      isShowMore: false,
      isLoading: false,
      group_id: '',
      grouplist: [],
      group_name: '群聊',
      second: 0,
      speakTxt: '点击说话',
      isStopSpeak: false,
      audioTimer: null,
      audioUrl: '',
    };
  },
  watch:{
    is_speak(n){
      this.is_up_img = n? false : true;
    },
    is_up_img(n){
      if(n){
        this.is_speak = false;
      }
    }
  },
  created() {
    this.loginId = this.$memberId();
    this.face_list = face_collect;
    this.group_id = this.$route.query.group_id;
    // 获取群信息
    this.getGroupInfo();
    //连接socket
    this.initWebSocket();
    this.getgrouplist();
    this.getChatHistory();
  },
  mounted(){
    //聊天页面滚动到顶部
    let _this = this;
    let chat_content = this.$refs.chatCont;
    // 安卓调用h5获取录音url
    window.callJsRadioFunction = this.callJsRadioFunction;
    chat_content.onscroll = () => {
      if(chat_content.scrollTop > 100){
        _this.isShowMore = true;
      }
      if(chat_content.scrollTop <= 0 && _this.isShowMore){
        //下拉更多历史聊天信息
        _this.isLoading = true;
        setTimeout(() => {
          _this.page += 1;
          _this.getChatHistory()
        },800);
      }
    };
  },
  destroyed(){
    clearInterval(this.timer);
    // 取消连接
    this.relation(0);
  },
  methods: {
    //初始化weosocket
    initWebSocket() { 
      let wsUrl = window['wsUrl'];
      this.websocket = new WebSocket(wsUrl);
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketonclose;
    },
    //连接建立之后执行send方法发送数据
    websocketonopen() { 
      console.log('连接成功,发送数据包');
      let data = {
        receive_id: this.$memberId(), //登录人 memberid
        receive_type: 1,
        content_type: 99,
      }
      this.websocket.send(JSON.stringify(data));
      // 建立关系
      this.relation(1);
      this.timer = setInterval(() => {
        this.heartbeat();
      },18000);
    },
    //数据发送
    websocketsend(data) {
      console.log('发送消息',JSON.stringify(data));
      this.websocket.send(JSON.stringify(data));
    },
    //数据接收
    websocketonmessage(e) { 
      const data = JSON.parse(e.data);
      console.log('接收消息',data);
      if(data.content_type < 99){
        this.receiveMessage(data);
      }
    },
    //连接建立失败重连
    websocketonerror() {
      this.initWebSocket();
    },
    //websocket关闭
    websocketonclose(e){
      console.log(`connection closed (${e.code})`);
    },
    // 心跳包
    heartbeat() {
      console.log('心跳包');
      let data = {
        type: -2, 
        data: 'ping',
      }
      this.websocket.send(JSON.stringify(data));
    },
    // 发送消息
    sendMessage() {
      if ( this.message === '' || this.message.trim().length === 0){
        this.message = ''
        this.$toast('不能发送空消息哦!');
        return;
      }
      this.content_type = 0;
      let data = {
        sent_type: 1,
        sent_id: this.$memberId(), //登录人的memberId
        receive_id: this.grouplist.join(','), //对方的memberid
        receive_type: 1,
        group_id: this.group_id,
        content: this.message,
        content_type: this.content_type
      }
      this.websocketsend(data);
    },
    // 接收消息
    receiveMessage(data) {
      console.log('接收消息',data);
      if(data.group_id == this.group_id){
        this.message = '';
        this.messageList.push(data);
        this.scrollToEnd();
      }
    },
    // 建立关系
    relation(status){
      let params = {
        sent_id: this.loginId,
        receive_id: this.group_id,
        receive_type: 1,
        status: status
      }
      Chat.relation(params).then(res => {
        console.log('建立',res);
      });
    },
     // 获取群信息
    getGroupInfo() {
      let params1 = {
        group_id: this.group_id
      };
      Connection.groupinfo(params1).then(res => {
        this.group_name = res.data.name;
      });
    },
    // 获取群成员列表
    getgrouplist() {
      let params2 = {
        member_id: this.$memberId(),
        group_id: this.group_id
      };
      Connection.person(params2).then(res => {
        let data = res.data.map( v => {
          return v.member_id
        });
        // let index = data.findIndex( v => v == this.$memberId());
        // data.splice(index,1);
        this.grouplist = data;
        console.log('成员列表',data)
      });
    },
    //表情包解析
    face_analysis(text) {
      return this.$jxFace(text);
    },
    //滚动到底部
    scrollToEnd() {
      this.$nextTick(() => {
        let chat = this.$refs.chatCont;
        chat.scrollTop = chat.scrollHeight // 滚动高度
      })
    },
    getChatHistory(){
      let params = {
        page: this.page,
        group_id: this.group_id
      }
      Chat.getMoreChatHistory(params).then(res => {
        if(this.page === 1){
          if(res.data.length){
            this.messageList = res.data.reverse();
            this.scrollToEnd();
          }
        }else{
          if(res.data.length){
            let list = res.data.reverse();
            this.messageList = [ ...list,...this.messageList ];
            let chat = this.$refs.chatCont;
            chat.scrollTop = 800 // 滚动高度
          }
          this.isLoading = false;
          this.isShowMore = false;
        }
        console.log('历史聊天记录',res);
      });
    },
    // 发送表情包
    choose_face(key){
      this.message = this.message + ' ' + key;
    },
    // 发送图片、视频
    sendFiles(e){
      let file = e.target.files;
      for(let i=0;i<file.length;i++){
        if(file[i].type.includes('image')){
          this.content_type = 2;
        }else if(file[i].type.includes('video')){
          this.content_type = 3;
        }
        let formData = new FormData();
        formData.append('file', file[i]);
        formData.append('type', 'message');
        Chat.upload(formData).then(res => {
          console.log('上传成功',res);
          if(res.status === 1000){
            let data = {
              sent_type: 1,
              sent_id: this.$memberId(), //登录人的memberId
              receive_id: this.grouplist.join(','), //对方的memberid
              receive_type: 1,
              group_id: this.group_id,
              content: res.data.fileurl,
              content_type: this.content_type
            }
            this.websocketsend(data);
          }
        });
      }
      e.target.value = '';
    },
    // 开始说话
    start_speak() {
      this.speakTxt = '再点结束';
      this.isStopSpeak = !this.isStopSpeak;
      if(this.isStopSpeak){
        let isAudio = window.SDJSBridge.startRadio();
        if(!isAudio){
          this.$toast('没有打开录音权限');
          this.speakTxt = '点击说话';
          this.isStopSpeak = false;
          return;
        }
        this.second = 0;
        this.keep_time();
      }else{
        window.SDJSBridge.stopRadio();
        this.speakTxt = '点击说话';
        clearInterval(this.audioTimer);
        this.audioTimer = null;
      }
    },
    // 获取录音url
    callJsRadioFunction(url){
      this.content_type = 1;
      let data = {
        sent_type: 1,
        sent_id: this.$memberId(), //登录人的memberId
        receive_id: this.grouplist.join(','), //对方的memberid
        receive_type: 1,
        group_id: this.group_id,
        second: this.second,
        content: url,
        content_type: this.content_type
      };
      this.websocketsend(data);
    },
    // 播放录音
    playAudio(val){
      this.audioUrl = val.content;
      setTimeout(() => {
        this.$refs.audioPlay.currentTime = 0;
        this.$refs.audioPlay.play();
      },800);
    },
    keep_time(){
      if(!this.audioTimer){
        this.audioTimer = setInterval(() => {
          if(this.second >= 0 && this.second < 120){
            this.second ++;
          }else{
            window.SDJSBridge.stopRadio();
            this.speakTxt = '点击说话';
            clearInterval(this.audioTimer);
            this.audioTimer = null;
            this.isStopSpeak = false;
          }
        },1000);
      }
    },
    //拍摄
    shootVideo(){
      window.SDJSBridge.showCamera();
    },
    // 播放自己视频
    playSelfVideo(index){
      let video = document.getElementById(`videoSelf-${index}`);
      if(video.requestFullscreen){
        video.requestFullscreen();
      }else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
      }else if(video.mozRequestFullscreen){
        video.mozRequestFullscreen()
      }else if(video.msRequestFullscreen){
        video.msRequestFullscreen()
      }else if(video.webkitSupportsFullscreen){
        video.webkitEnterFullscreen()
      }
      video.play();
    },
    // 播放对方视频
    playOtherVideo(index){
      let video = document.getElementById(`videoOther-${index}`);
      if(video.requestFullscreen){
        video.requestFullscreen();
      }else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
      }else if(video.mozRequestFullscreen){
        video.mozRequestFullscreen()
      }else if(video.msRequestFullscreen){
        video.msRequestFullscreen()
      }else if(video.webkitSupportsFullscreen){
        video.webkitEnterFullscreen()
      }
      video.play();
    },
    // 图片预览
    previewImg(content){
      let arr = [];
      this.messageList.forEach(x => {
        if(x.content_type == 2){
          arr.push(x.content)
        }
      })
      let index = arr.findIndex(x => x == content);
      this.$ImagePreview({
        images: arr,
        startPosition: index
      });
    },

  }
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 46px);
  &.send-up{
    height: calc(100% - 160px);
  }
  &.send-face{
    height: calc(100% - 200px);
  }
  background-color: #f4f4f4;
  .back-fixed{
    margin-bottom: 0;
  }
  .img_box {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .chat {
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
    box-sizing: border-box;
    padding: 10px 15px;
    /deep/ .van-loading{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .chat_list {
      position: relative;
      .other {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        span {
          display: inline-block;
          padding: 12px;
          background-color: #699ef6;
          font-size: 12px;
          color: #fff;
          border-radius: 0px 10px 10px 10px;
          margin-left: 15px;
          line-height: 18px;
          min-width: 80px;
          max-width: 75%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          word-wrap:break-word;
          .back-text{
            img{
              width: 30px;
              height: 30px;
            }
            em{
              display: inline-block;
            }
          }
        }
        .voice{
          width:90px;
          height: 26px;
          margin-top: 5px;
          margin-left: 15px;
          padding: 0 5px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background:linear-gradient(180deg,rgba(167,200,255,1) 0%,rgba(105,158,246,1) 100%);
          border-radius:0px 8px 8px 8px;
          i{
            display: inline-block;
            background:url(../../../static/img/voice.png) 5px 5px no-repeat;
            width: 30px;
            height: 30px;
            text-align: center;
            background-size: 60%;
          }
          // i.play{
          //   animation-name: voicePlay;
          //   animation-duration: 1s;
          //   animation-direction: normal;
          //   animation-iteration-count: infinite;
          //   animation-timing-function: steps(3);
          // }
          .text{
            font-size: 12px;
            color: #fff;
          }
        }
        .video{
          width: 120px;
          height: 160px;
          margin-left: 15px;
          position: relative;
          video{
            width: 120px;
            height: 160px;
            object-fit: fill;
          }
          img{
            width: 32px;
            height: 32px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 10000;
          }
        }
        .img{
          display: block;
          img{
            max-width: 200px;
            max-height: 160px;
            margin-left: 15px;
          }
        }
      }
      .self {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        span {
          display: inline-block;
          padding: 12px;
          margin-right: 15px;
          font-size: 12px;
          border-radius: 10px 0px 10px 10px;
          background-color: #fff;
          color: #333;
          line-height: 18px;
          min-width: 60px;
          max-width: 75%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          word-wrap:break-word;
          .back-text{
            img{
              width: 30px;
              height: 30px;
            }
            em{
              display: inline-block;
            }
          }
        }
        .voice{
          width:90px;
          height: 26px;
          margin-top: 5px;
          margin-right: 15px;
          padding: 0 5px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background:linear-gradient(180deg,rgba(167,200,255,1) 0%,rgba(105,158,246,1) 100%);
          border-radius: 8px 0 8px 8px;
          i{
            display: inline-block;
            background:url(../../../static/img/voice.png) 5px 5px no-repeat;
            transform: rotate(180deg);
            width: 30px;
            height: 30px;
            text-align: center;
            background-size: 60%;
          }
          // i.play{
          //   animation-name: voicePlay;
          //   animation-duration: 1s;
          //   animation-direction: normal;
          //   animation-iteration-count: infinite;
          //   animation-timing-function: steps(3);
          // }
          .text{
            font-size: 12px;
            color: #fff;
          }
        }
        .video{
          width: 120px;
          height: 160px;
          margin-right: 15px;
          position: relative;
          video{
            width: 120px;
            height: 160px;
            object-fit: fill;
          }
          img{
            width: 32px;
            height: 32px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 10000;
          }
        }
        .img{
          display: block;
          img{
            max-width: 200px;
            max-height: 160px;
            margin-right: 15px;
          }
        }
      }
      .timer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        span{
          padding: 2px 12px;
          background: rgba(229, 229, 229, 1);
          opacity: 1;
          border-radius: 9px;
          text-align: center;
        }
      }
    }
  }
  .self,
  .other {
    margin-bottom: 20px;
  }
  .more {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 45px;
  }
  .title {
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 14px;
    margin-top: 3px;
  }
  .send-msg{
    width: 100%;
    height: 46px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100000;
    background-color: #fff;
    box-sizing: border-box;
    .input{
      display: flex;
      align-items: center;
      padding: 6px 8px;
      .yuyin{
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .jianpan{
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .speak{
        width:204px;
        height:34px;
        background:rgba(244,244,244,1);
        border-radius:8px;
        margin-right: 8px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        color: #333;
      }
      .text{
        width:204px;
        height:34px;
        background:rgba(244,244,244,1);
        border-radius:8px;
        margin-right: 8px;
        border: none;
        font-size: 13px;
        color: #333;
      }
      .face{
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .up{
        width: 24px;
        height: 24px;
      }
    }
    &.send-up{
      height: 160px;
    }
    .upload{
      padding: 14px 20px;
      display: flex;
      border-top: 1px solid #E5E5E5; 
      align-items: center;
      .media{
        margin-right: 15px;
        position: relative;
        .file{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
        div{
          width:54px;
          height:54px;
          background:rgba(244,244,244,1);
          border-radius:10px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 29px;
            height: 29px;
          }
        }
        span{
          display: block;
          padding: 5px 0;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      }
    }
    &.send-face{
      height: 200px;
    }
    .face-list{
      height: 154px;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      overflow-y: auto;
      img{
        width: 30px;
        height: 30px;
        margin: 0 5px 5px 0;
        cursor: pointer;
      }
    }
  }
  @keyframes voicePlay {
    0% {
      background-position: 0;
    }
    100% {
      background-position: 100%;
    }
  }
}
</style>