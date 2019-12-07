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
    }
})
export default store