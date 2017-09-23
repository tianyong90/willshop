webpackJsonp([6],{

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

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(672)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(674)
/* template */
var __vue_template__ = __webpack_require__(678)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f2c38be6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\shop\\pages\\checkout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2c38be6", Component.options)
  } else {
    hotAPI.reload("data-v-f2c38be6", Component.options)
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

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(673);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("53acb261", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f2c38be6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f2c38be6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./checkout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.top-tips[data-v-f2c38be6] {\n  display: block;\n  background-color: #e64340;\n  color: #f2f2f2;\n  font-size: 12px;\n  padding: .3em .5em;\n}\n.address-panel[data-v-f2c38be6] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.address-panel .content[data-v-f2c38be6] {\n    display: block;\n    color: #999999;\n    overflow: hidden;\n    padding: .5em 1em;\n}\n.address-panel .content .consumer-name[data-v-f2c38be6],\n    .address-panel .content .consumer-mobile[data-v-f2c38be6] {\n      display: block;\n      float: left;\n      color: #000000;\n      font-size: 14px;\n      margin-right: 2em;\n}\n.address-panel .content .address[data-v-f2c38be6] {\n      clear: both;\n      display: block;\n      color: #999999;\n      font-size: 13px;\n}\n.address-panel .bottom-border[data-v-f2c38be6] {\n    display: block;\n    width: 100%;\n    height: 3px;\n    background-size: 100px 100px;\n    background-image: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);\n}\n.product-list .price[data-v-f2c38be6] {\n  color: red;\n}\n.product-list .amount[data-v-f2c38be6] {\n  color: #999999;\n}\n.other-info[data-v-f2c38be6] {\n  margin-bottom: 70px;\n}\nfooter[data-v-f2c38be6] {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n  justify-content: flex-end;\n  z-index: 100;\n}\nfooter .total-price[data-v-f2c38be6] {\n    margin-right: .5em;\n    line-height: 50px;\n    color: red;\n}\nfooter .btn-checkout[data-v-f2c38be6] {\n    border: none;\n    color: #fff;\n    padding: 0 20px;\n    vertical-align: middle;\n    background-color: #e64340;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/pages/checkout.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,0BAA0B;EAC1B,eAAe;EACf,gBAAgB;EAChB,mBAAmB;CAAE;AAEvB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;CAAE;AACzB;IACE,eAAe;IACf,eAAe;IACf,iBAAiB;IACjB,kBAAkB;CAAE;AACpB;;MAEE,eAAe;MACf,YAAY;MACZ,eAAe;MACf,gBAAgB;MAChB,kBAAkB;CAAE;AACtB;MACE,YAAY;MACZ,eAAe;MACf,eAAe;MACf,gBAAgB;CAAE;AACtB;IACE,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,6BAA6B;IAC7B,6PAA6P;CAAE;AAEnQ;EACE,WAAW;CAAE;AAEf;EACE,eAAe;CAAE;AAEnB;EACE,oBAAoB;CAAE;AAExB;EACE,cAAc;EACd,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,aAAa;EACb,0BAA0B;EAC1B,aAAa;CAAE;AACf;IACE,mBAAmB;IACnB,kBAAkB;IAClB,WAAW;CAAE;AACf;IACE,aAAa;IACb,YAAY;IACZ,gBAAgB;IAChB,uBAAuB;IACvB,0BAA0B;CAAE","file":"checkout.vue","sourcesContent":[".top-tips {\n  display: block;\n  background-color: #e64340;\n  color: #f2f2f2;\n  font-size: 12px;\n  padding: .3em .5em; }\n\n.address-panel {\n  display: block;\n  overflow: hidden;\n  background-color: #fff; }\n  .address-panel .content {\n    display: block;\n    color: #999999;\n    overflow: hidden;\n    padding: .5em 1em; }\n    .address-panel .content .consumer-name,\n    .address-panel .content .consumer-mobile {\n      display: block;\n      float: left;\n      color: #000000;\n      font-size: 14px;\n      margin-right: 2em; }\n    .address-panel .content .address {\n      clear: both;\n      display: block;\n      color: #999999;\n      font-size: 13px; }\n  .address-panel .bottom-border {\n    display: block;\n    width: 100%;\n    height: 3px;\n    background-size: 100px 100px;\n    background-image: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%); }\n\n.product-list .price {\n  color: red; }\n\n.product-list .amount {\n  color: #999999; }\n\n.other-info {\n  margin-bottom: 70px; }\n\nfooter {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n  justify-content: flex-end;\n  z-index: 100; }\n  footer .total-price {\n    margin-right: .5em;\n    line-height: 50px;\n    color: red; }\n  footer .btn-checkout {\n    border: none;\n    color: #fff;\n    padding: 0 20px;\n    vertical-align: middle;\n    background-color: #e64340; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(675);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = __webpack_require__(583);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _style = __webpack_require__(587);

var _style2 = _interopRequireDefault(_style);

var _cell = __webpack_require__(589);

var _cell2 = _interopRequireDefault(_cell);

var _style3 = __webpack_require__(590);

var _style4 = _interopRequireDefault(_style3);

var _group = __webpack_require__(592);

var _group2 = _interopRequireDefault(_group);

var _components;

var _price_filter = __webpack_require__(593);

var _price_filter2 = _interopRequireDefault(_price_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: (_components = {}, (0, _defineProperty3.default)(_components, _group2.default.name, _group2.default), (0, _defineProperty3.default)(_components, _cell2.default.name, _cell2.default), _components),

  mixins: [_price_filter2.default],

  data: function data() {
    return {
      addressId: null,
      carts: []
    };
  },


  computed: {
    totalPrice: function totalPrice() {
      if (this.carts.length === 0) return 0;

      var price = 0;
      this.carts.forEach(function (val) {
        price += val.product.price * val.amount;
      });
      return price;
    },
    productAmount: function productAmount() {
      if (this.carts.length === 0) return 0;

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
        for (var _iterator = (0, _getIterator3.default)(this.carts.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
};

/***/ }),

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(676), __esModule: true };

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
__webpack_require__(116);
module.exports = __webpack_require__(677);


/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var get = __webpack_require__(118);
module.exports = __webpack_require__(14).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "top-tips" }, [
        _vm._v("\n    请在下单后 48 小时内完成支付，超过 24 小时后订单将自动取消。\n  ")
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
            _c("div", { staticClass: "address" }, [_vm._v("广东省深圳市南山区软件产业基地")])
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
          _c("wv-cell", { attrs: { title: "商品件数", value: _vm.productAmount } }),
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
     require("vue-hot-reload-api").rerender("data-v-f2c38be6", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jaGVja291dC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL3N0eWxlLmNzcz83NzQxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzP2M0MDgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9taXhpbnMvcHJpY2VfZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jaGVja291dC52dWU/NjU4NiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2hlY2tvdXQudnVlPzY4NTQiLCJ3ZWJwYWNrOi8vL2NoZWNrb3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NoZWNrb3V0LnZ1ZT9mNGE3Il0sIm5hbWVzIjpbImZpbHRlcnMiLCJwcmljZUZpbHRlciIsInZhbCIsIk51bWJlciIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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U0FBUywwQ0FBMEMsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSx5QkFBeUIsU0FBUywwQkFBMEIsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZCQUE2QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx1Q0FBdUMsc0JBQXNCLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAyMyIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1mMmMzOGJlNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsXFxcInN5bnRheC1keW5hbWljLWltcG9ydFxcXCIsW1xcXCJjb21wb25lbnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOnRydWV9XV1dLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vY2hlY2tvdXQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1mMmMzOGJlNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiKVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LWYyYzM4YmU2XCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxccGFnZXNcXFxcY2hlY2tvdXQudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBjaGVja291dC52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZjJjMzhiZTZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1mMmMzOGJlNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NoZWNrb3V0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTc2XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1ODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCJtb2R1bGUuZXhwb3J0cz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgaT1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gdFtyXS5jYWxsKGkuZXhwb3J0cyxpLGkuZXhwb3J0cyxlKSxpLmw9ITAsaS5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLmQ9ZnVuY3Rpb24odCxuLHIpe2Uubyh0LG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxlLm49ZnVuY3Rpb24odCl7dmFyIG49dCYmdC5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIHQuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gdH07cmV0dXJuIGUuZChuLFwiYVwiLG4pLG59LGUubz1mdW5jdGlvbih0LGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKX0sZS5wPVwiXCIsZShlLnM9MTIwKX0oezA6ZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scixpKXt2YXIgcyxvPXQ9dHx8e30sYz10eXBlb2YgdC5kZWZhdWx0O1wib2JqZWN0XCIhPT1jJiZcImZ1bmN0aW9uXCIhPT1jfHwocz10LG89dC5kZWZhdWx0KTt2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBvP28ub3B0aW9uczpvO2UmJihhLnJlbmRlcj1lLnJlbmRlcixhLnN0YXRpY1JlbmRlckZucz1lLnN0YXRpY1JlbmRlckZucyksciYmKGEuX3Njb3BlSWQ9cik7dmFyIHU7aWYoaT8odT1mdW5jdGlvbih0KXt0PXR8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCx0fHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KHQ9X19WVUVfU1NSX0NPTlRFWFRfXyksbiYmbi5jYWxsKHRoaXMsdCksdCYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYS5fc3NyUmVnaXN0ZXI9dSk6biYmKHU9biksdSl7dmFyIGw9YS5mdW5jdGlvbmFsLGQ9bD9hLnJlbmRlcjphLmJlZm9yZUNyZWF0ZTtsP2EucmVuZGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHUuY2FsbChlKSxkKHQsZSl9OmEuYmVmb3JlQ3JlYXRlPWQ/W10uY29uY2F0KGQsdSk6W3VdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6byxvcHRpb25zOmF9fX0sMTIwOmZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9bigzNSl9LDM1OmZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDM2KSxpPW4ubihyKTtuLmQoZSxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBpLmF9KX0sMzY6ZnVuY3Rpb24odCxlLG4pe2Z1bmN0aW9uIHIodCl7bigzNyl9dmFyIGk9bigwKShuKDM4KSxuKDM5KSxyLFwiZGF0YS12LWY0NjUzMjJhXCIsbnVsbCk7dC5leHBvcnRzPWkuZXhwb3J0c30sMzc6ZnVuY3Rpb24odCxlKXt9LDM4OmZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLmRlZmF1bHQ9e25hbWU6XCJ3di1jZWxsXCIscHJvcHM6e3RpdGxlOnt0eXBlOltTdHJpbmcsTnVtYmVyXX0sdmFsdWU6e3R5cGU6W1N0cmluZyxOdW1iZXJdfSxpc0xpbms6Qm9vbGVhbix0bzpTdHJpbmd9LGNvbXB1dGVkOntocmVmOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztpZih0aGlzLnRvJiYhdGhpcy5hZGRlZCYmdGhpcy4kcm91dGVyKXt2YXIgZT10aGlzLiRyb3V0ZXIubWF0Y2godGhpcy50byk7cmV0dXJuIGUubWF0Y2hlZC5sZW5ndGg/KHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uKCl7dC5hZGRlZD0hMCx0LiRlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0LmhhbmRsZUNsaWNrKX0pLGUucGF0aCk6dGhpcy50b31yZXR1cm4gdGhpcy50b319LG1vdW50ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRvbihcIkNMSUNLX0lOX0NFTExTV0lQRVwiLHRoaXMuaGFuZGxlQ2xpY2spfSxtZXRob2RzOntoYW5kbGVDbGljazpmdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCksdm9pZCAwIT09dGhpcy5ocmVmJiZ0aGlzLiRyb3V0ZXIucHVzaCh0aGlzLmhyZWYpfX19fSwzOTpmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXQuJGNyZWF0ZUVsZW1lbnQsbj10Ll9zZWxmLl9jfHxlO3JldHVybiB0LnRvP24oXCJhXCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsXCIsY2xhc3M6e1wid2V1aS1jZWxsX2FjY2Vzc1wiOnQuaXNMaW5rfSxhdHRyczp7aHJlZjp0LmhyZWZ9fSxbbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9oZFwifSxbdC5fdChcImljb25cIildLDIpLHQuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2JkXCJ9LFt0Ll90KFwiYmRcIixbbihcInBcIix7ZG9tUHJvcHM6e2lubmVySFRNTDp0Ll9zKHQudGl0bGUpfX0pXSldLDIpLHQuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2Z0XCJ9LFt0Ll90KFwiZnRcIixbdC5fdih0Ll9zKHQudmFsdWUpKV0pXSwyKV0pOm4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxcIixjbGFzczp7XCJ3ZXVpLWNlbGxfYWNjZXNzXCI6dC5pc0xpbmt9fSxbbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9oZFwifSxbdC5fdChcImljb25cIildLDIpLHQuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2JkXCJ9LFt0Ll90KFwiYmRcIixbbihcInBcIix7ZG9tUHJvcHM6e2lubmVySFRNTDp0Ll9zKHQudGl0bGUpfX0pXSldLDIpLHQuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2Z0XCJ9LFt0Ll90KFwiZnRcIixbdC5fdih0Ll9zKHQudmFsdWUpKV0pXSwyKV0pfSxzdGF0aWNSZW5kZXJGbnM6W119fX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1OTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTExNCl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGkscz1lPWV8fHt9LHU9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09dSYmXCJmdW5jdGlvblwiIT09dXx8KGk9ZSxzPWUuZGVmYXVsdCk7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zLm9wdGlvbnM6czt0JiYoYy5yZW5kZXI9dC5yZW5kZXIsYy5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMpLHImJihjLl9zY29wZUlkPXIpO3ZhciBhO2lmKG8/KGE9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LGMuX3NzclJlZ2lzdGVyPWEpOm4mJihhPW4pLGEpe3ZhciBsPWMuZnVuY3Rpb25hbCxmPWw/Yy5yZW5kZXI6Yy5iZWZvcmVDcmVhdGU7bD9jLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksZihlLHQpfTpjLmJlZm9yZUNyZWF0ZT1mP1tdLmNvbmNhdChmLGEpOlthXX1yZXR1cm57ZXNNb2R1bGU6aSxleHBvcnRzOnMsb3B0aW9uczpjfX19LDExNDpmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMTE1KX0sMTE1OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDExNiksbz1uLm4ocik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDExNjpmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlKXtuKDExNyl9dmFyIG89bigwKShuKDExOCksbigxMTkpLHIsXCJkYXRhLXYtMTZlNGI2ZWJcIixudWxsKTtlLmV4cG9ydHM9by5leHBvcnRzfSwxMTc6ZnVuY3Rpb24oZSx0KXt9LDExODpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5kZWZhdWx0PXtuYW1lOlwid3YtZ3JvdXBcIixwcm9wczp7dGl0bGU6U3RyaW5nLHRpdGxlQ29sb3I6U3RyaW5nfX19LDExOTpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIsW2UudGl0bGU/bihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbHNfX3RpdGxlXCIsc3R5bGU6e2NvbG9yOmUudGl0bGVDb2xvcn0sZG9tUHJvcHM6e2lubmVySFRNTDplLl9zKGUudGl0bGUpfX0pOmUuX2UoKSxlLl92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsc1wifSxbZS5fdChcImRlZmF1bHRcIildLDIpXSl9LHN0YXRpY1JlbmRlckZuczpbXX19fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICBmaWx0ZXJzOiB7XHJcbiAgICBwcmljZUZpbHRlcjogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gJ++/pScgKyBOdW1iZXIodmFsKS50b0ZpeGVkKDIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9taXhpbnMvcHJpY2VfZmlsdGVyLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWYyYzM4YmU2XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2hlY2tvdXQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI1M2FjYjI2MVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1mMmMzOGJlNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1mMmMzOGJlNlxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NoZWNrb3V0LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1mMmMzOGJlNlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRvcC10aXBzW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTY0MzQwO1xcbiAgY29sb3I6ICNmMmYyZjI7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBwYWRkaW5nOiAuM2VtIC41ZW07XFxufVxcbi5hZGRyZXNzLXBhbmVsW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuLmFkZHJlc3MtcGFuZWwgLmNvbnRlbnRbZGF0YS12LWYyYzM4YmU2XSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogIzk5OTk5OTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcGFkZGluZzogLjVlbSAxZW07XFxufVxcbi5hZGRyZXNzLXBhbmVsIC5jb250ZW50IC5jb25zdW1lci1uYW1lW2RhdGEtdi1mMmMzOGJlNl0sXFxuICAgIC5hZGRyZXNzLXBhbmVsIC5jb250ZW50IC5jb25zdW1lci1tb2JpbGVbZGF0YS12LWYyYzM4YmU2XSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgY29sb3I6ICMwMDAwMDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMmVtO1xcbn1cXG4uYWRkcmVzcy1wYW5lbCAuY29udGVudCAuYWRkcmVzc1tkYXRhLXYtZjJjMzhiZTZdIHtcXG4gICAgICBjbGVhcjogYm90aDtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBjb2xvcjogIzk5OTk5OTtcXG4gICAgICBmb250LXNpemU6IDEzcHg7XFxufVxcbi5hZGRyZXNzLXBhbmVsIC5ib3R0b20tYm9yZGVyW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogM3B4O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMHB4IDEwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmMjU5NTMgMTIuNSUsICNmYmZhZjUgMTIuNSUsICNmYmZhZjUgMjUlLCAjNTU5MGQ2IDI1JSwgIzU1OTBkNiAzNy41JSwgI2ZiZmFmNSAzNy41JSwgI2ZiZmFmNSA1MCUsICNmMjU5NTMgNTAlLCAjZjI1OTUzIDYyLjUlLCAjZmJmYWY1IDYyLjUlLCAjZmJmYWY1IDc1JSwgIzU1OTBkNiA3NSUsICM1NTkwZDYgODcuNSUsICNmYmZhZjUgODcuNSUsICNmYmZhZjUgMTAwJSk7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByaWNlW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgY29sb3I6IHJlZDtcXG59XFxuLnByb2R1Y3QtbGlzdCAuYW1vdW50W2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgY29sb3I6ICM5OTk5OTk7XFxufVxcbi5vdGhlci1pbmZvW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgbWFyZ2luLWJvdHRvbTogNzBweDtcXG59XFxuZm9vdGVyW2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICB6LWluZGV4OiAxMDA7XFxufVxcbmZvb3RlciAudG90YWwtcHJpY2VbZGF0YS12LWYyYzM4YmU2XSB7XFxuICAgIG1hcmdpbi1yaWdodDogLjVlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgIGNvbG9yOiByZWQ7XFxufVxcbmZvb3RlciAuYnRuLWNoZWNrb3V0W2RhdGEtdi1mMmMzOGJlNl0ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBwYWRkaW5nOiAwIDIwcHg7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlNjQzNDA7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9VUFVQVy92aG9zdHMvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NoZWNrb3V0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsbUJBQW1CO0NBQUU7QUFFdkI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtDQUFFO0FBQ3pCO0lBQ0UsZUFBZTtJQUNmLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0NBQUU7QUFDcEI7O01BRUUsZUFBZTtNQUNmLFlBQVk7TUFDWixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGtCQUFrQjtDQUFFO0FBQ3RCO01BQ0UsWUFBWTtNQUNaLGVBQWU7TUFDZixlQUFlO01BQ2YsZ0JBQWdCO0NBQUU7QUFDdEI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLFlBQVk7SUFDWiw2QkFBNkI7SUFDN0IsNlBBQTZQO0NBQUU7QUFFblE7RUFDRSxXQUFXO0NBQUU7QUFFZjtFQUNFLGVBQWU7Q0FBRTtBQUVuQjtFQUNFLG9CQUFvQjtDQUFFO0FBRXhCO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsMEJBQTBCO0VBQzFCLGFBQWE7Q0FBRTtBQUNmO0lBQ0UsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixXQUFXO0NBQUU7QUFDZjtJQUNFLGFBQWE7SUFDYixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QiwwQkFBMEI7Q0FBRVwiLFwiZmlsZVwiOlwiY2hlY2tvdXQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi50b3AtdGlwcyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNjQzNDA7XFxuICBjb2xvcjogI2YyZjJmMjtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHBhZGRpbmc6IC4zZW0gLjVlbTsgfVxcblxcbi5hZGRyZXNzLXBhbmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH1cXG4gIC5hZGRyZXNzLXBhbmVsIC5jb250ZW50IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjOTk5OTk5O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwYWRkaW5nOiAuNWVtIDFlbTsgfVxcbiAgICAuYWRkcmVzcy1wYW5lbCAuY29udGVudCAuY29uc3VtZXItbmFtZSxcXG4gICAgLmFkZHJlc3MtcGFuZWwgLmNvbnRlbnQgLmNvbnN1bWVyLW1vYmlsZSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgY29sb3I6ICMwMDAwMDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMmVtOyB9XFxuICAgIC5hZGRyZXNzLXBhbmVsIC5jb250ZW50IC5hZGRyZXNzIHtcXG4gICAgICBjbGVhcjogYm90aDtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBjb2xvcjogIzk5OTk5OTtcXG4gICAgICBmb250LXNpemU6IDEzcHg7IH1cXG4gIC5hZGRyZXNzLXBhbmVsIC5ib3R0b20tYm9yZGVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDNweDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDBweCAxMDBweDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjI1OTUzIDEyLjUlLCAjZmJmYWY1IDEyLjUlLCAjZmJmYWY1IDI1JSwgIzU1OTBkNiAyNSUsICM1NTkwZDYgMzcuNSUsICNmYmZhZjUgMzcuNSUsICNmYmZhZjUgNTAlLCAjZjI1OTUzIDUwJSwgI2YyNTk1MyA2Mi41JSwgI2ZiZmFmNSA2Mi41JSwgI2ZiZmFmNSA3NSUsICM1NTkwZDYgNzUlLCAjNTU5MGQ2IDg3LjUlLCAjZmJmYWY1IDg3LjUlLCAjZmJmYWY1IDEwMCUpOyB9XFxuXFxuLnByb2R1Y3QtbGlzdCAucHJpY2Uge1xcbiAgY29sb3I6IHJlZDsgfVxcblxcbi5wcm9kdWN0LWxpc3QgLmFtb3VudCB7XFxuICBjb2xvcjogIzk5OTk5OTsgfVxcblxcbi5vdGhlci1pbmZvIHtcXG4gIG1hcmdpbi1ib3R0b206IDcwcHg7IH1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogNTBweDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICB6LWluZGV4OiAxMDA7IH1cXG4gIGZvb3RlciAudG90YWwtcHJpY2Uge1xcbiAgICBtYXJnaW4tcmlnaHQ6IC41ZW07XFxuICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xcbiAgICBjb2xvcjogcmVkOyB9XFxuICBmb290ZXIgLmJ0bi1jaGVja291dCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2NDM0MDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1mMmMzOGJlNlwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jaGVja291dC52dWVcbi8vIG1vZHVsZSBpZCA9IDY3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDYiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b3AtdGlwc1wiPlxyXG4gICAgICDor7flnKjkuIvljZXlkI4gNDgg5bCP5pe25YaF5a6M5oiQ5pSv5LuY77yM6LaF6L+HIDI0IOWwj+aXtuWQjuiuouWNleWwhuiHquWKqOWPlua2iOOAglxyXG4gICAgPC9kaXY+XHJcbiAgICA8cm91dGVyLWxpbmsgdG89XCIvYWRkcmVzc1wiIGNsYXNzPVwiYWRkcmVzcy1wYW5lbFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb25zdW1lci1uYW1lXCI+55Sw5YuHPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnN1bWVyLW1vYmlsZVwiPjEzMjIyMjI1NTU1PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFkZHJlc3NcIj7lub/kuJznnIHmt7HlnLPluILljZflsbHljLrova/ku7bkuqfkuJrln7rlnLA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJib3R0b20tYm9yZGVyXCI+PC9kaXY+XHJcbiAgICA8L3JvdXRlci1saW5rPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ3ZXVpLXBhbmVsIHdldWktcGFuZWxfYWNjZXNzIHByb2R1Y3QtbGlzdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2V1aS1wYW5lbF9fYmRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwid2V1aS1tZWRpYS1ib3ggd2V1aS1tZWRpYS1ib3hfYXBwbXNnXCIgdi1mb3I9XCJjYXJ0IGluIGNhcnRzXCIgOmtleT1cImNhcnQuaWRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZXVpLW1lZGlhLWJveF9faGRcIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cIndldWktbWVkaWEtYm94X190aHVtYlwiIDpzcmM9XCJjYXJ0LnByb2R1Y3QudGh1bWJuYWlsXCI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZXVpLW1lZGlhLWJveF9fYmRcIj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwid2V1aS1tZWRpYS1ib3hfX3RpdGxlXCIgdi10ZXh0PVwiY2FydC5wcm9kdWN0Lm5hbWVcIj48L2g0PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIndldWktbWVkaWEtYm94X19kZXNjXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPnt7IGNhcnQucHJvZHVjdC5wcmljZSB8IHByaWNlRmlsdGVyIH19PC9zcGFuPiAmdGltZXM7XHJcbiAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVwiY2FydC5hbW91bnRcIiBjbGFzcz1cImFtb3VudFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHd2LWdyb3VwIGNsYXNzPVwib3RoZXItaW5mb1wiPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuWVhuWTgeS7tuaVsFwiIDp2YWx1ZT1cInByb2R1Y3RBbW91bnRcIj48L3d2LWNlbGw+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi5ZWG5ZOB6YeR6aKdXCIgOnZhbHVlPVwidG90YWxQcmljZSB8IHByaWNlRmlsdGVyXCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuS8mOaDoFwiIHZhbHVlPVwiMFwiPjwvd3YtY2VsbD5cclxuICAgIDwvd3YtZ3JvdXA+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+5a6e5LuY5qy+77yae3sgdG90YWxQcmljZSB8IHByaWNlRmlsdGVyIH19PC9kaXY+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWNoZWNrb3V0XCIgQGNsaWNrPVwiY2hlY2tvdXRcIj7nq4vljbPkuIvljZU8L2J1dHRvbj5cclxuICAgIDwvZm9vdGVyPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBHcm91cCwgQ2VsbCB9IGZyb20gJ3dlLXZ1ZSdcclxuICBpbXBvcnQgcHJpY2VGaWx0ZXIgZnJvbSAnLi4vbWl4aW5zL3ByaWNlX2ZpbHRlcidcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICBbR3JvdXAubmFtZV06IEdyb3VwLFxyXG4gICAgICBbQ2VsbC5uYW1lXTogQ2VsbFxyXG4gICAgfSxcclxuXHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgcHJpY2VGaWx0ZXJcclxuICAgIF0sXHJcblxyXG4gICAgZGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRyZXNzSWQ6IG51bGwsXHJcbiAgICAgICAgY2FydHM6IFtdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgLy8g5oC75Lu3XHJcbiAgICAgIHRvdGFsUHJpY2UgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcclxuXHJcbiAgICAgICAgLy8g6YCJ5Lit55qE5qif5ZWG5ZOB5oC75Lu357Sv5YqgXHJcbiAgICAgICAgbGV0IHByaWNlID0gMFxyXG4gICAgICAgIHRoaXMuY2FydHMuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgICBwcmljZSArPSAodmFsLnByb2R1Y3QucHJpY2UgKiB2YWwuYW1vdW50KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHByaWNlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDllYblk4HmgLvmlbBcclxuICAgICAgcHJvZHVjdEFtb3VudCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FydHMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxyXG5cclxuICAgICAgICAvLyDllYblk4HmlbDntK/liqBcclxuICAgICAgICBsZXQgYW1vdW50ID0gMFxyXG4gICAgICAgIHRoaXMuY2FydHMuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgICBhbW91bnQgKz0gdmFsLmFtb3VudFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGFtb3VudFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgIHRoaXMuY2FydHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxlY3RlZENhcnRzJykpXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgY2hlY2tvdXQoKSB7XHJcbiAgICAgICAgbGV0IGNhcnRJZHMgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGNhcnQgb2YgdGhpcy5jYXJ0cy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgY2FydElkcy5wdXNoKGNhcnQuaWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICBjYXJ0SWRzOiBjYXJ0SWRzLFxyXG4gICAgICAgICAgYWRkcmVzc0lkOiAxLFxyXG4gICAgICAgICAgcmVtYXJrOiAnaGVsbG8nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ2NoZWNrb3V0JywgcG9zdERhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnL3BheW1lbnQvJyArIHJlc3BvbnNlLmRhdGEub3JkZXJfbm8pXHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICBAaW1wb3J0IFwiLi4vLi4vLi4vc2Fzcy9zaG9wX3ZhcmlhYmxlc1wiO1xyXG5cclxuICAudG9wLXRpcHMge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2V1aS1jb2xvci13YXJuO1xyXG4gICAgY29sb3I6ICNmMmYyZjI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBwYWRkaW5nOiAuM2VtIC41ZW07XHJcbiAgfVxyXG5cclxuICAuYWRkcmVzcy1wYW5lbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG5cclxuICAgIC5jb250ZW50IHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGNvbG9yOiAkd2V1aS10ZXh0LWNvbG9yLWdyYXk7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHBhZGRpbmc6IC41ZW0gMWVtO1xyXG5cclxuICAgICAgLmNvbnN1bWVyLW5hbWUsXHJcbiAgICAgIC5jb25zdW1lci1tb2JpbGUge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgIGNvbG9yOiAkd2V1aS10ZXh0LWNvbG9yLXRpdGxlO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDJlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmFkZHJlc3Mge1xyXG4gICAgICAgIGNsZWFyOiBib3RoO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGNvbG9yOiAkd2V1aS10ZXh0LWNvbG9yLWdyYXk7XHJcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmJvdHRvbS1ib3JkZXIge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogM3B4O1xyXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMHB4IDEwMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmMjU5NTMgMTIuNSUsICNmYmZhZjUgMTIuNSUsICNmYmZhZjUgMjUlLCAjNTU5MGQ2IDI1JSwgIzU1OTBkNiAzNy41JSwgI2ZiZmFmNSAzNy41JSwgI2ZiZmFmNSA1MCUsICNmMjU5NTMgNTAlLCAjZjI1OTUzIDYyLjUlLCAjZmJmYWY1IDYyLjUlLCAjZmJmYWY1IDc1JSwgIzU1OTBkNiA3NSUsICM1NTkwZDYgODcuNSUsICNmYmZhZjUgODcuNSUsICNmYmZhZjUgMTAwJSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucHJvZHVjdC1saXN0IHtcclxuICAgIC5wcmljZSB7XHJcbiAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmFtb3VudCB7XHJcbiAgICAgIGNvbG9yOiAkd2V1aS10ZXh0LWNvbG9yLWdyYXk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC5vdGhlci1pbmZvIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XHJcbiAgfVxyXG5cclxuICBmb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgICB6LWluZGV4OiAxMDA7XHJcblxyXG4gICAgLnRvdGFsLXByaWNlIHtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAuNWVtO1xyXG4gICAgICBsaW5lLWhlaWdodDogNTBweDtcclxuICAgICAgY29sb3I6IHJlZDtcclxuICAgIH1cclxuXHJcbiAgICAuYnRuLWNoZWNrb3V0IHtcclxuICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2V1aS1jb2xvci13YXJuO1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNoZWNrb3V0LnZ1ZT8xM2I4MWYwMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA2NzVcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNjc2XG4vLyBtb2R1bGUgY2h1bmtzID0gNiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA2Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidG9wLXRpcHNcIiB9LCBbXG4gICAgICAgIF92bS5fdihcIlxcbiAgICDor7flnKjkuIvljZXlkI4gNDgg5bCP5pe25YaF5a6M5oiQ5pSv5LuY77yM6LaF6L+HIDI0IOWwj+aXtuWQjuiuouWNleWwhuiHquWKqOWPlua2iOOAglxcbiAgXCIpXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFkZHJlc3MtcGFuZWxcIiwgYXR0cnM6IHsgdG86IFwiL2FkZHJlc3NcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnN1bWVyLW5hbWVcIiB9LCBbX3ZtLl92KFwi55Sw5YuHXCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb25zdW1lci1tb2JpbGVcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIjEzMjIyMjI1NTU1XCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFkZHJlc3NcIiB9LCBbX3ZtLl92KFwi5bm/5Lic55yB5rex5Zyz5biC5Y2X5bGx5Yy66L2v5Lu25Lqn5Lia5Z+65ZywXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm90dG9tLWJvcmRlclwiIH0pXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ3ZXVpLXBhbmVsIHdldWktcGFuZWxfYWNjZXNzIHByb2R1Y3QtbGlzdFwiIH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIndldWktcGFuZWxfX2JkXCIgfSxcbiAgICAgICAgICBfdm0uX2woX3ZtLmNhcnRzLCBmdW5jdGlvbihjYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IGNhcnQuaWQsXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3ggd2V1aS1tZWRpYS1ib3hfYXBwbXNnXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3hfX2hkXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fdGh1bWJcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBjYXJ0LnByb2R1Y3QudGh1bWJuYWlsIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIndldWktbWVkaWEtYm94X19iZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaDRcIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3ZXVpLW1lZGlhLWJveF9fdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhjYXJ0LnByb2R1Y3QubmFtZSkgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwid2V1aS1tZWRpYS1ib3hfX2Rlc2NcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInByaWNlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLl9mKFwicHJpY2VGaWx0ZXJcIikoY2FydC5wcm9kdWN0LnByaWNlKSkpXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgw5dcXG4gICAgICAgICAgICBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoY2FydC5hbW91bnQpIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwib3RoZXItaW5mb1wiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwgeyBhdHRyczogeyB0aXRsZTogXCLllYblk4Hku7bmlbBcIiwgdmFsdWU6IF92bS5wcm9kdWN0QW1vdW50IH0gfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwi5ZWG5ZOB6YeR6aKdXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uX2YoXCJwcmljZUZpbHRlclwiKShfdm0udG90YWxQcmljZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7IGF0dHJzOiB7IHRpdGxlOiBcIuS8mOaDoFwiLCB2YWx1ZTogXCIwXCIgfSB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZm9vdGVyXCIsIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0b3RhbC1wcmljZVwiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoXCLlrp7ku5jmrL7vvJpcIiArIF92bS5fcyhfdm0uX2YoXCJwcmljZUZpbHRlclwiKShfdm0udG90YWxQcmljZSkpKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJ0biBidG4tY2hlY2tvdXRcIiwgb246IHsgY2xpY2s6IF92bS5jaGVja291dCB9IH0sXG4gICAgICAgICAgW192bS5fdihcIueri+WNs+S4i+WNlVwiKV1cbiAgICAgICAgKVxuICAgICAgXSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtZjJjMzhiZTZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWYyYzM4YmU2XCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2hlY2tvdXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSA2Il0sInNvdXJjZVJvb3QiOiIifQ==