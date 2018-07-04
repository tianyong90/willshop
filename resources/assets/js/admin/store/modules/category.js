import axios from 'axios'

const state = {
  categories: {}
}

const getters = {}

const actions = {
  getCategories () {
    axios.get('categories').then((response) => {
      this.commit('UPDATE_CATEGORIES', response.data.categories)
    }).catch((error) => {
      console.error(error)
    })
  }
}

const mutations = {
  UPDATE_CATEGORIES (state, value) {
    state.categories = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
