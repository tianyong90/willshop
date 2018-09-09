webpackJsonp([1],{

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(636)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(638)
/* template */
var __vue_template__ = __webpack_require__(641)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-70c2b59f"
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
Component.options.__file = "resources/assets/js/shop/pages/order-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70c2b59f", Component.options)
  } else {
    hotAPI.reload("data-v-70c2b59f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(642)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(644)
/* template */
var __vue_template__ = __webpack_require__(646)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "resources/assets/js/shop/pages/order.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a032248", Component.options)
  } else {
    hotAPI.reload("data-v-2a032248", Component.options)
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

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(window,function(e){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=297)}({0:function(e,t,n){"use strict";var i=n(2),o=n.n(i),r=n(3),s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return u}),n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function i(e,t,n,i,o,r,s,u){var a,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var l=c.render;c.render=function(e,t){return a.call(t),l(e,t)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,a):[a]}return{exports:e,options:c}}n.d(t,"a",function(){return i})},100:function(e,t,n){},163:function(e,t,n){"use strict";var i=n(100);n.n(i).a},2:function(t,n){t.exports=e},297:function(e,t,n){"use strict";n.r(t);var i=n(0),o=Object(i.a)({name:"button",props:{type:{type:String,default:"default"},isLoading:Boolean,disabled:Boolean,mini:Boolean,plain:Boolean},methods:{handleClick:function(e){this.$emit("click",e)}},computed:{classObject:function(){var e={},t=this.plain?"weui-btn_plain-"+this.type:"weui-btn_"+this.type,n=this.plain?"weui-btn_plain-disabled":"weui-btn_disabled";return e[t]=!0,e[n]=this.disabled,e["weui-btn_loading"]=this.isLoading,e["weui-btn_mini"]=this.mini,e}}}),r=(n(163),n(1)),s=Object(r.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("button",{staticClass:"weui-btn",class:this.classObject,attrs:{disabled:this.disabled},on:{click:this.handleClick}},[this.isLoading?t("i",{staticClass:"weui-loading"}):this._e(),this._v(" "),this._t("default")],2)},[],!1,null,"2e4c96b5",null);s.options.__file="index.vue",t.default=s.exports},3:function(e,t,n){"use strict";var i=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||i,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){if(true)module.exports=n(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],n);else{var e="object"==typeof exports?n(require("vue")):n(t.Vue);for(var r in e)("object"==typeof exports?exports:t)[r]=e[r]}}(window,function(t){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=286)}({0:function(t,n,e){"use strict";var r=e(2),o=e.n(r),i=e(3),u=function(t){return t.changedTouches[0]||t.touches[0]};e.d(n,"c",function(){return f}),e.d(n,"a",function(){return i.a}),e.d(n,"b",function(){return u});var f=o.a.prototype.$isServer},1:function(t,n,e){"use strict";function r(t,n,e,r,o,i,u,f){var c,s="function"==typeof t?t.options:t;if(n&&(s.render=n,s.staticRenderFns=e,s._compiled=!0),r&&(s.functional=!0),i&&(s._scopeId="data-v-"+i),u?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},s._ssrRegister=c):o&&(c=f?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(s.functional){s._injectStyles=c;var a=s.render;s.render=function(t,n){return c.call(n),a(t,n)}}else{var p=s.beforeCreate;s.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:s}}e.d(n,"a",function(){return r})},10:function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},108:function(t,n,e){},11:function(t,n,e){var r=e(9),o=e(18);t.exports=e(6)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},12:function(t,n,e){var r=e(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},13:function(t,n,e){var r=e(38),o=e(21);t.exports=function(t){return r(o(t))}},14:function(t,n,e){"use strict";n.__esModule=!0;var r,o=(r=e(26))&&r.__esModule?r:{default:r};n.default=o.default||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}},17:function(t,n,e){var r=e(4),o=e(5),i=e(28),u=e(11),f=e(8),c=function(t,n,e){var s,a,p,l=t&c.F,d=t&c.G,v=t&c.S,y=t&c.P,h=t&c.B,x=t&c.W,b=d?o:o[n]||(o[n]={}),_=b.prototype,m=d?r:v?r[n]:(r[n]||{}).prototype;for(s in d&&(e=n),e)(a=!l&&m&&void 0!==m[s])&&f(b,s)||(p=a?m[s]:e[s],b[s]=d&&"function"!=typeof m[s]?e[s]:h&&a?i(p,r):x&&m[s]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n.prototype=t.prototype,n}(p):y&&"function"==typeof p?i(Function.call,p):p,y&&((b.virtual||(b.virtual={}))[s]=p,t&c.R&&_&&!_[s]&&u(_,s,p)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},18:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},199:function(t,n,e){"use strict";var r=e(108);e.n(r).a},2:function(n,e){n.exports=t},20:function(t,n,e){var r=e(7);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},21:function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},22:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},23:function(t,n,e){var r=e(7),o=e(4).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},24:function(t,n){t.exports=!0},25:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},26:function(t,n,e){t.exports={default:e(52),__esModule:!0}},28:function(t,n,e){var r=e(29);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},286:function(t,n,e){"use strict";e.r(n);var r=e(14),o=e.n(r),i=e(0),u=Object(i.a)({name:"flex-item",props:{flex:{type:[Number,String],default:1},offset:{type:String,default:""}},computed:{gutter:function(){return this.$parent&&Number(this.$parent.gutter)||0},style:function(){var t=Number(this.gutter)/2+"px",n=this.gutter?{paddingLeft:t,paddingRight:t}:{};return o()({},n,{flex:Number(this.flex),marginLeft:this.offset})}}}),f=(e(199),e(1)),c=Object(f.a)(u,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"weui-flex__item",style:this.style},[this._t("default")],2)},[],!1,null,"33e54a14",null);c.options.__file="index.vue",n.default=c.exports},29:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},3:function(t,n,e){"use strict";var r=function(t){t.component(this.name,this)};n.a=function(t){return t.name="wv-"+t.name,t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||r,t.methods=t.methods||{},t}},30:function(t,n,e){t.exports=!e(6)&&!e(10)(function(){return 7!=Object.defineProperty(e(23)("div"),"a",{get:function(){return 7}}).a})},31:function(t,n,e){var r=e(42),o=e(36);t.exports=Object.keys||function(t){return r(t,o)}},32:function(t,n,e){var r=e(35)("keys"),o=e(25);t.exports=function(t){return r[t]||(r[t]=o(t))}},34:function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},35:function(t,n,e){var r=e(5),o=e(4),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},36:function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},37:function(t,n){n.f={}.propertyIsEnumerable},38:function(t,n,e){var r=e(34);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},4:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},40:function(t,n){n.f=Object.getOwnPropertySymbols},42:function(t,n,e){var r=e(8),o=e(13),i=e(45)(!1),u=e(32)("IE_PROTO");t.exports=function(t,n){var e,f=o(t),c=0,s=[];for(e in f)e!=u&&r(f,e)&&s.push(e);for(;n.length>c;)r(f,e=n[c++])&&(~i(s,e)||s.push(e));return s}},43:function(t,n,e){var r=e(21);t.exports=function(t){return Object(r(t))}},44:function(t,n,e){var r=e(22),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},45:function(t,n,e){var r=e(13),o=e(44),i=e(46);t.exports=function(t){return function(n,e,u){var f,c=r(n),s=o(c.length),a=i(u,s);if(t&&e!=e){for(;s>a;)if((f=c[a++])!=f)return!0}else for(;s>a;a++)if((t||a in c)&&c[a]===e)return t||a||0;return!t&&-1}}},46:function(t,n,e){var r=e(22),o=Math.max,i=Math.min;t.exports=function(t,n){return(t=r(t))<0?o(t+n,0):i(t,n)}},5:function(t,n){var e=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=e)},52:function(t,n,e){e(53),t.exports=e(5).Object.assign},53:function(t,n,e){var r=e(17);r(r.S+r.F,"Object",{assign:e(54)})},54:function(t,n,e){"use strict";var r=e(31),o=e(40),i=e(37),u=e(43),f=e(38),c=Object.assign;t.exports=!c||e(10)(function(){var t={},n={},e=Symbol(),r="abcdefghijklmnopqrst";return t[e]=7,r.split("").forEach(function(t){n[t]=t}),7!=c({},t)[e]||Object.keys(c({},n)).join("")!=r})?function(t,n){for(var e=u(t),c=arguments.length,s=1,a=o.f,p=i.f;c>s;)for(var l,d=f(arguments[s++]),v=a?r(d).concat(a(d)):r(d),y=v.length,h=0;y>h;)p.call(d,l=v[h++])&&(e[l]=d[l]);return e}:c},6:function(t,n,e){t.exports=!e(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},7:function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},8:function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},9:function(t,n,e){var r=e(12),o=e(30),i=e(20),u=Object.defineProperty;n.f=e(6)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}}})});

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=298)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),u=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return s}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return u});var s=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,u,s){var c,f="function"==typeof e?e.options:e;if(t&&(f.render=t,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),u?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},f._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(f.functional){f._injectStyles=c;var a=f.render;f.render=function(e,t){return c.call(t),a(e,t)}}else{var l=f.beforeCreate;f.beforeCreate=l?[].concat(l,c):[c]}return{exports:e,options:f}}n.d(t,"a",function(){return r})},107:function(e,t,n){},197:function(e,t,n){"use strict";var r=n(107);n.n(r).a},2:function(t,n){t.exports=e},298:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"flex",props:{gutter:{type:[Number,String],default:0,validator:function(e){return Number(e)>=0}}},computed:{style:function(){var e="-"+Number(this.gutter)/2+"px";return this.gutter?{marginLeft:e,marginRight:e}:{}}}}),i=(n(197),n(1)),u=Object(i.a)(o,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"weui-flex",style:this.style},[this._t("default")],2)},[],!1,null,"4dbea254",null);u.options.__file="index.vue",t.default=u.exports},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(637);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("e94dc6b2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70c2b59f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-list.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70c2b59f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\n.order-list[data-v-70c2b59f] {\n  padding-top: 65px;\n}\n.order-list .order-item[data-v-70c2b59f] {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em;\n}\n.order-list .order-item .hd[data-v-70c2b59f] {\n      display: block;\n      overflow: hidden;\n}\n.order-list .order-item .hd .order-number[data-v-70c2b59f] {\n        float: left;\n        font-size: 13px;\n        color: #666;\n}\n.order-list .order-item .hd .btn-delete[data-v-70c2b59f] {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px;\n}\n.order-list .order-item .bd[data-v-70c2b59f] {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5;\n}\n.order-list .order-item .bd .product[data-v-70c2b59f] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        padding: .2em;\n}\n.order-list .order-item .bd .product .thumbnail[data-v-70c2b59f] {\n          width: 60px;\n          height: 60px;\n}\n.order-list .order-item .bd .product .name[data-v-70c2b59f] {\n          margin-left: 10px;\n          color: #555;\n}\n.order-list .order-item .ft[data-v-70c2b59f] {\n      padding: 10px;\n      text-align: right;\n}\n.empty-msg[data-v-70c2b59f] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #777;\n}\n.empty-msg .iconfont[data-v-70c2b59f] {\n    font-size: 80px;\n}\n.empty-msg .msg[data-v-70c2b59f] {\n    font-size: 14px;\n}\n", ""]);

