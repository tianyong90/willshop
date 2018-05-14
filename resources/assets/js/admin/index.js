import Vue from 'vue'
import ElementUI, { Loading } from 'element-ui'
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import adminConfig from './config'
import router from './router'
import Echo from 'laravel-echo'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = adminConfig.apiRoot
axios.defaults.timeout = adminConfig.timeout

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)

  if (to.matched.some(record => record.meta.requiresAuth) && !window.localStorage.getItem(adminConfig.authTokenKey)) {
    // 需要登录后访问的页面，redirect 参数用于登录完成后跳转
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  }

  next()
})

router.afterEach((to, from) => {
  store.commit('UPDATE_LOADING', false)
})

// axios 请求发送前处理
axios.interceptors.request.use((config) => {
  store.commit('UPDATE_LOADING', true)

  let token = window.localStorage.getItem(adminConfig.authTokenKey)
  config.headers.Authorization = 'Bearer ' + token

  return config
}, (error) => {
  return Promise.reject(error)
})

// axios 得到响应后处理
axios.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false)

  return response
}, (error) => {
  store.commit('UPDATE_LOADING', false)

  if (error.response) {
    const newToken = error.response.headers.authorization
    if (newToken) {
      window.localStorage.setItem(adminConfig.authTokenKey, newToken.replace(/^bearer\s?/i, ''))
    }

    if (error.response.status === 401) {
      window.localStorage.removeItem(adminConfig.authTokenKey)

      router.push('/login')
    } else if (error.response.status === 403) {
      // 无权限时统一提示
      app.error('无操作权限')
      return
    }
  } else {
    // 请求超时提示
    if (error.code === 'ECONNABORTED') {
      app.error('请求超时，请重试')
    }
  }

  return Promise.reject(error)
})

if (typeof io !== 'undefined') {
  const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://willshop.test:6001'
  })

  echo.join('chatroom')
    .here((users) => {
      // this.usersInRoom = users
    })
    .joining((user) => {
      // this.usersInRoom.push(user)
    })
    .leaving((user) => {
      // this.usersInRoom = this.usersInRoom.filter(u => u != user)
    })
    .listen('MessagePosted', (e) => {
      // this.messages.push({
      //   message: e.message.message,
      //   user: e.user
      // })
    })
}

const app = new Vue({
  el: '#app',
  // 路由器
  router,
  // vuex store
  store,

  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    }),

    ...mapGetters([
      'accounts',
      'user'
    ])
  },

  data: {
    loadingInstance: null
  },

  methods: {
    success (msg) {
      this.$message({
        message: msg,
        type: 'success',
        duration: 1000
      })
    },

    warning (msg) {
      this.$message({
        message: msg,
        type: 'warning',
        duration: 1000
      })
    },

    error (msg) {
      this.$message({
        message: msg,
        type: 'error',
        duration: 2000
      })
    }
  },

  watch: {
    'isLoading': function (value) {
      if (value) {
        this.loadingInstance = Loading.service({
          text: 'Loading',
          customClass: 'my-loading-mask'
        })
      } else {
        this.loadingInstance && this.loadingInstance.close()
      }
    }
  },

  destroy () {
    this.loadingInstance = null
  }
})
