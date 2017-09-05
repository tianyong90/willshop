webpackJsonp([22],[
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(36)('wks');
var uid = __webpack_require__(37);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var ctx = __webpack_require__(13);
var hide = __webpack_require__(7);
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
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(21)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(14);
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
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(56);
var toPrimitive = __webpack_require__(57);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 18 */,
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(34);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys');
var uid = __webpack_require__(37);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(15).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(14);

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
/* 28 */,
/* 29 */,
/* 30 */
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

var	fixUrls = __webpack_require__(98);

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
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(59);
var enumBugKeys = __webpack_require__(38);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(17);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(41);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(68);
var hide = __webpack_require__(7);
var has = __webpack_require__(16);
var Iterators = __webpack_require__(12);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(72);
var ITERATOR = __webpack_require__(1)('iterator');
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
/* 41 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(17);
var TAG = __webpack_require__(1)('toStringTag');
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(14);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var invoke = __webpack_require__(83);
var html = __webpack_require__(42);
var cel = __webpack_require__(22);
var global = __webpack_require__(0);
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
  if (__webpack_require__(17)(process) == 'process') {
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
/* 46 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(27);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.eot?bea416156d8549b6116cda2383b7925f";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(53);

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
/* 50 */,
/* 51 */
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
/* 52 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(58) });


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(21)(function () {
  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(32);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(52);
var toObject = __webpack_require__(39);
var IObject = __webpack_require__(34);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(21)(function () {
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(20);
var arrayIndexOf = __webpack_require__(60)(false);
var IE_PROTO = __webpack_require__(25)('IE_PROTO');

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(61);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
__webpack_require__(66);
__webpack_require__(73);
__webpack_require__(77);
__webpack_require__(88);
__webpack_require__(89);
module.exports = __webpack_require__(4).Promise;


/***/ }),
/* 65 */
/***/ (function(module, exports) {



/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(70);
var descriptor = __webpack_require__(33);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(71);
var enumBugKeys = __webpack_require__(38);
var IE_PROTO = __webpack_require__(25)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(22)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(42).appendChild(iframe);
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(32);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(39);
var IE_PROTO = __webpack_require__(25)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
var global = __webpack_require__(0);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(12);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(75);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(12);
var toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
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
/* 75 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(41);
var global = __webpack_require__(0);
var ctx = __webpack_require__(13);
var classof = __webpack_require__(43);
var $export = __webpack_require__(9);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(14);
var anInstance = __webpack_require__(78);
var forOf = __webpack_require__(79);
var speciesConstructor = __webpack_require__(44);
var task = __webpack_require__(45).set;
var microtask = __webpack_require__(84)();
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(46);
var promiseResolve = __webpack_require__(47);
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
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
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
  Internal.prototype = __webpack_require__(85)($Promise.prototype, {
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
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(86)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(87)(function (iter) {
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
/* 78 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var call = __webpack_require__(80);
var isArrayIter = __webpack_require__(81);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(35);
var getIterFn = __webpack_require__(82);
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(12);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(43);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(12);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 83 */
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(45).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(17)(process) == 'process';

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var dP = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(11);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(9);
var core = __webpack_require__(4);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(44);
var promiseResolve = __webpack_require__(47);

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(27);
var perform = __webpack_require__(46);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
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
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(30)(content, options);
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url(" + __webpack_require__(48) + "); /* IE9*/\r\n  src: url(" + __webpack_require__(48) + "#iefix) format('embedded-opentype'), \r\n  url(" + __webpack_require__(104) + ") format('woff'), \r\n  url(" + __webpack_require__(105) + ") format('truetype'), \r\n  url(" + __webpack_require__(106) + "#iconfont) format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-edit:before { content: \"\\E61E\"; }\r\n\r\n.icon-favorfill:before { content: \"\\E600\"; }\r\n\r\n.icon-favor:before { content: \"\\E601\"; }\r\n\r\n.icon-location:before { content: \"\\E602\"; }\r\n\r\n.icon-phone:before { content: \"\\E603\"; }\r\n\r\n.icon-roundcheckfill:before { content: \"\\E604\"; }\r\n\r\n.icon-time:before { content: \"\\E605\"; }\r\n\r\n.icon-likefill:before { content: \"\\E606\"; }\r\n\r\n.icon-like:before { content: \"\\E607\"; }\r\n\r\n.icon-deliver:before { content: \"\\E608\"; }\r\n\r\n.icon-pay:before { content: \"\\E609\"; }\r\n\r\n.icon-shop:before { content: \"\\E60A\"; }\r\n\r\n.icon-list:before { content: \"\\E60B\"; }\r\n\r\n.icon-more:before { content: \"\\E60C\"; }\r\n\r\n.icon-settings:before { content: \"\\E60D\"; }\r\n\r\n.icon-question:before { content: \"\\E60E\"; }\r\n\r\n.icon-refresh:before { content: \"\\E60F\"; }\r\n\r\n.icon-moreandroid:before { content: \"\\E610\"; }\r\n\r\n.icon-cart:before { content: \"\\E611\"; }\r\n\r\n.icon-delete:before { content: \"\\E612\"; }\r\n\r\n.icon-home:before { content: \"\\E613\"; }\r\n\r\n.icon-message:before { content: \"\\E614\"; }\r\n\r\n.icon-lock:before { content: \"\\E615\"; }\r\n\r\n.icon-goods:before { content: \"\\E616\"; }\r\n\r\n.icon-info:before { content: \"\\E617\"; }\r\n\r\n.icon-recharge:before { content: \"\\E618\"; }\r\n\r\n.icon-share:before { content: \"\\E619\"; }\r\n\r\n.icon-mobile:before { content: \"\\E61A\"; }\r\n\r\n.icon-bianji:before { content: \"\\E61F\"; }\r\n\r\n.icon-notice:before { content: \"\\E61B\"; }\r\n\r\n.icon-people:before { content: \"\\E61C\"; }\r\n\r\n.icon-tag:before { content: \"\\E620\"; }\r\n\r\n.icon-goodslight:before { content: \"\\E61D\"; }\r\n\r\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.woff?96b1eec488601086f1453e90c56a95e4";

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.ttf?e8008eea52a98622553dfec3d6877cb9";

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = "/build/fonts/iconfont.svg?e440a5b37519d11f027543b1a1473238";

/***/ }),
/* 107 */,
/* 108 */,
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
/* 122 */
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

var listToStyles = __webpack_require__(123)

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
/* 123 */
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
/* 124 */
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
/* 125 */,
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(31);

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
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(63);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(90);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _weVue = __webpack_require__(107);

var _weVue2 = _interopRequireDefault(_weVue);

__webpack_require__(231);

__webpack_require__(233);

var _axios = __webpack_require__(99);

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = __webpack_require__(101);

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _index = __webpack_require__(126);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(124);

var _config2 = _interopRequireDefault(_config);

var _routes = __webpack_require__(235);

var _routes2 = _interopRequireDefault(_routes);

var _vuex = __webpack_require__(31);

__webpack_require__(102);

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
    'mainmenu': __webpack_require__(236)
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
/* 229 */,
/* 230 */,
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(232);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(30)(content, options);
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
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n * WeUI v1.1.2 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:-apple-system-font,Helvetica Neue,sans-serif}*{margin:0;padding:0}a img{border:0}a{text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}@font-face{font-weight:400;font-style:normal;font-family:weui;src:url(\"data:application/octet-stream;base64,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\") format(\"truetype\")}[class*=\" weui-icon-\"],[class^=weui-icon-]{display:inline-block;vertical-align:middle;font:normal normal normal 14px/1 weui;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased}[class*=\" weui-icon-\"]:before,[class^=weui-icon-]:before{display:inline-block;margin-left:.2em;margin-right:.2em}.weui-icon-circle:before{content:\"\\EA01\"}.weui-icon-download:before{content:\"\\EA02\"}.weui-icon-info:before{content:\"\\EA03\"}.weui-icon-safe-success:before{content:\"\\EA04\"}.weui-icon-safe-warn:before{content:\"\\EA05\"}.weui-icon-success:before{content:\"\\EA06\"}.weui-icon-success-circle:before{content:\"\\EA07\"}.weui-icon-success-no-circle:before{content:\"\\EA08\"}.weui-icon-waiting:before{content:\"\\EA09\"}.weui-icon-waiting-circle:before{content:\"\\EA0A\"}.weui-icon-warn:before{content:\"\\EA0B\"}.weui-icon-info-circle:before{content:\"\\EA0C\"}.weui-icon-cancel:before{content:\"\\EA0D\"}.weui-icon-search:before{content:\"\\EA0E\"}.weui-icon-clear:before{content:\"\\EA0F\"}.weui-icon-back:before{content:\"\\EA10\"}.weui-icon-delete:before{content:\"\\EA11\"}[class*=\" weui-icon_\"]:before,[class^=weui-icon_]:before{margin:0}.weui-icon-success{font-size:23px;color:#09bb07}.weui-icon-waiting{font-size:23px;color:#10aeff}.weui-icon-warn{font-size:23px;color:#f43530}.weui-icon-info{font-size:23px;color:#10aeff}.weui-icon-success-circle,.weui-icon-success-no-circle{font-size:23px;color:#09bb07}.weui-icon-waiting-circle{font-size:23px;color:#10aeff}.weui-icon-circle{font-size:23px;color:#c9c9c9}.weui-icon-download,.weui-icon-info-circle{font-size:23px;color:#09bb07}.weui-icon-safe-success{color:#09bb07}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#f43530;font-size:22px}.weui-icon-clear,.weui-icon-search{color:#b2b2b2;font-size:14px}.weui-icon-delete.weui-icon_gallery-delete{color:#fff;font-size:22px}.weui-icon_msg{font-size:93px}.weui-icon_msg.weui-icon-warn{color:#f76260}.weui-icon_msg-primary{font-size:93px}.weui-icon_msg-primary.weui-icon-warn{color:#ffbe00}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.55555556;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn:after{content:\" \";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#000;background-color:#f8f8f8}.weui-btn_default:not(.weui-btn_disabled):visited{color:#000}.weui-btn_default:not(.weui-btn_disabled):active{color:rgba(0,0,0,.6);background-color:#dedede}.weui-btn_primary{background-color:#1aad19}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#179b16}.weui-btn_warn{background-color:#e64340}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_warn:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#ce3c39}.weui-btn_disabled{color:hsla(0,0%,100%,.6)}.weui-btn_disabled.weui-btn_default{color:rgba(0,0,0,.3);background-color:#f7f7f7}.weui-btn_disabled.weui-btn_primary{background-color:#9ed99d}.weui-btn_disabled.weui-btn_warn{background-color:#ec8b89}.weui-btn_loading .weui-loading{margin:-.2em .34em 0 0}.weui-btn_loading.weui-btn_primary,.weui-btn_loading.weui-btn_warn{color:hsla(0,0%,100%,.6)}.weui-btn_loading.weui-btn_primary{background-color:#179b16}.weui-btn_loading.weui-btn_warn{background-color:#ce3c39}.weui-btn_plain-primary{color:#1aad19;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:rgba(26,173,25,.6);border-color:rgba(26,173,25,.6)}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:rgba(53,53,53,.6);border-color:rgba(53,53,53,.6)}.weui-btn_plain-default:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2)}button.weui-btn,input.weui-btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,button.weui-btn_mini,input.weui-btn_inline,input.weui-btn_mini{width:auto}button.weui-btn_plain-default,button.weui-btn_plain-primary,input.weui-btn_plain-default,input.weui-btn_plain-primary{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;padding:0 1.32em;line-height:2.3;font-size:13px}.weui-btn+.weui-btn{margin-top:15px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:15px}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-btn-area_inline{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-btn-area_inline .weui-btn{margin-top:auto;margin-right:15px;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-btn-area_inline .weui-btn:last-child{margin-right:0}.weui-cells{margin-top:1.17647059em;background-color:#fff;line-height:1.47058824;font-size:17px;overflow:hidden;position:relative}.weui-cells:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells:after,.weui-cells:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5;z-index:2}.weui-cells:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells__title+.weui-cells{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px;z-index:2}.weui-cell:first-child:before{display:none}.weui-cell_primary{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_swiped{display:block;padding:0}.weui-cell_swiped>.weui-cell__bd{position:relative;z-index:1;background-color:#fff}.weui-cell_swiped>.weui-cell__ft{position:absolute;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;color:#fff}.weui-swiped-btn{display:block;padding:10px 1em;line-height:1.47058824;color:inherit}.weui-swiped-btn_default{background-color:#c7c7cc}.weui-swiped-btn_warn{background-color:#ff3b30}.weui-cell_access{-webkit-tap-highlight-color:rgba(0,0,0,0);color:inherit}.weui-cell_access:active{background-color:#ececec}.weui-cell_access .weui-cell__ft{padding-right:13px;position:relative}.weui-cell_access .weui-cell__ft:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:first-child:before{display:block}.weui-check__label{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999em}.weui-cells_radio .weui-cell__ft{padding-left:.35em}.weui-cells_radio .weui-check:checked+.weui-icon-checked:before{display:block;content:\"\\EA08\";color:#09bb07;font-size:16px}.weui-cells_checkbox .weui-cell__hd{padding-right:.35em}.weui-cells_checkbox .weui-icon-checked:before{content:\"\\EA01\";color:#c9c9c9;font-size:23px;display:block}.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before{content:\"\\EA06\";color:#09bb07}.weui-label{display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui-input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.47058824em;line-height:1.47058824}.weui-input::-webkit-inner-spin-button,.weui-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui-textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn .weui-textarea-counter{color:#e64340}.weui-toptips{display:none;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-cells_form .weui-cell__ft{font-size:0}.weui-cells_form .weui-icon-warn{display:none}.weui-cells_form input,.weui-cells_form label[for],.weui-cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-cell_warn{color:#e64340}.weui-cell_warn .weui-icon-warn{display:inline-block}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview:after,.weui-form-preview:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-form-preview:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-form-preview__hd .weui-form-preview__value{font-style:normal;font-size:1.6em}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-form-preview__ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}button.weui-form-preview__btn{background-color:transparent;border:0;outline:0;line-height:inherit;font-size:inherit}.weui-form-preview__btn:active{background-color:#eee}.weui-form-preview__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-cell_select .weui-select{padding-right:30px}.weui-cell_select .weui-cell__bd:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select{-webkit-appearance:none;border:0;outline:0;background-color:transparent;width:100%;font-size:inherit;height:45px;line-height:45px;position:relative;z-index:1;padding-left:15px}.weui-cell_select-before{padding-right:15px}.weui-cell_select-before .weui-select{width:105px;box-sizing:border-box}.weui-cell_select-before .weui-cell__hd{position:relative}.weui-cell_select-before .weui-cell__hd:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-cell_select-before .weui-cell__hd:before{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-cell_select-before .weui-cell__bd{padding-left:15px}.weui-cell_select-before .weui-cell__bd:after{display:none}.weui-cell_select-after{padding-left:15px}.weui-cell_select-after .weui-select{padding-left:0}.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:45px;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:45px;font-size:17px;color:#3cc51f}button.weui-vcode-btn{background-color:transparent;border-top:0;border-right:0;border-bottom:0;outline:0}.weui-vcode-btn:active{color:#52a341}.weui-gallery{display:none;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;z-index:1000}.weui-gallery__img{position:absolute;top:0;right:0;bottom:60px;left:0;background:50% no-repeat;background-size:contain}.weui-gallery__opr{position:absolute;right:0;bottom:0;left:0;background-color:#0d0d0d;color:#fff;line-height:60px;text-align:center}.weui-gallery__del{display:block}.weui-cell_switch{padding-top:6.5px;padding-bottom:6.5px}.weui-switch{-webkit-appearance:none;-moz-appearance:none;appearance:none}.weui-switch,.weui-switch-cp__box{position:relative;width:52px;height:32px;border:1px solid #dfdfdf;outline:0;border-radius:16px;box-sizing:border-box;background-color:#dfdfdf;transition:background-color .1s,border .1s}.weui-switch-cp__box:before,.weui-switch:before{content:\" \";position:absolute;top:0;left:0;width:50px;height:30px;border-radius:15px;background-color:#fdfdfd;transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1)}.weui-switch-cp__box:after,.weui-switch:after{content:\" \";position:absolute;top:0;left:0;width:30px;height:30px;border-radius:15px;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4);transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35)}.weui-switch-cp__input:checked~.weui-switch-cp__box,.weui-switch:checked{border-color:#04be02;background-color:#04be02}.weui-switch-cp__input:checked~.weui-switch-cp__box:before,.weui-switch:checked:before{-webkit-transform:scale(0);transform:scale(0)}.weui-switch-cp__input:checked~.weui-switch-cp__box:after,.weui-switch:checked:after{-webkit-transform:translateX(20px);transform:translateX(20px)}.weui-switch-cp__input{position:absolute;left:-9999px}.weui-switch-cp__box{display:block}.weui-uploader__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__files{list-style:none}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px;width:79px;height:79px;background:no-repeat 50%;background-size:cover}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:\" \";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file_status .weui-uploader__file-content{display:block}.weui-uploader__file-content{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__file-content .weui-icon-warn{display:inline-block}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:\" \";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-msg{padding-top:36px;text-align:center}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__text-area a{color:#586c94}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}.weui-msg__extra-area a{color:#586c94}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-article{padding:20px 15px;font-size:15px}.weui-article section{margin-bottom:1.5em}.weui-article h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article h2{font-size:16px}.weui-article h2,.weui-article h3{font-weight:400;margin-bottom:.34em}.weui-article h3{font-size:15px}.weui-article *{max-width:100%;box-sizing:border-box;word-wrap:break-word}.weui-article p{margin:0 0 .8em}.weui-tabbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.weui-tabbar:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #c0bfc4;color:#c0bfc4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-tabbar__item{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:5px 0 0;font-size:0;color:#999;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#09bb07}.weui-tabbar__icon{display:inline-block;width:27px;height:27px}.weui-tabbar__icon>i,i.weui-tabbar__icon{font-size:24px;color:#999}.weui-tabbar__icon img{width:100%;height:100%}.weui-tabbar__label{text-align:center;color:#999;font-size:10px;line-height:1.8}.weui-navbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;top:0;width:100%;background-color:#fafafa}.weui-navbar:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #ccc;color:#ccc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-navbar+.weui-tab__panel{padding-top:50px;padding-bottom:0}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-navbar__item:active{background-color:#ededed}.weui-navbar__item.weui-bar__item_on{background-color:#eaeaea}.weui-navbar__item:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #ccc;color:#ccc;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-navbar__item:last-child:after{display:none}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-bottom:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-tab__content{display:none}.weui-progress{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-progress__bar{background-color:#ebebeb;height:3px;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-progress__inner-bar{width:0;height:100%;background-color:#09bb07}.weui-progress__opr{display:block;margin-left:15px;font-size:0}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel:after,.weui-panel:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-panel:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box:first-child:before{display:none}a.weui-media-box{color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0)}a.weui-media-box:active{background-color:#ececec}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box_text .weui-media-box__title{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-media-box_appmsg .weui-media-box__hd{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box_appmsg .weui-media-box__thumb{width:100%;max-height:100%;vertical-align:top}.weui-media-box_appmsg .weui-media-box__bd{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-media-box_small-appmsg .weui-cells{margin-top:0}.weui-media-box_small-appmsg .weui-cells:before{display:none}.weui-grids{position:relative;overflow:hidden}.weui-grids:before{right:0;height:1px;border-top:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grids:after,.weui-grids:before{content:\" \";position:absolute;left:0;top:0;color:#d9d9d9}.weui-grids:after{width:1px;bottom:0;border-left:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box}.weui-grid:before{top:0;width:1px;border-right:1px solid #d9d9d9;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid:after,.weui-grid:before{content:\" \";position:absolute;right:0;bottom:0;color:#d9d9d9}.weui-grid:after{left:0;height:1px;border-bottom:1px solid #d9d9d9;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grid:active{background-color:#ececec}.weui-grid__icon{width:28px;height:28px;margin:0 auto}.weui-grid__icon img{display:block;width:100%;height:100%}.weui-grid__icon+.weui-grid__label{margin-top:5px}.weui-grid__label{display:block;color:#000;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-footer,.weui-grid__label{text-align:center;font-size:14px}.weui-footer{color:#999}.weui-footer a{color:#586c94}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px}.weui-footer__link:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #c7c7c7;color:#c7c7c7;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5);left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-flex{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-flex__item{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.weui-dialog__hd{padding:1.3em 1.6em .5em}.weui-dialog__title{font-weight:400;font-size:18px}.weui-dialog__bd{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.weui-dialog__ft{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-dialog__btn{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.weui-dialog__btn:active{background-color:#eee}.weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-dialog__btn:first-child:after{display:none}.weui-dialog__btn_default{color:#353535}.weui-dialog__btn_primary{color:#0bb20c}.weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-dialog__title{font-size:21px}.weui-skin_android .weui-dialog__hd{text-align:left}.weui-skin_android .weui-dialog__bd{color:#999;padding:.25em 1.6em 2em;font-size:17px;text-align:left}.weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.weui-skin_android .weui-dialog__ft:after{display:none}.weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.weui-skin_android .weui-dialog__btn:after{display:none}.weui-skin_android .weui-dialog__btn:active,.weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,.06)}.weui-skin_android .weui-dialog__btn:last-child{margin-right:-.8em}.weui-skin_android .weui-dialog__btn_default{color:gray}@media screen and (min-width:1024px){.weui-dialog{width:35%}}.weui-toast{position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:hsla(0,0%,7%,.7);text-align:center;border-radius:5px;color:#fff}.weui-icon_toast{margin:22px 0 0;display:block}.weui-icon_toast.weui-icon-success-no-circle:before{color:#fff;font-size:55px}.weui-icon_toast.weui-loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline}.weui-toast__content{margin:0 0 15px}.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-actionsheet__title{position:relative;height:65px;padding:0 20px;line-height:1.4;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;font-size:14px;color:#888;background:#fcfcfd}.weui-actionsheet__title:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__title .weui-actionsheet__title-text{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-actionsheet__menu{background-color:#fcfcfd}.weui-actionsheet__action{margin-top:6px;background-color:#fcfcfd}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{-webkit-transform:translate(0);transform:translate(0)}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore_line .weui-loadmore__tips{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore_dot .weui-loadmore__tips{padding:0 .16em}.weui-loadmore_dot .weui-loadmore__tips:before{content:\" \";width:4px;height:4px;border-radius:50%;background-color:#e5e5e5;display:inline-block;position:relative;vertical-align:0;top:-.16em}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#f43530;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;background-color:#efeff4}.weui-search-bar:before{top:0;border-top:1px solid #d7d6dc;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar:after,.weui-search-bar:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#d7d6dc}.weui-search-bar:after{bottom:0;border-bottom:1px solid #d7d6dc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{display:block}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label{display:none}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-ms-flex:auto;flex:auto;background-color:#efeff4}.weui-search-bar__form:after{content:\"\";position:absolute;left:0;top:0;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:10px;border:1px solid #e6e6ea;box-sizing:border-box;background:#fff}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;height:100%;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__box .weui-search-bar__input{padding:4px 0;width:100%;height:1.42857143em;border:0;font-size:14px;line-height:1.42857143em;box-sizing:content-box;background:transparent}.weui-search-bar__box .weui-search-bar__input:focus{outline:none}.weui-search-bar__box .weui-icon-search{position:absolute;left:10px;top:0;line-height:28px}.weui-search-bar__box .weui-icon-clear{position:absolute;top:0;right:0;padding:0 10px;line-height:28px}.weui-search-bar__label{position:absolute;top:1px;right:1px;bottom:1px;left:1px;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff}.weui-search-bar__label span{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__label .weui-icon-search{margin-right:5px}.weui-search-bar__cancel-btn{display:none;margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}.weui-search-bar__input:not(:valid)~.weui-icon-clear{display:none}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}.weui-picker{position:fixed;width:100%;left:0;bottom:0;z-index:5000;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateY(100%);transform:translateY(100%);transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-picker__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}.weui-picker__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__action{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#1aad19}.weui-picker__action:first-child{text-align:left;color:#888}.weui-picker__action:last-child{text-align:right}.weui-picker__bd{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;height:238px;overflow:hidden}.weui-picker__group{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:100%}.weui-picker__mask{top:0;height:100%;margin:0 auto;background:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat;-webkit-transform:translateZ(0);transform:translateZ(0)}.weui-picker__indicator,.weui-picker__mask{position:absolute;left:0;width:100%;z-index:3}.weui-picker__indicator{height:34px;top:102px}.weui-picker__indicator:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__indicator:after,.weui-picker__indicator:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-picker__indicator:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__content{position:absolute;top:0;left:0;width:100%}.weui-picker__item{padding:0;height:34px;line-height:34px;text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.weui-picker__item_disabled{color:#999}@-webkit-keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.weui-animate-slide-up{-webkit-animation:a ease .3s forwards;animation:a ease .3s forwards}@-webkit-keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.weui-animate-slide-down{-webkit-animation:b ease .3s forwards;animation:b ease .3s forwards}@-webkit-keyframes c{0%{opacity:0}to{opacity:1}}@keyframes c{0%{opacity:0}to{opacity:1}}.weui-animate-fade-in{-webkit-animation:c ease .3s forwards;animation:c ease .3s forwards}@-webkit-keyframes d{0%{opacity:1}to{opacity:0}}@keyframes d{0%{opacity:1}to{opacity:0}}.weui-animate-fade-out{-webkit-animation:d ease .3s forwards;animation:d ease .3s forwards}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree a{color:#586c94}.weui-agree__text{color:#999}.weui-agree__checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:0;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:13px;height:13px;position:relative;vertical-align:0;top:2px}.weui-agree__checkbox:checked:before{font-family:weui;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-align:center;speak:none;display:inline-block;vertical-align:middle;text-decoration:inherit;content:\"\\EA08\";color:#09bb07;font-size:13px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-48%) scale(.73);transform:translate(-50%,-48%) scale(.73)}.weui-agree__checkbox:disabled{background-color:#e1e1e1}.weui-agree__checkbox:disabled:before{color:#adadad}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:e 1s steps(12) infinite;animation:e 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading,.weui-loading.weui-loading_transparent{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\")}@-webkit-keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.weui-slider{padding:15px 18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.weui-slider__inner{position:relative;height:2px;background-color:#e9e9e9}.weui-slider__track{height:2px;background-color:#1aad19;width:0}.weui-slider__handler{position:absolute;left:0;top:50%;width:28px;height:28px;margin-left:-14px;margin-top:-14px;border-radius:50%;background-color:#fff;box-shadow:0 0 4px rgba(0,0,0,.2)}.weui-slider-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-slider-box .weui-slider{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-slider-box__value{margin-left:.5em;min-width:24px;color:#888;text-align:center;font-size:14px}.weui-toptips[data-v-1a7bec2b]{display:block}.wv-header[data-v-f6f5c16a]{display:flex;align-items:center;box-sizing:border-box;width:100%;height:50px;line-height:1;padding:0 10px;margin:0;color:#fff;position:relative;white-space:nowrap;z-index:500}.wv-header .left[data-v-f6f5c16a]{display:block;overflow:hidden;float:left;font-size:35px;line-height:35px;font-weight:100}.wv-header .wv-header-title[data-v-f6f5c16a]{font-size:23px;font-weight:0;text-align:center;flex:1}.wv-header.is-fixed[data-v-f6f5c16a]{position:fixed;left:0;top:0}.wv-picker-slot-divider[data-v-c9e4e9e0]{transform:translateY(106px)}.wv-popup-body[data-v-87a08ef6]{display:block;background-color:#fff;position:fixed;width:100%;left:0;bottom:0;z-index:5000;transform:translateY(100%);transition:transform .3s}.wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}.weui-icon_toast[data-v-bafb1f8a]{font-size:40px}.weui-toast_text[data-v-bafb1f8a]{width:auto;min-width:0;min-height:0;padding:.5em 0}.weui-toast_text .weui-toast__content[data-v-bafb1f8a]{margin:0}.wv-circle[data-v-12ab642a]{position:relative;display:flex;justify-content:center;align-items:center}.wv-circle svg[data-v-12ab642a]{display:block;position:absolute;z-index:1}.wv-circle .wv-circle-content[data-v-12ab642a]{z-index:1000}.actionsheet__mask_show[data-v-4095c8bf]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);background-color:rgba(0,0,0,.6)}.weui-check__label-disabled[data-v-3d63ae3a]{background-color:rgba(0,0,0,.1)}.weui-check__label-disabled[data-v-323b9579]{background-color:rgba(0,0,0,.1)}.wv-navbar__item[data-v-8b4cda66]{position:relative;display:block;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:transparent}.wv-navbar__item.wv-navbar__item_on[data-v-8b4cda66]{border-bottom:3px solid red}.weui-search-bar__label[data-v-e876aa2a]{transform-origin:0 0 0;opacity:1;transform:scale(1)}.weui-search-bar__cancel-btn[data-v-e876aa2a]{display:block}.searchbar-result[data-v-e876aa2a]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);margin-top:0;font-size:14px}.wv-navbar[data-v-40f0a5eb]{display:flex;width:100%;z-index:5000;background-color:#fff}@font-face{font-family:iconfont;src:url(data:application/vnd.ms-fontobject;base64,);src:url(data:application/vnd.ms-fontobject;base64,#iefix) format(\"embedded-opentype\"),url(data:application/font-woff;base64,) format(\"woff\"),url(data:application/x-font-ttf;base64,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) format(\"truetype\"),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+DQpDcmVhdGVkIGJ5IEZvbnRGb3JnZSAyMDEyMDczMSBhdCBGcmkgSnVsIDIxIDAzOjA4OjQ5IDIwMTcNCiBCeSBhZG1pbg0KPC9tZXRhZGF0YT4NCjxkZWZzPg0KPGZvbnQgaWQ9Imljb25mb250IiBob3Jpei1hZHYteD0iMTAyNCIgPg0KICA8Zm9udC1mYWNlIA0KICAgIGZvbnQtZmFtaWx5PSJpY29uZm9udCINCiAgICBmb250LXdlaWdodD0iNTAwIg0KICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIg0KICAgIHVuaXRzLXBlci1lbT0iMTAyNCINCiAgICBwYW5vc2UtMT0iMiAwIDYgMyAwIDAgMCAwIDAgMCINCiAgICBhc2NlbnQ9Ijg5NiINCiAgICBkZXNjZW50PSItMTI4Ig0KICAgIHgtaGVpZ2h0PSI3OTIiDQogICAgYmJveD0iMCAtMTI4IDEwMjQgODk2Ig0KICAgIHVuZGVybGluZS10aGlja25lc3M9IjAiDQogICAgdW5kZXJsaW5lLXBvc2l0aW9uPSIwIg0KICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDA3OC1FODA2Ig0KICAvPg0KPG1pc3NpbmctZ2x5cGggDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm51bGwiIGhvcml6LWFkdi14PSIwIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgDQpkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41DQp0LTI5LjUgMC41aC0zMmwtNDUgMTI4aC00MzlsLTQ0IC0xMjhoLTI5aC0zNHEtMjAgMCAtNDUgMXEtMjUgMCAtNDEgOS41dC0yNS41IDIzdC0xMy41IDI5LjV0LTQgMzB2MTY3aDkxMXpNMTYzIDI0N3EtMTIgMCAtMjEgLTguNXQtOSAtMjEuNXQ5IC0yMS41dDIxIC04LjVxMTMgMCAyMiA4LjV0OSAyMS41dC05IDIxLjV0LTIyIDguNXpNMzE2IDEyM3EtOCAtMjYgLTE0IC00OHEtNSAtMTkgLTEwLjUgLTM3dC03LjUgLTI1dC0zIC0xNXQxIC0xNC41DQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+DQogICAgPGdseXBoIGdseXBoLW5hbWU9InNwaW5uZXI5IiB1bmljb2RlPSImI3hlN2U5OyIgDQpkPSJNNTEyIDg5NnEtMTAzIDAgLTE5Ni41IC0zOS41dC0xNjIgLTEwNi41dC0xMDkuNSAtMTU5LjV0LTQ0IC0xOTQuNXEzIDExOSA1OSAyMTkuNXQxNTEgMTU4LjV0MjA2IDU4cTE3MiAwIDI5NCAtMTMxdDEyMiAtMzE3cTAgLTQwIDI4IC02OHQ2OCAtMjh0NjggMjh0MjggNjhxMCAxMzkgLTY4LjUgMjU3dC0xODYuNSAxODYuNXQtMjU3IDY4LjV6TTUxMiAtMTI4cTEwMyAwIDE5Ni41IDM5LjV0MTYyIDEwNi41dDEwOS41IDE1OS41dDQ0IDE5NC41DQpxLTMgLTExOSAtNTkgLTIxOS41dC0xNTEgLTE1OC41dC0yMDYgLTU4cS0xMTMgMCAtMjA5IDYwdC0xNTEuNSAxNjN0LTU1LjUgMjI1cTAgNDAgLTI4IDY4dC02OCAyOHQtNjggLTI4dC0yOCAtNjhxMCAtMTM5IDY4LjUgLTI1N3QxODYuNSAtMTg2LjV0MjU3IC02OC41eiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lci0xIiB1bmljb2RlPSImI3hlNzIyOyIgDQpkPSJNMTAyNCAzODRxLTIgODcgLTQ3LjUgMTkxLjV0LTEwOC41IDE2NC41cS0yOSAyOSAtNzcuNSA2MHQtODcuNSA0NnEtMzYgMTQgLTg5IDI0dC05MSAxMGgtMTFxLTg0IC0yIC0xODUuNSAtNDZ0LTE1OS41IC0xMDVxLTI4IC0yOSAtNTggLTc1LjV0LTQ0IC04NC41cS0xNCAtMzUgLTIzLjUgLTg2dC05LjUgLTg4di0xMXExIC0zOSAxMi41IC05Mi41dDI3LjUgLTg5LjV0NDcgLTgwLjV0NTkgLTcxLjV0NzMuNSAtNTUuNXQ4MS41IC00Mi41DQpxMzQgLTE0IDgzIC0yM3Q4NSAtOWgxMXE5MiAyIDE3NiAzOXEzNSAxNSA3Ny41IDQ1dDY4LjUgNThxMjYgMjcgNTQgNzAuNXQ0MiA3OC41cTE5IDUwIDI2IDEwNGg0cTI2IDAgNDUgMTguNXQxOSA0NS41djV2MHYwek05MjIgMjE0cS0zNSAtODAgLTk5IC0xNDFxLTYzIC02MSAtMTQ0IC05MnEtMzEgLTEyIC03NyAtMjAuNXQtODAgLTguNWgtMTBxLTczIDIgLTE2MSA0MC41dC0xMzkgOTEuNXEtMjQgMjUgLTUwIDY2dC0zOCA3Mw0KcS0xMiAzMCAtMjAgNzR0LTggNzdxMCAzNiAxMC41IDg1dDI0LjUgODNxMzMgNzQgOTMgMTMxcTU4IDU2IDEzMyA4NHEyOSAxMSA3MS41IDE5dDczLjUgOHEzNSAwIDgyLjUgLTEwdDc5LjUgLTI0cTcxIC0zMiAxMjUgLTg5cTU0IC01NiA4MiAtMTI4cTI3IC03MiAyNSAtMTQ5djB2LTVxMCAtMjQgMTYuNSAtNDIuNXQ0MC41IC0yMS41cS05IC01MiAtMzEgLTEwMXYweiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lcjEiIHVuaWNvZGU9IiYjeGU4MDY7IiANCmQ9Ik0zMDEgOTkuNXEwIC0zMC41IC0yMS41IC01MnQtNTIuNSAtMjEuNXEtMjkgMCAtNTEgMjJ0LTIyIDUxcTAgMzEgMjEuNSA1Mi41dDUyIDIxLjV0NTIgLTIxLjV0MjEuNSAtNTJ6TTU4NSAtMTguNXEwIC0zMC41IC0yMS41IC01MS41dC01MS41IC0yMXQtNTEuNSAyMXQtMjEuNSA1MS41dDIxLjUgNTJ0NTEuNSAyMS41dDUxLjUgLTIxLjV0MjEuNSAtNTJ6TTE4MyAzODRxMCAtMzAgLTIxLjUgLTUxLjV0LTUyIC0yMS41dC01MS41IDIxLjUNCnQtMjEgNTEuNXQyMSA1MS41dDUxLjUgMjEuNXQ1MiAtMjEuNXQyMS41IC01MS41ek04NzAgOTlxMCAtMjkgLTIyIC01MXQtNTEgLTIycS0zMSAwIC01Mi41IDIxLjV0LTIxLjUgNTJ0MjEuNSA1MnQ1MiAyMS41dDUyIC0yMS41dDIxLjUgLTUyLjV6TTMxOSA2NjguNXEwIC0zNy41IC0yNyAtNjQuNXQtNjQuNSAtMjd0LTY0LjUgMjd0LTI3IDY0LjV0MjcgNjQuNXQ2NC41IDI3dDY0LjUgLTI3dDI3IC02NC41ek05ODcgMzg0DQpxMCAtMzAgLTIxIC01MS41dC01MS41IC0yMS41dC01MiAyMS41dC0yMS41IDUxLjV0MjEuNSA1MS41dDUyIDIxLjV0NTEuNSAtMjEuNXQyMSAtNTEuNXpNNjIyIDc4Ni41cTAgLTQ1LjUgLTMyIC03Ny41dC03OCAtMzJ0LTc4IDMydC0zMiA3Ny41dDMyIDc3LjV0NzggMzJ0NzggLTMydDMyIC03Ny41ek05MjUgNjY5cTAgLTU0IC0zOCAtOTF0LTkwIC0zN3EtNTQgMCAtOTEgMzd0LTM3IDkxcTAgNTIgMzcgOTB0OTEgMzhxNTIgMCA5MCAtMzgNCnQzOCAtOTB6IiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzcGlubmVyMiIgdW5pY29kZT0iJiN4ZTYzZjsiIA0KZD0iTTUxMiA1OTN2MHEtMjUgMCAtNDIuNSAxNy41dC0xNy41IDQyLjV2MTc5cTAgMjQgMTcuNSA0MS41dDQyLjUgMTcuNXQ0Mi41IC0xNy41dDE3LjUgLTQxLjV2LTE3OXEwIC0yNSAtMTcuNSAtNDIuNXQtNDIuNSAtMTcuNXpNNTEyIC0xMDF2MHEtMTUgMCAtMjYgMTF0LTExIDI2djE3OXEwIDE2IDExIDI3dDI2IDExdDI2IC0xMXQxMSAtMjd2LTE3OXEwIC0xNSAtMTEgLTI2dC0yNiAtMTF6TTM3OCA1NjF2MHEtMTQgMCAtMjggOHQtMjEgMjANCmwtODkgMTU1cS03IDEyIC03IDI2cTAgMjMgMTYuNSAzOS41dDM5LjUgMTYuNXExMyAwIDI3IC03LjV0MjEgLTE4LjVsODkgLTE1NXE4IC0xMyA4IC0yOHEwIC0yNCAtMTYuNSAtNDB0LTM5LjUgLTE2ek03MzYgLTM3djBxLTIwIDAgLTI5IDE3bC05MCAxNTVxLTQgNyAtNCAxNnEwIDE0IDkuNSAyNHQyMy41IDEwcTIwIDAgMjkgLTE3bDkwIC0xNTVxNCAtOCA0IC0xN3EwIC0xNCAtOS41IC0yMy41dC0yMy41IC05LjV2MHpNMjc5IDQ2Ng0KcS0xNCAwIC0yNiA3bC0xNTUgOTBxLTExIDYgLTE4LjUgMTl0LTcuNSAyNnEwIDIxIDE1LjUgMzYuNXQzNi41IDE1LjVxMTQgMCAyNiAtN2wxNTYgLTkwcTEwIC02IDE4IC0xOXQ4IC0yNnEwIC0yMSAtMTUuNSAtMzYuNXQtMzcuNSAtMTUuNXYwek05MDAgMTMwdjBxLTggMCAtMTUgNGwtMTU1IDkwcS0xNSA4IC0xNSAyNnEwIDEyIDguNSAyMXQyMS41IDlxOCAwIDE1IC00bDE1NSAtOTBxMTUgLTkgMTUgLTI2cTAgLTEyIC05IC0yMXQtMjEgLTl2MHoNCk0yNDMgMzM2aC0xNzlxLTIwIDAgLTM0IDE0dC0xNCAzNHQxNCAzNHQzNCAxNGgxNzlxMjAgMCAzNC41IC0xNHQxNC41IC0zNHQtMTQuNSAtMzR0LTM0LjUgLTE0ek05NjAgMzU0aC0xNzlxLTEzIDAgLTIxLjUgOXQtOC41IDIxdDguNSAyMXQyMS41IDloMTc5cTEyIDAgMjEgLTl0OSAtMjF0LTkgLTIxdC0yMSAtOXpNMTI0IDExNXYwcS0xOCAwIC0zMSAxMy41dC0xMyAzMS41cTAgMTEgNi41IDIyLjV0MTUuNSAxNi41bDE1NSA4OXExMCA2IDIyIDYNCnExOSAwIDMyIC0xM3QxMyAtMzFxMCAtMTEgLTYuNSAtMjIuNXQtMTUuNSAtMTYuNWwtMTU1IC05MHEtMTEgLTYgLTIzIC02ek03NDUgNDg4cS0xMyAwIC0yMS41IDl0LTguNSAyMXEwIDE3IDE1IDI2bDE1NSA5MHE2IDMgMTQgM3ExMiAwIDIxIC04LjV0OSAtMjEuNXEwIC0xNiAtMTQgLTI1bC0xNTUgLTkwcS03IC00IC0xNSAtNHYwek0yODggLTQ1cS0xNyAwIC0yOSAxMnQtMTIgMjlxMCAxMSA2IDIxbDg5IDE1NXE1IDggMTUuNSAxMy41DQp0MTkuNSA1LjVxMTcgMCAyOSAtMTJ0MTIgLTI5cTAgLTEwIC01IC0xOWwtODkgLTE1NXEtNSAtOSAtMTUuNSAtMTV0LTIwLjUgLTZ2MHpNNjQ2IDU4N3EtMTIgMCAtMjEgOC41dC05IDIxLjVxMCA4IDQgMTVsOTAgMTU1cTkgMTUgMjYgMTVxMTIgMCAyMSAtOXQ5IC0yMXEwIC04IC00IC0xNWwtOTAgLTE1NXEtOCAtMTUgLTI2IC0xNXYweiIgLz4NCiAgPC9mb250Pg0KPC9kZWZzPjwvc3ZnPg0K#iconfont) format(\"svg\")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-spinner9:before{content:\"\\E7E9\"}.icon-spinner-1:before{content:\"\\E722\"}.icon-spinner1:before{content:\"\\E806\"}.icon-spinner2:before{content:\"\\E63F\"}.wv-spinner[data-v-067ccc1f]{display:inline-block;overflow:hidden;-webkit-animation:circle 1.2s infinite linear;-o-animation:circle 1.2s infinite linear;animation:circle 1.2s infinite linear}@-webkit-keyframes circle{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", ""]);