// exports


/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(85);




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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a), _components),

  data: function data() {
    return {
      status: 'all',
      orders: []
    };
  },


  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["mapState"])({
    isLoading: function isLoading(state) {
      return state.isLoading;
    }
  })),

  mounted: function mounted() {
    this.getOrders();
  },


  methods: {
    getOrders: function getOrders() {
      var _this = this;

      this.axios.get('order', {
        params: { status: this.status }
      }).then(function (response) {
        _this.orders = response.data.orders;
      }).catch(function (error) {
        console.log(error);
      });
    },
    tabChange: function tabChange() {
      this.getOrders();
    },
    cancelOrder: function cancelOrder(orderId) {
      var _this2 = this;

      this.$root.confirm('操作确认', '确定要取消订单？').then(function () {
        _this2.axios.post('order/' + orderId + '/cancel').then(function (response) {
          _this2.$root.success('取消成功');
        }).catch(function (error) {
          console.log(error);
        });
      });
    },
    destroyOrder: function destroyOrder(orderId) {
      var _this3 = this;

      this.$root.confirm('操作确认', '确定要删除订单？').then(function () {
        _this3.axios.delete('order/' + orderId + '/destroy').then(function (response) {
          _this3.$root.success('删除成功');
        }).catch(function (error) {
          console.log(error);
        });
      });
    }
  }
});

