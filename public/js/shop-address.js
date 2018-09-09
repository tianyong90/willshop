webpackJsonp([0],{

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(671)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(673)
/* template */
var __vue_template__ = __webpack_require__(681)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-605b4eb6"
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
Component.options.__file = "resources/assets/js/shop/pages/address-edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-605b4eb6", Component.options)
  } else {
    hotAPI.reload("data-v-605b4eb6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(667)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(669)
/* template */
var __vue_template__ = __webpack_require__(670)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9e6ac9fc"
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
Component.options.__file = "resources/assets/js/shop/pages/address.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e6ac9fc", Component.options)
  } else {
    hotAPI.reload("data-v-9e6ac9fc", Component.options)
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

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(668);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("2b74c709", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e6ac9fc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e6ac9fc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\n.address-list[data-v-9e6ac9fc] {\n  display: block;\n  overflow: hidden;\n  margin: 0 0 60px 0;\n  padding: 0;\n}\n.address-list li[data-v-9e6ac9fc] {\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    padding: 10px 15px;\n}\n.address-list li .header[data-v-9e6ac9fc] {\n      display: block;\n      font-size: 15px;\n      color: #444;\n}\n.address-list li .header .name[data-v-9e6ac9fc] {\n        width: 100px;\n        float: left;\n}\n.address-list li .header .mobile[data-v-9e6ac9fc] {\n        float: left;\n}\n.address-list li .body[data-v-9e6ac9fc] {\n      clear: both;\n      display: block;\n      font-size: 14px;\n      color: #777;\n      padding: 5px 0;\n}\n.address-list li .footer[data-v-9e6ac9fc] {\n      display: block;\n      overflow: hidden;\n      border-top: 1px solid #ececec;\n      font-size: 14px;\n      color: #666;\n      padding-top: 3px;\n}\n.address-list li .footer .icon[data-v-9e6ac9fc] {\n        margin: 0 .5rem;\n}\n.address-list li .footer .edit[data-v-9e6ac9fc] {\n        display: inline-block;\n        float: right;\n        color: #555;\n}\n.address-list li .footer .delete[data-v-9e6ac9fc] {\n        display: inline-block;\n        float: right;\n        color: #555;\n}\n.empty-msg[data-v-9e6ac9fc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #777;\n}\n.empty-msg .iconfont[data-v-9e6ac9fc] {\n    font-size: 80px;\n}\n.empty-msg .msg[data-v-9e6ac9fc] {\n    font-size: 14px;\n}\nfooter[data-v-9e6ac9fc] {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 1000;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n  border-top: 1px solid #ccc;\n}\nfooter button[data-v-9e6ac9fc] {\n    display: block;\n    margin: 0 auto;\n}\n", ""]);

// exports


/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_index__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(85);

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




/* harmony default export */ __webpack_exports__["default"] = ({
  store: __WEBPACK_IMPORTED_MODULE_1__store_index__["a" /* default */],

  mounted: function mounted() {
    this.getAddresses();
  },
  data: function data() {
    return {
      addresses: [],
      activeAddress: null
    };
  },


  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["mapState"])({
    isLoading: function isLoading(state) {
      return state.isLoading;
    }
  })),

  methods: {
    getAddresses: function getAddresses() {
      var _this = this;

      this.axios.get('address').then(function (response) {
        _this.addresses = response.data.addresses;
      }).catch(function (error) {
        console.log(error);
      });
    },


    // 地址项中删除按钮点击
    deleteAddress: function deleteAddress(address) {
      // TODO
    }
  }
});

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.addresses.length > 0
      ? _c(
          "ul",
          { staticClass: "address-list" },
          _vm._l(_vm.addresses, function(address) {
            return _c("li", { key: address.id }, [
              _c("div", { staticClass: "header" }, [
                _c("span", { staticClass: "name" }, [
                  _vm._v(_vm._s(address.name))
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "mobile" }, [
                  _vm._v(_vm._s(address.mobile))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "body" }, [
                _c("div", { staticClass: "address" }, [
                  _vm._v(
                    _vm._s(
                      address.province +
                        address.city +
                        address.area +
                        address.address
                    )
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "footer" },
                [
                  _c(
                    "span",
                    {
                      staticClass: "delete icon iconfont",
                      on: {
                        click: function($event) {
                          _vm.deleteAddress(address)
                        }
                      }
                    },
                    [_vm._v("")]
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "edit icon iconfont",
                      attrs: { to: "/address/" + address.id }
                    },
                    [_vm._v("")]
                  )
                ],
                1
              )
            ])
          })
        )
      : _vm.addresses.length === 0 && !_vm.isLoading
        ? _c("div", { staticClass: "empty-msg" }, [
            _c("i", { staticClass: "iconfont icon-map-marker" }),
            _vm._v(" "),
            _c("div", { staticClass: "msg" }, [_vm._v("您还没有设置地址")])
          ])
        : _vm._e(),
    _vm._v(" "),
    _c(
      "footer",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.$store.state.isLoading,
            expression: "!$store.state.isLoading"
          }
        ]
      },
      [
        _c(
          "router-link",
          {
            staticClass: "weui-btn weui-btn_primary",
            attrs: { tag: "button", to: "/address/add" }
          },
          [_vm._v("添加地址")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9e6ac9fc", module.exports)
  }
}

/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(672);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("71c0dc52", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-605b4eb6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address-edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-605b4eb6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./address-edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\nfooter[data-v-605b4eb6] {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\n", ""]);

// exports


/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_flex_item__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_flex__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_picker__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_input__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_we_vue_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_we_vue_lib_cell__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_we_vue_lib_group__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_china_area_data__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_china_area_data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_china_area_data__);











var _components;

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




var provinces = __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values___default()(__WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[86]);

// 获取某一省下的市
function getCities(province) {
  var provinceCode = void 0;
  for (var i in __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[86]) {
    if (province === __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[86][i]) {
      provinceCode = i;
      break;
    }
  }

  return __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values___default()(__WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[provinceCode]);
}

// 获取某一市下的区/县
function getAreas(province, city) {
  var provinceCode = void 0,
      cityCode = void 0;
  for (var i in __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[86]) {
    if (province === __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[86][i]) {
      provinceCode = i;
      break;
    }
  }

  for (var _i in __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[provinceCode]) {
    if (city === __WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[provinceCode][_i]) {
      cityCode = _i;
      break;
    }
  }

  if (__WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[cityCode]) {
    return __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_object_values___default()(__WEBPACK_IMPORTED_MODULE_10_china_area_data___default.a[cityCode]);
  } else {
    // 只有两级的情况，地区列表直接返回市名
    return [city];
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_8_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_8_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_7_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_input___default.a.name, __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_input___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_picker___default.a.name, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_picker___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_flex___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_flex___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_flex_item___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_flex_item___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a), _components),

  data: function data() {
    return {
      address: {},
      addressPickerShow: false,
      addressSlots: [{
        values: provinces
      }, {
        values: []
      }, {
        values: []
      }]
    };
  },


  filters: {
    pcaFilter: function pcaFilter(value) {
      if (value.id) {
        return value.province + ' ' + value.city + ' ' + value.area;
      } else {
        return '请选择';
      }
    }
  },

  mounted: function mounted() {
    this.getAddress();
  },


  methods: {
    onAddressChange: function onAddressChange(picker, value) {
      console.log(value);

      picker.setSlotValues(1, getCities(value[0]));
      picker.setSlotValues(2, getAreas(value[0], value[1]));
    },
    confirmAddress: function confirmAddress(picker) {
      var pickerValues = picker.getValues();

      this.address.province = pickerValues[0];
      this.address.city = pickerValues[1];
      this.address.area = pickerValues[2];
    },
    getAddress: function getAddress() {
      var _this = this;

      var addressId = this.$route.params.id;

      if (addressId) {
        this.axios.get('address/' + addressId).then(function (response) {
          _this.address = response.data.address;

          _this.$refs.addressPicker.setValues([_this.address.province, _this.address.city, _this.address.area]);
        }, function (response) {
          console.log(response.data);
        });
      }
    },


    // 保存
    store: function store() {
      var _this2 = this;

      var postData = JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.$data));

      var addressId = this.$route.params.id;

      if (addressId) {
        postData.id = addressId;
      }

      this.axios.post('address/store', postData).then(function () {
        _this2.$root.success('保存成功');

        setTimeout(function () {
          _this2.$router.push('/address');
        }, 1000);
      }).catch(function (error) {
        console.log(error);
      });
    },


    // 删除
    deleteAddress: function deleteAddress() {
      // Dialog({
      //     title: '操作提示',
      //     message: '确定要删除吗？',
      //     skin: 'ios'
      //   },
      //   () => {
      //     this.axios.delete(`address/${this.address.id}/delete`).then(() => {
      //       this.$root.success('删除成功')
      //
      //       setTimeout(() => {
      //         this.$router.push('/address')
      //       }, 1000)
      //     })
      //   })
    }
  }
});

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n="object"==typeof exports?e(require("vue")):e(t.Vue);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=137)}([function(t,e,n){"use strict";var r=n(2),i=n.n(r),o=n(3),u=function(t){return t.changedTouches[0]||t.touches[0]};n.d(e,"c",function(){return s}),n.d(e,"a",function(){return o.a}),n.d(e,"b",function(){return u});var s=i.a.prototype.$isServer},function(t,e,n){"use strict";function r(t,e,n,r,i,o,u,s){var c,a="function"==typeof t?t.options:t;if(e&&(a.render=e,a.staticRenderFns=n,a._compiled=!0),r&&(a.functional=!0),o&&(a._scopeId="data-v-"+o),u?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},a._ssrRegister=c):i&&(c=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),c)if(a.functional){a._injectStyles=c;var f=a.render;a.render=function(t,e){return c.call(e),f(t,e)}}else{var l=a.beforeCreate;a.beforeCreate=l?[].concat(l,c):[c]}return{exports:t,options:a}}n.d(e,"a",function(){return r})},function(e,n){e.exports=t},function(t,e,n){"use strict";var r=function(t){t.component(this.name,this)};e.a=function(t){return t.name="wv-"+t.name,t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||r,t.methods=t.methods||{},t}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(12),i=n(30),o=n(20),u=Object.defineProperty;e.f=n(6)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(9),i=n(18);t.exports=n(6)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(38),i=n(21);t.exports=function(t){return r(i(t))}},,function(t,e,n){var r=n(35)("wks"),i=n(25),o=n(4).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},,function(t,e,n){var r=n(4),i=n(5),o=n(28),u=n(11),s=n(8),c=function(t,e,n){var a,f,l,p=t&c.F,d=t&c.G,h=t&c.S,v=t&c.P,y=t&c.B,m=t&c.W,x=d?i:i[e]||(i[e]={}),b=x.prototype,g=d?r:h?r[e]:(r[e]||{}).prototype;for(a in d&&(n=e),n)(f=!p&&g&&void 0!==g[a])&&s(x,a)||(l=f?g[a]:n[a],x[a]=d&&"function"!=typeof g[a]?n[a]:y&&f?o(l,r):m&&g[a]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?o(Function.call,l):l,v&&((x.virtual||(x.virtual={}))[a]=l,t&c.R&&b&&!b[a]&&u(b,a,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},,function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(7),i=n(4).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e){t.exports=!0},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},,,function(t,e,n){var r=n(29);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports=!n(6)&&!n(10)(function(){return 7!=Object.defineProperty(n(23)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(42),i=n(36);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(35)("keys"),i=n(25);t.exports=function(t){return r[t]||(r[t]=i(t))}},,function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(5),i=n(4),o=i["__core-js_shared__"]||(i["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(34);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){t.exports={}},function(t,e){e.f=Object.getOwnPropertySymbols},,function(t,e,n){var r=n(8),i=n(13),o=n(45)(!1),u=n(32)("IE_PROTO");t.exports=function(t,e){var n,s=i(t),c=0,a=[];for(n in s)n!=u&&r(s,n)&&a.push(n);for(;e.length>c;)r(s,n=e[c++])&&(~o(a,n)||a.push(n));return a}},function(t,e,n){var r=n(21);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(22),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(13),i=n(44),o=n(46);t.exports=function(t){return function(e,n,u){var s,c=r(e),a=i(c.length),f=o(u,a);if(t&&n!=n){for(;a>f;)if((s=c[f++])!=s)return!0}else for(;a>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(22),i=Math.max,o=Math.min;t.exports=function(t,e){return(t=r(t))<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(9).f,i=n(8),o=n(15)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},,function(t,e,n){"use strict";var r=n(24),i=n(17),o=n(58),u=n(11),s=n(39),c=n(77),a=n(47),f=n(79),l=n(15)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,h,v,y,m){c(n,e,h);var x,b,g,_=function(t){if(!p&&t in C)return C[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",w="values"==v,O=!1,C=t.prototype,T=C[l]||C["@@iterator"]||v&&C[v],k=T||_(v),I=v?w?_("entries"):k:void 0,j="Array"==e&&C.entries||T;if(j&&(g=f(j.call(new t)))!==Object.prototype&&g.next&&(a(g,S,!0),r||"function"==typeof g[l]||u(g,l,d)),w&&T&&"values"!==T.name&&(O=!0,k=function(){return T.call(this)}),r&&!m||!p&&!O&&C[l]||u(C,l,k),s[e]=k,s[S]=d,v)if(x={values:w?k:_("values"),keys:y?k:_("keys"),entries:I},m)for(b in x)b in C||o(C,b,x[b]);else i(i.P+i.F*(p||O),e,x);return x}},function(t,e,n){e.f=n(15)},function(t,e,n){var r=n(4),i=n(5),o=n(24),u=n(50),s=n(9).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},,,,,,function(t,e,n){t.exports={default:n(82),__esModule:!0}},function(t,e,n){t.exports=n(11)},function(t,e,n){var r=n(12),i=n(78),o=n(36),u=n(32)("IE_PROTO"),s=function(){},c=function(){var t,e=n(23)("iframe"),r=o.length;for(e.style.display="none",n(69).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c.prototype[o[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[u]=t):n=c(),void 0===e?n:i(n,e)}},function(t,e,n){"use strict";e.__esModule=!0;var r=u(n(84)),i=u(n(86)),o="function"==typeof i.default&&"symbol"==typeof r.default?function(t){return typeof t}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":typeof t};function u(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof i.default&&"symbol"===o(r.default)?function(t){return void 0===t?"undefined":o(t)}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":void 0===t?"undefined":o(t)}},,,,function(t,e,n){n(74);for(var r=n(4),i=n(11),o=n(39),u=n(15)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),c=0;c<s.length;c++){var a=s[c],f=r[a],l=f&&f.prototype;l&&!l[u]&&i(l,u,a),o[a]=o.Array}},function(t,e,n){"use strict";var r=n(80)(!0);n(49)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){},function(t,e,n){},,function(t,e,n){var r=n(4).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(42),i=n(36).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},,,,function(t,e,n){"use strict";var r=n(75),i=n(76),o=n(39),u=n(13);t.exports=n(49)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):i(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r=n(59),i=n(18),o=n(47),u={};n(11)(u,n(15)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(9),i=n(12),o=n(31);t.exports=n(6)?Object.defineProperties:function(t,e){i(t);for(var n,u=o(e),s=u.length,c=0;s>c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(8),i=n(43),o=n(32)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(22),i=n(21);t.exports=function(t){return function(e,n){var o,u,s=String(i(e)),c=r(n),a=s.length;return c<0||c>=a?t?"":void 0:(o=s.charCodeAt(c))<55296||o>56319||c+1===a||(u=s.charCodeAt(c+1))<56320||u>57343?t?s.charAt(c):o:t?s.slice(c,c+2):u-56320+(o-55296<<10)+65536}}},function(t,e){},function(t,e,n){var r=n(5),i=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},,function(t,e,n){t.exports={default:n(85),__esModule:!0}},function(t,e,n){n(65),n(64),t.exports=n(50).f("iterator")},function(t,e,n){t.exports={default:n(87),__esModule:!0}},function(t,e,n){n(88),n(81),n(94),n(95),t.exports=n(5).Symbol},function(t,e,n){"use strict";var r=n(4),i=n(8),o=n(6),u=n(17),s=n(58),c=n(89).KEY,a=n(10),f=n(35),l=n(47),p=n(25),d=n(15),h=n(50),v=n(51),y=n(90),m=n(91),x=n(12),b=n(7),g=n(13),_=n(20),S=n(18),w=n(59),O=n(92),C=n(93),T=n(9),k=n(31),I=C.f,j=T.f,M=O.f,P=r.Symbol,E=r.JSON,V=E&&E.stringify,L=d("_hidden"),N=d("toPrimitive"),$={}.propertyIsEnumerable,A=f("symbol-registry"),Y=f("symbols"),D=f("op-symbols"),F=Object.prototype,R="function"==typeof P,G=r.QObject,B=!G||!G.prototype||!G.prototype.findChild,J=o&&a(function(){return 7!=w(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=I(F,e);r&&delete F[e],j(t,e,n),r&&t!==F&&j(F,e,r)}:j,K=function(t){var e=Y[t]=w(P.prototype);return e._k=t,e},z=R&&"symbol"==typeof P.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof P},W=function(t,e,n){return t===F&&W(D,e,n),x(t),e=_(e,!0),x(n),i(Y,e)?(n.enumerable?(i(t,L)&&t[L][e]&&(t[L][e]=!1),n=w(n,{enumerable:S(0,!1)})):(i(t,L)||j(t,L,S(1,{})),t[L][e]=!0),J(t,e,n)):j(t,e,n)},H=function(t,e){x(t);for(var n,r=y(e=g(e)),i=0,o=r.length;o>i;)W(t,n=r[i++],e[n]);return t},q=function(t){var e=$.call(this,t=_(t,!0));return!(this===F&&i(Y,t)&&!i(D,t))&&(!(e||!i(this,t)||!i(Y,t)||i(this,L)&&this[L][t])||e)},U=function(t,e){if(t=g(t),e=_(e,!0),t!==F||!i(Y,e)||i(D,e)){var n=I(t,e);return!n||!i(Y,e)||i(t,L)&&t[L][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=M(g(t)),r=[],o=0;n.length>o;)i(Y,e=n[o++])||e==L||e==c||r.push(e);return r},Q=function(t){for(var e,n=t===F,r=M(n?D:g(t)),o=[],u=0;r.length>u;)!i(Y,e=r[u++])||n&&!i(F,e)||o.push(Y[e]);return o};R||(s((P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===F&&e.call(D,n),i(this,L)&&i(this[L],t)&&(this[L][t]=!1),J(this,t,S(1,n))};return o&&B&&J(F,t,{configurable:!0,set:e}),K(t)}).prototype,"toString",function(){return this._k}),C.f=U,T.f=W,n(70).f=O.f=X,n(37).f=q,n(40).f=Q,o&&!n(24)&&s(F,"propertyIsEnumerable",q,!0),h.f=function(t){return K(d(t))}),u(u.G+u.W+u.F*!R,{Symbol:P});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)d(Z[tt++]);for(var et=k(d.store),nt=0;et.length>nt;)v(et[nt++]);u(u.S+u.F*!R,"Symbol",{for:function(t){return i(A,t+="")?A[t]:A[t]=P(t)},keyFor:function(t){if(!z(t))throw TypeError(t+" is not a symbol!");for(var e in A)if(A[e]===t)return e},useSetter:function(){B=!0},useSimple:function(){B=!1}}),u(u.S+u.F*!R,"Object",{create:function(t,e){return void 0===e?w(t):H(w(t),e)},defineProperty:W,defineProperties:H,getOwnPropertyDescriptor:U,getOwnPropertyNames:X,getOwnPropertySymbols:Q}),E&&u(u.S+u.F*(!R||a(function(){var t=P();return"[null]"!=V([t])||"{}"!=V({a:t})||"{}"!=V(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);if(n=e=r[1],(b(e)||void 0!==t)&&!z(t))return m(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!z(e))return e}),r[1]=e,V.apply(E,r)}}),P.prototype[N]||n(11)(P.prototype,N,P.prototype.valueOf),l(P,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(25)("meta"),i=n(7),o=n(8),u=n(9).f,s=0,c=Object.isExtensible||function(){return!0},a=!n(10)(function(){return c(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++s,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!c(t))return"F";if(!e)return"E";f(t)}return t[r].i},getWeak:function(t,e){if(!o(t,r)){if(!c(t))return!0;if(!e)return!1;f(t)}return t[r].w},onFreeze:function(t){return a&&l.NEED&&c(t)&&!o(t,r)&&f(t),t}}},function(t,e,n){var r=n(31),i=n(40),o=n(37);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var u,s=n(t),c=o.f,a=0;s.length>a;)c.call(t,u=s[a++])&&e.push(u);return e}},function(t,e,n){var r=n(34);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(13),i=n(70).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==o.call(t)?function(t){try{return i(t)}catch(t){return u.slice()}}(t):i(r(t))}},function(t,e,n){var r=n(37),i=n(18),o=n(13),u=n(20),s=n(8),c=n(30),a=Object.getOwnPropertyDescriptor;e.f=n(6)?a:function(t,e){if(t=o(t),e=u(e,!0),c)try{return a(t,e)}catch(t){}if(s(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){n(51)("asyncIterator")},function(t,e,n){n(51)("observable")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n.r(e);var r=n(57),i=n.n(r),o=n(60),u=n.n(o),s=n(0),c=function(t,e,n){return Math.min(Math.max(t,e),n)},a=Object(s.a)({name:"picker-column",props:{options:{type:Array,default:function(){return[]}},value:{},valueKey:String,visibleItemCount:{type:Number,default:7,validator:function(t){return[3,5,7].indexOf(t)>-1}},defaultIndex:{type:Number,default:0},divider:{type:Boolean,default:!1},content:{type:String,default:""}},data:function(){return{startY:0,startOffset:0,offset:0,prevY:0,prevTime:null,velocity:0,transition:"",currentIndex:this.defaultIndex}},computed:{minTranslateY:function(){return 34*(Math.ceil(this.visibleItemCount/2)-this.options.length)},maxTranslateY:function(){return 34*Math.floor(this.visibleItemCount/2)},wrapperStyle:function(){return{transition:this.transition,transform:"translate3d(0, "+this.offset+"px, 0)"}},pickerIndicatorStyle:function(){return{top:34*Math.floor(this.visibleItemCount/2)+"px"}},pickerMaskStyle:function(){return{backgroundSize:"100% "+34*Math.floor(this.visibleItemCount/2)+"px"}},count:function(){return this.options.length},currentValue:function(){return this.options[this.currentIndex]}},created:function(){this.$parent&&this.$parent.children.push(this)},mounted:function(){this.setIndex(this.currentIndex)},destroyed:function(){this.$parent&&this.$parent.children.splice(this.$parent.children.indexOf(this),1)},methods:{getOptionText:function(t){return"object"===(void 0===t?"undefined":u()(t))?t[this.valueKey]:t},isDisabled:function(t){return"object"===(void 0===t?"undefined":u()(t))&&t.disabled},indexToOffset:function(t){return-34*(t-Math.floor(this.visibleItemCount/2))},offsetToIndex:function(t){return-((t=34*Math.round(t/34))-34*Math.floor(this.visibleItemCount/2))/34},onTouchstart:function(t){this.startOffset=this.offset,this.startY=t.touches[0].clientY,this.prevY=t.touches[0].clientY,this.prevTime=new Date,this.transition=""},onTouchmove:function(t){var e=+new Date,n=t.touches[0].clientY,r=n-this.startY;this.offset=this.startOffset+r,this.velocity=(t.touches[0].clientY-this.prevY)/(e-this.prevTime),this.prevY=n,this.prevTime=e},onTouchend:function(){this.transition="all 150ms ease";var t=this.offset+150*this.velocity,e=this.offsetToIndex(t);this.setIndex(e,!0)},onClick:function(t){var e=this.$refs.indicator;this.transition="all 150ms ease";var n=e.getBoundingClientRect(),r=34*Math.floor((t.clientY-n.top)/34),i=this.offset-r;this.offset=c(i,this.minTranslateY,this.maxTranslateY);var o=this.offsetToIndex(this.offset);this.setIndex(o,!0)},adjustIndex:function(t){for(var e=t=c(t,0,this.count);e<this.count;e++)if(!this.isDisabled(this.options[e]))return e;for(var n=t-1;n>=0;n--)if(!this.isDisabled(this.options[n]))return n},setIndex:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t=this.adjustIndex(t),this.offset=this.indexToOffset(t),t!==this.currentIndex&&(this.currentIndex=t,e&&this.$emit("change",t))},setValue:function(t){var e=this,n=this.options.findIndex(function(n){return e.getOptionText(n)===t});n>-1&&this.setIndex(n)}},watch:{defaultIndex:function(t){this.setIndex(t)},options:function(t,e){i()(t)!==i()(e)&&this.setIndex(0)}}}),f=(n(140),n(1)),l=Object(f.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.divider?n("div",{staticClass:"wv-picker-column-divider",domProps:{innerHTML:t._s(t.content)}}):n("div",{staticClass:"weui-picker__group",on:{touchstart:t.onTouchstart,touchmove:function(e){return e.preventDefault(),t.onTouchmove(e)},touchend:t.onTouchend,touchcancel:t.onTouchend,click:t.onClick}},[n("div",{staticClass:"weui-picker__mask",style:t.pickerMaskStyle}),t._v(" "),n("div",{ref:"indicator",staticClass:"weui-picker__indicator",style:t.pickerIndicatorStyle}),t._v(" "),n("div",{staticClass:"weui-picker__content",style:t.wrapperStyle},t._l(t.options,function(e,r){return n("div",{key:r,staticClass:"weui-picker__item",class:{"weui-picker__item_disabled":t.isDisabled(e)},domProps:{textContent:t._s(t.getOptionText(e))}})}))])},[],!1,null,"0bca5b1f",null);l.options.__file="picker-column.vue";var p=l.exports,d=Object(s.a)({name:"picker",components:{PickerColumn:p},props:{visible:Boolean,confirmText:{type:String,default:"确定"},cancelText:{type:String,default:"取消"},columns:{type:Array,default:function(){return[]}},valueKey:String,visibleItemCount:{type:Number,default:7,validator:function(t){return[3,5,7].indexOf(t)>-1}},value:{type:Array,default:function(){return[]}}},data:function(){return{children:[],currentColumns:[],currentValue:this.value}},computed:{columnCount:function(){return this.columns.filter(function(t){return!t.divider}).length},pickerBodyStyle:function(){return{height:34*this.visibleItemCount+"px"}}},created:function(){this.initialize()},methods:{initialize:function(){this.currentColumns=this.columns},columnValueChange:function(t){this.currentValue=this.getValues(),this.$emit("change",this,this.getValues(),t)},getColumn:function(t){return this.children.find(function(e,n){return"wv-picker-column"===e.$options.name&&!e.divider&&n===t})},getColumnValue:function(t){return(this.getColumn(t)||{}).currentValue},setColumnValue:function(t,e){var n=this.getColumn(t);n&&n.setValue(e)},getColumnValues:function(t){return(this.currentColumns[t]||{}).values},setColumnValues:function(t,e){var n=this.currentColumns[t];n&&(n.values=e)},getValues:function(){return this.children.map(function(t){return t.currentValue})},setValues:function(t){var e=this;if(this.columnCount!==t.length)throw new Error("Length values is not equal to columns count.");t.forEach(function(t,n){e.setColumnValue(n,t)})},getColumnIndex:function(t){return(this.getColumn(t)||{}).currentIndex},setColumnIndex:function(t,e){var n=this.getColumn(t);n&&n.setIndex(e)},getIndexes:function(){return this.children.map(function(t){return t.currentIndex})},setIndexes:function(t){var e=this;t.forEach(function(t,n){e.setColumnIndex(n,t)})},onCancel:function(){this.$emit("cancel",this),this.$emit("update:visible",!1)},onConfirm:function(){this.$emit("confirm",this),this.$emit("update:visible",!1)}},watch:{value:function(t){this.setValues(t),this.currentValue=t},currentValue:function(t){this.$emit("input",t)}}}),h=(n(142),Object(f.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("transition",{attrs:{"enter-active-class":"weui-animate-fade-in","leave-active-class":"weui-animate-fade-out"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"weui-mask"})]),t._v(" "),n("transition",{attrs:{"enter-active-class":"weui-animate-slide-up","leave-active-class":"weui-animate-slide-down"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"weui-picker"},[n("div",{staticClass:"weui-picker__hd"},[n("div",{staticClass:"weui-picker__action",domProps:{textContent:t._s(t.cancelText)},on:{click:t.onCancel}}),t._v(" "),n("div",{staticClass:"weui-picker__action",domProps:{textContent:t._s(t.confirmText)},on:{click:t.onConfirm}})]),t._v(" "),n("div",{staticClass:"weui-picker__bd",style:t.pickerBodyStyle},t._l(t.columns,function(e,r){return n("picker-column",{key:r,attrs:{options:e.values||[],"value-key":t.valueKey,divider:e.divider,content:e.content,"default-index":e.defaultIndex,"visible-item-count":t.visibleItemCount},on:{change:function(e){t.columnValueChange(r)}}})}))])])],1)},[],!1,null,"5c745e2d",null));h.options.__file="index.vue",e.default=h.exports},,,function(t,e,n){"use strict";var r=n(66);n.n(r).a},,function(t,e,n){"use strict";var r=n(67);n.n(r).a}])});

