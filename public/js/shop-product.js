webpackJsonp([3],{

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(688)
}
var normalizeComponent = __webpack_require__(603)
/* script */
var __vue_script__ = __webpack_require__(690)
/* template */
var __vue_template__ = __webpack_require__(692)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0eb040b0"
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
Component.options.__file = "resources\\assets\\js\\shop\\pages\\product.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0eb040b0", Component.options)
  } else {
    hotAPI.reload("data-v-0eb040b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 603:
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

/***/ 604:
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

var listToStyles = __webpack_require__(605)

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

/***/ 605:
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

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(607);

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

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(608), __esModule: true };

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(609);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(26);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(21), 'Object', { defineProperty: __webpack_require__(27).f });


/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=54)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=function(e){e.component(this.name,this)},u=function(e){return e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||i,e},s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return c}),n.d(t,"a",function(){return u}),n.d(t,"b",function(){return s});var c=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,u,s){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),u?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},l._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var a=l.render;l.render=function(e,t){return c.call(t),a(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:l}}n.d(t,"a",function(){return r})},2:function(t,n){t.exports=e},25:function(e,t,n){"use strict";t.a={props:{url:String,replace:Boolean,to:[String,Object]},methods:{routerLink:function(){var e=this.to,t=this.url,n=this.$router,r=this.replace;e&&n?n[r?"replace":"push"](e):t&&(r?location.replace(t):location.href=t)}}}},40:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(25),i=Object(r.a)({name:"wv-cell",mixins:[o.a],props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean},methods:{onClick:function(){this.$emit("click"),this.routerLink()}}}),u=(n(80),n(1)),s=Object(u.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell",class:{"weui-cell_access":e.isLink},on:{click:e.onClick}},[n("div",{staticClass:"weui-cell_hd"},[e._t("icon")],2),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[e._t("bd",[n("p",{domProps:{innerHTML:e._s(e.title)}})])],2),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[e._t("ft",[e._v(e._s(e.value))])],2)])},[],!1,null,"586397b9",null);t.default=s.exports},80:function(e,t,n){"use strict";var r=n(40);n.n(r).a}})});

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=158)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=function(e){e.component(this.name,this)},u=function(e){return e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||i,e},s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return c}),n.d(t,"a",function(){return u}),n.d(t,"b",function(){return s});var c=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,u,s){var c,f="function"==typeof e?e.options:e;if(t&&(f.render=t,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),u?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},f._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(f.functional){f._injectStyles=c;var l=f.render;f.render=function(e,t){return c.call(t),l(e,t)}}else{var a=f.beforeCreate;f.beforeCreate=a?[].concat(a,c):[c]}return{exports:e,options:f}}n.d(t,"a",function(){return r})},120:function(e,t,n){},158:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"wv-group",props:{title:String,titleColor:String}}),i=(n(239),n(1)),u=Object(i.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[this.title?t("div",{staticClass:"weui-cells__title",style:{color:this.titleColor},domProps:{innerHTML:this._s(this.title)}}):this._e(),this._v(" "),t("div",{staticClass:"weui-cells"},[this._t("default")],2)])},[],!1,null,"54abcb9e",null);t.default=u.exports},2:function(t,n){t.exports=e},239:function(e,t,n){"use strict";var r=n(120);n.n(r).a}})});

