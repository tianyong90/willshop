webpackJsonp([2],{

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

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(714)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(716)
/* template */
var __vue_template__ = __webpack_require__(720)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ec040f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\shop\\pages\\product.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] product.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ec040f8", Component.options)
  } else {
    hotAPI.reload("data-v-6ec040f8", Component.options)
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

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(599);
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

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 600:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=297)}({0:function(e,t){e.exports=function(e,t,n,r,o){var s,i=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,i=e.default);var a="function"==typeof i?i.options:i;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),r&&(a._scopeId=r);var c;if(o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},a._ssrRegister=c):n&&(c=n),c){var f=a.functional,d=f?a.render:a.beforeCreate;f?a.render=function(e,t){return c.call(t),d(e,t)}:a.beforeCreate=d?[].concat(d,c):[c]}return{esModule:s,exports:i,options:a}}},297:function(e,t,n){e.exports=n(298)},298:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(299),o=n.n(r);n.d(t,"default",function(){return o.a})},299:function(e,t,n){function r(e){n(300)}var o=n(0)(n(301),n(302),r,"data-v-26130cab",null);e.exports=o.exports},300:function(e,t){},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-swipe-item",mounted:function(){this.$parent&&this.$parent.swipeItemCreated(this)},destroyed:function(){this.$parent&&this.$parent.swipeItemDestroyed(this)}}},302:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-swipe-item"},[e._t("default")],2)},staticRenderFns:[]}}});

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(602);
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

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, ".wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}", ""]);

// exports


/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=290)}([function(t,e){t.exports=function(t,e,n,r,i){var o,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,u=t.default);var s="function"==typeof u?u.options:u;e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),r&&(s._scopeId=r);var c;if(i?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},s._ssrRegister=c):n&&(c=n),c){var f=s.functional,l=f?s.render:s.beforeCreate;f?s.render=function(t,e){return c.call(e),l(t,e)}:s.beforeCreate=l?[].concat(l,c):[c]}return{esModule:o,exports:u,options:s}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),i=n(19),o=n(15),u=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n=t.exports={version:"2.5.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(3),i=n(11);t.exports=n(2)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(29)("wks"),i=n(22),o=n(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,e,n){var r=n(4);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=__webpack_require__(8)},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(73),i=n(27);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(1),i=n(5),o=n(16),u=n(6),a=function(t,e,n){var s,c,f,l=t&a.F,p=t&a.G,h=t&a.S,d=t&a.P,v=t&a.B,g=t&a.W,y=p?i:i[e]||(i[e]={}),m=y.prototype,b=p?r:h?r[e]:(r[e]||{}).prototype;p&&(n=e);for(s in n)(c=!l&&b&&void 0!==b[s])&&s in y||(f=c?b[s]:n[s],y[s]=p&&"function"!=typeof b[s]?n[s]:v&&c?o(f,r):g&&b[s]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?o(Function.call,f):f,d&&((y.virtual||(y.virtual={}))[s]=f,t&a.R&&m&&!m[s]&&u(m,s,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(4);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(17);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(4),i=n(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(18)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports={}},function(t,e,n){var r=n(53),i=n(30);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=!0},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(3).f,i=n(12),o=n(7)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(29)("keys"),i=n(22);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){e.f=n(7)},function(t,e,n){var r=n(1),i=n(5),o=n(23),u=n(31),a=n(3).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var r=n(23),i=n(14),o=n(51),u=n(6),a=n(12),s=n(20),c=n(71),f=n(25),l=n(76),p=n(7)("iterator"),h=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,v,g,y,m){c(n,e,v);var b,x,S,w=function(t){if(!h&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",T="values"==g,O=!1,P=t.prototype,L=P[p]||P["@@iterator"]||g&&P[g],E=L||w(g),j=g?T?w("entries"):E:void 0,M="Array"==e?P.entries||L:L;if(M&&(S=l(M.call(new t)))!==Object.prototype&&S.next&&(f(S,_,!0),r||a(S,p)||u(S,p,d)),T&&L&&"values"!==L.name&&(O=!0,E=function(){return L.call(this)}),r&&!m||!h&&!O&&P[p]||u(P,p,E),s[e]=E,s[_]=d,g)if(b={values:T?E:w("values"),keys:y?E:w("keys"),entries:j},m)for(x in b)x in P||o(P,x,b[x]);else i(i.P+i.F*(h||O),e,b);return b}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(8),i=n(72),o=n(30),u=n(28)("IE_PROTO"),a=function(){},s=function(){var t,e=n(18)("iframe"),r=o.length;for(e.style.display="none",n(59).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[o[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=s(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(12),i=n(13),o=n(74)(!1),u=n(28)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),s=0,c=[];for(n in a)n!=u&&r(a,n)&&c.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~o(c,n)||c.push(n));return c}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(53),i=n(30).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},,function(t,e,n){"use strict";var r=n(70)(!0);n(50)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(26),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){n(78);for(var r=n(1),i=n(6),o=n(20),u=n(7)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<a.length;s++){var c=a[s],f=r[c],l=f&&f.prototype;l&&!l[u]&&i(l,u,c),o[c]=o.Array}},function(t,e){},,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(68),o=r(i),u=n(81),a=r(u),s="function"==typeof a.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":typeof t};e.default="function"==typeof a.default&&"symbol"===s(o.default)?function(t){return void 0===t?"undefined":s(t)}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":void 0===t?"undefined":s(t)}},function(t,e,n){t.exports={default:n(69),__esModule:!0}},function(t,e,n){n(57),n(60),t.exports=n(31).f("iterator")},function(t,e,n){var r=n(26),i=n(27);t.exports=function(t){return function(e,n){var o,u,a=String(i(e)),s=r(n),c=a.length;return s<0||s>=c?t?"":void 0:(o=a.charCodeAt(s),o<55296||o>56319||s+1===c||(u=a.charCodeAt(s+1))<56320||u>57343?t?a.charAt(s):o:t?a.slice(s,s+2):u-56320+(o-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(52),i=n(11),o=n(25),u={};n(6)(u,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(3),i=n(8),o=n(21);t.exports=n(2)?Object.defineProperties:function(t,e){i(t);for(var n,u=o(e),a=u.length,s=0;a>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){var r=n(24);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(13),i=n(58),o=n(75);t.exports=function(t){return function(e,n,u){var a,s=r(e),c=i(s.length),f=o(u,c);if(t&&n!=n){for(;c>f;)if((a=s[f++])!=a)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(26),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(12),i=n(77),o=n(28)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(27);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(79),i=n(80),o=n(20),u=n(13);t.exports=n(50)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(82),__esModule:!0}},function(t,e,n){n(83),n(61),n(90),n(91),t.exports=n(5).Symbol},function(t,e,n){"use strict";var r=n(1),i=n(12),o=n(2),u=n(14),a=n(51),s=n(84).KEY,c=n(9),f=n(29),l=n(25),p=n(22),h=n(7),d=n(31),v=n(32),g=n(85),y=n(86),m=n(87),b=n(8),x=n(13),S=n(15),w=n(11),_=n(52),T=n(88),O=n(89),P=n(3),L=n(21),E=O.f,j=P.f,M=T.f,I=r.Symbol,N=r.JSON,$=N&&N.stringify,k=h("_hidden"),C=h("toPrimitive"),A={}.propertyIsEnumerable,F=f("symbol-registry"),D=f("symbols"),W=f("op-symbols"),R=Object.prototype,G="function"==typeof I,V=r.QObject,B=!V||!V.prototype||!V.prototype.findChild,H=o&&c(function(){return 7!=_(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=E(R,e);r&&delete R[e],j(t,e,n),r&&t!==R&&j(R,e,r)}:j,Y=function(t){var e=D[t]=_(I.prototype);return e._k=t,e},J=G&&"symbol"==typeof I.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof I},X=function(t,e,n){return t===R&&X(W,e,n),b(t),e=S(e,!0),b(n),i(D,e)?(n.enumerable?(i(t,k)&&t[k][e]&&(t[k][e]=!1),n=_(n,{enumerable:w(0,!1)})):(i(t,k)||j(t,k,w(1,{})),t[k][e]=!0),H(t,e,n)):j(t,e,n)},K=function(t,e){b(t);for(var n,r=y(e=x(e)),i=0,o=r.length;o>i;)X(t,n=r[i++],e[n]);return t},U=function(t,e){return void 0===e?_(t):K(_(t),e)},q=function(t){var e=A.call(this,t=S(t,!0));return!(this===R&&i(D,t)&&!i(W,t))&&(!(e||!i(this,t)||!i(D,t)||i(this,k)&&this[k][t])||e)},z=function(t,e){if(t=x(t),e=S(e,!0),t!==R||!i(D,e)||i(W,e)){var n=E(t,e);return!n||!i(D,e)||i(t,k)&&t[k][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=M(x(t)),r=[],o=0;n.length>o;)i(D,e=n[o++])||e==k||e==s||r.push(e);return r},Z=function(t){for(var e,n=t===R,r=M(n?W:x(t)),o=[],u=0;r.length>u;)!i(D,e=r[u++])||n&&!i(R,e)||o.push(D[e]);return o};G||(I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(W,n),i(this,k)&&i(this[k],t)&&(this[k][t]=!1),H(this,t,w(1,n))};return o&&B&&H(R,t,{configurable:!0,set:e}),Y(t)},a(I.prototype,"toString",function(){return this._k}),O.f=z,P.f=X,n(55).f=T.f=Q,n(33).f=q,n(54).f=Z,o&&!n(23)&&a(R,"propertyIsEnumerable",q,!0),d.f=function(t){return Y(h(t))}),u(u.G+u.W+u.F*!G,{Symbol:I});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)h(tt[et++]);for(var nt=L(h.store),rt=0;nt.length>rt;)v(nt[rt++]);u(u.S+u.F*!G,"Symbol",{for:function(t){return i(F,t+="")?F[t]:F[t]=I(t)},keyFor:function(t){if(J(t))return g(F,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){B=!0},useSimple:function(){B=!1}}),u(u.S+u.F*!G,"Object",{create:U,defineProperty:X,defineProperties:K,getOwnPropertyDescriptor:z,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),N&&u(u.S+u.F*(!G||c(function(){var t=I();return"[null]"!=$([t])||"{}"!=$({a:t})||"{}"!=$(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!J(t)){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(n=e),!n&&m(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,$.apply(N,r)}}}),I.prototype[C]||n(6)(I.prototype,C,I.prototype.valueOf),l(I,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(22)("meta"),i=n(4),o=n(12),u=n(3).f,a=0,s=Object.isExtensible||function(){return!0},c=!n(9)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!o(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return c&&d.NEED&&s(t)&&!o(t,r)&&f(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:h}},function(t,e,n){var r=n(21),i=n(13);t.exports=function(t,e){for(var n,o=i(t),u=r(o),a=u.length,s=0;a>s;)if(o[n=u[s++]]===e)return n}},function(t,e,n){var r=n(21),i=n(54),o=n(33);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var u,a=n(t),s=o.f,c=0;a.length>c;)s.call(t,u=a[c++])&&e.push(u);return e}},function(t,e,n){var r=n(24);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(13),i=n(55).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==o.call(t)?a(t):i(r(t))}},function(t,e,n){var r=n(33),i=n(11),o=n(13),u=n(15),a=n(12),s=n(19),c=Object.getOwnPropertyDescriptor;e.f=n(2)?c:function(t,e){if(t=o(t),e=u(e,!0),s)try{return c(t,e)}catch(t){}if(a(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){n(32)("asyncIterator")},function(t,e,n){n(32)("observable")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){t.exports=n(291)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(292),i=n.n(r);n.d(e,"default",function(){return i.a})},function(t,e,n){function r(t){n(293)}var i=n(0)(n(294),n(296),r,"data-v-47370521",null);t.exports=i.exports},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(295);e.default={name:"wv-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{height:{type:Number,default:180},speed:{type:Number,default:300},defaultIndex:{type:Number,default:0},auto:{type:Number,default:3e3},continuous:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1}},mounted:function(){var t=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){if(!t.continuous&&t.index>=t.pages.length-1)return t.clearTimer();t.dragging||t.animating||t.next()},this.auto)),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.onTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&t.onTouchMove(e)}),e.addEventListener("touchend",function(e){if(t.userScrolling)return t.dragging=!1,void(t.dragState={});t.dragging&&(t.onTouchEnd(e),t.dragging=!1)})},methods:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},translate:function(t,e,n,i){var o=this,u=arguments;if(n){this.animating=!0,t.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out",setTimeout(function(){t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var a=!1,s=function(){a||(a=!0,o.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",i&&i.apply(o,u))};Object(r.b)(t,"webkitTransitionEnd",s),setTimeout(s,n+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[],n=Math.floor(this.defaultIndex),i=n>=0&&n<t.length?n:0;this.index=i,t.forEach(function(t,n){e.push(t.$el),Object(r.c)(t.$el,"is-active"),n===i&&Object(r.a)(t.$el,"is-active")}),this.pages=e},doAnimate:function(t,e){var n=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var i=void 0,o=void 0,u=void 0,a=void 0,s=void 0,c=this.speed||300,f=this.index,l=this.pages,p=l.length;e?(i=e.prevPage,u=e.currentPage,o=e.nextPage,a=e.pageWidth,s=e.offsetLeft):(a=this.$el.clientWidth,u=l[f],i=l[f-1],o=l[f+1],this.continuous&&l.length>1&&(i||(i=l[l.length-1]),o||(o=l[0])),i&&(i.style.display="block",this.translate(i,-a)),o&&(o.style.display="block",this.translate(o,a)));var h=void 0,d=this.$children[f].$el;"prev"===t?(f>0&&(h=f-1),this.continuous&&0===f&&(h=p-1)):"next"===t&&(f<p-1&&(h=f+1),this.continuous&&f===p-1&&(h=0));var v=function(){if(void 0!==h){var t=n.$children[h].$el;Object(r.c)(d,"is-active"),Object(r.a)(t,"is-active"),n.index=h}i&&(i.style.display=""),o&&(o.style.display="")};setTimeout(function(){"next"===t?(n.translate(u,-a,c,v),o&&n.translate(o,0,c)):"prev"===t?(n.translate(u,a,c,v),i&&n.translate(i,0,c)):(n.translate(u,0,c,v),void 0!==s?(i&&s>0&&n.translate(i,-1*a,c),o&&s<0&&n.translate(o,a,c)):(i&&n.translate(i,-1*a,c),o&&n.translate(o,a,c)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},onTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,r=t.touches[0];n.startTime=new Date,n.startLeft=r.pageX,n.startTop=r.pageY,n.startTopAbsolute=r.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var i=this.$children[this.index-1],o=this.$children[this.index],u=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(i||(i=this.$children[this.$children.length-1]),u||(u=this.$children[0])),n.prevPage=i?i.$el:null,n.dragPage=o?o.$el:null,n.nextPage=u?u.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},onTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var r=e.currentLeft-e.startLeft,i=e.currentTopAbsolute-e.startTopAbsolute,o=Math.abs(r),u=Math.abs(i);if(o<5||o>=5&&u>=1.73*o)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),r=Math.min(Math.max(1-e.pageWidth,r),e.pageWidth-1);var a=r<0?"next":"prev";e.prevPage&&"prev"===a&&this.translate(e.prevPage,r-e.pageWidth),this.translate(e.dragPage,r),e.nextPage&&"next"===a&&this.translate(e.nextPage,r+e.pageWidth)}},onTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,r=t.currentLeft-t.startLeft,i=t.currentTop-t.startTop,o=t.pageWidth,u=this.index,a=this.pages.length;if(e<300){var s=Math.abs(r)<5&&Math.abs(i)<5;(isNaN(r)||isNaN(i))&&(s=!0),s&&this.$children[this.index].$emit("tap")}e<300&&void 0===t.currentLeft||((e<300||Math.abs(r)>o/2)&&(n=r<0?"next":"prev"),this.continuous||(0===u&&"prev"===n||u===a-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:r,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}},clearTimer:function(){clearInterval(this.timer),this.timer=null}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},watch:{index:function(t){this.$emit("change",t)}}}},function(t,e,n){"use strict";function r(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function i(t,e){if(t){for(var n=t.className,i=(e||"").split(" "),o=0,u=i.length;o<u;o++){var a=i[o];a&&(t.classList?t.classList.add(a):r(t,a)||(n+=" "+a))}t.classList||(t.className=n)}}function o(t,e){if(t&&e){for(var n=e.split(" "),i=" "+t.className+" ",o=0,u=n.length;o<u;o++){var a=n[o];a&&(t.classList?t.classList.remove(a):r(t,a)&&(i=i.replace(" "+a+" "," ")))}t.classList||(t.className=f(i))}}n.d(e,"b",function(){return h}),e.a=i,e.c=o;var u=n(67),a=(n.n(u),n(10)),s=n.n(a),c=s.a.prototype.$isServer,f=(c||Number(document.documentMode),function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),l=function(){return!c&&document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),p=function(){return!c&&document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),h=function(t,e,n){l(t,e,function r(){n&&n.apply(this,arguments),p(t,e,r)})}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wv-swipe",style:{height:t.height+"px"}},[n("div",{ref:"wrapper",staticClass:"wv-swipe-wrapper"},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showIndicators,expression:"showIndicators"}],staticClass:"wv-swipe-indicators"},t._l(t.pages,function(e,r){return n("div",{key:r,staticClass:"wv-swipe-indicator",class:{"is-active":r===t.index}})}))])},staticRenderFns:[]}}]);

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(611);
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

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, ".wv-number-spinner[data-v-d940776a]{display:inline-block;border:1px solid #ccc;border-radius:3px;font-size:12px;overflow:hidden}.wv-number-spinner input[data-v-d940776a]{display:inline-block;float:left;border:none;outline:none;padding:0 .5em}.wv-number-spinner .spinner-btn[data-v-d940776a]{display:inline-block;float:left;color:#000;font-size:13px;padding:0 .6em;border:none}.wv-number-spinner .btn-decrease[data-v-d940776a]{border-right:1px solid #ccc}.wv-number-spinner .btn-increase[data-v-d940776a]{border-left:1px solid #ccc}.wv-number-spinner .spinner-btn[disabled][data-v-d940776a]{color:#888}", ""]);

// exports


/***/ }),

/***/ 612:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=364)}({0:function(e,t){e.exports=function(e,t,n,r,i){var u,s=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(u=e,s=e.default);var o="function"==typeof s?s.options:s;t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),r&&(o._scopeId=r);var l;if(i?(l=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},o._ssrRegister=l):n&&(l=n),l){var c=o.functional,d=c?o.render:o.beforeCreate;c?o.render=function(e,t){return l.call(t),d(e,t)}:o.beforeCreate=d?[].concat(d,l):[l]}return{esModule:u,exports:s,options:o}}},364:function(e,t,n){e.exports=n(365)},365:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(366),i=n.n(r);n.d(t,"default",function(){return i.a})},366:function(e,t,n){function r(e){n(367)}var i=n(0)(n(368),n(369),r,"data-v-d940776a",null);e.exports=i.exports},367:function(e,t){},368:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-number-spinner",props:{min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},inputWidth:{type:String,default:"3em"},fillable:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},align:{type:String,default:"center"},value:{validator:function(e){return"number"==typeof e||""===e},default:0}},data:function(){return{currentValue:this.value}},computed:{btnDecreaseDisabled:function(){return this.disabled||this.currentValue===this.min},btnIncreaseDisabled:function(){return this.disabled||this.currentValue===this.max},inputStyle:function(){return{width:this.inputWidth,textAlign:this.align}}},methods:{onBlur:function(){""===this.currentValue&&(this.currentValue=this.min)},increase:function(){this.currentValue+=this.step},decrease:function(){this.currentValue-=this.step}},watch:{currentValue:function(e){this.$emit("input",e),this.$emit("change",e)},value:function(e){"number"==typeof e?e<=this.min?this.currentValue=this.min:e>=this.max?this.currentValue=this.max:this.currentValue=e:""===e&&(this.currentValue="")}}}},369:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wv-number-spinner"},[n("button",{staticClass:"spinner-btn btn-decrease",class:{"btn-disabled":e.btnDecreaseDisabled},attrs:{disabled:e.disabled},on:{click:e.decrease}},[e._v("-")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.currentValue,expression:"currentValue",modifiers:{number:!0}}],style:e.inputStyle,attrs:{type:"number",disabled:e.disabled,readonly:!e.fillable},domProps:{value:e.currentValue},on:{blur:[e.onBlur,function(t){e.$forceUpdate()}],input:function(t){t.target.composing||(e.currentValue=e._n(t.target.value))}}}),e._v(" "),n("button",{staticClass:"spinner-btn btn-increase",class:{"btn-disabled":e.btnIncreaseDisabled},attrs:{disabled:e.disabled},on:{click:e.increase}},[e._v("+")])])},staticRenderFns:[]}}});

