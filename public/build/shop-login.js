webpackJsonp([4],{

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(337)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(340),
  /* template */
  __webpack_require__(341),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3db854e8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3db854e8", Component.options)
  } else {
    hotAPI.reload("data-v-3db854e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(338);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("68fb2366", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3db854e8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3db854e8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.full-bg[data-v-3db854e8] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  background-image: url(" + __webpack_require__(339) + ");\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.full-bg input[data-v-3db854e8] {\n    display: block;\n    width: 75%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #999;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 5px 0;\n    text-indent: 1em;\n}\n.full-bg input[data-v-3db854e8]:active {\n      outline: none;\n}\n.btn-login[data-v-3db854e8] {\n  display: block;\n  width: 75%;\n  margin-top: 20px;\n}\n.btn-to-register[data-v-3db854e8] {\n  display: block;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/login.vue"],"names":[],"mappings":";AAAA;EACE,cAAc;EACd,uBAAuB;EACvB,wBAAwB;EACxB,oBAAoB;EACpB,aAAa;EACb,cAAc;EACd,gDAAmD;EACnD,uBAAuB;EACvB,mCAAmC;EACnC,6BAA6B;CAAE;AAC/B;IACE,eAAe;IACf,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,2CAA2C;IAC3C,cAAc;IACd,iBAAiB;CAAE;AACnB;MACE,cAAc;CAAE;AAEtB;EACE,eAAe;EACf,WAAW;EACX,iBAAiB;CAAE;AAErB;EACE,eAAe;CAAE","file":"login.vue","sourcesContent":[".full-bg {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  background-image: url(\"../../../img/login-bg.jpg\");\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat; }\n  .full-bg input {\n    display: block;\n    width: 75%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #999;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 5px 0;\n    text-indent: 1em; }\n    .full-bg input:active {\n      outline: none; }\n\n.btn-login {\n  display: block;\n  width: 75%;\n  margin-top: 20px; }\n\n.btn-to-register {\n  display: block; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 339:
/***/ (function(module, exports) {

module.exports = "/build/images/login-bg.jpg?89d0dea495209894eed0c575514e72e1";

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(124);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      user: {
        name: '',
        password: ''
      }
    };
  },


  methods: {
    login: function login() {
      var _this = this;

      if (this.user.name === '' || this.user.password === '') return;

      this.axios.post('login', this.user).then(function (response) {
        console.log(response);

        localStorage.setItem(_config2.default.jwtTokenName, response.data.access_token);

        _this.$store.commit('UPDATE_IS_LOGIN', true);

        _this.$root.success('登录成功');

        setTimeout(function () {
          var redirectPath = _this.$route.query.redirect ? _this.$route.query.redirect : '/';

          _this.$router.push(redirectPath);
        }, 1000);
      }).catch(function (error) {
        _this.$root.error(error.response.data);
      });
    }
  }
};

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "full-bg"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.user.name),
      expression: "user.name",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "placeholder": "请输入用户名"
    },
    domProps: {
      "value": (_vm.user.name)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.user.password),
      expression: "user.password",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "password",
      "placeholder": "请输入登录密码"
    },
    domProps: {
      "value": (_vm.user.password)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.login($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('wv-button', {
    staticClass: "btn-login",
    attrs: {
      "type": "primary"
    },
    nativeOn: {
      "click": function($event) {
        _vm.login($event)
      }
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('wv-button', {
    staticClass: "btn-to-register",
    attrs: {
      "type": "primary",
      "plain": "",
      "mini": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.$router.push('/register')
      }
    }
  }, [_vm._v("注册")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3db854e8", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzU5OTUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzJkZjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9pbWcvbG9naW4tYmcuanBnIiwid2VicGFjazovLy9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzQwNWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHNEQUF1RCxrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsaUJBQWlCLGtCQUFrQiw0REFBd0UsMkJBQTJCLHVDQUF1QyxpQ0FBaUMsR0FBRyxtQ0FBbUMscUJBQXFCLGlCQUFpQixtQkFBbUIseUJBQXlCLDZCQUE2QixpREFBaUQsb0JBQW9CLHVCQUF1QixHQUFHLDBDQUEwQyxzQkFBc0IsR0FBRywrQkFBK0IsbUJBQW1CLGVBQWUscUJBQXFCLEdBQUcscUNBQXFDLG1CQUFtQixHQUFHLFVBQVUseUhBQXlILEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLEtBQUssTUFBTSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxLQUFLLE1BQU0sVUFBVSxzREFBc0Qsa0JBQWtCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLGlCQUFpQixrQkFBa0IseURBQXlELDJCQUEyQix1Q0FBdUMsaUNBQWlDLEVBQUUsb0JBQW9CLHFCQUFxQixpQkFBaUIsbUJBQW1CLHlCQUF5Qiw2QkFBNkIsaURBQWlELG9CQUFvQix1QkFBdUIsRUFBRSw2QkFBNkIsc0JBQXNCLEVBQUUsZ0JBQWdCLG1CQUFtQixlQUFlLHFCQUFxQixFQUFFLHNCQUFzQixtQkFBbUIsRUFBRSxxQkFBcUI7O0FBRW4rRDs7Ozs7Ozs7QUNQQSwrRTs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozt3QkFFQTs7O2NBR0E7a0JBR0E7QUFKQTtBQURBO0FBT0E7Ozs7O0FBRUE7OzhEQUVBOzttRUFDQTtvQkFHQTs7MEVBR0E7OytDQUVBOzs0QkFFQTs7K0JBQ0E7eUZBR0E7OzZCQUNBO1dBQ0E7Z0NBQ0E7eUNBQ0E7QUFDQTtBQUVBO0FBekJBO0FBVkEsRTs7Ozs7OztBQ2RBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkVBQTJFLGFBQWE7QUFDeEY7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyRUFBMkUsYUFBYTtBQUN4RjtBQUNBLE9BQU87QUFDUDtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJzaG9wLWxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZGI4NTRlOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9sb2dpbi52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTNkYjg1NGU4XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbG9naW4udnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtM2RiODU0ZThcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXGxvZ2luLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gbG9naW4udnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTNkYjg1NGU4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtM2RiODU0ZThcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjU4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZGI4NTRlOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiNjhmYjIzNjZcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2RiODU0ZThcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9sb2dpbi52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2RiODU0ZThcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9sb2dpbi52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtM2RiODU0ZThcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9sb2dpbi52dWVcbi8vIG1vZHVsZSBpZCA9IDMzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmZ1bGwtYmdbZGF0YS12LTNkYjg1NGU4XSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vLi4vLi4vaW1nL2xvZ2luLWJnLmpwZ1wiKSArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG59XFxuLmZ1bGwtYmcgaW5wdXRbZGF0YS12LTNkYjg1NGU4XSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogNzUlO1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk5OTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcbiAgICBtYXJnaW46IDVweCAwO1xcbiAgICB0ZXh0LWluZGVudDogMWVtO1xcbn1cXG4uZnVsbC1iZyBpbnB1dFtkYXRhLXYtM2RiODU0ZThdOmFjdGl2ZSB7XFxuICAgICAgb3V0bGluZTogbm9uZTtcXG59XFxuLmJ0bi1sb2dpbltkYXRhLXYtM2RiODU0ZThdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDc1JTtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcbi5idG4tdG8tcmVnaXN0ZXJbZGF0YS12LTNkYjg1NGU4XSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9sb2dpbi52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsY0FBYztFQUNkLHVCQUF1QjtFQUN2Qix3QkFBd0I7RUFDeEIsb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixjQUFjO0VBQ2QsZ0RBQW1EO0VBQ25ELHVCQUF1QjtFQUN2QixtQ0FBbUM7RUFDbkMsNkJBQTZCO0NBQUU7QUFDL0I7SUFDRSxlQUFlO0lBQ2YsV0FBVztJQUNYLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLDJDQUEyQztJQUMzQyxjQUFjO0lBQ2QsaUJBQWlCO0NBQUU7QUFDbkI7TUFDRSxjQUFjO0NBQUU7QUFFdEI7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLGlCQUFpQjtDQUFFO0FBRXJCO0VBQ0UsZUFBZTtDQUFFXCIsXCJmaWxlXCI6XCJsb2dpbi52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmZ1bGwtYmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi8uLi8uLi9pbWcvbG9naW4tYmcuanBnXFxcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cXG4gIC5mdWxsLWJnIGlucHV0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA3NSU7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XFxuICAgIG1hcmdpbjogNXB4IDA7XFxuICAgIHRleHQtaW5kZW50OiAxZW07IH1cXG4gICAgLmZ1bGwtYmcgaW5wdXQ6YWN0aXZlIHtcXG4gICAgICBvdXRsaW5lOiBub25lOyB9XFxuXFxuLmJ0bi1sb2dpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiA3NSU7XFxuICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuXFxuLmJ0bi10by1yZWdpc3RlciB7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zZGI4NTRlOFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzM4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvaW1hZ2VzL2xvZ2luLWJnLmpwZz84OWQwZGVhNDk1MjA5ODk0ZWVkMGM1NzU1MTRlNzJlMVwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9pbWcvbG9naW4tYmcuanBnXG4vLyBtb2R1bGUgaWQgPSAzMzlcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJmdWxsLWJnXCI+XHJcbiAgICA8aW5wdXQgdi1tb2RlbC50cmltPVwidXNlci5uYW1lXCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXnlKjmiLflkI1cIiBAa2V5dXAuZW50ZXI9XCJsb2dpblwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIHYtbW9kZWwudHJpbT1cInVzZXIucGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeeZu+W9leWvhueggVwiIEBrZXl1cC5lbnRlcj1cImxvZ2luXCI+XHJcbiAgICA8d3YtYnV0dG9uIGNsYXNzPVwiYnRuLWxvZ2luXCIgdHlwZT1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwibG9naW5cIj7nmbvlvZU8L3d2LWJ1dHRvbj5cclxuXHJcbiAgICA8d3YtYnV0dG9uIGNsYXNzPVwiYnRuLXRvLXJlZ2lzdGVyXCIgdHlwZT1cInByaW1hcnlcIiBwbGFpbiBtaW5pIEBjbGljay5uYXRpdmU9XCIkcm91dGVyLnB1c2goJy9yZWdpc3RlcicpXCI+5rOo5YaMPC93di1idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBhcHBDb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgIHBhc3N3b3JkOiAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGxvZ2luICgpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VyLm5hbWUgPT09ICcnIHx8IHRoaXMudXNlci5wYXNzd29yZCA9PT0gJycpIHJldHVyblxyXG5cclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ2xvZ2luJywgdGhpcy51c2VyKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAvLyDnmbvlvZXmiJDlip/kuYvlkI7kv53lrZggYWNjZXNzX3Rva2VuXHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lLCByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbilcclxuXHJcbiAgICAgICAgICAvLyDnmbvlvZXnirbmgIHorr7nva7kuLrlt7Lnu4/nmbvlvZVcclxuICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnVVBEQVRFX0lTX0xPR0lOJywgdHJ1ZSlcclxuXHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+eZu+W9leaIkOWKnycpXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWRpcmVjdFBhdGggPSB0aGlzLiRyb3V0ZS5xdWVyeS5yZWRpcmVjdCA/IHRoaXMuJHJvdXRlLnF1ZXJ5LnJlZGlyZWN0IDogJy8nXHJcblxyXG4gICAgICAgICAgICAvLyDnmbvlvZXmiJDlip/lkI7ot7Povazoh7PkuYvliY3mg7PopoHov5vlhaXnmoTpobXpnaJcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2gocmVkaXJlY3RQYXRoKVxyXG4gICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LmVycm9yKGVycm9yLnJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgJGNvbG9yOiByZWQ7XHJcbiAgJGJvcmRlclJhZGl1czogNXB4O1xyXG5cclxuICAuZnVsbC1iZyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uLy4uLy4uL2ltZy9sb2dpbi1iZy5qcGcnKTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogNzUlO1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXJSYWRpdXM7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgbWFyZ2luOiA1cHggMDtcclxuICAgICAgdGV4dC1pbmRlbnQ6IDFlbTtcclxuXHJcbiAgICAgICY6YWN0aXZlIHtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYnRuLWxvZ2luIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDc1JTtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYnRuLXRvLXJlZ2lzdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxvZ2luLnZ1ZT8yZjljOTg0MiIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImZ1bGwtYmdcIlxuICB9LCBbX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWwudHJpbVwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5uYW1lKSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5uYW1lXCIsXG4gICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgXCJ0cmltXCI6IHRydWVcbiAgICAgIH1cbiAgICB9XSxcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeeUqOaIt+WQjVwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIubmFtZSlcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImtleXVwXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoISgnYnV0dG9uJyBpbiAkZXZlbnQpICYmIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMykpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgX3ZtLmxvZ2luKCRldmVudClcbiAgICAgIH0sXG4gICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIF92bS51c2VyLm5hbWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgfSxcbiAgICAgIFwiYmx1clwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLiRmb3JjZVVwZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWwudHJpbVwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5wYXNzd29yZCksXG4gICAgICBleHByZXNzaW9uOiBcInVzZXIucGFzc3dvcmRcIixcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBcInRyaW1cIjogdHJ1ZVxuICAgICAgfVxuICAgIH1dLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwYXNzd29yZFwiLFxuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeeZu+W9leWvhueggVwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIucGFzc3dvcmQpXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJrZXl1cFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSAmJiBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICB9LFxuICAgICAgXCJpbnB1dFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybjsgfVxuICAgICAgICBfdm0udXNlci5wYXNzd29yZCA9ICRldmVudC50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICB9LFxuICAgICAgXCJibHVyXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uJGZvcmNlVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1sb2dpblwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCJcbiAgICB9LFxuICAgIG5hdGl2ZU9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0ubG9naW4oJGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fdihcIueZu+W9lVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi10by1yZWdpc3RlclwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCIsXG4gICAgICBcInBsYWluXCI6IFwiXCIsXG4gICAgICBcIm1pbmlcIjogXCJcIlxuICAgIH0sXG4gICAgbmF0aXZlT246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS4kcm91dGVyLnB1c2goJy9yZWdpc3RlcicpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5rOo5YaMXCIpXSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0zZGI4NTRlOFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtM2RiODU0ZThcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzQxXG4vLyBtb2R1bGUgY2h1bmtzID0gNCJdLCJzb3VyY2VSb290IjoiIn0=