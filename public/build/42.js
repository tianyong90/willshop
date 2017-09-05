webpackJsonp([42],{

/***/ 339:
/***/ (function(module, exports) {

module.exports = "/build/images/login-bg.jpg?89d0dea495209894eed0c575514e72e1";

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(393)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(395),
  /* template */
  __webpack_require__(396),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0ff4113e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\auth\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ff4113e", Component.options)
  } else {
    hotAPI.reload("data-v-0ff4113e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(394);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("23856d93", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff4113e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0ff4113e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.login[data-v-0ff4113e] {\n  position: fixed;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background-image: url(" + __webpack_require__(339) + ");\n  background-size: cover;\n}\n.login .login-form[data-v-0ff4113e] {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px;\n}\n.login .login-form .title[data-v-0ff4113e] {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei';\n      font-weight: 400;\n      margin-bottom: 1.5em;\n}\n.login .login-form .el-input[data-v-0ff4113e] {\n      display: block;\n      margin: 1rem 0;\n}\n.login .login-form .btn-submit[data-v-0ff4113e] {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/components/auth/login.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,cAAc;EACd,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,wBAAwB;EACxB,oBAAoB;EACpB,gDAAsD;EACtD,uBAAuB;CAAE;AACzB;IACE,eAAe;IACf,aAAa;IACb,qCAAqC;IACrC,cAAc;IACd,oBAAoB;CAAE;AACtB;MACE,YAAY;MACZ,gBAAgB;MAChB,kBAAkB;MAClB,mBAAmB;MACnB,+BAA+B;MAC/B,iBAAiB;MACjB,qBAAqB;CAAE;AACzB;MACE,eAAe;MACf,eAAe;CAAE;AACnB;MACE,eAAe;MACf,iBAAiB;MACjB,YAAY;MACZ,iBAAiB;CAAE","file":"login.vue","sourcesContent":[".login {\n  position: fixed;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background-image: url(\"../../../../img/login-bg.jpg\");\n  background-size: cover; }\n  .login .login-form {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px; }\n    .login .login-form .title {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei';\n      font-weight: 400;\n      margin-bottom: 1.5em; }\n    .login .login-form .el-input {\n      display: block;\n      margin: 1rem 0; }\n    .login .login-form .btn-submit {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _config = __webpack_require__(125);

var _config2 = _interopRequireDefault(_config);

var _vuex = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      formData: {
        name: '',
        password: ''
      }
    };
  },


  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['storeUserToLocal']), {
    login: function login() {
      var _this = this;

      this.axios.post('login', this.formData).then(function (response) {
        localStorage.setItem(_config2.default.jwtTokenKey, response.data.token);

        _this.storeUserToLocal(response.data.user);

        _this.$router.push('/');
      }).catch(function (error) {
        _this.$message({
          message: error.response.data,
          type: 'error'
        });
      });
    }
  })
};

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login"
  }, [_c('div', {
    staticClass: "login-form"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v("Admin")]), _vm._v(" "), _c('el-input', {
    attrs: {
      "type": "text",
      "placeholder": "请输入用户名"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      }
    },
    model: {
      value: (_vm.formData.name),
      callback: function($$v) {
        _vm.formData.name = $$v
      },
      expression: "formData.name"
    }
  }), _vm._v(" "), _c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "请输入登录密码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      }
    },
    model: {
      value: (_vm.formData.password),
      callback: function($$v) {
        _vm.formData.password = $$v
      },
      expression: "formData.password"
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "btn-submit",
    attrs: {
      "type": "primary",
      "disabled": false
    },
    nativeOn: {
      "click": function($event) {
        _vm.login($event)
      }
    }
  }, [_vm._v("登录")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0ff4113e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ltZy9sb2dpbi1iZy5qcGciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2F1dGgvbG9naW4udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9hdXRoL2xvZ2luLnZ1ZT8yMjQwIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9hdXRoL2xvZ2luLnZ1ZT8yZjk1Iiwid2VicGFjazovLy9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2F1dGgvbG9naW4udnVlP2ZhZDMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrRTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3TTtBQUN4TTtBQUNBO0FBQ0E7QUFDQSx5QkFBbU87QUFDbk87QUFDQSx5QkFBa0k7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0EscUNBQThPO0FBQzlPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0SkFBNEosaUZBQWlGO0FBQzdPLHFLQUFxSyxpRkFBaUY7QUFDdFA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esb0RBQXFELG9CQUFvQixrQkFBa0IsWUFBWSxhQUFhLFdBQVcsY0FBYyw0QkFBNEIsd0JBQXdCLDREQUEyRSwyQkFBMkIsR0FBRyx1Q0FBdUMscUJBQXFCLG1CQUFtQiwyQ0FBMkMsb0JBQW9CLDBCQUEwQixHQUFHLDhDQUE4QyxvQkFBb0Isd0JBQXdCLDBCQUEwQiwyQkFBMkIsdUNBQXVDLHlCQUF5Qiw2QkFBNkIsR0FBRyxpREFBaUQsdUJBQXVCLHVCQUF1QixHQUFHLG1EQUFtRCx1QkFBdUIseUJBQXlCLG9CQUFvQix5QkFBeUIsR0FBRyxVQUFVLCtIQUErSCxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsS0FBSyxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLEtBQUssTUFBTSxVQUFVLFlBQVksV0FBVyxZQUFZLG9EQUFvRCxvQkFBb0Isa0JBQWtCLFlBQVksYUFBYSxXQUFXLGNBQWMsNEJBQTRCLHdCQUF3Qiw0REFBNEQsMkJBQTJCLEVBQUUsd0JBQXdCLHFCQUFxQixtQkFBbUIsMkNBQTJDLG9CQUFvQiwwQkFBMEIsRUFBRSxpQ0FBaUMsb0JBQW9CLHdCQUF3QiwwQkFBMEIsMkJBQTJCLHVDQUF1Qyx5QkFBeUIsNkJBQTZCLEVBQUUsb0NBQW9DLHVCQUF1Qix1QkFBdUIsRUFBRSxzQ0FBc0MsdUJBQXVCLHlCQUF5QixvQkFBb0IseUJBQXlCLEVBQUUscUJBQXFCOztBQUV2ekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLQTs7OztBQUdBOzs7Ozt3QkFFQTs7O2NBR0E7a0JBR0E7QUFKQTtBQURBO0FBT0E7OztBQUNBLDREQUNBLENBR0E7O0FBQ0E7O3VFQUNBO3lFQUVBOzs2Q0FFQTs7MkJBQ0E7Z0NBQ0E7O2tDQUVBO2dCQUVBO0FBSEE7QUFJQTtBQUVBOztBQTdCQSxFOzs7Ozs7O0FDaEJBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJFQUEyRSxhQUFhO0FBQ3hGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJFQUEyRSxhQUFhO0FBQ3hGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjQyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIi9idWlsZC9pbWFnZXMvbG9naW4tYmcuanBnPzg5ZDBkZWE0OTUyMDk4OTRlZWQwYzU3NTUxNGU3MmUxXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ltZy9sb2dpbi1iZy5qcGdcbi8vIG1vZHVsZSBpZCA9IDMzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDQgNDIiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTBmZjQxMTNlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vbG9naW4udnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmNDExM2VcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9sb2dpbi52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi0wZmY0MTEzZVwiLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV1xcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxhZG1pblxcXFxjb21wb25lbnRzXFxcXGF1dGhcXFxcbG9naW4udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBsb2dpbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMGZmNDExM2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wZmY0MTEzZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2F1dGgvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSAzNzNcbi8vIG1vZHVsZSBjaHVua3MgPSA0MiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wZmY0MTEzZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMjM4NTZkOTNcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmNDExM2VcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9sb2dpbi52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGZmNDExM2VcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9sb2dpbi52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMGZmNDExM2VcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYXV0aC9sb2dpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDM5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQyIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5sb2dpbltkYXRhLXYtMGZmNDExM2VdIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vLi4vLi4vaW1nL2xvZ2luLWJnLmpwZ1wiKSArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5sb2dpbiAubG9naW4tZm9ybVtkYXRhLXYtMGZmNDExM2VdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAzNjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBwYWRkaW5nOiA0MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm0gLnRpdGxlW2RhdGEtdi0wZmY0MTEzZV0ge1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZm9udC1mYW1pbHk6ICdNaWNyb3NvZnQgWWFoZWknO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMS41ZW07XFxufVxcbi5sb2dpbiAubG9naW4tZm9ybSAuZWwtaW5wdXRbZGF0YS12LTBmZjQxMTNlXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgbWFyZ2luOiAxcmVtIDA7XFxufVxcbi5sb2dpbiAubG9naW4tZm9ybSAuYnRuLXN1Ym1pdFtkYXRhLXYtMGZmNDExM2VdIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIG1hcmdpbi10b3A6IDNyZW07XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQVy92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2F1dGgvbG9naW4udnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsUUFBUTtFQUNSLFNBQVM7RUFDVCxPQUFPO0VBQ1AsVUFBVTtFQUNWLHdCQUF3QjtFQUN4QixvQkFBb0I7RUFDcEIsZ0RBQXNEO0VBQ3RELHVCQUF1QjtDQUFFO0FBQ3pCO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsY0FBYztJQUNkLG9CQUFvQjtDQUFFO0FBQ3RCO01BQ0UsWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsbUJBQW1CO01BQ25CLCtCQUErQjtNQUMvQixpQkFBaUI7TUFDakIscUJBQXFCO0NBQUU7QUFDekI7TUFDRSxlQUFlO01BQ2YsZUFBZTtDQUFFO0FBQ25CO01BQ0UsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osaUJBQWlCO0NBQUVcIixcImZpbGVcIjpcImxvZ2luLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubG9naW4ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vLi4vLi4vLi4vaW1nL2xvZ2luLWJnLmpwZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgfVxcbiAgLmxvZ2luIC5sb2dpbi1mb3JtIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAzNjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBwYWRkaW5nOiA0MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4OyB9XFxuICAgIC5sb2dpbiAubG9naW4tZm9ybSAudGl0bGUge1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgICBsaW5lLWhlaWdodDogMnJlbTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZm9udC1mYW1pbHk6ICdNaWNyb3NvZnQgWWFoZWknO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMS41ZW07IH1cXG4gICAgLmxvZ2luIC5sb2dpbi1mb3JtIC5lbC1pbnB1dCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgbWFyZ2luOiAxcmVtIDA7IH1cXG4gICAgLmxvZ2luIC5sb2dpbi1mb3JtIC5idG4tc3VibWl0IHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIG1hcmdpbi10b3A6IDNyZW07IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtMGZmNDExM2VcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYXV0aC9sb2dpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDM5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDQyIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJsb2dpblwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5BZG1pbjwvaDE+XHJcbiAgICAgIDxlbC1pbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl55So5oi35ZCNXCIgdi1tb2RlbD1cImZvcm1EYXRhLm5hbWVcIiBAa2V5dXAubmF0aXZlLmVudGVyPVwibG9naW5cIj48L2VsLWlucHV0PlxyXG4gICAgICA8ZWwtaW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXnmbvlvZXlr4bnoIFcIiB2LW1vZGVsPVwiZm9ybURhdGEucGFzc3dvcmRcIiBAa2V5dXAubmF0aXZlLmVudGVyPVwibG9naW5cIj48L2VsLWlucHV0PlxyXG4gICAgICA8ZWwtYnV0dG9uIGNsYXNzPVwiYnRuLXN1Ym1pdFwiIHR5cGU9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImxvZ2luXCIgOmRpc2FibGVkPVwiZmFsc2VcIj7nmbvlvZU8L2VsLWJ1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgdXNlckNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xyXG4gIGltcG9ydCB7bWFwQWN0aW9uc30gZnJvbSAndnVleCc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgIHBhc3N3b3JkOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIC4uLm1hcEFjdGlvbnMoW1xyXG4gICAgICAgICdzdG9yZVVzZXJUb0xvY2FsJ1xyXG4gICAgICBdKSxcclxuXHJcbiAgICAgIGxvZ2luICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ2xvZ2luJywgdGhpcy5mb3JtRGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHVzZXJDb25maWcuand0VG9rZW5LZXksIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xyXG5cclxuICAgICAgICAgIHRoaXMuc3RvcmVVc2VyVG9Mb2NhbChyZXNwb25zZS5kYXRhLnVzZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IucmVzcG9uc2UuZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLmxvZ2luIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi9pbWcvbG9naW4tYmcuanBnXCIpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuXHJcbiAgICAubG9naW4tZm9ybSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogMzYwcHg7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgLjYpO1xyXG4gICAgICBwYWRkaW5nOiA0MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG5cclxuICAgICAgLnRpdGxlIHtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnTWljcm9zb2Z0IFlhaGVpJztcclxuICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEuNWVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZWwtaW5wdXQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG1hcmdpbjogMXJlbSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuYnRuLXN1Ym1pdCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBtYXJnaW4tdG9wOiAzcmVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbG9naW4udnVlPzAwMDEwNmYxIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibG9naW5cIlxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJsb2dpbi1mb3JtXCJcbiAgfSwgW19jKCdoMScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJ0aXRsZVwiXG4gIH0sIFtfdm0uX3YoXCJBZG1pblwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtaW5wdXQnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRcIixcbiAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLor7fovpPlhaXnlKjmiLflkI1cIlxuICAgIH0sXG4gICAgbmF0aXZlT246IHtcbiAgICAgIFwia2V5dXBcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIGlmICghKCdidXR0b24nIGluICRldmVudCkgJiYgX3ZtLl9rKCRldmVudC5rZXlDb2RlLCBcImVudGVyXCIsIDEzKSkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICBfdm0ubG9naW4oJGV2ZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgIHZhbHVlOiAoX3ZtLmZvcm1EYXRhLm5hbWUpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uZm9ybURhdGEubmFtZSA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwiZm9ybURhdGEubmFtZVwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWlucHV0Jywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwYXNzd29yZFwiLFxuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeeZu+W9leWvhueggVwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJrZXl1cFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSAmJiBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uZm9ybURhdGEucGFzc3dvcmQpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uZm9ybURhdGEucGFzc3dvcmQgPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcImZvcm1EYXRhLnBhc3N3b3JkXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1zdWJtaXRcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwicHJpbWFyeVwiLFxuICAgICAgXCJkaXNhYmxlZFwiOiBmYWxzZVxuICAgIH0sXG4gICAgbmF0aXZlT246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi55m75b2VXCIpXSldLCAxKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTBmZjQxMTNlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wZmY0MTEzZVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2F1dGgvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSAzOTZcbi8vIG1vZHVsZSBjaHVua3MgPSA0MiJdLCJzb3VyY2VSb290IjoiIn0=