import axios from 'axios'

const state = {
  products: [],
  product: {}
}

const getters = {}

const actions = {
  getProducts ({ commit }) {
    axios
      .get('products')
      .then(response => {
        commit('UPDATE_PRODUCTS', response.data.products)
      })
      .catch(error => {
        console.error(error)
      })
  },

  getProduct ({ commit }, productId) {
    axios
      .get(`products/${productId}`)
      .then(response => {
        commit('UPDATE_PRODUCT', response.data.product)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

const mutations = {
  UPDATE_PRODUCTS (state, value) {
    state.products = value
  },

  UPDATE_PRODUCT (state, value) {
    state.product = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
