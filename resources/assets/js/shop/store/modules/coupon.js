import axios from 'axios'

const state = {
  coupons: {}
}

const getters = {}

const actions = {
  getCoupons () {
    axios.get('coupons').then((response) => {
      this.commit('UPDATE_COUPONS', response.data.coupons)
    }).catch((error) => {
      console.error(error)
    })
  }
}

const mutations = {
  UPDATE_COUPONS (state, value) {
    state.coupons = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
