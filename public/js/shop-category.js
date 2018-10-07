webpackJsonp([8],{

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(681)
}
var normalizeComponent = __webpack_require__(632)
/* script */
var __vue_script__ = __webpack_require__(683)
/* template */
var __vue_template__ = __webpack_require__(684)
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
Component.options.__file = "resources/js/shop/pages/category.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b50a75d8", Component.options)
  } else {
    hotAPI.reload("data-v-b50a75d8", Component.options)
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

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(636);

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

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(637), __esModule: true };

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(638);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(25);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(20), 'Object', { defineProperty: __webpack_require__(26).f });


/***/ }),

/***/ 652:
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

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(682);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(633)("32a452dd", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b50a75d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b50a75d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(127)(false);
// imports


// module
exports.push([module.i, "\n.left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll;\n}\n.left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6;\n}\n.left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red;\n}\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem;\n}\n.right-panel .product-list {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    width: 100%;\n    -webkit-column-count: 2;\n            column-count: 2;\n}\n.right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px;\n}\n.right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%;\n}\n.right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n.right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px;\n}\n", ""]);

// exports


/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item_style__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_style__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_swipe_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_swipe__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_price_filter__ = __webpack_require__(652);




 //
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_swipe___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_swipe___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe_item___default.a), _components),

  mixins: [__WEBPACK_IMPORTED_MODULE_5__mixins_price_filter__["a" /* default */]],

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

/***/ 684:
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
    require("vue-hot-reload-api")      .rerender("data-v-b50a75d8", module.exports)
  }
}

/***/ })

});