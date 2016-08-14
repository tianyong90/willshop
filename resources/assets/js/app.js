
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
Vue.component('hello', require('./components/Hello.vue'));

import MintUI from '../../../node_modules/mint-ui';
Vue.use(MintUI);

window.VueRouter = require('vue-router');
Vue.use(VueRouter);


// const app = new Vue({
//     el: 'body',
//     methods: {
//         click: function (event) {

//             console.log("test");
//         }
//     }
// });
