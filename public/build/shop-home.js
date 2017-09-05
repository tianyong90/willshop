webpackJsonp([11],{

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(164),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-eb253ae8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(162);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("2531c9de", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eb253ae8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-eb253ae8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-eb253ae8] {\n  display: block;\n  overflow: hidden;\n}\n.products[data-v-eb253ae8] {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  width: 95%;\n  margin: 10px auto 65px;\n}\n.products .product-item[data-v-eb253ae8] {\n    width: 48%;\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n}\n.products .product-item .thumbnail[data-v-eb253ae8] {\n      display: block;\n      width: 100%;\n}\n.products .product-item .name[data-v-eb253ae8] {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      -webkit-box-orient: vertical;\n      -webkit-line-clamp: 2;\n      -webkit-box-lines: 1;\n}\n.products .product-item .price[data-v-eb253ae8] {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/home.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;CAAE;AAErB;EACE,cAAc;EACd,oBAAoB;EACpB,+BAA+B;EAC/B,WAAW;EACX,uBAAuB;CAAE;AACzB;IACE,WAAW;IACX,eAAe;IACf,iBAAiB;IACjB,uBAAuB;IACvB,oBAAoB;IACpB,mBAAmB;IACnB,uBAAuB;CAAE;AACzB;MACE,eAAe;MACf,YAAY;CAAE;AAChB;MACE,qBAAqB;MACrB,YAAY;MACZ,iBAAiB;MACjB,wBAAwB;MACxB,6BAA6B;MAC7B,sBAAsB;MACtB,qBAAqB;CAAE;AACzB;MACE,eAAe;MACf,cAAc;MACd,gBAAgB;MAChB,kBAAkB;MAClB,WAAW;MACX,kBAAkB;CAAE","file":"home.vue","sourcesContent":[".banner-swipe-item {\n  display: block;\n  overflow: hidden; }\n\n.products {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  width: 95%;\n  margin: 10px auto 65px; }\n  .products .product-item {\n    width: 48%;\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc; }\n    .products .product-item .thumbnail {\n      display: block;\n      width: 100%; }\n    .products .product-item .name {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      -webkit-box-orient: vertical;\n      -webkit-line-clamp: 2;\n      -webkit-box-lines: 1; }\n    .products .product-item .price {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 163:
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

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('wv-swipe', {
    attrs: {
      "height": 180,
      "auto": 4000
    }
  }, _vm._l((_vm.banners), function(banner) {
    return _c('wv-swipe-item', {
      staticClass: "banner-swipe-item"
    }, [_c('img', {
      attrs: {
        "src": banner.img,
        "alt": ""
      }
    })])
  })), _vm._v(" "), _c('div', {
    staticClass: "products"
  }, _vm._l((_vm.products), function(product) {
    return _c('div', {
      staticClass: "product-item"
    }, [_c('router-link', {
      attrs: {
        "to": '/product/' + product.id
      }
    }, [_c('img', {
      staticClass: "thumbnail",
      attrs: {
        "src": product.thumbnail,
        "alt": ""
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "name",
      domProps: {
        "textContent": _vm._s(product.name)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "price",
      domProps: {
        "innerHTML": _vm._s(product.price)
      }
    })])], 1)
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-eb253ae8", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9ob21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9ob21lLnZ1ZT80ODJhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2hvbWUudnVlP2YxNDciLCJ3ZWJwYWNrOi8vL2hvbWUudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2hvbWUudnVlPzdmYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLGdFQUFpRSxtQkFBbUIscUJBQXFCLEdBQUcsOEJBQThCLGtCQUFrQix3QkFBd0IsbUNBQW1DLGVBQWUsMkJBQTJCLEdBQUcsNENBQTRDLGlCQUFpQixxQkFBcUIsdUJBQXVCLDZCQUE2QiwwQkFBMEIseUJBQXlCLDZCQUE2QixHQUFHLHVEQUF1RCx1QkFBdUIsb0JBQW9CLEdBQUcsa0RBQWtELDZCQUE2QixvQkFBb0IseUJBQXlCLGdDQUFnQyxxQ0FBcUMsOEJBQThCLDZCQUE2QixHQUFHLG1EQUFtRCx1QkFBdUIsc0JBQXNCLHdCQUF3QiwwQkFBMEIsbUJBQW1CLDBCQUEwQixHQUFHLFVBQVUsOEhBQThILEtBQUssVUFBVSxZQUFZLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksS0FBSyxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksK0RBQStELG1CQUFtQixxQkFBcUIsRUFBRSxlQUFlLGtCQUFrQix3QkFBd0IsbUNBQW1DLGVBQWUsMkJBQTJCLEVBQUUsNkJBQTZCLGlCQUFpQixxQkFBcUIsdUJBQXVCLDZCQUE2QiwwQkFBMEIseUJBQXlCLDZCQUE2QixFQUFFLDBDQUEwQyx1QkFBdUIsb0JBQW9CLEVBQUUscUNBQXFDLDZCQUE2QixvQkFBb0IseUJBQXlCLGdDQUFnQyxxQ0FBcUMsOEJBQThCLDZCQUE2QixFQUFFLHNDQUFzQyx1QkFBdUIsc0JBQXNCLHdCQUF3QiwwQkFBMEIsbUJBQW1CLDBCQUEwQixFQUFFLHFCQUFxQjs7QUFFcitFOzs7Ozs7Ozs7Ozs7Ozs7O0FDY0E7T0FFQTtPQUNBO0FBRkE7T0FLQTtPQUNBO0FBRkE7T0FLQTtPQUdBO0FBSkE7Ozt3QkFNQTs7Z0JBRUE7QUFFQTtBQUhBO0FBS0E7OEJBQ0E7U0FDQTtBQUVBOzs7OztBQUVBOzt5REFDQTt1Q0FDQTtBQUNBO0FBRUE7QUFOQTtBQVpBLEU7Ozs7Ozs7QUNuQ0EsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AtaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWIyNTNhZThcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9ob21lLnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9ob21lLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWIyNTNhZThcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9ob21lLnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LWViMjUzYWU4XCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXX05HNy4wXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxcY29tcG9uZW50c1xcXFxob21lLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gaG9tZS52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZWIyNTNhZThcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1lYjI1M2FlOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvaG9tZS52dWVcbi8vIG1vZHVsZSBpZCA9IDE0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDExIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWViMjUzYWU4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaG9tZS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjI1MzFjOWRlXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWViMjUzYWU4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaG9tZS52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWIyNTNhZThcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9ob21lLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lYjI1M2FlOFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYmFubmVyLXN3aXBlLWl0ZW1bZGF0YS12LWViMjUzYWU4XSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5wcm9kdWN0c1tkYXRhLXYtZWIyNTNhZThdIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDk1JTtcXG4gIG1hcmdpbjogMTBweCBhdXRvIDY1cHg7XFxufVxcbi5wcm9kdWN0cyAucHJvZHVjdC1pdGVtW2RhdGEtdi1lYjI1M2FlOF0ge1xcbiAgICB3aWR0aDogNDglO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbn1cXG4ucHJvZHVjdHMgLnByb2R1Y3QtaXRlbSAudGh1bWJuYWlsW2RhdGEtdi1lYjI1M2FlOF0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbn1cXG4ucHJvZHVjdHMgLnByb2R1Y3QtaXRlbSAubmFtZVtkYXRhLXYtZWIyNTNhZThdIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xcbiAgICAgIC13ZWJraXQtYm94LWxpbmVzOiAxO1xcbn1cXG4ucHJvZHVjdHMgLnByb2R1Y3QtaXRlbSAucHJpY2VbZGF0YS12LWViMjUzYWU4XSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcGFkZGluZzogLjJlbTtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgY29sb3I6IHJlZDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXX05HNy4wL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9ob21lLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0NBQUU7QUFFckI7RUFDRSxjQUFjO0VBQ2Qsb0JBQW9CO0VBQ3BCLCtCQUErQjtFQUMvQixXQUFXO0VBQ1gsdUJBQXVCO0NBQUU7QUFDekI7SUFDRSxXQUFXO0lBQ1gsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQix1QkFBdUI7Q0FBRTtBQUN6QjtNQUNFLGVBQWU7TUFDZixZQUFZO0NBQUU7QUFDaEI7TUFDRSxxQkFBcUI7TUFDckIsWUFBWTtNQUNaLGlCQUFpQjtNQUNqQix3QkFBd0I7TUFDeEIsNkJBQTZCO01BQzdCLHNCQUFzQjtNQUN0QixxQkFBcUI7Q0FBRTtBQUN6QjtNQUNFLGVBQWU7TUFDZixjQUFjO01BQ2QsZ0JBQWdCO01BQ2hCLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsa0JBQWtCO0NBQUVcIixcImZpbGVcIjpcImhvbWUudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5iYW5uZXItc3dpcGUtaXRlbSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4ucHJvZHVjdHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogOTUlO1xcbiAgbWFyZ2luOiAxMHB4IGF1dG8gNjVweDsgfVxcbiAgLnByb2R1Y3RzIC5wcm9kdWN0LWl0ZW0ge1xcbiAgICB3aWR0aDogNDglO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyB9XFxuICAgIC5wcm9kdWN0cyAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC5wcm9kdWN0cyAucHJvZHVjdC1pdGVtIC5uYW1lIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xcbiAgICAgIC13ZWJraXQtYm94LWxpbmVzOiAxOyB9XFxuICAgIC5wcm9kdWN0cyAucHJvZHVjdC1pdGVtIC5wcmljZSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcGFkZGluZzogLjJlbTtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgY29sb3I6IHJlZDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lYjI1M2FlOFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWFpblwiPlxyXG4gICAgPHd2LXN3aXBlIDpoZWlnaHQ9XCIxODBcIiA6YXV0bz1cIjQwMDBcIj5cclxuICAgICAgPHd2LXN3aXBlLWl0ZW0gY2xhc3M9XCJiYW5uZXItc3dpcGUtaXRlbVwiIHYtZm9yPVwiYmFubmVyIGluIGJhbm5lcnNcIj5cclxuICAgICAgICA8aW1nIDpzcmM9XCJiYW5uZXIuaW1nXCIgYWx0PVwiXCI+XHJcbiAgICAgIDwvd3Ytc3dpcGUtaXRlbT5cclxuICAgIDwvd3Ytc3dpcGU+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInByb2R1Y3RzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWl0ZW1cIiB2LWZvcj1cInByb2R1Y3QgaW4gcHJvZHVjdHNcIj5cclxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wcm9kdWN0LycgKyBwcm9kdWN0LmlkXCI+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwidGh1bWJuYWlsXCIgOnNyYz1cInByb2R1Y3QudGh1bWJuYWlsXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIiB2LXRleHQ9XCJwcm9kdWN0Lm5hbWVcIj48L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiB2LWh0bWw9XCJwcm9kdWN0LnByaWNlXCI+PC9kaXY+XHJcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgY29uc3QgYmFubmVycyA9IFt7XHJcbiAgICB1cmw6ICdqYXZhc2NyaXB0OicsXHJcbiAgICBpbWc6ICdodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzE4LzA5LzMxL3ByYWlyaWUtNjc5MDE0X18zNDAuanBnJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnamF2YXNjcmlwdDonLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAxNS8wMy8xOC8wOS8yOS90aGUtc2NlbmVyeS02NzkwMTFfXzM0MC5qcGcnXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICdqYXZhc2NyaXB0JyxcclxuICAgIGltZzogJ2h0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMjgvMTYvNDAvbGFrZS02OTYwOThfXzM0MC5qcGcnXHJcbiAgfV1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9kdWN0czogW10sXHJcbiAgICAgICAgYmFubmVyc1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgIHRoaXMuZ2V0UHJvZHVjdHMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldFByb2R1Y3RzKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0JykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5wcm9kdWN0c1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC5iYW5uZXItc3dpcGUtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG5cclxuICAucHJvZHVjdHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgbWFyZ2luOiAxMHB4IGF1dG8gNjVweDtcclxuXHJcbiAgICAucHJvZHVjdC1pdGVtIHtcclxuICAgICAgd2lkdGg6IDQ4JTtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcclxuXHJcbiAgICAgIC50aHVtYm5haWwge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubmFtZSB7XHJcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XHJcbiAgICAgICAgY29sb3I6ICM0NDQ7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcclxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcclxuICAgICAgICAtd2Via2l0LWJveC1saW5lczogMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnByaWNlIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBwYWRkaW5nOiAuMmVtO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBjb2xvcjogcmVkO1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaG9tZS52dWU/NDgzM2MyMmEiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJtYWluXCJcbiAgfSwgW19jKCd3di1zd2lwZScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJoZWlnaHRcIjogMTgwLFxuICAgICAgXCJhdXRvXCI6IDQwMDBcbiAgICB9XG4gIH0sIF92bS5fbCgoX3ZtLmJhbm5lcnMpLCBmdW5jdGlvbihiYW5uZXIpIHtcbiAgICByZXR1cm4gX2MoJ3d2LXN3aXBlLWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJiYW5uZXItc3dpcGUtaXRlbVwiXG4gICAgfSwgW19jKCdpbWcnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcInNyY1wiOiBiYW5uZXIuaW1nLFxuICAgICAgICBcImFsdFwiOiBcIlwiXG4gICAgICB9XG4gICAgfSldKVxuICB9KSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicHJvZHVjdHNcIlxuICB9LCBfdm0uX2woKF92bS5wcm9kdWN0cyksIGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInByb2R1Y3QtaXRlbVwiXG4gICAgfSwgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy9wcm9kdWN0LycgKyBwcm9kdWN0LmlkXG4gICAgICB9XG4gICAgfSwgW19jKCdpbWcnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYm5haWxcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwic3JjXCI6IHByb2R1Y3QudGh1bWJuYWlsLFxuICAgICAgICBcImFsdFwiOiBcIlwiXG4gICAgICB9XG4gICAgfSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgXCJ0ZXh0Q29udGVudFwiOiBfdm0uX3MocHJvZHVjdC5uYW1lKVxuICAgICAgfVxuICAgIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwicHJpY2VcIixcbiAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgIFwiaW5uZXJIVE1MXCI6IF92bS5fcyhwcm9kdWN0LnByaWNlKVxuICAgICAgfVxuICAgIH0pXSldLCAxKVxuICB9KSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1lYjI1M2FlOFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZWIyNTNhZThcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSAxNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSJdLCJzb3VyY2VSb290IjoiIn0=