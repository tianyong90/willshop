webpackJsonp([17],{

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(196)
}
var Component = __webpack_require__(55)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(199),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-73fb2452",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\address.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] address.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73fb2452", Component.options)
  } else {
    hotAPI.reload("data-v-73fb2452", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(197);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(54)("0b9e7639", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-73fb2452\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-73fb2452\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(true);
// imports


// module
exports.push([module.i, "\n.address-list[data-v-73fb2452] {\n  display: block;\n  overflow: hidden;\n  margin: 0 0 60px 0;\n  padding: 0;\n}\n.address-list li[data-v-73fb2452] {\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    padding: 10px 15px;\n}\n.address-list li .header[data-v-73fb2452] {\n      display: block;\n      font-size: 15px;\n      color: #444;\n}\n.address-list li .header .name[data-v-73fb2452] {\n        width: 100px;\n        float: left;\n}\n.address-list li .header .mobile[data-v-73fb2452] {\n        float: left;\n}\n.address-list li .body[data-v-73fb2452] {\n      clear: both;\n      display: block;\n      font-size: 14px;\n      color: #777;\n      padding: 5px 0;\n}\n.address-list li .footer[data-v-73fb2452] {\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #ececec;\n      font-size: 14px;\n      color: #666;\n      padding-top: 3px;\n}\n.address-list li .footer .icon[data-v-73fb2452] {\n        margin: 0 .5rem;\n}\n.address-list li .footer .edit[data-v-73fb2452] {\n        display: inline-block;\n        float: right;\n        color: #555;\n}\n.address-list li .footer .delete[data-v-73fb2452] {\n        display: inline-block;\n        float: right;\n        color: #555;\n}\n.empty[data-v-73fb2452] {\n  display: block;\n  text-align: center;\n  margin: 30px auto;\n}\n.empty .icon[data-v-73fb2452] {\n    font-size: 5rem;\n    color: #3695e9;\n}\n.empty .tips[data-v-73fb2452] {\n    font-size: .8rem;\n    color: #666;\n}\nfooter[data-v-73fb2452] {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 1000;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n  border-top: 1px solid #ccc;\n}\nfooter button[data-v-73fb2452] {\n    display: block;\n    margin: 0 auto;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/address.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,WAAW;CAAE;AACb;IACE,eAAe;IACf,iBAAiB;IACjB,uBAAuB;IACvB,oBAAoB;IACpB,mBAAmB;CAAE;AACrB;MACE,eAAe;MACf,gBAAgB;MAChB,YAAY;CAAE;AACd;QACE,aAAa;QACb,YAAY;CAAE;AAChB;QACE,YAAY;CAAE;AAClB;MACE,YAAY;MACZ,eAAe;MACf,gBAAgB;MAChB,YAAY;MACZ,eAAe;CAAE;AACnB;MACE,eAAe;MACf,iBAAiB;MACjB,8BAA8B;MAC9B,gBAAgB;MAChB,YAAY;MACZ,iBAAiB;CAAE;AACnB;QACE,gBAAgB;CAAE;AACpB;QACE,sBAAsB;QACtB,aAAa;QACb,YAAY;CAAE;AAChB;QACE,sBAAsB;QACtB,aAAa;QACb,YAAY;CAAE;AAEtB;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAkB;CAAE;AACpB;IACE,gBAAgB;IAChB,eAAe;CAAE;AACnB;IACE,iBAAiB;IACjB,YAAY;CAAE;AAElB;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;EACV,cAAc;EACd,uBAAuB;EACvB,oBAAoB;EACpB,0BAA0B;EAC1B,2BAA2B;CAAE;AAC7B;IACE,eAAe;IACf,eAAe;CAAE","file":"address.vue","sourcesContent":[".address-list {\n  display: block;\n  overflow: hidden;\n  margin: 0 0 60px 0;\n  padding: 0; }\n  .address-list li {\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    padding: 10px 15px; }\n    .address-list li .header {\n      display: block;\n      font-size: 15px;\n      color: #444; }\n      .address-list li .header .name {\n        width: 100px;\n        float: left; }\n      .address-list li .header .mobile {\n        float: left; }\n    .address-list li .body {\n      clear: both;\n      display: block;\n      font-size: 14px;\n      color: #777;\n      padding: 5px 0; }\n    .address-list li .footer {\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #ececec;\n      font-size: 14px;\n      color: #666;\n      padding-top: 3px; }\n      .address-list li .footer .icon {\n        margin: 0 .5rem; }\n      .address-list li .footer .edit {\n        display: inline-block;\n        float: right;\n        color: #555; }\n      .address-list li .footer .delete {\n        display: inline-block;\n        float: right;\n        color: #555; }\n\n.empty {\n  display: block;\n  text-align: center;\n  margin: 30px auto; }\n  .empty .icon {\n    font-size: 5rem;\n    color: #3695e9; }\n  .empty .tips {\n    font-size: .8rem;\n    color: #666; }\n\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 1000;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n  border-top: 1px solid #ccc; }\n  footer button {\n    display: block;\n    margin: 0 auto; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(58);

var _index2 = _interopRequireDefault(_index);

var _weVue = __webpack_require__(27);

var _weVue2 = _interopRequireDefault(_weVue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  store: _index2.default,

  mounted: function mounted() {
    this.getAddresses();
  },
  data: function data() {
    return {
      addresses: [],
      activeAddress: null
    };
  },


  methods: {
    getAddresses: function getAddresses() {
      var _this = this;

      this.axios.get('address').then(function (response) {
        _this.addresses = response.data.addresses;
      });
    },
    deleteAddress: function deleteAddress(address) {
      var _this2 = this;

      _weVue2.default.Dialog({
        title: '操作提示',
        message: '确定要删除吗？',
        skin: 'ios'
      }, function () {
        _this2.axios.delete('address/' + address.id + '/delete').then(function (response) {
          _this2.$root.success('删除成功');

          var indexOfAddress = _this2.addresses.indexOf(address);
          _this2.addresses.splice(indexOfAddress, 1);
        });
      });
    }
  }
};

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.addresses.length > 0) ? _c('ul', {
    staticClass: "address-list"
  }, _vm._l((_vm.addresses), function(address) {
    return _c('li', [_c('div', {
      staticClass: "header"
    }, [_c('span', {
      staticClass: "name"
    }, [_vm._v(_vm._s(address.name))]), _vm._v(" "), _c('span', {
      staticClass: "mobile"
    }, [_vm._v(_vm._s(address.mobile))])]), _vm._v(" "), _c('div', {
      staticClass: "body"
    }, [_c('div', {
      staticClass: "address"
    }, [_vm._v(_vm._s(address.province + address.city + address.area + address.address))])]), _vm._v(" "), _c('div', {
      staticClass: "footer"
    }, [_c('span', {
      staticClass: "delete icon iconfont",
      on: {
        "click": function($event) {
          _vm.deleteAddress(address)
        }
      }
    }, [_vm._v("")]), _vm._v(" "), _c('router-link', {
      staticClass: "edit icon iconfont",
      attrs: {
        "to": '/address/' + address.id
      }
    }, [_vm._v("")])], 1)])
  })) : _vm._e(), _vm._v(" "), (!_vm.$store.state.isLoading && _vm.addresses.length === 0) ? _c('div', {
    staticClass: "empty"
  }, [_c('i', {
    staticClass: "icon iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('div', {
    staticClass: "tips"
  }, [_vm._v("您还没有设置地址")])]) : _vm._e(), _vm._v(" "), _c('footer', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.$store.state.isLoading),
      expression: "!$store.state.isLoading"
    }]
  }, [_c('router-link', {
    staticClass: "weui-btn weui-btn_primary",
    attrs: {
      "tag": "button",
      "to": "address/add"
    }
  }, [_vm._v("添加地址")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73fb2452", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hZGRyZXNzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hZGRyZXNzLnZ1ZT9hNjBmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2FkZHJlc3MudnVlPzY1NTgiLCJ3ZWJwYWNrOi8vL2FkZHJlc3MudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2FkZHJlc3MudnVlPzE1M2IiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLDJEQUE0RCxtQkFBbUIscUJBQXFCLHVCQUF1QixlQUFlLEdBQUcscUNBQXFDLHFCQUFxQix1QkFBdUIsNkJBQTZCLDBCQUEwQix5QkFBeUIsR0FBRyw2Q0FBNkMsdUJBQXVCLHdCQUF3QixvQkFBb0IsR0FBRyxtREFBbUQsdUJBQXVCLHNCQUFzQixHQUFHLHFEQUFxRCxzQkFBc0IsR0FBRywyQ0FBMkMsb0JBQW9CLHVCQUF1Qix3QkFBd0Isb0JBQW9CLHVCQUF1QixHQUFHLDZDQUE2Qyx1QkFBdUIseUJBQXlCLHNDQUFzQyx3QkFBd0Isb0JBQW9CLHlCQUF5QixHQUFHLG1EQUFtRCwwQkFBMEIsR0FBRyxtREFBbUQsZ0NBQWdDLHVCQUF1QixzQkFBc0IsR0FBRyxxREFBcUQsZ0NBQWdDLHVCQUF1QixzQkFBc0IsR0FBRywyQkFBMkIsbUJBQW1CLHVCQUF1QixzQkFBc0IsR0FBRyxpQ0FBaUMsc0JBQXNCLHFCQUFxQixHQUFHLGlDQUFpQyx1QkFBdUIsa0JBQWtCLEdBQUcsMkJBQTJCLG1CQUFtQixxQkFBcUIsb0JBQW9CLGNBQWMsa0JBQWtCLDJCQUEyQix3QkFBd0IsOEJBQThCLCtCQUErQixHQUFHLGtDQUFrQyxxQkFBcUIscUJBQXFCLEdBQUcsVUFBVSwySEFBMkgsS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsS0FBSyxNQUFNLFVBQVUsWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksS0FBSyxNQUFNLFlBQVksS0FBSyxNQUFNLFlBQVksV0FBVyxVQUFVLEtBQUssTUFBTSxZQUFZLFdBQVcsVUFBVSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFlBQVksV0FBVyxLQUFLLE1BQU0sWUFBWSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLDZEQUE2RCxtQkFBbUIscUJBQXFCLHVCQUF1QixlQUFlLEVBQUUsc0JBQXNCLHFCQUFxQix1QkFBdUIsNkJBQTZCLDBCQUEwQix5QkFBeUIsRUFBRSxnQ0FBZ0MsdUJBQXVCLHdCQUF3QixvQkFBb0IsRUFBRSx3Q0FBd0MsdUJBQXVCLHNCQUFzQixFQUFFLDBDQUEwQyxzQkFBc0IsRUFBRSw4QkFBOEIsb0JBQW9CLHVCQUF1Qix3QkFBd0Isb0JBQW9CLHVCQUF1QixFQUFFLGdDQUFnQyx1QkFBdUIseUJBQXlCLHNDQUFzQyx3QkFBd0Isb0JBQW9CLHlCQUF5QixFQUFFLHdDQUF3QywwQkFBMEIsRUFBRSx3Q0FBd0MsZ0NBQWdDLHVCQUF1QixzQkFBc0IsRUFBRSwwQ0FBMEMsZ0NBQWdDLHVCQUF1QixzQkFBc0IsRUFBRSxZQUFZLG1CQUFtQix1QkFBdUIsc0JBQXNCLEVBQUUsa0JBQWtCLHNCQUFzQixxQkFBcUIsRUFBRSxrQkFBa0IsdUJBQXVCLGtCQUFrQixFQUFFLFlBQVksbUJBQW1CLHFCQUFxQixvQkFBb0IsY0FBYyxrQkFBa0IsMkJBQTJCLHdCQUF3Qiw4QkFBOEIsK0JBQStCLEVBQUUsbUJBQW1CLHFCQUFxQixxQkFBcUIsRUFBRSxxQkFBcUI7O0FBRW4wSTs7Ozs7Ozs7Ozs7Ozs7O0FDdUJBOzs7O0FBR0E7Ozs7Ozs7QUFHQTs7OEJBQ0E7U0FDQTtBQUVBO3dCQUNBOztpQkFFQTtxQkFFQTtBQUhBO0FBS0E7Ozs7O0FBRUE7O3lEQUNBO3dDQUNBO0FBQ0E7QUFHQTs7QUFDQTs7O2VBRUE7aUJBQ0E7Y0FFQTtBQUpBLHFCQUtBOzBGQUNBOytCQUVBOzt3REFDQTtrREFDQTtBQUNBO0FBQ0E7QUFFQTtBQXZCQTtBQWRBLEU7Ozs7Ozs7QUNsQ0EsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AtYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzNmYjI0NTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9hZGRyZXNzLnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9hZGRyZXNzLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzNmYjI0NTJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9hZGRyZXNzLnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTczZmIyNDUyXCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxcY29tcG9uZW50c1xcXFxhZGRyZXNzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gYWRkcmVzcy52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNzNmYjI0NTJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi03M2ZiMjQ1MlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvYWRkcmVzcy52dWVcbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTczZmIyNDUyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vYWRkcmVzcy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjBiOWU3NjM5XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTczZmIyNDUyXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vYWRkcmVzcy52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzNmYjI0NTJcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9hZGRyZXNzLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi03M2ZiMjQ1MlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2FkZHJlc3MudnVlXG4vLyBtb2R1bGUgaWQgPSAxOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYWRkcmVzcy1saXN0W2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAwIDAgNjBweCAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuLmFkZHJlc3MtbGlzdCBsaVtkYXRhLXYtNzNmYjI0NTJdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG59XFxuLmFkZHJlc3MtbGlzdCBsaSAuaGVhZGVyW2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG59XFxuLmFkZHJlc3MtbGlzdCBsaSAuaGVhZGVyIC5uYW1lW2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5hZGRyZXNzLWxpc3QgbGkgLmhlYWRlciAubW9iaWxlW2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XFxufVxcbi5hZGRyZXNzLWxpc3QgbGkgLmJvZHlbZGF0YS12LTczZmIyNDUyXSB7XFxuICAgICAgY2xlYXI6IGJvdGg7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGNvbG9yOiAjNzc3O1xcbiAgICAgIHBhZGRpbmc6IDVweCAwO1xcbn1cXG4uYWRkcmVzcy1saXN0IGxpIC5mb290ZXJbZGF0YS12LTczZmIyNDUyXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VjZWNlYztcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgY29sb3I6ICM2NjY7XFxuICAgICAgcGFkZGluZy10b3A6IDNweDtcXG59XFxuLmFkZHJlc3MtbGlzdCBsaSAuZm9vdGVyIC5pY29uW2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgICAgICAgbWFyZ2luOiAwIC41cmVtO1xcbn1cXG4uYWRkcmVzcy1saXN0IGxpIC5mb290ZXIgLmVkaXRbZGF0YS12LTczZmIyNDUyXSB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgICBjb2xvcjogIzU1NTtcXG59XFxuLmFkZHJlc3MtbGlzdCBsaSAuZm9vdGVyIC5kZWxldGVbZGF0YS12LTczZmIyNDUyXSB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgICBjb2xvcjogIzU1NTtcXG59XFxuLmVtcHR5W2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDMwcHggYXV0bztcXG59XFxuLmVtcHR5IC5pY29uW2RhdGEtdi03M2ZiMjQ1Ml0ge1xcbiAgICBmb250LXNpemU6IDVyZW07XFxuICAgIGNvbG9yOiAjMzY5NWU5O1xcbn1cXG4uZW1wdHkgLnRpcHNbZGF0YS12LTczZmIyNDUyXSB7XFxuICAgIGZvbnQtc2l6ZTogLjhyZW07XFxuICAgIGNvbG9yOiAjNjY2O1xcbn1cXG5mb290ZXJbZGF0YS12LTczZmIyNDUyXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IC41cmVtIDFyZW07XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XFxufVxcbmZvb3RlciBidXR0b25bZGF0YS12LTczZmIyNDUyXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hZGRyZXNzLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixXQUFXO0NBQUU7QUFDYjtJQUNFLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLG9CQUFvQjtJQUNwQixtQkFBbUI7Q0FBRTtBQUNyQjtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsWUFBWTtDQUFFO0FBQ2Q7UUFDRSxhQUFhO1FBQ2IsWUFBWTtDQUFFO0FBQ2hCO1FBQ0UsWUFBWTtDQUFFO0FBQ2xCO01BQ0UsWUFBWTtNQUNaLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsWUFBWTtNQUNaLGVBQWU7Q0FBRTtBQUNuQjtNQUNFLGVBQWU7TUFDZixpQkFBaUI7TUFDakIsOEJBQThCO01BQzlCLGdCQUFnQjtNQUNoQixZQUFZO01BQ1osaUJBQWlCO0NBQUU7QUFDbkI7UUFDRSxnQkFBZ0I7Q0FBRTtBQUNwQjtRQUNFLHNCQUFzQjtRQUN0QixhQUFhO1FBQ2IsWUFBWTtDQUFFO0FBQ2hCO1FBQ0Usc0JBQXNCO1FBQ3RCLGFBQWE7UUFDYixZQUFZO0NBQUU7QUFFdEI7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGtCQUFrQjtDQUFFO0FBQ3BCO0lBQ0UsZ0JBQWdCO0lBQ2hCLGVBQWU7Q0FBRTtBQUNuQjtJQUNFLGlCQUFpQjtJQUNqQixZQUFZO0NBQUU7QUFFbEI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixvQkFBb0I7RUFDcEIsMEJBQTBCO0VBQzFCLDJCQUEyQjtDQUFFO0FBQzdCO0lBQ0UsZUFBZTtJQUNmLGVBQWU7Q0FBRVwiLFwiZmlsZVwiOlwiYWRkcmVzcy52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmFkZHJlc3MtbGlzdCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBtYXJnaW46IDAgMCA2MHB4IDA7XFxuICBwYWRkaW5nOiAwOyB9XFxuICAuYWRkcmVzcy1saXN0IGxpIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDsgfVxcbiAgICAuYWRkcmVzcy1saXN0IGxpIC5oZWFkZXIge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBjb2xvcjogIzQ0NDsgfVxcbiAgICAgIC5hZGRyZXNzLWxpc3QgbGkgLmhlYWRlciAubmFtZSB7XFxuICAgICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgICBmbG9hdDogbGVmdDsgfVxcbiAgICAgIC5hZGRyZXNzLWxpc3QgbGkgLmhlYWRlciAubW9iaWxlIHtcXG4gICAgICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAgIC5hZGRyZXNzLWxpc3QgbGkgLmJvZHkge1xcbiAgICAgIGNsZWFyOiBib3RoO1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICBjb2xvcjogIzc3NztcXG4gICAgICBwYWRkaW5nOiA1cHggMDsgfVxcbiAgICAuYWRkcmVzcy1saXN0IGxpIC5mb290ZXIge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlY2VjZWM7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgIHBhZGRpbmctdG9wOiAzcHg7IH1cXG4gICAgICAuYWRkcmVzcy1saXN0IGxpIC5mb290ZXIgLmljb24ge1xcbiAgICAgICAgbWFyZ2luOiAwIC41cmVtOyB9XFxuICAgICAgLmFkZHJlc3MtbGlzdCBsaSAuZm9vdGVyIC5lZGl0IHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICAgIGNvbG9yOiAjNTU1OyB9XFxuICAgICAgLmFkZHJlc3MtbGlzdCBsaSAuZm9vdGVyIC5kZWxldGUge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgICAgY29sb3I6ICM1NTU7IH1cXG5cXG4uZW1wdHkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW46IDMwcHggYXV0bzsgfVxcbiAgLmVtcHR5IC5pY29uIHtcXG4gICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICBjb2xvcjogIzM2OTVlOTsgfVxcbiAgLmVtcHR5IC50aXBzIHtcXG4gICAgZm9udC1zaXplOiAuOHJlbTtcXG4gICAgY29sb3I6ICM2NjY7IH1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMTAwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAuNXJlbSAxcmVtO1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSAycmVtKTtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyB9XFxuICBmb290ZXIgYnV0dG9uIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG1hcmdpbjogMCBhdXRvOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTczZmIyNDUyXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvYWRkcmVzcy52dWVcbi8vIG1vZHVsZSBpZCA9IDE5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE3IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8dWwgY2xhc3M9XCJhZGRyZXNzLWxpc3RcIiB2LWlmPVwiYWRkcmVzc2VzLmxlbmd0aCA+IDBcIj5cclxuICAgICAgPGxpIHYtZm9yPVwiYWRkcmVzcyBpbiBhZGRyZXNzZXNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj57eyBhZGRyZXNzLm5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vYmlsZVwiPnt7IGFkZHJlc3MubW9iaWxlIH19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkcmVzc1wiPnt7IGFkZHJlc3MucHJvdmluY2UgKyBhZGRyZXNzLmNpdHkgKyBhZGRyZXNzLmFyZWEgKyBhZGRyZXNzLmFkZHJlc3MgfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZSBpY29uIGljb25mb250XCIgQGNsaWNrPVwiZGVsZXRlQWRkcmVzcyhhZGRyZXNzKVwiPiYjeGU2MTI7PC9zcGFuPlxyXG4gICAgICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwiZWRpdCBpY29uIGljb25mb250XCIgOnRvPVwiJy9hZGRyZXNzLycgKyBhZGRyZXNzLmlkXCI+JiN4ZTYxZjs8L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZW1wdHlcIiB2LWlmPVwiISRzdG9yZS5zdGF0ZS5pc0xvYWRpbmcgJiYgYWRkcmVzc2VzLmxlbmd0aCA9PT0gMFwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIj4mI3hlNjE3OzwvaT5cclxuICAgICAgPGRpdiBjbGFzcz1cInRpcHNcIj7mgqjov5jmsqHmnInorr7nva7lnLDlnYA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxmb290ZXIgdi1zaG93PVwiISRzdG9yZS5zdGF0ZS5pc0xvYWRpbmdcIj5cclxuICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwid2V1aS1idG4gd2V1aS1idG5fcHJpbWFyeVwiIHRhZz1cImJ1dHRvblwiIHRvPVwiYWRkcmVzcy9hZGRcIj7mt7vliqDlnLDlnYA8L3JvdXRlci1saW5rPlxyXG4gICAgPC9mb290ZXI+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZS9pbmRleCdcclxuICBpbXBvcnQgV2VWdWUgZnJvbSAnd2UtdnVlJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzdG9yZSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5nZXRBZGRyZXNzZXMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRyZXNzZXM6IFtdLFxyXG4gICAgICAgIGFjdGl2ZUFkZHJlc3M6IG51bGwsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRBZGRyZXNzZXMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdhZGRyZXNzJykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmFkZHJlc3NlcyA9IHJlc3BvbnNlLmRhdGEuYWRkcmVzc2VzXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWcsOWdgOmhueS4reWIoOmZpOaMiemSrueCueWHu1xyXG4gICAgICBkZWxldGVBZGRyZXNzIChhZGRyZXNzKSB7XHJcbiAgICAgICAgV2VWdWUuRGlhbG9nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmk43kvZzmj5DnpLonLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAn56Gu5a6a6KaB5Yig6Zmk5ZCX77yfJyxcclxuICAgICAgICAgICAgc2tpbjogJ2lvcydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXhpb3MuZGVsZXRlKGBhZGRyZXNzLyR7YWRkcmVzcy5pZH0vZGVsZXRlYCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCfliKDpmaTmiJDlip8nKVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBpbmRleE9mQWRkcmVzcyA9IHRoaXMuYWRkcmVzc2VzLmluZGV4T2YoYWRkcmVzcylcclxuICAgICAgICAgICAgICB0aGlzLmFkZHJlc3Nlcy5zcGxpY2UoaW5kZXhPZkFkZHJlc3MsIDEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAuYWRkcmVzcy1saXN0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1hcmdpbjogMCAwIDYwcHggMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgbGkge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgICAgcGFkZGluZzogMTBweCAxNXB4O1xyXG5cclxuICAgICAgLmhlYWRlciB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xyXG5cclxuICAgICAgICAubmFtZSB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5tb2JpbGUge1xyXG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAuYm9keSB7XHJcbiAgICAgICAgY2xlYXI6IGJvdGg7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIGNvbG9yOiAjNzc3O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZm9vdGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWNlY2VjO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgICBwYWRkaW5nLXRvcDogM3B4O1xyXG5cclxuICAgICAgICAuaWNvbiB7XHJcbiAgICAgICAgICBtYXJnaW46IDAgLjVyZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZWRpdCB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgICBjb2xvcjogIzU1NTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5kZWxldGUge1xyXG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICAgICAgY29sb3I6ICM1NTU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZW1wdHkge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDMwcHggYXV0bztcclxuXHJcbiAgICAuaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogNXJlbTtcclxuICAgICAgY29sb3I6ICMzNjk1ZTk7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpcHMge1xyXG4gICAgICBmb250LXNpemU6IC44cmVtO1xyXG4gICAgICBjb2xvcjogIzY2NjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvb3RlciB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IC41cmVtIDFyZW07XHJcbiAgICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGFkZHJlc3MudnVlPzNkMGViYTg0IiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCBbKF92bS5hZGRyZXNzZXMubGVuZ3RoID4gMCkgPyBfYygndWwnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYWRkcmVzcy1saXN0XCJcbiAgfSwgX3ZtLl9sKChfdm0uYWRkcmVzc2VzKSwgZnVuY3Rpb24oYWRkcmVzcykge1xuICAgIHJldHVybiBfYygnbGknLCBbX2MoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlclwiXG4gICAgfSwgW19jKCdzcGFuJywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiXG4gICAgfSwgW192bS5fdihfdm0uX3MoYWRkcmVzcy5uYW1lKSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJtb2JpbGVcIlxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKGFkZHJlc3MubW9iaWxlKSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiYm9keVwiXG4gICAgfSwgW19jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhZGRyZXNzXCJcbiAgICB9LCBbX3ZtLl92KF92bS5fcyhhZGRyZXNzLnByb3ZpbmNlICsgYWRkcmVzcy5jaXR5ICsgYWRkcmVzcy5hcmVhICsgYWRkcmVzcy5hZGRyZXNzKSldKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiZm9vdGVyXCJcbiAgICB9LCBbX2MoJ3NwYW4nLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJkZWxldGUgaWNvbiBpY29uZm9udFwiLFxuICAgICAgb246IHtcbiAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICBfdm0uZGVsZXRlQWRkcmVzcyhhZGRyZXNzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW192bS5fdihcIu6YklwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygncm91dGVyLWxpbmsnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJlZGl0IGljb24gaWNvbmZvbnRcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwidG9cIjogJy9hZGRyZXNzLycgKyBhZGRyZXNzLmlkXG4gICAgICB9XG4gICAgfSwgW192bS5fdihcIu6Yn1wiKV0pXSwgMSldKVxuICB9KSkgOiBfdm0uX2UoKSwgX3ZtLl92KFwiIFwiKSwgKCFfdm0uJHN0b3JlLnN0YXRlLmlzTG9hZGluZyAmJiBfdm0uYWRkcmVzc2VzLmxlbmd0aCA9PT0gMCkgPyBfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImVtcHR5XCJcbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIlxuICB9LCBbX3ZtLl92KFwi7piXXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwidGlwc1wiXG4gIH0sIFtfdm0uX3YoXCLmgqjov5jmsqHmnInorr7nva7lnLDlnYBcIildKV0pIDogX3ZtLl9lKCksIF92bS5fdihcIiBcIiksIF9jKCdmb290ZXInLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgIHZhbHVlOiAoIV92bS4kc3RvcmUuc3RhdGUuaXNMb2FkaW5nKSxcbiAgICAgIGV4cHJlc3Npb246IFwiISRzdG9yZS5zdGF0ZS5pc0xvYWRpbmdcIlxuICAgIH1dXG4gIH0sIFtfYygncm91dGVyLWxpbmsnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwid2V1aS1idG4gd2V1aS1idG5fcHJpbWFyeVwiLFxuICAgIGF0dHJzOiB7XG4gICAgICBcInRhZ1wiOiBcImJ1dHRvblwiLFxuICAgICAgXCJ0b1wiOiBcImFkZHJlc3MvYWRkXCJcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLmt7vliqDlnLDlnYBcIildKV0sIDEpXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNzNmYjI0NTJcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTczZmIyNDUyXCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hZGRyZXNzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTciXSwic291cmNlUm9vdCI6IiJ9