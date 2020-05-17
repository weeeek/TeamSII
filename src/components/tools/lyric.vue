<template>
  <div class="block">
    <div class="search">
      <div class="search-box">
        <jam-search @click="urlChange" />
        <input v-model="query" class="box" placeholder="歌曲文件url"/>
      </div>
    </div>
    <div class="flex">
      <audio class="flex-grow" id="tempAudio" ref="tempAudio" controls volume="0.2"></audio>
      <div class="flex-grow vertical-center flex flex-column flex-justify-center">
        <button style="width: 9em; margin-left: 1em; height: 2em; line-height: 2em;" @click="insertTime">插入时间戳</button>
      </div>
    </div>
    <div class="flex flex-operation">
      <div class="flex-grow">
        <div class="search">
          <div class="search-box">
            <input type="number" min="0" v-model="lineIndex" class="box" placeholder="歌词时间码插入目标位置"/>
          </div>
        </div>
        <quill-editor
          ref="lyricQuill"
          class="editor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </div>
      <div class="operation flex flex-column flex-justify-center">
        <div class="text-center">
          <button @click="decode">&lt;=</button>
          <br />
          <br />
          <button @click="encode">=&gt;</button>
        </div>
      </div>
      <div class="flex-grow">
        <div class="search">
          <div class="search-box">
            <jam-search @click="initQQLyric" />
            <input v-model="mid" class="box" placeholder="mid"/>
          </div>
        </div>
        <textarea id="codeArea" v-model="code"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import { Base64 } from 'js-base64'
import { getLyric } from 'api/song'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

// 工具栏配置
// const toolbarOptions = []

export default {
  data () {
    return {
      query: 'http://47.97.248.244/static/music/%E7%BA%A2%E7%8E%AB%E7%91%B0-%E8%92%8B%E8%8A%B8.mp3',
      lyric: null,
      code: '',
      id: '',
      mid: '101829430',
      lineIndex: 5,
      content: null,
      editorOption: {
        placeholder: '请输入歌词文本...',
        theme: 'snow',
        modules: {
          toolbar: null
        }
      },
      quill: {}
    }
  },
  methods: {
    initQQLyric () {
      getLyric(this.id, this.mid).then((res) => {
        if (res.retcode === 0) {
          this.code = res.lyric
          this.decode()
        } else {
          this.code = 'error'
        }
      })
    },
    urlChange () {
      this.$refs.tempAudio.src = this.query
    },
    insertTime () {
      let time = this.$refs.tempAudio.currentTime
      let timestamp = time * 1000
      let str = `${time}`
      let d = new Date(timestamp).toTimeString()    // 根据时间戳生成的时间对象字符串 "08:03:02 GMT+0800 (中国标准时间)"

      // this.quill.insertText(this.lineIndex, `[${d.substring(3,8)}${str.substr(str.indexOf('.'), 3)}]`, 'bold', true);

      let [Block] = this.quill.getLine(0)
      let line = Object.assign({}, Block)
      for (var i = 0; i < this.lineIndex; i++) {
        line = line.next
      }
      if (line.domNode.innerText[0] === '[') {
        line.domNode.innerText = `[${d.substring(3, 8)}${str.substr(str.indexOf('.'), 3)}]` + line.domNode.innerText.substr(10)
      } else {
        line.domNode.innerText = `[${d.substring(3, 8)}${str.substr(str.indexOf('.'), 3)}]` + line.domNode.innerText
      }
      this.lineIndex = Number(this.lineIndex) + 1
    },
    encode () {
      this.code = Base64.encode(this.quill.getText())
    },
    decode () {
      // this.quill.setText(Base64.decode(this.code))
      this.quill.setText(this.code)
    },
    onEditorBlur () {
      // 失去焦点事件
    },
    onEditorFocus () {
      // 获得焦点事件
    },
    onEditorChange () {
      // 内容改变事件
    }
  },
  mounted () {
    this.quill = this.$refs.lyricQuill.quill
  },
  components: { quillEditor }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/quill"
@import "~common/stylus/variable"

#tempAudio
  margin 0 0 1em 0

.flex-operation
  height 400px
  .flex-grow
    flex-shrink 0
  .quill-editor
    width 100%
    height calc(100% - 54px)
  #codeArea
    width 100%
    height calc(100% - 60px)

  .operation
    flex-basis 100px
    flex-grow 0
    flex-shrink 0
    button
      margin 0

.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  margin-bottom 1em
  background $color-bg
  border-radius 6px
  svg
    cursor pointer
  .icon-search
    font-size 24px
    color $color-bg
  .box
    flex 1
    margin 0 5px
    line-height 18px
    background $color-bg
    color $color-black-dd
    font-size $font-size-medium
    outline 0
    &::placeholder
      color $color-text-ddd
  .icon-dismiss
    font-size 16px
    color $color-bg
</style>
