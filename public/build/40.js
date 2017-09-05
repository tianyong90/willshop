webpackJsonp([40],{

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(267),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b5c2c970",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\dashboard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dashboard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b5c2c970", Component.options)
  } else {
    hotAPI.reload("data-v-b5c2c970", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(265);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("4ff98473", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5c2c970\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dashboard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5c2c970\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.setting-icon[data-v-b5c2c970] {\n  color: #777;\n  cursor: pointer;\n}\n.account-info[data-v-b5c2c970] {\n  padding: 0;\n  margin: 0;\n}\n.account-info li[data-v-b5c2c970] {\n    margin: .5em 0;\n    color: #444;\n}\n.account-info .label[data-v-b5c2c970] {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em;\n}\n.plus-card[data-v-b5c2c970] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative;\n}\n.plus-card i[data-v-b5c2c970] {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/components/dashboard.vue"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,gBAAgB;CAAE;AAEpB;EACE,WAAW;EACX,UAAU;CAAE;AACZ;IACE,eAAe;IACf,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,eAAe;IACf,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,kBAAkB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,SAAS;IACT,UAAU;IACV,oBAAoB;IACpB,qBAAqB;CAAE","file":"dashboard.vue","sourcesContent":[".setting-icon {\n  color: #777;\n  cursor: pointer; }\n\n.account-info {\n  padding: 0;\n  margin: 0; }\n  .account-info li {\n    margin: .5em 0;\n    color: #444; }\n  .account-info .label {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em; }\n\n.plus-card {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative; }\n  .plus-card i {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(262);

var _stringify2 = _interopRequireDefault(_stringify);

var _config = __webpack_require__(125);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      accounts: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.axios.get('account/lists').then(function (response) {
      _this.accounts = response.data.accounts;
      window.localStorage.setItem(_config2.default.accountsKey, (0, _stringify2.default)(response.data.accounts));
    }).catch(function (error) {
      console.log(error);
    });
  },


  methods: {
    toManage: function toManage(id) {
      window.localStorage.setItem('willchat_account_id', id);

      this.$router.push('manage/' + id);
    },
    toEdit: function toEdit(id) {
      this.$router.push('account/edit/' + id);
    }
  }
};

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main main-with-padding"
  }, [_c('el-row', {
    attrs: {
      "gutter": 20,
      "type": "flex",
      "justify": "center"
    }
  }, [_vm._l((_vm.accounts), function(account) {
    return (_vm.accounts.length > 0) ? _c('el-col', {
      key: account.id,
      attrs: {
        "span": 6
      }
    }, [_c('el-card', {
      staticClass: "box-card",
      nativeOn: {
        "click": function($event) {
          _vm.toManage(account.id)
        }
      }
    }, [_c('div', {
      staticClass: "clearfix",
      slot: "header"
    }, [_c('span', {
      staticStyle: {
        "line-height": "36px"
      }
    }, [_vm._v(_vm._s(account.name))]), _vm._v(" "), _c('i', {
      staticClass: "setting-icon el-icon-edit",
      staticStyle: {
        "float": "right"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.toEdit(account.id)
        }
      }
    })]), _vm._v(" "), _c('ul', {
      staticClass: "account-info"
    }, [_c('li', [_c('span', {
      staticClass: "label"
    }, [_vm._v("类型")]), _vm._v(" " + _vm._s(account.type))]), _vm._v(" "), _c('li', [_c('span', {
      staticClass: "label"
    }, [_vm._v("粉丝数")]), _vm._v(" " + _vm._s(account.fans_count))]), _vm._v(" "), _c('li', [_c('span', {
      staticClass: "label"
    }, [_vm._v("添加时间")]), _vm._v(" " + _vm._s(account.created_at))])])])], 1) : _vm._e()
  }), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('router-link', {
    staticClass: "plus-card el-card",
    attrs: {
      "to": "/account/add"
    }
  }, [_c('i', {
    staticClass: "el-icon-plus"
  })])], 1)], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b5c2c970", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLnZ1ZT9jMGYzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQudnVlPzE0ZDIiLCJ3ZWJwYWNrOi8vL2Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZC52dWU/OTRiMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFxTTtBQUNyTTtBQUNBO0FBQ0E7QUFDQSx5QkFBbU87QUFDbk87QUFDQSx5QkFBK0g7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0EscUNBQXdPO0FBQ3hPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSkFBc0osaUZBQWlGO0FBQ3ZPLCtKQUErSixpRkFBaUY7QUFDaFA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0EsMkRBQTRELGdCQUFnQixvQkFBb0IsR0FBRyxrQ0FBa0MsZUFBZSxjQUFjLEdBQUcscUNBQXFDLHFCQUFxQixrQkFBa0IsR0FBRyx5Q0FBeUMsa0JBQWtCLHFCQUFxQixrQkFBa0IsaUJBQWlCLCtCQUErQix3QkFBd0IsR0FBRywrQkFBK0IsbUJBQW1CLHFCQUFxQiwyQkFBMkIsaUJBQWlCLHVCQUF1QixHQUFHLGlDQUFpQyx5QkFBeUIsc0JBQXNCLHVCQUF1QixlQUFlLGdCQUFnQiwwQkFBMEIsMkJBQTJCLEdBQUcsVUFBVSw4SEFBOEgsS0FBSyxVQUFVLFlBQVksS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLEtBQUssTUFBTSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLCtEQUErRCxnQkFBZ0Isb0JBQW9CLEVBQUUsbUJBQW1CLGVBQWUsY0FBYyxFQUFFLHNCQUFzQixxQkFBcUIsa0JBQWtCLEVBQUUsMEJBQTBCLGtCQUFrQixxQkFBcUIsa0JBQWtCLGlCQUFpQiwrQkFBK0Isd0JBQXdCLEVBQUUsZ0JBQWdCLG1CQUFtQixxQkFBcUIsMkJBQTJCLGlCQUFpQix1QkFBdUIsRUFBRSxrQkFBa0IseUJBQXlCLHNCQUFzQix1QkFBdUIsZUFBZSxnQkFBZ0IsMEJBQTBCLDJCQUEyQixFQUFFLHFCQUFxQjs7QUFFLzJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbUJBOzs7Ozs7O3dCQUVBOztnQkFHQTtBQUZBO0FBSUE7O0FBQ0E7OzZEQUNBO3FDQUNBO3VHQUNBOzhCQUNBO2tCQUNBO0FBQ0E7QUFFQTs7OztvQ0FFQTt5REFFQTs7b0NBQ0E7QUFFQTtnQ0FDQTswQ0FDQTtBQUVBO0FBVkE7QUFoQkEsRTs7Ozs7OztBQzNCQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiI0MC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYjVjMmM5NzBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kYXNoYm9hcmQudnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2Rhc2hib2FyZC52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWI1YzJjOTcwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vZGFzaGJvYXJkLnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LWI1YzJjOTcwXCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXGNvbXBvbmVudHNcXFxcZGFzaGJvYXJkLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gZGFzaGJvYXJkLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1iNWMyYzk3MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWI1YzJjOTcwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjQyXG4vLyBtb2R1bGUgY2h1bmtzID0gNDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYjVjMmM5NzBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kYXNoYm9hcmQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI0ZmY5ODQ3M1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iNWMyYzk3MFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2Rhc2hib2FyZC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYjVjMmM5NzBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9kYXNoYm9hcmQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWI1YzJjOTcwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDI2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDQwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5zZXR0aW5nLWljb25bZGF0YS12LWI1YzJjOTcwXSB7XFxuICBjb2xvcjogIzc3NztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmFjY291bnQtaW5mb1tkYXRhLXYtYjVjMmM5NzBdIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcbi5hY2NvdW50LWluZm8gbGlbZGF0YS12LWI1YzJjOTcwXSB7XFxuICAgIG1hcmdpbjogLjVlbSAwO1xcbiAgICBjb2xvcjogIzQ0NDtcXG59XFxuLmFjY291bnQtaW5mbyAubGFiZWxbZGF0YS12LWI1YzJjOTcwXSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiA0ZW07XFxuICAgIHRleHQtYWxpZ24tbGFzdDoganVzdGlmeTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07XFxufVxcbi5wbHVzLWNhcmRbZGF0YS12LWI1YzJjOTcwXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4ucGx1cy1jYXJkIGlbZGF0YS12LWI1YzJjOTcwXSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICBjb2xvcjogbGlnaHRncmF5O1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tdG9wOiAtMS41cmVtO1xcbiAgICBtYXJnaW4tbGVmdDogLTEuNXJlbTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0NBQUU7QUFFcEI7RUFDRSxXQUFXO0VBQ1gsVUFBVTtDQUFFO0FBQ1o7SUFDRSxlQUFlO0lBQ2YsWUFBWTtDQUFFO0FBQ2hCO0lBQ0UsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osV0FBVztJQUNYLHlCQUF5QjtJQUN6QixrQkFBa0I7Q0FBRTtBQUV4QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixtQkFBbUI7Q0FBRTtBQUNyQjtJQUNFLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysb0JBQW9CO0lBQ3BCLHFCQUFxQjtDQUFFXCIsXCJmaWxlXCI6XCJkYXNoYm9hcmQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zZXR0aW5nLWljb24ge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uYWNjb3VudC1pbmZvIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG4gIC5hY2NvdW50LWluZm8gbGkge1xcbiAgICBtYXJnaW46IC41ZW0gMDtcXG4gICAgY29sb3I6ICM0NDQ7IH1cXG4gIC5hY2NvdW50LWluZm8gLmxhYmVsIHtcXG4gICAgY29sb3I6ICMwMDA7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDRlbTtcXG4gICAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDFlbTsgfVxcblxcbi5wbHVzLWNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLnBsdXMtY2FyZCBpIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBmb250LXNpemU6IDNyZW07XFxuICAgIGNvbG9yOiBsaWdodGdyYXk7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIG1hcmdpbi10b3A6IC0xLjVyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAtMS41cmVtOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWI1YzJjOTcwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDI2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDQwIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtYWluIG1haW4td2l0aC1wYWRkaW5nXCI+XHJcbiAgICA8ZWwtcm93IDpndXR0ZXI9XCIyMFwiIHR5cGU9XCJmbGV4XCIganVzdGlmeT1cImNlbnRlclwiPlxyXG4gICAgICA8ZWwtY29sIDpzcGFuPVwiNlwiIHYtZm9yPVwiYWNjb3VudCBpbiBhY2NvdW50c1wiIDprZXk9XCJhY2NvdW50LmlkXCIgdi1pZj1cImFjY291bnRzLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICAgIDxlbC1jYXJkIGNsYXNzPVwiYm94LWNhcmRcIiBAY2xpY2submF0aXZlPVwidG9NYW5hZ2UoYWNjb3VudC5pZClcIj5cclxuICAgICAgICAgICAgPGRpdiBzbG90PVwiaGVhZGVyXCIgY2xhc3M9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwibGluZS1oZWlnaHQ6IDM2cHg7XCI+e3sgYWNjb3VudC5uYW1lIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwic2V0dGluZy1pY29uIGVsLWljb24tZWRpdFwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0O1wiIEBjbGljay5zdG9wLnByZXZlbnQ9XCJ0b0VkaXQoYWNjb3VudC5pZClcIj48L2k+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJhY2NvdW50LWluZm9cIj5cclxuICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPuexu+Weizwvc3Bhbj4ge3sgYWNjb3VudC50eXBlIH19PC9saT5cclxuICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPueyieS4neaVsDwvc3Bhbj4ge3sgYWNjb3VudC5mYW5zX2NvdW50IH19PC9saT5cclxuICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPua3u+WKoOaXtumXtDwvc3Bhbj4ge3sgYWNjb3VudC5jcmVhdGVkX2F0IH19PC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgIDwvZWwtY2FyZD5cclxuICAgICAgPC9lbC1jb2w+XHJcbiAgICAgIDxlbC1jb2wgOnNwYW49XCI2XCI+XHJcbiAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2FjY291bnQvYWRkXCIgY2xhc3M9XCJwbHVzLWNhcmQgZWwtY2FyZFwiPjxpIGNsYXNzPVwiZWwtaWNvbi1wbHVzXCI+PC9pPjwvcm91dGVyLWxpbms+XHJcbiAgICAgIDwvZWwtY29sPlxyXG4gICAgPC9lbC1yb3c+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB1c2VyQ29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFjY291bnRzOiBbXVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5heGlvcy5nZXQoJ2FjY291bnQvbGlzdHMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWNjb3VudHMgPSByZXNwb25zZS5kYXRhLmFjY291bnRzO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1c2VyQ29uZmlnLmFjY291bnRzS2V5LCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhLmFjY291bnRzKSk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICB0b01hbmFnZSAoaWQpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dpbGxjaGF0X2FjY291bnRfaWQnLCBpZCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKGBtYW5hZ2UvJHtpZH1gKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHRvRWRpdCAoaWQpIHtcclxuICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChgYWNjb3VudC9lZGl0LyR7aWR9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC5zZXR0aW5nLWljb24ge1xyXG4gICAgY29sb3I6ICM3Nzc7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuYWNjb3VudC1pbmZvIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDA7XHJcblxyXG4gICAgbGkge1xyXG4gICAgICBtYXJnaW46IC41ZW0gMDtcclxuICAgICAgY29sb3I6ICM0NDQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmxhYmVsIHtcclxuICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6IDRlbTtcclxuICAgICAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDFlbTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLnBsdXMtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgIGkge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGZvbnQtc2l6ZTogM3JlbTtcclxuICAgICAgY29sb3I6IGxpZ2h0Z3JheTtcclxuICAgICAgdG9wOiA1MCU7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgbWFyZ2luLXRvcDogLTEuNXJlbTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC0xLjVyZW07XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZGFzaGJvYXJkLnZ1ZT82ZTI3NzkxZSIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcIm1haW4gbWFpbi13aXRoLXBhZGRpbmdcIlxuICB9LCBbX2MoJ2VsLXJvdycsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJndXR0ZXJcIjogMjAsXG4gICAgICBcInR5cGVcIjogXCJmbGV4XCIsXG4gICAgICBcImp1c3RpZnlcIjogXCJjZW50ZXJcIlxuICAgIH1cbiAgfSwgW192bS5fbCgoX3ZtLmFjY291bnRzKSwgZnVuY3Rpb24oYWNjb3VudCkge1xuICAgIHJldHVybiAoX3ZtLmFjY291bnRzLmxlbmd0aCA+IDApID8gX2MoJ2VsLWNvbCcsIHtcbiAgICAgIGtleTogYWNjb3VudC5pZCxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwic3BhblwiOiA2XG4gICAgICB9XG4gICAgfSwgW19jKCdlbC1jYXJkJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiYm94LWNhcmRcIixcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgX3ZtLnRvTWFuYWdlKGFjY291bnQuaWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBbX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImNsZWFyZml4XCIsXG4gICAgICBzbG90OiBcImhlYWRlclwiXG4gICAgfSwgW19jKCdzcGFuJywge1xuICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgXCJsaW5lLWhlaWdodFwiOiBcIjM2cHhcIlxuICAgICAgfVxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKGFjY291bnQubmFtZSkpXSksIF92bS5fdihcIiBcIiksIF9jKCdpJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwic2V0dGluZy1pY29uIGVsLWljb24tZWRpdFwiLFxuICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgXCJmbG9hdFwiOiBcInJpZ2h0XCJcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdm0udG9FZGl0KGFjY291bnQuaWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndWwnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhY2NvdW50LWluZm9cIlxuICAgIH0sIFtfYygnbGknLCBbX2MoJ3NwYW4nLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJsYWJlbFwiXG4gICAgfSwgW192bS5fdihcIuexu+Wei1wiKV0pLCBfdm0uX3YoXCIgXCIgKyBfdm0uX3MoYWNjb3VudC50eXBlKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2xpJywgW19jKCdzcGFuJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwibGFiZWxcIlxuICAgIH0sIFtfdm0uX3YoXCLnsonkuJ3mlbBcIildKSwgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKGFjY291bnQuZmFuc19jb3VudCkpXSksIF92bS5fdihcIiBcIiksIF9jKCdsaScsIFtfYygnc3BhbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImxhYmVsXCJcbiAgICB9LCBbX3ZtLl92KFwi5re75Yqg5pe26Ze0XCIpXSksIF92bS5fdihcIiBcIiArIF92bS5fcyhhY2NvdW50LmNyZWF0ZWRfYXQpKV0pXSldKV0sIDEpIDogX3ZtLl9lKClcbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1jb2wnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3BhblwiOiA2XG4gICAgfVxuICB9LCBbX2MoJ3JvdXRlci1saW5rJywge1xuICAgIHN0YXRpY0NsYXNzOiBcInBsdXMtY2FyZCBlbC1jYXJkXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvYWNjb3VudC9hZGRcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImVsLWljb24tcGx1c1wiXG4gIH0pXSldLCAxKV0sIDIpXSwgMSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtYjVjMmM5NzBcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWI1YzJjOTcwXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjY3XG4vLyBtb2R1bGUgY2h1bmtzID0gNDAiXSwic291cmNlUm9vdCI6IiJ9