import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        songlists: [],
        hash: ''
    },
    mutations: {
        updateHash (state, { hash }) {
            state.hash = hash
          },
          updateSongLists (state, { songlists }) {
            state.songlists = songlists
          }
    },
    getters: {
      //计算出当前hash所在的索引
      index(state) {
        return state.songlists.findIndex(item => item.hash == state.hash)

      }
    }
})
export default store