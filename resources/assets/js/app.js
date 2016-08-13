
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
// Vue.component('hello', require('./components/Hello.vue'));

// import Group from '../../../node_modules/vux/dist/components/group';
// import Cell from '../../../node_modules/vux/dist/components/cell';
// import XButton from '../../../node_modules/vux/dist/components/x-button';


import MintUI from '../../../node_modules/mint-ui';
Vue.use(MintUI);

Vue.component(MintUI.Button.name, MintUI.Button);
Vue.component(MintUI.Cell.name, MintUI.Cell);

// Vue.component('group', Group);
// Vue.component('cell', Cell);
// Vue.component('x-button', XButton);

// var app = new Vue({
//     el: 'body',
//     methods: {
//         click: function (event) {

//             console.log("test");
//         }
//     }
// });
