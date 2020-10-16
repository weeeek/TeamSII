<template>
  <div class="layer">
    <center>
      <div
        slot
        class="uploader flex flex-column"
        v-if="!showAlert && !showLoading"
      >
        <div class="flex-grow">
          <label for="key">&#12288;&#12288;类型</label>
          <div class="select" v-if="!Lock">
            <select name="Type" v-model="formData.Type">
              <option value="Emoji">表情包</option>
              <option value="Painting">手绘</option>
              <option value="Photo">精修图</option>
            </select>
          </div>
          <input
            disabled
            type="text"
            name="Type"
            id="Type"
            v-model="formData.Type"
            v-if="Lock"
          />
        </div>
        <div class="flex-grow">
          <label for="key">&#12288;关键字</label>
          <input type="text" name="Key" id="key" v-model="formData.Key" />
        </div>
        <div class="flex-grow">
          <label for="IdolName">&#12288;&#12288;成员</label>
          <input
            type="text"
            name="IdolName"
            id="IdolName"
            v-model="formData.IdolName"
          />
        </div>
        <div class="flex-grow" v-if="formData.Type == 'Painting'">
          <label for="Weibo">作者微博</label>
          <input type="text" name="Weibo" id="Weibo" v-model="formData.Weibo" />
        </div>
        <div class="flex-grow" v-if="formData.Type != 'Emoji'">
          <label for="Online">网络资源</label>
          <input
            type="checkbox"
            name="Online"
            id="Online"
            v-model="formData.Online"
          />
        </div>
        <div
          class="file flex-grow"
          v-if="formData.Type == 'Emoji' || !formData.Online"
        >
          <label for="key">&#12288;&#12288;文件</label>
          <input
            type="file"
            name="File"
            id="file"
            accept="image/*"
            v-on:change="tirggerFile"
          />
        </div>
        <div class="flex-grow" v-else>
          <label for="Url">资源网址</label>
          <input type="text" name="Url" id="Url" v-model="formData.Url" />
        </div>
        <br />
        <div class="flex flex-grow flex-justify-between">
          <button class="btn-3d" @click="onSubmit">提交</button>
          <button class="btn-3d" @click="triggerUploader">取消</button>
        </div>
      </div>
      <div slot v-if="showAlert" style="color: white">
        感谢聚聚对本站的贡献，审核通过后更新数据
      </div>
      <div slot v-if="showLoading">
        <div class="loading"></div>
        <p class="text-center">上传中</p>
      </div>
    </center>
  </div>
</template>

<script>
import Center from "./center";
import { mapActions, mapGetters } from "vuex";
import { webProxyServer } from "config/common";
import axios from "axios";
export default {
  data() {
    return {
      showLoading: false,
      showAlert: false,
      formData: {
        Online: false,
        Weibo: "",
        IdolName: "",
        Type: "",
        Key: "",
        Url: "",
        File: null,
      },
    };
  },
  methods: {
    tirggerFile: function (event) {
      var file = event.target.files[0];
      this.formData.File = event.target.files[0];
    },
    onSubmit() {
      let _vm = this;
      /* formData格式提交： */
      let formData = new FormData();
      for (var key in this.formData) {
        formData.append(key, this.formData[key]);
      }
      _vm.showLoading = true;
      axios({
        method: "post",
        url: `${webProxyServer}api/UploadFile`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
      }).then((res) => {
        _vm.showLoading = false;
        _vm.showAlert = true;
        setTimeout(() => {
          _vm.showAlert = false;
          (_vm.formData.Key = ""), (_vm.formData.File = null);
          _vm.triggerUploader();
        }, 3000);
      }).error(ex => {
        alert("出错啦，联系一下407351071让他多掉几根头发吧")
      });
    },
    ...mapActions(["triggerUploader"]),
  },
  computed: {
    ...mapGetters(["uploadType"]),
  },
  watch: {
    uploadType(v) {
      this.formData.Type = v;
    },
  },
  components: {
    Center,
  },
  props: {
    Lock: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/3dButton';

.layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2147483647;

  .loading {
    background: url('data:image/gif;base64,R0lGODlhJQAlAJECAL3L2AYrTv///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAJQAlAAACi5SPqcvtDyGYIFpF690i8xUw3qJBwUlSadmcLqYmGQu6KDIeM13beGzYWWy3DlB4IYaMk+Dso2RWkFCfLPcRvFbZxFLUDTt21BW56TyjRep1e20+i+eYMR145W2eefj+6VFmgTQi+ECVY8iGxcg35phGo/iDFwlTyXWphwlm1imGRdcnuqhHeop6UAAAIfkEBQoAAgAsEAACAAQACwAAAgWMj6nLXAAh+QQFCgACACwVAAUACgALAAACFZQvgRi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwXABEADAADAAACBYyPqcsFACH5BAUKAAIALBUAFQAKAAsAAAITlGKZwWoMHYxqtmplxlNT7ixGAQAh+QQFCgACACwQABgABAALAAACBYyPqctcACH5BAUKAAIALAUAFQAKAAsAAAIVlC+BGL3Z3IlxUmUuhtR2LzHhsiEFACH5BAUKAAIALAEAEQAMAAMAAAIFjI+pywUAIfkEBQoAAgAsBQAFAAoACwAAAhOUYJnAagwdjGq2amXGU1PuLEYBACH5BAUKAAIALBAAAgAEAAsAAAIFhI+py1wAIfkEBQoAAgAsFQAFAAoACwAAAhWUL4AIvdnciXFSZS6G1HYvMeGyIQUAIfkEBQoAAgAsFwARAAwAAwAAAgWEj6nLBQAh+QQFCgACACwVABUACgALAAACE5RgmcBqDB2MarZqZcZTU+4sRgEAIfkEBQoAAgAsEAAYAAQACwAAAgWEj6nLXAAh+QQFCgACACwFABUACgALAAACFZQvgAi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwBABEADAADAAACBYSPqcsFADs=') no-repeat center center;
    width: 100px;
    height: 100px;

    &+.text-center {
      color: white;
      text-shadow: 0 0 5px #fff, 0 0 10px $color-team-sii, 0 0 15px $color-team-sii, 0 0 20px $color-team-sii, 0 0 35px $color-team-sii, 0 0 40px $color-team-sii, 0 0 50px $color-team-sii, 0 0 75px $color-team-sii;
    }
  }

  .uploader {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 560px;
    min-height: 300px;
    margin: 0 auto;
    background: white;
    padding: 10px;

    label {
      margin-right: 15px;
      color: #999999;
      height: 43px;
      line-height: 43px;
    }

    input {
      margin: 3px 0;
      padding: 9px;
      border: solid 1px #e5e5e5;
      outline: 0;
      font: normal 13px / 100% Verdana, Tahoma, sans-serif;
      width: 380px;
      background: -webkit-gradient(linear, left top, left 25, from(#ffffff), color-stop(4%, #eeeeee), to(#ffffff));
      background: -moz-linear-gradient(top, #ffffff, #eeeeee 1px, #ffffff 25px);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      height: 43px;

      &[type=checkbox] {
        width: auto;
        height: auto;
      }

      &:hover, &:focus {
        border-color: #c9c9c9;
        -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 8px;
      }
    }
  }
}
</style>
