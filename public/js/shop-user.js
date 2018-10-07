webpackJsonp([5],{

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

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(679)
}
var normalizeComponent = __webpack_require__(622)
/* script */
var __vue_script__ = __webpack_require__(681)
/* template */
var __vue_template__ = __webpack_require__(683)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4f72b461"
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
Component.options.__file = "resources/js/shop/pages/user.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f72b461", Component.options)
  } else {
    hotAPI.reload("data-v-4f72b461", Component.options)
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

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(680);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(623)("371f152c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f72b461\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f72b461\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(592)(false);
// imports


// module
exports.push([module.i, "\n.main[data-v-4f72b461] {\n  margin-bottom: 70px;\n}\n.user-profile[data-v-4f72b461] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #2696cb;\n  padding: 20px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.user-profile .avatar[data-v-4f72b461] {\n    display: block;\n    float: left;\n    width: 80px;\n    height: 80px;\n    border-radius: 70px;\n}\n.user-profile .nickname[data-v-4f72b461] {\n    display: block;\n    color: #fff;\n    font-size: 1.1rem;\n    margin-top: .5rem;\n}\n.user-profile .mobile[data-v-4f72b461] {\n    display: block;\n    color: #fff;\n    font-size: 15px;\n}\n.card .br-1px[data-v-4f72b461] {\n  border-right: 1px solid #ececec;\n}\n.card .card-item[data-v-4f72b461] {\n  display: block;\n  padding: .3rem;\n  overflow: hidden;\n  background-color: #fff;\n  text-align: center;\n}\n.card .card-item .amount[data-v-4f72b461] {\n    display: block;\n    color: #f74c31;\n    font-size: 16px;\n    font-weight: 500;\n}\n.card .card-item .label[data-v-4f72b461] {\n    display: block;\n    color: #666;\n    font-size: 14px;\n    font-weight: 400;\n}\n.icon[data-v-4f72b461] {\n  display: inline-block;\n  float: left;\n  margin-right: 5px;\n  color: #777;\n}\n.card-demo-flex[data-v-4f72b461] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.card-demo-content01[data-v-4f72b461] {\n  padding: 10px 0;\n}\n.card-padding[data-v-4f72b461] {\n  padding: 15px;\n}\n.card-demo-flex > div[data-v-4f72b461] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center;\n  font-size: 12px;\n}\n.card-demo-flex span[data-v-4f72b461] {\n  color: #f74c31;\n}\n", ""]);

// exports


/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg__);






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
//
//
//
//
//
//
//
//
//
//
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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a), _components),

  data: function data() {
    return {
      user: {},
      defaultAvatar: __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg___default.a
    };
  },
  mounted: function mounted() {
    this.getUser();
  },


  methods: {
    getUser: function getUser() {
      var _this = this;

      this.axios.get('current-user').then(function (response) {
        _this.user = response.data.user;
      });
    }
  }
});

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = "/images/default-avatar.jpg?fb83f1bc3948b1a5622234532840acc8";

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main" },
    [
      _c("div", { staticClass: "user-profile" }, [
        _c("img", {
          staticClass: "avatar",
          attrs: { src: _vm.user.avatar || _vm.defaultAvatar }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "nickname" }, [
          _vm._v(_vm._s(_vm.user.nickname))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "mobile" }, [_vm._v(_vm._s(_vm.user.mobile))])
      ]),
      _vm._v(" "),
      _c(
        "wv-flex",
        { staticClass: "card" },
        [
          _c("wv-flex-item", { staticClass: "card-item br-1px" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("1130")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的余额")])
          ]),
          _vm._v(" "),
          _c("wv-flex-item", { staticClass: "card-item br-1px" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("15")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的积分")])
          ]),
          _vm._v(" "),
          _c("wv-flex-item", { staticClass: "card-item" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("0")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的红包")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        [
          _c(
            "wv-cell",
            { attrs: { title: "我的订单", "is-link": "", to: "order-list" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-goods",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "收货地址", "is-link": "", to: "address" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-location",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "我的收藏", "is-link": "", to: "favourite" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-like",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        [
          _c(
            "wv-cell",
            { attrs: { title: "使用帮助", "is-link": "", to: "help" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-question",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "关于我们", "is-link": "", to: "about-us" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-info",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
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
    require("vue-hot-reload-api")      .rerender("data-v-4f72b461", module.exports)
  }
}

/***/ })

});