/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=182)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=function(e){e.component(this.name,this)},s=function(e){return e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||i,e},u=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return f}),n.d(t,"a",function(){return s}),n.d(t,"b",function(){return u});var f=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var f,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=f):o&&(f=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),f)if(c.functional){c._injectStyles=f;var a=c.render;c.render=function(e,t){return f.call(t),a(e,t)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,f):[f]}return{exports:e,options:c}}n.d(t,"a",function(){return r})},105:function(e,t,n){},182:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"wv-swipe-item",data:function(){return{offset:0}},computed:{style:function(){return{width:this.$parent.width+"px",transform:"translate3d("+this.offset+"px, 0, 0)"}}},beforeCreate:function(){this.$parent&&this.$parent.swipes.push(this)},destroyed:function(){this.$parent&&this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)}}),i=(n(206),n(1)),s=Object(i.a)(o,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wv-swipe-item",style:this.style},[this._t("default")],2)},[],!1,null,"2a08077e",null);t.default=s.exports},2:function(t,n){t.exports=e},206:function(e,t,n){"use strict";var r=n(105);n.n(r).a}})});

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var i="object"==typeof exports?e(require("vue")):e(t.Vue);for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(window,function(t){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=180)}({0:function(t,e,i){"use strict";var n=i(2),o=i.n(n),r=function(t){t.component(this.name,this)},s=function(t){return t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||r,t},u=function(t){return t.changedTouches[0]||t.touches[0]};i.d(e,"c",function(){return a}),i.d(e,"a",function(){return s}),i.d(e,"b",function(){return u});var a=o.a.prototype.$isServer},1:function(t,e,i){"use strict";function n(t,e,i,n,o,r,s,u){var a,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var h=c.render;c.render=function(t,e){return a.call(e),h(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,a):[a]}return{exports:t,options:c}}i.d(e,"a",function(){return n})},106:function(t,e,i){},180:function(t,e,i){"use strict";i.r(e);var n=i(0),o=Object(n.a)({name:"wv-swipe",props:{height:Number,autoplay:Number,defaultIndex:{type:Number,default:0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500},prevent:Boolean,noDragWhenSingle:{type:Boolean,default:!0}},data:function(){return{width:0,offset:0,startX:0,startY:0,active:0,deltaX:0,swipes:[],direction:"",currentDuration:0}},mounted:function(){this.initialize()},destroyed:function(){clearTimeout(this.timer)},watch:{swipes:function(){this.initialize()},defaultIndex:function(){this.initialize()}},computed:{count:function(){return this.swipes.length},wrapperStyle:function(){var t={paddingLeft:this.count>1?this.width+"px":0,width:this.count>1?(this.count+2)*this.width+"px":"100%",transitionDuration:this.currentDuration+"ms",transform:"translate3d("+this.offset+"px, 0, 0)"};return this.height&&(t.height=this.height+"px"),t},activeIndicator:function(){return(this.active+this.count)%this.count}},methods:{initialize:function(){clearTimeout(this.timer),this.width=this.$el.getBoundingClientRect().width,this.active=this.defaultIndex,this.currentDuration=0,this.offset=this.count>1?-this.width*(this.active+1):0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onTouchstart:function(t){if(1!==this.count||!this.noDragWhenSingle){clearTimeout(this.timer);var e=Object(n.b)(t);this.deltaX=0,this.direction="",this.currentDuration=0,this.startX=e.clientX,this.startY=e.clientY,this.active<=-1&&this.move(this.count),this.active>=this.count&&this.move(-this.count)}},onTouchmove:function(t){this.prevent&&t.preventDefault();var e=Object(n.b)(t);this.deltaX=e.clientX-this.startX;var i=e.clientY-this.startY;if(1===this.count){if(this.noDragWhenSingle)return;this.offset=this.range(this.deltaX,[-20,20])}else this.count>1&&Math.abs(this.deltaX)>Math.abs(i)&&this.move(0,this.range(this.deltaX,[-this.width,this.width]))},onTouchend:function(){if(1===this.count){if(this.noDragWhenSingle)return;this.offset=0,this.currentDuration=this.duration}else this.deltaX&&(this.move(Math.abs(this.deltaX)>50?this.deltaX>0?-1:1:0),this.currentDuration=this.duration),this.autoPlay()},move:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.active,n=this.count,o=this.swipes,r=this.deltaX,s=this.width;t?(-1===i&&(o[n-1].offset=0),o[0].offset=i===n-1&&t>0?n*s:0,this.active+=t):0===i?o[n-1].offset=r>0?-n*s:0:i===n-1&&(o[0].offset=r<0?n*s:0),this.offset=e-(this.active+1)*this.width},autoPlay:function(){var t=this,e=this.autoplay;e&&this.count>1&&(clearTimeout(this.timer),this.timer=setTimeout(function(){t.currentDuration=0,t.active>=t.count&&t.move(-t.count),setTimeout(function(){t.currentDuration=t.duration,t.move(1),t.autoPlay()},30)},e))},range:function(t,e){return Math.min(Math.max(t,e[0]),e[1])}}}),r=(i(208),i(1)),s=Object(r.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wv-swipe",on:{touchstart:t.onTouchstart,touchmove:t.onTouchmove,touchend:t.onTouchend,touchcancel:t.onTouchend}},[i("div",{staticClass:"wv-swipe__wrapper",style:t.wrapperStyle,on:{transitionend:function(e){t.$emit("change",t.activeIndicator)}}},[t._t("default")],2),t._v(" "),t.showIndicators&&t.count>1?i("div",{staticClass:"wv-swipe__indicators"},t._l(t.count,function(e){return i("i",{key:e,class:{"wv-swipe__indicator--active":e-1===t.activeIndicator}})})):t._e()])},[],!1,null,"19dd4d44",null);e.default=s.exports},2:function(e,i){e.exports=t},208:function(t,e,i){"use strict";var n=i(106);i.n(n).a}})});

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n="object"==typeof exports?e(require("vue")):e(t.Vue);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=169)}({0:function(t,e,n){"use strict";var r=n(2),o=n.n(r),i=function(t){t.component(this.name,this)},u=function(t){return t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||i,t},a=function(t){return t.changedTouches[0]||t.touches[0]};n.d(e,"c",function(){return c}),n.d(e,"a",function(){return u}),n.d(e,"b",function(){return a});var c=o.a.prototype.$isServer},1:function(t,e,n){"use strict";function r(t,e,n,r,o,i,u,a){var c,s="function"==typeof t?t.options:t;if(e&&(s.render=e,s.staticRenderFns=n,s._compiled=!0),r&&(s.functional=!0),i&&(s._scopeId="data-v-"+i),u?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},s._ssrRegister=c):o&&(c=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(s.functional){s._injectStyles=c;var f=s.render;s.render=function(t,e){return c.call(e),f(t,e)}}else{var l=s.beforeCreate;s.beforeCreate=l?[].concat(l,c):[c]}return{exports:t,options:s}}n.d(e,"a",function(){return r})},10:function(t,e,n){var r=n(9),o=n(16);t.exports=n(4)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},11:function(t,e,n){var r=n(6);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},113:function(t,e,n){},12:function(t,e,n){var r=n(37),o=n(18);t.exports=function(t){return r(o(t))}},13:function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(24),i=(r=o)&&r.__esModule?r:{default:r};e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},15:function(t,e,n){var r=n(3),o=n(5),i=n(28),u=n(10),a=n(7),c=function(t,e,n){var s,f,l,p=t&c.F,d=t&c.G,h=t&c.S,v=t&c.P,b=t&c.B,m=t&c.W,y=d?o:o[e]||(o[e]={}),x=y.prototype,_=d?r:h?r[e]:(r[e]||{}).prototype;for(s in d&&(n=e),n)(f=!p&&_&&void 0!==_[s])&&a(y,s)||(l=f?_[s]:n[s],y[s]=d&&"function"!=typeof _[s]?n[s]:b&&f?i(l,r):m&&_[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((y.virtual||(y.virtual={}))[s]=l,t&c.R&&x&&!x[s]&&u(x,s,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},151:function(t,e,n){t.exports={default:n(224),__esModule:!0}},16:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},169:function(t,e,n){"use strict";n.r(e);var r=n(13),o=n.n(r),i=n(151),u=n.n(i),a=n(0),c=u.a||window.isNaN,s=Object(a.a)({name:"wv-number-spinner",props:{min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},inputWidth:{type:String,default:"3em"},readonly:Boolean,disabled:Boolean,align:{type:String,default:"center"},fillable:{type:Boolean,default:!0},value:{type:Number,default:0}},data:function(){return{currentValue:this.value}},inheritAttrs:!1,model:{event:"change"},computed:{increasable:function(){var t=this.currentValue;return c(t)||t<this.max},decreasable:function(){var t=this.currentValue;return c(t)||t>this.min},inputStyle:function(){return{width:this.inputWidth,textAlign:this.align}},listeners:function(){var t=o()({},this.$listeners);return delete t.change,t}},created:function(){this.min<this.max&&(this.currentValue=Math.min(this.max,Math.max(this.min,this.value)))},methods:{decrease:function(){if(this.decreasable){var t=this.currentValue;c(t)&&(t=0),this.setValue(Math.min(this.max,Math.max(this.min,t-this.step)))}},increase:function(){if(this.increasable){var t=this.currentValue;c(t)&&(t=0),this.setValue(Math.min(this.max,Math.max(this.min,t+this.step)))}},onChange:function(t){this.setValue(Math.min(this.max,Math.max(this.min,t.target.value)))},onPaste:function(t){this.fillable&&/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(t.clipboardData.getData("text"))||t.preventDefault()},onKeypress:function(t){this.fillable||t.preventDefault()},setValue:function(t){var e=this.currentValue;this.currentValue=t,this.$emit("change",t,e),this.$refs.input.value=t}},watch:{currentValue:function(t){this.$emit("input",t),this.$emit("change",t)},value:function(t){"number"==typeof t?t<=this.min?this.currentValue=this.min:t>=this.max?this.currentValue=this.max:this.currentValue=t:""===t&&(this.currentValue="")}}}),f=(n(222),n(1)),l=Object(f.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._g({staticClass:"wv-number-spinner"},t.listeners),[n("button",{staticClass:"spinner-btn btn-minus",attrs:{disabled:t.disabled||t.readonly||!t.decreasable},on:{click:t.decrease}}),t._v(" "),n("input",t._b({ref:"input",style:t.inputStyle,attrs:{type:"number",min:t.min,max:t.max,step:t.step,disabled:t.disabled||!t.decreasable&&!t.increasable,readonly:t.readonly},domProps:{value:t.currentValue},on:{change:t.onChange,paste:t.onPaste,keypress:t.onKeypress}},"input",t.$attrs,!1)),t._v(" "),n("button",{staticClass:"spinner-btn btn-plus",attrs:{disabled:t.disabled||t.readonly||!t.increasable},on:{click:t.increase}})])},[],!1,null,"95d68d38",null);e.default=l.exports},17:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},18:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},19:function(t,e,n){var r=n(6);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},2:function(e,n){e.exports=t},21:function(t,e){t.exports=!0},22:function(t,e,n){var r=n(6),o=n(3).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},222:function(t,e,n){"use strict";var r=n(113);n.n(r).a},223:function(t,e,n){var r=n(15);r(r.S,"Number",{isNaN:function(t){return t!=t}})},224:function(t,e,n){n(223),t.exports=n(5).Number.isNaN},23:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},24:function(t,e,n){t.exports={default:n(50),__esModule:!0}},26:function(t,e,n){t.exports=!n(4)&&!n(8)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},27:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},28:function(t,e,n){var r=n(27);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},29:function(t,e,n){var r=n(34)("keys"),o=n(23);t.exports=function(t){return r[t]||(r[t]=o(t))}},3:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},30:function(t,e,n){var r=n(41),o=n(33);t.exports=Object.keys||function(t){return r(t,o)}},32:function(t,e){e.f={}.propertyIsEnumerable},33:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},34:function(t,e,n){var r=n(5),o=n(3),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(21)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},35:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},37:function(t,e,n){var r=n(35);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},38:function(t,e){e.f=Object.getOwnPropertySymbols},4:function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},41:function(t,e,n){var r=n(7),o=n(12),i=n(46)(!1),u=n(29)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,s=[];for(n in a)n!=u&&r(a,n)&&s.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(s,n)||s.push(n));return s}},42:function(t,e,n){var r=n(18);t.exports=function(t){return Object(r(t))}},43:function(t,e,n){var r=n(17),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},45:function(t,e,n){var r=n(17),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},46:function(t,e,n){var r=n(12),o=n(43),i=n(45);t.exports=function(t){return function(e,n,u){var a,c=r(e),s=o(c.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((a=c[f++])!=a)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},48:function(t,e,n){"use strict";var r=n(30),o=n(38),i=n(32),u=n(42),a=n(37),c=Object.assign;t.exports=!c||n(8)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=r})?function(t,e){for(var n=u(t),c=arguments.length,s=1,f=o.f,l=i.f;c>s;)for(var p,d=a(arguments[s++]),h=f?r(d).concat(f(d)):r(d),v=h.length,b=0;v>b;)l.call(d,p=h[b++])&&(n[p]=d[p]);return n}:c},49:function(t,e,n){var r=n(15);r(r.S+r.F,"Object",{assign:n(48)})},5:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},50:function(t,e,n){n(49),t.exports=n(5).Object.assign},6:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},7:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},8:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},9:function(t,e,n){var r=n(11),o=n(26),i=n(19),u=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}}})});

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(689);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(604)("1aebcfcc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0eb040b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0eb040b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(573)(false);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-0eb040b0] {\n  display: block;\n  overflow: hidden;\n}\n.details[data-v-0eb040b0] {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n}\n.details .name[data-v-0eb040b0] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666;\n}\n.details .price[data-v-0eb040b0] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red;\n}\n.description[data-v-0eb040b0] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666;\n  margin-top: 10px;\n}\n.popup-footer[data-v-0eb040b0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 1em;\n}\n.popup-footer .btn[data-v-0eb040b0] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    text-align: center;\n    padding: .5em 0;\n    color: #fff;\n}\n.popup-footer .popup-btn-add-cart[data-v-0eb040b0] {\n    background-color: red;\n}\nfooter[data-v-0eb040b0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\nfooter .btn[data-v-0eb040b0] {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    -ms-flex-preferred-size: 80px;\n        flex-basis: 80px;\n}\nfooter .btn .icon[data-v-0eb040b0] {\n      display: block;\n}\nfooter .btn .icon.is-favourite[data-v-0eb040b0] {\n        color: #f00;\n}\nfooter .btn .amount[data-v-0eb040b0] {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%;\n}\nfooter .btn .text[data-v-0eb040b0] {\n      font-size: 12px;\n}\nfooter .btn-add-cart[data-v-0eb040b0] {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    -webkit-box-flex: 5;\n        -ms-flex-positive: 5;\n            flex-grow: 5;\n}\n", ""]);

