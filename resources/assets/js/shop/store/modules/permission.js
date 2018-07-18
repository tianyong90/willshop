import axios from 'axios'

const state = {
  permissions: {}
}

const getters = {}

const actions = {
  getPermissions () {
    axios.get('permission').then((response) => {
      this.commit('UPDATE_PERMISSIONS', response.data.permissions)
    }).catch((error) => {
      console.error(error)
    })
  }
}

const mutations = {
  UPDATE_PERMISSIONS (state, value) {
    state.permissions = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
