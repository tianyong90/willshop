import axios from 'axios'

const state = {
  brands: {},
}

const getters = {}

const actions = {
  getBrands () {
    axios
      .get('brands')
      .then(response => {
        this.commit('UPDATE_BRANDS', response.data.brands)
      })
      .catch(error => {
        console.error(error)
      })
  },
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
