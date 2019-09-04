const mutations = {
  UPDATE_LOADING (state, value) {
    state.isLoading = value
  },

  UPDATE_DIRECTION (state, value) {
    state.direction = value
  },

  UPDATE_MAINMENU_VISIBLE (state, value) {
    state.isMainMenuVisible = value
  },
}

export default mutations