// exports


/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_number_spinner__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_number_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_number_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_popup__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_popup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_swipe_item__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_swipe__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_we_vue_lib_swipe__);






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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_swipe___default.a.name, __WEBPACK_IMPORTED_MODULE_6_we_vue_lib_swipe___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_swipe_item___default.a.name, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_swipe_item___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_popup___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_popup___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_number_spinner___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_number_spinner___default.a), _components),

  mounted: function mounted() {
    this.getProduct();
    this.checkIsFavourite();
    this.getProductAmountInCart();
  },
  data: function data() {
    return {
      product: {},
      amount: 1,
      isFavourite: false,
      productAmountInCart: 0,
      popupVisible: false
    };
  },


  computed: {
    banners: function banners() {
      var temp = [];
      if (this.product.pictures) {
        this.product.pictures.forEach(function (picture) {
          temp.push({ img: picture });
        });
      }
      return temp;
    }
  },

  methods: {
    getProduct: function getProduct() {
      var _this = this;

      this.axios.get('product/' + this.$route.params.id).then(function (response) {
        _this.product = response.data.product;
      });
    },


    // 商品是否已被收藏
    checkIsFavourite: function checkIsFavourite() {
      var _this2 = this;

      this.axios.get('favourite/' + this.$route.params.id + '/is-favourite').then(function (response) {
        _this2.isFavourite = response.data.isFavourite;
      }).catch(function (error) {
        console.log(error);
      });
    },


    // 购物车中商品总数
    getProductAmountInCart: function getProductAmountInCart() {
      var _this3 = this;

      this.axios.get('cart/product-amount').then(function (response) {
        _this3.productAmountInCart = response.data.amount;
      }).catch(function (error) {
        console.log(error);
      });
    },
    showPopup: function showPopup() {
      this.popupVisible = true;
    },


    // 加入购物车
    addToCart: function addToCart(productId) {
      var _this4 = this;

      var postData = {
        productId: productId,
        amount: this.amount
      };

      this.axios.post('cart/add', postData).then(function (response) {
        _this4.productAmountInCart = parseInt(_this4.productAmountInCart) + _this4.amount;
      });
    },


    // 加入购物车
    toggleFavourite: function toggleFavourite(productId) {
      var _this5 = this;

      this.axios.get('favourite/' + productId + '/toggle').then(function (response) {
        _this5.isFavourite = !_this5.isFavourite;
      });
    }
  }
});

