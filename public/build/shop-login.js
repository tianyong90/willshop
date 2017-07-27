webpackJsonp([1],{

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(215)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(218),
  /* template */
  __webpack_require__(219),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3db854e8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\login.vue"
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

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(50)("68fb2366", content, false);
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

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(true);
// imports


// module
exports.push([module.i, "\n.full-bg[data-v-3db854e8] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  background-image: url(" + __webpack_require__(217) + ");\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n}\n.full-bg input[data-v-3db854e8] {\n    display: block;\n    width: 75%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #999;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 5px 0;\n    text-indent: 1em;\n}\n.full-bg input[data-v-3db854e8]:active {\n      outline: none;\n}\n.btn-login[data-v-3db854e8] {\n  display: block;\n  width: 75%;\n  margin-top: 20px;\n}\n.btn-to-register[data-v-3db854e8] {\n  display: block;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/login.vue"],"names":[],"mappings":";AAAA;EACE,cAAc;EACd,uBAAuB;EACvB,wBAAwB;EACxB,oBAAoB;EACpB,aAAa;EACb,cAAc;EACd,gDAAmD;EACnD,uBAAuB;EACvB,mCAAmC;EACnC,6BAA6B;CAAE;AAC/B;IACE,eAAe;IACf,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,2CAA2C;IAC3C,cAAc;IACd,iBAAiB;CAAE;AACnB;MACE,cAAc;CAAE;AAEtB;EACE,eAAe;EACf,WAAW;EACX,iBAAiB;CAAE;AAErB;EACE,eAAe;CAAE","file":"login.vue","sourcesContent":[".full-bg {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  background-image: url(\"../../../img/login-bg.jpg\");\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat; }\n  .full-bg input {\n    display: block;\n    width: 75%;\n    height: 40px;\n    border-radius: 5px;\n    border: 1px solid #999;\n    background-color: rgba(255, 255, 255, 0.5);\n    margin: 5px 0;\n    text-indent: 1em; }\n    .full-bg input:active {\n      outline: none; }\n\n.btn-login {\n  display: block;\n  width: 75%;\n  margin-top: 20px; }\n\n.btn-to-register {\n  display: block; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 217:
/***/ (function(module, exports) {

module.exports = "/build/images/login-bg.jpg?89d0dea495209894eed0c575514e72e1";

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(52);

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
        localStorage.setItem(_config2.default.jwtTokenName, response.data.token);

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

/***/ 219:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzU5OTUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzJkZjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9pbWcvbG9naW4tYmcuanBnIiwid2VicGFjazovLy9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlPzQwNWYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHNEQUF1RCxrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsaUJBQWlCLGtCQUFrQiw0REFBd0UsMkJBQTJCLHVDQUF1QyxpQ0FBaUMsR0FBRyxtQ0FBbUMscUJBQXFCLGlCQUFpQixtQkFBbUIseUJBQXlCLDZCQUE2QixpREFBaUQsb0JBQW9CLHVCQUF1QixHQUFHLDBDQUEwQyxzQkFBc0IsR0FBRywrQkFBK0IsbUJBQW1CLGVBQWUscUJBQXFCLEdBQUcscUNBQXFDLG1CQUFtQixHQUFHLFVBQVUsK0hBQStILEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLEtBQUssTUFBTSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxLQUFLLE1BQU0sVUFBVSxzREFBc0Qsa0JBQWtCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLGlCQUFpQixrQkFBa0IseURBQXlELDJCQUEyQix1Q0FBdUMsaUNBQWlDLEVBQUUsb0JBQW9CLHFCQUFxQixpQkFBaUIsbUJBQW1CLHlCQUF5Qiw2QkFBNkIsaURBQWlELG9CQUFvQix1QkFBdUIsRUFBRSw2QkFBNkIsc0JBQXNCLEVBQUUsZ0JBQWdCLG1CQUFtQixlQUFlLHFCQUFxQixFQUFFLHNCQUFzQixtQkFBbUIsRUFBRSxxQkFBcUI7O0FBRXorRDs7Ozs7Ozs7QUNQQSwrRTs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7Ozs7Ozt3QkFFQTs7O2NBR0E7a0JBR0E7QUFKQTtBQURBO0FBT0E7Ozs7O0FBRUE7OzhEQUVBOzttRUFFQTswRUFHQTs7K0NBRUE7OzRCQUVBOzsrQkFDQTt5RkFHQTs7NkJBQ0E7V0FDQTtnQ0FDQTt5Q0FDQTtBQUNBO0FBRUE7QUF2QkE7QUFWQSxFOzs7Ozs7O0FDZEEsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyRUFBMkUsYUFBYTtBQUN4RjtBQUNBLE9BQU87QUFDUDtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJFQUEyRSxhQUFhO0FBQ3hGO0FBQ0EsT0FBTztBQUNQO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AtbG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNkYjg1NGU4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vbG9naW4udnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2RiODU0ZThcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9sb2dpbi52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi0zZGI4NTRlOFwiLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV19ORzcuMFxcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxzaG9wXFxcXGNvbXBvbmVudHNcXFxcbG9naW4udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBsb2dpbi52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtM2RiODU0ZThcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0zZGI4NTRlOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSAxNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNkYjg1NGU4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbG9naW4udnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2OGZiMjM2NlwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZGI4NTRlOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zZGI4NTRlOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xvZ2luLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0zZGI4NTRlOFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uZnVsbC1iZ1tkYXRhLXYtM2RiODU0ZThdIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHJlcXVpcmUoXCIuLi8uLi8uLi9pbWcvbG9naW4tYmcuanBnXCIpICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cXG4uZnVsbC1iZyBpbnB1dFtkYXRhLXYtM2RiODU0ZThdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiA3NSU7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XFxuICAgIG1hcmdpbjogNXB4IDA7XFxuICAgIHRleHQtaW5kZW50OiAxZW07XFxufVxcbi5mdWxsLWJnIGlucHV0W2RhdGEtdi0zZGI4NTRlOF06YWN0aXZlIHtcXG4gICAgICBvdXRsaW5lOiBub25lO1xcbn1cXG4uYnRuLWxvZ2luW2RhdGEtdi0zZGI4NTRlOF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogNzUlO1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuLmJ0bi10by1yZWdpc3RlcltkYXRhLXYtM2RiODU0ZThdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFdfTkc3LjAvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtFQUN4QixvQkFBb0I7RUFDcEIsYUFBYTtFQUNiLGNBQWM7RUFDZCxnREFBbUQ7RUFDbkQsdUJBQXVCO0VBQ3ZCLG1DQUFtQztFQUNuQyw2QkFBNkI7Q0FBRTtBQUMvQjtJQUNFLGVBQWU7SUFDZixXQUFXO0lBQ1gsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsMkNBQTJDO0lBQzNDLGNBQWM7SUFDZCxpQkFBaUI7Q0FBRTtBQUNuQjtNQUNFLGNBQWM7Q0FBRTtBQUV0QjtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gsaUJBQWlCO0NBQUU7QUFFckI7RUFDRSxlQUFlO0NBQUVcIixcImZpbGVcIjpcImxvZ2luLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuZnVsbC1iZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uLy4uLy4uL2ltZy9sb2dpbi1iZy5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxcbiAgLmZ1bGwtYmcgaW5wdXQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDc1JTtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcXG4gICAgbWFyZ2luOiA1cHggMDtcXG4gICAgdGV4dC1pbmRlbnQ6IDFlbTsgfVxcbiAgICAuZnVsbC1iZyBpbnB1dDphY3RpdmUge1xcbiAgICAgIG91dGxpbmU6IG5vbmU7IH1cXG5cXG4uYnRuLWxvZ2luIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDc1JTtcXG4gIG1hcmdpbi10b3A6IDIwcHg7IH1cXG5cXG4uYnRuLXRvLXJlZ2lzdGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTNkYjg1NGU4XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSAyMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIi9idWlsZC9pbWFnZXMvbG9naW4tYmcuanBnPzg5ZDBkZWE0OTUyMDk4OTRlZWQwYzU3NTUxNGU3MmUxXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ltZy9sb2dpbi1iZy5qcGdcbi8vIG1vZHVsZSBpZCA9IDIxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImZ1bGwtYmdcIj5cclxuICAgIDxpbnB1dCB2LW1vZGVsLnRyaW09XCJ1c2VyLm5hbWVcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeeUqOaIt+WQjVwiIEBrZXl1cC5lbnRlcj1cImxvZ2luXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgdi1tb2RlbC50cmltPVwidXNlci5wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl55m75b2V5a+G56CBXCIgQGtleXVwLmVudGVyPVwibG9naW5cIj5cclxuICAgIDx3di1idXR0b24gY2xhc3M9XCJidG4tbG9naW5cIiB0eXBlPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJsb2dpblwiPueZu+W9lTwvd3YtYnV0dG9uPlxyXG5cclxuICAgIDx3di1idXR0b24gY2xhc3M9XCJidG4tdG8tcmVnaXN0ZXJcIiB0eXBlPVwicHJpbWFyeVwiIHBsYWluIG1pbmkgQGNsaWNrLm5hdGl2ZT1cIiRyb3V0ZXIucHVzaCgnL3JlZ2lzdGVyJylcIj7ms6jlhow8L3d2LWJ1dHRvbj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IGFwcENvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgbG9naW4gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXIubmFtZSA9PT0gJycgfHwgdGhpcy51c2VyLnBhc3N3b3JkID09PSAnJykgcmV0dXJuXHJcblxyXG4gICAgICAgIHRoaXMuYXhpb3MucG9zdCgnbG9naW4nLCB0aGlzLnVzZXIpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgLy8g55m75b2V5oiQ5Yqf5LmL5ZCO5L+d5a2YIEpXVCB0b2tlblxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSwgcmVzcG9uc2UuZGF0YS50b2tlbilcclxuXHJcbiAgICAgICAgICAvLyDnmbvlvZXnirbmgIHorr7nva7kuLrlt7Lnu4/nmbvlvZVcclxuICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnVVBEQVRFX0lTX0xPR0lOJywgdHJ1ZSlcclxuXHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+eZu+W9leaIkOWKnycpXHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWRpcmVjdFBhdGggPSB0aGlzLiRyb3V0ZS5xdWVyeS5yZWRpcmVjdCA/IHRoaXMuJHJvdXRlLnF1ZXJ5LnJlZGlyZWN0IDogJy8nXHJcblxyXG4gICAgICAgICAgICAvLyDnmbvlvZXmiJDlip/lkI7ot7Povazoh7PkuYvliY3mg7PopoHov5vlhaXnmoTpobXpnaJcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2gocmVkaXJlY3RQYXRoKVxyXG4gICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LmVycm9yKGVycm9yLnJlc3BvbnNlLmRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgJGNvbG9yOiByZWQ7XHJcbiAgJGJvcmRlclJhZGl1czogNXB4O1xyXG5cclxuICAuZnVsbC1iZyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uLy4uLy4uL2ltZy9sb2dpbi1iZy5qcGcnKTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogNzUlO1xyXG4gICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6ICRib3JkZXJSYWRpdXM7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgbWFyZ2luOiA1cHggMDtcclxuICAgICAgdGV4dC1pbmRlbnQ6IDFlbTtcclxuXHJcbiAgICAgICY6YWN0aXZlIHtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYnRuLWxvZ2luIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDc1JTtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbiAgfVxyXG5cclxuICAuYnRuLXRvLXJlZ2lzdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxvZ2luLnZ1ZT85ODVkOGFhOCIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImZ1bGwtYmdcIlxuICB9LCBbX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWwudHJpbVwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5uYW1lKSxcbiAgICAgIGV4cHJlc3Npb246IFwidXNlci5uYW1lXCIsXG4gICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgXCJ0cmltXCI6IHRydWVcbiAgICAgIH1cbiAgICB9XSxcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeeUqOaIt+WQjVwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIubmFtZSlcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImtleXVwXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoISgnYnV0dG9uJyBpbiAkZXZlbnQpICYmIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMykpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgX3ZtLmxvZ2luKCRldmVudClcbiAgICAgIH0sXG4gICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIF92bS51c2VyLm5hbWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgfSxcbiAgICAgIFwiYmx1clwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLiRmb3JjZVVwZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2lucHV0Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICByYXdOYW1lOiBcInYtbW9kZWwudHJpbVwiLFxuICAgICAgdmFsdWU6IChfdm0udXNlci5wYXNzd29yZCksXG4gICAgICBleHByZXNzaW9uOiBcInVzZXIucGFzc3dvcmRcIixcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBcInRyaW1cIjogdHJ1ZVxuICAgICAgfVxuICAgIH1dLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwYXNzd29yZFwiLFxuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuivt+i+k+WFpeeZu+W9leWvhueggVwiXG4gICAgfSxcbiAgICBkb21Qcm9wczoge1xuICAgICAgXCJ2YWx1ZVwiOiAoX3ZtLnVzZXIucGFzc3dvcmQpXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJrZXl1cFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSAmJiBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICB9LFxuICAgICAgXCJpbnB1dFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybjsgfVxuICAgICAgICBfdm0udXNlci5wYXNzd29yZCA9ICRldmVudC50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICB9LFxuICAgICAgXCJibHVyXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0uJGZvcmNlVXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1sb2dpblwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCJcbiAgICB9LFxuICAgIG5hdGl2ZU9uOiB7XG4gICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBfdm0ubG9naW4oJGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fdihcIueZu+W9lVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtYnV0dG9uJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImJ0bi10by1yZWdpc3RlclwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCIsXG4gICAgICBcInBsYWluXCI6IFwiXCIsXG4gICAgICBcIm1pbmlcIjogXCJcIlxuICAgIH0sXG4gICAgbmF0aXZlT246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS4kcm91dGVyLnB1c2goJy9yZWdpc3RlcicpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5rOo5YaMXCIpXSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0zZGI4NTRlOFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtM2RiODU0ZThcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=