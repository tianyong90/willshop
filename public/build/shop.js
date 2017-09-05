webpackJsonp([19],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks');
var uid = __webpack_require__(35);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(3);
var ctx = __webpack_require__(11);
var hide = __webpack_require__(5);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(67);
var toPrimitive = __webpack_require__(68);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(32);
var defined = __webpack_require__(21);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys');
var uid = __webpack_require__(35);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(13).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(106);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(70);
var enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(64);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(15);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(22);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(79);
var hide = __webpack_require__(5);
var has = __webpack_require__(14);
var Iterators = __webpack_require__(9);
var $iterCreate = __webpack_require__(80);
var setToStringTag = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(83);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(15);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var invoke = __webpack_require__(94);
var html = __webpack_require__(40);
var cel = __webpack_require__(20);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(15)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(25);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.eot?bea416156d8549b6116cda2383b7925f";

/***/ }),
/* 55 */
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

var listToStyles = __webpack_require__(129)

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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var Config = {
  apiRoot: '/api/shop',
  timeout: 10000,
  smsResendCountdown: 60,
  jwtTokenName: 'willshop_jwt_token'
};

exports.default = Config;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(16);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(17);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var state = {
  isLoading: false,
  direction: 'forward',
  isMainMenuVisible: true,
  isLogin: false
};

exports.default = new _vuex2.default.Store({
  state: state,
  mutations: {
    UPDATE_LOADING: function UPDATE_LOADING(state, value) {
      state.isLoading = value;
    },
    UPDATE_DIRECTION: function UPDATE_DIRECTION(state, value) {
      state.direction = value;
    },
    UPDATE_MAINMENU_VISIBLE: function UPDATE_MAINMENU_VISIBLE(state, value) {
      state.isMainMenuVisible = value;
    },
    UPDATE_IS_LOGIN: function UPDATE_IS_LOGIN(state, value) {
      state.isLogin = value;
    }
  }
});

/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(30);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(74);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(16);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(46);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _weVue = __webpack_require__(28);

var _weVue2 = _interopRequireDefault(_weVue);

__webpack_require__(104);

__webpack_require__(107);

var _axios = __webpack_require__(47);

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = __webpack_require__(53);

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _index = __webpack_require__(59);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(57);

var _config2 = _interopRequireDefault(_config);

var _routes = __webpack_require__(128);

var _routes2 = _interopRequireDefault(_routes);

var _vuex = __webpack_require__(17);

__webpack_require__(130);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_weVue2.default);
_vue2.default.use(_vueAxios2.default, _axios2.default);

var router = new _vueRouter2.default({
  mode: 'history',
  base: '/shop/',
  routes: _routes2.default
});

