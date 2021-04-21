// https://www.cnblogs.com/fms-3/p/9716758.html
// router讲解
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function getAbsolutePath() {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

export default new Router({
  // mode: 'history',
  base: getAbsolutePath(),
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
      path: '/film',
      component: (resolve) => require(['@/components/film/film'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/live',
      component: (resolve) => require(['@/components/live/live'], resolve),
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
      path: '/quill',
      name: 'quill',
      component: (resolve) => require(['@/components/tools/quill'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/lyric',
      name: 'lyric',
      component: (resolve) => require(['@/components/tools/lyric'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/qrcode',
      name: 'qrcode',
      component: (resolve) => require(['@/components/tools/qrcode'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: "/ball",
      name: 'ball',
      component: (resolve) => require(['@/components/tools/ball'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/chat',
      name: 'chat',
      component: (resolve) => require(['@/components/tools/chat'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/sudo',
      name: 'sudo',
      component: (resolve) => require(['@/components/game/sudo'], resolve),
      meta: {
        keepAlive: false
      }
    }, {
      path: '/piano',
      name: 'piano',
      component: (resolve) => require(['@/components/game/piano'], resolve),
      meta: {
        keepAlive: false
      }
    }, {
      path: '/voicedictation',
      name: 'voicedictation',
      component: (resolve) => require(['@/components/tools/voicedictation'], resolve),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/video/:id',
      name: 'video',
      component: (resolve) => require(['@/components/video/video-play.vue'], resolve),
      meta: {
        keepAlive: false
      }
    }
  ]
})