/***/ }),

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(715);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("b7348fde", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ec040f8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6ec040f8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-6ec040f8] {\n  display: block;\n  overflow: hidden;\n}\n.details[data-v-6ec040f8] {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n}\n.details .name[data-v-6ec040f8] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666;\n}\n.details .price[data-v-6ec040f8] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red;\n}\n.description[data-v-6ec040f8] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666;\n  margin-top: 10px;\n}\n.popup-footer[data-v-6ec040f8] {\n  display: flex;\n  margin-top: 1em;\n}\n.popup-footer .btn[data-v-6ec040f8] {\n    flex: 1;\n    text-align: center;\n    padding: .5em 0;\n    color: #fff;\n}\n.popup-footer .popup-btn-add-cart[data-v-6ec040f8] {\n    background-color: red;\n}\nfooter[data-v-6ec040f8] {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\nfooter .btn[data-v-6ec040f8] {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    flex-basis: 80px;\n}\nfooter .btn .icon[data-v-6ec040f8] {\n      display: block;\n}\nfooter .btn .icon.is-favourite[data-v-6ec040f8] {\n        color: #f00;\n}\nfooter .btn .amount[data-v-6ec040f8] {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%;\n}\nfooter .btn .text[data-v-6ec040f8] {\n      font-size: 12px;\n}\nfooter .btn-add-cart[data-v-6ec040f8] {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    flex-grow: 5;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/pages/product.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,uBAAuB;EACvB,iBAAiB;CAAE;AACnB;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,WAAW;CAAE;AAEjB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,iCAAiC;EACjC,oBAAoB;EACpB,kBAAkB;EAClB,YAAY;EACZ,iBAAiB;CAAE;AAErB;EACE,cAAc;EACd,gBAAgB;CAAE;AAClB;IACE,QAAQ;IACR,mBAAmB;IACnB,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,sBAAsB;CAAE;AAE5B;EACE,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,2BAA2B;CAAE;AAC7B;IACE,YAAY;IACZ,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,iBAAiB;CAAE;AACnB;MACE,eAAe;CAAE;AACjB;QACE,YAAY;CAAE;AAClB;MACE,mBAAmB;MACnB,uBAAuB;MACvB,SAAS;MACT,YAAY;MACZ,YAAY;MACZ,gBAAgB;MAChB,eAAe;MACf,mBAAmB;CAAE;AACvB;MACE,gBAAgB;CAAE;AACtB;IACE,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,uBAAuB;IACvB,aAAa;CAAE","file":"product.vue","sourcesContent":[".banner-swipe-item {\n  display: block;\n  overflow: hidden; }\n\n.details {\n  display: block;\n  background-color: #fff;\n  overflow: hidden; }\n  .details .name {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666; }\n  .details .price {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red; }\n\n.description {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666;\n  margin-top: 10px; }\n\n.popup-footer {\n  display: flex;\n  margin-top: 1em; }\n  .popup-footer .btn {\n    flex: 1;\n    text-align: center;\n    padding: .5em 0;\n    color: #fff; }\n  .popup-footer .popup-btn-add-cart {\n    background-color: red; }\n\nfooter {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc; }\n  footer .btn {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    flex-basis: 80px; }\n    footer .btn .icon {\n      display: block; }\n      footer .btn .icon.is-favourite {\n        color: #f00; }\n    footer .btn .amount {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%; }\n    footer .btn .text {\n      font-size: 12px; }\n  footer .btn-add-cart {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    flex-grow: 5; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(583);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _style = __webpack_require__(610);

var _style2 = _interopRequireDefault(_style);

var _numberSpinner = __webpack_require__(612);

var _numberSpinner2 = _interopRequireDefault(_numberSpinner);

var _style3 = __webpack_require__(717);

var _style4 = _interopRequireDefault(_style3);

var _popup = __webpack_require__(719);

var _popup2 = _interopRequireDefault(_popup);

var _style5 = __webpack_require__(587);

var _style6 = _interopRequireDefault(_style5);

var _cell = __webpack_require__(589);

var _cell2 = _interopRequireDefault(_cell);

var _style7 = __webpack_require__(590);

var _style8 = _interopRequireDefault(_style7);

var _group = __webpack_require__(592);

var _group2 = _interopRequireDefault(_group);

var _style9 = __webpack_require__(598);

var _style10 = _interopRequireDefault(_style9);

var _swipeItem = __webpack_require__(600);

var _swipeItem2 = _interopRequireDefault(_swipeItem);

var _style11 = __webpack_require__(601);

var _style12 = _interopRequireDefault(_style11);

var _swipe = __webpack_require__(603);

var _swipe2 = _interopRequireDefault(_swipe);

var _components;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: (_components = {}, (0, _defineProperty3.default)(_components, _swipe2.default.name, _swipe2.default), (0, _defineProperty3.default)(_components, _swipeItem2.default.name, _swipeItem2.default), (0, _defineProperty3.default)(_components, _group2.default.name, _group2.default), (0, _defineProperty3.default)(_components, _cell2.default.name, _cell2.default), (0, _defineProperty3.default)(_components, _popup2.default.name, _popup2.default), (0, _defineProperty3.default)(_components, _numberSpinner2.default.name, _numberSpinner2.default), _components),

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
    checkIsFavourite: function checkIsFavourite() {
      var _this2 = this;

      this.axios.get('favourite/' + this.$route.params.id + '/is-favourite').then(function (response) {
        _this2.isFavourite = response.data.isFavourite;
      }).catch(function (error) {
        console.log(error);
      });
    },
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
    addToCart: function addToCart(productId) {
      var _this4 = this;

      var postData = {
        productId: productId,
        amount: this.amount
      };

      this.axios.post('cart/add', postData).then(function (response) {
        var data = response.data;

        _this4.productAmountInCart = parseInt(_this4.productAmountInCart) + _this4.amount;
      });
    },
    toggleFavourite: function toggleFavourite(productId) {
      var _this5 = this;

      this.axios.get('favourite/' + productId + '/toggle').then(function (response) {
        _this5.isFavourite = !_this5.isFavourite;
      });
    }
  }
};

/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(718);
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

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, ".wv-popup-body[data-v-87a08ef6]{display:block;background-color:#fff;position:fixed;width:100%;left:0;bottom:0;z-index:5000;transform:translateY(100%);transition:transform .3s}", ""]);

// exports


/***/ }),

/***/ 719:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=303)}({0:function(e,t){e.exports=function(e,t,n,r,o){var u,i=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(u=e,i=e.default);var s="function"==typeof i?i.options:i;t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),r&&(s._scopeId=r);var c;if(o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},s._ssrRegister=c):n&&(c=n),c){var l=s.functional,d=l?s.render:s.beforeCreate;l?s.render=function(e,t){return c.call(t),d(e,t)}:s.beforeCreate=d?[].concat(d,c):[c]}return{esModule:u,exports:i,options:s}}},303:function(e,t,n){e.exports=n(304)},304:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(305),o=n.n(r);n.d(t,"default",function(){return o.a})},305:function(e,t,n){function r(e){n(306)}var o=n(0)(n(307),n(308),r,"data-v-87a08ef6",null);e.exports=o.exports},306:function(e,t){},307:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-popup",props:{value:Boolean,height:{type:[String,Number],default:"auto"},hideOnMask:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:""},backgroundColor:{type:String,default:"#fff"}},data:function(){return{currentValue:this.value}},computed:{style:function(){var e={backgroundColor:this.backgroundColor};return"auto"===this.height?e.height="auto":e.height=parseInt(this.height)+"px",e}},methods:{maskClick:function(e){this.hideOnMask&&(this.currentValue=!1)}},watch:{value:function(e){this.currentValue=e},currentValue:function(e){this.$emit("input",e),e?this.$emit("show"):this.$emit("hide")}}}},308:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.currentValue,expression:"currentValue"}],staticClass:"wv-popup"},[n("div",{staticClass:"weui-mask weui-animate-fade-in",style:{backgroundColor:e.maskBackgroundColor},on:{click:e.maskClick}}),e._v(" "),n("div",{staticClass:"wv-popup-body weui-animate-slide-up",style:e.style},[e._t("default")],2)])},staticRenderFns:[]}}});

/***/ }),