/***/ }),

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n="object"==typeof exports?e(require("vue")):e(t.Vue);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=284)}({0:function(t,e,n){"use strict";var r=n(2),o=n.n(r),i=n(3),u=function(t){return t.changedTouches[0]||t.touches[0]};n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i.a}),n.d(e,"b",function(){return u});var a=o.a.prototype.$isServer},1:function(t,e,n){"use strict";function r(t,e,n,r,o,i,u,a){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),u?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var s=l.render;l.render=function(t,e){return c.call(e),s(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:l}}n.d(e,"a",function(){return r})},10:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},11:function(t,e,n){var r=n(9),o=n(18);t.exports=n(6)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},115:function(t,e,n){},12:function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},17:function(t,e,n){var r=n(4),o=n(5),i=n(28),u=n(11),a=n(8),c=function(t,e,n){var l,s,f,d=t&c.F,p=t&c.G,h=t&c.S,v=t&c.P,y=t&c.B,m=t&c.W,b=p?o:o[e]||(o[e]={}),_=b.prototype,g=p?r:h?r[e]:(r[e]||{}).prototype;for(l in p&&(n=e),n)(s=!d&&g&&void 0!==g[l])&&a(b,l)||(f=s?g[l]:n[l],b[l]=p&&"function"!=typeof g[l]?n[l]:y&&s?i(f,r):m&&g[l]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):v&&"function"==typeof f?i(Function.call,f):f,v&&((b.virtual||(b.virtual={}))[l]=f,t&c.R&&_&&!_[l]&&u(_,l,f)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},18:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},2:function(e,n){e.exports=t},20:function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},213:function(t,e,n){"use strict";var r=n(115);n.n(r).a},23:function(t,e,n){var r=n(7),o=n(4).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},28:function(t,e,n){var r=n(29);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},284:function(t,e,n){"use strict";n.r(e);var r=n(33),o=n.n(r),i=n(71),u=n(0),a=Object(u.a)({components:o()({},i.default.name,i.default),name:"input",props:{type:{type:String,default:"text"},label:String,labelWidth:{type:Number,default:105},placeholder:String,value:String,name:String,autoComplete:{type:String,default:"off"},maxlength:Number,minlength:Number,autofocus:Boolean,readonly:Boolean,disabled:Boolean,required:{type:Boolean,default:!1},pattern:String,validateMode:{type:Object,default:function(){return{onFocus:!0,onBlur:!0,onChange:!0,onInput:!0}}}},data:function(){return{active:!1,valid:!0,currentValue:this.value}},methods:{handleInput:function(t){this.maxlength&&t.target.value.length>=this.maxlength?(this.currentValue="",this.currentValue=t.target.value.substr(0,this.maxlength)):this.currentValue=t.target.value,void 0!==this.validateMode&&!1===this.validateMode.onInput||this.validate()},focus:function(){this.$refs.input.focus()},onFocus:function(){this.active=!0,this.$emit("focus"),void 0!==this.validateMode&&!1===this.validateMode.onFocus||this.validate()},onBlur:function(){this.active=!1,this.$emit("blur"),void 0!==this.validateMode&&!1===this.validateMode.onBlur||this.validate()},onChange:function(){this.$emit("change",this.currentValue),void 0!==this.validateMode&&!1===this.validateMode.onChange||this.validate()},validate:function(){!this.pattern||new RegExp(this.pattern).test(this.currentValue)?this.required&&""===this.currentValue?this.valid=!1:this.minlength&&this.currentValue.length<this.minlength?this.valid=!1:this.valid=!0:this.valid=!1}},watch:{currentValue:function(t){this.$emit("input",t)},value:function(t){this.currentValue=t}}}),c=(n(213),n(1)),l=Object(c.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"weui-cell_warn":!t.valid}},[n("div",{staticClass:"weui-cell__hd"},[t.label?n("label",{staticClass:"weui-label",style:{width:t.labelWidth+"px"},domProps:{innerHTML:t._s(t.label)}}):t._e()]),t._v(" "),n("div",{staticClass:"weui-cell__bd"},[n("input",{ref:"input",staticClass:"weui-input",attrs:{type:t.type,"auto-complete":t.autoComplete,autofocus:t.autofocus,placeholder:t.placeholder,readonly:t.readonly,number:"number"===t.type,maxlength:t.maxlength,minlength:t.minlength},domProps:{value:t.currentValue},on:{focus:t.onFocus,blur:t.onBlur,change:t.onChange,input:t.handleInput}})]),t._v(" "),n("div",{staticClass:"weui-cell__ft"},[t.valid?t._e():n("wv-icon",{attrs:{type:"warn"}}),t._v(" "),t._t("ft")],2)])},[],!1,null,"55da79da",null);l.options.__file="index.vue",e.default=l.exports},29:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},3:function(t,e,n){"use strict";var r=function(t){t.component(this.name,this)};e.a=function(t){return t.name="wv-"+t.name,t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||r,t.methods=t.methods||{},t}},30:function(t,e,n){t.exports=!n(6)&&!n(10)(function(){return 7!=Object.defineProperty(n(23)("div"),"a",{get:function(){return 7}}).a})},33:function(t,e,n){"use strict";e.__esModule=!0;var r,o=(r=n(61))&&r.__esModule?r:{default:r};e.default=function(t,e,n){return e in t?(0,o.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},4:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},48:function(t,e,n){},5:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},6:function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},61:function(t,e,n){t.exports={default:n(62),__esModule:!0}},62:function(t,e,n){n(63);var r=n(5).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},63:function(t,e,n){var r=n(17);r(r.S+r.F*!n(6),"Object",{defineProperty:n(9).f})},7:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},71:function(t,e,n){"use strict";n.r(e);var r=n(33),o=n.n(r),i=n(0),u=Object(i.a)({name:"icon",props:{type:{type:String,required:!0},large:Boolean},computed:{classObject:function(){var t,e="weui-icon-"+this.type;return t={},o()(t,e,!0),o()(t,"weui-icon_msg",this.large),t}}}),a=(n(96),n(1)),c=Object(a.a)(u,function(){var t=this.$createElement;return(this._self._c||t)("i",{class:this.classObject})},[],!1,null,"5c55cccb",null);c.options.__file="index.vue",e.default=c.exports},8:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},9:function(t,e,n){var r=n(12),o=n(30),i=n(20),u=Object.defineProperty;e.f=n(6)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},96:function(t,e,n){"use strict";var r=n(48);n.n(r).a}})});

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(677), __esModule: true };

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(678);
module.exports = __webpack_require__(8).Object.values;


