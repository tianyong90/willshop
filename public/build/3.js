webpackJsonp([3],{

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(409)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(411),
  /* template */
  __webpack_require__(416),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-75851536",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\reply\\text-lists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] text-lists.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75851536", Component.options)
  } else {
    hotAPI.reload("data-v-75851536", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(410);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("7ef6a237", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75851536\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./text-lists.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75851536\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./text-lists.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"text-lists.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(412);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _methods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      replies: [],
      searchForm: {
        keyword: ''
      },
      dialogFormVisible: false,
      replyFormData: {
        trigger_keywords: '',
        content: '',
        id: null
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },


  methods: (_methods = {
    loadData: function loadData() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.axios.get('reply/lists?type=text', {
        params: {
          keyword: this.searchForm.keyword,
          sex: this.searchForm.sex,
          page: page
        }
      }).then(function (response) {
        _this.replies = response.data.replies;
      });
    },
    search: function search() {
      this.loadData(1);
    },
    handleCurrentChange: function handleCurrentChange(page) {
      this.loadData(page);
    },
    storeReply: function storeReply() {
      var _this2 = this;

      var postData = this.replyFormData;
      postData.trigger_type = 'keywords';

      this.axios.post('reply/store', postData).then(function (response) {
        _this2.dialogFormVisible = false;
        _this2.replyFormData.trigger_keywords = '';
        _this2.replyFormData.content = '';
        _this2.replyFormData.id = null;

        _this2.$message({
          message: '保存成功',
          type: 'success'
        });

        setTimeout(function () {
          _this2.loadData(_this2.replies.current_page);
        }, 1000);
      }).catch(function (error) {
        _this2.$message({
          message: error.response.data,
          type: 'error'
        });
      });
    },
    showEditDialog: function showEditDialog() {
      this.replyFormData.trigger_keywords = '';
      this.replyFormData.content = '';
      this.replyFormData.id = null;

      this.dialogFormVisible = true;
    }
  }, (0, _defineProperty3.default)(_methods, 'showEditDialog', function showEditDialog(reply) {
    this.replyFormData.trigger_keywords = reply.trigger_keywords;
    this.replyFormData.content = reply.content;
    this.replyFormData.id = reply.id;

    this.dialogFormVisible = true;
  }), (0, _defineProperty3.default)(_methods, 'deleteReply', function deleteReply(id) {
    var _this3 = this;

    this.$confirm('删除后将不可恢复, 是否继续?', '操作确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }).then(function () {
      _this3.axios.post('reply/delete', { id: id }).then(function (response) {
        _this3.$message({
          message: '删除成功',
          type: 'success'
        });

        setTimeout(function () {
          _this3.loadData(_this3.replies.current_page);
        }, 1000);
      }).catch(function (error) {
        _this3.$message({
          message: error.response.data,
          type: 'error'
        });
      });
    }).catch(function () {
      console.log('canceled');
    });
  }), _methods)
};

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(413);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(414), __esModule: true };

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(415);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', { defineProperty: __webpack_require__(15).f });


