webpackJsonp([16],{

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(622)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(624)
/* template */
var __vue_template__ = __webpack_require__(625)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3b37132a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\admin\\pages\\product\\lsit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] lsit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b37132a", Component.options)
  } else {
    hotAPI.reload("data-v-3b37132a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  methods: {
    search: function search() {
      this.loadData(1);
    },
    handleCurrentChange: function handleCurrentChange(page) {
      this.loadData(page);
    }
  }
};

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(623);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("6d636790", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b37132a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./lsit.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b37132a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./lsit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.thumbnail[data-v-3b37132a] {\n  display: block;\n  overflow: hidden;\n  margin: 10px 0;\n  width: 65px;\n  height: 65px;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/pages/product/lsit.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,aAAa;CAAE","file":"lsit.vue","sourcesContent":[".thumbnail {\n  display: block;\n  overflow: hidden;\n  margin: 10px 0;\n  width: 65px;\n  height: 65px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table_mixin = __webpack_require__(597);

var _table_mixin2 = _interopRequireDefault(_table_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_table_mixin2.default],

  data: function data() {
    return {
      products: {},
      searchForm: {
        name: '',
        sex: 'all'
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },


  methods: {
    loadData: function loadData() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.axios.get('product/list', {
        params: {
          keyword: this.searchForm.keyword,
          sex: this.searchForm.sex,
          page: page
        }
      }).then(function (response) {
        _this.products = response.data.products;
      });
    },
    deleteProduct: function deleteProduct(id) {
      console.log('fuck');
    }
  }
};

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main-container main-with-padding" },
    [
      _c(
        "div",
        { staticClass: "table-tools" },
        [
          _c(
            "el-form",
            {
              staticClass: "demo-form-inline",
              attrs: { inline: true, model: _vm.searchForm }
            },
            [
              _c(
                "el-form-item",
                [
                  _c("el-input", {
                    attrs: { placeholder: "按昵称搜索" },
                    nativeOn: {
                      keyup: function($event) {
                        if (
                          !("button" in $event) &&
                          _vm._k($event.keyCode, "enter", 13)
                        ) {
                          return null
                        }
                        _vm.loadData($event)
                      }
                    },
                    model: {
                      value: _vm.searchForm.keyword,
                      callback: function($$v) {
                        _vm.searchForm.keyword = $$v
                      },
                      expression: "searchForm.keyword"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "性别筛选" },
                      on: { change: _vm.loadData },
                      model: {
                        value: _vm.searchForm.sex,
                        callback: function($$v) {
                          _vm.searchForm.sex = $$v
                        },
                        expression: "searchForm.sex"
                      }
                    },
                    [
                      _c("el-option", { attrs: { label: "全部", value: "all" } }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "男", value: "0" } }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "女", value: "1" } }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "其它", value: "2" } })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary", icon: "search" },
                      on: { click: _vm.search }
                    },
                    [_vm._v("搜索")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        { attrs: { data: _vm.products.data, border: "" } },
        [
          _c("el-table-column", {
            attrs: { label: "预览图" },
            inlineTemplate: {
              render: function() {
                var _vm = this
                var _h = _vm.$createElement
                var _c = _vm._self._c || _h
                return _c("img", {
                  staticClass: "thumbnail",
                  attrs: { src: _vm.row.thumbnail }
                })
              },
              staticRenderFns: []
            }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "name", label: "名称" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "price", label: "价格（元）" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "stock", label: "库存" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "status", label: "状态" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "updated_at", label: "更新时间" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作" },
            inlineTemplate: {
              render: function() {
                var _vm = this
                var _h = _vm.$createElement
                var _c = _vm._self._c || _h
                return _c(
                  "div",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "el-button el-button--primary el-button--small",
                        attrs: { to: "/product/edit/" + _vm.row.id }
                      },
                      [_vm._v("编辑")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { size: "small", type: "danger" },
                        on: {
                          click: function($event) {
                            _vm.deleteProduct(_vm.row.id)
                          }
                        }
                      },
                      [_vm._v("删除")]
                    )
                  ],
                  1
                )
              },
              staticRenderFns: []
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "paginator" },
        [
          _c("el-pagination", {
            attrs: {
              "current-page": _vm.products.current_page,
              "page-size": _vm.products.per_page,
              layout: "total, prev, pager, next, jumper",
              total: _vm.products.tatal
            },
            on: { "current-change": _vm.handleCurrentChange }
          })
        ],
        1
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
     require("vue-hot-reload-api").rerender("data-v-3b37132a", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9taXhpbnMvdGFibGVfbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlPzFiMjkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlPzI3ZTAiLCJ3ZWJwYWNrOi8vL2xzaXQudnVlPzk5MWYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlPzgwMTMiXSwibmFtZXMiOlsibWV0aG9kcyIsInNlYXJjaCIsImxvYWREYXRhIiwiaGFuZGxlQ3VycmVudENoYW5nZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdNO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBLDRDQUE4VTtBQUM5VTtBQUNBLDhDQUF1SjtBQUN2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7a0JDM0NlO0FBQ2JBLFdBQVM7QUFFUEMsVUFGTyxvQkFFRztBQUNSLFdBQUtDLFFBQUwsQ0FBYyxDQUFkO0FBQ0QsS0FKTTtBQU1QQyx1QkFOTywrQkFNY0MsSUFOZCxFQU1vQjtBQUN6QixXQUFLRixRQUFMLENBQWNFLElBQWQ7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QWdDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMkJBQTJCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjE2LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zYjM3MTMyYVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xzaXQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIixcXFwic3ludGF4LWR5bmFtaWMtaW1wb3J0XFxcIixbXFxcImNvbXBvbmVudFxcXCIsW3tcXFwibGlicmFyeU5hbWVcXFwiOlxcXCJ3ZS12dWVcXFwiLFxcXCJzdHlsZVxcXCI6dHJ1ZX1dXV0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9sc2l0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtM2IzNzEzMmFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9sc2l0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTNiMzcxMzJhXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXHBhZ2VzXFxcXHByb2R1Y3RcXFxcbHNpdC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGxzaXQudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTNiMzcxMzJhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtM2IzNzEzMmFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvcHJvZHVjdC9sc2l0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTYiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgbWV0aG9kczoge1xyXG4gICAgLy8g5pCc57SiXHJcbiAgICBzZWFyY2ggKCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKDEpXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUN1cnJlbnRDaGFuZ2UgKHBhZ2UpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YShwYWdlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL21peGlucy90YWJsZV9taXhpbi5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zYjM3MTMyYVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xzaXQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2ZDYzNjc5MFwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0zYjM3MTMyYVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2xzaXQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTNiMzcxMzJhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbHNpdC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtM2IzNzEzMmFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWVcbi8vIG1vZHVsZSBpZCA9IDYyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDE2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi50aHVtYm5haWxbZGF0YS12LTNiMzcxMzJhXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDEwcHggMDtcXG4gIHdpZHRoOiA2NXB4O1xcbiAgaGVpZ2h0OiA2NXB4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvcHJvZHVjdC9sc2l0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtDQUFFXCIsXCJmaWxlXCI6XCJsc2l0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudGh1bWJuYWlsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMTBweCAwO1xcbiAgd2lkdGg6IDY1cHg7XFxuICBoZWlnaHQ6IDY1cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtM2IzNzEzMmFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWVcbi8vIG1vZHVsZSBpZCA9IDYyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE2IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtYWluLWNvbnRhaW5lciBtYWluLXdpdGgtcGFkZGluZ1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLXRvb2xzXCI+XHJcbiAgICAgIDxlbC1mb3JtIDppbmxpbmU9XCJ0cnVlXCIgOm1vZGVsPVwic2VhcmNoRm9ybVwiIGNsYXNzPVwiZGVtby1mb3JtLWlubGluZVwiPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICA8ZWwtaW5wdXQgdi1tb2RlbD1cInNlYXJjaEZvcm0ua2V5d29yZFwiIHBsYWNlaG9sZGVyPVwi5oyJ5pi156ew5pCc57SiXCIgQGtleXVwLmVudGVyLm5hdGl2ZT1cImxvYWREYXRhXCI+PC9lbC1pbnB1dD5cclxuICAgICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgICA8ZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgPGVsLXNlbGVjdCB2LW1vZGVsPVwic2VhcmNoRm9ybS5zZXhcIiBwbGFjZWhvbGRlcj1cIuaAp+WIq+etm+mAiVwiIEBjaGFuZ2U9XCJsb2FkRGF0YVwiPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi5YWo6YOoXCIgdmFsdWU9XCJhbGxcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIueUt1wiIHZhbHVlPVwiMFwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi5aWzXCIgdmFsdWU9XCIxXCI+PC9lbC1vcHRpb24+XHJcbiAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlhbblroNcIiB2YWx1ZT1cIjJcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgIDwvZWwtc2VsZWN0PlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgaWNvbj1cInNlYXJjaFwiIEBjbGljaz1cInNlYXJjaFwiPuaQnOe0ojwvZWwtYnV0dG9uPlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICA8L2VsLWZvcm0+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZWwtdGFibGUgOmRhdGE9XCJwcm9kdWN0cy5kYXRhXCIgYm9yZGVyPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIGxhYmVsPVwi6aKE6KeI5Zu+XCIgaW5saW5lLXRlbXBsYXRlPlxyXG4gICAgICAgIDxpbWcgOnNyYz1cInJvdy50aHVtYm5haWxcIiBjbGFzcz1cInRodW1ibmFpbFwiLz5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cIm5hbWVcIiBsYWJlbD1cIuWQjeensFwiPjwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIHByb3A9XCJwcmljZVwiIGxhYmVsPVwi5Lu35qC877yI5YWD77yJXCI+PC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInN0b2NrXCIgbGFiZWw9XCLlupPlrZhcIj48L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwic3RhdHVzXCIgbGFiZWw9XCLnirbmgIFcIj48L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwidXBkYXRlZF9hdFwiIGxhYmVsPVwi5pu05paw5pe26Ze0XCI+PC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gbGFiZWw9XCLmk43kvZxcIiBpbmxpbmUtdGVtcGxhdGU+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3Byb2R1Y3QvZWRpdC8nICsgcm93LmlkXCIgY2xhc3M9XCJlbC1idXR0b24gZWwtYnV0dG9uLS1wcmltYXJ5IGVsLWJ1dHRvbi0tc21hbGxcIj7nvJbovpE8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgPGVsLWJ1dHRvbiBzaXplPVwic21hbGxcIiB0eXBlPVwiZGFuZ2VyXCIgQGNsaWNrPVwiZGVsZXRlUHJvZHVjdChyb3cuaWQpXCI+5Yig6ZmkPC9lbC1idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgPC9lbC10YWJsZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XHJcbiAgICAgIDxlbC1wYWdpbmF0aW9uXHJcbiAgICAgICAgICAgICAgQGN1cnJlbnQtY2hhbmdlPVwiaGFuZGxlQ3VycmVudENoYW5nZVwiXHJcbiAgICAgICAgICAgICAgOmN1cnJlbnQtcGFnZT1cInByb2R1Y3RzLmN1cnJlbnRfcGFnZVwiXHJcbiAgICAgICAgICAgICAgOnBhZ2Utc2l6ZT1cInByb2R1Y3RzLnBlcl9wYWdlXCJcclxuICAgICAgICAgICAgICBsYXlvdXQ9XCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiXHJcbiAgICAgICAgICAgICAgOnRvdGFsPVwicHJvZHVjdHMudGF0YWxcIj5cclxuICAgICAgPC9lbC1wYWdpbmF0aW9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBUYWJsZU1peGluIGZyb20gJy4uLy4uL21peGlucy90YWJsZV9taXhpbidcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgbWl4aW5zOiBbVGFibGVNaXhpbl0sXHJcblxyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvZHVjdHM6IHt9LFxyXG4gICAgICAgIHNlYXJjaEZvcm06IHtcclxuICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgc2V4OiAnYWxsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGxvYWREYXRhIChwYWdlID0gMSkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0L2xpc3QnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAga2V5d29yZDogdGhpcy5zZWFyY2hGb3JtLmtleXdvcmQsXHJcbiAgICAgICAgICAgIHNleDogdGhpcy5zZWFyY2hGb3JtLnNleCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5wcm9kdWN0cztcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGRlbGV0ZVByb2R1Y3QgKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Z1Y2snKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAudGh1bWJuYWlsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1hcmdpbjogMTBweCAwO1xyXG4gICAgd2lkdGg6IDY1cHg7XHJcbiAgICBoZWlnaHQ6IDY1cHg7XHJcbiAgfVxyXG48L3N0eWxlPlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsc2l0LnZ1ZT8yNzE2ODA0NiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcIm1haW4tY29udGFpbmVyIG1haW4td2l0aC1wYWRkaW5nXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0YWJsZS10b29sc1wiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZWwtZm9ybVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkZW1vLWZvcm0taW5saW5lXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGlubGluZTogdHJ1ZSwgbW9kZWw6IF92bS5zZWFyY2hGb3JtIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZWwtZm9ybS1pdGVtXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJlbC1pbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIuaMieaYteensOaQnOe0olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAhKFwiYnV0dG9uXCIgaW4gJGV2ZW50KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5sb2FkRGF0YSgkZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoRm9ybS5rZXl3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2hGb3JtLmtleXdvcmQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoRm9ybS5rZXl3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJlbC1mb3JtLWl0ZW1cIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJlbC1zZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIuaAp+WIq+etm+mAiVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHsgY2hhbmdlOiBfdm0ubG9hZERhdGEgfSxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2hGb3JtLnNleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlYXJjaEZvcm0uc2V4ID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hGb3JtLnNleFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJlbC1vcHRpb25cIiwgeyBhdHRyczogeyBsYWJlbDogXCLlhajpg6hcIiwgdmFsdWU6IFwiYWxsXCIgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZWwtb3B0aW9uXCIsIHsgYXR0cnM6IHsgbGFiZWw6IFwi55S3XCIsIHZhbHVlOiBcIjBcIiB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJlbC1vcHRpb25cIiwgeyBhdHRyczogeyBsYWJlbDogXCLlpbNcIiwgdmFsdWU6IFwiMVwiIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImVsLW9wdGlvblwiLCB7IGF0dHJzOiB7IGxhYmVsOiBcIuWFtuWug1wiLCB2YWx1ZTogXCIyXCIgfSB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZWwtZm9ybS1pdGVtXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgaWNvbjogXCJzZWFyY2hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0uc2VhcmNoIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuaQnOe0olwiKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZWwtdGFibGVcIixcbiAgICAgICAgeyBhdHRyczogeyBkYXRhOiBfdm0ucHJvZHVjdHMuZGF0YSwgYm9yZGVyOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZWwtdGFibGUtY29sdW1uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGxhYmVsOiBcIumihOiniOWbvlwiIH0sXG4gICAgICAgICAgICBpbmxpbmVUZW1wbGF0ZToge1xuICAgICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdm0gPSB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgICAgICAgICAgICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0ucm93LnRodW1ibmFpbCB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwgeyBhdHRyczogeyBwcm9wOiBcIm5hbWVcIiwgbGFiZWw6IFwi5ZCN56ewXCIgfSB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZWwtdGFibGUtY29sdW1uXCIsIHsgYXR0cnM6IHsgcHJvcDogXCJwcmljZVwiLCBsYWJlbDogXCLku7fmoLzvvIjlhYPvvIlcIiB9IH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwgeyBhdHRyczogeyBwcm9wOiBcInN0b2NrXCIsIGxhYmVsOiBcIuW6k+WtmFwiIH0gfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLXRhYmxlLWNvbHVtblwiLCB7IGF0dHJzOiB7IHByb3A6IFwic3RhdHVzXCIsIGxhYmVsOiBcIueKtuaAgVwiIH0gfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLXRhYmxlLWNvbHVtblwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBwcm9wOiBcInVwZGF0ZWRfYXRcIiwgbGFiZWw6IFwi5pu05paw5pe26Ze0XCIgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgbGFiZWw6IFwi5pON5L2cXCIgfSxcbiAgICAgICAgICAgIGlubGluZVRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIF92bSA9IHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uIGVsLWJ1dHRvbi0tcHJpbWFyeSBlbC1idXR0b24tLXNtYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcHJvZHVjdC9lZGl0L1wiICsgX3ZtLnJvdy5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi57yW6L6RXCIpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNpemU6IFwic21hbGxcIiwgdHlwZTogXCJkYW5nZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWxldGVQcm9kdWN0KF92bS5yb3cuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLliKDpmaRcIildXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJlbC1wYWdpbmF0aW9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIFwiY3VycmVudC1wYWdlXCI6IF92bS5wcm9kdWN0cy5jdXJyZW50X3BhZ2UsXG4gICAgICAgICAgICAgIFwicGFnZS1zaXplXCI6IF92bS5wcm9kdWN0cy5wZXJfcGFnZSxcbiAgICAgICAgICAgICAgbGF5b3V0OiBcInRvdGFsLCBwcmV2LCBwYWdlciwgbmV4dCwganVtcGVyXCIsXG4gICAgICAgICAgICAgIHRvdGFsOiBfdm0ucHJvZHVjdHMudGF0YWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyBcImN1cnJlbnQtY2hhbmdlXCI6IF92bS5oYW5kbGVDdXJyZW50Q2hhbmdlIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTNiMzcxMzJhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0zYjM3MTMyYVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2MjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxNiJdLCJzb3VyY2VSb290IjoiIn0=