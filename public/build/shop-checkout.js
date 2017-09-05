webpackJsonp([15],{

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(188),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4459dcf3",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\checkout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4459dcf3", Component.options)
  } else {
    hotAPI.reload("data-v-4459dcf3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("274bfd30", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4459dcf3\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4459dcf3\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n#cart-liat[data-v-4459dcf3] {\n  display: block;\n  margin: 0;\n  padding: 0;\n}\n#cart-liat .list-item[data-v-4459dcf3] {\n    display: block;\n    padding: 5px;\n    border-bottom: 1px solid #555;\n}\n#cart-liat .list-item .thumbnail[data-v-4459dcf3] {\n      display: block;\n      float: left;\n      width: 100px;\n      height: 60px;\n}\n#cart-liat .list-item .right-part[data-v-4459dcf3] {\n      display: block;\n      float: right;\n}\nfooter[data-v-4459dcf3] {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n}\nfooter .total-price[data-v-4459dcf3] {\n    float: right;\n    line-height: 50px;\n    color: red;\n}\nfooter .btn-checkout[data-v-4459dcf3] {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f00;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/checkout.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,UAAU;EACV,WAAW;CAAE;AACb;IACE,eAAe;IACf,aAAa;IACb,8BAA8B;CAAE;AAChC;MACE,eAAe;MACf,YAAY;MACZ,aAAa;MACb,aAAa;CAAE;AACjB;MACE,eAAe;MACf,aAAa;CAAE;AAErB;EACE,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,aAAa;CAAE;AACf;IACE,aAAa;IACb,kBAAkB;IAClB,WAAW;CAAE;AACf;IACE,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,uBAAuB;CAAE","file":"checkout.vue","sourcesContent":["#cart-liat {\n  display: block;\n  margin: 0;\n  padding: 0; }\n  #cart-liat .list-item {\n    display: block;\n    padding: 5px;\n    border-bottom: 1px solid #555; }\n    #cart-liat .list-item .thumbnail {\n      display: block;\n      float: left;\n      width: 100px;\n      height: 60px; }\n    #cart-liat .list-item .right-part {\n      display: block;\n      float: right; }\n\nfooter {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #fff;\n  height: 50px; }\n  footer .total-price {\n    float: right;\n    line-height: 50px;\n    color: red; }\n  footer .btn-checkout {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f00; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      carts: []
    };
  },
  mounted: function mounted() {
    this.carts = JSON.parse(localStorage.getItem('selectedCarts'));
  },


  methods: {
    getCarts: function getCarts() {
      var _this = this;

      this.axios.get('order/create').then(function (response) {
        _this.carts = response.data;
      });
    },
    checkout: function checkout() {
      var _this2 = this;

      this.axios.post('checkout', { selectedCarts: this.selectedCarts }).then(function (response) {
        _this2.$router.push('/checkout');
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
};

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "address"
  }), _vm._v(" "), _c('ul', {
    staticClass: "cart-list"
  }, _vm._l((_vm.carts), function(cart) {
    return _c('li', {
      staticClass: "list-item"
    }, [_c('input', {
      staticClass: "checker",
      attrs: {
        "type": "checkbox",
        "name": ""
      }
    }), _vm._v(" "), _c('img', {
      staticClass: "thumbnail",
      attrs: {
        "src": cart.product.thumbnail,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "right-part"
    }, [_c('h3', {
      staticClass: "name"
    }, [_vm._v(_vm._s(cart.product.name))]), _vm._v(" "), _c('span', {
      staticClass: "price"
    }, [_vm._v(_vm._s(cart.product.price))])])])
  })), _vm._v(" "), _c('footer', [_c('div', {
    staticClass: "total-price"
  }, [_vm._v("实付款：" + _vm._s(_vm.totalPrice))]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-checkout"
  }, [_vm._v("立即下单")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4459dcf3", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2hlY2tvdXQudnVlPzJkMzQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2hlY2tvdXQudnVlPzY4MzAiLCJ3ZWJwYWNrOi8vL2NoZWNrb3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jaGVja291dC52dWU/YjZlYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFxTTtBQUNyTTtBQUNBO0FBQ0E7QUFDQSx5QkFBbU87QUFDbk87QUFDQSx5QkFBK0g7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0EscUNBQXdPO0FBQ3hPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSkFBc0osaUZBQWlGO0FBQ3ZPLCtKQUErSixpRkFBaUY7QUFDaFA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0RBQXlELG1CQUFtQixjQUFjLGVBQWUsR0FBRywwQ0FBMEMscUJBQXFCLG1CQUFtQixvQ0FBb0MsR0FBRyxxREFBcUQsdUJBQXVCLG9CQUFvQixxQkFBcUIscUJBQXFCLEdBQUcsc0RBQXNELHVCQUF1QixxQkFBcUIsR0FBRywyQkFBMkIsa0JBQWtCLG9CQUFvQixjQUFjLGdCQUFnQiwyQkFBMkIsaUJBQWlCLEdBQUcsd0NBQXdDLG1CQUFtQix3QkFBd0IsaUJBQWlCLEdBQUcseUNBQXlDLHFCQUFxQixtQkFBbUIsa0JBQWtCLHdCQUF3QixzQkFBc0IsNkJBQTZCLEdBQUcsVUFBVSxrSUFBa0ksS0FBSyxVQUFVLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksS0FBSyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsS0FBSyxLQUFLLFVBQVUsWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSwyREFBMkQsbUJBQW1CLGNBQWMsZUFBZSxFQUFFLDJCQUEyQixxQkFBcUIsbUJBQW1CLG9DQUFvQyxFQUFFLHdDQUF3Qyx1QkFBdUIsb0JBQW9CLHFCQUFxQixxQkFBcUIsRUFBRSx5Q0FBeUMsdUJBQXVCLHFCQUFxQixFQUFFLFlBQVksa0JBQWtCLG9CQUFvQixjQUFjLGdCQUFnQiwyQkFBMkIsaUJBQWlCLEVBQUUseUJBQXlCLG1CQUFtQix3QkFBd0IsaUJBQWlCLEVBQUUsMEJBQTBCLHFCQUFxQixtQkFBbUIsa0JBQWtCLHdCQUF3QixzQkFBc0IsNkJBQTZCLEVBQUUscUJBQXFCOztBQUVycUU7Ozs7Ozs7Ozs7Ozs7Ozt3QkNvQkE7O2FBR0E7QUFGQTtBQUlBOzhCQUNBO2lEQUNBO0FBRUE7Ozs7O0FBRUE7OzhEQUNBOytCQUNBO0FBQ0E7QUFFQTs7QUFDQTs7a0dBQ0E7NEJBQ0E7Z0NBQ0E7b0JBQ0E7QUFDQTtBQUVBO0FBZEE7QUFYQSxFOzs7Ozs7O0FDMUJBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC1jaGVja291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDQ1OWRjZjNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jaGVja291dC52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vY2hlY2tvdXQudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00NDU5ZGNmM1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTQ0NTlkY2YzXCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXX05HNy4wXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxcY29tcG9uZW50c1xcXFxjaGVja291dC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGNoZWNrb3V0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00NDU5ZGNmM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTQ0NTlkY2YzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE1IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NTlkY2YzXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2hlY2tvdXQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIyNzRiZmQzMFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00NDU5ZGNmM1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00NDU5ZGNmM1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00NDU5ZGNmM1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTUiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuI2NhcnQtbGlhdFtkYXRhLXYtNDQ1OWRjZjNdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuI2NhcnQtbGlhdCAubGlzdC1pdGVtW2RhdGEtdi00NDU5ZGNmM10ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzU1NTtcXG59XFxuI2NhcnQtbGlhdCAubGlzdC1pdGVtIC50aHVtYm5haWxbZGF0YS12LTQ0NTlkY2YzXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgIGhlaWdodDogNjBweDtcXG59XFxuI2NhcnQtbGlhdCAubGlzdC1pdGVtIC5yaWdodC1wYXJ0W2RhdGEtdi00NDU5ZGNmM10ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGZsb2F0OiByaWdodDtcXG59XFxuZm9vdGVyW2RhdGEtdi00NDU5ZGNmM10ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuZm9vdGVyIC50b3RhbC1wcmljZVtkYXRhLXYtNDQ1OWRjZjNdIHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuZm9vdGVyIC5idG4tY2hlY2tvdXRbZGF0YS12LTQ0NTlkY2YzXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFdfTkc3LjAvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NoZWNrb3V0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLFdBQVc7Q0FBRTtBQUNiO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYiw4QkFBOEI7Q0FBRTtBQUNoQztNQUNFLGVBQWU7TUFDZixZQUFZO01BQ1osYUFBYTtNQUNiLGFBQWE7Q0FBRTtBQUNqQjtNQUNFLGVBQWU7TUFDZixhQUFhO0NBQUU7QUFFckI7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLGFBQWE7Q0FBRTtBQUNmO0lBQ0UsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixXQUFXO0NBQUU7QUFDZjtJQUNFLGVBQWU7SUFDZixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0NBQUVcIixcImZpbGVcIjpcImNoZWNrb3V0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjY2FydC1saWF0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDsgfVxcbiAgI2NhcnQtbGlhdCAubGlzdC1pdGVtIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmc6IDVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM1NTU7IH1cXG4gICAgI2NhcnQtbGlhdCAubGlzdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIHdpZHRoOiAxMDBweDtcXG4gICAgICBoZWlnaHQ6IDYwcHg7IH1cXG4gICAgI2NhcnQtbGlhdCAubGlzdC1pdGVtIC5yaWdodC1wYXJ0IHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBmbG9hdDogcmlnaHQ7IH1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDsgfVxcbiAgZm9vdGVyIC50b3RhbC1wcmljZSB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgIGNvbG9yOiByZWQ7IH1cXG4gIGZvb3RlciAuYnRuLWNoZWNrb3V0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgICBwYWRkaW5nOiAwIDIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMDA7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDQ1OWRjZjNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDE4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE1IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWRkcmVzc1wiPlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx1bCBjbGFzcz1cImNhcnQtbGlzdFwiPlxyXG4gICAgICA8bGkgY2xhc3M9XCJsaXN0LWl0ZW1cIiB2LWZvcj1cImNhcnQgaW4gY2FydHNcIj5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2VyXCIgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIlwiPlxyXG4gICAgICAgIDxpbWcgOnNyYz1cImNhcnQucHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIiBjbGFzcz1cInRodW1ibmFpbFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1wYXJ0XCI+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9XCJuYW1lXCI+e3sgY2FydC5wcm9kdWN0Lm5hbWUgfX08L2gzPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPnt7IGNhcnQucHJvZHVjdC5wcmljZSB9fTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+5a6e5LuY5qy+77yae3sgdG90YWxQcmljZSB9fTwvZGl2PlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1jaGVja291dFwiPueri+WNs+S4i+WNlTwvYnV0dG9uPlxyXG4gICAgPC9mb290ZXI+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhcnRzOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmNhcnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRDYXJ0cycpKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldENhcnRzICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldCgnb3JkZXIvY3JlYXRlJykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcnRzID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjaGVja291dCAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdjaGVja291dCcsIHsgc2VsZWN0ZWRDYXJ0czogdGhpcy5zZWxlY3RlZENhcnRzIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy9jaGVja291dCcpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgI2NhcnQtbGlhdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgLmxpc3QtaXRlbSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNTU1O1xyXG5cclxuICAgICAgLnRodW1ibmFpbCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgICAgIGhlaWdodDogNjBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnJpZ2h0LXBhcnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvb3RlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG5cclxuICAgIC50b3RhbC1wcmljZSB7XHJcbiAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XHJcbiAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmJ0bi1jaGVja291dCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBsaW5lLWhlaWdodDogNTBweDtcclxuICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjaGVja291dC52dWU/NTcyNmRkMjYiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImFkZHJlc3NcIlxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3VsJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcnQtbGlzdFwiXG4gIH0sIF92bS5fbCgoX3ZtLmNhcnRzKSwgZnVuY3Rpb24oY2FydCkge1xuICAgIHJldHVybiBfYygnbGknLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJsaXN0LWl0ZW1cIlxuICAgIH0sIFtfYygnaW5wdXQnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJjaGVja2VyXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInR5cGVcIjogXCJjaGVja2JveFwiLFxuICAgICAgICBcIm5hbWVcIjogXCJcIlxuICAgICAgfVxuICAgIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnaW1nJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWJuYWlsXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInNyY1wiOiBjYXJ0LnByb2R1Y3QudGh1bWJuYWlsLFxuICAgICAgICBcImFsdFwiOiBcIlwiXG4gICAgICB9XG4gICAgfSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJyaWdodC1wYXJ0XCJcbiAgICB9LCBbX2MoJ2gzJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiXG4gICAgfSwgW192bS5fdihfdm0uX3MoY2FydC5wcm9kdWN0Lm5hbWUpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInByaWNlXCJcbiAgICB9LCBbX3ZtLl92KF92bS5fcyhjYXJ0LnByb2R1Y3QucHJpY2UpKV0pXSldKVxuICB9KSksIF92bS5fdihcIiBcIiksIF9jKCdmb290ZXInLCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0b3RhbC1wcmljZVwiXG4gIH0sIFtfdm0uX3YoXCLlrp7ku5jmrL7vvJpcIiArIF92bS5fcyhfdm0udG90YWxQcmljZSkpXSksIF92bS5fdihcIiBcIiksIF9jKCdidXR0b24nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1jaGVja291dFwiXG4gIH0sIFtfdm0uX3YoXCLnq4vljbPkuIvljZVcIildKV0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNDQ1OWRjZjNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTQ0NTlkY2YzXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDE4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDE1Il0sInNvdXJjZVJvb3QiOiIifQ==