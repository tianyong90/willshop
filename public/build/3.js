webpackJsonp([3],{

/***/ 196:
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

var listToStyles = __webpack_require__(246)

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

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

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
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

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

/***/ 197:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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

/***/ 246:
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

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(663)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(665)
/* template */
var __vue_template__ = __webpack_require__(667)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\shop\\pages\\order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4dc33c17", Component.options)
  } else {
    hotAPI.reload("data-v-4dc33c17", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(584);

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

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(585), __esModule: true };

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(586);
var $Object = __webpack_require__(14).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(28);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(29), 'Object', { defineProperty: __webpack_require__(42).f });


/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(588);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 589:
/***/ (function(module, exports) {

module.exports=function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=120)}({0:function(t,e){t.exports=function(t,e,n,r,i){var s,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(s=t,o=t.default);var a="function"==typeof o?o.options:o;e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),r&&(a._scopeId=r);var u;if(i?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},a._ssrRegister=u):n&&(u=n),u){var l=a.functional,d=l?a.render:a.beforeCreate;l?a.render=function(t,e){return u.call(e),d(t,e)}:a.beforeCreate=d?[].concat(d,u):[u]}return{esModule:s,exports:o,options:a}}},120:function(t,e,n){t.exports=n(35)},35:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(36),i=n.n(r);n.d(e,"default",function(){return i.a})},36:function(t,e,n){function r(t){n(37)}var i=n(0)(n(38),n(39),r,"data-v-f465322a",null);t.exports=i.exports},37:function(t,e){},38:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"wv-cell",props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean,to:String},computed:{href:function(){var t=this;if(this.to&&!this.added&&this.$router){var e=this.$router.match(this.to);return e.matched.length?(this.$nextTick(function(){t.added=!0,t.$el.addEventListener("click",t.handleClick)}),e.path):this.to}return this.to}},mounted:function(){this.$on("CLICK_IN_CELLSWIPE",this.handleClick)},methods:{handleClick:function(t){t.preventDefault(),void 0!==this.href&&this.$router.push(this.href)}}}},39:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.to?n("a",{staticClass:"weui-cell",class:{"weui-cell_access":t.isLink},attrs:{href:t.href}},[n("div",{staticClass:"weui-cell_hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"weui-cell__bd"},[t._t("bd",[n("p",{domProps:{innerHTML:t._s(t.title)}})])],2),t._v(" "),n("div",{staticClass:"weui-cell__ft"},[t._t("ft",[t._v(t._s(t.value))])],2)]):n("div",{staticClass:"weui-cell",class:{"weui-cell_access":t.isLink}},[n("div",{staticClass:"weui-cell_hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"weui-cell__bd"},[t._t("bd",[n("p",{domProps:{innerHTML:t._s(t.title)}})])],2),t._v(" "),n("div",{staticClass:"weui-cell__ft"},[t._t("ft",[t._v(t._s(t.value))])],2)])},staticRenderFns:[]}}});

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(591);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 592:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=114)}({0:function(e,t){e.exports=function(e,t,n,r,o){var i,s=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(i=e,s=e.default);var c="function"==typeof s?s.options:s;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns),r&&(c._scopeId=r);var a;if(o?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},c._ssrRegister=a):n&&(a=n),a){var l=c.functional,f=l?c.render:c.beforeCreate;l?c.render=function(e,t){return a.call(t),f(e,t)}:c.beforeCreate=f?[].concat(f,a):[a]}return{esModule:i,exports:s,options:c}}},114:function(e,t,n){e.exports=n(115)},115:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(116),o=n.n(r);n.d(t,"default",function(){return o.a})},116:function(e,t,n){function r(e){n(117)}var o=n(0)(n(118),n(119),r,"data-v-16e4b6eb",null);e.exports=o.exports},117:function(e,t){},118:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-group",props:{title:String,titleColor:String}}},119:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.title?n("div",{staticClass:"weui-cells__title",style:{color:e.titleColor},domProps:{innerHTML:e._s(e.title)}}):e._e(),e._v(" "),n("div",{staticClass:"weui-cells"},[e._t("default")],2)])},staticRenderFns:[]}}});

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  filters: {
    priceFilter: function priceFilter(val) {
      return '￥' + Number(val).toFixed(2);
    }
  }
};

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(595);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 596:
/***/ (function(module, exports) {

module.exports=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=108)}({0:function(e,t){e.exports=function(e,t,n,i,o){var r,s=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(r=e,s=e.default);var u="function"==typeof s?s.options:s;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns),i&&(u._scopeId=i);var c;if(o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=c):n&&(c=n),c){var d=u.functional,l=d?u.render:u.beforeCreate;d?u.render=function(e,t){return c.call(t),l(e,t)}:u.beforeCreate=l?[].concat(l,c):[c]}return{esModule:r,exports:s,options:u}}},108:function(e,t,n){e.exports=n(109)},109:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(110),o=n.n(i);n.d(t,"default",function(){return o.a})},110:function(e,t,n){function i(e){n(111)}var o=n(0)(n(112),n(113),i,"data-v-54a55bab",null);e.exports=o.exports},111:function(e,t){},112:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-button",props:{type:{type:String,default:"default"},isLoading:Boolean,disabled:Boolean,mini:Boolean,plain:Boolean},methods:{handleClick:function(e){this.$emit("click",e)}},computed:{classObject:function(){var e={},t=this.plain?"weui-btn_plain-"+this.type:"weui-btn_"+this.type,n=this.plain?"weui-btn_plain-disabled":"weui-btn_disabled";return e[t]=!0,e[n]=this.disabled,e["weui-btn_loading"]=this.isLoading,e["weui-btn_mini"]=this.mini,e}}}},113:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"weui-btn",class:e.classObject,attrs:{disabled:e.disabled},on:{click:e.handleClick}},[e.isLoading?n("i",{staticClass:"weui-loading"}):e._e(),e._v(" "),e._t("default")],2)},staticRenderFns:[]}}});

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(605);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 606:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=283)}({0:function(e,t){e.exports=function(e,t,n,r,o){var u,i=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(u=e,i=e.default);var f="function"==typeof i?i.options:i;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns),r&&(f._scopeId=r);var a;if(o?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},f._ssrRegister=a):n&&(a=n),a){var c=f.functional,d=c?f.render:f.beforeCreate;c?f.render=function(e,t){return a.call(t),d(e,t)}:f.beforeCreate=d?[].concat(d,a):[a]}return{esModule:u,exports:i,options:f}}},283:function(e,t,n){e.exports=n(284)},284:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(285),o=n.n(r);n.d(t,"default",function(){return o.a})},285:function(e,t,n){function r(e){n(286)}var o=n(0)(n(287),n(288),r,"data-v-8776b68a",null);e.exports=o.exports},286:function(e,t){},287:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-flex-item",props:{flex:{type:[Number,String],default:1}},computed:{gutter:function(){return this.$parent.gutter},style:function(){var e={};return this.gutter&&(e.paddingLeft=this.gutter/2+"px",e.paddingRight=e.paddingLeft),e.flex=this.flex,e}}}},288:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex__item",style:e.style},[e._t("default")],2)},staticRenderFns:[]}}});

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(608);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 609:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=277)}({0:function(e,t){e.exports=function(e,t,n,r,o){var u,s=e=e||{},i=typeof e.default;"object"!==i&&"function"!==i||(u=e,s=e.default);var a="function"==typeof s?s.options:s;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),r&&(a._scopeId=r);var f;if(o?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},a._ssrRegister=f):n&&(f=n),f){var c=a.functional,d=c?a.render:a.beforeCreate;c?a.render=function(e,t){return f.call(t),d(e,t)}:a.beforeCreate=d?[].concat(d,f):[f]}return{esModule:u,exports:s,options:a}}},277:function(e,t,n){e.exports=n(278)},278:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(279),o=n.n(r);n.d(t,"default",function(){return o.a})},279:function(e,t,n){function r(e){n(280)}var o=n(0)(n(281),n(282),r,"data-v-f1ee856a",null);e.exports=o.exports},280:function(e,t){},281:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-flex",props:{gutter:{type:Number,default:0}},computed:{style:function(){var e={};if(this.gutter){var t="-"+this.gutter/2+"px";e.marginLeft=t,e.marginRight=t}return e}}}},282:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex",style:e.style},[e._t("default")],2)},staticRenderFns:[]}}});

