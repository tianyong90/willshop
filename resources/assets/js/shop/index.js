import Vue from 'vue';
import VueRouter from 'vue-router';
import WeVue from 'we-vue';
import Cookies from 'js-cookie';
import 'normalize.css/normalize.css';
import 'we-vue/lib/style.css';
import '../../sass/shop.scss';

console.log(WeVue);

Vue.use(VueRouter);
Vue.use(WeVue);

import axios from 'axios';
window.axios = axios;

import store from './store/index';

// 配置
import _config from './config';
window.Config = _config;

axios.defaults.baseURL = _config.apiRoot;
axios.defaults.timeout = _config.timeout;

import routes from './routes.js';

const router = new VueRouter({
  mode: 'history',
  base: '/shop/',
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true)

  next();
});

router.afterEach((to, from) => {
  // 动态设置页面标题
  document.title = to.meta.title;

  store.commit('UPDATE_LOADING', false);
});

// axios 请求发送前处理
axios.interceptors.request.use((config) => {
  store.commit('UPDATE_LOADING', true);

  config.headers.UserId = Cookies.get('suishoubian_card_userid');

  return config;
}, (error) => {
  return Promise.reject(error);
});

// axios 得到响应后处理
axios.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false);

  return response;
}, (error) => {
  store.commit('UPDATE_LOADING', false);

  // 超时后进行提示  
  if (error.code === 'ECONNABORTED') {
    // app.$root.error('网络超时，请重试');
  }

  return Promise.reject(error);
});

import { mapState } from 'vuex';

const app = new Vue({
  // 路由器
  router,

  // vux store
  store,

  computed: {
  },

  methods: {
  },

  watch: {
  }
}).$mount('#app')