/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "right-main"
  }, [_c('div', {
    staticClass: "table-tools"
  }, [_c('el-form', {
    staticClass: "demo-form-inline",
    attrs: {
      "inline": true,
      "model": _vm.searchForm
    }
  }, [_c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "按昵称搜索"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.loadData($event)
      }
    },
    model: {
      value: (_vm.searchForm.keyword),
      callback: function($$v) {
        _vm.searchForm.keyword = $$v
      },
      expression: "searchForm.keyword"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-select', {
    attrs: {
      "placeholder": "性别筛选"
    },
    on: {
      "change": _vm.loadData
    },
    model: {
      value: (_vm.searchForm.sex),
      callback: function($$v) {
        _vm.searchForm.sex = $$v
      },
      expression: "searchForm.sex"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "全部",
      "value": "all"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "男",
      "value": "0"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "女",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "其它",
      "value": "2"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "search"
    },
    on: {
      "click": _vm.search
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "success",
      "icon": "plus"
    },
    on: {
      "click": _vm.showEditDialog
    }
  }, [_vm._v("新增回复规则")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.replies.data,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "trigger_keywords",
      "label": "触发关键词"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "content",
      "label": "回复内容"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "添加时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "updated_at",
      "label": "修改时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "remark",
      "label": "命中次数"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作"
    },
    inlineTemplate: {
      render: function() {
        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
          return _c('div', [_c('el-button', {
            attrs: {
              "size": "small",
              "type": "primary"
            },
            nativeOn: {
              "click": function($event) {
                _vm.showEditDialog(_vm.row)
              }
            }
          }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
            attrs: {
              "size": "small",
              "type": "danger"
            },
            nativeOn: {
              "click": function($event) {
                _vm.deleteReply(_vm.row.id)
              }
            }
          }, [_vm._v("删除")])], 1)
        
      },
      staticRenderFns: []
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "paginator"
  }, [_c('el-pagination', {
    attrs: {
      "current-page": _vm.replies.current_page,
      "page-size": _vm.replies.per_page,
      "layout": "total, prev, pager, next, jumper",
      "total": _vm.replies.tatal
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "添加文本回复",
      "modal": false
    },
    model: {
      value: (_vm.dialogFormVisible),
      callback: function($$v) {
        _vm.dialogFormVisible = $$v
      },
      expression: "dialogFormVisible"
    }
  }, [_c('el-form', {
    attrs: {
      "model": _vm.replyFormData
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "触发关键词",
      "label-width": "120"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off",
      "placeholder": "填写触发关键字"
    },
    model: {
      value: (_vm.replyFormData.trigger_keywords),
      callback: function($$v) {
        _vm.replyFormData.trigger_keywords = $$v
      },
      expression: "replyFormData.trigger_keywords"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "回复内容",
      "label-width": "120"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea",
      "rows": 5,
      "placeholder": "填写回复内容"
    },
    model: {
      value: (_vm.replyFormData.content),
      callback: function($$v) {
        _vm.replyFormData.content = $$v
      },
      expression: "replyFormData.content"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogFormVisible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.storeReply
    }
  }, [_vm._v("确 定")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-75851536", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvdGV4dC1saXN0cy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L3RleHQtbGlzdHMudnVlPzM5ODYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L3RleHQtbGlzdHMudnVlPzgzNzEiLCJ3ZWJwYWNrOi8vL3RleHQtbGlzdHMudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L3RleHQtbGlzdHMudnVlP2RiYjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd007QUFDeE07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQWtJO0FBQ2xJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFD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cUJBQXFCLDBCQUEwQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzU4NTE1MzZcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi90ZXh0LWxpc3RzLnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi90ZXh0LWxpc3RzLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzU4NTE1MzZcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi90ZXh0LWxpc3RzLnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTc1ODUxNTM2XCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXGNvbXBvbmVudHNcXFxccmVwbHlcXFxcdGV4dC1saXN0cy52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIHRleHQtbGlzdHMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTc1ODUxNTM2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNzU4NTE1MzZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9yZXBseS90ZXh0LWxpc3RzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi03NTg1MTUzNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3RleHQtbGlzdHMudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI3ZWY2YTIzN1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi03NTg1MTUzNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3RleHQtbGlzdHMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTc1ODUxNTM2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vdGV4dC1saXN0cy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNzU4NTE1MzZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvdGV4dC1saXN0cy52dWVcbi8vIG1vZHVsZSBpZCA9IDQwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcInRleHQtbGlzdHMudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNzU4NTE1MzZcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvdGV4dC1saXN0cy52dWVcbi8vIG1vZHVsZSBpZCA9IDQxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInJpZ2h0LW1haW5cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS10b29sc1wiPlxyXG4gICAgICA8ZWwtZm9ybSA6aW5saW5lPVwidHJ1ZVwiIDptb2RlbD1cInNlYXJjaEZvcm1cIiBjbGFzcz1cImRlbW8tZm9ybS1pbmxpbmVcIj5cclxuICAgICAgICA8ZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJzZWFyY2hGb3JtLmtleXdvcmRcIiBwbGFjZWhvbGRlcj1cIuaMieaYteensOaQnOe0olwiIEBrZXl1cC5lbnRlci5uYXRpdmU9XCJsb2FkRGF0YVwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgPGVsLWZvcm0taXRlbT5cclxuICAgICAgICAgIDxlbC1zZWxlY3Qgdi1tb2RlbD1cInNlYXJjaEZvcm0uc2V4XCIgcGxhY2Vob2xkZXI9XCLmgKfliKvnrZvpgIlcIiBAY2hhbmdlPVwibG9hZERhdGFcIj5cclxuICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuWFqOmDqFwiIHZhbHVlPVwiYWxsXCI+PC9lbC1vcHRpb24+XHJcbiAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLnlLdcIiB2YWx1ZT1cIjBcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuWls1wiIHZhbHVlPVwiMVwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi5YW25a6DXCIgdmFsdWU9XCIyXCI+PC9lbC1vcHRpb24+XHJcbiAgICAgICAgICA8L2VsLXNlbGVjdD5cclxuICAgICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgICA8ZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIGljb249XCJzZWFyY2hcIiBAY2xpY2s9XCJzZWFyY2hcIj7mkJzntKI8L2VsLWJ1dHRvbj5cclxuICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInN1Y2Nlc3NcIiBpY29uPVwicGx1c1wiIEBjbGljaz1cInNob3dFZGl0RGlhbG9nXCI+5paw5aKe5Zue5aSN6KeE5YiZPC9lbC1idXR0b24+XHJcbiAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDwvZWwtZm9ybT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxlbC10YWJsZSA6ZGF0YT1cInJlcGxpZXMuZGF0YVwiIGJvcmRlciBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInRyaWdnZXJfa2V5d29yZHNcIiBsYWJlbD1cIuinpuWPkeWFs+mUruivjVwiPlxyXG4gICAgICA8L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwiY29udGVudFwiIGxhYmVsPVwi5Zue5aSN5YaF5a65XCI+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIHByb3A9XCJjcmVhdGVkX2F0XCIgbGFiZWw9XCLmt7vliqDml7bpl7RcIj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInVwZGF0ZWRfYXRcIiBsYWJlbD1cIuS/ruaUueaXtumXtFwiPlxyXG4gICAgICA8L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwicmVtYXJrXCIgbGFiZWw9XCLlkb3kuK3mrKHmlbBcIj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gbGFiZWw9XCLmk43kvZxcIiBpbmxpbmUtdGVtcGxhdGU+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxlbC1idXR0b24gc2l6ZT1cInNtYWxsXCIgdHlwZT1cInByaW1hcnlcIiBAY2xpY2submF0aXZlPVwic2hvd0VkaXREaWFsb2cocm93KVwiPuS/ruaUuTwvZWwtYnV0dG9uPlxyXG4gICAgICAgICAgPGVsLWJ1dHRvbiBzaXplPVwic21hbGxcIiB0eXBlPVwiZGFuZ2VyXCIgQGNsaWNrLm5hdGl2ZT1cImRlbGV0ZVJlcGx5KHJvdy5pZClcIj7liKDpmaQ8L2VsLWJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICA8L2VsLXRhYmxlPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0b3JcIj5cclxuICAgICAgPGVsLXBhZ2luYXRpb25cclxuICAgICAgICAgICAgICBAY3VycmVudC1jaGFuZ2U9XCJoYW5kbGVDdXJyZW50Q2hhbmdlXCJcclxuICAgICAgICAgICAgICA6Y3VycmVudC1wYWdlPVwicmVwbGllcy5jdXJyZW50X3BhZ2VcIlxyXG4gICAgICAgICAgICAgIDpwYWdlLXNpemU9XCJyZXBsaWVzLnBlcl9wYWdlXCJcclxuICAgICAgICAgICAgICBsYXlvdXQ9XCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiXHJcbiAgICAgICAgICAgICAgOnRvdGFsPVwicmVwbGllcy50YXRhbFwiPlxyXG4gICAgICA8L2VsLXBhZ2luYXRpb24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZWwtZGlhbG9nIHRpdGxlPVwi5re75Yqg5paH5pys5Zue5aSNXCIgdi1tb2RlbD1cImRpYWxvZ0Zvcm1WaXNpYmxlXCIgOm1vZGFsPVwiZmFsc2VcIj5cclxuICAgICAgPGVsLWZvcm0gOm1vZGVsPVwicmVwbHlGb3JtRGF0YVwiPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLop6blj5HlhbPplK7or41cIiBsYWJlbC13aWR0aD1cIjEyMFwiPlxyXG4gICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJyZXBseUZvcm1EYXRhLnRyaWdnZXJfa2V5d29yZHNcIiBhdXRvLWNvbXBsZXRlPVwib2ZmXCIgcGxhY2Vob2xkZXI9XCLloavlhpnop6blj5HlhbPplK7lrZdcIj48L2VsLWlucHV0PlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0gbGFiZWw9XCLlm57lpI3lhoXlrrlcIiBsYWJlbC13aWR0aD1cIjEyMFwiPlxyXG4gICAgICAgICAgPGVsLWlucHV0IHR5cGU9XCJ0ZXh0YXJlYVwiIDpyb3dzPVwiNVwiIHYtbW9kZWw9XCJyZXBseUZvcm1EYXRhLmNvbnRlbnRcIiBwbGFjZWhvbGRlcj1cIuWhq+WGmeWbnuWkjeWGheWuuVwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDwvZWwtZm9ybT5cclxuICAgICAgPGRpdiBzbG90PVwiZm9vdGVyXCIgY2xhc3M9XCJkaWFsb2ctZm9vdGVyXCI+XHJcbiAgICAgICAgPGVsLWJ1dHRvbiBAY2xpY2s9XCJkaWFsb2dGb3JtVmlzaWJsZSA9IGZhbHNlXCI+5Y+WIOa2iDwvZWwtYnV0dG9uPlxyXG4gICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBAY2xpY2s9XCJzdG9yZVJlcGx5XCI+56GuIOWumjwvZWwtYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZWwtZGlhbG9nPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZXBsaWVzOiBbXSxcclxuICAgICAgICBzZWFyY2hGb3JtOiB7XHJcbiAgICAgICAgICBrZXl3b3JkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlhbG9nRm9ybVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIHJlcGx5Rm9ybURhdGE6IHtcclxuICAgICAgICAgIHRyaWdnZXJfa2V5d29yZHM6ICcnLFxyXG4gICAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGxvYWREYXRhIChwYWdlID0gMSkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdyZXBseS9saXN0cz90eXBlPXRleHQnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAga2V5d29yZDogdGhpcy5zZWFyY2hGb3JtLmtleXdvcmQsXHJcbiAgICAgICAgICAgIHNleDogdGhpcy5zZWFyY2hGb3JtLnNleCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlcGxpZXMgPSByZXNwb25zZS5kYXRhLnJlcGxpZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDmkJzntKJcclxuICAgICAgc2VhcmNoICgpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKDEpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgaGFuZGxlQ3VycmVudENoYW5nZSAocGFnZSkge1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEocGFnZSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDkv53lrZhcclxuICAgICAgc3RvcmVSZXBseSAoKSB7XHJcbiAgICAgICAgbGV0IHBvc3REYXRhID0gdGhpcy5yZXBseUZvcm1EYXRhXHJcbiAgICAgICAgcG9zdERhdGEudHJpZ2dlcl90eXBlID0gJ2tleXdvcmRzJ1xyXG5cclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ3JlcGx5L3N0b3JlJywgcG9zdERhdGEpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kaWFsb2dGb3JtVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5yZXBseUZvcm1EYXRhLnRyaWdnZXJfa2V5d29yZHMgPSAnJztcclxuICAgICAgICAgIHRoaXMucmVwbHlGb3JtRGF0YS5jb250ZW50ID0gJyc7XHJcbiAgICAgICAgICB0aGlzLnJlcGx5Rm9ybURhdGEuaWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAn5L+d5a2Y5oiQ5YqfJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnJlcGxpZXMuY3VycmVudF9wYWdlKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5yZXNwb25zZS5kYXRhLFxyXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5paw5aKeXHJcbiAgICAgIHNob3dFZGl0RGlhbG9nICgpIHtcclxuICAgICAgICB0aGlzLnJlcGx5Rm9ybURhdGEudHJpZ2dlcl9rZXl3b3JkcyA9ICcnXHJcbiAgICAgICAgdGhpcy5yZXBseUZvcm1EYXRhLmNvbnRlbnQgPSAnJ1xyXG4gICAgICAgIHRoaXMucmVwbHlGb3JtRGF0YS5pZCA9IG51bGxcclxuXHJcbiAgICAgICAgdGhpcy5kaWFsb2dGb3JtVmlzaWJsZSA9IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOS/ruaUuVxyXG4gICAgICBzaG93RWRpdERpYWxvZyAocmVwbHkpIHtcclxuICAgICAgICB0aGlzLnJlcGx5Rm9ybURhdGEudHJpZ2dlcl9rZXl3b3JkcyA9IHJlcGx5LnRyaWdnZXJfa2V5d29yZHNcclxuICAgICAgICB0aGlzLnJlcGx5Rm9ybURhdGEuY29udGVudCA9IHJlcGx5LmNvbnRlbnRcclxuICAgICAgICB0aGlzLnJlcGx5Rm9ybURhdGEuaWQgPSByZXBseS5pZFxyXG5cclxuICAgICAgICB0aGlzLmRpYWxvZ0Zvcm1WaXNpYmxlID0gdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5Yig6ZmkXHJcbiAgICAgIGRlbGV0ZVJlcGx5IChpZCkge1xyXG4gICAgICAgIHRoaXMuJGNvbmZpcm0oJ+WIoOmZpOWQjuWwhuS4jeWPr+aBouWkjSwg5piv5ZCm57un57utPycsICfmk43kvZznoa7orqQnLCB7XHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgIHR5cGU6ICdpbmZvJ1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdyZXBseS9kZWxldGUnLCB7IGlkOiBpZCB9KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ+WIoOmZpOaIkOWKnycsXHJcbiAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnJlcGxpZXMuY3VycmVudF9wYWdlKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IucmVzcG9uc2UuZGF0YSxcclxuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2FuY2VsZWQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gdGV4dC1saXN0cy52dWU/MDQ0MTYzNTIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MTNcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MTRcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MTVcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicmlnaHQtbWFpblwiXG4gIH0sIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlLXRvb2xzXCJcbiAgfSwgW19jKCdlbC1mb3JtJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImRlbW8tZm9ybS1pbmxpbmVcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJpbmxpbmVcIjogdHJ1ZSxcbiAgICAgIFwibW9kZWxcIjogX3ZtLnNlYXJjaEZvcm1cbiAgICB9XG4gIH0sIFtfYygnZWwtZm9ybS1pdGVtJywgW19jKCdlbC1pbnB1dCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuaMieaYteensOaQnOe0olwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJrZXl1cFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSAmJiBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIF92bS5sb2FkRGF0YSgkZXZlbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uc2VhcmNoRm9ybS5rZXl3b3JkKSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgX3ZtLnNlYXJjaEZvcm0ua2V5d29yZCA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoRm9ybS5rZXl3b3JkXCJcbiAgICB9XG4gIH0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1mb3JtLWl0ZW0nLCBbX2MoJ2VsLXNlbGVjdCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuaAp+WIq+etm+mAiVwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjaGFuZ2VcIjogX3ZtLmxvYWREYXRhXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uc2VhcmNoRm9ybS5zZXgpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uc2VhcmNoRm9ybS5zZXggPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcInNlYXJjaEZvcm0uc2V4XCJcbiAgICB9XG4gIH0sIFtfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi5YWo6YOoXCIsXG4gICAgICBcInZhbHVlXCI6IFwiYWxsXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi55S3XCIsXG4gICAgICBcInZhbHVlXCI6IFwiMFwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLW9wdGlvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuWls1wiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIjFcIlxuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1vcHRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCLlhbblroNcIixcbiAgICAgIFwidmFsdWVcIjogXCIyXCJcbiAgICB9XG4gIH0pXSwgMSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIFtfYygnZWwtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCIsXG4gICAgICBcImljb25cIjogXCJzZWFyY2hcIlxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLnNlYXJjaFxuICAgIH1cbiAgfSwgW192bS5fdihcIuaQnOe0olwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJzdWNjZXNzXCIsXG4gICAgICBcImljb25cIjogXCJwbHVzXCJcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5zaG93RWRpdERpYWxvZ1xuICAgIH1cbiAgfSwgW192bS5fdihcIuaWsOWinuWbnuWkjeinhOWImVwiKV0pXSwgMSldLCAxKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUnLCB7XG4gICAgc3RhdGljU3R5bGU6IHtcbiAgICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgICB9LFxuICAgIGF0dHJzOiB7XG4gICAgICBcImRhdGFcIjogX3ZtLnJlcGxpZXMuZGF0YSxcbiAgICAgIFwiYm9yZGVyXCI6IFwiXCJcbiAgICB9XG4gIH0sIFtfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJ0cmlnZ2VyX2tleXdvcmRzXCIsXG4gICAgICBcImxhYmVsXCI6IFwi6Kem5Y+R5YWz6ZSu6K+NXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJjb250ZW50XCIsXG4gICAgICBcImxhYmVsXCI6IFwi5Zue5aSN5YaF5a65XCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJjcmVhdGVkX2F0XCIsXG4gICAgICBcImxhYmVsXCI6IFwi5re75Yqg5pe26Ze0XCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJ1cGRhdGVkX2F0XCIsXG4gICAgICBcImxhYmVsXCI6IFwi5L+u5pS55pe26Ze0XCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJyZW1hcmtcIixcbiAgICAgIFwibGFiZWxcIjogXCLlkb3kuK3mrKHmlbBcIlxuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdlbC10YWJsZS1jb2x1bW4nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCLmk43kvZxcIlxuICAgIH0sXG4gICAgaW5saW5lVGVtcGxhdGU6IHtcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICAgICAgICAgIHJldHVybiBfYygnZGl2JywgW19jKCdlbC1idXR0b24nLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBcInNpemVcIjogXCJzbWFsbFwiLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5zaG93RWRpdERpYWxvZyhfdm0ucm93KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgW192bS5fdihcIuS/ruaUuVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtYnV0dG9uJywge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgXCJzaXplXCI6IFwic21hbGxcIixcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZGFuZ2VyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5kZWxldGVSZXBseShfdm0ucm93LmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgW192bS5fdihcIuWIoOmZpFwiKV0pXSwgMSlcbiAgICAgICAgXG4gICAgICB9LFxuICAgICAgc3RhdGljUmVuZGVyRm5zOiBbXVxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIlxuICB9LCBbX2MoJ2VsLXBhZ2luYXRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiY3VycmVudC1wYWdlXCI6IF92bS5yZXBsaWVzLmN1cnJlbnRfcGFnZSxcbiAgICAgIFwicGFnZS1zaXplXCI6IF92bS5yZXBsaWVzLnBlcl9wYWdlLFxuICAgICAgXCJsYXlvdXRcIjogXCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiLFxuICAgICAgXCJ0b3RhbFwiOiBfdm0ucmVwbGllcy50YXRhbFxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY3VycmVudC1jaGFuZ2VcIjogX3ZtLmhhbmRsZUN1cnJlbnRDaGFuZ2VcbiAgICB9XG4gIH0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1kaWFsb2cnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidGl0bGVcIjogXCLmt7vliqDmlofmnKzlm57lpI1cIixcbiAgICAgIFwibW9kYWxcIjogZmFsc2VcbiAgICB9LFxuICAgIG1vZGVsOiB7XG4gICAgICB2YWx1ZTogKF92bS5kaWFsb2dGb3JtVmlzaWJsZSksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS5kaWFsb2dGb3JtVmlzaWJsZSA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nRm9ybVZpc2libGVcIlxuICAgIH1cbiAgfSwgW19jKCdlbC1mb3JtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcIm1vZGVsXCI6IF92bS5yZXBseUZvcm1EYXRhXG4gICAgfVxuICB9LCBbX2MoJ2VsLWZvcm0taXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuinpuWPkeWFs+mUruivjVwiLFxuICAgICAgXCJsYWJlbC13aWR0aFwiOiBcIjEyMFwiXG4gICAgfVxuICB9LCBbX2MoJ2VsLWlucHV0Jywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImF1dG8tY29tcGxldGVcIjogXCJvZmZcIixcbiAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLloavlhpnop6blj5HlhbPplK7lrZdcIlxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgIHZhbHVlOiAoX3ZtLnJlcGx5Rm9ybURhdGEudHJpZ2dlcl9rZXl3b3JkcyksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS5yZXBseUZvcm1EYXRhLnRyaWdnZXJfa2V5d29yZHMgPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcInJlcGx5Rm9ybURhdGEudHJpZ2dlcl9rZXl3b3Jkc1wiXG4gICAgfVxuICB9KV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtZm9ybS1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi5Zue5aSN5YaF5a65XCIsXG4gICAgICBcImxhYmVsLXdpZHRoXCI6IFwiMTIwXCJcbiAgICB9XG4gIH0sIFtfYygnZWwtaW5wdXQnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcInRleHRhcmVhXCIsXG4gICAgICBcInJvd3NcIjogNSxcbiAgICAgIFwicGxhY2Vob2xkZXJcIjogXCLloavlhpnlm57lpI3lhoXlrrlcIlxuICAgIH0sXG4gICAgbW9kZWw6IHtcbiAgICAgIHZhbHVlOiAoX3ZtLnJlcGx5Rm9ybURhdGEuY29udGVudCksXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgIF92bS5yZXBseUZvcm1EYXRhLmNvbnRlbnQgPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcInJlcGx5Rm9ybURhdGEuY29udGVudFwiXG4gICAgfVxuICB9KV0sIDEpXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiZGlhbG9nLWZvb3RlclwiLFxuICAgIHNsb3Q6IFwiZm9vdGVyXCJcbiAgfSwgW19jKCdlbC1idXR0b24nLCB7XG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5kaWFsb2dGb3JtVmlzaWJsZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi5Y+WIOa2iFwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCJcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImNsaWNrXCI6IF92bS5zdG9yZVJlcGx5XG4gICAgfVxuICB9LCBbX3ZtLl92KFwi56GuIOWumlwiKV0pXSwgMSldLCAxKV0sIDEpXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTc1ODUxNTM2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi03NTg1MTUzNlwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L3RleHQtbGlzdHMudnVlXG4vLyBtb2R1bGUgaWQgPSA0MTZcbi8vIG1vZHVsZSBjaHVua3MgPSAzIl0sInNvdXJjZVJvb3QiOiIifQ==