/***/ }),

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(664);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("e2ddf426", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4dc33c17\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4dc33c17\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.status-bar {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px;\n}\n.status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em;\n}\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.product-list .product-item {\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n.product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px;\n}\n.product-list .product-item .item-right {\n      display: flex;\n      flex-direction: column;\n      padding: 0 14px;\n      justify-content: space-between;\n}\n.product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500;\n}\n.product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888;\n}\n.product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px;\n}\n.product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em;\n}\n.fee-info {\n  margin-bottom: 70px;\n}\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\nfooter .weui-flex__item {\n    display: flex;\n    justify-content: center;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/pages/order.vue"],"names":[],"mappings":";AAAA;EACE,cAAc;EACd,YAAY;EACZ,aAAa;EACb,8DAA8D;EAC9D,eAAe;EACf,oBAAoB;CAAE;AACtB;IACE,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;CAAE;AAEvB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,cAAc;EACd,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;CAAE;AACzB;IACE,cAAc;IACd,aAAa;IACb,iCAAiC;IACjC,mBAAmB;CAAE;AACrB;MACE,YAAY;MACZ,aAAa;CAAE;AACjB;MACE,cAAc;MACd,uBAAuB;MACvB,gBAAgB;MAChB,+BAA+B;CAAE;AACjC;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;QAChB,iBAAiB;CAAE;AACrB;QACE,eAAe;QACf,gBAAgB;QAChB,YAAY;CAAE;AAChB;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;CAAE;AACpB;QACE,gBAAgB;QAChB,mBAAmB;QACnB,YAAY;QACZ,aAAa;QACb,uBAAuB;QACvB,iBAAiB;QACjB,cAAc;QACd,mBAAmB;CAAE;AAE7B;EACE,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,oBAAoB;EACpB,0BAA0B;CAAE;AAC5B;IACE,cAAc;IACd,wBAAwB;CAAE","file":"order.vue","sourcesContent":[".status-bar {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px; }\n  .status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em; }\n\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px; }\n\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff; }\n  .product-list .product-item {\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative; }\n    .product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px; }\n    .product-list .product-item .item-right {\n      display: flex;\n      flex-direction: column;\n      padding: 0 14px;\n      justify-content: space-between; }\n      .product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500; }\n      .product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888; }\n      .product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px; }\n      .product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em; }\n\n.fee-info {\n  margin-bottom: 70px; }\n\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem); }\n  footer .weui-flex__item {\n    display: flex;\n    justify-content: center; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(583);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _style = __webpack_require__(604);

var _style2 = _interopRequireDefault(_style);

var _flexItem = __webpack_require__(606);

var _flexItem2 = _interopRequireDefault(_flexItem);

var _style3 = __webpack_require__(607);

var _style4 = _interopRequireDefault(_style3);

var _flex = __webpack_require__(609);

var _flex2 = _interopRequireDefault(_flex);

var _style5 = __webpack_require__(594);

var _style6 = _interopRequireDefault(_style5);

var _button = __webpack_require__(596);

var _button2 = _interopRequireDefault(_button);

var _style7 = __webpack_require__(587);

var _style8 = _interopRequireDefault(_style7);

var _cell = __webpack_require__(589);

var _cell2 = _interopRequireDefault(_cell);

var _style9 = __webpack_require__(590);

var _style10 = _interopRequireDefault(_style9);

var _group = __webpack_require__(592);

var _group2 = _interopRequireDefault(_group);

var _components;

var _price_filter = __webpack_require__(593);

var _price_filter2 = _interopRequireDefault(_price_filter);

var _status_filter = __webpack_require__(666);

var _status_filter2 = _interopRequireDefault(_status_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: (_components = {}, (0, _defineProperty3.default)(_components, _group2.default.name, _group2.default), (0, _defineProperty3.default)(_components, _cell2.default.name, _cell2.default), (0, _defineProperty3.default)(_components, _button2.default.name, _button2.default), (0, _defineProperty3.default)(_components, _flex2.default.name, _flex2.default), (0, _defineProperty3.default)(_components, _flexItem2.default.name, _flexItem2.default), _components),

  mixins: [_price_filter2.default, _status_filter2.default],

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
};

/***/ }),

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
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
};

