import axios from 'axios'

const state = {
  brands: {},
}

const getters = {}

const actions = {
  login ({ commit }) {
    axios
      .get('brands')
      .then(response => {
        commit('UPDATE_BRANDS', response.data.brands)
      })
      .catch(error => {
        console.error(error)
      })
  },

  logout () {},
}

const mutations = {
  UPDATE_BRANDS (state, value) {
    state.brands = value
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
