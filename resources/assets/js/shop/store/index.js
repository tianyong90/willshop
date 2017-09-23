import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  isMainMenuVisible: true
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, value) {
      state.isLoading = value
    },
    UPDATE_DIRECTION (state, value) {
      state.direction = value
    },
    UPDATE_MAINMENU_VISIBLE (state, value) {
      state.isMainMenuVisible = value
    }
  }
})
