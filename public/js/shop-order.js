webpackJsonp([1],{

/***/ 592:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(655)
}
var normalizeComponent = __webpack_require__(622)
/* script */
var __vue_script__ = __webpack_require__(657)
/* template */
var __vue_template__ = __webpack_require__(658)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-213714d3"
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
Component.options.__file = "resources/js/shop/pages/order-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-213714d3", Component.options)
  } else {
    hotAPI.reload("data-v-213714d3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(659)
}
var normalizeComponent = __webpack_require__(622)
/* script */
var __vue_script__ = __webpack_require__(661)
/* template */
var __vue_template__ = __webpack_require__(663)
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
Component.options.__file = "resources/js/shop/pages/order.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-75f05f28", Component.options)
  } else {
    hotAPI.reload("data-v-75f05f28", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 622:
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

/***/ 623:
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

var listToStyles = __webpack_require__(624)

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

/***/ 624:
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

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(626);

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

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(627), __esModule: true };

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(628);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(25);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(20), 'Object', { defineProperty: __webpack_require__(26).f });


/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * add vue-router support
 */
var _default = {
  props: {
    url: String,
    replace: Boolean,
    to: [String, Object]
  },
  methods: {
    routerLink: function routerLink() {
      var to = this.to,
          url = this.url,
          $router = this.$router,
          replace = this.replace;

      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to);
      } else if (url) {
        replace ? location.replace(url) : location.href = url;
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(45);

exports.__esModule = true;
exports.default = void 0;

var _utils = __webpack_require__(76);

var _routerLink = _interopRequireDefault(__webpack_require__(633));

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "weui-cell",
      class: {
        'weui-cell_access': _vm.isLink
      },
      on: {
        "click": _vm.onClick
      }
    }, [_c('div', {
      staticClass: "weui-cell_hd"
    }, [_vm._t("icon")], 2), _c('div', {
      staticClass: "weui-cell__bd"
    }, [_vm._t("bd", [_c('p', {
      domProps: {
        "innerHTML": _vm._s(_vm.title)
      }
    })])], 2), _c('div', {
      staticClass: "weui-cell__ft"
    }, [_vm._t("ft", [_vm._v(_vm._s(_vm.value))])], 2)]);
  },
  name: 'cell',
  mixins: [_routerLink.default],
  props: {
    title: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    isLink: Boolean
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
      this.routerLink();
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _utils = __webpack_require__(76);

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm.title ? _c('div', {
      staticClass: "weui-cells__title",
      style: {
        color: _vm.titleColor
      },
      domProps: {
        "innerHTML": _vm._s(_vm.title)
      }
    }) : _vm._e(), _c('div', {
      staticClass: "weui-cells"
    }, [_vm._t("default")], 2)]);
  },
  name: 'group',
  props: {
    title: String,
    titleColor: String
  }
});

exports.default = _default;

/***/ }),

/***/ 636:
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

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _utils = __webpack_require__(76);

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "weui-btn",
      class: _vm.classObject,
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "click": _vm.handleClick
      }
    }, [_vm.isLoading ? _c('i', {
      staticClass: "weui-loading"
    }) : _vm._e(), _vm._t("default")], 2);
  },
  name: 'button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    isLoading: Boolean,
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    classObject: function classObject() {
      var ret = {};
      var classType = this.plain ? "weui-btn_plain-" + this.type : "weui-btn_" + this.type;
      var classDisabled = this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled';
      ret[classType] = true;
      ret[classDisabled] = this.disabled;
      ret['weui-btn_loading'] = this.isLoading;
      ret['weui-btn_mini'] = this.mini;
      return ret;
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(45);

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(103));

var _utils = __webpack_require__(76);

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "weui-flex__item",
      style: _vm.style
    }, [_vm._t("default")], 2);
  },
  name: 'flex-item',
  props: {
    flex: {
      type: [Number, String],
      default: 1
    },
    offset: {
      type: String,
      default: ''
    }
  },
  computed: {
    gutter: function gutter() {
      return this.$parent && Number(this.$parent.gutter) || 0;
    },
    style: function style() {
      var padding = Number(this.gutter) / 2 + "px";
      var ret = this.gutter ? {
        paddingLeft: padding,
        paddingRight: padding
      } : {};
      return (0, _objectSpread2.default)({}, ret, {
        flex: Number(this.flex),
        marginLeft: this.offset
      });
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _utils = __webpack_require__(76);

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "weui-flex",
      style: _vm.style
    }, [_vm._t("default")], 2);
  },
  name: 'flex',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
      validator: function validator(val) {
        return Number(val) >= 0;
      }
    }
  },
  computed: {
    style: function style() {
      var margin = "-" + Number(this.gutter) / 2 + "px";
      return this.gutter ? {
        marginLeft: margin,
        marginRight: margin
      } : {};
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(656);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(623)("f4896b5e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-213714d3\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-list.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-213714d3\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(592)(false);
// imports


// module
exports.push([module.i, "\n.order-list[data-v-213714d3] {\n  padding-top: 65px;\n}\n.order-list .order-item[data-v-213714d3] {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em;\n}\n.order-list .order-item .hd[data-v-213714d3] {\n      display: block;\n      overflow: hidden;\n}\n.order-list .order-item .hd .order-number[data-v-213714d3] {\n        float: left;\n        font-size: 13px;\n        color: #666;\n}\n.order-list .order-item .hd .btn-delete[data-v-213714d3] {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px;\n}\n.order-list .order-item .bd[data-v-213714d3] {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5;\n}\n.order-list .order-item .bd .product[data-v-213714d3] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        padding: .2em;\n}\n.order-list .order-item .bd .product .thumbnail[data-v-213714d3] {\n          width: 60px;\n          height: 60px;\n}\n.order-list .order-item .bd .product .name[data-v-213714d3] {\n          margin-left: 10px;\n          color: #555;\n}\n.order-list .order-item .ft[data-v-213714d3] {\n      padding: 10px;\n      text-align: right;\n}\n.empty-msg[data-v-213714d3] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #777;\n}\n.empty-msg .iconfont[data-v-213714d3] {\n    font-size: 80px;\n}\n.empty-msg .msg[data-v-213714d3] {\n    font-size: 14px;\n}\n", ""]);

// exports


/***/ }),

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__);
throw new Error("Cannot find module \"we-vue/lib/navbar-item\"");
throw new Error("Cannot find module \"we-vue/lib/navbar\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(87);




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

/***/ 658:
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
    require("vue-hot-reload-api")      .rerender("data-v-213714d3", module.exports)
  }
}

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(660);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(623)("d4be0a2c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75f05f28\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-75f05f28\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(592)(false);
// imports


// module
exports.push([module.i, "\n.status-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#e64340), to(#ec6f6d));\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px;\n}\n.status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em;\n}\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.product-list .product-item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n.product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px;\n}\n.product-list .product-item .item-right {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      padding: 0 14px;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500;\n}\n.product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888;\n}\n.product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px;\n}\n.product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em;\n}\n.fee-info {\n  margin-bottom: 70px;\n}\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\nfooter .weui-flex__item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__ = __webpack_require__(662);





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

/***/ 662:
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

/***/ 663:
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
    require("vue-hot-reload-api")      .rerender("data-v-75f05f28", module.exports)
  }
}

/***/ })

});