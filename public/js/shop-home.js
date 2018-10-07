webpackJsonp([10],{

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(673)
}
var normalizeComponent = __webpack_require__(632)
/* script */
var __vue_script__ = __webpack_require__(675)
/* template */
var __vue_template__ = __webpack_require__(676)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-425a1375"
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
Component.options.__file = "resources/js/shop/pages/home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-425a1375", Component.options)
  } else {
    hotAPI.reload("data-v-425a1375", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 632:
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

/***/ 633:
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

var listToStyles = __webpack_require__(634)

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

/***/ 634:
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

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(203);
__webpack_require__(656);

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(657);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(128)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./swipe.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./swipe.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(127)(false);
// imports


// module
exports.push([module.i, ".wv-swipe{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;overflow:hidden;position:relative;user-select:none}.wv-swipe__wrapper{height:100%;overflow:hidden}.wv-swipe__indicators{-webkit-transform:translate3d(-50%,0,0);bottom:10px;height:6px;left:50%;position:absolute;transform:translate3d(-50%,0,0)}.wv-swipe__indicators>i{background-color:grey;border-radius:100%;display:inline-block;height:6px;vertical-align:top;width:6px}.wv-swipe__indicators>i:not(:last-child){margin-right:6px}.wv-swipe__indicators .wv-swipe__indicator--active{background-color:#fff}.wv-swipe-item{float:left;height:100%}", ""]);

// exports


/***/ }),

/***/ 658:
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

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(203);

/***/ }),

/***/ 660:
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

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(674);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(633)("3fab183c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-425a1375\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-425a1375\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(127)(false);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-425a1375] {\n  display: block;\n  overflow: hidden;\n}\n.ad[data-v-425a1375] {\n  display: block;\n  width: 100%;\n  height: 60px;\n  overflow: hidden;\n  position: relative;\n  margin-top: 10px;\n}\n.ad img[data-v-425a1375] {\n    position: absolute;\n    display: block;\n    overflow: hidden;\n    width: 100%;\n}\n.ad .link[data-v-425a1375] {\n    z-index: 10;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    color: #fff;\n}\n.product-list[data-v-425a1375] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n  margin: 10px auto 65px;\n}\n.product-list .product-item[data-v-425a1375] {\n    width: calc(50vw - 4px);\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n}\n.product-list .product-item .thumbnail[data-v-425a1375] {\n      display: block;\n      width: 100%;\n}\n.product-list .product-item .name[data-v-425a1375] {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      box-orient: vertical;\n      line-clamp: 2;\n      word-break: break-all;\n}\n.product-list .product-item .price[data-v-425a1375] {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right;\n}\n", ""]);

// exports


/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe_style__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_we_vue_lib_swipe_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item_style__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_item__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




__WEBPACK_IMPORTED_MODULE_4_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe___default.a).use(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_item___default.a);

var banners = [{
  url: 'javascript:',
  img: 'https://picsum.photos/640/480/?random'
}, {
  url: 'javascript:',
  img: 'https://picsum.photos/640/480/?random'
}, {
  url: 'javascript',
  img: 'https://picsum.photos/640/480/?random'
}];

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      products: [],
      banners: banners
    };
  },
  mounted: function mounted() {
    this.getProducts();
  },


  methods: {
    getProducts: function getProducts() {
      var _this = this;

      this.axios.get('products').then(function (response) {
        _this.products = response.data.products;
      });
    }
  }
});

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main" },
    [
      _c(
        "wv-swipe",
        { attrs: { height: 180, auto: 4000 } },
        _vm._l(_vm.banners, function(banner) {
          return _c(
            "wv-swipe-item",
            { key: banner.index, staticClass: "banner-swipe-item" },
            [_c("img", { attrs: { src: banner.img, alt: "" } })]
          )
        })
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ad" },
        [
          _c("img", {
            attrs: {
              src:
                "https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg",
              alt: ""
            }
          }),
          _vm._v(" "),
          _c("router-link", { attrs: { to: "" } }, [_vm._v("去看看")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.products.data, function(product) {
          return _c(
            "div",
            { staticClass: "product-item" },
            [
              _c("router-link", { attrs: { to: "/product/" + product.id } }, [
                _c("img", {
                  staticClass: "thumbnail",
                  attrs: { src: product.thumbnail, alt: "" }
                }),
                _vm._v(" "),
                _c("span", {
                  staticClass: "name",
                  domProps: { textContent: _vm._s(product.name) }
                }),
                _vm._v(" "),
                _c("div", {
                  staticClass: "price",
                  domProps: { innerHTML: _vm._s(product.price) }
                })
              ])
            ],
            1
          )
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-425a1375", module.exports)
  }
}

/***/ })

});