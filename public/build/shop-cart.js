webpackJsonp([16],{

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(152)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(154),
  /* template */
  __webpack_require__(155),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b0683f66",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] cart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b0683f66", Component.options)
  } else {
    hotAPI.reload("data-v-b0683f66", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(50)("01ad8dbb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b0683f66\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cart.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b0683f66\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(true);
// imports


// module
exports.push([module.i, "\n.checker[data-v-b0683f66] {\n  margin-right: 10px;\n}\n.price[data-v-b0683f66] {\n  color: #f44336;\n}\nfooter[data-v-b0683f66] {\n  display: block;\n  position: fixed;\n  bottom: 51px;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n}\nfooter #check-all[data-v-b0683f66] {\n    float: left;\n    margin: 11px 10px;\n    font-size: 13px;\n}\nfooter .summary[data-v-b0683f66] {\n    float: left;\n    padding-left: 10px;\n}\nfooter .total-price[data-v-b0683f66] {\n    color: #f00;\n    font-size: 15px;\n    line-height: 50px;\n}\nfooter .btn-checkout[data-v-b0683f66] {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f44336;\n    border: none;\n}\nfooter .btn-checkout.disabled[data-v-b0683f66] {\n      background-color: #ccc;\n      color: #464242;\n}\nfooter .btn-checkout .product-amount[data-v-b0683f66] {\n      font-size: 12px;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/cart.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;CAAE;AAEvB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,aAAa;CAAE;AACf;IACE,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;CAAE;AACpB;IACE,YAAY;IACZ,mBAAmB;CAAE;AACvB;IACE,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,0BAA0B;IAC1B,aAAa;CAAE;AACf;MACE,uBAAuB;MACvB,eAAe;CAAE;AACnB;MACE,gBAAgB;CAAE","file":"cart.vue","sourcesContent":[".checker {\n  margin-right: 10px; }\n\n.price {\n  color: #f44336; }\n\nfooter {\n  display: block;\n  position: fixed;\n  bottom: 51px;\n  width: 100%;\n  background-color: #fff;\n  height: 50px; }\n  footer #check-all {\n    float: left;\n    margin: 11px 10px;\n    font-size: 13px; }\n  footer .summary {\n    float: left;\n    padding-left: 10px; }\n  footer .total-price {\n    color: #f00;\n    font-size: 15px;\n    line-height: 50px; }\n  footer .btn-checkout {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f44336;\n    border: none; }\n    footer .btn-checkout.disabled {\n      background-color: #ccc;\n      color: #464242; }\n    footer .btn-checkout .product-amount {\n      font-size: 12px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(196);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      carts: [],
      selectedCarts: []
    };
  },
  mounted: function mounted() {
    this.getCarts();
  },


  computed: {
    allSelected: function allSelected() {
      return this.selectedCarts.length === this.carts.length;
    },
    totalPrice: function totalPrice() {
      if (this.selectedCarts.length === 0) return 0;

      var price = 0;
      this.selectedCarts.forEach(function (val) {
        price += val.product.price * val.amount;
      });
      return price;
    },
    productAmount: function productAmount() {
      if (this.selectedCarts.length === 0) return 0;

      var count = 0;
      this.selectedCarts.forEach(function (val) {
        count += val.amount;
      });
      return count;
    }
  },

  methods: {
    getCarts: function getCarts() {
      var _this = this;

      this.axios.get('cart').then(function (response) {
        _this.carts = response.data.carts;
      });
    },
    toCheckout: function toCheckout() {
      if (this.selectedCarts.length > 0) {
        localStorage.setItem('selectedCarts', (0, _stringify2.default)(this.selectedCarts));

        this.$router.push('/checkout');
      }
    },
    checkAllClick: function checkAllClick() {
      if (this.allSelected) {
        this.selectedCarts = [];
      } else {
        this.selectedCarts = this.carts;
      }
    }
  }
};

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "weui-panel weui-panel_access"
  }, [_c('div', {
    staticClass: "weui-panel__bd"
  }, _vm._l((_vm.carts), function(cart) {
    return _c('div', {
      staticClass: "weui-media-box weui-media-box_appmsg"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selectedCarts),
        expression: "selectedCarts"
      }],
      staticClass: "checker",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": cart,
        "checked": Array.isArray(_vm.selectedCarts) ? _vm._i(_vm.selectedCarts, cart) > -1 : (_vm.selectedCarts)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.selectedCarts,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = cart,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedCarts = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.selectedCarts = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.selectedCarts = $$c
          }
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "weui-media-box__hd"
    }, [_c('img', {
      staticClass: "weui-media-box__thumb",
      attrs: {
        "src": cart.product.thumbnail
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "weui-media-box__bd"
    }, [_c('router-link', {
      staticClass: "weui-media-box__title",
      attrs: {
        "tag": "h4",
        "to": '/product/' + cart.product.id
      },
      domProps: {
        "textContent": _vm._s(cart.product.name)
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "weui-media-box__desc price",
      domProps: {
        "textContent": _vm._s(cart.product.price)
      }
    })], 1)])
  }))]), _vm._v(" "), _c('footer', [_c('label', {
    attrs: {
      "id": "check-all",
      "for": "check-all"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.allSelected),
      expression: "allSelected"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.allSelected) ? _vm._i(_vm.allSelected, null) > -1 : (_vm.allSelected)
    },
    on: {
      "click": _vm.checkAllClick,
      "__c": function($event) {
        var $$a = _vm.allSelected,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.allSelected = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.allSelected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.allSelected = $$c
        }
      }
    }
  }), _vm._v(" 全选\n          ")]), _vm._v(" "), _c('div', {
    staticClass: "summary"
  }, [_c('div', {
    staticClass: "total-price"
  }, [_vm._v("合计：" + _vm._s(_vm.totalPrice))])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-checkout",
    class: {
      'disabled': _vm.selectedCarts.length === 0
    },
    on: {
      "click": _vm.toCheckout
    }
  }, [_vm._v("去结算 "), _c('span', {
    staticClass: "product-amount"
  }, [_vm._v(_vm._s(("(" + _vm.productAmount + ")")))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b0683f66", module.exports)
  }
}

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(197), __esModule: true };

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(3)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZT8yODc2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhcnQudnVlP2YwYjQiLCJ3ZWJwYWNrOi8vL2NhcnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhcnQudnVlP2JjZjAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXFNO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBLHlCQUFtTztBQUNuTztBQUNBLHlCQUErSDtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUNyQ0E7O0FBRUE7QUFDQSxxQ0FBd087QUFDeE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNKQUFzSixpRkFBaUY7QUFDdk8sK0pBQStKLGlGQUFpRjtBQUNoUDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUNw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LEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDNUhBLGtCQUFrQix5RDs7Ozs7OztBQ0FsQjtBQUNBLHVDQUF1QywwQkFBMEI7QUFDakUsd0NBQXdDO0FBQ3hDO0FBQ0EsRSIsImZpbGUiOiJzaG9wLWNhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWIwNjgzZjY2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2FydC52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vY2FydC52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWIwNjgzZjY2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vY2FydC52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi1iMDY4M2Y2NlwiLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV19ORzcuMFxcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxzaG9wXFxcXGNvbXBvbmVudHNcXFxcY2FydC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGNhcnQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWIwNjgzZjY2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtYjA2ODNmNjZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhcnQudnVlXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhcnQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwMWFkOGRiYlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhcnQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWIwNjgzZjY2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2FydC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYjA2ODNmNjZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmNoZWNrZXJbZGF0YS12LWIwNjgzZjY2XSB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcbi5wcmljZVtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gIGNvbG9yOiAjZjQ0MzM2O1xcbn1cXG5mb290ZXJbZGF0YS12LWIwNjgzZjY2XSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogNTFweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuZm9vdGVyICNjaGVjay1hbGxbZGF0YS12LWIwNjgzZjY2XSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBtYXJnaW46IDExcHggMTBweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbn1cXG5mb290ZXIgLnN1bW1hcnlbZGF0YS12LWIwNjgzZjY2XSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxufVxcbmZvb3RlciAudG90YWwtcHJpY2VbZGF0YS12LWIwNjgzZjY2XSB7XFxuICAgIGNvbG9yOiAjZjAwO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbn1cXG5mb290ZXIgLmJ0bi1jaGVja291dFtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgICBwYWRkaW5nOiAwIDIwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuZm9vdGVyIC5idG4tY2hlY2tvdXQuZGlzYWJsZWRbZGF0YS12LWIwNjgzZjY2XSB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG4gICAgICBjb2xvcjogIzQ2NDI0MjtcXG59XFxuZm9vdGVyIC5idG4tY2hlY2tvdXQgLnByb2R1Y3QtYW1vdW50W2RhdGEtdi1iMDY4M2Y2Nl0ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXX05HNy4wL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxtQkFBbUI7Q0FBRTtBQUV2QjtFQUNFLGVBQWU7Q0FBRTtBQUVuQjtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsYUFBYTtDQUFFO0FBQ2Y7SUFDRSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGdCQUFnQjtDQUFFO0FBQ3BCO0lBQ0UsWUFBWTtJQUNaLG1CQUFtQjtDQUFFO0FBQ3ZCO0lBQ0UsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixrQkFBa0I7Q0FBRTtBQUN0QjtJQUNFLGVBQWU7SUFDZixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsMEJBQTBCO0lBQzFCLGFBQWE7Q0FBRTtBQUNmO01BQ0UsdUJBQXVCO01BQ3ZCLGVBQWU7Q0FBRTtBQUNuQjtNQUNFLGdCQUFnQjtDQUFFXCIsXCJmaWxlXCI6XCJjYXJ0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuY2hlY2tlciB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7IH1cXG5cXG4ucHJpY2Uge1xcbiAgY29sb3I6ICNmNDQzMzY7IH1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDUxcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBoZWlnaHQ6IDUwcHg7IH1cXG4gIGZvb3RlciAjY2hlY2stYWxsIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMTFweCAxMHB4O1xcbiAgICBmb250LXNpemU6IDEzcHg7IH1cXG4gIGZvb3RlciAuc3VtbWFyeSB7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7IH1cXG4gIGZvb3RlciAudG90YWwtcHJpY2Uge1xcbiAgICBjb2xvcjogI2YwMDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBsaW5lLWhlaWdodDogNTBweDsgfVxcbiAgZm9vdGVyIC5idG4tY2hlY2tvdXQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcXG4gICAgYm9yZGVyOiBub25lOyB9XFxuICAgIGZvb3RlciAuYnRuLWNoZWNrb3V0LmRpc2FibGVkIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgICAgIGNvbG9yOiAjNDY0MjQyOyB9XFxuICAgIGZvb3RlciAuYnRuLWNoZWNrb3V0IC5wcm9kdWN0LWFtb3VudCB7XFxuICAgICAgZm9udC1zaXplOiAxMnB4OyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWIwNjgzZjY2XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2FydC52dWVcbi8vIG1vZHVsZSBpZCA9IDE1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE2IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwid2V1aS1wYW5lbCB3ZXVpLXBhbmVsX2FjY2Vzc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2V1aS1wYW5lbF9fYmRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwid2V1aS1tZWRpYS1ib3ggd2V1aS1tZWRpYS1ib3hfYXBwbXNnXCIgdi1mb3I9XCJjYXJ0IGluIGNhcnRzXCI+XHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2VyXCIgdHlwZT1cImNoZWNrYm94XCIgOnZhbHVlPVwiY2FydFwiIHYtbW9kZWw9XCJzZWxlY3RlZENhcnRzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX2hkXCI+XHJcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ3ZXVpLW1lZGlhLWJveF9fdGh1bWJcIiA6c3JjPVwiY2FydC5wcm9kdWN0LnRodW1ibmFpbFwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX2JkXCI+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0YWc9XCJoNFwiIDp0bz1cIicvcHJvZHVjdC8nICsgY2FydC5wcm9kdWN0LmlkXCIgY2xhc3M9XCJ3ZXVpLW1lZGlhLWJveF9fdGl0bGVcIiB2LXRleHQ9XCJjYXJ0LnByb2R1Y3QubmFtZVwiPjwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX2Rlc2MgcHJpY2VcIiB2LXRleHQ9XCJjYXJ0LnByb2R1Y3QucHJpY2VcIj48L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8Zm9vdGVyPlxyXG4gICAgICA8bGFiZWwgaWQ9XCJjaGVjay1hbGxcIiBmb3I9XCJjaGVjay1hbGxcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cImFsbFNlbGVjdGVkXCIgQGNsaWNrPVwiY2hlY2tBbGxDbGlja1wiPiDlhajpgIlcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzcz1cInN1bW1hcnlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG90YWwtcHJpY2VcIj7lkIjorqHvvJp7eyB0b3RhbFByaWNlIH19PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1jaGVja291dFwiIDpjbGFzcz1cInsgJ2Rpc2FibGVkJzogc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPT09IDAgfVwiIEBjbGljaz1cInRvQ2hlY2tvdXRcIj7ljrvnu5PnrpcgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LWFtb3VudFwiPnt7IGAoJHtwcm9kdWN0QW1vdW50fSlgIH19PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZm9vdGVyPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjYXJ0czogW10sXHJcbiAgICAgICAgc2VsZWN0ZWRDYXJ0czogW11cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5nZXRDYXJ0cygpXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIC8vIOaYr+WQpuaYr+WFqOmAiVxyXG4gICAgICBhbGxTZWxlY3RlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPT09IHRoaXMuY2FydHMubGVuZ3RoXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDmgLvku7dcclxuICAgICAgdG90YWxQcmljZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPT09IDApIHJldHVybiAwXHJcblxyXG4gICAgICAgIC8vIOmAieS4reeahOaon+WVhuWTgeaAu+S7t+e0r+WKoFxyXG4gICAgICAgIGxldCBwcmljZSA9IDBcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydHMuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgICBwcmljZSArPSAodmFsLnByb2R1Y3QucHJpY2UgKiB2YWwuYW1vdW50KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHByaWNlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDpgInkuK3nmoTotK3nianovabpobnljIXlkKvnmoTllYblk4HmgLvmlbBcclxuICAgICAgcHJvZHVjdEFtb3VudCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPT09IDApIHJldHVybiAwXHJcblxyXG4gICAgICAgIC8vIOmAieS4reeahOiuouWNleS4reWVhuWTgeaVsOe0r+WKoFxyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FydHMuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgICBjb3VudCArPSB2YWwuYW1vdW50XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gY291bnRcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIC8vIOiOt+WPlui0reeJqei9puWIl+ihqOaVsOaNrlxyXG4gICAgICBnZXRDYXJ0cyAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ2NhcnQnKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuY2FydHMgPSByZXNwb25zZS5kYXRhLmNhcnRzXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWOu+e7k+eul1xyXG4gICAgICB0b0NoZWNrb3V0ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIC8vIOi3s+i9rOiHs+e7k+eul+mhtVxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGVjdGVkQ2FydHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlbGVjdGVkQ2FydHMpKVxyXG5cclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvY2hlY2tvdXQnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWFqOmAieWSjOWPlua2iOWFqOmAiVxyXG4gICAgICBjaGVja0FsbENsaWNrICgpIHtcclxuICAgICAgICBpZiAodGhpcy5hbGxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRzID0gW11cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRzID0gdGhpcy5jYXJ0c1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLmNoZWNrZXIge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLnByaWNlIHtcclxuICAgIGNvbG9yOiAjZjQ0MzM2O1xyXG4gIH1cclxuXHJcbiAgZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgYm90dG9tOiA1MXB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG5cclxuICAgICNjaGVjay1hbGwge1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgbWFyZ2luOiAxMXB4IDEwcHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIH1cclxuXHJcbiAgICAuc3VtbWFyeSB7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRvdGFsLXByaWNlIHtcclxuICAgICAgY29sb3I6ICNmMDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJ0bi1jaGVja291dCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBsaW5lLWhlaWdodDogNTBweDtcclxuICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2O1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcblxyXG4gICAgICAmLmRpc2FibGVkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gICAgICAgIGNvbG9yOiAjNDY0MjQyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAucHJvZHVjdC1hbW91bnQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNhcnQudnVlPzk0ZGE3OTcwIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLXBhbmVsIHdldWktcGFuZWxfYWNjZXNzXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwid2V1aS1wYW5lbF9fYmRcIlxuICB9LCBfdm0uX2woKF92bS5jYXJ0cyksIGZ1bmN0aW9uKGNhcnQpIHtcbiAgICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIndldWktbWVkaWEtYm94IHdldWktbWVkaWEtYm94X2FwcG1zZ1wiXG4gICAgfSwgW19jKCdpbnB1dCcsIHtcbiAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgIHZhbHVlOiAoX3ZtLnNlbGVjdGVkQ2FydHMpLFxuICAgICAgICBleHByZXNzaW9uOiBcInNlbGVjdGVkQ2FydHNcIlxuICAgICAgfV0sXG4gICAgICBzdGF0aWNDbGFzczogXCJjaGVja2VyXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInR5cGVcIjogXCJjaGVja2JveFwiXG4gICAgICB9LFxuICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBjYXJ0LFxuICAgICAgICBcImNoZWNrZWRcIjogQXJyYXkuaXNBcnJheShfdm0uc2VsZWN0ZWRDYXJ0cykgPyBfdm0uX2koX3ZtLnNlbGVjdGVkQ2FydHMsIGNhcnQpID4gLTEgOiAoX3ZtLnNlbGVjdGVkQ2FydHMpXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgXCJfX2NcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgdmFyICQkYSA9IF92bS5zZWxlY3RlZENhcnRzLFxuICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyAodHJ1ZSkgOiAoZmFsc2UpO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KCQkYSkpIHtcbiAgICAgICAgICAgIHZhciAkJHYgPSBjYXJ0LFxuICAgICAgICAgICAgICAkJGkgPSBfdm0uX2koJCRhLCAkJHYpO1xuICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAkJGkgPCAwICYmIChfdm0uc2VsZWN0ZWRDYXJ0cyA9ICQkYS5jb25jYXQoJCR2KSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQkaSA+IC0xICYmIChfdm0uc2VsZWN0ZWRDYXJ0cyA9ICQkYS5zbGljZSgwLCAkJGkpLmNvbmNhdCgkJGEuc2xpY2UoJCRpICsgMSkpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdm0uc2VsZWN0ZWRDYXJ0cyA9ICQkY1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3hfX2hkXCJcbiAgICB9LCBbX2MoJ2ltZycsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIndldWktbWVkaWEtYm94X190aHVtYlwiLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJzcmNcIjogY2FydC5wcm9kdWN0LnRodW1ibmFpbFxuICAgICAgfVxuICAgIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fYmRcIlxuICAgIH0sIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fdGl0bGVcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidGFnXCI6IFwiaDRcIixcbiAgICAgICAgXCJ0b1wiOiAnL3Byb2R1Y3QvJyArIGNhcnQucHJvZHVjdC5pZFxuICAgICAgfSxcbiAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgIFwidGV4dENvbnRlbnRcIjogX3ZtLl9zKGNhcnQucHJvZHVjdC5uYW1lKVxuICAgICAgfVxuICAgIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygncCcsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIndldWktbWVkaWEtYm94X19kZXNjIHByaWNlXCIsXG4gICAgICBkb21Qcm9wczoge1xuICAgICAgICBcInRleHRDb250ZW50XCI6IF92bS5fcyhjYXJ0LnByb2R1Y3QucHJpY2UpXG4gICAgICB9XG4gICAgfSldLCAxKV0pXG4gIH0pKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZm9vdGVyJywgW19jKCdsYWJlbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJpZFwiOiBcImNoZWNrLWFsbFwiLFxuICAgICAgXCJmb3JcIjogXCJjaGVjay1hbGxcIlxuICAgIH1cbiAgfSwgW19jKCdpbnB1dCcsIHtcbiAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICB2YWx1ZTogKF92bS5hbGxTZWxlY3RlZCksXG4gICAgICBleHByZXNzaW9uOiBcImFsbFNlbGVjdGVkXCJcbiAgICB9XSxcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwiY2hlY2tib3hcIlxuICAgIH0sXG4gICAgZG9tUHJvcHM6IHtcbiAgICAgIFwiY2hlY2tlZFwiOiBBcnJheS5pc0FycmF5KF92bS5hbGxTZWxlY3RlZCkgPyBfdm0uX2koX3ZtLmFsbFNlbGVjdGVkLCBudWxsKSA+IC0xIDogKF92bS5hbGxTZWxlY3RlZClcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5jaGVja0FsbENsaWNrLFxuICAgICAgXCJfX2NcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciAkJGEgPSBfdm0uYWxsU2VsZWN0ZWQsXG4gICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gKHRydWUpIDogKGZhbHNlKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgIHZhciAkJHYgPSBudWxsLFxuICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KTtcbiAgICAgICAgICBpZiAoJCRlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAkJGkgPCAwICYmIChfdm0uYWxsU2VsZWN0ZWQgPSAkJGEuY29uY2F0KCQkdikpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQkaSA+IC0xICYmIChfdm0uYWxsU2VsZWN0ZWQgPSAkJGEuc2xpY2UoMCwgJCRpKS5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3ZtLmFsbFNlbGVjdGVkID0gJCRjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIg5YWo6YCJXFxuICAgICAgICAgIFwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInN1bW1hcnlcIlxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0b3RhbC1wcmljZVwiXG4gIH0sIFtfdm0uX3YoXCLlkIjorqHvvJpcIiArIF92bS5fcyhfdm0udG90YWxQcmljZSkpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2J1dHRvbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWNoZWNrb3V0XCIsXG4gICAgY2xhc3M6IHtcbiAgICAgICdkaXNhYmxlZCc6IF92bS5zZWxlY3RlZENhcnRzLmxlbmd0aCA9PT0gMFxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLnRvQ2hlY2tvdXRcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLljrvnu5PnrpcgXCIpLCBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWFtb3VudFwiXG4gIH0sIFtfdm0uX3YoX3ZtLl9zKChcIihcIiArIF92bS5wcm9kdWN0QW1vdW50ICsgXCIpXCIpKSldKV0pXSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1iMDY4M2Y2NlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtYjA2ODNmNjZcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhcnQudnVlXG4vLyBtb2R1bGUgaWQgPSAxNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gMTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxNiIsInZhciBjb3JlICA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKVxuICAsICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7c3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeX0pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gMTk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxNiJdLCJzb3VyY2VSb290IjoiIn0=