/***/ }),

/***/ 667:
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
          _c("wv-cell", { attrs: { title: "订单号", value: _vm.order.number } }),
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
          _c("wv-cell", { attrs: { title: "运费", value: _vm.order.total_fee } })
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
                              _vm.cancelOrder($event)
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
                              _vm.deleteOrder($event)
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
     require("vue-hot-reload-api").rerender("data-v-4dc33c17", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL3N0eWxlLmNzcz83NzQxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzP2M0MDgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9taXhpbnMvcHJpY2VfZmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2J1dHRvbi9zdHlsZS5jc3M/NTg4YSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9idXR0b24vc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2J1dHRvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9mbGV4LWl0ZW0vc3R5bGUuY3NzPzY2MTciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9mbGV4LWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC9zdHlsZS5jc3M/NDQ5YSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9mbGV4L3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9mbGV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWU/ZmEwYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlPzJmMTMiLCJ3ZWJwYWNrOi8vL29yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3N0YXR1c19maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT85MTIyIl0sIm5hbWVzIjpbImZpbHRlcnMiLCJwcmljZUZpbHRlciIsInZhbCIsIk51bWJlciIsInRvRml4ZWQiLCJzdGF0dXNGaWx0ZXIiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0TkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAyMyIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00ZGMzM2MxN1xcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9vcmRlci52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFxcXCJzeW50YXgtZHluYW1pYy1pbXBvcnRcXFwiLFtcXFwiY29tcG9uZW50XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjp0cnVlfV1dXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL29yZGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGRjMzNjMTdcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vb3JkZXIudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxwYWdlc1xcXFxvcmRlci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIG9yZGVyLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ZGMzM2MxN1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRkYzMzYzE3XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA1NzRcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBpPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiB0W3JdLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLGUpLGkubD0hMCxpLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuZD1mdW5jdGlvbih0LG4scil7ZS5vKHQsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfSxlLnA9XCJcIixlKGUucz0xMjApfSh7MDpmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixyLGkpe3ZhciBzLG89dD10fHx7fSxjPXR5cGVvZiB0LmRlZmF1bHQ7XCJvYmplY3RcIiE9PWMmJlwiZnVuY3Rpb25cIiE9PWN8fChzPXQsbz10LmRlZmF1bHQpO3ZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIG8/by5vcHRpb25zOm87ZSYmKGEucmVuZGVyPWUucmVuZGVyLGEuc3RhdGljUmVuZGVyRm5zPWUuc3RhdGljUmVuZGVyRm5zKSxyJiYoYS5fc2NvcGVJZD1yKTt2YXIgdTtpZihpPyh1PWZ1bmN0aW9uKHQpe3Q9dHx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LHR8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwodD1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxuJiZuLmNhbGwodGhpcyx0KSx0JiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cyYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxhLl9zc3JSZWdpc3Rlcj11KTpuJiYodT1uKSx1KXt2YXIgbD1hLmZ1bmN0aW9uYWwsZD1sP2EucmVuZGVyOmEuYmVmb3JlQ3JlYXRlO2w/YS5yZW5kZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdS5jYWxsKGUpLGQodCxlKX06YS5iZWZvcmVDcmVhdGU9ZD9bXS5jb25jYXQoZCx1KTpbdV19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czpvLG9wdGlvbnM6YX19fSwxMjA6ZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDM1KX0sMzU6ZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMzYpLGk9bi5uKHIpO24uZChlLFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGkuYX0pfSwzNjpmdW5jdGlvbih0LGUsbil7ZnVuY3Rpb24gcih0KXtuKDM3KX12YXIgaT1uKDApKG4oMzgpLG4oMzkpLHIsXCJkYXRhLXYtZjQ2NTMyMmFcIixudWxsKTt0LmV4cG9ydHM9aS5leHBvcnRzfSwzNzpmdW5jdGlvbih0LGUpe30sMzg6ZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUuZGVmYXVsdD17bmFtZTpcInd2LWNlbGxcIixwcm9wczp7dGl0bGU6e3R5cGU6W1N0cmluZyxOdW1iZXJdfSx2YWx1ZTp7dHlwZTpbU3RyaW5nLE51bWJlcl19LGlzTGluazpCb29sZWFuLHRvOlN0cmluZ30sY29tcHV0ZWQ6e2hyZWY6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO2lmKHRoaXMudG8mJiF0aGlzLmFkZGVkJiZ0aGlzLiRyb3V0ZXIpe3ZhciBlPXRoaXMuJHJvdXRlci5tYXRjaCh0aGlzLnRvKTtyZXR1cm4gZS5tYXRjaGVkLmxlbmd0aD8odGhpcy4kbmV4dFRpY2soZnVuY3Rpb24oKXt0LmFkZGVkPSEwLHQuJGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHQuaGFuZGxlQ2xpY2spfSksZS5wYXRoKTp0aGlzLnRvfXJldHVybiB0aGlzLnRvfX0sbW91bnRlZDpmdW5jdGlvbigpe3RoaXMuJG9uKFwiQ0xJQ0tfSU5fQ0VMTFNXSVBFXCIsdGhpcy5oYW5kbGVDbGljayl9LG1ldGhvZHM6e2hhbmRsZUNsaWNrOmZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSx2b2lkIDAhPT10aGlzLmhyZWYmJnRoaXMuJHJvdXRlci5wdXNoKHRoaXMuaHJlZil9fX19LDM5OmZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dC4kY3JlYXRlRWxlbWVudCxuPXQuX3NlbGYuX2N8fGU7cmV0dXJuIHQudG8/bihcImFcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxcIixjbGFzczp7XCJ3ZXVpLWNlbGxfYWNjZXNzXCI6dC5pc0xpbmt9LGF0dHJzOntocmVmOnQuaHJlZn19LFtuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX2hkXCJ9LFt0Ll90KFwiaWNvblwiKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fYmRcIn0sW3QuX3QoXCJiZFwiLFtuKFwicFwiLHtkb21Qcm9wczp7aW5uZXJIVE1MOnQuX3ModC50aXRsZSl9fSldKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fZnRcIn0sW3QuX3QoXCJmdFwiLFt0Ll92KHQuX3ModC52YWx1ZSkpXSldLDIpXSk6bihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbFwiLGNsYXNzOntcIndldWktY2VsbF9hY2Nlc3NcIjp0LmlzTGlua319LFtuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX2hkXCJ9LFt0Ll90KFwiaWNvblwiKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fYmRcIn0sW3QuX3QoXCJiZFwiLFtuKFwicFwiLHtkb21Qcm9wczp7aW5uZXJIVE1MOnQuX3ModC50aXRsZSl9fSldKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fZnRcIn0sW3QuX3QoXCJmdFwiLFt0Ll92KHQuX3ModC52YWx1ZSkpXSldLDIpXSl9LHN0YXRpY1JlbmRlckZuczpbXX19fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCJtb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MTE0KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaSxzPWU9ZXx8e30sdT10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT11JiZcImZ1bmN0aW9uXCIhPT11fHwoaT1lLHM9ZS5kZWZhdWx0KTt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzP3Mub3B0aW9uczpzO3QmJihjLnJlbmRlcj10LnJlbmRlcixjLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyksciYmKGMuX3Njb3BlSWQ9cik7dmFyIGE7aWYobz8oYT1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksbiYmbi5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChvKX0sYy5fc3NyUmVnaXN0ZXI9YSk6biYmKGE9biksYSl7dmFyIGw9Yy5mdW5jdGlvbmFsLGY9bD9jLnJlbmRlcjpjLmJlZm9yZUNyZWF0ZTtsP2MucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGEuY2FsbCh0KSxmKGUsdCl9OmMuYmVmb3JlQ3JlYXRlPWY/W10uY29uY2F0KGYsYSk6W2FdfXJldHVybntlc01vZHVsZTppLGV4cG9ydHM6cyxvcHRpb25zOmN9fX0sMTE0OmZ1bmN0aW9uKGUsdCxuKXtlLmV4cG9ydHM9bigxMTUpfSwxMTU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMTE2KSxvPW4ubihyKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBvLmF9KX0sMTE2OmZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiByKGUpe24oMTE3KX12YXIgbz1uKDApKG4oMTE4KSxuKDExOSkscixcImRhdGEtdi0xNmU0YjZlYlwiLG51bGwpO2UuZXhwb3J0cz1vLmV4cG9ydHN9LDExNzpmdW5jdGlvbihlLHQpe30sMTE4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmRlZmF1bHQ9e25hbWU6XCJ3di1ncm91cFwiLHByb3BzOnt0aXRsZTpTdHJpbmcsdGl0bGVDb2xvcjpTdHJpbmd9fX0sMTE5OmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudCxuPWUuX3NlbGYuX2N8fHQ7cmV0dXJuIG4oXCJkaXZcIixbZS50aXRsZT9uKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsc19fdGl0bGVcIixzdHlsZTp7Y29sb3I6ZS50aXRsZUNvbG9yfSxkb21Qcm9wczp7aW5uZXJIVE1MOmUuX3MoZS50aXRsZSl9fSk6ZS5fZSgpLGUuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxzXCJ9LFtlLl90KFwiZGVmYXVsdFwiKV0sMildKX0sc3RhdGljUmVuZGVyRm5zOltdfX19KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGZpbHRlcnM6IHtcclxuICAgIHByaWNlRmlsdGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiAn77+lJyArIE51bWJlcih2YWwpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9wcmljZV9maWx0ZXIuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2J1dHRvbi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA1IDciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9idXR0b24vc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1OTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNSA3IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChpKXtpZihuW2ldKXJldHVybiBuW2ldLmV4cG9ydHM7dmFyIG89bltpXT17aTppLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbaV0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixpKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Oml9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTEwOCl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLGksbyl7dmFyIHIscz1lPWV8fHt9LGE9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09YSYmXCJmdW5jdGlvblwiIT09YXx8KHI9ZSxzPWUuZGVmYXVsdCk7dmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zLm9wdGlvbnM6czt0JiYodS5yZW5kZXI9dC5yZW5kZXIsdS5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLGkmJih1Ll9zY29wZUlkPWkpO3ZhciBjO2lmKG8/KGM9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LHUuX3NzclJlZ2lzdGVyPWMpOm4mJihjPW4pLGMpe3ZhciBkPXUuZnVuY3Rpb25hbCxsPWQ/dS5yZW5kZXI6dS5iZWZvcmVDcmVhdGU7ZD91LnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCksbChlLHQpfTp1LmJlZm9yZUNyZWF0ZT1sP1tdLmNvbmNhdChsLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6cixleHBvcnRzOnMsb3B0aW9uczp1fX19LDEwODpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMTA5KX0sMTA5OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgaT1uKDExMCksbz1uLm4oaSk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDExMDpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gaShlKXtuKDExMSl9dmFyIG89bigwKShuKDExMiksbigxMTMpLGksXCJkYXRhLXYtNTRhNTViYWJcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwxMTE6ZnVuY3Rpb24oZSx0KXt9LDExMjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3YtYnV0dG9uXCIscHJvcHM6e3R5cGU6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJkZWZhdWx0XCJ9LGlzTG9hZGluZzpCb29sZWFuLGRpc2FibGVkOkJvb2xlYW4sbWluaTpCb29sZWFuLHBsYWluOkJvb2xlYW59LG1ldGhvZHM6e2hhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe3RoaXMuJGVtaXQoXCJjbGlja1wiLGUpfX0sY29tcHV0ZWQ6e2NsYXNzT2JqZWN0OmZ1bmN0aW9uKCl7dmFyIGU9e30sdD10aGlzLnBsYWluP1wid2V1aS1idG5fcGxhaW4tXCIrdGhpcy50eXBlOlwid2V1aS1idG5fXCIrdGhpcy50eXBlLG49dGhpcy5wbGFpbj9cIndldWktYnRuX3BsYWluLWRpc2FibGVkXCI6XCJ3ZXVpLWJ0bl9kaXNhYmxlZFwiO3JldHVybiBlW3RdPSEwLGVbbl09dGhpcy5kaXNhYmxlZCxlW1wid2V1aS1idG5fbG9hZGluZ1wiXT10aGlzLmlzTG9hZGluZyxlW1wid2V1aS1idG5fbWluaVwiXT10aGlzLm1pbmksZX19fX0sMTEzOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudCxuPWUuX3NlbGYuX2N8fHQ7cmV0dXJuIG4oXCJidXR0b25cIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWJ0blwiLGNsYXNzOmUuY2xhc3NPYmplY3QsYXR0cnM6e2Rpc2FibGVkOmUuZGlzYWJsZWR9LG9uOntjbGljazplLmhhbmRsZUNsaWNrfX0sW2UuaXNMb2FkaW5nP24oXCJpXCIse3N0YXRpY0NsYXNzOlwid2V1aS1sb2FkaW5nXCJ9KTplLl9lKCksZS5fdihcIiBcIiksZS5fdChcImRlZmF1bHRcIildLDIpfSxzdGF0aWNSZW5kZXJGbnM6W119fX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvYnV0dG9uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNSA3IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9mbGV4LWl0ZW0vc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA2MDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgtaXRlbS9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI4Myl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIHUsaT1lPWV8fHt9LHM9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09cyYmXCJmdW5jdGlvblwiIT09c3x8KHU9ZSxpPWUuZGVmYXVsdCk7dmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pLm9wdGlvbnM6aTt0JiYoZi5yZW5kZXI9dC5yZW5kZXIsZi5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLHImJihmLl9zY29wZUlkPXIpO3ZhciBhO2lmKG8/KGE9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LGYuX3NzclJlZ2lzdGVyPWEpOm4mJihhPW4pLGEpe3ZhciBjPWYuZnVuY3Rpb25hbCxkPWM/Zi5yZW5kZXI6Zi5iZWZvcmVDcmVhdGU7Yz9mLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksZChlLHQpfTpmLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGEpOlthXX1yZXR1cm57ZXNNb2R1bGU6dSxleHBvcnRzOmksb3B0aW9uczpmfX19LDI4MzpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMjg0KX0sMjg0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI4NSksbz1uLm4ocik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDI4NTpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlKXtuKDI4Nil9dmFyIG89bigwKShuKDI4NyksbigyODgpLHIsXCJkYXRhLXYtODc3NmI2OGFcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwyODY6ZnVuY3Rpb24oZSx0KXt9LDI4NzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3YtZmxleC1pdGVtXCIscHJvcHM6e2ZsZXg6e3R5cGU6W051bWJlcixTdHJpbmddLGRlZmF1bHQ6MX19LGNvbXB1dGVkOntndXR0ZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kcGFyZW50Lmd1dHRlcn0sc3R5bGU6ZnVuY3Rpb24oKXt2YXIgZT17fTtyZXR1cm4gdGhpcy5ndXR0ZXImJihlLnBhZGRpbmdMZWZ0PXRoaXMuZ3V0dGVyLzIrXCJweFwiLGUucGFkZGluZ1JpZ2h0PWUucGFkZGluZ0xlZnQpLGUuZmxleD10aGlzLmZsZXgsZX19fX0sMjg4OmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWZsZXhfX2l0ZW1cIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxzdGF0aWNSZW5kZXJGbnM6W119fX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI3Nyl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIHUscz1lPWV8fHt9LGk9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09aSYmXCJmdW5jdGlvblwiIT09aXx8KHU9ZSxzPWUuZGVmYXVsdCk7dmFyIGE9XCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zLm9wdGlvbnM6czt0JiYoYS5yZW5kZXI9dC5yZW5kZXIsYS5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLHImJihhLl9zY29wZUlkPXIpO3ZhciBmO2lmKG8/KGY9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LGEuX3NzclJlZ2lzdGVyPWYpOm4mJihmPW4pLGYpe3ZhciBjPWEuZnVuY3Rpb25hbCxkPWM/YS5yZW5kZXI6YS5iZWZvcmVDcmVhdGU7Yz9hLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBmLmNhbGwodCksZChlLHQpfTphLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGYpOltmXX1yZXR1cm57ZXNNb2R1bGU6dSxleHBvcnRzOnMsb3B0aW9uczphfX19LDI3NzpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMjc4KX0sMjc4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI3OSksbz1uLm4ocik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDI3OTpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlKXtuKDI4MCl9dmFyIG89bigwKShuKDI4MSksbigyODIpLHIsXCJkYXRhLXYtZjFlZTg1NmFcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwyODA6ZnVuY3Rpb24oZSx0KXt9LDI4MTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3YtZmxleFwiLHByb3BzOntndXR0ZXI6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH19LGNvbXB1dGVkOntzdHlsZTpmdW5jdGlvbigpe3ZhciBlPXt9O2lmKHRoaXMuZ3V0dGVyKXt2YXIgdD1cIi1cIit0aGlzLmd1dHRlci8yK1wicHhcIjtlLm1hcmdpbkxlZnQ9dCxlLm1hcmdpblJpZ2h0PXR9cmV0dXJuIGV9fX19LDI4MjpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuKGUuX3NlbGYuX2N8fHQpKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1mbGV4XCIsc3R5bGU6ZS5zdHlsZX0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKX0sc3RhdGljUmVuZGVyRm5zOltdfX19KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyA0IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTRkYzMzYzE3XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL29yZGVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiZTJkZGY0MjZcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGRjMzNjMTdcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vb3JkZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTRkYzMzYzE3XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL29yZGVyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00ZGMzM2MxN1wiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2NjNcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5zdGF0dXMtYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNlNjQzNDAgMCUsICNlYzZmNmQgMTAwJSk7XFxuICBwYWRkaW5nOiAxZW0gMDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcbi5zdGF0dXMtYmFyIC5zdGF0dXMtdGV4dCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAyZW07XFxufVxcbi5hZGRyZXNzLWluZm8ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG4ucHJvZHVjdC1saXN0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2VjZWM7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIHdpZHRoOiA3MHB4O1xcbiAgICAgIGhlaWdodDogNzBweDtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgcGFkZGluZzogMCAxNHB4O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5uYW1lIHtcXG4gICAgICAgIGNvbG9yOiAjNTU1O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLmFtb3VudCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIGNvbG9yOiAjODg4O1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLnByaWNlIHtcXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAuYWRkLXRvLWNhcnQge1xcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgcmlnaHQ6IDEwcHg7XFxuICAgICAgICBib3R0b206IDEwcHg7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBwYWRkaW5nOiAuMmVtIC4zZW07XFxufVxcbi5mZWUtaW5mbyB7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4O1xcbn1cXG5mb290ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMjA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogLjVyZW0gMXJlbTtcXG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC0gMnJlbSk7XFxufVxcbmZvb3RlciAud2V1aS1mbGV4X19pdGVtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQVy92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGFBQWE7RUFDYiw4REFBOEQ7RUFDOUQsZUFBZTtFQUNmLG9CQUFvQjtDQUFFO0FBQ3RCO0lBQ0UsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixpQkFBaUI7Q0FBRTtBQUV2QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGNBQWM7RUFDZCxvQkFBb0I7Q0FBRTtBQUV4QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0NBQUU7QUFDekI7SUFDRSxjQUFjO0lBQ2QsYUFBYTtJQUNiLGlDQUFpQztJQUNqQyxtQkFBbUI7Q0FBRTtBQUNyQjtNQUNFLFlBQVk7TUFDWixhQUFhO0NBQUU7QUFDakI7TUFDRSxjQUFjO01BQ2QsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQiwrQkFBK0I7Q0FBRTtBQUNqQztRQUNFLFlBQVk7UUFDWixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtDQUFFO0FBQ3JCO1FBQ0UsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixZQUFZO0NBQUU7QUFDaEI7UUFDRSxZQUFZO1FBQ1osZUFBZTtRQUNmLGdCQUFnQjtDQUFFO0FBQ3BCO1FBQ0UsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osYUFBYTtRQUNiLHVCQUF1QjtRQUN2QixpQkFBaUI7UUFDakIsY0FBYztRQUNkLG1CQUFtQjtDQUFFO0FBRTdCO0VBQ0Usb0JBQW9CO0NBQUU7QUFFeEI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixvQkFBb0I7RUFDcEIsMEJBQTBCO0NBQUU7QUFDNUI7SUFDRSxjQUFjO0lBQ2Qsd0JBQXdCO0NBQUVcIixcImZpbGVcIjpcIm9yZGVyLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuc3RhdHVzLWJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZTY0MzQwIDAlLCAjZWM2ZjZkIDEwMCUpO1xcbiAgcGFkZGluZzogMWVtIDA7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuICAuc3RhdHVzLWJhciAuc3RhdHVzLXRleHQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMmVtOyB9XFxuXFxuLmFkZHJlc3MtaW5mbyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cXG5cXG4ucHJvZHVjdC1saXN0IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH1cXG4gIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2VjZWM7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnRodW1ibmFpbCB7XFxuICAgICAgd2lkdGg6IDcwcHg7XFxuICAgICAgaGVpZ2h0OiA3MHB4OyB9XFxuICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCB7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgIHBhZGRpbmc6IDAgMTRweDtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG4gICAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLm5hbWUge1xcbiAgICAgICAgY29sb3I6ICM1NTU7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7IH1cXG4gICAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLmFtb3VudCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIGNvbG9yOiAjODg4OyB9XFxuICAgICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5wcmljZSB7XFxuICAgICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5hZGQtdG8tY2FydCB7XFxuICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICByaWdodDogMTBweDtcXG4gICAgICAgIGJvdHRvbTogMTBweDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXG4gICAgICAgIHBhZGRpbmc6IC4yZW0gLjNlbTsgfVxcblxcbi5mZWUtaW5mbyB7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4OyB9XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDIwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IC41cmVtIDFyZW07XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pOyB9XFxuICBmb290ZXIgLndldWktZmxleF9faXRlbSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTRkYzMzYzE3XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtYmFyXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwic3RhdHVzLXRleHRcIj57eyBvcmRlci5zdGF0dXMgfCBzdGF0dXNGaWx0ZXIgfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWRkcmVzcy1pbmZvXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiIHYtdGV4dD1cIm9yZGVyLmNvbnN1bWVyX25hbWVcIj48L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9iaWxlXCIgdi10ZXh0PVwib3JkZXIuY29uc3VtZXJfbW9iaWxlXCI+PC9zcGFuPlxyXG4gICAgICA8cCBjbGFzcz1cImFkZHJlc3NcIiB2LXRleHQ9XCJvcmRlci5hZGRyZXNzXCI+PC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtbGlzdFwiPlxyXG4gICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wcm9kdWN0LycgKyBvcmRlckl0ZW0ucHJvZHVjdC5pZFwiIGNsYXNzPVwicHJvZHVjdC1pdGVtXCIgdi1mb3I9XCJvcmRlckl0ZW0gaW4gb3JkZXIub3JkZXJfaXRlbXNcIiA6a2V5PVwib3JkZXJJdGVtLnByb2R1Y3QuaWRcIj5cclxuICAgICAgICA8aW1nIDpzcmM9XCJvcmRlckl0ZW0ucHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIiBjbGFzcz1cInRodW1ibmFpbFwiLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcmlnaHRcIj5cclxuICAgICAgICAgIDxoNCBjbGFzcz1cIm5hbWVcIiB2LWh0bWw9XCJvcmRlckl0ZW0ucHJvZHVjdC5uYW1lXCI+PC9oND5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbW91bnRcIj7mlbDph4/vvJp7eyBvcmRlckl0ZW0uYW1vdW50IH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj57eyBvcmRlckl0ZW0ucHJvZHVjdC5wcmljZSB8IHByaWNlRmlsdGVyIH19PC9kaXY+XHJcblxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC10by1jYXJ0XCIgQGNsaWNrLnByZXZlbnQuc3RvcD1cImFkZFRvQ2FydChvcmRlckl0ZW0ucHJvZHVjdC5pZClcIj7liqDlhaXotK3nianovaY8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx3di1ncm91cCBjbGFzcz1cIm9yZGVyLWluZm9cIj5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLorqLljZXlj7dcIiA6dmFsdWU9XCJvcmRlci5udW1iZXJcIj48L3d2LWNlbGw+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi5LiL5Y2V5pe26Ze0XCIgOnZhbHVlPVwib3JkZXIuY3JlYXRlZF9hdFwiPjwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmlK/ku5jml7bpl7RcIiA6dmFsdWU9XCJvcmRlci5jcmVhdGVkX2F0XCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuaUr+S7mOaWueW8j1wiIDp2YWx1ZT1cIm9yZGVyLmNyZWF0ZWRfYXRcIj48L3d2LWNlbGw+XHJcbiAgICA8L3d2LWdyb3VwPlxyXG5cclxuICAgIDx3di1ncm91cCBjbGFzcz1cImZlZS1pbmZvXCI+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi6K6i5Y2V5oC76aKdXCIgOnZhbHVlPVwib3JkZXIudG90YWxfZmVlXCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIui/kOi0uVwiIDp2YWx1ZT1cIm9yZGVyLnRvdGFsX2ZlZVwiPjwvd3YtY2VsbD5cclxuICAgIDwvd3YtZ3JvdXA+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPHd2LWZsZXggOmd1dHRlcj1cIjIwXCI+XHJcbiAgICAgICAgPHd2LWZsZXgtaXRlbSB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnbmVlZF90b19wYXknXCI+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJ3YXJuXCIgbWluaSBAY2xpY2submF0aXZlPVwiY2FuY2VsT3JkZXJcIj7lj5bmtojorqLljZU8L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgICA8d3YtZmxleC1pdGVtIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICdjYW5jZWxlZCcgfHwgb3JkZXIuc3RhdHVzID09PSAnZmluaXNoZWQnXCI+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJ3YXJuXCIgbWluaSBAY2xpY2submF0aXZlPVwiZGVsZXRlT3JkZXJcIj7liKDpmaTorqLljZU8L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgICA8d3YtZmxleC1pdGVtIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICduZWVkX3RvX3BheSdcIj5cclxuICAgICAgICAgIDx3di1idXR0b24gdHlwZT1cInByaW1hcnlcIiBtaW5pIEBjbGljaz1cIiRyb3V0ZXIucHVzaCgnL3BheW1lbnQvJyArIG9yZGVyLm51bWJlcilcIj7ljrvku5jmrL48L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgPC93di1mbGV4PlxyXG4gICAgPC9mb290ZXI+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IEdyb3VwLCBDZWxsLCBGbGV4LCBGbGV4SXRlbSwgQnV0dG9uIH0gZnJvbSAnd2UtdnVlJ1xyXG5cclxuICBpbXBvcnQgcHJpY2VGaWx0ZXIgZnJvbSAnLi4vbWl4aW5zL3ByaWNlX2ZpbHRlcidcclxuICBpbXBvcnQgc3RhdHVzRmlsdGVyIGZyb20gJy4uL21peGlucy9zdGF0dXNfZmlsdGVyJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtHcm91cC5uYW1lXTogR3JvdXAsXHJcbiAgICAgIFtDZWxsLm5hbWVdOiBDZWxsLFxyXG4gICAgICBbQnV0dG9uLm5hbWVdOiBCdXR0b24sXHJcbiAgICAgIFtGbGV4Lm5hbWVdOiBGbGV4LFxyXG4gICAgICBbRmxleEl0ZW0ubmFtZV06IEZsZXhJdGVtXHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluczogW1xyXG4gICAgICBwcmljZUZpbHRlcixcclxuICAgICAgc3RhdHVzRmlsdGVyXHJcbiAgICBdLFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yZGVySWQ6IG51bGwsXHJcbiAgICAgICAgb3JkZXI6IHt9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMub3JkZXJOdW1iZXIgPSB0aGlzLiRyb3V0ZS5wYXJhbXMub3JkZXJOdW1iZXJcclxuXHJcbiAgICAgIHRoaXMuZ2V0T3JkZXIoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldE9yZGVyICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldChgb3JkZXIvJHt0aGlzLm9yZGVyTnVtYmVyfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcG9uc2UuZGF0YS5vcmRlclxyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGFkZFRvQ2FydCAocHJvZHVjdElkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdElkKVxyXG5cclxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgYW1vdW50OiAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ2NhcnQvYWRkJywgcG9zdERhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+a3u+WKoOaIkOWKnycpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjYW5jZWxPcmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdvcmRlci9jYW5jZWwnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCflj5bmtojmiJDlip8nKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZGVsZXRlT3JkZXIgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MucG9zdCgnb3JkZXIvY2FuY2VsJykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJvb3Quc3VjY2Vzcygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuICAkd2V1aS1yZWQ6ICNlNjQzNDA7XHJcblxyXG4gIC5zdGF0dXMtYmFyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR3ZXVpLXJlZCAwJSwgbGlnaHRlbigkd2V1aS1yZWQsIDEwJSkgMTAwJSk7XHJcbiAgICBwYWRkaW5nOiAxZW0gMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcblxyXG4gICAgLnN0YXR1cy10ZXh0IHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDJlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hZGRyZXNzLWluZm8ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3QtbGlzdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG5cclxuICAgIC5wcm9kdWN0LWl0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNlY2VjO1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAudGh1bWJuYWlsIHtcclxuICAgICAgICB3aWR0aDogNzBweDtcclxuICAgICAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5pdGVtLXJpZ2h0IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgcGFkZGluZzogMCAxNHB4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcbiAgICAgICAgLm5hbWUge1xyXG4gICAgICAgICAgY29sb3I6ICM1NTU7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYW1vdW50IHtcclxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgY29sb3I6ICM4ODg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucHJpY2Uge1xyXG4gICAgICAgICAgY29sb3I6ICM0NDQ7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hZGQtdG8tY2FydCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICByaWdodDogMTBweDtcclxuICAgICAgICAgIGJvdHRvbTogMTBweDtcclxuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICAgIHBhZGRpbmc6IC4yZW0gLjNlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5mZWUtaW5mbyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA3MHB4O1xyXG4gIH1cclxuXHJcbiAgZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHotaW5kZXg6IDIwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IC41cmVtIDFyZW07XHJcbiAgICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pO1xyXG5cclxuICAgIC53ZXVpLWZsZXhfX2l0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBvcmRlci52dWU/MmVmM2EwN2QiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgZmlsdGVyczoge1xyXG4gICAgc3RhdHVzRmlsdGVyOiBmdW5jdGlvbiAoc3RhdHVzKSB7XHJcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgIGNhc2UgJ25lZWRfdG9fcGF5JzpcclxuICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgY2FzZSAncGFpZCc6XHJcbiAgICAgICAgcmV0dXJuICflvoXmlK/ku5gnXHJcbiAgICAgIGNhc2UgJ2RlbGl2ZXJlZCc6XHJcbiAgICAgICAgcmV0dXJuICflvoXmlK/ku5gnXHJcbiAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcclxuICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgY2FzZSAnY2FuY2VsZWQnOlxyXG4gICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICBkZWZhdWx0OiByZXR1cm4gJydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3N0YXR1c19maWx0ZXIuanMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0dXMtYmFyXCIgfSwgW1xuICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0dXMtdGV4dFwiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInN0YXR1c0ZpbHRlclwiKShfdm0ub3JkZXIuc3RhdHVzKSkpXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFkZHJlc3MtaW5mb1wiIH0sIFtcbiAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYW1lXCIsXG4gICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0ub3JkZXIuY29uc3VtZXJfbmFtZSkgfVxuICAgICAgICB9KSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJtb2JpbGVcIixcbiAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKF92bS5vcmRlci5jb25zdW1lcl9tb2JpbGUpIH1cbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwicFwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoX3ZtLm9yZGVyLmFkZHJlc3MpIH1cbiAgICAgICAgfSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInByb2R1Y3QtbGlzdFwiIH0sXG4gICAgICAgIF92bS5fbChfdm0ub3JkZXIub3JkZXJfaXRlbXMsIGZ1bmN0aW9uKG9yZGVySXRlbSkge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBvcmRlckl0ZW0ucHJvZHVjdC5pZCxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1pdGVtXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHRvOiBcIi9wcm9kdWN0L1wiICsgb3JkZXJJdGVtLnByb2R1Y3QuaWQgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogb3JkZXJJdGVtLnByb2R1Y3QudGh1bWJuYWlsLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpdGVtLXJpZ2h0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDRcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3Mob3JkZXJJdGVtLnByb2R1Y3QubmFtZSkgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhbW91bnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCLmlbDph4/vvJpcIiArIF92bS5fcyhvcmRlckl0ZW0uYW1vdW50KSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpY2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInByaWNlRmlsdGVyXCIpKG9yZGVySXRlbS5wcm9kdWN0LnByaWNlKSkpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFkZC10by1jYXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZFRvQ2FydChvcmRlckl0ZW0ucHJvZHVjdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi5Yqg5YWl6LSt54mp6L2mXCIpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwib3JkZXItaW5mb1wiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwgeyBhdHRyczogeyB0aXRsZTogXCLorqLljZXlj7dcIiwgdmFsdWU6IF92bS5vcmRlci5udW1iZXIgfSB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLkuIvljZXml7bpl7RcIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLmlK/ku5jml7bpl7RcIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLmlK/ku5jmlrnlvI9cIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmVlLWluZm9cIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ3di1jZWxsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRpdGxlOiBcIuiuouWNleaAu+minVwiLCB2YWx1ZTogX3ZtLm9yZGVyLnRvdGFsX2ZlZSB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwgeyBhdHRyczogeyB0aXRsZTogXCLov5DotLlcIiwgdmFsdWU6IF92bS5vcmRlci50b3RhbF9mZWUgfSB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvb3RlclwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgZ3V0dGVyOiAyMCB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5vcmRlci5zdGF0dXMgPT09IFwibmVlZF90b19wYXlcIlxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwid3YtZmxleC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid3YtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwid2FyblwiLCBtaW5pOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmNhbmNlbE9yZGVyKCRldmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi5Y+W5raI6K6i5Y2VXCIpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5vcmRlci5zdGF0dXMgPT09IFwiY2FuY2VsZWRcIiB8fCBfdm0ub3JkZXIuc3RhdHVzID09PSBcImZpbmlzaGVkXCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInd2LWZsZXgtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIndhcm5cIiwgbWluaTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWxldGVPcmRlcigkZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWIoOmZpOiuouWNlVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0ub3JkZXIuc3RhdHVzID09PSBcIm5lZWRfdG9fcGF5XCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInd2LWZsZXgtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgbWluaTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kcm91dGVyLnB1c2goXCIvcGF5bWVudC9cIiArIF92bS5vcmRlci5udW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWOu+S7mOasvlwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00ZGMzM2MxN1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNGRjMzNjMTdcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA2Njdcbi8vIG1vZHVsZSBjaHVua3MgPSAzIl0sInNvdXJjZVJvb3QiOiIifQ==