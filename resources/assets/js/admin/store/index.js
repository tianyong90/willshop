import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import sidebar from './modules/sidebar'
import product from './modules/product'
import category from './modules/category'
import order from './modules/order'
import role from './modules/role'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    sidebar,
    product,
    category,
    order,
    role
  },
  strict: debug
})
