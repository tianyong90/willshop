webpackJsonp([16],{

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(172),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\category.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] category.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0692b0ab", Component.options)
  } else {
    hotAPI.reload("data-v-0692b0ab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(170);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("5c9c681a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0692b0ab\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0692b0ab\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll;\n}\n.left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6;\n}\n.left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red;\n}\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n}\n.right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem;\n}\n.right-panel .category-item {\n    background-color: #fff;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/category.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,iBAAiB;IACjB,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,iCAAiC;CAAE;AACnC;MACE,0BAA0B;MAC1B,WAAW;CAAE;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,UAAU;EACV,SAAS;EACT,OAAO;EACP,aAAa;EACb,cAAc;EACd,0BAA0B;CAAE;AAC5B;IACE,eAAe;IACf,YAAY;IACZ,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,uBAAuB;CAAE","file":"category.vue","sourcesContent":[".left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll; }\n  .left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6; }\n    .left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red; }\n\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5; }\n  .right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem; }\n  .right-panel .category-item {\n    background-color: #fff; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  created: function created() {
    this.fetchCategories();
  },
  data: function data() {
    return {
      categories: [],
      activeCategoryId: null
    };
  },


  methods: {
    fetchCategories: function fetchCategories() {
      var _this = this;

      this.axios.get('product-categories').then(function (response) {
        _this.categories = response.data.categories;

        _this.activeCategoryId = _this.categories[0].id;
      });
    },
    sidebarItemClick: function sidebarItemClick(categoryId) {
      if (this.activeCategoryId !== categoryId) this.activeCategoryId = categoryId;
    }
  }
};

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "left-sidebar"
  }, _vm._l((_vm.categories), function(category) {
    return _c('div', {
      staticClass: "sidebar-item",
      class: {
        'active': category.id === _vm.activeCategoryId
      },
      on: {
        "click": function($event) {
          _vm.sidebarItemClick(category.id)
        }
      }
    }, [_vm._v("\n      " + _vm._s(category.name) + "\n    ")])
  })), _vm._v(" "), _c('div', {
    staticClass: "right-panel"
  }, [_c('img', {
    staticClass: "banner",
    attrs: {
      "src": "http://lorempixel.com/640/150/?28423",
      "alt": ""
    }
  }), _vm._v(" "), _c('wv-grid', [_c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })]), _vm._v(" "), _c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })]), _vm._v(" "), _c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })]), _vm._v(" "), _c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })]), _vm._v(" "), _c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })]), _vm._v(" "), _c('wv-grid-item', {
    staticClass: "category-item",
    attrs: {
      "to": "/product/1"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://lorempixel.com/50/50/?28423",
      "alt": ""
    }
  })])], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0692b0ab", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXRlZ29yeS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2F0ZWdvcnkudnVlP2Y5MTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2F0ZWdvcnkudnVlPzg2YjUiLCJ3ZWJwYWNrOi8vL2NhdGVnb3J5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXRlZ29yeS52dWU/YzdlMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFzTTtBQUN0TTtBQUNBO0FBQ0E7QUFDQSx5QkFBbU87QUFDbk87QUFDQSx5QkFBZ0k7QUFDaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxzREFBc0QsSUFBSTtBQUN6SSxtQ0FBbUM7O0FBRW5DO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDckNBOztBQUVBO0FBQ0EscUNBQXlPO0FBQ3pPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSkFBc0osa0ZBQWtGO0FBQ3hPLCtKQUErSixrRkFBa0Y7QUFDalA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0EsMENBQTJDLG1CQUFtQixvQkFBb0IsV0FBVyxZQUFZLGlCQUFpQixlQUFlLDJCQUEyQixpQkFBaUIsdUJBQXVCLEdBQUcsK0JBQStCLHFCQUFxQix1QkFBdUIseUJBQXlCLHFCQUFxQixzQkFBc0IsdUNBQXVDLEdBQUcsc0NBQXNDLGtDQUFrQyxtQkFBbUIsR0FBRyxnQkFBZ0IsbUJBQW1CLG9CQUFvQixjQUFjLGFBQWEsV0FBVyxpQkFBaUIsa0JBQWtCLDhCQUE4QixHQUFHLHdCQUF3QixxQkFBcUIsa0JBQWtCLDZCQUE2QiwwQkFBMEIsR0FBRywrQkFBK0IsNkJBQTZCLEdBQUcsVUFBVSxrSUFBa0ksS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsS0FBSyxNQUFNLFlBQVksV0FBVyxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLEtBQUssTUFBTSxZQUFZLDhEQUE4RCxtQkFBbUIsb0JBQW9CLFdBQVcsWUFBWSxpQkFBaUIsZUFBZSwyQkFBMkIsaUJBQWlCLHVCQUF1QixFQUFFLGlDQUFpQyxxQkFBcUIsdUJBQXVCLHlCQUF5QixxQkFBcUIsc0JBQXNCLHVDQUF1QyxFQUFFLDBDQUEwQyxrQ0FBa0MsbUJBQW1CLEVBQUUsa0JBQWtCLG1CQUFtQixvQkFBb0IsY0FBYyxhQUFhLFdBQVcsaUJBQWlCLGtCQUFrQiw4QkFBOEIsRUFBRSwwQkFBMEIscUJBQXFCLGtCQUFrQiw2QkFBNkIsMEJBQTBCLEVBQUUsaUNBQWlDLDZCQUE2QixFQUFFLHFCQUFxQjs7QUFFbHNFOzs7Ozs7Ozs7Ozs7Ozs7OEJDK0JBO1NBQ0E7QUFFQTt3QkFDQTs7a0JBRUE7d0JBRUE7QUFIQTtBQUtBOzs7OztBQUVBOztvRUFDQTt5Q0FFQTs7cURBQ0E7QUFDQTtBQUVBOzREQUNBO3dFQUNBO0FBRUE7QUFaQTtBQVpBLEU7Ozs7Ozs7QUNyQ0EsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC1jYXRlZ29yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDY5MmIwYWJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIpXG59XG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2NhdGVnb3J5LnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDY5MmIwYWJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgbnVsbCxcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdfTkc3LjBcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXGNhdGVnb3J5LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gY2F0ZWdvcnkudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTA2OTJiMGFiXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMDY5MmIwYWJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhdGVnb3J5LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDY5MmIwYWJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI1YzljNjgxYVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0wNjkyYjBhYlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jYXRlZ29yeS52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDY5MmIwYWJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTA2OTJiMGFiXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2NhdGVnb3J5LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmxlZnQtc2lkZWJhciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBib3R0b206IDUwcHg7XFxuICB3aWR0aDogNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHotaW5kZXg6IDIwMDtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG59XFxuLmxlZnQtc2lkZWJhciAuc2lkZWJhci1pdGVtIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMWVtIDA7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmNmY2ZjY7XFxufVxcbi5sZWZ0LXNpZGViYXIgLnNpZGViYXItaXRlbS5hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XFxuICAgICAgY29sb3I6IHJlZDtcXG59XFxuLnJpZ2h0LXBhbmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogNWVtO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDUwcHg7XFxuICBwYWRkaW5nOiAuNWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG59XFxuLnJpZ2h0LXBhbmVsIC5iYW5uZXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcbi5yaWdodC1wYW5lbCAuY2F0ZWdvcnktaXRlbSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQV19ORzcuMC92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvY2F0ZWdvcnkudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLFFBQVE7RUFDUixhQUFhO0VBQ2IsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsbUJBQW1CO0NBQUU7QUFDckI7SUFDRSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlDQUFpQztDQUFFO0FBQ25DO01BQ0UsMEJBQTBCO01BQzFCLFdBQVc7Q0FBRTtBQUVuQjtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxPQUFPO0VBQ1AsYUFBYTtFQUNiLGNBQWM7RUFDZCwwQkFBMEI7Q0FBRTtBQUM1QjtJQUNFLGVBQWU7SUFDZixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLG9CQUFvQjtDQUFFO0FBQ3hCO0lBQ0UsdUJBQXVCO0NBQUVcIixcImZpbGVcIjpcImNhdGVnb3J5LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVmdC1zaWRlYmFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogNTBweDtcXG4gIHdpZHRoOiA1ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgei1pbmRleDogMjAwO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyB9XFxuICAubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxZW0gMDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2ZjZmNjsgfVxcbiAgICAubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0uYWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbiAgICAgIGNvbG9yOiByZWQ7IH1cXG5cXG4ucmlnaHQtcGFuZWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiA1ZW07XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogNTBweDtcXG4gIHBhZGRpbmc6IC41ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB9XFxuICAucmlnaHQtcGFuZWwgLmJhbm5lciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTsgfVxcbiAgLnJpZ2h0LXBhbmVsIC5jYXRlZ29yeS1pdGVtIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0wNjkyYjBhYlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXRlZ29yeS52dWVcbi8vIG1vZHVsZSBpZCA9IDE3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE2IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibGVmdC1zaWRlYmFyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzaWRlYmFyLWl0ZW1cIiA6Y2xhc3M9XCJ7ICdhY3RpdmUnOiBjYXRlZ29yeS5pZCA9PT0gYWN0aXZlQ2F0ZWdvcnlJZCB9XCIgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCIgQGNsaWNrPVwic2lkZWJhckl0ZW1DbGljayhjYXRlZ29yeS5pZClcIj5cclxuICAgICAgICB7eyBjYXRlZ29yeS5uYW1lIH19XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICAgIDxkaXYgY2xhc3M9XCJyaWdodC1wYW5lbFwiPlxyXG4gICAgICA8aW1nIGNsYXNzPVwiYmFubmVyXCIgc3JjPVwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC8xNTAvPzI4NDIzXCIgYWx0PVwiXCIvPlxyXG5cclxuICAgICAgPHd2LWdyaWQ+XHJcbiAgICAgICAgPHd2LWdyaWQtaXRlbSBjbGFzcz1cImNhdGVnb3J5LWl0ZW1cIiB0bz1cIi9wcm9kdWN0LzFcIj5cclxuICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzUwLzUwLz8yODQyM1wiIGFsdD1cIlwiIGNsYXNzPVwibG9nb1wiLz5cclxuICAgICAgICA8L3d2LWdyaWQtaXRlbT5cclxuICAgICAgICA8d3YtZ3JpZC1pdGVtIGNsYXNzPVwiY2F0ZWdvcnktaXRlbVwiIHRvPVwiL3Byb2R1Y3QvMVwiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCJodHRwOi8vbG9yZW1waXhlbC5jb20vNTAvNTAvPzI4NDIzXCIgYWx0PVwiXCIgY2xhc3M9XCJsb2dvXCIvPlxyXG4gICAgICAgIDwvd3YtZ3JpZC1pdGVtPlxyXG4gICAgICAgIDx3di1ncmlkLWl0ZW0gY2xhc3M9XCJjYXRlZ29yeS1pdGVtXCIgdG89XCIvcHJvZHVjdC8xXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS81MC81MC8/Mjg0MjNcIiBhbHQ9XCJcIiBjbGFzcz1cImxvZ29cIi8+XHJcbiAgICAgICAgPC93di1ncmlkLWl0ZW0+XHJcbiAgICAgICAgPHd2LWdyaWQtaXRlbSBjbGFzcz1cImNhdGVnb3J5LWl0ZW1cIiB0bz1cIi9wcm9kdWN0LzFcIj5cclxuICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzUwLzUwLz8yODQyM1wiIGFsdD1cIlwiIGNsYXNzPVwibG9nb1wiLz5cclxuICAgICAgICA8L3d2LWdyaWQtaXRlbT5cclxuICAgICAgICA8d3YtZ3JpZC1pdGVtIGNsYXNzPVwiY2F0ZWdvcnktaXRlbVwiIHRvPVwiL3Byb2R1Y3QvMVwiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCJodHRwOi8vbG9yZW1waXhlbC5jb20vNTAvNTAvPzI4NDIzXCIgYWx0PVwiXCIgY2xhc3M9XCJsb2dvXCIvPlxyXG4gICAgICAgIDwvd3YtZ3JpZC1pdGVtPlxyXG4gICAgICAgIDx3di1ncmlkLWl0ZW0gY2xhc3M9XCJjYXRlZ29yeS1pdGVtXCIgdG89XCIvcHJvZHVjdC8xXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS81MC81MC8/Mjg0MjNcIiBhbHQ9XCJcIiBjbGFzcz1cImxvZ29cIi8+XHJcbiAgICAgICAgPC93di1ncmlkLWl0ZW0+XHJcbiAgICAgIDwvd3YtZ3JpZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjcmVhdGVkICgpIHtcclxuICAgICAgdGhpcy5mZXRjaENhdGVnb3JpZXMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICBhY3RpdmVDYXRlZ29yeUlkOiBudWxsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBmZXRjaENhdGVnb3JpZXMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0LWNhdGVnb3JpZXMnKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlc3BvbnNlLmRhdGEuY2F0ZWdvcmllc1xyXG5cclxuICAgICAgICAgIHRoaXMuYWN0aXZlQ2F0ZWdvcnlJZCA9IHRoaXMuY2F0ZWdvcmllc1swXS5pZFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzaWRlYmFySXRlbUNsaWNrIChjYXRlZ29yeUlkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlQ2F0ZWdvcnlJZCAhPT0gY2F0ZWdvcnlJZCkgdGhpcy5hY3RpdmVDYXRlZ29yeUlkID0gY2F0ZWdvcnlJZFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG4gIC5sZWZ0LXNpZGViYXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYm90dG9tOiA1MHB4O1xyXG4gICAgd2lkdGg6IDVlbTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICB6LWluZGV4OiAyMDA7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcblxyXG4gICAgLnNpZGViYXItaXRlbSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDFlbSAwO1xyXG4gICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2O1xyXG4gICAgICBcclxuICAgICAgJi5hY3RpdmUge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XHJcbiAgICAgICAgY29sb3I6IHJlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnJpZ2h0LXBhbmVsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbGVmdDogNWVtO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDUwcHg7XHJcbiAgICBwYWRkaW5nOiAuNWVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICAgIFxyXG4gICAgLmJhbm5lciB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNhdGVnb3J5LWl0ZW0ge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNhdGVnb3J5LnZ1ZT8xM2I5MTVhOCIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2JywgW19jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibGVmdC1zaWRlYmFyXCJcbiAgfSwgX3ZtLl9sKChfdm0uY2F0ZWdvcmllcyksIGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJzaWRlYmFyLWl0ZW1cIixcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdhY3RpdmUnOiBjYXRlZ29yeS5pZCA9PT0gX3ZtLmFjdGl2ZUNhdGVnb3J5SWRcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIF92bS5zaWRlYmFySXRlbUNsaWNrKGNhdGVnb3J5LmlkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW192bS5fdihcIlxcbiAgICAgIFwiICsgX3ZtLl9zKGNhdGVnb3J5Lm5hbWUpICsgXCJcXG4gICAgXCIpXSlcbiAgfSkpLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcInJpZ2h0LXBhbmVsXCJcbiAgfSwgW19jKCdpbWcnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYmFubmVyXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3JjXCI6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC8xNTAvPzI4NDIzXCIsXG4gICAgICBcImFsdFwiOiBcIlwiXG4gICAgfVxuICB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LWdyaWQnLCBbX2MoJ3d2LWdyaWQtaXRlbScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjYXRlZ29yeS1pdGVtXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvcHJvZHVjdC8xXCJcbiAgICB9XG4gIH0sIFtfYygnaW1nJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICBhdHRyczoge1xuICAgICAgXCJzcmNcIjogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNTAvNTAvPzI4NDIzXCIsXG4gICAgICBcImFsdFwiOiBcIlwiXG4gICAgfVxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtZ3JpZC1pdGVtJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5LWl0ZW1cIixcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9wcm9kdWN0LzFcIlxuICAgIH1cbiAgfSwgW19jKCdpbWcnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibG9nb1wiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInNyY1wiOiBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS81MC81MC8/Mjg0MjNcIixcbiAgICAgIFwiYWx0XCI6IFwiXCJcbiAgICB9XG4gIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di1ncmlkLWl0ZW0nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY2F0ZWdvcnktaXRlbVwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL3Byb2R1Y3QvMVwiXG4gICAgfVxuICB9LCBbX2MoJ2ltZycsIHtcbiAgICBzdGF0aWNDbGFzczogXCJsb2dvXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3JjXCI6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzUwLzUwLz8yODQyM1wiLFxuICAgICAgXCJhbHRcIjogXCJcIlxuICAgIH1cbiAgfSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LWdyaWQtaXRlbScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJjYXRlZ29yeS1pdGVtXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvcHJvZHVjdC8xXCJcbiAgICB9XG4gIH0sIFtfYygnaW1nJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICBhdHRyczoge1xuICAgICAgXCJzcmNcIjogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNTAvNTAvPzI4NDIzXCIsXG4gICAgICBcImFsdFwiOiBcIlwiXG4gICAgfVxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtZ3JpZC1pdGVtJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5LWl0ZW1cIixcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9wcm9kdWN0LzFcIlxuICAgIH1cbiAgfSwgW19jKCdpbWcnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwibG9nb1wiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInNyY1wiOiBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS81MC81MC8/Mjg0MjNcIixcbiAgICAgIFwiYWx0XCI6IFwiXCJcbiAgICB9XG4gIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di1ncmlkLWl0ZW0nLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiY2F0ZWdvcnktaXRlbVwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL3Byb2R1Y3QvMVwiXG4gICAgfVxuICB9LCBbX2MoJ2ltZycsIHtcbiAgICBzdGF0aWNDbGFzczogXCJsb2dvXCIsXG4gICAgYXR0cnM6IHtcbiAgICAgIFwic3JjXCI6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzUwLzUwLz8yODQyM1wiLFxuICAgICAgXCJhbHRcIjogXCJcIlxuICAgIH1cbiAgfSldKV0sIDEpXSwgMSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0wNjkyYjBhYlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMDY5MmIwYWJcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9jYXRlZ29yeS52dWVcbi8vIG1vZHVsZSBpZCA9IDE3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE2Il0sInNvdXJjZVJvb3QiOiIifQ==