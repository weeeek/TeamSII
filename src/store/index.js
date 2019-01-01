// 入口
import Vue from 'vue'
import Vuex from 'vuex'
// 异步操作
import * as actions from './actions'
// 对State进行映射
import * as getters from './getters'
import state from './state'
// 转变
import mutations from './mutations'
// 在控制台logger，preState，nextState 等
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试工具，调webpack编译的时候 process.env.NODE_ENV 为 'production'，有性能损耗
const debug = process.env.NODE_ENV !== 'production'

// 单例模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
