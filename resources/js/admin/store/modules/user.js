import axios from 'axios'

const state = {
  roles: []
}

const getters = {}

const actions = {
  getRoles () {
    axios.get('role').then((response) => {
      this.commit('UPDATE_ROLES', response.data.roles)
    }).catch((error) => {
      console.error(error)
    })
  }
}

const mutations = {
  UPDATE_ROLES (state, value) {
    state.roles = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
