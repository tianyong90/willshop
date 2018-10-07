webpackJsonp([3],{

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

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(707)
}
var normalizeComponent = __webpack_require__(622)
/* script */
var __vue_script__ = __webpack_require__(709)
/* template */
var __vue_template__ = __webpack_require__(711)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4030e3c9"
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
Component.options.__file = "resources/js/shop/pages/product.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4030e3c9", Component.options)
  } else {
    hotAPI.reload("data-v-4030e3c9", Component.options)
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

/***/ 638:
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
      staticClass: "wv-swipe-item",
      style: _vm.style
    }, [_vm._t("default")], 2);
  },
  name: 'swipe-item',
  data: function data() {
    return {
      offset: 0
    };
  },
  computed: {
    style: function style() {
      return {
        width: this.$parent.width + 'px',
        transform: "translate3d(" + this.offset + "px, 0, 0)"
      };
    }
  },
  beforeCreate: function beforeCreate() {
    this.$parent && this.$parent.swipes.push(this);
  },
  destroyed: function destroyed() {
    this.$parent && this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  }
});

exports.default = _default;

/***/ }),

/***/ 639:
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
      staticClass: "wv-swipe",
      on: {
        "touchstart": _vm.onTouchstart,
        "touchmove": _vm.onTouchmove,
        "touchend": _vm.onTouchend,
        "touchcancel": _vm.onTouchend
      }
    }, [_c('div', {
      staticClass: "wv-swipe__wrapper",
      style: _vm.wrapperStyle,
      on: {
        "transitionend": function transitionend($event) {
          _vm.$emit('change', _vm.activeIndicator);
        }
      }
    }, [_vm._t("default")], 2), _vm.showIndicators && _vm.count > 1 ? _c('div', {
      staticClass: "wv-swipe__indicators"
    }, _vm._l(_vm.count, function (index) {
      return _c('i', {
        key: index,
        class: {
          'wv-swipe__indicator--active': index - 1 === _vm.activeIndicator
        }
      });
    })) : _vm._e()]);
  },
  name: 'swipe',
  props: {
    height: Number,
    autoplay: Number,
    defaultIndex: {
      type: Number,
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    },
    prevent: Boolean,
    noDragWhenSingle: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      width: 0,
      offset: 0,
      startX: 0,
      startY: 0,
      active: 0,
      deltaX: 0,
      swipes: [],
      direction: '',
      currentDuration: 0
    };
  },
  mounted: function mounted() {
    this.initialize();
  },
  destroyed: function destroyed() {
    clearTimeout(this.timer);
  },
  watch: {
    swipes: function swipes() {
      this.initialize();
    },
    defaultIndex: function defaultIndex() {
      this.initialize();
    }
  },
  computed: {
    count: function count() {
      return this.swipes.length;
    },
    wrapperStyle: function wrapperStyle() {
      var ret = {
        paddingLeft: this.count > 1 ? this.width + 'px' : 0,
        width: this.count > 1 ? (this.count + 2) * this.width + 'px' : '100%',
        transitionDuration: this.currentDuration + "ms",
        transform: "translate3d(" + this.offset + "px, 0, 0)"
      };

      if (this.height) {
        ret.height = this.height + 'px';
      }

      return ret;
    },
    activeIndicator: function activeIndicator() {
      return (this.active + this.count) % this.count;
    }
  },
  methods: {
    initialize: function initialize() {
      clearTimeout(this.timer);
      this.width = this.$el.getBoundingClientRect().width;
      this.active = this.defaultIndex;
      this.currentDuration = 0;
      this.offset = this.count > 1 ? -this.width * (this.active + 1) : 0;
      this.swipes.forEach(function (swipe) {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    onTouchstart: function onTouchstart(event) {
      if (this.count === 1 && this.noDragWhenSingle) {
        return;
      }

      clearTimeout(this.timer);
      var touch = (0, _utils.getTouch)(event);
      this.deltaX = 0;
      this.direction = '';
      this.currentDuration = 0;
      this.startX = touch.clientX;
      this.startY = touch.clientY;

      if (this.active <= -1) {
        this.move(this.count);
      }

      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },
    onTouchmove: function onTouchmove(event) {
      if (this.prevent) {
        event.preventDefault();
      }

      var touch = (0, _utils.getTouch)(event);
      this.deltaX = touch.clientX - this.startX;
      var deltaY = touch.clientY - this.startY;

      if (this.count === 1) {
        if (this.noDragWhenSingle) return;
        this.offset = this.range(this.deltaX, [-20, 20]);
      } else if (this.count > 1 && Math.abs(this.deltaX) > Math.abs(deltaY)) {
        this.move(0, this.range(this.deltaX, [-this.width, this.width]));
      }
    },
    onTouchend: function onTouchend() {
      if (this.count === 1) {
        if (this.noDragWhenSingle) return;
        this.offset = 0;
        this.currentDuration = this.duration;
      } else {
        if (this.deltaX) {
          this.move(Math.abs(this.deltaX) > 50 ? this.deltaX > 0 ? -1 : 1 : 0);
          this.currentDuration = this.duration;
        }

        this.autoPlay();
      }
    },
    move: function move(_move, offset) {
      if (_move === void 0) {
        _move = 0;
      }

      if (offset === void 0) {
        offset = 0;
      }

      var active = this.active,
          count = this.count,
          swipes = this.swipes,
          deltaX = this.deltaX,
          width = this.width;

      if (_move) {
        if (active === -1) {
          swipes[count - 1].offset = 0;
        }

        swipes[0].offset = active === count - 1 && _move > 0 ? count * width : 0;
        this.active += _move;
      } else {
        if (active === 0) {
          swipes[count - 1].offset = deltaX > 0 ? -count * width : 0;
        } else if (active === count - 1) {
          swipes[0].offset = deltaX < 0 ? count * width : 0;
        }
      }

      this.offset = offset - (this.active + 1) * this.width;
    },
    autoPlay: function autoPlay() {
      var _this = this;

      var autoplay = this.autoplay;

      if (autoplay && this.count > 1) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this.currentDuration = 0;

          if (_this.active >= _this.count) {
            _this.move(-_this.count);
          }

          setTimeout(function () {
            _this.currentDuration = _this.duration;

            _this.move(1);

            _this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },
    range: function range(num, arr) {
      return Math.min(Math.max(num, arr[0]), arr[1]);
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(45);

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(103));

var _utils = __webpack_require__(76);

var isNaN = Number.isNaN || window.isNaN;

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', _vm._g({
      staticClass: "wv-number-spinner"
    }, _vm.listeners), [_c('button', {
      staticClass: "spinner-btn btn-minus",
      attrs: {
        "disabled": _vm.disabled || _vm.readonly || !_vm.decreasable
      },
      on: {
        "click": _vm.decrease
      }
    }), _c('input', _vm._b({
      ref: "input",
      style: _vm.inputStyle,
      attrs: {
        "type": "number",
        "min": _vm.min,
        "max": _vm.max,
        "step": _vm.step,
        "disabled": _vm.disabled || !_vm.decreasable && !_vm.increasable,
        "readonly": _vm.readonly
      },
      domProps: {
        "value": _vm.currentValue
      },
      on: {
        "change": _vm.onChange,
        "paste": _vm.onPaste,
        "keypress": _vm.onKeypress
      }
    }, 'input', _vm.$attrs, false)), _c('button', {
      staticClass: "spinner-btn btn-plus",
      attrs: {
        "disabled": _vm.disabled || _vm.readonly || !_vm.increasable
      },
      on: {
        "click": _vm.increase
      }
    })]);
  },
  name: 'number-spinner',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    inputWidth: {
      type: String,
      default: '3em'
    },
    readonly: Boolean,
    disabled: Boolean,
    align: {
      type: String,
      default: 'center'
    },
    fillable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  computed: {
    increasable: function increasable() {
      var num = this.currentValue;
      return isNaN(num) || num < this.max;
    },
    decreasable: function decreasable() {
      var num = this.currentValue;
      return isNaN(num) || num > this.min;
    },
    inputStyle: function inputStyle() {
      return {
        width: this.inputWidth,
        textAlign: this.align
      };
    },
    listeners: function listeners() {
      var listeners = (0, _objectSpread2.default)({}, this.$listeners);
      delete listeners.change;
      return listeners;
    }
  },
  created: function created() {
    if (this.min < this.max) {
      this.currentValue = Math.min(this.max, Math.max(this.min, this.value));
    }
  },
  methods: {
    decrease: function decrease() {
      if (this.decreasable) {
        var currentValue = this.currentValue;

        if (isNaN(currentValue)) {
          currentValue = 0;
        }

        this.setValue(Math.min(this.max, Math.max(this.min, currentValue - this.step)));
      }
    },
    increase: function increase() {
      if (this.increasable) {
        var currentValue = this.currentValue;

        if (isNaN(currentValue)) {
          currentValue = 0;
        }

        this.setValue(Math.min(this.max, Math.max(this.min, currentValue + this.step)));
      }
    },
    onChange: function onChange(event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)));
    },
    onPaste: function onPaste(event) {
      if (!this.fillable || !/^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/.test(event.clipboardData.getData('text'))) {
        event.preventDefault();
      }
    },
    onKeypress: function onKeypress(event) {
      if (!this.fillable) {
        event.preventDefault();
      }
    },
    setValue: function setValue(val) {
      var oldValue = this.currentValue;
      this.currentValue = val;
      this.$emit('change', val, oldValue);
      this.$refs.input.value = val;
    }
  },
  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    },
    value: function value(val) {
      if (typeof val === 'number') {
        if (val <= this.min) {
          this.currentValue = this.min;
        } else if (val >= this.max) {
          this.currentValue = this.max;
        } else {
          this.currentValue = val;
        }
      } else if (val === '') {
        this.currentValue = '';
      }
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(708);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(623)("ec2ffae2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4030e3c9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4030e3c9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./product.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(592)(false);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-4030e3c9] {\n  display: block;\n  overflow: hidden;\n}\n.details[data-v-4030e3c9] {\n  display: block;\n  background-color: #fff;\n  overflow: hidden;\n}\n.details .name[data-v-4030e3c9] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: #666;\n}\n.details .price[data-v-4030e3c9] {\n    display: block;\n    padding: 0 10px;\n    font-size: 17px;\n    color: red;\n}\n.description[data-v-4030e3c9] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 1rem 0.5rem 80px 0.5rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  color: #666;\n  margin-top: 10px;\n}\n.popup-footer[data-v-4030e3c9] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 1em;\n}\n.popup-footer .btn[data-v-4030e3c9] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    text-align: center;\n    padding: .5em 0;\n    color: #fff;\n}\n.popup-footer .popup-btn-add-cart[data-v-4030e3c9] {\n    background-color: red;\n}\nfooter[data-v-4030e3c9] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  height: 45px;\n  background-color: #fff;\n  border-top: 1px solid #ccc;\n}\nfooter .btn[data-v-4030e3c9] {\n    color: #555;\n    text-align: center;\n    padding: 2px 0;\n    font-size: 12px;\n    position: relative;\n    -ms-flex-preferred-size: 80px;\n        flex-basis: 80px;\n}\nfooter .btn .icon[data-v-4030e3c9] {\n      display: block;\n}\nfooter .btn .icon.is-favourite[data-v-4030e3c9] {\n        color: #f00;\n}\nfooter .btn .amount[data-v-4030e3c9] {\n      position: absolute;\n      background-color: #f00;\n      top: 3px;\n      right: 20px;\n      color: #fff;\n      font-size: 10px;\n      padding: 0 4px;\n      border-radius: 50%;\n}\nfooter .btn .text[data-v-4030e3c9] {\n      font-size: 12px;\n}\nfooter .btn-add-cart[data-v-4030e3c9] {\n    height: 45px;\n    line-height: 45px;\n    font-size: 15px;\n    text-align: center;\n    color: #fff;\n    padding: 0;\n    background-color: #c00;\n    -webkit-box-flex: 5;\n        -ms-flex-positive: 5;\n            flex-grow: 5;\n}\n", ""]);

