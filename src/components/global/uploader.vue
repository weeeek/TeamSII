<template>
  <div class="layer" @click="triggerUploader">
    <center>
      <div slot class="uploader">
        <form>
          <p class="name">
            <select name="Type" id="type" class="select-3d" v-model="uploadType" disabled>
              <option value="Emoji">表情包</option>
              <option value="Painting">手绘</option>
            </select>
            <label for="type">类型{{uploadType}}</label>
          </p>
          <p class="email">
            <input type="text" name="Key" id="key" v-model="formData.Key" />
            <label for="key">关键字</label>
          </p>
          <p class="file">
            <input type="file" name="File" id="file" accept="image/*" v-on:change="tirggerFile" />
            <label for="key">文件</label>
          </p>
        </form>
        <div class="flex">
          <button class="btn-3d" @click="onSubmit">提交</button>
          <button class="btn-3d" @click="triggerUploader">取消</button>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import Center from "./center";
import { mapActions, mapGetters } from "vuex";
import { webProxyServer } from "config/common";
export default {
  data() {
    return {
      formData: {
        Type: "",
        Key: "",
        File: null,
      },
    };
  },
  methods: {
    tirggerFile: function (event) {
      var file = event.target.files; // (利用console.log输出看结构就知道如何处理档案资料)
      this.formData.File = event.target.files;
    },
    onSubmit() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formData);

      /* formData格式提交： */
      let formData = new FormData();
      formData.append('Type', this.uploadType)
      for (var key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      
      axios({
        method: "post",
        url: `${webProxyServer}api/UploadFile`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
      }).then((res) => {
        console.log(res);
      });
    },
    ...mapActions(["triggerUploader"]),
  },
  computed:{
    ...mapGetters(['uploadType'])
  },
  components: {
    Center
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/3dButton';

.layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2147483647;

  .uploader {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background: white;
    padding: 10px;

    label {
      margin-left: 10px;
      color: #999999;
    }

    input {
      padding: 9px;
      border: solid 1px #e5e5e5;
      outline: 0;
      font: normal 13px / 100% Verdana, Tahoma, sans-serif;
      width: 200px;
      background: -webkit-gradient(linear, left top, left 25, from(#ffffff), color-stop(4%, #eeeeee), to(#ffffff));
      background: -moz-linear-gradient(top, #ffffff, #eeeeee 1px, #ffffff 25px);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;

      &:hover, &:focus {
        border-color: #c9c9c9;
        -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 8px;
      }
    }
  }
}
</style>