/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(25);
var $values = __webpack_require__(679)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(56);
var toIObject = __webpack_require__(38);
var isEnum = __webpack_require__(75).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = {
  "86": {
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省",
    "150000": "内蒙古自治区",
    "210000": "辽宁省",
    "220000": "吉林省",
    "230000": "黑龙江省",
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省",
    "350000": "福建省",
    "360000": "江西省",
    "370000": "山东省",
    "410000": "河南省",
    "420000": "湖北省",
    "430000": "湖南省",
    "440000": "广东省",
    "450000": "广西壮族自治区",
    "460000": "海南省",
    "500000": "重庆市",
    "510000": "四川省",
    "520000": "贵州省",
    "530000": "云南省",
    "540000": "西藏自治区",
    "610000": "陕西省",
    "620000": "甘肃省",
    "630000": "青海省",
    "640000": "宁夏回族自治区",
    "650000": "新疆维吾尔自治区",
    "710000": "台湾省",
    "810000": "香港特别行政区",
    "820000": "澳门特别行政区"
  },
  "110000": {
    "110100": "市辖区"
  },
  "110100": {
    "110101": "东城区",
    "110102": "西城区",
    "110105": "朝阳区",
    "110106": "丰台区",
    "110107": "石景山区",
    "110108": "海淀区",
    "110109": "门头沟区",
    "110111": "房山区",
    "110112": "通州区",
    "110113": "顺义区",
    "110114": "昌平区",
    "110115": "大兴区",
    "110116": "怀柔区",
    "110117": "平谷区",
    "110118": "密云区",
    "110119": "延庆区"
  },
  "120000": {
    "120100": "市辖区"
  },
  "120100": {
    "120101": "和平区",
    "120102": "河东区",
    "120103": "河西区",
    "120104": "南开区",
    "120105": "河北区",
    "120106": "红桥区",
    "120110": "东丽区",
    "120111": "西青区",
    "120112": "津南区",
    "120113": "北辰区",
    "120114": "武清区",
    "120115": "宝坻区",
    "120116": "滨海新区",
    "120117": "宁河区",
    "120118": "静海区",
    "120119": "蓟州区"
  },
  "130000": {
    "130100": "石家庄市",
    "130200": "唐山市",
    "130300": "秦皇岛市",
    "130400": "邯郸市",
    "130500": "邢台市",
    "130600": "保定市",
    "130700": "张家口市",
    "130800": "承德市",
    "130900": "沧州市",
    "131000": "廊坊市",
    "131100": "衡水市",
    "139001": "定州市",
    "139002": "辛集市"
  },
  "130100": {
    "130102": "长安区",
    "130104": "桥西区",
    "130105": "新华区",
    "130107": "井陉矿区",
    "130108": "裕华区",
    "130109": "藁城区",
    "130110": "鹿泉区",
    "130111": "栾城区",
    "130121": "井陉县",
    "130123": "正定县",
    "130125": "行唐县",
    "130126": "灵寿县",
    "130127": "高邑县",
    "130128": "深泽县",
    "130129": "赞皇县",
    "130130": "无极县",
    "130131": "平山县",
    "130132": "元氏县",
    "130133": "赵县",
    "130183": "晋州市",
    "130184": "新乐市"
  },
  "130200": {
    "130202": "路南区",
    "130203": "路北区",
    "130204": "古冶区",
    "130205": "开平区",
    "130207": "丰南区",
    "130208": "丰润区",
    "130209": "曹妃甸区",
    "130223": "滦县",
    "130224": "滦南县",
    "130225": "乐亭县",
    "130227": "迁西县",
    "130229": "玉田县",
    "130281": "遵化市",
    "130283": "迁安市"
  },
  "130300": {
    "130302": "海港区",
    "130303": "山海关区",
    "130304": "北戴河区",
    "130306": "抚宁区",
    "130321": "青龙满族自治县",
    "130322": "昌黎县",
    "130324": "卢龙县"
  },
  "130400": {
    "130402": "邯山区",
    "130403": "丛台区",
    "130404": "复兴区",
    "130406": "峰峰矿区",
    "130421": "邯郸县",
    "130423": "临漳县",
    "130424": "成安县",
    "130425": "大名县",
    "130426": "涉县",
    "130427": "磁县",
    "130428": "肥乡县",
    "130429": "永年县",
    "130430": "邱县",
    "130431": "鸡泽县",
    "130432": "广平县",
    "130433": "馆陶县",
    "130434": "魏县",
    "130435": "曲周县",
    "130481": "武安市"
  },
  "130500": {
    "130502": "桥东区",
    "130503": "桥西区",
    "130521": "邢台县",
    "130522": "临城县",
    "130523": "内丘县",
    "130524": "柏乡县",
    "130525": "隆尧县",
    "130526": "任县",
    "130527": "南和县",
    "130528": "宁晋县",
    "130529": "巨鹿县",
    "130530": "新河县",
    "130531": "广宗县",
    "130532": "平乡县",
    "130533": "威县",
    "130534": "清河县",
    "130535": "临西县",
    "130581": "南宫市",
    "130582": "沙河市"
  },
  "130600": {
    "130602": "竞秀区",
    "130606": "莲池区",
    "130607": "满城区",
    "130608": "清苑区",
    "130609": "徐水区",
    "130623": "涞水县",
    "130624": "阜平县",
    "130626": "定兴县",
    "130627": "唐县",
    "130628": "高阳县",
    "130629": "容城县",
    "130630": "涞源县",
    "130631": "望都县",
    "130632": "安新县",
    "130633": "易县",
    "130634": "曲阳县",
    "130635": "蠡县",
    "130636": "顺平县",
    "130637": "博野县",
    "130638": "雄县",
    "130681": "涿州市",
    "130683": "安国市",
    "130684": "高碑店市"
  },
  "130700": {
    "130702": "桥东区",
    "130703": "桥西区",
    "130705": "宣化区",
    "130706": "下花园区",
    "130708": "万全区",
    "130709": "崇礼区",
    "130722": "张北县",
    "130723": "康保县",
    "130724": "沽源县",
    "130725": "尚义县",
    "130726": "蔚县",
    "130727": "阳原县",
    "130728": "怀安县",
    "130730": "怀来县",
    "130731": "涿鹿县",
    "130732": "赤城县"
  },
  "130800": {
    "130802": "双桥区",
    "130803": "双滦区",
    "130804": "鹰手营子矿区",
    "130821": "承德县",
    "130822": "兴隆县",
    "130823": "平泉县",
    "130824": "滦平县",
    "130825": "隆化县",
    "130826": "丰宁满族自治县",
    "130827": "宽城满族自治县",
    "130828": "围场满族蒙古族自治县"
  },
  "130900": {
    "130902": "新华区",
    "130903": "运河区",
    "130921": "沧县",
    "130922": "青县",
    "130923": "东光县",
    "130924": "海兴县",
    "130925": "盐山县",
    "130926": "肃宁县",
    "130927": "南皮县",
    "130928": "吴桥县",
    "130929": "献县",
    "130930": "孟村回族自治县",
    "130981": "泊头市",
    "130982": "任丘市",
    "130983": "黄骅市",
    "130984": "河间市"
  },
  "131000": {
    "131002": "安次区",
    "131003": "广阳区",
    "131022": "固安县",
    "131023": "永清县",
    "131024": "香河县",
    "131025": "大城县",
    "131026": "文安县",
    "131028": "大厂回族自治县",
    "131081": "霸州市",
    "131082": "三河市"
  },
  "131100": {
    "131102": "桃城区",
    "131103": "冀州区",
    "131121": "枣强县",
    "131122": "武邑县",
    "131123": "武强县",
    "131124": "饶阳县",
    "131125": "安平县",
    "131126": "故城县",
    "131127": "景县",
    "131128": "阜城县",
    "131182": "深州市"
  },
  "140000": {
    "140100": "太原市",
    "140200": "大同市",
    "140300": "阳泉市",
    "140400": "长治市",
    "140500": "晋城市",
    "140600": "朔州市",
    "140700": "晋中市",
    "140800": "运城市",
    "140900": "忻州市",
    "141000": "临汾市",
    "141100": "吕梁市"
  },
  "140100": {
    "140105": "小店区",
    "140106": "迎泽区",
    "140107": "杏花岭区",
    "140108": "尖草坪区",
    "140109": "万柏林区",
    "140110": "晋源区",
    "140121": "清徐县",
    "140122": "阳曲县",
    "140123": "娄烦县",
    "140181": "古交市"
  },
  "140200": {
    "140202": "城区",
    "140203": "矿区",
    "140211": "南郊区",
    "140212": "新荣区",
    "140221": "阳高县",
    "140222": "天镇县",
    "140223": "广灵县",
    "140224": "灵丘县",
    "140225": "浑源县",
    "140226": "左云县",
    "140227": "大同县"
  },
  "140300": {
    "140302": "城区",
    "140303": "矿区",
    "140311": "郊区",
    "140321": "平定县",
    "140322": "盂县"
  },
  "140400": {
    "140402": "城区",
    "140411": "郊区",
    "140421": "长治县",
    "140423": "襄垣县",
    "140424": "屯留县",
    "140425": "平顺县",
    "140426": "黎城县",
    "140427": "壶关县",
    "140428": "长子县",
    "140429": "武乡县",
    "140430": "沁县",
    "140431": "沁源县",
    "140481": "潞城市"
  },
  "140500": {
    "140502": "城区",
    "140521": "沁水县",
    "140522": "阳城县",
    "140524": "陵川县",
    "140525": "泽州县",
    "140581": "高平市"
  },
  "140600": {
    "140602": "朔城区",
    "140603": "平鲁区",
    "140621": "山阴县",
    "140622": "应县",
    "140623": "右玉县",
    "140624": "怀仁县"
  },
  "140700": {
    "140702": "榆次区",
    "140721": "榆社县",
    "140722": "左权县",
    "140723": "和顺县",
    "140724": "昔阳县",
    "140725": "寿阳县",
    "140726": "太谷县",
    "140727": "祁县",
    "140728": "平遥县",
    "140729": "灵石县",
    "140781": "介休市"
  },
  "140800": {
    "140802": "盐湖区",
    "140821": "临猗县",
    "140822": "万荣县",
    "140823": "闻喜县",
    "140824": "稷山县",
    "140825": "新绛县",
    "140826": "绛县",
    "140827": "垣曲县",
    "140828": "夏县",
    "140829": "平陆县",
    "140830": "芮城县",
    "140881": "永济市",
    "140882": "河津市"
  },
  "140900": {
    "140902": "忻府区",
    "140921": "定襄县",
    "140922": "五台县",
    "140923": "代县",
    "140924": "繁峙县",
    "140925": "宁武县",
    "140926": "静乐县",
    "140927": "神池县",
    "140928": "五寨县",
    "140929": "岢岚县",
    "140930": "河曲县",
    "140931": "保德县",
    "140932": "偏关县",
    "140981": "原平市"
  },
  "141000": {
    "141002": "尧都区",
    "141021": "曲沃县",
    "141022": "翼城县",
    "141023": "襄汾县",
    "141024": "洪洞县",
    "141025": "古县",
    "141026": "安泽县",
    "141027": "浮山县",
    "141028": "吉县",
    "141029": "乡宁县",
    "141030": "大宁县",
    "141031": "隰县",
    "141032": "永和县",
    "141033": "蒲县",
    "141034": "汾西县",
    "141081": "侯马市",
    "141082": "霍州市"
  },
  "141100": {
    "141102": "离石区",
    "141121": "文水县",
    "141122": "交城县",
    "141123": "兴县",
    "141124": "临县",
    "141125": "柳林县",
    "141126": "石楼县",
    "141127": "岚县",
    "141128": "方山县",
    "141129": "中阳县",
    "141130": "交口县",
    "141181": "孝义市",
    "141182": "汾阳市"
  },
  "150000": {
    "150100": "呼和浩特市",
    "150200": "包头市",
    "150300": "乌海市",
    "150400": "赤峰市",
    "150500": "通辽市",
    "150600": "鄂尔多斯市",
    "150700": "呼伦贝尔市",
    "150800": "巴彦淖尔市",
    "150900": "乌兰察布市",
    "152200": "兴安盟",
    "152500": "锡林郭勒盟",
    "152900": "阿拉善盟"
  },
  "150100": {
    "150102": "新城区",
    "150103": "回民区",
    "150104": "玉泉区",
    "150105": "赛罕区",
    "150121": "土默特左旗",
    "150122": "托克托县",
    "150123": "和林格尔县",
    "150124": "清水河县",
    "150125": "武川县"
  },
  "150200": {
    "150202": "东河区",
    "150203": "昆都仑区",
    "150204": "青山区",
    "150205": "石拐区",
    "150206": "白云鄂博矿区",
    "150207": "九原区",
    "150221": "土默特右旗",
    "150222": "固阳县",
    "150223": "达尔罕茂明安联合旗"
  },
  "150300": {
    "150302": "海勃湾区",
    "150303": "海南区",
    "150304": "乌达区"
  },
  "150400": {
    "150402": "红山区",
    "150403": "元宝山区",
    "150404": "松山区",
    "150421": "阿鲁科尔沁旗",
    "150422": "巴林左旗",
    "150423": "巴林右旗",
    "150424": "林西县",
    "150425": "克什克腾旗",
    "150426": "翁牛特旗",
    "150428": "喀喇沁旗",
    "150429": "宁城县",
    "150430": "敖汉旗"
  },
  "150500": {
    "150502": "科尔沁区",
    "150521": "科尔沁左翼中旗",
    "150522": "科尔沁左翼后旗",
    "150523": "开鲁县",
    "150524": "库伦旗",
    "150525": "奈曼旗",
    "150526": "扎鲁特旗",
    "150581": "霍林郭勒市"
  },
  "150600": {
    "150602": "东胜区",
    "150603": "康巴什区",
    "150621": "达拉特旗",
    "150622": "准格尔旗",
    "150623": "鄂托克前旗",
    "150624": "鄂托克旗",
    "150625": "杭锦旗",
    "150626": "乌审旗",
    "150627": "伊金霍洛旗"
  },
  "150700": {
    "150702": "海拉尔区",
    "150703": "扎赉诺尔区",
    "150721": "阿荣旗",
    "150722": "莫力达瓦达斡尔族自治旗",
    "150723": "鄂伦春自治旗",
    "150724": "鄂温克族自治旗",
    "150725": "陈巴尔虎旗",
    "150726": "新巴尔虎左旗",
    "150727": "新巴尔虎右旗",
    "150781": "满洲里市",
    "150782": "牙克石市",
    "150783": "扎兰屯市",
    "150784": "额尔古纳市",
    "150785": "根河市"
  },
  "150800": {
    "150802": "临河区",
    "150821": "五原县",
    "150822": "磴口县",
    "150823": "乌拉特前旗",
    "150824": "乌拉特中旗",
    "150825": "乌拉特后旗",
    "150826": "杭锦后旗"
  },
  "150900": {
    "150902": "集宁区",
    "150921": "卓资县",
    "150922": "化德县",
    "150923": "商都县",
    "150924": "兴和县",
    "150925": "凉城县",
    "150926": "察哈尔右翼前旗",
    "150927": "察哈尔右翼中旗",
    "150928": "察哈尔右翼后旗",
    "150929": "四子王旗",
    "150981": "丰镇市"
  },
  "152200": {
    "152201": "乌兰浩特市",
    "152202": "阿尔山市",
    "152221": "科尔沁右翼前旗",
    "152222": "科尔沁右翼中旗",
    "152223": "扎赉特旗",
    "152224": "突泉县"
  },
  "152500": {
    "152501": "二连浩特市",
    "152502": "锡林浩特市",
    "152522": "阿巴嘎旗",
    "152523": "苏尼特左旗",
    "152524": "苏尼特右旗",
    "152525": "东乌珠穆沁旗",
    "152526": "西乌珠穆沁旗",
    "152527": "太仆寺旗",
    "152528": "镶黄旗",
    "152529": "正镶白旗",
    "152530": "正蓝旗",
    "152531": "多伦县"
  },
  "152900": {
    "152921": "阿拉善左旗",
    "152922": "阿拉善右旗",
    "152923": "额济纳旗"
  },
  "210000": {
    "210100": "沈阳市",
    "210200": "大连市",
    "210300": "鞍山市",
    "210400": "抚顺市",
    "210500": "本溪市",
    "210600": "丹东市",
    "210700": "锦州市",
    "210800": "营口市",
    "210900": "阜新市",
    "211000": "辽阳市",
    "211100": "盘锦市",
    "211200": "铁岭市",
    "211300": "朝阳市",
    "211400": "葫芦岛市"
  },
  "210100": {
    "210102": "和平区",
    "210103": "沈河区",
    "210104": "大东区",
    "210105": "皇姑区",
    "210106": "铁西区",
    "210111": "苏家屯区",
    "210112": "浑南区",
    "210113": "沈北新区",
    "210114": "于洪区",
    "210115": "辽中区",
    "210123": "康平县",
    "210124": "法库县",
    "210181": "新民市"
  },
  "210200": {
    "210202": "中山区",
    "210203": "西岗区",
    "210204": "沙河口区",
    "210211": "甘井子区",
    "210212": "旅顺口区",
    "210213": "金州区",
    "210214": "普兰店区",
    "210224": "长海县",
    "210281": "瓦房店市",
    "210283": "庄河市"
  },
  "210300": {
    "210302": "铁东区",
    "210303": "铁西区",
    "210304": "立山区",
    "210311": "千山区",
    "210321": "台安县",
    "210323": "岫岩满族自治县",
    "210381": "海城市"
  },
  "210400": {
    "210402": "新抚区",
    "210403": "东洲区",
    "210404": "望花区",
    "210411": "顺城区",
    "210421": "抚顺县",
    "210422": "新宾满族自治县",
    "210423": "清原满族自治县"
  },
  "210500": {
    "210502": "平山区",
    "210503": "溪湖区",
    "210504": "明山区",
    "210505": "南芬区",
    "210521": "本溪满族自治县",
    "210522": "桓仁满族自治县"
  },
  "210600": {
    "210602": "元宝区",
    "210603": "振兴区",
    "210604": "振安区",
    "210624": "宽甸满族自治县",
    "210681": "东港市",
    "210682": "凤城市"
  },
  "210700": {
    "210702": "古塔区",
    "210703": "凌河区",
    "210711": "太和区",
    "210726": "黑山县",
    "210727": "义县",
    "210781": "凌海市",
    "210782": "北镇市"
  },
  "210800": {
    "210802": "站前区",
    "210803": "西市区",
    "210804": "鲅鱼圈区",
    "210811": "老边区",
    "210881": "盖州市",
    "210882": "大石桥市"
  },
  "210900": {
    "210902": "海州区",
    "210903": "新邱区",
    "210904": "太平区",
    "210905": "清河门区",
    "210911": "细河区",
    "210921": "阜新蒙古族自治县",
    "210922": "彰武县"
  },
  "211000": {
    "211002": "白塔区",
    "211003": "文圣区",
    "211004": "宏伟区",
    "211005": "弓长岭区",
    "211011": "太子河区",
    "211021": "辽阳县",
    "211081": "灯塔市"
  },
  "211100": {
    "211102": "双台子区",
    "211103": "兴隆台区",
    "211104": "大洼区",
    "211122": "盘山县"
  },
  "211200": {
    "211202": "银州区",
    "211204": "清河区",
    "211221": "铁岭县",
    "211223": "西丰县",
    "211224": "昌图县",
    "211281": "调兵山市",
    "211282": "开原市"
  },
  "211300": {
    "211302": "双塔区",
    "211303": "龙城区",
    "211321": "朝阳县",
    "211322": "建平县",
    "211324": "喀喇沁左翼蒙古族自治县",
    "211381": "北票市",
    "211382": "凌源市"
  },
  "211400": {
    "211402": "连山区",
    "211403": "龙港区",
    "211404": "南票区",
    "211421": "绥中县",
    "211422": "建昌县",
    "211481": "兴城市"
  },
  "220000": {
    "220100": "长春市",
    "220200": "吉林市",
    "220300": "四平市",
    "220400": "辽源市",
    "220500": "通化市",
    "220600": "白山市",
    "220700": "松原市",
    "220800": "白城市",
    "222400": "延边朝鲜族自治州"
  },
  "220100": {
    "220102": "南关区",
    "220103": "宽城区",
    "220104": "朝阳区",
    "220105": "二道区",
    "220106": "绿园区",
    "220112": "双阳区",
    "220113": "九台区",
    "220122": "农安县",
    "220182": "榆树市",
    "220183": "德惠市"
  },
  "220200": {
    "220202": "昌邑区",
    "220203": "龙潭区",
    "220204": "船营区",
    "220211": "丰满区",
    "220221": "永吉县",
    "220281": "蛟河市",
    "220282": "桦甸市",
    "220283": "舒兰市",
    "220284": "磐石市"
  },
  "220300": {
    "220302": "铁西区",
    "220303": "铁东区",
    "220322": "梨树县",
    "220323": "伊通满族自治县",
    "220381": "公主岭市",
    "220382": "双辽市"
  },
  "220400": {
    "220402": "龙山区",
    "220403": "西安区",
    "220421": "东丰县",
    "220422": "东辽县"
  },
  "220500": {
    "220502": "东昌区",
    "220503": "二道江区",
    "220521": "通化县",
    "220523": "辉南县",
    "220524": "柳河县",
    "220581": "梅河口市",
    "220582": "集安市"
  },
  "220600": {
    "220602": "浑江区",
    "220605": "江源区",
    "220621": "抚松县",
    "220622": "靖宇县",
    "220623": "长白朝鲜族自治县",
    "220681": "临江市"
  },
  "220700": {
    "220702": "宁江区",
    "220721": "前郭尔罗斯蒙古族自治县",
    "220722": "长岭县",
    "220723": "乾安县",
    "220781": "扶余市"
  },
  "220800": {
    "220802": "洮北区",
    "220821": "镇赉县",
    "220822": "通榆县",
    "220881": "洮南市",
    "220882": "大安市"
  },
  "222400": {
    "222401": "延吉市",
    "222402": "图们市",
    "222403": "敦化市",
    "222404": "珲春市",
    "222405": "龙井市",
    "222406": "和龙市",
    "222424": "汪清县",
    "222426": "安图县"
  },
  "230000": {
    "230100": "哈尔滨市",
    "230200": "齐齐哈尔市",
    "230300": "鸡西市",
    "230400": "鹤岗市",
    "230500": "双鸭山市",
    "230600": "大庆市",
    "230700": "伊春市",
    "230800": "佳木斯市",
    "230900": "七台河市",
    "231000": "牡丹江市",
    "231100": "黑河市",
    "231200": "绥化市",
    "232700": "大兴安岭地区"
  },
  "230100": {
    "230102": "道里区",
    "230103": "南岗区",
    "230104": "道外区",
    "230108": "平房区",
    "230109": "松北区",
    "230110": "香坊区",
    "230111": "呼兰区",
    "230112": "阿城区",
    "230113": "双城区",
    "230123": "依兰县",
    "230124": "方正县",
    "230125": "宾县",
    "230126": "巴彦县",
    "230127": "木兰县",
    "230128": "通河县",
    "230129": "延寿县",
    "230183": "尚志市",
    "230184": "五常市"
  },
  "230200": {
    "230202": "龙沙区",
    "230203": "建华区",
    "230204": "铁锋区",
    "230205": "昂昂溪区",
    "230206": "富拉尔基区",
    "230207": "碾子山区",
    "230208": "梅里斯达斡尔族区",
    "230221": "龙江县",
    "230223": "依安县",
    "230224": "泰来县",
    "230225": "甘南县",
    "230227": "富裕县",
    "230229": "克山县",
    "230230": "克东县",
    "230231": "拜泉县",
    "230281": "讷河市"
  },
  "230300": {
    "230302": "鸡冠区",
    "230303": "恒山区",
    "230304": "滴道区",
    "230305": "梨树区",
    "230306": "城子河区",
    "230307": "麻山区",
    "230321": "鸡东县",
    "230381": "虎林市",
    "230382": "密山市"
  },
  "230400": {
    "230402": "向阳区",
    "230403": "工农区",
    "230404": "南山区",
    "230405": "兴安区",
    "230406": "东山区",
    "230407": "兴山区",
    "230421": "萝北县",
    "230422": "绥滨县"
  },
  "230500": {
    "230502": "尖山区",
    "230503": "岭东区",
    "230505": "四方台区",
    "230506": "宝山区",
    "230521": "集贤县",
    "230522": "友谊县",
    "230523": "宝清县",
    "230524": "饶河县"
  },
  "230600": {
    "230602": "萨尔图区",
    "230603": "龙凤区",
    "230604": "让胡路区",
    "230605": "红岗区",
    "230606": "大同区",
    "230621": "肇州县",
    "230622": "肇源县",
    "230623": "林甸县",
    "230624": "杜尔伯特蒙古族自治县"
  },
  "230700": {
    "230702": "伊春区",
    "230703": "南岔区",
    "230704": "友好区",
    "230705": "西林区",
    "230706": "翠峦区",
    "230707": "新青区",
    "230708": "美溪区",
    "230709": "金山屯区",
    "230710": "五营区",
    "230711": "乌马河区",
    "230712": "汤旺河区",
    "230713": "带岭区",
    "230714": "乌伊岭区",
    "230715": "红星区",
    "230716": "上甘岭区",
    "230722": "嘉荫县",
    "230781": "铁力市"
  },
  "230800": {
    "230803": "向阳区",
    "230804": "前进区",
    "230805": "东风区",
    "230811": "郊区",
    "230822": "桦南县",
    "230826": "桦川县",
    "230828": "汤原县",
    "230881": "同江市",
    "230882": "富锦市",
    "230883": "抚远市"
  },
  "230900": {
    "230902": "新兴区",
    "230903": "桃山区",
    "230904": "茄子河区",
    "230921": "勃利县"
  },
  "231000": {
    "231002": "东安区",
    "231003": "阳明区",
    "231004": "爱民区",
    "231005": "西安区",
    "231025": "林口县",
    "231081": "绥芬河市",
    "231083": "海林市",
    "231084": "宁安市",
    "231085": "穆棱市",
    "231086": "东宁市"
  },
  "231100": {
    "231102": "爱辉区",
    "231121": "嫩江县",
    "231123": "逊克县",
    "231124": "孙吴县",
    "231181": "北安市",
    "231182": "五大连池市"
  },
  "231200": {
    "231202": "北林区",
    "231221": "望奎县",
    "231222": "兰西县",
    "231223": "青冈县",
    "231224": "庆安县",
    "231225": "明水县",
    "231226": "绥棱县",
    "231281": "安达市",
    "231282": "肇东市",
    "231283": "海伦市"
  },
  "232700": {
    "232721": "呼玛县",
    "232722": "塔河县",
    "232723": "漠河县"
  },
  "310000": {
    "310100": "市辖区"
  },
  "310100": {
    "310101": "黄浦区",
    "310104": "徐汇区",
    "310105": "长宁区",
    "310106": "静安区",
    "310107": "普陀区",
    "310109": "虹口区",
    "310110": "杨浦区",
    "310112": "闵行区",
    "310113": "宝山区",
    "310114": "嘉定区",
    "310115": "浦东新区",
    "310116": "金山区",
    "310117": "松江区",
    "310118": "青浦区",
    "310120": "奉贤区",
    "310151": "崇明区"
  },
  "320000": {
    "320100": "南京市",
    "320200": "无锡市",
    "320300": "徐州市",
    "320400": "常州市",
    "320500": "苏州市",
    "320600": "南通市",
    "320700": "连云港市",
    "320800": "淮安市",
    "320900": "盐城市",
    "321000": "扬州市",
    "321100": "镇江市",
    "321200": "泰州市",
    "321300": "宿迁市"
  },
  "320100": {
    "320102": "玄武区",
    "320104": "秦淮区",
    "320105": "建邺区",
    "320106": "鼓楼区",
    "320111": "浦口区",
    "320113": "栖霞区",
    "320114": "雨花台区",
    "320115": "江宁区",
    "320116": "六合区",
    "320117": "溧水区",
    "320118": "高淳区"
  },
  "320200": {
    "320205": "锡山区",
    "320206": "惠山区",
    "320211": "滨湖区",
    "320213": "梁溪区",
    "320214": "新吴区",
    "320281": "江阴市",
    "320282": "宜兴市"
  },
  "320300": {
    "320302": "鼓楼区",
    "320303": "云龙区",
    "320305": "贾汪区",
    "320311": "泉山区",
    "320312": "铜山区",
    "320321": "丰县",
    "320322": "沛县",
    "320324": "睢宁县",
    "320381": "新沂市",
    "320382": "邳州市"
  },
  "320400": {
    "320402": "天宁区",
    "320404": "钟楼区",
    "320411": "新北区",
    "320412": "武进区",
    "320413": "金坛区",
    "320481": "溧阳市"
  },
  "320500": {
    "320505": "虎丘区",
    "320506": "吴中区",
    "320507": "相城区",
    "320508": "姑苏区",
    "320509": "吴江区",
    "320581": "常熟市",
    "320582": "张家港市",
    "320583": "昆山市",
    "320585": "太仓市"
  },
  "320600": {
    "320602": "崇川区",
    "320611": "港闸区",
    "320612": "通州区",
    "320621": "海安县",
    "320623": "如东县",
    "320681": "启东市",
    "320682": "如皋市",
    "320684": "海门市"
  },
  "320700": {
    "320703": "连云区",
    "320706": "海州区",
    "320707": "赣榆区",
    "320722": "东海县",
    "320723": "灌云县",
    "320724": "灌南县"
  },
  "320800": {
    "320803": "淮安区",
    "320804": "淮阴区",
    "320812": "清江浦区",
    "320813": "洪泽区",
    "320826": "涟水县",
    "320830": "盱眙县",
    "320831": "金湖县"
  },
  "320900": {
    "320902": "亭湖区",
    "320903": "盐都区",
    "320904": "大丰区",
    "320921": "响水县",
    "320922": "滨海县",
    "320923": "阜宁县",
    "320924": "射阳县",
    "320925": "建湖县",
    "320981": "东台市"
  },
  "321000": {
    "321002": "广陵区",
    "321003": "邗江区",
    "321012": "江都区",
    "321023": "宝应县",
    "321081": "仪征市",
    "321084": "高邮市"
  },
  "321100": {
    "321102": "京口区",
    "321111": "润州区",
    "321112": "丹徒区",
    "321181": "丹阳市",
    "321182": "扬中市",
    "321183": "句容市"
  },
  "321200": {
    "321202": "海陵区",
    "321203": "高港区",
    "321204": "姜堰区",
    "321281": "兴化市",
    "321282": "靖江市",
    "321283": "泰兴市"
  },
  "321300": {
    "321302": "宿城区",
    "321311": "宿豫区",
    "321322": "沭阳县",
    "321323": "泗阳县",
    "321324": "泗洪县"
  },
  "330000": {
    "330100": "杭州市",
    "330200": "宁波市",
    "330300": "温州市",
    "330400": "嘉兴市",
    "330500": "湖州市",
    "330600": "绍兴市",
    "330700": "金华市",
    "330800": "衢州市",
    "330900": "舟山市",
    "331000": "台州市",
    "331100": "丽水市"
  },
  "330100": {
    "330102": "上城区",
    "330103": "下城区",
    "330104": "江干区",
    "330105": "拱墅区",
    "330106": "西湖区",
    "330108": "滨江区",
    "330109": "萧山区",
    "330110": "余杭区",
    "330111": "富阳区",
    "330122": "桐庐县",
    "330127": "淳安县",
    "330182": "建德市",
    "330185": "临安市"
  },
  "330200": {
    "330203": "海曙区",
    "330204": "江东区",
    "330205": "江北区",
    "330206": "北仑区",
    "330211": "镇海区",
    "330212": "鄞州区",
    "330225": "象山县",
    "330226": "宁海县",
    "330281": "余姚市",
    "330282": "慈溪市",
    "330283": "奉化市"
  },
  "330300": {
    "330302": "鹿城区",
    "330303": "龙湾区",
    "330304": "瓯海区",
    "330305": "洞头区",
    "330324": "永嘉县",
    "330326": "平阳县",
    "330327": "苍南县",
    "330328": "文成县",
    "330329": "泰顺县",
    "330381": "瑞安市",
    "330382": "乐清市"
  },
  "330400": {
    "330402": "南湖区",
    "330411": "秀洲区",
    "330421": "嘉善县",
    "330424": "海盐县",
    "330481": "海宁市",
    "330482": "平湖市",
    "330483": "桐乡市"
  },
  "330500": {
    "330502": "吴兴区",
    "330503": "南浔区",
    "330521": "德清县",
    "330522": "长兴县",
    "330523": "安吉县"
  },
  "330600": {
    "330602": "越城区",
    "330603": "柯桥区",
    "330604": "上虞区",
    "330624": "新昌县",
    "330681": "诸暨市",
    "330683": "嵊州市"
  },
  "330700": {
    "330702": "婺城区",
    "330703": "金东区",
    "330723": "武义县",
    "330726": "浦江县",
    "330727": "磐安县",
    "330781": "兰溪市",
    "330782": "义乌市",
    "330783": "东阳市",
    "330784": "永康市"
  },
  "330800": {
    "330802": "柯城区",
    "330803": "衢江区",
    "330822": "常山县",
    "330824": "开化县",
    "330825": "龙游县",
    "330881": "江山市"
  },
  "330900": {
    "330902": "定海区",
    "330903": "普陀区",
    "330921": "岱山县",
    "330922": "嵊泗县"
  },
  "331000": {
    "331002": "椒江区",
    "331003": "黄岩区",
    "331004": "路桥区",
    "331021": "玉环县",
    "331022": "三门县",
    "331023": "天台县",
    "331024": "仙居县",
    "331081": "温岭市",
    "331082": "临海市"
  },
  "331100": {
    "331102": "莲都区",
    "331121": "青田县",
    "331122": "缙云县",
    "331123": "遂昌县",
    "331124": "松阳县",
    "331125": "云和县",
    "331126": "庆元县",
    "331127": "景宁畲族自治县",
    "331181": "龙泉市"
  },
  "340000": {
    "340100": "合肥市",
    "340200": "芜湖市",
    "340300": "蚌埠市",
    "340400": "淮南市",
    "340500": "马鞍山市",
    "340600": "淮北市",
    "340700": "铜陵市",
    "340800": "安庆市",
    "341000": "黄山市",
    "341100": "滁州市",
    "341200": "阜阳市",
    "341300": "宿州市",
    "341500": "六安市",
    "341600": "亳州市",
    "341700": "池州市",
    "341800": "宣城市"
  },
  "340100": {
    "340102": "瑶海区",
    "340103": "庐阳区",
    "340104": "蜀山区",
    "340111": "包河区",
    "340121": "长丰县",
    "340122": "肥东县",
    "340123": "肥西县",
    "340124": "庐江县",
    "340181": "巢湖市"
  },
  "340200": {
    "340202": "镜湖区",
    "340203": "弋江区",
    "340207": "鸠江区",
    "340208": "三山区",
    "340221": "芜湖县",
    "340222": "繁昌县",
    "340223": "南陵县",
    "340225": "无为县"
  },
  "340300": {
    "340302": "龙子湖区",
    "340303": "蚌山区",
    "340304": "禹会区",
    "340311": "淮上区",
    "340321": "怀远县",
    "340322": "五河县",
    "340323": "固镇县"
  },
  "340400": {
    "340402": "大通区",
    "340403": "田家庵区",
    "340404": "谢家集区",
    "340405": "八公山区",
    "340406": "潘集区",
    "340421": "凤台县",
    "340422": "寿县"
  },
  "340500": {
    "340503": "花山区",
    "340504": "雨山区",
    "340506": "博望区",
    "340521": "当涂县",
    "340522": "含山县",
    "340523": "和县"
  },
  "340600": {
    "340602": "杜集区",
    "340603": "相山区",
    "340604": "烈山区",
    "340621": "濉溪县"
  },
  "340700": {
    "340705": "铜官区",
    "340706": "义安区",
    "340711": "郊区",
    "340722": "枞阳县"
  },
  "340800": {
    "340802": "迎江区",
    "340803": "大观区",
    "340811": "宜秀区",
    "340822": "怀宁县",
    "340824": "潜山县",
    "340825": "太湖县",
    "340826": "宿松县",
    "340827": "望江县",
    "340828": "岳西县",
    "340881": "桐城市"
  },
  "341000": {
    "341002": "屯溪区",
    "341003": "黄山区",
    "341004": "徽州区",
    "341021": "歙县",
    "341022": "休宁县",
    "341023": "黟县",
    "341024": "祁门县"
  },
  "341100": {
    "341102": "琅琊区",
    "341103": "南谯区",
    "341122": "来安县",
    "341124": "全椒县",
    "341125": "定远县",
    "341126": "凤阳县",
    "341181": "天长市",
    "341182": "明光市"
  },
  "341200": {
    "341202": "颍州区",
    "341203": "颍东区",
    "341204": "颍泉区",
    "341221": "临泉县",
    "341222": "太和县",
    "341225": "阜南县",
    "341226": "颍上县",
    "341282": "界首市"
  },
  "341300": {
    "341302": "埇桥区",
    "341321": "砀山县",
    "341322": "萧县",
    "341323": "灵璧县",
    "341324": "泗县"
  },
  "341500": {
    "341502": "金安区",
    "341503": "裕安区",
    "341504": "叶集区",
    "341522": "霍邱县",
    "341523": "舒城县",
    "341524": "金寨县",
    "341525": "霍山县"
  },
  "341600": {
    "341602": "谯城区",
    "341621": "涡阳县",
    "341622": "蒙城县",
    "341623": "利辛县"
  },
  "341700": {
    "341702": "贵池区",
    "341721": "东至县",
    "341722": "石台县",
    "341723": "青阳县"
  },
  "341800": {
    "341802": "宣州区",
    "341821": "郎溪县",
    "341822": "广德县",
    "341823": "泾县",
    "341824": "绩溪县",
    "341825": "旌德县",
    "341881": "宁国市"
  },
  "350000": {
    "350100": "福州市",
    "350200": "厦门市",
    "350300": "莆田市",
    "350400": "三明市",
    "350500": "泉州市",
    "350600": "漳州市",
    "350700": "南平市",
    "350800": "龙岩市",
    "350900": "宁德市"
  },
  "350100": {
    "350102": "鼓楼区",
    "350103": "台江区",
    "350104": "仓山区",
    "350105": "马尾区",
    "350111": "晋安区",
    "350121": "闽侯县",
    "350122": "连江县",
    "350123": "罗源县",
    "350124": "闽清县",
    "350125": "永泰县",
    "350128": "平潭县",
    "350181": "福清市",
    "350182": "长乐市"
  },
  "350200": {
    "350203": "思明区",
    "350205": "海沧区",
    "350206": "湖里区",
    "350211": "集美区",
    "350212": "同安区",
    "350213": "翔安区"
  },
  "350300": {
    "350302": "城厢区",
    "350303": "涵江区",
    "350304": "荔城区",
    "350305": "秀屿区",
    "350322": "仙游县"
  },
  "350400": {
    "350402": "梅列区",
    "350403": "三元区",
    "350421": "明溪县",
    "350423": "清流县",
    "350424": "宁化县",
    "350425": "大田县",
    "350426": "尤溪县",
    "350427": "沙县",
    "350428": "将乐县",
    "350429": "泰宁县",
    "350430": "建宁县",
    "350481": "永安市"
  },
  "350500": {
    "350502": "鲤城区",
    "350503": "丰泽区",
    "350504": "洛江区",
    "350505": "泉港区",
    "350521": "惠安县",
    "350524": "安溪县",
    "350525": "永春县",
    "350526": "德化县",
    "350527": "金门县",
    "350581": "石狮市",
    "350582": "晋江市",
    "350583": "南安市"
  },
  "350600": {
    "350602": "芗城区",
    "350603": "龙文区",
    "350622": "云霄县",
    "350623": "漳浦县",
    "350624": "诏安县",
    "350625": "长泰县",
    "350626": "东山县",
    "350627": "南靖县",
    "350628": "平和县",
    "350629": "华安县",
    "350681": "龙海市"
  },
  "350700": {
    "350702": "延平区",
    "350703": "建阳区",
    "350721": "顺昌县",
    "350722": "浦城县",
    "350723": "光泽县",
    "350724": "松溪县",
    "350725": "政和县",
    "350781": "邵武市",
    "350782": "武夷山市",
    "350783": "建瓯市"
  },
  "350800": {
    "350802": "新罗区",
    "350803": "永定区",
    "350821": "长汀县",
    "350823": "上杭县",
    "350824": "武平县",
    "350825": "连城县",
    "350881": "漳平市"
  },
  "350900": {
    "350902": "蕉城区",
    "350921": "霞浦县",
    "350922": "古田县",
    "350923": "屏南县",
    "350924": "寿宁县",
    "350925": "周宁县",
    "350926": "柘荣县",
    "350981": "福安市",
    "350982": "福鼎市"
  },
  "360000": {
    "360100": "南昌市",
    "360200": "景德镇市",
    "360300": "萍乡市",
    "360400": "九江市",
    "360500": "新余市",
    "360600": "鹰潭市",
    "360700": "赣州市",
    "360800": "吉安市",
    "360900": "宜春市",
    "361000": "抚州市",
    "361100": "上饶市"
  },
  "360100": {
    "360102": "东湖区",
    "360103": "西湖区",
    "360104": "青云谱区",
    "360105": "湾里区",
    "360111": "青山湖区",
    "360112": "新建区",
    "360121": "南昌县",
    "360123": "安义县",
    "360124": "进贤县"
  },
  "360200": {
    "360202": "昌江区",
    "360203": "珠山区",
    "360222": "浮梁县",
    "360281": "乐平市"
  },
  "360300": {
    "360302": "安源区",
    "360313": "湘东区",
    "360321": "莲花县",
    "360322": "上栗县",
    "360323": "芦溪县"
  },
  "360400": {
    "360402": "濂溪区",
    "360403": "浔阳区",
    "360421": "九江县",
    "360423": "武宁县",
    "360424": "修水县",
    "360425": "永修县",
    "360426": "德安县",
    "360428": "都昌县",
    "360429": "湖口县",
    "360430": "彭泽县",
    "360481": "瑞昌市",
    "360482": "共青城市",
    "360483": "庐山市"
  },
  "360500": {
    "360502": "渝水区",
    "360521": "分宜县"
  },
  "360600": {
    "360602": "月湖区",
    "360622": "余江县",
    "360681": "贵溪市"
  },
  "360700": {
    "360702": "章贡区",
    "360703": "南康区",
    "360721": "赣县",
    "360722": "信丰县",
    "360723": "大余县",
    "360724": "上犹县",
    "360725": "崇义县",
    "360726": "安远县",
    "360727": "龙南县",
    "360728": "定南县",
    "360729": "全南县",
    "360730": "宁都县",
    "360731": "于都县",
    "360732": "兴国县",
    "360733": "会昌县",
    "360734": "寻乌县",
    "360735": "石城县",
    "360781": "瑞金市"
  },
  "360800": {
    "360802": "吉州区",
    "360803": "青原区",
    "360821": "吉安县",
    "360822": "吉水县",
    "360823": "峡江县",
    "360824": "新干县",
    "360825": "永丰县",
    "360826": "泰和县",
    "360827": "遂川县",
    "360828": "万安县",
    "360829": "安福县",
    "360830": "永新县",
    "360881": "井冈山市"
  },
  "360900": {
    "360902": "袁州区",
    "360921": "奉新县",
    "360922": "万载县",
    "360923": "上高县",
    "360924": "宜丰县",
    "360925": "靖安县",
    "360926": "铜鼓县",
    "360981": "丰城市",
    "360982": "樟树市",
    "360983": "高安市"
  },
  "361000": {
    "361002": "临川区",
    "361021": "南城县",
    "361022": "黎川县",
    "361023": "南丰县",
    "361024": "崇仁县",
    "361025": "乐安县",
    "361026": "宜黄县",
    "361027": "金溪县",
    "361028": "资溪县",
    "361029": "东乡县",
    "361030": "广昌县"
  },
  "361100": {
    "361102": "信州区",
    "361103": "广丰区",
    "361121": "上饶县",
    "361123": "玉山县",
    "361124": "铅山县",
    "361125": "横峰县",
    "361126": "弋阳县",
    "361127": "余干县",
    "361128": "鄱阳县",
    "361129": "万年县",
    "361130": "婺源县",
    "361181": "德兴市"
  },
  "370000": {
    "370100": "济南市",
    "370200": "青岛市",
    "370300": "淄博市",
    "370400": "枣庄市",
    "370500": "东营市",
    "370600": "烟台市",
    "370700": "潍坊市",
    "370800": "济宁市",
    "370900": "泰安市",
    "371000": "威海市",
    "371100": "日照市",
    "371200": "莱芜市",
    "371300": "临沂市",
    "371400": "德州市",
    "371500": "聊城市",
    "371600": "滨州市",
    "371700": "菏泽市"
  },
  "370100": {
    "370102": "历下区",
    "370103": "市中区",
    "370104": "槐荫区",
    "370105": "天桥区",
    "370112": "历城区",
    "370113": "长清区",
    "370124": "平阴县",
    "370125": "济阳县",
    "370126": "商河县",
    "370181": "章丘市"
  },
  "370200": {
    "370202": "市南区",
    "370203": "市北区",
    "370211": "黄岛区",
    "370212": "崂山区",
    "370213": "李沧区",
    "370214": "城阳区",
    "370281": "胶州市",
    "370282": "即墨市",
    "370283": "平度市",
    "370285": "莱西市"
  },
  "370300": {
    "370302": "淄川区",
    "370303": "张店区",
    "370304": "博山区",
    "370305": "临淄区",
    "370306": "周村区",
    "370321": "桓台县",
    "370322": "高青县",
    "370323": "沂源县"
  },
  "370400": {
    "370402": "市中区",
    "370403": "薛城区",
    "370404": "峄城区",
    "370405": "台儿庄区",
    "370406": "山亭区",
    "370481": "滕州市"
  },
  "370500": {
    "370502": "东营区",
    "370503": "河口区",
    "370505": "垦利区",
    "370522": "利津县",
    "370523": "广饶县"
  },
  "370600": {
    "370602": "芝罘区",
    "370611": "福山区",
    "370612": "牟平区",
    "370613": "莱山区",
    "370634": "长岛县",
    "370681": "龙口市",
    "370682": "莱阳市",
    "370683": "莱州市",
    "370684": "蓬莱市",
    "370685": "招远市",
    "370686": "栖霞市",
    "370687": "海阳市"
  },
  "370700": {
    "370702": "潍城区",
    "370703": "寒亭区",
    "370704": "坊子区",
    "370705": "奎文区",
    "370724": "临朐县",
    "370725": "昌乐县",
    "370781": "青州市",
    "370782": "诸城市",
    "370783": "寿光市",
    "370784": "安丘市",
    "370785": "高密市",
    "370786": "昌邑市"
  },
  "370800": {
    "370811": "任城区",
    "370812": "兖州区",
    "370826": "微山县",
    "370827": "鱼台县",
    "370828": "金乡县",
    "370829": "嘉祥县",
    "370830": "汶上县",
    "370831": "泗水县",
    "370832": "梁山县",
    "370881": "曲阜市",
    "370883": "邹城市"
  },
  "370900": {
    "370902": "泰山区",
    "370911": "岱岳区",
    "370921": "宁阳县",
    "370923": "东平县",
    "370982": "新泰市",
    "370983": "肥城市"
  },
  "371000": {
    "371002": "环翠区",
    "371003": "文登区",
    "371082": "荣成市",
    "371083": "乳山市"
  },
  "371100": {
    "371102": "东港区",
    "371103": "岚山区",
    "371121": "五莲县",
    "371122": "莒县"
  },
  "371200": {
    "371202": "莱城区",
    "371203": "钢城区"
  },
  "371300": {
    "371302": "兰山区",
    "371311": "罗庄区",
    "371312": "河东区",
    "371321": "沂南县",
    "371322": "郯城县",
    "371323": "沂水县",
    "371324": "兰陵县",
    "371325": "费县",
    "371326": "平邑县",
    "371327": "莒南县",
    "371328": "蒙阴县",
    "371329": "临沭县"
  },
  "371400": {
    "371402": "德城区",
    "371403": "陵城区",
    "371422": "宁津县",
    "371423": "庆云县",
    "371424": "临邑县",
    "371425": "齐河县",
    "371426": "平原县",
    "371427": "夏津县",
    "371428": "武城县",
    "371481": "乐陵市",
    "371482": "禹城市"
  },
  "371500": {
    "371502": "东昌府区",
    "371521": "阳谷县",
    "371522": "莘县",
    "371523": "茌平县",
    "371524": "东阿县",
    "371525": "冠县",
    "371526": "高唐县",
    "371581": "临清市"
  },
  "371600": {
    "371602": "滨城区",
    "371603": "沾化区",
    "371621": "惠民县",
    "371622": "阳信县",
    "371623": "无棣县",
    "371625": "博兴县",
    "371626": "邹平县"
  },
  "371700": {
    "371702": "牡丹区",
    "371703": "定陶区",
    "371721": "曹县",
    "371722": "单县",
    "371723": "成武县",
    "371724": "巨野县",
    "371725": "郓城县",
    "371726": "鄄城县",
    "371728": "东明县"
  },
  "410000": {
    "410100": "郑州市",
    "410200": "开封市",
    "410300": "洛阳市",
    "410400": "平顶山市",
    "410500": "安阳市",
    "410600": "鹤壁市",
    "410700": "新乡市",
    "410800": "焦作市",
    "410900": "濮阳市",
    "411000": "许昌市",
    "411100": "漯河市",
    "411200": "三门峡市",
    "411300": "南阳市",
    "411400": "商丘市",
    "411500": "信阳市",
    "411600": "周口市",
    "411700": "驻马店市",
    "419001": "济源市"
  },
  "410100": {
    "410102": "中原区",
    "410103": "二七区",
    "410104": "管城回族区",
    "410105": "金水区",
    "410106": "上街区",
    "410108": "惠济区",
    "410122": "中牟县",
    "410181": "巩义市",
    "410182": "荥阳市",
    "410183": "新密市",
    "410184": "新郑市",
    "410185": "登封市"
  },
  "410200": {
    "410202": "龙亭区",
    "410203": "顺河回族区",
    "410204": "鼓楼区",
    "410205": "禹王台区",
    "410211": "金明区",
    "410212": "祥符区",
    "410221": "杞县",
    "410222": "通许县",
    "410223": "尉氏县",
    "410225": "兰考县"
  },
  "410300": {
    "410302": "老城区",
    "410303": "西工区",
    "410304": "瀍河回族区",
    "410305": "涧西区",
    "410306": "吉利区",
    "410311": "洛龙区",
    "410322": "孟津县",
    "410323": "新安县",
    "410324": "栾川县",
    "410325": "嵩县",
    "410326": "汝阳县",
    "410327": "宜阳县",
    "410328": "洛宁县",
    "410329": "伊川县",
    "410381": "偃师市"
  },
  "410400": {
    "410402": "新华区",
    "410403": "卫东区",
    "410404": "石龙区",
    "410411": "湛河区",
    "410421": "宝丰县",
    "410422": "叶县",
    "410423": "鲁山县",
    "410425": "郏县",
    "410481": "舞钢市",
    "410482": "汝州市"
  },
  "410500": {
    "410502": "文峰区",
    "410503": "北关区",
    "410505": "殷都区",
    "410506": "龙安区",
    "410522": "安阳县",
    "410523": "汤阴县",
    "410526": "滑县",
    "410527": "内黄县",
    "410581": "林州市"
  },
  "410600": {
    "410602": "鹤山区",
    "410603": "山城区",
    "410611": "淇滨区",
    "410621": "浚县",
    "410622": "淇县"
  },
  "410700": {
    "410702": "红旗区",
    "410703": "卫滨区",
    "410704": "凤泉区",
    "410711": "牧野区",
    "410721": "新乡县",
    "410724": "获嘉县",
    "410725": "原阳县",
    "410726": "延津县",
    "410727": "封丘县",
    "410728": "长垣县",
    "410781": "卫辉市",
    "410782": "辉县市"
  },
  "410800": {
    "410802": "解放区",
    "410803": "中站区",
    "410804": "马村区",
    "410811": "山阳区",
    "410821": "修武县",
    "410822": "博爱县",
    "410823": "武陟县",
    "410825": "温县",
    "410882": "沁阳市",
    "410883": "孟州市"
  },
  "410900": {
    "410902": "华龙区",
    "410922": "清丰县",
    "410923": "南乐县",
    "410926": "范县",
    "410927": "台前县",
    "410928": "濮阳县"
  },
  "411000": {
    "411002": "魏都区",
    "411023": "许昌县",
    "411024": "鄢陵县",
    "411025": "襄城县",
    "411081": "禹州市",
    "411082": "长葛市"
  },
  "411100": {
    "411102": "源汇区",
    "411103": "郾城区",
    "411104": "召陵区",
    "411121": "舞阳县",
    "411122": "临颍县"
  },
  "411200": {
    "411202": "湖滨区",
    "411203": "陕州区",
    "411221": "渑池县",
    "411224": "卢氏县",
    "411281": "义马市",
    "411282": "灵宝市"
  },
  "411300": {
    "411302": "宛城区",
    "411303": "卧龙区",
    "411321": "南召县",
    "411322": "方城县",
    "411323": "西峡县",
    "411324": "镇平县",
    "411325": "内乡县",
    "411326": "淅川县",
    "411327": "社旗县",
    "411328": "唐河县",
    "411329": "新野县",
    "411330": "桐柏县",
    "411381": "邓州市"
  },
  "411400": {
    "411402": "梁园区",
    "411403": "睢阳区",
    "411421": "民权县",
    "411422": "睢县",
    "411423": "宁陵县",
    "411424": "柘城县",
    "411425": "虞城县",
    "411426": "夏邑县",
    "411481": "永城市"
  },
  "411500": {
    "411502": "浉河区",
    "411503": "平桥区",
    "411521": "罗山县",
    "411522": "光山县",
    "411523": "新县",
    "411524": "商城县",
    "411525": "固始县",
    "411526": "潢川县",
    "411527": "淮滨县",
    "411528": "息县"
  },
  "411600": {
    "411602": "川汇区",
    "411621": "扶沟县",
    "411622": "西华县",
    "411623": "商水县",
    "411624": "沈丘县",
    "411625": "郸城县",
    "411626": "淮阳县",
    "411627": "太康县",
    "411628": "鹿邑县",
    "411681": "项城市"
  },
  "411700": {
    "411702": "驿城区",
    "411721": "西平县",
    "411722": "上蔡县",
    "411723": "平舆县",
    "411724": "正阳县",
    "411725": "确山县",
    "411726": "泌阳县",
    "411727": "汝南县",
    "411728": "遂平县",
    "411729": "新蔡县"
  },
  "420000": {
    "420100": "武汉市",
    "420200": "黄石市",
    "420300": "十堰市",
    "420500": "宜昌市",
    "420600": "襄阳市",
    "420700": "鄂州市",
    "420800": "荆门市",
    "420900": "孝感市",
    "421000": "荆州市",
    "421100": "黄冈市",
    "421200": "咸宁市",
    "421300": "随州市",
    "422800": "恩施土家族苗族自治州",
    "429004": "仙桃市",
    "429005": "潜江市",
    "429006": "天门市",
    "429021": "神农架林区"
  },
  "420100": {
    "420102": "江岸区",
    "420103": "江汉区",
    "420104": "硚口区",
    "420105": "汉阳区",
    "420106": "武昌区",
    "420107": "青山区",
    "420111": "洪山区",
    "420112": "东西湖区",
    "420113": "汉南区",
    "420114": "蔡甸区",
    "420115": "江夏区",
    "420116": "黄陂区",
    "420117": "新洲区"
  },
  "420200": {
    "420202": "黄石港区",
    "420203": "西塞山区",
    "420204": "下陆区",
    "420205": "铁山区",
    "420222": "阳新县",
    "420281": "大冶市"
  },
  "420300": {
    "420302": "茅箭区",
    "420303": "张湾区",
    "420304": "郧阳区",
    "420322": "郧西县",
    "420323": "竹山县",
    "420324": "竹溪县",
    "420325": "房县",
    "420381": "丹江口市"
  },
  "420500": {
    "420502": "西陵区",
    "420503": "伍家岗区",
    "420504": "点军区",
    "420505": "猇亭区",
    "420506": "夷陵区",
    "420525": "远安县",
    "420526": "兴山县",
    "420527": "秭归县",
    "420528": "长阳土家族自治县",
    "420529": "五峰土家族自治县",
    "420581": "宜都市",
    "420582": "当阳市",
    "420583": "枝江市"
  },
  "420600": {
    "420602": "襄城区",
    "420606": "樊城区",
    "420607": "襄州区",
    "420624": "南漳县",
    "420625": "谷城县",
    "420626": "保康县",
    "420682": "老河口市",
    "420683": "枣阳市",
    "420684": "宜城市"
  },
  "420700": {
    "420702": "梁子湖区",
    "420703": "华容区",
    "420704": "鄂城区"
  },
  "420800": {
    "420802": "东宝区",
    "420804": "掇刀区",
    "420821": "京山县",
    "420822": "沙洋县",
    "420881": "钟祥市"
  },
  "420900": {
    "420902": "孝南区",
    "420921": "孝昌县",
    "420922": "大悟县",
    "420923": "云梦县",
    "420981": "应城市",
    "420982": "安陆市",
    "420984": "汉川市"
  },
  "421000": {
    "421002": "沙市区",
    "421003": "荆州区",
    "421022": "公安县",
    "421023": "监利县",
    "421024": "江陵县",
    "421081": "石首市",
    "421083": "洪湖市",
    "421087": "松滋市"
  },
  "421100": {
    "421102": "黄州区",
    "421121": "团风县",
    "421122": "红安县",
    "421123": "罗田县",
    "421124": "英山县",
    "421125": "浠水县",
    "421126": "蕲春县",
    "421127": "黄梅县",
    "421181": "麻城市",
    "421182": "武穴市"
  },
  "421200": {
    "421202": "咸安区",
    "421221": "嘉鱼县",
    "421222": "通城县",
    "421223": "崇阳县",
    "421224": "通山县",
    "421281": "赤壁市"
  },
  "421300": {
    "421303": "曾都区",
    "421321": "随县",
    "421381": "广水市"
  },
  "422800": {
    "422801": "恩施市",
    "422802": "利川市",
    "422822": "建始县",
    "422823": "巴东县",
    "422825": "宣恩县",
    "422826": "咸丰县",
    "422827": "来凤县",
    "422828": "鹤峰县"
  },
  "430000": {
    "430100": "长沙市",
    "430200": "株洲市",
    "430300": "湘潭市",
    "430400": "衡阳市",
    "430500": "邵阳市",
    "430600": "岳阳市",
    "430700": "常德市",
    "430800": "张家界市",
    "430900": "益阳市",
    "431000": "郴州市",
    "431100": "永州市",
    "431200": "怀化市",
    "431300": "娄底市",
    "433100": "湘西土家族苗族自治州"
  },
  "430100": {
    "430102": "芙蓉区",
    "430103": "天心区",
    "430104": "岳麓区",
    "430105": "开福区",
    "430111": "雨花区",
    "430112": "望城区",
    "430121": "长沙县",
    "430124": "宁乡县",
    "430181": "浏阳市"
  },
  "430200": {
    "430202": "荷塘区",
    "430203": "芦淞区",
    "430204": "石峰区",
    "430211": "天元区",
    "430221": "株洲县",
    "430223": "攸县",
    "430224": "茶陵县",
    "430225": "炎陵县",
    "430281": "醴陵市"
  },
  "430300": {
    "430302": "雨湖区",
    "430304": "岳塘区",
    "430321": "湘潭县",
    "430381": "湘乡市",
    "430382": "韶山市"
  },
  "430400": {
    "430405": "珠晖区",
    "430406": "雁峰区",
    "430407": "石鼓区",
    "430408": "蒸湘区",
    "430412": "南岳区",
    "430421": "衡阳县",
    "430422": "衡南县",
    "430423": "衡山县",
    "430424": "衡东县",
    "430426": "祁东县",
    "430481": "耒阳市",
    "430482": "常宁市"
  },
  "430500": {
    "430502": "双清区",
    "430503": "大祥区",
    "430511": "北塔区",
    "430521": "邵东县",
    "430522": "新邵县",
    "430523": "邵阳县",
    "430524": "隆回县",
    "430525": "洞口县",
    "430527": "绥宁县",
    "430528": "新宁县",
    "430529": "城步苗族自治县",
    "430581": "武冈市"
  },
  "430600": {
    "430602": "岳阳楼区",
    "430603": "云溪区",
    "430611": "君山区",
    "430621": "岳阳县",
    "430623": "华容县",
    "430624": "湘阴县",
    "430626": "平江县",
    "430681": "汨罗市",
    "430682": "临湘市"
  },
  "430700": {
    "430702": "武陵区",
    "430703": "鼎城区",
    "430721": "安乡县",
    "430722": "汉寿县",
    "430723": "澧县",
    "430724": "临澧县",
    "430725": "桃源县",
    "430726": "石门县",
    "430781": "津市市"
  },
  "430800": {
    "430802": "永定区",
    "430811": "武陵源区",
    "430821": "慈利县",
    "430822": "桑植县"
  },
  "430900": {
    "430902": "资阳区",
    "430903": "赫山区",
    "430921": "南县",
    "430922": "桃江县",
    "430923": "安化县",
    "430981": "沅江市"
  },
  "431000": {
    "431002": "北湖区",
    "431003": "苏仙区",
    "431021": "桂阳县",
    "431022": "宜章县",
    "431023": "永兴县",
    "431024": "嘉禾县",
    "431025": "临武县",
    "431026": "汝城县",
    "431027": "桂东县",
    "431028": "安仁县",
    "431081": "资兴市"
  },
  "431100": {
    "431102": "零陵区",
    "431103": "冷水滩区",
    "431121": "祁阳县",
    "431122": "东安县",
    "431123": "双牌县",
    "431124": "道县",
    "431125": "江永县",
    "431126": "宁远县",
    "431127": "蓝山县",
    "431128": "新田县",
    "431129": "江华瑶族自治县"
  },
  "431200": {
    "431202": "鹤城区",
    "431221": "中方县",
    "431222": "沅陵县",
    "431223": "辰溪县",
    "431224": "溆浦县",
    "431225": "会同县",
    "431226": "麻阳苗族自治县",
    "431227": "新晃侗族自治县",
    "431228": "芷江侗族自治县",
    "431229": "靖州苗族侗族自治县",
    "431230": "通道侗族自治县",
    "431281": "洪江市"
  },
  "431300": {
    "431302": "娄星区",
    "431321": "双峰县",
    "431322": "新化县",
    "431381": "冷水江市",
    "431382": "涟源市"
  },
  "433100": {
    "433101": "吉首市",
    "433122": "泸溪县",
    "433123": "凤凰县",
    "433124": "花垣县",
    "433125": "保靖县",
    "433126": "古丈县",
    "433127": "永顺县",
    "433130": "龙山县"
  },
  "440000": {
    "440100": "广州市",
    "440200": "韶关市",
    "440300": "深圳市",
    "440400": "珠海市",
    "440500": "汕头市",
    "440600": "佛山市",
    "440700": "江门市",
    "440800": "湛江市",
    "440900": "茂名市",
    "441200": "肇庆市",
    "441300": "惠州市",
    "441400": "梅州市",
    "441500": "汕尾市",
    "441600": "河源市",
    "441700": "阳江市",
    "441800": "清远市",
    "441900": "东莞市",
    "442000": "中山市",
    "445100": "潮州市",
    "445200": "揭阳市",
    "445300": "云浮市"
  },
  "440100": {
    "440103": "荔湾区",
    "440104": "越秀区",
    "440105": "海珠区",
    "440106": "天河区",
    "440111": "白云区",
    "440112": "黄埔区",
    "440113": "番禺区",
    "440114": "花都区",
    "440115": "南沙区",
    "440117": "从化区",
    "440118": "增城区"
  },
  "440200": {
    "440203": "武江区",
    "440204": "浈江区",
    "440205": "曲江区",
    "440222": "始兴县",
    "440224": "仁化县",
    "440229": "翁源县",
    "440232": "乳源瑶族自治县",
    "440233": "新丰县",
    "440281": "乐昌市",
    "440282": "南雄市"
  },
  "440300": {
    "440303": "罗湖区",
    "440304": "福田区",
    "440305": "南山区",
    "440306": "宝安区",
    "440307": "龙岗区",
    "440308": "盐田区"
  },
  "440400": {
    "440402": "香洲区",
    "440403": "斗门区",
    "440404": "金湾区"
  },
  "440500": {
    "440507": "龙湖区",
    "440511": "金平区",
    "440512": "濠江区",
    "440513": "潮阳区",
    "440514": "潮南区",
    "440515": "澄海区",
    "440523": "南澳县"
  },
  "440600": {
    "440604": "禅城区",
    "440605": "南海区",
    "440606": "顺德区",
    "440607": "三水区",
    "440608": "高明区"
  },
  "440700": {
    "440703": "蓬江区",
    "440704": "江海区",
    "440705": "新会区",
    "440781": "台山市",
    "440783": "开平市",
    "440784": "鹤山市",
    "440785": "恩平市"
  },
  "440800": {
    "440802": "赤坎区",
    "440803": "霞山区",
    "440804": "坡头区",
    "440811": "麻章区",
    "440823": "遂溪县",
    "440825": "徐闻县",
    "440881": "廉江市",
    "440882": "雷州市",
    "440883": "吴川市"
  },
  "440900": {
    "440902": "茂南区",
    "440904": "电白区",
    "440981": "高州市",
    "440982": "化州市",
    "440983": "信宜市"
  },
  "441200": {
    "441202": "端州区",
    "441203": "鼎湖区",
    "441204": "高要区",
    "441223": "广宁县",
    "441224": "怀集县",
    "441225": "封开县",
    "441226": "德庆县",
    "441284": "四会市"
  },
  "441300": {
    "441302": "惠城区",
    "441303": "惠阳区",
    "441322": "博罗县",
    "441323": "惠东县",
    "441324": "龙门县"
  },
  "441400": {
    "441402": "梅江区",
    "441403": "梅县区",
    "441422": "大埔县",
    "441423": "丰顺县",
    "441424": "五华县",
    "441426": "平远县",
    "441427": "蕉岭县",
    "441481": "兴宁市"
  },
  "441500": {
    "441502": "城区",
    "441521": "海丰县",
    "441523": "陆河县",
    "441581": "陆丰市"
  },
  "441600": {
    "441602": "源城区",
    "441621": "紫金县",
    "441622": "龙川县",
    "441623": "连平县",
    "441624": "和平县",
    "441625": "东源县"
  },
  "441700": {
    "441702": "江城区",
    "441704": "阳东区",
    "441721": "阳西县",
    "441781": "阳春市"
  },
  "441800": {
    "441802": "清城区",
    "441803": "清新区",
    "441821": "佛冈县",
    "441823": "阳山县",
    "441825": "连山壮族瑶族自治县",
    "441826": "连南瑶族自治县",
    "441881": "英德市",
    "441882": "连州市"
  },
  "445100": {
    "445102": "湘桥区",
    "445103": "潮安区",
    "445122": "饶平县"
  },
  "445200": {
    "445202": "榕城区",
    "445203": "揭东区",
    "445222": "揭西县",
    "445224": "惠来县",
    "445281": "普宁市"
  },
  "445300": {
    "445302": "云城区",
    "445303": "云安区",
    "445321": "新兴县",
    "445322": "郁南县",
    "445381": "罗定市"
  },
  "450000": {
    "450100": "南宁市",
    "450200": "柳州市",
    "450300": "桂林市",
    "450400": "梧州市",
    "450500": "北海市",
    "450600": "防城港市",
    "450700": "钦州市",
    "450800": "贵港市",
    "450900": "玉林市",
    "451000": "百色市",
    "451100": "贺州市",
    "451200": "河池市",
    "451300": "来宾市",
    "451400": "崇左市"
  },
  "450100": {
    "450102": "兴宁区",
    "450103": "青秀区",
    "450105": "江南区",
    "450107": "西乡塘区",
    "450108": "良庆区",
    "450109": "邕宁区",
    "450110": "武鸣区",
    "450123": "隆安县",
    "450124": "马山县",
    "450125": "上林县",
    "450126": "宾阳县",
    "450127": "横县"
  },
  "450200": {
    "450202": "城中区",
    "450203": "鱼峰区",
    "450204": "柳南区",
    "450205": "柳北区",
    "450206": "柳江区",
    "450222": "柳城县",
    "450223": "鹿寨县",
    "450224": "融安县",
    "450225": "融水苗族自治县",
    "450226": "三江侗族自治县"
  },
  "450300": {
    "450302": "秀峰区",
    "450303": "叠彩区",
    "450304": "象山区",
    "450305": "七星区",
    "450311": "雁山区",
    "450312": "临桂区",
    "450321": "阳朔县",
    "450323": "灵川县",
    "450324": "全州县",
    "450325": "兴安县",
    "450326": "永福县",
    "450327": "灌阳县",
    "450328": "龙胜各族自治县",
    "450329": "资源县",
    "450330": "平乐县",
    "450331": "荔浦县",
    "450332": "恭城瑶族自治县"
  },
  "450400": {
    "450403": "万秀区",
    "450405": "长洲区",
    "450406": "龙圩区",
    "450421": "苍梧县",
    "450422": "藤县",
    "450423": "蒙山县",
    "450481": "岑溪市"
  },
  "450500": {
    "450502": "海城区",
    "450503": "银海区",
    "450512": "铁山港区",
    "450521": "合浦县"
  },
  "450600": {
    "450602": "港口区",
    "450603": "防城区",
    "450621": "上思县",
    "450681": "东兴市"
  },
  "450700": {
    "450702": "钦南区",
    "450703": "钦北区",
    "450721": "灵山县",
    "450722": "浦北县"
  },
  "450800": {
    "450802": "港北区",
    "450803": "港南区",
    "450804": "覃塘区",
    "450821": "平南县",
    "450881": "桂平市"
  },
  "450900": {
    "450902": "玉州区",
    "450903": "福绵区",
    "450921": "容县",
    "450922": "陆川县",
    "450923": "博白县",
    "450924": "兴业县",
    "450981": "北流市"
  },
  "451000": {
    "451002": "右江区",
    "451021": "田阳县",
    "451022": "田东县",
    "451023": "平果县",
    "451024": "德保县",
    "451026": "那坡县",
    "451027": "凌云县",
    "451028": "乐业县",
    "451029": "田林县",
    "451030": "西林县",
    "451031": "隆林各族自治县",
    "451081": "靖西市"
  },
  "451100": {
    "451102": "八步区",
    "451103": "平桂区",
    "451121": "昭平县",
    "451122": "钟山县",
    "451123": "富川瑶族自治县"
  },
  "451200": {
    "451202": "金城江区",
    "451221": "南丹县",
    "451222": "天峨县",
    "451223": "凤山县",
    "451224": "东兰县",
    "451225": "罗城仫佬族自治县",
    "451226": "环江毛南族自治县",
    "451227": "巴马瑶族自治县",
    "451228": "都安瑶族自治县",
    "451229": "大化瑶族自治县",
    "451281": "宜州市"
  },
  "451300": {
    "451302": "兴宾区",
    "451321": "忻城县",
    "451322": "象州县",
    "451323": "武宣县",
    "451324": "金秀瑶族自治县",
    "451381": "合山市"
  },
  "451400": {
    "451402": "江州区",
    "451421": "扶绥县",
    "451422": "宁明县",
    "451423": "龙州县",
    "451424": "大新县",
    "451425": "天等县",
    "451481": "凭祥市"
  },
  "460000": {
    "460100": "海口市",
    "460200": "三亚市",
    "460300": "三沙市",
    "460400": "儋州市",
    "469001": "五指山市",
    "469002": "琼海市",
    "469005": "文昌市",
    "469006": "万宁市",
    "469007": "东方市",
    "469021": "定安县",
    "469022": "屯昌县",
    "469023": "澄迈县",
    "469024": "临高县",
    "469025": "白沙黎族自治县",
    "469026": "昌江黎族自治县",
    "469027": "乐东黎族自治县",
    "469028": "陵水黎族自治县",
    "469029": "保亭黎族苗族自治县",
    "469030": "琼中黎族苗族自治县"
  },
  "460100": {
    "460105": "秀英区",
    "460106": "龙华区",
    "460107": "琼山区",
    "460108": "美兰区"
  },
  "460200": {
    "460202": "海棠区",
    "460203": "吉阳区",
    "460204": "天涯区",
    "460205": "崖州区"
  },
  "500000": {
    "500100": "市辖区",
    "500200": "县"
  },
  "500100": {
    "500101": "万州区",
    "500102": "涪陵区",
    "500103": "渝中区",
    "500104": "大渡口区",
    "500105": "江北区",
    "500106": "沙坪坝区",
    "500107": "九龙坡区",
    "500108": "南岸区",
    "500109": "北碚区",
    "500110": "綦江区",
    "500111": "大足区",
    "500112": "渝北区",
    "500113": "巴南区",
    "500114": "黔江区",
    "500115": "长寿区",
    "500116": "江津区",
    "500117": "合川区",
    "500118": "永川区",
    "500119": "南川区",
    "500120": "璧山区",
    "500151": "铜梁区",
    "500152": "潼南区",
    "500153": "荣昌区",
    "500154": "开州区"
  },
  "500200": {
    "500228": "梁平县",
    "500229": "城口县",
    "500230": "丰都县",
    "500231": "垫江县",
    "500232": "武隆县",
    "500233": "忠县",
    "500235": "云阳县",
    "500236": "奉节县",
    "500237": "巫山县",
    "500238": "巫溪县",
    "500240": "石柱土家族自治县",
    "500241": "秀山土家族苗族自治县",
    "500242": "酉阳土家族苗族自治县",
    "500243": "彭水苗族土家族自治县"
  },
  "510000": {
    "510100": "成都市",
    "510300": "自贡市",
    "510400": "攀枝花市",
    "510500": "泸州市",
    "510600": "德阳市",
    "510700": "绵阳市",
    "510800": "广元市",
    "510900": "遂宁市",
    "511000": "内江市",
    "511100": "乐山市",
    "511300": "南充市",
    "511400": "眉山市",
    "511500": "宜宾市",
    "511600": "广安市",
    "511700": "达州市",
    "511800": "雅安市",
    "511900": "巴中市",
    "512000": "资阳市",
    "513200": "阿坝藏族羌族自治州",
    "513300": "甘孜藏族自治州",
    "513400": "凉山彝族自治州"
  },
  "510100": {
    "510104": "锦江区",
    "510105": "青羊区",
    "510106": "金牛区",
    "510107": "武侯区",
    "510108": "成华区",
    "510112": "龙泉驿区",
    "510113": "青白江区",
    "510114": "新都区",
    "510115": "温江区",
    "510116": "双流区",
    "510121": "金堂县",
    "510124": "郫县",
    "510129": "大邑县",
    "510131": "蒲江县",
    "510132": "新津县",
    "510181": "都江堰市",
    "510182": "彭州市",
    "510183": "邛崃市",
    "510184": "崇州市",
    "510185": "简阳市"
  },
  "510300": {
    "510302": "自流井区",
    "510303": "贡井区",
    "510304": "大安区",
    "510311": "沿滩区",
    "510321": "荣县",
    "510322": "富顺县"
  },
  "510400": {
    "510402": "东区",
    "510403": "西区",
    "510411": "仁和区",
    "510421": "米易县",
    "510422": "盐边县"
  },
  "510500": {
    "510502": "江阳区",
    "510503": "纳溪区",
    "510504": "龙马潭区",
    "510521": "泸县",
    "510522": "合江县",
    "510524": "叙永县",
    "510525": "古蔺县"
  },
  "510600": {
    "510603": "旌阳区",
    "510623": "中江县",
    "510626": "罗江县",
    "510681": "广汉市",
    "510682": "什邡市",
    "510683": "绵竹市"
  },
  "510700": {
    "510703": "涪城区",
    "510704": "游仙区",
    "510705": "安州区",
    "510722": "三台县",
    "510723": "盐亭县",
    "510725": "梓潼县",
    "510726": "北川羌族自治县",
    "510727": "平武县",
    "510781": "江油市"
  },
  "510800": {
    "510802": "利州区",
    "510811": "昭化区",
    "510812": "朝天区",
    "510821": "旺苍县",
    "510822": "青川县",
    "510823": "剑阁县",
    "510824": "苍溪县"
  },
  "510900": {
    "510903": "船山区",
    "510904": "安居区",
    "510921": "蓬溪县",
    "510922": "射洪县",
    "510923": "大英县"
  },
  "511000": {
    "511002": "市中区",
    "511011": "东兴区",
    "511024": "威远县",
    "511025": "资中县",
    "511028": "隆昌县"
  },
  "511100": {
    "511102": "市中区",
    "511111": "沙湾区",
    "511112": "五通桥区",
    "511113": "金口河区",
    "511123": "犍为县",
    "511124": "井研县",
    "511126": "夹江县",
    "511129": "沐川县",
    "511132": "峨边彝族自治县",
    "511133": "马边彝族自治县",
    "511181": "峨眉山市"
  },
  "511300": {
    "511302": "顺庆区",
    "511303": "高坪区",
    "511304": "嘉陵区",
    "511321": "南部县",
    "511322": "营山县",
    "511323": "蓬安县",
    "511324": "仪陇县",
    "511325": "西充县",
    "511381": "阆中市"
  },
  "511400": {
    "511402": "东坡区",
    "511403": "彭山区",
    "511421": "仁寿县",
    "511423": "洪雅县",
    "511424": "丹棱县",
    "511425": "青神县"
  },
  "511500": {
    "511502": "翠屏区",
    "511503": "南溪区",
    "511521": "宜宾县",
    "511523": "江安县",
    "511524": "长宁县",
    "511525": "高县",
    "511526": "珙县",
    "511527": "筠连县",
    "511528": "兴文县",
    "511529": "屏山县"
  },
  "511600": {
    "511602": "广安区",
    "511603": "前锋区",
    "511621": "岳池县",
    "511622": "武胜县",
    "511623": "邻水县",
    "511681": "华蓥市"
  },
  "511700": {
    "511702": "通川区",
    "511703": "达川区",
    "511722": "宣汉县",
    "511723": "开江县",
    "511724": "大竹县",
    "511725": "渠县",
    "511781": "万源市"
  },
  "511800": {
    "511802": "雨城区",
    "511803": "名山区",
    "511822": "荥经县",
    "511823": "汉源县",
    "511824": "石棉县",
    "511825": "天全县",
    "511826": "芦山县",
    "511827": "宝兴县"
  },
  "511900": {
    "511902": "巴州区",
    "511903": "恩阳区",
    "511921": "通江县",
    "511922": "南江县",
    "511923": "平昌县"
  },
  "512000": {
    "512002": "雁江区",
    "512021": "安岳县",
    "512022": "乐至县"
  },
  "513200": {
    "513201": "马尔康市",
    "513221": "汶川县",
    "513222": "理县",
    "513223": "茂县",
    "513224": "松潘县",
    "513225": "九寨沟县",
    "513226": "金川县",
    "513227": "小金县",
    "513228": "黑水县",
    "513230": "壤塘县",
    "513231": "阿坝县",
    "513232": "若尔盖县",
    "513233": "红原县"
  },
  "513300": {
    "513301": "康定市",
    "513322": "泸定县",
    "513323": "丹巴县",
    "513324": "九龙县",
    "513325": "雅江县",
    "513326": "道孚县",
    "513327": "炉霍县",
    "513328": "甘孜县",
    "513329": "新龙县",
    "513330": "德格县",
    "513331": "白玉县",
    "513332": "石渠县",
    "513333": "色达县",
    "513334": "理塘县",
    "513335": "巴塘县",
    "513336": "乡城县",
    "513337": "稻城县",
    "513338": "得荣县"
  },
  "513400": {
    "513401": "西昌市",
    "513422": "木里藏族自治县",
    "513423": "盐源县",
    "513424": "德昌县",
    "513425": "会理县",
    "513426": "会东县",
    "513427": "宁南县",
    "513428": "普格县",
    "513429": "布拖县",
    "513430": "金阳县",
    "513431": "昭觉县",
    "513432": "喜德县",
    "513433": "冕宁县",
    "513434": "越西县",
    "513435": "甘洛县",
    "513436": "美姑县",
    "513437": "雷波县"
  },
  "520000": {
    "520100": "贵阳市",
    "520200": "六盘水市",
    "520300": "遵义市",
    "520400": "安顺市",
    "520500": "毕节市",
    "520600": "铜仁市",
    "522300": "黔西南布依族苗族自治州",
    "522600": "黔东南苗族侗族自治州",
    "522700": "黔南布依族苗族自治州"
  },
  "520100": {
    "520102": "南明区",
    "520103": "云岩区",
    "520111": "花溪区",
    "520112": "乌当区",
    "520113": "白云区",
    "520115": "观山湖区",
    "520121": "开阳县",
    "520122": "息烽县",
    "520123": "修文县",
    "520181": "清镇市"
  },
  "520200": {
    "520201": "钟山区",
    "520203": "六枝特区",
    "520221": "水城县",
    "520222": "盘县"
  },
  "520300": {
    "520302": "红花岗区",
    "520303": "汇川区",
    "520304": "播州区",
    "520322": "桐梓县",
    "520323": "绥阳县",
    "520324": "正安县",
    "520325": "道真仡佬族苗族自治县",
    "520326": "务川仡佬族苗族自治县",
    "520327": "凤冈县",
    "520328": "湄潭县",
    "520329": "余庆县",
    "520330": "习水县",
    "520381": "赤水市",
    "520382": "仁怀市"
  },
  "520400": {
    "520402": "西秀区",
    "520403": "平坝区",
    "520422": "普定县",
    "520423": "镇宁布依族苗族自治县",
    "520424": "关岭布依族苗族自治县",
    "520425": "紫云苗族布依族自治县"
  },
  "520500": {
    "520502": "七星关区",
    "520521": "大方县",
    "520522": "黔西县",
    "520523": "金沙县",
    "520524": "织金县",
    "520525": "纳雍县",
    "520526": "威宁彝族回族苗族自治县",
    "520527": "赫章县"
  },
  "520600": {
    "520602": "碧江区",
    "520603": "万山区",
    "520621": "江口县",
    "520622": "玉屏侗族自治县",
    "520623": "石阡县",
    "520624": "思南县",
    "520625": "印江土家族苗族自治县",
    "520626": "德江县",
    "520627": "沿河土家族自治县",
    "520628": "松桃苗族自治县"
  },
  "522300": {
    "522301": "兴义市",
    "522322": "兴仁县",
    "522323": "普安县",
    "522324": "晴隆县",
    "522325": "贞丰县",
    "522326": "望谟县",
    "522327": "册亨县",
    "522328": "安龙县"
  },
  "522600": {
    "522601": "凯里市",
    "522622": "黄平县",
    "522623": "施秉县",
    "522624": "三穗县",
    "522625": "镇远县",
    "522626": "岑巩县",
    "522627": "天柱县",
    "522628": "锦屏县",
    "522629": "剑河县",
    "522630": "台江县",
    "522631": "黎平县",
    "522632": "榕江县",
    "522633": "从江县",
    "522634": "雷山县",
    "522635": "麻江县",
    "522636": "丹寨县"
  },
  "522700": {
    "522701": "都匀市",
    "522702": "福泉市",
    "522722": "荔波县",
    "522723": "贵定县",
    "522725": "瓮安县",
    "522726": "独山县",
    "522727": "平塘县",
    "522728": "罗甸县",
    "522729": "长顺县",
    "522730": "龙里县",
    "522731": "惠水县",
    "522732": "三都水族自治县"
  },
  "530000": {
    "530100": "昆明市",
    "530300": "曲靖市",
    "530400": "玉溪市",
    "530500": "保山市",
    "530600": "昭通市",
    "530700": "丽江市",
    "530800": "普洱市",
    "530900": "临沧市",
    "532300": "楚雄彝族自治州",
    "532500": "红河哈尼族彝族自治州",
    "532600": "文山壮族苗族自治州",
    "532800": "西双版纳傣族自治州",
    "532900": "大理白族自治州",
    "533100": "德宏傣族景颇族自治州",
    "533300": "怒江傈僳族自治州",
    "533400": "迪庆藏族自治州"
  },
  "530100": {
    "530102": "五华区",
    "530103": "盘龙区",
    "530111": "官渡区",
    "530112": "西山区",
    "530113": "东川区",
    "530114": "呈贡区",
    "530122": "晋宁县",
    "530124": "富民县",
    "530125": "宜良县",
    "530126": "石林彝族自治县",
    "530127": "嵩明县",
    "530128": "禄劝彝族苗族自治县",
    "530129": "寻甸回族彝族自治县",
    "530181": "安宁市"
  },
  "530300": {
    "530302": "麒麟区",
    "530303": "沾益区",
    "530321": "马龙县",
    "530322": "陆良县",
    "530323": "师宗县",
    "530324": "罗平县",
    "530325": "富源县",
    "530326": "会泽县",
    "530381": "宣威市"
  },
  "530400": {
    "530402": "红塔区",
    "530403": "江川区",
    "530422": "澄江县",
    "530423": "通海县",
    "530424": "华宁县",
    "530425": "易门县",
    "530426": "峨山彝族自治县",
    "530427": "新平彝族傣族自治县",
    "530428": "元江哈尼族彝族傣族自治县"
  },
  "530500": {
    "530502": "隆阳区",
    "530521": "施甸县",
    "530523": "龙陵县",
    "530524": "昌宁县",
    "530581": "腾冲市"
  },
  "530600": {
    "530602": "昭阳区",
    "530621": "鲁甸县",
    "530622": "巧家县",
    "530623": "盐津县",
    "530624": "大关县",
    "530625": "永善县",
    "530626": "绥江县",
    "530627": "镇雄县",
    "530628": "彝良县",
    "530629": "威信县",
    "530630": "水富县"
  },
  "530700": {
    "530702": "古城区",
    "530721": "玉龙纳西族自治县",
    "530722": "永胜县",
    "530723": "华坪县",
    "530724": "宁蒗彝族自治县"
  },
  "530800": {
    "530802": "思茅区",
    "530821": "宁洱哈尼族彝族自治县",
    "530822": "墨江哈尼族自治县",
    "530823": "景东彝族自治县",
    "530824": "景谷傣族彝族自治县",
    "530825": "镇沅彝族哈尼族拉祜族自治县",
    "530826": "江城哈尼族彝族自治县",
    "530827": "孟连傣族拉祜族佤族自治县",
    "530828": "澜沧拉祜族自治县",
    "530829": "西盟佤族自治县"
  },
  "530900": {
    "530902": "临翔区",
    "530921": "凤庆县",
    "530922": "云县",
    "530923": "永德县",
    "530924": "镇康县",
    "530925": "双江拉祜族佤族布朗族傣族自治县",
    "530926": "耿马傣族佤族自治县",
    "530927": "沧源佤族自治县"
  },
  "532300": {
    "532301": "楚雄市",
    "532322": "双柏县",
    "532323": "牟定县",
    "532324": "南华县",
    "532325": "姚安县",
    "532326": "大姚县",
    "532327": "永仁县",
    "532328": "元谋县",
    "532329": "武定县",
    "532331": "禄丰县"
  },
  "532500": {
    "532501": "个旧市",
    "532502": "开远市",
    "532503": "蒙自市",
    "532504": "弥勒市",
    "532523": "屏边苗族自治县",
    "532524": "建水县",
    "532525": "石屏县",
    "532527": "泸西县",
    "532528": "元阳县",
    "532529": "红河县",
    "532530": "金平苗族瑶族傣族自治县",
    "532531": "绿春县",
    "532532": "河口瑶族自治县"
  },
  "532600": {
    "532601": "文山市",
    "532622": "砚山县",
    "532623": "西畴县",
    "532624": "麻栗坡县",
    "532625": "马关县",
    "532626": "丘北县",
    "532627": "广南县",
    "532628": "富宁县"
  },
  "532800": {
    "532801": "景洪市",
    "532822": "勐海县",
    "532823": "勐腊县"
  },
  "532900": {
    "532901": "大理市",
    "532922": "漾濞彝族自治县",
    "532923": "祥云县",
    "532924": "宾川县",
    "532925": "弥渡县",
    "532926": "南涧彝族自治县",
    "532927": "巍山彝族回族自治县",
    "532928": "永平县",
    "532929": "云龙县",
    "532930": "洱源县",
    "532931": "剑川县",
    "532932": "鹤庆县"
  },
  "533100": {
    "533102": "瑞丽市",
    "533103": "芒市",
    "533122": "梁河县",
    "533123": "盈江县",
    "533124": "陇川县"
  },
  "533300": {
    "533301": "泸水市",
    "533323": "福贡县",
    "533324": "贡山独龙族怒族自治县",
    "533325": "兰坪白族普米族自治县"
  },
  "533400": {
    "533401": "香格里拉市",
    "533422": "德钦县",
    "533423": "维西傈僳族自治县"
  },
  "540000": {
    "540100": "拉萨市",
    "540200": "日喀则市",
    "540300": "昌都市",
    "540400": "林芝市",
    "540500": "山南市",
    "542400": "那曲地区",
    "542500": "阿里地区"
  },
  "540100": {
    "540102": "城关区",
    "540103": "堆龙德庆区",
    "540121": "林周县",
    "540122": "当雄县",
    "540123": "尼木县",
    "540124": "曲水县",
    "540126": "达孜县",
    "540127": "墨竹工卡县"
  },
  "540200": {
    "540202": "桑珠孜区",
    "540221": "南木林县",
    "540222": "江孜县",
    "540223": "定日县",
    "540224": "萨迦县",
    "540225": "拉孜县",
    "540226": "昂仁县",
    "540227": "谢通门县",
    "540228": "白朗县",
    "540229": "仁布县",
    "540230": "康马县",
    "540231": "定结县",
    "540232": "仲巴县",
    "540233": "亚东县",
    "540234": "吉隆县",
    "540235": "聂拉木县",
    "540236": "萨嘎县",
    "540237": "岗巴县"
  },
  "540300": {
    "540302": "卡若区",
    "540321": "江达县",
    "540322": "贡觉县",
    "540323": "类乌齐县",
    "540324": "丁青县",
    "540325": "察雅县",
    "540326": "八宿县",
    "540327": "左贡县",
    "540328": "芒康县",
    "540329": "洛隆县",
    "540330": "边坝县"
  },
  "540400": {
    "540402": "巴宜区",
    "540421": "工布江达县",
    "540422": "米林县",
    "540423": "墨脱县",
    "540424": "波密县",
    "540425": "察隅县",
    "540426": "朗县"
  },
  "540500": {
    "540502": "乃东区",
    "540521": "扎囊县",
    "540522": "贡嘎县",
    "540523": "桑日县",
    "540524": "琼结县",
    "540525": "曲松县",
    "540526": "措美县",
    "540527": "洛扎县",
    "540528": "加查县",
    "540529": "隆子县",
    "540530": "错那县",
    "540531": "浪卡子县"
  },
  "542400": {
    "542421": "那曲县",
    "542422": "嘉黎县",
    "542423": "比如县",
    "542424": "聂荣县",
    "542425": "安多县",
    "542426": "申扎县",
    "542427": "索县",
    "542428": "班戈县",
    "542429": "巴青县",
    "542430": "尼玛县",
    "542431": "双湖县"
  },
  "542500": {
    "542521": "普兰县",
    "542522": "札达县",
    "542523": "噶尔县",
    "542524": "日土县",
    "542525": "革吉县",
    "542526": "改则县",
    "542527": "措勤县"
  },
  "610000": {
    "610100": "西安市",
    "610200": "铜川市",
    "610300": "宝鸡市",
    "610400": "咸阳市",
    "610500": "渭南市",
    "610600": "延安市",
    "610700": "汉中市",
    "610800": "榆林市",
    "610900": "安康市",
    "611000": "商洛市"
  },
  "610100": {
    "610102": "新城区",
    "610103": "碑林区",
    "610104": "莲湖区",
    "610111": "灞桥区",
    "610112": "未央区",
    "610113": "雁塔区",
    "610114": "阎良区",
    "610115": "临潼区",
    "610116": "长安区",
    "610117": "高陵区",
    "610122": "蓝田县",
    "610124": "周至县",
    "610125": "户县"
  },
  "610200": {
    "610202": "王益区",
    "610203": "印台区",
    "610204": "耀州区",
    "610222": "宜君县"
  },
  "610300": {
    "610302": "渭滨区",
    "610303": "金台区",
    "610304": "陈仓区",
    "610322": "凤翔县",
    "610323": "岐山县",
    "610324": "扶风县",
    "610326": "眉县",
    "610327": "陇县",
    "610328": "千阳县",
    "610329": "麟游县",
    "610330": "凤县",
    "610331": "太白县"
  },
  "610400": {
    "610402": "秦都区",
    "610403": "杨陵区",
    "610404": "渭城区",
    "610422": "三原县",
    "610423": "泾阳县",
    "610424": "乾县",
    "610425": "礼泉县",
    "610426": "永寿县",
    "610427": "彬县",
    "610428": "长武县",
    "610429": "旬邑县",
    "610430": "淳化县",
    "610431": "武功县",
    "610481": "兴平市"
  },
  "610500": {
    "610502": "临渭区",
    "610503": "华州区",
    "610522": "潼关县",
    "610523": "大荔县",
    "610524": "合阳县",
    "610525": "澄城县",
    "610526": "蒲城县",
    "610527": "白水县",
    "610528": "富平县",
    "610581": "韩城市",
    "610582": "华阴市"
  },
  "610600": {
    "610602": "宝塔区",
    "610603": "安塞区",
    "610621": "延长县",
    "610622": "延川县",
    "610623": "子长县",
    "610625": "志丹县",
    "610626": "吴起县",
    "610627": "甘泉县",
    "610628": "富县",
    "610629": "洛川县",
    "610630": "宜川县",
    "610631": "黄龙县",
    "610632": "黄陵县"
  },
  "610700": {
    "610702": "汉台区",
    "610721": "南郑县",
    "610722": "城固县",
    "610723": "洋县",
    "610724": "西乡县",
    "610725": "勉县",
    "610726": "宁强县",
    "610727": "略阳县",
    "610728": "镇巴县",
    "610729": "留坝县",
    "610730": "佛坪县"
  },
  "610800": {
    "610802": "榆阳区",
    "610803": "横山区",
    "610821": "神木县",
    "610822": "府谷县",
    "610824": "靖边县",
    "610825": "定边县",
    "610826": "绥德县",
    "610827": "米脂县",
    "610828": "佳县",
    "610829": "吴堡县",
    "610830": "清涧县",
    "610831": "子洲县"
  },
  "610900": {
    "610902": "汉滨区",
    "610921": "汉阴县",
    "610922": "石泉县",
    "610923": "宁陕县",
    "610924": "紫阳县",
    "610925": "岚皋县",
    "610926": "平利县",
    "610927": "镇坪县",
    "610928": "旬阳县",
    "610929": "白河县"
  },
  "611000": {
    "611002": "商州区",
    "611021": "洛南县",
    "611022": "丹凤县",
    "611023": "商南县",
    "611024": "山阳县",
    "611025": "镇安县",
    "611026": "柞水县"
  },
  "620000": {
    "620100": "兰州市",
    "620200": "嘉峪关市",
    "620300": "金昌市",
    "620400": "白银市",
    "620500": "天水市",
    "620600": "武威市",
    "620700": "张掖市",
    "620800": "平凉市",
    "620900": "酒泉市",
    "621000": "庆阳市",
    "621100": "定西市",
    "621200": "陇南市",
    "622900": "临夏回族自治州",
    "623000": "甘南藏族自治州"
  },
  "620100": {
    "620102": "城关区",
    "620103": "七里河区",
    "620104": "西固区",
    "620105": "安宁区",
    "620111": "红古区",
    "620121": "永登县",
    "620122": "皋兰县",
    "620123": "榆中县"
  },
  "620300": {
    "620302": "金川区",
    "620321": "永昌县"
  },
  "620400": {
    "620402": "白银区",
    "620403": "平川区",
    "620421": "靖远县",
    "620422": "会宁县",
    "620423": "景泰县"
  },
  "620500": {
    "620502": "秦州区",
    "620503": "麦积区",
    "620521": "清水县",
    "620522": "秦安县",
    "620523": "甘谷县",
    "620524": "武山县",
    "620525": "张家川回族自治县"
  },
  "620600": {
    "620602": "凉州区",
    "620621": "民勤县",
    "620622": "古浪县",
    "620623": "天祝藏族自治县"
  },
  "620700": {
    "620702": "甘州区",
    "620721": "肃南裕固族自治县",
    "620722": "民乐县",
    "620723": "临泽县",
    "620724": "高台县",
    "620725": "山丹县"
  },
  "620800": {
    "620802": "崆峒区",
    "620821": "泾川县",
    "620822": "灵台县",
    "620823": "崇信县",
    "620824": "华亭县",
    "620825": "庄浪县",
    "620826": "静宁县"
  },
  "620900": {
    "620902": "肃州区",
    "620921": "金塔县",
    "620922": "瓜州县",
    "620923": "肃北蒙古族自治县",
    "620924": "阿克塞哈萨克族自治县",
    "620981": "玉门市",
    "620982": "敦煌市"
  },
  "621000": {
    "621002": "西峰区",
    "621021": "庆城县",
    "621022": "环县",
    "621023": "华池县",
    "621024": "合水县",
    "621025": "正宁县",
    "621026": "宁县",
    "621027": "镇原县"
  },
  "621100": {
    "621102": "安定区",
    "621121": "通渭县",
    "621122": "陇西县",
    "621123": "渭源县",
    "621124": "临洮县",
    "621125": "漳县",
    "621126": "岷县"
  },
  "621200": {
    "621202": "武都区",
    "621221": "成县",
    "621222": "文县",
    "621223": "宕昌县",
    "621224": "康县",
    "621225": "西和县",
    "621226": "礼县",
    "621227": "徽县",
    "621228": "两当县"
  },
  "622900": {
    "622901": "临夏市",
    "622921": "临夏县",
    "622922": "康乐县",
    "622923": "永靖县",
    "622924": "广河县",
    "622925": "和政县",
    "622926": "东乡族自治县",
    "622927": "积石山保安族东乡族撒拉族自治县"
  },
  "623000": {
    "623001": "合作市",
    "623021": "临潭县",
    "623022": "卓尼县",
    "623023": "舟曲县",
    "623024": "迭部县",
    "623025": "玛曲县",
    "623026": "碌曲县",
    "623027": "夏河县"
  },
  "630000": {
    "630100": "西宁市",
    "630200": "海东市",
    "632200": "海北藏族自治州",
    "632300": "黄南藏族自治州",
    "632500": "海南藏族自治州",
    "632600": "果洛藏族自治州",
    "632700": "玉树藏族自治州",
    "632800": "海西蒙古族藏族自治州"
  },
  "630100": {
    "630102": "城东区",
    "630103": "城中区",
    "630104": "城西区",
    "630105": "城北区",
    "630121": "大通回族土族自治县",
    "630122": "湟中县",
    "630123": "湟源县"
  },
  "630200": {
    "630202": "乐都区",
    "630203": "平安区",
    "630222": "民和回族土族自治县",
    "630223": "互助土族自治县",
    "630224": "化隆回族自治县",
    "630225": "循化撒拉族自治县"
  },
  "632200": {
    "632221": "门源回族自治县",
    "632222": "祁连县",
    "632223": "海晏县",
    "632224": "刚察县"
  },
  "632300": {
    "632321": "同仁县",
    "632322": "尖扎县",
    "632323": "泽库县",
    "632324": "河南蒙古族自治县"
  },
  "632500": {
    "632521": "共和县",
    "632522": "同德县",
    "632523": "贵德县",
    "632524": "兴海县",
    "632525": "贵南县"
  },
  "632600": {
    "632621": "玛沁县",
    "632622": "班玛县",
    "632623": "甘德县",
    "632624": "达日县",
    "632625": "久治县",
    "632626": "玛多县"
  },
  "632700": {
    "632701": "玉树市",
    "632722": "杂多县",
    "632723": "称多县",
    "632724": "治多县",
    "632725": "囊谦县",
    "632726": "曲麻莱县"
  },
  "632800": {
    "632801": "格尔木市",
    "632802": "德令哈市",
    "632821": "乌兰县",
    "632822": "都兰县",
    "632823": "天峻县"
  },
  "640000": {
    "640100": "银川市",
    "640200": "石嘴山市",
    "640300": "吴忠市",
    "640400": "固原市",
    "640500": "中卫市"
  },
  "640100": {
    "640104": "兴庆区",
    "640105": "西夏区",
    "640106": "金凤区",
    "640121": "永宁县",
    "640122": "贺兰县",
    "640181": "灵武市"
  },
  "640200": {
    "640202": "大武口区",
    "640205": "惠农区",
    "640221": "平罗县"
  },
  "640300": {
    "640302": "利通区",
    "640303": "红寺堡区",
    "640323": "盐池县",
    "640324": "同心县",
    "640381": "青铜峡市"
  },
  "640400": {
    "640402": "原州区",
    "640422": "西吉县",
    "640423": "隆德县",
    "640424": "泾源县",
    "640425": "彭阳县"
  },
  "640500": {
    "640502": "沙坡头区",
    "640521": "中宁县",
    "640522": "海原县"
  },
  "650000": {
    "650100": "乌鲁木齐市",
    "650200": "克拉玛依市",
    "650400": "吐鲁番市",
    "650500": "哈密市",
    "652300": "昌吉回族自治州",
    "652700": "博尔塔拉蒙古自治州",
    "652800": "巴音郭楞蒙古自治州",
    "652900": "阿克苏地区",
    "653000": "克孜勒苏柯尔克孜自治州",
    "653100": "喀什地区",
    "653200": "和田地区",
    "654000": "伊犁哈萨克自治州",
    "654200": "塔城地区",
    "654300": "阿勒泰地区",
    "659001": "石河子市",
    "659002": "阿拉尔市",
    "659003": "图木舒克市",
    "659004": "五家渠市",
    "659006": "铁门关市"
  },
  "650100": {
    "650102": "天山区",
    "650103": "沙依巴克区",
    "650104": "新市区",
    "650105": "水磨沟区",
    "650106": "头屯河区",
    "650107": "达坂城区",
    "650109": "米东区",
    "650121": "乌鲁木齐县"
  },
  "650200": {
    "650202": "独山子区",
    "650203": "克拉玛依区",
    "650204": "白碱滩区",
    "650205": "乌尔禾区"
  },
  "650400": {
    "650402": "高昌区",
    "650421": "鄯善县",
    "650422": "托克逊县"
  },
  "650500": {
    "650502": "伊州区",
    "650521": "巴里坤哈萨克自治县",
    "650522": "伊吾县"
  },
  "652300": {
    "652301": "昌吉市",
    "652302": "阜康市",
    "652323": "呼图壁县",
    "652324": "玛纳斯县",
    "652325": "奇台县",
    "652327": "吉木萨尔县",
    "652328": "木垒哈萨克自治县"
  },
  "652700": {
    "652701": "博乐市",
    "652702": "阿拉山口市",
    "652722": "精河县",
    "652723": "温泉县"
  },
  "652800": {
    "652801": "库尔勒市",
    "652822": "轮台县",
    "652823": "尉犁县",
    "652824": "若羌县",
    "652825": "且末县",
    "652826": "焉耆回族自治县",
    "652827": "和静县",
    "652828": "和硕县",
    "652829": "博湖县"
  },
  "652900": {
    "652901": "阿克苏市",
    "652922": "温宿县",
    "652923": "库车县",
    "652924": "沙雅县",
    "652925": "新和县",
    "652926": "拜城县",
    "652927": "乌什县",
    "652928": "阿瓦提县",
    "652929": "柯坪县"
  },
  "653000": {
    "653001": "阿图什市",
    "653022": "阿克陶县",
    "653023": "阿合奇县",
    "653024": "乌恰县"
  },
  "653100": {
    "653101": "喀什市",
    "653121": "疏附县",
    "653122": "疏勒县",
    "653123": "英吉沙县",
    "653124": "泽普县",
    "653125": "莎车县",
    "653126": "叶城县",
    "653127": "麦盖提县",
    "653128": "岳普湖县",
    "653129": "伽师县",
    "653130": "巴楚县",
    "653131": "塔什库尔干塔吉克自治县"
  },
  "653200": {
    "653201": "和田市",
    "653221": "和田县",
    "653222": "墨玉县",
    "653223": "皮山县",
    "653224": "洛浦县",
    "653225": "策勒县",
    "653226": "于田县",
    "653227": "民丰县"
  },
  "654000": {
    "654002": "伊宁市",
    "654003": "奎屯市",
    "654004": "霍尔果斯市",
    "654021": "伊宁县",
    "654022": "察布查尔锡伯自治县",
    "654023": "霍城县",
    "654024": "巩留县",
    "654025": "新源县",
    "654026": "昭苏县",
    "654027": "特克斯县",
    "654028": "尼勒克县"
  },
  "654200": {
    "654201": "塔城市",
    "654202": "乌苏市",
    "654221": "额敏县",
    "654223": "沙湾县",
    "654224": "托里县",
    "654225": "裕民县",
    "654226": "和布克赛尔蒙古自治县"
  },
  "654300": {
    "654301": "阿勒泰市",
    "654321": "布尔津县",
    "654322": "富蕴县",
    "654323": "福海县",
    "654324": "哈巴河县",
    "654325": "青河县",
    "654326": "吉木乃县"
  },
  "810000": {
    "810001": "中西區",
    "810002": "灣仔區",
    "810003": "東區",
    "810004": "南區",
    "810005": "油尖旺區",
    "810006": "深水埗區",
    "810007": "九龍城區",
    "810008": "黃大仙區",
    "810009": "觀塘區",
    "810010": "荃灣區",
    "810011": "屯門區",
    "810012": "元朗區",
    "810013": "北區",
    "810014": "大埔區",
    "810015": "西貢區",
    "810016": "沙田區",
    "810017": "葵青區",
    "810018": "離島區"
  },
  "820000": {
    "820001": "花地瑪堂區",
    "820002": "花王堂區",
    "820003": "望德堂區",
    "820004": "大堂區",
    "820005": "風順堂區",
    "820006": "嘉模堂區",
    "820007": "路氹填海區",
    "820008": "聖方濟各堂區"
  }
}

