
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

Vue.component('example', require('./components/Example.vue'));

import MintUI from '../../../node_modules/mint-ui';
Vue.use(MintUI);

window.VueRouter = require('vue-router');
Vue.use(VueRouter);

Vue.http.options.params = {api_token: "273AAFaZ1qXVDrZPpKYF5zjN3uyMGChpVmw6tC8iPQjMQdO5tJkSC6CXuaH9"};

var Hello = Vue.extend({
    template: '<h1>hello world</h1>'
});

var Test = Vue.extend({
    template: 'this is a test'
});

var App = Vue.extend({});

var router = new VueRouter();

router.map({
    '/': {
        component: Hello
    },
    '/hello': {
        component: Hello
    },
    '/test': {
        component: Test
    },
})

router.start(App, 'body')
