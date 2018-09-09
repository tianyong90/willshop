webpackJsonp([7],{

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(632)
}
var normalizeComponent = __webpack_require__(604)
/* script */
var __vue_script__ = __webpack_require__(634)
/* template */
var __vue_template__ = __webpack_require__(635)
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
Component.options.__file = "resources/assets/js/shop/pages/category.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74d028e0", Component.options)
  } else {
    hotAPI.reload("data-v-74d028e0", Component.options)
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

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],t);else{var n="object"==typeof exports?t(require("vue")):t(e.Vue);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=290)}({0:function(e,t,n){"use strict";var r=n(2),o=n.n(r),i=n(3),s=function(e){return e.changedTouches[0]||e.touches[0]};n.d(t,"c",function(){return u}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var c,f="function"==typeof e?e.options:e;if(t&&(f.render=t,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),s?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},f._ssrRegister=c):o&&(c=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(f.functional){f._injectStyles=c;var a=f.render;f.render=function(e,t){return c.call(t),a(e,t)}}else{var p=f.beforeCreate;f.beforeCreate=p?[].concat(p,c):[c]}return{exports:e,options:f}}n.d(t,"a",function(){return r})},128:function(e,t,n){},2:function(t,n){t.exports=e},242:function(e,t,n){"use strict";var r=n(128);n.n(r).a},290:function(e,t,n){"use strict";n.r(t);var r=n(0),o=Object(r.a)({name:"swipe-item",data:function(){return{offset:0}},computed:{style:function(){return{width:this.$parent.width+"px",transform:"translate3d("+this.offset+"px, 0, 0)"}}},beforeCreate:function(){this.$parent&&this.$parent.swipes.push(this)},destroyed:function(){this.$parent&&this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)}}),i=(n(242),n(1)),s=Object(i.a)(o,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"wv-swipe-item",style:this.style},[this._t("default")],2)},[],!1,null,"ce4e3d68",null);s.options.__file="index.vue",t.default=s.exports},3:function(e,t,n){"use strict";var r=function(e){e.component(this.name,this)};t.a=function(e){return e.name="wv-"+e.name,e.mixins=e.mixins||[],e.components=e.components||{},e.install=e.install||r,e.methods=e.methods||{},e}}})});

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(13));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var i="object"==typeof exports?e(require("vue")):e(t.Vue);for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(window,function(t){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=296)}({0:function(t,e,i){"use strict";var n=i(2),o=i.n(n),r=i(3),s=function(t){return t.changedTouches[0]||t.touches[0]};i.d(e,"c",function(){return u}),i.d(e,"a",function(){return r.a}),i.d(e,"b",function(){return s});var u=o.a.prototype.$isServer},1:function(t,e,i){"use strict";function n(t,e,i,n,o,r,s,u){var a,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var h=c.render;c.render=function(t,e){return a.call(e),h(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,a):[a]}return{exports:t,options:c}}i.d(e,"a",function(){return n})},127:function(t,e,i){},2:function(e,i){e.exports=t},240:function(t,e,i){"use strict";var n=i(127);i.n(n).a},296:function(t,e,i){"use strict";i.r(e);var n=i(0),o=Object(n.a)({name:"swipe",props:{height:Number,autoplay:Number,defaultIndex:{type:Number,default:0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500},prevent:Boolean,noDragWhenSingle:{type:Boolean,default:!0}},data:function(){return{width:0,offset:0,startX:0,startY:0,active:0,deltaX:0,swipes:[],direction:"",currentDuration:0}},mounted:function(){this.initialize()},destroyed:function(){clearTimeout(this.timer)},watch:{swipes:function(){this.initialize()},defaultIndex:function(){this.initialize()}},computed:{count:function(){return this.swipes.length},wrapperStyle:function(){var t={paddingLeft:this.count>1?this.width+"px":0,width:this.count>1?(this.count+2)*this.width+"px":"100%",transitionDuration:this.currentDuration+"ms",transform:"translate3d("+this.offset+"px, 0, 0)"};return this.height&&(t.height=this.height+"px"),t},activeIndicator:function(){return(this.active+this.count)%this.count}},methods:{initialize:function(){clearTimeout(this.timer),this.width=this.$el.getBoundingClientRect().width,this.active=this.defaultIndex,this.currentDuration=0,this.offset=this.count>1?-this.width*(this.active+1):0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onTouchstart:function(t){if(1!==this.count||!this.noDragWhenSingle){clearTimeout(this.timer);var e=Object(n.b)(t);this.deltaX=0,this.direction="",this.currentDuration=0,this.startX=e.clientX,this.startY=e.clientY,this.active<=-1&&this.move(this.count),this.active>=this.count&&this.move(-this.count)}},onTouchmove:function(t){this.prevent&&t.preventDefault();var e=Object(n.b)(t);this.deltaX=e.clientX-this.startX;var i=e.clientY-this.startY;if(1===this.count){if(this.noDragWhenSingle)return;this.offset=this.range(this.deltaX,[-20,20])}else this.count>1&&Math.abs(this.deltaX)>Math.abs(i)&&this.move(0,this.range(this.deltaX,[-this.width,this.width]))},onTouchend:function(){if(1===this.count){if(this.noDragWhenSingle)return;this.offset=0,this.currentDuration=this.duration}else this.deltaX&&(this.move(Math.abs(this.deltaX)>50?this.deltaX>0?-1:1:0),this.currentDuration=this.duration),this.autoPlay()},move:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.active,n=this.count,o=this.swipes,r=this.deltaX,s=this.width;t?(-1===i&&(o[n-1].offset=0),o[0].offset=i===n-1&&t>0?n*s:0,this.active+=t):0===i?o[n-1].offset=r>0?-n*s:0:i===n-1&&(o[0].offset=r<0?n*s:0),this.offset=e-(this.active+1)*this.width},autoPlay:function(){var t=this,e=this.autoplay;e&&this.count>1&&(clearTimeout(this.timer),this.timer=setTimeout(function(){t.currentDuration=0,t.active>=t.count&&t.move(-t.count),setTimeout(function(){t.currentDuration=t.duration,t.move(1),t.autoPlay()},30)},e))},range:function(t,e){return Math.min(Math.max(t,e[0]),e[1])}}}),r=(i(240),i(1)),s=Object(r.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wv-swipe",on:{touchstart:t.onTouchstart,touchmove:t.onTouchmove,touchend:t.onTouchend,touchcancel:t.onTouchend}},[i("div",{staticClass:"wv-swipe__wrapper",style:t.wrapperStyle,on:{transitionend:function(e){t.$emit("change",t.activeIndicator)}}},[t._t("default")],2),t._v(" "),t.showIndicators&&t.count>1?i("div",{staticClass:"wv-swipe__indicators"},t._l(t.count,function(e){return i("i",{key:e,class:{"wv-swipe__indicator--active":e-1===t.activeIndicator}})})):t._e()])},[],!1,null,"088711cb",null);s.options.__file="index.vue",e.default=s.exports},3:function(t,e,i){"use strict";var n=function(t){t.component(this.name,this)};e.a=function(t){return t.name="wv-"+t.name,t.mixins=t.mixins||[],t.components=t.components||{},t.install=t.install||n,t.methods=t.methods||{},t}}})});

/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(633);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(605)("12a25cc6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74d028e0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74d028e0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(574)(false);
// imports


// module
exports.push([module.i, "\n.left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll;\n}\n.left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6;\n}\n.left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red;\n}\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem;\n}\n.right-panel .product-list {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    width: 100%;\n    -webkit-column-count: 2;\n            column-count: 2;\n}\n.right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px;\n}\n.right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%;\n}\n.right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n.right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px;\n}\n", ""]);

// exports


/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_price_filter__ = __webpack_require__(617);


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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default.a), _components),

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_price_filter__["a" /* default */]],

  data: function data() {
    return {
      categories: [],
      activeCategoryId: null,
      products: []
    };
  },
  mounted: function mounted() {
    this.getCategories();
  },


  methods: {
    getCategories: function getCategories() {
      var _this = this;

      this.axios.get('product-categories').then(function (response) {
        _this.categories = response.data.categories;

        _this.activeCategoryId = _this.categories[0].id;
      });
    },
    getProducts: function getProducts(categoryId) {
      var _this2 = this;

      this.axios.get('product', {
        params: {
          categoryId: categoryId
        }
      }).then(function (response) {
        _this2.products = response.data.products;
      }).catch(function (error) {
        console.log(error);
      });
    },
    sidebarItemClick: function sidebarItemClick(categoryId) {
      if (this.activeCategoryId !== categoryId) this.activeCategoryId = categoryId;
    }
  },

  watch: {
    activeCategoryId: function activeCategoryId(val) {
      this.getProducts(val);
    }
  }
});

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left-sidebar" },
      _vm._l(_vm.categories, function(category) {
        return _c(
          "div",
          {
            key: category.id,
            staticClass: "sidebar-item",
            class: { active: category.id === _vm.activeCategoryId },
            on: {
              click: function($event) {
                _vm.sidebarItemClick(category.id)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(category.name) + "\n    ")]
        )
      })
    ),
    _vm._v(" "),
    _c("div", { staticClass: "right-panel" }, [
      _c("img", {
        staticClass: "banner",
        attrs: { src: "http://lorempixel.com/640/150/?28423", alt: "" }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.products.data, function(product) {
          return _c(
            "router-link",
            {
              key: product.id,
              staticClass: "product-item",
              attrs: { to: "/product/1" }
            },
            [
              _c("img", {
                staticClass: "thumbnail",
                attrs: { src: product.thumbnail, alt: "" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "name" }, [
                _vm._v(_vm._s(product.name))
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "price" }, [
                _vm._v(_vm._s(_vm._f("priceFilter")(product.price)))
              ])
            ]
          )
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-74d028e0", module.exports)
  }
}

/***/ })

});