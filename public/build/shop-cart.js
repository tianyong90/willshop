webpackJsonp([1],{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(276)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(278),
  /* template */
  __webpack_require__(279),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b0683f66",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\cart.vue"
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

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(263), __esModule: true };

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(277);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("01ad8dbb", content, false);
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

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.checker[data-v-b0683f66] {\n  margin-right: 10px;\n}\n.price[data-v-b0683f66] {\n  color: #f44336;\n}\nfooter[data-v-b0683f66] {\n  display: block;\n  position: fixed;\n  bottom: 51px;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n}\nfooter #check-all[data-v-b0683f66] {\n    float: left;\n    margin: 11px 10px;\n    font-size: 13px;\n}\nfooter .summary[data-v-b0683f66] {\n    float: left;\n    padding-left: 10px;\n}\nfooter .total-price[data-v-b0683f66] {\n    color: #f00;\n    font-size: 15px;\n    line-height: 50px;\n}\nfooter .btn-checkout[data-v-b0683f66] {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f44336;\n    border: none;\n}\nfooter .btn-checkout.disabled[data-v-b0683f66] {\n      background-color: #ccc;\n      color: #464242;\n}\nfooter .btn-checkout .product-amount[data-v-b0683f66] {\n      font-size: 12px;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/cart.vue"],"names":[],"mappings":";AAAA;EACE,mBAAmB;CAAE;AAEvB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,aAAa;CAAE;AACf;IACE,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;CAAE;AACpB;IACE,YAAY;IACZ,mBAAmB;CAAE;AACvB;IACE,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;CAAE;AACtB;IACE,eAAe;IACf,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,0BAA0B;IAC1B,aAAa;CAAE;AACf;MACE,uBAAuB;MACvB,eAAe;CAAE;AACnB;MACE,gBAAgB;CAAE","file":"cart.vue","sourcesContent":[".checker {\n  margin-right: 10px; }\n\n.price {\n  color: #f44336; }\n\nfooter {\n  display: block;\n  position: fixed;\n  bottom: 51px;\n  width: 100%;\n  background-color: #fff;\n  height: 50px; }\n  footer #check-all {\n    float: left;\n    margin: 11px 10px;\n    font-size: 13px; }\n  footer .summary {\n    float: left;\n    padding-left: 10px; }\n  footer .total-price {\n    color: #f00;\n    font-size: 15px;\n    line-height: 50px; }\n  footer .btn-checkout {\n    display: block;\n    float: right;\n    color: #fff;\n    line-height: 50px;\n    padding: 0 20px;\n    background-color: #f44336;\n    border: none; }\n    footer .btn-checkout.disabled {\n      background-color: #ccc;\n      color: #464242; }\n    footer .btn-checkout .product-amount {\n      font-size: 12px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(262);

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

/***/ 279:
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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2FydC52dWU/Mjg3NiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZT9mMGI0Iiwid2VicGFjazovLy9jYXJ0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZT9iY2YwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXFNO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBLHlCQUFtTztBQUNuTztBQUNBLHlCQUErSDtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUNyQ0Esa0JBQWtCLHlEOzs7Ozs7O0FDQWxCO0FBQ0EsdUNBQXVDLDRCQUE0QjtBQUNuRSx5Q0FBeUM7QUFDekM7QUFDQTs7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0os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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC1jYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhcnQudnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2NhcnQudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2NhcnQudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtYjA2ODNmNjZcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXGNhcnQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBjYXJ0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1iMDY4M2Y2NlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWIwNjgzZjY2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qc1xuLy8gbW9kdWxlIGlkID0gMjYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJyk7XG52YXIgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHsgc3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeSB9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDI2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhcnQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwMWFkOGRiYlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMDY4M2Y2NlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhcnQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWIwNjgzZjY2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2FydC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYjA2ODNmNjZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uY2hlY2tlcltkYXRhLXYtYjA2ODNmNjZdIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuLnByaWNlW2RhdGEtdi1iMDY4M2Y2Nl0ge1xcbiAgY29sb3I6ICNmNDQzMzY7XFxufVxcbmZvb3RlcltkYXRhLXYtYjA2ODNmNjZdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiA1MXB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5mb290ZXIgI2NoZWNrLWFsbFtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIG1hcmdpbjogMTFweCAxMHB4O1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxufVxcbmZvb3RlciAuc3VtbWFyeVtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcXG59XFxuZm9vdGVyIC50b3RhbC1wcmljZVtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gICAgY29sb3I6ICNmMDA7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxufVxcbmZvb3RlciAuYnRuLWNoZWNrb3V0W2RhdGEtdi1iMDY4M2Y2Nl0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5mb290ZXIgLmJ0bi1jaGVja291dC5kaXNhYmxlZFtkYXRhLXYtYjA2ODNmNjZdIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgICAgIGNvbG9yOiAjNDY0MjQyO1xcbn1cXG5mb290ZXIgLmJ0bi1jaGVja291dCAucHJvZHVjdC1hbW91bnRbZGF0YS12LWIwNjgzZjY2XSB7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhcnQudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLG1CQUFtQjtDQUFFO0FBRXZCO0VBQ0UsZUFBZTtDQUFFO0FBRW5CO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixhQUFhO0NBQUU7QUFDZjtJQUNFLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsZ0JBQWdCO0NBQUU7QUFDcEI7SUFDRSxZQUFZO0lBQ1osbUJBQW1CO0NBQUU7QUFDdkI7SUFDRSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGtCQUFrQjtDQUFFO0FBQ3RCO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsYUFBYTtDQUFFO0FBQ2Y7TUFDRSx1QkFBdUI7TUFDdkIsZUFBZTtDQUFFO0FBQ25CO01BQ0UsZ0JBQWdCO0NBQUVcIixcImZpbGVcIjpcImNhcnQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5jaGVja2VyIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDsgfVxcblxcbi5wcmljZSB7XFxuICBjb2xvcjogI2Y0NDMzNjsgfVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogNTFweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDsgfVxcbiAgZm9vdGVyICNjaGVjay1hbGwge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgbWFyZ2luOiAxMXB4IDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTNweDsgfVxcbiAgZm9vdGVyIC5zdW1tYXJ5IHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHBhZGRpbmctbGVmdDogMTBweDsgfVxcbiAgZm9vdGVyIC50b3RhbC1wcmljZSB7XFxuICAgIGNvbG9yOiAjZjAwO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MHB4OyB9XFxuICBmb290ZXIgLmJ0bi1jaGVja291dCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogcmlnaHQ7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2O1xcbiAgICBib3JkZXI6IG5vbmU7IH1cXG4gICAgZm9vdGVyIC5idG4tY2hlY2tvdXQuZGlzYWJsZWQge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICAgICAgY29sb3I6ICM0NjQyNDI7IH1cXG4gICAgZm9vdGVyIC5idG4tY2hlY2tvdXQgLnByb2R1Y3QtYW1vdW50IHtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYjA2ODNmNjZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIndldWktcGFuZWwgd2V1aS1wYW5lbF9hY2Nlc3NcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIndldWktcGFuZWxfX2JkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIndldWktbWVkaWEtYm94IHdldWktbWVkaWEtYm94X2FwcG1zZ1wiIHYtZm9yPVwiY2FydCBpbiBjYXJ0c1wiPlxyXG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiY2hlY2tlclwiIHR5cGU9XCJjaGVja2JveFwiIDp2YWx1ZT1cImNhcnRcIiB2LW1vZGVsPVwic2VsZWN0ZWRDYXJ0c1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndldWktbWVkaWEtYm94X19oZFwiPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX3RodW1iXCIgOnNyYz1cImNhcnQucHJvZHVjdC50aHVtYm5haWxcIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndldWktbWVkaWEtYm94X19iZFwiPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdGFnPVwiaDRcIiA6dG89XCInL3Byb2R1Y3QvJyArIGNhcnQucHJvZHVjdC5pZFwiIGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX3RpdGxlXCIgdi10ZXh0PVwiY2FydC5wcm9kdWN0Lm5hbWVcIj48L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIndldWktbWVkaWEtYm94X19kZXNjIHByaWNlXCIgdi10ZXh0PVwiY2FydC5wcm9kdWN0LnByaWNlXCI+PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPGxhYmVsIGlkPVwiY2hlY2stYWxsXCIgZm9yPVwiY2hlY2stYWxsXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJhbGxTZWxlY3RlZFwiIEBjbGljaz1cImNoZWNrQWxsQ2xpY2tcIj4g5YWo6YCJXHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdW1tYXJ5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+5ZCI6K6h77yae3sgdG90YWxQcmljZSB9fTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tY2hlY2tvdXRcIiA6Y2xhc3M9XCJ7ICdkaXNhYmxlZCc6IHNlbGVjdGVkQ2FydHMubGVuZ3RoID09PSAwIH1cIiBAY2xpY2s9XCJ0b0NoZWNrb3V0XCI+5Y6757uT566XIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1hbW91bnRcIj57eyBgKCR7cHJvZHVjdEFtb3VudH0pYCB9fTwvc3Bhbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Zvb3Rlcj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FydHM6IFtdLFxyXG4gICAgICAgIHNlbGVjdGVkQ2FydHM6IFtdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2FydHMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAvLyDmmK/lkKbmmK/lhajpgIlcclxuICAgICAgYWxsU2VsZWN0ZWQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkQ2FydHMubGVuZ3RoID09PSB0aGlzLmNhcnRzLmxlbmd0aFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5oC75Lu3XHJcbiAgICAgIHRvdGFsUHJpY2UgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FydHMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxyXG5cclxuICAgICAgICAvLyDpgInkuK3nmoTmqJ/llYblk4HmgLvku7fntK/liqBcclxuICAgICAgICBsZXQgcHJpY2UgPSAwXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRzLmZvckVhY2goKHZhbCkgPT4ge1xyXG4gICAgICAgICAgcHJpY2UgKz0gKHZhbC5wcm9kdWN0LnByaWNlICogdmFsLmFtb3VudClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBwcmljZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g6YCJ5Lit55qE6LSt54mp6L2m6aG55YyF5ZCr55qE5ZWG5ZOB5oC75pWwXHJcbiAgICAgIHByb2R1Y3RBbW91bnQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FydHMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxyXG5cclxuICAgICAgICAvLyDpgInkuK3nmoTorqLljZXkuK3llYblk4HmlbDntK/liqBcclxuICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhcnRzLmZvckVhY2goKHZhbCkgPT4ge1xyXG4gICAgICAgICAgY291bnQgKz0gdmFsLmFtb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGNvdW50XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAvLyDojrflj5botK3nianovabliJfooajmlbDmja5cclxuICAgICAgZ2V0Q2FydHMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdjYXJ0JykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhcnRzID0gcmVzcG9uc2UuZGF0YS5jYXJ0c1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDljrvnu5PnrpdcclxuICAgICAgdG9DaGVja291dCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAvLyDot7Povazoh7Pnu5PnrpfpobVcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxlY3RlZENhcnRzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZWxlY3RlZENhcnRzKSlcclxuXHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnL2NoZWNrb3V0JylcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDlhajpgInlkozlj5bmtojlhajpgIlcclxuICAgICAgY2hlY2tBbGxDbGljayAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0cyA9IFtdXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJ0cyA9IHRoaXMuY2FydHNcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC5jaGVja2VyIHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICB9XHJcblxyXG4gIC5wcmljZSB7XHJcbiAgICBjb2xvcjogI2Y0NDMzNjtcclxuICB9XHJcblxyXG4gIGZvb3RlciB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogNTFweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGhlaWdodDogNTBweDtcclxuXHJcbiAgICAjY2hlY2stYWxsIHtcclxuICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgIG1hcmdpbjogMTFweCAxMHB4O1xyXG4gICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnN1bW1hcnkge1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC50b3RhbC1wcmljZSB7XHJcbiAgICAgIGNvbG9yOiAjZjAwO1xyXG4gICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5idG4tY2hlY2tvdXQge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XHJcbiAgICAgIHBhZGRpbmc6IDAgMjBweDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcclxuICAgICAgYm9yZGVyOiBub25lO1xyXG5cclxuICAgICAgJi5kaXNhYmxlZCB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcclxuICAgICAgICBjb2xvcjogIzQ2NDI0MjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnByb2R1Y3QtYW1vdW50IHtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjYXJ0LnZ1ZT85NGRhNzk3MCIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2JywgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwid2V1aS1wYW5lbCB3ZXVpLXBhbmVsX2FjY2Vzc1wiXG4gIH0sIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcIndldWktcGFuZWxfX2JkXCJcbiAgfSwgX3ZtLl9sKChfdm0uY2FydHMpLCBmdW5jdGlvbihjYXJ0KSB7XG4gICAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveCB3ZXVpLW1lZGlhLWJveF9hcHBtc2dcIlxuICAgIH0sIFtfYygnaW5wdXQnLCB7XG4gICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICB2YWx1ZTogKF92bS5zZWxlY3RlZENhcnRzKSxcbiAgICAgICAgZXhwcmVzc2lvbjogXCJzZWxlY3RlZENhcnRzXCJcbiAgICAgIH1dLFxuICAgICAgc3RhdGljQ2xhc3M6IFwiY2hlY2tlclwiLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwiY2hlY2tib3hcIlxuICAgICAgfSxcbiAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgIFwidmFsdWVcIjogY2FydCxcbiAgICAgICAgXCJjaGVja2VkXCI6IEFycmF5LmlzQXJyYXkoX3ZtLnNlbGVjdGVkQ2FydHMpID8gX3ZtLl9pKF92bS5zZWxlY3RlZENhcnRzLCBjYXJ0KSA+IC0xIDogKF92bS5zZWxlY3RlZENhcnRzKVxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIFwiX19jXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIHZhciAkJGEgPSBfdm0uc2VsZWN0ZWRDYXJ0cyxcbiAgICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gKHRydWUpIDogKGZhbHNlKTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICB2YXIgJCR2ID0gY2FydCxcbiAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KTtcbiAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgJCRpIDwgMCAmJiAoX3ZtLnNlbGVjdGVkQ2FydHMgPSAkJGEuY29uY2F0KCQkdikpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkJGkgPiAtMSAmJiAoX3ZtLnNlbGVjdGVkQ2FydHMgPSAkJGEuc2xpY2UoMCwgJCRpKS5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3ZtLnNlbGVjdGVkQ2FydHMgPSAkJGNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIndldWktbWVkaWEtYm94X19oZFwiXG4gICAgfSwgW19jKCdpbWcnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fdGh1bWJcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwic3JjXCI6IGNhcnQucHJvZHVjdC50aHVtYm5haWxcbiAgICAgIH1cbiAgICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3hfX2JkXCJcbiAgICB9LCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3hfX3RpdGxlXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBcInRhZ1wiOiBcImg0XCIsXG4gICAgICAgIFwidG9cIjogJy9wcm9kdWN0LycgKyBjYXJ0LnByb2R1Y3QuaWRcbiAgICAgIH0sXG4gICAgICBkb21Qcm9wczoge1xuICAgICAgICBcInRleHRDb250ZW50XCI6IF92bS5fcyhjYXJ0LnByb2R1Y3QubmFtZSlcbiAgICAgIH1cbiAgICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3AnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fZGVzYyBwcmljZVwiLFxuICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgXCJ0ZXh0Q29udGVudFwiOiBfdm0uX3MoY2FydC5wcm9kdWN0LnByaWNlKVxuICAgICAgfVxuICAgIH0pXSwgMSldKVxuICB9KSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2Zvb3RlcicsIFtfYygnbGFiZWwnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaWRcIjogXCJjaGVjay1hbGxcIixcbiAgICAgIFwiZm9yXCI6IFwiY2hlY2stYWxsXCJcbiAgICB9XG4gIH0sIFtfYygnaW5wdXQnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgdmFsdWU6IChfdm0uYWxsU2VsZWN0ZWQpLFxuICAgICAgZXhwcmVzc2lvbjogXCJhbGxTZWxlY3RlZFwiXG4gICAgfV0sXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcImNoZWNrYm94XCJcbiAgICB9LFxuICAgIGRvbVByb3BzOiB7XG4gICAgICBcImNoZWNrZWRcIjogQXJyYXkuaXNBcnJheShfdm0uYWxsU2VsZWN0ZWQpID8gX3ZtLl9pKF92bS5hbGxTZWxlY3RlZCwgbnVsbCkgPiAtMSA6IChfdm0uYWxsU2VsZWN0ZWQpXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0uY2hlY2tBbGxDbGljayxcbiAgICAgIFwiX19jXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgJCRhID0gX3ZtLmFsbFNlbGVjdGVkLFxuICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICQkYyA9ICQkZWwuY2hlY2tlZCA/ICh0cnVlKSA6IChmYWxzZSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KCQkYSkpIHtcbiAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdik7XG4gICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgJCRpIDwgMCAmJiAoX3ZtLmFsbFNlbGVjdGVkID0gJCRhLmNvbmNhdCgkJHYpKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkJGkgPiAtMSAmJiAoX3ZtLmFsbFNlbGVjdGVkID0gJCRhLnNsaWNlKDAsICQkaSkuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSkpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF92bS5hbGxTZWxlY3RlZCA9ICQkY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIOWFqOmAiVxcbiAgICAgICAgICBcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJzdW1tYXJ5XCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidG90YWwtcHJpY2VcIlxuICB9LCBbX3ZtLl92KFwi5ZCI6K6h77yaXCIgKyBfdm0uX3MoX3ZtLnRvdGFsUHJpY2UpKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCdidXR0b24nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1jaGVja291dFwiLFxuICAgIGNsYXNzOiB7XG4gICAgICAnZGlzYWJsZWQnOiBfdm0uc2VsZWN0ZWRDYXJ0cy5sZW5ndGggPT09IDBcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS50b0NoZWNrb3V0XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5Y6757uT566XIFwiKSwgX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1hbW91bnRcIlxuICB9LCBbX3ZtLl92KF92bS5fcygoXCIoXCIgKyBfdm0ucHJvZHVjdEFtb3VudCArIFwiKVwiKSkpXSldKV0pXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtYjA2ODNmNjZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWIwNjgzZjY2XCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXJ0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=