// exports


/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_group__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_popup__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_popup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_number_spinner__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_number_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_number_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vue__);






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




__WEBPACK_IMPORTED_MODULE_6_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe___default.a).use(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default.a).use(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_group___default.a).use(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a).use(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_popup___default.a).use(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_number_spinner___default.a);

/* harmony default export */ __webpack_exports__["default"] = ({
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

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(45);

exports.__esModule = true;
exports.default = void 0;

var _popup = _interopRequireDefault(__webpack_require__(201));

var _utils = __webpack_require__(76);

var _default = (0, _utils.create)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "enter-active-class": "weui-animate-slide-up",
        "leave-active-class": "weui-animate-slide-down"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.visible,
        expression: "visible"
      }],
      staticClass: "wv-popup",
      style: _vm.style
    }, [_vm._t("default")], 2)]);
  },
  name: 'popup',
  mixins: [_popup.default],
  props: {
    height: {
      type: [String, Number],
      default: 'auto',
      validator: function validator(val) {
        return /^(auto)|(\d+(px|vh|%)?)$/.test(val);
      }
    },
    mask: {
      default: true
    },
    lockOnScroll: {
      default: true
    },
    closeOnClickMask: {
      default: true
    },
    maskClass: {
      default: 'weui-mask'
    }
  },
  computed: {
    style: function style() {
      var ret = {};

      if (/^\d+$/.test(this.height)) {
        ret.height = parseInt(this.height) + 'px';
      } else {
        ret.height = this.height;
      }

      return ret;
    }
  },
  mounted: function mounted() {
    if (this.visible) {
      this.open();
    }
  }
});

exports.default = _default;

/***/ }),

/***/ 711:
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
    require("vue-hot-reload-api")      .rerender("data-v-4030e3c9", module.exports)
  }
}

/***/ })

});