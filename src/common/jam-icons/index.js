import ChevronCircleDown from 'common/jam-icons/chevron-circle-down.vue'
import Pause from 'common/jam-icons/pause.vue'
import Play from 'common/jam-icons/play.vue'
import PlayCircle from 'common/jam-icons/play-circle.vue'
import SetBackwardCircle from 'common/jam-icons/set-backward-circle.vue'
import SetForwardCircle from 'common/jam-icons/set-forward-circle.vue'
import UnorderedList from 'common/jam-icons/unordered-list.vue'
import Delete from 'common/jam-icons/delete.vue'
import Search from 'common/jam-icons/search.vue'

export default {
  install: function (Vue) {
    Vue.component('jam-chevron-circle-down', ChevronCircleDown)
    Vue.component('jam-pause', Pause)
    Vue.component('jam-play', Play)
    Vue.component('jam-play-circle', PlayCircle)
    Vue.component('jam-set-backward-circle', SetBackwardCircle)
    Vue.component('jam-set-forward-circle', SetForwardCircle)
    Vue.component('jam-unordered-list', UnorderedList)
    Vue.component('jam-delete', Delete)
    Vue.component('jam-search', Search)
  }
}
