import axios from 'axios'

const state = {
  roles: [],
  role: {}
}

const getters = {}

const actions = {
  getRoles () {
    axios.get('role').then((response) => {
      this.commit('UPDATE_ROLES', response.data.roles)
    }).catch((error) => {
      console.error(error)
    })
  },

  getRole (roleId) {
    axios.get(`role/${roleId}`).then((response) => {
      this.commit('UPDATE_ROLE', response.data.role)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