/***/ }),

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "wv-group",
        { attrs: { title: "收货地址信息" } },
        [
          _c("wv-input", {
            attrs: { label: "收货人" },
            model: {
              value: _vm.address.name,
              callback: function($$v) {
                _vm.$set(_vm.address, "name", $$v)
              },
              expression: "address.name"
            }
          }),
          _vm._v(" "),
          _c("wv-input", {
            attrs: { label: "手机号码" },
            model: {
              value: _vm.address.mobile,
              callback: function($$v) {
                _vm.$set(_vm.address, "mobile", $$v)
              },
              expression: "address.mobile"
            }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: {
              title: "所在地区",
              value: _vm._f("pcaFilter")(_vm.address),
              "is-link": ""
            },
            nativeOn: {
              click: function($event) {
                _vm.addressPickerShow = true
              }
            }
          }),
          _vm._v(" "),
          _c("wv-input", {
            attrs: { label: "详细地址" },
            model: {
              value: _vm.address.address,
              callback: function($$v) {
                _vm.$set(_vm.address, "address", $$v)
              },
              expression: "address.address"
            }
          }),
          _vm._v(" "),
          _c("wv-input", {
            attrs: { label: "邮政编码" },
            model: {
              value: _vm.address.postcode,
              callback: function($$v) {
                _vm.$set(_vm.address, "postcode", $$v)
              },
              expression: "address.postcode"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("wv-picker", {
        ref: "addressPicker",
        attrs: { slots: _vm.addressSlots },
        on: { change: _vm.onAddressChange, confirm: _vm.confirmAddress },
        model: {
          value: _vm.addressPickerShow,
          callback: function($$v) {
            _vm.addressPickerShow = $$v
          },
          expression: "addressPickerShow"
        }
      }),
      _vm._v(" "),
      _c(
        "footer",
        [
          _c(
            "wv-flex",
            { attrs: { gutter: 20 } },
            [
              _vm.$route.params.id
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "warn" },
                          nativeOn: {
                            click: function($event) {
                              return _vm.deleteAddress($event)
                            }
                          }
                        },
                        [_vm._v("删除")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "wv-flex-item",
                [
                  _c(
                    "wv-button",
                    {
                      attrs: { type: "primary" },
                      nativeOn: {
                        click: function($event) {
                          return _vm.store($event)
                        }
                      }
                    },
                    [_vm._v("保存")]
                  )
                ],
                1
              )
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
    require("vue-hot-reload-api")      .rerender("data-v-605b4eb6", module.exports)
  }
}

/***/ })

});