webpackJsonp([19],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(32)('wks')
  , uid        = __webpack_require__(33)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(29);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(62)
  , toPrimitive    = __webpack_require__(63)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(3)
  , ctx       = __webpack_require__(8)
  , hide      = __webpack_require__(4)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(30)
  , defined = __webpack_require__(21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys')
  , uid    = __webpack_require__(33);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(65)
  , enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(59);

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
/* 29 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(12);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(22)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(37)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(74)
  , hide           = __webpack_require__(4)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(7)
  , $iterCreate    = __webpack_require__(75)
  , setToStringTag = __webpack_require__(24)
  , getPrototypeOf = __webpack_require__(78)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(12)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(8)
  , invoke             = __webpack_require__(90)
  , html               = __webpack_require__(38)
  , cel                = __webpack_require__(20)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(12)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 41 */,
/* 42 */
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

var	fixUrls = __webpack_require__(100);

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
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
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
/* 53 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(13);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(14);

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
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(28);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(69);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(13);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(41);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _weVue = __webpack_require__(26);

var _weVue2 = _interopRequireDefault(_weVue);

__webpack_require__(98);

__webpack_require__(101);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = __webpack_require__(49);

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _index = __webpack_require__(54);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(52);

var _config2 = _interopRequireDefault(_config);

var _routes = __webpack_require__(122);

var _routes2 = _interopRequireDefault(_routes);

var _vuex = __webpack_require__(14);

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
    'mainmenu': __webpack_require__(124)
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(3).Object.assign;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(64)});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(19)(function(){
  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(27)
  , gOPS     = __webpack_require__(68)
  , pIE      = __webpack_require__(53)
  , toObject = __webpack_require__(35)
  , IObject  = __webpack_require__(30)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(19)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(17)
  , arrayIndexOf = __webpack_require__(66)(false)
  , IE_PROTO     = __webpack_require__(23)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17)
  , toLength  = __webpack_require__(31)
  , toIndex   = __webpack_require__(67);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
__webpack_require__(72);
__webpack_require__(79);
__webpack_require__(83);
module.exports = __webpack_require__(3).Promise;

/***/ }),
/* 71 */
/***/ (function(module, exports) {



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(73)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(36)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(22)
  , defined   = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(76)
  , descriptor     = __webpack_require__(29)
  , setToStringTag = __webpack_require__(24)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(5)
  , dPs         = __webpack_require__(77)
  , enumBugKeys = __webpack_require__(34)
  , IE_PROTO    = __webpack_require__(23)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(20)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(38).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(9)
  , anObject = __webpack_require__(5)
  , getKeys  = __webpack_require__(27);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(35)
  , IE_PROTO    = __webpack_require__(23)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(4)
  , Iterators     = __webpack_require__(7)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(81)
  , step             = __webpack_require__(82)
  , Iterators        = __webpack_require__(7)
  , toIObject        = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(36)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(37)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(8)
  , classof            = __webpack_require__(39)
  , $export            = __webpack_require__(16)
  , isObject           = __webpack_require__(10)
  , aFunction          = __webpack_require__(18)
  , anInstance         = __webpack_require__(84)
  , forOf              = __webpack_require__(85)
  , speciesConstructor = __webpack_require__(89)
  , task               = __webpack_require__(40).set
  , microtask          = __webpack_require__(91)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(92)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(24)($Promise, PROMISE);
__webpack_require__(93)(PROMISE);
Wrapper = __webpack_require__(3)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(94)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(8)
  , call        = __webpack_require__(86)
  , isArrayIter = __webpack_require__(87)
  , anObject    = __webpack_require__(5)
  , toLength    = __webpack_require__(31)
  , getIterFn   = __webpack_require__(88)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(7)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(39)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(7);
module.exports = __webpack_require__(3).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(5)
  , aFunction = __webpack_require__(18)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 90 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
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
  } return              fn.apply(that, args);
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(40).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(12)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(4);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(3)
  , dP          = __webpack_require__(9)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(99);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(42)(content, options);
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "/*!\r\n * WeUI v1.1.2 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:-apple-system-font,Helvetica Neue,sans-serif}*{margin:0;padding:0}a img{border:0}a{text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}@font-face{font-weight:400;font-style:normal;font-family:weui;src:url(\"data:application/octet-stream;base64,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\") format(\"truetype\")}[class*=\" weui-icon-\"],[class^=weui-icon-]{display:inline-block;vertical-align:middle;font:normal normal normal 14px/1 weui;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased}[class*=\" weui-icon-\"]:before,[class^=weui-icon-]:before{display:inline-block;margin-left:.2em;margin-right:.2em}.weui-icon-circle:before{content:\"\\EA01\"}.weui-icon-download:before{content:\"\\EA02\"}.weui-icon-info:before{content:\"\\EA03\"}.weui-icon-safe-success:before{content:\"\\EA04\"}.weui-icon-safe-warn:before{content:\"\\EA05\"}.weui-icon-success:before{content:\"\\EA06\"}.weui-icon-success-circle:before{content:\"\\EA07\"}.weui-icon-success-no-circle:before{content:\"\\EA08\"}.weui-icon-waiting:before{content:\"\\EA09\"}.weui-icon-waiting-circle:before{content:\"\\EA0A\"}.weui-icon-warn:before{content:\"\\EA0B\"}.weui-icon-info-circle:before{content:\"\\EA0C\"}.weui-icon-cancel:before{content:\"\\EA0D\"}.weui-icon-search:before{content:\"\\EA0E\"}.weui-icon-clear:before{content:\"\\EA0F\"}.weui-icon-back:before{content:\"\\EA10\"}.weui-icon-delete:before{content:\"\\EA11\"}[class*=\" weui-icon_\"]:before,[class^=weui-icon_]:before{margin:0}.weui-icon-success{font-size:23px;color:#09bb07}.weui-icon-waiting{font-size:23px;color:#10aeff}.weui-icon-warn{font-size:23px;color:#f43530}.weui-icon-info{font-size:23px;color:#10aeff}.weui-icon-success-circle,.weui-icon-success-no-circle{font-size:23px;color:#09bb07}.weui-icon-waiting-circle{font-size:23px;color:#10aeff}.weui-icon-circle{font-size:23px;color:#c9c9c9}.weui-icon-download,.weui-icon-info-circle{font-size:23px;color:#09bb07}.weui-icon-safe-success{color:#09bb07}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#f43530;font-size:22px}.weui-icon-clear,.weui-icon-search{color:#b2b2b2;font-size:14px}.weui-icon-delete.weui-icon_gallery-delete{color:#fff;font-size:22px}.weui-icon_msg{font-size:93px}.weui-icon_msg.weui-icon-warn{color:#f76260}.weui-icon_msg-primary{font-size:93px}.weui-icon_msg-primary.weui-icon-warn{color:#ffbe00}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.55555556;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn:after{content:\" \";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#000;background-color:#f8f8f8}.weui-btn_default:not(.weui-btn_disabled):visited{color:#000}.weui-btn_default:not(.weui-btn_disabled):active{color:rgba(0,0,0,.6);background-color:#dedede}.weui-btn_primary{background-color:#1aad19}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#179b16}.weui-btn_warn{background-color:#e64340}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_warn:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#ce3c39}.weui-btn_disabled{color:hsla(0,0%,100%,.6)}.weui-btn_disabled.weui-btn_default{color:rgba(0,0,0,.3);background-color:#f7f7f7}.weui-btn_disabled.weui-btn_primary{background-color:#9ed99d}.weui-btn_disabled.weui-btn_warn{background-color:#ec8b89}.weui-btn_loading .weui-loading{margin:-.2em .34em 0 0}.weui-btn_loading.weui-btn_primary,.weui-btn_loading.weui-btn_warn{color:hsla(0,0%,100%,.6)}.weui-btn_loading.weui-btn_primary{background-color:#179b16}.weui-btn_loading.weui-btn_warn{background-color:#ce3c39}.weui-btn_plain-primary{color:#1aad19;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:rgba(26,173,25,.6);border-color:rgba(26,173,25,.6)}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:rgba(53,53,53,.6);border-color:rgba(53,53,53,.6)}.weui-btn_plain-default:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2)}button.weui-btn,input.weui-btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,button.weui-btn_mini,input.weui-btn_inline,input.weui-btn_mini{width:auto}button.weui-btn_plain-default,button.weui-btn_plain-primary,input.weui-btn_plain-default,input.weui-btn_plain-primary{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;padding:0 1.32em;line-height:2.3;font-size:13px}.weui-btn+.weui-btn{margin-top:15px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:15px}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-btn-area_inline{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-btn-area_inline .weui-btn{margin-top:auto;margin-right:15px;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-btn-area_inline .weui-btn:last-child{margin-right:0}.weui-cells{margin-top:1.17647059em;background-color:#fff;line-height:1.47058824;font-size:17px;overflow:hidden;position:relative}.weui-cells:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells:after,.weui-cells:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5;z-index:2}.weui-cells:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells__title+.weui-cells{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px;z-index:2}.weui-cell:first-child:before{display:none}.weui-cell_primary{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_swiped{display:block;padding:0}.weui-cell_swiped>.weui-cell__bd{position:relative;z-index:1;background-color:#fff}.weui-cell_swiped>.weui-cell__ft{position:absolute;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;color:#fff}.weui-swiped-btn{display:block;padding:10px 1em;line-height:1.47058824;color:inherit}.weui-swiped-btn_default{background-color:#c7c7cc}.weui-swiped-btn_warn{background-color:#ff3b30}.weui-cell_access{-webkit-tap-highlight-color:rgba(0,0,0,0);color:inherit}.weui-cell_access:active{background-color:#ececec}.weui-cell_access .weui-cell__ft{padding-right:13px;position:relative}.weui-cell_access .weui-cell__ft:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:first-child:before{display:block}.weui-check__label{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999em}.weui-cells_radio .weui-cell__ft{padding-left:.35em}.weui-cells_radio .weui-check:checked+.weui-icon-checked:before{display:block;content:\"\\EA08\";color:#09bb07;font-size:16px}.weui-cells_checkbox .weui-cell__hd{padding-right:.35em}.weui-cells_checkbox .weui-icon-checked:before{content:\"\\EA01\";color:#c9c9c9;font-size:23px;display:block}.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before{content:\"\\EA06\";color:#09bb07}.weui-label{display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui-input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.47058824em;line-height:1.47058824}.weui-input::-webkit-inner-spin-button,.weui-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui-textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn .weui-textarea-counter{color:#e64340}.weui-toptips{display:none;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-cells_form .weui-cell__ft{font-size:0}.weui-cells_form .weui-icon-warn{display:none}.weui-cells_form input,.weui-cells_form label[for],.weui-cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-cell_warn{color:#e64340}.weui-cell_warn .weui-icon-warn{display:inline-block}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview:after,.weui-form-preview:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-form-preview:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-form-preview__hd .weui-form-preview__value{font-style:normal;font-size:1.6em}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-form-preview__ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}button.weui-form-preview__btn{background-color:transparent;border:0;outline:0;line-height:inherit;font-size:inherit}.weui-form-preview__btn:active{background-color:#eee}.weui-form-preview__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-cell_select .weui-select{padding-right:30px}.weui-cell_select .weui-cell__bd:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select{-webkit-appearance:none;border:0;outline:0;background-color:transparent;width:100%;font-size:inherit;height:45px;line-height:45px;position:relative;z-index:1;padding-left:15px}.weui-cell_select-before{padding-right:15px}.weui-cell_select-before .weui-select{width:105px;box-sizing:border-box}.weui-cell_select-before .weui-cell__hd{position:relative}.weui-cell_select-before .weui-cell__hd:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-cell_select-before .weui-cell__hd:before{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-cell_select-before .weui-cell__bd{padding-left:15px}.weui-cell_select-before .weui-cell__bd:after{display:none}.weui-cell_select-after{padding-left:15px}.weui-cell_select-after .weui-select{padding-left:0}.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:45px;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:45px;font-size:17px;color:#3cc51f}button.weui-vcode-btn{background-color:transparent;border-top:0;border-right:0;border-bottom:0;outline:0}.weui-vcode-btn:active{color:#52a341}.weui-gallery{display:none;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;z-index:1000}.weui-gallery__img{position:absolute;top:0;right:0;bottom:60px;left:0;background:50% no-repeat;background-size:contain}.weui-gallery__opr{position:absolute;right:0;bottom:0;left:0;background-color:#0d0d0d;color:#fff;line-height:60px;text-align:center}.weui-gallery__del{display:block}.weui-cell_switch{padding-top:6.5px;padding-bottom:6.5px}.weui-switch{-webkit-appearance:none;-moz-appearance:none;appearance:none}.weui-switch,.weui-switch-cp__box{position:relative;width:52px;height:32px;border:1px solid #dfdfdf;outline:0;border-radius:16px;box-sizing:border-box;background-color:#dfdfdf;transition:background-color .1s,border .1s}.weui-switch-cp__box:before,.weui-switch:before{content:\" \";position:absolute;top:0;left:0;width:50px;height:30px;border-radius:15px;background-color:#fdfdfd;transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1)}.weui-switch-cp__box:after,.weui-switch:after{content:\" \";position:absolute;top:0;left:0;width:30px;height:30px;border-radius:15px;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4);transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35)}.weui-switch-cp__input:checked~.weui-switch-cp__box,.weui-switch:checked{border-color:#04be02;background-color:#04be02}.weui-switch-cp__input:checked~.weui-switch-cp__box:before,.weui-switch:checked:before{-webkit-transform:scale(0);transform:scale(0)}.weui-switch-cp__input:checked~.weui-switch-cp__box:after,.weui-switch:checked:after{-webkit-transform:translateX(20px);transform:translateX(20px)}.weui-switch-cp__input{position:absolute;left:-9999px}.weui-switch-cp__box{display:block}.weui-uploader__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__files{list-style:none}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px;width:79px;height:79px;background:no-repeat 50%;background-size:cover}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:\" \";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file_status .weui-uploader__file-content{display:block}.weui-uploader__file-content{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__file-content .weui-icon-warn{display:inline-block}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:\" \";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-msg{padding-top:36px;text-align:center}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__text-area a{color:#586c94}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}.weui-msg__extra-area a{color:#586c94}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-article{padding:20px 15px;font-size:15px}.weui-article section{margin-bottom:1.5em}.weui-article h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article h2{font-size:16px}.weui-article h2,.weui-article h3{font-weight:400;margin-bottom:.34em}.weui-article h3{font-size:15px}.weui-article *{max-width:100%;box-sizing:border-box;word-wrap:break-word}.weui-article p{margin:0 0 .8em}.weui-tabbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.weui-tabbar:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #c0bfc4;color:#c0bfc4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-tabbar__item{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:5px 0 0;font-size:0;color:#999;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#09bb07}.weui-tabbar__icon{display:inline-block;width:27px;height:27px}.weui-tabbar__icon>i,i.weui-tabbar__icon{font-size:24px;color:#999}.weui-tabbar__icon img{width:100%;height:100%}.weui-tabbar__label{text-align:center;color:#999;font-size:10px;line-height:1.8}.weui-navbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;top:0;width:100%;background-color:#fafafa}.weui-navbar:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #ccc;color:#ccc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-navbar+.weui-tab__panel{padding-top:50px;padding-bottom:0}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-navbar__item:active{background-color:#ededed}.weui-navbar__item.weui-bar__item_on{background-color:#eaeaea}.weui-navbar__item:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #ccc;color:#ccc;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-navbar__item:last-child:after{display:none}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-bottom:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-tab__content{display:none}.weui-progress{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-progress__bar{background-color:#ebebeb;height:3px;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-progress__inner-bar{width:0;height:100%;background-color:#09bb07}.weui-progress__opr{display:block;margin-left:15px;font-size:0}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel:after,.weui-panel:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-panel:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box:first-child:before{display:none}a.weui-media-box{color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0)}a.weui-media-box:active{background-color:#ececec}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box_text .weui-media-box__title{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-media-box_appmsg .weui-media-box__hd{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box_appmsg .weui-media-box__thumb{width:100%;max-height:100%;vertical-align:top}.weui-media-box_appmsg .weui-media-box__bd{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-media-box_small-appmsg .weui-cells{margin-top:0}.weui-media-box_small-appmsg .weui-cells:before{display:none}.weui-grids{position:relative;overflow:hidden}.weui-grids:before{right:0;height:1px;border-top:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grids:after,.weui-grids:before{content:\" \";position:absolute;left:0;top:0;color:#d9d9d9}.weui-grids:after{width:1px;bottom:0;border-left:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box}.weui-grid:before{top:0;width:1px;border-right:1px solid #d9d9d9;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid:after,.weui-grid:before{content:\" \";position:absolute;right:0;bottom:0;color:#d9d9d9}.weui-grid:after{left:0;height:1px;border-bottom:1px solid #d9d9d9;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grid:active{background-color:#ececec}.weui-grid__icon{width:28px;height:28px;margin:0 auto}.weui-grid__icon img{display:block;width:100%;height:100%}.weui-grid__icon+.weui-grid__label{margin-top:5px}.weui-grid__label{display:block;color:#000;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-footer,.weui-grid__label{text-align:center;font-size:14px}.weui-footer{color:#999}.weui-footer a{color:#586c94}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px}.weui-footer__link:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #c7c7c7;color:#c7c7c7;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5);left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-flex{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-flex__item{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.weui-dialog__hd{padding:1.3em 1.6em .5em}.weui-dialog__title{font-weight:400;font-size:18px}.weui-dialog__bd{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.weui-dialog__ft{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-dialog__btn{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.weui-dialog__btn:active{background-color:#eee}.weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-dialog__btn:first-child:after{display:none}.weui-dialog__btn_default{color:#353535}.weui-dialog__btn_primary{color:#0bb20c}.weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-dialog__title{font-size:21px}.weui-skin_android .weui-dialog__hd{text-align:left}.weui-skin_android .weui-dialog__bd{color:#999;padding:.25em 1.6em 2em;font-size:17px;text-align:left}.weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.weui-skin_android .weui-dialog__ft:after{display:none}.weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.weui-skin_android .weui-dialog__btn:after{display:none}.weui-skin_android .weui-dialog__btn:active,.weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,.06)}.weui-skin_android .weui-dialog__btn:last-child{margin-right:-.8em}.weui-skin_android .weui-dialog__btn_default{color:gray}@media screen and (min-width:1024px){.weui-dialog{width:35%}}.weui-toast{position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:hsla(0,0%,7%,.7);text-align:center;border-radius:5px;color:#fff}.weui-icon_toast{margin:22px 0 0;display:block}.weui-icon_toast.weui-icon-success-no-circle:before{color:#fff;font-size:55px}.weui-icon_toast.weui-loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline}.weui-toast__content{margin:0 0 15px}.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-actionsheet__title{position:relative;height:65px;padding:0 20px;line-height:1.4;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;font-size:14px;color:#888;background:#fcfcfd}.weui-actionsheet__title:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__title .weui-actionsheet__title-text{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-actionsheet__menu{background-color:#fcfcfd}.weui-actionsheet__action{margin-top:6px;background-color:#fcfcfd}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{-webkit-transform:translate(0);transform:translate(0)}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore_line .weui-loadmore__tips{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore_dot .weui-loadmore__tips{padding:0 .16em}.weui-loadmore_dot .weui-loadmore__tips:before{content:\" \";width:4px;height:4px;border-radius:50%;background-color:#e5e5e5;display:inline-block;position:relative;vertical-align:0;top:-.16em}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#f43530;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;background-color:#efeff4}.weui-search-bar:before{top:0;border-top:1px solid #d7d6dc;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar:after,.weui-search-bar:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#d7d6dc}.weui-search-bar:after{bottom:0;border-bottom:1px solid #d7d6dc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{display:block}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label{display:none}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-ms-flex:auto;flex:auto;background-color:#efeff4}.weui-search-bar__form:after{content:\"\";position:absolute;left:0;top:0;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:10px;border:1px solid #e6e6ea;box-sizing:border-box;background:#fff}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;height:100%;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__box .weui-search-bar__input{padding:4px 0;width:100%;height:1.42857143em;border:0;font-size:14px;line-height:1.42857143em;box-sizing:content-box;background:transparent}.weui-search-bar__box .weui-search-bar__input:focus{outline:none}.weui-search-bar__box .weui-icon-search{position:absolute;left:10px;top:0;line-height:28px}.weui-search-bar__box .weui-icon-clear{position:absolute;top:0;right:0;padding:0 10px;line-height:28px}.weui-search-bar__label{position:absolute;top:1px;right:1px;bottom:1px;left:1px;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff}.weui-search-bar__label span{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__label .weui-icon-search{margin-right:5px}.weui-search-bar__cancel-btn{display:none;margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}.weui-search-bar__input:not(:valid)~.weui-icon-clear{display:none}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}.weui-picker{position:fixed;width:100%;left:0;bottom:0;z-index:5000;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateY(100%);transform:translateY(100%);transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-picker__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}.weui-picker__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__action{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#1aad19}.weui-picker__action:first-child{text-align:left;color:#888}.weui-picker__action:last-child{text-align:right}.weui-picker__bd{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;height:238px;overflow:hidden}.weui-picker__group{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:100%}.weui-picker__mask{top:0;height:100%;margin:0 auto;background:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat;-webkit-transform:translateZ(0);transform:translateZ(0)}.weui-picker__indicator,.weui-picker__mask{position:absolute;left:0;width:100%;z-index:3}.weui-picker__indicator{height:34px;top:102px}.weui-picker__indicator:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__indicator:after,.weui-picker__indicator:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-picker__indicator:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__content{position:absolute;top:0;left:0;width:100%}.weui-picker__item{padding:0;height:34px;line-height:34px;text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.weui-picker__item_disabled{color:#999}@-webkit-keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.weui-animate-slide-up{-webkit-animation:a ease .3s forwards;animation:a ease .3s forwards}@-webkit-keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.weui-animate-slide-down{-webkit-animation:b ease .3s forwards;animation:b ease .3s forwards}@-webkit-keyframes c{0%{opacity:0}to{opacity:1}}@keyframes c{0%{opacity:0}to{opacity:1}}.weui-animate-fade-in{-webkit-animation:c ease .3s forwards;animation:c ease .3s forwards}@-webkit-keyframes d{0%{opacity:1}to{opacity:0}}@keyframes d{0%{opacity:1}to{opacity:0}}.weui-animate-fade-out{-webkit-animation:d ease .3s forwards;animation:d ease .3s forwards}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree a{color:#586c94}.weui-agree__text{color:#999}.weui-agree__checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:0;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:13px;height:13px;position:relative;vertical-align:0;top:2px}.weui-agree__checkbox:checked:before{font-family:weui;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-align:center;speak:none;display:inline-block;vertical-align:middle;text-decoration:inherit;content:\"\\EA08\";color:#09bb07;font-size:13px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-48%) scale(.73);transform:translate(-50%,-48%) scale(.73)}.weui-agree__checkbox:disabled{background-color:#e1e1e1}.weui-agree__checkbox:disabled:before{color:#adadad}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:e 1s steps(12) infinite;animation:e 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading,.weui-loading.weui-loading_transparent{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\")}@-webkit-keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.weui-slider{padding:15px 18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.weui-slider__inner{position:relative;height:2px;background-color:#e9e9e9}.weui-slider__track{height:2px;background-color:#1aad19;width:0}.weui-slider__handler{position:absolute;left:0;top:50%;width:28px;height:28px;margin-left:-14px;margin-top:-14px;border-radius:50%;background-color:#fff;box-shadow:0 0 4px rgba(0,0,0,.2)}.weui-slider-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-slider-box .weui-slider{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-slider-box__value{margin-left:.5em;min-width:24px;color:#888;text-align:center;font-size:14px}.weui-toptips[data-v-1a7bec2b]{display:block}.wv-header[data-v-f6f5c16a]{display:flex;align-items:center;box-sizing:border-box;width:100%;height:50px;line-height:1;padding:0 10px;margin:0;color:#fff;position:relative;white-space:nowrap}.wv-header .left[data-v-f6f5c16a]{display:block;overflow:hidden;float:left;font-size:35px;line-height:35px;font-weight:100}.wv-header .wv-header-title[data-v-f6f5c16a]{font-size:23px;font-weight:0;text-align:center;flex:1}.wv-header.is-fixed[data-v-f6f5c16a]{position:fixed;left:0;top:0}.wv-popup-body[data-v-87a08ef6]{display:block;background-color:#fff;position:fixed;width:100%;left:0;bottom:0;z-index:5000;transform:translateY(100%);transition:transform .3s}.wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}.weui-icon_toast[data-v-bafb1f8a]{font-size:40px}.weui-toast_text[data-v-bafb1f8a]{width:auto;min-width:0;min-height:0;padding:.5em 0}.weui-toast_text .weui-toast__content[data-v-bafb1f8a]{margin:0}.wv-circle[data-v-12ab642a]{position:relative}.wv-circle .wv-circle-content[data-v-12ab642a]{width:100%;text-align:center;position:absolute;left:0;top:50%;transform:translateY(-50%)}.actionsheet__mask_show[data-v-4095c8bf]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);background-color:rgba(0,0,0,.6)}.weui-check__label-disabled[data-v-3d63ae3a]{background-color:rgba(0,0,0,.1)}.weui-check__label-disabled[data-v-323b9579]{background-color:rgba(0,0,0,.1)}.weui-search-bar__label[data-v-e876aa2a]{transform-origin:0 0 0;opacity:1;transform:scale(1)}.weui-search-bar__cancel-btn[data-v-e876aa2a]{display:block}.searchbar-result[data-v-e876aa2a]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);margin-top:0;font-size:14px}.wv-navbar__item[data-v-8b4cda66]{position:relative;display:block;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:transparent}.wv-navbar__item.wv-navbar__item_on[data-v-8b4cda66]{border-bottom:3px solid red}.wv-navbar[data-v-40f0a5eb]{display:flex;width:100%;z-index:5000;background-color:#fff}@font-face{font-family:iconfont;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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#iefix) format(\"embedded-opentype\"),url(data:application/font-woff;base64,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) format(\"woff\"),url(data:application/x-font-ttf;base64,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) format(\"truetype\"),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+DQpDcmVhdGVkIGJ5IEZvbnRGb3JnZSAyMDEyMDczMSBhdCBGcmkgSnVsIDIxIDAzOjA4OjQ5IDIwMTcNCiBCeSBhZG1pbg0KPC9tZXRhZGF0YT4NCjxkZWZzPg0KPGZvbnQgaWQ9Imljb25mb250IiBob3Jpei1hZHYteD0iMTAyNCIgPg0KICA8Zm9udC1mYWNlIA0KICAgIGZvbnQtZmFtaWx5PSJpY29uZm9udCINCiAgICBmb250LXdlaWdodD0iNTAwIg0KICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIg0KICAgIHVuaXRzLXBlci1lbT0iMTAyNCINCiAgICBwYW5vc2UtMT0iMiAwIDYgMyAwIDAgMCAwIDAgMCINCiAgICBhc2NlbnQ9Ijg5NiINCiAgICBkZXNjZW50PSItMTI4Ig0KICAgIHgtaGVpZ2h0PSI3OTIiDQogICAgYmJveD0iMCAtMTI4IDEwMjQgODk2Ig0KICAgIHVuZGVybGluZS10aGlja25lc3M9IjAiDQogICAgdW5kZXJsaW5lLXBvc2l0aW9uPSIwIg0KICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDA3OC1FODA2Ig0KICAvPg0KPG1pc3NpbmctZ2x5cGggDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgDQogLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm51bGwiIGhvcml6LWFkdi14PSIwIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiANCiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgDQpkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41DQp0LTI5LjUgMC41aC0zMmwtNDUgMTI4aC00MzlsLTQ0IC0xMjhoLTI5aC0zNHEtMjAgMCAtNDUgMXEtMjUgMCAtNDEgOS41dC0yNS41IDIzdC0xMy41IDI5LjV0LTQgMzB2MTY3aDkxMXpNMTYzIDI0N3EtMTIgMCAtMjEgLTguNXQtOSAtMjEuNXQ5IC0yMS41dDIxIC04LjVxMTMgMCAyMiA4LjV0OSAyMS41dC05IDIxLjV0LTIyIDguNXpNMzE2IDEyM3EtOCAtMjYgLTE0IC00OHEtNSAtMTkgLTEwLjUgLTM3dC03LjUgLTI1dC0zIC0xNXQxIC0xNC41DQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+DQogICAgPGdseXBoIGdseXBoLW5hbWU9InNwaW5uZXI5IiB1bmljb2RlPSImI3hlN2U5OyIgDQpkPSJNNTEyIDg5NnEtMTAzIDAgLTE5Ni41IC0zOS41dC0xNjIgLTEwNi41dC0xMDkuNSAtMTU5LjV0LTQ0IC0xOTQuNXEzIDExOSA1OSAyMTkuNXQxNTEgMTU4LjV0MjA2IDU4cTE3MiAwIDI5NCAtMTMxdDEyMiAtMzE3cTAgLTQwIDI4IC02OHQ2OCAtMjh0NjggMjh0MjggNjhxMCAxMzkgLTY4LjUgMjU3dC0xODYuNSAxODYuNXQtMjU3IDY4LjV6TTUxMiAtMTI4cTEwMyAwIDE5Ni41IDM5LjV0MTYyIDEwNi41dDEwOS41IDE1OS41dDQ0IDE5NC41DQpxLTMgLTExOSAtNTkgLTIxOS41dC0xNTEgLTE1OC41dC0yMDYgLTU4cS0xMTMgMCAtMjA5IDYwdC0xNTEuNSAxNjN0LTU1LjUgMjI1cTAgNDAgLTI4IDY4dC02OCAyOHQtNjggLTI4dC0yOCAtNjhxMCAtMTM5IDY4LjUgLTI1N3QxODYuNSAtMTg2LjV0MjU3IC02OC41eiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lci0xIiB1bmljb2RlPSImI3hlNzIyOyIgDQpkPSJNMTAyNCAzODRxLTIgODcgLTQ3LjUgMTkxLjV0LTEwOC41IDE2NC41cS0yOSAyOSAtNzcuNSA2MHQtODcuNSA0NnEtMzYgMTQgLTg5IDI0dC05MSAxMGgtMTFxLTg0IC0yIC0xODUuNSAtNDZ0LTE1OS41IC0xMDVxLTI4IC0yOSAtNTggLTc1LjV0LTQ0IC04NC41cS0xNCAtMzUgLTIzLjUgLTg2dC05LjUgLTg4di0xMXExIC0zOSAxMi41IC05Mi41dDI3LjUgLTg5LjV0NDcgLTgwLjV0NTkgLTcxLjV0NzMuNSAtNTUuNXQ4MS41IC00Mi41DQpxMzQgLTE0IDgzIC0yM3Q4NSAtOWgxMXE5MiAyIDE3NiAzOXEzNSAxNSA3Ny41IDQ1dDY4LjUgNThxMjYgMjcgNTQgNzAuNXQ0MiA3OC41cTE5IDUwIDI2IDEwNGg0cTI2IDAgNDUgMTguNXQxOSA0NS41djV2MHYwek05MjIgMjE0cS0zNSAtODAgLTk5IC0xNDFxLTYzIC02MSAtMTQ0IC05MnEtMzEgLTEyIC03NyAtMjAuNXQtODAgLTguNWgtMTBxLTczIDIgLTE2MSA0MC41dC0xMzkgOTEuNXEtMjQgMjUgLTUwIDY2dC0zOCA3Mw0KcS0xMiAzMCAtMjAgNzR0LTggNzdxMCAzNiAxMC41IDg1dDI0LjUgODNxMzMgNzQgOTMgMTMxcTU4IDU2IDEzMyA4NHEyOSAxMSA3MS41IDE5dDczLjUgOHEzNSAwIDgyLjUgLTEwdDc5LjUgLTI0cTcxIC0zMiAxMjUgLTg5cTU0IC01NiA4MiAtMTI4cTI3IC03MiAyNSAtMTQ5djB2LTVxMCAtMjQgMTYuNSAtNDIuNXQ0MC41IC0yMS41cS05IC01MiAtMzEgLTEwMXYweiIgLz4NCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3Bpbm5lcjEiIHVuaWNvZGU9IiYjeGU4MDY7IiANCmQ9Ik0zMDEgOTkuNXEwIC0zMC41IC0yMS41IC01MnQtNTIuNSAtMjEuNXEtMjkgMCAtNTEgMjJ0LTIyIDUxcTAgMzEgMjEuNSA1Mi41dDUyIDIxLjV0NTIgLTIxLjV0MjEuNSAtNTJ6TTU4NSAtMTguNXEwIC0zMC41IC0yMS41IC01MS41dC01MS41IC0yMXQtNTEuNSAyMXQtMjEuNSA1MS41dDIxLjUgNTJ0NTEuNSAyMS41dDUxLjUgLTIxLjV0MjEuNSAtNTJ6TTE4MyAzODRxMCAtMzAgLTIxLjUgLTUxLjV0LTUyIC0yMS41dC01MS41IDIxLjUNCnQtMjEgNTEuNXQyMSA1MS41dDUxLjUgMjEuNXQ1MiAtMjEuNXQyMS41IC01MS41ek04NzAgOTlxMCAtMjkgLTIyIC01MXQtNTEgLTIycS0zMSAwIC01Mi41IDIxLjV0LTIxLjUgNTJ0MjEuNSA1MnQ1MiAyMS41dDUyIC0yMS41dDIxLjUgLTUyLjV6TTMxOSA2NjguNXEwIC0zNy41IC0yNyAtNjQuNXQtNjQuNSAtMjd0LTY0LjUgMjd0LTI3IDY0LjV0MjcgNjQuNXQ2NC41IDI3dDY0LjUgLTI3dDI3IC02NC41ek05ODcgMzg0DQpxMCAtMzAgLTIxIC01MS41dC01MS41IC0yMS41dC01MiAyMS41dC0yMS41IDUxLjV0MjEuNSA1MS41dDUyIDIxLjV0NTEuNSAtMjEuNXQyMSAtNTEuNXpNNjIyIDc4Ni41cTAgLTQ1LjUgLTMyIC03Ny41dC03OCAtMzJ0LTc4IDMydC0zMiA3Ny41dDMyIDc3LjV0NzggMzJ0NzggLTMydDMyIC03Ny41ek05MjUgNjY5cTAgLTU0IC0zOCAtOTF0LTkwIC0zN3EtNTQgMCAtOTEgMzd0LTM3IDkxcTAgNTIgMzcgOTB0OTEgMzhxNTIgMCA5MCAtMzgNCnQzOCAtOTB6IiAvPg0KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzcGlubmVyMiIgdW5pY29kZT0iJiN4ZTYzZjsiIA0KZD0iTTUxMiA1OTN2MHEtMjUgMCAtNDIuNSAxNy41dC0xNy41IDQyLjV2MTc5cTAgMjQgMTcuNSA0MS41dDQyLjUgMTcuNXQ0Mi41IC0xNy41dDE3LjUgLTQxLjV2LTE3OXEwIC0yNSAtMTcuNSAtNDIuNXQtNDIuNSAtMTcuNXpNNTEyIC0xMDF2MHEtMTUgMCAtMjYgMTF0LTExIDI2djE3OXEwIDE2IDExIDI3dDI2IDExdDI2IC0xMXQxMSAtMjd2LTE3OXEwIC0xNSAtMTEgLTI2dC0yNiAtMTF6TTM3OCA1NjF2MHEtMTQgMCAtMjggOHQtMjEgMjANCmwtODkgMTU1cS03IDEyIC03IDI2cTAgMjMgMTYuNSAzOS41dDM5LjUgMTYuNXExMyAwIDI3IC03LjV0MjEgLTE4LjVsODkgLTE1NXE4IC0xMyA4IC0yOHEwIC0yNCAtMTYuNSAtNDB0LTM5LjUgLTE2ek03MzYgLTM3djBxLTIwIDAgLTI5IDE3bC05MCAxNTVxLTQgNyAtNCAxNnEwIDE0IDkuNSAyNHQyMy41IDEwcTIwIDAgMjkgLTE3bDkwIC0xNTVxNCAtOCA0IC0xN3EwIC0xNCAtOS41IC0yMy41dC0yMy41IC05LjV2MHpNMjc5IDQ2Ng0KcS0xNCAwIC0yNiA3bC0xNTUgOTBxLTExIDYgLTE4LjUgMTl0LTcuNSAyNnEwIDIxIDE1LjUgMzYuNXQzNi41IDE1LjVxMTQgMCAyNiAtN2wxNTYgLTkwcTEwIC02IDE4IC0xOXQ4IC0yNnEwIC0yMSAtMTUuNSAtMzYuNXQtMzcuNSAtMTUuNXYwek05MDAgMTMwdjBxLTggMCAtMTUgNGwtMTU1IDkwcS0xNSA4IC0xNSAyNnEwIDEyIDguNSAyMXQyMS41IDlxOCAwIDE1IC00bDE1NSAtOTBxMTUgLTkgMTUgLTI2cTAgLTEyIC05IC0yMXQtMjEgLTl2MHoNCk0yNDMgMzM2aC0xNzlxLTIwIDAgLTM0IDE0dC0xNCAzNHQxNCAzNHQzNCAxNGgxNzlxMjAgMCAzNC41IC0xNHQxNC41IC0zNHQtMTQuNSAtMzR0LTM0LjUgLTE0ek05NjAgMzU0aC0xNzlxLTEzIDAgLTIxLjUgOXQtOC41IDIxdDguNSAyMXQyMS41IDloMTc5cTEyIDAgMjEgLTl0OSAtMjF0LTkgLTIxdC0yMSAtOXpNMTI0IDExNXYwcS0xOCAwIC0zMSAxMy41dC0xMyAzMS41cTAgMTEgNi41IDIyLjV0MTUuNSAxNi41bDE1NSA4OXExMCA2IDIyIDYNCnExOSAwIDMyIC0xM3QxMyAtMzFxMCAtMTEgLTYuNSAtMjIuNXQtMTUuNSAtMTYuNWwtMTU1IC05MHEtMTEgLTYgLTIzIC02ek03NDUgNDg4cS0xMyAwIC0yMS41IDl0LTguNSAyMXEwIDE3IDE1IDI2bDE1NSA5MHE2IDMgMTQgM3ExMiAwIDIxIC04LjV0OSAtMjEuNXEwIC0xNiAtMTQgLTI1bC0xNTUgLTkwcS03IC00IC0xNSAtNHYwek0yODggLTQ1cS0xNyAwIC0yOSAxMnQtMTIgMjlxMCAxMSA2IDIxbDg5IDE1NXE1IDggMTUuNSAxMy41DQp0MTkuNSA1LjVxMTcgMCAyOSAtMTJ0MTIgLTI5cTAgLTEwIC01IC0xOWwtODkgLTE1NXEtNSAtOSAtMTUuNSAtMTV0LTIwLjUgLTZ2MHpNNjQ2IDU4N3EtMTIgMCAtMjEgOC41dC05IDIxLjVxMCA4IDQgMTVsOTAgMTU1cTkgMTUgMjYgMTVxMTIgMCAyMSAtOXQ5IC0yMXEwIC04IC00IC0xNWwtOTAgLTE1NXEtOCAtMTUgLTI2IC0xNXYweiIgLz4NCiAgPC9mb250Pg0KPC9kZWZzPjwvc3ZnPg0K#iconfont) format(\"svg\")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-spinner9:before{content:\"\\E7E9\"}.icon-spinner-1:before{content:\"\\E722\"}.icon-spinner1:before{content:\"\\E806\"}.icon-spinner2:before{content:\"\\E63F\"}.wv-spinner[data-v-067ccc1f]{display:block;overflow:hidden;-webkit-animation:circle 1.2s infinite linear;-o-animation:circle 1.2s infinite linear;animation:circle 1.2s infinite linear}@-webkit-keyframes circle{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", ""]);

