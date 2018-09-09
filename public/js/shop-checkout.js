webpackJsonp([4],{

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(651)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(653)
/* template */
var __vue_template__ = __webpack_require__(657)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9ad155b0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/shop/pages/checkout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ad155b0", Component.options)
  } else {
    hotAPI.reload("data-v-9ad155b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 604:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(606)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 606:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(608);

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

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(609), __esModule: true };

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(610);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(25);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(20), 'Object', { defineProperty: __webpack_require__(26).f });


/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=56)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return u}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var c,a="function"==typeof e?e.options:e;if(t&&(a.render=t,a.staticRenderFns=n,a._compiled=!0),r&&(a.functional=!0),i&&(a._scopeId="data-v-"+i),s?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},a._ssrRegister=c):o&&(c=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(a.functional){a._injectStyles=c;var l=a.render;a.render=function(e,t){return c.call(t),l(e,t)}}else{var f=a.beforeCreate;a.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:a}}n.d(t,"a",function(){return r})},2:function(t,n){t.exports=e},27:function(e,t,n){"use strict";t.a={props:{url:String,replace:Boolean,to:[String,Object]},methods:{routerLink:function(){var e=this.to,t=this.url,n=this.$router,r=this.replace;e&&n?n[r?"replace":"push"](e):t&&(r?location.replace(t):location.href=t)}}}},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}},41:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(27),i=Object(r.a)({name:"cell",mixins:[o.a],props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean},methods:{onClick:function(){this.$emit("click"),this.routerLink()}}}),s=(n(72),n(1)),u=Object(s.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell",class:{"weui-cell_access":e.isLink},on:{click:e.onClick}},[n("div",{staticClass:"weui-cell_hd"},[e._t("icon")],2),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[e._t("bd",[n("p",{domProps:{innerHTML:e._s(e.title)}})])],2),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[e._t("ft",[e._v(e._s(e.value))])],2)])},[],!1,null,"11228d86",null);u.options.__file="index.vue",t.default=u.exports},72:function(e,t,n){"use strict";var r=n(41);n.n(r).a}})});

/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=289)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return u}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var c,f="function"==typeof e?e.options:e;if(t&&(f.render=t,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),s?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},f._ssrRegister=c):o&&(c=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(f.functional){f._injectStyles=c;var a=f.render;f.render=function(e,t){return c.call(t),a(e,t)}}else{var l=f.beforeCreate;f.beforeCreate=l?[].concat(l,c):[c]}return{exports:e,options:f}}n.d(t,"a",function(){return r})},113:function(e,t,n){},2:function(t,n){t.exports=e},209:function(e,t,n){"use strict";var r=n(113);n.n(r).a},289:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"group",props:{title:String,titleColor:String}}),i=(n(209),n(1)),s=Object(i.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[this.title?t("div",{staticClass:"weui-cells__title",style:{color:this.titleColor},domProps:{innerHTML:this._s(this.title)}}):this._e(),this._v(" "),t("div",{staticClass:"weui-cells"},[this._t("default")],2)])},[],!1,null,"54e9624a",null);s.options.__file="index.vue",t.default=s.exports},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filters: {
    priceFilter: function priceFilter(val) {
      return '￥' + Number(val).toFixed(2);
    }
  }
});

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(652);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("77fc0694", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ad155b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ad155b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\n.top-tips[data-v-9ad155b0] {\n  display: block;\n  background-color: #e64340;\n  color: #f2f2f2;\n  font-size: 12px;\n  padding: .3em .5em;\n}\n.address-panel[data-v-9ad155b0] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.address-panel .content[data-v-9ad155b0] {\n    display: block;\n    color: #999999;\n    overflow: hidden;\n    padding: .5em 1em;\n}\n.address-panel .content .consumer-name[data-v-9ad155b0],\n    .address-panel .content .consumer-mobile[data-v-9ad155b0] {\n      display: block;\n      float: left;\n      color: #000000;\n      font-size: 14px;\n      margin-right: 2em;\n}\n.address-panel .content .address[data-v-9ad155b0] {\n      clear: both;\n      display: block;\n      color: #999999;\n      font-size: 13px;\n}\n.address-panel .bottom-border[data-v-9ad155b0] {\n    display: block;\n    width: 100%;\n    height: 3px;\n    background-size: 100px 100px;\n    background-image: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);\n}\n.product-list .price[data-v-9ad155b0] {\n  color: red;\n}\n.product-list .amount[data-v-9ad155b0] {\n  color: #999999;\n}\n.other-info[data-v-9ad155b0] {\n  margin-bottom: 70px;\n}\nfooter[data-v-9ad155b0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  z-index: 100;\n}\nfooter .total-price[data-v-9ad155b0] {\n    margin-right: .5em;\n    line-height: 50px;\n    color: red;\n}\nfooter .btn-checkout[data-v-9ad155b0] {\n    border: none;\n    color: #fff;\n    padding: 0 20px;\n    vertical-align: middle;\n    background-color: #e64340;\n}\n", ""]);

// exports


/***/ }),

