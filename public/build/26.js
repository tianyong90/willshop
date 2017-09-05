webpackJsonp([26],{

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(449)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(451),
  /* template */
  __webpack_require__(452),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-41a0fc3e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\user\\profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] profile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41a0fc3e", Component.options)
  } else {
    hotAPI.reload("data-v-41a0fc3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(450);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("6d597a50", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41a0fc3e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./profile.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41a0fc3e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./profile.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.avatar[data-v-41a0fc3e] {\n  display: block;\n  width: 250px;\n  height: 250px;\n  overflow: hidden;\n  margin: 0 auto;\n}\n.user-profile[data-v-41a0fc3e] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 20px 25px;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/components/user/profile.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,aAAa;EACb,cAAc;EACd,iBAAiB;EACjB,eAAe;CAAE;AAEnB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,mBAAmB;CAAE","file":"profile.vue","sourcesContent":[".avatar {\n  display: block;\n  width: 250px;\n  height: 250px;\n  overflow: hidden;\n  margin: 0 auto; }\n\n.user-profile {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 20px 25px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {};
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(['user'])),

  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['storeUserToLocal']), {
    save: function save() {
      var _this = this;

      this.axios.post('/user/profile', this.user).then(function (response) {
        _this.storeUserToLocal(response.data.user);

        _this.$root.success('保存成功');
      });
    }
  })
};

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main main-with-padding"
  }, [_c('el-row', {
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('router-link', {
    attrs: {
      "to": "/avatar"
    }
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.user.avatar,
      "alt": ""
    }
  })])], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 16
    }
  }, [_c('div', {
    staticClass: "user-profile"
  }, [_c('el-form', {
    attrs: {
      "label-position": "top",
      "label-width": "120px",
      "model": _vm.user
    }
  }, [_c('el-row', {
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名"
    }
  }, [_c('el-input', {
    attrs: {
      "readonly": ""
    },
    model: {
      value: (_vm.user.name),
      callback: function($$v) {
        _vm.user.name = $$v
      },
      expression: "user.name"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "昵称"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.nickname),
      callback: function($$v) {
        _vm.user.nickname = $$v
      },
      expression: "user.nickname"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "Email"
    }
  }, [_c('el-input', {
    attrs: {
      "readonly": ""
    },
    model: {
      value: (_vm.user.email),
      callback: function($$v) {
        _vm.user.email = $$v
      },
      expression: "user.email"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "手机"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.mobile),
      callback: function($$v) {
        _vm.user.mobile = $$v
      },
      expression: "user.mobile"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "QQ"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.qq),
      callback: function($$v) {
        _vm.user.qq = $$v
      },
      expression: "user.qq"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "最后登录时间"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.user.last_login_at),
      callback: function($$v) {
        _vm.user.last_login_at = $$v
      },
      expression: "user.last_login_at"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-row', {
    attrs: {
      "type": "flex",
      "justify": "center"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    nativeOn: {
      "click": function($event) {
        _vm.save($event)
      }
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "default"
    },
    nativeOn: {
      "click": function($event) {
        _vm.$router.back()
      }
    }
  }, [_vm._v("取消")])], 1)], 1)], 1)])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-41a0fc3e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvdXNlci9wcm9maWxlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvdXNlci9wcm9maWxlLnZ1ZT84OTgxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy91c2VyL3Byb2ZpbGUudnVlPzVlNjciLCJ3ZWJwYWNrOi8vL3Byb2ZpbGUudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy91c2VyL3Byb2ZpbGUudnVlPzdiMDMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd007QUFDeE07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQWtJO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUE4TztBQUM5TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEpBQTRKLGlGQUFpRjtBQUM3TyxxS0FBcUssaUZBQWlGO0FBQ3RQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHFEQUFzRCxtQkFBbUIsaUJBQWlCLGtCQUFrQixxQkFBcUIsbUJBQW1CLEdBQUcsa0NBQWtDLG1CQUFtQixxQkFBcUIsMkJBQTJCLHVCQUF1QixHQUFHLFVBQVUsaUlBQWlJLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLHVEQUF1RCxtQkFBbUIsaUJBQWlCLGtCQUFrQixxQkFBcUIsbUJBQW1CLEVBQUUsbUJBQW1CLG1CQUFtQixxQkFBcUIsMkJBQTJCLHVCQUF1QixFQUFFLHFCQUFxQjs7QUFFanpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDa0RBOzs7Ozt3QkFFQTtXQUVBO0FBRUE7OztBQUNBLDZEQUNBLENBSUE7O0FBQ0EsNERBQ0EsQ0FHQTs7QUFDQTs7MkVBQ0E7NkNBRUE7OzRCQUNBO0FBQ0E7QUFFQTs7QUF4QkEsRTs7Ozs7OztBQzFEQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQxYTBmYzNlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vcHJvZmlsZS52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vcHJvZmlsZS52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTQxYTBmYzNlXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcHJvZmlsZS52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi00MWEwZmMzZVwiLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV1xcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxhZG1pblxcXFxjb21wb25lbnRzXFxcXHVzZXJcXFxccHJvZmlsZS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIHByb2ZpbGUudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTQxYTBmYzNlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNDFhMGZjM2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy91c2VyL3Byb2ZpbGUudnVlXG4vLyBtb2R1bGUgaWQgPSAzODZcbi8vIG1vZHVsZSBjaHVua3MgPSAyNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MWEwZmMzZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2ZpbGUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2ZDU5N2E1MFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00MWEwZmMzZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2ZpbGUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQxYTBmYzNlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcHJvZmlsZS52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDFhMGZjM2VcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvdXNlci9wcm9maWxlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmF2YXRhcltkYXRhLXYtNDFhMGZjM2VdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuLnVzZXItcHJvZmlsZVtkYXRhLXYtNDFhMGZjM2VdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAyMHB4IDI1cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQVy92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3VzZXIvcHJvZmlsZS52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGVBQWU7Q0FBRTtBQUVuQjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtDQUFFXCIsXCJmaWxlXCI6XCJwcm9maWxlLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuYXZhdGFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgaGVpZ2h0OiAyNTBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDAgYXV0bzsgfVxcblxcbi51c2VyLXByb2ZpbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDIwcHggMjVweDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00MWEwZmMzZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy91c2VyL3Byb2ZpbGUudnVlXG4vLyBtb2R1bGUgaWQgPSA0NTBcbi8vIG1vZHVsZSBjaHVua3MgPSAyNiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWFpbiBtYWluLXdpdGgtcGFkZGluZ1wiPlxyXG4gICAgPGVsLXJvdyA6Z3V0dGVyPVwiMjBcIj5cclxuICAgICAgPGVsLWNvbCA6c3Bhbj1cIjhcIj5cclxuICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvYXZhdGFyXCI+XHJcbiAgICAgICAgICA8aW1nIDpzcmM9XCJ1c2VyLmF2YXRhclwiIGNsYXNzPVwiYXZhdGFyXCIgYWx0PVwiXCIvPlxyXG4gICAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgIDwvZWwtY29sPlxyXG4gICAgICA8ZWwtY29sIDpzcGFuPVwiMTZcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1wcm9maWxlXCI+XHJcbiAgICAgICAgICA8ZWwtZm9ybSBsYWJlbC1wb3NpdGlvbj1cInRvcFwiIGxhYmVsLXdpZHRoPVwiMTIwcHhcIiA6bW9kZWw9XCJ1c2VyXCI+XHJcbiAgICAgICAgICAgIDxlbC1yb3cgOmd1dHRlcj1cIjIwXCI+XHJcbiAgICAgICAgICAgICAgPGVsLWNvbCA6c3Bhbj1cIjEyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwi55So5oi35ZCNXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwidXNlci5uYW1lXCIgcmVhZG9ubHk+PC9lbC1pbnB1dD5cclxuICAgICAgICAgICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgICAgIDwvZWwtY29sPlxyXG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuaYteensFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZWwtaW5wdXQgdi1tb2RlbD1cInVzZXIubmlja25hbWVcIj48L2VsLWlucHV0PlxyXG4gICAgICAgICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICAgICAgPC9lbC1jb2w+XHJcbiAgICAgICAgICAgICAgPGVsLWNvbCA6c3Bhbj1cIjEyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwiRW1haWxcIj5cclxuICAgICAgICAgICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJ1c2VyLmVtYWlsXCIgcmVhZG9ubHk+PC9lbC1pbnB1dD5cclxuICAgICAgICAgICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgICAgIDwvZWwtY29sPlxyXG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuaJi+aculwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZWwtaW5wdXQgdi1tb2RlbD1cInVzZXIubW9iaWxlXCI+PC9lbC1pbnB1dD5cclxuICAgICAgICAgICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgICAgIDwvZWwtY29sPlxyXG4gICAgICAgICAgICAgIDxlbC1jb2wgOnNwYW49XCIxMlwiPlxyXG4gICAgICAgICAgICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIlFRXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwidXNlci5xcVwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgICAgICAgICA8L2VsLWNvbD5cclxuICAgICAgICAgICAgICA8ZWwtY29sIDpzcGFuPVwiMTJcIj5cclxuICAgICAgICAgICAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLmnIDlkI7nmbvlvZXml7bpl7RcIj5cclxuICAgICAgICAgICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJ1c2VyLmxhc3RfbG9naW5fYXRcIj48L2VsLWlucHV0PlxyXG4gICAgICAgICAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICAgICAgPC9lbC1jb2w+XHJcbiAgICAgICAgICAgIDwvZWwtcm93PlxyXG4gICAgICAgICAgICA8ZWwtcm93IHR5cGU9XCJmbGV4XCIganVzdGlmeT1cImNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJzYXZlXCI+5L+d5a2YPC9lbC1idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJkZWZhdWx0XCIgQGNsaWNrLm5hdGl2ZT1cIiRyb3V0ZXIuYmFjaygpXCI+5Y+W5raIPC9lbC1idXR0b24+XHJcbiAgICAgICAgICAgIDwvZWwtcm93PlxyXG4gICAgICAgICAgPC9lbC1mb3JtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2VsLWNvbD5cclxuICAgIDwvZWwtcm93PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQge21hcEdldHRlcnMsIG1hcEFjdGlvbnN9IGZyb20gJ3Z1ZXgnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgLi4ubWFwR2V0dGVycyhbXHJcbiAgICAgICAgJ3VzZXInXHJcbiAgICAgIF0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgLi4ubWFwQWN0aW9ucyhbXHJcbiAgICAgICAgJ3N0b3JlVXNlclRvTG9jYWwnXHJcbiAgICAgIF0pLFxyXG5cclxuICAgICAgc2F2ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCcvdXNlci9wcm9maWxlJywgdGhpcy51c2VyKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuc3RvcmVVc2VyVG9Mb2NhbChyZXNwb25zZS5kYXRhLnVzZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuJHJvb3Quc3VjY2Vzcygn5L+d5a2Y5oiQ5YqfJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC5hdmF0YXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICBoZWlnaHQ6IDI1MHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gIH1cclxuICBcclxuICAudXNlci1wcm9maWxlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDI1cHg7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcHJvZmlsZS52dWU/MjVhYzc0ZTIiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJtYWluIG1haW4td2l0aC1wYWRkaW5nXCJcbiAgfSwgW19jKCdlbC1yb3cnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiZ3V0dGVyXCI6IDIwXG4gICAgfVxuICB9LCBbX2MoJ2VsLWNvbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJzcGFuXCI6IDhcbiAgICB9XG4gIH0sIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvYXZhdGFyXCJcbiAgICB9XG4gIH0sIFtfYygnaW1nJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImF2YXRhclwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInNyY1wiOiBfdm0udXNlci5hdmF0YXIsXG4gICAgICBcImFsdFwiOiBcIlwiXG4gICAgfVxuICB9KV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1jb2wnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3BhblwiOiAxNlxuICAgIH1cbiAgfSwgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidXNlci1wcm9maWxlXCJcbiAgfSwgW19jKCdlbC1mb3JtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsLXBvc2l0aW9uXCI6IFwidG9wXCIsXG4gICAgICBcImxhYmVsLXdpZHRoXCI6IFwiMTIwcHhcIixcbiAgICAgIFwibW9kZWxcIjogX3ZtLnVzZXJcbiAgICB9XG4gIH0sIFtfYygnZWwtcm93Jywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImd1dHRlclwiOiAyMFxuICAgIH1cbiAgfSwgW19jKCdlbC1jb2wnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3BhblwiOiAxMlxuICAgIH1cbiAgfSwgW19jKCdlbC1mb3JtLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCLnlKjmiLflkI1cIlxuICAgIH1cbiAgfSwgW19jKCdlbC1pbnB1dCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJyZWFkb25seVwiOiBcIlwiXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0udXNlci5uYW1lKSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgX3ZtLnVzZXIubmFtZSA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5uYW1lXCJcbiAgICB9XG4gIH0pXSwgMSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWNvbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJzcGFuXCI6IDEyXG4gICAgfVxuICB9LCBbX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuaYteensFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS51c2VyLm5pY2tuYW1lKSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgX3ZtLnVzZXIubmlja25hbWUgPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcInVzZXIubmlja25hbWVcIlxuICAgIH1cbiAgfSldLCAxKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtY29sJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInNwYW5cIjogMTJcbiAgICB9XG4gIH0sIFtfYygnZWwtZm9ybS1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwiRW1haWxcIlxuICAgIH1cbiAgfSwgW19jKCdlbC1pbnB1dCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJyZWFkb25seVwiOiBcIlwiXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0udXNlci5lbWFpbCksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS51c2VyLmVtYWlsID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLmVtYWlsXCJcbiAgICB9XG4gIH0pXSwgMSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWNvbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJzcGFuXCI6IDEyXG4gICAgfVxuICB9LCBbX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuaJi+aculwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS51c2VyLm1vYmlsZSksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS51c2VyLm1vYmlsZSA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5tb2JpbGVcIlxuICAgIH1cbiAgfSldLCAxKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtY29sJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInNwYW5cIjogMTJcbiAgICB9XG4gIH0sIFtfYygnZWwtZm9ybS1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwiUVFcIlxuICAgIH1cbiAgfSwgW19jKCdlbC1pbnB1dCcsIHtcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0udXNlci5xcSksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS51c2VyLnFxID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLnFxXCJcbiAgICB9XG4gIH0pXSwgMSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWNvbCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJzcGFuXCI6IDEyXG4gICAgfVxuICB9LCBbX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuacgOWQjueZu+W9leaXtumXtFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS51c2VyLmxhc3RfbG9naW5fYXQpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0udXNlci5sYXN0X2xvZ2luX2F0ID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLmxhc3RfbG9naW5fYXRcIlxuICAgIH1cbiAgfSldLCAxKV0sIDEpXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1yb3cnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcImZsZXhcIixcbiAgICAgIFwianVzdGlmeVwiOiBcImNlbnRlclwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWJ1dHRvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwicHJpbWFyeVwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLnNhdmUoJGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fdihcIuS/neWtmFwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJkZWZhdWx0XCJcbiAgICB9LFxuICAgIG5hdGl2ZU9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uJHJvdXRlci5iYWNrKClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLlj5bmtohcIildKV0sIDEpXSwgMSldLCAxKV0pXSwgMSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00MWEwZmMzZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNDFhMGZjM2VcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy91c2VyL3Byb2ZpbGUudnVlXG4vLyBtb2R1bGUgaWQgPSA0NTJcbi8vIG1vZHVsZSBjaHVua3MgPSAyNiJdLCJzb3VyY2VSb290IjoiIn0=