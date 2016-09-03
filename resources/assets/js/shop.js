
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

const commit = store.commit || store.dispatch;

Vue.http.options.root = '/api';
Vue.http.options.params = {
    api_token: '273AAFaZ1qXVDrZPpKYF5zjN3uyMGChpVmw6tC8iPQjMQdO5tJkSC6CXuaH9'
};

const App = Vue.extend({
    // store 选项    
    store,

    methods: {
    }
});

var router = new VueRouter();

router.beforeEach(({ from, to, next}) => {
    commit('UPDATE_LOADING', true);

    if (to.hideMainmenu) {
        commit('UPDATE_MAINMENU_VISIBLE', false);
    } else {
        commit('UPDATE_MAINMENU_VISIBLE', true);
    }

    next();
})

router.afterEach(() => {
    commit('UPDATE_LOADING', false);
})

router.map({
    '/': {
        component: require('./components/shop/home.vue')
    },
    '/cart': {
        component: require('./components/shop/cart.vue')
    },
    '/category': {
        component: require('./components/shop/category.vue')
    },
    '/order': {
        component: require('./components/shop/order.vue')
    },
    '/favourite': {
        component: require('./components/shop/favourite.vue')
    },
    '/checkout': {
        component: require('./components/shop/checkout.vue')
    },
    '/user': {
        component: require('./components/shop/user.vue')
    },
    '/profile': {
        component: require('./components/shop/profile.vue')
    },
    '/address': {
        component: require('./components/shop/address.vue')
    },
    '/address/add': {
        component: require('./components/shop/address-edit.vue'),
        hideMainmenu: true
    },
    '/about-us': {
        component: require('./components/shop/about-us.vue')
    },
    '/help': {
        component: require('./components/shop/help.vue')
    },
    '/login': {
        component: require('./components/shop/login.vue'),
        hideMainmenu: true
    },
    '/product/:id': {
        component: require('./components/shop/product.vue'),
        hideMainmenu: true
    },
    '/password': {
        component: require('./components/shop/password.vue')
    }
});

router.start(App, 'body');
