webpackJsonp([4],{

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(192),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d0f3f910",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\user.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d0f3f910", Component.options)
  } else {
    hotAPI.reload("data-v-d0f3f910", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("189e8d88", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d0f3f910\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d0f3f910\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.user-profile[data-v-d0f3f910] {\n  display: block;\n  overflow: hidden;\n  background-color: #2696cb;\n  padding: 20px;\n}\n.user-profile .avatar[data-v-d0f3f910] {\n    display: block;\n    float: left;\n    width: 70px;\n    height: 70px;\n    border-radius: 70px;\n    margin-right: 20px;\n}\n.user-profile .username[data-v-d0f3f910] {\n    display: block;\n    color: #fff;\n    font-size: 18px;\n}\n.user-profile .mobile[data-v-d0f3f910] {\n    display: block;\n    color: #fff;\n    font-size: 15px;\n}\n.card .br-1px[data-v-d0f3f910] {\n  border-right: 1px solid #ececec;\n}\n.card .card-item[data-v-d0f3f910] {\n  display: block;\n  padding: .3rem;\n  overflow: hidden;\n  background-color: #fff;\n  text-align: center;\n}\n.card .card-item .amount[data-v-d0f3f910] {\n    display: block;\n    color: #f74c31;\n    font-size: 16px;\n    font-weight: 500;\n}\n.card .card-item .label[data-v-d0f3f910] {\n    display: block;\n    color: #666;\n    font-size: 14px;\n    font-weight: 400;\n}\n.icon[data-v-d0f3f910] {\n  display: inline-block;\n  float: left;\n  margin-right: 5px;\n  color: #777;\n}\n.card-demo-flex[data-v-d0f3f910] {\n  display: flex;\n}\n.card-demo-content01[data-v-d0f3f910] {\n  padding: 10px 0;\n}\n.card-padding[data-v-d0f3f910] {\n  padding: 15px;\n}\n.card-demo-flex > div[data-v-d0f3f910] {\n  flex: 1;\n  text-align: center;\n  font-size: 12px;\n}\n.card-demo-flex span[data-v-d0f3f910] {\n  color: #f74c31;\n}\n.btn-logout[data-v-d0f3f910] {\n  display: block;\n  margin: 30px auto 80px;\n  width: 80%;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/user.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,0BAA0B;EAC1B,cAAc;CAAE;AAChB;IACE,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,oBAAoB;IACpB,mBAAmB;CAAE;AACvB;IACE,eAAe;IACf,YAAY;IACZ,gBAAgB;CAAE;AACpB;IACE,eAAe;IACf,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,gCAAgC;CAAE;AAEpC;EACE,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,eAAe;IACf,gBAAgB;IAChB,iBAAiB;CAAE;AACrB;IACE,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;CAAE;AAEvB;EACE,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,YAAY;CAAE;AAEhB;EACE,cAAc;CAAE;AAElB;EACE,gBAAgB;CAAE;AAEpB;EACE,cAAc;CAAE;AAElB;EACE,QAAQ;EACR,mBAAmB;EACnB,gBAAgB;CAAE;AAEpB;EACE,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,uBAAuB;EACvB,WAAW;CAAE","file":"user.vue","sourcesContent":[".user-profile {\n  display: block;\n  overflow: hidden;\n  background-color: #2696cb;\n  padding: 20px; }\n  .user-profile .avatar {\n    display: block;\n    float: left;\n    width: 70px;\n    height: 70px;\n    border-radius: 70px;\n    margin-right: 20px; }\n  .user-profile .username {\n    display: block;\n    color: #fff;\n    font-size: 18px; }\n  .user-profile .mobile {\n    display: block;\n    color: #fff;\n    font-size: 15px; }\n\n.card .br-1px {\n  border-right: 1px solid #ececec; }\n\n.card .card-item {\n  display: block;\n  padding: .3rem;\n  overflow: hidden;\n  background-color: #fff;\n  text-align: center; }\n  .card .card-item .amount {\n    display: block;\n    color: #f74c31;\n    font-size: 16px;\n    font-weight: 500; }\n  .card .card-item .label {\n    display: block;\n    color: #666;\n    font-size: 14px;\n    font-weight: 400; }\n\n.icon {\n  display: inline-block;\n  float: left;\n  margin-right: 5px;\n  color: #777; }\n\n.card-demo-flex {\n  display: flex; }\n\n.card-demo-content01 {\n  padding: 10px 0; }\n\n.card-padding {\n  padding: 15px; }\n\n.card-demo-flex > div {\n  flex: 1;\n  text-align: center;\n  font-size: 12px; }\n\n.card-demo-flex span {\n  color: #f74c31; }\n\n.btn-logout {\n  display: block;\n  margin: 30px auto 80px;\n  width: 80%; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(57);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      user: {}
    };
  },
  mounted: function mounted() {
    this.getUser();
  },


  methods: {
    getUser: function getUser() {
      var _this = this;

      this.axios.get('current-user').then(function (response) {
        _this.user = response.data.user;
      });
    },
    logout: function logout() {
      var _this2 = this;

      this.$root.confirm('确定退出？', '', function () {
        localStorage.removeItem(_config2.default.jwtTokenName);

        _this2.$store.commit('UPDATE_IS_LOGIN', false);
        _this2.$router.replace('/');
      });
    }
  }
};

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-link', {
    staticClass: "user-profile",
    attrs: {
      "tag": "div",
      "to": "profile"
    }
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.user.avatar || '/img/avatar.jpg'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "username"
  }, [_vm._v(_vm._s(_vm.user.name))]), _vm._v(" "), _c('div', {
    staticClass: "mobile"
  }, [_vm._v(_vm._s(_vm.user.mobile))])]), _vm._v(" "), _c('wv-flex', {
    staticClass: "card"
  }, [_c('wv-flex-item', {
    staticClass: "card-item br-1px"
  }, [_c('span', {
    staticClass: "amount"
  }, [_vm._v("1130")]), _vm._v(" "), _c('span', {
    staticClass: "label"
  }, [_vm._v("我的余额")])]), _vm._v(" "), _c('wv-flex-item', {
    staticClass: "card-item br-1px"
  }, [_c('span', {
    staticClass: "amount"
  }, [_vm._v("15")]), _vm._v(" "), _c('span', {
    staticClass: "label"
  }, [_vm._v("我的积分")])]), _vm._v(" "), _c('wv-flex-item', {
    staticClass: "card-item"
  }, [_c('span', {
    staticClass: "amount"
  }, [_vm._v("0")]), _vm._v(" "), _c('span', {
    staticClass: "label"
  }, [_vm._v("我的红包")])])], 1), _vm._v(" "), _c('wv-group', [_c('wv-cell', {
    attrs: {
      "title": "我的订单",
      "is-link": "",
      "to": "order-list"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-goods",
    slot: "icon"
  })]), _vm._v(" "), _c('wv-cell', {
    attrs: {
      "title": "收货地址",
      "is-link": "",
      "to": "address"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-location",
    slot: "icon"
  })]), _vm._v(" "), _c('wv-cell', {
    attrs: {
      "title": "我的收藏",
      "is-link": "",
      "to": "favourite"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-like",
    slot: "icon"
  })])], 1), _vm._v(" "), _c('wv-group', [_c('wv-cell', {
    attrs: {
      "title": "使用帮助",
      "is-link": "",
      "to": "help"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-question",
    slot: "icon"
  })]), _vm._v(" "), _c('wv-cell', {
    attrs: {
      "title": "关于我们",
      "is-link": "",
      "to": "about-us"
    }
  }, [_c('i', {
    staticClass: "icon iconfont icon-info",
    slot: "icon"
  })])], 1), _vm._v(" "), _c('wv-button', {
    staticClass: "btn-logout",
    attrs: {
      "type": "warn"
    },
    nativeOn: {
      "click": function($event) {
        _vm.logout($event)
      }
    }
  }, [_vm._v("退出登录")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d0f3f910", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy91c2VyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy91c2VyLnZ1ZT84ZmM2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3VzZXIudnVlPzJiMzciLCJ3ZWJwYWNrOi8vL3VzZXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3VzZXIudnVlP2I3ZmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLDJEQUE0RCxtQkFBbUIscUJBQXFCLDhCQUE4QixrQkFBa0IsR0FBRywwQ0FBMEMscUJBQXFCLGtCQUFrQixrQkFBa0IsbUJBQW1CLDBCQUEwQix5QkFBeUIsR0FBRyw0Q0FBNEMscUJBQXFCLGtCQUFr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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC11c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kMGYzZjkxMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3VzZXIudnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3VzZXIudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kMGYzZjkxMFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3VzZXIudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtZDBmM2Y5MTBcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXHVzZXIudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSB1c2VyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kMGYzZjkxMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQwZjNmOTEwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy91c2VyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kMGYzZjkxMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3VzZXIudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIxODllOGQ4OFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kMGYzZjkxMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3VzZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWQwZjNmOTEwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdXNlci52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZDBmM2Y5MTBcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy91c2VyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTg5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4udXNlci1wcm9maWxlW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2OTZjYjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxufVxcbi51c2VyLXByb2ZpbGUgLmF2YXRhcltkYXRhLXYtZDBmM2Y5MTBdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogNzBweDtcXG4gICAgaGVpZ2h0OiA3MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA3MHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcbi51c2VyLXByb2ZpbGUgLnVzZXJuYW1lW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG59XFxuLnVzZXItcHJvZmlsZSAubW9iaWxlW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG59XFxuLmNhcmQgLmJyLTFweFtkYXRhLXYtZDBmM2Y5MTBdIHtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlY2VjZWM7XFxufVxcbi5jYXJkIC5jYXJkLWl0ZW1bZGF0YS12LWQwZjNmOTEwXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IC4zcmVtO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5jYXJkIC5jYXJkLWl0ZW0gLmFtb3VudFtkYXRhLXYtZDBmM2Y5MTBdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZjc0YzMxO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbi5jYXJkIC5jYXJkLWl0ZW0gLmxhYmVsW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICM2NjY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLmljb25bZGF0YS12LWQwZjNmOTEwXSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgY29sb3I6ICM3Nzc7XFxufVxcbi5jYXJkLWRlbW8tZmxleFtkYXRhLXYtZDBmM2Y5MTBdIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5jYXJkLWRlbW8tY29udGVudDAxW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgcGFkZGluZzogMTBweCAwO1xcbn1cXG4uY2FyZC1wYWRkaW5nW2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgcGFkZGluZzogMTVweDtcXG59XFxuLmNhcmQtZGVtby1mbGV4ID4gZGl2W2RhdGEtdi1kMGYzZjkxMF0ge1xcbiAgZmxleDogMTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuLmNhcmQtZGVtby1mbGV4IHNwYW5bZGF0YS12LWQwZjNmOTEwXSB7XFxuICBjb2xvcjogI2Y3NGMzMTtcXG59XFxuLmJ0bi1sb2dvdXRbZGF0YS12LWQwZjNmOTEwXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMzBweCBhdXRvIDgwcHg7XFxuICB3aWR0aDogODAlO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3VzZXIudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsMEJBQTBCO0VBQzFCLGNBQWM7Q0FBRTtBQUNoQjtJQUNFLGVBQWU7SUFDZixZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixvQkFBb0I7SUFDcEIsbUJBQW1CO0NBQUU7QUFDdkI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLGdCQUFnQjtDQUFFO0FBQ3BCO0lBQ0UsZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7Q0FBRTtBQUV0QjtFQUNFLGdDQUFnQztDQUFFO0FBRXBDO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtDQUFFO0FBQ3JCO0lBQ0UsZUFBZTtJQUNmLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQUU7QUFDckI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixpQkFBaUI7Q0FBRTtBQUV2QjtFQUNFLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7Q0FBRTtBQUVoQjtFQUNFLGNBQWM7Q0FBRTtBQUVsQjtFQUNFLGdCQUFnQjtDQUFFO0FBRXBCO0VBQ0UsY0FBYztDQUFFO0FBRWxCO0VBQ0UsUUFBUTtFQUNSLG1CQUFtQjtFQUNuQixnQkFBZ0I7Q0FBRTtBQUVwQjtFQUNFLGVBQWU7Q0FBRTtBQUVuQjtFQUNFLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsV0FBVztDQUFFXCIsXCJmaWxlXCI6XCJ1c2VyLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudXNlci1wcm9maWxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjk2Y2I7XFxuICBwYWRkaW5nOiAyMHB4OyB9XFxuICAudXNlci1wcm9maWxlIC5hdmF0YXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiA3MHB4O1xcbiAgICBoZWlnaHQ6IDcwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDcwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDsgfVxcbiAgLnVzZXItcHJvZmlsZSAudXNlcm5hbWUge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogMThweDsgfVxcbiAgLnVzZXItcHJvZmlsZSAubW9iaWxlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDE1cHg7IH1cXG5cXG4uY2FyZCAuYnItMXB4IHtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlY2VjZWM7IH1cXG5cXG4uY2FyZCAuY2FyZC1pdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcGFkZGluZzogLjNyZW07XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgLmNhcmQgLmNhcmQtaXRlbSAuYW1vdW50IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZjc0YzMxO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gIC5jYXJkIC5jYXJkLWl0ZW0gLmxhYmVsIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjNjY2O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7IH1cXG5cXG4uaWNvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmbG9hdDogbGVmdDtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgY29sb3I6ICM3Nzc7IH1cXG5cXG4uY2FyZC1kZW1vLWZsZXgge1xcbiAgZGlzcGxheTogZmxleDsgfVxcblxcbi5jYXJkLWRlbW8tY29udGVudDAxIHtcXG4gIHBhZGRpbmc6IDEwcHggMDsgfVxcblxcbi5jYXJkLXBhZGRpbmcge1xcbiAgcGFkZGluZzogMTVweDsgfVxcblxcbi5jYXJkLWRlbW8tZmxleCA+IGRpdiB7XFxuICBmbGV4OiAxO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxMnB4OyB9XFxuXFxuLmNhcmQtZGVtby1mbGV4IHNwYW4ge1xcbiAgY29sb3I6ICNmNzRjMzE7IH1cXG5cXG4uYnRuLWxvZ291dCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMzBweCBhdXRvIDgwcHg7XFxuICB3aWR0aDogODAlOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWQwZjNmOTEwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvdXNlci52dWVcbi8vIG1vZHVsZSBpZCA9IDE5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxyb3V0ZXItbGluayBjbGFzcz1cInVzZXItcHJvZmlsZVwiIHRhZz1cImRpdlwiIHRvPVwicHJvZmlsZVwiPlxyXG4gICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyXCIgOnNyYz1cInVzZXIuYXZhdGFyIHx8ICcvaW1nL2F2YXRhci5qcGcnXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ1c2VybmFtZVwiPnt7IHVzZXIubmFtZSB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9iaWxlXCI+e3sgdXNlci5tb2JpbGUgfX08L2Rpdj5cclxuICAgIDwvcm91dGVyLWxpbms+XHJcblxyXG4gICAgPHd2LWZsZXggY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDx3di1mbGV4LWl0ZW0gY2xhc3M9XCJjYXJkLWl0ZW0gYnItMXB4XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbW91bnRcIj4xMTMwPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj7miJHnmoTkvZnpop08L3NwYW4+XHJcbiAgICAgIDwvd3YtZmxleC1pdGVtPlxyXG4gICAgICA8d3YtZmxleC1pdGVtIGNsYXNzPVwiY2FyZC1pdGVtIGJyLTFweFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW1vdW50XCI+MTU8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPuaIkeeahOenr+WIhjwvc3Bhbj5cclxuICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICAgIDx3di1mbGV4LWl0ZW0gY2xhc3M9XCJjYXJkLWl0ZW1cIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImFtb3VudFwiPjA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPuaIkeeahOe6ouWMhTwvc3Bhbj5cclxuICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICA8L3d2LWZsZXg+XHJcblxyXG4gICAgPHd2LWdyb3VwPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuaIkeeahOiuouWNlVwiIGlzLWxpbmsgdG89XCJvcmRlci1saXN0XCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IGljb24tZ29vZHNcIiBzbG90PVwiaWNvblwiPjwvaT5cclxuICAgICAgPC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuaUtui0p+WcsOWdgFwiIGlzLWxpbmsgdG89XCJhZGRyZXNzXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IGljb24tbG9jYXRpb25cIiBzbG90PVwiaWNvblwiPjwvaT5cclxuICAgICAgPC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuaIkeeahOaUtuiXj1wiIGlzLWxpbmsgdG89XCJmYXZvdXJpdGVcIj5cclxuICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnQgaWNvbi1saWtlXCIgc2xvdD1cImljb25cIj48L2k+XHJcbiAgICAgIDwvd3YtY2VsbD5cclxuICAgIDwvd3YtZ3JvdXA+XHJcblxyXG4gICAgPHd2LWdyb3VwPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuS9v+eUqOW4ruWKqVwiIGlzLWxpbmsgdG89XCJoZWxwXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IGljb24tcXVlc3Rpb25cIiBzbG90PVwiaWNvblwiPjwvaT5cclxuICAgICAgPC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuWFs+S6juaIkeS7rFwiIGlzLWxpbmsgdG89XCJhYm91dC11c1wiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udCBpY29uLWluZm9cIiBzbG90PVwiaWNvblwiPjwvaT5cclxuICAgICAgPC93di1jZWxsPlxyXG4gICAgPC93di1ncm91cD5cclxuXHJcbiAgICA8d3YtYnV0dG9uIGNsYXNzPVwiYnRuLWxvZ291dFwiIHR5cGU9XCJ3YXJuXCIgQGNsaWNrLm5hdGl2ZT1cImxvZ291dFwiPumAgOWHuueZu+W9lTwvd3YtYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgYXBwQ29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcjoge31cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5nZXRVc2VyKClcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRVc2VyICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldCgnY3VycmVudC11c2VyJykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXJcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgbG9nb3V0ICgpIHtcclxuICAgICAgICB0aGlzLiRyb290LmNvbmZpcm0oJ+ehruWumumAgOWHuu+8nycsICcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAvLyDmuIXpmaQgand0LXRva2VuXHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKVxyXG4gICAgICAgICAgLy8g55m75b2V54q25oCB6K6+572u5Li65bey57uP55m75b2VXHJcbiAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ1VQREFURV9JU19MT0dJTicsIGZhbHNlKVxyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnJlcGxhY2UoJy8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC51c2VyLXByb2ZpbGUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2OTZjYjtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcblxyXG4gICAgLmF2YXRhciB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgIGhlaWdodDogNzBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNzBweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC51c2VybmFtZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5tb2JpbGUge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5jYXJkIHtcclxuICAgIC5ici0xcHgge1xyXG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWNlY2VjO1xyXG4gICAgfVxyXG5cclxuICAgIC5jYXJkLWl0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgcGFkZGluZzogLjNyZW07XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICAgIC5hbW91bnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGNvbG9yOiAjZjc0YzMxO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubGFiZWwge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuaWNvbiB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgY29sb3I6ICM3Nzc7XHJcbiAgfVxyXG5cclxuICAuY2FyZC1kZW1vLWZsZXgge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcblxyXG4gIC5jYXJkLWRlbW8tY29udGVudDAxIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMDtcclxuICB9XHJcblxyXG4gIC5jYXJkLXBhZGRpbmcge1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICB9XHJcblxyXG4gIC5jYXJkLWRlbW8tZmxleCA+IGRpdiB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtZGVtby1mbGV4IHNwYW4ge1xyXG4gICAgY29sb3I6ICNmNzRjMzE7XHJcbiAgfVxyXG5cclxuICAuYnRuLWxvZ291dCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogMzBweCBhdXRvIDgwcHg7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHVzZXIudnVlP2ViN2FmNmVlIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInVzZXItcHJvZmlsZVwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInRhZ1wiOiBcImRpdlwiLFxuICAgICAgXCJ0b1wiOiBcInByb2ZpbGVcIlxuICAgIH1cbiAgfSwgW19jKCdpbWcnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYXZhdGFyXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3JjXCI6IF92bS51c2VyLmF2YXRhciB8fCAnL2ltZy9hdmF0YXIuanBnJ1xuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidXNlcm5hbWVcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0udXNlci5uYW1lKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJtb2JpbGVcIlxuICB9LCBbX3ZtLl92KF92bS5fcyhfdm0udXNlci5tb2JpbGUpKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di1mbGV4Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIlxuICB9LCBbX2MoJ3d2LWZsZXgtaXRlbScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjYXJkLWl0ZW0gYnItMXB4XCJcbiAgfSwgW19jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImFtb3VudFwiXG4gIH0sIFtfdm0uX3YoXCIxMTMwXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImxhYmVsXCJcbiAgfSwgW192bS5fdihcIuaIkeeahOS9meminVwiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di1mbGV4LWl0ZW0nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY2FyZC1pdGVtIGJyLTFweFwiXG4gIH0sIFtfYygnc3BhbicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJhbW91bnRcIlxuICB9LCBbX3ZtLl92KFwiMTVcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibGFiZWxcIlxuICB9LCBbX3ZtLl92KFwi5oiR55qE56ev5YiGXCIpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LWZsZXgtaXRlbScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjYXJkLWl0ZW1cIlxuICB9LCBbX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCJcbiAgfSwgW192bS5fdihcIjBcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibGFiZWxcIlxuICB9LCBbX3ZtLl92KFwi5oiR55qE57qi5YyFXCIpXSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtZ3JvdXAnLCBbX2MoJ3d2LWNlbGwnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidGl0bGVcIjogXCLmiJHnmoTorqLljZVcIixcbiAgICAgIFwiaXMtbGlua1wiOiBcIlwiLFxuICAgICAgXCJ0b1wiOiBcIm9yZGVyLWxpc3RcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnQgaWNvbi1nb29kc1wiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di1jZWxsJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRpdGxlXCI6IFwi5pS26LSn5Zyw5Z2AXCIsXG4gICAgICBcImlzLWxpbmtcIjogXCJcIixcbiAgICAgIFwidG9cIjogXCJhZGRyZXNzXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24tbG9jYXRpb25cIixcbiAgICBzbG90OiBcImljb25cIlxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtY2VsbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0aXRsZVwiOiBcIuaIkeeahOaUtuiXj1wiLFxuICAgICAgXCJpcy1saW5rXCI6IFwiXCIsXG4gICAgICBcInRvXCI6IFwiZmF2b3VyaXRlXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24tbGlrZVwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0pXSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LWdyb3VwJywgW19jKCd3di1jZWxsJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRpdGxlXCI6IFwi5L2/55So5biu5YqpXCIsXG4gICAgICBcImlzLWxpbmtcIjogXCJcIixcbiAgICAgIFwidG9cIjogXCJoZWxwXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24tcXVlc3Rpb25cIixcbiAgICBzbG90OiBcImljb25cIlxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtY2VsbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0aXRsZVwiOiBcIuWFs+S6juaIkeS7rFwiLFxuICAgICAgXCJpcy1saW5rXCI6IFwiXCIsXG4gICAgICBcInRvXCI6IFwiYWJvdXQtdXNcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnQgaWNvbi1pbmZvXCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSldKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1sb2dvdXRcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwid2FyblwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLmxvZ291dCgkZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi6YCA5Ye655m75b2VXCIpXSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1kMGYzZjkxMFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZDBmM2Y5MTBcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL3VzZXIudnVlXG4vLyBtb2R1bGUgaWQgPSAxOTJcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sInNvdXJjZVJvb3QiOiIifQ==