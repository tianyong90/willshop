webpackJsonp([41],{

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(389)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(391),
  /* template */
  __webpack_require__(392),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-23230962",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\account\\form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23230962", Component.options)
  } else {
    hotAPI.reload("data-v-23230962", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(390);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("847d757a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23230962\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-23230962\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./form.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"form.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      account: {
        id: '',
        name: '',
        type: '订阅号',
        app_id: '',
        app_secret: '',
        aes_key: '',
        merchant_id: '',
        merchant_key: '',
        cert_path: '',
        key_path: '',
        remark: ''
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    var accountId = this.$route.params.id;

    if (accountId) {
      this.axios.get('account/show/' + accountId).then(function (response) {
        _this.account = response.data.account;
      });
    }
  },


  computed: {},

  methods: {
    store: function store() {
      var _this2 = this;

      this.axios.post('account/store', this.account).then(function (response) {
        _this2.$message({
          message: '添加成功',
          type: 'success'
        });

        setTimeout(function () {
          _this2.$router.push('/');
        }, 1000);
      });
    }
  },

  watch: {
    'formData.province': function formDataProvince(val, oldVal) {
      this.formData.city = this.cityList[0];
    },

    'formData.city': function formDataCity(val, oldVal) {
      this.formData.area = this.areaList[0];
    }
  }
};

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main main-with-padding"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.account,
      "label-width": "150px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "公众号名称"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.account.name),
      callback: function($$v) {
        _vm.account.name = $$v
      },
      expression: "account.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "类型"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": ""
    },
    model: {
      value: (_vm.account.type),
      callback: function($$v) {
        _vm.account.type = $$v
      },
      expression: "account.type"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "订阅号",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "认证订阅号",
      "value": "2"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "服务号",
      "value": "3"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "认证服务号",
      "value": "4"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "AppId"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.account.app_id),
      callback: function($$v) {
        _vm.account.app_id = $$v
      },
      expression: "account.app_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "AppSecret"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.account.app_secret),
      callback: function($$v) {
        _vm.account.app_secret = $$v
      },
      expression: "account.app_secret"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "AesKey"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.account.aes_key),
      callback: function($$v) {
        _vm.account.aes_key = $$v
      },
      expression: "account.aes_key"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "备注"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.account.remark),
      callback: function($$v) {
        _vm.account.remark = $$v
      },
      expression: "account.remark"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.store
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.$router.back()
      }
    }
  }, [_vm._v("取消")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-23230962", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYWNjb3VudC9mb3JtLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYWNjb3VudC9mb3JtLnZ1ZT80MzQyIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9hY2NvdW50L2Zvcm0udnVlP2Q2Y2MiLCJ3ZWJwYWNrOi8vL2Zvcm0udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9hY2NvdW50L2Zvcm0udnVlPzU5MGIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd007QUFDeE07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQWtJO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUE4TztBQUM5TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEpBQTRKLGlGQUFpRjtBQUM3TyxxS0FBcUssaUZBQWlGO0FBQ3RQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLGlDQUFrQyxvRkFBb0Y7O0FBRXRIOzs7Ozs7Ozs7Ozs7Ozs7d0JDOEJBOzs7WUFHQTtjQUNBO2NBQ0E7Z0JBQ0E7b0JBQ0E7aUJBQ0E7cUJBQ0E7c0JBQ0E7bUJBQ0E7a0JBQ0E7Z0JBR0E7QUFiQTtBQURBO0FBZ0JBOztBQUNBOzt1Q0FFQTs7bUJBQ0E7MkVBQ0E7c0NBQ0E7QUFDQTtBQUNBO0FBRUE7OztZQUVBOzs7O0FBRUE7OzhFQUNBOzttQkFFQTtnQkFHQTtBQUpBOzsrQkFLQTs4QkFDQTtXQUNBO0FBQ0E7QUFHQTtBQWRBOzs7Z0VBaUJBO3lDQUNBO0FBR0E7O3dEQUNBO3lDQUNBO0FBRUE7QUFUQTtBQS9DQSxFOzs7Ozs7O0FDcENBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjQxLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yMzIzMDk2MlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2Zvcm0udnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2Zvcm0udnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yMzIzMDk2MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2Zvcm0udnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtMjMyMzA5NjJcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcYWRtaW5cXFxcY29tcG9uZW50c1xcXFxhY2NvdW50XFxcXGZvcm0udnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBmb3JtLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0yMzIzMDk2MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTIzMjMwOTYyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYWNjb3VudC9mb3JtLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzU3XG4vLyBtb2R1bGUgY2h1bmtzID0gNDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjMyMzA5NjJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9mb3JtLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiODQ3ZDc1N2FcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjMyMzA5NjJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9mb3JtLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yMzIzMDk2MlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2Zvcm0udnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTIzMjMwOTYyXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2FjY291bnQvZm9ybS52dWVcbi8vIG1vZHVsZSBpZCA9IDM4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDQxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiXCIsXCJmaWxlXCI6XCJmb3JtLnZ1ZVwiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTIzMjMwOTYyXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2FjY291bnQvZm9ybS52dWVcbi8vIG1vZHVsZSBpZCA9IDM5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQxIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtYWluIG1haW4td2l0aC1wYWRkaW5nXCI+XHJcbiAgICA8ZWwtZm9ybSByZWY9XCJmb3JtXCIgOm1vZGVsPVwiYWNjb3VudFwiIGxhYmVsLXdpZHRoPVwiMTUwcHhcIj5cclxuICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIuWFrOS8l+WPt+WQjeensFwiPlxyXG4gICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwiYWNjb3VudC5uYW1lXCI+PC9lbC1pbnB1dD5cclxuICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLnsbvlnotcIj5cclxuICAgICAgICA8ZWwtc2VsZWN0IHYtbW9kZWw9XCJhY2NvdW50LnR5cGVcIiBwbGFjZWhvbGRlcj1cIlwiPlxyXG4gICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuiuoumYheWPt1wiIHZhbHVlPVwiMVwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuiupOivgeiuoumYheWPt1wiIHZhbHVlPVwiMlwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuacjeWKoeWPt1wiIHZhbHVlPVwiM1wiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuiupOivgeacjeWKoeWPt1wiIHZhbHVlPVwiNFwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgIDwvZWwtc2VsZWN0PlxyXG4gICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIkFwcElkXCI+XHJcbiAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJhY2NvdW50LmFwcF9pZFwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICA8ZWwtZm9ybS1pdGVtIGxhYmVsPVwiQXBwU2VjcmV0XCI+XHJcbiAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJhY2NvdW50LmFwcF9zZWNyZXRcIj48L2VsLWlucHV0PlxyXG4gICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgPGVsLWZvcm0taXRlbSBsYWJlbD1cIkFlc0tleVwiPlxyXG4gICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwiYWNjb3VudC5hZXNfa2V5XCI+PC9lbC1pbnB1dD5cclxuICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLlpIfms6hcIj5cclxuICAgICAgICA8ZWwtaW5wdXQgdHlwZT1cInRleHRhcmVhXCIgdi1tb2RlbD1cImFjY291bnQucmVtYXJrXCI+PC9lbC1pbnB1dD5cclxuICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDxlbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIEBjbGljaz1cInN0b3JlXCI+5L+d5a2YPC9lbC1idXR0b24+XHJcbiAgICAgICAgPGVsLWJ1dHRvbiBAY2xpY2submF0aXZlPVwiJHJvdXRlci5iYWNrKClcIj7lj5bmtog8L2VsLWJ1dHRvbj5cclxuICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICA8L2VsLWZvcm0+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFjY291bnQ6IHtcclxuICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgdHlwZTogJ+iuoumYheWPtycsXHJcbiAgICAgICAgICBhcHBfaWQ6ICcnLFxyXG4gICAgICAgICAgYXBwX3NlY3JldDogJycsXHJcbiAgICAgICAgICBhZXNfa2V5OiAnJyxcclxuICAgICAgICAgIG1lcmNoYW50X2lkOiAnJyxcclxuICAgICAgICAgIG1lcmNoYW50X2tleTogJycsXHJcbiAgICAgICAgICBjZXJ0X3BhdGg6ICcnLFxyXG4gICAgICAgICAga2V5X3BhdGg6ICcnLFxyXG4gICAgICAgICAgcmVtYXJrOiAnJyxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnRJZCA9IHRoaXMuJHJvdXRlLnBhcmFtcy5pZDtcclxuXHJcbiAgICAgIGlmIChhY2NvdW50SWQpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldChgYWNjb3VudC9zaG93LyR7YWNjb3VudElkfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmFjY291bnQgPSByZXNwb25zZS5kYXRhLmFjY291bnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcHV0ZWQ6IHt9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgc3RvcmUgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MucG9zdCgnYWNjb3VudC9zdG9yZScsIHRoaXMuYWNjb3VudCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAn5re75Yqg5oiQ5YqfJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy8nKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIC8vIOaUueWPmOecgeaXtumHjee9rumAieaLqeeahOW4guWSjOWMulxyXG4gICAgICAnZm9ybURhdGEucHJvdmluY2UnOiBmdW5jdGlvbiAodmFsLCBvbGRWYWwpIHtcclxuICAgICAgICB0aGlzLmZvcm1EYXRhLmNpdHkgPSB0aGlzLmNpdHlMaXN0WzBdO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5pS55Y+Y5biC5pe26YeN572u6YCJ5oup55qE5Y6/XHJcbiAgICAgICdmb3JtRGF0YS5jaXR5JzogZnVuY3Rpb24gKHZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5hcmVhID0gdGhpcy5hcmVhTGlzdFswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmb3JtLnZ1ZT85ZTQ0ODU1YyIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcIm1haW4gbWFpbi13aXRoLXBhZGRpbmdcIlxuICB9LCBbX2MoJ2VsLWZvcm0nLCB7XG4gICAgcmVmOiBcImZvcm1cIixcbiAgICBhdHRyczoge1xuICAgICAgXCJtb2RlbFwiOiBfdm0uYWNjb3VudCxcbiAgICAgIFwibGFiZWwtd2lkdGhcIjogXCIxNTBweFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuWFrOS8l+WPt+WQjeensFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS5hY2NvdW50Lm5hbWUpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uYWNjb3VudC5uYW1lID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJhY2NvdW50Lm5hbWVcIlxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuexu+Wei1wiXG4gICAgfVxuICB9LCBbX2MoJ2VsLXNlbGVjdCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIlwiXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uYWNjb3VudC50eXBlKSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgX3ZtLmFjY291bnQudHlwZSA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwiYWNjb3VudC50eXBlXCJcbiAgICB9XG4gIH0sIFtfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi6K6i6ZiF5Y+3XCIsXG4gICAgICBcInZhbHVlXCI6IFwiMVwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLW9wdGlvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuiupOivgeiuoumYheWPt1wiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIjJcIlxuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1vcHRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCLmnI3liqHlj7dcIixcbiAgICAgIFwidmFsdWVcIjogXCIzXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi6K6k6K+B5pyN5Yqh5Y+3XCIsXG4gICAgICBcInZhbHVlXCI6IFwiNFwiXG4gICAgfVxuICB9KV0sIDEpXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1mb3JtLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCJBcHBJZFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS5hY2NvdW50LmFwcF9pZCksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS5hY2NvdW50LmFwcF9pZCA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwiYWNjb3VudC5hcHBfaWRcIlxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIkFwcFNlY3JldFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS5hY2NvdW50LmFwcF9zZWNyZXQpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uYWNjb3VudC5hcHBfc2VjcmV0ID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJhY2NvdW50LmFwcF9zZWNyZXRcIlxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIkFlc0tleVwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS5hY2NvdW50LmFlc19rZXkpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uYWNjb3VudC5hZXNfa2V5ID0gJCR2XG4gICAgICB9LFxuICAgICAgZXhwcmVzc2lvbjogXCJhY2NvdW50LmFlc19rZXlcIlxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuWkh+azqFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJ0ZXh0YXJlYVwiXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uYWNjb3VudC5yZW1hcmspLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uYWNjb3VudC5yZW1hcmsgPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcImFjY291bnQucmVtYXJrXCJcbiAgICB9XG4gIH0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1mb3JtLWl0ZW0nLCBbX2MoJ2VsLWJ1dHRvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwicHJpbWFyeVwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjbGlja1wiOiBfdm0uc3RvcmVcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLkv53lrZhcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWJ1dHRvbicsIHtcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLiRyb3V0ZXIuYmFjaygpXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5Y+W5raIXCIpXSldLCAxKV0sIDEpXSwgMSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtMjMyMzA5NjJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTIzMjMwOTYyXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvYWNjb3VudC9mb3JtLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzkyXG4vLyBtb2R1bGUgY2h1bmtzID0gNDEiXSwic291cmNlUm9vdCI6IiJ9