// exports


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(234);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(30)(content, options);
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
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: #ececec; }\n\n.weui-tabbar {\n  font-weight: bold; }\n\n.weui-cell__bd p {\n  color: #777;\n  font-weight: 200; }\n", ""]);

// exports


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = [{
  path: '/',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(13).then((function () {
      return resolve(__webpack_require__(244));
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
      return resolve(__webpack_require__(245));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'cart',
  meta: {
    auth: true
  }
}, {
  path: '/category',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(18).then((function () {
      return resolve(__webpack_require__(246));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'category'
}, {
  path: '/order-list',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(12).then((function () {
      return resolve(__webpack_require__(247));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order-list',
  meta: {
    auth: true
  }
}, {
  path: '/order/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(11).then((function () {
      return resolve(__webpack_require__(248));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order',
  meta: {
    auth: true
  }
}, {
  path: '/favourite',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(16).then((function () {
      return resolve(__webpack_require__(249));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'favourite',
  meta: {
    auth: true
  }
}, {
  path: '/checkout',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(17).then((function () {
      return resolve(__webpack_require__(250));
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
    __webpack_require__.e/* require.ensure */(6).then((function () {
      return resolve(__webpack_require__(251));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'user',
  meta: {
    auth: true
  }
}, {
  path: '/profile',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(8).then((function () {
      return resolve(__webpack_require__(252));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'profile',
  meta: {
    auth: true
  }
}, {
  path: '/avatar',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(5).then((function () {
      return resolve(__webpack_require__(253));
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
    __webpack_require__.e/* require.ensure */(19).then((function () {
      return resolve(__webpack_require__(254));
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
      return resolve(__webpack_require__(127));
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
      return resolve(__webpack_require__(127));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/about-us',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(20).then((function () {
      return resolve(__webpack_require__(255));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(14).then((function () {
      return resolve(__webpack_require__(256));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(15).then((function () {
      return resolve(__webpack_require__(257));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/login',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(4).then((function () {
      return resolve(__webpack_require__(258));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/register',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(7).then((function () {
      return resolve(__webpack_require__(259));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'register',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/product/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(9).then((function () {
      return resolve(__webpack_require__(260));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'product',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/password',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(10).then((function () {
      return resolve(__webpack_require__(261));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'password',
  meta: {
    auth: true
  }
}];

exports.default = routes;

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(237)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(239),
  /* template */
  __webpack_require__(240),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-62002d45",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\mainmenu.vue"
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
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(238);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(122)("6e573bf7", content, false);
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
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(true);
// imports


// module
exports.push([module.i, "\n#tabbar .weui_tabbar[data-v-62002d45] {\n  position: fixed;\n  bottom: 0;\n}\n#tabbar .weui_tabbar .weui_tabbar_item .icon[data-v-62002d45] {\n    font-size: 20px;\n    color: #666;\n}\n#tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon[data-v-62002d45] {\n    color: #09bb07;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/components/mainmenu.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,UAAU;CAAE;AACZ;IACE,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,eAAe;CAAE","file":"mainmenu.vue","sourcesContent":["#tabbar .weui_tabbar {\n  position: fixed;\n  bottom: 0; }\n  #tabbar .weui_tabbar .weui_tabbar_item .icon {\n    font-size: 20px;\n    color: #666; }\n  #tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon {\n    color: #09bb07; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(31);

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
/* 240 */
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
],[228]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LmVvdCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LmNzcz9hNjNkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQud29mZiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LnR0ZiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LnN2ZyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N0eWxlLmNzcz85OTM1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzP2RjODYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avcm91dGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/MmYwNSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/ZWRlNyIsIndlYnBhY2s6Ly8vbWFpbm1lbnUudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZT82ZDYyIl0sIm5hbWVzIjpbIkNvbmZpZyIsImFwaVJvb3QiLCJ0aW1lb3V0Iiwic21zUmVzZW5kQ291bnRkb3duIiwiand0VG9rZW5OYW1lIiwidXNlIiwic3RhdGUiLCJpc0xvYWRpbmciLCJkaXJlY3Rpb24iLCJpc01haW5NZW51VmlzaWJsZSIsImlzTG9naW4iLCJTdG9yZSIsIm11dGF0aW9ucyIsIlVQREFURV9MT0FESU5HIiwidmFsdWUiLCJVUERBVEVfRElSRUNUSU9OIiwiVVBEQVRFX01BSU5NRU5VX1ZJU0lCTEUiLCJVUERBVEVfSVNfTE9HSU4iLCJyb3V0ZXIiLCJtb2RlIiwiYmFzZSIsInJvdXRlcyIsImJlZm9yZUVhY2giLCJ0byIsImZyb20iLCJuZXh0IiwiY29tbWl0IiwibWV0YSIsImhpZGVNYWlubWVudSIsIm1hdGNoZWQiLCJzb21lIiwicmVjb3JkIiwiYXV0aCIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXRoIiwicXVlcnkiLCJyZWRpcmVjdCIsImZ1bGxQYXRoIiwiYWZ0ZXJFYWNoIiwiZG9jdW1lbnQiLCJ0aXRsZSIsImRlZmF1bHRzIiwiYmFzZVVSTCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJjb25maWciLCJoaWRlTG9hZGluZyIsImFwcCIsInNob3dMb2FkaW5nIiwidG9rZW4iLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImVycm9yIiwicmVqZWN0IiwicmVzcG9uc2UiLCJuZXdUb2tlbiIsImF1dGhvcml6YXRpb24iLCJzZXRJdGVtIiwicmVwbGFjZSIsInN0YXR1cyIsInJlbW92ZUl0ZW0iLCJwdXNoIiwiY29kZSIsImVsIiwic3RvcmUiLCJjb21wb25lbnRzIiwicmVxdWlyZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiZHVyYXRpb24iLCJUb2FzdCIsImljb24iLCJpbmZvIiwidHlwZSIsImNvbmZpcm0iLCJjYWxsYmFjayIsIkRpYWxvZyIsInNraW4iLCJpc2lPcyIsIm1zZyIsIkluZGljYXRvciIsIm9wZW4iLCJjbG9zZSIsImNvbXBvbmVudCIsInJlc29sdmUiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7Ozs7OztBQ0x6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDVkEsNkJBQTZCO0FBQzdCLHVDQUF1Qzs7Ozs7OztBQ0R2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0Esa0ZBQWtGO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQjs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7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O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoV0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSx1Q0FBdUM7QUFDdkM7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixhQUFhOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG9DQUFvQztBQUM3RSw2Q0FBNkMsb0NBQW9DO0FBQ2pGLEtBQUssNEJBQTRCLG9DQUFvQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0Esa0NBQWtDLDJCQUEyQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7QUNyRUE7Ozs7Ozs7QUNBQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCLEVBQUU7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25GQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLEdBQUc7QUFDSCxZQUFZO0FBQ1o7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEEsOEU7Ozs7Ozs7QUNBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdC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QixHQUFHLGtGQUFrRixxQkFBcUIsR0FBRyxVQUFVLDRIQUE0SCxLQUFLLFlBQVksV0FBVyxLQUFLLEtBQUssWUFBWSxXQUFXLEtBQUssTUFBTSxVQUFVLHFFQUFxRSxvQkFBb0IsY0FBYyxFQUFFLGtEQUFrRCxzQkFBc0Isa0JBQWtCLEVBQUUsbUVBQW1FLHFCQUFxQixFQUFFLHFCQUFxQjs7QUFFMTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNpQkE7Ozs7O0FBRUE7O21CQUtBOztBQUpBOztXQUtBO0FBUEEsRTs7Ozs7O0FDekJBLGdCQUFnQixtQkFBbUIsYUFBYSwwQkFBMEI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGludm9rZSA9IHJlcXVpcmUoJy4vX2ludm9rZScpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuL19odG1sJyk7XG52YXIgY2VsID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBzZXRUYXNrID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhclRhc2sgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9ICt0aGlzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0VGFzayB8fCAhY2xlYXJUYXNrKSB7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpID0gMTtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2VzcycpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3coY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvZm9udHMvaWNvbmZvbnQuZW90P2JlYTQxNjE1NmQ4NTQ5YjYxMTZjZGEyMzgzYjc5MjVmXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LmVvdD90PTE0ODg5OTQwNTgzNDZcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9oID09IDEpIHJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZWFjdGlvbjtcbiAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYgKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKSByZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIGFyZ3MsIHRoYXQpIHtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYgKE9ic2VydmVyKSB7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWU7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2ljb25mb250LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9pY29uZm9udC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vaWNvbmZvbnQuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbkBmb250LWZhY2Uge2ZvbnQtZmFtaWx5OiBcXFwiaWNvbmZvbnRcXFwiO1xcclxcbiAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi9pY29uZm9udC5lb3Q/dD0xNDg4OTk0MDU4MzQ2XCIpICsgXCIpOyAvKiBJRTkqL1xcclxcbiAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi9pY29uZm9udC5lb3Q/dD0xNDg4OTk0MDU4MzQ2XCIpICsgXCIjaWVmaXgpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSwgXFxyXFxuICB1cmwoXCIgKyByZXF1aXJlKFwiLi9pY29uZm9udC53b2ZmP3Q9MTQ4ODk5NDA1ODM0NlwiKSArIFwiKSBmb3JtYXQoJ3dvZmYnKSwgXFxyXFxuICB1cmwoXCIgKyByZXF1aXJlKFwiLi9pY29uZm9udC50dGY/dD0xNDg4OTk0MDU4MzQ2XCIpICsgXCIpIGZvcm1hdCgndHJ1ZXR5cGUnKSwgXFxyXFxuICB1cmwoXCIgKyByZXF1aXJlKFwiLi9pY29uZm9udC5zdmc/dD0xNDg4OTk0MDU4MzQ2XCIpICsgXCIjaWNvbmZvbnQpIGZvcm1hdCgnc3ZnJyk7IC8qIGlPUyA0LjEtICovXFxyXFxufVxcclxcblxcclxcbi5pY29uZm9udCB7XFxyXFxuICBmb250LWZhbWlseTpcXFwiaWNvbmZvbnRcXFwiICFpbXBvcnRhbnQ7XFxyXFxuICBmb250LXNpemU6MTZweDtcXHJcXG4gIGZvbnQtc3R5bGU6bm9ybWFsO1xcclxcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxyXFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi1lZGl0OmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxRVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1mYXZvcmZpbGw6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjAwXFxcIjsgfVxcclxcblxcclxcbi5pY29uLWZhdm9yOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwMVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1sb2NhdGlvbjpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDJcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tcGhvbmU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjAzXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXJvdW5kY2hlY2tmaWxsOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwNFxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi10aW1lOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwNVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1saWtlZmlsbDpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDZcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tbGlrZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDdcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tZGVsaXZlcjpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MDhcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tcGF5OmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwOVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1zaG9wOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwQVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1saXN0OmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwQlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1tb3JlOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYwQ1xcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1zZXR0aW5nczpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MERcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tcXVlc3Rpb246YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjBFXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXJlZnJlc2g6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjBGXFxcIjsgfVxcclxcblxcclxcbi5pY29uLW1vcmVhbmRyb2lkOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxMFxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1jYXJ0OmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxMVxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1kZWxldGU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjEyXFxcIjsgfVxcclxcblxcclxcbi5pY29uLWhvbWU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjEzXFxcIjsgfVxcclxcblxcclxcbi5pY29uLW1lc3NhZ2U6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjE0XFxcIjsgfVxcclxcblxcclxcbi5pY29uLWxvY2s6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjE1XFxcIjsgfVxcclxcblxcclxcbi5pY29uLWdvb2RzOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxNlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1pbmZvOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxN1xcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1yZWNoYXJnZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MThcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tc2hhcmU6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjE5XFxcIjsgfVxcclxcblxcclxcbi5pY29uLW1vYmlsZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MUFcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tYmlhbmppOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxRlxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1ub3RpY2U6YmVmb3JlIHsgY29udGVudDogXFxcIlxcXFxFNjFCXFxcIjsgfVxcclxcblxcclxcbi5pY29uLXBlb3BsZTpiZWZvcmUgeyBjb250ZW50OiBcXFwiXFxcXEU2MUNcXFwiOyB9XFxyXFxuXFxyXFxuLmljb24tdGFnOmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYyMFxcXCI7IH1cXHJcXG5cXHJcXG4uaWNvbi1nb29kc2xpZ2h0OmJlZm9yZSB7IGNvbnRlbnQ6IFxcXCJcXFxcRTYxRFxcXCI7IH1cXHJcXG5cXHJcXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uZm9udC9pY29uZm9udC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBcIi9idWlsZC9mb250cy9pY29uZm9udC53b2ZmPzk2YjFlZWM0ODg2MDEwODZmMTQ1M2U5MGM1NmE5NWU0XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LndvZmY/dD0xNDg4OTk0MDU4MzQ2XG4vLyBtb2R1bGUgaWQgPSAxMDRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMSAyMiIsIm1vZHVsZS5leHBvcnRzID0gXCIvYnVpbGQvZm9udHMvaWNvbmZvbnQudHRmP2U4MDA4ZWVhNTJhOTg2MjI1NTNkZmVjM2Q2ODc3Y2I5XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2ljb25mb250L2ljb25mb250LnR0Zj90PTE0ODg5OTQwNTgzNDZcbi8vIG1vZHVsZSBpZCA9IDEwNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIxIDIyIiwibW9kdWxlLmV4cG9ydHMgPSBcIi9idWlsZC9mb250cy9pY29uZm9udC5zdmc/ZTQ0MGE1YjM3NTE5ZDExZjAyNzU0M2IxYTE0NzMyMzhcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvaWNvbmZvbnQvaWNvbmZvbnQuc3ZnP3Q9MTQ4ODk5NDA1ODM0NlxuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjEgMjIiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiAzIDIyIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDMgMjIiLCIvLyBjb25zdCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XHJcblxyXG5jb25zdCBDb25maWcgPSB7XHJcbiAgYXBpUm9vdDogJy9hcGkvc2hvcCcsXHJcbiAgdGltZW91dDogMTAwMDAsXHJcbiAgc21zUmVzZW5kQ291bnRkb3duOiA2MCxcclxuICBqd3RUb2tlbk5hbWU6ICd3aWxsc2hvcF9qd3RfdG9rZW4nXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29uZmlnLmpzIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXHJcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnXHJcblxyXG5WdWUudXNlKFZ1ZXgpXHJcblxyXG5jb25zdCBzdGF0ZSA9IHtcclxuICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxyXG4gIGlzTWFpbk1lbnVWaXNpYmxlOiB0cnVlLFxyXG4gIGlzTG9naW46IGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcclxuICBzdGF0ZSxcclxuICBtdXRhdGlvbnM6IHtcclxuICAgIFVQREFURV9MT0FESU5HIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuaXNMb2FkaW5nID0gdmFsdWVcclxuICAgIH0sXHJcbiAgICBVUERBVEVfRElSRUNUSU9OIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuZGlyZWN0aW9uID0gdmFsdWVcclxuICAgIH0sXHJcbiAgICBVUERBVEVfTUFJTk1FTlVfVklTSUJMRSAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTWFpbk1lbnVWaXNpYmxlID0gdmFsdWVcclxuICAgIH0sXHJcbiAgICBVUERBVEVfSVNfTE9HSU4gKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5pc0xvZ2luID0gdmFsdWVcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9zdG9yZS9pbmRleC5qcyIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInXHJcbmltcG9ydCBXZVZ1ZSBmcm9tICd3ZS12dWUnXHJcbmltcG9ydCAnd2UtdnVlL2xpYi9zdHlsZS5jc3MnXHJcbmltcG9ydCAnLi4vLi4vc2Fzcy9zaG9wLnNjc3MnXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuaW1wb3J0IFZ1ZUF4aW9zIGZyb20gJ3Z1ZS1heGlvcydcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUvaW5kZXgnXHJcbmltcG9ydCBhcHBDb25maWcgZnJvbSAnLi9jb25maWcnIC8vIOmFjee9rlxyXG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzLmpzJ1xyXG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcbmltcG9ydCAnLi4vLi4vaWNvbmZvbnQvaWNvbmZvbnQuY3NzJ1xyXG5cclxuVnVlLnVzZShWdWVSb3V0ZXIpXHJcblZ1ZS51c2UoV2VWdWUpXHJcblZ1ZS51c2UoVnVlQXhpb3MsIGF4aW9zKVxyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XHJcbiAgbW9kZTogJ2hpc3RvcnknLFxyXG4gIGJhc2U6ICcvc2hvcC8nLFxyXG4gIHJvdXRlc1xyXG59KVxyXG5cclxucm91dGVyLmJlZm9yZUVhY2goKHRvLCBmcm9tLCBuZXh0KSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIHRydWUpXHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTUFJTk1FTlVfVklTSUJMRScsICF0by5tZXRhLmhpZGVNYWlubWVudSlcclxuXHJcbiAgaWYgKHRvLm1hdGNoZWQuc29tZShyZWNvcmQgPT4gcmVjb3JkLm1ldGEuYXV0aCkgJiYgIXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKSkge1xyXG4gICAgLy8g6ZyA6KaB55m75b2V5ZCO6K6/6Zeu55qE6aG16Z2i77yMcmVkaXJlY3Qg5Y+C5pWw55So5LqO55m75b2V5a6M5oiQ5ZCO6Lez6L2sXHJcbiAgICBuZXh0KHtcclxuICAgICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICAgIHF1ZXJ5OiB7cmVkaXJlY3Q6IHRvLmZ1bGxQYXRofVxyXG4gICAgfSlcclxuICB9XHJcbiAgbmV4dCgpXHJcbn0pXHJcblxyXG5yb3V0ZXIuYWZ0ZXJFYWNoKCh0bywgZnJvbSkgPT4ge1xyXG4gIC8vIOWKqOaAgeiuvue9rumhtemdouagh+mimFxyXG4gIGRvY3VtZW50LnRpdGxlID0gdG8ubWV0YS50aXRsZSB8fCAnd2lsbHNob3AnXHJcblxyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSlcclxufSlcclxuXHJcbmF4aW9zLmRlZmF1bHRzLmJhc2VVUkwgPSBhcHBDb25maWcuYXBpUm9vdFxyXG5heGlvcy5kZWZhdWx0cy50aW1lb3V0ID0gYXBwQ29uZmlnLnRpbWVvdXRcclxuXHJcbi8vIGF4aW9zIOivt+axguWPkemAgeWJjeWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCB0cnVlKVxyXG5cclxuICBpZiAoY29uZmlnLmhpZGVMb2FkaW5nICE9PSB0cnVlKSB7XHJcbiAgICAvLyDmmL7npLogbG9hZGluZyDmj5DnpLpcclxuICAgIGFwcC5zaG93TG9hZGluZygpXHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKVxyXG4gIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnYmVhcmVyICcgKyB0b2tlblxyXG5cclxuICByZXR1cm4gY29uZmlnXHJcbn0sIChlcnJvcikgPT4ge1xyXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxufSlcclxuXHJcbi8vIGF4aW9zIOW+l+WIsOWTjeW6lOWQjuWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXNwb25zZSkgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSlcclxuICBhcHAuaGlkZUxvYWRpbmcoKVxyXG5cclxuICBjb25zdCBuZXdUb2tlbiA9IHJlc3BvbnNlLmhlYWRlcnMuYXV0aG9yaXphdGlvblxyXG4gIGlmIChuZXdUb2tlbikge1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUsIG5ld1Rva2VuLnJlcGxhY2UoJ2JlYXJlciAnLCAnJykpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzcG9uc2VcclxufSwgKGVycm9yKSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKVxyXG4gIGFwcC5oaWRlTG9hZGluZygpXHJcblxyXG4gIGlmIChlcnJvci5yZXNwb25zZSkge1xyXG4gICAgY29uc3QgbmV3VG9rZW4gPSBlcnJvci5yZXNwb25zZS5oZWFkZXJzLmF1dGhvcml6YXRpb25cclxuICAgIGlmIChuZXdUb2tlbikge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSwgbmV3VG9rZW4ucmVwbGFjZSgnYmVhcmVyICcsICcnKSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpXHJcblxyXG4gICAgICByb3V0ZXIucHVzaCgnL2xvZ2luJylcclxuICAgIH0gZWxzZSBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgLy8g5peg5p2D6ZmQ5pe257uf5LiA5o+Q56S6XHJcbiAgICAgIGFwcC5lcnJvcign5peg5pON5L2c5p2D6ZmQJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOi2heaXtuWQjui/m+ihjOaPkOekulxyXG4gIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5BQk9SVEVEJykge1xyXG4gICAgYXBwLmVycm9yKCfnvZHnu5znuYHlv5nvvIzor7fph43or5UnKVxyXG4gIH1cclxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXHJcbn0pXHJcblxyXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIHJvdXRlcixcclxuICBzdG9yZSxcclxuXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21haW5tZW51JzogcmVxdWlyZSgnLi9jb21wb25lbnRzL21haW5tZW51LnZ1ZScpXHJcbiAgfSxcclxuXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgaXNMb2FkaW5nOiBzdGF0ZSA9PiBzdGF0ZS5pc0xvYWRpbmcsXHJcbiAgICAgIGlzTWFpbk1lbnVWaXNpYmxlOiBzdGF0ZSA9PiBzdGF0ZS5pc01haW5NZW51VmlzaWJsZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICAvKipcclxuICAgICAqIOaTjeS9nOaIkOWKn+aPkOekulxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzdWNjZXNzIChtZXNzYWdlLCBkdXJhdGlvbiA9IDEwMDApIHtcclxuICAgICAgV2VWdWUuVG9hc3Qoe1xyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgZHVyYXRpb25cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmk43kvZzlpLHotKXmj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgZXJyb3IgKG1lc3NhZ2UsIGR1cmF0aW9uKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICBpY29uOiAnd2FybidcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIDoiKzmj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgaW5mbyAobWVzc2FnZSwgZHVyYXRpb24gPSAyMDAwKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBkdXJhdGlvblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOehruiupOWvueivneahhlxyXG4gICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIGNvbmZpcm0gKHRpdGxlLCBtZXNzYWdlLCBjYWxsYmFjaykge1xyXG4gICAgICBXZVZ1ZS5EaWFsb2coe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgc2tpbjogdGhpcy5pc2lPcyA/ICdpb3MnIDogJ2FuZHJvaWQnXHJcbiAgICAgIH0sIGNhbGxiYWNrKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuiBsb2FkaW5nIOaPkOekulxyXG4gICAgICogQHBhcmFtIG1zZ1xyXG4gICAgICovXHJcbiAgICBzaG93TG9hZGluZyAobXNnID0gJ0xvYWRpbmcnKSB7XHJcbiAgICAgIFdlVnVlLkluZGljYXRvci5vcGVuKG1zZylcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol48gbG9hZGluZyDmj5DnpLpcclxuICAgICAqL1xyXG4gICAgaGlkZUxvYWRpbmcgKCkge1xyXG4gICAgICBXZVZ1ZS5JbmRpY2F0b3IuY2xvc2UoKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2luZGV4LmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDIzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIyIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiFcXHJcXG4gKiBXZVVJIHYxLjEuMiAoaHR0cHM6Ly9naXRodWIuY29tL3dldWkvd2V1aSlcXHJcXG4gKiBDb3B5cmlnaHQgMjAxNyBUZW5jZW50LCBJbmMuXFxyXFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXFxyXFxuICovaHRtbHstbXMtdGV4dC1zaXplLWFkanVzdDoxMDAlOy13ZWJraXQtdGV4dC1zaXplLWFkanVzdDoxMDAlfWJvZHl7bGluZS1oZWlnaHQ6MS42O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0tZm9udCxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmfSp7bWFyZ2luOjA7cGFkZGluZzowfWEgaW1ne2JvcmRlcjowfWF7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9QGZvbnQtZmFjZXtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1mYW1pbHk6d2V1aTtzcmM6dXJsKFxcXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUFFQUFBQUxBSUFBQXdBd1IxTlZRckQrcyswQUFBRTRBQUFBUWs5VEx6SkFLRXgrQUFBQmZBQUFBRlpqYldGdzY1Y0ZIUUFBQWh3QUFBSlFaMng1WnZDUlIvRUFBQVNVQUFBS3RHaGxZV1FNUFJPdEFBQUE0QUFBQURab2FHVmhDQ3dEK2dBQUFMd0FBQUFrYUcxMGVFSm8vLzhBQUFIVUFBQUFTR3h2WTJFWXFoVzRBQUFFYkFBQUFDWnRZWGh3QVNFQVZRQUFBUmdBQUFBZ2JtRnRaZU5jSHRnQUFBOUlBQUFCNW5CdmMzVDZiTGhMQUFBUk1BQUFBT1lBQVFBQUErZ0FBQUJhQStqLy8vLy9BK2tBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQklBQVFBQUFBRUFBQ2JaYnh0ZkR6ejFBQXNENkFBQUFBRFVtMmR2QUFBQUFOU2JaMi8vL3dBQUEra0Q2Z0FBQUFnQUFnQUFBQUFBQUFBQkFBQUFFZ0JKQUFVQUFBQUFBQUlBQUFBS0FBb0FBQUQvQUFBQUFBQUFBQUVBQUFBS0FCNEFMQUFCUkVaTVZBQUlBQVFBQUFBQUFBQUFBUUFBQUFGc2FXZGhBQWdBQUFBQkFBQUFBUUFFQUFRQUFBQUJBQWdBQVFBR0FBQUFBUUFBQUFBQUFRT3dBWkFBQlFBSUFub0N2QUFBQUl3Q2VnSzhBQUFCNEFBeEFRSUFBQUlBQlFNQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFVR1pGWkFCQTZnSHFFUVBvQUFBQVdnUHFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2ovL3dQb0FBQUQ2QUFBQUFBQUJRQUFBQU1BQUFBc0FBQUFCQUFBQVhRQUFRQUFBQUFBYmdBREFBRUFBQUFzQUFNQUNnQUFBWFFBQkFCQ0FBQUFCQUFFQUFFQUFPb1IvLzhBQU9vQi8vOEFBQUFCQUFRQUFBQUJBQUlBQXdBRUFBVUFCZ0FIQUFnQUNRQUtBQXNBREFBTkFBNEFEd0FRQUJFQUFBRUdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQUFBQU53QUFBQUFBQUFBRVFBQTZnRUFBT29CQUFBQUFRQUE2Z0lBQU9vQ0FBQUFBZ0FBNmdNQUFPb0RBQUFBQXdBQTZnUUFBT29FQUFBQUJBQUE2Z1VBQU9vRkFBQUFCUUFBNmdZQUFPb0dBQUFBQmdBQTZnY0FBT29IQUFBQUJ3QUE2Z2dBQU9vSUFBQUFDQUFBNmdrQUFPb0pBQUFBQ1FBQTZnb0FBT29LQUFBQUNnQUE2Z3NBQU9vTEFBQUFDd0FBNmd3QUFPb01BQUFBREFBQTZnMEFBT29OQUFBQURRQUE2ZzRBQU9vT0FBQUFEZ0FBNmc4QUFPb1BBQUFBRHdBQTZoQUFBT29RQUFBQUVBQUE2aEVBQU9vUkFBQUFFUUFBQUFBQVJnQ01BTklCSkFGNEFjUUNNZ0pnQXFnQy9BTklBNllEL2dST0JLQUU5QVZhQUFBQUFnQUFBQUFEcndPdEFCUUFLUUFBQVNJSEJnY0dGQmNXRnhZeU56WTNOalFuSmljbUF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBZlY0WjJRN1BEdzdaR2Z3Wm1RN1BEdzdaR1o0Ymw1Yk5qYzNObHRlMjE1Yk5qYzNObHRlQTYwOE8yUm44R2RqT3p3OE8yTm44R2RrT3p6OHJ6YzFXMTdiWGx3MU56YzFYRjdiWGxzMU53QUFBQUFDQUFBQUFBT3pBN01BRndBdEFBQUJJZ2NHQndZVkZCY1dGeFl6TWpjMk56WTFOQ2NtSnlZVEJ3WWlMd0VtTmpzQkVUUTJPd0V5RmhVUk16SVdBZTUyWjJRN1BUMDdaR2QyZkdwbU96NCtPMlpwSVhZT0tBNTJEZzBYWFFzSEpnY0xYUmNOQTdNK08yWnFmSFpuWkRzOVBUdGtaM1o5YVdZN1B2M3dtaElTbWhJYUFSY0lDd3NJL3VrYUFBTUFBQUFBQStVRDVRQVhBQ01BTEFBQUFTSUhCZ2NHRlJRWEZoY1dNekkzTmpjMk5UUW5KaWNtQXhRckFTSTFBelE3QVRJSEp5SW1ORFl5RmhRR0FlNkVjbTlCUkVSQmIzS0VpWFp4UWtSRVFuRjFhUUl4QXdnQ1FnTUJJeElaR1NRWkdRUGtSRUp4ZG9tRWNtOUJSRVJCYjNLRWluVnhRa1Q5SFFJQ0FXSUNBakVaSXhrWkl4a0FBQUFBQWdBQUFBQURzUVBrQUJrQUxnQUFBUVlIQmdjMkJSRVVGeFlYRmhjMk56WTNOalVSSkJjbUp5WVRBUVl2QVNZL0FUWXlId0VXTmpjbE5qSWZBUllCOVZWVlFrK3YvdEZIUG14ZWJHeGRiVDFJL3RHdlQwSlZvLzdWQkFTS0F3TVNBUVVCY1FFRkFnRVNBZ1VCRVFRRDR4TVlFaGszWVA2c2puVmxTRDhjSEQ5SVpYV09BVlJnTnhrU0dQNjIvdGtEQTQ4RUJCa0NBVllDQVFIbEFRSVFCQUFBQUFBREFBQUFBQU94QStRQUd3QXFBRE1BQUFFR0J3WUhCZ2NHTnhFVUZ4WVhGaGMyTnpZM05qVVJKQmNtSnlZSE16SVdGUU1VQmlzQklpY0RORFlUSWlZME5qSVdGQVlCOVVGQk9Ec3NPMzhnUno1c1hteHNYVzA5U1A3WXFGQkJWVzgwQkFZTUF3SW1CUUVMQmg0UEZoWWVGUlVENUE4U0RoSU9FaWtLL3EyUGRXUkpQaDBkUGtsa2RZOEJVMTQxR1JJWS9BWUUvc1lDQXdVQk9nUUcva0FWSHhVVkh4VUFBQUFDQUFBQUFBUGtBK1FBRndBdEFBQUJJZ2NHQndZVkZCY1dGeFl6TWpjMk56WTFOQ2NtSnlZVEFRWWlMd0VtUHdFMk1oOEJGakkzQVRZeUh3RVdBZTZFY205QlEwTkNibk9EaVhWeFFrUkVRbkYxa2Y2Z0FRVUJvd01ERmdFRkFZVUNCUUVCUXdJRkFSVUVBK05FUW5GMWlZTnpia0pEUTBGdmNvU0pkWEZDUlA2ai9xVUJBYWdFQlI0Q0FXWUJBUUVOQWdJVkJBQUFBQVFBQUFBQUE2OERyUUFVQUNrQVB3QkRBQUFCSWdjR0J3WVVGeFlYRmpJM05qYzJOQ2NtSnlZRElpY21KeVkwTnpZM05qSVhGaGNXRkFjR0J3WVRCUTRCTHdFbUJnOEJCaFlmQVJZeU53RStBU1lpRnpBZkFRSDFlR2RrT3p3OE8yUm44R1prT3p3OE8yUm1lRzVlV3pZM056WmJYdHRlV3pZM056WmJYbW4rOWdZU0JtQUdEd1VEQlFFR2ZRVVFCZ0VsQlFFTEVCVUJBUU90UER0a1ovQm5ZenM4UER0alovQm5aRHM4L0s4M05WdGUyMTVjTlRjM05WeGUyMTViTlRjQ0p0MEZBUVZKQlFJR0JBY1JCb0FHQlFFaEJROExCQUVCQUFBQkFBQUFBQU83QXpvQUZ3QUFFeTRCUHdFK0FSOEJGalkzQVRZV0Z5Y1dGQWNCQmlJblBRb0dCd1VIR2d6TERDRUxBaDBMSHdzTkNncjl1UW9lQ2dHekN5RU9DdzBIQ1pNSkFRb0J2Z2tDQ2cwTEhRdjlzUXNLQUFBQUFBSUFBQUFBQStVRDVnQVhBQ3dBQUFFaUJ3WUhCaFVVRnhZWEZqTXlOelkzTmpVMEp5WW5KaE1IQmk4QkppY21OUk0wTmpzQk1oWVZFeGNlQVFIdmhISnZRVU5EUW01emc0bDFjVUpFUkVKeGRWY1FBd1Q2QXdJRUVBTUNLd0lERHNVQ0FRUGxSRUp4ZFltRGMyNUNRME5CYjNLRWlYVnhRa1Q5Vmh3RUFuY0NBZ01HQVhvQ0F3TUMvcTJGQWdRQUFBUUFBQUFBQTY4RHJRQURBQmdBTFFBekFBQUJNQjhCQXlJSEJnY0dGQmNXRnhZeU56WTNOalFuSmljbUF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBeU1WTXpVakF1VUJBZko0WjJRN1BEdzdaR2Z3Wm1RN1BEdzdaR1o0Ymw1Yk5qYzNObHRlMjE1Yk5qYzNObHRlbXlUOTJRS0RBUUVCTER3N1pHZndaMk03UER3N1kyZndaMlE3UFB5dk56VmJYdHRlWERVM056VmNYdHRlV3pVM0FqSDlKQUFBQUFNQUFBQUFBK1FENUFBWEFDY0FNQUFBQVNJSEJnY0dGUlFYRmhjV016STNOamMyTlRRbkppY21Bek15RmhVREZBWXJBU0ltTlFNME5oTWlKalEyTWhZVUJnSHVoSEp2UVVORFFtNXpnNGwxY1VKRVJFSnhkWjQyQkFZTUF3SW5Bd01NQmg4UEZoWWVGaFlENDBSQ2NYV0pnM051UWtORFFXOXloSWwxY1VKRS92WUdCZjdBQWdNREFnRkFCUWIrTmhZZkZoWWZGZ0FBQkFBQUFBQUR3QVBBQUFnQUVnQW9BRDBBQUFFeU5qUW1JZ1lVRmhjakZUTVJJeFV6TlNNRElnY0dCd1lWRkJZWEZqTXlOelkzTmpVMEp5NEJBeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQWZRWUlTRXdJU0ZSanprNXlUb3JoRzVyUFQ5OWFtK0RkbWhsUEQ0K1BNeUZiVjViTlRjM05WdGUybDViTlRjM05WdGVBcUFpTHlJaUx5STVIZjdFSEJ3Q3NUODlhMjZFZDh3OFBqNDhaV2gyZzI5cWZmeWpOelZiWHRwZVd6VTNOelZiWHRwZVd6VTNBQUFEQUFBQUFBT29BNmdBQ3dBZ0FEVUFBQUVISndjWEJ4YzNGemNuTndNaUJ3WUhCaFFYRmhjV01qYzJOelkwSnlZbkpnTWlKeVluSmpRM05qYzJNaGNXRnhZVUJ3WUhCZ0tPbXBvY21wb2NtcG9jbXBxMmRtWmlPanM3T21KbTdHWmlPanM3T21KbWRtdGRXVFEyTmpSWlhkWmRXVFEyTmpSWlhRS3FtcG9jbXBvY21wb2NtcG9CR1RzNlltYnNabUk2T3pzNlltYnNabUk2Ty96Q05qUlpYZFpkV1RRMk5qUlpYZFpkV1RRMkFBTUFBQUFBQStrRDZnQWFBQzhBTUFBQUFRWUhCaU1pSnlZbkpqUTNOamMyTWhjV0Z4WVZGQWNHQndFSEFUSTNOamMyTkNjbUp5WWlCd1lIQmhRWEZoY1dNd0tPTlVCQ1IyMWRXalUzTnpWYVhkcGRXelUyR0JjckFTTTUvZUJYUzBnckt5c3JTRXV1U2trcUxDd3FTVXBYQVNNckZ4ZzJOVnRkMmwxYU5UYzNOVnBkYlVkQ1FEWCszamtCR1NzclNFdXVTa2txTEN3cVNVcXVTMGdyS3dBQy8vOEFBQVBvQStnQUZBQXdBQUFCSWdjR0J3WVFGeFlYRmlBM05qYzJFQ2NtSnlZVEZnNEJJaThCQndZdUFUUS9BU2NtUGdFV0h3RTNOaDRCQmc4QkFmU0lkSEZEUkVSRGNYUUJFSFJ4UTBSRVEzRjBTUW9CRkJzS29xZ0tHeE1LcUtJS0FSUWJDcUtvQ2hzVUFRcW9BK2hFUTNGMC92QjBjVU5FUkVOeGRBRVFkSEZEUlAxakNoc1RDcWlpQ2dFVUd3cWlxQW9iRkFFS3FLSUtBUlFiQ3FJQUFBSUFBQUFBQStRRDVBQVhBRFFBQUFFaUJ3WUhCaFVVRnhZWEZqTXlOelkzTmpVMEp5WW5KaE1VQmlNRkZ4WVVEd0VHTHdFdUFUOEJOaDhCRmhRUEFRVXlGaDBCQWU2RWNtOUJRME5DYm5PRGlYVnhRa1JFUW5GMWZ3UUMvcEdEQVFFVkF3VHNBZ0VDN0FRRUZBSUJoQUZ3QWdNRDQwUkNjWFdKZzNOdVFrTkRRVzl5aElsMWNVSkUvZllDQXd1VkFnUUNGQVFFMEFJRkF0RUVCQlFDQlFHVkN3TURKd0FBQUFVQUFBQUFBOVFEMHdBakFDY0FOd0JIQUVnQUFBRVJGQVlqSVNJbU5SRWpJaVk5QVRRMk15RTFORFl6SVRJV0hRRWhNaFlkQVJRR0l5RVJJUkVISWdZVkVSUVdPd0V5TmpVUk5DWWpJU0lHRlJFVUZqc0JNalkxRVRRbUt3RURleVliL1hZYkprTUpEUTBKQVFZWkVnRXZFeGtCQmdrTkRRbjlDUUpjMFFrTkRRa3RDUTBOQ2Y3c0NRME5DUzBKRFEwSkxRTWkvVFFiSmlZYkFzd01DaXdKRFM0U0dSa1NMZzBKTEFvTS9Vd0N0R3NOQ2Y1TkNRME5DUUd6Q1EwTkNmNU5DUTBOQ1FHekNRMEFBQUFBRUFER0FBRUFBQUFBQUFFQUJBQUFBQUVBQUFBQUFBSUFCd0FFQUFFQUFBQUFBQU1BQkFBTEFBRUFBQUFBQUFRQUJBQVBBQUVBQUFBQUFBVUFDd0FUQUFFQUFBQUFBQVlBQkFBZUFBRUFBQUFBQUFvQUt3QWlBQUVBQUFBQUFBc0FFd0JOQUFNQUFRUUpBQUVBQ0FCZ0FBTUFBUVFKQUFJQURnQm9BQU1BQVFRSkFBTUFDQUIyQUFNQUFRUUpBQVFBQ0FCK0FBTUFBUVFKQUFVQUZnQ0dBQU1BQVFRSkFBWUFDQUNjQUFNQUFRUUpBQW9BVmdDa0FBTUFBUVFKQUFzQUpnRDZkMlYxYVZKbFozVnNZWEozWlhWcGQyVjFhVlpsY25OcGIyNGdNUzR3ZDJWMWFVZGxibVZ5WVhSbFpDQmllU0J6ZG1jeWRIUm1JR1p5YjIwZ1JtOXVkR1ZzYkc4Z2NISnZhbVZqZEM1b2RIUndPaTh2Wm05dWRHVnNiRzh1WTI5dEFIY0FaUUIxQUdrQVVnQmxBR2NBZFFCc0FHRUFjZ0IzQUdVQWRRQnBBSGNBWlFCMUFHa0FWZ0JsQUhJQWN3QnBBRzhBYmdBZ0FERUFMZ0F3QUhjQVpRQjFBR2tBUndCbEFHNEFaUUJ5QUdFQWRBQmxBR1FBSUFCaUFIa0FJQUJ6QUhZQVp3QXlBSFFBZEFCbUFDQUFaZ0J5QUc4QWJRQWdBRVlBYndCdUFIUUFaUUJzQUd3QWJ3QWdBSEFBY2dCdkFHb0FaUUJqQUhRQUxnQm9BSFFBZEFCd0FEb0FMd0F2QUdZQWJ3QnVBSFFBWlFCc0FHd0Fid0F1QUdNQWJ3QnRBQUFBQWdBQUFBQUFBQUFLQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVNBUUlCQXdFRUFRVUJCZ0VIQVFnQkNRRUtBUXNCREFFTkFRNEJEd0VRQVJFQkVnRVRBQVpqYVhKamJHVUlaRzkzYm14dllXUUVhVzVtYnd4ellXWmxYM04xWTJObGMzTUpjMkZtWlY5M1lYSnVCM04xWTJObGMzTU9jM1ZqWTJWemN5MWphWEpqYkdVUmMzVmpZMlZ6Y3kxdWJ5MWphWEpqYkdVSGQyRnBkR2x1Wnc1M1lXbDBhVzVuTFdOcGNtTnNaUVIzWVhKdUMybHVabTh0WTJseVkyeGxCbU5oYm1ObGJBWnpaV0Z5WTJnRlkyeGxZWElFWW1GamF3WmtaV3hsZEdVQUFBQUFcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIil9W2NsYXNzKj1cXFwiIHdldWktaWNvbi1cXFwiXSxbY2xhc3NePXdldWktaWNvbi1de2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtmb250Om5vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHgvMSB3ZXVpO2ZvbnQtc2l6ZTppbmhlcml0O3RleHQtcmVuZGVyaW5nOmF1dG87LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZH1bY2xhc3MqPVxcXCIgd2V1aS1pY29uLVxcXCJdOmJlZm9yZSxbY2xhc3NePXdldWktaWNvbi1dOmJlZm9yZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tbGVmdDouMmVtO21hcmdpbi1yaWdodDouMmVtfS53ZXVpLWljb24tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwMVxcXCJ9LndldWktaWNvbi1kb3dubG9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDJcXFwifS53ZXVpLWljb24taW5mbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDNcXFwifS53ZXVpLWljb24tc2FmZS1zdWNjZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwNFxcXCJ9LndldWktaWNvbi1zYWZlLXdhcm46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA1XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA2XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3MtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwN1xcXCJ9LndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwifS53ZXVpLWljb24td2FpdGluZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDlcXFwifS53ZXVpLWljb24td2FpdGluZy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBBXFxcIn0ud2V1aS1pY29uLXdhcm46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBCXFxcIn0ud2V1aS1pY29uLWluZm8tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwQ1xcXCJ9LndldWktaWNvbi1jYW5jZWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBEXFxcIn0ud2V1aS1pY29uLXNlYXJjaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEVcXFwifS53ZXVpLWljb24tY2xlYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBGXFxcIn0ud2V1aS1pY29uLWJhY2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTEwXFxcIn0ud2V1aS1pY29uLWRlbGV0ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMTFcXFwifVtjbGFzcyo9XFxcIiB3ZXVpLWljb25fXFxcIl06YmVmb3JlLFtjbGFzc149d2V1aS1pY29uX106YmVmb3Jle21hcmdpbjowfS53ZXVpLWljb24tc3VjY2Vzc3tmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24td2FpdGluZ3tmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24td2Fybntmb250LXNpemU6MjNweDtjb2xvcjojZjQzNTMwfS53ZXVpLWljb24taW5mb3tmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24tc3VjY2Vzcy1jaXJjbGUsLndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24td2FpdGluZy1jaXJjbGV7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzEwYWVmZn0ud2V1aS1pY29uLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojYzljOWM5fS53ZXVpLWljb24tZG93bmxvYWQsLndldWktaWNvbi1pbmZvLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24tc2FmZS1zdWNjZXNze2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi1zYWZlLXdhcm57Y29sb3I6I2ZmYmUwMH0ud2V1aS1pY29uLWNhbmNlbHtjb2xvcjojZjQzNTMwO2ZvbnQtc2l6ZToyMnB4fS53ZXVpLWljb24tY2xlYXIsLndldWktaWNvbi1zZWFyY2h7Y29sb3I6I2IyYjJiMjtmb250LXNpemU6MTRweH0ud2V1aS1pY29uLWRlbGV0ZS53ZXVpLWljb25fZ2FsbGVyeS1kZWxldGV7Y29sb3I6I2ZmZjtmb250LXNpemU6MjJweH0ud2V1aS1pY29uX21zZ3tmb250LXNpemU6OTNweH0ud2V1aS1pY29uX21zZy53ZXVpLWljb24td2Fybntjb2xvcjojZjc2MjYwfS53ZXVpLWljb25fbXNnLXByaW1hcnl7Zm9udC1zaXplOjkzcHh9LndldWktaWNvbl9tc2ctcHJpbWFyeS53ZXVpLWljb24td2Fybntjb2xvcjojZmZiZTAwfS53ZXVpLWJ0bntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG87cGFkZGluZy1sZWZ0OjE0cHg7cGFkZGluZy1yaWdodDoxNHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtmb250LXNpemU6MThweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjIuNTU1NTU1NTY7Ym9yZGVyLXJhZGl1czo1cHg7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWJ0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjt3aWR0aDoyMDAlO2hlaWdodDoyMDAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjIpOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC41KTt0cmFuc2Zvcm06c2NhbGUoLjUpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1yYWRpdXM6MTBweH0ud2V1aS1idG5faW5saW5le2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLWJ0bl9kZWZhdWx0e2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZjhmOGY4fS53ZXVpLWJ0bl9kZWZhdWx0Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6IzAwMH0ud2V1aS1idG5fZGVmYXVsdDpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6cmdiYSgwLDAsMCwuNik7YmFja2dyb3VuZC1jb2xvcjojZGVkZWRlfS53ZXVpLWJ0bl9wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzFhYWQxOX0ud2V1aS1idG5fcHJpbWFyeTpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVke2NvbG9yOiNmZmZ9LndldWktYnRuX3ByaW1hcnk6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6YWN0aXZle2NvbG9yOmhzbGEoMCwwJSwxMDAlLC42KTtiYWNrZ3JvdW5kLWNvbG9yOiMxNzliMTZ9LndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZTY0MzQwfS53ZXVpLWJ0bl93YXJuOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6I2ZmZn0ud2V1aS1idG5fd2Fybjpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpO2JhY2tncm91bmQtY29sb3I6I2NlM2MzOX0ud2V1aS1idG5fZGlzYWJsZWR7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpfS53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9kZWZhdWx0e2NvbG9yOnJnYmEoMCwwLDAsLjMpO2JhY2tncm91bmQtY29sb3I6I2Y3ZjdmN30ud2V1aS1idG5fZGlzYWJsZWQud2V1aS1idG5fcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiM5ZWQ5OWR9LndldWktYnRuX2Rpc2FibGVkLndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZWM4Yjg5fS53ZXVpLWJ0bl9sb2FkaW5nIC53ZXVpLWxvYWRpbmd7bWFyZ2luOi0uMmVtIC4zNGVtIDAgMH0ud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl9wcmltYXJ5LC53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm57Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojMTc5YjE2fS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojY2UzYzM5fS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5e2NvbG9yOiMxYWFkMTk7Ym9yZGVyOjFweCBzb2xpZCAjMWFhZDE5fS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5Om5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDI2LDE3MywyNSwuNik7Ym9yZGVyLWNvbG9yOnJnYmEoMjYsMTczLDI1LC42KX0ud2V1aS1idG5fcGxhaW4tcHJpbWFyeTphZnRlcntib3JkZXItd2lkdGg6MH0ud2V1aS1idG5fcGxhaW4tZGVmYXVsdHtjb2xvcjojMzUzNTM1O2JvcmRlcjoxcHggc29saWQgIzM1MzUzNX0ud2V1aS1idG5fcGxhaW4tZGVmYXVsdDpub3QoLndldWktYnRuX3BsYWluLWRpc2FibGVkKTphY3RpdmV7Y29sb3I6cmdiYSg1Myw1Myw1MywuNik7Ym9yZGVyLWNvbG9yOnJnYmEoNTMsNTMsNTMsLjYpfS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0OmFmdGVye2JvcmRlci13aWR0aDowfS53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZHtjb2xvcjpyZ2JhKDAsMCwwLC4yKTtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMil9YnV0dG9uLndldWktYnRuLGlucHV0LndldWktYnRue3dpZHRoOjEwMCU7Ym9yZGVyLXdpZHRoOjA7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lfWJ1dHRvbi53ZXVpLWJ0bjpmb2N1cyxpbnB1dC53ZXVpLWJ0bjpmb2N1c3tvdXRsaW5lOjB9YnV0dG9uLndldWktYnRuX2lubGluZSxidXR0b24ud2V1aS1idG5fbWluaSxpbnB1dC53ZXVpLWJ0bl9pbmxpbmUsaW5wdXQud2V1aS1idG5fbWluaXt3aWR0aDphdXRvfWJ1dHRvbi53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0LGJ1dHRvbi53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5LGlucHV0LndldWktYnRuX3BsYWluLWRlZmF1bHQsaW5wdXQud2V1aS1idG5fcGxhaW4tcHJpbWFyeXtib3JkZXItd2lkdGg6MXB4O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LndldWktYnRuX21pbml7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIDEuMzJlbTtsaW5lLWhlaWdodDoyLjM7Zm9udC1zaXplOjEzcHh9LndldWktYnRuKy53ZXVpLWJ0bnttYXJnaW4tdG9wOjE1cHh9LndldWktYnRuLndldWktYnRuX2lubGluZSsud2V1aS1idG4ud2V1aS1idG5faW5saW5le21hcmdpbi10b3A6YXV0bzttYXJnaW4tbGVmdDoxNXB4fS53ZXVpLWJ0bi1hcmVhe21hcmdpbjoxLjE3NjQ3MDU5ZW0gMTVweCAuM2VtfS53ZXVpLWJ0bi1hcmVhX2lubGluZXtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWJ0bi1hcmVhX2lubGluZSAud2V1aS1idG57bWFyZ2luLXRvcDphdXRvO21hcmdpbi1yaWdodDoxNXB4O3dpZHRoOjEwMCU7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWJ0bi1hcmVhX2lubGluZSAud2V1aS1idG46bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MH0ud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjEuMTc2NDcwNTllbTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MS40NzA1ODgyNDtmb250LXNpemU6MTdweDtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9LndldWktY2VsbHM6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWNlbGxzOmFmdGVyLC53ZXVpLWNlbGxzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTU7ei1pbmRleDoyfS53ZXVpLWNlbGxzOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWNlbGxzX190aXRsZXttYXJnaW4tdG9wOi43N2VtO21hcmdpbi1ib3R0b206LjNlbTtwYWRkaW5nLWxlZnQ6MTVweDtwYWRkaW5nLXJpZ2h0OjE1cHg7Y29sb3I6Izk5OTtmb250LXNpemU6MTRweH0ud2V1aS1jZWxsc19fdGl0bGUrLndldWktY2VsbHN7bWFyZ2luLXRvcDowfS53ZXVpLWNlbGxzX190aXBze21hcmdpbi10b3A6LjNlbTtjb2xvcjojOTk5O3BhZGRpbmctbGVmdDoxNXB4O3BhZGRpbmctcmlnaHQ6MTVweDtmb250LXNpemU6MTRweH0ud2V1aS1jZWxse3BhZGRpbmc6MTBweCAxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktY2VsbDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweDt6LWluZGV4OjJ9LndldWktY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWNlbGxfcHJpbWFyeXstd2Via2l0LWJveC1hbGlnbjpzdGFydDstbXMtZmxleC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS53ZXVpLWNlbGxfX2Jkey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1jZWxsX19mdHt0ZXh0LWFsaWduOnJpZ2h0O2NvbG9yOiM5OTl9LndldWktY2VsbF9zd2lwZWR7ZGlzcGxheTpibG9jaztwYWRkaW5nOjB9LndldWktY2VsbF9zd2lwZWQ+LndldWktY2VsbF9fYmR7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud2V1aS1jZWxsX3N3aXBlZD4ud2V1aS1jZWxsX19mdHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Y29sb3I6I2ZmZn0ud2V1aS1zd2lwZWQtYnRue2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDFlbTtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0O2NvbG9yOmluaGVyaXR9LndldWktc3dpcGVkLWJ0bl9kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2M3YzdjY30ud2V1aS1zd2lwZWQtYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZmYzYjMwfS53ZXVpLWNlbGxfYWNjZXNzey13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO2NvbG9yOmluaGVyaXR9LndldWktY2VsbF9hY2Nlc3M6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1jZWxsX2FjY2VzcyAud2V1aS1jZWxsX19mdHtwYWRkaW5nLXJpZ2h0OjEzcHg7cG9zaXRpb246cmVsYXRpdmV9LndldWktY2VsbF9hY2Nlc3MgLndldWktY2VsbF9fZnQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjZweDt3aWR0aDo2cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2JvcmRlci1jb2xvcjojYzhjOGNkO2JvcmRlci1zdHlsZTpzb2xpZDstd2Via2l0LXRyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3RyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bWFyZ2luLXRvcDotNHB4O3JpZ2h0OjJweH0ud2V1aS1jZWxsX2xpbmt7Y29sb3I6IzU4NmM5NDtmb250LXNpemU6MTRweH0ud2V1aS1jZWxsX2xpbms6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6YmxvY2t9LndldWktY2hlY2tfX2xhYmVsey13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLWNoZWNrX19sYWJlbDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWNoZWNre3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTllbX0ud2V1aS1jZWxsc19yYWRpbyAud2V1aS1jZWxsX19mdHtwYWRkaW5nLWxlZnQ6LjM1ZW19LndldWktY2VsbHNfcmFkaW8gLndldWktY2hlY2s6Y2hlY2tlZCsud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2Rpc3BsYXk6YmxvY2s7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwiO2NvbG9yOiMwOWJiMDc7Zm9udC1zaXplOjE2cHh9LndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2VsbF9faGR7cGFkZGluZy1yaWdodDouMzVlbX0ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAxXFxcIjtjb2xvcjojYzljOWM5O2ZvbnQtc2l6ZToyM3B4O2Rpc3BsYXk6YmxvY2t9LndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2hlY2s6Y2hlY2tlZCsud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA2XFxcIjtjb2xvcjojMDliYjA3fS53ZXVpLWxhYmVse2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTA1cHg7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGx9LndldWktaW5wdXR7d2lkdGg6MTAwJTtib3JkZXI6MDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtmb250LXNpemU6aW5oZXJpdDtjb2xvcjppbmhlcml0O2hlaWdodDoxLjQ3MDU4ODI0ZW07bGluZS1oZWlnaHQ6MS40NzA1ODgyNH0ud2V1aS1pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwud2V1aS1pbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbnstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTttYXJnaW46MH0ud2V1aS10ZXh0YXJlYXtkaXNwbGF5OmJsb2NrO2JvcmRlcjowO3Jlc2l6ZTpub25lO3dpZHRoOjEwMCU7Y29sb3I6aW5oZXJpdDtmb250LXNpemU6MWVtO2xpbmUtaGVpZ2h0OmluaGVyaXQ7b3V0bGluZTowfS53ZXVpLXRleHRhcmVhLWNvdW50ZXJ7Y29sb3I6I2IyYjJiMjt0ZXh0LWFsaWduOnJpZ2h0fS53ZXVpLWNlbGxfd2FybiAud2V1aS10ZXh0YXJlYS1jb3VudGVye2NvbG9yOiNlNjQzNDB9LndldWktdG9wdGlwc3tkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtwYWRkaW5nOjVweDtmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojZmZmO3otaW5kZXg6NTAwMDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ud2V1aS10b3B0aXBzX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZTY0MzQwfS53ZXVpLWNlbGxzX2Zvcm0gLndldWktY2VsbF9fZnR7Zm9udC1zaXplOjB9LndldWktY2VsbHNfZm9ybSAud2V1aS1pY29uLXdhcm57ZGlzcGxheTpub25lfS53ZXVpLWNlbGxzX2Zvcm0gaW5wdXQsLndldWktY2VsbHNfZm9ybSBsYWJlbFtmb3JdLC53ZXVpLWNlbGxzX2Zvcm0gdGV4dGFyZWF7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktY2VsbF93YXJue2NvbG9yOiNlNjQzNDB9LndldWktY2VsbF93YXJuIC53ZXVpLWljb24td2FybntkaXNwbGF5OmlubGluZS1ibG9ja30ud2V1aS1mb3JtLXByZXZpZXd7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZC1jb2xvcjojZmZmfS53ZXVpLWZvcm0tcHJldmlldzpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZm9ybS1wcmV2aWV3OmFmdGVyLC53ZXVpLWZvcm0tcHJldmlldzpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLWZvcm0tcHJldmlldzphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2hke3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweCAxNXB4O3RleHQtYWxpZ246cmlnaHQ7bGluZS1oZWlnaHQ6Mi41ZW19LndldWktZm9ybS1wcmV2aWV3X19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4fS53ZXVpLWZvcm0tcHJldmlld19faGQgLndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtmb250LXN0eWxlOm5vcm1hbDtmb250LXNpemU6MS42ZW19LndldWktZm9ybS1wcmV2aWV3X19iZHtwYWRkaW5nOjEwcHggMTVweDtmb250LXNpemU6LjllbTt0ZXh0LWFsaWduOnJpZ2h0O2NvbG9yOiM5OTk7bGluZS1oZWlnaHQ6Mn0ud2V1aS1mb3JtLXByZXZpZXdfX2Z0e3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjUwcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1mb3JtLXByZXZpZXdfX2Z0OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZm9ybS1wcmV2aWV3X19pdGVte292ZXJmbG93OmhpZGRlbn0ud2V1aS1mb3JtLXByZXZpZXdfX2xhYmVse2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OjFlbTttaW4td2lkdGg6NGVtO2NvbG9yOiM5OTk7dGV4dC1hbGlnbjpqdXN0aWZ5O3RleHQtYWxpZ24tbGFzdDpqdXN0aWZ5fS53ZXVpLWZvcm0tcHJldmlld19fdmFsdWV7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47d29yZC1icmVhazpub3JtYWw7d29yZC13cmFwOmJyZWFrLXdvcmR9LndldWktZm9ybS1wcmV2aWV3X19idG57cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzNjYzUxZjt0ZXh0LWFsaWduOmNlbnRlcjstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1idXR0b24ud2V1aS1mb3JtLXByZXZpZXdfX2J0bntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO291dGxpbmU6MDtsaW5lLWhlaWdodDppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0fS53ZXVpLWZvcm0tcHJldmlld19fYnRuOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9LndldWktZm9ybS1wcmV2aWV3X19idG46YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bjpmaXJzdC1jaGlsZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktZm9ybS1wcmV2aWV3X19idG5fZGVmYXVsdHtjb2xvcjojOTk5fS53ZXVpLWZvcm0tcHJldmlld19fYnRuX3ByaW1hcnl7Y29sb3I6IzBiYjIwY30ud2V1aS1jZWxsX3NlbGVjdHtwYWRkaW5nOjB9LndldWktY2VsbF9zZWxlY3QgLndldWktc2VsZWN0e3BhZGRpbmctcmlnaHQ6MzBweH0ud2V1aS1jZWxsX3NlbGVjdCAud2V1aS1jZWxsX19iZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtyaWdodDoxNXB4O21hcmdpbi10b3A6LTRweH0ud2V1aS1zZWxlY3R7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7Ym9yZGVyOjA7b3V0bGluZTowO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7d2lkdGg6MTAwJTtmb250LXNpemU6aW5oZXJpdDtoZWlnaHQ6NDVweDtsaW5lLWhlaWdodDo0NXB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MTtwYWRkaW5nLWxlZnQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmV7cGFkZGluZy1yaWdodDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1zZWxlY3R7d2lkdGg6MTA1cHg7Ym94LXNpemluZzpib3JkZXItYm94fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZHtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjZweDt3aWR0aDo2cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2JvcmRlci1jb2xvcjojYzhjOGNkO2JvcmRlci1zdHlsZTpzb2xpZDstd2Via2l0LXRyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3RyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7cmlnaHQ6MTVweDttYXJnaW4tdG9wOi00cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2Jke3BhZGRpbmctbGVmdDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19iZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktY2VsbF9zZWxlY3QtYWZ0ZXJ7cGFkZGluZy1sZWZ0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYWZ0ZXIgLndldWktc2VsZWN0e3BhZGRpbmctbGVmdDowfS53ZXVpLWNlbGxfdmNvZGV7cGFkZGluZy10b3A6MDtwYWRkaW5nLXJpZ2h0OjA7cGFkZGluZy1ib3R0b206MH0ud2V1aS12Y29kZS1idG4sLndldWktdmNvZGUtaW1ne21hcmdpbi1sZWZ0OjVweDtoZWlnaHQ6NDVweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktdmNvZGUtYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MCAuNmVtIDAgLjdlbTtib3JkZXItbGVmdDoxcHggc29saWQgI2U1ZTVlNTtsaW5lLWhlaWdodDo0NXB4O2ZvbnQtc2l6ZToxN3B4O2NvbG9yOiMzY2M1MWZ9YnV0dG9uLndldWktdmNvZGUtYnRue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcDowO2JvcmRlci1yaWdodDowO2JvcmRlci1ib3R0b206MDtvdXRsaW5lOjB9LndldWktdmNvZGUtYnRuOmFjdGl2ZXtjb2xvcjojNTJhMzQxfS53ZXVpLWdhbGxlcnl7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6IzAwMDt6LWluZGV4OjEwMDB9LndldWktZ2FsbGVyeV9faW1ne3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjYwcHg7bGVmdDowO2JhY2tncm91bmQ6NTAlIG5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbn0ud2V1aS1nYWxsZXJ5X19vcHJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7YmFja2dyb3VuZC1jb2xvcjojMGQwZDBkO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6NjBweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1nYWxsZXJ5X19kZWx7ZGlzcGxheTpibG9ja30ud2V1aS1jZWxsX3N3aXRjaHtwYWRkaW5nLXRvcDo2LjVweDtwYWRkaW5nLWJvdHRvbTo2LjVweH0ud2V1aS1zd2l0Y2h7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lfS53ZXVpLXN3aXRjaCwud2V1aS1zd2l0Y2gtY3BfX2JveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo1MnB4O2hlaWdodDozMnB4O2JvcmRlcjoxcHggc29saWQgI2RmZGZkZjtvdXRsaW5lOjA7Ym9yZGVyLXJhZGl1czoxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kLWNvbG9yOiNkZmRmZGY7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xcyxib3JkZXIgLjFzfS53ZXVpLXN3aXRjaC1jcF9fYm94OmJlZm9yZSwud2V1aS1zd2l0Y2g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDo1MHB4O2hlaWdodDozMHB4O2JvcmRlci1yYWRpdXM6MTVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZGZkZmQ7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKSwtd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKX0ud2V1aS1zd2l0Y2gtY3BfX2JveDphZnRlciwud2V1aS1zd2l0Y2g6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC40KTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpLC13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWR+LndldWktc3dpdGNoLWNwX19ib3gsLndldWktc3dpdGNoOmNoZWNrZWR7Ym9yZGVyLWNvbG9yOiMwNGJlMDI7YmFja2dyb3VuZC1jb2xvcjojMDRiZTAyfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveDpiZWZvcmUsLndldWktc3dpdGNoOmNoZWNrZWQ6YmVmb3Jley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWR+LndldWktc3dpdGNoLWNwX19ib3g6YWZ0ZXIsLndldWktc3dpdGNoOmNoZWNrZWQ6YWZ0ZXJ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgyMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgyMHB4KX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTlweH0ud2V1aS1zd2l0Y2gtY3BfX2JveHtkaXNwbGF5OmJsb2NrfS53ZXVpLXVwbG9hZGVyX19oZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3BhZGRpbmctYm90dG9tOjEwcHg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktdXBsb2FkZXJfX3RpdGxley13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS11cGxvYWRlcl9faW5mb3tjb2xvcjojYjJiMmIyfS53ZXVpLXVwbG9hZGVyX19iZHttYXJnaW4tYm90dG9tOi00cHg7bWFyZ2luLXJpZ2h0Oi05cHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXVwbG9hZGVyX19maWxlc3tsaXN0LXN0eWxlOm5vbmV9LndldWktdXBsb2FkZXJfX2ZpbGV7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6OXB4O21hcmdpbi1ib3R0b206OXB4O3dpZHRoOjc5cHg7aGVpZ2h0Ojc5cHg7YmFja2dyb3VuZDpuby1yZXBlYXQgNTAlO2JhY2tncm91bmQtc2l6ZTpjb3Zlcn0ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXN7cG9zaXRpb246cmVsYXRpdmV9LndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpfS53ZXVpLXVwbG9hZGVyX19maWxlX3N0YXR1cyAud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50e2Rpc3BsYXk6YmxvY2t9LndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudHtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7Y29sb3I6I2ZmZn0ud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50IC53ZXVpLWljb24td2FybntkaXNwbGF5OmlubGluZS1ibG9ja30ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94e2Zsb2F0OmxlZnQ7cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luLXJpZ2h0OjlweDttYXJnaW4tYm90dG9tOjlweDt3aWR0aDo3N3B4O2hlaWdodDo3N3B4O2JvcmRlcjoxcHggc29saWQgI2Q5ZDlkOX0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFmdGVyLC53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2JhY2tncm91bmQtY29sb3I6I2Q5ZDlkOX0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmJlZm9yZXt3aWR0aDoycHg7aGVpZ2h0OjM5LjVweH0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFmdGVye3dpZHRoOjM5LjVweDtoZWlnaHQ6MnB4fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZle2JvcmRlci1jb2xvcjojOTk5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZlOmFmdGVyLC53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZlOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiM5OTl9LndldWktdXBsb2FkZXJfX2lucHV0e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvcGFjaXR5OjA7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktbXNne3BhZGRpbmctdG9wOjM2cHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktbXNnX19pY29uLWFyZWF7bWFyZ2luLWJvdHRvbTozMHB4fS53ZXVpLW1zZ19fdGV4dC1hcmVhe21hcmdpbi1ib3R0b206MjVweDtwYWRkaW5nOjAgMjBweH0ud2V1aS1tc2dfX3RleHQtYXJlYSBhe2NvbG9yOiM1ODZjOTR9LndldWktbXNnX190aXRsZXttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjIwcHh9LndldWktbXNnX19kZXNje2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM5OTl9LndldWktbXNnX19vcHItYXJlYXttYXJnaW4tYm90dG9tOjI1cHh9LndldWktbXNnX19leHRyYS1hcmVhe21hcmdpbi1ib3R0b206MTVweDtmb250LXNpemU6MTRweDtjb2xvcjojOTk5fS53ZXVpLW1zZ19fZXh0cmEtYXJlYSBhe2NvbG9yOiM1ODZjOTR9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6NDM4cHgpey53ZXVpLW1zZ19fZXh0cmEtYXJlYXtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7Ym90dG9tOjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcn19LndldWktYXJ0aWNsZXtwYWRkaW5nOjIwcHggMTVweDtmb250LXNpemU6MTVweH0ud2V1aS1hcnRpY2xlIHNlY3Rpb257bWFyZ2luLWJvdHRvbToxLjVlbX0ud2V1aS1hcnRpY2xlIGgxe2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tYm90dG9tOi45ZW19LndldWktYXJ0aWNsZSBoMntmb250LXNpemU6MTZweH0ud2V1aS1hcnRpY2xlIGgyLC53ZXVpLWFydGljbGUgaDN7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjM0ZW19LndldWktYXJ0aWNsZSBoM3tmb250LXNpemU6MTVweH0ud2V1aS1hcnRpY2xlICp7bWF4LXdpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3dvcmQtd3JhcDpicmVhay13b3JkfS53ZXVpLWFydGljbGUgcHttYXJnaW46MCAwIC44ZW19LndldWktdGFiYmFye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo1MDA7Ym90dG9tOjA7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y3ZmF9LndldWktdGFiYmFyOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNjMGJmYzQ7Y29sb3I6I2MwYmZjNDstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktdGFiYmFyX19pdGVte2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3BhZGRpbmc6NXB4IDAgMDtmb250LXNpemU6MDtjb2xvcjojOTk5O3RleHQtYWxpZ246Y2VudGVyOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2ljb24sLndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9faWNvbj5pLC53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2xhYmVse2NvbG9yOiMwOWJiMDd9LndldWktdGFiYmFyX19pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjI3cHg7aGVpZ2h0OjI3cHh9LndldWktdGFiYmFyX19pY29uPmksaS53ZXVpLXRhYmJhcl9faWNvbntmb250LXNpemU6MjRweDtjb2xvcjojOTk5fS53ZXVpLXRhYmJhcl9faWNvbiBpbWd7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ud2V1aS10YWJiYXJfX2xhYmVse3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM5OTk7Zm9udC1zaXplOjEwcHg7bGluZS1oZWlnaHQ6MS44fS53ZXVpLW5hdmJhcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6NTAwO3RvcDowO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZmFmYWZhfS53ZXVpLW5hdmJhcjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7Y29sb3I6I2NjYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktbmF2YmFyKy53ZXVpLXRhYl9fcGFuZWx7cGFkZGluZy10b3A6NTBweDtwYWRkaW5nLWJvdHRvbTowfS53ZXVpLW5hdmJhcl9faXRlbXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtwYWRkaW5nOjEzcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1uYXZiYXJfX2l0ZW06YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VkZWRlZH0ud2V1aS1uYXZiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb257YmFja2dyb3VuZC1jb2xvcjojZWFlYWVhfS53ZXVpLW5hdmJhcl9faXRlbTphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNjY2M7Y29sb3I6I2NjYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktbmF2YmFyX19pdGVtOmxhc3QtY2hpbGQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLXRhYntwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6MTAwJX0ud2V1aS10YWJfX3BhbmVse2JveC1zaXppbmc6Ym9yZGVyLWJveDtoZWlnaHQ6MTAwJTtwYWRkaW5nLWJvdHRvbTo1MHB4O292ZXJmbG93OmF1dG87LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6dG91Y2h9LndldWktdGFiX19jb250ZW50e2Rpc3BsYXk6bm9uZX0ud2V1aS1wcm9ncmVzc3tkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLXByb2dyZXNzX19iYXJ7YmFja2dyb3VuZC1jb2xvcjojZWJlYmViO2hlaWdodDozcHg7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXByb2dyZXNzX19pbm5lci1iYXJ7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwOWJiMDd9LndldWktcHJvZ3Jlc3NfX29wcntkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OjE1cHg7Zm9udC1zaXplOjB9LndldWktcGFuZWx7YmFja2dyb3VuZC1jb2xvcjojZmZmO21hcmdpbi10b3A6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LndldWktcGFuZWw6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDowfS53ZXVpLXBhbmVsOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1wYW5lbDphZnRlciwud2V1aS1wYW5lbDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLXBhbmVsOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBhbmVsX19oZHtwYWRkaW5nOjE0cHggMTVweCAxMHB4O2NvbG9yOiM5OTk7Zm9udC1zaXplOjEzcHg7cG9zaXRpb246cmVsYXRpdmV9LndldWktcGFuZWxfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktbWVkaWEtYm94e3BhZGRpbmc6MTVweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1tZWRpYS1ib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktbWVkaWEtYm94OmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9YS53ZXVpLW1lZGlhLWJveHtjb2xvcjojMDAwOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfWEud2V1aS1tZWRpYS1ib3g6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1tZWRpYS1ib3hfX3RpdGxle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTdweDt3aWR0aDphdXRvO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDt3b3JkLXdyYXA6bm9ybWFsO3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsfS53ZXVpLW1lZGlhLWJveF9fZGVzY3tjb2xvcjojOTk5O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjEuMjtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5Oi13ZWJraXQtYm94Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWxpbmUtY2xhbXA6Mn0ud2V1aS1tZWRpYS1ib3hfX2luZm97bWFyZ2luLXRvcDoxNXB4O3BhZGRpbmctYm90dG9tOjVweDtmb250LXNpemU6MTNweDtjb2xvcjojY2VjZWNlO2xpbmUtaGVpZ2h0OjFlbTtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YXtmbG9hdDpsZWZ0O3BhZGRpbmctcmlnaHQ6MWVtfS53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YV9leHRyYXtwYWRkaW5nLWxlZnQ6MWVtO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjY2VjZWNlfS53ZXVpLW1lZGlhLWJveF90ZXh0IC53ZXVpLW1lZGlhLWJveF9fdGl0bGV7bWFyZ2luLWJvdHRvbTo4cHh9LndldWktbWVkaWEtYm94X2FwcG1zZ3tkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X19oZHttYXJnaW4tcmlnaHQ6LjhlbTt3aWR0aDo2MHB4O2hlaWdodDo2MHB4O2xpbmUtaGVpZ2h0OjYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktbWVkaWEtYm94X2FwcG1zZyAud2V1aS1tZWRpYS1ib3hfX3RodW1ie3dpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlO3ZlcnRpY2FsLWFsaWduOnRvcH0ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9fYmR7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO21pbi13aWR0aDowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2d7cGFkZGluZzowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cgLndldWktY2VsbHN7bWFyZ2luLXRvcDowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cgLndldWktY2VsbHM6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1ncmlkc3twb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LndldWktZ3JpZHM6YmVmb3Jle3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1ncmlkczphZnRlciwud2V1aS1ncmlkczpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO2NvbG9yOiNkOWQ5ZDl9LndldWktZ3JpZHM6YWZ0ZXJ7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1ncmlke3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7cGFkZGluZzoyMHB4IDEwcHg7d2lkdGg6MzMuMzMzMzMzMzMlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud2V1aS1ncmlkOmJlZm9yZXt0b3A6MDt3aWR0aDoxcHg7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1ncmlkOmFmdGVyLC53ZXVpLWdyaWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7Ym90dG9tOjA7Y29sb3I6I2Q5ZDlkOX0ud2V1aS1ncmlkOmFmdGVye2xlZnQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWdyaWQ6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1ncmlkX19pY29ue3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7bWFyZ2luOjAgYXV0b30ud2V1aS1ncmlkX19pY29uIGltZ3tkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LndldWktZ3JpZF9faWNvbisud2V1aS1ncmlkX19sYWJlbHttYXJnaW4tdG9wOjVweH0ud2V1aS1ncmlkX19sYWJlbHtkaXNwbGF5OmJsb2NrO2NvbG9yOiMwMDA7d2hpdGUtc3BhY2U6bm93cmFwO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWZvb3Rlciwud2V1aS1ncmlkX19sYWJlbHt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweH0ud2V1aS1mb290ZXJ7Y29sb3I6Izk5OX0ud2V1aS1mb290ZXIgYXtjb2xvcjojNTg2Yzk0fS53ZXVpLWZvb3Rlcl9maXhlZC1ib3R0b217cG9zaXRpb246Zml4ZWQ7Ym90dG9tOi41MmVtO2xlZnQ6MDtyaWdodDowfS53ZXVpLWZvb3Rlcl9fbGlua3N7Zm9udC1zaXplOjB9LndldWktZm9vdGVyX19saW5re2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcDttYXJnaW46MCAuNjJlbTtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LXNpemU6MTRweH0ud2V1aS1mb290ZXJfX2xpbms6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjN2M3Yzc7Y29sb3I6I2M3YzdjNzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSk7bGVmdDotLjY1ZW07dG9wOi4zNmVtO2JvdHRvbTouMzZlbX0ud2V1aS1mb290ZXJfX2xpbms6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1mb290ZXJfX3RleHR7cGFkZGluZzowIC4zNGVtO2ZvbnQtc2l6ZToxMnB4fS53ZXVpLWZsZXh7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1mbGV4X19pdGVtey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1kaWFsb2d7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo1MDAwO3dpZHRoOjgwJTttYXgtd2lkdGg6MzAwcHg7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7YmFja2dyb3VuZC1jb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6M3B4O292ZXJmbG93OmhpZGRlbn0ud2V1aS1kaWFsb2dfX2hke3BhZGRpbmc6MS4zZW0gMS42ZW0gLjVlbX0ud2V1aS1kaWFsb2dfX3RpdGxle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MThweH0ud2V1aS1kaWFsb2dfX2Jke3BhZGRpbmc6MCAxLjZlbSAuOGVtO21pbi1oZWlnaHQ6NDBweDtmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxLjM7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGw7Y29sb3I6Izk5OX0ud2V1aS1kaWFsb2dfX2JkOmZpcnN0LWNoaWxke3BhZGRpbmc6Mi43ZW0gMjBweCAxLjdlbTtjb2xvcjojMzUzNTM1fS53ZXVpLWRpYWxvZ19fZnR7cG9zaXRpb246cmVsYXRpdmU7bGluZS1oZWlnaHQ6NDhweDtmb250LXNpemU6MThweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWRpYWxvZ19fZnQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWRpYWxvZ19fYnRue2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO2NvbG9yOiMzY2M1MWY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7cG9zaXRpb246cmVsYXRpdmV9LndldWktZGlhbG9nX19idG46YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VlZX0ud2V1aS1kaWFsb2dfX2J0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWRpYWxvZ19fYnRuOmZpcnN0LWNoaWxkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1kaWFsb2dfX2J0bl9kZWZhdWx0e2NvbG9yOiMzNTM1MzV9LndldWktZGlhbG9nX19idG5fcHJpbWFyeXtjb2xvcjojMGJiMjBjfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2d7dGV4dC1hbGlnbjpsZWZ0O2JveC1zaGFkb3c6MCA2cHggMzBweCAwIHJnYmEoMCwwLDAsLjEpfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX3RpdGxle2ZvbnQtc2l6ZToyMXB4fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2hke3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19iZHtjb2xvcjojOTk5O3BhZGRpbmc6LjI1ZW0gMS42ZW0gMmVtO2ZvbnQtc2l6ZToxN3B4O3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19iZDpmaXJzdC1jaGlsZHtwYWRkaW5nOjEuNmVtIDEuNmVtIDJlbTtjb2xvcjojMzUzNTM1fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Z0e2Rpc3BsYXk6YmxvY2s7dGV4dC1hbGlnbjpyaWdodDtsaW5lLWhlaWdodDo0MnB4O2ZvbnQtc2l6ZToxNnB4O3BhZGRpbmc6MCAxLjZlbSAuN2VtfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Z0OmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wO3BhZGRpbmc6MCAuOGVtfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjphZnRlcntkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmFjdGl2ZSwud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46dmlzaXRlZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjA2KX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6LS44ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuX2RlZmF1bHR7Y29sb3I6Z3JheX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEwMjRweCl7LndldWktZGlhbG9ne3dpZHRoOjM1JX19LndldWktdG9hc3R7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo1MDAwO3dpZHRoOjcuNmVtO21pbi1oZWlnaHQ6Ny42ZW07dG9wOjE4MHB4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zLjhlbTtiYWNrZ3JvdW5kOmhzbGEoMCwwJSw3JSwuNyk7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czo1cHg7Y29sb3I6I2ZmZn0ud2V1aS1pY29uX3RvYXN0e21hcmdpbjoyMnB4IDAgMDtkaXNwbGF5OmJsb2NrfS53ZXVpLWljb25fdG9hc3Qud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xlOmJlZm9yZXtjb2xvcjojZmZmO2ZvbnQtc2l6ZTo1NXB4fS53ZXVpLWljb25fdG9hc3Qud2V1aS1sb2FkaW5ne21hcmdpbjozMHB4IDAgMDt3aWR0aDozOHB4O2hlaWdodDozOHB4O3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS53ZXVpLXRvYXN0X19jb250ZW50e21hcmdpbjowIDAgMTVweH0ud2V1aS1tYXNre2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNil9LndldWktbWFzaywud2V1aS1tYXNrX3RyYW5zcGFyZW50e3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMDt0b3A6MDtyaWdodDowO2xlZnQ6MDtib3R0b206MH0ud2V1aS1hY3Rpb25zaGVldHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7Ym90dG9tOjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6NTAwMDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2VmZWZmNDt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLC13ZWJraXQtdHJhbnNmb3JtIC4zc30ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGV7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjY1cHg7cGFkZGluZzowIDIwcHg7bGluZS1oZWlnaHQ6MS40O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstbXMtZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweDtjb2xvcjojODg4O2JhY2tncm91bmQ6I2ZjZmNmZH0ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGU6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGUgLndldWktYWN0aW9uc2hlZXRfX3RpdGxlLXRleHR7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTotd2Via2l0LWJveDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1saW5lLWNsYW1wOjJ9LndldWktYWN0aW9uc2hlZXRfX21lbnV7YmFja2dyb3VuZC1jb2xvcjojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb257bWFyZ2luLXRvcDo2cHg7YmFja2dyb3VuZC1jb2xvcjojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X19jZWxse3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweCAwO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxOHB4fS53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktYWN0aW9uc2hlZXRfX2NlbGw6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjUwJTt0b3A6NTAlO2JvdHRvbTphdXRvOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt3aWR0aDoyNzRweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fYWN0aW9ue2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX21lbnV7Ym9yZGVyLXJhZGl1czoycHg7Ym94LXNoYWRvdzowIDZweCAzMHB4IDAgcmdiYSgwLDAsMCwuMSl9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19jZWxse3BhZGRpbmc6MTNweCAyNHB4O2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjEuNDt0ZXh0LWFsaWduOmxlZnR9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmZpcnN0LWNoaWxke2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MnB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjJweH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGw6bGFzdC1jaGlsZHtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjJweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czoycHh9LndldWktYWN0aW9uc2hlZXRfdG9nZ2xley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDApfS53ZXVpLWxvYWRtb3Jle3dpZHRoOjY1JTttYXJnaW46MS41ZW0gYXV0bztsaW5lLWhlaWdodDoxLjZlbTtmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1sb2FkbW9yZV9fdGlwc3tkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktbG9hZG1vcmVfbGluZXtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O21hcmdpbi10b3A6Mi40ZW19LndldWktbG9hZG1vcmVfbGluZSAud2V1aS1sb2FkbW9yZV9fdGlwc3twb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS45ZW07cGFkZGluZzowIC41NWVtO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojOTk5fS53ZXVpLWxvYWRtb3JlX2RvdCAud2V1aS1sb2FkbW9yZV9fdGlwc3twYWRkaW5nOjAgLjE2ZW19LndldWktbG9hZG1vcmVfZG90IC53ZXVpLWxvYWRtb3JlX190aXBzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjt3aWR0aDo0cHg7aGVpZ2h0OjRweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNlNWU1ZTU7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246MDt0b3A6LS4xNmVtfS53ZXVpLWJhZGdle2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6LjE1ZW0gLjRlbTttaW4td2lkdGg6OHB4O2JvcmRlci1yYWRpdXM6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiNmNDM1MzA7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDoxLjI7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjEycHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS53ZXVpLWJhZGdlX2RvdHtwYWRkaW5nOi40ZW07bWluLXdpZHRoOjB9LndldWktc2VhcmNoLWJhcntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjhweCAxMHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQtY29sb3I6I2VmZWZmNH0ud2V1aS1zZWFyY2gtYmFyOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDdkNmRjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1zZWFyY2gtYmFyOmFmdGVyLC53ZXVpLXNlYXJjaC1iYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2Q3ZDZkY30ud2V1aS1zZWFyY2gtYmFyOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkN2Q2ZGM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG57ZGlzcGxheTpibG9ja30ud2V1aS1zZWFyY2gtYmFyLndldWktc2VhcmNoLWJhcl9mb2N1c2luZyAud2V1aS1zZWFyY2gtYmFyX19sYWJlbHtkaXNwbGF5Om5vbmV9LndldWktc2VhcmNoLWJhcl9fZm9ybXtwb3NpdGlvbjpyZWxhdGl2ZTstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6YXV0bztmbGV4OmF1dG87YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0fS53ZXVpLXNlYXJjaC1iYXJfX2Zvcm06YWZ0ZXJ7Y29udGVudDpcXFwiXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MjAwJTtoZWlnaHQ6MjAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNSk7dHJhbnNmb3JtOnNjYWxlKC41KTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwO2JvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6MXB4IHNvbGlkICNlNmU2ZWE7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQ6I2ZmZn0ud2V1aS1zZWFyY2gtYmFyX19ib3h7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjMwcHg7cGFkZGluZy1yaWdodDozMHB4O2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MX0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktc2VhcmNoLWJhcl9faW5wdXR7cGFkZGluZzo0cHggMDt3aWR0aDoxMDAlO2hlaWdodDoxLjQyODU3MTQzZW07Ym9yZGVyOjA7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0M2VtO2JveC1zaXppbmc6Y29udGVudC1ib3g7YmFja2dyb3VuZDp0cmFuc3BhcmVudH0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktc2VhcmNoLWJhcl9faW5wdXQ6Zm9jdXN7b3V0bGluZTpub25lfS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1pY29uLXNlYXJjaHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjEwcHg7dG9wOjA7bGluZS1oZWlnaHQ6MjhweH0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktaWNvbi1jbGVhcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO3BhZGRpbmc6MCAxMHB4O2xpbmUtaGVpZ2h0OjI4cHh9LndldWktc2VhcmNoLWJhcl9fbGFiZWx7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFweDtyaWdodDoxcHg7Ym90dG9tOjFweDtsZWZ0OjFweDt6LWluZGV4OjI7Ym9yZGVyLXJhZGl1czozcHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzliOWI5YjtiYWNrZ3JvdW5kOiNmZmZ9LndldWktc2VhcmNoLWJhcl9fbGFiZWwgc3BhbntkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTRweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktc2VhcmNoLWJhcl9fbGFiZWwgLndldWktaWNvbi1zZWFyY2h7bWFyZ2luLXJpZ2h0OjVweH0ud2V1aS1zZWFyY2gtYmFyX19jYW5jZWwtYnRue2Rpc3BsYXk6bm9uZTttYXJnaW4tbGVmdDoxMHB4O2xpbmUtaGVpZ2h0OjI4cHg7Y29sb3I6IzA5YmIwNzt3aGl0ZS1zcGFjZTpub3dyYXB9LndldWktc2VhcmNoLWJhcl9faW5wdXQ6bm90KDp2YWxpZCl+LndldWktaWNvbi1jbGVhcntkaXNwbGF5Om5vbmV9aW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbixpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9ue2Rpc3BsYXk6bm9uZX0ud2V1aS1waWNrZXJ7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtsZWZ0OjA7Ym90dG9tOjA7ei1pbmRleDo1MDAwOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLC13ZWJraXQtdHJhbnNmb3JtIC4zc30ud2V1aS1waWNrZXJfX2hke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cGFkZGluZzo5cHggMTVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE3cHh9LndldWktcGlja2VyX19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGlja2VyX19hY3Rpb257ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzFhYWQxOX0ud2V1aS1waWNrZXJfX2FjdGlvbjpmaXJzdC1jaGlsZHt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6Izg4OH0ud2V1aS1waWNrZXJfX2FjdGlvbjpsYXN0LWNoaWxke3RleHQtYWxpZ246cmlnaHR9LndldWktcGlja2VyX19iZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtoZWlnaHQ6MjM4cHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXBpY2tlcl9fZ3JvdXB7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlfS53ZXVpLXBpY2tlcl9fbWFza3t0b3A6MDtoZWlnaHQ6MTAwJTttYXJnaW46MCBhdXRvO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZyxoc2xhKDAsMCUsMTAwJSwuOTUpLGhzbGEoMCwwJSwxMDAlLC42KSksbGluZWFyLWdyYWRpZW50KDBkZWcsaHNsYSgwLDAlLDEwMCUsLjk1KSxoc2xhKDAsMCUsMTAwJSwuNikpO2JhY2tncm91bmQtcG9zaXRpb246dG9wLGJvdHRvbTtiYWNrZ3JvdW5kLXNpemU6MTAwJSAxMDJweDtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX0ud2V1aS1waWNrZXJfX2luZGljYXRvciwud2V1aS1waWNrZXJfX21hc2t7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3dpZHRoOjEwMCU7ei1pbmRleDozfS53ZXVpLXBpY2tlcl9faW5kaWNhdG9ye2hlaWdodDozNHB4O3RvcDoxMDJweH0ud2V1aS1waWNrZXJfX2luZGljYXRvcjpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGlja2VyX19pbmRpY2F0b3I6YWZ0ZXIsLndldWktcGlja2VyX19pbmRpY2F0b3I6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNX0ud2V1aS1waWNrZXJfX2luZGljYXRvcjphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2NvbnRlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCV9LndldWktcGlja2VyX19pdGVte3BhZGRpbmc6MDtoZWlnaHQ6MzRweDtsaW5lLWhlaWdodDozNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiMwMDA7dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXBpY2tlcl9faXRlbV9kaXNhYmxlZHtjb2xvcjojOTk5fUAtd2Via2l0LWtleWZyYW1lcyBhezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9fUBrZXlmcmFtZXMgYXswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfX0ud2V1aS1hbmltYXRlLXNsaWRlLXVwey13ZWJraXQtYW5pbWF0aW9uOmEgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmEgZWFzZSAuM3MgZm9yd2FyZHN9QC13ZWJraXQta2V5ZnJhbWVzIGJ7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX19QGtleWZyYW1lcyBiezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9fS53ZXVpLWFuaW1hdGUtc2xpZGUtZG93bnstd2Via2l0LWFuaW1hdGlvbjpiIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpiIGVhc2UgLjNzIGZvcndhcmRzfUAtd2Via2l0LWtleWZyYW1lcyBjezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgY3swJXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX0ud2V1aS1hbmltYXRlLWZhZGUtaW57LXdlYmtpdC1hbmltYXRpb246YyBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246YyBlYXNlIC4zcyBmb3J3YXJkc31ALXdlYmtpdC1rZXlmcmFtZXMgZHswJXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX1Aa2V5ZnJhbWVzIGR7MCV7b3BhY2l0eToxfXRve29wYWNpdHk6MH19LndldWktYW5pbWF0ZS1mYWRlLW91dHstd2Via2l0LWFuaW1hdGlvbjpkIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpkIGVhc2UgLjNzIGZvcndhcmRzfS53ZXVpLWFncmVle2Rpc3BsYXk6YmxvY2s7cGFkZGluZzouNWVtIDE1cHg7Zm9udC1zaXplOjEzcHh9LndldWktYWdyZWUgYXtjb2xvcjojNTg2Yzk0fS53ZXVpLWFncmVlX190ZXh0e2NvbG9yOiM5OTl9LndldWktYWdyZWVfX2NoZWNrYm94ey13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtvdXRsaW5lOjA7Zm9udC1zaXplOjA7Ym9yZGVyOjFweCBzb2xpZCAjZDFkMWQxO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjNweDt3aWR0aDoxM3B4O2hlaWdodDoxM3B4O3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOjA7dG9wOjJweH0ud2V1aS1hZ3JlZV9fY2hlY2tib3g6Y2hlY2tlZDpiZWZvcmV7Zm9udC1mYW1pbHk6d2V1aTtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7Zm9udC12YXJpYW50Om5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO3RleHQtYWxpZ246Y2VudGVyO3NwZWFrOm5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3RleHQtZGVjb3JhdGlvbjppbmhlcml0O2NvbnRlbnQ6XFxcIlxcXFxFQTA4XFxcIjtjb2xvcjojMDliYjA3O2ZvbnQtc2l6ZToxM3B4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTQ4JSkgc2NhbGUoLjczKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTQ4JSkgc2NhbGUoLjczKX0ud2V1aS1hZ3JlZV9fY2hlY2tib3g6ZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxfS53ZXVpLWFncmVlX19jaGVja2JveDpkaXNhYmxlZDpiZWZvcmV7Y29sb3I6I2FkYWRhZH0ud2V1aS1sb2FkaW5ne3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlOy13ZWJraXQtYW5pbWF0aW9uOmUgMXMgc3RlcHMoMTIpIGluZmluaXRlO2FuaW1hdGlvbjplIDFzIHN0ZXBzKDEyKSBpbmZpbml0ZTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhNakFpSUdobGFXZG9kRDBpTVRJd0lpQjJhV1YzUW05NFBTSXdJREFnTVRBd0lERXdNQ0krUEhCaGRHZ2dabWxzYkQwaWJtOXVaU0lnWkQwaVRUQWdNR2d4TURCMk1UQXdTREI2SWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUlRsRk9VVTVJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLREFnTFRNd0tTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUl6azRPVFk1TnlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d6TUNBeE1EVXVPVGdnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJak9VSTVPVGxCSWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLRFl3SURjMUxqazRJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBFelFURkJNaUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZzVNQ0EyTlNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkJRa0U1UVVFaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTVRJd0lEVTRMalkySURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwSXlRakpDTWlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d4TlRBZ05UUXVNRElnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalFrRkNPRUk1SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLREU0TUNBMU1DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5ETWtNd1F6RWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xURTFNQ0EwTlM0NU9DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5EUWtOQ1EwSWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xURXlNQ0EwTVM0ek5DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5FTWtReVJESWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xUa3dJRE0xSURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwUkJSRUZFUVNJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d0TmpBZ01qUXVNRElnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalJUSkZNa1V5SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLQzB6TUNBdE5TNDVPQ0EyTlNraUx6NDhMM04yWno0PSkgbm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZToxMDAlfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnkgLndldWktbG9hZGluZywud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl93YXJuIC53ZXVpLWxvYWRpbmcsLndldWktbG9hZGluZy53ZXVpLWxvYWRpbmdfdHJhbnNwYXJlbnR7YmFja2dyb3VuZC1pbWFnZTp1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCclM0UlM0NwYXRoIGZpbGw9J25vbmUnIGQ9J00wIDBoMTAwdjEwMEgweicvJTNFJTNDcmVjdCB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNTYpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAgLTMwKScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC40MyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoNjAgNzUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMzgpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDY1IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjgpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE1MCA1NC4wMiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yNSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTgwIDUwIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMTcpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xMjAgNDEuMzQgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMTQpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC05MCAzNSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0zMCAtNS45OCA2NSknLyUzRSUzQy9zdmclM0VcXFwiKX1ALXdlYmtpdC1rZXlmcmFtZXMgZXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMXR1cm4pO3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX1Aa2V5ZnJhbWVzIGV7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDF0dXJuKTt0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19LndldWktc2xpZGVye3BhZGRpbmc6MTVweCAxOHB4Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ud2V1aS1zbGlkZXJfX2lubmVye3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoycHg7YmFja2dyb3VuZC1jb2xvcjojZTllOWU5fS53ZXVpLXNsaWRlcl9fdHJhY2t7aGVpZ2h0OjJweDtiYWNrZ3JvdW5kLWNvbG9yOiMxYWFkMTk7d2lkdGg6MH0ud2V1aS1zbGlkZXJfX2hhbmRsZXJ7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDo1MCU7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDttYXJnaW4tbGVmdDotMTRweDttYXJnaW4tdG9wOi0xNHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3gtc2hhZG93OjAgMCA0cHggcmdiYSgwLDAsMCwuMil9LndldWktc2xpZGVyLWJveHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLXNsaWRlci1ib3ggLndldWktc2xpZGVyey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1zbGlkZXItYm94X192YWx1ZXttYXJnaW4tbGVmdDouNWVtO21pbi13aWR0aDoyNHB4O2NvbG9yOiM4ODg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHh9LndldWktdG9wdGlwc1tkYXRhLXYtMWE3YmVjMmJde2Rpc3BsYXk6YmxvY2t9Lnd2LWhlYWRlcltkYXRhLXYtZjZmNWMxNmFde2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Ym94LXNpemluZzpib3JkZXItYm94O3dpZHRoOjEwMCU7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6MTtwYWRkaW5nOjAgMTBweDttYXJnaW46MDtjb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3doaXRlLXNwYWNlOm5vd3JhcDt6LWluZGV4OjUwMH0ud3YtaGVhZGVyIC5sZWZ0W2RhdGEtdi1mNmY1YzE2YV17ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47ZmxvYXQ6bGVmdDtmb250LXNpemU6MzVweDtsaW5lLWhlaWdodDozNXB4O2ZvbnQtd2VpZ2h0OjEwMH0ud3YtaGVhZGVyIC53di1oZWFkZXItdGl0bGVbZGF0YS12LWY2ZjVjMTZhXXtmb250LXNpemU6MjNweDtmb250LXdlaWdodDowO3RleHQtYWxpZ246Y2VudGVyO2ZsZXg6MX0ud3YtaGVhZGVyLmlzLWZpeGVkW2RhdGEtdi1mNmY1YzE2YV17cG9zaXRpb246Zml4ZWQ7bGVmdDowO3RvcDowfS53di1waWNrZXItc2xvdC1kaXZpZGVyW2RhdGEtdi1jOWU0ZTllMF17dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTA2cHgpfS53di1wb3B1cC1ib2R5W2RhdGEtdi04N2EwOGVmNl17ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtsZWZ0OjA7Ym90dG9tOjA7ei1pbmRleDo1MDAwO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zc30ud3Ytc3dpcGVbZGF0YS12LTQ3MzcwNTIxXXtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXJbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjEwMCV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyIGRpdltkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDAlKTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6bm9uZX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXIgZGl2LmlzLWFjdGl2ZVtkYXRhLXYtNDczNzA1MjFde2Rpc3BsYXk6YmxvY2s7dHJhbnNmb3JtOm5vbmV9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzW2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjEwcHg7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSl9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzIC53di1zd2lwZS1pbmRpY2F0b3JbZGF0YS12LTQ3MzcwNTIxXXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDo3cHg7aGVpZ2h0OjdweDtib3JkZXItcmFkaXVzOjUwJTttYXJnaW46MCA0cHg7YmFja2dyb3VuZC1jb2xvcjojMDAwO29wYWNpdHk6LjN9Lnd2LXN3aXBlIC53di1zd2lwZS1pbmRpY2F0b3JzIC53di1zd2lwZS1pbmRpY2F0b3IuaXMtYWN0aXZlW2RhdGEtdi00NzM3MDUyMV17YmFja2dyb3VuZC1jb2xvcjojZmZmfS53ZXVpLWljb25fdG9hc3RbZGF0YS12LWJhZmIxZjhhXXtmb250LXNpemU6NDBweH0ud2V1aS10b2FzdF90ZXh0W2RhdGEtdi1iYWZiMWY4YV17d2lkdGg6YXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjA7cGFkZGluZzouNWVtIDB9LndldWktdG9hc3RfdGV4dCAud2V1aS10b2FzdF9fY29udGVudFtkYXRhLXYtYmFmYjFmOGFde21hcmdpbjowfS53di1jaXJjbGVbZGF0YS12LTEyYWI2NDJhXXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9Lnd2LWNpcmNsZSBzdmdbZGF0YS12LTEyYWI2NDJhXXtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MX0ud3YtY2lyY2xlIC53di1jaXJjbGUtY29udGVudFtkYXRhLXYtMTJhYjY0MmFde3otaW5kZXg6MTAwMH0uYWN0aW9uc2hlZXRfX21hc2tfc2hvd1tkYXRhLXYtNDA5NWM4YmZde2Rpc3BsYXk6YmxvY2s7dHJhbnNmb3JtLW9yaWdpbjowIDAgMDtvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNil9LndldWktY2hlY2tfX2xhYmVsLWRpc2FibGVkW2RhdGEtdi0zZDYzYWUzYV17YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0ud2V1aS1jaGVja19fbGFiZWwtZGlzYWJsZWRbZGF0YS12LTMyM2I5NTc5XXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpfS53di1uYXZiYXJfX2l0ZW1bZGF0YS12LThiNGNkYTY2XXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2ZsZXg6MTtwYWRkaW5nOjEzcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnR9Lnd2LW5hdmJhcl9faXRlbS53di1uYXZiYXJfX2l0ZW1fb25bZGF0YS12LThiNGNkYTY2XXtib3JkZXItYm90dG9tOjNweCBzb2xpZCByZWR9LndldWktc2VhcmNoLWJhcl9fbGFiZWxbZGF0YS12LWU4NzZhYTJhXXt0cmFuc2Zvcm0tb3JpZ2luOjAgMCAwO29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSl9LndldWktc2VhcmNoLWJhcl9fY2FuY2VsLWJ0bltkYXRhLXYtZTg3NmFhMmFde2Rpc3BsYXk6YmxvY2t9LnNlYXJjaGJhci1yZXN1bHRbZGF0YS12LWU4NzZhYTJhXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybS1vcmlnaW46MCAwIDA7b3BhY2l0eToxO3RyYW5zZm9ybTpzY2FsZSgxKTttYXJnaW4tdG9wOjA7Zm9udC1zaXplOjE0cHh9Lnd2LW5hdmJhcltkYXRhLXYtNDBmMGE1ZWJde2Rpc3BsYXk6ZmxleDt3aWR0aDoxMDAlO3otaW5kZXg6NTAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9QGZvbnQtZmFjZXtmb250LWZhbWlseTppY29uZm9udDtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3Q7YmFzZTY0LCk7c3JjOnVybChkYXRhOmFwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0O2Jhc2U2NCwjaWVmaXgpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSx1cmwoZGF0YTphcHBsaWNhdGlvbi9mb250LXdvZmY7YmFzZTY0LCkgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksdXJsKGRhdGE6YXBwbGljYXRpb24veC1mb250LXR0ZjtiYXNlNjQsQUFFQUFBQVFBUUFBQkFBQVJrWlVUWGRyQTFBQUFBRU1BQUFBSEVkRVJVWUFOUUFHQUFBQktBQUFBQ0JQVXk4eVYxUmJGQUFBQVVnQUFBQldZMjFoY05GQTA4SUFBQUdnQUFBQmFtTjJkQ0FOWmY3MEFBQVFaQUFBQUNSbWNHZHRNUGVlbFFBQUVJZ0FBQW1XWjJGemNBQUFBQkFBQUJCY0FBQUFDR2RzZVdZc2lnMnRBQUFEREFBQUNoNW9aV0ZrRGt5a2ZRQUFEU3dBQUFBMmFHaGxZUWZlQTRZQUFBMWtBQUFBSkdodGRIZ05iQUJRQUFBTmlBQUFBQnBzYjJOaENKc0VoZ0FBRGFRQUFBQVNiV0Y0Y0FIYkNyd0FBQTI0QUFBQUlHNWhiV1VOTGNjVkFBQU4yQUFBQWl0d2IzTjBuS01ZUXdBQUVBUUFBQUJYY0hKbGNLVzV2bVlBQUJvZ0FBQUFsUUFBQUFFQUFBQUF6RDJpendBQUFBRFZsckJBQUFBQUFOV1dzRUFBQVFBQUFBNEFBQUFZQUFBQUFBQUNBQUVBQXdBSEFBRUFCQUFBQUFJQUFBQUJBL3NCOUFBRkFBZ0NtUUxNQUFBQWp3S1pBc3dBQUFIckFETUJDUUFBQWdBR0F3QUFBQUFBQUFBQUFBRVFBQUFBQUFBQUFBQUFBQUJRWmtWa0FFQUFlT2dHQTREL2dBQmNBNEFBZ0FBQUFBRUFBQUFBQUFBQUFBQURBQUFBQXdBQUFCd0FBUUFBQUFBQVpBQURBQUVBQUFBY0FBUUFTQUFBQUE0QUNBQUNBQVlBQUFCNDVqL25JdWZwNkFiLy93QUFBQUFBZU9ZLzV5TG42ZWdHLy84QUFQK0xHY2dZNHhnYkdBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJCZ0FBQVFBQUFBQUFBQUFCQWdBQUFBSUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVVBTFAvaEE3d0RHQUFXQURBQU9nQlNBRjRCZDB1d0UxQllRRW9DQVFBTkRnMEFEbVlBQXc0QkRnTmVBQUVJQ0FGY0VBRUpDQW9HQ1Y0UkFRd0dCQVlNWGdBTEJBdHBEd0VJQUFZTUNBWllBQW9IQlFJRUN3b0VXUklCRGc0TlVRQU5EUW9PUWh0THNCZFFXRUJMQWdFQURRNE5BQTVtQUFNT0FRNERYZ0FCQ0FnQlhCQUJDUWdLQ0FrS1poRUJEQVlFQmd4ZUFBc0VDMmtQQVFnQUJnd0lCbGdBQ2djRkFnUUxDZ1JaRWdFT0RnMVJBQTBOQ2c1Q0cwdXdHRkJZUUV3Q0FRQU5EZzBBRG1ZQUF3NEJEZ05lQUFFSUNBRmNFQUVKQ0FvSUNRcG1FUUVNQmdRR0RBUm1BQXNFQzJrUEFRZ0FCZ3dJQmxnQUNnY0ZBZ1FMQ2dSWkVnRU9EZzFSQUEwTkNnNUNHMEJPQWdFQURRNE5BQTVtQUFNT0FRNERBV1lBQVFnT0FRaGtFQUVKQ0FvSUNRcG1FUUVNQmdRR0RBUm1BQXNFQzJrUEFRZ0FCZ3dJQmxnQUNnY0ZBZ1FMQ2dSWkVnRU9EZzFSQUEwTkNnNUNXVmxaUUNoVFV6czdNakVYRjFOZVUxNWJXRHRTTzFKTFF6YzFNVG95T2hjd0Z6QlJFVEVZRVNnVlFCTVdLd0VHS3dFaURnSWRBU0UxTkNZMU5DNENLd0VWSVFVVkZCWVVEZ0lqQmlZckFTY2hCeXNCSWljaUxnSTlBUmNpQmhRV016STJOQ1lYQmdjT0F4NEJPd1l5TmljdUFTY21Kd0UxTkQ0Q093RXlGaDBCQVJrYkdsTVNKUndTQTVBQkNoZ25Ib1grU2dLaUFSVWZJdzRPSHc0Z0xmNUpMQjBpRkJrWklCTUlkd3dTRWd3TkVoS01DQVlGQ3dRQ0JBOE9KVU5SVUVBa0Z4WUpCUWtGQlFiK3BBVVBHaFc4SHlrQ0h3RU1HU2NhVENrUUhBUU5JQnNTWVlnMEZ6bzZKUmNKQVFHQWdBRVRHeUFPcHo4UkdoRVJHaEY4R2hZVEpBNFFEUWdZR2cwakVSTVVBWGZrQ3hnVERCMG00d0FBQWdBQS80QUVBQU9BQUJRQUtnQkNRRDhBQlFFQ0FRVUNaZ0FDQkFFQ0JHUUdBUUFBQVFVQUFWa0FCQU1EQkUwQUJBUURVUWNCQXdRRFJSWVZBUUFsSkI4ZEZTb1dLZzhPQ2dnQUZBRVVDQTRyQVNJT0FnYytBak15RWhVVUZqSTJOVFF1QVFNeVBnSTNEZ0lqSWk0Qk5UUW1JZ1lWRkI0QkFnQm51NGxTQXdOd3ZtK3M5RGhRT0luc2kyZTdpVklEQTNDK2IzSEFiemhRT0luc0E0QlBocmxtZDhsMC92cTZLRGc0S0l2c2lmd0FUNGE1Wm5mSmRIak9laWc0T0NpTDdJa0FBQUlBSC8rdkJBQURjUUEyQUdRQVBVQTZYVncyTlFBRkFnUUJRR0lCQWdFL0FBSUVBd1FDQTJZQUFBQUVBZ0FFV1FBREFRRURUUUFEQXdGUkFBRURBVVZVVWtFOU1TNGxJVWdGRHlzQkxnRW5MZ0VuTGdFaklpTU9BUWNPQVFjT0FSVVVGUjRCRng0QkZ4NEJGeDRCTXpJek5qYytBVGMrQVRjMk56SXpNalkxTkRVeEJ3WUhCZ2NPQVNNaUl5NEJKeTRCSnk0Qk5UUTJOelkzTmpjK0FUTXlGaGNXRnhZWEZnY3hGQlVVRmhjR0J3UUFBbHMvSFdFbkpHb21CZ1ZVeXpvY1BBNE9Fd0VYRUJBK0hCeGJKQ0ppSkFZRlhGUWpWUm9hT0E0VEJ3SUNHaVptSTBBL1VSOWNJZ1VGU2JBekdEUU1EQkFWRGlFOE9rc2RWUjhqWHlCSE5qWWNHd0loR0FrV0FZQlgwVHdkUGc4T0ZBSllQUjFkSmlObUpRWUZKMnNrSkZrYkd6a09EaElDSlE4OEhCdFhJekkySlJzQ0E2cFFQVDBmREJFQ1RUVVpVaUFlV0NFa1lpSktPVGdjQ3hBVURpQTVPRWhJVFFNQ0dDVUROREVBQUFBQUNBQWsvNlFEM0FPQUFBa0FFUUFaQUNNQUt3QXpBRHNBUndCU1FFOEFEUUFNQ0EwTVdRQUpBQWdPQ1FoWkN3RUZDZ0VFQVFVRVdRY0JBUVlCQUFJQkFGa0FBd0FDQXdKVkFBNE9EMUVBRHc4S0RrSkdSRUErT3pvM05qTXlMeTRyS2hRVEl4TVRFeE1VSWhBWEt5UVVCaU1pSmpVME5qSUVGQVlpSmpRMk1nQVVCaUltTkRZeUFSUUdJeUltTkRZeUZnQVVCaUltTkRZeUFCUUdJaVkwTmpJQUZBWWlKalEyTWdVVUJpTWlKalUwTmpNeUZnRXRLeDhkTENzOUFVY3JQQ3NyUFA2Wkt6MHFLajBDMml3ZEh5c3JQU3Y5MlRaTE5qWkxBdElxUFNzclBmNjlRRnhBUUZ3QmIwdzBOa3BLTmpSTWdqMHJMQjBmSzZFOUtpbzlLd0ZuUENzclBDdittaDBzS3owckt3SkFTelkyU3piK3Bqd3JLendyQVhkYlFFQmJRT00yU2tvMk5FeE1BQUFBQUF3QUQvK2JBOTREZkFBTkFCc0FMZ0JBQUZNQVpRQnhBSDBBa0FDaEFMUUF4UUlzdDFRQkR5OEJDUUkvUzdBa1VGaEFrZ0FOSUJvZ0RScG1BQm9BSUJvQVpDRUJId0FHQUI4R1ppUUlBZ1laQUFZWlpBQWRFQW9RSFFwbUFBb0VFQW9FWkJFQkR3UVdCQThXWmljWUFoWUpCQllKWkFBQklnSUNBQjhCQUZrQUJ3NEJEQk1IREZrQUZTWUJGQklWRkZvQUV5VUJFaGNURWxvQUJDTUZBZ01FQTFVYkFSa1pJRkVBSUNBS1FRQVFFQWxSQ3dFSkNRdEJBQmNYSEZFZUFSd2NDeHhDRzB1d01sQllRSkFBRFNBYUlBMGFaZ0FhQUNBYUFHUWhBUjhBQmdBZkJtWWtDQUlHR1FBR0dXUUFIUkFLRUIwS1pnQUtCQkFLQkdRUkFROEVGZ1FQRm1ZbkdBSVdDUVFXQ1dRQUFTSUNBZ0FmQVFCWkFBY09BUXdUQnd4WkFCVW1BUlFTRlJSYUFCTWxBUklYRXhKYUFCY2VBUndERnh4WkFBUWpCUUlEQkFOVkd3RVpHU0JSQUNBZ0NrRUFFQkFKVVFzQkNRa0xDVUliUUk0QURTQWFJQTBhWmdBYUFDQWFBR1FoQVI4QUJnQWZCbVlrQ0FJR0dRQUdHV1FBSFJBS0VCMEtaZ0FLQkJBS0JHUVJBUThFRmdRUEZtWW5HQUlXQ1FRV0NXUUFBU0lDQWdBZkFRQlpBQ0FiQVJrTUlCbFpBQWNPQVF3VEJ3eFpBQlVtQVJRU0ZSUmFBQk1sQVJJWEV4SmFBQmNlQVJ3REZ4eFpBQVFqQlFJREJBTlZBQkFRQ1ZFTEFRa0pDd2xDV1ZsQVhINStkSEpvWmh3Y0RnNEFBTVhFdnJ5MnRiU3pyS3Fqb3FHZ21waVNrWDZRZnBDSmg0Qi9lbmR5ZlhSOWJtdG1jV2h4WldSZVhGWlZVMUpMU1VKQlFEODVOekV3SEM0Y0xpY2xIaDBPR3c0YkZoVVFEd0FOQUEwVkVTZ1FLd0V4SWlZOUFUUTJNaFlkQVJRR0F6RWlKajBCTkRZeUZoMEJGQVlETVNJbUx3RW1OVFEyTXpJV0h3RVdGUlFHQVRFaUx3RW1OVFEyTXpJZkFSWVZGQVlqQVNJdkFTNEJOVFEyTXpJZkFSNEJGUlFHSXdFeElpOEJKalUwTmpNeUh3RVdGUlFHSXlVaklpWTBOanNCTWhZVUJpVWpJaVkwTmpzQk1oWVVCZ1V4SWlZMU5EWS9BVFl6TWhZVkZBWVBBUVlCSWlZMU5EOEJOak15RmhVVUR3RUdJd0VpSmpVMFB3RStBVE15RmhVVUR3RU9BU01CSWlZMU5EOEJOak15RmhVVUR3RUdJd0lBR1NNak1pTWpHUThXRmg0V0ZwVU9IQWRaQnlFWERSd0hXUWdoQVU4VUNWb0VFdzRVQ1ZvRUV3NytOdzRNbXdzUEh4VU9ESndLRUI4V0FtMElCNXNQRVEwSUI1c1BFZ3o5YjdNVUhCd1VzeFFkSFFLNXN3MFJFUTJ6REJJUy9MQVNHZzBKbXdvTUV4b05DWnNMQW1FTkVRK2JCZ2dNRWc2YkJ3aitOeEVZQmxrRkZRa1JHQVZaQlJVS0FXWU1FZ1JhQ1JFTUVnUmFDQklDVVNNWnN4Z2pJeGl6R1NQOVNoWVBzeEFXRmhDekR4WUNsaEFNbXd3T0Z5RVBDNXNORHhnZy9hb1Jtd2NKRGhRUm13Z0pEaE1COXdkYUJob05GUjhIV2dZYURSVWYvckFFV2dnU0RCSUVXZ2tSREJMT0hDZ2NIQ2djRWhJWUVoSVlFdThiRWdzWEJWa0dHaElMRndWYUJnRjFFZ3dSQ1ZvREVRMFFDVm9FL2VzWUVRc0ttd2dMR0JFS0Nac0pEQUo0RVEwSUI1c1BFZ3dJQjVzUEFBQUFBQUVBQUFBQkFBQms0eXJJWHc4ODlRQUxCQUFBQUFBQTFaYXdRQUFBQUFEVmxyQkFBQUQvZ0FRQUE0QUFBQUFJQUFJQUFBQUFBQUFBQVFBQUE0RC9nQUJjQkFBQUFBQUFCQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQVVFQUFBQUFBQUFBQUZWQUFBRDZRQXNCQUFBQUFBZkFDUUFEd0FBQUFBQUFBQUFBQUFCUEFHZUFsQUM2QVVQQUFBQUFRQUFBQWdBeGdBTUFBQUFBQUFDQUZBQVhnQnNBQUFCQ2dtV0FBQUFBQUFBQUF3QWxnQUJBQUFBQUFBQkFBZ0FBQUFCQUFBQUFBQUNBQVlBQ0FBQkFBQUFBQUFEQUNRQURnQUJBQUFBQUFBRUFBZ0FNZ0FCQUFBQUFBQUZBRVVBT2dBQkFBQUFBQUFHQUFnQWZ3QURBQUVFQ1FBQkFCQUFod0FEQUFFRUNRQUNBQXdBbHdBREFBRUVDUUFEQUVnQW93QURBQUVFQ1FBRUFCQUE2d0FEQUFFRUNRQUZBSW9BK3dBREFBRUVDUUFHQUJBQmhXbGpiMjVtYjI1MFRXVmthWFZ0Um05dWRFWnZjbWRsSURJdU1DQTZJR2xqYjI1bWIyNTBJRG9nTWpFdE55MHlNREUzYVdOdmJtWnZiblJXWlhKemFXOXVJREV1TURzZ2RIUm1ZWFYwYjJocGJuUWdLSFl3TGprMEtTQXRiQ0E0SUMxeUlEVXdJQzFISURJd01DQXRlQ0F4TkNBdGR5QWlSeUlnTFdZZ0xYTnBZMjl1Wm05dWRBQnBBR01BYndCdUFHWUFid0J1QUhRQVRRQmxBR1FBYVFCMUFHMEFSZ0J2QUc0QWRBQkdBRzhBY2dCbkFHVUFJQUF5QUM0QU1BQWdBRG9BSUFCcEFHTUFid0J1QUdZQWJ3QnVBSFFBSUFBNkFDQUFNZ0F4QUMwQU53QXRBRElBTUFBeEFEY0FhUUJqQUc4QWJnQm1BRzhBYmdCMEFGWUFaUUJ5QUhNQWFRQnZBRzRBSUFBeEFDNEFNQUE3QUNBQWRBQjBBR1lBWVFCMUFIUUFid0JvQUdrQWJnQjBBQ0FBS0FCMkFEQUFMZ0E1QURRQUtRQWdBQzBBYkFBZ0FEZ0FJQUF0QUhJQUlBQTFBREFBSUFBdEFFY0FJQUF5QURBQU1BQWdBQzBBZUFBZ0FERUFOQUFnQUMwQWR3QWdBQ0lBUndBaUFDQUFMUUJtQUNBQUxRQnpBR2tBWXdCdkFHNEFaZ0J2QUc0QWRBQUFBZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSUFBQUFBUUFDQUZzQkFnRURBUVFCQlFoemNHbHVibVZ5T1FsemNHbHVibVZ5TFRFSWMzQnBibTVsY2pFSWMzQnBibTVsY2pJQUFBRUFBZi8vQUE4QUFBQUFBQUFBQUFBQUFBQUFBQUFBQURJQU1nTVkvK0VEZ1ArQUF4ai80UU9BLzRDd0FDeXdJR0JtTGJBQkxDQmtJTERBVUxBRUpscXdCRVZiV0NFaklSdUtXQ0N3VUZCWUliQkFXUnNnc0RoUVdDR3dPRmxaSUxBS1JXRmtzQ2hRV0NHd0NrVWdzREJRV0NHd01Ga2JJTERBVUZnZ1ppQ0tpbUVnc0FwUVdHQWJJTEFnVUZnaHNBcGdHeUN3TmxCWUliQTJZQnRnV1ZsWkc3QUFLMWxaSTdBQVVGaGxXVmt0c0FJc0lFVWdzQVFsWVdRZ3NBVkRVRml3QlNOQ3NBWWpRaHNoSVZtd0FXQXRzQU1zSXlFaklTQmtzUVZpUWlDd0JpTkNzZ29BQWlvaElMQUdReUNLSUlxd0FDdXhNQVVsaWxGWVlGQWJZVkpaV0NOWklTQ3dRRk5Zc0FBckd5R3dRRmtqc0FCUVdHVlpMYkFFTExBSUkwS3dCeU5Dc0FBalFyQUFRN0FIUTFGWXNBaERLN0lBQVFCRFlFS3dGbVVjV1Myd0JTeXdBRU1nUlNDd0FrVmpzQUZGWW1CRUxiQUdMTEFBUXlCRklMQUFLeU94QkFRbFlDQkZpaU5oSUdRZ3NDQlFXQ0d3QUJ1d01GQllzQ0Fic0VCWldTT3dBRkJZWlZtd0F5VWpZVVJFTGJBSExMRUZCVVd3QVdGRUxiQUlMTEFCWUNBZ3NBcERTckFBVUZnZ3NBb2pRbG13QzBOS3NBQlNXQ0N3Q3lOQ1dTMndDU3dndUFRQVlpQzRCQUJqaWlOaHNBeERZQ0NLWUNDd0RDTkNJeTJ3Q2l4TFZGaXhCd0ZFV1NTd0RXVWplQzJ3Q3l4TFVWaExVMWl4QndGRVdSc2hXU1N3RTJVamVDMndEQ3l4QUExRFZWaXhEUTFEc0FGaFFyQUpLMW13QUVPd0FpVkNzZ0FCQUVOZ1FyRUtBaVZDc1FzQ0pVS3dBUllqSUxBREpWQllzQUJEc0FRbFFvcUtJSW9qWWJBSUtpRWpzQUZoSUlvalliQUlLaUVic0FCRHNBSWxRckFDSldHd0NDb2hXYkFLUTBld0MwTkhZTENBWWlDd0FrVmpzQUZGWW1DeEFBQVRJMFN3QVVPd0FENnlBUUVCUTJCQ0xiQU5MTEVBQlVWVVdBQ3dEU05DSUdDd0FXRzFEZzRCQUF3QVFrS0tZTEVNQkN1d2F5c2JJbGt0c0E0c3NRQU5LeTJ3RHl5eEFRMHJMYkFRTExFQ0RTc3RzQkVzc1FNTkt5MndFaXl4QkEwckxiQVRMTEVGRFNzdHNCUXNzUVlOS3kyd0ZTeXhCdzByTGJBV0xMRUlEU3N0c0Jjc3NRa05LeTJ3R0N5d0J5dXhBQVZGVkZnQXNBMGpRaUJnc0FGaHRRNE9BUUFNQUVKQ2ltQ3hEQVFyc0dzckd5SlpMYkFaTExFQUdDc3RzQm9zc1FFWUt5MndHeXl4QWhnckxiQWNMTEVER0NzdHNCMHNzUVFZS3kyd0hpeXhCUmdyTGJBZkxMRUdHQ3N0c0NBc3NRY1lLeTJ3SVN5eENCZ3JMYkFpTExFSkdDc3RzQ01zSUdDd0RtQWdReU93QVdCRHNBSWxzQUlsVVZnaklEeXdBV0Fqc0JKbEhCc2hJVmt0c0NRc3NDTXJzQ01xTGJBbExDQWdSeUFnc0FKRlk3QUJSV0pnSTJFNEl5Q0tWVmdnUnlBZ3NBSkZZN0FCUldKZ0kyRTRHeUZaTGJBbUxMRUFCVVZVV0FDd0FSYXdKU3F3QVJVd0d5SlpMYkFuTExBSEs3RUFCVVZVV0FDd0FSYXdKU3F3QVJVd0d5SlpMYkFvTENBMXNBRmdMYkFwTEFDd0EwVmpzQUZGWXJBQUs3QUNSV093QVVWaXNBQXJzQUFXdEFBQUFBQUFSRDRqT0xFb0FSVXFMYkFxTENBOElFY2dzQUpGWTdBQlJXSmdzQUJEWVRndHNDc3NMaGM4TGJBc0xDQThJRWNnc0FKRlk3QUJSV0pnc0FCRFliQUJRMk00TGJBdExMRUNBQllsSUM0Z1I3QUFJMEt3QWlWSmlvcEhJMGNqWVNCWVloc2hXYkFCSTBLeUxBRUJGUlFxTGJBdUxMQUFGckFFSmJBRUpVY2pSeU5oc0FaRksyV0tMaU1nSUR5S09DMndMeXl3QUJhd0JDV3dCQ1VnTGtjalJ5TmhJTEFFSTBLd0JrVXJJTEJnVUZnZ3NFQlJXTE1DSUFNZ0c3TUNKZ01hV1VKQ0l5Q3dDVU1naWlOSEkwY2pZU05HWUxBRVE3Q0FZbUFnc0FBcklJcUtZU0N3QWtOZ1pDT3dBME5oWkZCWXNBSkRZUnV3QTBOZ1diQURKYkNBWW1FaklDQ3dCQ1lqUm1FNEd5T3dDVU5Hc0FJbHNBbERSeU5ISTJGZ0lMQUVRN0NBWW1BaklMQUFLeU93QkVOZ3NBQXJzQVVsWWJBRkpiQ0FZckFFSm1FZ3NBUWxZR1Fqc0FNbFlHUlFXQ0ViSXlGWkl5QWdzQVFtSTBaaE9Ga3RzREFzc0FBV0lDQWdzQVVtSUM1SEkwY2pZU004T0Myd01TeXdBQllnc0FralFpQWdJRVlqUjdBQUt5TmhPQzJ3TWl5d0FCYXdBeVd3QWlWSEkwY2pZYkFBVkZndUlEd2pJUnV3QWlXd0FpVkhJMGNqWVNDd0JTV3dCQ1ZISTBjalliQUdKYkFGSlVtd0FpVmhzQUZGWXlNZ1dHSWJJVmxqc0FGRlltQWpMaU1nSUR5S09DTWhXUzJ3TXl5d0FCWWdzQWxESUM1SEkwY2pZU0Jnc0NCZ1pyQ0FZaU1nSUR5S09DMndOQ3dqSUM1R3NBSWxSbEpZSUR4WkxyRWtBUlFyTGJBMUxDTWdMa2F3QWlWR1VGZ2dQRmt1c1NRQkZDc3RzRFlzSXlBdVJyQUNKVVpTV0NBOFdTTWdMa2F3QWlWR1VGZ2dQRmt1c1NRQkZDc3RzRGNzc0M0ckl5QXVSckFDSlVaU1dDQThXUzZ4SkFFVUt5MndPQ3l3THl1S0lDQThzQVFqUW9vNEl5QXVSckFDSlVaU1dDQThXUzZ4SkFFVUs3QUVReTZ3SkNzdHNEa3NzQUFXc0FRbHNBUW1JQzVISTBjalliQUdSU3NqSUR3Z0xpTTRzU1FCRkNzdHNEb3NzUWtFSlVLd0FCYXdCQ1d3QkNVZ0xrY2pSeU5oSUxBRUkwS3dCa1VySUxCZ1VGZ2dzRUJSV0xNQ0lBTWdHN01DSmdNYVdVSkNJeUJIc0FSRHNJQmlZQ0N3QUNzZ2lvcGhJTEFDUTJCa0k3QURRMkZrVUZpd0FrTmhHN0FEUTJCWnNBTWxzSUJpWWJBQ0pVWmhPQ01nUENNNEd5RWdJRVlqUjdBQUt5TmhPQ0Zac1NRQkZDc3RzRHNzc0M0ckxyRWtBUlFyTGJBOExMQXZLeUVqSUNBOHNBUWpRaU00c1NRQkZDdXdCRU11c0NRckxiQTlMTEFBRlNCSHNBQWpRcklBQVFFVkZCTXVzQ29xTGJBK0xMQUFGU0JIc0FBalFySUFBUUVWRkJNdXNDb3FMYkEvTExFQUFSUVRzQ3NxTGJCQUxMQXRLaTJ3UVN5d0FCWkZJeUF1SUVhS0kyRTRzU1FCRkNzdHNFSXNzQWtqUXJCQkt5MndReXl5QUFBNkt5MndSQ3l5QUFFNkt5MndSU3l5QVFBNkt5MndSaXl5QVFFNkt5MndSeXl5QUFBN0t5MndTQ3l5QUFFN0t5MndTU3l5QVFBN0t5MndTaXl5QVFFN0t5MndTeXl5QUFBM0t5MndUQ3l5QUFFM0t5MndUU3l5QVFBM0t5MndUaXl5QVFFM0t5MndUeXl5QUFBNUt5MndVQ3l5QUFFNUt5MndVU3l5QVFBNUt5MndVaXl5QVFFNUt5MndVeXl5QUFBOEt5MndWQ3l5QUFFOEt5MndWU3l5QVFBOEt5MndWaXl5QVFFOEt5MndWeXl5QUFBNEt5MndXQ3l5QUFFNEt5MndXU3l5QVFBNEt5MndXaXl5QVFFNEt5MndXeXl3TUNzdXNTUUJGQ3N0c0Z3c3NEQXJzRFFyTGJCZExMQXdLN0ExS3kyd1hpeXdBQmF3TUN1d05pc3RzRjhzc0RFckxyRWtBUlFyTGJCZ0xMQXhLN0EwS3kyd1lTeXdNU3V3TlNzdHNHSXNzREVyc0RZckxiQmpMTEF5S3k2eEpBRVVLeTJ3WkN5d01pdXdOQ3N0c0dVc3NESXJzRFVyTGJCbUxMQXlLN0EyS3kyd1p5eXdNeXN1c1NRQkZDc3RzR2dzc0RNcnNEUXJMYkJwTExBeks3QTFLeTJ3YWl5d015dXdOaXN0c0dzc0s3QUlaYkFESkZCNHNBRVZNQzBBQUV1NEFNaFNXTEVCQVk1WnVRZ0FDQUJqSUxBQkkwUWdzQU1qY0xBT1JTQWdTN2dBRGxGTHNBWlRXbGl3TkJ1d0tGbGdaaUNLVlZpd0FpVmhzQUZGWXlOaXNBSWpSTE1LQ1FVRUs3TUtDd1VFSzdNT0R3VUVLMW15QkNnSlJWSkVzd29OQmdRcnNRWUJSTEVrQVloUldMQkFpRml4QmdORXNTWUJpRkZZdUFRQWlGaXhCZ0ZFV1ZsWldiZ0IvNFd3QkkyeEJRQkVBQUFBKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIiksdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCemRHRnVaR0ZzYjI1bFBTSnVieUkvUGcwS1BDRkVUME5VV1ZCRklITjJaeUJRVlVKTVNVTWdJaTB2TDFjelF5OHZSRlJFSUZOV1J5QXhMakV2TDBWT0lpQWlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZSM0poY0docFkzTXZVMVpITHpFdU1TOUVWRVF2YzNabk1URXVaSFJrSWlBK0RRbzhjM1puSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUkrRFFvOGJXVjBZV1JoZEdFK0RRcERjbVZoZEdWa0lHSjVJRVp2Ym5SR2IzSm5aU0F5TURFeU1EY3pNU0JoZENCR2Nta2dTblZzSURJeElEQXpPakE0T2pRNUlESXdNVGNOQ2lCQ2VTQmhaRzFwYmcwS1BDOXRaWFJoWkdGMFlUNE5DanhrWldaelBnMEtQR1p2Ym5RZ2FXUTlJbWxqYjI1bWIyNTBJaUJvYjNKcGVpMWhaSFl0ZUQwaU1UQXlOQ0lnUGcwS0lDQThabTl1ZEMxbVlXTmxJQTBLSUNBZ0lHWnZiblF0Wm1GdGFXeDVQU0pwWTI5dVptOXVkQ0lOQ2lBZ0lDQm1iMjUwTFhkbGFXZG9kRDBpTlRBd0lnMEtJQ0FnSUdadmJuUXRjM1J5WlhSamFEMGlibTl5YldGc0lnMEtJQ0FnSUhWdWFYUnpMWEJsY2kxbGJUMGlNVEF5TkNJTkNpQWdJQ0J3WVc1dmMyVXRNVDBpTWlBd0lEWWdNeUF3SURBZ01DQXdJREFnTUNJTkNpQWdJQ0JoYzJObGJuUTlJamc1TmlJTkNpQWdJQ0JrWlhOalpXNTBQU0l0TVRJNElnMEtJQ0FnSUhndGFHVnBaMmgwUFNJM09USWlEUW9nSUNBZ1ltSnZlRDBpTUNBdE1USTRJREV3TWpRZ09EazJJZzBLSUNBZ0lIVnVaR1Z5YkdsdVpTMTBhR2xqYTI1bGMzTTlJakFpRFFvZ0lDQWdkVzVrWlhKc2FXNWxMWEJ2YzJsMGFXOXVQU0l3SWcwS0lDQWdJSFZ1YVdOdlpHVXRjbUZ1WjJVOUlsVXJNREEzT0MxRk9EQTJJZzBLSUNBdlBnMEtQRzFwYzNOcGJtY3RaMng1Y0dnZ0RRb2dMejROQ2lBZ0lDQThaMng1Y0dnZ1oyeDVjR2d0Ym1GdFpUMGlMbTV2ZEdSbFppSWdEUW9nTHo0TkNpQWdJQ0E4WjJ4NWNHZ2daMng1Y0dndGJtRnRaVDBpTG01dmRHUmxaaUlnRFFvZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaUxtNTFiR3dpSUdodmNtbDZMV0ZrZGkxNFBTSXdJaUFOQ2lBdlBnMEtJQ0FnSUR4bmJIbHdhQ0JuYkhsd2FDMXVZVzFsUFNKdWIyNXRZWEpyYVc1bmNtVjBkWEp1SWlCb2IzSnBlaTFoWkhZdGVEMGlNelF4SWlBTkNpQXZQZzBLSUNBZ0lEeG5iSGx3YUNCbmJIbHdhQzF1WVcxbFBTSjRJaUIxYm1samIyUmxQU0o0SWlCb2IzSnBlaTFoWkhZdGVEMGlNVEF3TVNJZ0RRcGtQU0pOTWpneElEVTBNM0V0TWpjZ0xURWdMVFV6SUMweGFDMDRNM0V0TVRnZ01DQXRNell1TlNBdE5uUXRNekl1TlNBdE1UZ3VOWFF0TWpNZ0xUTXlkQzA1SUMwME5TNDFkaTAzTm1nNU1USjJOREZ4TUNBeE5pQXRNQzQxSURNd2RDMHdMalVnTVRoeE1DQXhNeUF0TlNBeU9YUXRNVGNnTWprdU5YUXRNekV1TlNBeU1pNDFkQzAwT1M0MUlEbG9MVEV6TTNZdE9UZG9MVFF6T0hZNU4zcE5PVFUxSURNeE1IWXROVEp4TUNBdE1qTWdNQzQxSUMwMU1uUXdMalVnTFRVNGRDMHhNQzQxSUMwME55NDFkQzB5TmlBdE16QjBMVE16SUMweE5uUXRNekV1TlNBdE5DNDFjUzB4TkNBdE1TQXRNamt1TlNBdE1DNDFEUXAwTFRJNUxqVWdNQzQxYUMwek1td3RORFVnTVRJNGFDMDBNemxzTFRRMElDMHhNamhvTFRJNWFDMHpOSEV0TWpBZ01DQXRORFVnTVhFdE1qVWdNQ0F0TkRFZ09TNDFkQzB5TlM0MUlESXpkQzB4TXk0MUlESTVMalYwTFRRZ016QjJNVFkzYURreE1YcE5NVFl6SURJME4zRXRNVElnTUNBdE1qRWdMVGd1TlhRdE9TQXRNakV1TlhRNUlDMHlNUzQxZERJeElDMDRMalZ4TVRNZ01DQXlNaUE0TGpWME9TQXlNUzQxZEMwNUlESXhMalYwTFRJeUlEZ3VOWHBOTXpFMklERXlNM0V0T0NBdE1qWWdMVEUwSUMwME9IRXROU0F0TVRrZ0xURXdMalVnTFRNM2RDMDNMalVnTFRJMWRDMHpJQzB4TlhReElDMHhOQzQxRFFwME9TNDFJQzB4TUM0MWRESXhMalVnTFRSb016ZG9OamRvT0RGb09EQm9OalJvTXpaeE1qTWdNQ0F6TkNBeE1uUXlJRE00Y1MwMUlERXpJQzA1TGpVZ016QXVOWFF0T1M0MUlETTBMalZ4TFRVZ01Ua2dMVEV4SURNNWFDMHpOamg2VFRNek5pQTBPVGgyTWpJNGNUQWdNVEVnTWk0MUlESXpkREV3SURJeExqVjBNakF1TlNBeE5TNDFkRE0wSURab01UZzRjVE14SURBZ05URXVOU0F0TVRRdU5YUXlNQzQxSUMwMU1pNDFkaTB5TWpkb0xUTXlOM29pSUM4K0RRb2dJQ0FnUEdkc2VYQm9JR2RzZVhCb0xXNWhiV1U5SW5Od2FXNXVaWEk1SWlCMWJtbGpiMlJsUFNJbUkzaGxOMlU1T3lJZ0RRcGtQU0pOTlRFeUlEZzVObkV0TVRBeklEQWdMVEU1Tmk0MUlDMHpPUzQxZEMweE5qSWdMVEV3Tmk0MWRDMHhNRGt1TlNBdE1UVTVMalYwTFRRMElDMHhPVFF1TlhFeklERXhPU0ExT1NBeU1Ua3VOWFF4TlRFZ01UVTRMalYwTWpBMklEVTRjVEUzTWlBd0lESTVOQ0F0TVRNeGRERXlNaUF0TXpFM2NUQWdMVFF3SURJNElDMDJPSFEyT0NBdE1qaDBOamdnTWpoME1qZ2dOamh4TUNBeE16a2dMVFk0TGpVZ01qVTNkQzB4T0RZdU5TQXhPRFl1TlhRdE1qVTNJRFk0TGpWNlRUVXhNaUF0TVRJNGNURXdNeUF3SURFNU5pNDFJRE01TGpWME1UWXlJREV3Tmk0MWRERXdPUzQxSURFMU9TNDFkRFEwSURFNU5DNDFEUXB4TFRNZ0xURXhPU0F0TlRrZ0xUSXhPUzQxZEMweE5URWdMVEUxT0M0MWRDMHlNRFlnTFRVNGNTMHhNVE1nTUNBdE1qQTVJRFl3ZEMweE5URXVOU0F4TmpOMExUVTFMalVnTWpJMWNUQWdOREFnTFRJNElEWTRkQzAyT0NBeU9IUXROamdnTFRJNGRDMHlPQ0F0TmpoeE1DQXRNVE01SURZNExqVWdMVEkxTjNReE9EWXVOU0F0TVRnMkxqVjBNalUzSUMwMk9DNDFlaUlnTHo0TkNpQWdJQ0E4WjJ4NWNHZ2daMng1Y0dndGJtRnRaVDBpYzNCcGJtNWxjaTB4SWlCMWJtbGpiMlJsUFNJbUkzaGxOekl5T3lJZ0RRcGtQU0pOTVRBeU5DQXpPRFJ4TFRJZ09EY2dMVFEzTGpVZ01Ua3hMalYwTFRFd09DNDFJREUyTkM0MWNTMHlPU0F5T1NBdE56Y3VOU0EyTUhRdE9EY3VOU0EwTm5FdE16WWdNVFFnTFRnNUlESTBkQzA1TVNBeE1HZ3RNVEZ4TFRnMElDMHlJQzB4T0RVdU5TQXRORFowTFRFMU9TNDFJQzB4TURWeExUSTRJQzB5T1NBdE5UZ2dMVGMxTGpWMExUUTBJQzA0TkM0MWNTMHhOQ0F0TXpVZ0xUSXpMalVnTFRnMmRDMDVMalVnTFRnNGRpMHhNWEV4SUMwek9TQXhNaTQxSUMwNU1pNDFkREkzTGpVZ0xUZzVMalYwTkRjZ0xUZ3dMalYwTlRrZ0xUY3hMalYwTnpNdU5TQXROVFV1TlhRNE1TNDFJQzAwTWk0MURRcHhNelFnTFRFMElEZ3pJQzB5TTNRNE5TQXRPV2d4TVhFNU1pQXlJREUzTmlBek9YRXpOU0F4TlNBM055NDFJRFExZERZNExqVWdOVGh4TWpZZ01qY2dOVFFnTnpBdU5YUTBNaUEzT0M0MWNURTVJRFV3SURJMklERXdOR2cwY1RJMklEQWdORFVnTVRndU5YUXhPU0EwTlM0MWRqVjJNSFl3ZWswNU1qSWdNakUwY1Mwek5TQXRPREFnTFRrNUlDMHhOREZ4TFRZeklDMDJNU0F0TVRRMElDMDVNbkV0TXpFZ0xURXlJQzAzTnlBdE1qQXVOWFF0T0RBZ0xUZ3VOV2d0TVRCeExUY3pJRElnTFRFMk1TQTBNQzQxZEMweE16a2dPVEV1TlhFdE1qUWdNalVnTFRVd0lEWTJkQzB6T0NBM013MEtjUzB4TWlBek1DQXRNakFnTnpSMExUZ2dOemR4TUNBek5pQXhNQzQxSURnMWRESTBMalVnT0ROeE16TWdOelFnT1RNZ01UTXhjVFU0SURVMklERXpNeUE0TkhFeU9TQXhNU0EzTVM0MUlERTVkRGN6TGpVZ09IRXpOU0F3SURneUxqVWdMVEV3ZERjNUxqVWdMVEkwY1RjeElDMHpNaUF4TWpVZ0xUZzVjVFUwSUMwMU5pQTRNaUF0TVRJNGNUSTNJQzAzTWlBeU5TQXRNVFE1ZGpCMkxUVnhNQ0F0TWpRZ01UWXVOU0F0TkRJdU5YUTBNQzQxSUMweU1TNDFjUzA1SUMwMU1pQXRNekVnTFRFd01YWXdlaUlnTHo0TkNpQWdJQ0E4WjJ4NWNHZ2daMng1Y0dndGJtRnRaVDBpYzNCcGJtNWxjakVpSUhWdWFXTnZaR1U5SWlZamVHVTRNRFk3SWlBTkNtUTlJazB6TURFZ09Ua3VOWEV3SUMwek1DNDFJQzB5TVM0MUlDMDFNblF0TlRJdU5TQXRNakV1TlhFdE1qa2dNQ0F0TlRFZ01qSjBMVEl5SURVeGNUQWdNekVnTWpFdU5TQTFNaTQxZERVeUlESXhMalYwTlRJZ0xUSXhMalYwTWpFdU5TQXROVEo2VFRVNE5TQXRNVGd1TlhFd0lDMHpNQzQxSUMweU1TNDFJQzAxTVM0MWRDMDFNUzQxSUMweU1YUXROVEV1TlNBeU1YUXRNakV1TlNBMU1TNDFkREl4TGpVZ05USjBOVEV1TlNBeU1TNDFkRFV4TGpVZ0xUSXhMalYwTWpFdU5TQXROVEo2VFRFNE15QXpPRFJ4TUNBdE16QWdMVEl4TGpVZ0xUVXhMalYwTFRVeUlDMHlNUzQxZEMwMU1TNDFJREl4TGpVTkNuUXRNakVnTlRFdU5YUXlNU0ExTVM0MWREVXhMalVnTWpFdU5YUTFNaUF0TWpFdU5YUXlNUzQxSUMwMU1TNDFlazA0TnpBZ09UbHhNQ0F0TWprZ0xUSXlJQzAxTVhRdE5URWdMVEl5Y1Mwek1TQXdJQzAxTWk0MUlESXhMalYwTFRJeExqVWdOVEowTWpFdU5TQTFNblExTWlBeU1TNDFkRFV5SUMweU1TNDFkREl4TGpVZ0xUVXlMalY2VFRNeE9TQTJOamd1TlhFd0lDMHpOeTQxSUMweU55QXROalF1TlhRdE5qUXVOU0F0TWpkMExUWTBMalVnTWpkMExUSTNJRFkwTGpWME1qY2dOalF1TlhRMk5DNDFJREkzZERZMExqVWdMVEkzZERJM0lDMDJOQzQxZWswNU9EY2dNemcwRFFweE1DQXRNekFnTFRJeElDMDFNUzQxZEMwMU1TNDFJQzB5TVM0MWRDMDFNaUF5TVM0MWRDMHlNUzQxSURVeExqVjBNakV1TlNBMU1TNDFkRFV5SURJeExqVjBOVEV1TlNBdE1qRXVOWFF5TVNBdE5URXVOWHBOTmpJeUlEYzROaTQxY1RBZ0xUUTFMalVnTFRNeUlDMDNOeTQxZEMwM09DQXRNekowTFRjNElETXlkQzB6TWlBM055NDFkRE15SURjM0xqVjBOemdnTXpKME56Z2dMVE15ZERNeUlDMDNOeTQxZWswNU1qVWdOalk1Y1RBZ0xUVTBJQzB6T0NBdE9URjBMVGt3SUMwek4zRXROVFFnTUNBdE9URWdNemQwTFRNM0lEa3hjVEFnTlRJZ016Y2dPVEIwT1RFZ016aHhOVElnTUNBNU1DQXRNemdOQ25Rek9DQXRPVEI2SWlBdlBnMEtJQ0FnSUR4bmJIbHdhQ0JuYkhsd2FDMXVZVzFsUFNKemNHbHVibVZ5TWlJZ2RXNXBZMjlrWlQwaUppTjRaVFl6WmpzaUlBMEtaRDBpVFRVeE1pQTFPVE4yTUhFdE1qVWdNQ0F0TkRJdU5TQXhOeTQxZEMweE55NDFJRFF5TGpWMk1UYzVjVEFnTWpRZ01UY3VOU0EwTVM0MWREUXlMalVnTVRjdU5YUTBNaTQxSUMweE55NDFkREUzTGpVZ0xUUXhMalYyTFRFM09YRXdJQzB5TlNBdE1UY3VOU0F0TkRJdU5YUXROREl1TlNBdE1UY3VOWHBOTlRFeUlDMHhNREYyTUhFdE1UVWdNQ0F0TWpZZ01URjBMVEV4SURJMmRqRTNPWEV3SURFMklERXhJREkzZERJMklERXhkREkySUMweE1YUXhNU0F0TWpkMkxURTNPWEV3SUMweE5TQXRNVEVnTFRJMmRDMHlOaUF0TVRGNlRUTTNPQ0ExTmpGMk1IRXRNVFFnTUNBdE1qZ2dPSFF0TWpFZ01qQU5DbXd0T0RrZ01UVTFjUzAzSURFeUlDMDNJREkyY1RBZ01qTWdNVFl1TlNBek9TNDFkRE01TGpVZ01UWXVOWEV4TXlBd0lESTNJQzAzTGpWME1qRWdMVEU0TGpWc09Ea2dMVEUxTlhFNElDMHhNeUE0SUMweU9IRXdJQzB5TkNBdE1UWXVOU0F0TkRCMExUTTVMalVnTFRFMmVrMDNNellnTFRNM2RqQnhMVEl3SURBZ0xUSTVJREUzYkMwNU1DQXhOVFZ4TFRRZ055QXROQ0F4Tm5Fd0lERTBJRGt1TlNBeU5IUXlNeTQxSURFd2NUSXdJREFnTWprZ0xURTNiRGt3SUMweE5UVnhOQ0F0T0NBMElDMHhOM0V3SUMweE5DQXRPUzQxSUMweU15NDFkQzB5TXk0MUlDMDVMalYyTUhwTk1qYzVJRFEyTmcwS2NTMHhOQ0F3SUMweU5pQTNiQzB4TlRVZ09UQnhMVEV4SURZZ0xURTRMalVnTVRsMExUY3VOU0F5Tm5Fd0lESXhJREUxTGpVZ016WXVOWFF6Tmk0MUlERTFMalZ4TVRRZ01DQXlOaUF0TjJ3eE5UWWdMVGt3Y1RFd0lDMDJJREU0SUMweE9YUTRJQzB5Tm5Fd0lDMHlNU0F0TVRVdU5TQXRNell1TlhRdE16Y3VOU0F0TVRVdU5YWXdlazA1TURBZ01UTXdkakJ4TFRnZ01DQXRNVFVnTkd3dE1UVTFJRGt3Y1MweE5TQTRJQzB4TlNBeU5uRXdJREV5SURndU5TQXlNWFF5TVM0MUlEbHhPQ0F3SURFMUlDMDBiREUxTlNBdE9UQnhNVFVnTFRrZ01UVWdMVEkyY1RBZ0xURXlJQzA1SUMweU1YUXRNakVnTFRsMk1Ib05DazB5TkRNZ016TTJhQzB4TnpseExUSXdJREFnTFRNMElERTBkQzB4TkNBek5IUXhOQ0F6TkhRek5DQXhOR2d4TnpseE1qQWdNQ0F6TkM0MUlDMHhOSFF4TkM0MUlDMHpOSFF0TVRRdU5TQXRNelIwTFRNMExqVWdMVEUwZWswNU5qQWdNelUwYUMweE56bHhMVEV6SURBZ0xUSXhMalVnT1hRdE9DNDFJREl4ZERndU5TQXlNWFF5TVM0MUlEbG9NVGM1Y1RFeUlEQWdNakVnTFRsME9TQXRNakYwTFRrZ0xUSXhkQzB5TVNBdE9YcE5NVEkwSURFeE5YWXdjUzB4T0NBd0lDMHpNU0F4TXk0MWRDMHhNeUF6TVM0MWNUQWdNVEVnTmk0MUlESXlMalYwTVRVdU5TQXhOaTQxYkRFMU5TQTRPWEV4TUNBMklESXlJRFlOQ25FeE9TQXdJRE15SUMweE0zUXhNeUF0TXpGeE1DQXRNVEVnTFRZdU5TQXRNakl1TlhRdE1UVXVOU0F0TVRZdU5Xd3RNVFUxSUMwNU1IRXRNVEVnTFRZZ0xUSXpJQzAyZWswM05EVWdORGc0Y1MweE15QXdJQzB5TVM0MUlEbDBMVGd1TlNBeU1YRXdJREUzSURFMUlESTJiREUxTlNBNU1IRTJJRE1nTVRRZ00zRXhNaUF3SURJeElDMDRMalYwT1NBdE1qRXVOWEV3SUMweE5pQXRNVFFnTFRJMWJDMHhOVFVnTFRrd2NTMDNJQzAwSUMweE5TQXROSFl3ZWsweU9EZ2dMVFExY1MweE55QXdJQzB5T1NBeE1uUXRNVElnTWpseE1DQXhNU0EySURJeGJEZzVJREUxTlhFMUlEZ2dNVFV1TlNBeE15NDFEUXAwTVRrdU5TQTFMalZ4TVRjZ01DQXlPU0F0TVRKME1USWdMVEk1Y1RBZ0xURXdJQzAxSUMweE9Xd3RPRGtnTFRFMU5YRXROU0F0T1NBdE1UVXVOU0F0TVRWMExUSXdMalVnTFRaMk1IcE5OalEySURVNE4zRXRNVElnTUNBdE1qRWdPQzQxZEMwNUlESXhMalZ4TUNBNElEUWdNVFZzT1RBZ01UVTFjVGtnTVRVZ01qWWdNVFZ4TVRJZ01DQXlNU0F0T1hRNUlDMHlNWEV3SUMwNElDMDBJQzB4Tld3dE9UQWdMVEUxTlhFdE9DQXRNVFVnTFRJMklDMHhOWFl3ZWlJZ0x6NE5DaUFnUEM5bWIyNTBQZzBLUEM5a1pXWnpQand2YzNablBnMEsjaWNvbmZvbnQpIGZvcm1hdChcXFwic3ZnXFxcIil9Lmljb25mb250e2ZvbnQtZmFtaWx5Omljb25mb250IWltcG9ydGFudDtmb250LXNpemU6MTZweDtmb250LXN0eWxlOm5vcm1hbDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX0uaWNvbi1zcGlubmVyOTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEU3RTlcXFwifS5pY29uLXNwaW5uZXItMTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEU3MjJcXFwifS5pY29uLXNwaW5uZXIxOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRTgwNlxcXCJ9Lmljb24tc3Bpbm5lcjI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFNjNGXFxcIn0ud3Ytc3Bpbm5lcltkYXRhLXYtMDY3Y2NjMWZde2Rpc3BsYXk6aW5saW5lLWJsb2NrO292ZXJmbG93OmhpZGRlbjstd2Via2l0LWFuaW1hdGlvbjpjaXJjbGUgMS4ycyBpbmZpbml0ZSBsaW5lYXI7LW8tYW5pbWF0aW9uOmNpcmNsZSAxLjJzIGluZmluaXRlIGxpbmVhcjthbmltYXRpb246Y2lyY2xlIDEuMnMgaW5maW5pdGUgbGluZWFyfUAtd2Via2l0LWtleWZyYW1lcyBjaXJjbGV7MCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3t0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gMjMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMjIiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zaG9wLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Nob3Auc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYzsgfVxcblxcbi53ZXVpLXRhYmJhciB7XFxuICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbi53ZXVpLWNlbGxfX2JkIHAge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBmb250LXdlaWdodDogMjAwOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjIiLCJjb25zdCByb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvaG9tZS52dWUnKSksICdzaG9wLWhvbWUnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdob21lJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiAn6aaW6aG1J1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9jYXJ0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2NhcnQudnVlJykpLCAnc2hvcC1jYXJ0JylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnY2FydCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2F0ZWdvcnknLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvY2F0ZWdvcnkudnVlJykpLCAnc2hvcC1jYXRlZ29yeScpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2NhdGVnb3J5J1xyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9vcmRlci1saXN0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL29yZGVyLWxpc3QudnVlJykpLCAnc2hvcC1vcmRlci1saXN0JylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnb3JkZXItbGlzdCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvb3JkZXIvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL29yZGVyLnZ1ZScpKSwgJ3Nob3Atb3JkZXInKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdvcmRlcicsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvZmF2b3VyaXRlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2Zhdm91cml0ZS52dWUnKSksICdzaG9wLWZhdm91cml0ZScpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2Zhdm91cml0ZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2hlY2tvdXQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hlY2tvdXQudnVlJykpLCAnc2hvcC1jaGVja291dCcpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2NoZWNrb3V0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlLFxyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3VzZXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvdXNlci52dWUnKSksICdzaG9wLXVzZXInKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICd1c2VyJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9wcm9maWxlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Byb2ZpbGUudnVlJykpLCAnc2hvcC1wcm9maWxlJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncHJvZmlsZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYXZhdGFyJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2F2YXRhci52dWUnKSksICdzaG9wLWF2YXRhcicpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2F2YXRhcicsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2FkZHJlc3MudnVlJykpLCAnc2hvcC1hZGRyZXNzJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnYWRkcmVzcycsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzL2FkZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hZGRyZXNzLWVkaXQudnVlJykpLCAnc2hvcC1hZGRyZXNzLWFkZCcpXHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWRkcmVzcy86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWRkcmVzcy1lZGl0LnZ1ZScpKSwgJ3Nob3AtYWRkcmVzcy1lZGl0JylcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hYm91dC11cycsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hYm91dC11cy52dWUnKSksICdzaG9wLWFib3V0LXVzJylcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvaGVscCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWxwLnZ1ZScpKSwgJ3Nob3AtaGVscCcpXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2hlbHAvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2hlbHAtZGV0YWlsLnZ1ZScpKSwgJ3Nob3AtaGVscC1kZXRhaWwnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi52dWUnKSksICdzaG9wLWxvZ2luJylcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9yZWdpc3RlcicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3Rlci52dWUnKSksICdzaG9wLXJlZ2lzdGVyJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncmVnaXN0ZXInLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvZHVjdC52dWUnKSksICdzaG9wLXByb2R1Y3QnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdwcm9kdWN0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3Bhc3N3b3JkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Bhc3N3b3JkLnZ1ZScpKSwgJ3Nob3AtcGFzc3dvcmQnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdwYXNzd29yZCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9XHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avcm91dGVzLmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKVxufVxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxcXFwiZXMyMDE1XFxcIixcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIl0sXFxcImNvbW1lbnRzXFxcIjpmYWxzZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9tYWlubWVudS52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtNjIwMDJkNDVcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXG1haW5tZW51LnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gbWFpbm1lbnUudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTYyMDAyZDQ1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjIwMDJkNDVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjIiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tYWlubWVudS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjZlNTczYmY3XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAyMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4jdGFiYmFyIC53ZXVpX3RhYmJhcltkYXRhLXYtNjIwMDJkNDVdIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG59XFxuI3RhYmJhciAud2V1aV90YWJiYXIgLndldWlfdGFiYmFyX2l0ZW0gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICM2NjY7XFxufVxcbiN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGNvbG9yOiAjMDliYjA3O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtDQUFFO0FBQ1o7SUFDRSxnQkFBZ0I7SUFDaEIsWUFBWTtDQUFFO0FBQ2hCO0lBQ0UsZUFBZTtDQUFFXCIsXCJmaWxlXCI6XCJtYWlubWVudS52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiI3RhYmJhciAud2V1aV90YWJiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwOyB9XFxuICAjdGFiYmFyIC53ZXVpX3RhYmJhciAud2V1aV90YWJiYXJfaXRlbSAuaWNvbiB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICM2NjY7IH1cXG4gICN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24gLmljb24ge1xcbiAgICBjb2xvcjogIzA5YmIwNzsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjIiLCI8dGVtcGxhdGU+XHJcbiAgPHd2LXRhYmJhciB2LWlmPVwibWVudVZpc2libGVcIiBmaXhlZD5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9cIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjEzOzwvaT5cclxuICAgICAgPHNwYW4+6aaW6aG1PC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9jYXRlZ29yeVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiBzbG90PVwiaWNvblwiPiYjeGU2MGI7PC9pPlxyXG4gICAgICA8c3Bhbj7liIbnsbs8L3NwYW4+XHJcbiAgICA8L3d2LXRhYmJhci1pdGVtPlxyXG4gICAgPHd2LXRhYmJhci1pdGVtIHRvPVwiL2NhcnRcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjExOzwvaT5cclxuICAgICAgPHNwYW4+6LSt54mp6L2mPC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi91c2VyXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxYzs8L2k+XHJcbiAgICAgIDxzcGFuPuaIkeeahDwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgPC93di10YWJiYXI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSAndnVleCdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICAgIG1lbnVWaXNpYmxlOiBzdGF0ZSA9PiBzdGF0ZS5pc01haW5NZW51VmlzaWJsZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7fVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgI3RhYmJhciAud2V1aV90YWJiYXIge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgYm90dG9tOiAwO1xyXG5cclxuICAgIC53ZXVpX3RhYmJhcl9pdGVtIHtcclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24ge1xyXG4gICAgICAuaWNvbiB7XHJcbiAgICAgICAgY29sb3I6ICMwOWJiMDc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBtYWlubWVudS52dWU/NjNiOTQ0Y2YiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gKF92bS5tZW51VmlzaWJsZSkgPyBfYygnd3YtdGFiYmFyJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImZpeGVkXCI6IFwiXCJcbiAgICB9XG4gIH0sIFtfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6Yk1wiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLpppbpobVcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvY2F0ZWdvcnlcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7piLXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIuWIhuexu1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9jYXJ0XCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6YkVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLotK3nianovaZcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvdXNlclwiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumJxcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi5oiR55qEXCIpXSldKV0sIDEpIDogX3ZtLl9lKClcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjIwMDJkNDVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJoYXNTY29wZWRcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDI0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIyIl0sInNvdXJjZVJvb3QiOiIifQ==