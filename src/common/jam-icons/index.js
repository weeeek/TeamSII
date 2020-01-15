import ChevronCircleDown from 'common/jam-icons/chevron-circle-down.vue'
import Pause from 'common/jam-icons/pause.vue'
import Play from 'common/jam-icons/play.vue'
import PlayCircle from 'common/jam-icons/play-circle.vue'
import SetBackwardCircle from 'common/jam-icons/set-backward-circle.vue'
import SetForwardCircle from 'common/jam-icons/set-forward-circle.vue'
import UnorderedList from 'common/jam-icons/unordered-list.vue'
import OrderedList from 'common/jam-icons/ordered-list.vue'
import Delete from 'common/jam-icons/delete.vue'
import Search from 'common/jam-icons/search.vue'
import MusicF from 'common/jam-icons/music-f.vue'
import Refresh from 'common/jam-icons/refresh.vue'
import Shuffle from 'common/jam-icons/shuffle.vue'
import Repeat from 'common/jam-icons/repeat.vue'
import Heart from 'common/jam-icons/heart.vue'
import HeartF from 'common/jam-icons/heart-f.vue'
import Close from 'common/jam-icons/close.vue'
import CloseCircle from 'common/jam-icons/close-circle.vue'
import ChevronsSquareUp from 'common/jam-icons/chevrons-square-up.vue'
import ChevronsSquareDown from 'common/jam-icons/chevrons-square-down.vue'
import MinusRectangle from 'common/jam-icons/minus-rectangle.vue'
import PlusRectangle from 'common/jam-icons/plus-rectangle.vue'

export default {
  install: function (Vue) {
    Vue.component('jam-chevron-circle-down', ChevronCircleDown)
    Vue.component('jam-pause', Pause)
    Vue.component('jam-play', Play)
    Vue.component('jam-play-circle', PlayCircle)
    Vue.component('jam-set-backward-circle', SetBackwardCircle)
    Vue.component('jam-set-forward-circle', SetForwardCircle)
    Vue.component('jam-unordered-list', UnorderedList)
    Vue.component('jam-ordered-list', OrderedList)
    Vue.component('jam-delete', Delete)
    Vue.component('jam-search', Search)
    Vue.component('jam-music-f', MusicF)
    Vue.component('jam-refresh', Refresh)
    Vue.component('jam-shuffle', Shuffle)
    Vue.component('jam-repeat', Repeat)
    Vue.component('jam-heart', Heart)
    Vue.component('jam-heart-f', HeartF)
    Vue.component('jam-close', Close)
    Vue.component('jam-close-circle', CloseCircle)
    Vue.component('jam-chevrons-square-up', ChevronsSquareUp)
    Vue.component('jam-chevrons-square-down', ChevronsSquareDown)
    Vue.component('jam-minus-rectangle', MinusRectangle)
    Vue.component('jam-plus-rectangle', PlusRectangle)
  }
}
