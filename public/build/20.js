webpackJsonp([20],{

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(634)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(636)
/* template */
var __vue_template__ = __webpack_require__(637)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-703a0d4c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\admin\\pages\\auth\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-703a0d4c", Component.options)
  } else {
    hotAPI.reload("data-v-703a0d4c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(635);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("1e3c8d27", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-703a0d4c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-703a0d4c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.login[data-v-703a0d4c] {\n  position: fixed;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: #324057;\n  background-size: cover;\n}\n.login .login-form[data-v-703a0d4c] {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px;\n}\n.login .login-form .title[data-v-703a0d4c] {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei', sans-serif;\n      font-weight: 400;\n      margin-bottom: 1.5em;\n}\n.login .login-form .el-input[data-v-703a0d4c] {\n      display: block;\n      margin: 1rem 0;\n}\n.login .login-form .btn-submit[data-v-703a0d4c] {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem;\n}\n.icon-wechat-login[data-v-703a0d4c] {\n  display: block;\n  overflow: hidden;\n  text-align: center;\n  margin-top: 20px;\n}\n.icon-wechat-login .iconfont[data-v-703a0d4c] {\n    color: #fff;\n    font-size: 40px;\n    cursor: pointer;\n}\n.icon-wechat-login .iconfont[data-v-703a0d4c]:hover {\n      color: #b3b3b3;\n}\n.qrcode[data-v-703a0d4c] {\n  display: block;\n  margin: 0 auto;\n  width: 300px;\n  height: 300px;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/pages/auth/login.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,cAAc;EACd,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,wBAAwB;EACxB,oBAAoB;EACpB,oBAAoB;EACpB,uBAAuB;CAAE;AACzB;IACE,eAAe;IACf,aAAa;IACb,qCAAqC;IACrC,cAAc;IACd,oBAAoB;CAAE;AACtB;MACE,YAAY;MACZ,gBAAgB;MAChB,kBAAkB;MAClB,mBAAmB;MACnB,2CAA2C;MAC3C,iBAAiB;MACjB,qBAAqB;CAAE;AACzB;MACE,eAAe;MACf,eAAe;CAAE;AACnB;MACE,eAAe;MACf,iBAAiB;MACjB,YAAY;MACZ,iBAAiB;CAAE;AAEzB;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,iBAAiB;CAAE;AACnB;IACE,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;CAAE;AAClB;MACE,eAAe;CAAE;AAEvB;EACE,eAAe;EACf,eAAe;EACf,aAAa;EACb,cAAc;CAAE","file":"login.vue","sourcesContent":[".login {\n  position: fixed;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: #324057;\n  background-size: cover; }\n  .login .login-form {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px; }\n    .login .login-form .title {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei', sans-serif;\n      font-weight: 400;\n      margin-bottom: 1.5em; }\n    .login .login-form .el-input {\n      display: block;\n      margin: 1rem 0; }\n    .login .login-form .btn-submit {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem; }\n\n.icon-wechat-login {\n  display: block;\n  overflow: hidden;\n  text-align: center;\n  margin-top: 20px; }\n  .icon-wechat-login .iconfont {\n    color: #fff;\n    font-size: 40px;\n    cursor: pointer; }\n    .icon-wechat-login .iconfont:hover {\n      color: #b3b3b3; }\n\n.qrcode {\n  display: block;\n  margin: 0 auto;\n  width: 300px;\n  height: 300px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(98);

var _extends3 = _interopRequireDefault(_extends2);

var _config = __webpack_require__(99);

var _config2 = _interopRequireDefault(_config);

var _vuex = __webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

echo.channel('qrcodeLoginChannel').listen('WechatLogin', function (e) {
  console.log(e);
});

exports.default = {
  data: function data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginQrcode: null,
      dialogQrcodeVisible: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (typeof io !== 'undefined') {
      echo.channel('qrcodeLoginChannel').listen('WechatLogin', function (e) {
        _this.$message({
          message: '登录成功',
          type: 'success'
        });

        _this.$router.push('/');
      });
    }
  },


  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['storeUserToLocal']), {
    login: function login() {
      var _this2 = this;

      this.axios.post('login', this.loginForm).then(function (response) {
        console.log(response);

        localStorage.setItem(_config2.default.authTokenKey, response.data.access_token);

        _this2.$router.push('/');
      }).catch(function (error) {
        _this2.$message({
          message: error.response.data,
          type: 'error'
        });
      });
    },
    scanLogin: function scanLogin() {
      var _this3 = this;

      if (this.loginQrcode === null) {
        this.axios.get('login-qrcode').then(function (response) {
          _this3.loginQrcode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + response.data.ticket;
          _this3.dialogQrcodeVisible = true;
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        this.dialogQrcodeVisible = true;
      }
    }
  })
};

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "login" },
    [
      _c(
        "div",
        { staticClass: "login-form" },
        [
          _c("h1", { staticClass: "title" }, [_vm._v("WILLSHOP")]),
          _vm._v(" "),
          _c("el-input", {
            attrs: { type: "text", placeholder: "请输入用户名" },
            nativeOn: {
              keyup: function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13)
                ) {
                  return null
                }
                _vm.login($event)
              }
            },
            model: {
              value: _vm.loginForm.name,
              callback: function($$v) {
                _vm.loginForm.name = $$v
              },
              expression: "loginForm.name"
            }
          }),
          _vm._v(" "),
          _c("el-input", {
            attrs: { type: "password", placeholder: "请输入登录密码" },
            nativeOn: {
              keyup: function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13)
                ) {
                  return null
                }
                _vm.login($event)
              }
            },
            model: {
              value: _vm.loginForm.password,
              callback: function($$v) {
                _vm.loginForm.password = $$v
              },
              expression: "loginForm.password"
            }
          }),
          _vm._v(" "),
          _c(
            "el-button",
            {
              staticClass: "btn-submit",
              attrs: { type: "primary", disabled: false },
              nativeOn: {
                click: function($event) {
                  _vm.login($event)
                }
              }
            },
            [_vm._v("登录")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "icon-wechat-login", on: { click: _vm.scanLogin } },
            [_c("i", { staticClass: "iconfont icon-wechat-circle" })]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "微信扫码登录",
            size: "tiny",
            "modal-append-to-body": false
          },
          model: {
            value: _vm.dialogQrcodeVisible,
            callback: function($$v) {
              _vm.dialogQrcodeVisible = $$v
            },
            expression: "dialogQrcodeVisible"
          }
        },
        [
          _c("img", {
            staticClass: "qrcode",
            attrs: { src: _vm.loginQrcode, alt: "" }
          })
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-703a0d4c", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvYXV0aC9sb2dpbi52dWU/ODVjYiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlP2JiZmYiLCJ3ZWJwYWNrOi8vL2xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlPzE1ZDEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd007QUFDeE07QUFDQTtBQUNBO0FBQ0EsNENBQThVO0FBQzlVO0FBQ0EsOENBQXVKO0FBQ3ZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzNDQTs7QUFFQTtBQUNBLHFDQUE4TztBQUM5TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEpBQTRKLGlGQUFpRjtBQUM3TyxxS0FBcUssaUZBQWlGO0FBQ3RQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLG9EQUFxRCxvQkFBb0Isa0JBQWtCLFlBQVksYUFBYSxXQUFXLGNBQWMsNEJBQTRCLHdCQUF3Qix3QkFBd0IsMkJBQTJCLEdBQUcsdUNBQXVDLHFCQUFxQixtQkFBbUIsMkNBQTJDLG9CQUFvQiwwQkFBMEIsR0FBRyw4Q0FBOEMsb0JBQW9CLHdCQUF3QiwwQkFBMEIsMkJBQTJCLG1EQUFtRCx5QkFBeUIsNkJBQTZCLEdBQUcsaURBQWlELHVCQUF1Qix1QkFBdUIsR0FBRyxtREFBbUQsdUJBQXVCLHlCQUF5QixvQkFBb0IseUJBQXlCLEdBQUcsdUNBQXVDLG1CQUFtQixxQkFBcUIsdUJBQXVCLHFCQUFxQixHQUFHLGlEQUFpRCxrQkFBa0Isc0JBQXNCLHNCQUFzQixHQUFHLHVEQUF1RCx1QkFBdUIsR0FBRyw0QkFBNEIsbUJBQW1CLG1CQUFtQixpQkFBaUIsa0JBQWtCLEdBQUcsVUFBVSwwSEFBMEgsS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsb0RBQW9ELG9CQUFvQixrQkFBa0IsWUFBWSxhQUFhLFdBQVcsY0FBYyw0QkFBNEIsd0JBQXdCLHdCQUF3QiwyQkFBMkIsRUFBRSx3QkFBd0IscUJBQXFCLG1CQUFtQiwyQ0FBMkMsb0JBQW9CLDBCQUEwQixFQUFFLGlDQUFpQyxvQkFBb0Isd0JBQXdCLDBCQUEwQiwyQkFBMkIsbURBQW1ELHlCQUF5Qiw2QkFBNkIsRUFBRSxvQ0FBb0MsdUJBQXVCLHVCQUF1QixFQUFFLHNDQUFzQyx1QkFBdUIseUJBQXlCLG9CQUFvQix5QkFBeUIsRUFBRSx3QkFBd0IsbUJBQW1CLHFCQUFxQix1QkFBdUIscUJBQXFCLEVBQUUsa0NBQWtDLGtCQUFrQixzQkFBc0Isc0JBQXNCLEVBQUUsMENBQTBDLHVCQUF1QixFQUFFLGFBQWEsbUJBQW1CLG1CQUFtQixpQkFBaUIsa0JBQWtCLEVBQUUscUJBQXFCOztBQUV4ckc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNZQTs7OztBQUVBOzs7O3NFQUNBO2NBT0E7QUFFQTs7O3dCQUVBOzs7Y0FHQTtrQkFFQTtBQUhBO21CQUlBOzJCQUVBO0FBUEE7QUFTQTs7QUFDQTs7bUNBQ0E7NEVBQ0E7O21CQUVBO2dCQUdBO0FBSkE7OzJCQUtBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQSw0REFDQSxDQUdBOztBQUNBOzt3RUFDQTtvQkFFQTs7MEVBSUE7OzRCQUNBO2dDQUNBOztrQ0FFQTtnQkFFQTtBQUhBO0FBSUE7QUFFQTs7QUFDQTs7cUNBQ0E7Z0VBQ0E7cUdBQ0E7dUNBQ0E7a0NBQ0E7c0JBQ0E7QUFDQTthQUNBO21DQUNBO0FBQ0E7QUFFQTs7QUEzREEsRTs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLHVCQUF1QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QjtBQUNyQztBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBLG9CQUFvQixzQ0FBc0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0Esb0JBQW9CLDJDQUEyQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsd0NBQXdDLHVCQUF1QixFQUFFO0FBQzlFLHNCQUFzQiw2Q0FBNkM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi03MDNhMGQ0Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsW1xcXCJjb21wb25lbnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOnRydWV9XV1dLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vbG9naW4udnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi03MDNhMGQ0Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTcwM2EwZDRjXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXHBhZ2VzXFxcXGF1dGhcXFxcbG9naW4udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBsb2dpbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNzAzYTBkNGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi03MDNhMGQ0Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzAzYTBkNGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9sb2dpbi52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjFlM2M4ZDI3XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTcwM2EwZDRjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbG9naW4udnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTcwM2EwZDRjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbG9naW4udnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTcwM2EwZDRjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmxvZ2luW2RhdGEtdi03MDNhMGQ0Y10ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMzMjQwNTc7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm1bZGF0YS12LTcwM2EwZDRjXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMzYwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgcGFkZGluZzogNDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuLmxvZ2luIC5sb2dpbi1mb3JtIC50aXRsZVtkYXRhLXYtNzAzYTBkNGNdIHtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDJyZW07XFxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtZmFtaWx5OiAnTWljcm9zb2Z0IFlhaGVpJywgc2Fucy1zZXJpZjtcXG4gICAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDEuNWVtO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm0gLmVsLWlucHV0W2RhdGEtdi03MDNhMGQ0Y10ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm0gLmJ0bi1zdWJtaXRbZGF0YS12LTcwM2EwZDRjXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaWNvbi13ZWNoYXQtbG9naW5bZGF0YS12LTcwM2EwZDRjXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG4uaWNvbi13ZWNoYXQtbG9naW4gLmljb25mb250W2RhdGEtdi03MDNhMGQ0Y10ge1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5pY29uLXdlY2hhdC1sb2dpbiAuaWNvbmZvbnRbZGF0YS12LTcwM2EwZDRjXTpob3ZlciB7XFxuICAgICAgY29sb3I6ICNiM2IzYjM7XFxufVxcbi5xcmNvZGVbZGF0YS12LTcwM2EwZDRjXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsUUFBUTtFQUNSLFNBQVM7RUFDVCxPQUFPO0VBQ1AsVUFBVTtFQUNWLHdCQUF3QjtFQUN4QixvQkFBb0I7RUFDcEIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtDQUFFO0FBQ3pCO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsY0FBYztJQUNkLG9CQUFvQjtDQUFFO0FBQ3RCO01BQ0UsWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsbUJBQW1CO01BQ25CLDJDQUEyQztNQUMzQyxpQkFBaUI7TUFDakIscUJBQXFCO0NBQUU7QUFDekI7TUFDRSxlQUFlO01BQ2YsZUFBZTtDQUFFO0FBQ25CO01BQ0UsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osaUJBQWlCO0NBQUU7QUFFekI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixpQkFBaUI7Q0FBRTtBQUNuQjtJQUNFLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0NBQUU7QUFDbEI7TUFDRSxlQUFlO0NBQUU7QUFFdkI7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLGFBQWE7RUFDYixjQUFjO0NBQUVcIixcImZpbGVcIjpcImxvZ2luLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubG9naW4ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMzMjQwNTc7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyB9XFxuICAubG9naW4gLmxvZ2luLWZvcm0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDM2MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7IH1cXG4gICAgLmxvZ2luIC5sb2dpbi1mb3JtIC50aXRsZSB7XFxuICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgZm9udC1zaXplOiAycmVtO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LWZhbWlseTogJ01pY3Jvc29mdCBZYWhlaScsIHNhbnMtc2VyaWY7XFxuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxLjVlbTsgfVxcbiAgICAubG9naW4gLmxvZ2luLWZvcm0gLmVsLWlucHV0IHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBtYXJnaW46IDFyZW0gMDsgfVxcbiAgICAubG9naW4gLmxvZ2luLWZvcm0gLmJ0bi1zdWJtaXQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWFyZ2luLXRvcDogM3JlbTsgfVxcblxcbi5pY29uLXdlY2hhdC1sb2dpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuICAuaWNvbi13ZWNoYXQtbG9naW4gLmljb25mb250IHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5pY29uLXdlY2hhdC1sb2dpbiAuaWNvbmZvbnQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjYjNiM2IzOyB9XFxuXFxuLnFyY29kZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi03MDNhMGQ0Y1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvYXV0aC9sb2dpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDYzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIwIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJsb2dpblwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5XSUxMU0hPUDwvaDE+XHJcbiAgICAgIDxlbC1pbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl55So5oi35ZCNXCIgdi1tb2RlbD1cImxvZ2luRm9ybS5uYW1lXCIgQGtleXVwLm5hdGl2ZS5lbnRlcj1cImxvZ2luXCI+PC9lbC1pbnB1dD5cclxuICAgICAgPGVsLWlucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl55m75b2V5a+G56CBXCIgdi1tb2RlbD1cImxvZ2luRm9ybS5wYXNzd29yZFwiIEBrZXl1cC5uYXRpdmUuZW50ZXI9XCJsb2dpblwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgIDxlbC1idXR0b24gY2xhc3M9XCJidG4tc3VibWl0XCIgdHlwZT1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwibG9naW5cIiA6ZGlzYWJsZWQ9XCJmYWxzZVwiPueZu+W9lTwvZWwtYnV0dG9uPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImljb24td2VjaGF0LWxvZ2luXCIgQGNsaWNrPVwic2NhbkxvZ2luXCI+PGkgY2xhc3M9XCJpY29uZm9udCBpY29uLXdlY2hhdC1jaXJjbGVcIj48L2k+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZWwtZGlhbG9nIHRpdGxlPVwi5b6u5L+h5omr56CB55m75b2VXCIgc2l6ZT1cInRpbnlcIiA6bW9kYWwtYXBwZW5kLXRvLWJvZHk9XCJmYWxzZVwiIHYtbW9kZWw9XCJkaWFsb2dRcmNvZGVWaXNpYmxlXCI+XHJcbiAgICAgIDxpbWcgOnNyYz1cImxvZ2luUXJjb2RlXCIgYWx0PVwiXCIgY2xhc3M9XCJxcmNvZGVcIi8+XHJcbiAgICA8L2VsLWRpYWxvZz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xyXG4gIGltcG9ydCB7bWFwQWN0aW9uc30gZnJvbSAndnVleCc7XHJcblxyXG4gIGVjaG8uY2hhbm5lbCgncXJjb2RlTG9naW5DaGFubmVsJykubGlzdGVuKCdXZWNoYXRMb2dpbicsIChlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4vLyAgICB0aGlzLiRtZXNzYWdlKHtcclxuLy8gICAgICBtZXNzYWdlOiAn55m75b2V5oiQ5YqfJyxcclxuLy8gICAgICB0eXBlOiAnc3VjY2VzcydcclxuLy8gICAgfSlcclxuLy9cclxuLy8gICAgdGhpcy4kcm91dGVyLnB1c2goJy8nKVxyXG4gIH0pXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvZ2luRm9ybToge1xyXG4gICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICBwYXNzd29yZDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvZ2luUXJjb2RlOiBudWxsLFxyXG4gICAgICAgIGRpYWxvZ1FyY29kZVZpc2libGU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgZWNoby5jaGFubmVsKCdxcmNvZGVMb2dpbkNoYW5uZWwnKS5saXN0ZW4oJ1dlY2hhdExvZ2luJywgKGUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAn55m75b2V5oiQ5YqfJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvJylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgLi4ubWFwQWN0aW9ucyhbXHJcbiAgICAgICAgJ3N0b3JlVXNlclRvTG9jYWwnXHJcbiAgICAgIF0pLFxyXG5cclxuICAgICAgbG9naW4gKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MucG9zdCgnbG9naW4nLCB0aGlzLmxvZ2luRm9ybSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG5cclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNvbmZpZy5hdXRoVG9rZW5LZXksIHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuKTtcclxuXHJcbi8vICAgICAgICAgIHRoaXMuc3RvcmVVc2VyVG9Mb2NhbChyZXNwb25zZS5kYXRhLnVzZXIpO1xyXG5cclxuICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IucmVzcG9uc2UuZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNjYW5Mb2dpbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9naW5RcmNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdsb2dpbi1xcmNvZGUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luUXJjb2RlID0gJ2h0dHBzOi8vbXAud2VpeGluLnFxLmNvbS9jZ2ktYmluL3Nob3dxcmNvZGU/dGlja2V0PScgKyByZXNwb25zZS5kYXRhLnRpY2tldFxyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1FyY29kZVZpc2libGUgPSB0cnVlXHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRpYWxvZ1FyY29kZVZpc2libGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAubG9naW4ge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICMzMjQwNTc7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG5cclxuICAgIC5sb2dpbi1mb3JtIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAzNjBweDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICAgIHBhZGRpbmc6IDQwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblxyXG4gICAgICAudGl0bGUge1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgICAgICBsaW5lLWhlaWdodDogMnJlbTtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdNaWNyb3NvZnQgWWFoZWknLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMS41ZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5lbC1pbnB1dCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5idG4tc3VibWl0IHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDNyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmljb24td2VjaGF0LWxvZ2luIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcblxyXG4gICAgLmljb25mb250IHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgY29sb3I6IGRhcmtlbigjZmZmLCAzMCUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucXJjb2RlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICB3aWR0aDogMzAwcHg7XHJcbiAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxvZ2luLnZ1ZT8zNTcxNjRhZCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImxvZ2luXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJsb2dpbi1mb3JtXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiaDFcIiwgeyBzdGF0aWNDbGFzczogXCJ0aXRsZVwiIH0sIFtfdm0uX3YoXCJXSUxMU0hPUFwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC1pbnB1dFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwi6K+36L6T5YWl55So5oi35ZCNXCIgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGtleXVwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhKFwiYnV0dG9uXCIgaW4gJGV2ZW50KSAmJlxuICAgICAgICAgICAgICAgICAgX3ZtLl9rKCRldmVudC5rZXlDb2RlLCBcImVudGVyXCIsIDEzKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3ZtLmxvZ2luKCRldmVudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0ubG9naW5Gb3JtLm5hbWUsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICBfdm0ubG9naW5Gb3JtLm5hbWUgPSAkJHZcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJsb2dpbkZvcm0ubmFtZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLWlucHV0XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwi6K+36L6T5YWl55m75b2V5a+G56CBXCIgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGtleXVwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhKFwiYnV0dG9uXCIgaW4gJGV2ZW50KSAmJlxuICAgICAgICAgICAgICAgICAgX3ZtLl9rKCRldmVudC5rZXlDb2RlLCBcImVudGVyXCIsIDEzKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3ZtLmxvZ2luKCRldmVudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0ubG9naW5Gb3JtLnBhc3N3b3JkLFxuICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmxvZ2luRm9ybS5wYXNzd29yZCA9ICQkdlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImxvZ2luRm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1zdWJtaXRcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwcmltYXJ5XCIsIGRpc2FibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcIueZu+W9lVwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpY29uLXdlY2hhdC1sb2dpblwiLCBvbjogeyBjbGljazogX3ZtLnNjYW5Mb2dpbiB9IH0sXG4gICAgICAgICAgICBbX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiaWNvbmZvbnQgaWNvbi13ZWNoYXQtY2lyY2xlXCIgfSldXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImVsLWRpYWxvZ1wiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuW+ruS/oeaJq+eggeeZu+W9lVwiLFxuICAgICAgICAgICAgc2l6ZTogXCJ0aW55XCIsXG4gICAgICAgICAgICBcIm1vZGFsLWFwcGVuZC10by1ib2R5XCI6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2dRcmNvZGVWaXNpYmxlLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uZGlhbG9nUXJjb2RlVmlzaWJsZSA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nUXJjb2RlVmlzaWJsZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicXJjb2RlXCIsXG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IF92bS5sb2dpblFyY29kZSwgYWx0OiBcIlwiIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTcwM2EwZDRjXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi03MDNhMGQ0Y1wiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMjAiXSwic291cmNlUm9vdCI6IiJ9