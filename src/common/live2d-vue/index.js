import live2d from 'common/live2d-vue/live2d'
import dialogue from 'common/live2d-vue/dialogue'
import tools from 'common/live2d-vue/live2dTools'

export default {
  install: function (Vue) {
    Vue.component('live2d', live2d)
    Vue.component('dialogue', dialogue)
    Vue.component('live2dTools', tools)
  }
}