// exports


/***/ }),
/* 100 */
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(42)(content, options);
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: #ececec; }\n\n.weui-tabbar {\n  font-weight: bold; }\n\n.weui-cell__bd p {\n  color: #777;\n  font-weight: 200; }\n", ""]);

// exports


/***/ }),
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = [{
  path: '/',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(10).then((function () {
      return resolve(__webpack_require__(130));
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
    __webpack_require__.e/* require.ensure */(16).then((function () {
      return resolve(__webpack_require__(131));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'cart',
  meta: {
    auth: true
  }
}, {
  path: '/category',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(15).then((function () {
      return resolve(__webpack_require__(132));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'category'
}, {
  path: '/order-list',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(9).then((function () {
      return resolve(__webpack_require__(133));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order-list',
  meta: {
    auth: true
  }
}, {
  path: '/order/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(8).then((function () {
      return resolve(__webpack_require__(134));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'order',
  meta: {
    auth: true
  }
}, {
  path: '/favourite',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(13).then((function () {
      return resolve(__webpack_require__(135));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'favourite',
  meta: {
    auth: true
  }
}, {
  path: '/checkout',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(14).then((function () {
      return resolve(__webpack_require__(136));
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
    __webpack_require__.e/* require.ensure */(3).then((function () {
      return resolve(__webpack_require__(137));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'user',
  meta: {
    auth: true
  }
}, {
  path: '/profile',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(5).then((function () {
      return resolve(__webpack_require__(138));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'profile',
  meta: {
    auth: true
  }
}, {
  path: '/avatar',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(2).then((function () {
      return resolve(__webpack_require__(139));
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
      return resolve(__webpack_require__(140));
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
      return resolve(__webpack_require__(55));
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
      return resolve(__webpack_require__(55));
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
      return resolve(__webpack_require__(141));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(11).then((function () {
      return resolve(__webpack_require__(142));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(12).then((function () {
      return resolve(__webpack_require__(143));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/login',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(1).then((function () {
      return resolve(__webpack_require__(144));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/register',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(4).then((function () {
      return resolve(__webpack_require__(145));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'register',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/product/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(6).then((function () {
      return resolve(__webpack_require__(146));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'product',
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/password',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(7).then((function () {
      return resolve(__webpack_require__(147));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  name: 'password',
  meta: {
    auth: true
  }
}];

exports.default = routes;

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

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(125)
}
var Component = __webpack_require__(51)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(128),
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(126);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(50)("6e573bf7", content, false);
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(true);
// imports


// module
exports.push([module.i, "\n#tabbar .weui_tabbar[data-v-62002d45] {\n  position: fixed;\n  bottom: 0;\n}\n#tabbar .weui_tabbar .weui_tabbar_item .icon[data-v-62002d45] {\n    font-size: 20px;\n    color: #666;\n}\n#tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon[data-v-62002d45] {\n    color: #09bb07;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/mainmenu.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,UAAU;CAAE;AACZ;IACE,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,eAAe;CAAE","file":"mainmenu.vue","sourcesContent":["#tabbar .weui_tabbar {\n  position: fixed;\n  bottom: 0; }\n  #tabbar .weui_tabbar .weui_tabbar_item .icon {\n    font-size: 20px;\n    color: #666; }\n  #tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon {\n    color: #09bb07; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(28);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(14);

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
/* 128 */
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
],[58]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zdHlsZS5jc3M/OTkzNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzP2RjODYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2NzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avcm91dGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZT8yZjA1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZT9lZGU3Iiwid2VicGFjazovLy9tYWlubWVudS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlPzZkNjIiXSwibmFtZXMiOlsiQ29uZmlnIiwiYXBpUm9vdCIsInRpbWVvdXQiLCJzbXNSZXNlbmRDb3VudGRvd24iLCJqd3RUb2tlbk5hbWUiLCJ1c2UiLCJzdGF0ZSIsImlzTG9hZGluZyIsImRpcmVjdGlvbiIsImlzTWFpbk1lbnVWaXNpYmxlIiwiaXNMb2dpbiIsIlN0b3JlIiwibXV0YXRpb25zIiwiVVBEQVRFX0xPQURJTkciLCJ2YWx1ZSIsIlVQREFURV9ESVJFQ1RJT04iLCJVUERBVEVfTUFJTk1FTlVfVklTSUJMRSIsIlVQREFURV9JU19MT0dJTiIsInJvdXRlciIsIm1vZGUiLCJiYXNlIiwicm91dGVzIiwiYmVmb3JlRWFjaCIsInRvIiwiZnJvbSIsIm5leHQiLCJjb21taXQiLCJtZXRhIiwiaGlkZU1haW5tZW51IiwibWF0Y2hlZCIsInNvbWUiLCJyZWNvcmQiLCJhdXRoIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhdGgiLCJxdWVyeSIsInJlZGlyZWN0IiwiZnVsbFBhdGgiLCJhZnRlckVhY2giLCJkb2N1bWVudCIsInRpdGxlIiwiZGVmYXVsdHMiLCJiYXNlVVJMIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsImNvbmZpZyIsImhpZGVMb2FkaW5nIiwiYXBwIiwic2hvd0xvYWRpbmciLCJ0b2tlbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZXJyb3IiLCJyZWplY3QiLCJyZXNwb25zZSIsIm5ld1Rva2VuIiwiYXV0aG9yaXphdGlvbiIsInNldEl0ZW0iLCJyZXBsYWNlIiwic3RhdHVzIiwicmVtb3ZlSXRlbSIsInB1c2giLCJjb2RlIiwiZWwiLCJzdG9yZSIsImNvbXBvbmVudHMiLCJyZXF1aXJlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJkdXJhdGlvbiIsIlRvYXN0IiwiaWNvbiIsImluZm8iLCJ0eXBlIiwiY29uZmlybSIsImNhbGxiYWNrIiwiRGlhbG9nIiwic2tpbiIsImlzaU9zIiwibXNnIiwiSW5kaWNhdG9yIiwib3BlbiIsImNsb3NlIiwiY29tcG9uZW50IiwicmVzb2x2ZSIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxnQzs7Ozs7O0FDSHZDLDZCQUE2QjtBQUM3QixxQ0FBcUMsZ0M7Ozs7OztBQ0RyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsRTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEsZ0JBQWdCLFVBQVUsR0FBRztBQUN0RSxDQUFDLEU7Ozs7OztBQ0hELG9COzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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RUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xyXG5cclxuY29uc3QgQ29uZmlnID0ge1xyXG4gIGFwaVJvb3Q6ICcvYXBpL3Nob3AnLFxyXG4gIHRpbWVvdXQ6IDEwMDAwLFxyXG4gIHNtc1Jlc2VuZENvdW50ZG93bjogNjAsXHJcbiAgand0VG9rZW5OYW1lOiAnd2lsbHNob3Bfand0X3Rva2VuJyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb25maWcuanMiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xyXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4J1xyXG5cclxuVnVlLnVzZShWdWV4KVxyXG5cclxuY29uc3Qgc3RhdGUgPSB7XHJcbiAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICBkaXJlY3Rpb246ICdmb3J3YXJkJyxcclxuICBpc01haW5NZW51VmlzaWJsZTogdHJ1ZSxcclxuICBpc0xvZ2luOiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVleC5TdG9yZSh7XHJcbiAgc3RhdGUsXHJcbiAgbXV0YXRpb25zOiB7XHJcbiAgICBVUERBVEVfTE9BRElORyAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTG9hZGluZyA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgVVBEQVRFX0RJUkVDVElPTiAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmRpcmVjdGlvbiA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgVVBEQVRFX01BSU5NRU5VX1ZJU0lCTEUgKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5pc01haW5NZW51VmlzaWJsZSA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgVVBEQVRFX0lTX0xPR0lOIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuaXNMb2dpbiA9IHZhbHVlXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avc3RvcmUvaW5kZXguanMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd2dWUtcm91dGVyJ1xyXG5pbXBvcnQgV2VWdWUgZnJvbSAnd2UtdnVlJ1xyXG5pbXBvcnQgJ3dlLXZ1ZS9saWIvc3R5bGUuY3NzJ1xyXG5pbXBvcnQgJy4uLy4uL3Nhc3Mvc2hvcC5zY3NzJ1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmltcG9ydCBWdWVBeGlvcyBmcm9tICd2dWUtYXhpb3MnXHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlL2luZGV4J1xyXG5pbXBvcnQgYXBwQ29uZmlnIGZyb20gJy4vY29uZmlnJyAvLyDphY3nva5cclxuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcy5qcydcclxuaW1wb3J0IHsgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cclxuVnVlLnVzZShWdWVSb3V0ZXIpXHJcblZ1ZS51c2UoV2VWdWUpXHJcblZ1ZS51c2UoVnVlQXhpb3MsIGF4aW9zKVxyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XHJcbiAgbW9kZTogJ2hpc3RvcnknLFxyXG4gIGJhc2U6ICcvc2hvcC8nLFxyXG4gIHJvdXRlc1xyXG59KVxyXG5cclxucm91dGVyLmJlZm9yZUVhY2goKHRvLCBmcm9tLCBuZXh0KSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIHRydWUpXHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTUFJTk1FTlVfVklTSUJMRScsICF0by5tZXRhLmhpZGVNYWlubWVudSlcclxuXHJcbiAgaWYgKHRvLm1hdGNoZWQuc29tZShyZWNvcmQgPT4gcmVjb3JkLm1ldGEuYXV0aCkgJiYgIXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKSkge1xyXG4gICAgLy8g6ZyA6KaB55m75b2V5ZCO6K6/6Zeu55qE6aG16Z2i77yMcmVkaXJlY3Qg5Y+C5pWw55So5LqO55m75b2V5a6M5oiQ5ZCO6Lez6L2sXHJcbiAgICBuZXh0KHtcclxuICAgICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICAgIHF1ZXJ5OiB7cmVkaXJlY3Q6IHRvLmZ1bGxQYXRofVxyXG4gICAgfSlcclxuICB9XHJcbiAgbmV4dCgpXHJcbn0pXHJcblxyXG5yb3V0ZXIuYWZ0ZXJFYWNoKCh0bywgZnJvbSkgPT4ge1xyXG4gIC8vIOWKqOaAgeiuvue9rumhtemdouagh+mimFxyXG4gIGRvY3VtZW50LnRpdGxlID0gdG8ubWV0YS50aXRsZSB8fCAnd2lsbHNob3AnXHJcblxyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSlcclxufSlcclxuXHJcbmF4aW9zLmRlZmF1bHRzLmJhc2VVUkwgPSBhcHBDb25maWcuYXBpUm9vdFxyXG5heGlvcy5kZWZhdWx0cy50aW1lb3V0ID0gYXBwQ29uZmlnLnRpbWVvdXRcclxuXHJcbi8vIGF4aW9zIOivt+axguWPkemAgeWJjeWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCB0cnVlKVxyXG5cclxuICBpZiAoY29uZmlnLmhpZGVMb2FkaW5nICE9PSB0cnVlKSB7XHJcbiAgICAvLyDmmL7npLogbG9hZGluZyDmj5DnpLpcclxuICAgIGFwcC5zaG93TG9hZGluZygpXHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKVxyXG4gIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnYmVhcmVyICcgKyB0b2tlblxyXG5cclxuICByZXR1cm4gY29uZmlnXHJcbn0sIChlcnJvcikgPT4ge1xyXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxufSlcclxuXHJcbi8vIGF4aW9zIOW+l+WIsOWTjeW6lOWQjuWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXNwb25zZSkgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSlcclxuICBhcHAuaGlkZUxvYWRpbmcoKVxyXG5cclxuICBjb25zdCBuZXdUb2tlbiA9IHJlc3BvbnNlLmhlYWRlcnMuYXV0aG9yaXphdGlvblxyXG4gIGlmIChuZXdUb2tlbikge1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUsIG5ld1Rva2VuLnJlcGxhY2UoJ2JlYXJlciAnLCAnJykpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzcG9uc2VcclxufSwgKGVycm9yKSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKVxyXG4gIGFwcC5oaWRlTG9hZGluZygpXHJcblxyXG4gIGlmIChlcnJvci5yZXNwb25zZSkge1xyXG4gICAgY29uc3QgbmV3VG9rZW4gPSBlcnJvci5yZXNwb25zZS5oZWFkZXJzLmF1dGhvcml6YXRpb25cclxuICAgIGlmIChuZXdUb2tlbikge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSwgbmV3VG9rZW4ucmVwbGFjZSgnYmVhcmVyICcsICcnKSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpXHJcblxyXG4gICAgICByb3V0ZXIucHVzaCgnL2xvZ2luJylcclxuICAgIH0gZWxzZSBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgLy8g5peg5p2D6ZmQ5pe257uf5LiA5o+Q56S6XHJcbiAgICAgIGFwcC5lcnJvcign5peg5pON5L2c5p2D6ZmQJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOi2heaXtuWQjui/m+ihjOaPkOekulxyXG4gIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5BQk9SVEVEJykge1xyXG4gICAgYXBwLmVycm9yKCfnvZHnu5znuYHlv5nvvIzor7fph43or5UnKVxyXG4gIH1cclxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXHJcbn0pXHJcblxyXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcclxuICBlbDogJyNhcHAnLFxyXG4gIHJvdXRlcixcclxuICBzdG9yZSxcclxuXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21haW5tZW51JzogcmVxdWlyZSgnLi9jb21wb25lbnRzL21haW5tZW51LnZ1ZScpXHJcbiAgfSxcclxuXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgaXNMb2FkaW5nOiBzdGF0ZSA9PiBzdGF0ZS5pc0xvYWRpbmcsXHJcbiAgICAgIGlzTWFpbk1lbnVWaXNpYmxlOiBzdGF0ZSA9PiBzdGF0ZS5pc01haW5NZW51VmlzaWJsZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICAvKipcclxuICAgICAqIOaTjeS9nOaIkOWKn+aPkOekulxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzdWNjZXNzIChtZXNzYWdlLCBkdXJhdGlvbiA9IDEwMDApIHtcclxuICAgICAgV2VWdWUuVG9hc3Qoe1xyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgZHVyYXRpb25cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmk43kvZzlpLHotKXmj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgZXJyb3IgKG1lc3NhZ2UsIGR1cmF0aW9uKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICBpY29uOiAnd2FybidcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIDoiKzmj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgaW5mbyAobWVzc2FnZSwgZHVyYXRpb24gPSAyMDAwKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBkdXJhdGlvblxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOehruiupOWvueivneahhlxyXG4gICAgICogQHBhcmFtIHRpdGxlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIGNvbmZpcm0gKHRpdGxlLCBtZXNzYWdlLCBjYWxsYmFjaykge1xyXG4gICAgICBXZVZ1ZS5EaWFsb2coe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgc2tpbjogdGhpcy5pc2lPcyA/ICdpb3MnIDogJ2FuZHJvaWQnXHJcbiAgICAgIH0sIGNhbGxiYWNrKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuiBsb2FkaW5nIOaPkOekulxyXG4gICAgICogQHBhcmFtIG1zZ1xyXG4gICAgICovXHJcbiAgICBzaG93TG9hZGluZyAobXNnID0gJ0xvYWRpbmcnKSB7XHJcbiAgICAgIFdlVnVlLkluZGljYXRvci5vcGVuKG1zZylcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol48gbG9hZGluZyDmj5DnpLpcclxuICAgICAqL1xyXG4gICAgaGlkZUxvYWRpbmcgKCkge1xyXG4gICAgICBXZVZ1ZS5JbmRpY2F0b3IuY2xvc2UoKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2xhc3NvZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZihpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSlwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlKGhlYWQpe1xuICAgICAgZm4gICA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIGlmKGhlYWQpbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYoaXNOb2RlKXtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG4gIH0gZWxzZSBpZihPYnNlcnZlcil7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWVcbiAgICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZihQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSl7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oZm4pe1xuICAgIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcbiAgICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYoIWhlYWQpe1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXtcbiAgICBpZihzYWZlICYmIHRhcmdldFtrZXldKXRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIVxcclxcbiAqIFdlVUkgdjEuMS4yIChodHRwczovL2dpdGh1Yi5jb20vd2V1aS93ZXVpKVxcclxcbiAqIENvcHlyaWdodCAyMDE3IFRlbmNlbnQsIEluYy5cXHJcXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcXHJcXG4gKi9odG1sey1tcy10ZXh0LXNpemUtYWRqdXN0OjEwMCU7LXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OjEwMCV9Ym9keXtsaW5lLWhlaWdodDoxLjY7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbS1mb250LEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWZ9KnttYXJnaW46MDtwYWRkaW5nOjB9YSBpbWd7Ym9yZGVyOjB9YXt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1AZm9udC1mYWNle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LWZhbWlseTp3ZXVpO3NyYzp1cmwoXFxcImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUVBQUFBTEFJQUFBd0F3UjFOVlFyRCtzKzBBQUFFNEFBQUFRazlUTHpKQUtFeCtBQUFCZkFBQUFGWmpiV0Z3NjVjRkhRQUFBaHdBQUFKUVoyeDVadkNSUi9FQUFBU1VBQUFLdEdobFlXUU1QUk90QUFBQTRBQUFBRFpvYUdWaENDd0QrZ0FBQUx3QUFBQWthRzEwZUVKby8vOEFBQUhVQUFBQVNHeHZZMkVZcWhXNEFBQUViQUFBQUNadFlYaHdBU0VBVlFBQUFSZ0FBQUFnYm1GdFplTmNIdGdBQUE5SUFBQUI1bkJ2YzNUNmJMaExBQUFSTUFBQUFPWUFBUUFBQStnQUFBQmFBK2ovLy8vL0Era0FBUUFBQUFBQUFBQUFBQUFBQUFBQUFCSUFBUUFBQUFFQUFDYlpieHRmRHp6MUFBc0Q2QUFBQUFEVW0yZHZBQUFBQU5TYloyLy8vd0FBQStrRDZnQUFBQWdBQWdBQUFBQUFBQUFCQUFBQUVnQkpBQVVBQUFBQUFBSUFBQUFLQUFvQUFBRC9BQUFBQUFBQUFBRUFBQUFLQUI0QUxBQUJSRVpNVkFBSUFBUUFBQUFBQUFBQUFRQUFBQUZzYVdkaEFBZ0FBQUFCQUFBQUFRQUVBQVFBQUFBQkFBZ0FBUUFHQUFBQUFRQUFBQUFBQVFPd0FaQUFCUUFJQW5vQ3ZBQUFBSXdDZWdLOEFBQUI0QUF4QVFJQUFBSUFCUU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVVHWkZaQUJBNmdIcUVRUG9BQUFBV2dQcUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErai8vd1BvQUFBRDZBQUFBQUFBQlFBQUFBTUFBQUFzQUFBQUJBQUFBWFFBQVFBQUFBQUFiZ0FEQUFFQUFBQXNBQU1BQ2dBQUFYUUFCQUJDQUFBQUJBQUVBQUVBQU9vUi8vOEFBT29CLy84QUFBQUJBQVFBQUFBQkFBSUFBd0FFQUFVQUJnQUhBQWdBQ1FBS0FBc0FEQUFOQUE0QUR3QVFBQkVBQUFFR0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBQUFBTndBQUFBQUFBQUFFUUFBNmdFQUFPb0JBQUFBQVFBQTZnSUFBT29DQUFBQUFnQUE2Z01BQU9vREFBQUFBd0FBNmdRQUFPb0VBQUFBQkFBQTZnVUFBT29GQUFBQUJRQUE2Z1lBQU9vR0FBQUFCZ0FBNmdjQUFPb0hBQUFBQndBQTZnZ0FBT29JQUFBQUNBQUE2Z2tBQU9vSkFBQUFDUUFBNmdvQUFPb0tBQUFBQ2dBQTZnc0FBT29MQUFBQUN3QUE2Z3dBQU9vTUFBQUFEQUFBNmcwQUFPb05BQUFBRFFBQTZnNEFBT29PQUFBQURnQUE2ZzhBQU9vUEFBQUFEd0FBNmhBQUFPb1FBQUFBRUFBQTZoRUFBT29SQUFBQUVRQUFBQUFBUmdDTUFOSUJKQUY0QWNRQ01nSmdBcWdDL0FOSUE2WUQvZ1JPQktBRTlBVmFBQUFBQWdBQUFBQURyd090QUJRQUtRQUFBU0lIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0FmVjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVBNjA4TzJSbjhHZGpPenc4TzJObjhHZGtPeno4cnpjMVcxN2JYbHcxTnpjMVhGN2JYbHMxTndBQUFBQUNBQUFBQUFPekE3TUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQndZaUx3RW1OanNCRVRRMk93RXlGaFVSTXpJV0FlNTJaMlE3UFQwN1pHZDJmR3BtT3o0K08yWnBJWFlPS0E1MkRnMFhYUXNISmdjTFhSY05BN00rTzJacWZIWm5aRHM5UFR0a1ozWjlhV1k3UHYzd21oSVNtaElhQVJjSUN3c0kvdWthQUFNQUFBQUFBK1VENVFBWEFDTUFMQUFBQVNJSEJnY0dGUlFYRmhjV016STNOamMyTlRRbkppY21BeFFyQVNJMUF6UTdBVElISnlJbU5EWXlGaFFHQWU2RWNtOUJSRVJCYjNLRWlYWnhRa1JFUW5GMWFRSXhBd2dDUWdNQkl4SVpHU1FaR1FQa1JFSnhkb21FY205QlJFUkJiM0tFaW5WeFFrVDlIUUlDQVdJQ0FqRVpJeGtaSXhrQUFBQUFBZ0FBQUFBRHNRUGtBQmtBTGdBQUFRWUhCZ2MyQlJFVUZ4WVhGaGMyTnpZM05qVVJKQmNtSnlZVEFRWXZBU1kvQVRZeUh3RVdOamNsTmpJZkFSWUI5VlZWUWsrdi90RkhQbXhlYkd4ZGJUMUkvdEd2VDBKVm8vN1ZCQVNLQXdNU0FRVUJjUUVGQWdFU0FnVUJFUVFENHhNWUVoazNZUDZzam5WbFNEOGNIRDlJWlhXT0FWUmdOeGtTR1A2Mi90a0RBNDhFQkJrQ0FWWUNBUUhsQVFJUUJBQUFBQUFEQUFBQUFBT3hBK1FBR3dBcUFETUFBQUVHQndZSEJnY0dOeEVVRnhZWEZoYzJOelkzTmpVUkpCY21KeVlITXpJV0ZRTVVCaXNCSWljRE5EWVRJaVkwTmpJV0ZBWUI5VUZCT0Rzc08zOGdSejVzWG14c1hXMDlTUDdZcUZCQlZXODBCQVlNQXdJbUJRRUxCaDRQRmhZZUZSVUQ1QThTRGhJT0Vpa0svcTJQZFdSSlBoMGRQa2xrZFk4QlUxNDFHUklZL0FZRS9zWUNBd1VCT2dRRy9rQVZIeFVWSHhVQUFBQUNBQUFBQUFQa0ErUUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQVFZaUx3RW1Qd0UyTWg4QkZqSTNBVFl5SHdFV0FlNkVjbTlCUTBOQ2JuT0RpWFZ4UWtSRVFuRjFrZjZnQVFVQm93TURGZ0VGQVlVQ0JRRUJRd0lGQVJVRUErTkVRbkYxaVlOemJrSkRRMEZ2Y29TSmRYRkNSUDZqL3FVQkFhZ0VCUjRDQVdZQkFRRU5BZ0lWQkFBQUFBUUFBQUFBQTY4RHJRQVVBQ2tBUHdCREFBQUJJZ2NHQndZVUZ4WVhGakkzTmpjMk5DY21KeVlESWljbUp5WTBOelkzTmpJWEZoY1dGQWNHQndZVEJRNEJMd0VtQmc4QkJoWWZBUll5TndFK0FTWWlGekFmQVFIMWVHZGtPenc4TzJSbjhHWmtPenc4TzJSbWVHNWVXelkzTnpaYlh0dGVXelkzTnpaYlhtbis5Z1lTQm1BR0R3VURCUUVHZlFVUUJnRWxCUUVMRUJVQkFRT3RQRHRrWi9Cbll6czhQRHRqWi9CblpEczgvSzgzTlZ0ZTIxNWNOVGMzTlZ4ZTIxNWJOVGNDSnQwRkFRVkpCUUlHQkFjUkJvQUdCUUVoQlE4TEJBRUJBQUFCQUFBQUFBTzdBem9BRndBQUV5NEJQd0UrQVI4QkZqWTNBVFlXRnljV0ZBY0JCaUluUFFvR0J3VUhHZ3pMRENFTEFoMExId3NOQ2dyOXVRb2VDZ0d6Q3lFT0N3MEhDWk1KQVFvQnZna0NDZzBMSFF2OXNRc0tBQUFBQUFJQUFBQUFBK1VENWdBWEFDd0FBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTUhCaThCSmljbU5STTBOanNCTWhZVkV4Y2VBUUh2aEhKdlFVTkRRbTV6ZzRsMWNVSkVSRUp4ZFZjUUF3VDZBd0lFRUFNQ0t3SUREc1VDQVFQbFJFSnhkWW1EYzI1Q1EwTkJiM0tFaVhWeFFrVDlWaHdFQW5jQ0FnTUdBWG9DQXdNQy9xMkZBZ1FBQUFRQUFBQUFBNjhEclFBREFCZ0FMUUF6QUFBQk1COEJBeUlIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0F5TVZNelVqQXVVQkFmSjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVteVQ5MlFLREFRRUJMRHc3Wkdmd1oyTTdQRHc3WTJmd1oyUTdQUHl2TnpWYlh0dGVYRFUzTnpWY1h0dGVXelUzQWpIOUpBQUFBQU1BQUFBQUErUUQ1QUFYQUNjQU1BQUFBU0lIQmdjR0ZSUVhGaGNXTXpJM05qYzJOVFFuSmljbUF6TXlGaFVERkFZckFTSW1OUU0wTmhNaUpqUTJNaFlVQmdIdWhISnZRVU5EUW01emc0bDFjVUpFUkVKeGRaNDJCQVlNQXdJbkF3TU1CaDhQRmhZZUZoWUQ0MFJDY1hXSmczTnVRa05EUVc5eWhJbDFjVUpFL3ZZR0JmN0FBZ01EQWdGQUJRYitOaFlmRmhZZkZnQUFCQUFBQUFBRHdBUEFBQWdBRWdBb0FEMEFBQUV5TmpRbUlnWVVGaGNqRlRNUkl4VXpOU01ESWdjR0J3WVZGQllYRmpNeU56WTNOalUwSnk0QkF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBZlFZSVNFd0lTRlJqems1eVRvcmhHNXJQVDk5YW0rRGRtaGxQRDQrUE15RmJWNWJOVGMzTlZ0ZTJsNWJOVGMzTlZ0ZUFxQWlMeUlpTHlJNUhmN0VIQndDc1Q4OWEyNkVkOHc4UGo0OFpXaDJnMjlxZmZ5ak56VmJYdHBlV3pVM056VmJYdHBlV3pVM0FBQURBQUFBQUFPb0E2Z0FDd0FnQURVQUFBRUhKd2NYQnhjM0Z6Y25Od01pQndZSEJoUVhGaGNXTWpjMk56WTBKeVluSmdNaUp5WW5KalEzTmpjMk1oY1dGeFlVQndZSEJnS09tcG9jbXBvY21wb2NtcHEyZG1aaU9qczdPbUptN0daaU9qczdPbUptZG10ZFdUUTJOalJaWGRaZFdUUTJOalJaWFFLcW1wb2NtcG9jbXBvY21wb0JHVHM2WW1ic1ptSTZPenM2WW1ic1ptSTZPL3pDTmpSWlhkWmRXVFEyTmpSWlhkWmRXVFEyQUFNQUFBQUFBK2tENmdBYUFDOEFNQUFBQVFZSEJpTWlKeVluSmpRM05qYzJNaGNXRnhZVkZBY0dCd0VIQVRJM05qYzJOQ2NtSnlZaUJ3WUhCaFFYRmhjV013S09OVUJDUjIxZFdqVTNOelZhWGRwZFd6VTJHQmNyQVNNNS9lQlhTMGdyS3lzclNFdXVTa2txTEN3cVNVcFhBU01yRnhnMk5WdGQybDFhTlRjM05WcGRiVWRDUURYKzNqa0JHU3NyU0V1dVNra3FMQ3dxU1VxdVMwZ3JLd0FDLy84QUFBUG9BK2dBRkFBd0FBQUJJZ2NHQndZUUZ4WVhGaUEzTmpjMkVDY21KeVlURmc0QklpOEJCd1l1QVRRL0FTY21QZ0VXSHdFM05oNEJCZzhCQWZTSWRIRkRSRVJEY1hRQkVIUnhRMFJFUTNGMFNRb0JGQnNLb3FnS0d4TUtxS0lLQVJRYkNxS29DaHNVQVFxb0EraEVRM0YwL3ZCMGNVTkVSRU54ZEFFUWRIRkRSUDFqQ2hzVENxaWlDZ0VVR3dxaXFBb2JGQUVLcUtJS0FSUWJDcUlBQUFJQUFBQUFBK1FENUFBWEFEUUFBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTVVCaU1GRnhZVUR3RUdMd0V1QVQ4Qk5oOEJGaFFQQVFVeUZoMEJBZTZFY205QlEwTkNibk9EaVhWeFFrUkVRbkYxZndRQy9wR0RBUUVWQXdUc0FnRUM3QVFFRkFJQmhBRndBZ01ENDBSQ2NYV0pnM051UWtORFFXOXloSWwxY1VKRS9mWUNBd3VWQWdRQ0ZBUUUwQUlGQXRFRUJCUUNCUUdWQ3dNREp3QUFBQVVBQUFBQUE5UUQwd0FqQUNjQU53QkhBRWdBQUFFUkZBWWpJU0ltTlJFaklpWTlBVFEyTXlFMU5EWXpJVElXSFFFaE1oWWRBUlFHSXlFUklSRUhJZ1lWRVJRV093RXlOalVSTkNZaklTSUdGUkVVRmpzQk1qWTFFVFFtS3dFRGV5WWIvWFliSmtNSkRRMEpBUVlaRWdFdkV4a0JCZ2tORFFuOUNRSmMwUWtORFFrdENRME5DZjdzQ1EwTkNTMEpEUTBKTFFNaS9UUWJKaVliQXN3TUNpd0pEUzRTR1JrU0xnMEpMQW9NL1V3Q3RHc05DZjVOQ1EwTkNRR3pDUTBOQ2Y1TkNRME5DUUd6Q1EwQUFBQUFFQURHQUFFQUFBQUFBQUVBQkFBQUFBRUFBQUFBQUFJQUJ3QUVBQUVBQUFBQUFBTUFCQUFMQUFFQUFBQUFBQVFBQkFBUEFBRUFBQUFBQUFVQUN3QVRBQUVBQUFBQUFBWUFCQUFlQUFFQUFBQUFBQW9BS3dBaUFBRUFBQUFBQUFzQUV3Qk5BQU1BQVFRSkFBRUFDQUJnQUFNQUFRUUpBQUlBRGdCb0FBTUFBUVFKQUFNQUNBQjJBQU1BQVFRSkFBUUFDQUIrQUFNQUFRUUpBQVVBRmdDR0FBTUFBUVFKQUFZQUNBQ2NBQU1BQVFRSkFBb0FWZ0NrQUFNQUFRUUpBQXNBSmdENmQyVjFhVkpsWjNWc1lYSjNaWFZwZDJWMWFWWmxjbk5wYjI0Z01TNHdkMlYxYVVkbGJtVnlZWFJsWkNCaWVTQnpkbWN5ZEhSbUlHWnliMjBnUm05dWRHVnNiRzhnY0hKdmFtVmpkQzVvZEhSd09pOHZabTl1ZEdWc2JHOHVZMjl0QUhjQVpRQjFBR2tBVWdCbEFHY0FkUUJzQUdFQWNnQjNBR1VBZFFCcEFIY0FaUUIxQUdrQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBSGNBWlFCMUFHa0FSd0JsQUc0QVpRQnlBR0VBZEFCbEFHUUFJQUJpQUhrQUlBQnpBSFlBWndBeUFIUUFkQUJtQUNBQVpnQnlBRzhBYlFBZ0FFWUFid0J1QUhRQVpRQnNBR3dBYndBZ0FIQUFjZ0J2QUdvQVpRQmpBSFFBTGdCb0FIUUFkQUJ3QURvQUx3QXZBR1lBYndCdUFIUUFaUUJzQUd3QWJ3QXVBR01BYndCdEFBQUFBZ0FBQUFBQUFBQUtBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBU0FRSUJBd0VFQVFVQkJnRUhBUWdCQ1FFS0FRc0JEQUVOQVE0QkR3RVFBUkVCRWdFVEFBWmphWEpqYkdVSVpHOTNibXh2WVdRRWFXNW1id3h6WVdabFgzTjFZMk5sYzNNSmMyRm1aVjkzWVhKdUIzTjFZMk5sYzNNT2MzVmpZMlZ6Y3kxamFYSmpiR1VSYzNWalkyVnpjeTF1YnkxamFYSmpiR1VIZDJGcGRHbHVadzUzWVdsMGFXNW5MV05wY21Oc1pRUjNZWEp1QzJsdVptOHRZMmx5WTJ4bEJtTmhibU5sYkFaelpXRnlZMmdGWTJ4bFlYSUVZbUZqYXdaa1pXeGxkR1VBQUFBQVxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKX1bY2xhc3MqPVxcXCIgd2V1aS1pY29uLVxcXCJdLFtjbGFzc149d2V1aS1pY29uLV17ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO2ZvbnQ6bm9ybWFsIG5vcm1hbCBub3JtYWwgMTRweC8xIHdldWk7Zm9udC1zaXplOmluaGVyaXQ7dGV4dC1yZW5kZXJpbmc6YXV0bzstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkfVtjbGFzcyo9XFxcIiB3ZXVpLWljb24tXFxcIl06YmVmb3JlLFtjbGFzc149d2V1aS1pY29uLV06YmVmb3Jle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0Oi4yZW07bWFyZ2luLXJpZ2h0Oi4yZW19LndldWktaWNvbi1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAxXFxcIn0ud2V1aS1pY29uLWRvd25sb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwMlxcXCJ9LndldWktaWNvbi1pbmZvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwM1xcXCJ9LndldWktaWNvbi1zYWZlLXN1Y2Nlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA0XFxcIn0ud2V1aS1pY29uLXNhZmUtd2FybjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDVcXFwifS53ZXVpLWljb24tc3VjY2VzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDZcXFwifS53ZXVpLWljb24tc3VjY2Vzcy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA3XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwOFxcXCJ9LndldWktaWNvbi13YWl0aW5nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwOVxcXCJ9LndldWktaWNvbi13YWl0aW5nLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEFcXFwifS53ZXVpLWljb24td2FybjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEJcXFwifS53ZXVpLWljb24taW5mby1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBDXFxcIn0ud2V1aS1pY29uLWNhbmNlbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMERcXFwifS53ZXVpLWljb24tc2VhcmNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwRVxcXCJ9LndldWktaWNvbi1jbGVhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEZcXFwifS53ZXVpLWljb24tYmFjazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMTBcXFwifS53ZXVpLWljb24tZGVsZXRlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUExMVxcXCJ9W2NsYXNzKj1cXFwiIHdldWktaWNvbl9cXFwiXTpiZWZvcmUsW2NsYXNzXj13ZXVpLWljb25fXTpiZWZvcmV7bWFyZ2luOjB9LndldWktaWNvbi1zdWNjZXNze2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi13YWl0aW5ne2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMxMGFlZmZ9LndldWktaWNvbi13YXJue2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiNmNDM1MzB9LndldWktaWNvbi1pbmZve2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMxMGFlZmZ9LndldWktaWNvbi1zdWNjZXNzLWNpcmNsZSwud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi13YWl0aW5nLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiNjOWM5Yzl9LndldWktaWNvbi1kb3dubG9hZCwud2V1aS1pY29uLWluZm8tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi1zYWZlLXN1Y2Nlc3N7Y29sb3I6IzA5YmIwN30ud2V1aS1pY29uLXNhZmUtd2Fybntjb2xvcjojZmZiZTAwfS53ZXVpLWljb24tY2FuY2Vse2NvbG9yOiNmNDM1MzA7Zm9udC1zaXplOjIycHh9LndldWktaWNvbi1jbGVhciwud2V1aS1pY29uLXNlYXJjaHtjb2xvcjojYjJiMmIyO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWljb24tZGVsZXRlLndldWktaWNvbl9nYWxsZXJ5LWRlbGV0ZXtjb2xvcjojZmZmO2ZvbnQtc2l6ZToyMnB4fS53ZXVpLWljb25fbXNne2ZvbnQtc2l6ZTo5M3B4fS53ZXVpLWljb25fbXNnLndldWktaWNvbi13YXJue2NvbG9yOiNmNzYyNjB9LndldWktaWNvbl9tc2ctcHJpbWFyeXtmb250LXNpemU6OTNweH0ud2V1aS1pY29uX21zZy1wcmltYXJ5LndldWktaWNvbi13YXJue2NvbG9yOiNmZmJlMDB9LndldWktYnRue3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0bztwYWRkaW5nLWxlZnQ6MTRweDtwYWRkaW5nLXJpZ2h0OjE0cHg7Ym94LXNpemluZzpib3JkZXItYm94O2ZvbnQtc2l6ZToxOHB4O3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6Mi41NTU1NTU1Njtib3JkZXItcmFkaXVzOjVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTtvdmVyZmxvdzpoaWRkZW59LndldWktYnRuOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3dpZHRoOjIwMCU7aGVpZ2h0OjIwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMik7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjUpO3RyYW5zZm9ybTpzY2FsZSguNSk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czoxMHB4fS53ZXVpLWJ0bl9pbmxpbmV7ZGlzcGxheTppbmxpbmUtYmxvY2t9LndldWktYnRuX2RlZmF1bHR7Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmOGY4Zjh9LndldWktYnRuX2RlZmF1bHQ6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZHtjb2xvcjojMDAwfS53ZXVpLWJ0bl9kZWZhdWx0Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDAsMCwwLC42KTtiYWNrZ3JvdW5kLWNvbG9yOiNkZWRlZGV9LndldWktYnRuX3ByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojMWFhZDE5fS53ZXVpLWJ0bl9wcmltYXJ5Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6I2ZmZn0ud2V1aS1idG5fcHJpbWFyeTpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpO2JhY2tncm91bmQtY29sb3I6IzE3OWIxNn0ud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlNjQzNDB9LndldWktYnRuX3dhcm46bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZHtjb2xvcjojZmZmfS53ZXVpLWJ0bl93YXJuOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNik7YmFja2dyb3VuZC1jb2xvcjojY2UzYzM5fS53ZXVpLWJ0bl9kaXNhYmxlZHtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNil9LndldWktYnRuX2Rpc2FibGVkLndldWktYnRuX2RlZmF1bHR7Y29sb3I6cmdiYSgwLDAsMCwuMyk7YmFja2dyb3VuZC1jb2xvcjojZjdmN2Y3fS53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzllZDk5ZH0ud2V1aS1idG5fZGlzYWJsZWQud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlYzhiODl9LndldWktYnRuX2xvYWRpbmcgLndldWktbG9hZGluZ3ttYXJnaW46LS4yZW0gLjM0ZW0gMCAwfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnksLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2Fybntjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNil9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiMxNzliMTZ9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNjZTNjMzl9LndldWktYnRuX3BsYWluLXByaW1hcnl7Y29sb3I6IzFhYWQxOTtib3JkZXI6MXB4IHNvbGlkICMxYWFkMTl9LndldWktYnRuX3BsYWluLXByaW1hcnk6bm90KC53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZCk6YWN0aXZle2NvbG9yOnJnYmEoMjYsMTczLDI1LC42KTtib3JkZXItY29sb3I6cmdiYSgyNiwxNzMsMjUsLjYpfS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5OmFmdGVye2JvcmRlci13aWR0aDowfS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0e2NvbG9yOiMzNTM1MzU7Ym9yZGVyOjFweCBzb2xpZCAjMzUzNTM1fS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0Om5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDUzLDUzLDUzLC42KTtib3JkZXItY29sb3I6cmdiYSg1Myw1Myw1MywuNil9LndldWktYnRuX3BsYWluLWRlZmF1bHQ6YWZ0ZXJ7Ym9yZGVyLXdpZHRoOjB9LndldWktYnRuX3BsYWluLWRpc2FibGVke2NvbG9yOnJnYmEoMCwwLDAsLjIpO2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC4yKX1idXR0b24ud2V1aS1idG4saW5wdXQud2V1aS1idG57d2lkdGg6MTAwJTtib3JkZXItd2lkdGg6MDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9YnV0dG9uLndldWktYnRuOmZvY3VzLGlucHV0LndldWktYnRuOmZvY3Vze291dGxpbmU6MH1idXR0b24ud2V1aS1idG5faW5saW5lLGJ1dHRvbi53ZXVpLWJ0bl9taW5pLGlucHV0LndldWktYnRuX2lubGluZSxpbnB1dC53ZXVpLWJ0bl9taW5pe3dpZHRoOmF1dG99YnV0dG9uLndldWktYnRuX3BsYWluLWRlZmF1bHQsYnV0dG9uLndldWktYnRuX3BsYWluLXByaW1hcnksaW5wdXQud2V1aS1idG5fcGxhaW4tZGVmYXVsdCxpbnB1dC53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5e2JvcmRlci13aWR0aDoxcHg7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ud2V1aS1idG5fbWluaXtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjAgMS4zMmVtO2xpbmUtaGVpZ2h0OjIuMztmb250LXNpemU6MTNweH0ud2V1aS1idG4rLndldWktYnRue21hcmdpbi10b3A6MTVweH0ud2V1aS1idG4ud2V1aS1idG5faW5saW5lKy53ZXVpLWJ0bi53ZXVpLWJ0bl9pbmxpbmV7bWFyZ2luLXRvcDphdXRvO21hcmdpbi1sZWZ0OjE1cHh9LndldWktYnRuLWFyZWF7bWFyZ2luOjEuMTc2NDcwNTllbSAxNXB4IC4zZW19LndldWktYnRuLWFyZWFfaW5saW5le2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktYnRuLWFyZWFfaW5saW5lIC53ZXVpLWJ0bnttYXJnaW4tdG9wOmF1dG87bWFyZ2luLXJpZ2h0OjE1cHg7d2lkdGg6MTAwJTstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktYnRuLWFyZWFfaW5saW5lIC53ZXVpLWJ0bjpsYXN0LWNoaWxke21hcmdpbi1yaWdodDowfS53ZXVpLWNlbGxze21hcmdpbi10b3A6MS4xNzY0NzA1OWVtO2JhY2tncm91bmQtY29sb3I6I2ZmZjtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0O2ZvbnQtc2l6ZToxN3B4O292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsczpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktY2VsbHM6YWZ0ZXIsLndldWktY2VsbHM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNTt6LWluZGV4OjJ9LndldWktY2VsbHM6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktY2VsbHNfX3RpdGxle21hcmdpbi10b3A6Ljc3ZW07bWFyZ2luLWJvdHRvbTouM2VtO3BhZGRpbmctbGVmdDoxNXB4O3BhZGRpbmctcmlnaHQ6MTVweDtjb2xvcjojOTk5O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGxzX190aXRsZSsud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjB9LndldWktY2VsbHNfX3RpcHN7bWFyZ2luLXRvcDouM2VtO2NvbG9yOiM5OTk7cGFkZGluZy1sZWZ0OjE1cHg7cGFkZGluZy1yaWdodDoxNXB4O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGx7cGFkZGluZzoxMHB4IDE1cHg7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS1jZWxsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4O3otaW5kZXg6Mn0ud2V1aS1jZWxsOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktY2VsbF9wcmltYXJ5ey13ZWJraXQtYm94LWFsaWduOnN0YXJ0Oy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LndldWktY2VsbF9fYmR7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWNlbGxfX2Z0e3RleHQtYWxpZ246cmlnaHQ7Y29sb3I6Izk5OX0ud2V1aS1jZWxsX3N3aXBlZHtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MH0ud2V1aS1jZWxsX3N3aXBlZD4ud2V1aS1jZWxsX19iZHtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7YmFja2dyb3VuZC1jb2xvcjojZmZmfS53ZXVpLWNlbGxfc3dpcGVkPi53ZXVpLWNlbGxfX2Z0e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7Ym90dG9tOjA7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtjb2xvcjojZmZmfS53ZXVpLXN3aXBlZC1idG57ZGlzcGxheTpibG9jaztwYWRkaW5nOjEwcHggMWVtO2xpbmUtaGVpZ2h0OjEuNDcwNTg4MjQ7Y29sb3I6aW5oZXJpdH0ud2V1aS1zd2lwZWQtYnRuX2RlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojYzdjN2NjfS53ZXVpLXN3aXBlZC1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNmZjNiMzB9LndldWktY2VsbF9hY2Nlc3N7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7Y29sb3I6aW5oZXJpdH0ud2V1aS1jZWxsX2FjY2VzczphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWNlbGxfYWNjZXNzIC53ZXVpLWNlbGxfX2Z0e3BhZGRpbmctcmlnaHQ6MTNweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsX2FjY2VzcyAud2V1aS1jZWxsX19mdDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTttYXJnaW4tdG9wOi00cHg7cmlnaHQ6MnB4fS53ZXVpLWNlbGxfbGlua3tjb2xvcjojNTg2Yzk0O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGxfbGluazpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpibG9ja30ud2V1aS1jaGVja19fbGFiZWx7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktY2hlY2tfX2xhYmVsOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktY2hlY2t7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotOTk5OWVtfS53ZXVpLWNlbGxzX3JhZGlvIC53ZXVpLWNlbGxfX2Z0e3BhZGRpbmctbGVmdDouMzVlbX0ud2V1aS1jZWxsc19yYWRpbyAud2V1aS1jaGVjazpjaGVja2VkKy53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7ZGlzcGxheTpibG9jaztjb250ZW50OlxcXCJcXFxcRUEwOFxcXCI7Y29sb3I6IzA5YmIwNztmb250LXNpemU6MTZweH0ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1jZWxsX19oZHtwYWRkaW5nLXJpZ2h0Oi4zNWVtfS53ZXVpLWNlbGxzX2NoZWNrYm94IC53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDFcXFwiO2NvbG9yOiNjOWM5Yzk7Zm9udC1zaXplOjIzcHg7ZGlzcGxheTpibG9ja30ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1jaGVjazpjaGVja2VkKy53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDZcXFwiO2NvbG9yOiMwOWJiMDd9LndldWktbGFiZWx7ZGlzcGxheTpibG9jazt3aWR0aDoxMDVweDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ud2V1aS1pbnB1dHt3aWR0aDoxMDAlO2JvcmRlcjowO291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2ZvbnQtc2l6ZTppbmhlcml0O2NvbG9yOmluaGVyaXQ7aGVpZ2h0OjEuNDcwNTg4MjRlbTtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0fS53ZXVpLWlucHV0Ojotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLC53ZXVpLWlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lO21hcmdpbjowfS53ZXVpLXRleHRhcmVhe2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjA7cmVzaXplOm5vbmU7d2lkdGg6MTAwJTtjb2xvcjppbmhlcml0O2ZvbnQtc2l6ZToxZW07bGluZS1oZWlnaHQ6aW5oZXJpdDtvdXRsaW5lOjB9LndldWktdGV4dGFyZWEtY291bnRlcntjb2xvcjojYjJiMmIyO3RleHQtYWxpZ246cmlnaHR9LndldWktY2VsbF93YXJuIC53ZXVpLXRleHRhcmVhLWNvdW50ZXJ7Y29sb3I6I2U2NDM0MH0ud2V1aS10b3B0aXBze2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjpmaXhlZDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RvcDowO2xlZnQ6MDtyaWdodDowO3BhZGRpbmc6NXB4O2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNmZmY7ei1pbmRleDo1MDAwO3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsfS53ZXVpLXRvcHRpcHNfd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlNjQzNDB9LndldWktY2VsbHNfZm9ybSAud2V1aS1jZWxsX19mdHtmb250LXNpemU6MH0ud2V1aS1jZWxsc19mb3JtIC53ZXVpLWljb24td2FybntkaXNwbGF5Om5vbmV9LndldWktY2VsbHNfZm9ybSBpbnB1dCwud2V1aS1jZWxsc19mb3JtIGxhYmVsW2Zvcl0sLndldWktY2VsbHNfZm9ybSB0ZXh0YXJlYXstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1jZWxsX3dhcm57Y29sb3I6I2U2NDM0MH0ud2V1aS1jZWxsX3dhcm4gLndldWktaWNvbi13YXJue2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLWZvcm0tcHJldmlld3twb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndldWktZm9ybS1wcmV2aWV3OmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXc6YWZ0ZXIsLndldWktZm9ybS1wcmV2aWV3OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTV9LndldWktZm9ybS1wcmV2aWV3OmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWZvcm0tcHJldmlld19faGR7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4IDE1cHg7dGV4dC1hbGlnbjpyaWdodDtsaW5lLWhlaWdodDoyLjVlbX0ud2V1aS1mb3JtLXByZXZpZXdfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktZm9ybS1wcmV2aWV3X19oZCAud2V1aS1mb3JtLXByZXZpZXdfX3ZhbHVle2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToxLjZlbX0ud2V1aS1mb3JtLXByZXZpZXdfX2Jke3BhZGRpbmc6MTBweCAxNXB4O2ZvbnQtc2l6ZTouOWVtO3RleHQtYWxpZ246cmlnaHQ7Y29sb3I6Izk5OTtsaW5lLWhlaWdodDoyfS53ZXVpLWZvcm0tcHJldmlld19fZnR7cG9zaXRpb246cmVsYXRpdmU7bGluZS1oZWlnaHQ6NTBweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWZvcm0tcHJldmlld19fZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2l0ZW17b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWZvcm0tcHJldmlld19fbGFiZWx7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6MWVtO21pbi13aWR0aDo0ZW07Y29sb3I6Izk5OTt0ZXh0LWFsaWduOmp1c3RpZnk7dGV4dC1hbGlnbi1sYXN0Omp1c3RpZnl9LndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjt3b3JkLWJyZWFrOm5vcm1hbDt3b3JkLXdyYXA6YnJlYWstd29yZH0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtjb2xvcjojM2NjNTFmO3RleHQtYWxpZ246Y2VudGVyOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfWJ1dHRvbi53ZXVpLWZvcm0tcHJldmlld19fYnRue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7b3V0bGluZTowO2xpbmUtaGVpZ2h0OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXR9LndldWktZm9ybS1wcmV2aWV3X19idG46YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VlZX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWZvcm0tcHJldmlld19fYnRuOmZpcnN0LWNoaWxkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bl9kZWZhdWx0e2NvbG9yOiM5OTl9LndldWktZm9ybS1wcmV2aWV3X19idG5fcHJpbWFyeXtjb2xvcjojMGJiMjBjfS53ZXVpLWNlbGxfc2VsZWN0e3BhZGRpbmc6MH0ud2V1aS1jZWxsX3NlbGVjdCAud2V1aS1zZWxlY3R7cGFkZGluZy1yaWdodDozMHB4fS53ZXVpLWNlbGxfc2VsZWN0IC53ZXVpLWNlbGxfX2JkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDo2cHg7d2lkdGg6NnB4O2JvcmRlci13aWR0aDoycHggMnB4IDAgMDtib3JkZXItY29sb3I6I2M4YzhjZDtib3JkZXItc3R5bGU6c29saWQ7LXdlYmtpdC10cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTt0cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OjE1cHg7bWFyZ2luLXRvcDotNHB4fS53ZXVpLXNlbGVjdHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtib3JkZXI6MDtvdXRsaW5lOjA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2hlaWdodDo0NXB4O2xpbmUtaGVpZ2h0OjQ1cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO3BhZGRpbmctbGVmdDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZXtwYWRkaW5nLXJpZ2h0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLXNlbGVjdHt3aWR0aDoxMDVweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hke3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtyaWdodDoxNXB4O21hcmdpbi10b3A6LTRweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9fYmR7cGFkZGluZy1sZWZ0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2JkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1jZWxsX3NlbGVjdC1hZnRlcntwYWRkaW5nLWxlZnQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1hZnRlciAud2V1aS1zZWxlY3R7cGFkZGluZy1sZWZ0OjB9LndldWktY2VsbF92Y29kZXtwYWRkaW5nLXRvcDowO3BhZGRpbmctcmlnaHQ6MDtwYWRkaW5nLWJvdHRvbTowfS53ZXVpLXZjb2RlLWJ0biwud2V1aS12Y29kZS1pbWd7bWFyZ2luLWxlZnQ6NXB4O2hlaWdodDo0NXB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS12Y29kZS1idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIC42ZW0gMCAuN2VtO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZTVlNWU1O2xpbmUtaGVpZ2h0OjQ1cHg7Zm9udC1zaXplOjE3cHg7Y29sb3I6IzNjYzUxZn1idXR0b24ud2V1aS12Y29kZS1idG57YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wOjA7Ym9yZGVyLXJpZ2h0OjA7Ym9yZGVyLWJvdHRvbTowO291dGxpbmU6MH0ud2V1aS12Y29kZS1idG46YWN0aXZle2NvbG9yOiM1MmEzNDF9LndldWktZ2FsbGVyeXtkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7YmFja2dyb3VuZC1jb2xvcjojMDAwO3otaW5kZXg6MTAwMH0ud2V1aS1nYWxsZXJ5X19pbWd7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDtib3R0b206NjBweDtsZWZ0OjA7YmFja2dyb3VuZDo1MCUgbm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWlufS53ZXVpLWdhbGxlcnlfX29wcntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOiMwZDBkMGQ7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDo2MHB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLWdhbGxlcnlfX2RlbHtkaXNwbGF5OmJsb2NrfS53ZXVpLWNlbGxfc3dpdGNoe3BhZGRpbmctdG9wOjYuNXB4O3BhZGRpbmctYm90dG9tOjYuNXB4fS53ZXVpLXN3aXRjaHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmV9LndldWktc3dpdGNoLC53ZXVpLXN3aXRjaC1jcF9fYm94e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjUycHg7aGVpZ2h0OjMycHg7Ym9yZGVyOjFweCBzb2xpZCAjZGZkZmRmO291dGxpbmU6MDtib3JkZXItcmFkaXVzOjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQtY29sb3I6I2RmZGZkZjt0cmFuc2l0aW9uOmJhY2tncm91bmQtY29sb3IgLjFzLGJvcmRlciAuMXN9LndldWktc3dpdGNoLWNwX19ib3g6YmVmb3JlLC53ZXVpLXN3aXRjaDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjUwcHg7aGVpZ2h0OjMwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZkZmRmZDt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpLC13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpfS53ZXVpLXN3aXRjaC1jcF9fYm94OmFmdGVyLC53ZXVpLXN3aXRjaDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjQpO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSksLXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveCwud2V1aS1zd2l0Y2g6Y2hlY2tlZHtib3JkZXItY29sb3I6IzA0YmUwMjtiYWNrZ3JvdW5kLWNvbG9yOiMwNGJlMDJ9LndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2Vkfi53ZXVpLXN3aXRjaC1jcF9fYm94OmJlZm9yZSwud2V1aS1zd2l0Y2g6Y2hlY2tlZDpiZWZvcmV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveDphZnRlciwud2V1aS1zd2l0Y2g6Y2hlY2tlZDphZnRlcnstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpfS53ZXVpLXN3aXRjaC1jcF9faW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotOTk5OXB4fS53ZXVpLXN3aXRjaC1jcF9fYm94e2Rpc3BsYXk6YmxvY2t9LndldWktdXBsb2FkZXJfX2hke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cGFkZGluZy1ib3R0b206MTBweDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS11cGxvYWRlcl9fdGl0bGV7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXVwbG9hZGVyX19pbmZve2NvbG9yOiNiMmIyYjJ9LndldWktdXBsb2FkZXJfX2Jke21hcmdpbi1ib3R0b206LTRweDttYXJnaW4tcmlnaHQ6LTlweDtvdmVyZmxvdzpoaWRkZW59LndldWktdXBsb2FkZXJfX2ZpbGVze2xpc3Qtc3R5bGU6bm9uZX0ud2V1aS11cGxvYWRlcl9fZmlsZXtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDo5cHg7bWFyZ2luLWJvdHRvbTo5cHg7d2lkdGg6NzlweDtoZWlnaHQ6NzlweDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCA1MCU7YmFja2dyb3VuZC1zaXplOmNvdmVyfS53ZXVpLXVwbG9hZGVyX19maWxlX3N0YXR1c3twb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSl9LndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVzIC53ZXVpLXVwbG9hZGVyX19maWxlLWNvbnRlbnR7ZGlzcGxheTpibG9ja30ud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtjb2xvcjojZmZmfS53ZXVpLXVwbG9hZGVyX19maWxlLWNvbnRlbnQgLndldWktaWNvbi13YXJue2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3h7ZmxvYXQ6bGVmdDtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW4tcmlnaHQ6OXB4O21hcmdpbi1ib3R0b206OXB4O3dpZHRoOjc3cHg7aGVpZ2h0Ojc3cHg7Ym9yZGVyOjFweCBzb2xpZCAjZDlkOWQ5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWZ0ZXIsLndldWktdXBsb2FkZXJfX2lucHV0LWJveDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7YmFja2dyb3VuZC1jb2xvcjojZDlkOWQ5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YmVmb3Jle3dpZHRoOjJweDtoZWlnaHQ6MzkuNXB4fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWZ0ZXJ7d2lkdGg6MzkuNXB4O2hlaWdodDoycHh9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmV7Ym9yZGVyLWNvbG9yOiM5OTl9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YWZ0ZXIsLndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6Izk5OX0ud2V1aS11cGxvYWRlcl9faW5wdXR7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO29wYWNpdHk6MDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1tc2d7cGFkZGluZy10b3A6MzZweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1tc2dfX2ljb24tYXJlYXttYXJnaW4tYm90dG9tOjMwcHh9LndldWktbXNnX190ZXh0LWFyZWF7bWFyZ2luLWJvdHRvbToyNXB4O3BhZGRpbmc6MCAyMHB4fS53ZXVpLW1zZ19fdGV4dC1hcmVhIGF7Y29sb3I6IzU4NmM5NH0ud2V1aS1tc2dfX3RpdGxle21hcmdpbi1ib3R0b206NXB4O2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MjBweH0ud2V1aS1tc2dfX2Rlc2N7Zm9udC1zaXplOjE0cHg7Y29sb3I6Izk5OX0ud2V1aS1tc2dfX29wci1hcmVhe21hcmdpbi1ib3R0b206MjVweH0ud2V1aS1tc2dfX2V4dHJhLWFyZWF7bWFyZ2luLWJvdHRvbToxNXB4O2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM5OTl9LndldWktbXNnX19leHRyYS1hcmVhIGF7Y29sb3I6IzU4NmM5NH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDo0MzhweCl7LndldWktbXNnX19leHRyYS1hcmVhe3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyfX0ud2V1aS1hcnRpY2xle3BhZGRpbmc6MjBweCAxNXB4O2ZvbnQtc2l6ZToxNXB4fS53ZXVpLWFydGljbGUgc2VjdGlvbnttYXJnaW4tYm90dG9tOjEuNWVtfS53ZXVpLWFydGljbGUgaDF7Zm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjllbX0ud2V1aS1hcnRpY2xlIGgye2ZvbnQtc2l6ZToxNnB4fS53ZXVpLWFydGljbGUgaDIsLndldWktYXJ0aWNsZSBoM3tmb250LXdlaWdodDo0MDA7bWFyZ2luLWJvdHRvbTouMzRlbX0ud2V1aS1hcnRpY2xlIGgze2ZvbnQtc2l6ZToxNXB4fS53ZXVpLWFydGljbGUgKnttYXgtd2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7d29yZC13cmFwOmJyZWFrLXdvcmR9LndldWktYXJ0aWNsZSBwe21hcmdpbjowIDAgLjhlbX0ud2V1aS10YWJiYXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjUwMDtib3R0b206MDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2Y3ZjdmYX0ud2V1aS10YWJiYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2MwYmZjNDtjb2xvcjojYzBiZmM0Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS10YWJiYXJfX2l0ZW17ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7cGFkZGluZzo1cHggMCAwO2ZvbnQtc2l6ZTowO2NvbG9yOiM5OTk7dGV4dC1hbGlnbjpjZW50ZXI7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9faWNvbiwud2V1aS10YWJiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb24gLndldWktdGFiYmFyX19pY29uPmksLndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9fbGFiZWx7Y29sb3I6IzA5YmIwN30ud2V1aS10YWJiYXJfX2ljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MjdweDtoZWlnaHQ6MjdweH0ud2V1aS10YWJiYXJfX2ljb24+aSxpLndldWktdGFiYmFyX19pY29ue2ZvbnQtc2l6ZToyNHB4O2NvbG9yOiM5OTl9LndldWktdGFiYmFyX19pY29uIGltZ3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS53ZXVpLXRhYmJhcl9fbGFiZWx7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6Izk5OTtmb250LXNpemU6MTBweDtsaW5lLWhlaWdodDoxLjh9LndldWktbmF2YmFye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo1MDA7dG9wOjA7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmYWZhZmF9LndldWktbmF2YmFyOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztjb2xvcjojY2NjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1uYXZiYXIrLndldWktdGFiX19wYW5lbHtwYWRkaW5nLXRvcDo1MHB4O3BhZGRpbmctYm90dG9tOjB9LndldWktbmF2YmFyX19pdGVte3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3BhZGRpbmc6MTNweCAwO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNXB4Oy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLW5hdmJhcl9faXRlbTphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWRlZGVkfS53ZXVpLW5hdmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbntiYWNrZ3JvdW5kLWNvbG9yOiNlYWVhZWF9LndldWktbmF2YmFyX19pdGVtOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1yaWdodDoxcHggc29saWQgI2NjYztjb2xvcjojY2NjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1uYXZiYXJfX2l0ZW06bGFzdC1jaGlsZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktdGFie3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlfS53ZXVpLXRhYl9fcGFuZWx7Ym94LXNpemluZzpib3JkZXItYm94O2hlaWdodDoxMDAlO3BhZGRpbmctYm90dG9tOjUwcHg7b3ZlcmZsb3c6YXV0bzstd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzp0b3VjaH0ud2V1aS10YWJfX2NvbnRlbnR7ZGlzcGxheTpub25lfS53ZXVpLXByb2dyZXNze2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktcHJvZ3Jlc3NfX2JhcntiYWNrZ3JvdW5kLWNvbG9yOiNlYmViZWI7aGVpZ2h0OjNweDstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktcHJvZ3Jlc3NfX2lubmVyLWJhcnt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzA5YmIwN30ud2V1aS1wcm9ncmVzc19fb3Bye2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6MTVweDtmb250LXNpemU6MH0ud2V1aS1wYW5lbHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bWFyZ2luLXRvcDoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ud2V1aS1wYW5lbDpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjB9LndldWktcGFuZWw6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBhbmVsOmFmdGVyLC53ZXVpLXBhbmVsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTV9LndldWktcGFuZWw6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGFuZWxfX2hke3BhZGRpbmc6MTRweCAxNXB4IDEwcHg7Y29sb3I6Izk5OTtmb250LXNpemU6MTNweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1wYW5lbF9faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweH0ud2V1aS1tZWRpYS1ib3h7cGFkZGluZzoxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLW1lZGlhLWJveDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweH0ud2V1aS1tZWRpYS1ib3g6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX1hLndldWktbWVkaWEtYm94e2NvbG9yOiMwMDA7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9YS53ZXVpLW1lZGlhLWJveDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLW1lZGlhLWJveF9fdGl0bGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxN3B4O3dpZHRoOmF1dG87b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO3dvcmQtd3JhcDpub3JtYWw7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGx9LndldWktbWVkaWEtYm94X19kZXNje2NvbG9yOiM5OTk7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MS4yO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6LXdlYmtpdC1ib3g7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtbGluZS1jbGFtcDoyfS53ZXVpLW1lZGlhLWJveF9faW5mb3ttYXJnaW4tdG9wOjE1cHg7cGFkZGluZy1ib3R0b206NXB4O2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiNjZWNlY2U7bGluZS1oZWlnaHQ6MWVtO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzpoaWRkZW59LndldWktbWVkaWEtYm94X19pbmZvX19tZXRhe2Zsb2F0OmxlZnQ7cGFkZGluZy1yaWdodDoxZW19LndldWktbWVkaWEtYm94X19pbmZvX19tZXRhX2V4dHJhe3BhZGRpbmctbGVmdDoxZW07Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjZWNlY2V9LndldWktbWVkaWEtYm94X3RleHQgLndldWktbWVkaWEtYm94X190aXRsZXttYXJnaW4tYm90dG9tOjhweH0ud2V1aS1tZWRpYS1ib3hfYXBwbXNne2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktbWVkaWEtYm94X2FwcG1zZyAud2V1aS1tZWRpYS1ib3hfX2hke21hcmdpbi1yaWdodDouOGVtO3dpZHRoOjYwcHg7aGVpZ2h0OjYwcHg7bGluZS1oZWlnaHQ6NjBweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9fdGh1bWJ7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCU7dmVydGljYWwtYWxpZ246dG9wfS53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X19iZHstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7bWluLXdpZHRoOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZ3twYWRkaW5nOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZyAud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZyAud2V1aS1jZWxsczpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWdyaWRze3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ud2V1aS1ncmlkczpiZWZvcmV7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWdyaWRzOmFmdGVyLC53ZXVpLWdyaWRzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7Y29sb3I6I2Q5ZDlkOX0ud2V1aS1ncmlkczphZnRlcnt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWdyaWR7cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjIwcHggMTBweDt3aWR0aDozMy4zMzMzMzMzMyU7Ym94LXNpemluZzpib3JkZXItYm94fS53ZXVpLWdyaWQ6YmVmb3Jle3RvcDowO3dpZHRoOjFweDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWdyaWQ6YWZ0ZXIsLndldWktZ3JpZDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtib3R0b206MDtjb2xvcjojZDlkOWQ5fS53ZXVpLWdyaWQ6YWZ0ZXJ7bGVmdDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2Q5ZDlkOTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZ3JpZDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWdyaWRfX2ljb257d2lkdGg6MjhweDtoZWlnaHQ6MjhweDttYXJnaW46MCBhdXRvfS53ZXVpLWdyaWRfX2ljb24gaW1ne2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ud2V1aS1ncmlkX19pY29uKy53ZXVpLWdyaWRfX2xhYmVse21hcmdpbi10b3A6NXB4fS53ZXVpLWdyaWRfX2xhYmVse2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzAwMDt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztvdmVyZmxvdzpoaWRkZW59LndldWktZm9vdGVyLC53ZXVpLWdyaWRfX2xhYmVse3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWZvb3Rlcntjb2xvcjojOTk5fS53ZXVpLWZvb3RlciBhe2NvbG9yOiM1ODZjOTR9LndldWktZm9vdGVyX2ZpeGVkLWJvdHRvbXtwb3NpdGlvbjpmaXhlZDtib3R0b206LjUyZW07bGVmdDowO3JpZ2h0OjB9LndldWktZm9vdGVyX19saW5rc3tmb250LXNpemU6MH0ud2V1aS1mb290ZXJfX2xpbmt7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wO21hcmdpbjowIC42MmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWZvb3Rlcl9fbGluazpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2M3YzdjNztjb2xvcjojYzdjN2M3Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KTtsZWZ0Oi0uNjVlbTt0b3A6LjM2ZW07Ym90dG9tOi4zNmVtfS53ZXVpLWZvb3Rlcl9fbGluazpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWZvb3Rlcl9fdGV4dHtwYWRkaW5nOjAgLjM0ZW07Zm9udC1zaXplOjEycHh9LndldWktZmxleHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWZsZXhfX2l0ZW17LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWRpYWxvZ3twb3NpdGlvbjpmaXhlZDt6LWluZGV4OjUwMDA7d2lkdGg6ODAlO21heC13aWR0aDozMDBweDt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czozcHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWRpYWxvZ19faGR7cGFkZGluZzoxLjNlbSAxLjZlbSAuNWVtfS53ZXVpLWRpYWxvZ19fdGl0bGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxOHB4fS53ZXVpLWRpYWxvZ19fYmR7cGFkZGluZzowIDEuNmVtIC44ZW07bWluLWhlaWdodDo0MHB4O2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjEuMzt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbDtjb2xvcjojOTk5fS53ZXVpLWRpYWxvZ19fYmQ6Zmlyc3QtY2hpbGR7cGFkZGluZzoyLjdlbSAyMHB4IDEuN2VtO2NvbG9yOiMzNTM1MzV9LndldWktZGlhbG9nX19mdHtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo0OHB4O2ZvbnQtc2l6ZToxOHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktZGlhbG9nX19mdDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZGlhbG9nX19idG57ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzNjYzUxZjt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1kaWFsb2dfX2J0bjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWVlfS53ZXVpLWRpYWxvZ19fYnRuOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktZGlhbG9nX19idG46Zmlyc3QtY2hpbGQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLWRpYWxvZ19fYnRuX2RlZmF1bHR7Y29sb3I6IzM1MzUzNX0ud2V1aS1kaWFsb2dfX2J0bl9wcmltYXJ5e2NvbG9yOiMwYmIyMGN9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ3t0ZXh0LWFsaWduOmxlZnQ7Ym94LXNoYWRvdzowIDZweCAzMHB4IDAgcmdiYSgwLDAsMCwuMSl9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fdGl0bGV7Zm9udC1zaXplOjIxcHh9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19faGR7dGV4dC1hbGlnbjpsZWZ0fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Jke2NvbG9yOiM5OTk7cGFkZGluZzouMjVlbSAxLjZlbSAyZW07Zm9udC1zaXplOjE3cHg7dGV4dC1hbGlnbjpsZWZ0fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2JkOmZpcnN0LWNoaWxke3BhZGRpbmc6MS42ZW0gMS42ZW0gMmVtO2NvbG9yOiMzNTM1MzV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fZnR7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOnJpZ2h0O2xpbmUtaGVpZ2h0OjQycHg7Zm9udC1zaXplOjE2cHg7cGFkZGluZzowIDEuNmVtIC43ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fZnQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7cGFkZGluZzowIC44ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46YWN0aXZlLC53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjp2aXNpdGVke2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMDYpfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjpsYXN0LWNoaWxke21hcmdpbi1yaWdodDotLjhlbX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG5fZGVmYXVsdHtjb2xvcjpncmF5fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTAyNHB4KXsud2V1aS1kaWFsb2d7d2lkdGg6MzUlfX0ud2V1aS10b2FzdHtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjUwMDA7d2lkdGg6Ny42ZW07bWluLWhlaWdodDo3LjZlbTt0b3A6MTgwcHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTMuOGVtO2JhY2tncm91bmQ6aHNsYSgwLDAlLDclLC43KTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjVweDtjb2xvcjojZmZmfS53ZXVpLWljb25fdG9hc3R7bWFyZ2luOjIycHggMCAwO2Rpc3BsYXk6YmxvY2t9LndldWktaWNvbl90b2FzdC53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGU6YmVmb3Jle2NvbG9yOiNmZmY7Zm9udC1zaXplOjU1cHh9LndldWktaWNvbl90b2FzdC53ZXVpLWxvYWRpbmd7bWFyZ2luOjMwcHggMCAwO3dpZHRoOjM4cHg7aGVpZ2h0OjM4cHg7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LndldWktdG9hc3RfX2NvbnRlbnR7bWFyZ2luOjAgMCAxNXB4fS53ZXVpLW1hc2t7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC42KX0ud2V1aS1tYXNrLC53ZXVpLW1hc2tfdHJhbnNwYXJlbnR7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwO3RvcDowO3JpZ2h0OjA7bGVmdDowO2JvdHRvbTowfS53ZXVpLWFjdGlvbnNoZWV0e3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDtib3R0b206MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDo1MDAwO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0O3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZXtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6NjVweDtwYWRkaW5nOjAgMjBweDtsaW5lLWhlaWdodDoxLjQ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjstbXMtZmxleC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsOy1tcy1mbGV4LWRpcmVjdGlvbjpjb2x1bW47ZmxleC1kaXJlY3Rpb246Y29sdW1uO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM4ODg7YmFja2dyb3VuZDojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZTpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZSAud2V1aS1hY3Rpb25zaGVldF9fdGl0bGUtdGV4dHtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5Oi13ZWJraXQtYm94Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWxpbmUtY2xhbXA6Mn0ud2V1aS1hY3Rpb25zaGVldF9fbWVudXtiYWNrZ3JvdW5kLWNvbG9yOiNmY2ZjZmR9LndldWktYWN0aW9uc2hlZXRfX2FjdGlvbnttYXJnaW4tdG9wOjZweDtiYWNrZ3JvdW5kLWNvbG9yOiNmY2ZjZmR9LndldWktYWN0aW9uc2hlZXRfX2NlbGx7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4IDA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE4cHh9LndldWktYWN0aW9uc2hlZXRfX2NlbGw6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0e3Bvc2l0aW9uOmZpeGVkO2xlZnQ6NTAlO3RvcDo1MCU7Ym90dG9tOmF1dG87LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3dpZHRoOjI3NHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcywtd2Via2l0LXRyYW5zZm9ybSAuM3N9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb257ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fbWVudXtib3JkZXItcmFkaXVzOjJweDtib3gtc2hhZG93OjAgNnB4IDMwcHggMCByZ2JhKDAsMCwwLC4xKX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGx7cGFkZGluZzoxM3B4IDI0cHg7Zm9udC1zaXplOjE2cHg7bGluZS1oZWlnaHQ6MS40O3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGw6Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czoycHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MnB4fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpsYXN0LWNoaWxke2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MnB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjJweH0ud2V1aS1hY3Rpb25zaGVldF90b2dnbGV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCl9LndldWktbG9hZG1vcmV7d2lkdGg6NjUlO21hcmdpbjoxLjVlbSBhdXRvO2xpbmUtaGVpZ2h0OjEuNmVtO2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLWxvYWRtb3JlX190aXBze2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS1sb2FkbW9yZV9saW5le2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7bWFyZ2luLXRvcDoyLjRlbX0ud2V1aS1sb2FkbW9yZV9saW5lIC53ZXVpLWxvYWRtb3JlX190aXBze3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotLjllbTtwYWRkaW5nOjAgLjU1ZW07YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiM5OTl9LndldWktbG9hZG1vcmVfZG90IC53ZXVpLWxvYWRtb3JlX190aXBze3BhZGRpbmc6MCAuMTZlbX0ud2V1aS1sb2FkbW9yZV9kb3QgLndldWktbG9hZG1vcmVfX3RpcHM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3dpZHRoOjRweDtoZWlnaHQ6NHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2U1ZTVlNTtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjowO3RvcDotLjE2ZW19LndldWktYmFkZ2V7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzouMTVlbSAuNGVtO21pbi13aWR0aDo4cHg7Ym9yZGVyLXJhZGl1czoxOHB4O2JhY2tncm91bmQtY29sb3I6I2Y0MzUzMDtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjEuMjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktYmFkZ2VfZG90e3BhZGRpbmc6LjRlbTttaW4td2lkdGg6MH0ud2V1aS1zZWFyY2gtYmFye3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6OHB4IDEwcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0fS53ZXVpLXNlYXJjaC1iYXI6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNkN2Q2ZGM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXNlYXJjaC1iYXI6YWZ0ZXIsLndldWktc2VhcmNoLWJhcjpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZDdkNmRjfS53ZXVpLXNlYXJjaC1iYXI6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2Q3ZDZkYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktc2VhcmNoLWJhci53ZXVpLXNlYXJjaC1iYXJfZm9jdXNpbmcgLndldWktc2VhcmNoLWJhcl9fY2FuY2VsLWJ0bntkaXNwbGF5OmJsb2NrfS53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2xhYmVse2Rpc3BsYXk6bm9uZX0ud2V1aS1zZWFyY2gtYmFyX19mb3Jte3Bvc2l0aW9uOnJlbGF0aXZlOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDphdXRvO2ZsZXg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNlZmVmZjR9LndldWktc2VhcmNoLWJhcl9fZm9ybTphZnRlcntjb250ZW50OlxcXCJcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoyMDAlO2hlaWdodDoyMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC41KTt0cmFuc2Zvcm06c2NhbGUoLjUpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7Ym9yZGVyLXJhZGl1czoxMHB4O2JvcmRlcjoxcHggc29saWQgI2U2ZTZlYTtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZDojZmZmfS53ZXVpLXNlYXJjaC1iYXJfX2JveHtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MzBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxfS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1zZWFyY2gtYmFyX19pbnB1dHtwYWRkaW5nOjRweCAwO3dpZHRoOjEwMCU7aGVpZ2h0OjEuNDI4NTcxNDNlbTtib3JkZXI6MDtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxLjQyODU3MTQzZW07Ym94LXNpemluZzpjb250ZW50LWJveDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50fS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1zZWFyY2gtYmFyX19pbnB1dDpmb2N1c3tvdXRsaW5lOm5vbmV9LndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLWljb24tc2VhcmNoe3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTBweDt0b3A6MDtsaW5lLWhlaWdodDoyOHB4fS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1pY29uLWNsZWFye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7cGFkZGluZzowIDEwcHg7bGluZS1oZWlnaHQ6MjhweH0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4O3JpZ2h0OjFweDtib3R0b206MXB4O2xlZnQ6MXB4O3otaW5kZXg6Mjtib3JkZXItcmFkaXVzOjNweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOWI5YjliO2JhY2tncm91bmQ6I2ZmZn0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbCBzcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxNHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbCAud2V1aS1pY29uLXNlYXJjaHttYXJnaW4tcmlnaHQ6NXB4fS53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG57ZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHg7bGluZS1oZWlnaHQ6MjhweDtjb2xvcjojMDliYjA3O3doaXRlLXNwYWNlOm5vd3JhcH0ud2V1aS1zZWFyY2gtYmFyX19pbnB1dDpub3QoOnZhbGlkKX4ud2V1aS1pY29uLWNsZWFye2Rpc3BsYXk6bm9uZX1pbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb257ZGlzcGxheTpub25lfS53ZXVpLXBpY2tlcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2xlZnQ6MDtib3R0b206MDt6LWluZGV4OjUwMDA7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLXBpY2tlcl9faGR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwYWRkaW5nOjlweCAxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTdweH0ud2V1aS1waWNrZXJfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2FjdGlvbntkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtjb2xvcjojMWFhZDE5fS53ZXVpLXBpY2tlcl9fYWN0aW9uOmZpcnN0LWNoaWxke3RleHQtYWxpZ246bGVmdDtjb2xvcjojODg4fS53ZXVpLXBpY2tlcl9fYWN0aW9uOmxhc3QtY2hpbGR7dGV4dC1hbGlnbjpyaWdodH0ud2V1aS1waWNrZXJfX2Jke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2hlaWdodDoyMzhweDtvdmVyZmxvdzpoaWRkZW59LndldWktcGlja2VyX19ncm91cHstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCV9LndldWktcGlja2VyX19tYXNre3RvcDowO2hlaWdodDoxMDAlO21hcmdpbjowIGF1dG87YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLGhzbGEoMCwwJSwxMDAlLC45NSksaHNsYSgwLDAlLDEwMCUsLjYpKSxsaW5lYXItZ3JhZGllbnQoMGRlZyxoc2xhKDAsMCUsMTAwJSwuOTUpLGhzbGEoMCwwJSwxMDAlLC42KSk7YmFja2dyb3VuZC1wb3NpdGlvbjp0b3AsYm90dG9tO2JhY2tncm91bmQtc2l6ZToxMDAlIDEwMnB4O2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yLC53ZXVpLXBpY2tlcl9fbWFza3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7d2lkdGg6MTAwJTt6LWluZGV4OjN9LndldWktcGlja2VyX19pbmRpY2F0b3J7aGVpZ2h0OjM0cHg7dG9wOjEwMnB4fS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2luZGljYXRvcjphZnRlciwud2V1aS1waWNrZXJfX2luZGljYXRvcjpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBpY2tlcl9fY29udGVudHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJX0ud2V1aS1waWNrZXJfX2l0ZW17cGFkZGluZzowO2hlaWdodDozNHB4O2xpbmUtaGVpZ2h0OjM0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzAwMDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW59LndldWktcGlja2VyX19pdGVtX2Rpc2FibGVke2NvbG9yOiM5OTl9QC13ZWJraXQta2V5ZnJhbWVzIGF7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX19QGtleWZyYW1lcyBhezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9fS53ZXVpLWFuaW1hdGUtc2xpZGUtdXB7LXdlYmtpdC1hbmltYXRpb246YSBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246YSBlYXNlIC4zcyBmb3J3YXJkc31ALXdlYmtpdC1rZXlmcmFtZXMgYnswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfX1Aa2V5ZnJhbWVzIGJ7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX19LndldWktYW5pbWF0ZS1zbGlkZS1kb3duey13ZWJraXQtYW5pbWF0aW9uOmIgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmIgZWFzZSAuM3MgZm9yd2FyZHN9QC13ZWJraXQta2V5ZnJhbWVzIGN7MCV7b3BhY2l0eTowfXRve29wYWNpdHk6MX19QGtleWZyYW1lcyBjezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS53ZXVpLWFuaW1hdGUtZmFkZS1pbnstd2Via2l0LWFuaW1hdGlvbjpjIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpjIGVhc2UgLjNzIGZvcndhcmRzfUAtd2Via2l0LWtleWZyYW1lcyBkezAle29wYWNpdHk6MX10b3tvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZHswJXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX0ud2V1aS1hbmltYXRlLWZhZGUtb3V0ey13ZWJraXQtYW5pbWF0aW9uOmQgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmQgZWFzZSAuM3MgZm9yd2FyZHN9LndldWktYWdyZWV7ZGlzcGxheTpibG9jaztwYWRkaW5nOi41ZW0gMTVweDtmb250LXNpemU6MTNweH0ud2V1aS1hZ3JlZSBhe2NvbG9yOiM1ODZjOTR9LndldWktYWdyZWVfX3RleHR7Y29sb3I6Izk5OX0ud2V1aS1hZ3JlZV9fY2hlY2tib3h7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO291dGxpbmU6MDtmb250LXNpemU6MDtib3JkZXI6MXB4IHNvbGlkICNkMWQxZDE7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6M3B4O3dpZHRoOjEzcHg7aGVpZ2h0OjEzcHg7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246MDt0b3A6MnB4fS53ZXVpLWFncmVlX19jaGVja2JveDpjaGVja2VkOmJlZm9yZXtmb250LWZhbWlseTp3ZXVpO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXZhcmlhbnQ6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7dGV4dC1hbGlnbjpjZW50ZXI7c3BlYWs6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1kZWNvcmF0aW9uOmluaGVyaXQ7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwiO2NvbG9yOiMwOWJiMDc7Zm9udC1zaXplOjEzcHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNDglKSBzY2FsZSguNzMpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNDglKSBzY2FsZSguNzMpfS53ZXVpLWFncmVlX19jaGVja2JveDpkaXNhYmxlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTF9LndldWktYWdyZWVfX2NoZWNrYm94OmRpc2FibGVkOmJlZm9yZXtjb2xvcjojYWRhZGFkfS53ZXVpLWxvYWRpbmd7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC1hbmltYXRpb246ZSAxcyBzdGVwcygxMikgaW5maW5pdGU7YW5pbWF0aW9uOmUgMXMgc3RlcHMoMTIpIGluZmluaXRlO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQgdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1qQWlJR2hsYVdkb2REMGlNVEl3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStQSEJoZEdnZ1ptbHNiRDBpYm05dVpTSWdaRDBpVFRBZ01HZ3hNREIyTVRBd1NEQjZJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpSVGxGT1VVNUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtEQWdMVE13S1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSXprNE9UWTVOeUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3pNQ0F4TURVdU9UZ2dOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqT1VJNU9UbEJJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtEWXdJRGMxTGprNElEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMEV6UVRGQk1pSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnNU1DQTJOU0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlOQlFrRTVRVUVpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9NVEl3SURVNExqWTJJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBJeVFqSkNNaUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3hOVEFnTlRRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUWtGQ09FSTVJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtERTRNQ0ExTUNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRNa013UXpFaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFMU1DQTBOUzQ1T0NBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRRa05DUTBJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFeU1DQTBNUzR6TkNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkVNa1F5UkRJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRrd0lETTFJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBSQlJFRkVRU0lnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3ROakFnTWpRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUlRKRk1rVXlJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtDMHpNQ0F0TlM0NU9DQTJOU2tpTHo0OEwzTjJaejQ9KSBuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOjEwMCV9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeSAud2V1aS1sb2FkaW5nLC53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm4gLndldWktbG9hZGluZywud2V1aS1sb2FkaW5nLndldWktbG9hZGluZ190cmFuc3BhcmVudHtiYWNrZ3JvdW5kLWltYWdlOnVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyMCcgaGVpZ2h0PScxMjAnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJyUzRSUzQ3BhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8lM0UlM0NyZWN0IHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41NiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMCAtMzApJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMzAgMTA1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNjUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMzIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCA1OC42NiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI1KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTE1MCA0NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTkwIDM1IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjEpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC02MCAyNC4wMiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvJTNFJTNDL3N2ZyUzRVxcXCIpfUAtd2Via2l0LWtleWZyYW1lcyBlezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxdHVybik7dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fUBrZXlmcmFtZXMgZXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMXR1cm4pO3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX0ud2V1aS1zbGlkZXJ7cGFkZGluZzoxNXB4IDE4cHg7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS53ZXVpLXNsaWRlcl9faW5uZXJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjJweDtiYWNrZ3JvdW5kLWNvbG9yOiNlOWU5ZTl9LndldWktc2xpZGVyX190cmFja3toZWlnaHQ6MnB4O2JhY2tncm91bmQtY29sb3I6IzFhYWQxOTt3aWR0aDowfS53ZXVpLXNsaWRlcl9faGFuZGxlcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjUwJTt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbi1sZWZ0Oi0xNHB4O21hcmdpbi10b3A6LTE0cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JveC1zaGFkb3c6MCAwIDRweCByZ2JhKDAsMCwwLC4yKX0ud2V1aS1zbGlkZXItYm94e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktc2xpZGVyLWJveCAud2V1aS1zbGlkZXJ7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXNsaWRlci1ib3hfX3ZhbHVle21hcmdpbi1sZWZ0Oi41ZW07bWluLXdpZHRoOjI0cHg7Y29sb3I6Izg4ODt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweH0ud2V1aS10b3B0aXBzW2RhdGEtdi0xYTdiZWMyYl17ZGlzcGxheTpibG9ja30ud3YtaGVhZGVyW2RhdGEtdi1mNmY1YzE2YV17ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3g7d2lkdGg6MTAwJTtoZWlnaHQ6NTBweDtsaW5lLWhlaWdodDoxO3BhZGRpbmc6MCAxMHB4O21hcmdpbjowO2NvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7d2hpdGUtc3BhY2U6bm93cmFwfS53di1oZWFkZXIgLmxlZnRbZGF0YS12LWY2ZjVjMTZhXXtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjtmbG9hdDpsZWZ0O2ZvbnQtc2l6ZTozNXB4O2xpbmUtaGVpZ2h0OjM1cHg7Zm9udC13ZWlnaHQ6MTAwfS53di1oZWFkZXIgLnd2LWhlYWRlci10aXRsZVtkYXRhLXYtZjZmNWMxNmFde2ZvbnQtc2l6ZToyM3B4O2ZvbnQtd2VpZ2h0OjA7dGV4dC1hbGlnbjpjZW50ZXI7ZmxleDoxfS53di1oZWFkZXIuaXMtZml4ZWRbZGF0YS12LWY2ZjVjMTZhXXtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7dG9wOjB9Lnd2LXBvcHVwLWJvZHlbZGF0YS12LTg3YTA4ZWY2XXtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2xlZnQ6MDtib3R0b206MDt6LWluZGV4OjUwMDA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS53di1zd2lwZVtkYXRhLXYtNDczNzA1MjFde292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlcltkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6MTAwJX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXIgZGl2W2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246YWJzb2x1dGU7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwMCUpO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZGlzcGxheTpub25lfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlciBkaXYuaXMtYWN0aXZlW2RhdGEtdi00NzM3MDUyMV17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm06bm9uZX0ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnNbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnMgLnd2LXN3aXBlLWluZGljYXRvcltkYXRhLXYtNDczNzA1MjFde2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6NTAlO21hcmdpbjowIDRweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7b3BhY2l0eTouM30ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnMgLnd2LXN3aXBlLWluZGljYXRvci5pcy1hY3RpdmVbZGF0YS12LTQ3MzcwNTIxXXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndldWktaWNvbl90b2FzdFtkYXRhLXYtYmFmYjFmOGFde2ZvbnQtc2l6ZTo0MHB4fS53ZXVpLXRvYXN0X3RleHRbZGF0YS12LWJhZmIxZjhhXXt3aWR0aDphdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MDtwYWRkaW5nOi41ZW0gMH0ud2V1aS10b2FzdF90ZXh0IC53ZXVpLXRvYXN0X19jb250ZW50W2RhdGEtdi1iYWZiMWY4YV17bWFyZ2luOjB9Lnd2LWNpcmNsZVtkYXRhLXYtMTJhYjY0MmFde3Bvc2l0aW9uOnJlbGF0aXZlfS53di1jaXJjbGUgLnd2LWNpcmNsZS1jb250ZW50W2RhdGEtdi0xMmFiNjQyYV17d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0uYWN0aW9uc2hlZXRfX21hc2tfc2hvd1tkYXRhLXYtNDA5NWM4YmZde2Rpc3BsYXk6YmxvY2s7dHJhbnNmb3JtLW9yaWdpbjowIDAgMDtvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNil9LndldWktY2hlY2tfX2xhYmVsLWRpc2FibGVkW2RhdGEtdi0zZDYzYWUzYV17YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0ud2V1aS1jaGVja19fbGFiZWwtZGlzYWJsZWRbZGF0YS12LTMyM2I5NTc5XXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpfS53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsW2RhdGEtdi1lODc2YWEyYV17dHJhbnNmb3JtLW9yaWdpbjowIDAgMDtvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpfS53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG5bZGF0YS12LWU4NzZhYTJhXXtkaXNwbGF5OmJsb2NrfS5zZWFyY2hiYXItcmVzdWx0W2RhdGEtdi1lODc2YWEyYV17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm0tb3JpZ2luOjAgMCAwO29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSk7bWFyZ2luLXRvcDowO2ZvbnQtc2l6ZToxNHB4fS53di1uYXZiYXJfX2l0ZW1bZGF0YS12LThiNGNkYTY2XXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2ZsZXg6MTtwYWRkaW5nOjEzcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnR9Lnd2LW5hdmJhcl9faXRlbS53di1uYXZiYXJfX2l0ZW1fb25bZGF0YS12LThiNGNkYTY2XXtib3JkZXItYm90dG9tOjNweCBzb2xpZCByZWR9Lnd2LW5hdmJhcltkYXRhLXYtNDBmMGE1ZWJde2Rpc3BsYXk6ZmxleDt3aWR0aDoxMDAlO3otaW5kZXg6NTAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9QGZvbnQtZmFjZXtmb250LWZhbWlseTppY29uZm9udDtzcmM6dXJsKGRhdGE6YXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3Q7YmFzZTY0LDBoc0FBTGdhQUFBQkFBSUFBQUFBQUFJQUJnTUFBQUFBQUFBQkFQUUJBQUFBQUV4UUFRQUFBQUFBQUJBQUFBQUFBQUFBQUFFQUFBQUFBQUFBeUNyalpBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFhUUJqQUc4QWJnQm1BRzhBYmdCMEFBQUFEQUJOQUdVQVpBQnBBSFVBYlFBQUFJb0FWZ0JsQUhJQWN3QnBBRzhBYmdBZ0FERUFMZ0F3QURzQUlBQjBBSFFBWmdCaEFIVUFkQUJ2QUdnQWFRQnVBSFFBSUFBb0FIWUFNQUF1QURrQU5BQXBBQ0FBTFFCc0FDQUFPQUFnQUMwQWNnQWdBRFVBTUFBZ0FDMEFSd0FnQURJQU1BQXdBQ0FBTFFCNEFDQUFNUUEwQUNBQUxRQjNBQ0FBSWdCSEFDSUFJQUF0QUdZQUlBQXRBSE1BQUFBUUFHa0FZd0J2QUc0QVpnQnZBRzRBZEFBQUFBQUFBQUVBQUFBUUFRQUFCQUFBUmtaVVRYZHJBMUFBQUFFTUFBQUFIRWRFUlVZQU5RQUdBQUFCS0FBQUFDQlBVeTh5VjFSYkZBQUFBVWdBQUFCV1kyMWhjTkZBMDhJQUFBR2dBQUFCYW1OMmRDQU5aZjcwQUFBUVpBQUFBQ1JtY0dkdE1QZWVsUUFBRUlnQUFBbVdaMkZ6Y0FBQUFCQUFBQkJjQUFBQUNHZHNlV1lzaWcydEFBQUREQUFBQ2g1b1pXRmtEa3lrZlFBQURTd0FBQUEyYUdobFlRZmVBNFlBQUExa0FBQUFKR2h0ZEhnTmJBQlFBQUFOaUFBQUFCcHNiMk5oQ0pzRWhnQUFEYVFBQUFBU2JXRjRjQUhiQ3J3QUFBMjRBQUFBSUc1aGJXVU5MY2NWQUFBTjJBQUFBaXR3YjNOMG5LTVlRd0FBRUFRQUFBQlhjSEpsY0tXNXZtWUFBQm9nQUFBQWxRQUFBQUVBQUFBQXpEMml6d0FBQUFEVmxyQkFBQUFBQU5XV3NFQUFBUUFBQUE0QUFBQVlBQUFBQUFBQ0FBRUFBd0FIQUFFQUJBQUFBQUlBQUFBQkEvc0I5QUFGQUFnQ21RTE1BQUFBandLWkFzd0FBQUhyQURNQkNRQUFBZ0FHQXdBQUFBQUFBQUFBQUFFUUFBQUFBQUFBQUFBQUFBQlFaa1ZrQUVBQWVPZ0dBNEQvZ0FCY0E0QUFnQUFBQUFFQUFBQUFBQUFBQUFBREFBQUFBd0FBQUJ3QUFRQUFBQUFBWkFBREFBRUFBQUFjQUFRQVNBQUFBQTRBQ0FBQ0FBWUFBQUI0NWovbkl1ZnA2QWIvL3dBQUFBQUFlT1kvNXlMbjZlZ0cvLzhBQVArTEdjZ1k0eGdiR0FBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkJnQUFBUUFBQUFBQUFBQUJBZ0FBQUFJQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBVUFMUC9oQTd3REdBQVdBREFBT2dCU0FGNEJkMHV3RTFCWVFFb0NBUUFORGcwQURtWUFBdzRCRGdOZUFBRUlDQUZjRUFFSkNBb0dDVjRSQVF3R0JBWU1YZ0FMQkF0cER3RUlBQVlNQ0FaWUFBb0hCUUlFQ3dvRVdSSUJEZzROVVFBTkRRb09RaHRMc0JkUVdFQkxBZ0VBRFE0TkFBNW1BQU1PQVE0RFhnQUJDQWdCWEJBQkNRZ0tDQWtLWmhFQkRBWUVCZ3hlQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDRzB1d0dGQllRRXdDQVFBTkRnMEFEbVlBQXc0QkRnTmVBQUVJQ0FGY0VBRUpDQW9JQ1FwbUVRRU1CZ1FHREFSbUFBc0VDMmtQQVFnQUJnd0lCbGdBQ2djRkFnUUxDZ1JaRWdFT0RnMVJBQTBOQ2c1Q0cwQk9BZ0VBRFE0TkFBNW1BQU1PQVE0REFXWUFBUWdPQVFoa0VBRUpDQW9JQ1FwbUVRRU1CZ1FHREFSbUFBc0VDMmtQQVFnQUJnd0lCbGdBQ2djRkFnUUxDZ1JaRWdFT0RnMVJBQTBOQ2c1Q1dWbFpRQ2hUVXpzN01qRVhGMU5lVTE1YldEdFNPMUpMUXpjMU1Ub3lPaGN3RnpCUkVURVlFU2dWUUJNV0t3RUdLd0VpRGdJZEFTRTFOQ1kxTkM0Q0t3RVZJUVVWRkJZVURnSWpCaVlyQVNjaEJ5c0JJaWNpTGdJOUFSY2lCaFFXTXpJMk5DWVhCZ2NPQXg0Qk93WXlOaWN1QVNjbUp3RTFORDRDT3dFeUZoMEJBUmtiR2xNU0pSd1NBNUFCQ2hnbkhvWCtTZ0tpQVJVZkl3NE9IdzRnTGY1SkxCMGlGQmtaSUJNSWR3d1NFZ3dORWhLTUNBWUZDd1FDQkE4T0pVTlJVRUFrRnhZSkJRa0ZCUWIrcEFVUEdoVzhIeWtDSHdFTUdTY2FUQ2tRSEFRTklCc1NZWWcwRnpvNkpSY0pBUUdBZ0FFVEd5QU9wejhSR2hFUkdoRjhHaFlUSkE0UURRZ1lHZzBqRVJNVUFYZmtDeGdUREIwbTR3QUFBZ0FBLzRBRUFBT0FBQlFBS2dCQ1FEOEFCUUVDQVFVQ1pnQUNCQUVDQkdRR0FRQUFBUVVBQVZrQUJBTURCRTBBQkFRRFVRY0JBd1FEUlJZVkFRQWxKQjhkRlNvV0tnOE9DZ2dBRkFFVUNBNHJBU0lPQWdjK0FqTXlFaFVVRmpJMk5UUXVBUU15UGdJM0RnSWpJaTRCTlRRbUlnWVZGQjRCQWdCbnU0bFNBd053dm0rczlEaFFPSW5zaTJlN2lWSURBM0MrYjNIQWJ6aFFPSW5zQTRCUGhybG1kOGwwL3ZxNktEZzRLSXZzaWZ3QVQ0YTVabmZKZEhqT2VpZzRPQ2lMN0lrQUFBSUFILyt2QkFBRGNRQTJBR1FBUFVBNlhWdzJOUUFGQWdRQlFHSUJBZ0UvQUFJRUF3UUNBMllBQUFBRUFnQUVXUUFEQVFFRFRRQURBd0ZSQUFFREFVVlVVa0U5TVM0bElVZ0ZEeXNCTGdFbkxnRW5MZ0VqSWlNT0FRY09BUWNPQVJVVUZSNEJGeDRCRng0QkZ4NEJNekl6TmpjK0FUYytBVGMyTnpJek1qWTFORFV4QndZSEJnY09BU01pSXk0Qkp5NEJKeTRCTlRRMk56WTNOamMrQVRNeUZoY1dGeFlYRmdjeEZCVVVGaGNHQndRQUFscy9IV0VuSkdvbUJnVlV5em9jUEE0T0V3RVhFQkErSEJ4YkpDSmlKQVlGWEZRalZSb2FPQTRUQndJQ0dpWm1JMEEvVVI5Y0lnVUZTYkF6R0RRTURCQVZEaUU4T2tzZFZSOGpYeUJITmpZY0d3SWhHQWtXQVlCWDBUd2RQZzhPRkFKWVBSMWRKaU5tSlFZRkoyc2tKRmtiR3prT0RoSUNKUTg4SEJ0WEl6STJKUnNDQTZwUVBUMGZEQkVDVFRVWlVpQWVXQ0VrWWlKS09UZ2NDeEFVRGlBNU9FaElUUU1DR0NVRE5ERUFBQUFBQ0FBay82UUQzQU9BQUFrQUVRQVpBQ01BS3dBekFEc0FSd0JTUUU4QURRQU1DQTBNV1FBSkFBZ09DUWhaQ3dFRkNnRUVBUVVFV1FjQkFRWUJBQUlCQUZrQUF3QUNBd0pWQUE0T0QxRUFEdzhLRGtKR1JFQStPem8zTmpNeUx5NHJLaFFUSXhNVEV4TVVJaEFYS3lRVUJpTWlKalUwTmpJRUZBWWlKalEyTWdBVUJpSW1ORFl5QVJRR0l5SW1ORFl5RmdBVUJpSW1ORFl5QUJRR0lpWTBOaklBRkFZaUpqUTJNZ1VVQmlNaUpqVTBOak15RmdFdEt4OGRMQ3M5QVVjclBDc3JQUDZaS3owcUtqMEMyaXdkSHlzclBTdjkyVFpMTmpaTEF0SXFQU3NyUGY2OVFGeEFRRndCYjB3ME5rcEtOalJNZ2owckxCMGZLNkU5S2lvOUt3Rm5QQ3NyUEN2K21oMHNLejByS3dKQVN6WTJTemIrcGp3ckt6d3JBWGRiUUVCYlFPTTJTa28yTkV4TUFBQUFBQXdBRC8rYkE5NERmQUFOQUJzQUxnQkFBRk1BWlFCeEFIMEFrQUNoQUxRQXhRSXN0MVFCRHk4QkNRSS9TN0FrVUZoQWtnQU5JQm9nRFJwbUFCb0FJQm9BWkNFQkh3QUdBQjhHWmlRSUFnWVpBQVlaWkFBZEVBb1FIUXBtQUFvRUVBb0VaQkVCRHdRV0JBOFdaaWNZQWhZSkJCWUpaQUFCSWdJQ0FCOEJBRmtBQnc0QkRCTUhERmtBRlNZQkZCSVZGRm9BRXlVQkVoY1RFbG9BQkNNRkFnTUVBMVViQVJrWklGRUFJQ0FLUVFBUUVBbFJDd0VKQ1F0QkFCY1hIRkVlQVJ3Y0N4eENHMHV3TWxCWVFKQUFEU0FhSUEwYVpnQWFBQ0FhQUdRaEFSOEFCZ0FmQm1Za0NBSUdHUUFHR1dRQUhSQUtFQjBLWmdBS0JCQUtCR1FSQVE4RUZnUVBGbVluR0FJV0NRUVdDV1FBQVNJQ0FnQWZBUUJaQUFjT0FRd1RCd3haQUJVbUFSUVNGUlJhQUJNbEFSSVhFeEphQUJjZUFSd0RGeHhaQUFRakJRSURCQU5WR3dFWkdTQlJBQ0FnQ2tFQUVCQUpVUXNCQ1FrTENVSWJRSTRBRFNBYUlBMGFaZ0FhQUNBYUFHUWhBUjhBQmdBZkJtWWtDQUlHR1FBR0dXUUFIUkFLRUIwS1pnQUtCQkFLQkdRUkFROEVGZ1FQRm1ZbkdBSVdDUVFXQ1dRQUFTSUNBZ0FmQVFCWkFDQWJBUmtNSUJsWkFBY09BUXdUQnd4WkFCVW1BUlFTRlJSYUFCTWxBUklYRXhKYUFCY2VBUndERnh4WkFBUWpCUUlEQkFOVkFCQVFDVkVMQVFrSkN3bENXVmxBWEg1K2RISm9aaHdjRGc0QUFNWEV2cnkydGJTenJLcWpvcUdnbXBpU2tYNlFmcENKaDRCL2VuZHlmWFI5Ym10bWNXaHhaV1JlWEZaVlUxSkxTVUpCUUQ4NU56RXdIQzRjTGljbEhoME9HdzRiRmhVUUR3QU5BQTBWRVNnUUt3RXhJaVk5QVRRMk1oWWRBUlFHQXpFaUpqMEJORFl5RmgwQkZBWURNU0ltTHdFbU5UUTJNeklXSHdFV0ZSUUdBVEVpTHdFbU5UUTJNeklmQVJZVkZBWWpBU0l2QVM0Qk5UUTJNeklmQVI0QkZSUUdJd0V4SWk4QkpqVTBOak15SHdFV0ZSUUdJeVVqSWlZME5qc0JNaFlVQmlVaklpWTBOanNCTWhZVUJnVXhJaVkxTkRZL0FUWXpNaFlWRkFZUEFRWUJJaVkxTkQ4Qk5qTXlGaFVVRHdFR0l3RWlKalUwUHdFK0FUTXlGaFVVRHdFT0FTTUJJaVkxTkQ4Qk5qTXlGaFVVRHdFR0l3SUFHU01qTWlNakdROFdGaDRXRnBVT0hBZFpCeUVYRFJ3SFdRZ2hBVThVQ1ZvRUV3NFVDVm9FRXc3K053NE1td3NQSHhVT0RKd0tFQjhXQW0wSUI1c1BFUTBJQjVzUEVnejliN01VSEJ3VXN4UWRIUUs1c3cwUkVRMnpEQklTL0xBU0dnMEptd29NRXhvTkNac0xBbUVORVErYkJnZ01FZzZiQndqK054RVlCbGtGRlFrUkdBVlpCUlVLQVdZTUVnUmFDUkVNRWdSYUNCSUNVU01ac3hnakl4aXpHU1A5U2hZUHN4QVdGaEN6RHhZQ2xoQU1td3dPRnlFUEM1c05EeGdnL2FvUm13Y0pEaFFSbXdnSkRoTUI5d2RhQmhvTkZSOEhXZ1lhRFJVZi9yQUVXZ2dTREJJRVdna1JEQkxPSENnY0hDZ2NFaElZRWhJWUV1OGJFZ3NYQlZrR0doSUxGd1ZhQmdGMUVnd1JDVm9ERVEwUUNWb0UvZXNZRVFzS213Z0xHQkVLQ1pzSkRBSjRFUTBJQjVzUEVnd0lCNXNQQUFBQUFBRUFBQUFCQUFCazR5cklYdzg4OVFBTEJBQUFBQUFBMVphd1FBQUFBQURWbHJCQUFBRC9nQVFBQTRBQUFBQUlBQUlBQUFBQUFBQUFBUUFBQTREL2dBQmNCQUFBQUFBQUJBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBVUVBQUFBQUFBQUFBRlZBQUFENlFBc0JBQUFBQUFmQUNRQUR3QUFBQUFBQUFBQUFBQUJQQUdlQWxBQzZBVVBBQUFBQVFBQUFBZ0F4Z0FNQUFBQUFBQUNBRkFBWGdCc0FBQUJDZ21XQUFBQUFBQUFBQXdBbGdBQkFBQUFBQUFCQUFnQUFBQUJBQUFBQUFBQ0FBWUFDQUFCQUFBQUFBQURBQ1FBRGdBQkFBQUFBQUFFQUFnQU1nQUJBQUFBQUFBRkFFVUFPZ0FCQUFBQUFBQUdBQWdBZndBREFBRUVDUUFCQUJBQWh3QURBQUVFQ1FBQ0FBd0Fsd0FEQUFFRUNRQURBRWdBb3dBREFBRUVDUUFFQUJBQTZ3QURBQUVFQ1FBRkFJb0Erd0FEQUFFRUNRQUdBQkFCaFdsamIyNW1iMjUwVFdWa2FYVnRSbTl1ZEVadmNtZGxJREl1TUNBNklHbGpiMjVtYjI1MElEb2dNakV0TnkweU1ERTNhV052Ym1admJuUldaWEp6YVc5dUlERXVNRHNnZEhSbVlYVjBiMmhwYm5RZ0tIWXdMamswS1NBdGJDQTRJQzF5SURVd0lDMUhJREl3TUNBdGVDQXhOQ0F0ZHlBaVJ5SWdMV1lnTFhOcFkyOXVabTl1ZEFCcEFHTUFid0J1QUdZQWJ3QnVBSFFBVFFCbEFHUUFhUUIxQUcwQVJnQnZBRzRBZEFCR0FHOEFjZ0JuQUdVQUlBQXlBQzRBTUFBZ0FEb0FJQUJwQUdNQWJ3QnVBR1lBYndCdUFIUUFJQUE2QUNBQU1nQXhBQzBBTndBdEFESUFNQUF4QURjQWFRQmpBRzhBYmdCbUFHOEFiZ0IwQUZZQVpRQnlBSE1BYVFCdkFHNEFJQUF4QUM0QU1BQTdBQ0FBZEFCMEFHWUFZUUIxQUhRQWJ3Qm9BR2tBYmdCMEFDQUFLQUIyQURBQUxnQTVBRFFBS1FBZ0FDMEFiQUFnQURnQUlBQXRBSElBSUFBMUFEQUFJQUF0QUVjQUlBQXlBREFBTUFBZ0FDMEFlQUFnQURFQU5BQWdBQzBBZHdBZ0FDSUFSd0FpQUNBQUxRQm1BQ0FBTFFCekFHa0FZd0J2QUc0QVpnQnZBRzRBZEFBQUFnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFJQUFBQUFRQUNBRnNCQWdFREFRUUJCUWh6Y0dsdWJtVnlPUWx6Y0dsdWJtVnlMVEVJYzNCcGJtNWxjakVJYzNCcGJtNWxjaklBQUFFQUFmLy9BQThBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRElBTWdNWS8rRURnUCtBQXhqLzRRT0EvNEN3QUN5d0lHQm1MYkFCTENCa0lMREFVTEFFSmxxd0JFVmJXQ0VqSVJ1S1dDQ3dVRkJZSWJCQVdSc2dzRGhRV0NHd09GbFpJTEFLUldGa3NDaFFXQ0d3Q2tVZ3NEQlFXQ0d3TUZrYklMREFVRmdnWmlDS2ltRWdzQXBRV0dBYklMQWdVRmdoc0FwZ0d5Q3dObEJZSWJBMllCdGdXVmxaRzdBQUsxbFpJN0FBVUZobFdWa3RzQUlzSUVVZ3NBUWxZV1Fnc0FWRFVGaXdCU05Dc0FZalFoc2hJVm13QVdBdHNBTXNJeUVqSVNCa3NRVmlRaUN3QmlOQ3Nnb0FBaW9oSUxBR1F5Q0tJSXF3QUN1eE1BVWxpbEZZWUZBYllWSlpXQ05aSVNDd1FGTllzQUFyR3lHd1FGa2pzQUJRV0dWWkxiQUVMTEFJSTBLd0J5TkNzQUFqUXJBQVE3QUhRMUZZc0FoREs3SUFBUUJEWUVLd0ZtVWNXUzJ3QlN5d0FFTWdSU0N3QWtWanNBRkZZbUJFTGJBR0xMQUFReUJGSUxBQUt5T3hCQVFsWUNCRmlpTmhJR1Fnc0NCUVdDR3dBQnV3TUZCWXNDQWJzRUJaV1NPd0FGQllaVm13QXlVallVUkVMYkFITExFRkJVV3dBV0ZFTGJBSUxMQUJZQ0Fnc0FwRFNyQUFVRmdnc0FvalFsbXdDME5Lc0FCU1dDQ3dDeU5DV1Myd0NTd2d1QVFBWWlDNEJBQmppaU5oc0F4RFlDQ0tZQ0N3RENOQ0l5MndDaXhMVkZpeEJ3RkVXU1N3RFdVamVDMndDeXhMVVZoTFUxaXhCd0ZFV1JzaFdTU3dFMlVqZUMyd0RDeXhBQTFEVlZpeERRMURzQUZoUXJBSksxbXdBRU93QWlWQ3NnQUJBRU5nUXJFS0FpVkNzUXNDSlVLd0FSWWpJTEFESlZCWXNBQkRzQVFsUW9xS0lJb2pZYkFJS2lFanNBRmhJSW9qWWJBSUtpRWJzQUJEc0FJbFFyQUNKV0d3Q0NvaFdiQUtRMGV3QzBOSFlMQ0FZaUN3QWtWanNBRkZZbUN4QUFBVEkwU3dBVU93QUQ2eUFRRUJRMkJDTGJBTkxMRUFCVVZVV0FDd0RTTkNJR0N3QVdHMURnNEJBQXdBUWtLS1lMRU1CQ3V3YXlzYklsa3RzQTRzc1FBTkt5MndEeXl4QVEwckxiQVFMTEVDRFNzdHNCRXNzUU1OS3kyd0VpeXhCQTByTGJBVExMRUZEU3N0c0JRc3NRWU5LeTJ3RlN5eEJ3MHJMYkFXTExFSURTc3RzQmNzc1FrTkt5MndHQ3l3Qnl1eEFBVkZWRmdBc0EwalFpQmdzQUZodFE0T0FRQU1BRUpDaW1DeERBUXJzR3NyR3lKWkxiQVpMTEVBR0NzdHNCb3NzUUVZS3kyd0d5eXhBaGdyTGJBY0xMRURHQ3N0c0Iwc3NRUVlLeTJ3SGl5eEJSZ3JMYkFmTExFR0dDc3RzQ0Fzc1FjWUt5MndJU3l4Q0JnckxiQWlMTEVKR0NzdHNDTXNJR0N3RG1BZ1F5T3dBV0JEc0FJbHNBSWxVVmdqSUR5d0FXQWpzQkpsSEJzaElWa3RzQ1Fzc0NNcnNDTXFMYkFsTENBZ1J5QWdzQUpGWTdBQlJXSmdJMkU0SXlDS1ZWZ2dSeUFnc0FKRlk3QUJSV0pnSTJFNEd5RlpMYkFtTExFQUJVVlVXQUN3QVJhd0pTcXdBUlV3R3lKWkxiQW5MTEFISzdFQUJVVlVXQUN3QVJhd0pTcXdBUlV3R3lKWkxiQW9MQ0Exc0FGZ0xiQXBMQUN3QTBWanNBRkZZckFBSzdBQ1JXT3dBVVZpc0FBcnNBQVd0QUFBQUFBQVJENGpPTEVvQVJVcUxiQXFMQ0E4SUVjZ3NBSkZZN0FCUldKZ3NBQkRZVGd0c0Nzc0xoYzhMYkFzTENBOElFY2dzQUpGWTdBQlJXSmdzQUJEWWJBQlEyTTRMYkF0TExFQ0FCWWxJQzRnUjdBQUkwS3dBaVZKaW9wSEkwY2pZU0JZWWhzaFdiQUJJMEt5TEFFQkZSUXFMYkF1TExBQUZyQUVKYkFFSlVjalJ5TmhzQVpGSzJXS0xpTWdJRHlLT0Myd0x5eXdBQmF3QkNXd0JDVWdMa2NqUnlOaElMQUVJMEt3QmtVcklMQmdVRmdnc0VCUldMTUNJQU1nRzdNQ0pnTWFXVUpDSXlDd0NVTWdpaU5ISTBjallTTkdZTEFFUTdDQVltQWdzQUFySUlxS1lTQ3dBa05nWkNPd0EwTmhaRkJZc0FKRFlSdXdBME5nV2JBREpiQ0FZbUVqSUNDd0JDWWpSbUU0R3lPd0NVTkdzQUlsc0FsRFJ5TkhJMkZnSUxBRVE3Q0FZbUFqSUxBQUt5T3dCRU5nc0FBcnNBVWxZYkFGSmJDQVlyQUVKbUVnc0FRbFlHUWpzQU1sWUdSUVdDRWJJeUZaSXlBZ3NBUW1JMFpoT0ZrdHNEQXNzQUFXSUNBZ3NBVW1JQzVISTBjallTTThPQzJ3TVN5d0FCWWdzQWtqUWlBZ0lFWWpSN0FBS3lOaE9DMndNaXl3QUJhd0F5V3dBaVZISTBjalliQUFWRmd1SUR3aklSdXdBaVd3QWlWSEkwY2pZU0N3QlNXd0JDVkhJMGNqWWJBR0piQUZKVW13QWlWaHNBRkZZeU1nV0dJYklWbGpzQUZGWW1BakxpTWdJRHlLT0NNaFdTMndNeXl3QUJZZ3NBbERJQzVISTBjallTQmdzQ0JnWnJDQVlpTWdJRHlLT0Myd05Dd2pJQzVHc0FJbFJsSllJRHhaTHJFa0FSUXJMYkExTENNZ0xrYXdBaVZHVUZnZ1BGa3VzU1FCRkNzdHNEWXNJeUF1UnJBQ0pVWlNXQ0E4V1NNZ0xrYXdBaVZHVUZnZ1BGa3VzU1FCRkNzdHNEY3NzQzRySXlBdVJyQUNKVVpTV0NBOFdTNnhKQUVVS3kyd09DeXdMeXVLSUNBOHNBUWpRb280SXlBdVJyQUNKVVpTV0NBOFdTNnhKQUVVSzdBRVF5NndKQ3N0c0Rrc3NBQVdzQVFsc0FRbUlDNUhJMGNqWWJBR1JTc2pJRHdnTGlNNHNTUUJGQ3N0c0Rvc3NRa0VKVUt3QUJhd0JDV3dCQ1VnTGtjalJ5TmhJTEFFSTBLd0JrVXJJTEJnVUZnZ3NFQlJXTE1DSUFNZ0c3TUNKZ01hV1VKQ0l5QkhzQVJEc0lCaVlDQ3dBQ3NnaW9waElMQUNRMkJrSTdBRFEyRmtVRml3QWtOaEc3QURRMkJac0FNbHNJQmlZYkFDSlVaaE9DTWdQQ000R3lFZ0lFWWpSN0FBS3lOaE9DRlpzU1FCRkNzdHNEc3NzQzRyTHJFa0FSUXJMYkE4TExBdkt5RWpJQ0E4c0FRalFpTTRzU1FCRkN1d0JFTXVzQ1FyTGJBOUxMQUFGU0JIc0FBalFySUFBUUVWRkJNdXNDb3FMYkErTExBQUZTQkhzQUFqUXJJQUFRRVZGQk11c0NvcUxiQS9MTEVBQVJRVHNDc3FMYkJBTExBdEtpMndRU3l3QUJaRkl5QXVJRWFLSTJFNHNTUUJGQ3N0c0VJc3NBa2pRckJCS3kyd1F5eXlBQUE2S3kyd1JDeXlBQUU2S3kyd1JTeXlBUUE2S3kyd1JpeXlBUUU2S3kyd1J5eXlBQUE3S3kyd1NDeXlBQUU3S3kyd1NTeXlBUUE3S3kyd1NpeXlBUUU3S3kyd1N5eXlBQUEzS3kyd1RDeXlBQUUzS3kyd1RTeXlBUUEzS3kyd1RpeXlBUUUzS3kyd1R5eXlBQUE1S3kyd1VDeXlBQUU1S3kyd1VTeXlBUUE1S3kyd1VpeXlBUUU1S3kyd1V5eXlBQUE4S3kyd1ZDeXlBQUU4S3kyd1ZTeXlBUUE4S3kyd1ZpeXlBUUU4S3kyd1Z5eXlBQUE0S3kyd1dDeXlBQUU0S3kyd1dTeXlBUUE0S3kyd1dpeXlBUUU0S3kyd1d5eXdNQ3N1c1NRQkZDc3RzRndzc0RBcnNEUXJMYkJkTExBd0s3QTFLeTJ3WGl5d0FCYXdNQ3V3TmlzdHNGOHNzREVyTHJFa0FSUXJMYkJnTExBeEs3QTBLeTJ3WVN5d01TdXdOU3N0c0dJc3NERXJzRFlyTGJCakxMQXlLeTZ4SkFFVUt5MndaQ3l3TWl1d05Dc3RzR1Vzc0RJcnNEVXJMYkJtTExBeUs3QTJLeTJ3Wnl5d015c3VzU1FCRkNzdHNHZ3NzRE1yc0RRckxiQnBMTEF6SzdBMUt5MndhaXl3TXl1d05pc3RzR3NzSzdBSVpiQURKRkI0c0FFVk1DMEFBRXU0QU1oU1dMRUJBWTVadVFnQUNBQmpJTEFCSTBRZ3NBTWpjTEFPUlNBZ1M3Z0FEbEZMc0FaVFdsaXdOQnV3S0ZsZ1ppQ0tWVml3QWlWaHNBRkZZeU5pc0FJalJMTUtDUVVFSzdNS0N3VUVLN01PRHdVRUsxbXlCQ2dKUlZKRXN3b05CZ1Fyc1FZQlJMRWtBWWhSV0xCQWlGaXhCZ05Fc1NZQmlGRll1QVFBaUZpeEJnRkVXVmxaV2JnQi80V3dCSTJ4QlFCRUFBQUEpO3NyYzp1cmwoZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdDtiYXNlNjQsMGhzQUFMZ2FBQUFCQUFJQUFBQUFBQUlBQmdNQUFBQUFBQUFCQVBRQkFBQUFBRXhRQVFBQUFBQUFBQkFBQUFBQUFBQUFBQUVBQUFBQUFBQUF5Q3JqWkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQWFRQmpBRzhBYmdCbUFHOEFiZ0IwQUFBQURBQk5BR1VBWkFCcEFIVUFiUUFBQUlvQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBRHNBSUFCMEFIUUFaZ0JoQUhVQWRBQnZBR2dBYVFCdUFIUUFJQUFvQUhZQU1BQXVBRGtBTkFBcEFDQUFMUUJzQUNBQU9BQWdBQzBBY2dBZ0FEVUFNQUFnQUMwQVJ3QWdBRElBTUFBd0FDQUFMUUI0QUNBQU1RQTBBQ0FBTFFCM0FDQUFJZ0JIQUNJQUlBQXRBR1lBSUFBdEFITUFBQUFRQUdrQVl3QnZBRzRBWmdCdkFHNEFkQUFBQUFBQUFBRUFBQUFRQVFBQUJBQUFSa1pVVFhkckExQUFBQUVNQUFBQUhFZEVSVVlBTlFBR0FBQUJLQUFBQUNCUFV5OHlWMVJiRkFBQUFVZ0FBQUJXWTIxaGNORkEwOElBQUFHZ0FBQUJhbU4yZENBTlpmNzBBQUFRWkFBQUFDUm1jR2R0TVBlZWxRQUFFSWdBQUFtV1oyRnpjQUFBQUJBQUFCQmNBQUFBQ0dkc2VXWXNpZzJ0QUFBRERBQUFDaDVvWldGa0RreWtmUUFBRFN3QUFBQTJhR2hsWVFmZUE0WUFBQTFrQUFBQUpHaHRkSGdOYkFCUUFBQU5pQUFBQUJwc2IyTmhDSnNFaGdBQURhUUFBQUFTYldGNGNBSGJDcndBQUEyNEFBQUFJRzVoYldVTkxjY1ZBQUFOMkFBQUFpdHdiM04wbktNWVF3QUFFQVFBQUFCWGNISmxjS1c1dm1ZQUFCb2dBQUFBbFFBQUFBRUFBQUFBekQyaXp3QUFBQURWbHJCQUFBQUFBTldXc0VBQUFRQUFBQTRBQUFBWUFBQUFBQUFDQUFFQUF3QUhBQUVBQkFBQUFBSUFBQUFCQS9zQjlBQUZBQWdDbVFMTUFBQUFqd0taQXN3QUFBSHJBRE1CQ1FBQUFnQUdBd0FBQUFBQUFBQUFBQUVRQUFBQUFBQUFBQUFBQUFCUVprVmtBRUFBZU9nR0E0RC9nQUJjQTRBQWdBQUFBQUVBQUFBQUFBQUFBQUFEQUFBQUF3QUFBQndBQVFBQUFBQUFaQUFEQUFFQUFBQWNBQVFBU0FBQUFBNEFDQUFDQUFZQUFBQjQ1ai9uSXVmcDZBYi8vd0FBQUFBQWVPWS81eUxuNmVnRy8vOEFBUCtMR2NnWTR4Z2JHQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQmdBQUFRQUFBQUFBQUFBQkFnQUFBQUlBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFVQUxQL2hBN3dER0FBV0FEQUFPZ0JTQUY0QmQwdXdFMUJZUUVvQ0FRQU5EZzBBRG1ZQUF3NEJEZ05lQUFFSUNBRmNFQUVKQ0FvR0NWNFJBUXdHQkFZTVhnQUxCQXRwRHdFSUFBWU1DQVpZQUFvSEJRSUVDd29FV1JJQkRnNE5VUUFORFFvT1FodExzQmRRV0VCTEFnRUFEUTROQUE1bUFBTU9BUTREWGdBQkNBZ0JYQkFCQ1FnS0NBa0taaEVCREFZRUJneGVBQXNFQzJrUEFRZ0FCZ3dJQmxnQUNnY0ZBZ1FMQ2dSWkVnRU9EZzFSQUEwTkNnNUNHMHV3R0ZCWVFFd0NBUUFORGcwQURtWUFBdzRCRGdOZUFBRUlDQUZjRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDRzBCT0FnRUFEUTROQUE1bUFBTU9BUTREQVdZQUFRZ09BUWhrRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDV1ZsWlFDaFRVenM3TWpFWEYxTmVVMTViV0R0U08xSkxRemMxTVRveU9oY3dGekJSRVRFWUVTZ1ZRQk1XS3dFR0t3RWlEZ0lkQVNFMU5DWTFOQzRDS3dFVklRVVZGQllVRGdJakJpWXJBU2NoQnlzQklpY2lMZ0k5QVJjaUJoUVdNekkyTkNZWEJnY09BeDRCT3dZeU5pY3VBU2NtSndFMU5ENENPd0V5RmgwQkFSa2JHbE1TSlJ3U0E1QUJDaGduSG9YK1NnS2lBUlVmSXc0T0h3NGdMZjVKTEIwaUZCa1pJQk1JZHd3U0Vnd05FaEtNQ0FZRkN3UUNCQThPSlVOUlVFQWtGeFlKQlFrRkJRYitwQVVQR2hXOEh5a0NId0VNR1NjYVRDa1FIQVFOSUJzU1lZZzBGem82SlJjSkFRR0FnQUVUR3lBT3B6OFJHaEVSR2hGOEdoWVRKQTRRRFFnWUdnMGpFUk1VQVhma0N4Z1REQjBtNHdBQUFnQUEvNEFFQUFPQUFCUUFLZ0JDUUQ4QUJRRUNBUVVDWmdBQ0JBRUNCR1FHQVFBQUFRVUFBVmtBQkFNREJFMEFCQVFEVVFjQkF3UURSUllWQVFBbEpCOGRGU29XS2c4T0NnZ0FGQUVVQ0E0ckFTSU9BZ2MrQWpNeUVoVVVGakkyTlRRdUFRTXlQZ0kzRGdJaklpNEJOVFFtSWdZVkZCNEJBZ0JudTRsU0F3Tnd2bStzOURoUU9JbnNpMmU3aVZJREEzQytiM0hBYnpoUU9JbnNBNEJQaHJsbWQ4bDAvdnE2S0RnNEtJdnNpZndBVDRhNVpuZkpkSGpPZWlnNE9DaUw3SWtBQUFJQUgvK3ZCQUFEY1FBMkFHUUFQVUE2WFZ3Mk5RQUZBZ1FCUUdJQkFnRS9BQUlFQXdRQ0EyWUFBQUFFQWdBRVdRQURBUUVEVFFBREF3RlJBQUVEQVVWVVVrRTlNUzRsSVVnRkR5c0JMZ0VuTGdFbkxnRWpJaU1PQVFjT0FRY09BUlVVRlI0QkZ4NEJGeDRCRng0Qk16SXpOamMrQVRjK0FUYzJOekl6TWpZMU5EVXhCd1lIQmdjT0FTTWlJeTRCSnk0Qkp5NEJOVFEyTnpZM05qYytBVE15RmhjV0Z4WVhGZ2N4RkJVVUZoY0dCd1FBQWxzL0hXRW5KR29tQmdWVXl6b2NQQTRPRXdFWEVCQStIQnhiSkNKaUpBWUZYRlFqVlJvYU9BNFRCd0lDR2labUkwQS9VUjljSWdVRlNiQXpHRFFNREJBVkRpRThPa3NkVlI4alh5QkhOalljR3dJaEdBa1dBWUJYMFR3ZFBnOE9GQUpZUFIxZEppTm1KUVlGSjJza0pGa2JHemtPRGhJQ0pRODhIQnRYSXpJMkpSc0NBNnBRUFQwZkRCRUNUVFVaVWlBZVdDRWtZaUpLT1RnY0N4QVVEaUE1T0VoSVRRTUNHQ1VETkRFQUFBQUFDQUFrLzZRRDNBT0FBQWtBRVFBWkFDTUFLd0F6QURzQVJ3QlNRRThBRFFBTUNBME1XUUFKQUFnT0NRaFpDd0VGQ2dFRUFRVUVXUWNCQVFZQkFBSUJBRmtBQXdBQ0F3SlZBQTRPRDFFQUR3OEtEa0pHUkVBK096bzNOak15THk0cktoUVRJeE1URXhNVUloQVhLeVFVQmlNaUpqVTBOaklFRkFZaUpqUTJNZ0FVQmlJbU5EWXlBUlFHSXlJbU5EWXlGZ0FVQmlJbU5EWXlBQlFHSWlZME5qSUFGQVlpSmpRMk1nVVVCaU1pSmpVME5qTXlGZ0V0S3g4ZExDczlBVWNyUENzclBQNlpLejBxS2owQzJpd2RIeXNyUFN2OTJUWkxOalpMQXRJcVBTc3JQZjY5UUZ4QVFGd0JiMHcwTmtwS05qUk1najByTEIwZks2RTlLaW85S3dGblBDc3JQQ3YrbWgwc0t6MHJLd0pBU3pZMlN6YitwandyS3p3ckFYZGJRRUJiUU9NMlNrbzJORXhNQUFBQUFBd0FELytiQTk0RGZBQU5BQnNBTGdCQUFGTUFaUUJ4QUgwQWtBQ2hBTFFBeFFJc3QxUUJEeThCQ1FJL1M3QWtVRmhBa2dBTklCb2dEUnBtQUJvQUlCb0FaQ0VCSHdBR0FCOEdaaVFJQWdZWkFBWVpaQUFkRUFvUUhRcG1BQW9FRUFvRVpCRUJEd1FXQkE4V1ppY1lBaFlKQkJZSlpBQUJJZ0lDQUI4QkFGa0FCdzRCREJNSERGa0FGU1lCRkJJVkZGb0FFeVVCRWhjVEVsb0FCQ01GQWdNRUExVWJBUmtaSUZFQUlDQUtRUUFRRUFsUkN3RUpDUXRCQUJjWEhGRWVBUndjQ3h4Q0cwdXdNbEJZUUpBQURTQWFJQTBhWmdBYUFDQWFBR1FoQVI4QUJnQWZCbVlrQ0FJR0dRQUdHV1FBSFJBS0VCMEtaZ0FLQkJBS0JHUVJBUThFRmdRUEZtWW5HQUlXQ1FRV0NXUUFBU0lDQWdBZkFRQlpBQWNPQVF3VEJ3eFpBQlVtQVJRU0ZSUmFBQk1sQVJJWEV4SmFBQmNlQVJ3REZ4eFpBQVFqQlFJREJBTlZHd0VaR1NCUkFDQWdDa0VBRUJBSlVRc0JDUWtMQ1VJYlFJNEFEU0FhSUEwYVpnQWFBQ0FhQUdRaEFSOEFCZ0FmQm1Za0NBSUdHUUFHR1dRQUhSQUtFQjBLWmdBS0JCQUtCR1FSQVE4RUZnUVBGbVluR0FJV0NRUVdDV1FBQVNJQ0FnQWZBUUJaQUNBYkFSa01JQmxaQUFjT0FRd1RCd3haQUJVbUFSUVNGUlJhQUJNbEFSSVhFeEphQUJjZUFSd0RGeHhaQUFRakJRSURCQU5WQUJBUUNWRUxBUWtKQ3dsQ1dWbEFYSDUrZEhKb1pod2NEZzRBQU1YRXZyeTJ0YlN6cktxam9xR2dtcGlTa1g2UWZwQ0poNEIvZW5keWZYUjlibXRtY1doeFpXUmVYRlpWVTFKTFNVSkJRRDg1TnpFd0hDNGNMaWNsSGgwT0d3NGJGaFVRRHdBTkFBMFZFU2dRS3dFeElpWTlBVFEyTWhZZEFSUUdBekVpSmowQk5EWXlGaDBCRkFZRE1TSW1Md0VtTlRRMk16SVdId0VXRlJRR0FURWlMd0VtTlRRMk16SWZBUllWRkFZakFTSXZBUzRCTlRRMk16SWZBUjRCRlJRR0l3RXhJaThCSmpVME5qTXlId0VXRlJRR0l5VWpJaVkwTmpzQk1oWVVCaVVqSWlZME5qc0JNaFlVQmdVeElpWTFORFkvQVRZek1oWVZGQVlQQVFZQklpWTFORDhCTmpNeUZoVVVEd0VHSXdFaUpqVTBQd0UrQVRNeUZoVVVEd0VPQVNNQklpWTFORDhCTmpNeUZoVVVEd0VHSXdJQUdTTWpNaU1qR1E4V0ZoNFdGcFVPSEFkWkJ5RVhEUndIV1FnaEFVOFVDVm9FRXc0VUNWb0VFdzcrTnc0TW13c1BIeFVPREp3S0VCOFdBbTBJQjVzUEVRMElCNXNQRWd6OWI3TVVIQndVc3hRZEhRSzVzdzBSRVEyekRCSVMvTEFTR2cwSm13b01FeG9OQ1pzTEFtRU5FUStiQmdnTUVnNmJCd2orTnhFWUJsa0ZGUWtSR0FWWkJSVUtBV1lNRWdSYUNSRU1FZ1JhQ0JJQ1VTTVpzeGdqSXhpekdTUDlTaFlQc3hBV0ZoQ3pEeFlDbGhBTW13d09GeUVQQzVzTkR4Z2cvYW9SbXdjSkRoUVJtd2dKRGhNQjl3ZGFCaG9ORlI4SFdnWWFEUlVmL3JBRVdnZ1NEQklFV2drUkRCTE9IQ2djSENnY0VoSVlFaElZRXU4YkVnc1hCVmtHR2hJTEZ3VmFCZ0YxRWd3UkNWb0RFUTBRQ1ZvRS9lc1lFUXNLbXdnTEdCRUtDWnNKREFKNEVRMElCNXNQRWd3SUI1c1BBQUFBQUFFQUFBQUJBQUJrNHlySVh3ODg5UUFMQkFBQUFBQUExWmF3UUFBQUFBRFZsckJBQUFEL2dBUUFBNEFBQUFBSUFBSUFBQUFBQUFBQUFRQUFBNEQvZ0FCY0JBQUFBQUFBQkFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFVRUFBQUFBQUFBQUFGVkFBQUQ2UUFzQkFBQUFBQWZBQ1FBRHdBQUFBQUFBQUFBQUFBQlBBR2VBbEFDNkFVUEFBQUFBUUFBQUFnQXhnQU1BQUFBQUFBQ0FGQUFYZ0JzQUFBQkNnbVdBQUFBQUFBQUFBd0FsZ0FCQUFBQUFBQUJBQWdBQUFBQkFBQUFBQUFDQUFZQUNBQUJBQUFBQUFBREFDUUFEZ0FCQUFBQUFBQUVBQWdBTWdBQkFBQUFBQUFGQUVVQU9nQUJBQUFBQUFBR0FBZ0Fmd0FEQUFFRUNRQUJBQkFBaHdBREFBRUVDUUFDQUF3QWx3QURBQUVFQ1FBREFFZ0Fvd0FEQUFFRUNRQUVBQkFBNndBREFBRUVDUUFGQUlvQSt3QURBQUVFQ1FBR0FCQUJoV2xqYjI1bWIyNTBUV1ZrYVhWdFJtOXVkRVp2Y21kbElESXVNQ0E2SUdsamIyNW1iMjUwSURvZ01qRXROeTB5TURFM2FXTnZibVp2Ym5SV1pYSnphVzl1SURFdU1Ec2dkSFJtWVhWMGIyaHBiblFnS0hZd0xqazBLU0F0YkNBNElDMXlJRFV3SUMxSElESXdNQ0F0ZUNBeE5DQXRkeUFpUnlJZ0xXWWdMWE5wWTI5dVptOXVkQUJwQUdNQWJ3QnVBR1lBYndCdUFIUUFUUUJsQUdRQWFRQjFBRzBBUmdCdkFHNEFkQUJHQUc4QWNnQm5BR1VBSUFBeUFDNEFNQUFnQURvQUlBQnBBR01BYndCdUFHWUFid0J1QUhRQUlBQTZBQ0FBTWdBeEFDMEFOd0F0QURJQU1BQXhBRGNBYVFCakFHOEFiZ0JtQUc4QWJnQjBBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUFBN0FDQUFkQUIwQUdZQVlRQjFBSFFBYndCb0FHa0FiZ0IwQUNBQUtBQjJBREFBTGdBNUFEUUFLUUFnQUMwQWJBQWdBRGdBSUFBdEFISUFJQUExQURBQUlBQXRBRWNBSUFBeUFEQUFNQUFnQUMwQWVBQWdBREVBTkFBZ0FDMEFkd0FnQUNJQVJ3QWlBQ0FBTFFCbUFDQUFMUUJ6QUdrQVl3QnZBRzRBWmdCdkFHNEFkQUFBQWdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlBQUFBQVFBQ0FGc0JBZ0VEQVFRQkJRaHpjR2x1Ym1WeU9RbHpjR2x1Ym1WeUxURUljM0JwYm01bGNqRUljM0JwYm01bGNqSUFBQUVBQWYvL0FBOEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFESUFNZ01ZLytFRGdQK0FBeGovNFFPQS80Q3dBQ3l3SUdCbUxiQUJMQ0JrSUxEQVVMQUVKbHF3QkVWYldDRWpJUnVLV0NDd1VGQllJYkJBV1JzZ3NEaFFXQ0d3T0ZsWklMQUtSV0Zrc0NoUVdDR3dDa1Vnc0RCUVdDR3dNRmtiSUxEQVVGZ2daaUNLaW1FZ3NBcFFXR0FiSUxBZ1VGZ2hzQXBnR3lDd05sQllJYkEyWUJ0Z1dWbFpHN0FBSzFsWkk3QUFVRmhsV1ZrdHNBSXNJRVVnc0FRbFlXUWdzQVZEVUZpd0JTTkNzQVlqUWhzaElWbXdBV0F0c0FNc0l5RWpJU0Jrc1FWaVFpQ3dCaU5Dc2dvQUFpb2hJTEFHUXlDS0lJcXdBQ3V4TUFVbGlsRllZRkFiWVZKWldDTlpJU0N3UUZOWXNBQXJHeUd3UUZranNBQlFXR1ZaTGJBRUxMQUlJMEt3QnlOQ3NBQWpRckFBUTdBSFExRllzQWhESzdJQUFRQkRZRUt3Rm1VY1dTMndCU3l3QUVNZ1JTQ3dBa1Zqc0FGRlltQkVMYkFHTExBQVF5QkZJTEFBS3lPeEJBUWxZQ0JGaWlOaElHUWdzQ0JRV0NHd0FCdXdNRkJZc0NBYnNFQlpXU093QUZCWVpWbXdBeVVqWVVSRUxiQUhMTEVGQlVXd0FXRkVMYkFJTExBQllDQWdzQXBEU3JBQVVGZ2dzQW9qUWxtd0MwTktzQUJTV0NDd0N5TkNXUzJ3Q1N3Z3VBUUFZaUM0QkFCamlpTmhzQXhEWUNDS1lDQ3dEQ05DSXkyd0NpeExWRml4QndGRVdTU3dEV1VqZUMyd0N5eExVVmhMVTFpeEJ3RkVXUnNoV1NTd0UyVWplQzJ3REN5eEFBMURWVml4RFExRHNBRmhRckFKSzFtd0FFT3dBaVZDc2dBQkFFTmdRckVLQWlWQ3NRc0NKVUt3QVJZaklMQURKVkJZc0FCRHNBUWxRb3FLSUlvalliQUlLaUVqc0FGaElJb2pZYkFJS2lFYnNBQkRzQUlsUXJBQ0pXR3dDQ29oV2JBS1EwZXdDME5IWUxDQVlpQ3dBa1Zqc0FGRlltQ3hBQUFUSTBTd0FVT3dBRDZ5QVFFQlEyQkNMYkFOTExFQUJVVlVXQUN3RFNOQ0lHQ3dBV0cxRGc0QkFBd0FRa0tLWUxFTUJDdXdheXNiSWxrdHNBNHNzUUFOS3kyd0R5eXhBUTByTGJBUUxMRUNEU3N0c0JFc3NRTU5LeTJ3RWl5eEJBMHJMYkFUTExFRkRTc3RzQlFzc1FZTkt5MndGU3l4QncwckxiQVdMTEVJRFNzdHNCY3NzUWtOS3kyd0dDeXdCeXV4QUFWRlZGZ0FzQTBqUWlCZ3NBRmh0UTRPQVFBTUFFSkNpbUN4REFRcnNHc3JHeUpaTGJBWkxMRUFHQ3N0c0Jvc3NRRVlLeTJ3R3l5eEFoZ3JMYkFjTExFREdDc3RzQjBzc1FRWUt5MndIaXl4QlJnckxiQWZMTEVHR0NzdHNDQXNzUWNZS3kyd0lTeXhDQmdyTGJBaUxMRUpHQ3N0c0NNc0lHQ3dEbUFnUXlPd0FXQkRzQUlsc0FJbFVWZ2pJRHl3QVdBanNCSmxIQnNoSVZrdHNDUXNzQ01yc0NNcUxiQWxMQ0FnUnlBZ3NBSkZZN0FCUldKZ0kyRTRJeUNLVlZnZ1J5QWdzQUpGWTdBQlJXSmdJMkU0R3lGWkxiQW1MTEVBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBbkxMQUhLN0VBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBb0xDQTFzQUZnTGJBcExBQ3dBMFZqc0FGRllyQUFLN0FDUldPd0FVVmlzQUFyc0FBV3RBQUFBQUFBUkQ0ak9MRW9BUlVxTGJBcUxDQThJRWNnc0FKRlk3QUJSV0pnc0FCRFlUZ3RzQ3NzTGhjOExiQXNMQ0E4SUVjZ3NBSkZZN0FCUldKZ3NBQkRZYkFCUTJNNExiQXRMTEVDQUJZbElDNGdSN0FBSTBLd0FpVkppb3BISTBjallTQllZaHNoV2JBQkkwS3lMQUVCRlJRcUxiQXVMTEFBRnJBRUpiQUVKVWNqUnlOaHNBWkZLMldLTGlNZ0lEeUtPQzJ3THl5d0FCYXdCQ1d3QkNVZ0xrY2pSeU5oSUxBRUkwS3dCa1VySUxCZ1VGZ2dzRUJSV0xNQ0lBTWdHN01DSmdNYVdVSkNJeUN3Q1VNZ2lpTkhJMGNqWVNOR1lMQUVRN0NBWW1BZ3NBQXJJSXFLWVNDd0FrTmdaQ093QTBOaFpGQllzQUpEWVJ1d0EwTmdXYkFESmJDQVltRWpJQ0N3QkNZalJtRTRHeU93Q1VOR3NBSWxzQWxEUnlOSEkyRmdJTEFFUTdDQVltQWpJTEFBS3lPd0JFTmdzQUFyc0FVbFliQUZKYkNBWXJBRUptRWdzQVFsWUdRanNBTWxZR1JRV0NFYkl5RlpJeUFnc0FRbUkwWmhPRmt0c0RBc3NBQVdJQ0Fnc0FVbUlDNUhJMGNqWVNNOE9DMndNU3l3QUJZZ3NBa2pRaUFnSUVZalI3QUFLeU5oT0Myd01peXdBQmF3QXlXd0FpVkhJMGNqWWJBQVZGZ3VJRHdqSVJ1d0FpV3dBaVZISTBjallTQ3dCU1d3QkNWSEkwY2pZYkFHSmJBRkpVbXdBaVZoc0FGRll5TWdXR0liSVZsanNBRkZZbUFqTGlNZ0lEeUtPQ01oV1Myd015eXdBQllnc0FsRElDNUhJMGNqWVNCZ3NDQmdackNBWWlNZ0lEeUtPQzJ3TkN3aklDNUdzQUlsUmxKWUlEeFpMckVrQVJRckxiQTFMQ01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0RZc0l5QXVSckFDSlVaU1dDQThXU01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0Rjc3NDNHJJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLeTJ3T0N5d0x5dUtJQ0E4c0FRalFvbzRJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLN0FFUXk2d0pDc3RzRGtzc0FBV3NBUWxzQVFtSUM1SEkwY2pZYkFHUlNzaklEd2dMaU00c1NRQkZDc3RzRG9zc1FrRUpVS3dBQmF3QkNXd0JDVWdMa2NqUnlOaElMQUVJMEt3QmtVcklMQmdVRmdnc0VCUldMTUNJQU1nRzdNQ0pnTWFXVUpDSXlCSHNBUkRzSUJpWUNDd0FDc2dpb3BoSUxBQ1EyQmtJN0FEUTJGa1VGaXdBa05oRzdBRFEyQlpzQU1sc0lCaVliQUNKVVpoT0NNZ1BDTTRHeUVnSUVZalI3QUFLeU5oT0NGWnNTUUJGQ3N0c0Rzc3NDNHJMckVrQVJRckxiQThMTEF2S3lFaklDQThzQVFqUWlNNHNTUUJGQ3V3QkVNdXNDUXJMYkE5TExBQUZTQkhzQUFqUXJJQUFRRVZGQk11c0NvcUxiQStMTEFBRlNCSHNBQWpRcklBQVFFVkZCTXVzQ29xTGJBL0xMRUFBUlFUc0NzcUxiQkFMTEF0S2kyd1FTeXdBQlpGSXlBdUlFYUtJMkU0c1NRQkZDc3RzRUlzc0FralFyQkJLeTJ3UXl5eUFBQTZLeTJ3UkN5eUFBRTZLeTJ3UlN5eUFRQTZLeTJ3Uml5eUFRRTZLeTJ3Unl5eUFBQTdLeTJ3U0N5eUFBRTdLeTJ3U1N5eUFRQTdLeTJ3U2l5eUFRRTdLeTJ3U3l5eUFBQTNLeTJ3VEN5eUFBRTNLeTJ3VFN5eUFRQTNLeTJ3VGl5eUFRRTNLeTJ3VHl5eUFBQTVLeTJ3VUN5eUFBRTVLeTJ3VVN5eUFRQTVLeTJ3VWl5eUFRRTVLeTJ3VXl5eUFBQThLeTJ3VkN5eUFBRThLeTJ3VlN5eUFRQThLeTJ3Vml5eUFRRThLeTJ3Vnl5eUFBQTRLeTJ3V0N5eUFBRTRLeTJ3V1N5eUFRQTRLeTJ3V2l5eUFRRTRLeTJ3V3l5d01Dc3VzU1FCRkNzdHNGd3NzREFyc0RRckxiQmRMTEF3SzdBMUt5MndYaXl3QUJhd01DdXdOaXN0c0Y4c3NERXJMckVrQVJRckxiQmdMTEF4SzdBMEt5MndZU3l3TVN1d05Tc3RzR0lzc0RFcnNEWXJMYkJqTExBeUt5NnhKQUVVS3kyd1pDeXdNaXV3TkNzdHNHVXNzRElyc0RVckxiQm1MTEF5SzdBMkt5MndaeXl3TXlzdXNTUUJGQ3N0c0dnc3NETXJzRFFyTGJCcExMQXpLN0ExS3kyd2FpeXdNeXV3TmlzdHNHc3NLN0FJWmJBREpGQjRzQUVWTUMwQUFFdTRBTWhTV0xFQkFZNVp1UWdBQ0FCaklMQUJJMFFnc0FNamNMQU9SU0FnUzdnQURsRkxzQVpUV2xpd05CdXdLRmxnWmlDS1ZWaXdBaVZoc0FGRll5TmlzQUlqUkxNS0NRVUVLN01LQ3dVRUs3TU9Ed1VFSzFteUJDZ0pSVkpFc3dvTkJnUXJzUVlCUkxFa0FZaFJXTEJBaUZpeEJnTkVzU1lCaUZGWXVBUUFpRml4QmdGRVdWbFpXYmdCLzRXd0JJMnhCUUJFQUFBQSNpZWZpeCkgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLHVybChkYXRhOmFwcGxpY2F0aW9uL2ZvbnQtd29mZjtiYXNlNjQsZDA5R1JnQUJBQUFBQUJDd0FCQUFBQUFBR3N3QUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJHUmxSTkFBQUJiQUFBQUJvQUFBQWNkMnNEVUVkRVJVWUFBQUdJQUFBQUhRQUFBQ0FBTlFBRVQxTXZNZ0FBQWFnQUFBQkhBQUFBVmxkVVd4UmpiV0Z3QUFBQjhBQUFBRm9BQUFGcTBUL1R3Mk4yZENBQUFBSk1BQUFBR0FBQUFDUU5aZjcwWm5CbmJRQUFBbVFBQUFUOEFBQUpsakQzbnBWbllYTndBQUFIWUFBQUFBZ0FBQUFJQUFBQUVHZHNlV1lBQUFkb0FBQUduUUFBQ2lBc2lnMnZhR1ZoWkFBQURnZ0FBQUF2QUFBQU5nNWdwSDlvYUdWaEFBQU9PQUFBQUJ3QUFBQWtCOTREaG1odGRIZ0FBQTVVQUFBQUdnQUFBQm9OZ3dBOGJHOWpZUUFBRG5BQUFBQVNBQUFBRWdwaUI5eHRZWGh3QUFBT2hBQUFBQ0FBQUFBZ0Fkc0RVbTVoYldVQUFBNmtBQUFCUXdBQUFqMGVTc0JOY0c5emRBQUFEK2dBQUFBdkFBQUFWNXlyRUVOd2NtVndBQUFRR0FBQUFKVUFBQUNWcGJtK1puaWNZMkJnWUdRQWdqTzJpODZENkt2VE5qakFhQUJPRXdjeUFBQjRuR05nWkdCZzRBTmlDUVlRWUdKZ0JFSjJJR1lCOHhnQUJKY0FPZ0FBQUhpY1kyQmsvczM0aFlHVmdZTnBKdE1aQmdhR2Znak4rSnJCbUpHVGdZR0pnWTJaQVFZWUJSZ1FJQ0ROTllYQmdhSGlCUnR6dy84R2hoam1Cb1lHa0JxUUhBQlF4QTBQQUhpY1kyQmdZR2FBWUJrR1JnWVFTQUh5R01GOEZnWVBJTTNId01IQXhNQUdaRlU4czMrdTlQemxDN2IvLzhFcVVmai91eVdQU2p5V2tKVmdoSnFEQkJpQnVtR0NqRXhBZ2dsZEFib082Z0ZtMmhsTkVnQUFHejhUbVFBQWVKeGpZRUFEUmd4R3pCTC9IekkzL0crQTBRQkZaZ2hmZUp5ZFZXbDMwMFlVbGJ4a1Q5cVN4RkJFMnpFVHB6UWFtYkFGQXk0RUtiSUw2ZUpBYUNYb0lpY3hYZmdEZk94bi9acW4wSjdUai95MDNqdGVFbHA2VHRzY1MrKyttVHR2MDNzVGNZeW83SGtncmxGSFNsNzNwTEwrVkNyeHM2U3U2MTZlS09uMWtycHNwNTZTRmxFclRaWE14ZjBqdVVSMUxsYXlTYkJKeHV0ZW9wNnJQTytEMGtzeXJDaExJdG9pMnNxOExFMVRUeHcvVGJVNHZXU1Fwb0dVaklLZFNxT1BFS3BSTDVHcURtVktoMTY5bm9xYkJWSTJHdkdvbzZKNkVDcnVITTg1cFkwNllLUnlsY05jc1ZsdDVIdEoxdlA2ajlKRXA5amJmcHhndzJQMEkxZUJWSXpNd1BZMEhvZFBKTlBSWGlJemtYL3N1RTZVaFZJYlhBQ3ZhckRIb0VyeG9ianhRYllUeU5SNHpmRjFVYWswTWhYbnVzK3kyU3dkajVVUTVjSGYyS0dVRzdxL2c3UFRwcWhXWTNIN3dETUdPU21VS0hwSUZvQU9VNW1uOWdqYVBMUkFabzM2bytJYzhIVUlMN0lRWlNyUGxDem9VQWN5WjNiM2syTGEzVW5YWkhHZ1h3WXliM2Iza3QzSHcwV3ZqdlZsdTc1Z0NtY3hlcElVaTRzUjNJY3k2NmRNdTlRSVJ4a1hjOERGUEY3aTFyUkN5TWdDakVvanpGRmIrSjdacUd1Y0hXTnZkQjZQMVZOazBrWDgzVXgrUFRpcFdPRTR5M3BIM0VpY3U4ZXU2OEpWSUlzSXB4cnZKNDRzNmxCbHNQcjcwcExyTERoaG1HZkZRc1dYRjc1M0Vma3ZNVzQva0hkTTRWSythNG9TNVh1bUtGT2VNVVdGY2htRnBWd3h4UlRscWltbUtXdW1tS0U4YTRwWnluTkdwdjEvNmZ0OStENkhNK2ZobTlLRGI4b0w4RTM1QVh4VGZnamZsQi9CTjZXQ2I4bzZmRk5laEc5S2JlQnRLVk1ScXBpeGRQanRKVnExb1dvNU03akFQZzlrellqMlJXOEUwakJLZGRWSktYVy9wVlgrSlBucm9zZGo2NU9TdWpWcGJJaTd1bW16K1BoMHhtOXVYVExxaHAyclQ0d2o1YUU5ZFBYWU5LRlQrODNoMzg1ZDNTb3V1YXVJYXNPb05pS1lCSUEyNkxjQzhVM3piRHNRODVaZGZQeERNQUxVejZrMVZGTjE3ZFNWR2cveXZLdTdHSjdrd09PSVk2Q042NjZ1d0VzVFUxWkQ4K0ZuS1RJVis0TzhxWlZxNTdCMStXUmJOWWMycE1MYkl2YVZaSnltN2Iza1ZVbVZsZmVxdEY0K240WWhlbm9XMTRTMmJOM0pwQktoVVRQTzhmQ3VLa1haa1paeTFEOUM1NWVpdmdlY2NYWkI2OE14N2tUZFFiVTE3SFQ0K1dZamF3c21ocWEwdlJPZ1pDeGRGV05SNVZtY1kzUU5heDF2M0JLZXJxY25GdkVwTnBtUHdrcDFmWlNQYmlQTkszWlpadEdvU25WMGwvWlo3S3MyL1RJN2FGZ2RaejlwcWpidTZtRmJqU3BTUFZXK0JyUUhkbGJkK0ZBUEt6N3FvRkZWTmR2bzJzaGpOQzVyeG44TXlHSmMrZXRHcXliVDcrQ1dhcWZOWXMxZFFYUGZtQ3ozVGk5dnZjbCtLK2Vta2FiL1ZxTXRJNWY5SEk3NWJSSGczemtvZGxQV1FMMDFhWWh4QWRrTEdDN1ZST2NPemQzR0lPSTYreCtkMC8xdnpjSWdPYXR0amRrODllSHE2U2lTTzB4NW5HV2JXZGIxS00xUnRKUEVQa1ZpcThPSndVMk40Vmh1eWdZRzVPNC9yTi9EUGVDdUxJc1B2RzBrZ0xqUDJzU29udXJnN2g1WEl6VHNLN2tQR0psang3a05zQVBnRXNUbTJMVXJIUUM3MGlYbkRzQm41QkE4SUlmZ0lUa0V1K1RjQlBpY0hJSXZ5Q0g0a2h5Q3I4aTVCZEFqaDJDUEhJSkg1QkE4SnFjTnNFOE93Uk55Q0w0bWgrQWJjbG9BQ1RrRUtUa0VUOGtoZUdaa2MxTG1iNm5JZGFEdkxMb0I5TDN0R2loYlVINHdjbVhDenFoWWR0OGlzZzhzSXZYUXlOVUo5WWlLcFE0c0l2VzVSYVQrYU9UYWhQb1RGVXY5MlNKU2Y3R0kxQmZHbDVtQmxOZDZMM2xIQjM4Q0s3NnNmZ0FCQUFILy93QVBlSnk5VlZ0c0hGY1ovdjh6bDUzWm5UbHoyZG1admN4Nkw3TVgxK002OFhxOWRteXZQVWtwU1d5SFpPMlllbTNYS0pHN0xWU1FwZ3B5VlVpd2tMaEVSY2hVQWtHWEIxSnVVdFFIU3k2Z1FxaDRvQThJcVJLOEFSSVNLbTlVNGdVSkNkVnJ6bXhzVkRWUzFTTEVuRi9ubi9ubVA5ODU4NS8vZkFNQ0RCLytoYnZISmNHR2t6QUZTN0NKMnd0NzhVdXJ3VHhCVUtrS3RBTWNSY3B0QWtvU2J1Z29TMUZSM2pSUUVYbFIyWVFZSC91a2hoS0lpaVN1UWpRaUVENFc1ZHNtVXFxMlFGV2o5RXhtWWM5aGpBdnZ3eWpKMGM2SHBFd3l5c1VQUnNsM1BoQm44TEgzMEdHSDhWR1V0djQ3d25hN0hRd3VMMDlQMTBZZFozbHplWE45ZFhwcGVtbmhrWW54MGFuYWxIUFNPZGt5UnBQR1lDS0kyejZLUGhZcHlXSmh2RjRacjQ4UUh4TUZJV0haRmlXZVdQR3hXb2l3aUdweGhEVFJLWXFXUFZacjFDdU9HS0hjQUU2THRVWjFCS3VWS283WFo4azAxdXdzWWlxVFhqYkxyc250WWpSWkhmaFNiNTY4akltY1IybU81aC91blIvT0ZxMVVLaCtYdGhYVFZGVFQvSm9rQ2pHZThCb3RQOUs2RkpRY1d4WmtRUkI3UHhDMGRPSmU3aUdTUXlWVlRTOCtwTHU4bXMrWVY3NWFkNmFteW82TXVMT0Q4VXllL25qT1NCdk1QcCsyNHlXcXExSXlyWHBHM01MdHY4YVNjU1ZiZVF0QUFmMnd5LzJaK3h5b2tJRVJDR0Fabm9EcmNCTjI0UTY4Q20rUTRaOWRSdTBFeW1SdVlhL0VkdnBGVVBQcHZKcnVRQnJ5YWRncVlBNUV5SW1ka2tURUZJaXBMY2pxVVQwYjdVQ1UxNlA4bG9FYWIvT2EzYWttaVMzenRyd0ZXQ1FFY2dodGlGQlU0aEdsRFlrS1dtYkNXb040R1UwbmJxNEI3d21FNDdtVkRMTEV0Q0NmajU0R1haZGJNWlRsMkdsd0hMYzFnSzRiYzhNYXJMR1Y3ZjYvVnVhd2VUbkhiYi8vRW1WV3gxLy9ueTRweitaUjhxa1B0N1ozTDRnZGc0MWJ0MjQ4KzFUSGRTa0ZlT1BYcjkvNzZVOWUzWC9sN3ZkZnZ2TzlsNzc5NGpkdTdkN2F2ZjJWblM4OHYvM3N6UnMzUC9OMDUvcFQxNS9ZMnR6NCtNcnkwc0w1TTZlRHVWTVRveWZkRVhla1doN0kwZ3pOMkFsZFk4V2pKb3hCM2NmUllxV0o5VVpZODViSVBmQjBBdG1CYW96VjdCemFDVXRrNGNmSWZjQkRCb3pnRVRLQWZlaUJvTEpYck5RYjRjbXl4SGZmQzJ3R0ZqZUg0UXdzVUVNUlErUVlZTS9lRVRDTFJ3aEY3NEVZQWluUHEzbGVTclB0QWR2K0puVWo3VWpCVVptVENualJrdGY0T0wzZjl5YW8wbzFwdVFSVnZodlZjemI1dEJUcGFvWWE5cVp5Y0czZmNsMXIzOHBteVd2N3FtR28rK3g0djdObnBsVzVHMVhpb1l1Uks2cWhkVVZKTVdrM0l2VW1qS1RZRmhLeWtSU1lpMkpITWZrMTJRaDd5U1F0TDdXZjlMemtmc283bUxlMWZkMjI5WDNOSnQvU2xhNUNuWUlXNjZwYU1uOXcxK2hHWkdvWlhVbW1jZnhuWkUxTXE0bmNrZXZ0aFZ6SHZHKzZneTR6MDB5Rzl2ZU1HWE9FdHBnTzNacUluelVWUTE3akRGVm4zM3Z3dDZRUmkzYWxXTktJeWwxWkljOGRmMm5ZQTdzSTVBLzNlT0NlZ1Fac1FUT1llbnlqTVE1TWtqRzRpZ1RuZ1BBY1Q3Z09DK1VKOEczZ0VMa0x3SEhZQXVUdzBjdExwNXVqSStYQ09VSHpXU0ZVKytZVlBZcVJ2aVdzeEFBNnh6WldHMnRNekdKb2pZa2FVK0h4K3Zob1JHU05ob09PeDdPYW1BaGJmOU9kZm91TVdrelFtV1R6UU5ibnNsZXFwVTlWUk9IeWI2ZmNHY29TNXVqNnJPdXVsNHBYUzZLd2NkbGJTYWNuYVR4Q1NMclM4WUs1Vm02aktBam45OGFTZFVYUkU3UXdNN1dRWGNsNW44aWZiVFRjRENra1pSdDNIdnZkVEhaV294WlpiV1lmcjNpZHNpaFVueTZWMnBuTUtVcE5VdFptM014alhxMVJ6aER1N3FWbU02Y1k1TUo0YWlrL3NGb29YUzNPbjVwMFk3cEY4NmNtejUyN3dKRmttYXVQM3M4eEhPNndITytBQlVOd0pwZ0RnYVZXSUIyV1hDVDhsb2dBS0FBeURlQTQvZ0x3UE5lS0lOT0NSKzBFUXJtVXl5YUc3Q0dOUmlXdzBKSm8vMjhYbVNWak5TWWxkcGpFRWVScXMyU0MvZTZLWWZZcVJURmhEU0NCSjM5eGU0bmpubm45Mml2L21MdzBlZnZ0Ri80RFhQL1Z0VDdDN1Z6ODhtdWQ3ZC9jNlAzcjU0T1RrNE12dkgzN0hUaUNubnZ6K1NNSVFJTHk0USs1UDdGdmtNR0FGSGpnd3hoTXcxbFlDaTR5T1ZFa2xjbWJEQktWcFhZTWhTanlLUER0Q0xJakRTUVVRdzRJUjFhQVVxMEZtc1orOGgvOVNEQTdQVFhCanZHSkVYL0lpbnR4ZGxsRjNmRkxURFA2eWxEakxUR1VpeG9jZWV5L0NSVUszdlBtMkF2SFkxbnA0TU4rTGp2c04vR3NQK1A3TTczditNMmhvU2I1NDNBMjUvdE4vK0FQallWR1k0SDhmcWpKSG51L0REYUNZQU92TGRZYjgvT04rdUlYbTM0WWVDY2M0K09USVlQZmV5bms4MzBTaENNYnZSLzFVZHhlRDRMMTRLMzc0eGJabHY4YlhVMk9XQUFBQUhpY1kyQmtZR0FBWXJ2dER2ZmkrVzIrTXNpek1JREExV2tiSEJIMC93WVdCdVlHSUplRGdRa2tDZ0EweXdxZ0FIaWNZMkJrWUdCdStOL0FFTVBDQUFKQWtwRUJGYkFDQUVjTEFtNEVBQUFBQUFBQUFBRlZBQUFENlFBc0JBQUFFQUFnQUFBQUpRQUFBQUFBQUFBQUFBQUJQQU5rQkJZRWVBVVFBQUFBQVFBQUFBZ0F4Z0FNQUFBQUFBQUNBRkFBWGdCc0FBQUJDZ0lzQUFBQUFIaWNmWkM3VHNOQUVFV3Z5VU5Cb29ob2FVWVdSVktzdFY0NXlxdkdvYUdsanhJN3NSUnN5WFllNGhNUU5TVjhBeTFmeC9WbWFTaGlhMmZPN0Y3UDNEV0FHM3pBUS9ONDZPSFc4Ulc2R0RwdTRSNnZqdHZVZkR2dTRNR0xIWGZSOHo2cDlOclgzT25icnhxK1l2ODd4eTA4UWp0dVUvUGx1SU0zL0RqdW91KzlJOE1LQlhLa050WkF0aXJ5dE1oSlQwaXdwbUNQRnhiSk90c3p4MDdYNUJJYlNnUUdBYWNKWmx6Lys1MTNEVUlvakxrTWxTRUpNV2ZFUmJsSnhBUmFadkkzbDJoQ05WWkdoMVJkc1BmTTJTVXFTcG9qWWRmR3haeFU4MDJ4cFBHYVoxc3F6azRHT0ZBUllJcUlmMXpvWnNjNHNWUXlqdXd0RkJiV3NYYlZ5ZmFPTEI4WmZaNzd0a3B0ckdnbEthdXN5Q1VNOUZ6cU9sM3U2MktiOFM2RGd3Nm0wVkRVVGlhaVNobHBVUXN4bXVra1lTVHFLUDdDRjVXS3FpNWQ5aGNnM0ZrckFIaWNZMkJpd0E4NGdKaVJnWWtobXBHSmtabVJoWkdWbzdnZ015OHZ0Y2lJRThyUU5ZUUpXY0lZaGdBTXhnMlNBRXU0QU1oU1dMRUJBWTVadVFnQUNBQmpJTEFCSTBRZ3NBTWpjTEFPUlNBZ1M3Z0FEbEZMc0FaVFdsaXdOQnV3S0ZsZ1ppQ0tWVml3QWlWaHNBRkZZeU5pc0FJalJMTUtDUVVFSzdNS0N3VUVLN01PRHdVRUsxbXlCQ2dKUlZKRXN3b05CZ1Fyc1FZQlJMRWtBWWhSV0xCQWlGaXhCZ05Fc1NZQmlGRll1QVFBaUZpeEJnRkVXVmxaV2JnQi80V3dCSTJ4QlFCRUFBQUEpIGZvcm1hdChcXFwid29mZlxcXCIpLHVybChkYXRhOmFwcGxpY2F0aW9uL3gtZm9udC10dGY7YmFzZTY0LEFBRUFBQUFRQVFBQUJBQUFSa1pVVFhkckExQUFBQUVNQUFBQUhFZEVSVVlBTlFBR0FBQUJLQUFBQUNCUFV5OHlWMVJiRkFBQUFVZ0FBQUJXWTIxaGNORkEwOElBQUFHZ0FBQUJhbU4yZENBTlpmNzBBQUFRWkFBQUFDUm1jR2R0TVBlZWxRQUFFSWdBQUFtV1oyRnpjQUFBQUJBQUFCQmNBQUFBQ0dkc2VXWXNpZzJ0QUFBRERBQUFDaDVvWldGa0RreWtmUUFBRFN3QUFBQTJhR2hsWVFmZUE0WUFBQTFrQUFBQUpHaHRkSGdOYkFCUUFBQU5pQUFBQUJwc2IyTmhDSnNFaGdBQURhUUFBQUFTYldGNGNBSGJDcndBQUEyNEFBQUFJRzVoYldVTkxjY1ZBQUFOMkFBQUFpdHdiM04wbktNWVF3QUFFQVFBQUFCWGNISmxjS1c1dm1ZQUFCb2dBQUFBbFFBQUFBRUFBQUFBekQyaXp3QUFBQURWbHJCQUFBQUFBTldXc0VBQUFRQUFBQTRBQUFBWUFBQUFBQUFDQUFFQUF3QUhBQUVBQkFBQUFBSUFBQUFCQS9zQjlBQUZBQWdDbVFMTUFBQUFqd0taQXN3QUFBSHJBRE1CQ1FBQUFnQUdBd0FBQUFBQUFBQUFBQUVRQUFBQUFBQUFBQUFBQUFCUVprVmtBRUFBZU9nR0E0RC9nQUJjQTRBQWdBQUFBQUVBQUFBQUFBQUFBQUFEQUFBQUF3QUFBQndBQVFBQUFBQUFaQUFEQUFFQUFBQWNBQVFBU0FBQUFBNEFDQUFDQUFZQUFBQjQ1ai9uSXVmcDZBYi8vd0FBQUFBQWVPWS81eUxuNmVnRy8vOEFBUCtMR2NnWTR4Z2JHQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQmdBQUFRQUFBQUFBQUFBQkFnQUFBQUlBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFVQUxQL2hBN3dER0FBV0FEQUFPZ0JTQUY0QmQwdXdFMUJZUUVvQ0FRQU5EZzBBRG1ZQUF3NEJEZ05lQUFFSUNBRmNFQUVKQ0FvR0NWNFJBUXdHQkFZTVhnQUxCQXRwRHdFSUFBWU1DQVpZQUFvSEJRSUVDd29FV1JJQkRnNE5VUUFORFFvT1FodExzQmRRV0VCTEFnRUFEUTROQUE1bUFBTU9BUTREWGdBQkNBZ0JYQkFCQ1FnS0NBa0taaEVCREFZRUJneGVBQXNFQzJrUEFRZ0FCZ3dJQmxnQUNnY0ZBZ1FMQ2dSWkVnRU9EZzFSQUEwTkNnNUNHMHV3R0ZCWVFFd0NBUUFORGcwQURtWUFBdzRCRGdOZUFBRUlDQUZjRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDRzBCT0FnRUFEUTROQUE1bUFBTU9BUTREQVdZQUFRZ09BUWhrRUFFSkNBb0lDUXBtRVFFTUJnUUdEQVJtQUFzRUMya1BBUWdBQmd3SUJsZ0FDZ2NGQWdRTENnUlpFZ0VPRGcxUkFBME5DZzVDV1ZsWlFDaFRVenM3TWpFWEYxTmVVMTViV0R0U08xSkxRemMxTVRveU9oY3dGekJSRVRFWUVTZ1ZRQk1XS3dFR0t3RWlEZ0lkQVNFMU5DWTFOQzRDS3dFVklRVVZGQllVRGdJakJpWXJBU2NoQnlzQklpY2lMZ0k5QVJjaUJoUVdNekkyTkNZWEJnY09BeDRCT3dZeU5pY3VBU2NtSndFMU5ENENPd0V5RmgwQkFSa2JHbE1TSlJ3U0E1QUJDaGduSG9YK1NnS2lBUlVmSXc0T0h3NGdMZjVKTEIwaUZCa1pJQk1JZHd3U0Vnd05FaEtNQ0FZRkN3UUNCQThPSlVOUlVFQWtGeFlKQlFrRkJRYitwQVVQR2hXOEh5a0NId0VNR1NjYVRDa1FIQVFOSUJzU1lZZzBGem82SlJjSkFRR0FnQUVUR3lBT3B6OFJHaEVSR2hGOEdoWVRKQTRRRFFnWUdnMGpFUk1VQVhma0N4Z1REQjBtNHdBQUFnQUEvNEFFQUFPQUFCUUFLZ0JDUUQ4QUJRRUNBUVVDWmdBQ0JBRUNCR1FHQVFBQUFRVUFBVmtBQkFNREJFMEFCQVFEVVFjQkF3UURSUllWQVFBbEpCOGRGU29XS2c4T0NnZ0FGQUVVQ0E0ckFTSU9BZ2MrQWpNeUVoVVVGakkyTlRRdUFRTXlQZ0kzRGdJaklpNEJOVFFtSWdZVkZCNEJBZ0JudTRsU0F3Tnd2bStzOURoUU9JbnNpMmU3aVZJREEzQytiM0hBYnpoUU9JbnNBNEJQaHJsbWQ4bDAvdnE2S0RnNEtJdnNpZndBVDRhNVpuZkpkSGpPZWlnNE9DaUw3SWtBQUFJQUgvK3ZCQUFEY1FBMkFHUUFQVUE2WFZ3Mk5RQUZBZ1FCUUdJQkFnRS9BQUlFQXdRQ0EyWUFBQUFFQWdBRVdRQURBUUVEVFFBREF3RlJBQUVEQVVWVVVrRTlNUzRsSVVnRkR5c0JMZ0VuTGdFbkxnRWpJaU1PQVFjT0FRY09BUlVVRlI0QkZ4NEJGeDRCRng0Qk16SXpOamMrQVRjK0FUYzJOekl6TWpZMU5EVXhCd1lIQmdjT0FTTWlJeTRCSnk0Qkp5NEJOVFEyTnpZM05qYytBVE15RmhjV0Z4WVhGZ2N4RkJVVUZoY0dCd1FBQWxzL0hXRW5KR29tQmdWVXl6b2NQQTRPRXdFWEVCQStIQnhiSkNKaUpBWUZYRlFqVlJvYU9BNFRCd0lDR2labUkwQS9VUjljSWdVRlNiQXpHRFFNREJBVkRpRThPa3NkVlI4alh5QkhOalljR3dJaEdBa1dBWUJYMFR3ZFBnOE9GQUpZUFIxZEppTm1KUVlGSjJza0pGa2JHemtPRGhJQ0pRODhIQnRYSXpJMkpSc0NBNnBRUFQwZkRCRUNUVFVaVWlBZVdDRWtZaUpLT1RnY0N4QVVEaUE1T0VoSVRRTUNHQ1VETkRFQUFBQUFDQUFrLzZRRDNBT0FBQWtBRVFBWkFDTUFLd0F6QURzQVJ3QlNRRThBRFFBTUNBME1XUUFKQUFnT0NRaFpDd0VGQ2dFRUFRVUVXUWNCQVFZQkFBSUJBRmtBQXdBQ0F3SlZBQTRPRDFFQUR3OEtEa0pHUkVBK096bzNOak15THk0cktoUVRJeE1URXhNVUloQVhLeVFVQmlNaUpqVTBOaklFRkFZaUpqUTJNZ0FVQmlJbU5EWXlBUlFHSXlJbU5EWXlGZ0FVQmlJbU5EWXlBQlFHSWlZME5qSUFGQVlpSmpRMk1nVVVCaU1pSmpVME5qTXlGZ0V0S3g4ZExDczlBVWNyUENzclBQNlpLejBxS2owQzJpd2RIeXNyUFN2OTJUWkxOalpMQXRJcVBTc3JQZjY5UUZ4QVFGd0JiMHcwTmtwS05qUk1najByTEIwZks2RTlLaW85S3dGblBDc3JQQ3YrbWgwc0t6MHJLd0pBU3pZMlN6YitwandyS3p3ckFYZGJRRUJiUU9NMlNrbzJORXhNQUFBQUFBd0FELytiQTk0RGZBQU5BQnNBTGdCQUFGTUFaUUJ4QUgwQWtBQ2hBTFFBeFFJc3QxUUJEeThCQ1FJL1M3QWtVRmhBa2dBTklCb2dEUnBtQUJvQUlCb0FaQ0VCSHdBR0FCOEdaaVFJQWdZWkFBWVpaQUFkRUFvUUhRcG1BQW9FRUFvRVpCRUJEd1FXQkE4V1ppY1lBaFlKQkJZSlpBQUJJZ0lDQUI4QkFGa0FCdzRCREJNSERGa0FGU1lCRkJJVkZGb0FFeVVCRWhjVEVsb0FCQ01GQWdNRUExVWJBUmtaSUZFQUlDQUtRUUFRRUFsUkN3RUpDUXRCQUJjWEhGRWVBUndjQ3h4Q0cwdXdNbEJZUUpBQURTQWFJQTBhWmdBYUFDQWFBR1FoQVI4QUJnQWZCbVlrQ0FJR0dRQUdHV1FBSFJBS0VCMEtaZ0FLQkJBS0JHUVJBUThFRmdRUEZtWW5HQUlXQ1FRV0NXUUFBU0lDQWdBZkFRQlpBQWNPQVF3VEJ3eFpBQlVtQVJRU0ZSUmFBQk1sQVJJWEV4SmFBQmNlQVJ3REZ4eFpBQVFqQlFJREJBTlZHd0VaR1NCUkFDQWdDa0VBRUJBSlVRc0JDUWtMQ1VJYlFJNEFEU0FhSUEwYVpnQWFBQ0FhQUdRaEFSOEFCZ0FmQm1Za0NBSUdHUUFHR1dRQUhSQUtFQjBLWmdBS0JCQUtCR1FSQVE4RUZnUVBGbVluR0FJV0NRUVdDV1FBQVNJQ0FnQWZBUUJaQUNBYkFSa01JQmxaQUFjT0FRd1RCd3haQUJVbUFSUVNGUlJhQUJNbEFSSVhFeEphQUJjZUFSd0RGeHhaQUFRakJRSURCQU5WQUJBUUNWRUxBUWtKQ3dsQ1dWbEFYSDUrZEhKb1pod2NEZzRBQU1YRXZyeTJ0YlN6cktxam9xR2dtcGlTa1g2UWZwQ0poNEIvZW5keWZYUjlibXRtY1doeFpXUmVYRlpWVTFKTFNVSkJRRDg1TnpFd0hDNGNMaWNsSGgwT0d3NGJGaFVRRHdBTkFBMFZFU2dRS3dFeElpWTlBVFEyTWhZZEFSUUdBekVpSmowQk5EWXlGaDBCRkFZRE1TSW1Md0VtTlRRMk16SVdId0VXRlJRR0FURWlMd0VtTlRRMk16SWZBUllWRkFZakFTSXZBUzRCTlRRMk16SWZBUjRCRlJRR0l3RXhJaThCSmpVME5qTXlId0VXRlJRR0l5VWpJaVkwTmpzQk1oWVVCaVVqSWlZME5qc0JNaFlVQmdVeElpWTFORFkvQVRZek1oWVZGQVlQQVFZQklpWTFORDhCTmpNeUZoVVVEd0VHSXdFaUpqVTBQd0UrQVRNeUZoVVVEd0VPQVNNQklpWTFORDhCTmpNeUZoVVVEd0VHSXdJQUdTTWpNaU1qR1E4V0ZoNFdGcFVPSEFkWkJ5RVhEUndIV1FnaEFVOFVDVm9FRXc0VUNWb0VFdzcrTnc0TW13c1BIeFVPREp3S0VCOFdBbTBJQjVzUEVRMElCNXNQRWd6OWI3TVVIQndVc3hRZEhRSzVzdzBSRVEyekRCSVMvTEFTR2cwSm13b01FeG9OQ1pzTEFtRU5FUStiQmdnTUVnNmJCd2orTnhFWUJsa0ZGUWtSR0FWWkJSVUtBV1lNRWdSYUNSRU1FZ1JhQ0JJQ1VTTVpzeGdqSXhpekdTUDlTaFlQc3hBV0ZoQ3pEeFlDbGhBTW13d09GeUVQQzVzTkR4Z2cvYW9SbXdjSkRoUVJtd2dKRGhNQjl3ZGFCaG9ORlI4SFdnWWFEUlVmL3JBRVdnZ1NEQklFV2drUkRCTE9IQ2djSENnY0VoSVlFaElZRXU4YkVnc1hCVmtHR2hJTEZ3VmFCZ0YxRWd3UkNWb0RFUTBRQ1ZvRS9lc1lFUXNLbXdnTEdCRUtDWnNKREFKNEVRMElCNXNQRWd3SUI1c1BBQUFBQUFFQUFBQUJBQUJrNHlySVh3ODg5UUFMQkFBQUFBQUExWmF3UUFBQUFBRFZsckJBQUFEL2dBUUFBNEFBQUFBSUFBSUFBQUFBQUFBQUFRQUFBNEQvZ0FCY0JBQUFBQUFBQkFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFVRUFBQUFBQUFBQUFGVkFBQUQ2UUFzQkFBQUFBQWZBQ1FBRHdBQUFBQUFBQUFBQUFBQlBBR2VBbEFDNkFVUEFBQUFBUUFBQUFnQXhnQU1BQUFBQUFBQ0FGQUFYZ0JzQUFBQkNnbVdBQUFBQUFBQUFBd0FsZ0FCQUFBQUFBQUJBQWdBQUFBQkFBQUFBQUFDQUFZQUNBQUJBQUFBQUFBREFDUUFEZ0FCQUFBQUFBQUVBQWdBTWdBQkFBQUFBQUFGQUVVQU9nQUJBQUFBQUFBR0FBZ0Fmd0FEQUFFRUNRQUJBQkFBaHdBREFBRUVDUUFDQUF3QWx3QURBQUVFQ1FBREFFZ0Fvd0FEQUFFRUNRQUVBQkFBNndBREFBRUVDUUFGQUlvQSt3QURBQUVFQ1FBR0FCQUJoV2xqYjI1bWIyNTBUV1ZrYVhWdFJtOXVkRVp2Y21kbElESXVNQ0E2SUdsamIyNW1iMjUwSURvZ01qRXROeTB5TURFM2FXTnZibVp2Ym5SV1pYSnphVzl1SURFdU1Ec2dkSFJtWVhWMGIyaHBiblFnS0hZd0xqazBLU0F0YkNBNElDMXlJRFV3SUMxSElESXdNQ0F0ZUNBeE5DQXRkeUFpUnlJZ0xXWWdMWE5wWTI5dVptOXVkQUJwQUdNQWJ3QnVBR1lBYndCdUFIUUFUUUJsQUdRQWFRQjFBRzBBUmdCdkFHNEFkQUJHQUc4QWNnQm5BR1VBSUFBeUFDNEFNQUFnQURvQUlBQnBBR01BYndCdUFHWUFid0J1QUhRQUlBQTZBQ0FBTWdBeEFDMEFOd0F0QURJQU1BQXhBRGNBYVFCakFHOEFiZ0JtQUc4QWJnQjBBRllBWlFCeUFITUFhUUJ2QUc0QUlBQXhBQzRBTUFBN0FDQUFkQUIwQUdZQVlRQjFBSFFBYndCb0FHa0FiZ0IwQUNBQUtBQjJBREFBTGdBNUFEUUFLUUFnQUMwQWJBQWdBRGdBSUFBdEFISUFJQUExQURBQUlBQXRBRWNBSUFBeUFEQUFNQUFnQUMwQWVBQWdBREVBTkFBZ0FDMEFkd0FnQUNJQVJ3QWlBQ0FBTFFCbUFDQUFMUUJ6QUdrQVl3QnZBRzRBWmdCdkFHNEFkQUFBQWdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlBQUFBQVFBQ0FGc0JBZ0VEQVFRQkJRaHpjR2x1Ym1WeU9RbHpjR2x1Ym1WeUxURUljM0JwYm01bGNqRUljM0JwYm01bGNqSUFBQUVBQWYvL0FBOEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFESUFNZ01ZLytFRGdQK0FBeGovNFFPQS80Q3dBQ3l3SUdCbUxiQUJMQ0JrSUxEQVVMQUVKbHF3QkVWYldDRWpJUnVLV0NDd1VGQllJYkJBV1JzZ3NEaFFXQ0d3T0ZsWklMQUtSV0Zrc0NoUVdDR3dDa1Vnc0RCUVdDR3dNRmtiSUxEQVVGZ2daaUNLaW1FZ3NBcFFXR0FiSUxBZ1VGZ2hzQXBnR3lDd05sQllJYkEyWUJ0Z1dWbFpHN0FBSzFsWkk3QUFVRmhsV1ZrdHNBSXNJRVVnc0FRbFlXUWdzQVZEVUZpd0JTTkNzQVlqUWhzaElWbXdBV0F0c0FNc0l5RWpJU0Jrc1FWaVFpQ3dCaU5Dc2dvQUFpb2hJTEFHUXlDS0lJcXdBQ3V4TUFVbGlsRllZRkFiWVZKWldDTlpJU0N3UUZOWXNBQXJHeUd3UUZranNBQlFXR1ZaTGJBRUxMQUlJMEt3QnlOQ3NBQWpRckFBUTdBSFExRllzQWhESzdJQUFRQkRZRUt3Rm1VY1dTMndCU3l3QUVNZ1JTQ3dBa1Zqc0FGRlltQkVMYkFHTExBQVF5QkZJTEFBS3lPeEJBUWxZQ0JGaWlOaElHUWdzQ0JRV0NHd0FCdXdNRkJZc0NBYnNFQlpXU093QUZCWVpWbXdBeVVqWVVSRUxiQUhMTEVGQlVXd0FXRkVMYkFJTExBQllDQWdzQXBEU3JBQVVGZ2dzQW9qUWxtd0MwTktzQUJTV0NDd0N5TkNXUzJ3Q1N3Z3VBUUFZaUM0QkFCamlpTmhzQXhEWUNDS1lDQ3dEQ05DSXkyd0NpeExWRml4QndGRVdTU3dEV1VqZUMyd0N5eExVVmhMVTFpeEJ3RkVXUnNoV1NTd0UyVWplQzJ3REN5eEFBMURWVml4RFExRHNBRmhRckFKSzFtd0FFT3dBaVZDc2dBQkFFTmdRckVLQWlWQ3NRc0NKVUt3QVJZaklMQURKVkJZc0FCRHNBUWxRb3FLSUlvalliQUlLaUVqc0FGaElJb2pZYkFJS2lFYnNBQkRzQUlsUXJBQ0pXR3dDQ29oV2JBS1EwZXdDME5IWUxDQVlpQ3dBa1Zqc0FGRlltQ3hBQUFUSTBTd0FVT3dBRDZ5QVFFQlEyQkNMYkFOTExFQUJVVlVXQUN3RFNOQ0lHQ3dBV0cxRGc0QkFBd0FRa0tLWUxFTUJDdXdheXNiSWxrdHNBNHNzUUFOS3kyd0R5eXhBUTByTGJBUUxMRUNEU3N0c0JFc3NRTU5LeTJ3RWl5eEJBMHJMYkFUTExFRkRTc3RzQlFzc1FZTkt5MndGU3l4QncwckxiQVdMTEVJRFNzdHNCY3NzUWtOS3kyd0dDeXdCeXV4QUFWRlZGZ0FzQTBqUWlCZ3NBRmh0UTRPQVFBTUFFSkNpbUN4REFRcnNHc3JHeUpaTGJBWkxMRUFHQ3N0c0Jvc3NRRVlLeTJ3R3l5eEFoZ3JMYkFjTExFREdDc3RzQjBzc1FRWUt5MndIaXl4QlJnckxiQWZMTEVHR0NzdHNDQXNzUWNZS3kyd0lTeXhDQmdyTGJBaUxMRUpHQ3N0c0NNc0lHQ3dEbUFnUXlPd0FXQkRzQUlsc0FJbFVWZ2pJRHl3QVdBanNCSmxIQnNoSVZrdHNDUXNzQ01yc0NNcUxiQWxMQ0FnUnlBZ3NBSkZZN0FCUldKZ0kyRTRJeUNLVlZnZ1J5QWdzQUpGWTdBQlJXSmdJMkU0R3lGWkxiQW1MTEVBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBbkxMQUhLN0VBQlVWVVdBQ3dBUmF3SlNxd0FSVXdHeUpaTGJBb0xDQTFzQUZnTGJBcExBQ3dBMFZqc0FGRllyQUFLN0FDUldPd0FVVmlzQUFyc0FBV3RBQUFBQUFBUkQ0ak9MRW9BUlVxTGJBcUxDQThJRWNnc0FKRlk3QUJSV0pnc0FCRFlUZ3RzQ3NzTGhjOExiQXNMQ0E4SUVjZ3NBSkZZN0FCUldKZ3NBQkRZYkFCUTJNNExiQXRMTEVDQUJZbElDNGdSN0FBSTBLd0FpVkppb3BISTBjallTQllZaHNoV2JBQkkwS3lMQUVCRlJRcUxiQXVMTEFBRnJBRUpiQUVKVWNqUnlOaHNBWkZLMldLTGlNZ0lEeUtPQzJ3THl5d0FCYXdCQ1d3QkNVZ0xrY2pSeU5oSUxBRUkwS3dCa1VySUxCZ1VGZ2dzRUJSV0xNQ0lBTWdHN01DSmdNYVdVSkNJeUN3Q1VNZ2lpTkhJMGNqWVNOR1lMQUVRN0NBWW1BZ3NBQXJJSXFLWVNDd0FrTmdaQ093QTBOaFpGQllzQUpEWVJ1d0EwTmdXYkFESmJDQVltRWpJQ0N3QkNZalJtRTRHeU93Q1VOR3NBSWxzQWxEUnlOSEkyRmdJTEFFUTdDQVltQWpJTEFBS3lPd0JFTmdzQUFyc0FVbFliQUZKYkNBWXJBRUptRWdzQVFsWUdRanNBTWxZR1JRV0NFYkl5RlpJeUFnc0FRbUkwWmhPRmt0c0RBc3NBQVdJQ0Fnc0FVbUlDNUhJMGNqWVNNOE9DMndNU3l3QUJZZ3NBa2pRaUFnSUVZalI3QUFLeU5oT0Myd01peXdBQmF3QXlXd0FpVkhJMGNqWWJBQVZGZ3VJRHdqSVJ1d0FpV3dBaVZISTBjallTQ3dCU1d3QkNWSEkwY2pZYkFHSmJBRkpVbXdBaVZoc0FGRll5TWdXR0liSVZsanNBRkZZbUFqTGlNZ0lEeUtPQ01oV1Myd015eXdBQllnc0FsRElDNUhJMGNqWVNCZ3NDQmdackNBWWlNZ0lEeUtPQzJ3TkN3aklDNUdzQUlsUmxKWUlEeFpMckVrQVJRckxiQTFMQ01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0RZc0l5QXVSckFDSlVaU1dDQThXU01nTGthd0FpVkdVRmdnUEZrdXNTUUJGQ3N0c0Rjc3NDNHJJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLeTJ3T0N5d0x5dUtJQ0E4c0FRalFvbzRJeUF1UnJBQ0pVWlNXQ0E4V1M2eEpBRVVLN0FFUXk2d0pDc3RzRGtzc0FBV3NBUWxzQVFtSUM1SEkwY2pZYkFHUlNzaklEd2dMaU00c1NRQkZDc3RzRG9zc1FrRUpVS3dBQmF3QkNXd0JDVWdMa2NqUnlOaElMQUVJMEt3QmtVcklMQmdVRmdnc0VCUldMTUNJQU1nRzdNQ0pnTWFXVUpDSXlCSHNBUkRzSUJpWUNDd0FDc2dpb3BoSUxBQ1EyQmtJN0FEUTJGa1VGaXdBa05oRzdBRFEyQlpzQU1sc0lCaVliQUNKVVpoT0NNZ1BDTTRHeUVnSUVZalI3QUFLeU5oT0NGWnNTUUJGQ3N0c0Rzc3NDNHJMckVrQVJRckxiQThMTEF2S3lFaklDQThzQVFqUWlNNHNTUUJGQ3V3QkVNdXNDUXJMYkE5TExBQUZTQkhzQUFqUXJJQUFRRVZGQk11c0NvcUxiQStMTEFBRlNCSHNBQWpRcklBQVFFVkZCTXVzQ29xTGJBL0xMRUFBUlFUc0NzcUxiQkFMTEF0S2kyd1FTeXdBQlpGSXlBdUlFYUtJMkU0c1NRQkZDc3RzRUlzc0FralFyQkJLeTJ3UXl5eUFBQTZLeTJ3UkN5eUFBRTZLeTJ3UlN5eUFRQTZLeTJ3Uml5eUFRRTZLeTJ3Unl5eUFBQTdLeTJ3U0N5eUFBRTdLeTJ3U1N5eUFRQTdLeTJ3U2l5eUFRRTdLeTJ3U3l5eUFBQTNLeTJ3VEN5eUFBRTNLeTJ3VFN5eUFRQTNLeTJ3VGl5eUFRRTNLeTJ3VHl5eUFBQTVLeTJ3VUN5eUFBRTVLeTJ3VVN5eUFRQTVLeTJ3VWl5eUFRRTVLeTJ3VXl5eUFBQThLeTJ3VkN5eUFBRThLeTJ3VlN5eUFRQThLeTJ3Vml5eUFRRThLeTJ3Vnl5eUFBQTRLeTJ3V0N5eUFBRTRLeTJ3V1N5eUFRQTRLeTJ3V2l5eUFRRTRLeTJ3V3l5d01Dc3VzU1FCRkNzdHNGd3NzREFyc0RRckxiQmRMTEF3SzdBMUt5MndYaXl3QUJhd01DdXdOaXN0c0Y4c3NERXJMckVrQVJRckxiQmdMTEF4SzdBMEt5MndZU3l3TVN1d05Tc3RzR0lzc0RFcnNEWXJMYkJqTExBeUt5NnhKQUVVS3kyd1pDeXdNaXV3TkNzdHNHVXNzRElyc0RVckxiQm1MTEF5SzdBMkt5MndaeXl3TXlzdXNTUUJGQ3N0c0dnc3NETXJzRFFyTGJCcExMQXpLN0ExS3kyd2FpeXdNeXV3TmlzdHNHc3NLN0FJWmJBREpGQjRzQUVWTUMwQUFFdTRBTWhTV0xFQkFZNVp1UWdBQ0FCaklMQUJJMFFnc0FNamNMQU9SU0FnUzdnQURsRkxzQVpUV2xpd05CdXdLRmxnWmlDS1ZWaXdBaVZoc0FGRll5TmlzQUlqUkxNS0NRVUVLN01LQ3dVRUs3TU9Ed1VFSzFteUJDZ0pSVkpFc3dvTkJnUXJzUVlCUkxFa0FZaFJXTEJBaUZpeEJnTkVzU1lCaUZGWXVBUUFpRml4QmdGRVdWbFpXYmdCLzRXd0JJMnhCUUJFQUFBQSkgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQnpkR0Z1WkdGc2IyNWxQU0p1YnlJL1BnMEtQQ0ZFVDBOVVdWQkZJSE4yWnlCUVZVSk1TVU1nSWkwdkwxY3pReTh2UkZSRUlGTldSeUF4TGpFdkwwVk9JaUFpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2UjNKaGNHaHBZM012VTFaSEx6RXVNUzlFVkVRdmMzWm5NVEV1WkhSa0lpQStEUW84YzNabklIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK0RRbzhiV1YwWVdSaGRHRStEUXBEY21WaGRHVmtJR0o1SUVadmJuUkdiM0puWlNBeU1ERXlNRGN6TVNCaGRDQkdjbWtnU25Wc0lESXhJREF6T2pBNE9qUTVJREl3TVRjTkNpQkNlU0JoWkcxcGJnMEtQQzl0WlhSaFpHRjBZVDROQ2p4a1pXWnpQZzBLUEdadmJuUWdhV1E5SW1samIyNW1iMjUwSWlCb2IzSnBlaTFoWkhZdGVEMGlNVEF5TkNJZ1BnMEtJQ0E4Wm05dWRDMW1ZV05sSUEwS0lDQWdJR1p2Ym5RdFptRnRhV3g1UFNKcFkyOXVabTl1ZENJTkNpQWdJQ0JtYjI1MExYZGxhV2RvZEQwaU5UQXdJZzBLSUNBZ0lHWnZiblF0YzNSeVpYUmphRDBpYm05eWJXRnNJZzBLSUNBZ0lIVnVhWFJ6TFhCbGNpMWxiVDBpTVRBeU5DSU5DaUFnSUNCd1lXNXZjMlV0TVQwaU1pQXdJRFlnTXlBd0lEQWdNQ0F3SURBZ01DSU5DaUFnSUNCaGMyTmxiblE5SWpnNU5pSU5DaUFnSUNCa1pYTmpaVzUwUFNJdE1USTRJZzBLSUNBZ0lIZ3RhR1ZwWjJoMFBTSTNPVElpRFFvZ0lDQWdZbUp2ZUQwaU1DQXRNVEk0SURFd01qUWdPRGsySWcwS0lDQWdJSFZ1WkdWeWJHbHVaUzEwYUdsamEyNWxjM005SWpBaURRb2dJQ0FnZFc1a1pYSnNhVzVsTFhCdmMybDBhVzl1UFNJd0lnMEtJQ0FnSUhWdWFXTnZaR1V0Y21GdVoyVTlJbFVyTURBM09DMUZPREEySWcwS0lDQXZQZzBLUEcxcGMzTnBibWN0WjJ4NWNHZ2dEUW9nTHo0TkNpQWdJQ0E4WjJ4NWNHZ2daMng1Y0dndGJtRnRaVDBpTG01dmRHUmxaaUlnRFFvZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaUxtNXZkR1JsWmlJZ0RRb2dMejROQ2lBZ0lDQThaMng1Y0dnZ1oyeDVjR2d0Ym1GdFpUMGlMbTUxYkd3aUlHaHZjbWw2TFdGa2RpMTRQU0l3SWlBTkNpQXZQZzBLSUNBZ0lEeG5iSGx3YUNCbmJIbHdhQzF1WVcxbFBTSnViMjV0WVhKcmFXNW5jbVYwZFhKdUlpQm9iM0pwZWkxaFpIWXRlRDBpTXpReElpQU5DaUF2UGcwS0lDQWdJRHhuYkhsd2FDQm5iSGx3YUMxdVlXMWxQU0o0SWlCMWJtbGpiMlJsUFNKNElpQm9iM0pwZWkxaFpIWXRlRDBpTVRBd01TSWdEUXBrUFNKTk1qZ3hJRFUwTTNFdE1qY2dMVEVnTFRVeklDMHhhQzA0TTNFdE1UZ2dNQ0F0TXpZdU5TQXROblF0TXpJdU5TQXRNVGd1TlhRdE1qTWdMVE15ZEMwNUlDMDBOUzQxZGkwM05tZzVNVEoyTkRGeE1DQXhOaUF0TUM0MUlETXdkQzB3TGpVZ01UaHhNQ0F4TXlBdE5TQXlPWFF0TVRjZ01qa3VOWFF0TXpFdU5TQXlNaTQxZEMwME9TNDFJRGxvTFRFek0zWXRPVGRvTFRRek9IWTVOM3BOT1RVMUlETXhNSFl0TlRKeE1DQXRNak1nTUM0MUlDMDFNblF3TGpVZ0xUVTRkQzB4TUM0MUlDMDBOeTQxZEMweU5pQXRNekIwTFRNeklDMHhOblF0TXpFdU5TQXROQzQxY1MweE5DQXRNU0F0TWprdU5TQXRNQzQxRFFwMExUSTVMalVnTUM0MWFDMHpNbXd0TkRVZ01USTRhQzAwTXpsc0xUUTBJQzB4TWpob0xUSTVhQzB6TkhFdE1qQWdNQ0F0TkRVZ01YRXRNalVnTUNBdE5ERWdPUzQxZEMweU5TNDFJREl6ZEMweE15NDFJREk1TGpWMExUUWdNekIyTVRZM2FEa3hNWHBOTVRZeklESTBOM0V0TVRJZ01DQXRNakVnTFRndU5YUXRPU0F0TWpFdU5YUTVJQzB5TVM0MWRESXhJQzA0TGpWeE1UTWdNQ0F5TWlBNExqVjBPU0F5TVM0MWRDMDVJREl4TGpWMExUSXlJRGd1TlhwTk16RTJJREV5TTNFdE9DQXRNallnTFRFMElDMDBPSEV0TlNBdE1Ua2dMVEV3TGpVZ0xUTTNkQzAzTGpVZ0xUSTFkQzB6SUMweE5YUXhJQzB4TkM0MURRcDBPUzQxSUMweE1DNDFkREl4TGpVZ0xUUm9NemRvTmpkb09ERm9PREJvTmpSb016WnhNak1nTUNBek5DQXhNblF5SURNNGNTMDFJREV6SUMwNUxqVWdNekF1TlhRdE9TNDFJRE0wTGpWeExUVWdNVGtnTFRFeElETTVhQzB6TmpoNlRUTXpOaUEwT1RoMk1qSTRjVEFnTVRFZ01pNDFJREl6ZERFd0lESXhMalYwTWpBdU5TQXhOUzQxZERNMElEWm9NVGc0Y1RNeElEQWdOVEV1TlNBdE1UUXVOWFF5TUM0MUlDMDFNaTQxZGkweU1qZG9MVE15TjNvaUlDOCtEUW9nSUNBZ1BHZHNlWEJvSUdkc2VYQm9MVzVoYldVOUluTndhVzV1WlhJNUlpQjFibWxqYjJSbFBTSW1JM2hsTjJVNU95SWdEUXBrUFNKTk5URXlJRGc1Tm5FdE1UQXpJREFnTFRFNU5pNDFJQzB6T1M0MWRDMHhOaklnTFRFd05pNDFkQzB4TURrdU5TQXRNVFU1TGpWMExUUTBJQzB4T1RRdU5YRXpJREV4T1NBMU9TQXlNVGt1TlhReE5URWdNVFU0TGpWME1qQTJJRFU0Y1RFM01pQXdJREk1TkNBdE1UTXhkREV5TWlBdE16RTNjVEFnTFRRd0lESTRJQzAyT0hRMk9DQXRNamgwTmpnZ01qaDBNamdnTmpoeE1DQXhNemtnTFRZNExqVWdNalUzZEMweE9EWXVOU0F4T0RZdU5YUXRNalUzSURZNExqVjZUVFV4TWlBdE1USTRjVEV3TXlBd0lERTVOaTQxSURNNUxqVjBNVFl5SURFd05pNDFkREV3T1M0MUlERTFPUzQxZERRMElERTVOQzQxRFFweExUTWdMVEV4T1NBdE5Ua2dMVEl4T1M0MWRDMHhOVEVnTFRFMU9DNDFkQzB5TURZZ0xUVTRjUzB4TVRNZ01DQXRNakE1SURZd2RDMHhOVEV1TlNBeE5qTjBMVFUxTGpVZ01qSTFjVEFnTkRBZ0xUSTRJRFk0ZEMwMk9DQXlPSFF0TmpnZ0xUSTRkQzB5T0NBdE5qaHhNQ0F0TVRNNUlEWTRMalVnTFRJMU4zUXhPRFl1TlNBdE1UZzJMalYwTWpVM0lDMDJPQzQxZWlJZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaWMzQnBibTVsY2kweElpQjFibWxqYjJSbFBTSW1JM2hsTnpJeU95SWdEUXBrUFNKTk1UQXlOQ0F6T0RSeExUSWdPRGNnTFRRM0xqVWdNVGt4TGpWMExURXdPQzQxSURFMk5DNDFjUzB5T1NBeU9TQXROemN1TlNBMk1IUXRPRGN1TlNBME5uRXRNellnTVRRZ0xUZzVJREkwZEMwNU1TQXhNR2d0TVRGeExUZzBJQzB5SUMweE9EVXVOU0F0TkRaMExURTFPUzQxSUMweE1EVnhMVEk0SUMweU9TQXROVGdnTFRjMUxqVjBMVFEwSUMwNE5DNDFjUzB4TkNBdE16VWdMVEl6TGpVZ0xUZzJkQzA1TGpVZ0xUZzRkaTB4TVhFeElDMHpPU0F4TWk0MUlDMDVNaTQxZERJM0xqVWdMVGc1TGpWME5EY2dMVGd3TGpWME5Ua2dMVGN4TGpWME56TXVOU0F0TlRVdU5YUTRNUzQxSUMwME1pNDFEUXB4TXpRZ0xURTBJRGd6SUMweU0zUTROU0F0T1dneE1YRTVNaUF5SURFM05pQXpPWEV6TlNBeE5TQTNOeTQxSURRMWREWTRMalVnTlRoeE1qWWdNamNnTlRRZ056QXVOWFEwTWlBM09DNDFjVEU1SURVd0lESTJJREV3TkdnMGNUSTJJREFnTkRVZ01UZ3VOWFF4T1NBME5TNDFkalYyTUhZd2VrMDVNaklnTWpFMGNTMHpOU0F0T0RBZ0xUazVJQzB4TkRGeExUWXpJQzAyTVNBdE1UUTBJQzA1TW5FdE16RWdMVEV5SUMwM055QXRNakF1TlhRdE9EQWdMVGd1TldndE1UQnhMVGN6SURJZ0xURTJNU0EwTUM0MWRDMHhNemtnT1RFdU5YRXRNalFnTWpVZ0xUVXdJRFkyZEMwek9DQTNNdzBLY1MweE1pQXpNQ0F0TWpBZ056UjBMVGdnTnpkeE1DQXpOaUF4TUM0MUlEZzFkREkwTGpVZ09ETnhNek1nTnpRZ09UTWdNVE14Y1RVNElEVTJJREV6TXlBNE5IRXlPU0F4TVNBM01TNDFJREU1ZERjekxqVWdPSEV6TlNBd0lEZ3lMalVnTFRFd2REYzVMalVnTFRJMGNUY3hJQzB6TWlBeE1qVWdMVGc1Y1RVMElDMDFOaUE0TWlBdE1USTRjVEkzSUMwM01pQXlOU0F0TVRRNWRqQjJMVFZ4TUNBdE1qUWdNVFl1TlNBdE5ESXVOWFEwTUM0MUlDMHlNUzQxY1MwNUlDMDFNaUF0TXpFZ0xURXdNWFl3ZWlJZ0x6NE5DaUFnSUNBOFoyeDVjR2dnWjJ4NWNHZ3RibUZ0WlQwaWMzQnBibTVsY2pFaUlIVnVhV052WkdVOUlpWWplR1U0TURZN0lpQU5DbVE5SWswek1ERWdPVGt1TlhFd0lDMHpNQzQxSUMweU1TNDFJQzAxTW5RdE5USXVOU0F0TWpFdU5YRXRNamtnTUNBdE5URWdNakowTFRJeUlEVXhjVEFnTXpFZ01qRXVOU0ExTWk0MWREVXlJREl4TGpWME5USWdMVEl4TGpWME1qRXVOU0F0TlRKNlRUVTROU0F0TVRndU5YRXdJQzB6TUM0MUlDMHlNUzQxSUMwMU1TNDFkQzAxTVM0MUlDMHlNWFF0TlRFdU5TQXlNWFF0TWpFdU5TQTFNUzQxZERJeExqVWdOVEowTlRFdU5TQXlNUzQxZERVeExqVWdMVEl4TGpWME1qRXVOU0F0TlRKNlRURTRNeUF6T0RSeE1DQXRNekFnTFRJeExqVWdMVFV4TGpWMExUVXlJQzB5TVM0MWRDMDFNUzQxSURJeExqVU5DblF0TWpFZ05URXVOWFF5TVNBMU1TNDFkRFV4TGpVZ01qRXVOWFExTWlBdE1qRXVOWFF5TVM0MUlDMDFNUzQxZWswNE56QWdPVGx4TUNBdE1qa2dMVEl5SUMwMU1YUXROVEVnTFRJeWNTMHpNU0F3SUMwMU1pNDFJREl4TGpWMExUSXhMalVnTlRKME1qRXVOU0ExTW5RMU1pQXlNUzQxZERVeUlDMHlNUzQxZERJeExqVWdMVFV5TGpWNlRUTXhPU0EyTmpndU5YRXdJQzB6Tnk0MUlDMHlOeUF0TmpRdU5YUXROalF1TlNBdE1qZDBMVFkwTGpVZ01qZDBMVEkzSURZMExqVjBNamNnTmpRdU5YUTJOQzQxSURJM2REWTBMalVnTFRJM2RESTNJQzAyTkM0MWVrMDVPRGNnTXpnMERRcHhNQ0F0TXpBZ0xUSXhJQzAxTVM0MWRDMDFNUzQxSUMweU1TNDFkQzAxTWlBeU1TNDFkQzB5TVM0MUlEVXhMalYwTWpFdU5TQTFNUzQxZERVeUlESXhMalYwTlRFdU5TQXRNakV1TlhReU1TQXROVEV1TlhwTk5qSXlJRGM0Tmk0MWNUQWdMVFExTGpVZ0xUTXlJQzAzTnk0MWRDMDNPQ0F0TXpKMExUYzRJRE15ZEMwek1pQTNOeTQxZERNeUlEYzNMalYwTnpnZ016SjBOemdnTFRNeWRETXlJQzAzTnk0MWVrMDVNalVnTmpZNWNUQWdMVFUwSUMwek9DQXRPVEYwTFRrd0lDMHpOM0V0TlRRZ01DQXRPVEVnTXpkMExUTTNJRGt4Y1RBZ05USWdNemNnT1RCME9URWdNemh4TlRJZ01DQTVNQ0F0TXpnTkNuUXpPQ0F0T1RCNklpQXZQZzBLSUNBZ0lEeG5iSGx3YUNCbmJIbHdhQzF1WVcxbFBTSnpjR2x1Ym1WeU1pSWdkVzVwWTI5a1pUMGlKaU40WlRZelpqc2lJQTBLWkQwaVRUVXhNaUExT1ROMk1IRXRNalVnTUNBdE5ESXVOU0F4Tnk0MWRDMHhOeTQxSURReUxqVjJNVGM1Y1RBZ01qUWdNVGN1TlNBME1TNDFkRFF5TGpVZ01UY3VOWFEwTWk0MUlDMHhOeTQxZERFM0xqVWdMVFF4TGpWMkxURTNPWEV3SUMweU5TQXRNVGN1TlNBdE5ESXVOWFF0TkRJdU5TQXRNVGN1TlhwTk5URXlJQzB4TURGMk1IRXRNVFVnTUNBdE1qWWdNVEYwTFRFeElESTJkakUzT1hFd0lERTJJREV4SURJM2RESTJJREV4ZERJMklDMHhNWFF4TVNBdE1qZDJMVEUzT1hFd0lDMHhOU0F0TVRFZ0xUSTJkQzB5TmlBdE1URjZUVE0zT0NBMU5qRjJNSEV0TVRRZ01DQXRNamdnT0hRdE1qRWdNakFOQ213dE9Ea2dNVFUxY1MwM0lERXlJQzAzSURJMmNUQWdNak1nTVRZdU5TQXpPUzQxZERNNUxqVWdNVFl1TlhFeE15QXdJREkzSUMwM0xqVjBNakVnTFRFNExqVnNPRGtnTFRFMU5YRTRJQzB4TXlBNElDMHlPSEV3SUMweU5DQXRNVFl1TlNBdE5EQjBMVE01TGpVZ0xURTJlazAzTXpZZ0xUTTNkakJ4TFRJd0lEQWdMVEk1SURFM2JDMDVNQ0F4TlRWeExUUWdOeUF0TkNBeE5uRXdJREUwSURrdU5TQXlOSFF5TXk0MUlERXdjVEl3SURBZ01qa2dMVEUzYkRrd0lDMHhOVFZ4TkNBdE9DQTBJQzB4TjNFd0lDMHhOQ0F0T1M0MUlDMHlNeTQxZEMweU15NDFJQzA1TGpWMk1IcE5NamM1SURRMk5nMEtjUzB4TkNBd0lDMHlOaUEzYkMweE5UVWdPVEJ4TFRFeElEWWdMVEU0TGpVZ01UbDBMVGN1TlNBeU5uRXdJREl4SURFMUxqVWdNell1TlhRek5pNDFJREUxTGpWeE1UUWdNQ0F5TmlBdE4yd3hOVFlnTFRrd2NURXdJQzAySURFNElDMHhPWFE0SUMweU5uRXdJQzB5TVNBdE1UVXVOU0F0TXpZdU5YUXRNemN1TlNBdE1UVXVOWFl3ZWswNU1EQWdNVE13ZGpCeExUZ2dNQ0F0TVRVZ05Hd3RNVFUxSURrd2NTMHhOU0E0SUMweE5TQXlObkV3SURFeUlEZ3VOU0F5TVhReU1TNDFJRGx4T0NBd0lERTFJQzAwYkRFMU5TQXRPVEJ4TVRVZ0xUa2dNVFVnTFRJMmNUQWdMVEV5SUMwNUlDMHlNWFF0TWpFZ0xUbDJNSG9OQ2sweU5ETWdNek0yYUMweE56bHhMVEl3SURBZ0xUTTBJREUwZEMweE5DQXpOSFF4TkNBek5IUXpOQ0F4TkdneE56bHhNakFnTUNBek5DNDFJQzB4TkhReE5DNDFJQzB6TkhRdE1UUXVOU0F0TXpSMExUTTBMalVnTFRFMGVrMDVOakFnTXpVMGFDMHhOemx4TFRFeklEQWdMVEl4TGpVZ09YUXRPQzQxSURJeGREZ3VOU0F5TVhReU1TNDFJRGxvTVRjNWNURXlJREFnTWpFZ0xUbDBPU0F0TWpGMExUa2dMVEl4ZEMweU1TQXRPWHBOTVRJMElERXhOWFl3Y1MweE9DQXdJQzB6TVNBeE15NDFkQzB4TXlBek1TNDFjVEFnTVRFZ05pNDFJREl5TGpWME1UVXVOU0F4Tmk0MWJERTFOU0E0T1hFeE1DQTJJREl5SURZTkNuRXhPU0F3SURNeUlDMHhNM1F4TXlBdE16RnhNQ0F0TVRFZ0xUWXVOU0F0TWpJdU5YUXRNVFV1TlNBdE1UWXVOV3d0TVRVMUlDMDVNSEV0TVRFZ0xUWWdMVEl6SUMwMmVrMDNORFVnTkRnNGNTMHhNeUF3SUMweU1TNDFJRGwwTFRndU5TQXlNWEV3SURFM0lERTFJREkyYkRFMU5TQTVNSEUySURNZ01UUWdNM0V4TWlBd0lESXhJQzA0TGpWME9TQXRNakV1TlhFd0lDMHhOaUF0TVRRZ0xUSTFiQzB4TlRVZ0xUa3djUzAzSUMwMElDMHhOU0F0TkhZd2VrMHlPRGdnTFRRMWNTMHhOeUF3SUMweU9TQXhNblF0TVRJZ01qbHhNQ0F4TVNBMklESXhiRGc1SURFMU5YRTFJRGdnTVRVdU5TQXhNeTQxRFFwME1Ua3VOU0ExTGpWeE1UY2dNQ0F5T1NBdE1USjBNVElnTFRJNWNUQWdMVEV3SUMwMUlDMHhPV3d0T0RrZ0xURTFOWEV0TlNBdE9TQXRNVFV1TlNBdE1UVjBMVEl3TGpVZ0xUWjJNSHBOTmpRMklEVTROM0V0TVRJZ01DQXRNakVnT0M0MWRDMDVJREl4TGpWeE1DQTRJRFFnTVRWc09UQWdNVFUxY1RrZ01UVWdNallnTVRWeE1USWdNQ0F5TVNBdE9YUTVJQzB5TVhFd0lDMDRJQzAwSUMweE5Xd3RPVEFnTFRFMU5YRXRPQ0F0TVRVZ0xUSTJJQzB4TlhZd2VpSWdMejROQ2lBZ1BDOW1iMjUwUGcwS1BDOWtaV1p6UGp3dmMzWm5QZzBLI2ljb25mb250KSBmb3JtYXQoXFxcInN2Z1xcXCIpfS5pY29uZm9udHtmb250LWZhbWlseTppY29uZm9udCFpbXBvcnRhbnQ7Zm9udC1zaXplOjE2cHg7Zm9udC1zdHlsZTpub3JtYWw7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9Lmljb24tc3Bpbm5lcjk6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFN0U5XFxcIn0uaWNvbi1zcGlubmVyLTE6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFNzIyXFxcIn0uaWNvbi1zcGlubmVyMTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEU4MDZcXFwifS5pY29uLXNwaW5uZXIyOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRTYzRlxcXCJ9Lnd2LXNwaW5uZXJbZGF0YS12LTA2N2NjYzFmXXtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjstd2Via2l0LWFuaW1hdGlvbjpjaXJjbGUgMS4ycyBpbmZpbml0ZSBsaW5lYXI7LW8tYW5pbWF0aW9uOmNpcmNsZSAxLjJzIGluZmluaXRlIGxpbmVhcjthbmltYXRpb246Y2lyY2xlIDEuMnMgaW5maW5pdGUgbGluZWFyfUAtd2Via2l0LWtleWZyYW1lcyBjaXJjbGV7MCV7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3t0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Nob3Auc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zaG9wLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWNlY2VjOyB9XFxuXFxuLndldWktdGFiYmFyIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuXFxuLndldWktY2VsbF9fYmQgcCB7XFxuICBjb2xvcjogIzc3NztcXG4gIGZvbnQtd2VpZ2h0OiAyMDA7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsImNvbnN0IHJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnLycsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9ob21lLnZ1ZScpKSwgJ3Nob3AtaG9tZScpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2hvbWUnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiBmYWxzZSxcclxuICAgICAgdGl0bGU6ICfpppbpobUnXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2NhcnQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvY2FydC52dWUnKSksICdzaG9wLWNhcnQnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdjYXJ0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9jYXRlZ29yeScsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9jYXRlZ29yeS52dWUnKSksICdzaG9wLWNhdGVnb3J5JylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnY2F0ZWdvcnknLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9vcmRlci1saXN0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL29yZGVyLWxpc3QudnVlJykpLCAnc2hvcC1vcmRlci1saXN0JylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnb3JkZXItbGlzdCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvb3JkZXIvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL29yZGVyLnZ1ZScpKSwgJ3Nob3Atb3JkZXInKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdvcmRlcicsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvZmF2b3VyaXRlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2Zhdm91cml0ZS52dWUnKSksICdzaG9wLWZhdm91cml0ZScpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2Zhdm91cml0ZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2hlY2tvdXQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hlY2tvdXQudnVlJykpLCAnc2hvcC1jaGVja291dCcpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2NoZWNrb3V0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlLFxyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3VzZXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvdXNlci52dWUnKSksICdzaG9wLXVzZXInKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICd1c2VyJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9wcm9maWxlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Byb2ZpbGUudnVlJykpLCAnc2hvcC1wcm9maWxlJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncHJvZmlsZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYXZhdGFyJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2F2YXRhci52dWUnKSksICdzaG9wLWF2YXRhcicpXHJcbiAgICB9LFxyXG4gICAgbmFtZTogJ2F2YXRhcicsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2FkZHJlc3MudnVlJykpLCAnc2hvcC1hZGRyZXNzJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAnYWRkcmVzcycsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzL2FkZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hZGRyZXNzLWVkaXQudnVlJykpLCAnc2hvcC1hZGRyZXNzLWFkZCcpXHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWRkcmVzcy86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWRkcmVzcy1lZGl0LnZ1ZScpKSwgJ3Nob3AtYWRkcmVzcy1lZGl0JylcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hYm91dC11cycsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hYm91dC11cy52dWUnKSksICdzaG9wLWFib3V0LXVzJylcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvaGVscCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWxwLnZ1ZScpKSwgJ3Nob3AtaGVscCcpXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2hlbHAvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2hlbHAtZGV0YWlsLnZ1ZScpKSwgJ3Nob3AtaGVscC1kZXRhaWwnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi52dWUnKSksICdzaG9wLWxvZ2luJylcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9yZWdpc3RlcicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3Rlci52dWUnKSksICdzaG9wLXJlZ2lzdGVyJylcclxuICAgIH0sXHJcbiAgICBuYW1lOiAncmVnaXN0ZXInLFxyXG4gICAgbWV0YToge1xyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvZHVjdC52dWUnKSksICdzaG9wLXByb2R1Y3QnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdwcm9kdWN0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3Bhc3N3b3JkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Bhc3N3b3JkLnZ1ZScpKSwgJ3Nob3AtcGFzc3dvcmQnKVxyXG4gICAgfSxcclxuICAgIG5hbWU6ICdwYXNzd29yZCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9XHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avcm91dGVzLmpzIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tYWlubWVudS52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKSxcbiAgLyogc3R5bGVzICovXG4gIGluamVjdFN0eWxlLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTYyMDAyZDQ1XCIsXG4gIC8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXX05HNy4wXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxcY29tcG9uZW50c1xcXFxtYWlubWVudS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIG1haW5tZW51LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02MjAwMmQ0NVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTYyMDAyZDQ1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2ZTU3M2JmN1wiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuI3RhYmJhciAud2V1aV90YWJiYXJbZGF0YS12LTYyMDAyZDQ1XSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxufVxcbiN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtIC5pY29uW2RhdGEtdi02MjAwMmQ0NV0ge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICAgIGNvbG9yOiAjNjY2O1xcbn1cXG4jdGFiYmFyIC53ZXVpX3RhYmJhciAud2V1aV90YWJiYXJfaXRlbS53ZXVpX2Jhcl9pdGVtX29uIC5pY29uW2RhdGEtdi02MjAwMmQ0NV0ge1xcbiAgICBjb2xvcjogIzA5YmIwNztcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXX05HNy4wL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFVBQVU7Q0FBRTtBQUNaO0lBQ0UsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLGVBQWU7Q0FBRVwiLFwiZmlsZVwiOlwibWFpbm1lbnUudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiN0YWJiYXIgLndldWlfdGFiYmFyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDsgfVxcbiAgI3RhYmJhciAud2V1aV90YWJiYXIgLndldWlfdGFiYmFyX2l0ZW0gLmljb24ge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICAgIGNvbG9yOiAjNjY2OyB9XFxuICAjdGFiYmFyIC53ZXVpX3RhYmJhciAud2V1aV90YWJiYXJfaXRlbS53ZXVpX2Jhcl9pdGVtX29uIC5pY29uIHtcXG4gICAgY29sb3I6ICMwOWJiMDc7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNjIwMDJkNDVcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwiPHRlbXBsYXRlPlxyXG4gIDx3di10YWJiYXIgdi1pZj1cIm1lbnVWaXNpYmxlXCIgZml4ZWQ+XHJcbiAgICA8d3YtdGFiYmFyLWl0ZW0gdG89XCIvXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxMzs8L2k+XHJcbiAgICAgIDxzcGFuPummlumhtTwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgICA8d3YtdGFiYmFyLWl0ZW0gdG89XCIvY2F0ZWdvcnlcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjBiOzwvaT5cclxuICAgICAgPHNwYW4+5YiG57G7PC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9jYXJ0XCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxMTs8L2k+XHJcbiAgICAgIDxzcGFuPui0reeJqei9pjwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgICA8d3YtdGFiYmFyLWl0ZW0gdG89XCIvdXNlclwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiBzbG90PVwiaWNvblwiPiYjeGU2MWM7PC9pPlxyXG4gICAgICA8c3Bhbj7miJHnmoQ8L3NwYW4+XHJcbiAgICA8L3d2LXRhYmJhci1pdGVtPlxyXG4gIDwvd3YtdGFiYmFyPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgICBtZW51VmlzaWJsZTogc3RhdGUgPT4gc3RhdGUuaXNNYWluTWVudVZpc2libGVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge31cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gICN0YWJiYXIgLndldWlfdGFiYmFyIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbSB7XHJcbiAgICAgIC5pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbS53ZXVpX2Jhcl9pdGVtX29uIHtcclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGNvbG9yOiAjMDliYjA3O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFpbm1lbnUudnVlPzYzYjk0NGNmIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIChfdm0ubWVudVZpc2libGUpID8gX2MoJ3d2LXRhYmJhcicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJmaXhlZFwiOiBcIlwiXG4gICAgfVxuICB9LCBbX2MoJ3d2LXRhYmJhci1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL1wiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumJNcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi6aaW6aG1XCIpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LXRhYmJhci1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL2NhdGVnb3J5XCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6Yi1wiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLliIbnsbtcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvY2FydFwiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumJFcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi6LSt54mp6L2mXCIpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LXRhYmJhci1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL3VzZXJcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7picXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIuaIkeeahFwiKV0pXSldLCAxKSA6IF92bS5fZSgpXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTYyMDAyZDQ1XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSJdLCJzb3VyY2VSb290IjoiIn0=