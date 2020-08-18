<template>
  <div class="content">
    <div class="back-fixed">
      <div class="back-top">
        <img class="back" @click="$router.back(-1)" src="@/static/image/back-2.png" alt />
        <p class="title">发布</p>
      </div>
    </div>
    <div class="publish">
      <textarea name id cols="30" rows="10" v-model="content"></textarea>
      <div class="img_list">
        <van-uploader :after-read="onRead" :accept="'image/*'" :max-count="9" v-model="fileList" :deletable='false'>
          <img src="@/static/image/fbadd.png" alt="等待传图" class="imgPreview" />
        </van-uploader>
      </div>
    </div>
    <div class="btn" @click="fabu">发布</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import Connection from "@/api/connection";
export default {
  name: "publish",
  components: {},
  data() {
    return {
      content: "",
      fileList: [],
      imglist: []
    };
  },
  created() {},
  methods: {
    onRead(file) {
      // 上传图片到图片服务器
      let obj = {
        file: JSON.stringify(file.content),
        type: "trends"
      };
      Connection.upload(obj).then(res => {
        this.fileList.concat(res.data.fileurl);
        this.imglist.push(res.data.fileurl);
        console.log("图片",res.data.fileurl)
      });
    },
    fabu() {
      let params = {
        member_id: this.$memberId(),
        contents: this.content,
        picture: this.imglist
      };
      Connection.publish(params).then(res => {
        if (res.status == 1000) {
          Toast.success("发布成功");
          this.$router.push({ path: `/socialContact` });
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .publish {
    width: 100%;
    padding: 0 0px 0 15px;
    box-sizing: border-box;
    textarea {
      width: 94%;
      height: 150px;
      background: #f4f4f4;
      border-radius: 5px;
      margin-bottom: 15px;
      padding: 10px;
      box-sizing: border-box;
      font-size: 12px;
      color: #999;
      border: none;
    }
    .img_list img {
      width: 2.3rem;
      height: 2.3rem;
      margin-right: 15px;
      margin-bottom: 10px;
    }
  }
}
.title {
  font-size: 16px;
}
.btn {
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  width: 294px;
  height: 32px;
  background: rgba(105, 158, 246, 1);
  opacity: 1;
  border-radius: 20px;
  line-height: 32px;
  margin: 80px auto 0;
}
</style>