/***/ 653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_cell__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_group__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_price_filter__ = __webpack_require__(617);



 //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _components;



/* harmony default export */ __webpack_exports__["default"] = ({
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_cell___default.a), _components),

  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins_price_filter__["a" /* default */]],

  data: function data() {
    return {
      addressId: null,
      carts: []
    };
  },


  computed: {
    // 总价
    totalPrice: function totalPrice() {
      if (this.carts.length === 0) return 0;

      // 选中的樟商品总价累加
      var price = 0;
      this.carts.forEach(function (val) {
        price += val.product.price * val.amount;
      });
      return price;
    },


    // 商品总数
    productAmount: function productAmount() {
      if (this.carts.length === 0) return 0;

      // 商品数累加
      var amount = 0;
      this.carts.forEach(function (val) {
        amount += val.amount;
      });
      return amount;
    }
  },

  mounted: function mounted() {
    this.carts = JSON.parse(localStorage.getItem('selectedCarts'));
  },


  methods: {
    checkout: function checkout() {
      var _this = this;

      var cartIds = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(this.carts.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cart = _step.value;

          cartIds.push(cart.id);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var postData = {
        cartIds: cartIds,
        addressId: 1,
        remark: 'hello'
      };

      this.axios.post('checkout', postData).then(function (response) {
        _this.$router.push('/payment/' + response.data.order_no);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
});

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(655), __esModule: true };

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
__webpack_require__(101);
module.exports = __webpack_require__(656);


/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var get = __webpack_require__(126);
module.exports = __webpack_require__(8).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "top-tips" }, [
        _vm._v(
          "\n    请在下单后 48 小时内完成支付，超过 24 小时后订单将自动取消。\n  "
        )
      ]),
      _vm._v(" "),
      _c(
        "router-link",
        { staticClass: "address-panel", attrs: { to: "/address" } },
        [
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "consumer-name" }, [_vm._v("田勇")]),
            _vm._v(" "),
            _c("div", { staticClass: "consumer-mobile" }, [
              _vm._v("13222225555")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "address" }, [
              _vm._v("广东省深圳市南山区软件产业基地")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "bottom-border" })
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "weui-panel weui-panel_access product-list" }, [
        _c(
          "div",
          { staticClass: "weui-panel__bd" },
          _vm._l(_vm.carts, function(cart) {
            return _c(
              "div",
              {
                key: cart.id,
                staticClass: "weui-media-box weui-media-box_appmsg"
              },
              [
                _c("div", { staticClass: "weui-media-box__hd" }, [
                  _c("img", {
                    staticClass: "weui-media-box__thumb",
                    attrs: { src: cart.product.thumbnail }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "weui-media-box__bd" }, [
                  _c("h4", {
                    staticClass: "weui-media-box__title",
                    domProps: { textContent: _vm._s(cart.product.name) }
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "weui-media-box__desc" }, [
                    _c("span", { staticClass: "price" }, [
                      _vm._v(_vm._s(_vm._f("priceFilter")(cart.product.price)))
                    ]),
                    _vm._v(" ×\n            "),
                    _c("span", {
                      staticClass: "amount",
                      domProps: { innerHTML: _vm._s(cart.amount) }
                    })
                  ])
                ])
              ]
            )
          })
        )
      ]),
      _vm._v(" "),
      _c(
        "wv-group",
        { staticClass: "other-info" },
        [
          _c("wv-cell", {
            attrs: { title: "商品件数", value: _vm.productAmount }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: {
              title: "商品金额",
              value: _vm._f("priceFilter")(_vm.totalPrice)
            }
          }),
          _vm._v(" "),
          _c("wv-cell", { attrs: { title: "优惠", value: "0" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("footer", [
        _c("div", { staticClass: "total-price" }, [
          _vm._v("实付款：" + _vm._s(_vm._f("priceFilter")(_vm.totalPrice)))
        ]),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "btn btn-checkout", on: { click: _vm.checkout } },
          [_vm._v("立即下单")]
        )
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-9ad155b0", module.exports)
  }
}

/***/ })

});