router.beforeEach(function (to, from, next) {
  _index2.default.commit('UPDATE_LOADING', true);
  _index2.default.commit('UPDATE_MAINMENU_VISIBLE', !to.meta.hideMainmenu);

  if (to.matched.some(function (record) {
    return record.meta.auth;
  }) && !window.localStorage.getItem(_config2.default.jwtTokenName)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  next();
});

router.afterEach(function (to, from) {
  document.title = to.meta.title || 'willshop';

  _index2.default.commit('UPDATE_LOADING', false);
});

_axios2.default.defaults.baseURL = _config2.default.apiRoot;
_axios2.default.defaults.timeout = _config2.default.timeout;

_axios2.default.interceptors.request.use(function (config) {
  _index2.default.commit('UPDATE_LOADING', true);

  if (config.hideLoading !== true) {
    app.showLoading();
  }

  var token = window.localStorage.getItem(_config2.default.jwtTokenName);
  config.headers.Authorization = 'bearer ' + token;

  return config;
}, function (error) {
  return _promise2.default.reject(error);
});

_axios2.default.interceptors.response.use(function (response) {
  _index2.default.commit('UPDATE_LOADING', false);
  app.hideLoading();

  var newToken = response.headers.authorization;
  if (newToken) {
    window.localStorage.setItem(_config2.default.jwtTokenName, newToken.replace('bearer ', ''));
  }

  return response;
}, function (error) {
  _index2.default.commit('UPDATE_LOADING', false);
  app.hideLoading();

  if (error.response) {
    var newToken = error.response.headers.authorization;
    if (newToken) {
      window.localStorage.setItem(_config2.default.jwtTokenName, newToken.replace('bearer ', ''));
    }

    if (error.response.status === 401) {
      window.localStorage.removeItem(_config2.default.jwtTokenName);

      router.push('/login');
    } else if (error.response.status === 403) {
      app.error('无操作权限');
    }
  }

  if (error.code === 'ECONNABORTED') {
    app.error('网络繁忙，请重试');
  }
  return _promise2.default.reject(error);
});

var app = new _vue2.default({
  el: '#app',
  router: router,
  store: _index2.default,

  components: {
    'mainmenu': __webpack_require__(135)
  },

  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    isLoading: function isLoading(state) {
      return state.isLoading;
    },
    isMainMenuVisible: function isMainMenuVisible(state) {
      return state.isMainMenuVisible;
    }
  })),

  methods: {
    success: function success(message) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      _weVue2.default.Toast({
        message: message,
        duration: duration
      });
    },
    error: function error(message, duration) {
      _weVue2.default.Toast({
        message: message,
        duration: duration,
        icon: 'warn'
      });
    },
    info: function info(message) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

      _weVue2.default.Toast({
        type: 'text',
        message: message,
        duration: duration
      });
    },
    confirm: function confirm(title, message, callback) {
      _weVue2.default.Dialog({
        title: title,
        message: message,
        skin: this.isiOs ? 'ios' : 'android'
      }, callback);
    },
    showLoading: function showLoading() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading';

      _weVue2.default.Indicator.open(msg);
    },
    hideLoading: function hideLoading() {
      _weVue2.default.Indicator.close();
    }
  }
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(69) });


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(19)(function () {
  return Object.defineProperty(__webpack_require__(20)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(73);
var pIE = __webpack_require__(58);
var toObject = __webpack_require__(37);
var IObject = __webpack_require__(32);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(19)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(71)(false);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(33);
var toAbsoluteIndex = __webpack_require__(72);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
__webpack_require__(77);
__webpack_require__(84);
__webpack_require__(88);
__webpack_require__(99);
__webpack_require__(100);
module.exports = __webpack_require__(3).Promise;


/***/ }),
/* 76 */
/***/ (function(module, exports) {



/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22);
var defined = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(81);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(24);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(82);
var enumBugKeys = __webpack_require__(36);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(20)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(40).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(29);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(37);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
var global = __webpack_require__(1);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(9);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(86);
var step = __webpack_require__(87);
var Iterators = __webpack_require__(9);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var global = __webpack_require__(1);
var ctx = __webpack_require__(11);
var classof = __webpack_require__(41);
var $export = __webpack_require__(6);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(89);
var forOf = __webpack_require__(90);
var speciesConstructor = __webpack_require__(42);
var task = __webpack_require__(43).set;
var microtask = __webpack_require__(95)();
var newPromiseCapabilityModule = __webpack_require__(25);
var perform = __webpack_require__(44);
var promiseResolve = __webpack_require__(45);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(96)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(24)($Promise, PROMISE);
__webpack_require__(97)(PROMISE);
Wrapper = __webpack_require__(3)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(98)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var call = __webpack_require__(91);
var isArrayIter = __webpack_require__(92);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(33);
var getIterFn = __webpack_require__(93);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(9);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(41);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(9);
module.exports = __webpack_require__(3).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(43).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(15)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(5);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(3);
var dP = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(6);
var core = __webpack_require__(3);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(42);
var promiseResolve = __webpack_require__(45);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(25);
var perform = __webpack_require__(44);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(105);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n * WeUI v1.1.2 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:-apple-system-font,Helvetica Neue,sans-serif}*{margin:0;padding:0}a img{border:0}a{text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}@font-face{font-weight:400;font-style:normal;font-family:weui;src:url(\"data:application/octet-stream;base64,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\") format(\"truetype\")}[class*=\" weui-icon-\"],[class^=weui-icon-]{display:inline-block;vertical-align:middle;font:normal normal normal 14px/1 weui;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased}[class*=\" weui-icon-\"]:before,[class^=weui-icon-]:before{display:inline-block;margin-left:.2em;margin-right:.2em}.weui-icon-circle:before{content:\"\\EA01\"}.weui-icon-download:before{content:\"\\EA02\"}.weui-icon-info:before{content:\"\\EA03\"}.weui-icon-safe-success:before{content:\"\\EA04\"}.weui-icon-safe-warn:before{content:\"\\EA05\"}.weui-icon-success:before{content:\"\\EA06\"}.weui-icon-success-circle:before{content:\"\\EA07\"}.weui-icon-success-no-circle:before{content:\"\\EA08\"}.weui-icon-waiting:before{content:\"\\EA09\"}.weui-icon-waiting-circle:before{content:\"\\EA0A\"}.weui-icon-warn:before{content:\"\\EA0B\"}.weui-icon-info-circle:before{content:\"\\EA0C\"}.weui-icon-cancel:before{content:\"\\EA0D\"}.weui-icon-search:before{content:\"\\EA0E\"}.weui-icon-clear:before{content:\"\\EA0F\"}.weui-icon-back:before{content:\"\\EA10\"}.weui-icon-delete:before{content:\"\\EA11\"}[class*=\" weui-icon_\"]:before,[class^=weui-icon_]:before{margin:0}.weui-icon-success{font-size:23px;color:#09bb07}.weui-icon-waiting{font-size:23px;color:#10aeff}.weui-icon-warn{font-size:23px;color:#f43530}.weui-icon-info{font-size:23px;color:#10aeff}.weui-icon-success-circle,.weui-icon-success-no-circle{font-size:23px;color:#09bb07}.weui-icon-waiting-circle{font-size:23px;color:#10aeff}.weui-icon-circle{font-size:23px;color:#c9c9c9}.weui-icon-download,.weui-icon-info-circle{font-size:23px;color:#09bb07}.weui-icon-safe-success{color:#09bb07}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#f43530;font-size:22px}.weui-icon-clear,.weui-icon-search{color:#b2b2b2;font-size:14px}.weui-icon-delete.weui-icon_gallery-delete{color:#fff;font-size:22px}.weui-icon_msg{font-size:93px}.weui-icon_msg.weui-icon-warn{color:#f76260}.weui-icon_msg-primary{font-size:93px}.weui-icon_msg-primary.weui-icon-warn{color:#ffbe00}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.55555556;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn:after{content:\" \";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#000;background-color:#f8f8f8}.weui-btn_default:not(.weui-btn_disabled):visited{color:#000}.weui-btn_default:not(.weui-btn_disabled):active{color:rgba(0,0,0,.6);background-color:#dedede}.weui-btn_primary{background-color:#1aad19}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#179b16}.weui-btn_warn{background-color:#e64340}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_warn:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#ce3c39}.weui-btn_disabled{color:hsla(0,0%,100%,.6)}.weui-btn_disabled.weui-btn_default{color:rgba(0,0,0,.3);background-color:#f7f7f7}.weui-btn_disabled.weui-btn_primary{background-color:#9ed99d}.weui-btn_disabled.weui-btn_warn{background-color:#ec8b89}.weui-btn_loading .weui-loading{margin:-.2em .34em 0 0}.weui-btn_loading.weui-btn_primary,.weui-btn_loading.weui-btn_warn{color:hsla(0,0%,100%,.6)}.weui-btn_loading.weui-btn_primary{background-color:#179b16}.weui-btn_loading.weui-btn_warn{background-color:#ce3c39}.weui-btn_plain-primary{color:#1aad19;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:rgba(26,173,25,.6);border-color:rgba(26,173,25,.6)}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:rgba(53,53,53,.6);border-color:rgba(53,53,53,.6)}.weui-btn_plain-default:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2)}button.weui-btn,input.weui-btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,button.weui-btn_mini,input.weui-btn_inline,input.weui-btn_mini{width:auto}button.weui-btn_plain-default,button.weui-btn_plain-primary,input.weui-btn_plain-default,input.weui-btn_plain-primary{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;padding:0 1.32em;line-height:2.3;font-size:13px}.weui-btn+.weui-btn{margin-top:15px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:15px}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-btn-area_inline{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-btn-area_inline .weui-btn{margin-top:auto;margin-right:15px;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-btn-area_inline .weui-btn:last-child{margin-right:0}.weui-cells{margin-top:1.17647059em;background-color:#fff;line-height:1.47058824;font-size:17px;overflow:hidden;position:relative}.weui-cells:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells:after,.weui-cells:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5;z-index:2}.weui-cells:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells__title+.weui-cells{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px;z-index:2}.weui-cell:first-child:before{display:none}.weui-cell_primary{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_swiped{display:block;padding:0}.weui-cell_swiped>.weui-cell__bd{position:relative;z-index:1;background-color:#fff}.weui-cell_swiped>.weui-cell__ft{position:absolute;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;color:#fff}.weui-swiped-btn{display:block;padding:10px 1em;line-height:1.47058824;color:inherit}.weui-swiped-btn_default{background-color:#c7c7cc}.weui-swiped-btn_warn{background-color:#ff3b30}.weui-cell_access{-webkit-tap-highlight-color:rgba(0,0,0,0);color:inherit}.weui-cell_access:active{background-color:#ececec}.weui-cell_access .weui-cell__ft{padding-right:13px;position:relative}.weui-cell_access .weui-cell__ft:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:first-child:before{display:block}.weui-check__label{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999em}.weui-cells_radio .weui-cell__ft{padding-left:.35em}.weui-cells_radio .weui-check:checked+.weui-icon-checked:before{display:block;content:\"\\EA08\";color:#09bb07;font-size:16px}.weui-cells_checkbox .weui-cell__hd{padding-right:.35em}.weui-cells_checkbox .weui-icon-checked:before{content:\"\\EA01\";color:#c9c9c9;font-size:23px;display:block}.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before{content:\"\\EA06\";color:#09bb07}.weui-label{display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui-input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.47058824em;line-height:1.47058824}.weui-input::-webkit-inner-spin-button,.weui-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui-textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn .weui-textarea-counter{color:#e64340}.weui-toptips{display:none;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-cells_form .weui-cell__ft{font-size:0}.weui-cells_form .weui-icon-warn{display:none}.weui-cells_form input,.weui-cells_form label[for],.weui-cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-cell_warn{color:#e64340}.weui-cell_warn .weui-icon-warn{display:inline-block}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview:after,.weui-form-preview:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-form-preview:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-form-preview__hd .weui-form-preview__value{font-style:normal;font-size:1.6em}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-form-preview__ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}button.weui-form-preview__btn{background-color:transparent;border:0;outline:0;line-height:inherit;font-size:inherit}.weui-form-preview__btn:active{background-color:#eee}.weui-form-preview__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-cell_select .weui-select{padding-right:30px}.weui-cell_select .weui-cell__bd:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select{-webkit-appearance:none;border:0;outline:0;background-color:transparent;width:100%;font-size:inherit;height:45px;line-height:45px;position:relative;z-index:1;padding-left:15px}.weui-cell_select-before{padding-right:15px}.weui-cell_select-before .weui-select{width:105px;box-sizing:border-box}.weui-cell_select-before .weui-cell__hd{position:relative}.weui-cell_select-before .weui-cell__hd:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-cell_select-before .weui-cell__hd:before{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-cell_select-before .weui-cell__bd{padding-left:15px}.weui-cell_select-before .weui-cell__bd:after{display:none}.weui-cell_select-after{padding-left:15px}.weui-cell_select-after .weui-select{padding-left:0}.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:45px;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:45px;font-size:17px;color:#3cc51f}button.weui-vcode-btn{background-color:transparent;border-top:0;border-right:0;border-bottom:0;outline:0}.weui-vcode-btn:active{color:#52a341}.weui-gallery{display:none;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;z-index:1000}.weui-gallery__img{position:absolute;top:0;right:0;bottom:60px;left:0;background:50% no-repeat;background-size:contain}.weui-gallery__opr{position:absolute;right:0;bottom:0;left:0;background-color:#0d0d0d;color:#fff;line-height:60px;text-align:center}.weui-gallery__del{display:block}.weui-cell_switch{padding-top:6.5px;padding-bottom:6.5px}.weui-switch{-webkit-appearance:none;-moz-appearance:none;appearance:none}.weui-switch,.weui-switch-cp__box{position:relative;width:52px;height:32px;border:1px solid #dfdfdf;outline:0;border-radius:16px;box-sizing:border-box;background-color:#dfdfdf;transition:background-color .1s,border .1s}.weui-switch-cp__box:before,.weui-switch:before{content:\" \";position:absolute;top:0;left:0;width:50px;height:30px;border-radius:15px;background-color:#fdfdfd;transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1)}.weui-switch-cp__box:after,.weui-switch:after{content:\" \";position:absolute;top:0;left:0;width:30px;height:30px;border-radius:15px;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4);transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35)}.weui-switch-cp__input:checked~.weui-switch-cp__box,.weui-switch:checked{border-color:#04be02;background-color:#04be02}.weui-switch-cp__input:checked~.weui-switch-cp__box:before,.weui-switch:checked:before{-webkit-transform:scale(0);transform:scale(0)}.weui-switch-cp__input:checked~.weui-switch-cp__box:after,.weui-switch:checked:after{-webkit-transform:translateX(20px);transform:translateX(20px)}.weui-switch-cp__input{position:absolute;left:-9999px}.weui-switch-cp__box{display:block}.weui-uploader__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__files{list-style:none}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px;width:79px;height:79px;background:no-repeat 50%;background-size:cover}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:\" \";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file_status .weui-uploader__file-content{display:block}.weui-uploader__file-content{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__file-content .weui-icon-warn{display:inline-block}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:\" \";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-msg{padding-top:36px;text-align:center}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__text-area a{color:#586c94}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}.weui-msg__extra-area a{color:#586c94}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-article{padding:20px 15px;font-size:15px}.weui-article section{margin-bottom:1.5em}.weui-article h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article h2{font-size:16px}.weui-article h2,.weui-article h3{font-weight:400;margin-bottom:.34em}.weui-article h3{font-size:15px}.weui-article *{max-width:100%;box-sizing:border-box;word-wrap:break-word}.weui-article p{margin:0 0 .8em}.weui-tabbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.weui-tabbar:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #c0bfc4;color:#c0bfc4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-tabbar__item{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:5px 0 0;font-size:0;color:#999;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#09bb07}.weui-tabbar__icon{display:inline-block;width:27px;height:27px}.weui-tabbar__icon>i,i.weui-tabbar__icon{font-size:24px;color:#999}.weui-tabbar__icon img{width:100%;height:100%}.weui-tabbar__label{text-align:center;color:#999;font-size:10px;line-height:1.8}.weui-navbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;top:0;width:100%;background-color:#fafafa}.weui-navbar:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #ccc;color:#ccc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-navbar+.weui-tab__panel{padding-top:50px;padding-bottom:0}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-navbar__item:active{background-color:#ededed}.weui-navbar__item.weui-bar__item_on{background-color:#eaeaea}.weui-navbar__item:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #ccc;color:#ccc;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-navbar__item:last-child:after{display:none}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-bottom:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-tab__content{display:none}.weui-progress{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-progress__bar{background-color:#ebebeb;height:3px;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-progress__inner-bar{width:0;height:100%;background-color:#09bb07}.weui-progress__opr{display:block;margin-left:15px;font-size:0}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel:after,.weui-panel:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-panel:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box:first-child:before{display:none}a.weui-media-box{color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0)}a.weui-media-box:active{background-color:#ececec}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box_text .weui-media-box__title{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-media-box_appmsg .weui-media-box__hd{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box_appmsg .weui-media-box__thumb{width:100%;max-height:100%;vertical-align:top}.weui-media-box_appmsg .weui-media-box__bd{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-media-box_small-appmsg .weui-cells{margin-top:0}.weui-media-box_small-appmsg .weui-cells:before{display:none}.weui-grids{position:relative;overflow:hidden}.weui-grids:before{right:0;height:1px;border-top:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grids:after,.weui-grids:before{content:\" \";position:absolute;left:0;top:0;color:#d9d9d9}.weui-grids:after{width:1px;bottom:0;border-left:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box}.weui-grid:before{top:0;width:1px;border-right:1px solid #d9d9d9;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid:after,.weui-grid:before{content:\" \";position:absolute;right:0;bottom:0;color:#d9d9d9}.weui-grid:after{left:0;height:1px;border-bottom:1px solid #d9d9d9;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grid:active{background-color:#ececec}.weui-grid__icon{width:28px;height:28px;margin:0 auto}.weui-grid__icon img{display:block;width:100%;height:100%}.weui-grid__icon+.weui-grid__label{margin-top:5px}.weui-grid__label{display:block;color:#000;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-footer,.weui-grid__label{text-align:center;font-size:14px}.weui-footer{color:#999}.weui-footer a{color:#586c94}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px}.weui-footer__link:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #c7c7c7;color:#c7c7c7;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5);left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-flex{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-flex__item{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.weui-dialog__hd{padding:1.3em 1.6em .5em}.weui-dialog__title{font-weight:400;font-size:18px}.weui-dialog__bd{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.weui-dialog__ft{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-dialog__btn{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.weui-dialog__btn:active{background-color:#eee}.weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-dialog__btn:first-child:after{display:none}.weui-dialog__btn_default{color:#353535}.weui-dialog__btn_primary{color:#0bb20c}.weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-dialog__title{font-size:21px}.weui-skin_android .weui-dialog__hd{text-align:left}.weui-skin_android .weui-dialog__bd{color:#999;padding:.25em 1.6em 2em;font-size:17px;text-align:left}.weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.weui-skin_android .weui-dialog__ft:after{display:none}.weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.weui-skin_android .weui-dialog__btn:after{display:none}.weui-skin_android .weui-dialog__btn:active,.weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,.06)}.weui-skin_android .weui-dialog__btn:last-child{margin-right:-.8em}.weui-skin_android .weui-dialog__btn_default{color:gray}@media screen and (min-width:1024px){.weui-dialog{width:35%}}.weui-toast{position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:hsla(0,0%,7%,.7);text-align:center;border-radius:5px;color:#fff}.weui-icon_toast{margin:22px 0 0;display:block}.weui-icon_toast.weui-icon-success-no-circle:before{color:#fff;font-size:55px}.weui-icon_toast.weui-loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline}.weui-toast__content{margin:0 0 15px}.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-actionsheet__title{position:relative;height:65px;padding:0 20px;line-height:1.4;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;font-size:14px;color:#888;background:#fcfcfd}.weui-actionsheet__title:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__title .weui-actionsheet__title-text{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-actionsheet__menu{background-color:#fcfcfd}.weui-actionsheet__action{margin-top:6px;background-color:#fcfcfd}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{-webkit-transform:translate(0);transform:translate(0)}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore_line .weui-loadmore__tips{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore_dot .weui-loadmore__tips{padding:0 .16em}.weui-loadmore_dot .weui-loadmore__tips:before{content:\" \";width:4px;height:4px;border-radius:50%;background-color:#e5e5e5;display:inline-block;position:relative;vertical-align:0;top:-.16em}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#f43530;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;background-color:#efeff4}.weui-search-bar:before{top:0;border-top:1px solid #d7d6dc;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar:after,.weui-search-bar:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#d7d6dc}.weui-search-bar:after{bottom:0;border-bottom:1px solid #d7d6dc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{display:block}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label{display:none}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-ms-flex:auto;flex:auto;background-color:#efeff4}.weui-search-bar__form:after{content:\"\";position:absolute;left:0;top:0;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:10px;border:1px solid #e6e6ea;box-sizing:border-box;background:#fff}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;height:100%;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__box .weui-search-bar__input{padding:4px 0;width:100%;height:1.42857143em;border:0;font-size:14px;line-height:1.42857143em;box-sizing:content-box;background:transparent}.weui-search-bar__box .weui-search-bar__input:focus{outline:none}.weui-search-bar__box .weui-icon-search{position:absolute;left:10px;top:0;line-height:28px}.weui-search-bar__box .weui-icon-clear{position:absolute;top:0;right:0;padding:0 10px;line-height:28px}.weui-search-bar__label{position:absolute;top:1px;right:1px;bottom:1px;left:1px;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff}.weui-search-bar__label span{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__label .weui-icon-search{margin-right:5px}.weui-search-bar__cancel-btn{display:none;margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}.weui-search-bar__input:not(:valid)~.weui-icon-clear{display:none}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}.weui-picker{position:fixed;width:100%;left:0;bottom:0;z-index:5000;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateY(100%);transform:translateY(100%);transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-picker__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}.weui-picker__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__action{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#1aad19}.weui-picker__action:first-child{text-align:left;color:#888}.weui-picker__action:last-child{text-align:right}.weui-picker__bd{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;height:238px;overflow:hidden}.weui-picker__group{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:100%}.weui-picker__mask{top:0;height:100%;margin:0 auto;background:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat;-webkit-transform:translateZ(0);transform:translateZ(0)}.weui-picker__indicator,.weui-picker__mask{position:absolute;left:0;width:100%;z-index:3}.weui-picker__indicator{height:34px;top:102px}.weui-picker__indicator:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__indicator:after,.weui-picker__indicator:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-picker__indicator:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__content{position:absolute;top:0;left:0;width:100%}.weui-picker__item{padding:0;height:34px;line-height:34px;text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.weui-picker__item_disabled{color:#999}@-webkit-keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.weui-animate-slide-up{-webkit-animation:a ease .3s forwards;animation:a ease .3s forwards}@-webkit-keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.weui-animate-slide-down{-webkit-animation:b ease .3s forwards;animation:b ease .3s forwards}@-webkit-keyframes c{0%{opacity:0}to{opacity:1}}@keyframes c{0%{opacity:0}to{opacity:1}}.weui-animate-fade-in{-webkit-animation:c ease .3s forwards;animation:c ease .3s forwards}@-webkit-keyframes d{0%{opacity:1}to{opacity:0}}@keyframes d{0%{opacity:1}to{opacity:0}}.weui-animate-fade-out{-webkit-animation:d ease .3s forwards;animation:d ease .3s forwards}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree a{color:#586c94}.weui-agree__text{color:#999}.weui-agree__checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:0;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:13px;height:13px;position:relative;vertical-align:0;top:2px}.weui-agree__checkbox:checked:before{font-family:weui;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-align:center;speak:none;display:inline-block;vertical-align:middle;text-decoration:inherit;content:\"\\EA08\";color:#09bb07;font-size:13px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-48%) scale(.73);transform:translate(-50%,-48%) scale(.73)}.weui-agree__checkbox:disabled{background-color:#e1e1e1}.weui-agree__checkbox:disabled:before{color:#adadad}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:e 1s steps(12) infinite;animation:e 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading,.weui-loading.weui-loading_transparent{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\")}@-webkit-keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.weui-slider{padding:15px 18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.weui-slider__inner{position:relative;height:2px;background-color:#e9e9e9}.weui-slider__track{height:2px;background-color:#1aad19;width:0}.weui-slider__handler{position:absolute;left:0;top:50%;width:28px;height:28px;margin-left:-14px;margin-top:-14px;border-radius:50%;background-color:#fff;box-shadow:0 0 4px rgba(0,0,0,.2)}.weui-slider-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-slider-box .weui-slider{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-slider-box__value{margin-left:.5em;min-width:24px;color:#888;text-align:center;font-size:14px}.weui-toptips[data-v-1a7bec2b]{display:block}.wv-header[data-v-f6f5c16a]{display:flex;align-items:center;box-sizing:border-box;width:100%;height:50px;line-height:1;padding:0 10px;margin:0;color:#fff;position:relative;white-space:nowrap;z-index:500}.wv-header .left[data-v-f6f5c16a]{display:block;overflow:hidden;float:left;font-size:35px;line-height:35px;font-weight:100}.wv-header .wv-header-title[data-v-f6f5c16a]{font-size:23px;font-weight:0;text-align:center;flex:1}.wv-header.is-fixed[data-v-f6f5c16a]{position:fixed;left:0;top:0}.wv-picker-slot-divider[data-v-c9e4e9e0]{transform:translateY(106px)}.wv-popup-body[data-v-87a08ef6]{display:block;background-color:#fff;position:fixed;width:100%;left:0;bottom:0;z-index:5000;transform:translateY(100%);transition:transform .3s}.wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}.weui-icon_toast[data-v-bafb1f8a]{font-size:40px}.weui-toast_text[data-v-bafb1f8a]{width:auto;min-width:0;min-height:0;padding:.5em 0}.weui-toast_text .weui-toast__content[data-v-bafb1f8a]{margin:0}.wv-circle[data-v-12ab642a]{position:relative;display:flex;justify-content:center;align-items:center}.wv-circle svg[data-v-12ab642a]{display:block;position:absolute;z-index:1}.wv-circle .wv-circle-content[data-v-12ab642a]{z-index:1000}.actionsheet__mask_show[data-v-4095c8bf]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);background-color:rgba(0,0,0,.6)}.weui-check__label-disabled[data-v-3d63ae3a]{background-color:rgba(0,0,0,.1)}.weui-check__label-disabled[data-v-323b9579]{background-color:rgba(0,0,0,.1)}.wv-navbar__item[data-v-8b4cda66]{position:relative;display:block;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:transparent}.wv-navbar__item.wv-navbar__item_on[data-v-8b4cda66]{border-bottom:3px solid red}.weui-search-bar__label[data-v-e876aa2a]{transform-origin:0 0 0;opacity:1;transform:scale(1)}.weui-search-bar__cancel-btn[data-v-e876aa2a]{display:block}.searchbar-result[data-v-e876aa2a]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);margin-top:0;font-size:14px}.wv-navbar[data-v-40f0a5eb]{display:flex;width:100%;z-index:5000;background-color:#fff}@font-face{font-family:iconfont;src:url(data:application/vnd.ms-fontobject;base64,);src:url(data:application/vnd.ms-fontobject;base64,#iefix) format(\"embedded-opentype\"),url(data:application/font-woff;base64,) format(\"woff\"),url(data:application/x-font-ttf;base64,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) format(\"truetype\"),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+DQpDcmVhdGVkIGJ5IEZvbnRGb3JnZSAyMDEyMDczMSBhdCBGcmkgSnVsIDIxIDAzOjA4OjQ5IDIwMTcNCiBCeSBhZG1pbg0KPC9tZXRhZGF0YT4NCjxkZWZzPg0KPGZvbnQgaWQ9Imljb25mb250IiBob3Jpei1hZHYteD0iMTAyNCIgPg0KICA8Zm9udC1mYWNlIA0KICAgIGZvbnQtZmFtaWx5PSJpY29uZm9udCINCiAgICBmb250LXdlaWdodD0iNTAwIg0KICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIg0KICAgIHVuaXRzLXBlci1lbT0iMTAyNCINCiAgICBwYW5vc2UtMT0iMiAwIDYgMyAwIDAgMCAwIDAgMCINCiAgICBhc2NlbnQ9Ijg5NiINCiAgICBkZXNjZW50PSItMTI4Ig0KICAgIHgtaGVpZ2h0PSI3OTIiDQogICAgYmJveD0iMCAtMTI4IDEwMjQgODk2Ig0KICAgIHVuZGVybGluZS10aGlja25lc3M9IjAiDQogICAgdW5kZXJsaW5lLXBvc2l0aW9uPSIwIg0KICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDA3OC1FODA2Ig0KICAvPg0KPG1pc3NpbmctZ2x5cGggDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm51bGwiIGhvcml6LWFkdi14PSIwIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgDQpkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41DQp0LTI5LjUgMC41aC0zMmwtNDUgMTI4aC00MzlsLTQ0IC0xMjhoLTI5aC0zNHEtMjAgMCAtNDUgMXEtMjUgMCAtNDEgOS41dC0yNS41IDIzdC0xMy41IDI5LjV0LTQgMzB2MTY3aDkxMXpNMTYzIDI0N3EtMTIgMCAtMjEgLTguNXQtOSAtMjEuNXQ5IC0yMS41dDIxIC04LjVxMTMgMCAyMiA4LjV0OSAyMS41dC05IDIxLjV0LTIyIDguNXpNMzE2IDEyM3EtOCAtMjYgLTE0IC00OHEtNSAtMTkgLTEwLjUgLTM3dC03LjUgLTI1dC0zIC0xNXQxIC0xNC41DQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+DQogICAgPGdseXBoIGdseXBoLW5hbWU9InNwaW5uZXI5IiB1bmljb2RlPSImI3hlN2U5OyIgDQpkPSJNNTEyIDg5NnEtMTAzIDAgLTE5Ni41IC0zOS41dC0xNjIgLTEwNi41dC0xMDkuNSAtMTU5LjV0LTQ0IC0xOTQuNXEzIDExOSA1OSAyMTkuNXQxNTEgMTU4LjV0MjA2IDU4cTE3MiAwIDI5NCAtMTMxdDEyMiAtMzE3cTAgLTQwIDI4IC02OHQ2OCAtMjh0NjggMjh0MjggNjhxMCAxMzkgLTY4LjUgMjU3dC0xODYuNSAxODYuNXQtMjU3IDY4LjV6TTUxMiAtMTI4cTEwMyAwIDE5Ni41IDM5LjV0MTYyIDEwNi41dDEwOS41IDE1OS41dDQ0IDE5NC41DQpxLTMgLTExOSAtNTkgLTIxOS41dC0xNTEgLTE1OC41dC0yMDYgLTU4cS0xMTMgMCAtMjA5IDYwdC0xNTEuNSAxNjN0LTU1LjUgMjI1cTAgNDAgLTI4IDY4dC02OCAyOHQtNjggLTI4dC0yOCAtNjhxMCAtMTM5IDY4LjUgLTI1N3QxODYuNSAtMTg2LjV0MjU3IC02OC41eiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lci0xIiB1bmljb2RlPSImI3hlNzIyOyIgDQpkPSJNMTAyNCAzODRxLTIgODcgLTQ3LjUgMTkxLjV0LTEwOC41IDE2NC41cS0yOSAyOSAtNzcuNSA2MHQtODcuNSA0NnEtMzYgMTQgLTg5IDI0dC05MSAxMGgtMTFxLTg0IC0yIC0xODUuNSAtNDZ0LTE1OS41IC0xMDVxLTI4IC0yOSAtNTggLTc1LjV0LTQ0IC04NC41cS0xNCAtMzUgLTIzLjUgLTg2dC05LjUgLTg4di0xMXExIC0zOSAxMi41IC05Mi41dDI3LjUgLTg5LjV0NDcgLTgwLjV0NTkgLTcxLjV0NzMuNSAtNTUuNXQ4MS41IC00Mi41DQpxMzQgLTE0IDgzIC0yM3Q4NSAtOWgxMXE5MiAyIDE3NiAzOXEzNSAxNSA3Ny41IDQ1dDY4LjUgNThxMjYgMjcgNTQgNzAuNXQ0MiA3OC41cTE5IDUwIDI2IDEwNGg0cTI2IDAgNDUgMTguNXQxOSA0NS41djV2MHYwek05MjIgMjE0cS0zNSAtODAgLTk5IC0xNDFxLTYzIC02MSAtMTQ0IC05MnEtMzEgLTEyIC03NyAtMjAuNXQtODAgLTguNWgtMTBxLTczIDIgLTE2MSA0MC41dC0xMzkgOTEuNXEtMjQgMjUgLTUwIDY2dC0zOCA3Mw0KcS0xMiAzMCAtMjAgNzR0LTggNzdxMCAzNiAxMC41IDg1dDI0LjUgODNxMzMgNzQgOTMgMTMxcTU4IDU2IDEzMyA4NHEyOSAxMSA3MS41IDE5dDczLjUgOHEzNSAwIDgyLjUgLTEwdDc5LjUgLTI0cTcxIC0zMiAxMjUgLTg5cTU0IC01NiA4MiAtMTI4cTI3IC03MiAyNSAtMTQ5djB2LTVxMCAtMjQgMTYuNSAtNDIuNXQ0MC41IC0yMS41cS05IC01MiAtMzEgLTEwMXYweiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lcjEiIHVuaWNvZGU9IiYjeGU4MDY7IiANCmQ9Ik0zMDEgOTkuNXEwIC0zMC41IC0yMS41IC01MnQtNTIuNSAtMjEuNXEtMjkgMCAtNTEgMjJ0LTIyIDUxcTAgMzEgMjEuNSA1Mi41dDUyIDIxLjV0NTIgLTIxLjV0MjEuNSAtNTJ6TTU4NSAtMTguNXEwIC0zMC41IC0yMS41IC01MS41dC01MS41IC0yMXQtNTEuNSAyMXQtMjEuNSA1MS41dDIxLjUgNTJ0NTEuNSAyMS41dDUxLjUgLTIxLjV0MjEuNSAtNTJ6TTE4MyAzODRxMCAtMzAgLTIxLjUgLTUxLjV0LTUyIC0yMS41dC01MS41IDIxLjUNCnQtMjEgNTEuNXQyMSA1MS41dDUxLjUgMjEuNXQ1MiAtMjEuNXQyMS41IC01MS41ek04NzAgOTlxMCAtMjkgLTIyIC01MXQtNTEgLTIycS0zMSAwIC01Mi41IDIxLjV0LTIxLjUgNTJ0MjEuNSA1MnQ1MiAyMS41dDUyIC0yMS41dDIxLjUgLTUyLjV6TTMxOSA2NjguNXEwIC0zNy41IC0yNyAtNjQuNXQtNjQuNSAtMjd0LTY0LjUgMjd0LTI3IDY0LjV0MjcgNjQuNXQ2NC41IDI3dDY0LjUgLTI3dDI3IC02NC41ek05ODcgMzg0DQpxMCAtMzAgLTIxIC01MS41dC01MS41IC0yMS41dC01MiAyMS41dC0yMS41IDUxLjV0MjEuNSA1MS41dDUyIDIxLjV0NTEuNSAtMjEuNXQyMSAtNTEuNXpNNjIyIDc4Ni41cTAgLTQ1LjUgLTMyIC03Ny41dC03OCAtMzJ0LTc4IDMydC0zMiA3Ny41dDMyIDc3LjV0NzggMzJ0NzggLTMydDMyIC03Ny41ek05MjUgNjY5cTAgLTU0IC0zOCAtOTF0LTkwIC0zN3EtNTQgMCAtOTEgMzd0LTM3IDkxcTAgNTIgMzcgOTB0OTEgMzhxNTIgMCA5MCAtMzgNCnQzOCAtOTB6IiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzcGlubmVyMiIgdW5pY29kZT0iJiN4ZTYzZjsiIA0KZD0iTTUxMiA1OTN2MHEtMjUgMCAtNDIuNSAxNy41dC0xNy41IDQyLjV2MTc5cTAgMjQgMTcuNSA0MS41dDQyLjUgMTcuNXQ0Mi41IC0xNy41dDE3LjUgLTQxLjV2LTE3OXEwIC0yNSAtMTcuNSAtNDIuNXQtNDIuNSAtMTcuNXpNNTEyIC0xMDF2MHEtMTUgMCAtMjYgMTF0LTExIDI2djE3OXEwIDE2IDExIDI3dDI2IDExdDI2IC0xMXQxMSAtMjd2LTE3OXEwIC0xNSAtMTEgLTI2dC0yNiAtMTF6TTM3OCA1NjF2MHEtMTQgMCAtMjggOHQtMjEgMjANCmwtODkgMTU1cS03IDEyIC03IDI2cTAgMjMgMTYuNSAzOS41dDM5LjUgMTYuNXExMyAwIDI3IC03LjV0MjEgLTE4LjVsODkgLTE1NXE4IC0xMyA4IC0yOHEwIC0yNCAtMTYuNSAtNDB0LTM5LjUgLTE2ek03MzYgLTM3djBxLTIwIDAgLTI5IDE3bC05MCAxNTVxLTQgNyAtNCAxNnEwIDE0IDkuNSAyNHQyMy41IDEwcTIwIDAgMjkgLTE3bDkwIC0xNTVxNCAtOCA0IC0xN3EwIC0xNCAtOS41IC0yMy41dC0yMy41IC05LjV2MHpNMjc5IDQ2Ng0KcS0xNCAwIC0yNiA3bC0xNTUgOTBxLTExIDYgLTE4LjUgMTl0LTcuNSAyNnEwIDIxIDE1LjUgMzYuNXQzNi41IDE1LjVxMTQgMCAyNiAtN2wxNTYgLTkwcTEwIC02IDE4IC0xOXQ4IC0yNnEwIC0yMSAtMTUuNSAtMzYuNXQtMzcuNSAtMTUuNXYwek05MDAgMTMwdjBxLTggMCAtMTUgNGwtMTU1IDkwcS0xNSA4IC0xNSAyNnEwIDEyIDguNSAyMXQyMS41IDlxOCAwIDE1IC00bDE1NSAtOTBxMTUgLTkgMTUgLTI2cTAgLTEyIC05IC0yMXQtMjEgLTl2MHoNCk0yNDMgMzM2aC0xNzlxLTIwIDAgLTM0IDE0dC0xNCAzNHQxNCAzNHQzNCAxNGgxNzlxMjAgMCAzNC41IC0xNHQxNC41IC0zNHQtMTQuNSAtMzR0LTM0LjUgLTE0ek05NjAgMzU0aC0xNzlxLTEzIDAgLTIxLjUgOXQtOC41IDIxdDguNSAyMXQyMS41IDloMTc5cTEyIDAgMjEgLTl0OSAtMjF0LTkgLTIxdC0yMSAtOXpNMTI0IDExNXYwcS0xOCAwIC0zMSAxMy41dC0xMyAzMS41cTAgMTEgNi41IDIyLjV0MTUuNSAxNi41bDE1NSA4OXExMCA2IDIyIDYNCnExOSAwIDMyIC0xM3QxMyAtMzFxMCAtMTEgLTYuNSAtMjIuNXQtMTUuNSAtMTYuNWwtMTU1IC05MHEtMTEgLTYgLTIzIC02ek03NDUgNDg4cS0xMyAwIC0yMS41IDl0LTguNSAyMXEwIDE3IDE1IDI2bDE1NSA5MHE2IDMgMTQgM3ExMiAwIDIxIC04LjV0OSAtMjEuNXEwIC0xNiAtMTQgLTI1bC0xNTUgLTkwcS03IC00IC0xNSAtNHYwek0yODggLTQ1cS0xNyAwIC0yOSAxMnQtMTIgMjlxMCAxMSA2IDIxbDg5IDE1NXE1IDggMTUuNSAxMy41DQp0MTkuNSA1LjVxMTcgMCAyOSAtMTJ0MTIgLTI5cTAgLTEwIC01IC0xOWwtODkgLTE1NXEtNSAtOSAtMTUuNSAtMTV0LTIwLjUgLTZ2MHpNNjQ2IDU4N3EtMTIgMCAtMjEgOC41dC05IDIxLjVxMCA4IDQgMTVsOTAgMTU1cTkgMTUgMjYgMTVxMTIgMCAyMSAtOXQ5IC0yMXEwIC04IC00IC0xNWwtOTAgLTE1NXEtOCAtMTUgLTI2IC0xNXYweiIgLz4NCiAgPC9mb250Pg0KPC9kZWZzPjwvc3ZnPg0K#iconfont) format(\"svg\")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-spinner9:before{content:\"\\E7E9\"}.icon-spinner-1:before{content:\"\\E722\"}.icon-spinner1:before{content:\"\\E806\"}.icon-spinner2:before{content:\"\\E63F\"}.wv-spinner[data-v-067ccc1f]{display:inline-block;overflow:hidden;-webkit-animation:circle 1.2s infinite linear;-o-animation:circle 1.2s infinite linear;animation:circle 1.2s infinite linear}@-webkit-keyframes circle{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", ""]);

// exports


/***/ }),
/* 106 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./shop.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./shop.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: #ececec; }\n\n.weui-tabbar {\n  font-weight: bold; }\n\n.weui-cell__bd p {\n  color: #777;\n  font-weight: 200; }\n", ""]);

// exports


/***/ }),
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = [{
  path: '/',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(11).then((function () {
      return resolve(__webpack_require__(141));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'home',
  meta: {
    auth: false,
    title: '首页'
  }
}, {
  path: '/cart',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(1).then((function () {
      return resolve(__webpack_require__(142));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'cart',
  meta: {
    auth: true
  }
}, {
  path: '/category',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(16).then((function () {
      return resolve(__webpack_require__(143));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'category'
}, {
  path: '/order-list',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(10).then((function () {
      return resolve(__webpack_require__(144));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order-list',
  meta: {
    auth: true
  }
}, {
  path: '/order/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(9).then((function () {
      return resolve(__webpack_require__(145));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order',
  meta: {
    auth: true
  }
}, {
  path: '/favourite',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(14).then((function () {
      return resolve(__webpack_require__(146));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'favourite',
  meta: {
    auth: true
  }
}, {
  path: '/checkout',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(15).then((function () {
      return resolve(__webpack_require__(147));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'checkout',
  meta: {
    hideMainmenu: true,
    auth: true
  }
}, {
  path: '/user',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(4).then((function () {
      return resolve(__webpack_require__(148));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'user',
  meta: {
    auth: true
  }
}, {
  path: '/profile',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(6).then((function () {
      return resolve(__webpack_require__(149));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'profile',
  meta: {
    auth: true
  }
}, {
  path: '/avatar',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(3).then((function () {
      return resolve(__webpack_require__(150));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'avatar',
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/address',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(17).then((function () {
      return resolve(__webpack_require__(151));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'address',
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/address/add',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(60));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/address/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0/* duplicate */).then((function () {
      return resolve(__webpack_require__(60));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/about-us',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(18).then((function () {
      return resolve(__webpack_require__(152));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(12).then((function () {
      return resolve(__webpack_require__(153));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(13).then((function () {
      return resolve(__webpack_require__(154));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/login',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(2).then((function () {
      return resolve(__webpack_require__(155));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/register',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(5).then((function () {
      return resolve(__webpack_require__(156));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'register',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/product/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(7).then((function () {
      return resolve(__webpack_require__(157));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'product',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/password',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(8).then((function () {
      return resolve(__webpack_require__(158));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'password',
  meta: {
    auth: true
  }
}];

exports.default = routes;

/***/ }),
/* 129 */
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
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./iconfont.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./iconfont.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(54) + "); /* IE9*/\r\n  src: url(" + __webpack_require__(54) + "#iefix) format('embedded-opentype'), \r\n  url(" + __webpack_require__(132) + ") format('woff'), \r\n  url(" + __webpack_require__(133) + ") format('truetype'), \r\n  url(" + __webpack_require__(134) + "#iconfont) format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-edit:before { content: \"\\E61E\"; }\r\n\r\n.icon-favorfill:before { content: \"\\E600\"; }\r\n\r\n.icon-favor:before { content: \"\\E601\"; }\r\n\r\n.icon-location:before { content: \"\\E602\"; }\r\n\r\n.icon-phone:before { content: \"\\E603\"; }\r\n\r\n.icon-roundcheckfill:before { content: \"\\E604\"; }\r\n\r\n.icon-time:before { content: \"\\E605\"; }\r\n\r\n.icon-likefill:before { content: \"\\E606\"; }\r\n\r\n.icon-like:before { content: \"\\E607\"; }\r\n\r\n.icon-deliver:before { content: \"\\E608\"; }\r\n\r\n.icon-pay:before { content: \"\\E609\"; }\r\n\r\n.icon-shop:before { content: \"\\E60A\"; }\r\n\r\n.icon-list:before { content: \"\\E60B\"; }\r\n\r\n.icon-more:before { content: \"\\E60C\"; }\r\n\r\n.icon-settings:before { content: \"\\E60D\"; }\r\n\r\n.icon-question:before { content: \"\\E60E\"; }\r\n\r\n.icon-refresh:before { content: \"\\E60F\"; }\r\n\r\n.icon-moreandroid:before { content: \"\\E610\"; }\r\n\r\n.icon-cart:before { content: \"\\E611\"; }\r\n\r\n.icon-delete:before { content: \"\\E612\"; }\r\n\r\n.icon-home:before { content: \"\\E613\"; }\r\n\r\n.icon-message:before { content: \"\\E614\"; }\r\n\r\n.icon-lock:before { content: \"\\E615\"; }\r\n\r\n.icon-goods:before { content: \"\\E616\"; }\r\n\r\n.icon-info:before { content: \"\\E617\"; }\r\n\r\n.icon-recharge:before { content: \"\\E618\"; }\r\n\r\n.icon-share:before { content: \"\\E619\"; }\r\n\r\n.icon-mobile:before { content: \"\\E61A\"; }\r\n\r\n.icon-bianji:before { content: \"\\E61F\"; }\r\n\r\n.icon-notice:before { content: \"\\E61B\"; }\r\n\r\n.icon-people:before { content: \"\\E61C\"; }\r\n\r\n.icon-tag:before { content: \"\\E620\"; }\r\n\r\n.icon-goodslight:before { content: \"\\E61D\"; }\r\n\r\n", ""]);

// exports


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.woff?96b1eec488601086f1453e90c56a95e4";

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.ttf?e8008eea52a98622553dfec3d6877cb9";

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.svg?e440a5b37519d11f027543b1a1473238";

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(136)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(138),
  /* template */
  __webpack_require__(139),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-62002d45",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\mainmenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mainmenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62002d45", Component.options)
  } else {
    hotAPI.reload("data-v-62002d45", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(137);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("6e573bf7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62002d45\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62002d45\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n#tabbar .weui_tabbar[data-v-62002d45] {\n  position: fixed;\n  bottom: 0;\n}\n#tabbar .weui_tabbar .weui_tabbar_item .icon[data-v-62002d45] {\n    font-size: 20px;\n    color: #666;\n}\n#tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon[data-v-62002d45] {\n    color: #09bb07;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/mainmenu.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,UAAU;CAAE;AACZ;IACE,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,eAAe;CAAE","file":"mainmenu.vue","sourcesContent":["#tabbar .weui_tabbar {\n  position: fixed;\n  bottom: 0; }\n  #tabbar .weui_tabbar .weui_tabbar_item .icon {\n    font-size: 20px;\n    color: #666; }\n  #tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon {\n    color: #09bb07; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(30);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    menuVisible: function menuVisible(state) {
      return state.isMainMenuVisible;
    }
  })),

  methods: {}
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.menuVisible) ? _c('wv-tabbar', {
    attrs: {
      "fixed": ""
    }
  }, [_c('wv-tabbar-item', {
    attrs: {
      "to": "/"
    }
  }, [_c('i', {
    staticClass: "icon iconfont",
    slot: "icon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v("首页")])]), _vm._v(" "), _c('wv-tabbar-item', {
    attrs: {
      "to": "/category"
    }
  }, [_c('i', {
    staticClass: "icon iconfont",
    slot: "icon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v("分类")])]), _vm._v(" "), _c('wv-tabbar-item', {
    attrs: {
      "to": "/cart"
    }
  }, [_c('i', {
    staticClass: "icon iconfont",
    slot: "icon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v("购物车")])]), _vm._v(" "), _c('wv-tabbar-item', {
    attrs: {
      "to": "/user"
    }
  }, [_c('i', {
    staticClass: "icon iconfont",
    slot: "icon"
  }, [_vm._v("")]), _vm._v(" "), _c('span', [_vm._v("我的")])])], 1) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62002d45", module.exports)
  }
}

/***/ })
],[63]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC5lb3QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3R5bGUuY3NzPzk5MzUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2Nzcz9kYzg2Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuY3NzP2E2M2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC5jc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC53b2ZmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQudHRmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuc3ZnIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/MmYwNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/ZWRlNyIsIndlYnBhY2s6Ly8vbWFpbm1lbnUudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZT82ZDYyIl0sIm5hbWVzIjpbIkNvbmZpZyIsImFwaVJvb3QiLCJ0aW1lb3V0Iiwic21zUmVzZW5kQ291bnRkb3duIiwiand0VG9rZW5OYW1lIiwidXNlIiwic3RhdGUiLCJpc0xvYWRpbmciLCJkaXJlY3Rpb24iLCJpc01haW5NZW51VmlzaWJsZSIsImlzTG9naW4iLCJTdG9yZSIsIm11dGF0aW9ucyIsIlVQREFURV9MT0FESU5HIiwidmFsdWUiLCJVUERBVEVfRElSRUNUSU9OIiwiVVBEQVRFX01BSU5NRU5VX1ZJU0lCTEUiLCJVUERBVEVfSVNfTE9HSU4iLCJyb3V0ZXIiLCJtb2RlIiwiYmFzZSIsInJvdXRlcyIsImJlZm9yZUVhY2giLCJ0byIsImZyb20iLCJuZXh0IiwiY29tbWl0IiwibWV0YSIsImhpZGVNYWlubWVudSIsIm1hdGNoZWQiLCJzb21lIiwicmVjb3JkIiwiYXV0aCIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXRoIiwicXVlcnkiLCJyZWRpcmVjdCIsImZ1bGxQYXRoIiwiYWZ0ZXJFYWNoIiwiZG9jdW1lbnQiLCJ0aXRsZSIsImRlZmF1bHRzIiwiYmFzZVVSTCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJjb25maWciLCJoaWRlTG9hZGluZyIsImFwcCIsInNob3dMb2FkaW5nIiwidG9rZW4iLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImVycm9yIiwicmVqZWN0IiwicmVzcG9uc2UiLCJuZXdUb2tlbiIsImF1dGhvcml6YXRpb24iLCJzZXRJdGVtIiwicmVwbGFjZSIsInN0YXR1cyIsInJlbW92ZUl0ZW0iLCJwdXNoIiwiY29kZSIsImVsIiwic3RvcmUiLCJjb21wb25lbnRzIiwicmVxdWlyZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiZHVyYXRpb24iLCJUb2FzdCIsImljb24iLCJpbmZvIiwidHlwZSIsImNvbmZpcm0iLCJjYWxsYmFjayIsIkRpYWxvZyIsInNraW4iLCJpc2lPcyIsIm1zZyIsIkluZGljYXRvciIsIm9wZW4iLCJjbG9zZSIsImNvbXBvbmVudCIsInJlc29sdmUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7Ozs7Ozs7QUNMekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNWQSw2QkFBNkI7QUFDN0IsdUNBQXVDOzs7Ozs7O0FDRHZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0Esa0ZBQWtGO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQjs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7Ozs7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LGNBQWMsRUFBRSxrREFBa0Qsc0JBQXNCLGtCQUFrQixFQUFFLG1FQUFtRSxxQkFBcUIsRUFBRSxxQkFBcUI7O0FBRWgxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaUJBOzs7OztBQUVBOzttQkFLQTs7QUFKQTs7V0FLQTtBQVBBLEU7Ozs7OztBQ3pCQSxnQkFBZ0IsbUJBQW1CLGFBQWEsMEJBQTBCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjEnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcblxuZnVuY3Rpb24gUHJvbWlzZUNhcGFiaWxpdHkoQykge1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbiAoJCRyZXNvbHZlLCAkJHJlamVjdCkge1xuICAgIGlmIChyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCA9IGFGdW5jdGlvbihyZWplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvZm9udHMvaWNvbmZvbnQuZW90P2JlYTQxNjE1NmQ4NTQ5YjYxMTZjZGEyMzgzYjc5MjVmXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LmVvdD90PTE0ODg5OTQwNTgzNDZcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xyXG5cclxuY29uc3QgQ29uZmlnID0ge1xyXG4gIGFwaVJvb3Q6ICcvYXBpL3Nob3AnLFxyXG4gIHRpbWVvdXQ6IDEwMDAwLFxyXG4gIHNtc1Jlc2VuZENvdW50ZG93bjogNjAsXHJcbiAgand0VG9rZW5OYW1lOiAnd2lsbHNob3Bfand0X3Rva2VuJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWdcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbmZpZy5qcyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcclxuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCdcclxuXHJcblZ1ZS51c2UoVnVleClcclxuXHJcbmNvbnN0IHN0YXRlID0ge1xyXG4gIGlzTG9hZGluZzogZmFsc2UsXHJcbiAgZGlyZWN0aW9uOiAnZm9yd2FyZCcsXHJcbiAgaXNNYWluTWVudVZpc2libGU6IHRydWUsXHJcbiAgaXNMb2dpbjogZmFsc2VcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZXguU3RvcmUoe1xyXG4gIHN0YXRlLFxyXG4gIG11dGF0aW9uczoge1xyXG4gICAgVVBEQVRFX0xPQURJTkcgKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5pc0xvYWRpbmcgPSB2YWx1ZVxyXG4gICAgfSxcclxuICAgIFVQREFURV9ESVJFQ1RJT04gKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5kaXJlY3Rpb24gPSB2YWx1ZVxyXG4gICAgfSxcclxuICAgIFVQREFURV9NQUlOTUVOVV9WSVNJQkxFIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuaXNNYWluTWVudVZpc2libGUgPSB2YWx1ZVxyXG4gICAgfSxcclxuICAgIFVQREFURV9JU19MT0dJTiAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTG9naW4gPSB2YWx1ZVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3N0b3JlL2luZGV4LmpzIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXHJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IFdlVnVlIGZyb20gJ3dlLXZ1ZSdcclxuaW1wb3J0ICd3ZS12dWUvbGliL3N0eWxlLmNzcydcclxuaW1wb3J0ICcuLi8uLi9zYXNzL3Nob3Auc2NzcydcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5pbXBvcnQgVnVlQXhpb3MgZnJvbSAndnVlLWF4aW9zJ1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZS9pbmRleCdcclxuaW1wb3J0IGFwcENvbmZpZyBmcm9tICcuL2NvbmZpZycgLy8g6YWN572uXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMuanMnXHJcbmltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuaW1wb3J0ICcuLi8uLi9pY29uZm9udC9pY29uZm9udC5jc3MnXHJcblxyXG5WdWUudXNlKFZ1ZVJvdXRlcilcclxuVnVlLnVzZShXZVZ1ZSlcclxuVnVlLnVzZShWdWVBeGlvcywgYXhpb3MpXHJcblxyXG5jb25zdCByb3V0ZXIgPSBuZXcgVnVlUm91dGVyKHtcclxuICBtb2RlOiAnaGlzdG9yeScsXHJcbiAgYmFzZTogJy9zaG9wLycsXHJcbiAgcm91dGVzXHJcbn0pXHJcblxyXG5yb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9MT0FESU5HJywgdHJ1ZSlcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9NQUlOTUVOVV9WSVNJQkxFJywgIXRvLm1ldGEuaGlkZU1haW5tZW51KVxyXG5cclxuICBpZiAodG8ubWF0Y2hlZC5zb21lKHJlY29yZCA9PiByZWNvcmQubWV0YS5hdXRoKSAmJiAhd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpKSB7XHJcbiAgICAvLyDpnIDopoHnmbvlvZXlkI7orr/pl67nmoTpobXpnaLvvIxyZWRpcmVjdCDlj4LmlbDnlKjkuo7nmbvlvZXlrozmiJDlkI7ot7PovaxcclxuICAgIG5leHQoe1xyXG4gICAgICBwYXRoOiAnL2xvZ2luJyxcclxuICAgICAgcXVlcnk6IHtyZWRpcmVjdDogdG8uZnVsbFBhdGh9XHJcbiAgICB9KVxyXG4gIH1cclxuICBuZXh0KClcclxufSlcclxuXHJcbnJvdXRlci5hZnRlckVhY2goKHRvLCBmcm9tKSA9PiB7XHJcbiAgLy8g5Yqo5oCB6K6+572u6aG16Z2i5qCH6aKYXHJcbiAgZG9jdW1lbnQudGl0bGUgPSB0by5tZXRhLnRpdGxlIHx8ICd3aWxsc2hvcCdcclxuXHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKVxyXG59KVxyXG5cclxuYXhpb3MuZGVmYXVsdHMuYmFzZVVSTCA9IGFwcENvbmZpZy5hcGlSb290XHJcbmF4aW9zLmRlZmF1bHRzLnRpbWVvdXQgPSBhcHBDb25maWcudGltZW91dFxyXG5cclxuLy8gYXhpb3Mg6K+35rGC5Y+R6YCB5YmN5aSE55CGXHJcbmF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZSgoY29uZmlnKSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIHRydWUpXHJcblxyXG4gIGlmIChjb25maWcuaGlkZUxvYWRpbmcgIT09IHRydWUpIHtcclxuICAgIC8vIOaYvuekuiBsb2FkaW5nIOaPkOekulxyXG4gICAgYXBwLnNob3dMb2FkaW5nKClcclxuICB9XHJcblxyXG4gIGNvbnN0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpXHJcbiAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdiZWFyZXIgJyArIHRva2VuXHJcblxyXG4gIHJldHVybiBjb25maWdcclxufSwgKGVycm9yKSA9PiB7XHJcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKVxyXG59KVxyXG5cclxuLy8gYXhpb3Mg5b6X5Yiw5ZON5bqU5ZCO5aSE55CGXHJcbmF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoKHJlc3BvbnNlKSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKVxyXG4gIGFwcC5oaWRlTG9hZGluZygpXHJcblxyXG4gIGNvbnN0IG5ld1Rva2VuID0gcmVzcG9uc2UuaGVhZGVycy5hdXRob3JpemF0aW9uXHJcbiAgaWYgKG5ld1Rva2VuKSB7XHJcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSwgbmV3VG9rZW4ucmVwbGFjZSgnYmVhcmVyICcsICcnKSlcclxuICB9XHJcblxyXG4gIHJldHVybiByZXNwb25zZVxyXG59LCAoZXJyb3IpID0+IHtcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9MT0FESU5HJywgZmFsc2UpXHJcbiAgYXBwLmhpZGVMb2FkaW5nKClcclxuXHJcbiAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBuZXdUb2tlbiA9IGVycm9yLnJlc3BvbnNlLmhlYWRlcnMuYXV0aG9yaXphdGlvblxyXG4gICAgaWYgKG5ld1Rva2VuKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lLCBuZXdUb2tlbi5yZXBsYWNlKCdiZWFyZXIgJywgJycpKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSlcclxuXHJcbiAgICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKVxyXG4gICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAvLyDml6DmnYPpmZDml7bnu5/kuIDmj5DnpLpcclxuICAgICAgYXBwLmVycm9yKCfml6Dmk43kvZzmnYPpmZAnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g6LaF5pe25ZCO6L+b6KGM5o+Q56S6XHJcbiAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTkFCT1JURUQnKSB7XHJcbiAgICBhcHAuZXJyb3IoJ+e9kee7nOe5geW/me+8jOivt+mHjeivlScpXHJcbiAgfVxyXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxufSlcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBWdWUoe1xyXG4gIGVsOiAnI2FwcCcsXHJcbiAgcm91dGVyLFxyXG4gIHN0b3JlLFxyXG5cclxuICBjb21wb25lbnRzOiB7XHJcbiAgICAnbWFpbm1lbnUnOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlJylcclxuICB9LFxyXG5cclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICBpc0xvYWRpbmc6IHN0YXRlID0+IHN0YXRlLmlzTG9hZGluZyxcclxuICAgICAgaXNNYWluTWVudVZpc2libGU6IHN0YXRlID0+IHN0YXRlLmlzTWFpbk1lbnVWaXNpYmxlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIC8qKlxyXG4gICAgICog5pON5L2c5oiQ5Yqf5o+Q56S6XHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHN1Y2Nlc3MgKG1lc3NhZ2UsIGR1cmF0aW9uID0gMTAwMCkge1xyXG4gICAgICBXZVZ1ZS5Ub2FzdCh7XHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBkdXJhdGlvblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaTjeS9nOWksei0peaPkOekulxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBlcnJvciAobWVzc2FnZSwgZHVyYXRpb24pIHtcclxuICAgICAgV2VWdWUuVG9hc3Qoe1xyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIGljb246ICd3YXJuJ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4gOiIrOaPkOekulxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBpbmZvIChtZXNzYWdlLCBkdXJhdGlvbiA9IDIwMDApIHtcclxuICAgICAgV2VWdWUuVG9hc3Qoe1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIGR1cmF0aW9uXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56Gu6K6k5a+56K+d5qGGXHJcbiAgICAgKiBAcGFyYW0gdGl0bGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgY29uZmlybSAodGl0bGUsIG1lc3NhZ2UsIGNhbGxiYWNrKSB7XHJcbiAgICAgIFdlVnVlLkRpYWxvZyh7XHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBza2luOiB0aGlzLmlzaU9zID8gJ2lvcycgOiAnYW5kcm9pZCdcclxuICAgICAgfSwgY2FsbGJhY2spXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6IGxvYWRpbmcg5o+Q56S6XHJcbiAgICAgKiBAcGFyYW0gbXNnXHJcbiAgICAgKi9cclxuICAgIHNob3dMb2FkaW5nIChtc2cgPSAnTG9hZGluZycpIHtcclxuICAgICAgV2VWdWUuSW5kaWNhdG9yLm9wZW4obXNnKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXjyBsb2FkaW5nIOaPkOekulxyXG4gICAgICovXHJcbiAgICBoaWRlTG9hZGluZyAoKSB7XHJcbiAgICAgIFdlVnVlLkluZGljYXRvci5jbG9zZSgpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb25lLCB2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZSB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5faCA9PSAxKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYztcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVhY3Rpb247XG4gIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSB7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmIChyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSkgcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBCUkVBSyA9IHt9O1xudmFyIFJFVFVSTiA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKSB7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKTtcbiAgdmFyIGYgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYgKGlzQXJyYXlJdGVyKGl0ZXJGbikpIGZvciAobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYgKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXQ7XG52YXIgT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIGlzTm9kZSA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChoZWFkKSBub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChpc05vZGUpIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbiAgfSBlbHNlIGlmIChPYnNlcnZlcikge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc2FmZSAmJiB0YXJnZXRba2V5XSkgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmIChERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSBkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyohXFxyXFxuICogV2VVSSB2MS4xLjIgKGh0dHBzOi8vZ2l0aHViLmNvbS93ZXVpL3dldWkpXFxyXFxuICogQ29weXJpZ2h0IDIwMTcgVGVuY2VudCwgSW5jLlxcclxcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxcclxcbiAqL2h0bWx7LW1zLXRleHQtc2l6ZS1hZGp1c3Q6MTAwJTstd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6MTAwJX1ib2R5e2xpbmUtaGVpZ2h0OjEuNjtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLWZvbnQsSGVsdmV0aWNhIE5ldWUsc2Fucy1zZXJpZn0qe21hcmdpbjowO3BhZGRpbmc6MH1hIGltZ3tib3JkZXI6MH1he3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfUBmb250LWZhY2V7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtZmFtaWx5OndldWk7c3JjOnVybChcXFwiZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LEFBRUFBQUFMQUlBQUF3QXdSMU5WUXJEK3MrMEFBQUU0QUFBQVFrOVRMekpBS0V4K0FBQUJmQUFBQUZaamJXRnc2NWNGSFFBQUFod0FBQUpRWjJ4NVp2Q1JSL0VBQUFTVUFBQUt0R2hsWVdRTVBST3RBQUFBNEFBQUFEWm9hR1ZoQ0N3RCtnQUFBTHdBQUFBa2FHMTBlRUpvLy84QUFBSFVBQUFBU0d4dlkyRVlxaFc0QUFBRWJBQUFBQ1p0WVhod0FTRUFWUUFBQVJnQUFBQWdibUZ0WmVOY0h0Z0FBQTlJQUFBQjVuQnZjM1Q2YkxoTEFBQVJNQUFBQU9ZQUFRQUFBK2dBQUFCYUErai8vLy8vQStrQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUJJQUFRQUFBQUVBQUNiWmJ4dGZEenoxQUFzRDZBQUFBQURVbTJkdkFBQUFBTlNiWjIvLy93QUFBK2tENmdBQUFBZ0FBZ0FBQUFBQUFBQUJBQUFBRWdCSkFBVUFBQUFBQUFJQUFBQUtBQW9BQUFEL0FBQUFBQUFBQUFFQUFBQUtBQjRBTEFBQlJFWk1WQUFJQUFRQUFBQUFBQUFBQVFBQUFBRnNhV2RoQUFnQUFBQUJBQUFBQVFBRUFBUUFBQUFCQUFnQUFRQUdBQUFBQVFBQUFBQUFBUU93QVpBQUJRQUlBbm9DdkFBQUFJd0NlZ0s4QUFBQjRBQXhBUUlBQUFJQUJRTUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBVUdaRlpBQkE2Z0hxRVFQb0FBQUFXZ1BxQUFBQUFBQUJBQUFBQUFBQUFBQUFBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStqLy93UG9BQUFENkFBQUFBQUFCUUFBQUFNQUFBQXNBQUFBQkFBQUFYUUFBUUFBQUFBQWJnQURBQUVBQUFBc0FBTUFDZ0FBQVhRQUJBQkNBQUFBQkFBRUFBRUFBT29SLy84QUFPb0IvLzhBQUFBQkFBUUFBQUFCQUFJQUF3QUVBQVVBQmdBSEFBZ0FDUUFLQUFzQURBQU5BQTRBRHdBUUFCRUFBQUVHQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQUFBQUFOd0FBQUFBQUFBQUVRQUE2Z0VBQU9vQkFBQUFBUUFBNmdJQUFPb0NBQUFBQWdBQTZnTUFBT29EQUFBQUF3QUE2Z1FBQU9vRUFBQUFCQUFBNmdVQUFPb0ZBQUFBQlFBQTZnWUFBT29HQUFBQUJnQUE2Z2NBQU9vSEFBQUFCd0FBNmdnQUFPb0lBQUFBQ0FBQTZna0FBT29KQUFBQUNRQUE2Z29BQU9vS0FBQUFDZ0FBNmdzQUFPb0xBQUFBQ3dBQTZnd0FBT29NQUFBQURBQUE2ZzBBQU9vTkFBQUFEUUFBNmc0QUFPb09BQUFBRGdBQTZnOEFBT29QQUFBQUR3QUE2aEFBQU9vUUFBQUFFQUFBNmhFQUFPb1JBQUFBRVFBQUFBQUFSZ0NNQU5JQkpBRjRBY1FDTWdKZ0FxZ0MvQU5JQTZZRC9nUk9CS0FFOUFWYUFBQUFBZ0FBQUFBRHJ3T3RBQlFBS1FBQUFTSUhCZ2NHRkJjV0Z4WXlOelkzTmpRbkppY21BeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQWZWNFoyUTdQRHc3Wkdmd1ptUTdQRHc3WkdaNGJsNWJOamMzTmx0ZTIxNWJOamMzTmx0ZUE2MDhPMlJuOEdkak96dzhPMk5uOEdka096ejhyemMxVzE3YlhsdzFOemMxWEY3YlhsczFOd0FBQUFBQ0FBQUFBQU96QTdNQUZ3QXRBQUFCSWdjR0J3WVZGQmNXRnhZek1qYzJOelkxTkNjbUp5WVRCd1lpTHdFbU5qc0JFVFEyT3dFeUZoVVJNeklXQWU1MloyUTdQVDA3WkdkMmZHcG1PejQrTzJacElYWU9LQTUyRGcwWFhRc0hKZ2NMWFJjTkE3TStPMlpxZkhablpEczlQVHRrWjNaOWFXWTdQdjN3bWhJU21oSWFBUmNJQ3dzSS91a2FBQU1BQUFBQUErVUQ1UUFYQUNNQUxBQUFBU0lIQmdjR0ZSUVhGaGNXTXpJM05qYzJOVFFuSmljbUF4UXJBU0kxQXpRN0FUSUhKeUltTkRZeUZoUUdBZTZFY205QlJFUkJiM0tFaVhaeFFrUkVRbkYxYVFJeEF3Z0NRZ01CSXhJWkdTUVpHUVBrUkVKeGRvbUVjbTlCUkVSQmIzS0VpblZ4UWtUOUhRSUNBV0lDQWpFWkl4a1pJeGtBQUFBQUFnQUFBQUFEc1FQa0FCa0FMZ0FBQVFZSEJnYzJCUkVVRnhZWEZoYzJOelkzTmpVUkpCY21KeVlUQVFZdkFTWS9BVFl5SHdFV05qY2xOaklmQVJZQjlWVlZRayt2L3RGSFBteGViR3hkYlQxSS90R3ZUMEpWby83VkJBU0tBd01TQVFVQmNRRUZBZ0VTQWdVQkVRUUQ0eE1ZRWhrM1lQNnNqblZsU0Q4Y0hEOUlaWFdPQVZSZ054a1NHUDYyL3RrREE0OEVCQmtDQVZZQ0FRSGxBUUlRQkFBQUFBQURBQUFBQUFPeEErUUFHd0FxQURNQUFBRUdCd1lIQmdjR054RVVGeFlYRmhjMk56WTNOalVSSkJjbUp5WUhNeklXRlFNVUJpc0JJaWNETkRZVElpWTBOaklXRkFZQjlVRkJPRHNzTzM4Z1J6NXNYbXhzWFcwOVNQN1lxRkJCVlc4MEJBWU1Bd0ltQlFFTEJoNFBGaFllRlJVRDVBOFNEaElPRWlrSy9xMlBkV1JKUGgwZFBrbGtkWThCVTE0MUdSSVkvQVlFL3NZQ0F3VUJPZ1FHL2tBVkh4VVZIeFVBQUFBQ0FBQUFBQVBrQStRQUZ3QXRBQUFCSWdjR0J3WVZGQmNXRnhZek1qYzJOelkxTkNjbUp5WVRBUVlpTHdFbVB3RTJNaDhCRmpJM0FUWXlId0VXQWU2RWNtOUJRME5DYm5PRGlYVnhRa1JFUW5GMWtmNmdBUVVCb3dNREZnRUZBWVVDQlFFQlF3SUZBUlVFQStORVFuRjFpWU56YmtKRFEwRnZjb1NKZFhGQ1JQNmovcVVCQWFnRUJSNENBV1lCQVFFTkFnSVZCQUFBQUFRQUFBQUFBNjhEclFBVUFDa0FQd0JEQUFBQklnY0dCd1lVRnhZWEZqSTNOamMyTkNjbUp5WURJaWNtSnlZME56WTNOaklYRmhjV0ZBY0dCd1lUQlE0Qkx3RW1CZzhCQmhZZkFSWXlOd0UrQVNZaUZ6QWZBUUgxZUdka096dzhPMlJuOEdaa096dzhPMlJtZUc1ZVd6WTNOelpiWHR0ZVd6WTNOelpiWG1uKzlnWVNCbUFHRHdVREJRRUdmUVVRQmdFbEJRRUxFQlVCQVFPdFBEdGtaL0JuWXpzOFBEdGpaL0JuWkRzOC9LODNOVnRlMjE1Y05UYzNOVnhlMjE1Yk5UY0NKdDBGQVFWSkJRSUdCQWNSQm9BR0JRRWhCUThMQkFFQkFBQUJBQUFBQUFPN0F6b0FGd0FBRXk0QlB3RStBUjhCRmpZM0FUWVdGeWNXRkFjQkJpSW5QUW9HQndVSEdnekxEQ0VMQWgwTEh3c05DZ3I5dVFvZUNnR3pDeUVPQ3cwSENaTUpBUW9CdmdrQ0NnMExIUXY5c1FzS0FBQUFBQUlBQUFBQUErVUQ1Z0FYQUN3QUFBRWlCd1lIQmhVVUZ4WVhGak15TnpZM05qVTBKeVluSmhNSEJpOEJKaWNtTlJNME5qc0JNaFlWRXhjZUFRSHZoSEp2UVVORFFtNXpnNGwxY1VKRVJFSnhkVmNRQXdUNkF3SUVFQU1DS3dJRERzVUNBUVBsUkVKeGRZbURjMjVDUTBOQmIzS0VpWFZ4UWtUOVZod0VBbmNDQWdNR0FYb0NBd01DL3EyRkFnUUFBQVFBQUFBQUE2OERyUUFEQUJnQUxRQXpBQUFCTUI4QkF5SUhCZ2NHRkJjV0Z4WXlOelkzTmpRbkppY21BeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQXlNVk16VWpBdVVCQWZKNFoyUTdQRHc3Wkdmd1ptUTdQRHc3WkdaNGJsNWJOamMzTmx0ZTIxNWJOamMzTmx0ZW15VDkyUUtEQVFFQkxEdzdaR2Z3WjJNN1BEdzdZMmZ3WjJRN1BQeXZOelZiWHR0ZVhEVTNOelZjWHR0ZVd6VTNBakg5SkFBQUFBTUFBQUFBQStRRDVBQVhBQ2NBTUFBQUFTSUhCZ2NHRlJRWEZoY1dNekkzTmpjMk5UUW5KaWNtQXpNeUZoVURGQVlyQVNJbU5RTTBOaE1pSmpRMk1oWVVCZ0h1aEhKdlFVTkRRbTV6ZzRsMWNVSkVSRUp4ZFo0MkJBWU1Bd0luQXdNTUJoOFBGaFllRmhZRDQwUkNjWFdKZzNOdVFrTkRRVzl5aElsMWNVSkUvdllHQmY3QUFnTURBZ0ZBQlFiK05oWWZGaFlmRmdBQUJBQUFBQUFEd0FQQUFBZ0FFZ0FvQUQwQUFBRXlOalFtSWdZVUZoY2pGVE1SSXhVek5TTURJZ2NHQndZVkZCWVhGak15TnpZM05qVTBKeTRCQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0FmUVlJU0V3SVNGUmp6azV5VG9yaEc1clBUOTlhbStEZG1obFBENCtQTXlGYlY1Yk5UYzNOVnRlMmw1Yk5UYzNOVnRlQXFBaUx5SWlMeUk1SGY3RUhCd0NzVDg5YTI2RWQ4dzhQajQ4WldoMmcyOXFmZnlqTnpWYlh0cGVXelUzTnpWYlh0cGVXelUzQUFBREFBQUFBQU9vQTZnQUN3QWdBRFVBQUFFSEp3Y1hCeGMzRnpjbk53TWlCd1lIQmhRWEZoY1dNamMyTnpZMEp5WW5KZ01pSnlZbkpqUTNOamMyTWhjV0Z4WVVCd1lIQmdLT21wb2NtcG9jbXBvY21wcTJkbVppT2pzN09tSm03R1ppT2pzN09tSm1kbXRkV1RRMk5qUlpYZFpkV1RRMk5qUlpYUUtxbXBvY21wb2NtcG9jbXBvQkdUczZZbWJzWm1JNk96czZZbWJzWm1JNk8vekNOalJaWGRaZFdUUTJOalJaWGRaZFdUUTJBQU1BQUFBQUEra0Q2Z0FhQUM4QU1BQUFBUVlIQmlNaUp5WW5KalEzTmpjMk1oY1dGeFlWRkFjR0J3RUhBVEkzTmpjMk5DY21KeVlpQndZSEJoUVhGaGNXTXdLT05VQkNSMjFkV2pVM056VmFYZHBkV3pVMkdCY3JBU001L2VCWFMwZ3JLeXNyU0V1dVNra3FMQ3dxU1VwWEFTTXJGeGcyTlZ0ZDJsMWFOVGMzTlZwZGJVZENRRFgrM2prQkdTc3JTRXV1U2trcUxDd3FTVXF1UzBnckt3QUMvLzhBQUFQb0ErZ0FGQUF3QUFBQklnY0dCd1lRRnhZWEZpQTNOamMyRUNjbUp5WVRGZzRCSWk4QkJ3WXVBVFEvQVNjbVBnRVdId0UzTmg0QkJnOEJBZlNJZEhGRFJFUkRjWFFCRUhSeFEwUkVRM0YwU1FvQkZCc0tvcWdLR3hNS3FLSUtBUlFiQ3FLb0Noc1VBUXFvQStoRVEzRjAvdkIwY1VORVJFTnhkQUVRZEhGRFJQMWpDaHNUQ3FpaUNnRVVHd3FpcUFvYkZBRUtxS0lLQVJRYkNxSUFBQUlBQUFBQUErUUQ1QUFYQURRQUFBRWlCd1lIQmhVVUZ4WVhGak15TnpZM05qVTBKeVluSmhNVUJpTUZGeFlVRHdFR0x3RXVBVDhCTmg4QkZoUVBBUVV5RmgwQkFlNkVjbTlCUTBOQ2JuT0RpWFZ4UWtSRVFuRjFmd1FDL3BHREFRRVZBd1RzQWdFQzdBUUVGQUlCaEFGd0FnTUQ0MFJDY1hXSmczTnVRa05EUVc5eWhJbDFjVUpFL2ZZQ0F3dVZBZ1FDRkFRRTBBSUZBdEVFQkJRQ0JRR1ZDd01ESndBQUFBVUFBQUFBQTlRRDB3QWpBQ2NBTndCSEFFZ0FBQUVSRkFZaklTSW1OUkVqSWlZOUFUUTJNeUUxTkRZeklUSVdIUUVoTWhZZEFSUUdJeUVSSVJFSElnWVZFUlFXT3dFeU5qVVJOQ1lqSVNJR0ZSRVVGanNCTWpZMUVUUW1Ld0VEZXlZYi9YWWJKa01KRFEwSkFRWVpFZ0V2RXhrQkJna05EUW45Q1FKYzBRa05EUWt0Q1EwTkNmN3NDUTBOQ1MwSkRRMEpMUU1pL1RRYkppWWJBc3dNQ2l3SkRTNFNHUmtTTGcwSkxBb00vVXdDdEdzTkNmNU5DUTBOQ1FHekNRME5DZjVOQ1EwTkNRR3pDUTBBQUFBQUVBREdBQUVBQUFBQUFBRUFCQUFBQUFFQUFBQUFBQUlBQndBRUFBRUFBQUFBQUFNQUJBQUxBQUVBQUFBQUFBUUFCQUFQQUFFQUFBQUFBQVVBQ3dBVEFBRUFBQUFBQUFZQUJBQWVBQUVBQUFBQUFBb0FLd0FpQUFFQUFBQUFBQXNBRXdCTkFBTUFBUVFKQUFFQUNBQmdBQU1BQVFRSkFBSUFEZ0JvQUFNQUFRUUpBQU1BQ0FCMkFBTUFBUVFKQUFRQUNBQitBQU1BQVFRSkFBVUFGZ0NHQUFNQUFRUUpBQVlBQ0FDY0FBTUFBUVFKQUFvQVZnQ2tBQU1BQVFRSkFBc0FKZ0Q2ZDJWMWFWSmxaM1ZzWVhKM1pYVnBkMlYxYVZabGNuTnBiMjRnTVM0d2QyVjFhVWRsYm1WeVlYUmxaQ0JpZVNCemRtY3lkSFJtSUdaeWIyMGdSbTl1ZEdWc2JHOGdjSEp2YW1WamRDNW9kSFJ3T2k4dlptOXVkR1ZzYkc4dVkyOXRBSGNBWlFCMUFHa0FVZ0JsQUdjQWRRQnNBR0VBY2dCM0FHVUFkUUJwQUhjQVpRQjFBR2tBVmdCbEFISUFjd0JwQUc4QWJnQWdBREVBTGdBd0FIY0FaUUIxQUdrQVJ3QmxBRzRBWlFCeUFHRUFkQUJsQUdRQUlBQmlBSGtBSUFCekFIWUFad0F5QUhRQWRBQm1BQ0FBWmdCeUFHOEFiUUFnQUVZQWJ3QnVBSFFBWlFCc0FHd0Fid0FnQUhBQWNnQnZBR29BWlFCakFIUUFMZ0JvQUhRQWRBQndBRG9BTHdBdkFHWUFid0J1QUhRQVpRQnNBR3dBYndBdUFHTUFid0J0QUFBQUFnQUFBQUFBQUFBS0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFTQVFJQkF3RUVBUVVCQmdFSEFRZ0JDUUVLQVFzQkRBRU5BUTRCRHdFUUFSRUJFZ0VUQUFaamFYSmpiR1VJWkc5M2JteHZZV1FFYVc1bWJ3eHpZV1psWDNOMVkyTmxjM01KYzJGbVpWOTNZWEp1QjNOMVkyTmxjM01PYzNWalkyVnpjeTFqYVhKamJHVVJjM1ZqWTJWemN5MXVieTFqYVhKamJHVUhkMkZwZEdsdVp3NTNZV2wwYVc1bkxXTnBjbU5zWlFSM1lYSnVDMmx1Wm04dFkybHlZMnhsQm1OaGJtTmxiQVp6WldGeVkyZ0ZZMnhsWVhJRVltRmphd1prWld4bGRHVUFBQUFBXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpfVtjbGFzcyo9XFxcIiB3ZXVpLWljb24tXFxcIl0sW2NsYXNzXj13ZXVpLWljb24tXXtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Zm9udDpub3JtYWwgbm9ybWFsIG5vcm1hbCAxNHB4LzEgd2V1aTtmb250LXNpemU6aW5oZXJpdDt0ZXh0LXJlbmRlcmluZzphdXRvOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWR9W2NsYXNzKj1cXFwiIHdldWktaWNvbi1cXFwiXTpiZWZvcmUsW2NsYXNzXj13ZXVpLWljb24tXTpiZWZvcmV7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLWxlZnQ6LjJlbTttYXJnaW4tcmlnaHQ6LjJlbX0ud2V1aS1pY29uLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDFcXFwifS53ZXVpLWljb24tZG93bmxvYWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAyXFxcIn0ud2V1aS1pY29uLWluZm86YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAzXFxcIn0ud2V1aS1pY29uLXNhZmUtc3VjY2VzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDRcXFwifS53ZXVpLWljb24tc2FmZS13YXJuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwNVxcXCJ9LndldWktaWNvbi1zdWNjZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwNlxcXCJ9LndldWktaWNvbi1zdWNjZXNzLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDdcXFwifS53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA4XFxcIn0ud2V1aS1pY29uLXdhaXRpbmc6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA5XFxcIn0ud2V1aS1pY29uLXdhaXRpbmctY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwQVxcXCJ9LndldWktaWNvbi13YXJuOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwQlxcXCJ9LndldWktaWNvbi1pbmZvLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMENcXFwifS53ZXVpLWljb24tY2FuY2VsOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwRFxcXCJ9LndldWktaWNvbi1zZWFyY2g6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBFXFxcIn0ud2V1aS1pY29uLWNsZWFyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwRlxcXCJ9LndldWktaWNvbi1iYWNrOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUExMFxcXCJ9LndldWktaWNvbi1kZWxldGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTExXFxcIn1bY2xhc3MqPVxcXCIgd2V1aS1pY29uX1xcXCJdOmJlZm9yZSxbY2xhc3NePXdldWktaWNvbl9dOmJlZm9yZXttYXJnaW46MH0ud2V1aS1pY29uLXN1Y2Nlc3N7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzA5YmIwN30ud2V1aS1pY29uLXdhaXRpbmd7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzEwYWVmZn0ud2V1aS1pY29uLXdhcm57Zm9udC1zaXplOjIzcHg7Y29sb3I6I2Y0MzUzMH0ud2V1aS1pY29uLWluZm97Zm9udC1zaXplOjIzcHg7Y29sb3I6IzEwYWVmZn0ud2V1aS1pY29uLXN1Y2Nlc3MtY2lyY2xlLC53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGV7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzA5YmIwN30ud2V1aS1pY29uLXdhaXRpbmctY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMxMGFlZmZ9LndldWktaWNvbi1jaXJjbGV7Zm9udC1zaXplOjIzcHg7Y29sb3I6I2M5YzljOX0ud2V1aS1pY29uLWRvd25sb2FkLC53ZXVpLWljb24taW5mby1jaXJjbGV7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzA5YmIwN30ud2V1aS1pY29uLXNhZmUtc3VjY2Vzc3tjb2xvcjojMDliYjA3fS53ZXVpLWljb24tc2FmZS13YXJue2NvbG9yOiNmZmJlMDB9LndldWktaWNvbi1jYW5jZWx7Y29sb3I6I2Y0MzUzMDtmb250LXNpemU6MjJweH0ud2V1aS1pY29uLWNsZWFyLC53ZXVpLWljb24tc2VhcmNoe2NvbG9yOiNiMmIyYjI7Zm9udC1zaXplOjE0cHh9LndldWktaWNvbi1kZWxldGUud2V1aS1pY29uX2dhbGxlcnktZGVsZXRle2NvbG9yOiNmZmY7Zm9udC1zaXplOjIycHh9LndldWktaWNvbl9tc2d7Zm9udC1zaXplOjkzcHh9LndldWktaWNvbl9tc2cud2V1aS1pY29uLXdhcm57Y29sb3I6I2Y3NjI2MH0ud2V1aS1pY29uX21zZy1wcmltYXJ5e2ZvbnQtc2l6ZTo5M3B4fS53ZXVpLWljb25fbXNnLXByaW1hcnkud2V1aS1pY29uLXdhcm57Y29sb3I6I2ZmYmUwMH0ud2V1aS1idG57cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvO3BhZGRpbmctbGVmdDoxNHB4O3BhZGRpbmctcmlnaHQ6MTRweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Zm9udC1zaXplOjE4cHg7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDoyLjU1NTU1NTU2O2JvcmRlci1yYWRpdXM6NXB4Oy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO292ZXJmbG93OmhpZGRlbn0ud2V1aS1idG46YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7d2lkdGg6MjAwJTtoZWlnaHQ6MjAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4yKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNSk7dHJhbnNmb3JtOnNjYWxlKC41KTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjEwcHh9LndldWktYnRuX2lubGluZXtkaXNwbGF5OmlubGluZS1ibG9ja30ud2V1aS1idG5fZGVmYXVsdHtjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6I2Y4ZjhmOH0ud2V1aS1idG5fZGVmYXVsdDpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVke2NvbG9yOiMwMDB9LndldWktYnRuX2RlZmF1bHQ6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6YWN0aXZle2NvbG9yOnJnYmEoMCwwLDAsLjYpO2JhY2tncm91bmQtY29sb3I6I2RlZGVkZX0ud2V1aS1idG5fcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiMxYWFkMTl9LndldWktYnRuX3ByaW1hcnk6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZHtjb2xvcjojZmZmfS53ZXVpLWJ0bl9wcmltYXJ5Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNik7YmFja2dyb3VuZC1jb2xvcjojMTc5YjE2fS53ZXVpLWJ0bl93YXJue2JhY2tncm91bmQtY29sb3I6I2U2NDM0MH0ud2V1aS1idG5fd2Fybjpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVke2NvbG9yOiNmZmZ9LndldWktYnRuX3dhcm46bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6YWN0aXZle2NvbG9yOmhzbGEoMCwwJSwxMDAlLC42KTtiYWNrZ3JvdW5kLWNvbG9yOiNjZTNjMzl9LndldWktYnRuX2Rpc2FibGVke2NvbG9yOmhzbGEoMCwwJSwxMDAlLC42KX0ud2V1aS1idG5fZGlzYWJsZWQud2V1aS1idG5fZGVmYXVsdHtjb2xvcjpyZ2JhKDAsMCwwLC4zKTtiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y3Zjd9LndldWktYnRuX2Rpc2FibGVkLndldWktYnRuX3ByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojOWVkOTlkfS53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl93YXJue2JhY2tncm91bmQtY29sb3I6I2VjOGI4OX0ud2V1aS1idG5fbG9hZGluZyAud2V1aS1sb2FkaW5ne21hcmdpbjotLjJlbSAuMzRlbSAwIDB9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeSwud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl93YXJue2NvbG9yOmhzbGEoMCwwJSwxMDAlLC42KX0ud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl9wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzE3OWIxNn0ud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl93YXJue2JhY2tncm91bmQtY29sb3I6I2NlM2MzOX0ud2V1aS1idG5fcGxhaW4tcHJpbWFyeXtjb2xvcjojMWFhZDE5O2JvcmRlcjoxcHggc29saWQgIzFhYWQxOX0ud2V1aS1idG5fcGxhaW4tcHJpbWFyeTpub3QoLndldWktYnRuX3BsYWluLWRpc2FibGVkKTphY3RpdmV7Y29sb3I6cmdiYSgyNiwxNzMsMjUsLjYpO2JvcmRlci1jb2xvcjpyZ2JhKDI2LDE3MywyNSwuNil9LndldWktYnRuX3BsYWluLXByaW1hcnk6YWZ0ZXJ7Ym9yZGVyLXdpZHRoOjB9LndldWktYnRuX3BsYWluLWRlZmF1bHR7Y29sb3I6IzM1MzUzNTtib3JkZXI6MXB4IHNvbGlkICMzNTM1MzV9LndldWktYnRuX3BsYWluLWRlZmF1bHQ6bm90KC53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZCk6YWN0aXZle2NvbG9yOnJnYmEoNTMsNTMsNTMsLjYpO2JvcmRlci1jb2xvcjpyZ2JhKDUzLDUzLDUzLC42KX0ud2V1aS1idG5fcGxhaW4tZGVmYXVsdDphZnRlcntib3JkZXItd2lkdGg6MH0ud2V1aS1idG5fcGxhaW4tZGlzYWJsZWR7Y29sb3I6cmdiYSgwLDAsMCwuMik7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjIpfWJ1dHRvbi53ZXVpLWJ0bixpbnB1dC53ZXVpLWJ0bnt3aWR0aDoxMDAlO2JvcmRlci13aWR0aDowO291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZX1idXR0b24ud2V1aS1idG46Zm9jdXMsaW5wdXQud2V1aS1idG46Zm9jdXN7b3V0bGluZTowfWJ1dHRvbi53ZXVpLWJ0bl9pbmxpbmUsYnV0dG9uLndldWktYnRuX21pbmksaW5wdXQud2V1aS1idG5faW5saW5lLGlucHV0LndldWktYnRuX21pbml7d2lkdGg6YXV0b31idXR0b24ud2V1aS1idG5fcGxhaW4tZGVmYXVsdCxidXR0b24ud2V1aS1idG5fcGxhaW4tcHJpbWFyeSxpbnB1dC53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0LGlucHV0LndldWktYnRuX3BsYWluLXByaW1hcnl7Ym9yZGVyLXdpZHRoOjFweDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS53ZXVpLWJ0bl9taW5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MCAxLjMyZW07bGluZS1oZWlnaHQ6Mi4zO2ZvbnQtc2l6ZToxM3B4fS53ZXVpLWJ0bisud2V1aS1idG57bWFyZ2luLXRvcDoxNXB4fS53ZXVpLWJ0bi53ZXVpLWJ0bl9pbmxpbmUrLndldWktYnRuLndldWktYnRuX2lubGluZXttYXJnaW4tdG9wOmF1dG87bWFyZ2luLWxlZnQ6MTVweH0ud2V1aS1idG4tYXJlYXttYXJnaW46MS4xNzY0NzA1OWVtIDE1cHggLjNlbX0ud2V1aS1idG4tYXJlYV9pbmxpbmV7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1idG4tYXJlYV9pbmxpbmUgLndldWktYnRue21hcmdpbi10b3A6YXV0bzttYXJnaW4tcmlnaHQ6MTVweDt3aWR0aDoxMDAlOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1idG4tYXJlYV9pbmxpbmUgLndldWktYnRuOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0OjB9LndldWktY2VsbHN7bWFyZ2luLXRvcDoxLjE3NjQ3MDU5ZW07YmFja2dyb3VuZC1jb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjEuNDcwNTg4MjQ7Zm9udC1zaXplOjE3cHg7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLWNlbGxzOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1jZWxsczphZnRlciwud2V1aS1jZWxsczpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1O3otaW5kZXg6Mn0ud2V1aS1jZWxsczphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1jZWxsc19fdGl0bGV7bWFyZ2luLXRvcDouNzdlbTttYXJnaW4tYm90dG9tOi4zZW07cGFkZGluZy1sZWZ0OjE1cHg7cGFkZGluZy1yaWdodDoxNXB4O2NvbG9yOiM5OTk7Zm9udC1zaXplOjE0cHh9LndldWktY2VsbHNfX3RpdGxlKy53ZXVpLWNlbGxze21hcmdpbi10b3A6MH0ud2V1aS1jZWxsc19fdGlwc3ttYXJnaW4tdG9wOi4zZW07Y29sb3I6Izk5OTtwYWRkaW5nLWxlZnQ6MTVweDtwYWRkaW5nLXJpZ2h0OjE1cHg7Zm9udC1zaXplOjE0cHh9LndldWktY2VsbHtwYWRkaW5nOjEwcHggMTVweDtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLWNlbGw6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHg7ei1pbmRleDoyfS53ZXVpLWNlbGw6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1jZWxsX3ByaW1hcnl7LXdlYmtpdC1ib3gtYWxpZ246c3RhcnQ7LW1zLWZsZXgtYWxpZ246c3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydH0ud2V1aS1jZWxsX19iZHstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktY2VsbF9fZnR7dGV4dC1hbGlnbjpyaWdodDtjb2xvcjojOTk5fS53ZXVpLWNlbGxfc3dpcGVke2Rpc3BsYXk6YmxvY2s7cGFkZGluZzowfS53ZXVpLWNlbGxfc3dpcGVkPi53ZXVpLWNlbGxfX2Jke3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndldWktY2VsbF9zd2lwZWQ+LndldWktY2VsbF9fZnR7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDtib3R0b206MDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O2NvbG9yOiNmZmZ9LndldWktc3dpcGVkLWJ0bntkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MTBweCAxZW07bGluZS1oZWlnaHQ6MS40NzA1ODgyNDtjb2xvcjppbmhlcml0fS53ZXVpLXN3aXBlZC1idG5fZGVmYXVsdHtiYWNrZ3JvdW5kLWNvbG9yOiNjN2M3Y2N9LndldWktc3dpcGVkLWJ0bl93YXJue2JhY2tncm91bmQtY29sb3I6I2ZmM2IzMH0ud2V1aS1jZWxsX2FjY2Vzc3std2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTtjb2xvcjppbmhlcml0fS53ZXVpLWNlbGxfYWNjZXNzOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktY2VsbF9hY2Nlc3MgLndldWktY2VsbF9fZnR7cGFkZGluZy1yaWdodDoxM3B4O3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLWNlbGxfYWNjZXNzIC53ZXVpLWNlbGxfX2Z0OmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDo2cHg7d2lkdGg6NnB4O2JvcmRlci13aWR0aDoycHggMnB4IDAgMDtib3JkZXItY29sb3I6I2M4YzhjZDtib3JkZXItc3R5bGU6c29saWQ7LXdlYmtpdC10cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTt0cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO21hcmdpbi10b3A6LTRweDtyaWdodDoycHh9LndldWktY2VsbF9saW5re2NvbG9yOiM1ODZjOTQ7Zm9udC1zaXplOjE0cHh9LndldWktY2VsbF9saW5rOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5OmJsb2NrfS53ZXVpLWNoZWNrX19sYWJlbHstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1jaGVja19fbGFiZWw6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1jaGVja3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi05OTk5ZW19LndldWktY2VsbHNfcmFkaW8gLndldWktY2VsbF9fZnR7cGFkZGluZy1sZWZ0Oi4zNWVtfS53ZXVpLWNlbGxzX3JhZGlvIC53ZXVpLWNoZWNrOmNoZWNrZWQrLndldWktaWNvbi1jaGVja2VkOmJlZm9yZXtkaXNwbGF5OmJsb2NrO2NvbnRlbnQ6XFxcIlxcXFxFQTA4XFxcIjtjb2xvcjojMDliYjA3O2ZvbnQtc2l6ZToxNnB4fS53ZXVpLWNlbGxzX2NoZWNrYm94IC53ZXVpLWNlbGxfX2hke3BhZGRpbmctcmlnaHQ6LjM1ZW19LndldWktY2VsbHNfY2hlY2tib3ggLndldWktaWNvbi1jaGVja2VkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwMVxcXCI7Y29sb3I6I2M5YzljOTtmb250LXNpemU6MjNweDtkaXNwbGF5OmJsb2NrfS53ZXVpLWNlbGxzX2NoZWNrYm94IC53ZXVpLWNoZWNrOmNoZWNrZWQrLndldWktaWNvbi1jaGVja2VkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwNlxcXCI7Y29sb3I6IzA5YmIwN30ud2V1aS1sYWJlbHtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwNXB4O3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsfS53ZXVpLWlucHV0e3dpZHRoOjEwMCU7Ym9yZGVyOjA7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Zm9udC1zaXplOmluaGVyaXQ7Y29sb3I6aW5oZXJpdDtoZWlnaHQ6MS40NzA1ODgyNGVtO2xpbmUtaGVpZ2h0OjEuNDcwNTg4MjR9LndldWktaW5wdXQ6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sLndldWktaW5wdXQ6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b257LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7bWFyZ2luOjB9LndldWktdGV4dGFyZWF7ZGlzcGxheTpibG9jaztib3JkZXI6MDtyZXNpemU6bm9uZTt3aWR0aDoxMDAlO2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOjFlbTtsaW5lLWhlaWdodDppbmhlcml0O291dGxpbmU6MH0ud2V1aS10ZXh0YXJlYS1jb3VudGVye2NvbG9yOiNiMmIyYjI7dGV4dC1hbGlnbjpyaWdodH0ud2V1aS1jZWxsX3dhcm4gLndldWktdGV4dGFyZWEtY291bnRlcntjb2xvcjojZTY0MzQwfS53ZXVpLXRvcHRpcHN7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmZpeGVkOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dG9wOjA7bGVmdDowO3JpZ2h0OjA7cGFkZGluZzo1cHg7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6I2ZmZjt6LWluZGV4OjUwMDA7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGx9LndldWktdG9wdGlwc193YXJue2JhY2tncm91bmQtY29sb3I6I2U2NDM0MH0ud2V1aS1jZWxsc19mb3JtIC53ZXVpLWNlbGxfX2Z0e2ZvbnQtc2l6ZTowfS53ZXVpLWNlbGxzX2Zvcm0gLndldWktaWNvbi13YXJue2Rpc3BsYXk6bm9uZX0ud2V1aS1jZWxsc19mb3JtIGlucHV0LC53ZXVpLWNlbGxzX2Zvcm0gbGFiZWxbZm9yXSwud2V1aS1jZWxsc19mb3JtIHRleHRhcmVhey13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLWNlbGxfd2Fybntjb2xvcjojZTY0MzQwfS53ZXVpLWNlbGxfd2FybiAud2V1aS1pY29uLXdhcm57ZGlzcGxheTppbmxpbmUtYmxvY2t9LndldWktZm9ybS1wcmV2aWV3e3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud2V1aS1mb3JtLXByZXZpZXc6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWZvcm0tcHJldmlldzphZnRlciwud2V1aS1mb3JtLXByZXZpZXc6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNX0ud2V1aS1mb3JtLXByZXZpZXc6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZm9ybS1wcmV2aWV3X19oZHtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHggMTVweDt0ZXh0LWFsaWduOnJpZ2h0O2xpbmUtaGVpZ2h0OjIuNWVtfS53ZXVpLWZvcm0tcHJldmlld19faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweH0ud2V1aS1mb3JtLXByZXZpZXdfX2hkIC53ZXVpLWZvcm0tcHJldmlld19fdmFsdWV7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1zaXplOjEuNmVtfS53ZXVpLWZvcm0tcHJldmlld19fYmR7cGFkZGluZzoxMHB4IDE1cHg7Zm9udC1zaXplOi45ZW07dGV4dC1hbGlnbjpyaWdodDtjb2xvcjojOTk5O2xpbmUtaGVpZ2h0OjJ9LndldWktZm9ybS1wcmV2aWV3X19mdHtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo1MHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktZm9ybS1wcmV2aWV3X19mdDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWZvcm0tcHJldmlld19faXRlbXtvdmVyZmxvdzpoaWRkZW59LndldWktZm9ybS1wcmV2aWV3X19sYWJlbHtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDoxZW07bWluLXdpZHRoOjRlbTtjb2xvcjojOTk5O3RleHQtYWxpZ246anVzdGlmeTt0ZXh0LWFsaWduLWxhc3Q6anVzdGlmeX0ud2V1aS1mb3JtLXByZXZpZXdfX3ZhbHVle2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO3dvcmQtYnJlYWs6bm9ybWFsO3dvcmQtd3JhcDpicmVhay13b3JkfS53ZXVpLWZvcm0tcHJldmlld19fYnRue3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO2NvbG9yOiMzY2M1MWY7dGV4dC1hbGlnbjpjZW50ZXI7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9YnV0dG9uLndldWktZm9ybS1wcmV2aWV3X19idG57YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtvdXRsaW5lOjA7bGluZS1oZWlnaHQ6aW5oZXJpdDtmb250LXNpemU6aW5oZXJpdH0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWVlfS53ZXVpLWZvcm0tcHJldmlld19fYnRuOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktZm9ybS1wcmV2aWV3X19idG46Zmlyc3QtY2hpbGQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLWZvcm0tcHJldmlld19fYnRuX2RlZmF1bHR7Y29sb3I6Izk5OX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bl9wcmltYXJ5e2NvbG9yOiMwYmIyMGN9LndldWktY2VsbF9zZWxlY3R7cGFkZGluZzowfS53ZXVpLWNlbGxfc2VsZWN0IC53ZXVpLXNlbGVjdHtwYWRkaW5nLXJpZ2h0OjMwcHh9LndldWktY2VsbF9zZWxlY3QgLndldWktY2VsbF9fYmQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjZweDt3aWR0aDo2cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2JvcmRlci1jb2xvcjojYzhjOGNkO2JvcmRlci1zdHlsZTpzb2xpZDstd2Via2l0LXRyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3RyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7cmlnaHQ6MTVweDttYXJnaW4tdG9wOi00cHh9LndldWktc2VsZWN0ey13ZWJraXQtYXBwZWFyYW5jZTpub25lO2JvcmRlcjowO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7aGVpZ2h0OjQ1cHg7bGluZS1oZWlnaHQ6NDVweDtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7cGFkZGluZy1sZWZ0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3Jle3BhZGRpbmctcmlnaHQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktc2VsZWN0e3dpZHRoOjEwNXB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9faGR7cG9zaXRpb246cmVsYXRpdmV9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1yaWdodDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9faGQ6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDo2cHg7d2lkdGg6NnB4O2JvcmRlci13aWR0aDoycHggMnB4IDAgMDtib3JkZXItY29sb3I6I2M4YzhjZDtib3JkZXItc3R5bGU6c29saWQ7LXdlYmtpdC10cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTt0cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OjE1cHg7bWFyZ2luLXRvcDotNHB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19iZHtwYWRkaW5nLWxlZnQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9fYmQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLWNlbGxfc2VsZWN0LWFmdGVye3BhZGRpbmctbGVmdDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWFmdGVyIC53ZXVpLXNlbGVjdHtwYWRkaW5nLWxlZnQ6MH0ud2V1aS1jZWxsX3Zjb2Rle3BhZGRpbmctdG9wOjA7cGFkZGluZy1yaWdodDowO3BhZGRpbmctYm90dG9tOjB9LndldWktdmNvZGUtYnRuLC53ZXVpLXZjb2RlLWltZ3ttYXJnaW4tbGVmdDo1cHg7aGVpZ2h0OjQ1cHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS53ZXVpLXZjb2RlLWJ0bntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjAgLjZlbSAwIC43ZW07Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNlNWU1ZTU7bGluZS1oZWlnaHQ6NDVweDtmb250LXNpemU6MTdweDtjb2xvcjojM2NjNTFmfWJ1dHRvbi53ZXVpLXZjb2RlLWJ0bntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci10b3A6MDtib3JkZXItcmlnaHQ6MDtib3JkZXItYm90dG9tOjA7b3V0bGluZTowfS53ZXVpLXZjb2RlLWJ0bjphY3RpdmV7Y29sb3I6IzUyYTM0MX0ud2V1aS1nYWxsZXJ5e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjpmaXhlZDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7ei1pbmRleDoxMDAwfS53ZXVpLWdhbGxlcnlfX2ltZ3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO2JvdHRvbTo2MHB4O2xlZnQ6MDtiYWNrZ3JvdW5kOjUwJSBuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW59LndldWktZ2FsbGVyeV9fb3Bye3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6IzBkMGQwZDtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktZ2FsbGVyeV9fZGVse2Rpc3BsYXk6YmxvY2t9LndldWktY2VsbF9zd2l0Y2h7cGFkZGluZy10b3A6Ni41cHg7cGFkZGluZy1ib3R0b206Ni41cHh9LndldWktc3dpdGNoey13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZX0ud2V1aS1zd2l0Y2gsLndldWktc3dpdGNoLWNwX19ib3h7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6NTJweDtoZWlnaHQ6MzJweDtib3JkZXI6MXB4IHNvbGlkICNkZmRmZGY7b3V0bGluZTowO2JvcmRlci1yYWRpdXM6MTZweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZC1jb2xvcjojZGZkZmRmO3RyYW5zaXRpb246YmFja2dyb3VuZC1jb2xvciAuMXMsYm9yZGVyIC4xc30ud2V1aS1zd2l0Y2gtY3BfX2JveDpiZWZvcmUsLndldWktc3dpdGNoOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6NTBweDtoZWlnaHQ6MzBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZC1jb2xvcjojZmRmZGZkO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQ1LDEsLjQsMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQ1LDEsLjQsMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQ1LDEsLjQsMSksLXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQ1LDEsLjQsMSl9LndldWktc3dpdGNoLWNwX19ib3g6YWZ0ZXIsLndldWktc3dpdGNoOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDozMHB4O2hlaWdodDozMHB4O2JvcmRlci1yYWRpdXM6MTVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuNCk7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KSwtd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSl9LndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2Vkfi53ZXVpLXN3aXRjaC1jcF9fYm94LC53ZXVpLXN3aXRjaDpjaGVja2Vke2JvcmRlci1jb2xvcjojMDRiZTAyO2JhY2tncm91bmQtY29sb3I6IzA0YmUwMn0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWR+LndldWktc3dpdGNoLWNwX19ib3g6YmVmb3JlLC53ZXVpLXN3aXRjaDpjaGVja2VkOmJlZm9yZXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2Vkfi53ZXVpLXN3aXRjaC1jcF9fYm94OmFmdGVyLC53ZXVpLXN3aXRjaDpjaGVja2VkOmFmdGVyey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoMjBweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMjBweCl9LndldWktc3dpdGNoLWNwX19pbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi05OTk5cHh9LndldWktc3dpdGNoLWNwX19ib3h7ZGlzcGxheTpibG9ja30ud2V1aS11cGxvYWRlcl9faGR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwYWRkaW5nLWJvdHRvbToxMHB4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLXVwbG9hZGVyX190aXRsZXstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktdXBsb2FkZXJfX2luZm97Y29sb3I6I2IyYjJiMn0ud2V1aS11cGxvYWRlcl9fYmR7bWFyZ2luLWJvdHRvbTotNHB4O21hcmdpbi1yaWdodDotOXB4O292ZXJmbG93OmhpZGRlbn0ud2V1aS11cGxvYWRlcl9fZmlsZXN7bGlzdC1zdHlsZTpub25lfS53ZXVpLXVwbG9hZGVyX19maWxle2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OjlweDttYXJnaW4tYm90dG9tOjlweDt3aWR0aDo3OXB4O2hlaWdodDo3OXB4O2JhY2tncm91bmQ6bm8tcmVwZWF0IDUwJTtiYWNrZ3JvdW5kLXNpemU6Y292ZXJ9LndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVze3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLXVwbG9hZGVyX19maWxlX3N0YXR1czpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KX0ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXMgLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudHtkaXNwbGF5OmJsb2NrfS53ZXVpLXVwbG9hZGVyX19maWxlLWNvbnRlbnR7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2NvbG9yOiNmZmZ9LndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudCAud2V1aS1pY29uLXdhcm57ZGlzcGxheTppbmxpbmUtYmxvY2t9LndldWktdXBsb2FkZXJfX2lucHV0LWJveHtmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0aXZlO21hcmdpbi1yaWdodDo5cHg7bWFyZ2luLWJvdHRvbTo5cHg7d2lkdGg6NzdweDtoZWlnaHQ6NzdweDtib3JkZXI6MXB4IHNvbGlkICNkOWQ5ZDl9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphZnRlciwud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtiYWNrZ3JvdW5kLWNvbG9yOiNkOWQ5ZDl9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDpiZWZvcmV7d2lkdGg6MnB4O2hlaWdodDozOS41cHh9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphZnRlcnt3aWR0aDozOS41cHg7aGVpZ2h0OjJweH0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFjdGl2ZXtib3JkZXItY29sb3I6Izk5OX0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFjdGl2ZTphZnRlciwud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFjdGl2ZTpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojOTk5fS53ZXVpLXVwbG9hZGVyX19pbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjE7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3BhY2l0eTowOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLW1zZ3twYWRkaW5nLXRvcDozNnB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLW1zZ19faWNvbi1hcmVhe21hcmdpbi1ib3R0b206MzBweH0ud2V1aS1tc2dfX3RleHQtYXJlYXttYXJnaW4tYm90dG9tOjI1cHg7cGFkZGluZzowIDIwcHh9LndldWktbXNnX190ZXh0LWFyZWEgYXtjb2xvcjojNTg2Yzk0fS53ZXVpLW1zZ19fdGl0bGV7bWFyZ2luLWJvdHRvbTo1cHg7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToyMHB4fS53ZXVpLW1zZ19fZGVzY3tmb250LXNpemU6MTRweDtjb2xvcjojOTk5fS53ZXVpLW1zZ19fb3ByLWFyZWF7bWFyZ2luLWJvdHRvbToyNXB4fS53ZXVpLW1zZ19fZXh0cmEtYXJlYXttYXJnaW4tYm90dG9tOjE1cHg7Zm9udC1zaXplOjE0cHg7Y29sb3I6Izk5OX0ud2V1aS1tc2dfX2V4dHJhLWFyZWEgYXtjb2xvcjojNTg2Yzk0fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4taGVpZ2h0OjQzOHB4KXsud2V1aS1tc2dfX2V4dHJhLWFyZWF7cG9zaXRpb246Zml4ZWQ7bGVmdDowO2JvdHRvbTowO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXJ9fS53ZXVpLWFydGljbGV7cGFkZGluZzoyMHB4IDE1cHg7Zm9udC1zaXplOjE1cHh9LndldWktYXJ0aWNsZSBzZWN0aW9ue21hcmdpbi1ib3R0b206MS41ZW19LndldWktYXJ0aWNsZSBoMXtmb250LXNpemU6MThweDtmb250LXdlaWdodDo0MDA7bWFyZ2luLWJvdHRvbTouOWVtfS53ZXVpLWFydGljbGUgaDJ7Zm9udC1zaXplOjE2cHh9LndldWktYXJ0aWNsZSBoMiwud2V1aS1hcnRpY2xlIGgze2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tYm90dG9tOi4zNGVtfS53ZXVpLWFydGljbGUgaDN7Zm9udC1zaXplOjE1cHh9LndldWktYXJ0aWNsZSAqe21heC13aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDt3b3JkLXdyYXA6YnJlYWstd29yZH0ud2V1aS1hcnRpY2xlIHB7bWFyZ2luOjAgMCAuOGVtfS53ZXVpLXRhYmJhcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6NTAwO2JvdHRvbTowO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZjdmN2ZhfS53ZXVpLXRhYmJhcjpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjYzBiZmM0O2NvbG9yOiNjMGJmYzQ7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXRhYmJhcl9faXRlbXtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtwYWRkaW5nOjVweCAwIDA7Zm9udC1zaXplOjA7Y29sb3I6Izk5OTt0ZXh0LWFsaWduOmNlbnRlcjstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS10YWJiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb24gLndldWktdGFiYmFyX19pY29uLC53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2ljb24+aSwud2V1aS10YWJiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb24gLndldWktdGFiYmFyX19sYWJlbHtjb2xvcjojMDliYjA3fS53ZXVpLXRhYmJhcl9faWNvbntkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoyN3B4O2hlaWdodDoyN3B4fS53ZXVpLXRhYmJhcl9faWNvbj5pLGkud2V1aS10YWJiYXJfX2ljb257Zm9udC1zaXplOjI0cHg7Y29sb3I6Izk5OX0ud2V1aS10YWJiYXJfX2ljb24gaW1ne3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LndldWktdGFiYmFyX19sYWJlbHt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOTk5O2ZvbnQtc2l6ZToxMHB4O2xpbmUtaGVpZ2h0OjEuOH0ud2V1aS1uYXZiYXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjUwMDt0b3A6MDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYX0ud2V1aS1uYXZiYXI6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjY2NjO2NvbG9yOiNjY2M7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLW5hdmJhcisud2V1aS10YWJfX3BhbmVse3BhZGRpbmctdG9wOjUwcHg7cGFkZGluZy1ib3R0b206MH0ud2V1aS1uYXZiYXJfX2l0ZW17cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7cGFkZGluZzoxM3B4IDA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE1cHg7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktbmF2YmFyX19pdGVtOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlZGVkZWR9LndldWktbmF2YmFyX19pdGVtLndldWktYmFyX19pdGVtX29ue2JhY2tncm91bmQtY29sb3I6I2VhZWFlYX0ud2V1aS1uYXZiYXJfX2l0ZW06YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjY2NjO2NvbG9yOiNjY2M7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLW5hdmJhcl9faXRlbTpsYXN0LWNoaWxkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS10YWJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCV9LndldWktdGFiX19wYW5lbHtib3gtc2l6aW5nOmJvcmRlci1ib3g7aGVpZ2h0OjEwMCU7cGFkZGluZy1ib3R0b206NTBweDtvdmVyZmxvdzphdXRvOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNofS53ZXVpLXRhYl9fY29udGVudHtkaXNwbGF5Om5vbmV9LndldWktcHJvZ3Jlc3N7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS1wcm9ncmVzc19fYmFye2JhY2tncm91bmQtY29sb3I6I2ViZWJlYjtoZWlnaHQ6M3B4Oy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1wcm9ncmVzc19faW5uZXItYmFye3dpZHRoOjA7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjojMDliYjA3fS53ZXVpLXByb2dyZXNzX19vcHJ7ZGlzcGxheTpibG9jazttYXJnaW4tbGVmdDoxNXB4O2ZvbnQtc2l6ZTowfS53ZXVpLXBhbmVse2JhY2tncm91bmQtY29sb3I6I2ZmZjttYXJnaW4tdG9wOjEwcHg7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXBhbmVsOmZpcnN0LWNoaWxke21hcmdpbi10b3A6MH0ud2V1aS1wYW5lbDpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGFuZWw6YWZ0ZXIsLndldWktcGFuZWw6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNX0ud2V1aS1wYW5lbDphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1wYW5lbF9faGR7cGFkZGluZzoxNHB4IDE1cHggMTBweDtjb2xvcjojOTk5O2ZvbnQtc2l6ZToxM3B4O3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLXBhbmVsX19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4fS53ZXVpLW1lZGlhLWJveHtwYWRkaW5nOjE1cHg7cG9zaXRpb246cmVsYXRpdmV9LndldWktbWVkaWEtYm94OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4fS53ZXVpLW1lZGlhLWJveDpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfWEud2V1aS1tZWRpYS1ib3h7Y29sb3I6IzAwMDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1hLndldWktbWVkaWEtYm94OmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktbWVkaWEtYm94X190aXRsZXtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjE3cHg7d2lkdGg6YXV0bztvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7d29yZC13cmFwOm5vcm1hbDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ud2V1aS1tZWRpYS1ib3hfX2Rlc2N7Y29sb3I6Izk5OTtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxLjI7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTotd2Via2l0LWJveDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1saW5lLWNsYW1wOjJ9LndldWktbWVkaWEtYm94X19pbmZve21hcmdpbi10b3A6MTVweDtwYWRkaW5nLWJvdHRvbTo1cHg7Zm9udC1zaXplOjEzcHg7Y29sb3I6I2NlY2VjZTtsaW5lLWhlaWdodDoxZW07bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmhpZGRlbn0ud2V1aS1tZWRpYS1ib3hfX2luZm9fX21ldGF7ZmxvYXQ6bGVmdDtwYWRkaW5nLXJpZ2h0OjFlbX0ud2V1aS1tZWRpYS1ib3hfX2luZm9fX21ldGFfZXh0cmF7cGFkZGluZy1sZWZ0OjFlbTtib3JkZXItbGVmdDoxcHggc29saWQgI2NlY2VjZX0ud2V1aS1tZWRpYS1ib3hfdGV4dCAud2V1aS1tZWRpYS1ib3hfX3RpdGxle21hcmdpbi1ib3R0b206OHB4fS53ZXVpLW1lZGlhLWJveF9hcHBtc2d7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9faGR7bWFyZ2luLXJpZ2h0Oi44ZW07d2lkdGg6NjBweDtoZWlnaHQ6NjBweDtsaW5lLWhlaWdodDo2MHB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X190aHVtYnt3aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJTt2ZXJ0aWNhbC1hbGlnbjp0b3B9LndldWktbWVkaWEtYm94X2FwcG1zZyAud2V1aS1tZWRpYS1ib3hfX2Jkey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTttaW4td2lkdGg6MH0ud2V1aS1tZWRpYS1ib3hfc21hbGwtYXBwbXNne3BhZGRpbmc6MH0ud2V1aS1tZWRpYS1ib3hfc21hbGwtYXBwbXNnIC53ZXVpLWNlbGxze21hcmdpbi10b3A6MH0ud2V1aS1tZWRpYS1ib3hfc21hbGwtYXBwbXNnIC53ZXVpLWNlbGxzOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktZ3JpZHN7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWdyaWRzOmJlZm9yZXtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q5ZDlkOTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZ3JpZHM6YWZ0ZXIsLndldWktZ3JpZHM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtjb2xvcjojZDlkOWQ5fS53ZXVpLWdyaWRzOmFmdGVye3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2Q5ZDlkOTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktZ3JpZHtwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpsZWZ0O3BhZGRpbmc6MjBweCAxMHB4O3dpZHRoOjMzLjMzMzMzMzMzJTtib3gtc2l6aW5nOmJvcmRlci1ib3h9LndldWktZ3JpZDpiZWZvcmV7dG9wOjA7d2lkdGg6MXB4O2JvcmRlci1yaWdodDoxcHggc29saWQgI2Q5ZDlkOTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktZ3JpZDphZnRlciwud2V1aS1ncmlkOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO2JvdHRvbTowO2NvbG9yOiNkOWQ5ZDl9LndldWktZ3JpZDphZnRlcntsZWZ0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1ncmlkOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktZ3JpZF9faWNvbnt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbjowIGF1dG99LndldWktZ3JpZF9faWNvbiBpbWd7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS53ZXVpLWdyaWRfX2ljb24rLndldWktZ3JpZF9fbGFiZWx7bWFyZ2luLXRvcDo1cHh9LndldWktZ3JpZF9fbGFiZWx7ZGlzcGxheTpibG9jaztjb2xvcjojMDAwO3doaXRlLXNwYWNlOm5vd3JhcDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO292ZXJmbG93OmhpZGRlbn0ud2V1aS1mb290ZXIsLndldWktZ3JpZF9fbGFiZWx7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHh9LndldWktZm9vdGVye2NvbG9yOiM5OTl9LndldWktZm9vdGVyIGF7Y29sb3I6IzU4NmM5NH0ud2V1aS1mb290ZXJfZml4ZWQtYm90dG9te3Bvc2l0aW9uOmZpeGVkO2JvdHRvbTouNTJlbTtsZWZ0OjA7cmlnaHQ6MH0ud2V1aS1mb290ZXJfX2xpbmtze2ZvbnQtc2l6ZTowfS53ZXVpLWZvb3Rlcl9fbGlua3tkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7bWFyZ2luOjAgLjYyZW07cG9zaXRpb246cmVsYXRpdmU7Zm9udC1zaXplOjE0cHh9LndldWktZm9vdGVyX19saW5rOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjYzdjN2M3O2NvbG9yOiNjN2M3Yzc7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpO2xlZnQ6LS42NWVtO3RvcDouMzZlbTtib3R0b206LjM2ZW19LndldWktZm9vdGVyX19saW5rOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktZm9vdGVyX190ZXh0e3BhZGRpbmc6MCAuMzRlbTtmb250LXNpemU6MTJweH0ud2V1aS1mbGV4e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktZmxleF9faXRlbXstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktZGlhbG9ne3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6NTAwMDt3aWR0aDo4MCU7bWF4LXdpZHRoOjMwMHB4O3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2JhY2tncm91bmQtY29sb3I6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjNweDtvdmVyZmxvdzpoaWRkZW59LndldWktZGlhbG9nX19oZHtwYWRkaW5nOjEuM2VtIDEuNmVtIC41ZW19LndldWktZGlhbG9nX190aXRsZXtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjE4cHh9LndldWktZGlhbG9nX19iZHtwYWRkaW5nOjAgMS42ZW0gLjhlbTttaW4taGVpZ2h0OjQwcHg7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MS4zO3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsO2NvbG9yOiM5OTl9LndldWktZGlhbG9nX19iZDpmaXJzdC1jaGlsZHtwYWRkaW5nOjIuN2VtIDIwcHggMS43ZW07Y29sb3I6IzM1MzUzNX0ud2V1aS1kaWFsb2dfX2Z0e3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjQ4cHg7Zm9udC1zaXplOjE4cHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1kaWFsb2dfX2Z0OmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1kaWFsb2dfX2J0bntkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtjb2xvcjojM2NjNTFmO3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLWRpYWxvZ19fYnRuOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9LndldWktZGlhbG9nX19idG46YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1kaWFsb2dfX2J0bjpmaXJzdC1jaGlsZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktZGlhbG9nX19idG5fZGVmYXVsdHtjb2xvcjojMzUzNTM1fS53ZXVpLWRpYWxvZ19fYnRuX3ByaW1hcnl7Y29sb3I6IzBiYjIwY30ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9ne3RleHQtYWxpZ246bGVmdDtib3gtc2hhZG93OjAgNnB4IDMwcHggMCByZ2JhKDAsMCwwLC4xKX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX190aXRsZXtmb250LXNpemU6MjFweH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19oZHt0ZXh0LWFsaWduOmxlZnR9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYmR7Y29sb3I6Izk5OTtwYWRkaW5nOi4yNWVtIDEuNmVtIDJlbTtmb250LXNpemU6MTdweDt0ZXh0LWFsaWduOmxlZnR9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYmQ6Zmlyc3QtY2hpbGR7cGFkZGluZzoxLjZlbSAxLjZlbSAyZW07Y29sb3I6IzM1MzUzNX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19mdHtkaXNwbGF5OmJsb2NrO3RleHQtYWxpZ246cmlnaHQ7bGluZS1oZWlnaHQ6NDJweDtmb250LXNpemU6MTZweDtwYWRkaW5nOjAgMS42ZW0gLjdlbX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19mdDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcDtwYWRkaW5nOjAgLjhlbX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjphY3RpdmUsLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOnZpc2l0ZWR7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4wNil9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0Oi0uOGVtfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bl9kZWZhdWx0e2NvbG9yOmdyYXl9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoxMDI0cHgpey53ZXVpLWRpYWxvZ3t3aWR0aDozNSV9fS53ZXVpLXRvYXN0e3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6NTAwMDt3aWR0aDo3LjZlbTttaW4taGVpZ2h0OjcuNmVtO3RvcDoxODBweDtsZWZ0OjUwJTttYXJnaW4tbGVmdDotMy44ZW07YmFja2dyb3VuZDpoc2xhKDAsMCUsNyUsLjcpO3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6NXB4O2NvbG9yOiNmZmZ9LndldWktaWNvbl90b2FzdHttYXJnaW46MjJweCAwIDA7ZGlzcGxheTpibG9ja30ud2V1aS1pY29uX3RvYXN0LndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZTpiZWZvcmV7Y29sb3I6I2ZmZjtmb250LXNpemU6NTVweH0ud2V1aS1pY29uX3RvYXN0LndldWktbG9hZGluZ3ttYXJnaW46MzBweCAwIDA7d2lkdGg6MzhweDtoZWlnaHQ6MzhweDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX0ud2V1aS10b2FzdF9fY29udGVudHttYXJnaW46MCAwIDE1cHh9LndldWktbWFza3tiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjYpfS53ZXVpLW1hc2ssLndldWktbWFza190cmFuc3BhcmVudHtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDA7dG9wOjA7cmlnaHQ6MDtsZWZ0OjA7Ym90dG9tOjB9LndldWktYWN0aW9uc2hlZXR7cG9zaXRpb246Zml4ZWQ7bGVmdDowO2JvdHRvbTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt6LWluZGV4OjUwMDA7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNlZmVmZjQ7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcywtd2Via2l0LXRyYW5zZm9ybSAuM3N9LndldWktYWN0aW9uc2hlZXRfX3RpdGxle3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDo2NXB4O3BhZGRpbmc6MCAyMHB4O2xpbmUtaGVpZ2h0OjEuNDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHg7Y29sb3I6Izg4ODtiYWNrZ3JvdW5kOiNmY2ZjZmR9LndldWktYWN0aW9uc2hlZXRfX3RpdGxlOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktYWN0aW9uc2hlZXRfX3RpdGxlIC53ZXVpLWFjdGlvbnNoZWV0X190aXRsZS10ZXh0e292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6LXdlYmtpdC1ib3g7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtbGluZS1jbGFtcDoyfS53ZXVpLWFjdGlvbnNoZWV0X19tZW51e2JhY2tncm91bmQtY29sb3I6I2ZjZmNmZH0ud2V1aS1hY3Rpb25zaGVldF9fYWN0aW9ue21hcmdpbi10b3A6NnB4O2JhY2tncm91bmQtY29sb3I6I2ZjZmNmZH0ud2V1aS1hY3Rpb25zaGVldF9fY2VsbHtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MThweH0ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktYWN0aW9uc2hlZXRfX2NlbGw6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXR7cG9zaXRpb246Zml4ZWQ7bGVmdDo1MCU7dG9wOjUwJTtib3R0b206YXV0bzstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7d2lkdGg6Mjc0cHg7Ym94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2dyb3VuZDp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLC13ZWJraXQtdHJhbnNmb3JtIC4zc30ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2FjdGlvbntkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19tZW51e2JvcmRlci1yYWRpdXM6MnB4O2JveC1zaGFkb3c6MCA2cHggMzBweCAwIHJnYmEoMCwwLDAsLjEpfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbHtwYWRkaW5nOjEzcHggMjRweDtmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoxLjQ7dGV4dC1hbGlnbjpsZWZ0fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpmaXJzdC1jaGlsZHtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjJweDtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czoycHh9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmxhc3QtY2hpbGR7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czoycHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MnB4fS53ZXVpLWFjdGlvbnNoZWV0X3RvZ2dsZXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgwKX0ud2V1aS1sb2FkbW9yZXt3aWR0aDo2NSU7bWFyZ2luOjEuNWVtIGF1dG87bGluZS1oZWlnaHQ6MS42ZW07Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktbG9hZG1vcmVfX3RpcHN7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfS53ZXVpLWxvYWRtb3JlX2xpbmV7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTttYXJnaW4tdG9wOjIuNGVtfS53ZXVpLWxvYWRtb3JlX2xpbmUgLndldWktbG9hZG1vcmVfX3RpcHN7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0uOWVtO3BhZGRpbmc6MCAuNTVlbTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y29sb3I6Izk5OX0ud2V1aS1sb2FkbW9yZV9kb3QgLndldWktbG9hZG1vcmVfX3RpcHN7cGFkZGluZzowIC4xNmVtfS53ZXVpLWxvYWRtb3JlX2RvdCAud2V1aS1sb2FkbW9yZV9fdGlwczpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7d2lkdGg6NHB4O2hlaWdodDo0cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZTVlNWU1O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOjA7dG9wOi0uMTZlbX0ud2V1aS1iYWRnZXtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOi4xNWVtIC40ZW07bWluLXdpZHRoOjhweDtib3JkZXItcmFkaXVzOjE4cHg7YmFja2dyb3VuZC1jb2xvcjojZjQzNTMwO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MS4yO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxMnB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS1iYWRnZV9kb3R7cGFkZGluZzouNGVtO21pbi13aWR0aDowfS53ZXVpLXNlYXJjaC1iYXJ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzo4cHggMTBweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kLWNvbG9yOiNlZmVmZjR9LndldWktc2VhcmNoLWJhcjpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q3ZDZkYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktc2VhcmNoLWJhcjphZnRlciwud2V1aS1zZWFyY2gtYmFyOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNkN2Q2ZGN9LndldWktc2VhcmNoLWJhcjphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZDdkNmRjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1zZWFyY2gtYmFyLndldWktc2VhcmNoLWJhcl9mb2N1c2luZyAud2V1aS1zZWFyY2gtYmFyX19jYW5jZWwtYnRue2Rpc3BsYXk6YmxvY2t9LndldWktc2VhcmNoLWJhci53ZXVpLXNlYXJjaC1iYXJfZm9jdXNpbmcgLndldWktc2VhcmNoLWJhcl9fbGFiZWx7ZGlzcGxheTpub25lfS53ZXVpLXNlYXJjaC1iYXJfX2Zvcm17cG9zaXRpb246cmVsYXRpdmU7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OmF1dG87ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6I2VmZWZmNH0ud2V1aS1zZWFyY2gtYmFyX19mb3JtOmFmdGVye2NvbnRlbnQ6XFxcIlxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjIwMCU7aGVpZ2h0OjIwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjUpO3RyYW5zZm9ybTpzY2FsZSguNSk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDtib3JkZXItcmFkaXVzOjEwcHg7Ym9yZGVyOjFweCBzb2xpZCAjZTZlNmVhO2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kOiNmZmZ9LndldWktc2VhcmNoLWJhcl9fYm94e3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDozMHB4O3BhZGRpbmctcmlnaHQ6MzBweDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveDt6LWluZGV4OjF9LndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLXNlYXJjaC1iYXJfX2lucHV0e3BhZGRpbmc6NHB4IDA7d2lkdGg6MTAwJTtoZWlnaHQ6MS40Mjg1NzE0M2VtO2JvcmRlcjowO2ZvbnQtc2l6ZToxNHB4O2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDNlbTtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JhY2tncm91bmQ6dHJhbnNwYXJlbnR9LndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLXNlYXJjaC1iYXJfX2lucHV0OmZvY3Vze291dGxpbmU6bm9uZX0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktaWNvbi1zZWFyY2h7cG9zaXRpb246YWJzb2x1dGU7bGVmdDoxMHB4O3RvcDowO2xpbmUtaGVpZ2h0OjI4cHh9LndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLWljb24tY2xlYXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDtwYWRkaW5nOjAgMTBweDtsaW5lLWhlaWdodDoyOHB4fS53ZXVpLXNlYXJjaC1iYXJfX2xhYmVse3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxcHg7cmlnaHQ6MXB4O2JvdHRvbToxcHg7bGVmdDoxcHg7ei1pbmRleDoyO2JvcmRlci1yYWRpdXM6M3B4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM5YjliOWI7YmFja2dyb3VuZDojZmZmfS53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjE0cHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsIC53ZXVpLWljb24tc2VhcmNoe21hcmdpbi1yaWdodDo1cHh9LndldWktc2VhcmNoLWJhcl9fY2FuY2VsLWJ0bntkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweDtsaW5lLWhlaWdodDoyOHB4O2NvbG9yOiMwOWJiMDc7d2hpdGUtc3BhY2U6bm93cmFwfS53ZXVpLXNlYXJjaC1iYXJfX2lucHV0Om5vdCg6dmFsaWQpfi53ZXVpLWljb24tY2xlYXJ7ZGlzcGxheTpub25lfWlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWJ1dHRvbixpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtZGVjb3JhdGlvbntkaXNwbGF5Om5vbmV9LndldWktcGlja2Vye3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7bGVmdDowO2JvdHRvbTowO3otaW5kZXg6NTAwMDstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcywtd2Via2l0LXRyYW5zZm9ybSAuM3N9LndldWktcGlja2VyX19oZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3BhZGRpbmc6OXB4IDE1cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxN3B4fS53ZXVpLXBpY2tlcl9faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBpY2tlcl9fYWN0aW9ue2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO2NvbG9yOiMxYWFkMTl9LndldWktcGlja2VyX19hY3Rpb246Zmlyc3QtY2hpbGR7dGV4dC1hbGlnbjpsZWZ0O2NvbG9yOiM4ODh9LndldWktcGlja2VyX19hY3Rpb246bGFzdC1jaGlsZHt0ZXh0LWFsaWduOnJpZ2h0fS53ZXVpLXBpY2tlcl9fYmR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7aGVpZ2h0OjIzOHB4O292ZXJmbG93OmhpZGRlbn0ud2V1aS1waWNrZXJfX2dyb3Vwey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6MTAwJX0ud2V1aS1waWNrZXJfX21hc2t7dG9wOjA7aGVpZ2h0OjEwMCU7bWFyZ2luOjAgYXV0bztiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCgxODBkZWcsaHNsYSgwLDAlLDEwMCUsLjk1KSxoc2xhKDAsMCUsMTAwJSwuNikpLGxpbmVhci1ncmFkaWVudCgwZGVnLGhzbGEoMCwwJSwxMDAlLC45NSksaHNsYSgwLDAlLDEwMCUsLjYpKTtiYWNrZ3JvdW5kLXBvc2l0aW9uOnRvcCxib3R0b207YmFja2dyb3VuZC1zaXplOjEwMCUgMTAycHg7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0Oy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9LndldWktcGlja2VyX19pbmRpY2F0b3IsLndldWktcGlja2VyX19tYXNre3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt3aWR0aDoxMDAlO3otaW5kZXg6M30ud2V1aS1waWNrZXJfX2luZGljYXRvcntoZWlnaHQ6MzRweDt0b3A6MTAycHh9LndldWktcGlja2VyX19pbmRpY2F0b3I6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmFmdGVyLC53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTV9LndldWktcGlja2VyX19pbmRpY2F0b3I6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGlja2VyX19jb250ZW50e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlfS53ZXVpLXBpY2tlcl9faXRlbXtwYWRkaW5nOjA7aGVpZ2h0OjM0cHg7bGluZS1oZWlnaHQ6MzRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojMDAwO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbn0ud2V1aS1waWNrZXJfX2l0ZW1fZGlzYWJsZWR7Y29sb3I6Izk5OX1ALXdlYmtpdC1rZXlmcmFtZXMgYXswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfX1Aa2V5ZnJhbWVzIGF7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX19LndldWktYW5pbWF0ZS1zbGlkZS11cHstd2Via2l0LWFuaW1hdGlvbjphIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjphIGVhc2UgLjNzIGZvcndhcmRzfUAtd2Via2l0LWtleWZyYW1lcyBiezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9fUBrZXlmcmFtZXMgYnswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfX0ud2V1aS1hbmltYXRlLXNsaWRlLWRvd257LXdlYmtpdC1hbmltYXRpb246YiBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246YiBlYXNlIC4zcyBmb3J3YXJkc31ALXdlYmtpdC1rZXlmcmFtZXMgY3swJXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGN7MCV7b3BhY2l0eTowfXRve29wYWNpdHk6MX19LndldWktYW5pbWF0ZS1mYWRlLWluey13ZWJraXQtYW5pbWF0aW9uOmMgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmMgZWFzZSAuM3MgZm9yd2FyZHN9QC13ZWJraXQta2V5ZnJhbWVzIGR7MCV7b3BhY2l0eToxfXRve29wYWNpdHk6MH19QGtleWZyYW1lcyBkezAle29wYWNpdHk6MX10b3tvcGFjaXR5OjB9fS53ZXVpLWFuaW1hdGUtZmFkZS1vdXR7LXdlYmtpdC1hbmltYXRpb246ZCBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246ZCBlYXNlIC4zcyBmb3J3YXJkc30ud2V1aS1hZ3JlZXtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6LjVlbSAxNXB4O2ZvbnQtc2l6ZToxM3B4fS53ZXVpLWFncmVlIGF7Y29sb3I6IzU4NmM5NH0ud2V1aS1hZ3JlZV9fdGV4dHtjb2xvcjojOTk5fS53ZXVpLWFncmVlX19jaGVja2JveHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7b3V0bGluZTowO2ZvbnQtc2l6ZTowO2JvcmRlcjoxcHggc29saWQgI2QxZDFkMTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czozcHg7d2lkdGg6MTNweDtoZWlnaHQ6MTNweDtwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjowO3RvcDoycHh9LndldWktYWdyZWVfX2NoZWNrYm94OmNoZWNrZWQ6YmVmb3Jle2ZvbnQtZmFtaWx5OndldWk7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtdmFyaWFudDpub3JtYWw7dGV4dC10cmFuc2Zvcm06bm9uZTt0ZXh0LWFsaWduOmNlbnRlcjtzcGVhazpub25lO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0ZXh0LWRlY29yYXRpb246aW5oZXJpdDtjb250ZW50OlxcXCJcXFxcRUEwOFxcXCI7Y29sb3I6IzA5YmIwNztmb250LXNpemU6MTNweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC00OCUpIHNjYWxlKC43Myk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC00OCUpIHNjYWxlKC43Myl9LndldWktYWdyZWVfX2NoZWNrYm94OmRpc2FibGVke2JhY2tncm91bmQtY29sb3I6I2UxZTFlMX0ud2V1aS1hZ3JlZV9fY2hlY2tib3g6ZGlzYWJsZWQ6YmVmb3Jle2NvbG9yOiNhZGFkYWR9LndldWktbG9hZGluZ3t3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LWFuaW1hdGlvbjplIDFzIHN0ZXBzKDEyKSBpbmZpbml0ZTthbmltYXRpb246ZSAxcyBzdGVwcygxMikgaW5maW5pdGU7YmFja2dyb3VuZDp0cmFuc3BhcmVudCB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4TWpBaUlHaGxhV2RvZEQwaU1USXdJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJK1BIQmhkR2dnWm1sc2JEMGlibTl1WlNJZ1pEMGlUVEFnTUdneE1EQjJNVEF3U0RCNklpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalJUbEZPVVU1SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RBZ0xUTXdLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJems0T1RZNU55SWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnek1DQXhNRFV1T1RnZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpPVUk1T1RsQklpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0RZd0lEYzFMams0SURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwRXpRVEZCTWlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2c1TUNBMk5TQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5CUWtFNVFVRWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb01USXdJRFU0TGpZMklEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMEl5UWpKQ01pSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNneE5UQWdOVFF1TURJZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpRa0ZDT0VJNUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0RFNE1DQTFNQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORE1rTXdRekVpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVEUxTUNBME5TNDVPQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORFFrTkNRMElpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVEV5TUNBME1TNHpOQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORU1rUXlSRElpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVGt3SURNMUlEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMFJCUkVGRVFTSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNndE5qQWdNalF1TURJZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpSVEpGTWtVeUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0Mwek1DQXROUzQ1T0NBMk5Ta2lMejQ4TDNOMlp6ND0pIG5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl9wcmltYXJ5IC53ZXVpLWxvYWRpbmcsLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2FybiAud2V1aS1sb2FkaW5nLC53ZXVpLWxvYWRpbmcud2V1aS1sb2FkaW5nX3RyYW5zcGFyZW50e2JhY2tncm91bmQtaW1hZ2U6dXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEwMCAxMDAnJTNFJTNDcGF0aCBmaWxsPSdub25lJyBkPSdNMCAwaDEwMHYxMDBIMHonLyUzRSUzQ3JlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCAxMDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDc1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDU4LjY2IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTUwIDQ1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE3KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTIwIDQxLjM0IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTYwIDI0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjAzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzAgLTUuOTggNjUpJy8lM0UlM0Mvc3ZnJTNFXFxcIil9QC13ZWJraXQta2V5ZnJhbWVzIGV7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDF0dXJuKTt0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19QGtleWZyYW1lcyBlezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxdHVybik7dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fS53ZXVpLXNsaWRlcntwYWRkaW5nOjE1cHggMThweDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LndldWktc2xpZGVyX19pbm5lcntwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6MnB4O2JhY2tncm91bmQtY29sb3I6I2U5ZTllOX0ud2V1aS1zbGlkZXJfX3RyYWNre2hlaWdodDoycHg7YmFja2dyb3VuZC1jb2xvcjojMWFhZDE5O3dpZHRoOjB9LndldWktc2xpZGVyX19oYW5kbGVye3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6NTAlO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7bWFyZ2luLWxlZnQ6LTE0cHg7bWFyZ2luLXRvcDotMTRweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym94LXNoYWRvdzowIDAgNHB4IHJnYmEoMCwwLDAsLjIpfS53ZXVpLXNsaWRlci1ib3h7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS1zbGlkZXItYm94IC53ZXVpLXNsaWRlcnstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktc2xpZGVyLWJveF9fdmFsdWV7bWFyZ2luLWxlZnQ6LjVlbTttaW4td2lkdGg6MjRweDtjb2xvcjojODg4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLXRvcHRpcHNbZGF0YS12LTFhN2JlYzJiXXtkaXNwbGF5OmJsb2NrfS53di1oZWFkZXJbZGF0YS12LWY2ZjVjMTZhXXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjE7cGFkZGluZzowIDEwcHg7bWFyZ2luOjA7Y29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt3aGl0ZS1zcGFjZTpub3dyYXA7ei1pbmRleDo1MDB9Lnd2LWhlYWRlciAubGVmdFtkYXRhLXYtZjZmNWMxNmFde2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO2Zsb2F0OmxlZnQ7Zm9udC1zaXplOjM1cHg7bGluZS1oZWlnaHQ6MzVweDtmb250LXdlaWdodDoxMDB9Lnd2LWhlYWRlciAud3YtaGVhZGVyLXRpdGxlW2RhdGEtdi1mNmY1YzE2YV17Zm9udC1zaXplOjIzcHg7Zm9udC13ZWlnaHQ6MDt0ZXh0LWFsaWduOmNlbnRlcjtmbGV4OjF9Lnd2LWhlYWRlci5pcy1maXhlZFtkYXRhLXYtZjZmNWMxNmFde3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDt0b3A6MH0ud3YtcGlja2VyLXNsb3QtZGl2aWRlcltkYXRhLXYtYzllNGU5ZTBde3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwNnB4KX0ud3YtcG9wdXAtYm9keVtkYXRhLXYtODdhMDhlZjZde2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojZmZmO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7bGVmdDowO2JvdHRvbTowO3otaW5kZXg6NTAwMDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3N9Lnd2LXN3aXBlW2RhdGEtdi00NzM3MDUyMV17b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyW2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxMDAlfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlciBkaXZbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSk7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyIGRpdi5pcy1hY3RpdmVbZGF0YS12LTQ3MzcwNTIxXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybTpub25lfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9yc1tkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yW2RhdGEtdi00NzM3MDUyMV17ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7bWFyZ2luOjAgNHB4O2JhY2tncm91bmQtY29sb3I6IzAwMDtvcGFjaXR5Oi4zfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yLmlzLWFjdGl2ZVtkYXRhLXYtNDczNzA1MjFde2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud2V1aS1pY29uX3RvYXN0W2RhdGEtdi1iYWZiMWY4YV17Zm9udC1zaXplOjQwcHh9LndldWktdG9hc3RfdGV4dFtkYXRhLXYtYmFmYjFmOGFde3dpZHRoOmF1dG87bWluLXdpZHRoOjA7bWluLWhlaWdodDowO3BhZGRpbmc6LjVlbSAwfS53ZXVpLXRvYXN0X3RleHQgLndldWktdG9hc3RfX2NvbnRlbnRbZGF0YS12LWJhZmIxZjhhXXttYXJnaW46MH0ud3YtY2lyY2xlW2RhdGEtdi0xMmFiNjQyYV17cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53di1jaXJjbGUgc3ZnW2RhdGEtdi0xMmFiNjQyYV17ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjF9Lnd2LWNpcmNsZSAud3YtY2lyY2xlLWNvbnRlbnRbZGF0YS12LTEyYWI2NDJhXXt6LWluZGV4OjEwMDB9LmFjdGlvbnNoZWV0X19tYXNrX3Nob3dbZGF0YS12LTQwOTVjOGJmXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybS1vcmlnaW46MCAwIDA7b3BhY2l0eToxO3RyYW5zZm9ybTpzY2FsZSgxKTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjYpfS53ZXVpLWNoZWNrX19sYWJlbC1kaXNhYmxlZFtkYXRhLXYtM2Q2M2FlM2Fde2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSl9LndldWktY2hlY2tfX2xhYmVsLWRpc2FibGVkW2RhdGEtdi0zMjNiOTU3OV17YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0ud3YtbmF2YmFyX19pdGVtW2RhdGEtdi04YjRjZGE2Nl17cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztmbGV4OjE7cGFkZGluZzoxM3B4IDA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE1cHg7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS53di1uYXZiYXJfX2l0ZW0ud3YtbmF2YmFyX19pdGVtX29uW2RhdGEtdi04YjRjZGE2Nl17Ym9yZGVyLWJvdHRvbTozcHggc29saWQgcmVkfS53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsW2RhdGEtdi1lODc2YWEyYV17dHJhbnNmb3JtLW9yaWdpbjowIDAgMDtvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpfS53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG5bZGF0YS12LWU4NzZhYTJhXXtkaXNwbGF5OmJsb2NrfS5zZWFyY2hiYXItcmVzdWx0W2RhdGEtdi1lODc2YWEyYV17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm0tb3JpZ2luOjAgMCAwO29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSk7bWFyZ2luLXRvcDowO2ZvbnQtc2l6ZToxNHB4fS53di1uYXZiYXJbZGF0YS12LTQwZjBhNWViXXtkaXNwbGF5OmZsZXg7d2lkdGg6MTAwJTt6LWluZGV4OjUwMDA7YmFja2dyb3VuZC1jb2xvcjojZmZmfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6aWNvbmZvbnQ7c3JjOnVybChkYXRhOmFwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0O2Jhc2U2NCwpO3NyYzp1cmwoZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdDtiYXNlNjQsI2llZml4KSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksdXJsKGRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2Jhc2U2NCwpIGZvcm1hdChcXFwid29mZlxcXCIpLHVybChkYXRhOmFwcGxpY2F0aW9uL3gtZm9udC10dGY7YmFzZTY0LEFBRUFBQUFRQVFBQUJBQUFSa1pVVFhkckExQUFBQUVNQUFBQUhFZEVSVVlBTlFBR0FBQUJLQUFBQUNCUFV5OHlWMVJiRkFBQUFVZ0FBQUJXWTIxaGNORkEwOElBQUFHZ0FBQUJhbU4yZENBTlpmNzBBQUFRWkFBQUFDUm1jR2R0TVBlZWxRQUFFSWdBQUFtV1oyRnpjQUFBQUJBQUFCQmNBQUFBQ0dkc2VXWXNpZzJ0QUFBRERBQUFDaDVvWldGa0RreWtmUUFBRFN3QUFBQTJhR2hsWVFmZUE0WUFBQTFrQUFBQUpHaHRkSGdOYkFCUUFBQU5pQUFBQUJwc2IyTmhDSnNFaGdBQURhUUFBQUFTYldGNGNBSGJDcndBQUEyNEFBQUFJRzVoYldVTkxjY1ZBQUFOMkFBQUFpdHdiM04wbktNWVF3QUFFQVFBQUFCWGNISmxjS1c1dm1ZQUFCb2dBQUFBbFFBQUFBRUFBQUFBekQyaXp3QUFBQURWbHJCQUFBQUFBTldXc0VBQUFRQUFBQTRBQUFBWUFBQUFBQUFDQUFFQUF3QUhBQUVBQkFBQUFBSUFBQUFCQS9zQjlBQUZBQWdDbVFMTUFBQUFqd0taQXN3QUFBSHJBRE1CQ1FBQUFnQUdBd0FBQUFBQUFBQUFBQUVRQUFBQUFBQUFBQUFBQUFCUVprVmtBRUFBZU9nR0E0RC9nQUJjQTRBQWdBQUFBQUVBQUFBQUFBQUFBQUFEQUFBQUF3QUFBQndBQVFBQUFBQUFaQUFEQUFFQUFBQWNBQVFBU0FBQUFBNEFDQUFDQUFZQUFBQjQ1ai9uSXVmcDZBYi8vd0FBQUFBQWVPWS81eUxuNmVnRy8vOEFBUCtMR2NnWTR4Z2JHQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQmdBQUFRQUFBQUFBQUFBQkFnQUFBQUlBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFVQUxQL2hBN3dER0FBV0FEQUFPZ0JTQUY0QmQwdXdFMUJZUUVvQ0FRQU5EZzBBRG1ZQUF3NEJEZ05lQUFFSUNBRmNFQUVKQ0FvR0NWNFJBUXdHQkFZTVhnQUxCQXRwRHdFSUFBWU1DQVpZQUFvSEJRSUVDd29FV1JJQkRnNE5VUUFORFFvT1FodExzQmRRV0VCTEFnRUFEUTROQUE1bUFBTU9BUTREWGdBQkNBZ0JYQkFCQ1FnS0NBa0taaEVCREFZRUJneGVBQXNFQzJrUEFRZ0FCZ3dJQmxnQUNnY0ZBZ1FMQ2dSWkVnRU9EZzFSQUEwTkNnNUNHMHV3R0ZCWVFFd0NBUUFORGcwQURtWUFBdzRCRGdOZUFBRUlDQUZjRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDRzBCT0FnRUFEUTROQUE1bUFBTU9BUTREQVdZQUFRZ09BUWhrRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDV1ZsWlFDaFRVenM3TWpFWEYxTmVVMTViV0R0U08xSkxRemMxTVRveU9oY3dGekJSRVRFWUVTZ1ZRQk1XS3dFR0t3RWlEZ0lkQVNFMU5DWTFOQzRDS3dFVklRVVZGQllVRGdJakJpWXJBU2NoQnlzQklpY2lMZ0k5QVJjaUJoUVdNekkyTkNZWEJnY09BeDRCT3dZeU5pY3VBU2NtSndFMU5ENENPd0V5RmgwQkFSa2JHbE1TSlJ3U0E1QUJDaGduSG9YK1NnS2lBUlVmSXc0T0h3NGdMZjVKTEIwaUZCa1pJQk1JZHd3U0Vnd05FaEtNQ0FZRkN3UUNCQThPSlVOUlVFQWtGeFlKQlFrRkJRYitwQVVQR2hXOEh5a0NId0VNR1NjYVRDa1FIQVFOSUJzU1lZZzBGem82SlJjSkFRR0FnQUVUR3lBT3B6OFJHaEVSR2hGOEdoWVRKQTRRRFFnWUdnMGpFUk1VQVhma0N4Z1REQjBtNHdBQUFnQUEvNEFFQUFPQUFCUUFLZ0JDUUQ4QUJRRUNBUVVDWmdBQ0JBRUNCR1FHQVFBQUFRVUFBVmtBQkFNREJFMEFCQVFEVVFjQkF3UURSUllWQVFBbEpCOGRGU29XS2c4T0NnZ0FGQUVVQ0E0ckFTSU9BZ2MrQWpNeUVoVVVGakkyTlRRdUFRTXlQZ0kzRGdJaklpNEJOVFFtSWdZVkZCNEJBZ0JudTRsU0F3Tnd2bStzOURoUU9JbnNpMmU3aVZJREEzQytiM0hBYnpoUU9JbnNBNEJQaHJsbWQ4bDAvdnE2S0RnNEtJdnNpZndBVDRhNVpuZkpkSGpPZWlnNE9DaUw3SWtBQUFJQUgvK3ZCQUFEY1FBMkFHUUFQVUE2WFZ3Mk5RQUZBZ1FCUUdJQkFnRS9BQUlFQXdRQ0EyWUFBQUFFQWdBRVdRQURBUUVEVFFBREF3RlJBQUVEQVVWVVVrRTlNUzRsSVVnRkR5c0JMZ0VuTGdFbkxnRWpJaU1PQVFjT0FRY09BUlVVRlI0QkZ4NEJGeDRCRng0Qk16SXpOamMrQVRjK0FUYzJOekl6TWpZMU5EVXhCd1lIQmdjT0FTTWlJeTRCSnk0Qkp5NEJOVFEyTnpZM05qYytBVE15RmhjV0Z4WVhGZ2N4RkJVVUZoY0dCd1FBQWxzL0hXRW5KR29tQmdWVXl6b2NQQTRPRXdFWEVCQStIQnhiSkNKaUpBWUZYRlFqVlJvYU9BNFRCd0lDR2labUkwQS9VUjljSWdVRlNiQXpHRFFNREJBVkRpRThPa3NkVlI4alh5QkhOalljR3dJaEdBa1dBWUJYMFR3ZFBnOE9GQUpZUFIxZEppTm1KUVlGSjJza0pGa2JHemtPRGhJQ0pRODhIQnRYSXpJMkpSc0NBNnBRUFQwZkRCRUNUVFVaVWlBZVdDRWtZaUpLT1RnY0N4QVVEaUE1T0VoSVRRTUNHQ1VETkRFQUFBQUFDQUFrLzZRRDNBT0FBQWtBRVFBWkFDTUFLd0F6QURzQVJ3QlNRRThBRFFBTUNBME1XUUFKQUFnT0NRaFpDd0VGQ2dFRUFRVUVXUWNCQVFZQkFBSUJBRmtBQXdBQ0F3SlZBQTRPRDFFQUR3OEtEa0pHUkVBK096bzNOak15THk0cktoUVRJeE1URXhNVUloQVhLeVFVQmlNaUpqVTBOaklFRkFZaUpqUTJNZ0FVQmlJbU5EWXlBUlFHSXlJbU5EWXlGZ0FVQmlJbU5EWXlBQlFHSWlZME5qSUFGQVlpSmpRMk1nVVVCaU1pSmpVME5qTXlGZ0V0S3g4ZExDczlBVWNyUENzclBQNlpLejBxS2owQzJpd2RIeXNyUFN2OTJUWkxOalpMQXRJcVBTc3JQZjY5UUZ4QVFGd0JiMHcwTmtwS05qUk1najByTEIwZks2RTlLaW85S3dGblBDc3JQQ3YrbWgwc0t6MHJLd0pBU3pZMlN6YitwandyS3p3ckFYZGJRRUJiUU9NMlNrbzJORXhNQUFBQUFBd0FELytiQTk0RGZBQU5BQnNBTGdCQUFGTUFaUUJ4QUgwQWtBQ2hBTFFBeFFJc3QxUUJEeThCQ1FJL1M3QWtVRmhBa2dBTklCb2dEUnBtQUJvQUlCb0FaQ0VCSHdBR0FCOEdaaVFJQWdZWkFBWVpaQUFkRUFvUUhRcG1BQW9FRUFvRVpCRUJEd1FXQkE4V1ppY1lBaFlKQkJZSlpBQUJJZ0lDQUI4QkFGa0FCdzRCREJNSERGa0FGU1lCRkJJVkZGb0FFeVVCRWhjVEVsb0FCQ01GQWdNRUExVWJBUmtaSUZFQUlDQUtRUUFRRUFsUkN3RUpDUXRCQUJjWEhGRWVBUndjQ3h4Q0cwdXdNbEJZUUpBQURTQWFJQTBhWmdBYUFDQWFBR1FoQVI4QUJnQWZCbVlrQ0FJR0dRQUdHV1FBSFJBS0VCMEtaZ0FLQkJBS0JHUVJBUThFRmdRUEZtWW5HQUlXQ1FRV0NXUUFBU0lDQWdBZkFRQlpBQWNPQVF3VEJ3eFpBQlVtQVJRU0ZSUmFBQk1sQVJJWEV4SmFBQmNlQVJ3REZ4eFpBQVFqQlFJREJBTlZHd0VaR1NCUkFDQWdDa0VBRUJBSlVRc0JDUWtMQ1VJYlFJNEFEU0FhSUEwYVpnQWFBQ0FhQUdRaEFSOEFCZ0FmQm1Za0NBSUdHUUFHR1dRQUhSQUtFQjBLWmdBS0JCQUtCR1FSQVE4RUZnUVBGbVluR0FJV0NRUVdDV1FBQVNJQ0FnQWZBUUJaQUNBYkFSa01JQmxaQUFjT0FRd1RCd3haQUJVbUFSUVNGUlJhQUJNbEFSSVhFeEphQUJjZUFSd0RGeHhaQUFRakJRSURCQU5WQUJBUUNWRUxBUWtKQ3dsQ1dWbEFYSDUrZEhKb1pod2NEZzRBQU1YRXZyeTJ0YlN6cktxam9xR2dtcGlTa1g2UWZwQ0poNEIvZW5keWZYUjlibXRtY1doeFpXUmVYRlpWVTFKTFNVSkJRRDg1TnpFd0hDNGNMaWNsSGgwT0d3NGJGaFVRRHdBTkFBMFZFU2dRS3dFeElpWTlBVFEyTWhZZEFSUUdBekVpSmowQk5EWXlGaDBCRkFZRE1TSW1Md0VtTlRRMk16SVdId0VXRlJRR0FURWlMd0VtTlRRMk16SWZBUllWRkFZakFTSXZBUzRCTlRRMk16SWZBUjRCRlJRR0l3RXhJaThCSmpVME5qTXlId0VXRlJRR0l5VWpJaVkwTmpzQk1oWVVCaVVqSWlZME5qc0JNaFlVQmdVeElpWTFORFkvQVRZek1oWVZGQVlQQVFZQklpWTFORDhCTmpNeUZoVVVEd0VHSXdFaUpqVTBQd0UrQVRNeUZoVVVEd0VPQVNNQklpWTFORDhCTmpNeUZoVVVEd0VHSXdJQUdTTWpNaU1qR1E4V0ZoNFdGcFVPSEFkWkJ5RVhEUndIV1FnaEFVOFVDVm9FRXc0VUNWb0VFdzcrTnc0TW13c1BIeFVPREp3S0VCOFdBbTBJQjVzUEVRMElCNXNQRWd6OWI3TVVIQndVc3hRZEhRSzVzdzBSRVEyekRCSVMvTEFTR2cwSm13b01FeG9OQ1pzTEFtRU5FUStiQmdnTUVnNmJCd2orTnhFWUJsa0ZGUWtSR0FWWkJSVUtBV1lNRWdSYUNSRU1FZ1JhQ0JJQ1VTTVpzeGdqSXhpekdTUDlTaFlQc3hBV0ZoQ3pEeFlDbGhBTW13d09GeUVQQzVzTkR4Z2cvYW9SbXdjSkRoUVJtd2dKRGhNQjl3ZGFCaG9ORlI4SFdnWWFEUlVmL3JBRVdnZ1NEQklFV2drUkRCTE9IQ2djSENnY0VoSVlFaElZRXU4YkVnc1hCVmtHR2hJTEZ3VmFCZ0YxRWd3UkNWb0RFUTBRQ1ZvRS9lc1lFUXNLbXdnTEdCRUtDWnNKREFKNEVRMElCNXNQRWd3SUI1c1BBQUFBQUFFQUFBQUJBQUJrNHlySVh3ODg5UUFMQkFBQUFBQUExWmF3UUFBQUFBRFZsckJBQUFEL2dBUUFBNEFBQUFBSUFBSUFBQUFBQUFBQUFRQUFBNEQvZ0FCY0JBQUFBQUFBQkFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFVRUFBQUFBQUFBQUFGVkFBQUQ2UUFzQkFBQUFBQWZBQ1FBRHdBQUFBQUFBQUFBQUFBQlBBR2VBbEFDNkFVUEFBQUFBUUFBQUFnQXhnQU1BQUFBQUFBQ0FGQUFYZ0JzQUFBQkNnbVdBQUFBQUFBQUFBd0FsZ0FCQUFBQUFBQUJBQWdBQUFBQkFBQUFBQUFDQUFZQUNBQUJBQUFBQUFBREFDUUFEZ0FCQUFBQUFBQUVBQWdBTWdBQkFBQUFBQUFGQUVVQU9nQUJBQUFBQUFBR0FBZ0Fmd0FEQUFFRUNRQUJBQkFBaHdBREFBRUVDUUFDQUF3QWx3QURBQUVFQ1FBREFFZ0Fvd0FEQUFFRUNRQUVBQkFBNndBREFBRUVDUUFGQUlvQSt3QURBQUVFQ1FBR0FCQUJoV2xqYjI1bWIyNTBUV1ZrYVhWdFJtOXVkRVp2Y21kbElESXVNQ0E2SUdsamIyNW1iMjUwSURvZ01qRXROeTB5TURFM2FXTnZibVp2Ym5SV1pYSnphVzl1SURFdU1Ec2dkSFJtWVhWMGIyaHBiblFnS0hZd0xqazBLU0F0YkNBNElDMXlJRFV3SUMxSElESXdNQ0F0ZUNBeE5DQXRkeUFpUnlJZ0xXWWdMWE5wWTI5dVptOXVkQUJwQUdNQWJ3QnVBR1lBYndCdUFIUUFUUUJsQUdRQWFRQjFBRzBBUmdCdkFHNEFkQUJHQUc4QWNnQm5BR1VBSUFBeUFDNEFNQUFnQURvQUlBQnBBR01BYndCdUFHWUFid0J1QUhRQUlBQTZBQ0FBTWdBeEFDMEFOd0F0QURJQU1BQXhBRGNBYVFCakFHOEFiZ0JtQUc4QWJnQjBBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUFBN0FDQUFkQUIwQUdZQVlRQjFBSFFBYndCb0FHa0FiZ0IwQUNBQUtBQjJBREFBTGdBNUFEUUFLUUFnQUMwQWJBQWdBRGdBSUFBdEFISUFJQUExQURBQUlBQXRBRWNBSUFBeUFEQUFNQUFnQUMwQWVBQWdBREVBTkFBZ0FDMEFkd0FnQUNJQVJ3QWlBQ0FBTFFCbUFDQUFMUUJ6QUdrQVl3QnZBRzRBWmdCdkFHNEFkQUFBQWdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlBQUFBQVFBQ0FGc0JBZ0VEQVFRQkJRaHpjR2x1Ym1WeU9RbHpjR2x1Ym1WeUxURUljM0JwYm01bGNqRUljM0JwYm01bGNqSUFBQUVBQWYvL0FBOEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFESUFNZ01ZLytFRGdQK0FBeGovNFFPQS80Q3dBQ3l3SUdCbUxiQUJMQ0JrSUxEQVVMQUVKbHF3QkVWYldDRWpJUnVLV0NDd1VGQllJYkJBV1JzZ3NEaFFXQ0d3T0ZsWklMQUtSV0Zrc0NoUVdDR3dDa1Vnc0RCUVdDR3dNRmtiSUxEQVVGZ2daaUNLaW1FZ3NBcFFXR0FiSUxBZ1VGZ2hzQXBnR3lDd05sQllJYkEyWUJ0Z1dWbFpHN0FBSzFsWkk3QUFVRmhsV1ZrdHNBSXNJRVVnc0FRbFlXUWdzQVZEVUZpd0JTTkNzQVlqUWhzaElWbXdBV0F0c0FNc0l5RWpJU0Jrc1FWaVFpQ3dCaU5Dc2dvQUFpb2hJTEFHUXlDS0lJcXdBQ3V4TUFVbGlsRllZRkFiWVZKWldDTlpJU0N3UUZOWXNBQXJHeUd3UUZranNBQlFXR1ZaTGJBRUxMQUlJMEt3QnlOQ3NBQWpRckFBUTdBSFExRllzQWhESzdJQUFRQkRZRUt3Rm1VY1dTMndCU3l3QUVNZ1JTQ3dBa1Zqc0FGRlltQkVMYkFHTExBQVF5QkZJTEFBS3lPeEJBUWxZQ0JGaWlOaElHUWdzQ0JRV0NHd0FCdXdNRkJZc0NBYnNFQlpXU093QUZCWVpWbXdBeVVqWVVSRUxiQUhMTEVGQlVXd0FXRkVMYkFJTExBQllDQWdzQXBEU3JBQVVGZ2dzQW9qUWxtd0MwTktzQUJTV0NDd0N5TkNXUzJ3Q1N3Z3VBUUFZaUM0QkFCamlpTmhzQXhEWUNDS1lDQ3dEQ05DSXkyd0NpeExWRml4QndGRVdTU3dEV1VqZUMyd0N5eExVVmhMVTFpeEJ3RkVXUnNoV1NTd0UyVWplQzJ3REN5eEFBMURWVml4RFExRHNBRmhRckFKSzFtd0FFT3dBaVZDc2dBQkFFTmdRckVLQWlWQ3NRc0NKVUt3QVJZaklMQURKVkJZc0FCRHNBUWxRb3FLSUlvalliQUlLaUVqc0FGaElJb2pZYkFJS2lFYnNBQkRzQUlsUXJBQ0pXR3dDQ29oV2JBS1EwZXdDME5IWUxDQVlpQ3dBa1Zqc0FGRlltQ3hBQUFUSTBTd0FVT3dBRDZ5QVFFQlEyQkNMYkFOTExFQUJVVlVXQUN3RFNOQ0lHQ3dBV0cxRGc0QkFBd0FRa0tLWUxFTUJDdXdheXNiSWxrdHNBNHNzUUFOS3kyd0R5eXhBUTByTGJBUUxMRUNEU3N0c0JFc3NRTU5LeTJ3RWl5eEJBMHJMYkFUTExFRkRTc3RzQlFzc1FZTkt5MndGU3l4QncwckxiQVdMTEVJRFNzdHNCY3NzUWtOS3kyd0dDeXdCeXV4QUFWRlZGZ0FzQTBqUWlCZ3NBRmh0UTRPQVFBTUFFSkNpbUN4REFRcnNHc3JHeUpaTGJBWkxMRUFHQ3N0c0Jvc3NRRVlLeTJ3R3l5eEFoZ3JMYkFjTExFREdDc3RzQjBzc1FRWUt5MndIaXl4QlJnckxiQWZMTEVHR0NzdHNDQXNzUWNZS3kyd0lTeXhDQmdyTGJBaUxMRUpHQ3N0c0NNc0lHQ3dEbUFnUXlPd0FXQkRzQUlsc0FJbFVWZ2pJRHl3QVdBanNCSmxIQnNoSVZrdHNDUXNzQ01yc0NNcUxiQWxMQ0FnUnlBZ3NBSkZZN0FCUldKZ0kyRTRJeUNLVlZnZ1J5QWdzQUpGWTdBQlJXSmdJMkU0R3lGWkxiQW1MTEVBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBbkxMQUhLN0VBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBb0xDQTFzQUZnTGJBcExBQ3dBMFZqc0FGRllyQUFLN0FDUldPd0FVVmlzQUFyc0FBV3RBQUFBQUFBUkQ0ak9MRW9BUlVxTGJBcUxDQThJRWNnc0FKRlk3QUJSV0pnc0FCRFlUZ3RzQ3NzTGhjOExiQXNMQ0E4SUVjZ3NBSkZZN0FCUldKZ3NBQkRZYkFCUTJNNExiQXRMTEVDQUJZbElDNGdSN0FBSTBLd0FpVkppb3BISTBjallTQllZaHNoV2JBQkkwS3lMQUVCRlJRcUxiQXVMTEFBRnJBRUpiQUVKVWNqUnlOaHNBWkZLMldLTGlNZ0lEeUtPQzJ3THl5d0FCYXdCQ1d3QkNVZ0xrY2pSeU5oSUxBRUkwS3dCa1VySUxCZ1VGZ2dzRUJSV0xNQ0lBTWdHN01DSmdNYVdVSkNJeUN3Q1VNZ2lpTkhJMGNqWVNOR1lMQUVRN0NBWW1BZ3NBQXJJSXFLWVNDd0FrTmdaQ093QTBOaFpGQllzQUpEWVJ1d0EwTmdXYkFESmJDQVltRWpJQ0N3QkNZalJtRTRHeU93Q1VOR3NBSWxzQWxEUnlOSEkyRmdJTEFFUTdDQVltQWpJTEFBS3lPd0JFTmdzQUFyc0FVbFliQUZKYkNBWXJBRUptRWdzQVFsWUdRanNBTWxZR1JRV0NFYkl5RlpJeUFnc0FRbUkwWmhPRmt0c0RBc3NBQVdJQ0Fnc0FVbUlDNUhJMGNqWVNNOE9DMndNU3l3QUJZZ3NBa2pRaUFnSUVZalI3QUFLeU5oT0Myd01peXdBQmF3QXlXd0FpVkhJMGNqWWJBQVZGZ3VJRHdqSVJ1d0FpV3dBaVZISTBjallTQ3dCU1d3QkNWSEkwY2pZYkFHSmJBRkpVbXdBaVZoc0FGRll5TWdXR0liSVZsanNBRkZZbUFqTGlNZ0lEeUtPQ01oV1Myd015eXdBQllnc0FsRElDNUhJMGNqWVNCZ3NDQmdackNBWWlNZ0lEeUtPQzJ3TkN3aklDNUdzQUlsUmxKWUlEeFpMckVrQVJRckxiQTFMQ01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0RZc0l5QXVSckFDSlVaU1dDQThXU01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0Rjc3NDNHJJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLeTJ3T0N5d0x5dUtJQ0E4c0FRalFvbzRJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLN0FFUXk2d0pDc3RzRGtzc0FBV3NBUWxzQVFtSUM1SEkwY2pZYkFHUlNzaklEd2dMaU00c1NRQkZDc3RzRG9zc1FrRUpVS3dBQmF3QkNXd0JDVWdMa2NqUnlOaElMQUVJMEt3QmtVcklMQmdVRmdnc0VCUldMTUNJQU1nRzdNQ0pnTWFXVUpDSXlCSHNBUkRzSUJpWUNDd0FDc2dpb3BoSUxBQ1EyQmtJN0FEUTJGa1VGaXdBa05oRzdBRFEyQlpzQU1sc0lCaVliQUNKVVpoT0NNZ1BDTTRHeUVnSUVZalI3QUFLeU5oT0NGWnNTUUJGQ3N0c0Rzc3NDNHJMckVrQVJRckxiQThMTEF2S3lFaklDQThzQVFqUWlNNHNTUUJGQ3V3QkVNdXNDUXJMYkE5TExBQUZTQkhzQUFqUXJJQUFRRVZGQk11c0NvcUxiQStMTEFBRlNCSHNBQWpRcklBQVFFVkZCTXVzQ29xTGJBL0xMRUFBUlFUc0NzcUxiQkFMTEF0S2kyd1FTeXdBQlpGSXlBdUlFYUtJMkU0c1NRQkZDc3RzRUlzc0FralFyQkJLeTJ3UXl5eUFBQTZLeTJ3UkN5eUFBRTZLeTJ3UlN5eUFRQTZLeTJ3Uml5eUFRRTZLeTJ3Unl5eUFBQTdLeTJ3U0N5eUFBRTdLeTJ3U1N5eUFRQTdLeTJ3U2l5eUFRRTdLeTJ3U3l5eUFBQTNLeTJ3VEN5eUFBRTNLeTJ3VFN5eUFRQTNLeTJ3VGl5eUFRRTNLeTJ3VHl5eUFBQTVLeTJ3VUN5eUFBRTVLeTJ3VVN5eUFRQTVLeTJ3VWl5eUFRRTVLeTJ3VXl5eUFBQThLeTJ3VkN5eUFBRThLeTJ3VlN5eUFRQThLeTJ3Vml5eUFRRThLeTJ3Vnl5eUFBQTRLeTJ3V0N5eUFBRTRLeTJ3V1N5eUFRQTRLeTJ3V2l5eUFRRTRLeTJ3V3l5d01Dc3VzU1FCRkNzdHNGd3NzREFyc0RRckxiQmRMTEF3SzdBMUt5MndYaXl3QUJhd01DdXdOaXN0c0Y4c3NERXJMckVrQVJRckxiQmdMTEF4SzdBMEt5MndZU3l3TVN1d05Tc3RzR0lzc0RFcnNEWXJMYkJqTExBeUt5NnhKQUVVS3kyd1pDeXdNaXV3TkNzdHNHVXNzRElyc0RVckxiQm1MTEF5SzdBMkt5MndaeXl3TXlzdXNTUUJGQ3N0c0dnc3NETXJzRFFyTGJCcExMQXpLN0ExS3kyd2FpeXdNeXV3TmlzdHNHc3NLN0FJWmJBREpGQjRzQUVWTUMwQUFFdTRBTWhTV0xFQkFZNVp1UWdBQ0FCaklMQUJJMFFnc0FNamNMQU9SU0FnUzdnQURsRkxzQVpUV2xpd05CdXdLRmxnWmlDS1ZWaXdBaVZoc0FGRll5TmlzQUlqUkxNS0NRVUVLN01LQ3dVRUs3TU9Ed1VFSzFteUJDZ0pSVkpFc3dvTkJnUXJzUVlCUkxFa0FZaFJXTEJBaUZpeEJnTkVzU1lCaUZGWXVBUUFpRml4QmdGRVdWbFpXYmdCLzRXd0JJMnhCUUJFQUFBQSkgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQnpkR0Z1WkdGc2IyNWxQU0p1YnlJL1BnMEtQQ0ZFVDBOVVdWQkZJSE4yWnlCUVZVSk1TVU1nSWkwdkwxY3pReTh2UkZSRUlGTldSeUF4TGpFdkwwVk9JaUFpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2UjNKaGNHaHBZM012VTFaSEx6RXVNUzlFVkVRdmMzWm5NVEV1WkhSa0lpQStEUW84YzNabklIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK0RRbzhiV1YwWVdSaGRHRStEUXBEY21WaGRHVmtJR0o1SUVadmJuUkdiM0puWlNBeU1ERXlNRGN6TVNCaGRDQkdjbWtnU25Wc0lESXhJREF6T2pBNE9qUTVJREl3TVRjTkNpQkNlU0JoWkcxcGJnMEtQQzl0WlhSaFpHRjBZVDROQ2p4a1pXWnpQZzBLUEdadmJuUWdhV1E5SW1samIyNW1iMjUwSWlCb2IzSnBlaTFoWkhZdGVEMGlNVEF5TkNJZ1BnMEtJQ0E4Wm05dWRDMW1ZV05sSUEwS0lDQWdJR1p2Ym5RdFptRnRhV3g1UFNKcFkyOXVabTl1ZENJTkNpQWdJQ0JtYjI1MExYZGxhV2RvZEQwaU5UQXdJZzBLSUNBZ0lHWnZiblF0YzNSeVpYUmphRDBpYm05eWJXRnNJZzBLSUNBZ0lIVnVhWFJ6TFhCbGNpMWxiVDBpTVRBeU5DSU5DaUFnSUNCd1lXNXZjMlV0TVQwaU1pQXdJRFlnTXlBd0lEQWdNQ0F3SURBZ01DSU5DaUFnSUNCaGMyTmxiblE5SWpnNU5pSU5DaUFnSUNCa1pYTmpaVzUwUFNJdE1USTRJZzBLSUNBZ0lIZ3RhR1ZwWjJoMFBTSTNPVElpRFFvZ0lDQWdZbUp2ZUQwaU1DQXRNVEk0SURFd01qUWdPRGsySWcwS0lDQWdJSFZ1WkdWeWJHbHVaUzEwYUdsamEyNWxjM005SWpBaURRb2dJQ0FnZFc1a1pYSnNhVzVsTFhCdmMybDBhVzl1UFNJd0lnMEtJQ0FnSUhWdWFXTnZaR1V0Y21GdVoyVTlJbFVyTURBM09DMUZPREEySWcwS0lDQXZQZzBLUEcxcGMzTnBibWN0WjJ4NWNHZ2dEUW9nTHo0TkNpQWdJQ0E4WjJ4NWNHZ2daMng1Y0dndGJtRnRaVDBpTG01dmRHUmxaaUlnRFFvZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaUxtNXZkR1JsWmlJZ0RRb2dMejROQ2lBZ0lDQThaMng1Y0dnZ1oyeDVjR2d0Ym1GdFpUMGlMbTUxYkd3aUlHaHZjbWw2TFdGa2RpMTRQU0l3SWlBTkNpQXZQZzBLSUNBZ0lEeG5iSGx3YUNCbmJIbHdhQzF1WVcxbFBTSnViMjV0WVhKcmFXNW5jbVYwZFhKdUlpQm9iM0pwZWkxaFpIWXRlRDBpTXpReElpQU5DaUF2UGcwS0lDQWdJRHhuYkhsd2FDQm5iSGx3YUMxdVlXMWxQU0o0SWlCMWJtbGpiMlJsUFNKNElpQm9iM0pwZWkxaFpIWXRlRDBpTVRBd01TSWdEUXBrUFNKTk1qZ3hJRFUwTTNFdE1qY2dMVEVnTFRVeklDMHhhQzA0TTNFdE1UZ2dNQ0F0TXpZdU5TQXROblF0TXpJdU5TQXRNVGd1TlhRdE1qTWdMVE15ZEMwNUlDMDBOUzQxZGkwM05tZzVNVEoyTkRGeE1DQXhOaUF0TUM0MUlETXdkQzB3TGpVZ01UaHhNQ0F4TXlBdE5TQXlPWFF0TVRjZ01qa3VOWFF0TXpFdU5TQXlNaTQxZEMwME9TNDFJRGxvTFRFek0zWXRPVGRvTFRRek9IWTVOM3BOT1RVMUlETXhNSFl0TlRKeE1DQXRNak1nTUM0MUlDMDFNblF3TGpVZ0xUVTRkQzB4TUM0MUlDMDBOeTQxZEMweU5pQXRNekIwTFRNeklDMHhOblF0TXpFdU5TQXROQzQxY1MweE5DQXRNU0F0TWprdU5TQXRNQzQxRFFwMExUSTVMalVnTUM0MWFDMHpNbXd0TkRVZ01USTRhQzAwTXpsc0xUUTBJQzB4TWpob0xUSTVhQzB6TkhFdE1qQWdNQ0F0TkRVZ01YRXRNalVnTUNBdE5ERWdPUzQxZEMweU5TNDFJREl6ZEMweE15NDFJREk1TGpWMExUUWdNekIyTVRZM2FEa3hNWHBOTVRZeklESTBOM0V0TVRJZ01DQXRNakVnTFRndU5YUXRPU0F0TWpFdU5YUTVJQzB5TVM0MWRESXhJQzA0TGpWeE1UTWdNQ0F5TWlBNExqVjBPU0F5TVM0MWRDMDVJREl4TGpWMExUSXlJRGd1TlhwTk16RTJJREV5TTNFdE9DQXRNallnTFRFMElDMDBPSEV0TlNBdE1Ua2dMVEV3TGpVZ0xUTTNkQzAzTGpVZ0xUSTFkQzB6SUMweE5YUXhJQzB4TkM0MURRcDBPUzQxSUMweE1DNDFkREl4TGpVZ0xUUm9NemRvTmpkb09ERm9PREJvTmpSb016WnhNak1nTUNBek5DQXhNblF5SURNNGNTMDFJREV6SUMwNUxqVWdNekF1TlhRdE9TNDFJRE0wTGpWeExUVWdNVGtnTFRFeElETTVhQzB6TmpoNlRUTXpOaUEwT1RoMk1qSTRjVEFnTVRFZ01pNDFJREl6ZERFd0lESXhMalYwTWpBdU5TQXhOUzQxZERNMElEWm9NVGc0Y1RNeElEQWdOVEV1TlNBdE1UUXVOWFF5TUM0MUlDMDFNaTQxZGkweU1qZG9MVE15TjNvaUlDOCtEUW9nSUNBZ1BHZHNlWEJvSUdkc2VYQm9MVzVoYldVOUluTndhVzV1WlhJNUlpQjFibWxqYjJSbFBTSW1JM2hsTjJVNU95SWdEUXBrUFNKTk5URXlJRGc1Tm5FdE1UQXpJREFnTFRFNU5pNDFJQzB6T1M0MWRDMHhOaklnTFRFd05pNDFkQzB4TURrdU5TQXRNVFU1TGpWMExUUTBJQzB4T1RRdU5YRXpJREV4T1NBMU9TQXlNVGt1TlhReE5URWdNVFU0TGpWME1qQTJJRFU0Y1RFM01pQXdJREk1TkNBdE1UTXhkREV5TWlBdE16RTNjVEFnTFRRd0lESTRJQzAyT0hRMk9DQXRNamgwTmpnZ01qaDBNamdnTmpoeE1DQXhNemtnTFRZNExqVWdNalUzZEMweE9EWXVOU0F4T0RZdU5YUXRNalUzSURZNExqVjZUVFV4TWlBdE1USTRjVEV3TXlBd0lERTVOaTQxSURNNUxqVjBNVFl5SURFd05pNDFkREV3T1M0MUlERTFPUzQxZERRMElERTVOQzQxRFFweExUTWdMVEV4T1NBdE5Ua2dMVEl4T1M0MWRDMHhOVEVnTFRFMU9DNDFkQzB5TURZZ0xUVTRjUzB4TVRNZ01DQXRNakE1SURZd2RDMHhOVEV1TlNBeE5qTjBMVFUxTGpVZ01qSTFjVEFnTkRBZ0xUSTRJRFk0ZEMwMk9DQXlPSFF0TmpnZ0xUSTRkQzB5T0NBdE5qaHhNQ0F0TVRNNUlEWTRMalVnTFRJMU4zUXhPRFl1TlNBdE1UZzJMalYwTWpVM0lDMDJPQzQxZWlJZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaWMzQnBibTVsY2kweElpQjFibWxqYjJSbFBTSW1JM2hsTnpJeU95SWdEUXBrUFNKTk1UQXlOQ0F6T0RSeExUSWdPRGNnTFRRM0xqVWdNVGt4TGpWMExURXdPQzQxSURFMk5DNDFjUzB5T1NBeU9TQXROemN1TlNBMk1IUXRPRGN1TlNBME5uRXRNellnTVRRZ0xUZzVJREkwZEMwNU1TQXhNR2d0TVRGeExUZzBJQzB5SUMweE9EVXVOU0F0TkRaMExURTFPUzQxSUMweE1EVnhMVEk0SUMweU9TQXROVGdnTFRjMUxqVjBMVFEwSUMwNE5DNDFjUzB4TkNBdE16VWdMVEl6TGpVZ0xUZzJkQzA1TGpVZ0xUZzRkaTB4TVhFeElDMHpPU0F4TWk0MUlDMDVNaTQxZERJM0xqVWdMVGc1TGpWME5EY2dMVGd3TGpWME5Ua2dMVGN4TGpWME56TXVOU0F0TlRVdU5YUTRNUzQxSUMwME1pNDFEUXB4TXpRZ0xURTBJRGd6SUMweU0zUTROU0F0T1dneE1YRTVNaUF5SURFM05pQXpPWEV6TlNBeE5TQTNOeTQxSURRMWREWTRMalVnTlRoeE1qWWdNamNnTlRRZ056QXVOWFEwTWlBM09DNDFjVEU1SURVd0lESTJJREV3TkdnMGNUSTJJREFnTkRVZ01UZ3VOWFF4T1NBME5TNDFkalYyTUhZd2VrMDVNaklnTWpFMGNTMHpOU0F0T0RBZ0xUazVJQzB4TkRGeExUWXpJQzAyTVNBdE1UUTBJQzA1TW5FdE16RWdMVEV5SUMwM055QXRNakF1TlhRdE9EQWdMVGd1TldndE1UQnhMVGN6SURJZ0xURTJNU0EwTUM0MWRDMHhNemtnT1RFdU5YRXRNalFnTWpVZ0xUVXdJRFkyZEMwek9DQTNNdzBLY1MweE1pQXpNQ0F0TWpBZ056UjBMVGdnTnpkeE1DQXpOaUF4TUM0MUlEZzFkREkwTGpVZ09ETnhNek1nTnpRZ09UTWdNVE14Y1RVNElEVTJJREV6TXlBNE5IRXlPU0F4TVNBM01TNDFJREU1ZERjekxqVWdPSEV6TlNBd0lEZ3lMalVnTFRFd2REYzVMalVnTFRJMGNUY3hJQzB6TWlBeE1qVWdMVGc1Y1RVMElDMDFOaUE0TWlBdE1USTRjVEkzSUMwM01pQXlOU0F0TVRRNWRqQjJMVFZ4TUNBdE1qUWdNVFl1TlNBdE5ESXVOWFEwTUM0MUlDMHlNUzQxY1MwNUlDMDFNaUF0TXpFZ0xURXdNWFl3ZWlJZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaWMzQnBibTVsY2pFaUlIVnVhV052WkdVOUlpWWplR1U0TURZN0lpQU5DbVE5SWswek1ERWdPVGt1TlhFd0lDMHpNQzQxSUMweU1TNDFJQzAxTW5RdE5USXVOU0F0TWpFdU5YRXRNamtnTUNBdE5URWdNakowTFRJeUlEVXhjVEFnTXpFZ01qRXVOU0ExTWk0MWREVXlJREl4TGpWME5USWdMVEl4TGpWME1qRXVOU0F0TlRKNlRUVTROU0F0TVRndU5YRXdJQzB6TUM0MUlDMHlNUzQxSUMwMU1TNDFkQzAxTVM0MUlDMHlNWFF0TlRFdU5TQXlNWFF0TWpFdU5TQTFNUzQxZERJeExqVWdOVEowTlRFdU5TQXlNUzQxZERVeExqVWdMVEl4TGpWME1qRXVOU0F0TlRKNlRURTRNeUF6T0RSeE1DQXRNekFnTFRJeExqVWdMVFV4TGpWMExUVXlJQzB5TVM0MWRDMDFNUzQxSURJeExqVU5DblF0TWpFZ05URXVOWFF5TVNBMU1TNDFkRFV4TGpVZ01qRXVOWFExTWlBdE1qRXVOWFF5TVM0MUlDMDFNUzQxZWswNE56QWdPVGx4TUNBdE1qa2dMVEl5SUMwMU1YUXROVEVnTFRJeWNTMHpNU0F3SUMwMU1pNDFJREl4TGpWMExUSXhMalVnTlRKME1qRXVOU0ExTW5RMU1pQXlNUzQxZERVeUlDMHlNUzQxZERJeExqVWdMVFV5TGpWNlRUTXhPU0EyTmpndU5YRXdJQzB6Tnk0MUlDMHlOeUF0TmpRdU5YUXROalF1TlNBdE1qZDBMVFkwTGpVZ01qZDBMVEkzSURZMExqVjBNamNnTmpRdU5YUTJOQzQxSURJM2REWTBMalVnTFRJM2RESTNJQzAyTkM0MWVrMDVPRGNnTXpnMERRcHhNQ0F0TXpBZ0xUSXhJQzAxTVM0MWRDMDFNUzQxSUMweU1TNDFkQzAxTWlBeU1TNDFkQzB5TVM0MUlEVXhMalYwTWpFdU5TQTFNUzQxZERVeUlESXhMalYwTlRFdU5TQXRNakV1TlhReU1TQXROVEV1TlhwTk5qSXlJRGM0Tmk0MWNUQWdMVFExTGpVZ0xUTXlJQzAzTnk0MWRDMDNPQ0F0TXpKMExUYzRJRE15ZEMwek1pQTNOeTQxZERNeUlEYzNMalYwTnpnZ016SjBOemdnTFRNeWRETXlJQzAzTnk0MWVrMDVNalVnTmpZNWNUQWdMVFUwSUMwek9DQXRPVEYwTFRrd0lDMHpOM0V0TlRRZ01DQXRPVEVnTXpkMExUTTNJRGt4Y1RBZ05USWdNemNnT1RCME9URWdNemh4TlRJZ01DQTVNQ0F0TXpnTkNuUXpPQ0F0T1RCNklpQXZQZzBLSUNBZ0lEeG5iSGx3YUNCbmJIbHdhQzF1WVcxbFBTSnpjR2x1Ym1WeU1pSWdkVzVwWTI5a1pUMGlKaU40WlRZelpqc2lJQTBLWkQwaVRUVXhNaUExT1ROMk1IRXRNalVnTUNBdE5ESXVOU0F4Tnk0MWRDMHhOeTQxSURReUxqVjJNVGM1Y1RBZ01qUWdNVGN1TlNBME1TNDFkRFF5TGpVZ01UY3VOWFEwTWk0MUlDMHhOeTQxZERFM0xqVWdMVFF4TGpWMkxURTNPWEV3SUMweU5TQXRNVGN1TlNBdE5ESXVOWFF0TkRJdU5TQXRNVGN1TlhwTk5URXlJQzB4TURGMk1IRXRNVFVnTUNBdE1qWWdNVEYwTFRFeElESTJkakUzT1hFd0lERTJJREV4SURJM2RESTJJREV4ZERJMklDMHhNWFF4TVNBdE1qZDJMVEUzT1hFd0lDMHhOU0F0TVRFZ0xUSTJkQzB5TmlBdE1URjZUVE0zT0NBMU5qRjJNSEV0TVRRZ01DQXRNamdnT0hRdE1qRWdNakFOQ213dE9Ea2dNVFUxY1MwM0lERXlJQzAzSURJMmNUQWdNak1nTVRZdU5TQXpPUzQxZERNNUxqVWdNVFl1TlhFeE15QXdJREkzSUMwM0xqVjBNakVnTFRFNExqVnNPRGtnTFRFMU5YRTRJQzB4TXlBNElDMHlPSEV3SUMweU5DQXRNVFl1TlNBdE5EQjBMVE01TGpVZ0xURTJlazAzTXpZZ0xUTTNkakJ4TFRJd0lEQWdMVEk1SURFM2JDMDVNQ0F4TlRWeExUUWdOeUF0TkNBeE5uRXdJREUwSURrdU5TQXlOSFF5TXk0MUlERXdjVEl3SURBZ01qa2dMVEUzYkRrd0lDMHhOVFZ4TkNBdE9DQTBJQzB4TjNFd0lDMHhOQ0F0T1M0MUlDMHlNeTQxZEMweU15NDFJQzA1TGpWMk1IcE5NamM1SURRMk5nMEtjUzB4TkNBd0lDMHlOaUEzYkMweE5UVWdPVEJ4TFRFeElEWWdMVEU0TGpVZ01UbDBMVGN1TlNBeU5uRXdJREl4SURFMUxqVWdNell1TlhRek5pNDFJREUxTGpWeE1UUWdNQ0F5TmlBdE4yd3hOVFlnTFRrd2NURXdJQzAySURFNElDMHhPWFE0SUMweU5uRXdJQzB5TVNBdE1UVXVOU0F0TXpZdU5YUXRNemN1TlNBdE1UVXVOWFl3ZWswNU1EQWdNVE13ZGpCeExUZ2dNQ0F0TVRVZ05Hd3RNVFUxSURrd2NTMHhOU0E0SUMweE5TQXlObkV3SURFeUlEZ3VOU0F5TVhReU1TNDFJRGx4T0NBd0lERTFJQzAwYkRFMU5TQXRPVEJ4TVRVZ0xUa2dNVFVnTFRJMmNUQWdMVEV5SUMwNUlDMHlNWFF0TWpFZ0xUbDJNSG9OQ2sweU5ETWdNek0yYUMweE56bHhMVEl3SURBZ0xUTTBJREUwZEMweE5DQXpOSFF4TkNBek5IUXpOQ0F4TkdneE56bHhNakFnTUNBek5DNDFJQzB4TkhReE5DNDFJQzB6TkhRdE1UUXVOU0F0TXpSMExUTTBMalVnTFRFMGVrMDVOakFnTXpVMGFDMHhOemx4TFRFeklEQWdMVEl4TGpVZ09YUXRPQzQxSURJeGREZ3VOU0F5TVhReU1TNDFJRGxvTVRjNWNURXlJREFnTWpFZ0xUbDBPU0F0TWpGMExUa2dMVEl4ZEMweU1TQXRPWHBOTVRJMElERXhOWFl3Y1MweE9DQXdJQzB6TVNBeE15NDFkQzB4TXlBek1TNDFjVEFnTVRFZ05pNDFJREl5TGpWME1UVXVOU0F4Tmk0MWJERTFOU0E0T1hFeE1DQTJJREl5SURZTkNuRXhPU0F3SURNeUlDMHhNM1F4TXlBdE16RnhNQ0F0TVRFZ0xUWXVOU0F0TWpJdU5YUXRNVFV1TlNBdE1UWXVOV3d0TVRVMUlDMDVNSEV0TVRFZ0xUWWdMVEl6SUMwMmVrMDNORFVnTkRnNGNTMHhNeUF3SUMweU1TNDFJRGwwTFRndU5TQXlNWEV3SURFM0lERTFJREkyYkRFMU5TQTVNSEUySURNZ01UUWdNM0V4TWlBd0lESXhJQzA0TGpWME9TQXRNakV1TlhFd0lDMHhOaUF0TVRRZ0xUSTFiQzB4TlRVZ0xUa3djUzAzSUMwMElDMHhOU0F0TkhZd2VrMHlPRGdnTFRRMWNTMHhOeUF3SUMweU9TQXhNblF0TVRJZ01qbHhNQ0F4TVNBMklESXhiRGc1SURFMU5YRTFJRGdnTVRVdU5TQXhNeTQxRFFwME1Ua3VOU0ExTGpWeE1UY2dNQ0F5T1NBdE1USjBNVElnTFRJNWNUQWdMVEV3SUMwMUlDMHhPV3d0T0RrZ0xURTFOWEV0TlNBdE9TQXRNVFV1TlNBdE1UVjBMVEl3TGpVZ0xUWjJNSHBOTmpRMklEVTROM0V0TVRJZ01DQXRNakVnT0M0MWRDMDVJREl4TGpWeE1DQTRJRFFnTVRWc09UQWdNVFUxY1RrZ01UVWdNallnTVRWeE1USWdNQ0F5TVNBdE9YUTVJQzB5TVhFd0lDMDRJQzAwSUMweE5Xd3RPVEFnTFRFMU5YRXRPQ0F0TVRVZ0xUSTJJQzB4TlhZd2VpSWdMejROQ2lBZ1BDOW1iMjUwUGcwS1BDOWtaV1p6UGp3dmMzWm5QZzBLI2ljb25mb250KSBmb3JtYXQoXFxcInN2Z1xcXCIpfS5pY29uZm9udHtmb250LWZhbWlseTppY29uZm9udCFpbXBvcnRhbnQ7Zm9udC1zaXplOjE2cHg7Zm9udC1zdHlsZTpub3JtYWw7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9Lmljb24tc3Bpbm5lcjk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFN0U5XFxcIn0uaWNvbi1zcGlubmVyLTE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFNzIyXFxcIn0uaWNvbi1zcGlubmVyMTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEU4MDZcXFwifS5pY29uLXNwaW5uZXIyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRTYzRlxcXCJ9Lnd2LXNwaW5uZXJbZGF0YS12LTA2N2NjYzFmXXtkaXNwbGF5OmlubGluZS1ibG9jaztvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC1hbmltYXRpb246Y2lyY2xlIDEuMnMgaW5maW5pdGUgbGluZWFyOy1vLWFuaW1hdGlvbjpjaXJjbGUgMS4ycyBpbmZpbml0ZSBsaW5lYXI7YW5pbWF0aW9uOmNpcmNsZSAxLjJzIGluZmluaXRlIGxpbmVhcn1ALXdlYmtpdC1rZXlmcmFtZXMgY2lyY2xlezAle3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Nob3Auc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zaG9wLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWM7IH1cXG5cXG4ud2V1aS10YWJiYXIge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4ud2V1aS1jZWxsX19iZCBwIHtcXG4gIGNvbG9yOiAjNzc3O1xcbiAgZm9udC13ZWlnaHQ6IDIwMDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiY29uc3Qgcm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcvJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2hvbWUudnVlJykpLCAnc2hvcC1ob21lJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnaG9tZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogJ+mmlumhtSdcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2FydCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9jYXJ0LnZ1ZScpKSwgJ3Nob3AtY2FydCcpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2NhcnQnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2NhdGVnb3J5JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2NhdGVnb3J5LnZ1ZScpKSwgJ3Nob3AtY2F0ZWdvcnknKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdjYXRlZ29yeSdcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvb3JkZXItbGlzdCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9vcmRlci1saXN0LnZ1ZScpKSwgJ3Nob3Atb3JkZXItbGlzdCcpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ29yZGVyLWxpc3QnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL29yZGVyLzppZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9vcmRlci52dWUnKSksICdzaG9wLW9yZGVyJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnb3JkZXInLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2Zhdm91cml0ZScsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9mYXZvdXJpdGUudnVlJykpLCAnc2hvcC1mYXZvdXJpdGUnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdmYXZvdXJpdGUnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2NoZWNrb3V0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2NoZWNrb3V0LnZ1ZScpKSwgJ3Nob3AtY2hlY2tvdXQnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdjaGVja291dCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZSxcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy91c2VyJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3VzZXIudnVlJykpLCAnc2hvcC11c2VyJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAndXNlcicsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcHJvZmlsZScsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9maWxlLnZ1ZScpKSwgJ3Nob3AtcHJvZmlsZScpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ3Byb2ZpbGUnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2F2YXRhcicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hdmF0YXIudnVlJykpLCAnc2hvcC1hdmF0YXInKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdhdmF0YXInLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWRkcmVzcycsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hZGRyZXNzLnZ1ZScpKSwgJ3Nob3AtYWRkcmVzcycpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2FkZHJlc3MnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWRkcmVzcy9hZGQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWRkcmVzcy1lZGl0LnZ1ZScpKSwgJ3Nob3AtYWRkcmVzcy1hZGQnKVxyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZSxcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2FkZHJlc3MvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2FkZHJlc3MtZWRpdC52dWUnKSksICdzaG9wLWFkZHJlc3MtZWRpdCcpXHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWJvdXQtdXMnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWJvdXQtdXMudnVlJykpLCAnc2hvcC1hYm91dC11cycpXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2hlbHAnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVscC52dWUnKSksICdzaG9wLWhlbHAnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9oZWxwLzppZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWxwLWRldGFpbC52dWUnKSksICdzaG9wLWhlbHAtZGV0YWlsJylcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvbG9naW4nLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9naW4udnVlJykpLCAnc2hvcC1sb2dpbicpXHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcmVnaXN0ZXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvcmVnaXN0ZXIudnVlJykpLCAnc2hvcC1yZWdpc3RlcicpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ3JlZ2lzdGVyJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3Byb2R1Y3QvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Byb2R1Y3QudnVlJykpLCAnc2hvcC1wcm9kdWN0JylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncHJvZHVjdCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9wYXNzd29yZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9wYXNzd29yZC52dWUnKSksICdzaG9wLXBhc3N3b3JkJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncGFzc3dvcmQnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXNcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3JvdXRlcy5qcyIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pY29uZm9udC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaWNvbmZvbnQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2ljb25mb250LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LmNzc1xuLy8gbW9kdWxlIGlkID0gMTMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXHJcXG5AZm9udC1mYWNlIHtmb250LWZhbWlseTogXFxcImljb25mb250XFxcIjtcXHJcXG4gIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4vaWNvbmZvbnQuZW90P3Q9MTQ4ODk5NDA1ODM0NlwiKSArIFwiKTsgLyogSUU5Ki9cXHJcXG4gIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4vaWNvbmZvbnQuZW90P3Q9MTQ4ODk5NDA1ODM0NlwiKSArIFwiI2llZml4KSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksIFxcclxcbiAgdXJsKFwiICsgcmVxdWlyZShcIi4vaWNvbmZvbnQud29mZj90PTE0ODg5OTQwNTgzNDZcIikgKyBcIikgZm9ybWF0KCd3b2ZmJyksIFxcclxcbiAgdXJsKFwiICsgcmVxdWlyZShcIi4vaWNvbmZvbnQudHRmP3Q9MTQ4ODk5NDA1ODM0NlwiKSArIFwiKSBmb3JtYXQoJ3RydWV0eXBlJyksIFxcclxcbiAgdXJsKFwiICsgcmVxdWlyZShcIi4vaWNvbmZvbnQuc3ZnP3Q9MTQ4ODk5NDA1ODM0NlwiKSArIFwiI2ljb25mb250KSBmb3JtYXQoJ3N2ZycpOyAvKiBpT1MgNC4xLSAqL1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbmZvbnQge1xcclxcbiAgZm9udC1mYW1pbHk6XFxcImljb25mb250XFxcIiAhaW1wb3J0YW50O1xcclxcbiAgZm9udC1zaXplOjE2cHg7XFxyXFxuICBmb250LXN0eWxlOm5vcm1hbDtcXHJcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcclxcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tZWRpdDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MUVcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tZmF2b3JmaWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwMFxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1mYXZvcjpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDFcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbG9jYXRpb246YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjAyXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXBob25lOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwM1xcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1yb3VuZGNoZWNrZmlsbDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDRcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tdGltZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDVcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbGlrZWZpbGw6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjA2XFxcIjsgfVxcclxcblxcclxcbi5pY29uLWxpa2U6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjA3XFxcIjsgfVxcclxcblxcclxcbi5pY29uLWRlbGl2ZXI6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjA4XFxcIjsgfVxcclxcblxcclxcbi5pY29uLXBheTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDlcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tc2hvcDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MEFcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbGlzdDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MEJcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbW9yZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MENcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tc2V0dGluZ3M6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjBEXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXF1ZXN0aW9uOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwRVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1yZWZyZXNoOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwRlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1tb3JlYW5kcm9pZDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MTBcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tY2FydDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MTFcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tZGVsZXRlOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxMlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1ob21lOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxM1xcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1tZXNzYWdlOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxNFxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1sb2NrOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxNVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1nb29kczpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MTZcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24taW5mbzpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MTdcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tcmVjaGFyZ2U6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjE4XFxcIjsgfVxcclxcblxcclxcbi5pY29uLXNoYXJlOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxOVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1tb2JpbGU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjFBXFxcIjsgfVxcclxcblxcclxcbi5pY29uLWJpYW5qaTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MUZcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbm90aWNlOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxQlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1wZW9wbGU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjFDXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXRhZzpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MjBcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tZ29vZHNsaWdodDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MURcXFwiOyB9XFxyXFxuXFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvZm9udHMvaWNvbmZvbnQud29mZj85NmIxZWVjNDg4NjAxMDg2ZjE0NTNlOTBjNTZhOTVlNFwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC53b2ZmP3Q9MTQ4ODk5NDA1ODM0NlxuLy8gbW9kdWxlIGlkID0gMTMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiL2J1aWxkL2ZvbnRzL2ljb25mb250LnR0Zj9lODAwOGVlYTUyYTk4NjIyNTUzZGZlYzNkNjg3N2NiOVwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC50dGY/dD0xNDg4OTk0MDU4MzQ2XG4vLyBtb2R1bGUgaWQgPSAxMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvZm9udHMvaWNvbmZvbnQuc3ZnP2U0NDBhNWIzNzUxOWQxMWYwMjc1NDNiMWExNDczMjM4XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LnN2Zz90PTE0ODg5OTQwNTgzNDZcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9tYWlubWVudS52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtNjIwMDJkNDVcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdfTkc3LjBcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXG1haW5tZW51LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gbWFpbm1lbnUudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTYyMDAyZDQ1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjIwMDJkNDVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tYWlubWVudS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjZlNTczYmY3XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4jdGFiYmFyIC53ZXVpX3RhYmJhcltkYXRhLXYtNjIwMDJkNDVdIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG59XFxuI3RhYmJhciAud2V1aV90YWJiYXIgLndldWlfdGFiYmFyX2l0ZW0gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICM2NjY7XFxufVxcbiN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGNvbG9yOiAjMDliYjA3O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFdfTkc3LjAvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtDQUFFO0FBQ1o7SUFDRSxnQkFBZ0I7SUFDaEIsWUFBWTtDQUFFO0FBQ2hCO0lBQ0UsZUFBZTtDQUFFXCIsXCJmaWxlXCI6XCJtYWlubWVudS52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3RhYmJhciAud2V1aV90YWJiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwOyB9XFxuICAjdGFiYmFyIC53ZXVpX3RhYmJhciAud2V1aV90YWJiYXJfaXRlbSAuaWNvbiB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICM2NjY7IH1cXG4gICN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24gLmljb24ge1xcbiAgICBjb2xvcjogIzA5YmIwNzsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCI8dGVtcGxhdGU+XHJcbiAgPHd2LXRhYmJhciB2LWlmPVwibWVudVZpc2libGVcIiBmaXhlZD5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9cIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjEzOzwvaT5cclxuICAgICAgPHNwYW4+6aaW6aG1PC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9jYXRlZ29yeVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiBzbG90PVwiaWNvblwiPiYjeGU2MGI7PC9pPlxyXG4gICAgICA8c3Bhbj7liIbnsbs8L3NwYW4+XHJcbiAgICA8L3d2LXRhYmJhci1pdGVtPlxyXG4gICAgPHd2LXRhYmJhci1pdGVtIHRvPVwiL2NhcnRcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjExOzwvaT5cclxuICAgICAgPHNwYW4+6LSt54mp6L2mPC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi91c2VyXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxYzs8L2k+XHJcbiAgICAgIDxzcGFuPuaIkeeahDwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgPC93di10YWJiYXI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICAgIG1lbnVWaXNpYmxlOiBzdGF0ZSA9PiBzdGF0ZS5pc01haW5NZW51VmlzaWJsZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7fVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgI3RhYmJhciAud2V1aV90YWJiYXIge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgYm90dG9tOiAwO1xyXG5cclxuICAgIC53ZXVpX3RhYmJhcl9pdGVtIHtcclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24ge1xyXG4gICAgICAuaWNvbiB7XHJcbiAgICAgICAgY29sb3I6ICMwOWJiMDc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBtYWlubWVudS52dWU/NjNiOTQ0Y2YiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gKF92bS5tZW51VmlzaWJsZSkgPyBfYygnd3YtdGFiYmFyJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImZpeGVkXCI6IFwiXCJcbiAgICB9XG4gIH0sIFtfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6Yk1wiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLpppbpobVcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvY2F0ZWdvcnlcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7piLXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIuWIhuexu1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9jYXJ0XCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6YkVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLotK3nianovaZcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvdXNlclwiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumJxcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi5oiR55qEXCIpXSldKV0sIDEpIDogX3ZtLl9lKClcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjIwMDJkNDVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5Il0sInNvdXJjZVJvb3QiOiIifQ==