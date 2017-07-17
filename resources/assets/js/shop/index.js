import Vue from 'vue'
import VueRouter from 'vue-router'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import '../../sass/shop.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import appConfig from './config' // 配置
import routes from './routes.js'
import { mapState } from 'vuex'

Vue.use(VueRouter)
Vue.use(WeVue)
Vue.use(VueAxios, axios)

const router = new VueRouter({
  mode: 'history',
  base: '/shop/',
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)

  store.commit('UPDATE_MAINMENU_VISIBLE', !to.meta.hideMainmenu)

  if (to.matched.some(record => record.meta.auth) && !window.localStorage.getItem(appConfig.jwtTokenName)) {
    // 需要登录后访问的页面，redirect 参数用于登录完成后跳转
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  }

  next()
})

router.afterEach((to, from) => {
  // 动态设置页面标题
  document.title = to.meta.title || 'willshop'

  store.commit('UPDATE_LOADING', false)
})

axios.defaults.baseURL = appConfig.apiRoot
axios.defaults.timeout = appConfig.timeout

// axios 请求发送前处理
axios.interceptors.request.use((config) => {
  store.commit('UPDATE_LOADING', true)

  if (config.hideLoading !== true) {
    // 显示 loading 提示
    app.showLoading()
  }

  let token = window.localStorage.getItem(appConfig.jwtTokenName)
  config.headers.Authorization = 'bearer ' + token

  return config
}, (error) => {
  return Promise.reject(error)
})

// axios 得到响应后处理
axios.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false)
  app.hideLoading()

  const newToken = response.headers.authorization
  if (newToken) {
    window.localStorage.setItem(appConfig.jwtTokenName, newToken.replace('bearer ', ''))
  }

  return response
}, (error) => {
  store.commit('UPDATE_LOADING', false)
  app.hideLoading()

  if (error.response) {
    const newToken = error.response.headers.authorization
    if (newToken) {
      window.localStorage.setItem(appConfig.jwtTokenName, newToken.replace('bearer ', ''))
    }

    if (error.response.status === 401) {
      window.localStorage.removeItem(appConfig.jwtTokenName)

      router.push('/login')
    } else if (error.response.status === 403) {
      // 无权限时统一提示
      app.error('无操作权限')
    }
  }

  // 超时后进行提示
  if (error.code === 'ECONNABORTED') {
    app.error('网络繁忙，请重试')
  }

  return Promise.reject(error)
})

const app = new Vue({
  el: '#app',

  router,

  store,

  components: {
    'mainmenu': require('./components/mainmenu.vue')
  },

  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isMainMenuVisible: state => state.isMainMenuVisible
    })
  },

  methods: {
    /**
     * 操作成功提示
     * @param message
     * @param duration
     */
    success (message, duration = 1000) {
      WeVue.Toast({
        message,
        duration
      })
    },

    error (message, duration) {
      WeVue.Toast({
        message: message,
        duration: duration,
        icon: 'warn'
      })
    },

    /**
     * 一般信息提示
     * @param message
     * @param duration
     */
    info (message, duration = 2000) {
      WeVue.Toast({
        type: 'text',
        message,
        duration
      })
    },

    /**
     * 确认对话框
     * @param title
     * @param message
     * @param callback
     */
    confirm (title, message, callback) {
      WeVue.Dialog({
        title,
        message,
        skin: this.isiOs ? 'ios' : 'android'
      }, callback)
    },

    /**
     * 显示 loading 提示
     * @param msg
     */
    showLoading (msg = 'Loading') {
      WeVue.Indicator.open(msg)
    },

    /**
     * 隐藏 loading 提示
     */
    hideLoading () {
      WeVue.Indicator.close()
    }
  }
})
