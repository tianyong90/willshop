import axios from 'axios'

const state = {
  users: {}, // 列表页数据
  user: {} // 用户详情
}

const getters = {}

const actions = {
  getUsers () {
    axios
      .get('users')
      .then(response => {
        this.commit('UPDATE_USERS', response.data.users)
      })
      .catch(error => {
        console.error(error)
      })
  },

  getUser () {
    axios
      .get('user')
      .then(response => {
        this.commit('UPDATE_USER', response.data.user)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

const mutations = {
  UPDATE_USERS (state, value) {
    state.users = value
  },

  UPDATE_USER (state, value) {
    state.user = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