/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=278)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return u}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var a,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var f=c.render;c.render=function(e,t){return a.call(t),f(e,t)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,a):[a]}return{exports:e,options:c}}n.d(t,"a",function(){return r})},119:function(e,t,n){},2:function(t,n){t.exports=e},222:function(e,t,n){"use strict";var r=n(119);n.n(r).a},278:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"navbar-item",props:{id:String,disabled:Boolean},computed:{isSelected:function(){return this.id===this.$parent.value},style:function(){return{borderWidth:this.$parent.lineWidth+"px",borderColor:this.$parent.activeColor,color:this.isSelected?this.$parent.activeColor:this.$parent.color}}},methods:{onClick:function(){this.disabled||this.$parent.$emit("input",this.id)}}}),i=(n(222),n(1)),s=Object(i.a)(o,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wv-navbar__item",class:{"wv-navbar__item_on":!this.$parent.animate&&this.$parent.value===this.id,disabled:this.disabled},style:this.style,on:{click:this.onClick}},[this._t("default")],2)},[],!1,null,"46704e66",null);s.options.__file="index.vue",t.default=s.exports},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=279)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),u=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return a}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return u});var a=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,u,a){var s,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),u?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},c._ssrRegister=s):o&&(s=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(c.functional){c._injectStyles=s;var f=c.render;c.render=function(e,t){return s.call(t),f(e,t)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,s):[s]}return{exports:e,options:c}}n.d(t,"a",function(){return r})},118:function(e,t,n){},2:function(t,n){t.exports=e},220:function(e,t,n){"use strict";var r=n(118);n.n(r).a},279:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"navbar",props:{fixed:Boolean,color:{type:String,default:"#333"},backgroundColor:{type:String,default:"#fff"},activeColor:{type:String,default:"#2196f3"},disabledColor:{type:String,default:"#cfcfcf"},lineWidth:{type:Number,default:2},animate:{type:Boolean,default:!0},value:{}},data:function(){return{childrenCount:0,currentIndex:0}},computed:{style:function(){var e={position:this.fixed?"fixed":"absolute",backgroundColor:this.backgroundColor};return this.fixed&&(e.top=0,e.left=0,e.right=0),e},lineStyle:function(){var e=1/this.childrenCount*100;return{backgroundColor:this.activeColor,left:e*this.currentIndex+"%",width:e+"%",height:this.lineWidth+"px"}}},mounted:function(){var e=this;this.$nextTick(function(){e.childrenCount=e.$children.length,e.updateCurrentIndex()})},methods:{updateCurrentIndex:function(){var e=this;this.$children.forEach(function(t,n){t.id===e.value&&(e.currentIndex=n)})}},watch:{value:function(e){this.$emit("change",e),this.updateCurrentIndex()}}}),i=(n(220),n(1)),u=Object(i.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wv-navbar",style:this.style},[this._t("default"),this._v(" "),this.animate?t("div",{staticClass:"wv-navbar-underline",style:this.lineStyle}):this._e()],2)},[],!1,null,"09bd1f5e",null);u.options.__file="index.vue",t.default=u.exports},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "wv-navbar",
        {
          staticClass: "tab",
          attrs: { "active-color": "red", fixed: "" },
          on: { change: _vm.tabChange },
          model: {
            value: _vm.status,
            callback: function($$v) {
              _vm.status = $$v
            },
            expression: "status"
          }
        },
        [
          _c("wv-navbar-item", { attrs: { id: "all" } }, [_vm._v("全部")]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "need_to_pay" } }, [
            _vm._v("待付款")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "delivered" } }, [
            _vm._v("待收货")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "finished" } }, [
            _vm._v("已完成")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "canceled" } }, [
            _vm._v("已取消")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _vm.orders.data && _vm.orders.data.length > 0
        ? _c(
            "div",
            { staticClass: "order-list" },
            _vm._l(_vm.orders.data, function(order) {
              return _c(
                "router-link",
                {
                  key: order.id,
                  staticClass: "order-item",
                  attrs: { to: "/order/" + order.number }
                },
                [
                  _c("div", { staticClass: "hd" }, [
                    _c("span", { staticClass: "order-number" }, [
                      _vm._v(_vm._s(order.number))
                    ]),
                    _vm._v(" "),
                    order.status === "canceled" || order.status === "canceled"
                      ? _c(
                          "div",
                          {
                            staticClass: "btn-delete",
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                $event.stopPropagation()
                                _vm.destroyOrder(order.id)
                              }
                            }
                          },
                          [_c("i", { staticClass: "iconfont icon-delete" })]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "bd" },
                    _vm._l(order.order_items, function(orderItem) {
                      return _c(
                        "div",
                        { key: orderItem.product.id, staticClass: "product" },
                        [
                          _c("img", {
                            staticClass: "thumbnail",
                            attrs: { src: orderItem.product.thumbnail, alt: "" }
                          }),
                          _vm._v(" "),
                          _c("h4", {
                            staticClass: "name",
                            domProps: {
                              innerHTML: _vm._s(orderItem.product.name)
                            }
                          })
                        ]
                      )
                    })
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "ft" },
                    [
                      order.status === "need_to_pay"
                        ? _c(
                            "wv-button",
                            {
                              attrs: { type: "primary", mini: "", plain: "" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  _vm.$router.push("/payment/" + order.number)
                                }
                              }
                            },
                            [_vm._v("支付\n        ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "primary", mini: "", plain: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              $event.stopPropagation()
                              _vm.$router.push("payment/" + order.number)
                            }
                          }
                        },
                        [_vm._v("\n          再次购买\n        ")]
                      ),
                      _vm._v(" "),
                      order.status === "need_to_pay"
                        ? _c(
                            "wv-button",
                            {
                              attrs: { type: "default", mini: "", plain: "" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  _vm.cancelOrder(order.id)
                                }
                              }
                            },
                            [_vm._v("取消\n        ")]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ]
              )
            })
          )
        : !_vm.isLoading && _vm.orders.data && _vm.orders.data.length === 0
          ? _c("div", { staticClass: "empty-msg" }, [
              _c("i", { staticClass: "iconfont icon-order" }),
              _vm._v(" "),
              _c("div", { staticClass: "msg" }, [_vm._v("没有相关订单记录")])
            ])
          : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-70c2b59f", module.exports)
  }
}

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(643);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("7dae7b88", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a032248\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a032248\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\n.status-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#e64340), to(#ec6f6d));\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px;\n}\n.status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em;\n}\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.product-list .product-item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n.product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px;\n}\n.product-list .product-item .item-right {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      padding: 0 14px;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500;\n}\n.product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888;\n}\n.product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px;\n}\n.product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em;\n}\n.fee-info {\n  margin-bottom: 70px;\n}\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\nfooter .weui-flex__item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__ = __webpack_require__(645);





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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a), _components),

  mixins: [__WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__["a" /* default */]],

  data: function data() {
    return {
      orderId: null,
      order: {}
    };
  },
  mounted: function mounted() {
    this.orderNumber = this.$route.params.orderNumber;

    this.getOrder();
  },


  methods: {
    getOrder: function getOrder() {
      var _this = this;

      this.axios.get('order/' + this.orderNumber).then(function (response) {
        _this.order = response.data.order;
      }).catch(function (error) {
        console.log(error);
      });
    },
    addToCart: function addToCart(productId) {
      var _this2 = this;

      console.log(productId);

      var postData = {
        productId: productId,
        amount: 1
      };

      this.axios.post('cart/add', postData).then(function (response) {
        _this2.$root.success('添加成功');
      });
    },
    cancelOrder: function cancelOrder() {
      var _this3 = this;

      this.axios.post('order/cancel').then(function (response) {
        _this3.$root.success('取消成功');
      });
    },
    deleteOrder: function deleteOrder() {
      var _this4 = this;

      this.axios.post('order/cancel').then(function (response) {
        _this4.$root.success('删除成功');
      });
    }
  }
});

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filters: {
    statusFilter: function statusFilter(status) {
      switch (status) {
        case 'need_to_pay':
          return '待支付';
        case 'paid':
          return '待支付';
        case 'delivered':
          return '待支付';
        case 'finished':
          return '待支付';
        case 'canceled':
          return '待支付';
        default:
          return '';
      }
    }
  }
});

