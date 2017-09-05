webpackJsonp([29],{

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(417)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(419),
  /* template */
  __webpack_require__(420),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e487f948",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\reply\\news-lists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] news-lists.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e487f948", Component.options)
  } else {
    hotAPI.reload("data-v-e487f948", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(418);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("6e3f77e4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e487f948\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-lists.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e487f948\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-lists.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"news-lists.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      fans: [],
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

      this.axios.get('reply/lists?type=text', {
        params: {
          keyword: this.searchForm.keyword,
          sex: this.searchForm.sex,
          page: page
        }
      }).then(function (response) {
        _this.fans = response.data.fans;
      });
    },
    search: function search() {
      this.loadData(1);
    },
    handleCurrentChange: function handleCurrentChange(page) {
      this.loadData(page);
    }
  }
};

/***/ }),

/***/ 420:
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
  }, [_vm._v("搜索")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.fans.data,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "nickname",
      "label": "触发关键词"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "sex",
      "label": "回复内容"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "location",
      "label": "添加时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "tagid_list",
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
                _vm.charge(_vm.row.id)
              }
            }
          }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
            attrs: {
              "size": "small",
              "type": "danger"
            },
            nativeOn: {
              "click": function($event) {
                _vm.charge(_vm.row.id)
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
      "current-page": _vm.fans.current_page,
      "page-size": _vm.fans.per_page,
      "layout": "total, prev, pager, next, jumper",
      "total": _vm.fans.tatal
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e487f948", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvbmV3cy1saXN0cy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L25ld3MtbGlzdHMudnVlP2Q2MGYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL3JlcGx5L25ld3MtbGlzdHMudnVlPzdkMjUiLCJ3ZWJwYWNrOi8vL25ld3MtbGlzdHMudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9yZXBseS9uZXdzLWxpc3RzLnZ1ZT8zNWFiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdNO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBLHlCQUFtTztBQUNuTztBQUNBLHlCQUFrSTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUNyQ0E7O0FBRUE7QUFDQSxxQ0FBOE87QUFDOU87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRKQUE0SixpRkFBaUY7QUFDN08scUtBQXFLLGlGQUFpRjtBQUN0UDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSxpQ0FBa0MsMEZBQTBGOztBQUU1SDs7Ozs7Ozs7Ozs7Ozs7O3dCQ2dEQTs7WUFFQTs7Y0FFQTthQUdBO0FBSkE7QUFGQTtBQVFBOzhCQUNBO1NBQ0E7QUFFQTs7Ozs7QUFFQTs7Ozs7O21DQUdBOytCQUNBO2dCQUVBO0FBSkE7QUFEQSxrQ0FNQTttQ0FDQTtBQUNBO0FBR0E7OEJBQ0E7b0JBQ0E7QUFFQTs0REFDQTtvQkFDQTtBQUVBO0FBckJBO0FBZkEsRTs7Ozs7OztBQ3REQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyRUFBMkUsYUFBYTtBQUN4RjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVgsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWU0ODdmOTQ4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vbmV3cy1saXN0cy52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vbmV3cy1saXN0cy52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWU0ODdmOTQ4XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbmV3cy1saXN0cy52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBcImRhdGEtdi1lNDg3Zjk0OFwiLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV1xcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxhZG1pblxcXFxjb21wb25lbnRzXFxcXHJlcGx5XFxcXG5ld3MtbGlzdHMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBuZXdzLWxpc3RzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1lNDg3Zjk0OFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWU0ODdmOTQ4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvbmV3cy1saXN0cy52dWVcbi8vIG1vZHVsZSBpZCA9IDM3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDI5IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWU0ODdmOTQ4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbmV3cy1saXN0cy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjZlM2Y3N2U0XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWU0ODdmOTQ4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbmV3cy1saXN0cy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZTQ4N2Y5NDhcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9uZXdzLWxpc3RzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lNDg3Zjk0OFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9yZXBseS9uZXdzLWxpc3RzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMjkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcImZpbGVcIjpcIm5ld3MtbGlzdHMudnVlXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZTQ4N2Y5NDhcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvcmVwbHkvbmV3cy1saXN0cy52dWVcbi8vIG1vZHVsZSBpZCA9IDQxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDI5IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJyaWdodC1tYWluXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGFibGUtdG9vbHNcIj5cclxuICAgICAgPGVsLWZvcm0gOmlubGluZT1cInRydWVcIiA6bW9kZWw9XCJzZWFyY2hGb3JtXCIgY2xhc3M9XCJkZW1vLWZvcm0taW5saW5lXCI+XHJcbiAgICAgICAgPGVsLWZvcm0taXRlbT5cclxuICAgICAgICAgIDxlbC1pbnB1dCB2LW1vZGVsPVwic2VhcmNoRm9ybS5rZXl3b3JkXCIgcGxhY2Vob2xkZXI9XCLmjInmmLXnp7DmkJzntKJcIiBAa2V5dXAuZW50ZXIubmF0aXZlPVwibG9hZERhdGFcIj48L2VsLWlucHV0PlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICA8ZWwtc2VsZWN0IHYtbW9kZWw9XCJzZWFyY2hGb3JtLnNleFwiIHBsYWNlaG9sZGVyPVwi5oCn5Yir562b6YCJXCIgQGNoYW5nZT1cImxvYWREYXRhXCI+XHJcbiAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlhajpg6hcIiB2YWx1ZT1cImFsbFwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi55S3XCIgdmFsdWU9XCIwXCI+PC9lbC1vcHRpb24+XHJcbiAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlpbNcIiB2YWx1ZT1cIjFcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIuWFtuWug1wiIHZhbHVlPVwiMlwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgPC9lbC1zZWxlY3Q+XHJcbiAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgPGVsLWZvcm0taXRlbT5cclxuICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBpY29uPVwic2VhcmNoXCIgQGNsaWNrPVwic2VhcmNoXCI+5pCc57SiPC9lbC1idXR0b24+XHJcbiAgICAgICAgPC9lbC1mb3JtLWl0ZW0+XHJcbiAgICAgIDwvZWwtZm9ybT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxlbC10YWJsZSA6ZGF0YT1cImZhbnMuZGF0YVwiIGJvcmRlciBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cIm5pY2tuYW1lXCIgbGFiZWw9XCLop6blj5HlhbPplK7or41cIj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInNleFwiIGxhYmVsPVwi5Zue5aSN5YaF5a65XCI+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIHByb3A9XCJsb2NhdGlvblwiIGxhYmVsPVwi5re75Yqg5pe26Ze0XCI+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIHByb3A9XCJ0YWdpZF9saXN0XCIgbGFiZWw9XCLkv67mlLnml7bpl7RcIj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInJlbWFya1wiIGxhYmVsPVwi5ZG95Lit5qyh5pWwXCI+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIGxhYmVsPVwi5pON5L2cXCIgaW5saW5lLXRlbXBsYXRlPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8ZWwtYnV0dG9uIHNpemU9XCJzbWFsbFwiIHR5cGU9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cImNoYXJnZShyb3cuaWQpXCI+5L+u5pS5PC9lbC1idXR0b24+XHJcbiAgICAgICAgICA8ZWwtYnV0dG9uIHNpemU9XCJzbWFsbFwiIHR5cGU9XCJkYW5nZXJcIiBAY2xpY2submF0aXZlPVwiY2hhcmdlKHJvdy5pZClcIj7liKDpmaQ8L2VsLWJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICA8L2VsLXRhYmxlPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0b3JcIj5cclxuICAgICAgPGVsLXBhZ2luYXRpb25cclxuICAgICAgICAgICAgICBAY3VycmVudC1jaGFuZ2U9XCJoYW5kbGVDdXJyZW50Q2hhbmdlXCJcclxuICAgICAgICAgICAgICA6Y3VycmVudC1wYWdlPVwiZmFucy5jdXJyZW50X3BhZ2VcIlxyXG4gICAgICAgICAgICAgIDpwYWdlLXNpemU9XCJmYW5zLnBlcl9wYWdlXCJcclxuICAgICAgICAgICAgICBsYXlvdXQ9XCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiXHJcbiAgICAgICAgICAgICAgOnRvdGFsPVwiZmFucy50YXRhbFwiPlxyXG4gICAgICA8L2VsLXBhZ2luYXRpb24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZmFuczogW10sXHJcbiAgICAgICAgc2VhcmNoRm9ybToge1xyXG4gICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICBzZXg6ICdhbGwnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgbG9hZERhdGEgKHBhZ2UgPSAxKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ3JlcGx5L2xpc3RzP3R5cGU9dGV4dCcsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLnNlYXJjaEZvcm0ua2V5d29yZCxcclxuICAgICAgICAgICAgc2V4OiB0aGlzLnNlYXJjaEZvcm0uc2V4LFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMuZmFucyA9IHJlc3BvbnNlLmRhdGEuZmFucztcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOaQnOe0olxyXG4gICAgICBzZWFyY2ggKCkge1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoMSk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBoYW5kbGVDdXJyZW50Q2hhbmdlIChwYWdlKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YShwYWdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbjwvc3R5bGU+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG5ld3MtbGlzdHMudnVlPzI2ZjRhZDZlIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicmlnaHQtbWFpblwiXG4gIH0sIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInRhYmxlLXRvb2xzXCJcbiAgfSwgW19jKCdlbC1mb3JtJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImRlbW8tZm9ybS1pbmxpbmVcIixcbiAgICBhdHRyczoge1xuICAgICAgXCJpbmxpbmVcIjogdHJ1ZSxcbiAgICAgIFwibW9kZWxcIjogX3ZtLnNlYXJjaEZvcm1cbiAgICB9XG4gIH0sIFtfYygnZWwtZm9ybS1pdGVtJywgW19jKCdlbC1pbnB1dCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuaMieaYteensOaQnOe0olwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJrZXl1cFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSAmJiBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMpKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIF92bS5sb2FkRGF0YSgkZXZlbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uc2VhcmNoRm9ybS5rZXl3b3JkKSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgX3ZtLnNlYXJjaEZvcm0ua2V5d29yZCA9ICQkdlxuICAgICAgfSxcbiAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoRm9ybS5rZXl3b3JkXCJcbiAgICB9XG4gIH0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1mb3JtLWl0ZW0nLCBbX2MoJ2VsLXNlbGVjdCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIuaAp+WIq+etm+mAiVwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjaGFuZ2VcIjogX3ZtLmxvYWREYXRhXG4gICAgfSxcbiAgICBtb2RlbDoge1xuICAgICAgdmFsdWU6IChfdm0uc2VhcmNoRm9ybS5zZXgpLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICBfdm0uc2VhcmNoRm9ybS5zZXggPSAkJHZcbiAgICAgIH0sXG4gICAgICBleHByZXNzaW9uOiBcInNlYXJjaEZvcm0uc2V4XCJcbiAgICB9XG4gIH0sIFtfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi5YWo6YOoXCIsXG4gICAgICBcInZhbHVlXCI6IFwiYWxsXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtb3B0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi55S3XCIsXG4gICAgICBcInZhbHVlXCI6IFwiMFwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLW9wdGlvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJsYWJlbFwiOiBcIuWls1wiLFxuICAgICAgXCJ2YWx1ZVwiOiBcIjFcIlxuICAgIH1cbiAgfSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1vcHRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwibGFiZWxcIjogXCLlhbblroNcIixcbiAgICAgIFwidmFsdWVcIjogXCIyXCJcbiAgICB9XG4gIH0pXSwgMSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLWZvcm0taXRlbScsIFtfYygnZWwtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJwcmltYXJ5XCIsXG4gICAgICBcImljb25cIjogXCJzZWFyY2hcIlxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2xpY2tcIjogX3ZtLnNlYXJjaFxuICAgIH1cbiAgfSwgW192bS5fdihcIuaQnOe0olwiKV0pXSwgMSldLCAxKV0sIDEpLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUnLCB7XG4gICAgc3RhdGljU3R5bGU6IHtcbiAgICAgIFwid2lkdGhcIjogXCIxMDAlXCJcbiAgICB9LFxuICAgIGF0dHJzOiB7XG4gICAgICBcImRhdGFcIjogX3ZtLmZhbnMuZGF0YSxcbiAgICAgIFwiYm9yZGVyXCI6IFwiXCJcbiAgICB9XG4gIH0sIFtfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJuaWNrbmFtZVwiLFxuICAgICAgXCJsYWJlbFwiOiBcIuinpuWPkeWFs+mUruivjVwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLXRhYmxlLWNvbHVtbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwcm9wXCI6IFwic2V4XCIsXG4gICAgICBcImxhYmVsXCI6IFwi5Zue5aSN5YaF5a65XCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInByb3BcIjogXCJsb2NhdGlvblwiLFxuICAgICAgXCJsYWJlbFwiOiBcIua3u+WKoOaXtumXtFwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLXRhYmxlLWNvbHVtbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwcm9wXCI6IFwidGFnaWRfbGlzdFwiLFxuICAgICAgXCJsYWJlbFwiOiBcIuS/ruaUueaXtumXtFwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2VsLXRhYmxlLWNvbHVtbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJwcm9wXCI6IFwicmVtYXJrXCIsXG4gICAgICBcImxhYmVsXCI6IFwi5ZG95Lit5qyh5pWwXCJcbiAgICB9XG4gIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZWwtdGFibGUtY29sdW1uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImxhYmVsXCI6IFwi5pON5L2cXCJcbiAgICB9LFxuICAgIGlubGluZVRlbXBsYXRlOiB7XG4gICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgICAgICAgICByZXR1cm4gX2MoJ2RpdicsIFtfYygnZWwtYnV0dG9uJywge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgXCJzaXplXCI6IFwic21hbGxcIixcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicHJpbWFyeVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0uY2hhcmdlKF92bS5yb3cuaWQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBbX3ZtLl92KFwi5L+u5pS5XCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdlbC1idXR0b24nLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBcInNpemVcIjogXCJzbWFsbFwiLFxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJkYW5nZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLmNoYXJnZShfdm0ucm93LmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgW192bS5fdihcIuWIoOmZpFwiKV0pXSwgMSlcbiAgICAgICAgXG4gICAgICB9LFxuICAgICAgc3RhdGljUmVuZGVyRm5zOiBbXVxuICAgIH1cbiAgfSldLCAxKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIlxuICB9LCBbX2MoJ2VsLXBhZ2luYXRpb24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiY3VycmVudC1wYWdlXCI6IF92bS5mYW5zLmN1cnJlbnRfcGFnZSxcbiAgICAgIFwicGFnZS1zaXplXCI6IF92bS5mYW5zLnBlcl9wYWdlLFxuICAgICAgXCJsYXlvdXRcIjogXCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiLFxuICAgICAgXCJ0b3RhbFwiOiBfdm0uZmFucy50YXRhbFxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY3VycmVudC1jaGFuZ2VcIjogX3ZtLmhhbmRsZUN1cnJlbnRDaGFuZ2VcbiAgICB9XG4gIH0pXSwgMSldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi1lNDg3Zjk0OFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtZTQ4N2Y5NDhcIixcImhhc1Njb3BlZFwiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9yZXBseS9uZXdzLWxpc3RzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMjkiXSwic291cmNlUm9vdCI6IiJ9