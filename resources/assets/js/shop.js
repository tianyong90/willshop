
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

// var MintUI = require('mint-ui');
// Vue.use(MintUI);
var Vux = require('vux');

Vue.component('tabbar', Vux.Tabbar);
Vue.component('tabbar-item', Vux.TabbarItem);

window.VueRouter = require('vue-router');
Vue.use(VueRouter);

Vue.http.options.params = {api_token: "273AAFaZ1qXVDrZPpKYF5zjN3uyMGChpVmw6tC8iPQjMQdO5tJkSC6CXuaH9"};

const App = Vue.extend({});

var router = new VueRouter();

router.map({
    '/': {
        component: require('./components/mobile/home.vue')
    }
});

router.start(App, 'body');