/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(14));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n="object"==typeof exports?e(require("vue")):e(t.Vue);for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(window,function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=172)}({0:function(t,e,n){"use strict";var o=n(2),r=n.n(o),i=function(t){t.component(this.name,this)},u=function(t){return t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||i,t},c=function(t){return t.changedTouches[0]||t.touches[0]};n.d(e,"c",function(){return s}),n.d(e,"a",function(){return u}),n.d(e,"b",function(){return c});var s=r.a.prototype.$isServer},1:function(t,e,n){"use strict";function o(t,e,n,o,r,i,u,c){var s,a="function"==typeof t?t.options:t;if(e&&(a.render=e,a.staticRenderFns=n,a._compiled=!0),o&&(a.functional=!0),i&&(a._scopeId="data-v-"+i),u?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},a._ssrRegister=s):r&&(s=c?function(){r.call(this,this.$root.$options.shadowRoot)}:r),s)if(a.functional){a._injectStyles=s;var l=a.render;a.render=function(t,e){return s.call(e),l(t,e)}}else{var f=a.beforeCreate;a.beforeCreate=f?[].concat(f,s):[s]}return{exports:t,options:a}}n.d(e,"a",function(){return o})},10:function(t,e,n){var o=n(9),r=n(16);t.exports=n(4)?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},11:function(t,e,n){var o=n(6);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},111:function(t,e,n){},12:function(t,e,n){var o=n(37),r=n(18);t.exports=function(t){return o(r(t))}},13:function(t,e,n){"use strict";e.__esModule=!0;var o,r=n(24),i=(o=r)&&o.__esModule?o:{default:o};e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}},15:function(t,e,n){var o=n(3),r=n(5),i=n(28),u=n(10),c=n(7),s=function(t,e,n){var a,l,f,p=t&s.F,d=t&s.G,v=t&s.S,h=t&s.P,m=t&s.B,y=t&s.W,b=d?r:r[e]||(r[e]={}),g=b.prototype,x=d?o:v?o[e]:(o[e]||{}).prototype;for(a in d&&(n=e),n)(l=!p&&x&&void 0!==x[a])&&c(b,a)||(f=l?x[a]:n[a],b[a]=d&&"function"!=typeof x[a]?n[a]:m&&l?i(f,o):y&&x[a]==f?function(t){var e=function(e,n,o){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,o)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):h&&"function"==typeof f?i(Function.call,f):f,h&&((b.virtual||(b.virtual={}))[a]=f,t&s.R&&g&&!g[a]&&u(g,a,f)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},16:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},17:function(t,e){var n=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},172:function(t,e,n){"use strict";n.r(e);var o=n(55),r=n(0),i=Object(r.a)({name:"wv-popup",mixins:[o.a],props:{height:{type:[String,Number],default:"auto",validator:function(t){return/^(auto)|(\d+(px|vh|%)?)$/.test(t)}},mask:{default:!0},lockOnScroll:{default:!0},closeOnClickMask:{default:!0},maskClass:{default:"weui-mask"}},computed:{style:function(){var t={};return/^\d+$/.test(this.height)?t.height=parseInt(this.height)+"px":t.height=this.height,t}},mounted:function(){this.visible&&this.open()}}),u=(n(218),n(1)),c=Object(u.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{"enter-active-class":"weui-animate-slide-up","leave-active-class":"weui-animate-slide-down"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"wv-popup",style:this.style},[this._t("default")],2)])},[],!1,null,"47982284",null);e.default=c.exports},18:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},19:function(t,e,n){var o=n(6);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},2:function(e,n){e.exports=t},20:function(t,e,n){"use strict";n.d(e,"b",function(){return u}),n.d(e,"a",function(){return c});var o=n(0),r=!1;if(!o.c)try{var i={};Object.defineProperty(i,"passive",{get:function(){r=!0}}),window.addEventListener("test-passive",null,i)}catch(t){}function u(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];!o.c&&t.addEventListener(e,n,!!r&&{capture:!1,passive:i})}function c(t,e,n){!o.c&&t.removeEventListener(e,n)}},21:function(t,e){t.exports=!0},218:function(t,e,n){"use strict";var o=n(111);n.n(o).a},22:function(t,e,n){var o=n(6),r=n(3).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},23:function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},24:function(t,e,n){t.exports={default:n(50),__esModule:!0}},26:function(t,e,n){t.exports=!n(4)&&!n(8)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},27:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},28:function(t,e,n){var o=n(27);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},29:function(t,e,n){var o=n(34)("keys"),r=n(23);t.exports=function(t){return o[t]||(o[t]=r(t))}},3:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},30:function(t,e,n){var o=n(41),r=n(33);t.exports=Object.keys||function(t){return o(t,r)}},32:function(t,e){e.f={}.propertyIsEnumerable},33:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},34:function(t,e,n){var o=n(5),r=n(3),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:o.version,mode:n(21)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},35:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},36:function(t,e,n){"use strict";var o=n(0);e.a={debounce:function(t,e,n){var o=void 0,r=void 0,i=void 0,u=void 0,c=void 0;return function(){i=this,r=arguments,u=new Date;return o||(o=setTimeout(function n(){var s=new Date-u;s<e?o=setTimeout(n,e-s):(o=null,c=t.apply(i,r))},e)),c}},getScrollEventTarget:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,n=t;n&&"HTML"!==n.tagName&&"BODY"!==n.tagName&&1===n.nodeType&&n!==e;){var o=this.getComputedStyle(n).overflowY;if("scroll"===o||"auto"===o)return n;n=n.parentNode}return e},isAttached:function(t){for(var e=t.parentNode;e;){if("HTML"===e.tagName)return!0;if(11===e.nodeType)return!1;e=e.parentNode}return!1},getScrollTop:function(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset},setScrollTop:function(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)},getElementTop:function(t){return(t===window?0:t.getBoundingClientRect().top)+this.getScrollTop(window)},getVisibleHeight:function(t){return t===window?t.innerHeight:t.getBoundingClientRect().height},getComputedStyle:!o.c&&document.defaultView.getComputedStyle.bind(document.defaultView)}},37:function(t,e,n){var o=n(35);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},38:function(t,e){e.f=Object.getOwnPropertySymbols},4:function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},41:function(t,e,n){var o=n(7),r=n(12),i=n(46)(!1),u=n(29)("IE_PROTO");t.exports=function(t,e){var n,c=r(t),s=0,a=[];for(n in c)n!=u&&o(c,n)&&a.push(n);for(;e.length>s;)o(c,n=e[s++])&&(~i(a,n)||a.push(n));return a}},42:function(t,e,n){var o=n(18);t.exports=function(t){return Object(o(t))}},43:function(t,e,n){var o=n(17),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},45:function(t,e,n){var o=n(17),r=Math.max,i=Math.min;t.exports=function(t,e){return(t=o(t))<0?r(t+e,0):i(t,e)}},46:function(t,e,n){var o=n(12),r=n(43),i=n(45);t.exports=function(t){return function(e,n,u){var c,s=o(e),a=r(s.length),l=i(u,a);if(t&&n!=n){for(;a>l;)if((c=s[l++])!=c)return!0}else for(;a>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return!t&&-1}}},48:function(t,e,n){"use strict";var o=n(30),r=n(38),i=n(32),u=n(42),c=n(37),s=Object.assign;t.exports=!s||n(8)(function(){var t={},e={},n=Symbol(),o="abcdefghijklmnopqrst";return t[n]=7,o.split("").forEach(function(t){e[t]=t}),7!=s({},t)[n]||Object.keys(s({},e)).join("")!=o})?function(t,e){for(var n=u(t),s=arguments.length,a=1,l=r.f,f=i.f;s>a;)for(var p,d=c(arguments[a++]),v=l?o(d).concat(l(d)):o(d),h=v.length,m=0;h>m;)f.call(d,p=v[m++])&&(n[p]=d[p]);return n}:s},49:function(t,e,n){var o=n(15);o(o.S+o.F,"Object",{assign:n(48)})},5:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},50:function(t,e,n){n(49),t.exports=n(5).Object.assign},55:function(t,e,n){"use strict";var o=n(13),r=n.n(o),i=n(24),u=n.n(i),c=n(2),s=n.n(c),a={name:"modal",props:{visible:Boolean,zIndex:Number,className:String,customStyle:Object},computed:{style:function(){return r()({zIndex:this.zIndex},this.customStyle)}}},l=n(1),f=Object(l.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"wv-fade"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"wv-modal",class:t.className,style:t.style,on:{touchmove:function(t){t.preventDefault(),t.stopPropagation()},click:function(e){t.$emit("click",e)}}})])},[],!1,null,null,null).exports,p={idSeed:1,zIndex:2e3,stack:[],plusKey:function(t){return this[t]++},get top(){return this.stack[this.stack.length-1]}},d={className:"",customStyle:{}},v={open:function(t,e){if(!p.stack.some(function(e){return e.vm._popupId===t.popupId})){var n=t.$el,o=n&&n.parentNode&&11!==n.parentNode.nodeType?n.parentNode:document.body;p.stack.push({vm:t,config:e,targetNode:o}),this.update()}},close:function(t){var e=p.stack;e.length&&(p.top.vm._popupId===t?(e.pop(),this.update()):p.stack=e.filter(function(e){return e.vm._popupId!==t}))},update:function(){var t=p.modal;if(t||((t=new(s.a.extend(f))({el:document.createElement("div")})).$on("click",this.onClick),p.modal=t),t.$el.parentNode&&(t.visible=!1),p.top){var e=p.top,n=e.targetNode,o=e.config;n.appendChild(t.$el),u()(t,r()({},d,o,{visible:!0}))}},onClick:function(){if(p.top){var t=p.top.vm;t.$emit("click-mask"),t.closeOnClickMask&&t.close()}}},h=n(36),m=n(20);e.a={props:{visible:Boolean,mask:Boolean,maskStyle:Object,maskClass:String,closeOnClickMask:Boolean,zIndex:[String,Number],getContainer:Function,lockOnScroll:{type:Boolean,default:!0}},watch:{visible:function(t){this[t?"open":"close"]()},getContainer:function(){this.move()},mask:function(){this.renderMask()}},created:function(){this._popupId="popup-"+p.plusKey("idSeed"),this.pos={x:0,y:0}},mounted:function(){this.getContainer&&this.move(),this.visible&&this.open()},methods:{move:function(){this.getContainer?this.getContainer().appendChild(this.$el):this.$parent&&this.$parent.$el.appendChild(this.$el)},onTouchstart:function(t){this.pos={x:t.touches[0].clientX,y:t.touches[0].clientY}},onTouchmove:function(t){var e=this.pos,n=t.touches[0].clientX-e.x,o=t.touches[0].clientY-e.y,r=o>0?"10":"01",i=h.a.getScrollEventTarget(t.target,this.$el),u=i.scrollHeight,c=i.offsetHeight,s=i.scrollTop,a=Math.abs(n)<Math.abs(o),l="11";0===s?l=c>=u?"00":"01":s+c>=u&&(l="10"),"11"===l||!a||parseInt(l,2)&parseInt(r,2)||(t.preventDefault(),t.stopPropagation())},open:function(){this.$isServer||(void 0!==this.zIndex&&(p.zIndex=this.zIndex),this.lockOnScroll&&(document.body.classList.add("wv-overflow-hidden"),Object(m.b)(document,"touchstart",this.onTouchstart),Object(m.b)(document,"touchmove",this.onTouchmove)),this.renderMask(),this.$emit("update:visible",!0))},close:function(){this.lockOnScroll&&(document.body.classList.remove("wv-overflow-hidden"),Object(m.a)(document,"touchstart",this.onTouchstart),Object(m.a)(document,"touchmove",this.onTouchmove)),v.close(this._popupId),this.$emit("update:visible",!1)},renderMask:function(){this.mask?v.open(this,{zIndex:p.plusKey("zIndex"),className:this.maskClass,customStyle:this.maskStyle}):v.close(this._popupId),this.$el.style.zIndex=p.plusKey("zIndex")}},beforeDestroy:function(){this.close()}}},6:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},7:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},8:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},9:function(t,e,n){var o=n(11),r=n(26),i=n(19),u=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(o(t),e=i(e,!0),o(n),r)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}}})});

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "banner" },
        [
          _c(
            "wv-swipe",
            { attrs: { height: 250, auto: 4000 } },
            _vm._l(_vm.banners, function(banner) {
              return _c(
                "wv-swipe-item",
                { key: banner.index, staticClass: "banner-swipe-item" },
                [_c("img", { attrs: { src: banner.img, alt: "" } })]
              )
            })
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "details" }, [
        _c("div", { staticClass: "name" }, [_vm._v(_vm._s(_vm.product.name))]),
        _vm._v(" "),
        _c("div", { staticClass: "price" }, [_vm._v(_vm._s(_vm.product.price))])
      ]),
      _vm._v(" "),
      _c(
        "wv-group",
        [
          _c("wv-cell", {
            attrs: { title: "已选", value: _vm.amount + "件" },
            nativeOn: {
              click: function($event) {
                return _vm.showPopup($event)
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-popup",
        {
          model: {
            value: _vm.popupVisible,
            callback: function($$v) {
              _vm.popupVisible = $$v
            },
            expression: "popupVisible"
          }
        },
        [
          _c(
            "wv-group",
            [
              _c(
                "wv-cell",
                { attrs: { title: "数量" } },
                [
                  _c("wv-number-spinner", {
                    attrs: { slot: "ft", min: 1 },
                    slot: "ft",
                    model: {
                      value: _vm.amount,
                      callback: function($$v) {
                        _vm.amount = $$v
                      },
                      expression: "amount"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "popup-footer" }, [
            _c(
              "div",
              {
                staticClass: "btn popup-btn-add-cart",
                on: {
                  click: function($event) {
                    _vm.addToCart(_vm.product.id)
                    _vm.popupVisible = false
                  }
                }
              },
              [_vm._v("加入购物车")]
            )
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", {
        staticClass: "description",
        domProps: { innerHTML: _vm._s(_vm.product.description) }
      }),
      _vm._v(" "),
      _c(
        "footer",
        [
          _c(
            "div",
            {
              staticClass: "btn btn-favourite",
              on: {
                click: function($event) {
                  _vm.toggleFavourite(_vm.product.id)
                }
              }
            },
            [
              _c(
                "i",
                {
                  staticClass: "icon iconfont",
                  class: { "is-favourite": _vm.isFavourite }
                },
                [_vm._v(_vm._s(_vm.isFavourite ? "" : ""))]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "text" }, [
                _vm._v(_vm._s(_vm.isFavourite ? "已收藏" : "收藏"))
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "btn btn-cart", attrs: { to: "/cart" } },
            [
              _c("span", { staticClass: "amount" }, [
                _vm._v(_vm._s(_vm.productAmountInCart))
              ]),
              _vm._v(" "),
              _c("i", { staticClass: "icon iconfont" }, [_vm._v("")]),
              _vm._v(" "),
              _c("span", { staticClass: "text" }, [_vm._v("购物车")])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "btn-add-cart",
              on: {
                click: function($event) {
                  _vm.addToCart(_vm.product.id)
                }
              }
            },
            [_vm._v("加入购物车")]
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
    require("vue-hot-reload-api")      .rerender("data-v-0eb040b0", module.exports)
  }
}

/***/ })

});