/***/ }),

/***/ 646:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "status-bar" }, [
        _c("span", { staticClass: "status-text" }, [
          _vm._v(_vm._s(_vm._f("statusFilter")(_vm.order.status)))
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "address-info" }, [
        _c("span", {
          staticClass: "name",
          domProps: { textContent: _vm._s(_vm.order.consumer_name) }
        }),
        _vm._v(" "),
        _c("span", {
          staticClass: "mobile",
          domProps: { textContent: _vm._s(_vm.order.consumer_mobile) }
        }),
        _vm._v(" "),
        _c("p", {
          staticClass: "address",
          domProps: { textContent: _vm._s(_vm.order.address) }
        })
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.order.order_items, function(orderItem) {
          return _c(
            "router-link",
            {
              key: orderItem.product.id,
              staticClass: "product-item",
              attrs: { to: "/product/" + orderItem.product.id }
            },
            [
              _c("img", {
                staticClass: "thumbnail",
                attrs: { src: orderItem.product.thumbnail, alt: "" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "item-right" }, [
                _c("h4", {
                  staticClass: "name",
                  domProps: { innerHTML: _vm._s(orderItem.product.name) }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "amount" }, [
                  _vm._v("数量：" + _vm._s(orderItem.amount))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "price" }, [
                  _vm._v(_vm._s(_vm._f("priceFilter")(orderItem.product.price)))
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "add-to-cart",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        $event.stopPropagation()
                        _vm.addToCart(orderItem.product.id)
                      }
                    }
                  },
                  [_vm._v("加入购物车")]
                )
              ])
            ]
          )
        })
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        { staticClass: "order-info" },
        [
          _c("wv-cell", {
            attrs: { title: "订单号", value: _vm.order.number }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "下单时间", value: _vm.order.created_at }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "支付时间", value: _vm.order.created_at }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "支付方式", value: _vm.order.created_at }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        { staticClass: "fee-info" },
        [
          _c("wv-cell", {
            attrs: { title: "订单总额", value: _vm.order.total_fee }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "运费", value: _vm.order.total_fee }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "footer",
        [
          _c(
            "wv-flex",
            { attrs: { gutter: 20 } },
            [
              _vm.order.status === "need_to_pay"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "warn", mini: "" },
                          nativeOn: {
                            click: function($event) {
                              return _vm.cancelOrder($event)
                            }
                          }
                        },
                        [_vm._v("取消订单")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.order.status === "canceled" || _vm.order.status === "finished"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "warn", mini: "" },
                          nativeOn: {
                            click: function($event) {
                              return _vm.deleteOrder($event)
                            }
                          }
                        },
                        [_vm._v("删除订单")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.order.status === "need_to_pay"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "primary", mini: "" },
                          on: {
                            click: function($event) {
                              _vm.$router.push("/payment/" + _vm.order.number)
                            }
                          }
                        },
                        [_vm._v("去付款")]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
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
    require("vue-hot-reload-api")      .rerender("data-v-2a032248", module.exports)
  }
}

/***/ })

});