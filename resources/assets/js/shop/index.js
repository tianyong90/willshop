import 'babel-polyfill'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import 'we-vue/lib/style.css'
import '../../sass/shop.scss'
import axios from 'axios'
import store from './store/index'
import appConfig from './config' // 配置
import { mapState } from 'vuex'
import '../../iconfont/iconfont.css'
import router from './router'
import { Dialog, Indicator, Toast } from 'we-vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)
  store.commit('UPDATE_MAINMENU_VISIBLE', !to.meta.hideMainmenu)

  next()
})

router.afterEach((to, from) => {
  // 动态设置页面标题
  document.title = to.meta.title || 'WILLSHOP'

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

  return config
}, (error) => {
  return Promise.reject(error)
})

// axios 得到响应后处理
axios.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false)
  app.hideLoading()

  return response
}, (error) => {
  store.commit('UPDATE_LOADING', false)
  app.hideLoading()

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
    'mainmenu': () => import('./pages/mainmenu.vue')
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
      Toast({
        message,
        duration
      })
    },

    /**
     * 操作失败提示
     * @param message
     * @param duration
     */
    error (message, duration) {
      Toast({
        message: message,
        duration: duration,
        icon: 'warn'
      })
    },

    /**
     * 一般提示
     * @param message
     * @param duration
     */
    info (message, duration = 2000) {
      Toast({
        type: 'text',
        message,
        duration
      })
    },

    /**
     * 确认对话框
     * @param title
     * @param message
     */
    confirm (title, message) {
      return Dialog({
        title,
        message,
        showCancelBtn: true,
        skin: this.isiOs ? 'ios' : 'android'
      })
    },

    /**
     * 显示 loading 提示
     * @param msg
     */
    showLoading (msg = 'Loading') {
      Indicator.open(msg)
    },

    /**
     * 隐藏 loading 提示
     */
    hideLoading () {
      Indicator.close()
    }
  }
})