/***/ 720:
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
                _vm.showPopup($event)
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
     require("vue-hot-reload-api").rerender("data-v-6ec040f8", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9wcm9kdWN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvc3R5bGUuY3NzPzc3NDEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9zdHlsZS5jc3M/YzQwOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUtaXRlbS9zdHlsZS5jc3M/NTgxOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL3N0eWxlLmNzcz82Y2Y3Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9udW1iZXItc3Bpbm5lci9zdHlsZS5jc3M/OTZjYiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9udW1iZXItc3Bpbm5lci9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbnVtYmVyLXNwaW5uZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3Byb2R1Y3QudnVlP2UyZmQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3Byb2R1Y3QudnVlP2U4MDYiLCJ3ZWJwYWNrOi8vL3Byb2R1Y3QudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3BvcHVwL3N0eWxlLmNzcz9jZDYwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3BvcHVwL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9wb3B1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWU/Y2VlNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBLHVCQUF1QiwyQkFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdE5BOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0EseUJBQXFNO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBLDRDQUE4VTtBQUM5VTtBQUNBLDhDQUFvSjtBQUNwSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHNEQUFzRCxJQUFJO0FBQ3pJLG1DQUFtQzs7QUFFbkM7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDM0NBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7QUN2QkEsa0JBQWtCLHlEOzs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBLHFFQUF1RSw0Q0FBNEM7Ozs7Ozs7O0FDRm5IOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOzs7Ozs7OztBQ1BBLDJCQUEyQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsOEJBQThCLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsNkVBQTZFLE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLHlCQUF5Qix3QkFBd0IscUNBQXFDLE9BQU8saUNBQWlDLHFCQUFxQixnQkFBZ0Isb0JBQW9CLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxxQkFBcUIsMkJBQTJCLFdBQVcsRUFBRSxvQkFBb0IsY0FBYyxNQUFNLGlEQUFpRCxvQkFBb0IsbUJBQW1CLG9CQUFvQixhQUFhLHNDQUFzQyxTQUFTLGFBQWEsc0JBQXNCLE9BQU8scUJBQXFCLFFBQVEscUJBQXFCLDBCQUEwQixXQUFXLGdCQUFnQixXQUFXLHVDQUF1QyxrQ0FBa0MsbURBQW1ELHlEQUF5RCxrQkFBa0IsZ0JBQWdCLG9CQUFvQixnREFBZ0QsVUFBVSx3QkFBd0IsdUVBQXVFLGtCQUFrQixXQUFXLGtCQUFrQiw4Q0FBOEMsbUJBQW1CLCtCQUErQiw0QkFBNEIsUUFBUSxhQUFhLFdBQVcsMkJBQTJCLHNDQUFzQyw0QkFBNEIsb0JBQW9CLFVBQVUseUJBQXlCLDJCQUEyQiw0QkFBNEIsa0RBQWtELCtCQUErQiw2QkFBNkIsV0FBVywyQkFBMkIsc0NBQXNDLDRCQUE0QixvQkFBb0IsVUFBVSx5QkFBeUIsMkJBQTJCLDRCQUE0Qix5Q0FBeUMsc0JBQXNCLEU7Ozs7Ozs7QUNBdDNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOzs7Ozs7OztBQ1BBLDJCQUEyQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsOEJBQThCLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsNkVBQTZFLE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLHlCQUF5Qix3QkFBd0IscUNBQXFDLE9BQU8saUNBQWlDLHFCQUFxQixpQkFBaUIscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxzQkFBc0IsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsY0FBYyxPQUFPLG1EQUFtRCxvQkFBb0Isb0JBQW9CLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLGFBQWEsdUJBQXVCLGlDQUFpQyxtQkFBbUIsV0FBVyxrQkFBa0IsOENBQThDLGlDQUFpQyx1Q0FBdUMsbUJBQW1CLFdBQVcseUJBQXlCLDRCQUE0Qix5QkFBeUIsd0JBQXdCLHNCQUFzQixFOzs7Ozs7O0FDQTM4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNQQSwyQkFBMkIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLDhCQUE4QixlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLDZFQUE2RSxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyx5QkFBeUIsd0JBQXdCLHFDQUFxQyxPQUFPLGlDQUFpQyxxQkFBcUIsaUJBQWlCLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsc0JBQXNCLDJCQUEyQixXQUFXLEVBQUUscUJBQXFCLGNBQWMsT0FBTyxtREFBbUQsb0JBQW9CLG9CQUFvQixxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxhQUFhLHdDQUF3QyxrREFBa0Qsc0JBQXNCLHNEQUFzRCxtQkFBbUIsV0FBVyxrQkFBa0IsOEJBQThCLDZCQUE2Qiw0QkFBNEIsc0JBQXNCLHNCQUFzQixFOzs7Ozs7O0FDQTU2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSxvREFBcUQsZ0JBQWdCLGtCQUFrQixXQUFXLDZDQUE2QyxrQkFBa0IsZ0JBQWdCLFlBQVksaURBQWlELGtCQUFrQiw0QkFBNEIsV0FBVyxZQUFZLGFBQWEsMkRBQTJELGNBQWMsZUFBZSxnREFBZ0Qsa0JBQWtCLFlBQVksU0FBUywyQkFBMkIsb0VBQW9FLHFCQUFxQixVQUFVLFdBQVcsa0JBQWtCLGFBQWEsc0JBQXNCLFdBQVcsOEVBQThFLHNCQUFzQjs7QUFFNXhCOzs7Ozs7OztBQ1BBLDJCQUEyQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsZ0JBQWdCLDhCQUE4QixlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLDZFQUE2RSxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyx5QkFBeUIsd0JBQXdCLHFDQUFxQyxPQUFPLGlDQUFpQyxlQUFlLDhJQUE4SSw4QkFBOEIsaUJBQWlCLDJCQUEyQixrQ0FBa0MsTUFBTSxlQUFlLFVBQVUsSUFBSSxFQUFFLGlCQUFpQixtREFBbUQsK0NBQStDLDZCQUE2QixnQkFBZ0IsVUFBVSxvRUFBb0UscUNBQXFDLGVBQWUsc0JBQXNCLHdEQUF3RCxlQUFlLGlCQUFpQixpQkFBaUIsOEJBQThCLGlCQUFpQixtQkFBbUIsK0JBQStCLHVCQUF1QixpQkFBaUIsaUJBQWlCLGlCQUFpQixnRUFBZ0UsdUJBQXVCLGtEQUFrRCxVQUFVLGlCQUFpQixXQUFXLHNCQUFzQixpREFBaUQsVUFBVSxlQUFlLHNCQUFzQixJQUFJLFlBQVksU0FBUyxXQUFXLGVBQWUsaUNBQXlCLGVBQWUsd0JBQXdCLE9BQU8sZ0VBQWdFLGVBQWUsUUFBUSxnQkFBZ0Isd0JBQXdCLG9CQUFvQixpQkFBaUIsb0JBQW9CLHNCQUFzQixnQkFBZ0IsaUJBQWlCLG1EQUFtRCw4RUFBOEUsc0NBQXNDLFlBQVksU0FBUyxvSUFBb0ksc0JBQXNCLHNCQUFzQix5QkFBeUIsb0JBQW9CLHVCQUF1Qix5QkFBeUIsb0JBQW9CLGdDQUFnQyxpQ0FBaUMsOEVBQThFLHFDQUFxQyxpRUFBaUUsaUJBQWlCLFdBQVcsd0JBQXdCLGtCQUFrQixRQUFRLGlFQUFpRSw2REFBNkQsa0VBQWtFLDREQUE0RCxpQkFBaUIsWUFBWSwwQkFBMEIsNEJBQTRCLFVBQVUsMEJBQTBCLG9CQUFvQiw0QkFBNEIsc0JBQXNCLDhCQUE4Qix3QkFBd0Isa0JBQWtCLDhCQUE4QixlQUFlLHNCQUFzQixpRUFBaUUsVUFBVSxpQkFBaUIsc0RBQXNELHNCQUFzQixnQ0FBZ0MsaUJBQWlCLGtDQUFrQyxrREFBa0QsZUFBZSxVQUFVLElBQUksRUFBRSxlQUFlLGFBQWEsaUJBQWlCLG9CQUFvQixtQ0FBbUMsZUFBZSxlQUFlLHdCQUF3QixzQkFBc0IsbUVBQW1FLGVBQWUsYUFBYSxlQUFlLFFBQVEsVUFBVSxzQkFBc0IsOEJBQThCLGlCQUFpQiwyQ0FBMkMsMEJBQTBCLG1DQUFtQyx3QkFBd0IsR0FBRyxlQUFlLDZCQUE2QixzQkFBc0IsbUNBQW1DLGVBQWUsc0JBQXNCLHlEQUF5RCxVQUFVLGlCQUFpQiw0QkFBNEIsc0JBQXNCLDBCQUEwQixpQkFBaUIsaUVBQWlFLEVBQUUsc0JBQXNCLHFCQUFxQixHQUFHLGVBQWUscUhBQXFILGlCQUFpQixTQUFTLGlCQUFpQiwyQ0FBMkMsc0JBQXNCLDhCQUE4QixhQUFhLEVBQUUsaUNBQWlDLGFBQWEsR0FBRyxlQUFlLE1BQU0sc0JBQXNCLGlDQUFpQyxhQUFhLDJJQUEySSxhQUFhLGtDQUFrQyxTQUFTLHdCQUF3QiwwQkFBMEIsVUFBVSwwQ0FBMEMsc0JBQXNCLGtCQUFrQixzQkFBc0IscUpBQXFKLG1JQUFtSSxvQkFBb0Isc0RBQXNELG9EQUFvRCxrQ0FBa0MsMkJBQTJCLFVBQVUsaUJBQWlCLGVBQWUsaUJBQWlCLDZEQUE2RCxjQUFjLG1DQUFtQyx1S0FBdUssSUFBSSwwQkFBMEIsWUFBWSx1Q0FBdUMsTUFBTSw4RkFBOEYsaUJBQWlCLG9EQUFvRCx3QkFBd0Isc0JBQXNCLG1DQUFtQyxLQUFLLFdBQVcscUNBQXFDLFVBQVUsZUFBZSxpQ0FBaUMsaUJBQWlCLGlEQUFpRCw0Q0FBNEMsZUFBZSxrQkFBa0IsYUFBYSxnQkFBZ0Isa0NBQWtDLDRCQUE0QixZQUFZLDBCQUEwQixvQkFBb0IscUJBQXFCLDhCQUE4QixnQkFBZ0IsRUFBRSxFQUFFLGlCQUFpQix1QkFBdUIsc0JBQXNCLHVDQUF1QyxpQkFBaUIsb0JBQW9CLCtCQUErQixpQkFBaUIsTUFBTSw2ZkFBNmYsV0FBVyxLQUFLLG1DQUFtQyxpQ0FBaUMsZ0JBQWdCLHNCQUFzQixhQUFhLGNBQWMsMEJBQTBCLFdBQVcsZ0JBQWdCLHlHQUF5RyxnQkFBZ0IsYUFBYSw4R0FBOEcsNEVBQTRFLG1DQUFtQyxhQUFhLGlJQUFpSSxpQkFBaUIsV0FBVyw2QkFBNkIsaUJBQWlCLDBDQUEwQyxpQkFBaUIsb0JBQW9CLHNCQUFzQixxQkFBcUIseUNBQXlDLGdMQUFnTCxpQkFBaUIsYUFBYSxpQ0FBaUMsbUNBQW1DLFlBQVksNEJBQTRCLGlCQUFpQixZQUFZLHNCQUFzQixpQkFBaUIsMEJBQTBCLHFEQUFxRCxLQUFLLGdDQUFnQyxJQUFJLHNCQUFzQixVQUFVLGlCQUFpQixZQUFZLGlFQUFpRSw0Q0FBNEMsaUJBQWlCLDRCQUE0QixzQkFBc0IsdUJBQXVCLG9DQUFvQyxZQUFZLEtBQUssSUFBSSwyQkFBMkIsVUFBVSxJQUFJLDRDQUE0QyxlQUFlLGlCQUFpQixrQ0FBa0Msd0JBQXdCLG1DQUFtQyxpQkFBaUIsMkRBQTJELDZDQUE2QywySUFBMkksaUJBQWlCLFlBQVksc0JBQXNCLHFCQUFxQixpQkFBaUIsYUFBYSxvQ0FBb0MsNENBQTRDLGlDQUFpQyxZQUFZLG9DQUFvQyxpR0FBaUcsa0VBQWtFLGVBQWUsdUJBQXVCLGVBQWUsd0JBQXdCLE9BQU8sbUJBQW1CLGlCQUFpQixXQUFXLDZCQUE2QixpQkFBaUIsOENBQThDLGlCQUFpQixhQUFhLHVTQUF1UyxpTUFBaU0sZ0JBQWdCLE1BQU0sZUFBZSxtQkFBbUIsUUFBUSxLQUFLLEtBQUssa0JBQWtCLGFBQWEsMkNBQTJDLGlCQUFpQiwwQkFBMEIsZ0JBQWdCLDhDQUE4Qyx5QkFBeUIsYUFBYSxzQkFBc0IsbUJBQW1CLHNHQUFzRyxtQkFBbUIsd0JBQXdCLGtDQUFrQyxpQkFBaUIsS0FBSyxxQ0FBcUMsSUFBSSxvQkFBb0IsU0FBUyxpQkFBaUIsaUNBQWlDLGVBQWUsNkJBQTZCLDBGQUEwRixpQkFBaUIsNENBQTRDLGFBQWEseURBQXlELGVBQWUsNkJBQTZCLFdBQVcsc0NBQXNDLFNBQVMsZUFBZSx5Q0FBeUMsV0FBVywwQ0FBMEMsVUFBVSxpQkFBaUIscUVBQXFFLDhEQUE4RCxpRkFBaUYsb0JBQW9CLHNCQUFzQixPQUFPLHFDQUFxQyxlQUFlLDRHQUE0RyxlQUFlLG9CQUFvQixTQUFTLEVBQUUsNElBQTRJLGFBQWEsYUFBYSwyQkFBMkIsYUFBYSxhQUFhLHVCQUF1QixnQkFBZ0IsaUNBQWlDLG9CQUFvQixzQkFBc0IsdUNBQXVDLHNCQUFzQixLQUFLLHNCQUFzQixNQUFNLHlCQUF5QixzSEFBc0gsaUNBQWlDLFVBQVUsMkJBQTJCLE1BQU0sSUFBSSxNQUFNLGdCQUFnQixXQUFXLHNCQUFzQixzQkFBc0Isc0JBQXNCLG1CQUFtQix3QkFBd0IscUVBQXFFLDBDQUEwQyx3QkFBd0IsOEdBQThHLGlCQUFpQixrRkFBa0YsU0FBUyxvQkFBb0Isb0NBQW9DLEdBQUcsZ0JBQWdCLE9BQU8sT0FBTyxpQkFBaUIsRUFBRSxpQkFBaUIsbUVBQW1FLFlBQVksbUJBQW1CLGdCQUFnQixLQUFLLGNBQWMsaUJBQWlCLFlBQVksa0JBQWtCLGVBQWUsS0FBSyxjQUFjLGVBQWUsd0NBQXdDLGNBQWMsOENBQThDLGlCQUFpQixvQkFBb0Isd0JBQXdCLHVDQUF1QyxJQUFJLDhCQUE4QixpQkFBaUIsNEJBQTRCLHNCQUFzQixpQkFBaUIsZ0NBQWdDLFdBQVcsK0JBQStCLFVBQVUsaUJBQWlCLFlBQVkscUNBQXFDLHFCQUFxQixpQkFBaUIsMEJBQTBCLDRIQUE0SCxJQUFJLFlBQVksU0FBUyxtQkFBbUIsd0JBQXdCLHFEQUFxRCxpQkFBaUIsc0ZBQXNGLHlCQUF5QiwwQkFBMEIsY0FBYyxVQUFVLHlDQUF5QyxpQkFBaUIsdUJBQXVCLGlCQUFpQixvQkFBb0IsdU5BQXVOLGlCQUFpQixpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLHNCQUFzQiwyQkFBMkIsV0FBVyxFQUFFLGlCQUFpQixjQUFjLE9BQU8sbURBQW1ELG9CQUFvQixnQkFBZ0IsaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxhQUFhLFdBQVcsbUNBQW1DLGtCQUFrQixpQkFBaUIsT0FBTywyR0FBMkcsUUFBUSxRQUFRLHdCQUF3QixRQUFRLHdCQUF3QixlQUFlLHNCQUFzQixPQUFPLHdCQUF3QixhQUFhLHdCQUF3QixpQkFBaUIsd0JBQXdCLG1CQUFtQix3QkFBd0IsVUFBVSx5QkFBeUIsb0JBQW9CLFdBQVcsOERBQThELGtFQUFrRSxrQ0FBa0MsZ0NBQWdDLGVBQWUsNENBQTRDLGdHQUFnRyw2Q0FBNkMsNkJBQTZCLDRDQUE0QywyREFBMkQsRUFBRSw0Q0FBNEMsRUFBRSxVQUFVLDRCQUE0QixXQUFXLG1GQUFtRixnQkFBZ0IsT0FBTywrQkFBK0IsV0FBVyxtRkFBbUYsZ0JBQWdCLE9BQU8sNkJBQTZCLHVCQUF1QixNQUFNLHlHQUF5RyxxREFBcUQsS0FBSyxzQkFBc0IsaUdBQWlHLDJEQUEyRCxzRkFBc0Ysd0JBQXdCLHFCQUFxQixnREFBZ0QsZ0VBQWdFLHFDQUFxQyxtRkFBbUYsZUFBZSx5QkFBeUIsV0FBVywrREFBK0Qsd0dBQXdHLGdTQUFnUyxxQ0FBcUMsdUhBQXVILGlCQUFpQixlQUFlLHlCQUF5QixnRUFBZ0UsaURBQWlELHNCQUFzQiwrUEFBK1AsTUFBTSxpQkFBaUIsdUJBQXVCLGlCQUFpQix1QkFBdUIsMEJBQTBCLGlCQUFpQiwrQ0FBK0MsK0lBQStJLCtGQUErRix1UkFBdVIseUJBQXlCLGlCQUFpQixvQ0FBb0MsMEVBQTBFLHNHQUFzRywyREFBMkQsNkZBQTZGLHdCQUF3QixnS0FBZ0ssdUJBQXVCLGlCQUFpQix3SkFBd0osVUFBVSxtQ0FBbUMsd0VBQXdFLHdNQUF3TSxrR0FBa0csbUJBQW1CLEdBQUcsdUJBQXVCLDJDQUEyQyxzQkFBc0IsaUlBQWlJLFFBQVEsa0JBQWtCLDBCQUEwQixpQkFBaUIsYUFBYSxnQkFBZ0IsbUJBQW1CLDhFQUE4RSx1RkFBdUYsZ0JBQWdCLE1BQU0sMERBQTBELElBQUksS0FBSyxXQUFXLHVEQUF1RCw4QkFBOEIsZ0JBQWdCLFNBQVMsNERBQTRELElBQUksS0FBSyxXQUFXLDRFQUE0RSxpQ0FBaUMscUJBQXFCLFNBQVMsY0FBYyxnSEFBZ0gsdURBQXVELGVBQWUsb0RBQW9ELG9DQUFvQyxpQkFBaUIsa0NBQWtDLGdCQUFnQix1REFBdUQsb0NBQW9DLGlCQUFpQiwrQkFBK0IscUJBQXFCLG1CQUFtQixvQ0FBb0MsR0FBRyxlQUFlLFdBQVcsa0JBQWtCLDhDQUE4QyxnQkFBZ0IsOEJBQThCLHNCQUFzQixXQUFXLDZDQUE2Qyx5Q0FBeUMsYUFBYSxnRkFBZ0Ysb0NBQW9DLDRCQUE0QixnQkFBZ0IsOENBQThDLHlCQUF5QixFQUFFLEtBQUsscUJBQXFCLEc7Ozs7Ozs7QUNBN3p1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSw2REFBOEQscUJBQXFCLHNCQUFzQixrQkFBa0IsZUFBZSxnQkFBZ0IsMENBQTBDLHFCQUFxQixXQUFXLFlBQVksYUFBYSxlQUFlLGlEQUFpRCxxQkFBcUIsV0FBVyxXQUFXLGVBQWUsZUFBZSxZQUFZLGtEQUFrRCw0QkFBNEIsa0RBQWtELDJCQUEyQiwyREFBMkQsV0FBVzs7QUFFbm5COzs7Ozs7OztBQ1BBLDJCQUEyQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsOEJBQThCLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsNkVBQTZFLE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLHlCQUF5Qix3QkFBd0IscUNBQXFDLE9BQU8saUNBQWlDLHFCQUFxQixpQkFBaUIscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxzQkFBc0IsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsY0FBYyxPQUFPLG1EQUFtRCxvQkFBb0Isb0JBQW9CLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLGFBQWEsZ0NBQWdDLEtBQUssc0JBQXNCLE1BQU0sd0JBQXdCLE9BQU8sc0JBQXNCLGFBQWEsMEJBQTBCLFdBQVcsd0JBQXdCLFdBQVcsd0JBQXdCLFFBQVEsNkJBQTZCLFFBQVEsc0JBQXNCLGlDQUFpQyxZQUFZLGlCQUFpQixPQUFPLHlCQUF5QixXQUFXLCtCQUErQixtREFBbUQsZ0NBQWdDLG1EQUFtRCx1QkFBdUIsT0FBTyw2Q0FBNkMsVUFBVSxrQkFBa0IscURBQXFELHFCQUFxQiw2QkFBNkIscUJBQXFCLDhCQUE4QixRQUFRLHlCQUF5Qiw2Q0FBNkMsbUJBQW1CLHVKQUF1SixtQkFBbUIsV0FBVyxrQkFBa0IsOENBQThDLGdCQUFnQixnQ0FBZ0MsY0FBYyw4Q0FBOEMscUNBQXFDLFFBQVEsb0JBQW9CLEtBQUssa0JBQWtCLG1DQUFtQyxhQUFhLGdHQUFnRyxXQUFXLDRCQUE0Qix1REFBdUQsV0FBVyxxQkFBcUIsS0FBSywyQkFBMkIsaUJBQWlCLG9CQUFvQiw0REFBNEQsd0JBQXdCLDhDQUE4QyxxQ0FBcUMsUUFBUSxvQkFBb0IsS0FBSyxrQkFBa0IsZ0JBQWdCLHNCQUFzQixFOzs7Ozs7O0FDQXIvRzs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLGdFQUFpRSxtQkFBbUIscUJBQXFCLEdBQUcsNkJBQTZCLG1CQUFtQiwyQkFBMkIscUJBQXFCLEdBQUcsbUNBQW1DLHFCQUFxQixzQkFBc0Isc0JBQXNCLGtCQUFrQixHQUFHLG9DQUFvQyxxQkFBcUIsc0JBQXNCLHNCQUFzQixpQkFBaUIsR0FBRyxpQ0FBaUMsbUJBQW1CLHFCQUFxQiwyQkFBMkIscUNBQXFDLHdCQUF3QixzQkFBc0IsZ0JBQWdCLHFCQUFxQixHQUFHLGtDQUFrQyxrQkFBa0Isb0JBQW9CLEdBQUcsdUNBQXVDLGNBQWMseUJBQXlCLHNCQUFzQixrQkFBa0IsR0FBRyxzREFBc0QsNEJBQTRCLEdBQUcsMkJBQTJCLGtCQUFrQixvQkFBb0IsY0FBYyxnQkFBZ0IsaUJBQWlCLDJCQUEyQiwrQkFBK0IsR0FBRyxnQ0FBZ0Msa0JBQWtCLHlCQUF5QixxQkFBcUIsc0JBQXNCLHlCQUF5Qix1QkFBdUIsR0FBRyxzQ0FBc0MsdUJBQXVCLEdBQUcsbURBQW1ELHNCQUFzQixHQUFHLHdDQUF3QywyQkFBMkIsK0JBQStCLGlCQUFpQixvQkFBb0Isb0JBQW9CLHdCQUF3Qix1QkFBdUIsMkJBQTJCLEdBQUcsc0NBQXNDLHdCQUF3QixHQUFHLHlDQUF5QyxtQkFBbUIsd0JBQXdCLHNCQUFzQix5QkFBeUIsa0JBQWtCLGlCQUFpQiw2QkFBNkIsbUJBQW1CLEdBQUcsVUFBVSxzSEFBc0gsS0FBSyxVQUFVLFlBQVksS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksS0FBSyxNQUFNLFVBQVUsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxLQUFLLE1BQU0sWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxLQUFLLE1BQU0sWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLGtFQUFrRSxtQkFBbUIscUJBQXFCLEVBQUUsY0FBYyxtQkFBbUIsMkJBQTJCLHFCQUFxQixFQUFFLG9CQUFvQixxQkFBcUIsc0JBQXNCLHNCQUFzQixrQkFBa0IsRUFBRSxxQkFBcUIscUJBQXFCLHNCQUFzQixzQkFBc0IsaUJBQWlCLEVBQUUsa0JBQWtCLG1CQUFtQixxQkFBcUIsMkJBQTJCLHFDQUFxQyx3QkFBd0Isc0JBQXNCLGdCQUFnQixxQkFBcUIsRUFBRSxtQkFBbUIsa0JBQWtCLG9CQUFvQixFQUFFLHdCQUF3QixjQUFjLHlCQUF5QixzQkFBc0Isa0JBQWtCLEVBQUUsdUNBQXVDLDRCQUE0QixFQUFFLFlBQVksa0JBQWtCLG9CQUFvQixjQUFjLGdCQUFnQixpQkFBaUIsMkJBQTJCLCtCQUErQixFQUFFLGlCQUFpQixrQkFBa0IseUJBQXlCLHFCQUFxQixzQkFBc0IseUJBQXlCLHVCQUF1QixFQUFFLHlCQUF5Qix1QkFBdUIsRUFBRSx3Q0FBd0Msc0JBQXNCLEVBQUUsMkJBQTJCLDJCQUEyQiwrQkFBK0IsaUJBQWlCLG9CQUFvQixvQkFBb0Isd0JBQXdCLHVCQUF1QiwyQkFBMkIsRUFBRSx5QkFBeUIsd0JBQXdCLEVBQUUsMEJBQTBCLG1CQUFtQix3QkFBd0Isc0JBQXNCLHlCQUF5QixrQkFBa0IsaUJBQWlCLDZCQUE2QixtQkFBbUIsRUFBRSxxQkFBcUI7O0FBRTFrSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOENBLDRGQUNBLHVGQUNBLHVGQUNBLGtGQUNBLGtGQUNBLDJGQUdBOzs4QkFDQTtTQUNBO1NBQ0E7U0FDQTtBQUVBO3dCQUNBOztlQUVBO2NBQ0E7bUJBQ0E7MkJBQ0E7b0JBRUE7QUFOQTtBQVFBOzs7O2dDQUVBO2lCQUNBO2lDQUNBO3lEQUNBOzJCQUNBO0FBQ0E7QUFDQTthQUNBO0FBR0E7QUFYQTs7OztBQWFBOztrRkFDQTtzQ0FDQTtBQUNBO0FBR0E7O0FBQ0E7O3NHQUNBOzJDQUNBO2dDQUNBO29CQUNBO0FBQ0E7QUFHQTs7QUFDQTs7cUVBQ0E7bURBQ0E7Z0NBQ0E7b0JBQ0E7QUFDQTtBQUVBO29DQUNBOzBCQUNBO0FBR0E7O0FBQ0E7OzttQkFFQTtxQkFHQTtBQUpBOztxRUFLQTs0QkFFQTs7bUZBQ0E7QUFDQTtBQUdBOztBQUNBOztvRkFDQTtxQ0FDQTtBQUNBO0FBRUE7QUFqREE7QUF0Q0EsRTs7Ozs7OztBQ3BEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSx5REFBMEQsY0FBYyxzQkFBc0IsZUFBZSxXQUFXLE9BQU8sU0FBUyxhQUFhLDJCQUEyQix5QkFBeUI7O0FBRXpNOzs7Ozs7OztBQ1BBLDJCQUEyQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsOEJBQThCLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsNkVBQTZFLE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLHlCQUF5Qix3QkFBd0IscUNBQXFDLE9BQU8saUNBQWlDLHFCQUFxQixpQkFBaUIscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxzQkFBc0IsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsY0FBYyxPQUFPLG1EQUFtRCxvQkFBb0Isb0JBQW9CLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLGFBQWEsdUJBQXVCLHNCQUFzQixvQ0FBb0MsYUFBYSx3QkFBd0Isc0JBQXNCLHVCQUF1QixrQkFBa0IsNEJBQTRCLGlCQUFpQixPQUFPLHlCQUF5QixXQUFXLGlCQUFpQixPQUFPLHNDQUFzQyxrRkFBa0YsVUFBVSxzQkFBc0IseUNBQXlDLFFBQVEsa0JBQWtCLG9CQUFvQiwwQkFBMEIsaUVBQWlFLG1CQUFtQixXQUFXLGtCQUFrQiw4Q0FBOEMsZ0JBQWdCLGFBQWEsNEVBQTRFLHlCQUF5QixXQUFXLG9EQUFvRCxzQ0FBc0MsS0FBSyxtQkFBbUIscUJBQXFCLGdFQUFnRSx3QkFBd0Isc0JBQXNCLEU7Ozs7Ozs7QUNBbHFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0JBQXdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywwQkFBMEIsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQXNEO0FBQ3ZFLDRCQUE0QixTQUFTLDJCQUEyQixFQUFFO0FBQ2xFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1Q0FBdUM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsY0FBYyxFQUFFO0FBQzFDO0FBQ0E7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0JBQXNCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzQ0FBc0MsY0FBYyxFQUFFO0FBQ25FO0FBQ0EsMEJBQTBCLHdCQUF3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsK0JBQStCO0FBQ3REO0FBQ0EsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMgMTQgMjMiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMTk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAyMyIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAyMyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmVjMDQwZjhcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9wcm9kdWN0LnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsW1xcXCJjb21wb25lbnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOnRydWV9XV1dLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vcHJvZHVjdC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTZlYzA0MGY4XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcHJvZHVjdC52dWVcIilcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi02ZWMwNDBmOFwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxzaG9wXFxcXHBhZ2VzXFxcXHByb2R1Y3QudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBwcm9kdWN0LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02ZWMwNDBmOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTZlYzA0MGY4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWVcbi8vIG1vZHVsZSBpZCA9IDU4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1ODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIGk9bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsZSksaS5sPSEwLGkuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gZS5tPXQsZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixyKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sZS5uPWZ1bmN0aW9uKHQpe3ZhciBuPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBlLmQobixcImFcIixuKSxufSxlLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LGUucD1cIlwiLGUoZS5zPTEyMCl9KHswOmZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHIsaSl7dmFyIHMsbz10PXR8fHt9LGM9dHlwZW9mIHQuZGVmYXVsdDtcIm9iamVjdFwiIT09YyYmXCJmdW5jdGlvblwiIT09Y3x8KHM9dCxvPXQuZGVmYXVsdCk7dmFyIGE9XCJmdW5jdGlvblwiPT10eXBlb2Ygbz9vLm9wdGlvbnM6bztlJiYoYS5yZW5kZXI9ZS5yZW5kZXIsYS5zdGF0aWNSZW5kZXJGbnM9ZS5zdGF0aWNSZW5kZXJGbnMpLHImJihhLl9zY29wZUlkPXIpO3ZhciB1O2lmKGk/KHU9ZnVuY3Rpb24odCl7dD10fHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsdHx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fCh0PV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLHQpLHQmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LGEuX3NzclJlZ2lzdGVyPXUpOm4mJih1PW4pLHUpe3ZhciBsPWEuZnVuY3Rpb25hbCxkPWw/YS5yZW5kZXI6YS5iZWZvcmVDcmVhdGU7bD9hLnJlbmRlcj1mdW5jdGlvbih0LGUpe3JldHVybiB1LmNhbGwoZSksZCh0LGUpfTphLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLHUpOlt1XX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOm8sb3B0aW9uczphfX19LDEyMDpmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oMzUpfSwzNTpmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigzNiksaT1uLm4ocik7bi5kKGUsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gaS5hfSl9LDM2OmZ1bmN0aW9uKHQsZSxuKXtmdW5jdGlvbiByKHQpe24oMzcpfXZhciBpPW4oMCkobigzOCksbigzOSkscixcImRhdGEtdi1mNDY1MzIyYVwiLG51bGwpO3QuZXhwb3J0cz1pLmV4cG9ydHN9LDM3OmZ1bmN0aW9uKHQsZSl7fSwzODpmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5kZWZhdWx0PXtuYW1lOlwid3YtY2VsbFwiLHByb3BzOnt0aXRsZTp7dHlwZTpbU3RyaW5nLE51bWJlcl19LHZhbHVlOnt0eXBlOltTdHJpbmcsTnVtYmVyXX0saXNMaW5rOkJvb2xlYW4sdG86U3RyaW5nfSxjb21wdXRlZDp7aHJlZjpmdW5jdGlvbigpe3ZhciB0PXRoaXM7aWYodGhpcy50byYmIXRoaXMuYWRkZWQmJnRoaXMuJHJvdXRlcil7dmFyIGU9dGhpcy4kcm91dGVyLm1hdGNoKHRoaXMudG8pO3JldHVybiBlLm1hdGNoZWQubGVuZ3RoPyh0aGlzLiRuZXh0VGljayhmdW5jdGlvbigpe3QuYWRkZWQ9ITAsdC4kZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdC5oYW5kbGVDbGljayl9KSxlLnBhdGgpOnRoaXMudG99cmV0dXJuIHRoaXMudG99fSxtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy4kb24oXCJDTElDS19JTl9DRUxMU1dJUEVcIix0aGlzLmhhbmRsZUNsaWNrKX0sbWV0aG9kczp7aGFuZGxlQ2xpY2s6ZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpLHZvaWQgMCE9PXRoaXMuaHJlZiYmdGhpcy4kcm91dGVyLnB1c2godGhpcy5ocmVmKX19fX0sMzk6ZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LiRjcmVhdGVFbGVtZW50LG49dC5fc2VsZi5fY3x8ZTtyZXR1cm4gdC50bz9uKFwiYVwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbFwiLGNsYXNzOntcIndldWktY2VsbF9hY2Nlc3NcIjp0LmlzTGlua30sYXR0cnM6e2hyZWY6dC5ocmVmfX0sW24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfaGRcIn0sW3QuX3QoXCJpY29uXCIpXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19iZFwifSxbdC5fdChcImJkXCIsW24oXCJwXCIse2RvbVByb3BzOntpbm5lckhUTUw6dC5fcyh0LnRpdGxlKX19KV0pXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19mdFwifSxbdC5fdChcImZ0XCIsW3QuX3YodC5fcyh0LnZhbHVlKSldKV0sMildKTpuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsXCIsY2xhc3M6e1wid2V1aS1jZWxsX2FjY2Vzc1wiOnQuaXNMaW5rfX0sW24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfaGRcIn0sW3QuX3QoXCJpY29uXCIpXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19iZFwifSxbdC5fdChcImJkXCIsW24oXCJwXCIse2RvbVByb3BzOntpbm5lckhUTUw6dC5fcyh0LnRpdGxlKX19KV0pXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19mdFwifSxbdC5fdChcImZ0XCIsW3QuX3YodC5fcyh0LnZhbHVlKSldKV0sMildKX0sc3RhdGljUmVuZGVyRm5zOltdfX19KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4scil7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0xMTQpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8pe3ZhciBpLHM9ZT1lfHx7fSx1PXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PXUmJlwiZnVuY3Rpb25cIiE9PXV8fChpPWUscz1lLmRlZmF1bHQpO3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHM/cy5vcHRpb25zOnM7dCYmKGMucmVuZGVyPXQucmVuZGVyLGMuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zKSxyJiYoYy5fc2NvcGVJZD1yKTt2YXIgYTtpZihvPyhhPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxuJiZuLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG8pfSxjLl9zc3JSZWdpc3Rlcj1hKTpuJiYoYT1uKSxhKXt2YXIgbD1jLmZ1bmN0aW9uYWwsZj1sP2MucmVuZGVyOmMuYmVmb3JlQ3JlYXRlO2w/Yy5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYS5jYWxsKHQpLGYoZSx0KX06Yy5iZWZvcmVDcmVhdGU9Zj9bXS5jb25jYXQoZixhKTpbYV19cmV0dXJue2VzTW9kdWxlOmksZXhwb3J0czpzLG9wdGlvbnM6Y319fSwxMTQ6ZnVuY3Rpb24oZSx0LG4pe2UuZXhwb3J0cz1uKDExNSl9LDExNTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigxMTYpLG89bi5uKHIpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG8uYX0pfSwxMTY6ZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIHIoZSl7bigxMTcpfXZhciBvPW4oMCkobigxMTgpLG4oMTE5KSxyLFwiZGF0YS12LTE2ZTRiNmViXCIsbnVsbCk7ZS5leHBvcnRzPW8uZXhwb3J0c30sMTE3OmZ1bmN0aW9uKGUsdCl7fSwxMTg6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD17bmFtZTpcInd2LWdyb3VwXCIscHJvcHM6e3RpdGxlOlN0cmluZyx0aXRsZUNvbG9yOlN0cmluZ319fSwxMTk6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50LG49ZS5fc2VsZi5fY3x8dDtyZXR1cm4gbihcImRpdlwiLFtlLnRpdGxlP24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxzX190aXRsZVwiLHN0eWxlOntjb2xvcjplLnRpdGxlQ29sb3J9LGRvbVByb3BzOntpbm5lckhUTUw6ZS5fcyhlLnRpdGxlKX19KTplLl9lKCksZS5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbHNcIn0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKV0pfSxzdGF0aWNSZW5kZXJGbnM6W119fX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1OThcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDggMTAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiA4IDEwIiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI5Nyl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIHMsaT1lPWV8fHt9LHU9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09dSYmXCJmdW5jdGlvblwiIT09dXx8KHM9ZSxpPWUuZGVmYXVsdCk7dmFyIGE9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pLm9wdGlvbnM6aTt0JiYoYS5yZW5kZXI9dC5yZW5kZXIsYS5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLHImJihhLl9zY29wZUlkPXIpO3ZhciBjO2lmKG8/KGM9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LGEuX3NzclJlZ2lzdGVyPWMpOm4mJihjPW4pLGMpe3ZhciBmPWEuZnVuY3Rpb25hbCxkPWY/YS5yZW5kZXI6YS5iZWZvcmVDcmVhdGU7Zj9hLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCksZChlLHQpfTphLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOmksb3B0aW9uczphfX19LDI5NzpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMjk4KX0sMjk4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI5OSksbz1uLm4ocik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDI5OTpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlKXtuKDMwMCl9dmFyIG89bigwKShuKDMwMSksbigzMDIpLHIsXCJkYXRhLXYtMjYxMzBjYWJcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwzMDA6ZnVuY3Rpb24oZSx0KXt9LDMwMTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3Ytc3dpcGUtaXRlbVwiLG1vdW50ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRwYXJlbnQmJnRoaXMuJHBhcmVudC5zd2lwZUl0ZW1DcmVhdGVkKHRoaXMpfSxkZXN0cm95ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRwYXJlbnQmJnRoaXMuJHBhcmVudC5zd2lwZUl0ZW1EZXN0cm95ZWQodGhpcyl9fX0sMzAyOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3di1zd2lwZS1pdGVtXCJ9LFtlLl90KFwiZGVmYXVsdFwiKV0sMil9LHN0YXRpY1JlbmRlckZuczpbXX19fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDggMTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNjAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiA4IDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIud3Ytc3dpcGVbZGF0YS12LTQ3MzcwNTIxXXtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXJbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjEwMCV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyIGRpdltkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDAlKTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6bm9uZX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXIgZGl2LmlzLWFjdGl2ZVtkYXRhLXYtNDczNzA1MjFde2Rpc3BsYXk6YmxvY2s7dHJhbnNmb3JtOm5vbmV9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzW2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSl9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzIC53di1zd2lwZS1pbmRpY2F0b3JbZGF0YS12LTQ3MzcwNTIxXXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjUwJTttYXJnaW46MCA0cHg7YmFja2dyb3VuZC1jb2xvcjojMDAwO29wYWNpdHk6LjN9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzIC53di1zd2lwZS1pbmRpY2F0b3IuaXMtYWN0aXZlW2RhdGEtdi00NzM3MDUyMV17YmFja2dyb3VuZC1jb2xvcjojZmZmfVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIgOCAxMCIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBpPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiB0W3JdLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLGUpLGkubD0hMCxpLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuZD1mdW5jdGlvbih0LG4scil7ZS5vKHQsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfSxlLnA9XCJcIixlKGUucz0yOTApfShbZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scixpKXt2YXIgbyx1PXQ9dHx8e30sYT10eXBlb2YgdC5kZWZhdWx0O1wib2JqZWN0XCIhPT1hJiZcImZ1bmN0aW9uXCIhPT1hfHwobz10LHU9dC5kZWZhdWx0KTt2YXIgcz1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O2UmJihzLnJlbmRlcj1lLnJlbmRlcixzLnN0YXRpY1JlbmRlckZucz1lLnN0YXRpY1JlbmRlckZucyksciYmKHMuX3Njb3BlSWQ9cik7dmFyIGM7aWYoaT8oYz1mdW5jdGlvbih0KXt0PXR8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCx0fHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KHQ9X19WVUVfU1NSX0NPTlRFWFRfXyksbiYmbi5jYWxsKHRoaXMsdCksdCYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0scy5fc3NyUmVnaXN0ZXI9Yyk6biYmKGM9biksYyl7dmFyIGY9cy5mdW5jdGlvbmFsLGw9Zj9zLnJlbmRlcjpzLmJlZm9yZUNyZWF0ZTtmP3MucmVuZGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGMuY2FsbChlKSxsKHQsZSl9OnMuYmVmb3JlQ3JlYXRlPWw/W10uY29uY2F0KGwsYyk6W2NdfXJldHVybntlc01vZHVsZTpvLGV4cG9ydHM6dSxvcHRpb25zOnN9fX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lk1hdGg9PU1hdGg/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLk1hdGg9PU1hdGg/c2VsZjpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJudW1iZXJcIj09dHlwZW9mIF9fZyYmKF9fZz1uKX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbig5KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOCksaT1uKDE5KSxvPW4oMTUpLHU9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbih0LGUsbil7aWYocih0KSxlPW8oZSwhMCkscihuKSxpKXRyeXtyZXR1cm4gdSh0LGUsbil9Y2F0Y2godCl7fWlmKFwiZ2V0XCJpbiBufHxcInNldFwiaW4gbil0aHJvdyBUeXBlRXJyb3IoXCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCFcIik7cmV0dXJuXCJ2YWx1ZVwiaW4gbiYmKHRbZV09bi52YWx1ZSksdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz17dmVyc2lvbjpcIjIuNS4wXCJ9O1wibnVtYmVyXCI9PXR5cGVvZiBfX2UmJihfX2U9bil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMpLGk9bigxMSk7dC5leHBvcnRzPW4oMik/ZnVuY3Rpb24odCxlLG4pe3JldHVybiByLmYodCxlLGkoMSxuKSl9OmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdFtlXT1uLHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyOSkoXCJ3a3NcIiksaT1uKDIyKSxvPW4oMSkuU3ltYm9sLHU9XCJmdW5jdGlvblwiPT10eXBlb2YgbzsodC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT11JiZvW3RdfHwodT9vOmkpKFwiU3ltYm9sLlwiK3QpKX0pLnN0b3JlPXJ9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZighcih0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYW4gb2JqZWN0IVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4hIXQoKX1jYXRjaCh0KXtyZXR1cm4hMH19fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1yZXF1aXJlKFwidnVlXCIpfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybntlbnVtZXJhYmxlOiEoMSZ0KSxjb25maWd1cmFibGU6ISgyJnQpLHdyaXRhYmxlOiEoNCZ0KSx2YWx1ZTplfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30uaGFzT3duUHJvcGVydHk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG4uY2FsbCh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNzMpLGk9bigyNyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByKGkodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1uKDUpLG89bigxNiksdT1uKDYpLGE9ZnVuY3Rpb24odCxlLG4pe3ZhciBzLGMsZixsPXQmYS5GLHA9dCZhLkcsaD10JmEuUyxkPXQmYS5QLHY9dCZhLkIsZz10JmEuVyx5PXA/aTppW2VdfHwoaVtlXT17fSksbT15LnByb3RvdHlwZSxiPXA/cjpoP3JbZV06KHJbZV18fHt9KS5wcm90b3R5cGU7cCYmKG49ZSk7Zm9yKHMgaW4gbikoYz0hbCYmYiYmdm9pZCAwIT09YltzXSkmJnMgaW4geXx8KGY9Yz9iW3NdOm5bc10seVtzXT1wJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBiW3NdP25bc106diYmYz9vKGYscik6ZyYmYltzXT09Zj9mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbihlLG4scil7aWYodGhpcyBpbnN0YW5jZW9mIHQpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIG5ldyB0O2Nhc2UgMTpyZXR1cm4gbmV3IHQoZSk7Y2FzZSAyOnJldHVybiBuZXcgdChlLG4pfXJldHVybiBuZXcgdChlLG4scil9cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfTtyZXR1cm4gZS5wcm90b3R5cGU9dC5wcm90b3R5cGUsZX0oZik6ZCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZj9vKEZ1bmN0aW9uLmNhbGwsZik6ZixkJiYoKHkudmlydHVhbHx8KHkudmlydHVhbD17fSkpW3NdPWYsdCZhLlImJm0mJiFtW3NdJiZ1KG0scyxmKSkpfTthLkY9MSxhLkc9MixhLlM9NCxhLlA9OCxhLkI9MTYsYS5XPTMyLGEuVT02NCxhLlI9MTI4LHQuZXhwb3J0cz1hfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixpO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIoaT1uLmNhbGwodCkpKXJldHVybiBpO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksdm9pZCAwPT09ZSlyZXR1cm4gdDtzd2l0Y2gobil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKGUsbil9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24obixyKXtyZXR1cm4gdC5jYWxsKGUsbixyKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsaSl7cmV0dXJuIHQuY2FsbChlLG4scixpKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkoZSxhcmd1bWVudHMpfX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCksaT1uKDEpLmRvY3VtZW50LG89cihpKSYmcihpLmNyZWF0ZUVsZW1lbnQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbz9pLmNyZWF0ZUVsZW1lbnQodCk6e319fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPSFuKDIpJiYhbig5KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkobigxOCkoXCJkaXZcIiksXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e319LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUzKSxpPW4oMzApO3QuZXhwb3J0cz1PYmplY3Qua2V5c3x8ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxpKX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49MCxyPU1hdGgucmFuZG9tKCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDA9PT10P1wiXCI6dCxcIilfXCIsKCsrbityKS50b1N0cmluZygzNikpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ITB9LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKS5mLGk9bigxMiksbz1uKDcpKFwidG9TdHJpbmdUYWdcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0JiYhaSh0PW4/dDp0LnByb3RvdHlwZSxvKSYmcih0LG8se2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTplfSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxyPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/cjpuKSh0KX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09dCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIrdCk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyOSkoXCJrZXlzXCIpLGk9bigyMik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT1pKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLGk9cltcIl9fY29yZS1qc19zaGFyZWRfX1wiXXx8KHJbXCJfX2NvcmUtanNfc2hhcmVkX19cIl09e30pO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaVt0XXx8KGlbdF09e30pfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9XCJjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2ZcIi5zcGxpdChcIixcIil9LGZ1bmN0aW9uKHQsZSxuKXtlLmY9big3KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1uKDUpLG89bigyMyksdT1uKDMxKSxhPW4oMykuZjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9aS5TeW1ib2x8fChpLlN5bWJvbD1vP3t9OnIuU3ltYm9sfHx7fSk7XCJfXCI9PXQuY2hhckF0KDApfHx0IGluIGV8fGEoZSx0LHt2YWx1ZTp1LmYodCl9KX19LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSwsLCwsLCwsLCwsLCwsLCwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjMpLGk9bigxNCksbz1uKDUxKSx1PW4oNiksYT1uKDEyKSxzPW4oMjApLGM9big3MSksZj1uKDI1KSxsPW4oNzYpLHA9big3KShcIml0ZXJhdG9yXCIpLGg9IShbXS5rZXlzJiZcIm5leHRcImluW10ua2V5cygpKSxkPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbix2LGcseSxtKXtjKG4sZSx2KTt2YXIgYix4LFMsdz1mdW5jdGlvbih0KXtpZighaCYmdCBpbiBQKXJldHVybiBQW3RdO3N3aXRjaCh0KXtjYXNlXCJrZXlzXCI6Y2FzZVwidmFsdWVzXCI6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX0sXz1lK1wiIEl0ZXJhdG9yXCIsVD1cInZhbHVlc1wiPT1nLE89ITEsUD10LnByb3RvdHlwZSxMPVBbcF18fFBbXCJAQGl0ZXJhdG9yXCJdfHxnJiZQW2ddLEU9THx8dyhnKSxqPWc/VD93KFwiZW50cmllc1wiKTpFOnZvaWQgMCxNPVwiQXJyYXlcIj09ZT9QLmVudHJpZXN8fEw6TDtpZihNJiYoUz1sKE0uY2FsbChuZXcgdCkpKSE9PU9iamVjdC5wcm90b3R5cGUmJlMubmV4dCYmKGYoUyxfLCEwKSxyfHxhKFMscCl8fHUoUyxwLGQpKSxUJiZMJiZcInZhbHVlc1wiIT09TC5uYW1lJiYoTz0hMCxFPWZ1bmN0aW9uKCl7cmV0dXJuIEwuY2FsbCh0aGlzKX0pLHImJiFtfHwhaCYmIU8mJlBbcF18fHUoUCxwLEUpLHNbZV09RSxzW19dPWQsZylpZihiPXt2YWx1ZXM6VD9FOncoXCJ2YWx1ZXNcIiksa2V5czp5P0U6dyhcImtleXNcIiksZW50cmllczpqfSxtKWZvcih4IGluIGIpeCBpbiBQfHxvKFAseCxiW3hdKTtlbHNlIGkoaS5QK2kuRiooaHx8TyksZSxiKTtyZXR1cm4gYn19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9big2KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOCksaT1uKDcyKSxvPW4oMzApLHU9bigyOCkoXCJJRV9QUk9UT1wiKSxhPWZ1bmN0aW9uKCl7fSxzPWZ1bmN0aW9uKCl7dmFyIHQsZT1uKDE4KShcImlmcmFtZVwiKSxyPW8ubGVuZ3RoO2ZvcihlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsbig1OSkuYXBwZW5kQ2hpbGQoZSksZS5zcmM9XCJqYXZhc2NyaXB0OlwiLHQ9ZS5jb250ZW50V2luZG93LmRvY3VtZW50LHQub3BlbigpLHQud3JpdGUoXCI8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PFxcL3NjcmlwdD5cIiksdC5jbG9zZSgpLHM9dC5GO3ItLTspZGVsZXRlIHMucHJvdG90eXBlW29bcl1dO3JldHVybiBzKCl9O3QuZXhwb3J0cz1PYmplY3QuY3JlYXRlfHxmdW5jdGlvbih0LGUpe3ZhciBuO3JldHVybiBudWxsIT09dD8oYS5wcm90b3R5cGU9cih0KSxuPW5ldyBhLGEucHJvdG90eXBlPW51bGwsblt1XT10KTpuPXMoKSx2b2lkIDA9PT1lP246aShuLGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTIpLGk9bigxMyksbz1uKDc0KSghMSksdT1uKDI4KShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLGE9aSh0KSxzPTAsYz1bXTtmb3IobiBpbiBhKW4hPXUmJnIoYSxuKSYmYy5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+czspcihhLG49ZVtzKytdKSYmKH5vKGMsbil8fGMucHVzaChuKSk7cmV0dXJuIGN9fSxmdW5jdGlvbih0LGUpe2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1MyksaT1uKDMwKS5jb25jYXQoXCJsZW5ndGhcIixcInByb3RvdHlwZVwiKTtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsaSl9fSwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzApKCEwKTtuKDUwKShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI2KSxpPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdD4wP2kocih0KSw5MDA3MTk5MjU0NzQwOTkxKTowfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSkuZG9jdW1lbnQ7dC5leHBvcnRzPXImJnIuZG9jdW1lbnRFbGVtZW50fSxmdW5jdGlvbih0LGUsbil7big3OCk7Zm9yKHZhciByPW4oMSksaT1uKDYpLG89bigyMCksdT1uKDcpKFwidG9TdHJpbmdUYWdcIiksYT1cIkNTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCxNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LFNWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LFRleHRUcmFja0xpc3QsVG91Y2hMaXN0XCIuc3BsaXQoXCIsXCIpLHM9MDtzPGEubGVuZ3RoO3MrKyl7dmFyIGM9YVtzXSxmPXJbY10sbD1mJiZmLnByb3RvdHlwZTtsJiYhbFt1XSYmaShsLHUsYyksb1tjXT1vLkFycmF5fX0sZnVuY3Rpb24odCxlKXt9LCwsLCwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWUuX19lc01vZHVsZT0hMDt2YXIgaT1uKDY4KSxvPXIoaSksdT1uKDgxKSxhPXIodSkscz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJlwic3ltYm9sXCI9PXR5cGVvZiBvLmRlZmF1bHQ/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09YS5kZWZhdWx0JiZ0IT09YS5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fTtlLmRlZmF1bHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZcInN5bWJvbFwiPT09cyhvLmRlZmF1bHQpP2Z1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10P1widW5kZWZpbmVkXCI6cyh0KX06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PWEuZGVmYXVsdCYmdCE9PWEuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjp2b2lkIDA9PT10P1widW5kZWZpbmVkXCI6cyh0KX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big2OSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDU3KSxuKDYwKSx0LmV4cG9ydHM9bigzMSkuZihcIml0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNiksaT1uKDI3KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbil7dmFyIG8sdSxhPVN0cmluZyhpKGUpKSxzPXIobiksYz1hLmxlbmd0aDtyZXR1cm4gczwwfHxzPj1jP3Q/XCJcIjp2b2lkIDA6KG89YS5jaGFyQ29kZUF0KHMpLG88NTUyOTZ8fG8+NTYzMTl8fHMrMT09PWN8fCh1PWEuY2hhckNvZGVBdChzKzEpKTw1NjMyMHx8dT41NzM0Mz90P2EuY2hhckF0KHMpOm86dD9hLnNsaWNlKHMscysyKTp1LTU2MzIwKyhvLTU1Mjk2PDwxMCkrNjU1MzYpfX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDUyKSxpPW4oMTEpLG89bigyNSksdT17fTtuKDYpKHUsbig3KShcIml0ZXJhdG9yXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QucHJvdG90eXBlPXIodSx7bmV4dDppKDEsbil9KSxvKHQsZStcIiBJdGVyYXRvclwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMpLGk9big4KSxvPW4oMjEpO3QuZXhwb3J0cz1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzOmZ1bmN0aW9uKHQsZSl7aSh0KTtmb3IodmFyIG4sdT1vKGUpLGE9dS5sZW5ndGgscz0wO2E+czspci5mKHQsbj11W3MrK10sZVtuXSk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCk7dC5leHBvcnRzPU9iamVjdChcInpcIikucHJvcGVydHlJc0VudW1lcmFibGUoMCk/T2JqZWN0OmZ1bmN0aW9uKHQpe3JldHVyblwiU3RyaW5nXCI9PXIodCk/dC5zcGxpdChcIlwiKTpPYmplY3QodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyksaT1uKDU4KSxvPW4oNzUpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLHUpe3ZhciBhLHM9cihlKSxjPWkocy5sZW5ndGgpLGY9byh1LGMpO2lmKHQmJm4hPW4pe2Zvcig7Yz5mOylpZigoYT1zW2YrK10pIT1hKXJldHVybiEwfWVsc2UgZm9yKDtjPmY7ZisrKWlmKCh0fHxmIGluIHMpJiZzW2ZdPT09bilyZXR1cm4gdHx8Znx8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjYpLGk9TWF0aC5tYXgsbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9pKHQrZSwwKTpvKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMiksaT1uKDc3KSxvPW4oMjgpKFwiSUVfUFJPVE9cIiksdT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PWkodCkscih0LG8pP3Rbb106XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD91Om51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3Qocih0KSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big3OSksaT1uKDgwKSxvPW4oMjApLHU9bigxMyk7dC5leHBvcnRzPW4oNTApKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9dSh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsaSgxKSk6XCJrZXlzXCI9PWU/aSgwLG4pOlwidmFsdWVzXCI9PWU/aSgwLHRbbl0pOmkoMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLG8uQXJndW1lbnRzPW8uQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big4MiksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDgzKSxuKDYxKSxuKDkwKSxuKDkxKSx0LmV4cG9ydHM9big1KS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEpLGk9bigxMiksbz1uKDIpLHU9bigxNCksYT1uKDUxKSxzPW4oODQpLktFWSxjPW4oOSksZj1uKDI5KSxsPW4oMjUpLHA9bigyMiksaD1uKDcpLGQ9bigzMSksdj1uKDMyKSxnPW4oODUpLHk9big4NiksbT1uKDg3KSxiPW4oOCkseD1uKDEzKSxTPW4oMTUpLHc9bigxMSksXz1uKDUyKSxUPW4oODgpLE89big4OSksUD1uKDMpLEw9bigyMSksRT1PLmYsaj1QLmYsTT1ULmYsST1yLlN5bWJvbCxOPXIuSlNPTiwkPU4mJk4uc3RyaW5naWZ5LGs9aChcIl9oaWRkZW5cIiksQz1oKFwidG9QcmltaXRpdmVcIiksQT17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxGPWYoXCJzeW1ib2wtcmVnaXN0cnlcIiksRD1mKFwic3ltYm9sc1wiKSxXPWYoXCJvcC1zeW1ib2xzXCIpLFI9T2JqZWN0LnByb3RvdHlwZSxHPVwiZnVuY3Rpb25cIj09dHlwZW9mIEksVj1yLlFPYmplY3QsQj0hVnx8IVYucHJvdG90eXBlfHwhVi5wcm90b3R5cGUuZmluZENoaWxkLEg9byYmYyhmdW5jdGlvbigpe3JldHVybiA3IT1fKGooe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBqKHRoaXMsXCJhXCIse3ZhbHVlOjd9KS5hfX0pKS5hfSk/ZnVuY3Rpb24odCxlLG4pe3ZhciByPUUoUixlKTtyJiZkZWxldGUgUltlXSxqKHQsZSxuKSxyJiZ0IT09UiYmaihSLGUscil9OmosWT1mdW5jdGlvbih0KXt2YXIgZT1EW3RdPV8oSS5wcm90b3R5cGUpO3JldHVybiBlLl9rPXQsZX0sSj1HJiZcInN5bWJvbFwiPT10eXBlb2YgSS5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBJfSxYPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PVImJlgoVyxlLG4pLGIodCksZT1TKGUsITApLGIobiksaShELGUpPyhuLmVudW1lcmFibGU/KGkodCxrKSYmdFtrXVtlXSYmKHRba11bZV09ITEpLG49XyhuLHtlbnVtZXJhYmxlOncoMCwhMSl9KSk6KGkodCxrKXx8aih0LGssdygxLHt9KSksdFtrXVtlXT0hMCksSCh0LGUsbikpOmoodCxlLG4pfSxLPWZ1bmN0aW9uKHQsZSl7Yih0KTtmb3IodmFyIG4scj15KGU9eChlKSksaT0wLG89ci5sZW5ndGg7bz5pOylYKHQsbj1yW2krK10sZVtuXSk7cmV0dXJuIHR9LFU9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT9fKHQpOksoXyh0KSxlKX0scT1mdW5jdGlvbih0KXt2YXIgZT1BLmNhbGwodGhpcyx0PVModCwhMCkpO3JldHVybiEodGhpcz09PVImJmkoRCx0KSYmIWkoVyx0KSkmJighKGV8fCFpKHRoaXMsdCl8fCFpKEQsdCl8fGkodGhpcyxrKSYmdGhpc1trXVt0XSl8fGUpfSx6PWZ1bmN0aW9uKHQsZSl7aWYodD14KHQpLGU9UyhlLCEwKSx0IT09Unx8IWkoRCxlKXx8aShXLGUpKXt2YXIgbj1FKHQsZSk7cmV0dXJuIW58fCFpKEQsZSl8fGkodCxrKSYmdFtrXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LFE9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49TSh4KHQpKSxyPVtdLG89MDtuLmxlbmd0aD5vOylpKEQsZT1uW28rK10pfHxlPT1rfHxlPT1zfHxyLnB1c2goZSk7cmV0dXJuIHJ9LFo9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49dD09PVIscj1NKG4/Vzp4KHQpKSxvPVtdLHU9MDtyLmxlbmd0aD51OykhaShELGU9clt1KytdKXx8biYmIWkoUixlKXx8by5wdXNoKERbZV0pO3JldHVybiBvfTtHfHwoST1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBJKXRocm93IFR5cGVFcnJvcihcIlN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciFcIik7dmFyIHQ9cChhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCksZT1mdW5jdGlvbihuKXt0aGlzPT09UiYmZS5jYWxsKFcsbiksaSh0aGlzLGspJiZpKHRoaXNba10sdCkmJih0aGlzW2tdW3RdPSExKSxIKHRoaXMsdCx3KDEsbikpfTtyZXR1cm4gbyYmQiYmSChSLHQse2NvbmZpZ3VyYWJsZTohMCxzZXQ6ZX0pLFkodCl9LGEoSS5wcm90b3R5cGUsXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxPLmY9eixQLmY9WCxuKDU1KS5mPVQuZj1RLG4oMzMpLmY9cSxuKDU0KS5mPVosbyYmIW4oMjMpJiZhKFIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLHEsITApLGQuZj1mdW5jdGlvbih0KXtyZXR1cm4gWShoKHQpKX0pLHUodS5HK3UuVyt1LkYqIUcse1N5bWJvbDpJfSk7Zm9yKHZhciB0dD1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLGV0PTA7dHQubGVuZ3RoPmV0OyloKHR0W2V0KytdKTtmb3IodmFyIG50PUwoaC5zdG9yZSkscnQ9MDtudC5sZW5ndGg+cnQ7KXYobnRbcnQrK10pO3UodS5TK3UuRiohRyxcIlN5bWJvbFwiLHtmb3I6ZnVuY3Rpb24odCl7cmV0dXJuIGkoRix0Kz1cIlwiKT9GW3RdOkZbdF09SSh0KX0sa2V5Rm9yOmZ1bmN0aW9uKHQpe2lmKEoodCkpcmV0dXJuIGcoRix0KTt0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBzeW1ib2whXCIpfSx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtCPSEwfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtCPSExfX0pLHUodS5TK3UuRiohRyxcIk9iamVjdFwiLHtjcmVhdGU6VSxkZWZpbmVQcm9wZXJ0eTpYLGRlZmluZVByb3BlcnRpZXM6SyxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6eixnZXRPd25Qcm9wZXJ0eU5hbWVzOlEsZ2V0T3duUHJvcGVydHlTeW1ib2xzOlp9KSxOJiZ1KHUuUyt1LkYqKCFHfHxjKGZ1bmN0aW9uKCl7dmFyIHQ9SSgpO3JldHVyblwiW251bGxdXCIhPSQoW3RdKXx8XCJ7fVwiIT0kKHthOnR9KXx8XCJ7fVwiIT0kKE9iamVjdCh0KSl9KSksXCJKU09OXCIse3N0cmluZ2lmeTpmdW5jdGlvbih0KXtpZih2b2lkIDAhPT10JiYhSih0KSl7Zm9yKHZhciBlLG4scj1bdF0saT0xO2FyZ3VtZW50cy5sZW5ndGg+aTspci5wdXNoKGFyZ3VtZW50c1tpKytdKTtyZXR1cm4gZT1yWzFdLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLCFuJiZtKGUpfHwoZT1mdW5jdGlvbih0LGUpe2lmKG4mJihlPW4uY2FsbCh0aGlzLHQsZSkpLCFKKGUpKXJldHVybiBlfSksclsxXT1lLCQuYXBwbHkoTixyKX19fSksSS5wcm90b3R5cGVbQ118fG4oNikoSS5wcm90b3R5cGUsQyxJLnByb3RvdHlwZS52YWx1ZU9mKSxsKEksXCJTeW1ib2xcIiksbChNYXRoLFwiTWF0aFwiLCEwKSxsKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIyKShcIm1ldGFcIiksaT1uKDQpLG89bigxMiksdT1uKDMpLmYsYT0wLHM9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYz0hbig5KShmdW5jdGlvbigpe3JldHVybiBzKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpfSksZj1mdW5jdGlvbih0KXt1KHQscix7dmFsdWU6e2k6XCJPXCIrICsrYSx3Ont9fX0pfSxsPWZ1bmN0aW9uKHQsZSl7aWYoIWkodCkpcmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHQ/dDooXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCJTXCI6XCJQXCIpK3Q7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuXCJGXCI7aWYoIWUpcmV0dXJuXCJFXCI7Zih0KX1yZXR1cm4gdFtyXS5pfSxwPWZ1bmN0aW9uKHQsZSl7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuITA7aWYoIWUpcmV0dXJuITE7Zih0KX1yZXR1cm4gdFtyXS53fSxoPWZ1bmN0aW9uKHQpe3JldHVybiBjJiZkLk5FRUQmJnModCkmJiFvKHQscikmJmYodCksdH0sZD10LmV4cG9ydHM9e0tFWTpyLE5FRUQ6ITEsZmFzdEtleTpsLGdldFdlYWs6cCxvbkZyZWV6ZTpofX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjEpLGk9bigxMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuLG89aSh0KSx1PXIobyksYT11Lmxlbmd0aCxzPTA7YT5zOylpZihvW249dVtzKytdXT09PWUpcmV0dXJuIG59fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDU0KSxvPW4oMzMpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1yKHQpLG49aS5mO2lmKG4pZm9yKHZhciB1LGE9bih0KSxzPW8uZixjPTA7YS5sZW5ndGg+Yzspcy5jYWxsKHQsdT1hW2MrK10pJiZlLnB1c2godSk7cmV0dXJuIGV9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNCk7dC5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVyblwiQXJyYXlcIj09cih0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEzKSxpPW4oNTUpLmYsbz17fS50b1N0cmluZyx1PVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdyYmT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM/T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KTpbXSxhPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gaSh0KX1jYXRjaCh0KXtyZXR1cm4gdS5zbGljZSgpfX07dC5leHBvcnRzLmY9ZnVuY3Rpb24odCl7cmV0dXJuIHUmJlwiW29iamVjdCBXaW5kb3ddXCI9PW8uY2FsbCh0KT9hKHQpOmkocih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzMyksaT1uKDExKSxvPW4oMTMpLHU9bigxNSksYT1uKDEyKSxzPW4oMTkpLGM9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtlLmY9bigyKT9jOmZ1bmN0aW9uKHQsZSl7aWYodD1vKHQpLGU9dShlLCEwKSxzKXRyeXtyZXR1cm4gYyh0LGUpfWNhdGNoKHQpe31pZihhKHQsZSkpcmV0dXJuIGkoIXIuZi5jYWxsKHQsZSksdFtlXSl9fSxmdW5jdGlvbih0LGUsbil7bigzMikoXCJhc3luY0l0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7bigzMikoXCJvYnNlcnZhYmxlXCIpfSwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oMjkxKX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjkyKSxpPW4ubihyKTtuLmQoZSxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBpLmF9KX0sZnVuY3Rpb24odCxlLG4pe2Z1bmN0aW9uIHIodCl7bigyOTMpfXZhciBpPW4oMCkobigyOTQpLG4oMjk2KSxyLFwiZGF0YS12LTQ3MzcwNTIxXCIsbnVsbCk7dC5leHBvcnRzPWkuZXhwb3J0c30sZnVuY3Rpb24odCxlKXt9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI5NSk7ZS5kZWZhdWx0PXtuYW1lOlwid3Ytc3dpcGVcIixjcmVhdGVkOmZ1bmN0aW9uKCl7dGhpcy5kcmFnU3RhdGU9e319LGRhdGE6ZnVuY3Rpb24oKXtyZXR1cm57cmVhZHk6ITEsZHJhZ2dpbmc6ITEsdXNlclNjcm9sbGluZzohMSxhbmltYXRpbmc6ITEsaW5kZXg6MCxwYWdlczpbXSx0aW1lcjpudWxsLHJlSW5pdFRpbWVyOm51bGwsbm9EcmFnOiExfX0scHJvcHM6e2hlaWdodDp7dHlwZTpOdW1iZXIsZGVmYXVsdDoxODB9LHNwZWVkOnt0eXBlOk51bWJlcixkZWZhdWx0OjMwMH0sZGVmYXVsdEluZGV4Ont0eXBlOk51bWJlcixkZWZhdWx0OjB9LGF1dG86e3R5cGU6TnVtYmVyLGRlZmF1bHQ6M2UzfSxjb250aW51b3VzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sc2hvd0luZGljYXRvcnM6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxub0RyYWdXaGVuU2luZ2xlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0scHJldmVudDp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITF9fSxtb3VudGVkOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLnJlYWR5PSEwLHRoaXMuYXV0bz4wJiYodGhpcy50aW1lcj1zZXRJbnRlcnZhbChmdW5jdGlvbigpe2lmKCF0LmNvbnRpbnVvdXMmJnQuaW5kZXg+PXQucGFnZXMubGVuZ3RoLTEpcmV0dXJuIHQuY2xlYXJUaW1lcigpO3QuZHJhZ2dpbmd8fHQuYW5pbWF0aW5nfHx0Lm5leHQoKX0sdGhpcy5hdXRvKSksdGhpcy5yZUluaXRQYWdlcygpO3ZhciBlPXRoaXMuJGVsO2UuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIixmdW5jdGlvbihlKXt0LnByZXZlbnQmJmUucHJldmVudERlZmF1bHQoKSx0LmFuaW1hdGluZ3x8KHQuZHJhZ2dpbmc9ITAsdC51c2VyU2Nyb2xsaW5nPSExLHQub25Ub3VjaFN0YXJ0KGUpKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGZ1bmN0aW9uKGUpe3QuZHJhZ2dpbmcmJnQub25Ub3VjaE1vdmUoZSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpe2lmKHQudXNlclNjcm9sbGluZylyZXR1cm4gdC5kcmFnZ2luZz0hMSx2b2lkKHQuZHJhZ1N0YXRlPXt9KTt0LmRyYWdnaW5nJiYodC5vblRvdWNoRW5kKGUpLHQuZHJhZ2dpbmc9ITEpfSl9LG1ldGhvZHM6e3N3aXBlSXRlbUNyZWF0ZWQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucmVhZHkmJihjbGVhclRpbWVvdXQodGhpcy5yZUluaXRUaW1lciksdGhpcy5yZUluaXRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5yZUluaXRQYWdlcygpfSwxMDApKX0sc3dpcGVJdGVtRGVzdHJveWVkOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLnJlYWR5JiYoY2xlYXJUaW1lb3V0KHRoaXMucmVJbml0VGltZXIpLHRoaXMucmVJbml0VGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe3QucmVJbml0UGFnZXMoKX0sMTAwKSl9LHRyYW5zbGF0ZTpmdW5jdGlvbih0LGUsbixpKXt2YXIgbz10aGlzLHU9YXJndW1lbnRzO2lmKG4pe3RoaXMuYW5pbWF0aW5nPSEwLHQuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cIi13ZWJraXQtdHJhbnNmb3JtIFwiK24rXCJtcyBlYXNlLWluLW91dFwiLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZTNkKFwiK2UrXCJweCwgMCwgMClcIn0sNTApO3ZhciBhPSExLHM9ZnVuY3Rpb24oKXthfHwoYT0hMCxvLmFuaW1hdGluZz0hMSx0LnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCJcIix0LnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cIlwiLGkmJmkuYXBwbHkobyx1KSl9O09iamVjdChyLmIpKHQsXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIscyksc2V0VGltZW91dChzLG4rMTAwKX1lbHNlIHQuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cIlwiLHQuc3R5bGUud2Via2l0VHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrZStcInB4LCAwLCAwKVwifSxyZUluaXRQYWdlczpmdW5jdGlvbigpe3ZhciB0PXRoaXMuJGNoaWxkcmVuO3RoaXMubm9EcmFnPTE9PT10Lmxlbmd0aCYmdGhpcy5ub0RyYWdXaGVuU2luZ2xlO3ZhciBlPVtdLG49TWF0aC5mbG9vcih0aGlzLmRlZmF1bHRJbmRleCksaT1uPj0wJiZuPHQubGVuZ3RoP246MDt0aGlzLmluZGV4PWksdC5mb3JFYWNoKGZ1bmN0aW9uKHQsbil7ZS5wdXNoKHQuJGVsKSxPYmplY3Qoci5jKSh0LiRlbCxcImlzLWFjdGl2ZVwiKSxuPT09aSYmT2JqZWN0KHIuYSkodC4kZWwsXCJpcy1hY3RpdmVcIil9KSx0aGlzLnBhZ2VzPWV9LGRvQW5pbWF0ZTpmdW5jdGlvbih0LGUpe3ZhciBuPXRoaXM7aWYoMCE9PXRoaXMuJGNoaWxkcmVuLmxlbmd0aCYmKGV8fCEodGhpcy4kY2hpbGRyZW4ubGVuZ3RoPDIpKSl7dmFyIGk9dm9pZCAwLG89dm9pZCAwLHU9dm9pZCAwLGE9dm9pZCAwLHM9dm9pZCAwLGM9dGhpcy5zcGVlZHx8MzAwLGY9dGhpcy5pbmRleCxsPXRoaXMucGFnZXMscD1sLmxlbmd0aDtlPyhpPWUucHJldlBhZ2UsdT1lLmN1cnJlbnRQYWdlLG89ZS5uZXh0UGFnZSxhPWUucGFnZVdpZHRoLHM9ZS5vZmZzZXRMZWZ0KTooYT10aGlzLiRlbC5jbGllbnRXaWR0aCx1PWxbZl0saT1sW2YtMV0sbz1sW2YrMV0sdGhpcy5jb250aW51b3VzJiZsLmxlbmd0aD4xJiYoaXx8KGk9bFtsLmxlbmd0aC0xXSksb3x8KG89bFswXSkpLGkmJihpLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLHRoaXMudHJhbnNsYXRlKGksLWEpKSxvJiYoby5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIix0aGlzLnRyYW5zbGF0ZShvLGEpKSk7dmFyIGg9dm9pZCAwLGQ9dGhpcy4kY2hpbGRyZW5bZl0uJGVsO1wicHJldlwiPT09dD8oZj4wJiYoaD1mLTEpLHRoaXMuY29udGludW91cyYmMD09PWYmJihoPXAtMSkpOlwibmV4dFwiPT09dCYmKGY8cC0xJiYoaD1mKzEpLHRoaXMuY29udGludW91cyYmZj09PXAtMSYmKGg9MCkpO3ZhciB2PWZ1bmN0aW9uKCl7aWYodm9pZCAwIT09aCl7dmFyIHQ9bi4kY2hpbGRyZW5baF0uJGVsO09iamVjdChyLmMpKGQsXCJpcy1hY3RpdmVcIiksT2JqZWN0KHIuYSkodCxcImlzLWFjdGl2ZVwiKSxuLmluZGV4PWh9aSYmKGkuc3R5bGUuZGlzcGxheT1cIlwiKSxvJiYoby5zdHlsZS5kaXNwbGF5PVwiXCIpfTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XCJuZXh0XCI9PT10PyhuLnRyYW5zbGF0ZSh1LC1hLGMsdiksbyYmbi50cmFuc2xhdGUobywwLGMpKTpcInByZXZcIj09PXQ/KG4udHJhbnNsYXRlKHUsYSxjLHYpLGkmJm4udHJhbnNsYXRlKGksMCxjKSk6KG4udHJhbnNsYXRlKHUsMCxjLHYpLHZvaWQgMCE9PXM/KGkmJnM+MCYmbi50cmFuc2xhdGUoaSwtMSphLGMpLG8mJnM8MCYmbi50cmFuc2xhdGUobyxhLGMpKTooaSYmbi50cmFuc2xhdGUoaSwtMSphLGMpLG8mJm4udHJhbnNsYXRlKG8sYSxjKSkpfSwxMCl9fSxuZXh0OmZ1bmN0aW9uKCl7dGhpcy5kb0FuaW1hdGUoXCJuZXh0XCIpfSxwcmV2OmZ1bmN0aW9uKCl7dGhpcy5kb0FuaW1hdGUoXCJwcmV2XCIpfSxvblRvdWNoU3RhcnQ6ZnVuY3Rpb24odCl7aWYoIXRoaXMubm9EcmFnKXt2YXIgZT10aGlzLiRlbCxuPXRoaXMuZHJhZ1N0YXRlLHI9dC50b3VjaGVzWzBdO24uc3RhcnRUaW1lPW5ldyBEYXRlLG4uc3RhcnRMZWZ0PXIucGFnZVgsbi5zdGFydFRvcD1yLnBhZ2VZLG4uc3RhcnRUb3BBYnNvbHV0ZT1yLmNsaWVudFksbi5wYWdlV2lkdGg9ZS5vZmZzZXRXaWR0aCxuLnBhZ2VIZWlnaHQ9ZS5vZmZzZXRIZWlnaHQ7dmFyIGk9dGhpcy4kY2hpbGRyZW5bdGhpcy5pbmRleC0xXSxvPXRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXhdLHU9dGhpcy4kY2hpbGRyZW5bdGhpcy5pbmRleCsxXTt0aGlzLmNvbnRpbnVvdXMmJnRoaXMucGFnZXMubGVuZ3RoPjEmJihpfHwoaT10aGlzLiRjaGlsZHJlblt0aGlzLiRjaGlsZHJlbi5sZW5ndGgtMV0pLHV8fCh1PXRoaXMuJGNoaWxkcmVuWzBdKSksbi5wcmV2UGFnZT1pP2kuJGVsOm51bGwsbi5kcmFnUGFnZT1vP28uJGVsOm51bGwsbi5uZXh0UGFnZT11P3UuJGVsOm51bGwsbi5wcmV2UGFnZSYmKG4ucHJldlBhZ2Uuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIpLG4ubmV4dFBhZ2UmJihuLm5leHRQYWdlLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiKX19LG9uVG91Y2hNb3ZlOmZ1bmN0aW9uKHQpe2lmKCF0aGlzLm5vRHJhZyl7dmFyIGU9dGhpcy5kcmFnU3RhdGUsbj10LnRvdWNoZXNbMF07ZS5jdXJyZW50TGVmdD1uLnBhZ2VYLGUuY3VycmVudFRvcD1uLnBhZ2VZLGUuY3VycmVudFRvcEFic29sdXRlPW4uY2xpZW50WTt2YXIgcj1lLmN1cnJlbnRMZWZ0LWUuc3RhcnRMZWZ0LGk9ZS5jdXJyZW50VG9wQWJzb2x1dGUtZS5zdGFydFRvcEFic29sdXRlLG89TWF0aC5hYnMociksdT1NYXRoLmFicyhpKTtpZihvPDV8fG8+PTUmJnU+PTEuNzMqbylyZXR1cm4gdm9pZCh0aGlzLnVzZXJTY3JvbGxpbmc9ITApO3RoaXMudXNlclNjcm9sbGluZz0hMSx0LnByZXZlbnREZWZhdWx0KCkscj1NYXRoLm1pbihNYXRoLm1heCgxLWUucGFnZVdpZHRoLHIpLGUucGFnZVdpZHRoLTEpO3ZhciBhPXI8MD9cIm5leHRcIjpcInByZXZcIjtlLnByZXZQYWdlJiZcInByZXZcIj09PWEmJnRoaXMudHJhbnNsYXRlKGUucHJldlBhZ2Usci1lLnBhZ2VXaWR0aCksdGhpcy50cmFuc2xhdGUoZS5kcmFnUGFnZSxyKSxlLm5leHRQYWdlJiZcIm5leHRcIj09PWEmJnRoaXMudHJhbnNsYXRlKGUubmV4dFBhZ2UscitlLnBhZ2VXaWR0aCl9fSxvblRvdWNoRW5kOmZ1bmN0aW9uKCl7aWYoIXRoaXMubm9EcmFnKXt2YXIgdD10aGlzLmRyYWdTdGF0ZSxlPW5ldyBEYXRlLXQuc3RhcnRUaW1lLG49bnVsbCxyPXQuY3VycmVudExlZnQtdC5zdGFydExlZnQsaT10LmN1cnJlbnRUb3AtdC5zdGFydFRvcCxvPXQucGFnZVdpZHRoLHU9dGhpcy5pbmRleCxhPXRoaXMucGFnZXMubGVuZ3RoO2lmKGU8MzAwKXt2YXIgcz1NYXRoLmFicyhyKTw1JiZNYXRoLmFicyhpKTw1Oyhpc05hTihyKXx8aXNOYU4oaSkpJiYocz0hMCkscyYmdGhpcy4kY2hpbGRyZW5bdGhpcy5pbmRleF0uJGVtaXQoXCJ0YXBcIil9ZTwzMDAmJnZvaWQgMD09PXQuY3VycmVudExlZnR8fCgoZTwzMDB8fE1hdGguYWJzKHIpPm8vMikmJihuPXI8MD9cIm5leHRcIjpcInByZXZcIiksdGhpcy5jb250aW51b3VzfHwoMD09PXUmJlwicHJldlwiPT09bnx8dT09PWEtMSYmXCJuZXh0XCI9PT1uKSYmKG49bnVsbCksdGhpcy4kY2hpbGRyZW4ubGVuZ3RoPDImJihuPW51bGwpLHRoaXMuZG9BbmltYXRlKG4se29mZnNldExlZnQ6cixwYWdlV2lkdGg6dC5wYWdlV2lkdGgscHJldlBhZ2U6dC5wcmV2UGFnZSxjdXJyZW50UGFnZTp0LmRyYWdQYWdlLG5leHRQYWdlOnQubmV4dFBhZ2V9KSx0aGlzLmRyYWdTdGF0ZT17fSl9fSxjbGVhclRpbWVyOmZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKSx0aGlzLnRpbWVyPW51bGx9fSxkZXN0cm95ZWQ6ZnVuY3Rpb24oKXt0aGlzLnRpbWVyJiYoY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKSx0aGlzLnRpbWVyPW51bGwpLHRoaXMucmVJbml0VGltZXImJihjbGVhclRpbWVvdXQodGhpcy5yZUluaXRUaW1lciksdGhpcy5yZUluaXRUaW1lcj1udWxsKX0sd2F0Y2g6e2luZGV4OmZ1bmN0aW9uKHQpe3RoaXMuJGVtaXQoXCJjaGFuZ2VcIix0KX19fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCxlKXtpZighdHx8IWUpcmV0dXJuITE7aWYoLTEhPT1lLmluZGV4T2YoXCIgXCIpKXRocm93IG5ldyBFcnJvcihcImNsYXNzTmFtZSBzaG91bGQgbm90IGNvbnRhaW4gc3BhY2UuXCIpO3JldHVybiB0LmNsYXNzTGlzdD90LmNsYXNzTGlzdC5jb250YWlucyhlKTooXCIgXCIrdC5jbGFzc05hbWUrXCIgXCIpLmluZGV4T2YoXCIgXCIrZStcIiBcIik+LTF9ZnVuY3Rpb24gaSh0LGUpe2lmKHQpe2Zvcih2YXIgbj10LmNsYXNzTmFtZSxpPShlfHxcIlwiKS5zcGxpdChcIiBcIiksbz0wLHU9aS5sZW5ndGg7bzx1O28rKyl7dmFyIGE9aVtvXTthJiYodC5jbGFzc0xpc3Q/dC5jbGFzc0xpc3QuYWRkKGEpOnIodCxhKXx8KG4rPVwiIFwiK2EpKX10LmNsYXNzTGlzdHx8KHQuY2xhc3NOYW1lPW4pfX1mdW5jdGlvbiBvKHQsZSl7aWYodCYmZSl7Zm9yKHZhciBuPWUuc3BsaXQoXCIgXCIpLGk9XCIgXCIrdC5jbGFzc05hbWUrXCIgXCIsbz0wLHU9bi5sZW5ndGg7bzx1O28rKyl7dmFyIGE9bltvXTthJiYodC5jbGFzc0xpc3Q/dC5jbGFzc0xpc3QucmVtb3ZlKGEpOnIodCxhKSYmKGk9aS5yZXBsYWNlKFwiIFwiK2ErXCIgXCIsXCIgXCIpKSl9dC5jbGFzc0xpc3R8fCh0LmNsYXNzTmFtZT1mKGkpKX19bi5kKGUsXCJiXCIsZnVuY3Rpb24oKXtyZXR1cm4gaH0pLGUuYT1pLGUuYz1vO3ZhciB1PW4oNjcpLGE9KG4ubih1KSxuKDEwKSkscz1uLm4oYSksYz1zLmEucHJvdG90eXBlLiRpc1NlcnZlcixmPShjfHxOdW1iZXIoZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSxmdW5jdGlvbih0KXtyZXR1cm4odHx8XCJcIikucmVwbGFjZSgvXltcXHNcXHVGRUZGXSt8W1xcc1xcdUZFRkZdKyQvZyxcIlwiKX0pLGw9ZnVuY3Rpb24oKXtyZXR1cm4hYyYmZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbih0LGUsbil7dCYmZSYmbiYmdC5hZGRFdmVudExpc3RlbmVyKGUsbiwhMSl9OmZ1bmN0aW9uKHQsZSxuKXt0JiZlJiZuJiZ0LmF0dGFjaEV2ZW50KFwib25cIitlLG4pfX0oKSxwPWZ1bmN0aW9uKCl7cmV0dXJuIWMmJmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24odCxlLG4pe3QmJmUmJnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLG4sITEpfTpmdW5jdGlvbih0LGUsbil7dCYmZSYmdC5kZXRhY2hFdmVudChcIm9uXCIrZSxuKX19KCksaD1mdW5jdGlvbih0LGUsbil7bCh0LGUsZnVuY3Rpb24gcigpe24mJm4uYXBwbHkodGhpcyxhcmd1bWVudHMpLHAodCxlLHIpfSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXQuJGNyZWF0ZUVsZW1lbnQsbj10Ll9zZWxmLl9jfHxlO3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3Ytc3dpcGVcIixzdHlsZTp7aGVpZ2h0OnQuaGVpZ2h0K1wicHhcIn19LFtuKFwiZGl2XCIse3JlZjpcIndyYXBwZXJcIixzdGF0aWNDbGFzczpcInd2LXN3aXBlLXdyYXBwZXJcIn0sW3QuX3QoXCJkZWZhdWx0XCIpXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTp0LnNob3dJbmRpY2F0b3JzLGV4cHJlc3Npb246XCJzaG93SW5kaWNhdG9yc1wifV0sc3RhdGljQ2xhc3M6XCJ3di1zd2lwZS1pbmRpY2F0b3JzXCJ9LHQuX2wodC5wYWdlcyxmdW5jdGlvbihlLHIpe3JldHVybiBuKFwiZGl2XCIse2tleTpyLHN0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaW5kaWNhdG9yXCIsY2xhc3M6e1wiaXMtYWN0aXZlXCI6cj09PXQuaW5kZXh9fSl9KSldKX0sc3RhdGljUmVuZGVyRm5zOltdfX1dKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDggMTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL251bWJlci1zcGlubmVyL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNjEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAxMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnd2LW51bWJlci1zcGlubmVyW2RhdGEtdi1kOTQwNzc2YV17ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2ZvbnQtc2l6ZToxMnB4O292ZXJmbG93OmhpZGRlbn0ud3YtbnVtYmVyLXNwaW5uZXIgaW5wdXRbZGF0YS12LWQ5NDA3NzZhXXtkaXNwbGF5OmlubGluZS1ibG9jaztmbG9hdDpsZWZ0O2JvcmRlcjpub25lO291dGxpbmU6bm9uZTtwYWRkaW5nOjAgLjVlbX0ud3YtbnVtYmVyLXNwaW5uZXIgLnNwaW5uZXItYnRuW2RhdGEtdi1kOTQwNzc2YV17ZGlzcGxheTppbmxpbmUtYmxvY2s7ZmxvYXQ6bGVmdDtjb2xvcjojMDAwO2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmc6MCAuNmVtO2JvcmRlcjpub25lfS53di1udW1iZXItc3Bpbm5lciAuYnRuLWRlY3JlYXNlW2RhdGEtdi1kOTQwNzc2YV17Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjY2NjfS53di1udW1iZXItc3Bpbm5lciAuYnRuLWluY3JlYXNlW2RhdGEtdi1kOTQwNzc2YV17Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjY2N9Lnd2LW51bWJlci1zcGlubmVyIC5zcGlubmVyLWJ0bltkaXNhYmxlZF1bZGF0YS12LWQ5NDA3NzZhXXtjb2xvcjojODg4fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9udW1iZXItc3Bpbm5lci9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgMTEiLCJtb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgaT1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKGkuZXhwb3J0cyxpLGkuZXhwb3J0cyx0KSxpLmw9ITAsaS5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MzY0KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixpKXt2YXIgdSxzPWU9ZXx8e30sYT10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1hJiZcImZ1bmN0aW9uXCIhPT1hfHwodT1lLHM9ZS5kZWZhdWx0KTt2YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzP3Mub3B0aW9uczpzO3QmJihvLnJlbmRlcj10LnJlbmRlcixvLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyksciYmKG8uX3Njb3BlSWQ9cik7dmFyIGw7aWYoaT8obD1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksbiYmbi5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sby5fc3NyUmVnaXN0ZXI9bCk6biYmKGw9biksbCl7dmFyIGM9by5mdW5jdGlvbmFsLGQ9Yz9vLnJlbmRlcjpvLmJlZm9yZUNyZWF0ZTtjP28ucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGwuY2FsbCh0KSxkKGUsdCl9Om8uYmVmb3JlQ3JlYXRlPWQ/W10uY29uY2F0KGQsbCk6W2xdfXJldHVybntlc01vZHVsZTp1LGV4cG9ydHM6cyxvcHRpb25zOm99fX0sMzY0OmZ1bmN0aW9uKGUsdCxuKXtlLmV4cG9ydHM9bigzNjUpfSwzNjU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMzY2KSxpPW4ubihyKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBpLmF9KX0sMzY2OmZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiByKGUpe24oMzY3KX12YXIgaT1uKDApKG4oMzY4KSxuKDM2OSkscixcImRhdGEtdi1kOTQwNzc2YVwiLG51bGwpO2UuZXhwb3J0cz1pLmV4cG9ydHN9LDM2NzpmdW5jdGlvbihlLHQpe30sMzY4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmRlZmF1bHQ9e25hbWU6XCJ3di1udW1iZXItc3Bpbm5lclwiLHByb3BzOnttaW46e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH0sbWF4Ont0eXBlOk51bWJlcixkZWZhdWx0OjEwMH0sc3RlcDp7dHlwZTpOdW1iZXIsZGVmYXVsdDoxfSxpbnB1dFdpZHRoOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiM2VtXCJ9LGZpbGxhYmxlOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sZGlzYWJsZWQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfSxhbGlnbjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcImNlbnRlclwifSx2YWx1ZTp7dmFsaWRhdG9yOmZ1bmN0aW9uKGUpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiBlfHxcIlwiPT09ZX0sZGVmYXVsdDowfX0sZGF0YTpmdW5jdGlvbigpe3JldHVybntjdXJyZW50VmFsdWU6dGhpcy52YWx1ZX19LGNvbXB1dGVkOntidG5EZWNyZWFzZURpc2FibGVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlzYWJsZWR8fHRoaXMuY3VycmVudFZhbHVlPT09dGhpcy5taW59LGJ0bkluY3JlYXNlRGlzYWJsZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaXNhYmxlZHx8dGhpcy5jdXJyZW50VmFsdWU9PT10aGlzLm1heH0saW5wdXRTdHlsZTpmdW5jdGlvbigpe3JldHVybnt3aWR0aDp0aGlzLmlucHV0V2lkdGgsdGV4dEFsaWduOnRoaXMuYWxpZ259fX0sbWV0aG9kczp7b25CbHVyOmZ1bmN0aW9uKCl7XCJcIj09PXRoaXMuY3VycmVudFZhbHVlJiYodGhpcy5jdXJyZW50VmFsdWU9dGhpcy5taW4pfSxpbmNyZWFzZTpmdW5jdGlvbigpe3RoaXMuY3VycmVudFZhbHVlKz10aGlzLnN0ZXB9LGRlY3JlYXNlOmZ1bmN0aW9uKCl7dGhpcy5jdXJyZW50VmFsdWUtPXRoaXMuc3RlcH19LHdhdGNoOntjdXJyZW50VmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy4kZW1pdChcImlucHV0XCIsZSksdGhpcy4kZW1pdChcImNoYW5nZVwiLGUpfSx2YWx1ZTpmdW5jdGlvbihlKXtcIm51bWJlclwiPT10eXBlb2YgZT9lPD10aGlzLm1pbj90aGlzLmN1cnJlbnRWYWx1ZT10aGlzLm1pbjplPj10aGlzLm1heD90aGlzLmN1cnJlbnRWYWx1ZT10aGlzLm1heDp0aGlzLmN1cnJlbnRWYWx1ZT1lOlwiXCI9PT1lJiYodGhpcy5jdXJyZW50VmFsdWU9XCJcIil9fX19LDM2OTpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3YtbnVtYmVyLXNwaW5uZXJcIn0sW24oXCJidXR0b25cIix7c3RhdGljQ2xhc3M6XCJzcGlubmVyLWJ0biBidG4tZGVjcmVhc2VcIixjbGFzczp7XCJidG4tZGlzYWJsZWRcIjplLmJ0bkRlY3JlYXNlRGlzYWJsZWR9LGF0dHJzOntkaXNhYmxlZDplLmRpc2FibGVkfSxvbjp7Y2xpY2s6ZS5kZWNyZWFzZX19LFtlLl92KFwiLVwiKV0pLGUuX3YoXCIgXCIpLG4oXCJpbnB1dFwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcIm1vZGVsXCIscmF3TmFtZTpcInYtbW9kZWwubnVtYmVyXCIsdmFsdWU6ZS5jdXJyZW50VmFsdWUsZXhwcmVzc2lvbjpcImN1cnJlbnRWYWx1ZVwiLG1vZGlmaWVyczp7bnVtYmVyOiEwfX1dLHN0eWxlOmUuaW5wdXRTdHlsZSxhdHRyczp7dHlwZTpcIm51bWJlclwiLGRpc2FibGVkOmUuZGlzYWJsZWQscmVhZG9ubHk6IWUuZmlsbGFibGV9LGRvbVByb3BzOnt2YWx1ZTplLmN1cnJlbnRWYWx1ZX0sb246e2JsdXI6W2Uub25CbHVyLGZ1bmN0aW9uKHQpe2UuJGZvcmNlVXBkYXRlKCl9XSxpbnB1dDpmdW5jdGlvbih0KXt0LnRhcmdldC5jb21wb3Npbmd8fChlLmN1cnJlbnRWYWx1ZT1lLl9uKHQudGFyZ2V0LnZhbHVlKSl9fX0pLGUuX3YoXCIgXCIpLG4oXCJidXR0b25cIix7c3RhdGljQ2xhc3M6XCJzcGlubmVyLWJ0biBidG4taW5jcmVhc2VcIixjbGFzczp7XCJidG4tZGlzYWJsZWRcIjplLmJ0bkluY3JlYXNlRGlzYWJsZWR9LGF0dHJzOntkaXNhYmxlZDplLmRpc2FibGVkfSxvbjp7Y2xpY2s6ZS5pbmNyZWFzZX19LFtlLl92KFwiK1wiKV0pXSl9LHN0YXRpY1JlbmRlckZuczpbXX19fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9udW1iZXItc3Bpbm5lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAxMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02ZWMwNDBmOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJiNzM0OGZkZVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02ZWMwNDBmOFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Byb2R1Y3QudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTZlYzA0MGY4XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcHJvZHVjdC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNmVjMDQwZjhcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWVcbi8vIG1vZHVsZSBpZCA9IDcxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmJhbm5lci1zd2lwZS1pdGVtW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4uZGV0YWlsc1tkYXRhLXYtNmVjMDQwZjhdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5kZXRhaWxzIC5uYW1lW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICBmb250LXNpemU6IDE3cHg7XFxuICAgIGNvbG9yOiAjNjY2O1xcbn1cXG4uZGV0YWlscyAucHJpY2VbZGF0YS12LTZlYzA0MGY4XSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTdweDtcXG4gICAgY29sb3I6IHJlZDtcXG59XFxuLmRlc2NyaXB0aW9uW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDFyZW0gMC41cmVtIDgwcHggMC41cmVtO1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgY29sb3I6ICM2NjY7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG4ucG9wdXAtZm9vdGVyW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG1hcmdpbi10b3A6IDFlbTtcXG59XFxuLnBvcHVwLWZvb3RlciAuYnRuW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgICBmbGV4OiAxO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IC41ZW0gMDtcXG4gICAgY29sb3I6ICNmZmY7XFxufVxcbi5wb3B1cC1mb290ZXIgLnBvcHVwLWJ0bi1hZGQtY2FydFtkYXRhLXYtNmVjMDQwZjhdIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5mb290ZXJbZGF0YS12LTZlYzA0MGY4XSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQ1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XFxufVxcbmZvb3RlciAuYnRuW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgICBjb2xvcjogIzU1NTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAycHggMDtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGZsZXgtYmFzaXM6IDgwcHg7XFxufVxcbmZvb3RlciAuYnRuIC5pY29uW2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5mb290ZXIgLmJ0biAuaWNvbi5pcy1mYXZvdXJpdGVbZGF0YS12LTZlYzA0MGY4XSB7XFxuICAgICAgICBjb2xvcjogI2YwMDtcXG59XFxuZm9vdGVyIC5idG4gLmFtb3VudFtkYXRhLXYtNmVjMDQwZjhdIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcXG4gICAgICB0b3A6IDNweDtcXG4gICAgICByaWdodDogMjBweDtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgICAgcGFkZGluZzogMCA0cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5mb290ZXIgLmJ0biAudGV4dFtkYXRhLXYtNmVjMDQwZjhdIHtcXG4gICAgICBmb250LXNpemU6IDEycHg7XFxufVxcbmZvb3RlciAuYnRuLWFkZC1jYXJ0W2RhdGEtdi02ZWMwNDBmOF0ge1xcbiAgICBoZWlnaHQ6IDQ1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjMDA7XFxuICAgIGZsZXgtZ3JvdzogNTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtDQUFFO0FBRXJCO0VBQ0UsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixpQkFBaUI7Q0FBRTtBQUNuQjtJQUNFLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFdBQVc7Q0FBRTtBQUVqQjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGlDQUFpQztFQUNqQyxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixpQkFBaUI7Q0FBRTtBQUVyQjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7Q0FBRTtBQUNsQjtJQUNFLFFBQVE7SUFDUixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLHNCQUFzQjtDQUFFO0FBRTVCO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsMkJBQTJCO0NBQUU7QUFDN0I7SUFDRSxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGlCQUFpQjtDQUFFO0FBQ25CO01BQ0UsZUFBZTtDQUFFO0FBQ2pCO1FBQ0UsWUFBWTtDQUFFO0FBQ2xCO01BQ0UsbUJBQW1CO01BQ25CLHVCQUF1QjtNQUN2QixTQUFTO01BQ1QsWUFBWTtNQUNaLFlBQVk7TUFDWixnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLG1CQUFtQjtDQUFFO0FBQ3ZCO01BQ0UsZ0JBQWdCO0NBQUU7QUFDdEI7SUFDRSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsYUFBYTtDQUFFXCIsXCJmaWxlXCI6XCJwcm9kdWN0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuYmFubmVyLXN3aXBlLWl0ZW0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmRldGFpbHMgLm5hbWUge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICBmb250LXNpemU6IDE3cHg7XFxuICAgIGNvbG9yOiAjNjY2OyB9XFxuICAuZGV0YWlscyAucHJpY2Uge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICBmb250LXNpemU6IDE3cHg7XFxuICAgIGNvbG9yOiByZWQ7IH1cXG5cXG4uZGVzY3JpcHRpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDFyZW0gMC41cmVtIDgwcHggMC41cmVtO1xcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgY29sb3I6ICM2NjY7XFxuICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuXFxuLnBvcHVwLWZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbWFyZ2luLXRvcDogMWVtOyB9XFxuICAucG9wdXAtZm9vdGVyIC5idG4ge1xcbiAgICBmbGV4OiAxO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IC41ZW0gMDtcXG4gICAgY29sb3I6ICNmZmY7IH1cXG4gIC5wb3B1cC1mb290ZXIgLnBvcHVwLWJ0bi1hZGQtY2FydCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsgfVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQ1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IH1cXG4gIGZvb3RlciAuYnRuIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMnB4IDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBmbGV4LWJhc2lzOiA4MHB4OyB9XFxuICAgIGZvb3RlciAuYnRuIC5pY29uIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIGZvb3RlciAuYnRuIC5pY29uLmlzLWZhdm91cml0ZSB7XFxuICAgICAgICBjb2xvcjogI2YwMDsgfVxcbiAgICBmb290ZXIgLmJ0biAuYW1vdW50IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcXG4gICAgICB0b3A6IDNweDtcXG4gICAgICByaWdodDogMjBweDtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgICAgcGFkZGluZzogMCA0cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuICAgIGZvb3RlciAuYnRuIC50ZXh0IHtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIGZvb3RlciAuYnRuLWFkZC1jYXJ0IHtcXG4gICAgaGVpZ2h0OiA0NXB4O1xcbiAgICBsaW5lLWhlaWdodDogNDVweDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzAwO1xcbiAgICBmbGV4LWdyb3c6IDU7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNmVjMDQwZjhcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWVcbi8vIG1vZHVsZSBpZCA9IDcxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJiYW5uZXJcIj5cclxuICAgICAgPHd2LXN3aXBlIDpoZWlnaHQ9XCIyNTBcIiA6YXV0bz1cIjQwMDBcIj5cclxuICAgICAgICA8d3Ytc3dpcGUtaXRlbSBjbGFzcz1cImJhbm5lci1zd2lwZS1pdGVtXCIgdi1mb3I9XCJiYW5uZXIgaW4gYmFubmVyc1wiIDprZXk9XCJiYW5uZXIuaW5kZXhcIj5cclxuICAgICAgICAgIDxpbWcgOnNyYz1cImJhbm5lci5pbWdcIiBhbHQ9XCJcIj5cclxuICAgICAgICA8L3d2LXN3aXBlLWl0ZW0+XHJcbiAgICAgIDwvd3Ytc3dpcGU+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiPnt7IHByb2R1Y3QucHJpY2UgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx3di1ncm91cD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLlt7LpgIlcIiA6dmFsdWU9XCJhbW91bnQgKyAn5Lu2J1wiIEBjbGljay5uYXRpdmU9XCJzaG93UG9wdXBcIj48L3d2LWNlbGw+XHJcbiAgICA8L3d2LWdyb3VwPlxyXG5cclxuICAgIDx3di1wb3B1cCB2LW1vZGVsPVwicG9wdXBWaXNpYmxlXCI+XHJcblxyXG4gICAgICA8d3YtZ3JvdXA+XHJcbiAgICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmlbDph49cIj5cclxuICAgICAgICAgIDx3di1udW1iZXItc3Bpbm5lciB2LW1vZGVsPVwiYW1vdW50XCIgOm1pbj1cIjFcIiBzbG90PVwiZnRcIj48L3d2LW51bWJlci1zcGlubmVyPlxyXG4gICAgICAgIDwvd3YtY2VsbD5cclxuICAgICAgPC93di1ncm91cD5cclxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLWZvb3RlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4gcG9wdXAtYnRuLWFkZC1jYXJ0XCIgQGNsaWNrPVwiYWRkVG9DYXJ0KHByb2R1Y3QuaWQpOyBwb3B1cFZpc2libGU9ZmFsc2VcIj7liqDlhaXotK3nianovaY8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3d2LXBvcHVwPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiIHYtaHRtbD1cInByb2R1Y3QuZGVzY3JpcHRpb25cIj48L2Rpdj5cclxuXHJcbiAgICA8Zm9vdGVyPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1mYXZvdXJpdGVcIiBAY2xpY2s9XCJ0b2dnbGVGYXZvdXJpdGUocHJvZHVjdC5pZClcIj5cclxuICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiA6Y2xhc3M9XCJ7ICdpcy1mYXZvdXJpdGUnOiBpc0Zhdm91cml0ZSB9XCI+e3sgaXNGYXZvdXJpdGUgPyAnJiN4ZTYwNjsnIDogJyYjeGU2MDc7J1xyXG4gICAgICAgICAgfX08L2k+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+e3sgaXNGYXZvdXJpdGUgPyAn5bey5pS26JePJyA6ICfmlLbol48nIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwiYnRuIGJ0bi1jYXJ0XCIgdG89XCIvY2FydFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW1vdW50XCI+e3sgcHJvZHVjdEFtb3VudEluQ2FydCB9fTwvc3Bhbj5cclxuICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIj4mI3hlNjExOzwvaT5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj7otK3nianovaY8L3NwYW4+XHJcbiAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tYWRkLWNhcnRcIiBAY2xpY2s9XCJhZGRUb0NhcnQocHJvZHVjdC5pZClcIj7liqDlhaXotK3nianovaY8L2Rpdj5cclxuICAgIDwvZm9vdGVyPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBTd2lwZSwgU3dpcGVJdGVtLCBHcm91cCwgQ2VsbCwgUG9wdXAsIE51bWJlclNwaW5uZXIgfSBmcm9tICd3ZS12dWUnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgW1N3aXBlLm5hbWVdOiBTd2lwZSxcclxuICAgICAgW1N3aXBlSXRlbS5uYW1lXTogU3dpcGVJdGVtLFxyXG4gICAgICBbR3JvdXAubmFtZV06IEdyb3VwLFxyXG4gICAgICBbQ2VsbC5uYW1lXTogQ2VsbCxcclxuICAgICAgW1BvcHVwLm5hbWVdOiBQb3B1cCxcclxuICAgICAgW051bWJlclNwaW5uZXIubmFtZV06IE51bWJlclNwaW5uZXJcclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0UHJvZHVjdCgpXHJcbiAgICAgIHRoaXMuY2hlY2tJc0Zhdm91cml0ZSgpXHJcbiAgICAgIHRoaXMuZ2V0UHJvZHVjdEFtb3VudEluQ2FydCgpXHJcbiAgICB9LFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2R1Y3Q6IHt9LFxyXG4gICAgICAgIGFtb3VudDogMSxcclxuICAgICAgICBpc0Zhdm91cml0ZTogZmFsc2UsXHJcbiAgICAgICAgcHJvZHVjdEFtb3VudEluQ2FydDogMCxcclxuICAgICAgICBwb3B1cFZpc2libGU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgYmFubmVycyAoKSB7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBbXVxyXG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3QucGljdHVyZXMpIHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdC5waWN0dXJlcy5mb3JFYWNoKHBpY3R1cmUgPT4ge1xyXG4gICAgICAgICAgICB0ZW1wLnB1c2goe2ltZzogcGljdHVyZX0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZ2V0UHJvZHVjdCAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoYHByb2R1Y3QvJHt0aGlzLiRyb3V0ZS5wYXJhbXMuaWR9YCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdCA9IHJlc3BvbnNlLmRhdGEucHJvZHVjdFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDllYblk4HmmK/lkKblt7LooqvmlLbol49cclxuICAgICAgY2hlY2tJc0Zhdm91cml0ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoYGZhdm91cml0ZS8ke3RoaXMuJHJvdXRlLnBhcmFtcy5pZH0vaXMtZmF2b3VyaXRlYCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNGYXZvdXJpdGUgPSByZXNwb25zZS5kYXRhLmlzRmF2b3VyaXRlXHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g6LSt54mp6L2m5Lit5ZWG5ZOB5oC75pWwXHJcbiAgICAgIGdldFByb2R1Y3RBbW91bnRJbkNhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdjYXJ0L3Byb2R1Y3QtYW1vdW50JykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdEFtb3VudEluQ2FydCA9IHJlc3BvbnNlLmRhdGEuYW1vdW50XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgc2hvd1BvcHVwICgpIHtcclxuICAgICAgICB0aGlzLnBvcHVwVmlzaWJsZSA9IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWKoOWFpei0reeJqei9plxyXG4gICAgICBhZGRUb0NhcnQgKHByb2R1Y3RJZCkge1xyXG4gICAgICAgIGxldCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdjYXJ0L2FkZCcsIHBvc3REYXRhKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhXHJcblxyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0QW1vdW50SW5DYXJ0ID0gcGFyc2VJbnQodGhpcy5wcm9kdWN0QW1vdW50SW5DYXJ0KSArIHRoaXMuYW1vdW50XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWKoOWFpei0reeJqei9plxyXG4gICAgICB0b2dnbGVGYXZvdXJpdGUgKHByb2R1Y3RJZCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KGBmYXZvdXJpdGUvJHtwcm9kdWN0SWR9L3RvZ2dsZWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzRmF2b3VyaXRlID0gIXRoaXMuaXNGYXZvdXJpdGVcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAkZm9vdGVySGVpZ2h0OiA0NXB4O1xyXG5cclxuICAuYmFubmVyLXN3aXBlLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgLmRldGFpbHMge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgICAubmFtZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICB9XHJcblxyXG4gICAgLnByaWNlIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHBhZGRpbmc6IDAgMTBweDtcclxuICAgICAgZm9udC1zaXplOiAxN3B4O1xyXG4gICAgICBjb2xvcjogcmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmRlc2NyaXB0aW9uIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAxcmVtIDAuNXJlbSA4MHB4IDAuNXJlbTtcclxuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XHJcbiAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICB9XHJcblxyXG4gIC5wb3B1cC1mb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi10b3A6IDFlbTtcclxuXHJcbiAgICAuYnRuIHtcclxuICAgICAgZmxleDogMTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBwYWRkaW5nOiAuNWVtIDA7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgfVxyXG5cclxuICAgIC5wb3B1cC1idG4tYWRkLWNhcnQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAkZm9vdGVySGVpZ2h0O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjO1xyXG5cclxuICAgIC5idG4ge1xyXG4gICAgICBjb2xvcjogIzU1NTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBwYWRkaW5nOiAycHggMDtcclxuICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgIGZsZXgtYmFzaXM6IDgwcHg7XHJcblxyXG4gICAgICAuaWNvbiB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgJi5pcy1mYXZvdXJpdGUge1xyXG4gICAgICAgICAgY29sb3I6ICNmMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAuYW1vdW50IHtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwMDtcclxuICAgICAgICB0b3A6IDNweDtcclxuICAgICAgICByaWdodDogMjBweDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMCA0cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAudGV4dCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmJ0bi1hZGQtY2FydCB7XHJcbiAgICAgIGhlaWdodDogJGZvb3RlckhlaWdodDtcclxuICAgICAgbGluZS1oZWlnaHQ6ICRmb290ZXJIZWlnaHQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2MwMDtcclxuICAgICAgZmxleC1ncm93OiA1O1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHByb2R1Y3QudnVlP2E1MTNiMjJhIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9wb3B1cC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDcxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi53di1wb3B1cC1ib2R5W2RhdGEtdi04N2EwOGVmNl17ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtsZWZ0OjA7Ym90dG9tOjA7ei1pbmRleDo1MDAwO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc31cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvcG9wdXAvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA3MThcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTMwMyl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIHUsaT1lPWV8fHt9LGE9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09YSYmXCJmdW5jdGlvblwiIT09YXx8KHU9ZSxpPWUuZGVmYXVsdCk7dmFyIHM9XCJmdW5jdGlvblwiPT10eXBlb2YgaT9pLm9wdGlvbnM6aTt0JiYocy5yZW5kZXI9dC5yZW5kZXIscy5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLHImJihzLl9zY29wZUlkPXIpO3ZhciBjO2lmKG8/KGM9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LHMuX3NzclJlZ2lzdGVyPWMpOm4mJihjPW4pLGMpe3ZhciBsPXMuZnVuY3Rpb25hbCxkPWw/cy5yZW5kZXI6cy5iZWZvcmVDcmVhdGU7bD9zLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCksZChlLHQpfTpzLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6dSxleHBvcnRzOmksb3B0aW9uczpzfX19LDMwMzpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMzA0KX0sMzA0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDMwNSksbz1uLm4ocik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDMwNTpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlKXtuKDMwNil9dmFyIG89bigwKShuKDMwNyksbigzMDgpLHIsXCJkYXRhLXYtODdhMDhlZjZcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwzMDY6ZnVuY3Rpb24oZSx0KXt9LDMwNzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3YtcG9wdXBcIixwcm9wczp7dmFsdWU6Qm9vbGVhbixoZWlnaHQ6e3R5cGU6W1N0cmluZyxOdW1iZXJdLGRlZmF1bHQ6XCJhdXRvXCJ9LGhpZGVPbk1hc2s6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxtYXNrQmFja2dyb3VuZENvbG9yOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiXCJ9LGJhY2tncm91bmRDb2xvcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIiNmZmZcIn19LGRhdGE6ZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudFZhbHVlOnRoaXMudmFsdWV9fSxjb21wdXRlZDp7c3R5bGU6ZnVuY3Rpb24oKXt2YXIgZT17YmFja2dyb3VuZENvbG9yOnRoaXMuYmFja2dyb3VuZENvbG9yfTtyZXR1cm5cImF1dG9cIj09PXRoaXMuaGVpZ2h0P2UuaGVpZ2h0PVwiYXV0b1wiOmUuaGVpZ2h0PXBhcnNlSW50KHRoaXMuaGVpZ2h0KStcInB4XCIsZX19LG1ldGhvZHM6e21hc2tDbGljazpmdW5jdGlvbihlKXt0aGlzLmhpZGVPbk1hc2smJih0aGlzLmN1cnJlbnRWYWx1ZT0hMSl9fSx3YXRjaDp7dmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jdXJyZW50VmFsdWU9ZX0sY3VycmVudFZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuJGVtaXQoXCJpbnB1dFwiLGUpLGU/dGhpcy4kZW1pdChcInNob3dcIik6dGhpcy4kZW1pdChcImhpZGVcIil9fX19LDMwODpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTplLmN1cnJlbnRWYWx1ZSxleHByZXNzaW9uOlwiY3VycmVudFZhbHVlXCJ9XSxzdGF0aWNDbGFzczpcInd2LXBvcHVwXCJ9LFtuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1tYXNrIHdldWktYW5pbWF0ZS1mYWRlLWluXCIsc3R5bGU6e2JhY2tncm91bmRDb2xvcjplLm1hc2tCYWNrZ3JvdW5kQ29sb3J9LG9uOntjbGljazplLm1hc2tDbGlja319KSxlLl92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3YtcG9wdXAtYm9keSB3ZXVpLWFuaW1hdGUtc2xpZGUtdXBcIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpXSl9LHN0YXRpY1JlbmRlckZuczpbXX19fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9wb3B1cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJiYW5uZXJcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LXN3aXBlXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGhlaWdodDogMjUwLCBhdXRvOiA0MDAwIH0gfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0uYmFubmVycywgZnVuY3Rpb24oYmFubmVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInd2LXN3aXBlLWl0ZW1cIixcbiAgICAgICAgICAgICAgICB7IGtleTogYmFubmVyLmluZGV4LCBzdGF0aWNDbGFzczogXCJiYW5uZXItc3dpcGUtaXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgW19jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBiYW5uZXIuaW1nLCBhbHQ6IFwiXCIgfSB9KV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkZXRhaWxzXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm5hbWVcIiB9LCBbX3ZtLl92KF92bS5fcyhfdm0ucHJvZHVjdC5uYW1lKSldKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJwcmljZVwiIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5wcm9kdWN0LnByaWNlKSldKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwid3YtZ3JvdXBcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLlt7LpgIlcIiwgdmFsdWU6IF92bS5hbW91bnQgKyBcIuS7tlwiIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnNob3dQb3B1cCgkZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LXBvcHVwXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5wb3B1cFZpc2libGUsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgIF92bS5wb3B1cFZpc2libGUgPSAkJHZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcInBvcHVwVmlzaWJsZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwid3YtY2VsbFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdGl0bGU6IFwi5pWw6YePXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwid3YtbnVtYmVyLXNwaW5uZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImZ0XCIsIG1pbjogMSB9LFxuICAgICAgICAgICAgICAgICAgICBzbG90OiBcImZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5hbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFtb3VudCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJhbW91bnRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInBvcHVwLWZvb3RlclwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIHBvcHVwLWJ0bi1hZGQtY2FydFwiLFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5hZGRUb0NhcnQoX3ZtLnByb2R1Y3QuaWQpXG4gICAgICAgICAgICAgICAgICAgIF92bS5wb3B1cFZpc2libGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcIuWKoOWFpei0reeJqei9plwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnByb2R1Y3QuZGVzY3JpcHRpb24pIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvb3RlclwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLWZhdm91cml0ZVwiLFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS50b2dnbGVGYXZvdXJpdGUoX3ZtLnByb2R1Y3QuaWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImlcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBcImlzLWZhdm91cml0ZVwiOiBfdm0uaXNGYXZvdXJpdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmlzRmF2b3VyaXRlID8gXCLumIZcIiA6IFwi7piHXCIpKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5pc0Zhdm91cml0ZSA/IFwi5bey5pS26JePXCIgOiBcIuaUtuiXj1wiKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJ0biBidG4tY2FydFwiLCBhdHRyczogeyB0bzogXCIvY2FydFwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnByb2R1Y3RBbW91bnRJbkNhcnQpKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiIH0sIFtfdm0uX3YoXCLumJFcIildKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dFwiIH0sIFtfdm0uX3YoXCLotK3nianovaZcIildKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1hZGQtY2FydFwiLFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5hZGRUb0NhcnQoX3ZtLnByb2R1Y3QuaWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcIuWKoOWFpei0reeJqei9plwiKV1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNmVjMDQwZjhcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTZlYzA0MGY4XCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvcHJvZHVjdC52dWVcbi8vIG1vZHVsZSBpZCA9IDcyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9