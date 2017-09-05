webpackJsonp([39],{

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(441)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(443),
  /* template */
  __webpack_require__(444),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-f3c0c84c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\admin\\components\\document\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f3c0c84c", Component.options)
  } else {
    hotAPI.reload("data-v-f3c0c84c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(442);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("496af81c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f3c0c84c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f3c0c84c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n.main .post-list[data-v-f3c0c84c] {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n  padding: 3rem;\n}\n.main .post-list li[data-v-f3c0c84c] {\n    display: block;\n    padding: .2em 0;\n    font-size: 16px;\n    line-height: 1.5em;\n}\n.main .post-list li[data-v-f3c0c84c]:hover {\n      background-color: rgba(255, 0, 0, 0.2);\n}\n.main .post-list li a[data-v-f3c0c84c] {\n      display: block;\n      color: #555;\n}\n.main .post-list li a[data-v-f3c0c84c]:visited {\n        color: red;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/admin/components/document/index.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,uBAAuB;EACvB,iBAAiB;EACjB,cAAc;CAAE;AAChB;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,mBAAmB;CAAE;AACrB;MACE,uCAAuC;CAAE;AAC3C;MACE,eAAe;MACf,YAAY;CAAE;AACd;QACE,WAAW;CAAE","file":"index.vue","sourcesContent":[".main .post-list {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n  padding: 3rem; }\n  .main .post-list li {\n    display: block;\n    padding: .2em 0;\n    font-size: 16px;\n    line-height: 1.5em; }\n    .main .post-list li:hover {\n      background-color: rgba(255, 0, 0, 0.2); }\n    .main .post-list li a {\n      display: block;\n      color: #555; }\n      .main .post-list li a:visited {\n        color: red; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      posts: [],
      searchForm: {
        name: '',
        level: 'all'
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

      this.axios.get('document/lists', {
        params: {
          name: this.searchForm.name,
          level: this.searchForm.level,
          page: page
        }
      }).then(function (response) {
        _this.posts = response.data.posts;
      }).catch(function (error) {
        _this.$message({
          message: error.response.data,
          type: 'error'
        });
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

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main main-with-padding"
  }, [_c('ul', {
    staticClass: "post-list"
  }, _vm._l((_vm.posts.data), function(post) {
    return _c('li', [_c('router-link', {
      attrs: {
        "to": '/document/show/' + post.id
      }
    }, [_vm._v(_vm._s(post.title))])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "paginator"
  }, [_c('el-pagination', {
    attrs: {
      "current-page": _vm.posts.current_page,
      "page-size": _vm.posts.per_page,
      "layout": "total, prev, pager, next, jumper",
      "total": _vm.posts.tatal
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f3c0c84c", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZG9jdW1lbnQvaW5kZXgudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9kb2N1bWVudC9pbmRleC52dWU/ZmZjZCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZG9jdW1lbnQvaW5kZXgudnVlPzQ0YmYiLCJ3ZWJwYWNrOi8vL2luZGV4LnZ1ZT8wNmYzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vY29tcG9uZW50cy9kb2N1bWVudC9pbmRleC52dWU/ZmQyMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3TTtBQUN4TTtBQUNBO0FBQ0E7QUFDQSx5QkFBbU87QUFDbk87QUFDQSx5QkFBa0k7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0EscUNBQThPO0FBQzlPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0SkFBNEosaUZBQWlGO0FBQzdPLHFLQUFxSyxpRkFBaUY7QUFDdFA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0EsOERBQStELG1CQUFtQiwyQkFBMkIscUJBQXFCLGtCQUFrQixHQUFHLHdDQUF3QyxxQkFBcUIsc0JBQXNCLHNCQUFzQix5QkFBeUIsR0FBRyw4Q0FBOEMsK0NBQStDLEdBQUcsMENBQTBDLHVCQUF1QixvQkFBb0IsR0FBRyxrREFBa0QscUJBQXFCLEdBQUcsVUFBVSxtSUFBbUksS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLEtBQUssTUFBTSxZQUFZLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsOERBQThELG1CQUFtQiwyQkFBMkIscUJBQXFCLGtCQUFrQixFQUFFLHlCQUF5QixxQkFBcUIsc0JBQXNCLHNCQUFzQix5QkFBeUIsRUFBRSxpQ0FBaUMsK0NBQStDLEVBQUUsNkJBQTZCLHVCQUF1QixvQkFBb0IsRUFBRSx1Q0FBdUMscUJBQXFCLEVBQUUscUJBQXFCOztBQUU1MUM7Ozs7Ozs7Ozs7Ozs7Ozt3QkNpQkE7O2FBRUE7O2NBRUE7ZUFHQTtBQUpBO0FBRkE7QUFRQTs4QkFDQTtTQUNBO0FBRUE7Ozs7O0FBRUE7Ozs7OztnQ0FHQTtpQ0FDQTtnQkFFQTtBQUpBO0FBREEsa0NBTUE7b0NBQ0E7Z0NBQ0E7O2tDQUVBO2dCQUVBO0FBSEE7QUFJQTtBQUdBOzhCQUNBO29CQUNBO0FBRUE7NERBQ0E7b0JBQ0E7QUFFQTtBQTFCQTtBQWZBLEU7Ozs7Ozs7QUN2QkEsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIzOS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZjNjMGM4NGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9pbmRleC52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vaW5kZXgudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1mM2MwYzg0Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2luZGV4LnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LWYzYzBjODRjXCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXGNvbXBvbmVudHNcXFxcZG9jdW1lbnRcXFxcaW5kZXgudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBpbmRleC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZjNjMGM4NGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1mM2MwYzg0Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2RvY3VtZW50L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMzkiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZjNjMGM4NGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9pbmRleC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjQ5NmFmODFjXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWYzYzBjODRjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWYzYzBjODRjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vaW5kZXgudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWYzYzBjODRjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2RvY3VtZW50L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMzkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLm1haW4gLnBvc3QtbGlzdFtkYXRhLXYtZjNjMGM4NGNdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAzcmVtO1xcbn1cXG4ubWFpbiAucG9zdC1saXN0IGxpW2RhdGEtdi1mM2MwYzg0Y10ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogLjJlbSAwO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG59XFxuLm1haW4gLnBvc3QtbGlzdCBsaVtkYXRhLXYtZjNjMGM4NGNdOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC4yKTtcXG59XFxuLm1haW4gLnBvc3QtbGlzdCBsaSBhW2RhdGEtdi1mM2MwYzg0Y10ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGNvbG9yOiAjNTU1O1xcbn1cXG4ubWFpbiAucG9zdC1saXN0IGxpIGFbZGF0YS12LWYzYzBjODRjXTp2aXNpdGVkIHtcXG4gICAgICAgIGNvbG9yOiByZWQ7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQVy92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2RvY3VtZW50L2luZGV4LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixjQUFjO0NBQUU7QUFDaEI7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixtQkFBbUI7Q0FBRTtBQUNyQjtNQUNFLHVDQUF1QztDQUFFO0FBQzNDO01BQ0UsZUFBZTtNQUNmLFlBQVk7Q0FBRTtBQUNkO1FBQ0UsV0FBVztDQUFFXCIsXCJmaWxlXCI6XCJpbmRleC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm1haW4gLnBvc3QtbGlzdCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogM3JlbTsgfVxcbiAgLm1haW4gLnBvc3QtbGlzdCBsaSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAuMmVtIDA7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtOyB9XFxuICAgIC5tYWluIC5wb3N0LWxpc3QgbGk6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjIpOyB9XFxuICAgIC5tYWluIC5wb3N0LWxpc3QgbGkgYSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgY29sb3I6ICM1NTU7IH1cXG4gICAgICAubWFpbiAucG9zdC1saXN0IGxpIGE6dmlzaXRlZCB7XFxuICAgICAgICBjb2xvcjogcmVkOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWYzYzBjODRjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9jb21wb25lbnRzL2RvY3VtZW50L2luZGV4LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMzkiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1haW4gbWFpbi13aXRoLXBhZGRpbmdcIj5cclxuICAgIDx1bCBjbGFzcz1cInBvc3QtbGlzdFwiPlxyXG4gICAgICA8bGkgdi1mb3I9XCJwb3N0IGluIHBvc3RzLmRhdGFcIj5cclxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9kb2N1bWVudC9zaG93LycgKyBwb3N0LmlkXCI+e3sgcG9zdC50aXRsZSB9fTwvcm91dGVyLWxpbms+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0b3JcIj5cclxuICAgICAgPGVsLXBhZ2luYXRpb25cclxuICAgICAgICAgICAgICBAY3VycmVudC1jaGFuZ2U9XCJoYW5kbGVDdXJyZW50Q2hhbmdlXCJcclxuICAgICAgICAgICAgICA6Y3VycmVudC1wYWdlPVwicG9zdHMuY3VycmVudF9wYWdlXCJcclxuICAgICAgICAgICAgICA6cGFnZS1zaXplPVwicG9zdHMucGVyX3BhZ2VcIlxyXG4gICAgICAgICAgICAgIGxheW91dD1cInRvdGFsLCBwcmV2LCBwYWdlciwgbmV4dCwganVtcGVyXCJcclxuICAgICAgICAgICAgICA6dG90YWw9XCJwb3N0cy50YXRhbFwiPlxyXG4gICAgICA8L2VsLXBhZ2luYXRpb24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBvc3RzOiBbXSxcclxuICAgICAgICBzZWFyY2hGb3JtOiB7XHJcbiAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgIGxldmVsOiAnYWxsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGxvYWREYXRhIChwYWdlID0gMSkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdkb2N1bWVudC9saXN0cycsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLnNlYXJjaEZvcm0ubmFtZSxcclxuICAgICAgICAgICAgbGV2ZWw6IHRoaXMuc2VhcmNoRm9ybS5sZXZlbCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBvc3RzID0gcmVzcG9uc2UuZGF0YS5wb3N0cztcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5yZXNwb25zZS5kYXRhLFxyXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5pCc57SiXHJcbiAgICAgIHNlYXJjaCAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgxKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGhhbmRsZUN1cnJlbnRDaGFuZ2UgKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKHBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAubWFpbiB7XHJcblxyXG4gICAgLnBvc3QtbGlzdCB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICBwYWRkaW5nOiAzcmVtO1xyXG5cclxuICAgICAgbGkge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHBhZGRpbmc6IC4yZW0gMDtcclxuICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xyXG5cclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYSB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGNvbG9yOiAjNTU1O1xyXG5cclxuICAgICAgICAgICY6dmlzaXRlZCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gaW5kZXgudnVlPzZiODEyNzBlIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibWFpbiBtYWluLXdpdGgtcGFkZGluZ1wiXG4gIH0sIFtfYygndWwnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicG9zdC1saXN0XCJcbiAgfSwgX3ZtLl9sKChfdm0ucG9zdHMuZGF0YSksIGZ1bmN0aW9uKHBvc3QpIHtcbiAgICByZXR1cm4gX2MoJ2xpJywgW19jKCdyb3V0ZXItbGluaycsIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy9kb2N1bWVudC9zaG93LycgKyBwb3N0LmlkXG4gICAgICB9XG4gICAgfSwgW192bS5fdihfdm0uX3MocG9zdC50aXRsZSkpXSldLCAxKVxuICB9KSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicGFnaW5hdG9yXCJcbiAgfSwgW19jKCdlbC1wYWdpbmF0aW9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImN1cnJlbnQtcGFnZVwiOiBfdm0ucG9zdHMuY3VycmVudF9wYWdlLFxuICAgICAgXCJwYWdlLXNpemVcIjogX3ZtLnBvc3RzLnBlcl9wYWdlLFxuICAgICAgXCJsYXlvdXRcIjogXCJ0b3RhbCwgcHJldiwgcGFnZXIsIG5leHQsIGp1bXBlclwiLFxuICAgICAgXCJ0b3RhbFwiOiBfdm0ucG9zdHMudGF0YWxcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBcImN1cnJlbnQtY2hhbmdlXCI6IF92bS5oYW5kbGVDdXJyZW50Q2hhbmdlXG4gICAgfVxuICB9KV0sIDEpXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZjNjMGM4NGNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWYzYzBjODRjXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL2NvbXBvbmVudHMvZG9jdW1lbnQvaW5kZXgudnVlXG4vLyBtb2R1bGUgaWQgPSA0NDRcbi8vIG1vZHVsZSBjaHVua3MgPSAzOSJdLCJzb3VyY2VSb290IjoiIn0=