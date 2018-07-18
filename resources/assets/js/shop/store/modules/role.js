import axios from 'axios'

const state = {
  roles: [],
  role: {},
  guardNames: {}
}

const getters = {}

const actions = {
  getRoles ({ commit }) {
    axios.get('roles').then((response) => {
      commit('UPDATE_ROLES', response.data.roles)
    }).catch((error) => {
      console.error(error)
    })
  },

  getRole ({ commit }, roleId) {
    axios.get(`roles/${roleId}`).then((response) => {
      commit('UPDATE_ROLE', response.data.role)
    }).catch((error) => {
      console.error(error)
    })
  },

  getGuardNames ({ commit }) {
    axios.get(`guard-names`).then((response) => {
      console.log(response.data)

      commit('UPDATE_GUARDNAMES', response.data.guardNames)
    }).catch((error) => {
      console.error(error)
    })
  }
}

const mutations = {
  UPDATE_ROLES (state, value) {
    state.roles = value
  },

  UPDATE_ROLE (state, value) {
    state.role = value
  },

  UPDATE_GUARDNAMES (state, value) {
    state.guardNames = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
