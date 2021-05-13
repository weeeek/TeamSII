import 'babel-polyfill'
import 'common/js/hack'

import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
import VueCollapse from 'vue2-collapse'
import VueJamIcons from 'common/jam-icons/index'
// import AnimateNumber from 'vue-animate-number'
// import live2d from 'common/live2d-vue/index'
import infiniteScroll from 'vue-infinite-scroll'
import { Timeline, TimelineItem } from 'view-design'
Vue.component('Timeline', Timeline)
Vue.component('TimelineItem', TimelineItem)

// 全局初始化
import store from './store'

fastclick.attach(document.body)

// Vue.use(live2d)
Vue.use(VueJamIcons)
// Vue.use(AnimateNumber)
Vue.use(VueCollapse)
Vue.use(infiniteScroll)
Vue.use(VueHighcharts, { Highcharts })
Vue.use(VueLazyload, {
  loading: require('common/image/loading.gif')
})

/* eslint-disable no-new */
// 注入Store
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
