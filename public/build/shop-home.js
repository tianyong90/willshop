webpackJsonp([0],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(126)

var Component = __webpack_require__(57)(
  /* script */
  __webpack_require__(123),
  /* template */
  __webpack_require__(125),
  /* scopeId */
  "data-v-eb253ae8",
  /* cssModules */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eb253ae8", Component.options)
  } else {
    hotAPI.reload("data-v-eb253ae8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var banners = [{
  url: 'javascript:',
  img: 'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg'
}, {
  url: 'javascript:',
  img: 'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg'
}, {
  url: 'javascript',
  img: 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg'
}];

exports.default = {
  data: function data() {
    return {
      products: [],
      banners: banners
    };
  },
  mounted: function mounted() {
    this.getProducts();
  },


  methods: {
    getProducts: function getProducts() {
      var _this = this;

      this.axios.get('product').then(function (response) {
        _this.products = response.data.products;
      });
    }
  }
};

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
exports.push([module.i, "\n.demo-swipe-item[data-v-eb253ae8] {\n  display: block;\n  overflow: hidden;\n}\n#products[data-v-eb253ae8] {\n  display: block;\n  overflow: hidden;\n  margin: 20px 0 80px 0;\n}\n#products ul[data-v-eb253ae8] {\n    display: block;\n    overflow: hidden;\n    padding: 0;\n}\n#products ul li[data-v-eb253ae8] {\n      display: block;\n      float: left;\n      width: 40%;\n      margin: 5%;\n}\n#products ul li .thumbnail[data-v-eb253ae8] {\n        display: block;\n        width: 100%;\n}\n#products ul li .name[data-v-eb253ae8] {\n        display: block;\n        text-align: center;\n}\n", ""]);

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('wv-swipe', {
    staticClass: "demo-swipe",
    attrs: {
      "height": 180,
      "auto": 4000
    }
  }, _vm._l((_vm.banners), function(banner) {
    return _c('wv-swipe-item', {
      staticClass: "demo-swipe-item"
    }, [_c('img', {
      attrs: {
        "src": banner.img,
        "alt": ""
      }
    })])
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-eb253ae8", module.exports)
  }
}

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(124);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(58)("01b8da7a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-eb253ae8&scoped=true!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-eb253ae8&scoped=true!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});