
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('mainmenu', require('./components/shop/mainmenu.vue'));

window.VueRouter = require('vue-router');
window.Vuex = require('vuex');

import store from './shop_store';

window.dispatch = store.dispatch || store.commit;

import { Toast, Alert, Confirm } from 'vux';

const App = Vue.extend({
    // store 选项
    store,

    components: {
        Toast,
        Alert,
        Confirm
    },

    data: function () {
        return {
            toastShow: false,
            toastTime: 1000,
            toastMsg: ''
        }
    },

    methods: {
        success(msg) {
            this.toastShow = true;
            this.toastTime = 1000;
            this.toastType = 'default';
            this.toastMsg = msg;
        },

        error(msg) {
            this.toastShow = true;
            this.toastTime = 2000;
            this.toastType = 'warn';
            this.toastMsg = msg;
        }
    }
});

Vue.http.options.root = '/api';

Vue.http.interceptors.push((request, next) => {
    let { token = '' } = localStorage;

    request.headers.set('Authorization', 'bearer ' + token);

    next((response) => {
        if (response.status === 401) {
            // console.log(response.headers);
            // 未登录
            localStorage.removeItem('token');
        }
    });
});

var router = new VueRouter();

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

router.map({
    '/': {
        component: require('./components/shop/home.vue')
    },
    '/cart': {
        component: require('./components/shop/cart.vue'),
        auth: true
    },
    '/category': {
        component: require('./components/shop/category.vue')
    },
    '/order-list': {
        component: require('./components/shop/order-list.vue'),
        auth: true
    },
    '/order/:id': {
        component: require('./components/shop/order.vue'),
        auth: true
    },
    '/favourite': {
        component: require('./components/shop/favourite.vue'),
        auth: true
    },
    '/checkout': {
        component: require('./components/shop/checkout.vue'),
        auth: true
    },
    '/user': {
        component: require('./components/shop/user.vue'),
        auth: true
    },
    '/profile': {
        component: require('./components/shop/profile.vue'),
        auth: true
    },
    '/avatar': {
        component: require('./components/shop/avatar.vue'),
        auth: true,
        hideMainmenu: true
    },
    '/address': {
        component: require('./components/shop/address.vue'),
        auth: true
    },
    '/address/add': {
        component: require('./components/shop/address-edit.vue'),
        auth: true,
        hideMainmenu: true
    },
    '/about-us': {
        component: require('./components/shop/about-us.vue')
    },
    '/help': {
        component: require('./components/shop/help.vue')
    },
    '/help/:id': {
        component: require('./components/shop/help-detail.vue')
    },
    '/login': {
        component: require('./components/shop/login.vue'),
        hideMainmenu: true
    },
    '/register': {
        component: require('./components/shop/register.vue'),
        hideMainmenu: true
    },
    '/product/:id': {
        component: require('./components/shop/product.vue'),
        hideMainmenu: true
    },
    '/password': {
        component: require('./components/shop/password.vue'),
        auth: true
    }
});

router.start(App, 'body');
