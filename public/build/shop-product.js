webpackJsonp([7],{

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(235)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(237),
  /* template */
  __webpack_require__(238),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-819cad5c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\product.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] product.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-819cad5c", Component.options)
  } else {
    hotAPI.reload("data-v-819cad5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("e47cb74a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-819cad5c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-819cad5c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-819cad5c] {\n  display: block;\n  overflow: hidden;\n}\n.details[data-v-819cad5c] {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n  margin: 5px 0;\n}\n.details .name[data-v-819cad5c] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666;\n}\n.details .price[data-v-819cad5c] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red;\n}\n.description[data-v-819cad5c] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666;\n}\nfooter[data-v-819cad5c] {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\nfooter .btn[data-v-819cad5c] {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    flex-basis: 80px;\n}\nfooter .btn .icon[data-v-819cad5c] {\n      display: block;\n}\nfooter .btn .icon.is-favourite[data-v-819cad5c] {\n        color: #f00;\n}\nfooter .btn .amount[data-v-819cad5c] {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%;\n}\nfooter .btn .text[data-v-819cad5c] {\n      font-size: 12px;\n}\nfooter .btn-add-cart[data-v-819cad5c] {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    flex-grow: 5;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/product.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,uBAAuB;EACvB,iBAAiB;EACjB,cAAc;CAAE;AAChB;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,WAAW;CAAE;AAEjB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,iCAAiC;EACjC,oBAAoB;EACpB,kBAAkB;EAClB,YAAY;CAAE;AAEhB;EACE,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,2BAA2B;CAAE;AAC7B;IACE,YAAY;IACZ,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,iBAAiB;CAAE;AACnB;MACE,eAAe;CAAE;AACjB;QACE,YAAY;CAAE;AAClB;MACE,mBAAmB;MACnB,uBAAuB;MACvB,SAAS;MACT,YAAY;MACZ,YAAY;MACZ,gBAAgB;MAChB,eAAe;MACf,mBAAmB;CAAE;AACvB;MACE,gBAAgB;CAAE;AACtB;IACE,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,uBAAuB;IACvB,aAAa;CAAE","file":"product.vue","sourcesContent":[".banner-swipe-item {\n  display: block;\n  overflow: hidden; }\n\n.details {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n  margin: 5px 0; }\n  .details .name {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666; }\n  .details .price {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red; }\n\n.description {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666; }\n\nfooter {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc; }\n  footer .btn {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    flex-basis: 80px; }\n    footer .btn .icon {\n      display: block; }\n      footer .btn .icon.is-favourite {\n        color: #f00; }\n    footer .btn .amount {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%; }\n    footer .btn .text {\n      font-size: 12px; }\n  footer .btn-add-cart {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    flex-grow: 5; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  mounted: function mounted() {
    this.getProduct();
    this.checkIsFavourite();
    this.getProductAmountInCart();
  },
  data: function data() {
    return {
      product: {},
      amount: 1,
      isFavourite: false,
      productAmountInCart: 0
    };
  },


  computed: {
    banners: function banners() {
      var temp = [];
      if (this.product.pictures) {
        this.product.pictures.forEach(function (picture) {
          temp.push({ img: picture });
        });
      }
      return temp;
    }
  },

  methods: {
    getProduct: function getProduct() {
      var _this = this;

      this.axios.get('product/' + this.$route.params.id).then(function (response) {
        _this.product = response.data.product;
      });
    },
    checkIsFavourite: function checkIsFavourite() {
      var _this2 = this;

      this.axios.get('favourite/' + this.$route.params.id + '/is-favourite').then(function (response) {
        _this2.isFavourite = response.data.isFavourite;
      }).catch(function (error) {
        console.log(error);
      });
    },
    getProductAmountInCart: function getProductAmountInCart() {
      var _this3 = this;

      this.axios.get('cart/product-amount').then(function (response) {
        _this3.productAmountInCart = response.data.amount;
      }).catch(function (error) {
        console.log(error);
      });
    },
    addToCart: function addToCart(productId) {
      var _this4 = this;

      var postData = {
        productId: productId,
        amount: this.amount
      };

      this.axios.post('cart/add', postData).then(function (response) {
        var data = response.data;

        _this4.productAmountInCart = parseInt(_this4.productAmountInCart) + _this4.amount;
      });
    },
    toggleFavourite: function toggleFavourite(productId) {
      var _this5 = this;

      this.axios.get('favourite/' + productId + '/toggle').then(function (response) {
        _this5.isFavourite = !_this5.isFavourite;
      });
    }
  }
};

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "banner"
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
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "details"
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.product.name))]), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_vm._v(_vm._s(_vm.product.price))])]), _vm._v(" "), _c('div', {
    staticClass: "description",
    domProps: {
      "innerHTML": _vm._s(_vm.product.description)
    }
  }), _vm._v(" "), _c('footer', [_c('div', {
    staticClass: "btn btn-favourite",
    on: {
      "click": function($event) {
        _vm.toggleFavourite(_vm.product.id)
      }
    }
  }, [_c('i', {
    staticClass: "icon iconfont",
    class: {
      'is-favourite': _vm.isFavourite
    }
  }, [_vm._v(_vm._s(_vm.isFavourite ? '' : ''))]), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v(_vm._s(_vm.isFavourite ? '已收藏' : '收藏'))])]), _vm._v(" "), _c('router-link', {
    staticClass: "btn btn-cart",
    attrs: {
      "to": "/cart"
    }
  }, [_c('span', {
    staticClass: "amount"
  }, [_vm._v(_vm._s(_vm.productAmountInCart))]), _vm._v(" "), _c('i', {
    staticClass: "icon iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("购物车")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-add-cart",
    on: {
      "click": function($event) {
        _vm.addToCart(_vm.product.id)
      }
    }
  }, [_vm._v("加入购物车")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-819cad5c", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9wcm9kdWN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9wcm9kdWN0LnZ1ZT9lOWE2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3Byb2R1Y3QudnVlP2Q3YjQiLCJ3ZWJwYWNrOi8vL3Byb2R1Y3QudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3Byb2R1Y3QudnVlP2EyNmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLGdFQUFpRSxtQkFBbUIscUJBQXFCLEdBQUcsNkJBQTZCLG1CQUFtQiwyQkFBMkIscUJBQXFCLGtCQUFrQixHQUFHLG1DQUFtQyxxQkFBcUIsc0JBQXNCLHNCQUFzQixrQkFB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QUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC1wcm9kdWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04MTljYWQ1Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi04MTljYWQ1Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtODE5Y2FkNWNcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXHByb2R1Y3QudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBwcm9kdWN0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi04MTljYWQ1Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTgxOWNhZDVjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9wcm9kdWN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04MTljYWQ1Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJlNDdjYjc0YVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi04MTljYWQ1Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTgxOWNhZDVjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcHJvZHVjdC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtODE5Y2FkNWNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9wcm9kdWN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjM1XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYmFubmVyLXN3aXBlLWl0ZW1bZGF0YS12LTgxOWNhZDVjXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5kZXRhaWxzW2RhdGEtdi04MTljYWQ1Y10ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogNXB4IDA7XFxufVxcbi5kZXRhaWxzIC5uYW1lW2RhdGEtdi04MTljYWQ1Y10ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICBmb250LXNpemU6IDE3cHg7XFxuICAgIGNvbG9yOiAjNjY2O1xcbn1cXG4uZGV0YWlscyAucHJpY2VbZGF0YS12LTgxOWNhZDVjXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuLmRlc2NyaXB0aW9uW2RhdGEtdi04MTljYWQ1Y10ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDFyZW0gMC41cmVtIDgwcHggMC41cmVtO1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgY29sb3I6ICM2NjY7XFxufVxcbmZvb3RlcltkYXRhLXYtODE5Y2FkNWNdIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcXG59XFxuZm9vdGVyIC5idG5bZGF0YS12LTgxOWNhZDVjXSB7XFxuICAgIGNvbG9yOiAjNTU1O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDJweCAwO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZmxleC1iYXNpczogODBweDtcXG59XFxuZm9vdGVyIC5idG4gLmljb25bZGF0YS12LTgxOWNhZDVjXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxufVxcbmZvb3RlciAuYnRuIC5pY29uLmlzLWZhdm91cml0ZVtkYXRhLXYtODE5Y2FkNWNdIHtcXG4gICAgICAgIGNvbG9yOiAjZjAwO1xcbn1cXG5mb290ZXIgLmJ0biAuYW1vdW50W2RhdGEtdi04MTljYWQ1Y10ge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjAwO1xcbiAgICAgIHRvcDogM3B4O1xcbiAgICAgIHJpZ2h0OiAyMHB4O1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgICBwYWRkaW5nOiAwIDRweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbmZvb3RlciAuYnRuIC50ZXh0W2RhdGEtdi04MTljYWQ1Y10ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuZm9vdGVyIC5idG4tYWRkLWNhcnRbZGF0YS12LTgxOWNhZDVjXSB7XFxuICAgIGhlaWdodDogNDVweDtcXG4gICAgbGluZS1oZWlnaHQ6IDQ1cHg7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MwMDtcXG4gICAgZmxleC1ncm93OiA1O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3Byb2R1Y3QudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7Q0FBRTtBQUVyQjtFQUNFLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsaUJBQWlCO0VBQ2pCLGNBQWM7Q0FBRTtBQUNoQjtJQUNFLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQVc7Q0FBRTtBQUVqQjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLFlBQVk7Q0FBRTtBQUVoQjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLDJCQUEyQjtDQUFFO0FBQzdCO0lBQ0UsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixpQkFBaUI7Q0FBRTtBQUNuQjtNQUNFLGVBQWU7Q0FBRTtBQUNqQjtRQUNFLFlBQVk7Q0FBRTtBQUNsQjtNQUNFLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsU0FBUztNQUNULFlBQVk7TUFDWixZQUFZO01BQ1osZ0JBQWdCO01BQ2hCLGVBQWU7TUFDZixtQkFBbUI7Q0FBRTtBQUN2QjtNQUNFLGdCQUFnQjtDQUFFO0FBQ3RCO0lBQ0UsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsdUJBQXVCO0lBQ3ZCLGFBQWE7Q0FBRVwiLFwiZmlsZVwiOlwicHJvZHVjdC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmJhbm5lci1zd2lwZS1pdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDVweCAwOyB9XFxuICAuZGV0YWlscyAubmFtZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgY29sb3I6ICM2NjY7IH1cXG4gIC5kZXRhaWxzIC5wcmljZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgY29sb3I6IHJlZDsgfVxcblxcbi5kZXNjcmlwdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMXJlbSAwLjVyZW0gODBweCAwLjVyZW07XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBjb2xvcjogIzY2NjsgfVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQ1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IH1cXG4gIGZvb3RlciAuYnRuIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4IDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBmbGV4LWJhc2lzOiA4MHB4OyB9XFxuICAgIGZvb3RlciAuYnRuIC5pY29uIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGZvb3RlciAuYnRuIC5pY29uLmlzLWZhdm91cml0ZSB7XFxuICAgICAgICBjb2xvcjogI2YwMDsgfVxcbiAgICBmb290ZXIgLmJ0biAuYW1vdW50IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcXG4gICAgICB0b3A6IDNweDtcXG4gICAgICByaWdodDogMjBweDtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgICAgcGFkZGluZzogMCA0cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuICAgIGZvb3RlciAuYnRuIC50ZXh0IHtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIGZvb3RlciAuYnRuLWFkZC1jYXJ0IHtcXG4gICAgaGVpZ2h0OiA0NXB4O1xcbiAgICBsaW5lLWhlaWdodDogNDVweDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzAwO1xcbiAgICBmbGV4LWdyb3c6IDU7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtODE5Y2FkNWNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9wcm9kdWN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjM2XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImJhbm5lclwiPlxyXG4gICAgICA8d3Ytc3dpcGUgOmhlaWdodD1cIjE4MFwiIDphdXRvPVwiNDAwMFwiPlxyXG4gICAgICAgIDx3di1zd2lwZS1pdGVtIGNsYXNzPVwiYmFubmVyLXN3aXBlLWl0ZW1cIiB2LWZvcj1cImJhbm5lciBpbiBiYW5uZXJzXCI+XHJcbiAgICAgICAgICA8aW1nIDpzcmM9XCJiYW5uZXIuaW1nXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgPC93di1zd2lwZS1pdGVtPlxyXG4gICAgICA8L3d2LXN3aXBlPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7IHByb2R1Y3QubmFtZSB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj57eyBwcm9kdWN0LnByaWNlIH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIiB2LWh0bWw9XCJwcm9kdWN0LmRlc2NyaXB0aW9uXCI+PC9kaXY+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tZmF2b3VyaXRlXCIgQGNsaWNrPVwidG9nZ2xlRmF2b3VyaXRlKHByb2R1Y3QuaWQpXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgOmNsYXNzPVwieyAnaXMtZmF2b3VyaXRlJzogaXNGYXZvdXJpdGUgfVwiPnt7IGlzRmF2b3VyaXRlID8gJyYjeGU2MDY7JyA6ICcmI3hlNjA3OydcclxuICAgICAgICAgIH19PC9pPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPnt7IGlzRmF2b3VyaXRlID8gJ+W3suaUtuiXjycgOiAn5pS26JePJyB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxyb3V0ZXItbGluayBjbGFzcz1cImJ0biBidG4tY2FydFwiIHRvPVwiL2NhcnRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImFtb3VudFwiPnt7IHByb2R1Y3RBbW91bnRJbkNhcnQgfX08L3NwYW4+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCI+JiN4ZTYxMTs8L2k+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+6LSt54mp6L2mPC9zcGFuPlxyXG4gICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWFkZC1jYXJ0XCIgQGNsaWNrPVwiYWRkVG9DYXJ0KHByb2R1Y3QuaWQpXCI+5Yqg5YWl6LSt54mp6L2mPC9kaXY+XHJcbiAgICA8L2Zvb3Rlcj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0UHJvZHVjdCgpXHJcbiAgICAgIHRoaXMuY2hlY2tJc0Zhdm91cml0ZSgpXHJcbiAgICAgIHRoaXMuZ2V0UHJvZHVjdEFtb3VudEluQ2FydCgpXHJcbiAgICB9LFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2R1Y3Q6IHt9LFxyXG4gICAgICAgIGFtb3VudDogMSxcclxuICAgICAgICBpc0Zhdm91cml0ZTogZmFsc2UsXHJcbiAgICAgICAgcHJvZHVjdEFtb3VudEluQ2FydDogMCxcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICBiYW5uZXJzICgpIHtcclxuICAgICAgICBsZXQgdGVtcCA9IFtdXHJcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdC5waWN0dXJlcykge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0LnBpY3R1cmVzLmZvckVhY2gocGljdHVyZSA9PiB7XHJcbiAgICAgICAgICAgIHRlbXAucHVzaCh7aW1nOiBwaWN0dXJlfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRQcm9kdWN0ICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldChgcHJvZHVjdC8ke3RoaXMuJHJvdXRlLnBhcmFtcy5pZH1gKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdCA9IHJlc3BvbnNlLmRhdGEucHJvZHVjdFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDllYblk4HmmK/lkKblt7LooqvmlLbol49cclxuICAgICAgY2hlY2tJc0Zhdm91cml0ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoYGZhdm91cml0ZS8ke3RoaXMuJHJvdXRlLnBhcmFtcy5pZH0vaXMtZmF2b3VyaXRlYCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzRmF2b3VyaXRlID0gcmVzcG9uc2UuZGF0YS5pc0Zhdm91cml0ZVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDotK3nianovabkuK3llYblk4HmgLvmlbBcclxuICAgICAgZ2V0UHJvZHVjdEFtb3VudEluQ2FydCAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ2NhcnQvcHJvZHVjdC1hbW91bnQnKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdEFtb3VudEluQ2FydCA9IHJlc3BvbnNlLmRhdGEuYW1vdW50XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWKoOWFpei0reeJqei9plxyXG4gICAgICBhZGRUb0NhcnQgKHByb2R1Y3RJZCkge1xyXG4gICAgICAgIGxldCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdjYXJ0L2FkZCcsIHBvc3REYXRhKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG5cclxuICAgICAgICAgIHRoaXMucHJvZHVjdEFtb3VudEluQ2FydCA9IHBhcnNlSW50KHRoaXMucHJvZHVjdEFtb3VudEluQ2FydCkgKyB0aGlzLmFtb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDliqDlhaXotK3nianovaZcclxuICAgICAgdG9nZ2xlRmF2b3VyaXRlIChwcm9kdWN0SWQpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldChgZmF2b3VyaXRlLyR7cHJvZHVjdElkfS90b2dnbGVgKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNGYXZvdXJpdGUgPSAhdGhpcy5pc0Zhdm91cml0ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gICRmb290ZXJIZWlnaHQ6IDQ1cHg7XHJcblxyXG4gIC5iYW5uZXItc3dpcGUtaXRlbSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG5cclxuICAuZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgbWFyZ2luOiA1cHggMDtcclxuXHJcbiAgICAubmFtZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICB9XHJcblxyXG4gICAgLnByaWNlIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHBhZGRpbmc6IDAgMTBweDtcclxuICAgICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgICBjb2xvcjogcmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmRlc2NyaXB0aW9uIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAxcmVtIDAuNXJlbSA4MHB4IDAuNXJlbTtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGNvbG9yOiAjNjY2O1xyXG4gIH1cclxuXHJcbiAgZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogJGZvb3RlckhlaWdodDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYztcclxuXHJcbiAgICAuYnRuIHtcclxuICAgICAgY29sb3I6ICM1NTU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogMnB4IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBmbGV4LWJhc2lzOiA4MHB4O1xyXG5cclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICYuaXMtZmF2b3VyaXRlIHtcclxuICAgICAgICAgIGNvbG9yOiAjZjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLmFtb3VudCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMDA7XHJcbiAgICAgICAgdG9wOiAzcHg7XHJcbiAgICAgICAgcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgNHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnRleHQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5idG4tYWRkLWNhcnQge1xyXG4gICAgICBoZWlnaHQ6ICRmb290ZXJIZWlnaHQ7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAkZm9vdGVySGVpZ2h0O1xyXG4gICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjMDA7XHJcbiAgICAgIGZsZXgtZ3JvdzogNTtcclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBwcm9kdWN0LnZ1ZT82Mzg1MTQ5MSIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2JywgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYmFubmVyXCJcbiAgfSwgW19jKCd3di1zd2lwZScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJoZWlnaHRcIjogMTgwLFxuICAgICAgXCJhdXRvXCI6IDQwMDBcbiAgICB9XG4gIH0sIF92bS5fbCgoX3ZtLmJhbm5lcnMpLCBmdW5jdGlvbihiYW5uZXIpIHtcbiAgICByZXR1cm4gX2MoJ3d2LXN3aXBlLWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJiYW5uZXItc3dpcGUtaXRlbVwiXG4gICAgfSwgW19jKCdpbWcnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcInNyY1wiOiBiYW5uZXIuaW1nLFxuICAgICAgICBcImFsdFwiOiBcIlwiXG4gICAgICB9XG4gICAgfSldKVxuICB9KSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJkZXRhaWxzXCJcbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiXG4gIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5wcm9kdWN0Lm5hbWUpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInByaWNlXCJcbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLnByb2R1Y3QucHJpY2UpKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZGVzY3JpcHRpb25cIixcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJpbm5lckhUTUxcIjogX3ZtLl9zKF92bS5wcm9kdWN0LmRlc2NyaXB0aW9uKVxuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdmb290ZXInLCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWZhdm91cml0ZVwiLFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0udG9nZ2xlRmF2b3VyaXRlKF92bS5wcm9kdWN0LmlkKVxuICAgICAgfVxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBjbGFzczoge1xuICAgICAgJ2lzLWZhdm91cml0ZSc6IF92bS5pc0Zhdm91cml0ZVxuICAgIH1cbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLmlzRmF2b3VyaXRlID8gJ+6YhicgOiAn7piHJykpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRleHRcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0uaXNGYXZvdXJpdGUgPyAn5bey5pS26JePJyA6ICfmlLbol48nKSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncm91dGVyLWxpbmsnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1jYXJ0XCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvY2FydFwiXG4gICAgfVxuICB9LCBbX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCJcbiAgfSwgW192bS5fdihfdm0uX3MoX3ZtLnByb2R1Y3RBbW91bnRJbkNhcnQpKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCJcbiAgfSwgW192bS5fdihcIu6YkVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0ZXh0XCJcbiAgfSwgW192bS5fdihcIui0reeJqei9plwiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnRuLWFkZC1jYXJ0XCIsXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5hZGRUb0NhcnQoX3ZtLnByb2R1Y3QuaWQpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5Yqg5YWl6LSt54mp6L2mXCIpXSldLCAxKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTgxOWNhZDVjXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi04MTljYWQ1Y1wiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvcHJvZHVjdC52dWVcbi8vIG1vZHVsZSBpZCA9IDIzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDciXSwic291cmNlUm9vdCI6IiJ9