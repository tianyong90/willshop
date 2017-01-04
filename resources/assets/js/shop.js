window._ = require('lodash');

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = require('vue');
require('vue-resource');

/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

Vue.component('mainmenu', require('./components/shop/mainmenu.vue'));

window.VueRouter = require('vue-router');
window.Vuex = require('vuex');

import store from './shop_store';

window.dispatch = store.dispatch || store.commit;

import { Toast, Loading, Alert, Confirm } from 'vux';

const App = Vue.extend({
    // store 选项
    store,

    components: {
        Toast,
        Loading,
        Alert,
        Confirm
    },

    data: function () {
        return {
            toastShow: false,
            toastTime: 1000,
            toastMsg: '',
        }
    },

    computed: {
        isLoading: () => {
            return store.state.isLoading;
        }
    },

    methods: {
        success (msg) {
            this.toastShow = true;
            this.toastTime = 1000;
            this.toastType = 'default';
            this.toastMsg = msg;
        },

        error (msg) {
            this.toastShow = true;
            this.toastTime = 2000;
            this.toastType = 'warn';
            this.toastMsg = msg;
        }
    }
});

const router = new VueRouter();

router.beforeEach((transition) => {
    dispatch('UPDATE_LOADING', true);

    if (transition.to.hideMainmenu) {
        dispatch('UPDATE_MAINMENU_VISIBLE', false);
    } else {
        dispatch('UPDATE_MAINMENU_VISIBLE', true);
    }

    if (transition.to.auth && !localStorage.getItem('token')) {
        // 需要登录后访问的页面，redirect 参数用于登录完成后跳转
        transition.redirect('/login?redirect=' + transition.to.path);
    }

    transition.next();
})

router.afterEach(() => {
    dispatch('UPDATE_LOADING', false);
})

Vue.http.options.root = '/api';

Vue.http.interceptors.push((request, next) => {
    let { token = '' } = localStorage;

    dispatch('UPDATE_LOADING', true);

    request.headers.set('Authorization', 'bearer ' + token);

    next((response) => {
        dispatch('UPDATE_LOADING', false);
        
        if (response.status === 401) {
            // 未登录
            localStorage.removeItem('token');

            // 跳转至登录页            
            router.go('/login');
        }
    });
});

router.start(App, 'body');
