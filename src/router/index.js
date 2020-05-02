import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/components/index/index'], resolve)
    }, {
      path: '/article',
      name: 'article',
      component: (resolve) => require(['@/components/article/article-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/painting',
      name: 'painting',
      component: (resolve) => require(['@/components/painting/painting-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/trip',
      name: 'trip',
      component: (resolve) => require(['@/components/trip/trip-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/raise',
      name: 'raise',
      component: (resolve) => require(['@/components/raise/raise-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/recommend',
      name: 'recommend',
      component: (resolve) => require(['@/components/recommend/recommend-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/music',
      name: 'music',
      component: (resolve) => require(['@/components/music/music-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/focus',
      component: (resolve) => require(['@/components/focus/focus'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/entertainment',
      component: (resolve) => require(['@/components/entertainment/entertainment-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/derivant',
      component: (resolve) => require(['@/components/derivant/derivant-list'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/burning',
      component: (resolve) => require(['@/components/entertainment/burning'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/emoji',
      component: (resolve) => require(['@/components/emoji/emoji'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/dev',
      component: (resolve) => require(['@/components/dev/dev'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/tools',
      name: 'tools',
      component: (resolve) => require(['@/components/tools/index'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/tools/quill',
      name: 'quill',
      component: (resolve) => require(['@/components/tools/quill'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/tools/lyric',
      name: 'lyric',
      component: (resolve) => require(['@/components/tools/lyric'], resolve),
      meta: {
        keepAlive: true
      }
    }
  ]
})
