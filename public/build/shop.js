webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(45)('wks')
  , uid        = __webpack_require__(49)
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

var isObject = __webpack_require__(14);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(10)
  , createDesc = __webpack_require__(44);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(25)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(90)
  , toPrimitive    = __webpack_require__(111)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 11 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(22);
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
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(3)
  , ctx       = __webpack_require__(12)
  , hide      = __webpack_require__(5)
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
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f
  , has = __webpack_require__(13)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys')
  , uid    = __webpack_require__(49);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(40)
  , defined = __webpack_require__(23);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


var Config = {
  apiRoot: '/api/shop',
  timeout: 5000,
  smsResendCountdown: 60,
  jwtTokenName: 'willshop_jwt_token'
};

exports.default = Config;

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(9);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(11)
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
/* 38 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(11);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(42)
  , $export        = __webpack_require__(20)
  , redefine       = __webpack_require__(106)
  , hide           = __webpack_require__(5)
  , has            = __webpack_require__(13)
  , Iterators      = __webpack_require__(8)
  , $iterCreate    = __webpack_require__(94)
  , setToStringTag = __webpack_require__(26)
  , getPrototypeOf = __webpack_require__(102)
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
/* 42 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(103)
  , enumBugKeys = __webpack_require__(38);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(12)
  , invoke             = __webpack_require__(91)
  , html               = __webpack_require__(39)
  , cel                = __webpack_require__(24)
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
  if(__webpack_require__(11)(process) == 'process'){
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = [{
  path: '/',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(141));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: false,
    title: '首页'
  }
}, {
  path: '/cart',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(135));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/category',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(136));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/order-list',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(143));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/order/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(144));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/favourite',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(138));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/checkout',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(137));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/user',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(149));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/profile',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(147));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/avatar',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(134));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/address',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(133));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}, {
  path: '/address/add',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(61));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/address/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(61));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true,
    hideMainmenu: true
  }
}, {
  path: '/about-us',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(132));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(140));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/help/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(139));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
}, {
  path: '/login',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(142));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/register',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(148));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/product/:id',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(146));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    hideMainmenu: true
  }
}, {
  path: '/password',
  component: function component(resolve) {
    __webpack_require__.e/* require.ensure */(0).then((function () {
      return resolve(__webpack_require__(145));
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  },
  meta: {
    auth: true
  }
}];

exports.default = routes;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(81);

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
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(50)(content, {});
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(50)(content, {});
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(128)

var Component = __webpack_require__(59)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(127),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\mainmenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
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

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 60 */
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
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(54);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(53);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(18);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _weVue = __webpack_require__(15);

var _weVue2 = _interopRequireDefault(_weVue);

__webpack_require__(57);

__webpack_require__(56);

var _axios = __webpack_require__(16);

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = __webpack_require__(17);

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _index = __webpack_require__(36);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(30);

var _config2 = _interopRequireDefault(_config);

var _index3 = __webpack_require__(52);

var _index4 = _interopRequireDefault(_index3);

var _vuex = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_weVue2.default);
_vue2.default.use(_vueAxios2.default, _axios2.default);

var router = new _vueRouter2.default({
  mode: 'history',
  base: '/shop/',
  routes: _index4.default
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

  var token = window.localStorage.getItem(_config2.default.jwtTokenName);
  config.headers.Authorization = 'bearer ' + token;

  return config;
}, function (error) {
  return _promise2.default.reject(error);
});

_axios2.default.interceptors.response.use(function (response) {
  _index2.default.commit('UPDATE_LOADING', false);

  var newToken = response.headers.authorization;
  if (newToken) {
    window.localStorage.setItem(_config2.default.jwtTokenName, newToken.replace('bearer ', ''));
  }

  return response;
}, function (error) {
  _index2.default.commit('UPDATE_LOADING', false);

  if (error.response) {
    if (error.response.status === 401) {
      window.localStorage.removeItem(_config2.default.jwtTokenName);

      router.push('/login');
    } else if (error.response.status === 403) {
      app.error('无操作权限');
      return;
    }
  } else {
    if (error.code === 'ECONNABORTED') {
      app.error('网络超时，请重试');
    }
  }

  return _promise2.default.reject(error);
});

var app = new _vue2.default({
  router: router,

  store: _index2.default,
  components: {
    'mainmenu': __webpack_require__(58)
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
      _weVue2.default.Toast(message);
    },
    error: function error(message, duration) {
      _weVue2.default.Toast({
        duration: duration,
        message: message,
        icon: 'warn'
      });
    }
  },

  watch: {
    'isLoading': function isLoading(value) {
      if (value) {
        _weVue2.default.Indicator.open('loading');
      } else {
        _weVue2.default.Indicator.close();
      }
    }
  }
}).$mount('#app');

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  mounted: function mounted() {},
  data: function data() {
    return {};
  },


  computed: {
    menuVisible: function menuVisible() {
      return this.$store.state.isMainMenuVisible;
    }
  },

  methods: {}
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
module.exports = __webpack_require__(3).Object.assign;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(116);
module.exports = __webpack_require__(3).Promise;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(29)
  , toLength  = __webpack_require__(47)
  , toIndex   = __webpack_require__(110);
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(12)
  , call        = __webpack_require__(93)
  , isArrayIter = __webpack_require__(92)
  , anObject    = __webpack_require__(4)
  , toLength    = __webpack_require__(47)
  , getIterFn   = __webpack_require__(112)
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(25)(function(){
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 91 */
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(8)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(99)
  , descriptor     = __webpack_require__(44)
  , setToStringTag = __webpack_require__(26)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 95 */
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
/* 96 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(46).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(11)(process) == 'process';

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(43)
  , gOPS     = __webpack_require__(101)
  , pIE      = __webpack_require__(104)
  , toObject = __webpack_require__(48)
  , IObject  = __webpack_require__(40)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(25)(function(){
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(4)
  , dPs         = __webpack_require__(100)
  , enumBugKeys = __webpack_require__(38)
  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(24)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(39).appendChild(iframe);
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(10)
  , anObject = __webpack_require__(4)
  , getKeys  = __webpack_require__(43);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 101 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(13)
  , toObject    = __webpack_require__(48)
  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(13)
  , toIObject    = __webpack_require__(29)
  , arrayIndexOf = __webpack_require__(88)(false)
  , IE_PROTO     = __webpack_require__(27)('IE_PROTO');

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
/* 104 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(5);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(3)
  , dP          = __webpack_require__(10)
  , DESCRIPTORS = __webpack_require__(7)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(4)
  , aFunction = __webpack_require__(22)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , defined   = __webpack_require__(23);
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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
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
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(37)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(8);
module.exports = __webpack_require__(3).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(86)
  , step             = __webpack_require__(96)
  , Iterators        = __webpack_require__(8)
  , toIObject        = __webpack_require__(29);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(41)(Array, 'Array', function(iterated, kind){
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
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(20);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(98)});

/***/ }),
/* 115 */
/***/ (function(module, exports) {



/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(42)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(12)
  , classof            = __webpack_require__(37)
  , $export            = __webpack_require__(20)
  , isObject           = __webpack_require__(14)
  , aFunction          = __webpack_require__(22)
  , anInstance         = __webpack_require__(87)
  , forOf              = __webpack_require__(89)
  , speciesConstructor = __webpack_require__(108)
  , task               = __webpack_require__(46).set
  , microtask          = __webpack_require__(97)()
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
  Internal.prototype = __webpack_require__(105)($Promise.prototype, {
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
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(107)(PROMISE);
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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(95)(function(iter){
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(109)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(41)(String, 'String', function(iterated){
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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(5)
  , Iterators     = __webpack_require__(8)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
exports.push([module.i, "body {\n  background-color: #ececec; }\n\n.weui-tabbar {\n  font-weight: bold; }\n\n.weui-cell__bd p {\n  color: #777;\n  font-weight: 200; }\n", ""]);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
exports.push([module.i, "\n#tabbar .weui_tabbar {\n  position: fixed;\n  bottom: 0;\n}\n#tabbar .weui_tabbar .weui_tabbar_item .icon {\n    font-size: 20px;\n    color: #666;\n}\n#tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon {\n    color: #09bb07;\n}\n", ""]);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
exports.push([module.i, ".wv-navbar[data-v-40f0a5eb]{display:flex;width:100%;z-index:5000;background-color:#fff}.wv-navbar__item[data-v-8b4cda66]{position:relative;display:block;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:transparent}.wv-navbar__item.wv-navbar__item_on[data-v-8b4cda66]{border-bottom:3px solid red}.searchbar-result[data-v-e876aa2a]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);margin-top:0;font-size:14px}.weui-check__label-disabled[data-v-323b9579]{background-color:rgba(0,0,0,.1)}.weui-check__label-disabled[data-v-3d63ae3a]{background-color:rgba(0,0,0,.1)}.actionsheet__mask_show[data-v-4095c8bf]{display:block;transform-origin:0 0 0;opacity:1;transform:scale(1);background-color:rgba(0,0,0,.6)}.wv-circle[data-v-12ab642a]{position:relative;width:100%;height:100%}.wv-circle .wv-circle-content[data-v-12ab642a]{width:100%;text-align:center;position:absolute;left:0;top:50%;transform:translateY(-50%)}.weui-icon_toast[data-v-bafb1f8a]{font-size:40px}.weui-toast_text[data-v-bafb1f8a]{width:auto;min-width:0;min-height:0;padding:.5em 0}.weui-toast_text .weui-toast__content[data-v-bafb1f8a]{margin:0}.wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}.wv-popup-body[data-v-87a08ef6]{display:block;background-color:#fff;position:fixed;width:100%;left:0;bottom:0;z-index:5000;transform:translateY(100%);transition:transform .3s}.wv-header[data-v-f6f5c16a]{display:flex;align-items:center;box-sizing:border-box;width:100%;height:50px;line-height:1;padding:0 10px;margin:0;color:#fff;position:relative;white-space:nowrap}.wv-header .left[data-v-f6f5c16a]{display:block;overflow:hidden;float:left;font-size:35px;line-height:35px;font-weight:100}.wv-header .wv-header-title[data-v-f6f5c16a]{font-size:23px;font-weight:0;text-align:center;flex:1}.wv-header.is-fixed[data-v-f6f5c16a]{position:fixed;left:0;top:0}.weui-toptips[data-v-1a7bec2b]{display:block}/*!\r\n * WeUI v1.1.2 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:-apple-system-font,Helvetica Neue,sans-serif}*{margin:0;padding:0}a img{border:0}a{text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}@font-face{font-weight:400;font-style:normal;font-family:weui;src:url(\"data:application/octet-stream;base64,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\") format(\"truetype\")}[class*=\" weui-icon-\"],[class^=weui-icon-]{display:inline-block;vertical-align:middle;font:normal normal normal 14px/1 weui;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased}[class*=\" weui-icon-\"]:before,[class^=weui-icon-]:before{display:inline-block;margin-left:.2em;margin-right:.2em}.weui-icon-circle:before{content:\"\\EA01\"}.weui-icon-download:before{content:\"\\EA02\"}.weui-icon-info:before{content:\"\\EA03\"}.weui-icon-safe-success:before{content:\"\\EA04\"}.weui-icon-safe-warn:before{content:\"\\EA05\"}.weui-icon-success:before{content:\"\\EA06\"}.weui-icon-success-circle:before{content:\"\\EA07\"}.weui-icon-success-no-circle:before{content:\"\\EA08\"}.weui-icon-waiting:before{content:\"\\EA09\"}.weui-icon-waiting-circle:before{content:\"\\EA0A\"}.weui-icon-warn:before{content:\"\\EA0B\"}.weui-icon-info-circle:before{content:\"\\EA0C\"}.weui-icon-cancel:before{content:\"\\EA0D\"}.weui-icon-search:before{content:\"\\EA0E\"}.weui-icon-clear:before{content:\"\\EA0F\"}.weui-icon-back:before{content:\"\\EA10\"}.weui-icon-delete:before{content:\"\\EA11\"}[class*=\" weui-icon_\"]:before,[class^=weui-icon_]:before{margin:0}.weui-icon-success{font-size:23px;color:#09bb07}.weui-icon-waiting{font-size:23px;color:#10aeff}.weui-icon-warn{font-size:23px;color:#f43530}.weui-icon-info{font-size:23px;color:#10aeff}.weui-icon-success-circle,.weui-icon-success-no-circle{font-size:23px;color:#09bb07}.weui-icon-waiting-circle{font-size:23px;color:#10aeff}.weui-icon-circle{font-size:23px;color:#c9c9c9}.weui-icon-download,.weui-icon-info-circle{font-size:23px;color:#09bb07}.weui-icon-safe-success{color:#09bb07}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#f43530;font-size:22px}.weui-icon-clear,.weui-icon-search{color:#b2b2b2;font-size:14px}.weui-icon-delete.weui-icon_gallery-delete{color:#fff;font-size:22px}.weui-icon_msg{font-size:93px}.weui-icon_msg.weui-icon-warn{color:#f76260}.weui-icon_msg-primary{font-size:93px}.weui-icon_msg-primary.weui-icon-warn{color:#ffbe00}.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.55555556;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn:after{content:\" \";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#000;background-color:#f8f8f8}.weui-btn_default:not(.weui-btn_disabled):visited{color:#000}.weui-btn_default:not(.weui-btn_disabled):active{color:rgba(0,0,0,.6);background-color:#dedede}.weui-btn_primary{background-color:#1aad19}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#179b16}.weui-btn_warn{background-color:#e64340}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_warn:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#ce3c39}.weui-btn_disabled{color:hsla(0,0%,100%,.6)}.weui-btn_disabled.weui-btn_default{color:rgba(0,0,0,.3);background-color:#f7f7f7}.weui-btn_disabled.weui-btn_primary{background-color:#9ed99d}.weui-btn_disabled.weui-btn_warn{background-color:#ec8b89}.weui-btn_loading .weui-loading{margin:-.2em .34em 0 0}.weui-btn_loading.weui-btn_primary,.weui-btn_loading.weui-btn_warn{color:hsla(0,0%,100%,.6)}.weui-btn_loading.weui-btn_primary{background-color:#179b16}.weui-btn_loading.weui-btn_warn{background-color:#ce3c39}.weui-btn_plain-primary{color:#1aad19;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:rgba(26,173,25,.6);border-color:rgba(26,173,25,.6)}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:rgba(53,53,53,.6);border-color:rgba(53,53,53,.6)}.weui-btn_plain-default:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2)}button.weui-btn,input.weui-btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,button.weui-btn_mini,input.weui-btn_inline,input.weui-btn_mini{width:auto}button.weui-btn_plain-default,button.weui-btn_plain-primary,input.weui-btn_plain-default,input.weui-btn_plain-primary{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;padding:0 1.32em;line-height:2.3;font-size:13px}.weui-btn+.weui-btn{margin-top:15px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:15px}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-btn-area_inline{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-btn-area_inline .weui-btn{margin-top:auto;margin-right:15px;width:100%;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-btn-area_inline .weui-btn:last-child{margin-right:0}.weui-cells{margin-top:1.17647059em;background-color:#fff;line-height:1.47058824;font-size:17px;overflow:hidden;position:relative}.weui-cells:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells:after,.weui-cells:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5;z-index:2}.weui-cells:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells__title+.weui-cells{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px;z-index:2}.weui-cell:first-child:before{display:none}.weui-cell_primary{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_swiped{display:block;padding:0}.weui-cell_swiped>.weui-cell__bd{position:relative;z-index:1;background-color:#fff}.weui-cell_swiped>.weui-cell__ft{position:absolute;right:0;top:0;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;color:#fff}.weui-swiped-btn{display:block;padding:10px 1em;line-height:1.47058824;color:inherit}.weui-swiped-btn_default{background-color:#c7c7cc}.weui-swiped-btn_warn{background-color:#ff3b30}.weui-cell_access{-webkit-tap-highlight-color:rgba(0,0,0,0);color:inherit}.weui-cell_access:active{background-color:#ececec}.weui-cell_access .weui-cell__ft{padding-right:13px;position:relative}.weui-cell_access .weui-cell__ft:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:first-child:before{display:block}.weui-check__label{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999em}.weui-cells_radio .weui-cell__ft{padding-left:.35em}.weui-cells_radio .weui-check:checked+.weui-icon-checked:before{display:block;content:\"\\EA08\";color:#09bb07;font-size:16px}.weui-cells_checkbox .weui-cell__hd{padding-right:.35em}.weui-cells_checkbox .weui-icon-checked:before{content:\"\\EA01\";color:#c9c9c9;font-size:23px;display:block}.weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before{content:\"\\EA06\";color:#09bb07}.weui-label{display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui-input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.47058824em;line-height:1.47058824}.weui-input::-webkit-inner-spin-button,.weui-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui-textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn .weui-textarea-counter{color:#e64340}.weui-toptips{display:none;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-cells_form .weui-cell__ft{font-size:0}.weui-cells_form .weui-icon-warn{display:none}.weui-cells_form input,.weui-cells_form label[for],.weui-cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-cell_warn{color:#e64340}.weui-cell_warn .weui-icon-warn{display:inline-block}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview:after,.weui-form-preview:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-form-preview:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-form-preview__hd .weui-form-preview__value{font-style:normal;font-size:1.6em}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-form-preview__ft:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}button.weui-form-preview__btn{background-color:transparent;border:0;outline:0;line-height:inherit;font-size:inherit}.weui-form-preview__btn:active{background-color:#eee}.weui-form-preview__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-cell_select .weui-select{padding-right:30px}.weui-cell_select .weui-cell__bd:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select{-webkit-appearance:none;border:0;outline:0;background-color:transparent;width:100%;font-size:inherit;height:45px;line-height:45px;position:relative;z-index:1;padding-left:15px}.weui-cell_select-before{padding-right:15px}.weui-cell_select-before .weui-select{width:105px;box-sizing:border-box}.weui-cell_select-before .weui-cell__hd{position:relative}.weui-cell_select-before .weui-cell__hd:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-cell_select-before .weui-cell__hd:before{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-cell_select-before .weui-cell__bd{padding-left:15px}.weui-cell_select-before .weui-cell__bd:after{display:none}.weui-cell_select-after{padding-left:15px}.weui-cell_select-after .weui-select{padding-left:0}.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:45px;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:45px;font-size:17px;color:#3cc51f}button.weui-vcode-btn{background-color:transparent;border-top:0;border-right:0;border-bottom:0;outline:0}.weui-vcode-btn:active{color:#52a341}.weui-gallery{display:none;position:fixed;top:0;right:0;bottom:0;left:0;background-color:#000;z-index:1000}.weui-gallery__img{position:absolute;top:0;right:0;bottom:60px;left:0;background:50% no-repeat;background-size:contain}.weui-gallery__opr{position:absolute;right:0;bottom:0;left:0;background-color:#0d0d0d;color:#fff;line-height:60px;text-align:center}.weui-gallery__del{display:block}.weui-cell_switch{padding-top:6.5px;padding-bottom:6.5px}.weui-switch{-webkit-appearance:none;-moz-appearance:none;appearance:none}.weui-switch,.weui-switch-cp__box{position:relative;width:52px;height:32px;border:1px solid #dfdfdf;outline:0;border-radius:16px;box-sizing:border-box;background-color:#dfdfdf;transition:background-color .1s,border .1s}.weui-switch-cp__box:before,.weui-switch:before{content:\" \";position:absolute;top:0;left:0;width:50px;height:30px;border-radius:15px;background-color:#fdfdfd;transition:-webkit-transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1);transition:transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1)}.weui-switch-cp__box:after,.weui-switch:after{content:\" \";position:absolute;top:0;left:0;width:30px;height:30px;border-radius:15px;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.4);transition:-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35);transition:transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35)}.weui-switch-cp__input:checked~.weui-switch-cp__box,.weui-switch:checked{border-color:#04be02;background-color:#04be02}.weui-switch-cp__input:checked~.weui-switch-cp__box:before,.weui-switch:checked:before{-webkit-transform:scale(0);transform:scale(0)}.weui-switch-cp__input:checked~.weui-switch-cp__box:after,.weui-switch:checked:after{-webkit-transform:translateX(20px);transform:translateX(20px)}.weui-switch-cp__input{position:absolute;left:-9999px}.weui-switch-cp__box{display:block}.weui-uploader__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__files{list-style:none}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px;width:79px;height:79px;background:no-repeat 50%;background-size:cover}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:\" \";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file_status .weui-uploader__file-content{display:block}.weui-uploader__file-content{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__file-content .weui-icon-warn{display:inline-block}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:\" \";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-msg{padding-top:36px;text-align:center}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__text-area a{color:#586c94}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}.weui-msg__extra-area a{color:#586c94}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-article{padding:20px 15px;font-size:15px}.weui-article section{margin-bottom:1.5em}.weui-article h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article h2{font-size:16px}.weui-article h2,.weui-article h3{font-weight:400;margin-bottom:.34em}.weui-article h3{font-size:15px}.weui-article *{max-width:100%;box-sizing:border-box;word-wrap:break-word}.weui-article p{margin:0 0 .8em}.weui-tabbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;bottom:0;width:100%;background-color:#f7f7fa}.weui-tabbar:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #c0bfc4;color:#c0bfc4;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-tabbar__item{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:5px 0 0;font-size:0;color:#999;text-align:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#09bb07}.weui-tabbar__icon{display:inline-block;width:27px;height:27px}.weui-tabbar__icon>i,i.weui-tabbar__icon{font-size:24px;color:#999}.weui-tabbar__icon img{width:100%;height:100%}.weui-tabbar__label{text-align:center;color:#999;font-size:10px;line-height:1.8}.weui-navbar{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:500;top:0;width:100%;background-color:#fafafa}.weui-navbar:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #ccc;color:#ccc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-navbar+.weui-tab__panel{padding-top:50px;padding-bottom:0}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:13px 0;text-align:center;font-size:15px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-navbar__item:active{background-color:#ededed}.weui-navbar__item.weui-bar__item_on{background-color:#eaeaea}.weui-navbar__item:after{content:\" \";position:absolute;right:0;top:0;width:1px;bottom:0;border-right:1px solid #ccc;color:#ccc;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-navbar__item:last-child:after{display:none}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-bottom:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-tab__content{display:none}.weui-progress{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-progress__bar{background-color:#ebebeb;height:3px;-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-progress__inner-bar{width:0;height:100%;background-color:#09bb07}.weui-progress__opr{display:block;margin-left:15px;font-size:0}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel:after,.weui-panel:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-panel:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-media-box:first-child:before{display:none}a.weui-media-box{color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0)}a.weui-media-box:active{background-color:#ececec}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box_text .weui-media-box__title{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-media-box_appmsg .weui-media-box__hd{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box_appmsg .weui-media-box__thumb{width:100%;max-height:100%;vertical-align:top}.weui-media-box_appmsg .weui-media-box__bd{-webkit-box-flex:1;-ms-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-media-box_small-appmsg .weui-cells{margin-top:0}.weui-media-box_small-appmsg .weui-cells:before{display:none}.weui-grids{position:relative;overflow:hidden}.weui-grids:before{right:0;height:1px;border-top:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grids:after,.weui-grids:before{content:\" \";position:absolute;left:0;top:0;color:#d9d9d9}.weui-grids:after{width:1px;bottom:0;border-left:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box}.weui-grid:before{top:0;width:1px;border-right:1px solid #d9d9d9;-webkit-transform-origin:100% 0;transform-origin:100% 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-grid:after,.weui-grid:before{content:\" \";position:absolute;right:0;bottom:0;color:#d9d9d9}.weui-grid:after{left:0;height:1px;border-bottom:1px solid #d9d9d9;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-grid:active{background-color:#ececec}.weui-grid__icon{width:28px;height:28px;margin:0 auto}.weui-grid__icon img{display:block;width:100%;height:100%}.weui-grid__icon+.weui-grid__label{margin-top:5px}.weui-grid__label{display:block;color:#000;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-footer,.weui-grid__label{text-align:center;font-size:14px}.weui-footer{color:#999}.weui-footer a{color:#586c94}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px}.weui-footer__link:before{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #c7c7c7;color:#c7c7c7;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5);left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-flex{display:-webkit-box;display:-ms-flexbox;display:flex}.weui-flex__item{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.weui-dialog__hd{padding:1.3em 1.6em .5em}.weui-dialog__title{font-weight:400;font-size:18px}.weui-dialog__bd{padding:0 1.6em .8em;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.weui-dialog__ft{position:relative;line-height:48px;font-size:18px;display:-webkit-box;display:-ms-flexbox;display:flex}.weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-dialog__btn{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.weui-dialog__btn:active{background-color:#eee}.weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.weui-dialog__btn:first-child:after{display:none}.weui-dialog__btn_default{color:#353535}.weui-dialog__btn_primary{color:#0bb20c}.weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-dialog__title{font-size:21px}.weui-skin_android .weui-dialog__hd{text-align:left}.weui-skin_android .weui-dialog__bd{color:#999;padding:.25em 1.6em 2em;font-size:17px;text-align:left}.weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.weui-skin_android .weui-dialog__ft:after{display:none}.weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.weui-skin_android .weui-dialog__btn:after{display:none}.weui-skin_android .weui-dialog__btn:active,.weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,.06)}.weui-skin_android .weui-dialog__btn:last-child{margin-right:-.8em}.weui-skin_android .weui-dialog__btn_default{color:gray}@media screen and (min-width:1024px){.weui-dialog{width:35%}}.weui-toast{position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:hsla(0,0%,7%,.7);text-align:center;border-radius:5px;color:#fff}.weui-icon_toast{margin:22px 0 0;display:block}.weui-icon_toast.weui-icon-success-no-circle:before{color:#fff;font-size:55px}.weui-icon_toast.weui-loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline}.weui-toast__content{margin:0 0 15px}.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-actionsheet__title{position:relative;height:65px;padding:0 20px;line-height:1.4;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;font-size:14px;color:#888;background:#fcfcfd}.weui-actionsheet__title:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__title .weui-actionsheet__title-text{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-actionsheet__menu{background-color:#fcfcfd}.weui-actionsheet__action{margin-top:6px;background-color:#fcfcfd}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{-webkit-transform:translate(0);transform:translate(0)}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore_line .weui-loadmore__tips{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore_dot .weui-loadmore__tips{padding:0 .16em}.weui-loadmore_dot .weui-loadmore__tips:before{content:\" \";width:4px;height:4px;border-radius:50%;background-color:#e5e5e5;display:inline-block;position:relative;vertical-align:0;top:-.16em}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#f43530;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;background-color:#efeff4}.weui-search-bar:before{top:0;border-top:1px solid #d7d6dc;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar:after,.weui-search-bar:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#d7d6dc}.weui-search-bar:after{bottom:0;border-bottom:1px solid #d7d6dc;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{display:block}.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label{display:none}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-ms-flex:auto;flex:auto;background-color:#efeff4}.weui-search-bar__form:after{content:\"\";position:absolute;left:0;top:0;width:200%;height:200%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:10px;border:1px solid #e6e6ea;box-sizing:border-box;background:#fff}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;height:100%;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__box .weui-search-bar__input{padding:4px 0;width:100%;height:1.42857143em;border:0;font-size:14px;line-height:1.42857143em;box-sizing:content-box;background:transparent}.weui-search-bar__box .weui-search-bar__input:focus{outline:none}.weui-search-bar__box .weui-icon-search{position:absolute;left:10px;top:0;line-height:28px}.weui-search-bar__box .weui-icon-clear{position:absolute;top:0;right:0;padding:0 10px;line-height:28px}.weui-search-bar__label{position:absolute;top:1px;right:1px;bottom:1px;left:1px;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff}.weui-search-bar__label span{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__label .weui-icon-search{margin-right:5px}.weui-search-bar__cancel-btn{display:none;margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}.weui-search-bar__input:not(:valid)~.weui-icon-clear{display:none}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}.weui-picker{position:fixed;width:100%;left:0;bottom:0;z-index:5000;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateY(100%);transform:translateY(100%);transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-picker__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}.weui-picker__hd:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__action{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#1aad19}.weui-picker__action:first-child{text-align:left;color:#888}.weui-picker__action:last-child{text-align:right}.weui-picker__bd{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;height:238px;overflow:hidden}.weui-picker__group{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:100%}.weui-picker__mask{top:0;height:100%;margin:0 auto;background:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat;-webkit-transform:translateZ(0);transform:translateZ(0)}.weui-picker__indicator,.weui-picker__mask{position:absolute;left:0;width:100%;z-index:3}.weui-picker__indicator{height:34px;top:102px}.weui-picker__indicator:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__indicator:after,.weui-picker__indicator:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-picker__indicator:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-picker__content{position:absolute;top:0;left:0;width:100%}.weui-picker__item{padding:0;height:34px;line-height:34px;text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.weui-picker__item_disabled{color:#999}@-webkit-keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes a{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.weui-animate-slide-up{-webkit-animation:a ease .3s forwards;animation:a ease .3s forwards}@-webkit-keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes b{0%{-webkit-transform:translateZ(0);transform:translateZ(0)}to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.weui-animate-slide-down{-webkit-animation:b ease .3s forwards;animation:b ease .3s forwards}@-webkit-keyframes c{0%{opacity:0}to{opacity:1}}@keyframes c{0%{opacity:0}to{opacity:1}}.weui-animate-fade-in{-webkit-animation:c ease .3s forwards;animation:c ease .3s forwards}@-webkit-keyframes d{0%{opacity:1}to{opacity:0}}@keyframes d{0%{opacity:1}to{opacity:0}}.weui-animate-fade-out{-webkit-animation:d ease .3s forwards;animation:d ease .3s forwards}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree a{color:#586c94}.weui-agree__text{color:#999}.weui-agree__checkbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;font-size:0;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:13px;height:13px;position:relative;vertical-align:0;top:2px}.weui-agree__checkbox:checked:before{font-family:weui;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;text-align:center;speak:none;display:inline-block;vertical-align:middle;text-decoration:inherit;content:\"\\EA08\";color:#09bb07;font-size:13px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-48%) scale(.73);transform:translate(-50%,-48%) scale(.73)}.weui-agree__checkbox:disabled{background-color:#e1e1e1}.weui-agree__checkbox:disabled:before{color:#adadad}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:e 1s steps(12) infinite;animation:e 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading,.weui-loading.weui-loading_transparent{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\")}@-webkit-keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes e{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.weui-slider{padding:15px 18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.weui-slider__inner{position:relative;height:2px;background-color:#e9e9e9}.weui-slider__track{height:2px;background-color:#1aad19;width:0}.weui-slider__handler{position:absolute;left:0;top:50%;width:28px;height:28px;margin-left:-14px;margin-top:-14px;border-radius:50%;background-color:#fff;box-shadow:0 0 4px rgba(0,0,0,.2)}.weui-slider-box{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.weui-slider-box .weui-slider{-webkit-box-flex:1;-ms-flex:1;flex:1}.weui-slider-box__value{margin-left:.5em;min-width:24px;color:#888;text-align:center;font-size:14px}", ""]);

/***/ }),
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
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

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(60)("1daaacc4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-62002d45\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-62002d45\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

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


/***/ })
],[79]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3Avc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9yb3V0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL3Nob3Auc2Nzcz8wZmVlIiwid2VicGFjazovLy8uL34vd2UtdnVlL2xpYi9zdHlsZS5jc3M/ZjhiMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWUiLCJ3ZWJwYWNrOi8vLy4vfi92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL21haW5tZW51LnZ1ZSIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlPzY4ZTkiLCJ3ZWJwYWNrOi8vLy4vfi93ZS12dWUvbGliL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/YWQyMiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWU/MWJkYyIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJhcGlSb290IiwidGltZW91dCIsInNtc1Jlc2VuZENvdW50ZG93biIsImp3dFRva2VuTmFtZSIsInVzZSIsInN0YXRlIiwiaXNMb2FkaW5nIiwiZGlyZWN0aW9uIiwiaXNNYWluTWVudVZpc2libGUiLCJpc0xvZ2luIiwiU3RvcmUiLCJtdXRhdGlvbnMiLCJVUERBVEVfTE9BRElORyIsInZhbHVlIiwiVVBEQVRFX0RJUkVDVElPTiIsIlVQREFURV9NQUlOTUVOVV9WSVNJQkxFIiwiVVBEQVRFX0lTX0xPR0lOIiwicm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsInJlc29sdmUiLCJyZXF1aXJlIiwibWV0YSIsImF1dGgiLCJ0aXRsZSIsImhpZGVNYWlubWVudSIsInJvdXRlciIsIm1vZGUiLCJiYXNlIiwiYmVmb3JlRWFjaCIsInRvIiwiZnJvbSIsIm5leHQiLCJjb21taXQiLCJtYXRjaGVkIiwic29tZSIsInJlY29yZCIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJxdWVyeSIsInJlZGlyZWN0IiwiZnVsbFBhdGgiLCJhZnRlckVhY2giLCJkb2N1bWVudCIsImRlZmF1bHRzIiwiYmFzZVVSTCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJjb25maWciLCJ0b2tlbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZXJyb3IiLCJyZWplY3QiLCJyZXNwb25zZSIsIm5ld1Rva2VuIiwiYXV0aG9yaXphdGlvbiIsInNldEl0ZW0iLCJyZXBsYWNlIiwic3RhdHVzIiwicmVtb3ZlSXRlbSIsInB1c2giLCJhcHAiLCJjb2RlIiwic3RvcmUiLCJjb21wb25lbnRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJUb2FzdCIsImR1cmF0aW9uIiwiaWNvbiIsIndhdGNoIiwiSW5kaWNhdG9yIiwib3BlbiIsImNsb3NlIiwiJG1vdW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0M7Ozs7OztBQ0h2Qyw2QkFBNkI7QUFDN0IscUNBQXFDLGdDOzs7Ozs7QUNEckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsRTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxnQkFBZ0IsVUFBVSxHQUFHO0FBQ3RFLENBQUMsRTs7Ozs7O0FDSEQsb0I7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFVBQVU7QUFDYjtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNmQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7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QixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzaG9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xyXG5cclxuY29uc3QgQ29uZmlnID0ge1xyXG4gIGFwaVJvb3Q6ICcvYXBpL3Nob3AnLFxyXG4gIHRpbWVvdXQ6IDUwMDAsXHJcbiAgc21zUmVzZW5kQ291bnRkb3duOiA2MCxcclxuICBqd3RUb2tlbk5hbWU6ICd3aWxsc2hvcF9qd3RfdG9rZW4nLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29uZmlnLmpzIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xyXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcclxuXHJcblZ1ZS51c2UoVnVleCk7XHJcblxyXG5jb25zdCBzdGF0ZSA9IHtcclxuICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxyXG4gIGlzTWFpbk1lbnVWaXNpYmxlOiB0cnVlLFxyXG4gIGlzTG9naW46IGZhbHNlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVleC5TdG9yZSh7XHJcbiAgc3RhdGUsXHJcbiAgbXV0YXRpb25zOiB7XHJcbiAgICBVUERBVEVfTE9BRElORyAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTG9hZGluZyA9IHZhbHVlO1xyXG4gICAgfSxcclxuICAgIFVQREFURV9ESVJFQ1RJT04gKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5kaXJlY3Rpb24gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBVUERBVEVfTUFJTk1FTlVfVklTSUJMRSAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTWFpbk1lbnVWaXNpYmxlID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgVVBEQVRFX0lTX0xPR0lOIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuaXNMb2dpbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9zdG9yZS9pbmRleC5qcyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qoc2VsZi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuXHR9KSxcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG5cdH0pLFxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2Vcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCByb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2hvbWUudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiBmYWxzZSxcclxuICAgICAgdGl0bGU6ICfpppbpobUnXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2NhcnQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2NhcnQudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2F0ZWdvcnknLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2NhdGVnb3J5LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9vcmRlci1saXN0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9vcmRlci1saXN0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9vcmRlci86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL29yZGVyLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9mYXZvdXJpdGUnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zhdm91cml0ZS52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2hlY2tvdXQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2NoZWNrb3V0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy91c2VyJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy91c2VyLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9wcm9maWxlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9wcm9maWxlLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hdmF0YXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2F2YXRhci52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9hZGRyZXNzLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzL2FkZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYWRkcmVzcy1lZGl0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZSxcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2FkZHJlc3MvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9hZGRyZXNzLWVkaXQudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWJvdXQtdXMnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL2Fib3V0LXVzLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9oZWxwJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWxwLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9oZWxwLzppZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaGVscC1kZXRhaWwudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2xvZ2luJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9sb2dpbi52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9yZWdpc3RlcicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcmVnaXN0ZXIudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL3Byb2R1Y3QudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcGFzc3dvcmQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuLi9jb21wb25lbnRzL3Bhc3N3b3JkLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3JvdXRlL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Nob3Auc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93ZS12dWUvbGliL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXG4vKiBzdHlsZXMgKi9cbnJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tYWlubWVudS52dWVcIilcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP2NhY2hlRGlyZWN0b3J5IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02MjAwMmQ0NVxcXCJ9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9tYWlubWVudS52dWVcIiksXG4gIC8qIHNjb3BlSWQgKi9cbiAgbnVsbCxcbiAgLyogY3NzTW9kdWxlcyAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkQ6XFxcXFVQVVBXXFxcXHZob3N0c1xcXFx3aWxsc2hvcFxcXFxyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxcY29tcG9uZW50c1xcXFxtYWlubWVudS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBtYWlubWVudS52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNjIwMDJkNDVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02MjAwMmQ0NVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIHRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIHNjb3BlSWQsXG4gIGNzc01vZHVsZXNcbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIC8vIGluamVjdCBjc3NNb2R1bGVzXG4gIGlmIChjc3NNb2R1bGVzKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zLmNvbXB1dGVkIHx8IG51bGwpXG4gICAgT2JqZWN0LmtleXMoY3NzTW9kdWxlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbW9kdWxlID0gY3NzTW9kdWxlc1trZXldXG4gICAgICBjb21wdXRlZFtrZXldID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbW9kdWxlIH1cbiAgICB9KVxuICAgIG9wdGlvbnMuY29tcHV0ZWQgPSBjb21wdXRlZFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XHJcbmltcG9ydCBXZVZ1ZSBmcm9tICd3ZS12dWUnO1xyXG5pbXBvcnQgJ3dlLXZ1ZS9saWIvc3R5bGUuY3NzJztcclxuaW1wb3J0ICcuLi8uLi9zYXNzL3Nob3Auc2Nzcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBWdWVBeGlvcyBmcm9tICd2dWUtYXhpb3MnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZS9pbmRleCc7XHJcbmltcG9ydCBhcHBDb25maWcgZnJvbSAnLi9jb25maWcnOyAgLy8g6YWN572uXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZS9pbmRleC5qcyc7XHJcblxyXG5WdWUudXNlKFZ1ZVJvdXRlcik7XHJcblZ1ZS51c2UoV2VWdWUpO1xyXG5WdWUudXNlKFZ1ZUF4aW9zLCBheGlvcyk7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBuZXcgVnVlUm91dGVyKHtcclxuICBtb2RlOiAnaGlzdG9yeScsXHJcbiAgYmFzZTogJy9zaG9wLycsXHJcbiAgcm91dGVzXHJcbn0pO1xyXG5cclxucm91dGVyLmJlZm9yZUVhY2goKHRvLCBmcm9tLCBuZXh0KSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIHRydWUpO1xyXG5cclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9NQUlOTUVOVV9WSVNJQkxFJywgIXRvLm1ldGEuaGlkZU1haW5tZW51KTtcclxuXHJcbiAgaWYgKHRvLm1hdGNoZWQuc29tZShyZWNvcmQgPT4gcmVjb3JkLm1ldGEuYXV0aCkgJiYgIXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lKSkge1xyXG4gICAgLy8g6ZyA6KaB55m75b2V5ZCO6K6/6Zeu55qE6aG16Z2i77yMcmVkaXJlY3Qg5Y+C5pWw55So5LqO55m75b2V5a6M5oiQ5ZCO6Lez6L2sXHJcbiAgICBuZXh0KHtcclxuICAgICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICAgIHF1ZXJ5OiB7cmVkaXJlY3Q6IHRvLmZ1bGxQYXRofVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn0pO1xyXG5cclxucm91dGVyLmFmdGVyRWFjaCgodG8sIGZyb20pID0+IHtcclxuICAvLyDliqjmgIHorr7nva7pobXpnaLmoIfpophcclxuICBkb2N1bWVudC50aXRsZSA9IHRvLm1ldGEudGl0bGUgfHwgJ3dpbGxzaG9wJztcclxuXHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKTtcclxufSk7XHJcblxyXG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gYXBwQ29uZmlnLmFwaVJvb3Q7XHJcbmF4aW9zLmRlZmF1bHRzLnRpbWVvdXQgPSBhcHBDb25maWcudGltZW91dDtcclxuXHJcbi8vIGF4aW9zIOivt+axguWPkemAgeWJjeWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCB0cnVlKTtcclxuXHJcbiAgbGV0IHRva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpO1xyXG4gIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnYmVhcmVyICcgKyB0b2tlbjtcclxuXHJcbiAgcmV0dXJuIGNvbmZpZztcclxufSwgKGVycm9yKSA9PiB7XHJcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxufSk7XHJcblxyXG4vLyBheGlvcyDlvpfliLDlk43lupTlkI7lpITnkIZcclxuYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZSgocmVzcG9uc2UpID0+IHtcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9MT0FESU5HJywgZmFsc2UpO1xyXG5cclxuICBjb25zdCBuZXdUb2tlbiA9IHJlc3BvbnNlLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcclxuICBpZiAobmV3VG9rZW4pIHtcclxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lLCBuZXdUb2tlbi5yZXBsYWNlKCdiZWFyZXIgJywgJycpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByZXNwb25zZTtcclxufSwgKGVycm9yKSA9PiB7XHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTE9BRElORycsIGZhbHNlKTtcclxuXHJcbiAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XHJcbiAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpO1xyXG5cclxuICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAvLyDml6DmnYPpmZDml7bnu5/kuIDmj5DnpLpcclxuICAgICAgYXBwLmVycm9yKCfml6Dmk43kvZzmnYPpmZAnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyDor7fmsYLotoXml7bmj5DnpLpcclxuICAgIGlmIChlcnJvci5jb2RlID09PSAnRUNPTk5BQk9SVEVEJykge1xyXG4gICAgICBhcHAuZXJyb3IoJ+e9kee7nOi2heaXtu+8jOivt+mHjeivlScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxufSk7XHJcblxyXG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IFZ1ZSh7XHJcbiAgLy8g6Lev55Sx5ZmoXHJcbiAgcm91dGVyLFxyXG4gIC8vIHZ1ZXggc3RvcmVcclxuICBzdG9yZSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICAnbWFpbm1lbnUnOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlJylcclxuICB9LFxyXG5cclxuICBjb21wdXRlZDoge1xyXG4gICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICBpc0xvYWRpbmc6IHN0YXRlID0+IHN0YXRlLmlzTG9hZGluZyxcclxuICAgICAgaXNNYWluTWVudVZpc2libGU6IHN0YXRlID0+IHN0YXRlLmlzTWFpbk1lbnVWaXNpYmxlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHN1Y2Nlc3MgKG1lc3NhZ2UpIHtcclxuICAgICAgV2VWdWUuVG9hc3QobWVzc2FnZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVycm9yIChtZXNzYWdlLCBkdXJhdGlvbikge1xyXG4gICAgICBXZVZ1ZS5Ub2FzdCh7XHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgaWNvbjogJ3dhcm4nXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHdhdGNoOiB7XHJcbiAgICAnaXNMb2FkaW5nJzogKHZhbHVlKSA9PiB7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIFdlVnVlLkluZGljYXRvci5vcGVuKCdsb2FkaW5nJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgV2VWdWUuSW5kaWNhdG9yLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pLiRtb3VudCgnI2FwcCcpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvaW5kZXguanMiLCI8dGVtcGxhdGU+XHJcbiAgPHd2LXRhYmJhciB2LWlmPVwibWVudVZpc2libGVcIiBmaXhlZD5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9cIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjEzOzwvaT5cclxuICAgICAgPHNwYW4+6aaW6aG1PC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9jYXRlZ29yeVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiBzbG90PVwiaWNvblwiPiYjeGU2MGI7PC9pPlxyXG4gICAgICA8c3Bhbj7liIbnsbs8L3NwYW4+XHJcbiAgICA8L3d2LXRhYmJhci1pdGVtPlxyXG4gICAgPHd2LXRhYmJhci1pdGVtIHRvPVwiL2NhcnRcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjExOzwvaT5cclxuICAgICAgPHNwYW4+6LSt54mp6L2mPC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi91c2VyXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxYzs8L2k+XHJcbiAgICAgIDxzcGFuPuaIkeeahDwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgPC93di10YWJiYXI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHt9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIG1lbnVWaXNpYmxlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuaXNNYWluTWVudVZpc2libGU7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge31cclxuICB9XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG4gICN0YWJiYXIgLndldWlfdGFiYmFyIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbSB7XHJcbiAgICAgIC5pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbS53ZXVpX2Jhcl9pdGVtX29uIHtcclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGNvbG9yOiAjMDliYjA3O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFpbm1lbnUudnVlPzE4MzJkNDNjIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAsIEJSRUFLICAgICAgID0ge31cbiAgLCBSRVRVUk4gICAgICA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLICA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZShoZWFkKXtcbiAgICAgIGZuICAgPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICBpZihoZWFkKW5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmKGlzTm9kZSl7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICAgIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKXtcbiAgICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gICAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmKCFoZWFkKXtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYyl7XG4gICAgaWYoc2FmZSAmJiB0YXJnZXRba2V5XSl0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjbGFzc29mICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGZvck9mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICwgdGFzayAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIG1pY3JvdGFzayAgICAgICAgICA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKClcbiAgLCBQUk9NSVNFICAgICAgICAgICAgPSAnUHJvbWlzZSdcbiAgLCBUeXBlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCAkUHJvbWlzZSAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgICAgICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgZW1wdHkgICAgICAgICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIEludGVybmFsLCBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlICAgICA9ICRQcm9taXNlLnJlc29sdmUoMSlcbiAgICAgICwgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uKGV4ZWMpeyBleGVjKGVtcHR5LCBlbXB0eSk7IH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gd2l0aCBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIHJldHVybiBhID09PSBiIHx8IGEgPT09ICRQcm9taXNlICYmIGIgPT09IFdyYXBwZXI7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHJldHVybiBzYW1lQ29uc3RydWN0b3IoJFByb21pc2UsIEMpXG4gICAgPyBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICA6IG5ldyBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcbnZhciBwZXJmb3JtID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHByb21pc2UsIGlzUmVqZWN0KXtcbiAgaWYocHJvbWlzZS5fbilyZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIG9rICAgID0gcHJvbWlzZS5fcyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Rpb24pe1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbFxuICAgICAgICAsIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlXG4gICAgICAgICwgcmVqZWN0ICA9IHJlYWN0aW9uLnJlamVjdFxuICAgICAgICAsIGRvbWFpbiAgPSByZWFjdGlvbi5kb21haW5cbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spe1xuICAgICAgICAgICAgaWYocHJvbWlzZS5faCA9PSAyKW9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGhhbmRsZXIgPT09IHRydWUpcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2Upe1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdCAmJiAhcHJvbWlzZS5faClvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBhYnJ1cHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYoaXNVbmhhbmRsZWQocHJvbWlzZSkpe1xuICAgICAgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbil7XG4gICAgICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmKGFicnVwdCl0aHJvdyBhYnJ1cHQuZXJyb3I7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICBpZihwcm9taXNlLl9oID09IDEpcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2NcbiAgICAsIGkgICAgID0gMFxuICAgICwgcmVhY3Rpb247XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYoaXNOb2RlKXtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCl7XG4gICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3Z9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmKCFwcm9taXNlLl9hKXByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZihwcm9taXNlID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge193OiBwcm9taXNlLCBfZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCFVU0VfTkFUSVZFKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gICAgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rICAgICA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCAgID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fYSl0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fcylub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcHJvbWlzZSAgPSBuZXcgSW50ZXJuYWw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ICA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1Byb21pc2U6ICRQcm9taXNlfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgLy8gaW5zdGFuY2VvZiBpbnN0ZWFkIG9mIGludGVybmFsIHNsb3QgY2hlY2sgYmVjYXVzZSB3ZSBzaG91bGQgZml4IGl0IHdpdGhvdXQgcmVwbGFjZW1lbnQgbmF0aXZlIFByb21pc2UgY29yZVxuICAgIGlmKHggaW5zdGFuY2VvZiAkUHJvbWlzZSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlc29sdmUgID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgICQkcmVzb2x2ZSh4KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlc29sdmUgICAgPSBjYXBhYmlsaXR5LnJlc29sdmVcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWVzICAgID0gW11cbiAgICAgICAgLCBpbmRleCAgICAgPSAwXG4gICAgICAgICwgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIHZhciAkaW5kZXggICAgICAgID0gaW5kZXgrK1xuICAgICAgICAgICwgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIGlmKGFscmVhZHlDYWxsZWQpcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYzsgfVxcblxcbi53ZXVpLXRhYmJhciB7XFxuICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbi53ZXVpLWNlbGxfX2JkIHAge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBmb250LXdlaWdodDogMjAwOyB9XFxuXCIsIFwiXCJdKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4jdGFiYmFyIC53ZXVpX3RhYmJhciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxufVxcbiN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtIC5pY29uIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBjb2xvcjogIzY2NjtcXG59XFxuI3RhYmJhciAud2V1aV90YWJiYXIgLndldWlfdGFiYmFyX2l0ZW0ud2V1aV9iYXJfaXRlbV9vbiAuaWNvbiB7XFxuICAgIGNvbG9yOiAjMDliYjA3O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIud3YtbmF2YmFyW2RhdGEtdi00MGYwYTVlYl17ZGlzcGxheTpmbGV4O3dpZHRoOjEwMCU7ei1pbmRleDo1MDAwO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud3YtbmF2YmFyX19pdGVtW2RhdGEtdi04YjRjZGE2Nl17cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztmbGV4OjE7cGFkZGluZzoxM3B4IDA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE1cHg7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS53di1uYXZiYXJfX2l0ZW0ud3YtbmF2YmFyX19pdGVtX29uW2RhdGEtdi04YjRjZGE2Nl17Ym9yZGVyLWJvdHRvbTozcHggc29saWQgcmVkfS5zZWFyY2hiYXItcmVzdWx0W2RhdGEtdi1lODc2YWEyYV17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm0tb3JpZ2luOjAgMCAwO29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSk7bWFyZ2luLXRvcDowO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNoZWNrX19sYWJlbC1kaXNhYmxlZFtkYXRhLXYtMzIzYjk1Nzlde2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMSl9LndldWktY2hlY2tfX2xhYmVsLWRpc2FibGVkW2RhdGEtdi0zZDYzYWUzYV17YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0uYWN0aW9uc2hlZXRfX21hc2tfc2hvd1tkYXRhLXYtNDA5NWM4YmZde2Rpc3BsYXk6YmxvY2s7dHJhbnNmb3JtLW9yaWdpbjowIDAgMDtvcGFjaXR5OjE7dHJhbnNmb3JtOnNjYWxlKDEpO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNil9Lnd2LWNpcmNsZVtkYXRhLXYtMTJhYjY0MmFde3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lnd2LWNpcmNsZSAud3YtY2lyY2xlLWNvbnRlbnRbZGF0YS12LTEyYWI2NDJhXXt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS53ZXVpLWljb25fdG9hc3RbZGF0YS12LWJhZmIxZjhhXXtmb250LXNpemU6NDBweH0ud2V1aS10b2FzdF90ZXh0W2RhdGEtdi1iYWZiMWY4YV17d2lkdGg6YXV0bzttaW4td2lkdGg6MDttaW4taGVpZ2h0OjA7cGFkZGluZzouNWVtIDB9LndldWktdG9hc3RfdGV4dCAud2V1aS10b2FzdF9fY29udGVudFtkYXRhLXYtYmFmYjFmOGFde21hcmdpbjowfS53di1zd2lwZVtkYXRhLXYtNDczNzA1MjFde292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlcltkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6MTAwJX0ud3Ytc3dpcGUgLnd2LXN3aXBlLXdyYXBwZXIgZGl2W2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246YWJzb2x1dGU7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwMCUpO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZGlzcGxheTpub25lfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlciBkaXYuaXMtYWN0aXZlW2RhdGEtdi00NzM3MDUyMV17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm06bm9uZX0ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnNbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKX0ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnMgLnd2LXN3aXBlLWluZGljYXRvcltkYXRhLXYtNDczNzA1MjFde2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6NTAlO21hcmdpbjowIDRweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7b3BhY2l0eTouM30ud3Ytc3dpcGUgLnd2LXN3aXBlLWluZGljYXRvcnMgLnd2LXN3aXBlLWluZGljYXRvci5pcy1hY3RpdmVbZGF0YS12LTQ3MzcwNTIxXXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9Lnd2LXBvcHVwLWJvZHlbZGF0YS12LTg3YTA4ZWY2XXtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2xlZnQ6MDtib3R0b206MDt6LWluZGV4OjUwMDA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTAwJSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzfS53di1oZWFkZXJbZGF0YS12LWY2ZjVjMTZhXXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjE7cGFkZGluZzowIDEwcHg7bWFyZ2luOjA7Y29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt3aGl0ZS1zcGFjZTpub3dyYXB9Lnd2LWhlYWRlciAubGVmdFtkYXRhLXYtZjZmNWMxNmFde2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO2Zsb2F0OmxlZnQ7Zm9udC1zaXplOjM1cHg7bGluZS1oZWlnaHQ6MzVweDtmb250LXdlaWdodDoxMDB9Lnd2LWhlYWRlciAud3YtaGVhZGVyLXRpdGxlW2RhdGEtdi1mNmY1YzE2YV17Zm9udC1zaXplOjIzcHg7Zm9udC13ZWlnaHQ6MDt0ZXh0LWFsaWduOmNlbnRlcjtmbGV4OjF9Lnd2LWhlYWRlci5pcy1maXhlZFtkYXRhLXYtZjZmNWMxNmFde3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDt0b3A6MH0ud2V1aS10b3B0aXBzW2RhdGEtdi0xYTdiZWMyYl17ZGlzcGxheTpibG9ja30vKiFcXHJcXG4gKiBXZVVJIHYxLjEuMiAoaHR0cHM6Ly9naXRodWIuY29tL3dldWkvd2V1aSlcXHJcXG4gKiBDb3B5cmlnaHQgMjAxNyBUZW5jZW50LCBJbmMuXFxyXFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXFxyXFxuICovaHRtbHstbXMtdGV4dC1zaXplLWFkanVzdDoxMDAlOy13ZWJraXQtdGV4dC1zaXplLWFkanVzdDoxMDAlfWJvZHl7bGluZS1oZWlnaHQ6MS42O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0tZm9udCxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmfSp7bWFyZ2luOjA7cGFkZGluZzowfWEgaW1ne2JvcmRlcjowfWF7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9QGZvbnQtZmFjZXtmb250LXdlaWdodDo0MDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC1mYW1pbHk6d2V1aTtzcmM6dXJsKFxcXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsQUFFQUFBQUxBSUFBQXdBd1IxTlZRckQrcyswQUFBRTRBQUFBUWs5VEx6SkFLRXgrQUFBQmZBQUFBRlpqYldGdzY1Y0ZIUUFBQWh3QUFBSlFaMng1WnZDUlIvRUFBQVNVQUFBS3RHaGxZV1FNUFJPdEFBQUE0QUFBQURab2FHVmhDQ3dEK2dBQUFMd0FBQUFrYUcxMGVFSm8vLzhBQUFIVUFBQUFTR3h2WTJFWXFoVzRBQUFFYkFBQUFDWnRZWGh3QVNFQVZRQUFBUmdBQUFBZ2JtRnRaZU5jSHRnQUFBOUlBQUFCNW5CdmMzVDZiTGhMQUFBUk1BQUFBT1lBQVFBQUErZ0FBQUJhQStqLy8vLy9BK2tBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQklBQVFBQUFBRUFBQ2JaYnh0ZkR6ejFBQXNENkFBQUFBRFVtMmR2QUFBQUFOU2JaMi8vL3dBQUEra0Q2Z0FBQUFnQUFnQUFBQUFBQUFBQkFBQUFFZ0JKQUFVQUFBQUFBQUlBQUFBS0FBb0FBQUQvQUFBQUFBQUFBQUVBQUFBS0FCNEFMQUFCUkVaTVZBQUlBQVFBQUFBQUFBQUFBUUFBQUFGc2FXZGhBQWdBQUFBQkFBQUFBUUFFQUFRQUFBQUJBQWdBQVFBR0FBQUFBUUFBQUFBQUFRT3dBWkFBQlFBSUFub0N2QUFBQUl3Q2VnSzhBQUFCNEFBeEFRSUFBQUlBQlFNQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFVR1pGWkFCQTZnSHFFUVBvQUFBQVdnUHFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2ovL3dQb0FBQUQ2QUFBQUFBQUJRQUFBQU1BQUFBc0FBQUFCQUFBQVhRQUFRQUFBQUFBYmdBREFBRUFBQUFzQUFNQUNnQUFBWFFBQkFCQ0FBQUFCQUFFQUFFQUFPb1IvLzhBQU9vQi8vOEFBQUFCQUFRQUFBQUJBQUlBQXdBRUFBVUFCZ0FIQUFnQUNRQUtBQXNBREFBTkFBNEFEd0FRQUJFQUFBRUdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQUFBQU53QUFBQUFBQUFBRVFBQTZnRUFBT29CQUFBQUFRQUE2Z0lBQU9vQ0FBQUFBZ0FBNmdNQUFPb0RBQUFBQXdBQTZnUUFBT29FQUFBQUJBQUE2Z1VBQU9vRkFBQUFCUUFBNmdZQUFPb0dBQUFBQmdBQTZnY0FBT29IQUFBQUJ3QUE2Z2dBQU9vSUFBQUFDQUFBNmdrQUFPb0pBQUFBQ1FBQTZnb0FBT29LQUFBQUNnQUE2Z3NBQU9vTEFBQUFDd0FBNmd3QUFPb01BQUFBREFBQTZnMEFBT29OQUFBQURRQUE2ZzRBQU9vT0FBQUFEZ0FBNmc4QUFPb1BBQUFBRHdBQTZoQUFBT29RQUFBQUVBQUE2aEVBQU9vUkFBQUFFUUFBQUFBQVJnQ01BTklCSkFGNEFjUUNNZ0pnQXFnQy9BTklBNllEL2dST0JLQUU5QVZhQUFBQUFnQUFBQUFEcndPdEFCUUFLUUFBQVNJSEJnY0dGQmNXRnhZeU56WTNOalFuSmljbUF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBZlY0WjJRN1BEdzdaR2Z3Wm1RN1BEdzdaR1o0Ymw1Yk5qYzNObHRlMjE1Yk5qYzNObHRlQTYwOE8yUm44R2RqT3p3OE8yTm44R2RrT3p6OHJ6YzFXMTdiWGx3MU56YzFYRjdiWGxzMU53QUFBQUFDQUFBQUFBT3pBN01BRndBdEFBQUJJZ2NHQndZVkZCY1dGeFl6TWpjMk56WTFOQ2NtSnlZVEJ3WWlMd0VtTmpzQkVUUTJPd0V5RmhVUk16SVdBZTUyWjJRN1BUMDdaR2QyZkdwbU96NCtPMlpwSVhZT0tBNTJEZzBYWFFzSEpnY0xYUmNOQTdNK08yWnFmSFpuWkRzOVBUdGtaM1o5YVdZN1B2M3dtaElTbWhJYUFSY0lDd3NJL3VrYUFBTUFBQUFBQStVRDVRQVhBQ01BTEFBQUFTSUhCZ2NHRlJRWEZoY1dNekkzTmpjMk5UUW5KaWNtQXhRckFTSTFBelE3QVRJSEp5SW1ORFl5RmhRR0FlNkVjbTlCUkVSQmIzS0VpWFp4UWtSRVFuRjFhUUl4QXdnQ1FnTUJJeElaR1NRWkdRUGtSRUp4ZG9tRWNtOUJSRVJCYjNLRWluVnhRa1Q5SFFJQ0FXSUNBakVaSXhrWkl4a0FBQUFBQWdBQUFBQURzUVBrQUJrQUxnQUFBUVlIQmdjMkJSRVVGeFlYRmhjMk56WTNOalVSSkJjbUp5WVRBUVl2QVNZL0FUWXlId0VXTmpjbE5qSWZBUllCOVZWVlFrK3YvdEZIUG14ZWJHeGRiVDFJL3RHdlQwSlZvLzdWQkFTS0F3TVNBUVVCY1FFRkFnRVNBZ1VCRVFRRDR4TVlFaGszWVA2c2puVmxTRDhjSEQ5SVpYV09BVlJnTnhrU0dQNjIvdGtEQTQ4RUJCa0NBVllDQVFIbEFRSVFCQUFBQUFBREFBQUFBQU94QStRQUd3QXFBRE1BQUFFR0J3WUhCZ2NHTnhFVUZ4WVhGaGMyTnpZM05qVVJKQmNtSnlZSE16SVdGUU1VQmlzQklpY0RORFlUSWlZME5qSVdGQVlCOVVGQk9Ec3NPMzhnUno1c1hteHNYVzA5U1A3WXFGQkJWVzgwQkFZTUF3SW1CUUVMQmg0UEZoWWVGUlVENUE4U0RoSU9FaWtLL3EyUGRXUkpQaDBkUGtsa2RZOEJVMTQxR1JJWS9BWUUvc1lDQXdVQk9nUUcva0FWSHhVVkh4VUFBQUFDQUFBQUFBUGtBK1FBRndBdEFBQUJJZ2NHQndZVkZCY1dGeFl6TWpjMk56WTFOQ2NtSnlZVEFRWWlMd0VtUHdFMk1oOEJGakkzQVRZeUh3RVdBZTZFY205QlEwTkNibk9EaVhWeFFrUkVRbkYxa2Y2Z0FRVUJvd01ERmdFRkFZVUNCUUVCUXdJRkFSVUVBK05FUW5GMWlZTnpia0pEUTBGdmNvU0pkWEZDUlA2ai9xVUJBYWdFQlI0Q0FXWUJBUUVOQWdJVkJBQUFBQVFBQUFBQUE2OERyUUFVQUNrQVB3QkRBQUFCSWdjR0J3WVVGeFlYRmpJM05qYzJOQ2NtSnlZRElpY21KeVkwTnpZM05qSVhGaGNXRkFjR0J3WVRCUTRCTHdFbUJnOEJCaFlmQVJZeU53RStBU1lpRnpBZkFRSDFlR2RrT3p3OE8yUm44R1prT3p3OE8yUm1lRzVlV3pZM056WmJYdHRlV3pZM056WmJYbW4rOWdZU0JtQUdEd1VEQlFFR2ZRVVFCZ0VsQlFFTEVCVUJBUU90UER0a1ovQm5ZenM4UER0alovQm5aRHM4L0s4M05WdGUyMTVjTlRjM05WeGUyMTViTlRjQ0p0MEZBUVZKQlFJR0JBY1JCb0FHQlFFaEJROExCQUVCQUFBQkFBQUFBQU83QXpvQUZ3QUFFeTRCUHdFK0FSOEJGalkzQVRZV0Z5Y1dGQWNCQmlJblBRb0dCd1VIR2d6TERDRUxBaDBMSHdzTkNncjl1UW9lQ2dHekN5RU9DdzBIQ1pNSkFRb0J2Z2tDQ2cwTEhRdjlzUXNLQUFBQUFBSUFBQUFBQStVRDVnQVhBQ3dBQUFFaUJ3WUhCaFVVRnhZWEZqTXlOelkzTmpVMEp5WW5KaE1IQmk4QkppY21OUk0wTmpzQk1oWVZFeGNlQVFIdmhISnZRVU5EUW01emc0bDFjVUpFUkVKeGRWY1FBd1Q2QXdJRUVBTUNLd0lERHNVQ0FRUGxSRUp4ZFltRGMyNUNRME5CYjNLRWlYVnhRa1Q5Vmh3RUFuY0NBZ01HQVhvQ0F3TUMvcTJGQWdRQUFBUUFBQUFBQTY4RHJRQURBQmdBTFFBekFBQUJNQjhCQXlJSEJnY0dGQmNXRnhZeU56WTNOalFuSmljbUF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBeU1WTXpVakF1VUJBZko0WjJRN1BEdzdaR2Z3Wm1RN1BEdzdaR1o0Ymw1Yk5qYzNObHRlMjE1Yk5qYzNObHRlbXlUOTJRS0RBUUVCTER3N1pHZndaMk03UER3N1kyZndaMlE3UFB5dk56VmJYdHRlWERVM056VmNYdHRlV3pVM0FqSDlKQUFBQUFNQUFBQUFBK1FENUFBWEFDY0FNQUFBQVNJSEJnY0dGUlFYRmhjV016STNOamMyTlRRbkppY21Bek15RmhVREZBWXJBU0ltTlFNME5oTWlKalEyTWhZVUJnSHVoSEp2UVVORFFtNXpnNGwxY1VKRVJFSnhkWjQyQkFZTUF3SW5Bd01NQmg4UEZoWWVGaFlENDBSQ2NYV0pnM051UWtORFFXOXloSWwxY1VKRS92WUdCZjdBQWdNREFnRkFCUWIrTmhZZkZoWWZGZ0FBQkFBQUFBQUR3QVBBQUFnQUVnQW9BRDBBQUFFeU5qUW1JZ1lVRmhjakZUTVJJeFV6TlNNRElnY0dCd1lWRkJZWEZqTXlOelkzTmpVMEp5NEJBeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQWZRWUlTRXdJU0ZSanprNXlUb3JoRzVyUFQ5OWFtK0RkbWhsUEQ0K1BNeUZiVjViTlRjM05WdGUybDViTlRjM05WdGVBcUFpTHlJaUx5STVIZjdFSEJ3Q3NUODlhMjZFZDh3OFBqNDhaV2gyZzI5cWZmeWpOelZiWHRwZVd6VTNOelZiWHRwZVd6VTNBQUFEQUFBQUFBT29BNmdBQ3dBZ0FEVUFBQUVISndjWEJ4YzNGemNuTndNaUJ3WUhCaFFYRmhjV01qYzJOelkwSnlZbkpnTWlKeVluSmpRM05qYzJNaGNXRnhZVUJ3WUhCZ0tPbXBvY21wb2NtcG9jbXBxMmRtWmlPanM3T21KbTdHWmlPanM3T21KbWRtdGRXVFEyTmpSWlhkWmRXVFEyTmpSWlhRS3FtcG9jbXBvY21wb2NtcG9CR1RzNlltYnNabUk2T3pzNlltYnNabUk2Ty96Q05qUlpYZFpkV1RRMk5qUlpYZFpkV1RRMkFBTUFBQUFBQStrRDZnQWFBQzhBTUFBQUFRWUhCaU1pSnlZbkpqUTNOamMyTWhjV0Z4WVZGQWNHQndFSEFUSTNOamMyTkNjbUp5WWlCd1lIQmhRWEZoY1dNd0tPTlVCQ1IyMWRXalUzTnpWYVhkcGRXelUyR0JjckFTTTUvZUJYUzBnckt5c3JTRXV1U2trcUxDd3FTVXBYQVNNckZ4ZzJOVnRkMmwxYU5UYzNOVnBkYlVkQ1FEWCszamtCR1NzclNFdXVTa2txTEN3cVNVcXVTMGdyS3dBQy8vOEFBQVBvQStnQUZBQXdBQUFCSWdjR0J3WVFGeFlYRmlBM05qYzJFQ2NtSnlZVEZnNEJJaThCQndZdUFUUS9BU2NtUGdFV0h3RTNOaDRCQmc4QkFmU0lkSEZEUkVSRGNYUUJFSFJ4UTBSRVEzRjBTUW9CRkJzS29xZ0tHeE1LcUtJS0FSUWJDcUtvQ2hzVUFRcW9BK2hFUTNGMC92QjBjVU5FUkVOeGRBRVFkSEZEUlAxakNoc1RDcWlpQ2dFVUd3cWlxQW9iRkFFS3FLSUtBUlFiQ3FJQUFBSUFBQUFBQStRRDVBQVhBRFFBQUFFaUJ3WUhCaFVVRnhZWEZqTXlOelkzTmpVMEp5WW5KaE1VQmlNRkZ4WVVEd0VHTHdFdUFUOEJOaDhCRmhRUEFRVXlGaDBCQWU2RWNtOUJRME5DYm5PRGlYVnhRa1JFUW5GMWZ3UUMvcEdEQVFFVkF3VHNBZ0VDN0FRRUZBSUJoQUZ3QWdNRDQwUkNjWFdKZzNOdVFrTkRRVzl5aElsMWNVSkUvZllDQXd1VkFnUUNGQVFFMEFJRkF0RUVCQlFDQlFHVkN3TURKd0FBQUFVQUFBQUFBOVFEMHdBakFDY0FOd0JIQUVnQUFBRVJGQVlqSVNJbU5SRWpJaVk5QVRRMk15RTFORFl6SVRJV0hRRWhNaFlkQVJRR0l5RVJJUkVISWdZVkVSUVdPd0V5TmpVUk5DWWpJU0lHRlJFVUZqc0JNalkxRVRRbUt3RURleVliL1hZYkprTUpEUTBKQVFZWkVnRXZFeGtCQmdrTkRRbjlDUUpjMFFrTkRRa3RDUTBOQ2Y3c0NRME5DUzBKRFEwSkxRTWkvVFFiSmlZYkFzd01DaXdKRFM0U0dSa1NMZzBKTEFvTS9Vd0N0R3NOQ2Y1TkNRME5DUUd6Q1EwTkNmNU5DUTBOQ1FHekNRMEFBQUFBRUFER0FBRUFBQUFBQUFFQUJBQUFBQUVBQUFBQUFBSUFCd0FFQUFFQUFBQUFBQU1BQkFBTEFBRUFBQUFBQUFRQUJBQVBBQUVBQUFBQUFBVUFDd0FUQUFFQUFBQUFBQVlBQkFBZUFBRUFBQUFBQUFvQUt3QWlBQUVBQUFBQUFBc0FFd0JOQUFNQUFRUUpBQUVBQ0FCZ0FBTUFBUVFKQUFJQURnQm9BQU1BQVFRSkFBTUFDQUIyQUFNQUFRUUpBQVFBQ0FCK0FBTUFBUVFKQUFVQUZnQ0dBQU1BQVFRSkFBWUFDQUNjQUFNQUFRUUpBQW9BVmdDa0FBTUFBUVFKQUFzQUpnRDZkMlYxYVZKbFozVnNZWEozWlhWcGQyVjFhVlpsY25OcGIyNGdNUzR3ZDJWMWFVZGxibVZ5WVhSbFpDQmllU0J6ZG1jeWRIUm1JR1p5YjIwZ1JtOXVkR1ZzYkc4Z2NISnZhbVZqZEM1b2RIUndPaTh2Wm05dWRHVnNiRzh1WTI5dEFIY0FaUUIxQUdrQVVnQmxBR2NBZFFCc0FHRUFjZ0IzQUdVQWRRQnBBSGNBWlFCMUFHa0FWZ0JsQUhJQWN3QnBBRzhBYmdBZ0FERUFMZ0F3QUhjQVpRQjFBR2tBUndCbEFHNEFaUUJ5QUdFQWRBQmxBR1FBSUFCaUFIa0FJQUJ6QUhZQVp3QXlBSFFBZEFCbUFDQUFaZ0J5QUc4QWJRQWdBRVlBYndCdUFIUUFaUUJzQUd3QWJ3QWdBSEFBY2dCdkFHb0FaUUJqQUhRQUxnQm9BSFFBZEFCd0FEb0FMd0F2QUdZQWJ3QnVBSFFBWlFCc0FHd0Fid0F1QUdNQWJ3QnRBQUFBQWdBQUFBQUFBQUFLQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVNBUUlCQXdFRUFRVUJCZ0VIQVFnQkNRRUtBUXNCREFFTkFRNEJEd0VRQVJFQkVnRVRBQVpqYVhKamJHVUlaRzkzYm14dllXUUVhVzVtYnd4ellXWmxYM04xWTJObGMzTUpjMkZtWlY5M1lYSnVCM04xWTJObGMzTU9jM1ZqWTJWemN5MWphWEpqYkdVUmMzVmpZMlZ6Y3kxdWJ5MWphWEpqYkdVSGQyRnBkR2x1Wnc1M1lXbDBhVzVuTFdOcGNtTnNaUVIzWVhKdUMybHVabTh0WTJseVkyeGxCbU5oYm1ObGJBWnpaV0Z5WTJnRlkyeGxZWElFWW1GamF3WmtaV3hsZEdVQUFBQUFcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIil9W2NsYXNzKj1cXFwiIHdldWktaWNvbi1cXFwiXSxbY2xhc3NePXdldWktaWNvbi1de2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtmb250Om5vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHgvMSB3ZXVpO2ZvbnQtc2l6ZTppbmhlcml0O3RleHQtcmVuZGVyaW5nOmF1dG87LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZH1bY2xhc3MqPVxcXCIgd2V1aS1pY29uLVxcXCJdOmJlZm9yZSxbY2xhc3NePXdldWktaWNvbi1dOmJlZm9yZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tbGVmdDouMmVtO21hcmdpbi1yaWdodDouMmVtfS53ZXVpLWljb24tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwMVxcXCJ9LndldWktaWNvbi1kb3dubG9hZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDJcXFwifS53ZXVpLWljb24taW5mbzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDNcXFwifS53ZXVpLWljb24tc2FmZS1zdWNjZXNzOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwNFxcXCJ9LndldWktaWNvbi1zYWZlLXdhcm46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA1XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA2XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3MtY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwN1xcXCJ9LndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwifS53ZXVpLWljb24td2FpdGluZzpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDlcXFwifS53ZXVpLWljb24td2FpdGluZy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBBXFxcIn0ud2V1aS1pY29uLXdhcm46YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBCXFxcIn0ud2V1aS1pY29uLWluZm8tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwQ1xcXCJ9LndldWktaWNvbi1jYW5jZWw6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBEXFxcIn0ud2V1aS1pY29uLXNlYXJjaDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEVcXFwifS53ZXVpLWljb24tY2xlYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBGXFxcIn0ud2V1aS1pY29uLWJhY2s6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTEwXFxcIn0ud2V1aS1pY29uLWRlbGV0ZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMTFcXFwifVtjbGFzcyo9XFxcIiB3ZXVpLWljb25fXFxcIl06YmVmb3JlLFtjbGFzc149d2V1aS1pY29uX106YmVmb3Jle21hcmdpbjowfS53ZXVpLWljb24tc3VjY2Vzc3tmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24td2FpdGluZ3tmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24td2Fybntmb250LXNpemU6MjNweDtjb2xvcjojZjQzNTMwfS53ZXVpLWljb24taW5mb3tmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24tc3VjY2Vzcy1jaXJjbGUsLndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24td2FpdGluZy1jaXJjbGV7Zm9udC1zaXplOjIzcHg7Y29sb3I6IzEwYWVmZn0ud2V1aS1pY29uLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojYzljOWM5fS53ZXVpLWljb24tZG93bmxvYWQsLndldWktaWNvbi1pbmZvLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMDliYjA3fS53ZXVpLWljb24tc2FmZS1zdWNjZXNze2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi1zYWZlLXdhcm57Y29sb3I6I2ZmYmUwMH0ud2V1aS1pY29uLWNhbmNlbHtjb2xvcjojZjQzNTMwO2ZvbnQtc2l6ZToyMnB4fS53ZXVpLWljb24tY2xlYXIsLndldWktaWNvbi1zZWFyY2h7Y29sb3I6I2IyYjJiMjtmb250LXNpemU6MTRweH0ud2V1aS1pY29uLWRlbGV0ZS53ZXVpLWljb25fZ2FsbGVyeS1kZWxldGV7Y29sb3I6I2ZmZjtmb250LXNpemU6MjJweH0ud2V1aS1pY29uX21zZ3tmb250LXNpemU6OTNweH0ud2V1aS1pY29uX21zZy53ZXVpLWljb24td2Fybntjb2xvcjojZjc2MjYwfS53ZXVpLWljb25fbXNnLXByaW1hcnl7Zm9udC1zaXplOjkzcHh9LndldWktaWNvbl9tc2ctcHJpbWFyeS53ZXVpLWljb24td2Fybntjb2xvcjojZmZiZTAwfS53ZXVpLWJ0bntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG87cGFkZGluZy1sZWZ0OjE0cHg7cGFkZGluZy1yaWdodDoxNHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtmb250LXNpemU6MThweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjIuNTU1NTU1NTY7Ym9yZGVyLXJhZGl1czo1cHg7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWJ0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjt3aWR0aDoyMDAlO2hlaWdodDoyMDAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMCwwLDAsLjIpOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC41KTt0cmFuc2Zvcm06c2NhbGUoLjUpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1yYWRpdXM6MTBweH0ud2V1aS1idG5faW5saW5le2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLWJ0bl9kZWZhdWx0e2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZjhmOGY4fS53ZXVpLWJ0bl9kZWZhdWx0Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6IzAwMH0ud2V1aS1idG5fZGVmYXVsdDpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6cmdiYSgwLDAsMCwuNik7YmFja2dyb3VuZC1jb2xvcjojZGVkZWRlfS53ZXVpLWJ0bl9wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzFhYWQxOX0ud2V1aS1idG5fcHJpbWFyeTpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVke2NvbG9yOiNmZmZ9LndldWktYnRuX3ByaW1hcnk6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6YWN0aXZle2NvbG9yOmhzbGEoMCwwJSwxMDAlLC42KTtiYWNrZ3JvdW5kLWNvbG9yOiMxNzliMTZ9LndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZTY0MzQwfS53ZXVpLWJ0bl93YXJuOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6I2ZmZn0ud2V1aS1idG5fd2Fybjpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpO2JhY2tncm91bmQtY29sb3I6I2NlM2MzOX0ud2V1aS1idG5fZGlzYWJsZWR7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpfS53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9kZWZhdWx0e2NvbG9yOnJnYmEoMCwwLDAsLjMpO2JhY2tncm91bmQtY29sb3I6I2Y3ZjdmN30ud2V1aS1idG5fZGlzYWJsZWQud2V1aS1idG5fcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiM5ZWQ5OWR9LndldWktYnRuX2Rpc2FibGVkLndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZWM4Yjg5fS53ZXVpLWJ0bl9sb2FkaW5nIC53ZXVpLWxvYWRpbmd7bWFyZ2luOi0uMmVtIC4zNGVtIDAgMH0ud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl9wcmltYXJ5LC53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm57Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojMTc5YjE2fS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojY2UzYzM5fS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5e2NvbG9yOiMxYWFkMTk7Ym9yZGVyOjFweCBzb2xpZCAjMWFhZDE5fS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5Om5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDI2LDE3MywyNSwuNik7Ym9yZGVyLWNvbG9yOnJnYmEoMjYsMTczLDI1LC42KX0ud2V1aS1idG5fcGxhaW4tcHJpbWFyeTphZnRlcntib3JkZXItd2lkdGg6MH0ud2V1aS1idG5fcGxhaW4tZGVmYXVsdHtjb2xvcjojMzUzNTM1O2JvcmRlcjoxcHggc29saWQgIzM1MzUzNX0ud2V1aS1idG5fcGxhaW4tZGVmYXVsdDpub3QoLndldWktYnRuX3BsYWluLWRpc2FibGVkKTphY3RpdmV7Y29sb3I6cmdiYSg1Myw1Myw1MywuNik7Ym9yZGVyLWNvbG9yOnJnYmEoNTMsNTMsNTMsLjYpfS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0OmFmdGVye2JvcmRlci13aWR0aDowfS53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZHtjb2xvcjpyZ2JhKDAsMCwwLC4yKTtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMil9YnV0dG9uLndldWktYnRuLGlucHV0LndldWktYnRue3dpZHRoOjEwMCU7Ym9yZGVyLXdpZHRoOjA7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lfWJ1dHRvbi53ZXVpLWJ0bjpmb2N1cyxpbnB1dC53ZXVpLWJ0bjpmb2N1c3tvdXRsaW5lOjB9YnV0dG9uLndldWktYnRuX2lubGluZSxidXR0b24ud2V1aS1idG5fbWluaSxpbnB1dC53ZXVpLWJ0bl9pbmxpbmUsaW5wdXQud2V1aS1idG5fbWluaXt3aWR0aDphdXRvfWJ1dHRvbi53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0LGJ1dHRvbi53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5LGlucHV0LndldWktYnRuX3BsYWluLWRlZmF1bHQsaW5wdXQud2V1aS1idG5fcGxhaW4tcHJpbWFyeXtib3JkZXItd2lkdGg6MXB4O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LndldWktYnRuX21pbml7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIDEuMzJlbTtsaW5lLWhlaWdodDoyLjM7Zm9udC1zaXplOjEzcHh9LndldWktYnRuKy53ZXVpLWJ0bnttYXJnaW4tdG9wOjE1cHh9LndldWktYnRuLndldWktYnRuX2lubGluZSsud2V1aS1idG4ud2V1aS1idG5faW5saW5le21hcmdpbi10b3A6YXV0bzttYXJnaW4tbGVmdDoxNXB4fS53ZXVpLWJ0bi1hcmVhe21hcmdpbjoxLjE3NjQ3MDU5ZW0gMTVweCAuM2VtfS53ZXVpLWJ0bi1hcmVhX2lubGluZXtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWJ0bi1hcmVhX2lubGluZSAud2V1aS1idG57bWFyZ2luLXRvcDphdXRvO21hcmdpbi1yaWdodDoxNXB4O3dpZHRoOjEwMCU7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWJ0bi1hcmVhX2lubGluZSAud2V1aS1idG46bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MH0ud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjEuMTc2NDcwNTllbTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MS40NzA1ODgyNDtmb250LXNpemU6MTdweDtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9LndldWktY2VsbHM6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWNlbGxzOmFmdGVyLC53ZXVpLWNlbGxzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTU7ei1pbmRleDoyfS53ZXVpLWNlbGxzOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWNlbGxzX190aXRsZXttYXJnaW4tdG9wOi43N2VtO21hcmdpbi1ib3R0b206LjNlbTtwYWRkaW5nLWxlZnQ6MTVweDtwYWRkaW5nLXJpZ2h0OjE1cHg7Y29sb3I6Izk5OTtmb250LXNpemU6MTRweH0ud2V1aS1jZWxsc19fdGl0bGUrLndldWktY2VsbHN7bWFyZ2luLXRvcDowfS53ZXVpLWNlbGxzX190aXBze21hcmdpbi10b3A6LjNlbTtjb2xvcjojOTk5O3BhZGRpbmctbGVmdDoxNXB4O3BhZGRpbmctcmlnaHQ6MTVweDtmb250LXNpemU6MTRweH0ud2V1aS1jZWxse3BhZGRpbmc6MTBweCAxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktY2VsbDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweDt6LWluZGV4OjJ9LndldWktY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWNlbGxfcHJpbWFyeXstd2Via2l0LWJveC1hbGlnbjpzdGFydDstbXMtZmxleC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS53ZXVpLWNlbGxfX2Jkey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1jZWxsX19mdHt0ZXh0LWFsaWduOnJpZ2h0O2NvbG9yOiM5OTl9LndldWktY2VsbF9zd2lwZWR7ZGlzcGxheTpibG9jaztwYWRkaW5nOjB9LndldWktY2VsbF9zd2lwZWQ+LndldWktY2VsbF9fYmR7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud2V1aS1jZWxsX3N3aXBlZD4ud2V1aS1jZWxsX19mdHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO2JvdHRvbTowO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Y29sb3I6I2ZmZn0ud2V1aS1zd2lwZWQtYnRue2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDFlbTtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0O2NvbG9yOmluaGVyaXR9LndldWktc3dpcGVkLWJ0bl9kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2M3YzdjY30ud2V1aS1zd2lwZWQtYnRuX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZmYzYjMwfS53ZXVpLWNlbGxfYWNjZXNzey13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO2NvbG9yOmluaGVyaXR9LndldWktY2VsbF9hY2Nlc3M6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1jZWxsX2FjY2VzcyAud2V1aS1jZWxsX19mdHtwYWRkaW5nLXJpZ2h0OjEzcHg7cG9zaXRpb246cmVsYXRpdmV9LndldWktY2VsbF9hY2Nlc3MgLndldWktY2VsbF9fZnQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjZweDt3aWR0aDo2cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2JvcmRlci1jb2xvcjojYzhjOGNkO2JvcmRlci1zdHlsZTpzb2xpZDstd2Via2l0LXRyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3RyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bWFyZ2luLXRvcDotNHB4O3JpZ2h0OjJweH0ud2V1aS1jZWxsX2xpbmt7Y29sb3I6IzU4NmM5NDtmb250LXNpemU6MTRweH0ud2V1aS1jZWxsX2xpbms6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6YmxvY2t9LndldWktY2hlY2tfX2xhYmVsey13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLWNoZWNrX19sYWJlbDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWNoZWNre3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTllbX0ud2V1aS1jZWxsc19yYWRpbyAud2V1aS1jZWxsX19mdHtwYWRkaW5nLWxlZnQ6LjM1ZW19LndldWktY2VsbHNfcmFkaW8gLndldWktY2hlY2s6Y2hlY2tlZCsud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2Rpc3BsYXk6YmxvY2s7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwiO2NvbG9yOiMwOWJiMDc7Zm9udC1zaXplOjE2cHh9LndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2VsbF9faGR7cGFkZGluZy1yaWdodDouMzVlbX0ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAxXFxcIjtjb2xvcjojYzljOWM5O2ZvbnQtc2l6ZToyM3B4O2Rpc3BsYXk6YmxvY2t9LndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2hlY2s6Y2hlY2tlZCsud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA2XFxcIjtjb2xvcjojMDliYjA3fS53ZXVpLWxhYmVse2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTA1cHg7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGx9LndldWktaW5wdXR7d2lkdGg6MTAwJTtib3JkZXI6MDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtmb250LXNpemU6aW5oZXJpdDtjb2xvcjppbmhlcml0O2hlaWdodDoxLjQ3MDU4ODI0ZW07bGluZS1oZWlnaHQ6MS40NzA1ODgyNH0ud2V1aS1pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwud2V1aS1pbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbnstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTttYXJnaW46MH0ud2V1aS10ZXh0YXJlYXtkaXNwbGF5OmJsb2NrO2JvcmRlcjowO3Jlc2l6ZTpub25lO3dpZHRoOjEwMCU7Y29sb3I6aW5oZXJpdDtmb250LXNpemU6MWVtO2xpbmUtaGVpZ2h0OmluaGVyaXQ7b3V0bGluZTowfS53ZXVpLXRleHRhcmVhLWNvdW50ZXJ7Y29sb3I6I2IyYjJiMjt0ZXh0LWFsaWduOnJpZ2h0fS53ZXVpLWNlbGxfd2FybiAud2V1aS10ZXh0YXJlYS1jb3VudGVye2NvbG9yOiNlNjQzNDB9LndldWktdG9wdGlwc3tkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtwYWRkaW5nOjVweDtmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojZmZmO3otaW5kZXg6NTAwMDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ud2V1aS10b3B0aXBzX3dhcm57YmFja2dyb3VuZC1jb2xvcjojZTY0MzQwfS53ZXVpLWNlbGxzX2Zvcm0gLndldWktY2VsbF9fZnR7Zm9udC1zaXplOjB9LndldWktY2VsbHNfZm9ybSAud2V1aS1pY29uLXdhcm57ZGlzcGxheTpub25lfS53ZXVpLWNlbGxzX2Zvcm0gaW5wdXQsLndldWktY2VsbHNfZm9ybSBsYWJlbFtmb3JdLC53ZXVpLWNlbGxzX2Zvcm0gdGV4dGFyZWF7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktY2VsbF93YXJue2NvbG9yOiNlNjQzNDB9LndldWktY2VsbF93YXJuIC53ZXVpLWljb24td2FybntkaXNwbGF5OmlubGluZS1ibG9ja30ud2V1aS1mb3JtLXByZXZpZXd7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZC1jb2xvcjojZmZmfS53ZXVpLWZvcm0tcHJldmlldzpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZm9ybS1wcmV2aWV3OmFmdGVyLC53ZXVpLWZvcm0tcHJldmlldzpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLWZvcm0tcHJldmlldzphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2hke3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweCAxNXB4O3RleHQtYWxpZ246cmlnaHQ7bGluZS1oZWlnaHQ6Mi41ZW19LndldWktZm9ybS1wcmV2aWV3X19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4fS53ZXVpLWZvcm0tcHJldmlld19faGQgLndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtmb250LXN0eWxlOm5vcm1hbDtmb250LXNpemU6MS42ZW19LndldWktZm9ybS1wcmV2aWV3X19iZHtwYWRkaW5nOjEwcHggMTVweDtmb250LXNpemU6LjllbTt0ZXh0LWFsaWduOnJpZ2h0O2NvbG9yOiM5OTk7bGluZS1oZWlnaHQ6Mn0ud2V1aS1mb3JtLXByZXZpZXdfX2Z0e3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjUwcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1mb3JtLXByZXZpZXdfX2Z0OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZm9ybS1wcmV2aWV3X19pdGVte292ZXJmbG93OmhpZGRlbn0ud2V1aS1mb3JtLXByZXZpZXdfX2xhYmVse2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OjFlbTttaW4td2lkdGg6NGVtO2NvbG9yOiM5OTk7dGV4dC1hbGlnbjpqdXN0aWZ5O3RleHQtYWxpZ24tbGFzdDpqdXN0aWZ5fS53ZXVpLWZvcm0tcHJldmlld19fdmFsdWV7ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47d29yZC1icmVhazpub3JtYWw7d29yZC13cmFwOmJyZWFrLXdvcmR9LndldWktZm9ybS1wcmV2aWV3X19idG57cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzNjYzUxZjt0ZXh0LWFsaWduOmNlbnRlcjstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1idXR0b24ud2V1aS1mb3JtLXByZXZpZXdfX2J0bntiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowO291dGxpbmU6MDtsaW5lLWhlaWdodDppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0fS53ZXVpLWZvcm0tcHJldmlld19fYnRuOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9LndldWktZm9ybS1wcmV2aWV3X19idG46YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bjpmaXJzdC1jaGlsZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktZm9ybS1wcmV2aWV3X19idG5fZGVmYXVsdHtjb2xvcjojOTk5fS53ZXVpLWZvcm0tcHJldmlld19fYnRuX3ByaW1hcnl7Y29sb3I6IzBiYjIwY30ud2V1aS1jZWxsX3NlbGVjdHtwYWRkaW5nOjB9LndldWktY2VsbF9zZWxlY3QgLndldWktc2VsZWN0e3BhZGRpbmctcmlnaHQ6MzBweH0ud2V1aS1jZWxsX3NlbGVjdCAud2V1aS1jZWxsX19iZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtyaWdodDoxNXB4O21hcmdpbi10b3A6LTRweH0ud2V1aS1zZWxlY3R7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7Ym9yZGVyOjA7b3V0bGluZTowO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7d2lkdGg6MTAwJTtmb250LXNpemU6aW5oZXJpdDtoZWlnaHQ6NDVweDtsaW5lLWhlaWdodDo0NXB4O3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MTtwYWRkaW5nLWxlZnQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmV7cGFkZGluZy1yaWdodDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1zZWxlY3R7d2lkdGg6MTA1cHg7Ym94LXNpemluZzpib3JkZXItYm94fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZHtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjZweDt3aWR0aDo2cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwO2JvcmRlci1jb2xvcjojYzhjOGNkO2JvcmRlci1zdHlsZTpzb2xpZDstd2Via2l0LXRyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3RyYW5zZm9ybTptYXRyaXgoLjcxLC43MSwtLjcxLC43MSwwLDApO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7cmlnaHQ6MTVweDttYXJnaW4tdG9wOi00cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2Jke3BhZGRpbmctbGVmdDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19iZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktY2VsbF9zZWxlY3QtYWZ0ZXJ7cGFkZGluZy1sZWZ0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYWZ0ZXIgLndldWktc2VsZWN0e3BhZGRpbmctbGVmdDowfS53ZXVpLWNlbGxfdmNvZGV7cGFkZGluZy10b3A6MDtwYWRkaW5nLXJpZ2h0OjA7cGFkZGluZy1ib3R0b206MH0ud2V1aS12Y29kZS1idG4sLndldWktdmNvZGUtaW1ne21hcmdpbi1sZWZ0OjVweDtoZWlnaHQ6NDVweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktdmNvZGUtYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MCAuNmVtIDAgLjdlbTtib3JkZXItbGVmdDoxcHggc29saWQgI2U1ZTVlNTtsaW5lLWhlaWdodDo0NXB4O2ZvbnQtc2l6ZToxN3B4O2NvbG9yOiMzY2M1MWZ9YnV0dG9uLndldWktdmNvZGUtYnRue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcDowO2JvcmRlci1yaWdodDowO2JvcmRlci1ib3R0b206MDtvdXRsaW5lOjB9LndldWktdmNvZGUtYnRuOmFjdGl2ZXtjb2xvcjojNTJhMzQxfS53ZXVpLWdhbGxlcnl7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6IzAwMDt6LWluZGV4OjEwMDB9LndldWktZ2FsbGVyeV9faW1ne3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjYwcHg7bGVmdDowO2JhY2tncm91bmQ6NTAlIG5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbn0ud2V1aS1nYWxsZXJ5X19vcHJ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7YmFja2dyb3VuZC1jb2xvcjojMGQwZDBkO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6NjBweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1nYWxsZXJ5X19kZWx7ZGlzcGxheTpibG9ja30ud2V1aS1jZWxsX3N3aXRjaHtwYWRkaW5nLXRvcDo2LjVweDtwYWRkaW5nLWJvdHRvbTo2LjVweH0ud2V1aS1zd2l0Y2h7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lfS53ZXVpLXN3aXRjaCwud2V1aS1zd2l0Y2gtY3BfX2JveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo1MnB4O2hlaWdodDozMnB4O2JvcmRlcjoxcHggc29saWQgI2RmZGZkZjtvdXRsaW5lOjA7Ym9yZGVyLXJhZGl1czoxNnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDtiYWNrZ3JvdW5kLWNvbG9yOiNkZmRmZGY7dHJhbnNpdGlvbjpiYWNrZ3JvdW5kLWNvbG9yIC4xcyxib3JkZXIgLjFzfS53ZXVpLXN3aXRjaC1jcF9fYm94OmJlZm9yZSwud2V1aS1zd2l0Y2g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDo1MHB4O2hlaWdodDozMHB4O2JvcmRlci1yYWRpdXM6MTVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZGZkZmQ7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKSwtd2Via2l0LXRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNDUsMSwuNCwxKX0ud2V1aS1zd2l0Y2gtY3BfX2JveDphZnRlciwud2V1aS1zd2l0Y2g6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC40KTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpLC13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWR+LndldWktc3dpdGNoLWNwX19ib3gsLndldWktc3dpdGNoOmNoZWNrZWR7Ym9yZGVyLWNvbG9yOiMwNGJlMDI7YmFja2dyb3VuZC1jb2xvcjojMDRiZTAyfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveDpiZWZvcmUsLndldWktc3dpdGNoOmNoZWNrZWQ6YmVmb3Jley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWR+LndldWktc3dpdGNoLWNwX19ib3g6YWZ0ZXIsLndldWktc3dpdGNoOmNoZWNrZWQ6YWZ0ZXJ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgyMHB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgyMHB4KX0ud2V1aS1zd2l0Y2gtY3BfX2lucHV0e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTk5OTlweH0ud2V1aS1zd2l0Y2gtY3BfX2JveHtkaXNwbGF5OmJsb2NrfS53ZXVpLXVwbG9hZGVyX19oZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3BhZGRpbmctYm90dG9tOjEwcHg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktdXBsb2FkZXJfX3RpdGxley13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS11cGxvYWRlcl9faW5mb3tjb2xvcjojYjJiMmIyfS53ZXVpLXVwbG9hZGVyX19iZHttYXJnaW4tYm90dG9tOi00cHg7bWFyZ2luLXJpZ2h0Oi05cHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXVwbG9hZGVyX19maWxlc3tsaXN0LXN0eWxlOm5vbmV9LndldWktdXBsb2FkZXJfX2ZpbGV7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6OXB4O21hcmdpbi1ib3R0b206OXB4O3dpZHRoOjc5cHg7aGVpZ2h0Ojc5cHg7YmFja2dyb3VuZDpuby1yZXBlYXQgNTAlO2JhY2tncm91bmQtc2l6ZTpjb3Zlcn0ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXN7cG9zaXRpb246cmVsYXRpdmV9LndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjUpfS53ZXVpLXVwbG9hZGVyX19maWxlX3N0YXR1cyAud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50e2Rpc3BsYXk6YmxvY2t9LndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudHtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7Y29sb3I6I2ZmZn0ud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50IC53ZXVpLWljb24td2FybntkaXNwbGF5OmlubGluZS1ibG9ja30ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94e2Zsb2F0OmxlZnQ7cG9zaXRpb246cmVsYXRpdmU7bWFyZ2luLXJpZ2h0OjlweDttYXJnaW4tYm90dG9tOjlweDt3aWR0aDo3N3B4O2hlaWdodDo3N3B4O2JvcmRlcjoxcHggc29saWQgI2Q5ZDlkOX0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFmdGVyLC53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2JhY2tncm91bmQtY29sb3I6I2Q5ZDlkOX0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmJlZm9yZXt3aWR0aDoycHg7aGVpZ2h0OjM5LjVweH0ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94OmFmdGVye3dpZHRoOjM5LjVweDtoZWlnaHQ6MnB4fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZle2JvcmRlci1jb2xvcjojOTk5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZlOmFmdGVyLC53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZlOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiM5OTl9LndldWktdXBsb2FkZXJfX2lucHV0e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvcGFjaXR5OjA7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktbXNne3BhZGRpbmctdG9wOjM2cHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktbXNnX19pY29uLWFyZWF7bWFyZ2luLWJvdHRvbTozMHB4fS53ZXVpLW1zZ19fdGV4dC1hcmVhe21hcmdpbi1ib3R0b206MjVweDtwYWRkaW5nOjAgMjBweH0ud2V1aS1tc2dfX3RleHQtYXJlYSBhe2NvbG9yOiM1ODZjOTR9LndldWktbXNnX190aXRsZXttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjIwcHh9LndldWktbXNnX19kZXNje2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM5OTl9LndldWktbXNnX19vcHItYXJlYXttYXJnaW4tYm90dG9tOjI1cHh9LndldWktbXNnX19leHRyYS1hcmVhe21hcmdpbi1ib3R0b206MTVweDtmb250LXNpemU6MTRweDtjb2xvcjojOTk5fS53ZXVpLW1zZ19fZXh0cmEtYXJlYSBhe2NvbG9yOiM1ODZjOTR9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6NDM4cHgpey53ZXVpLW1zZ19fZXh0cmEtYXJlYXtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7Ym90dG9tOjA7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcn19LndldWktYXJ0aWNsZXtwYWRkaW5nOjIwcHggMTVweDtmb250LXNpemU6MTVweH0ud2V1aS1hcnRpY2xlIHNlY3Rpb257bWFyZ2luLWJvdHRvbToxLjVlbX0ud2V1aS1hcnRpY2xlIGgxe2ZvbnQtc2l6ZToxOHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tYm90dG9tOi45ZW19LndldWktYXJ0aWNsZSBoMntmb250LXNpemU6MTZweH0ud2V1aS1hcnRpY2xlIGgyLC53ZXVpLWFydGljbGUgaDN7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjM0ZW19LndldWktYXJ0aWNsZSBoM3tmb250LXNpemU6MTVweH0ud2V1aS1hcnRpY2xlICp7bWF4LXdpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3dvcmQtd3JhcDpicmVhay13b3JkfS53ZXVpLWFydGljbGUgcHttYXJnaW46MCAwIC44ZW19LndldWktdGFiYmFye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo1MDA7Ym90dG9tOjA7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmN2Y3ZmF9LndldWktdGFiYmFyOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNjMGJmYzQ7Y29sb3I6I2MwYmZjNDstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktdGFiYmFyX19pdGVte2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3BhZGRpbmc6NXB4IDAgMDtmb250LXNpemU6MDtjb2xvcjojOTk5O3RleHQtYWxpZ246Y2VudGVyOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2ljb24sLndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9faWNvbj5pLC53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2xhYmVse2NvbG9yOiMwOWJiMDd9LndldWktdGFiYmFyX19pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjI3cHg7aGVpZ2h0OjI3cHh9LndldWktdGFiYmFyX19pY29uPmksaS53ZXVpLXRhYmJhcl9faWNvbntmb250LXNpemU6MjRweDtjb2xvcjojOTk5fS53ZXVpLXRhYmJhcl9faWNvbiBpbWd7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ud2V1aS10YWJiYXJfX2xhYmVse3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM5OTk7Zm9udC1zaXplOjEwcHg7bGluZS1oZWlnaHQ6MS44fS53ZXVpLW5hdmJhcntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6NTAwO3RvcDowO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZmFmYWZhfS53ZXVpLW5hdmJhcjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7Y29sb3I6I2NjYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktbmF2YmFyKy53ZXVpLXRhYl9fcGFuZWx7cGFkZGluZy10b3A6NTBweDtwYWRkaW5nLWJvdHRvbTowfS53ZXVpLW5hdmJhcl9faXRlbXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtwYWRkaW5nOjEzcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1uYXZiYXJfX2l0ZW06YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VkZWRlZH0ud2V1aS1uYXZiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb257YmFja2dyb3VuZC1jb2xvcjojZWFlYWVhfS53ZXVpLW5hdmJhcl9faXRlbTphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNjY2M7Y29sb3I6I2NjYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktbmF2YmFyX19pdGVtOmxhc3QtY2hpbGQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLXRhYntwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6MTAwJX0ud2V1aS10YWJfX3BhbmVse2JveC1zaXppbmc6Ym9yZGVyLWJveDtoZWlnaHQ6MTAwJTtwYWRkaW5nLWJvdHRvbTo1MHB4O292ZXJmbG93OmF1dG87LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6dG91Y2h9LndldWktdGFiX19jb250ZW50e2Rpc3BsYXk6bm9uZX0ud2V1aS1wcm9ncmVzc3tkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLXByb2dyZXNzX19iYXJ7YmFja2dyb3VuZC1jb2xvcjojZWJlYmViO2hlaWdodDozcHg7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXByb2dyZXNzX19pbm5lci1iYXJ7d2lkdGg6MDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiMwOWJiMDd9LndldWktcHJvZ3Jlc3NfX29wcntkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OjE1cHg7Zm9udC1zaXplOjB9LndldWktcGFuZWx7YmFja2dyb3VuZC1jb2xvcjojZmZmO21hcmdpbi10b3A6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LndldWktcGFuZWw6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDowfS53ZXVpLXBhbmVsOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1wYW5lbDphZnRlciwud2V1aS1wYW5lbDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLXBhbmVsOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBhbmVsX19oZHtwYWRkaW5nOjE0cHggMTVweCAxMHB4O2NvbG9yOiM5OTk7Zm9udC1zaXplOjEzcHg7cG9zaXRpb246cmVsYXRpdmV9LndldWktcGFuZWxfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktbWVkaWEtYm94e3BhZGRpbmc6MTVweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1tZWRpYS1ib3g6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktbWVkaWEtYm94OmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9YS53ZXVpLW1lZGlhLWJveHtjb2xvcjojMDAwOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfWEud2V1aS1tZWRpYS1ib3g6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1tZWRpYS1ib3hfX3RpdGxle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTdweDt3aWR0aDphdXRvO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDt3b3JkLXdyYXA6bm9ybWFsO3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsfS53ZXVpLW1lZGlhLWJveF9fZGVzY3tjb2xvcjojOTk5O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjEuMjtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5Oi13ZWJraXQtYm94Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWxpbmUtY2xhbXA6Mn0ud2V1aS1tZWRpYS1ib3hfX2luZm97bWFyZ2luLXRvcDoxNXB4O3BhZGRpbmctYm90dG9tOjVweDtmb250LXNpemU6MTNweDtjb2xvcjojY2VjZWNlO2xpbmUtaGVpZ2h0OjFlbTtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YXtmbG9hdDpsZWZ0O3BhZGRpbmctcmlnaHQ6MWVtfS53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YV9leHRyYXtwYWRkaW5nLWxlZnQ6MWVtO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjY2VjZWNlfS53ZXVpLW1lZGlhLWJveF90ZXh0IC53ZXVpLW1lZGlhLWJveF9fdGl0bGV7bWFyZ2luLWJvdHRvbTo4cHh9LndldWktbWVkaWEtYm94X2FwcG1zZ3tkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X19oZHttYXJnaW4tcmlnaHQ6LjhlbTt3aWR0aDo2MHB4O2hlaWdodDo2MHB4O2xpbmUtaGVpZ2h0OjYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LndldWktbWVkaWEtYm94X2FwcG1zZyAud2V1aS1tZWRpYS1ib3hfX3RodW1ie3dpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlO3ZlcnRpY2FsLWFsaWduOnRvcH0ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9fYmR7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO21pbi13aWR0aDowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2d7cGFkZGluZzowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cgLndldWktY2VsbHN7bWFyZ2luLXRvcDowfS53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cgLndldWktY2VsbHM6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1ncmlkc3twb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LndldWktZ3JpZHM6YmVmb3Jle3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1ncmlkczphZnRlciwud2V1aS1ncmlkczpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO2NvbG9yOiNkOWQ5ZDl9LndldWktZ3JpZHM6YWZ0ZXJ7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1ncmlke3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnQ7cGFkZGluZzoyMHB4IDEwcHg7d2lkdGg6MzMuMzMzMzMzMzMlO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud2V1aS1ncmlkOmJlZm9yZXt0b3A6MDt3aWR0aDoxcHg7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZDlkOWQ5Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1ncmlkOmFmdGVyLC53ZXVpLWdyaWQ6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7Ym90dG9tOjA7Y29sb3I6I2Q5ZDlkOX0ud2V1aS1ncmlkOmFmdGVye2xlZnQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWdyaWQ6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1ncmlkX19pY29ue3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7bWFyZ2luOjAgYXV0b30ud2V1aS1ncmlkX19pY29uIGltZ3tkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LndldWktZ3JpZF9faWNvbisud2V1aS1ncmlkX19sYWJlbHttYXJnaW4tdG9wOjVweH0ud2V1aS1ncmlkX19sYWJlbHtkaXNwbGF5OmJsb2NrO2NvbG9yOiMwMDA7d2hpdGUtc3BhY2U6bm93cmFwO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWZvb3Rlciwud2V1aS1ncmlkX19sYWJlbHt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweH0ud2V1aS1mb290ZXJ7Y29sb3I6Izk5OX0ud2V1aS1mb290ZXIgYXtjb2xvcjojNTg2Yzk0fS53ZXVpLWZvb3Rlcl9maXhlZC1ib3R0b217cG9zaXRpb246Zml4ZWQ7Ym90dG9tOi41MmVtO2xlZnQ6MDtyaWdodDowfS53ZXVpLWZvb3Rlcl9fbGlua3N7Zm9udC1zaXplOjB9LndldWktZm9vdGVyX19saW5re2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcDttYXJnaW46MCAuNjJlbTtwb3NpdGlvbjpyZWxhdGl2ZTtmb250LXNpemU6MTRweH0ud2V1aS1mb290ZXJfX2xpbms6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjN2M3Yzc7Y29sb3I6I2M3YzdjNzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSk7bGVmdDotLjY1ZW07dG9wOi4zNmVtO2JvdHRvbTouMzZlbX0ud2V1aS1mb290ZXJfX2xpbms6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX0ud2V1aS1mb290ZXJfX3RleHR7cGFkZGluZzowIC4zNGVtO2ZvbnQtc2l6ZToxMnB4fS53ZXVpLWZsZXh7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0ud2V1aS1mbGV4X19pdGVtey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1kaWFsb2d7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo1MDAwO3dpZHRoOjgwJTttYXgtd2lkdGg6MzAwcHg7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7YmFja2dyb3VuZC1jb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1yYWRpdXM6M3B4O292ZXJmbG93OmhpZGRlbn0ud2V1aS1kaWFsb2dfX2hke3BhZGRpbmc6MS4zZW0gMS42ZW0gLjVlbX0ud2V1aS1kaWFsb2dfX3RpdGxle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MThweH0ud2V1aS1kaWFsb2dfX2Jke3BhZGRpbmc6MCAxLjZlbSAuOGVtO21pbi1oZWlnaHQ6NDBweDtmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxLjM7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGw7Y29sb3I6Izk5OX0ud2V1aS1kaWFsb2dfX2JkOmZpcnN0LWNoaWxke3BhZGRpbmc6Mi43ZW0gMjBweCAxLjdlbTtjb2xvcjojMzUzNTM1fS53ZXVpLWRpYWxvZ19fZnR7cG9zaXRpb246cmVsYXRpdmU7bGluZS1oZWlnaHQ6NDhweDtmb250LXNpemU6MThweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWRpYWxvZ19fZnQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWRpYWxvZ19fYnRue2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO2NvbG9yOiMzY2M1MWY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7cG9zaXRpb246cmVsYXRpdmV9LndldWktZGlhbG9nX19idG46YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VlZX0ud2V1aS1kaWFsb2dfX2J0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWRpYWxvZ19fYnRuOmZpcnN0LWNoaWxkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1kaWFsb2dfX2J0bl9kZWZhdWx0e2NvbG9yOiMzNTM1MzV9LndldWktZGlhbG9nX19idG5fcHJpbWFyeXtjb2xvcjojMGJiMjBjfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2d7dGV4dC1hbGlnbjpsZWZ0O2JveC1zaGFkb3c6MCA2cHggMzBweCAwIHJnYmEoMCwwLDAsLjEpfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX3RpdGxle2ZvbnQtc2l6ZToyMXB4fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2hke3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19iZHtjb2xvcjojOTk5O3BhZGRpbmc6LjI1ZW0gMS42ZW0gMmVtO2ZvbnQtc2l6ZToxN3B4O3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19iZDpmaXJzdC1jaGlsZHtwYWRkaW5nOjEuNmVtIDEuNmVtIDJlbTtjb2xvcjojMzUzNTM1fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Z0e2Rpc3BsYXk6YmxvY2s7dGV4dC1hbGlnbjpyaWdodDtsaW5lLWhlaWdodDo0MnB4O2ZvbnQtc2l6ZToxNnB4O3BhZGRpbmc6MCAxLjZlbSAuN2VtfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Z0OmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wO3BhZGRpbmc6MCAuOGVtfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjphZnRlcntkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmFjdGl2ZSwud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46dmlzaXRlZHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjA2KX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6LS44ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuX2RlZmF1bHR7Y29sb3I6Z3JheX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEwMjRweCl7LndldWktZGlhbG9ne3dpZHRoOjM1JX19LndldWktdG9hc3R7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo1MDAwO3dpZHRoOjcuNmVtO21pbi1oZWlnaHQ6Ny42ZW07dG9wOjE4MHB4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0zLjhlbTtiYWNrZ3JvdW5kOmhzbGEoMCwwJSw3JSwuNyk7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czo1cHg7Y29sb3I6I2ZmZn0ud2V1aS1pY29uX3RvYXN0e21hcmdpbjoyMnB4IDAgMDtkaXNwbGF5OmJsb2NrfS53ZXVpLWljb25fdG9hc3Qud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xlOmJlZm9yZXtjb2xvcjojZmZmO2ZvbnQtc2l6ZTo1NXB4fS53ZXVpLWljb25fdG9hc3Qud2V1aS1sb2FkaW5ne21hcmdpbjozMHB4IDAgMDt3aWR0aDozOHB4O2hlaWdodDozOHB4O3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS53ZXVpLXRvYXN0X19jb250ZW50e21hcmdpbjowIDAgMTVweH0ud2V1aS1tYXNre2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNil9LndldWktbWFzaywud2V1aS1tYXNrX3RyYW5zcGFyZW50e3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMDt0b3A6MDtyaWdodDowO2xlZnQ6MDtib3R0b206MH0ud2V1aS1hY3Rpb25zaGVldHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7Ym90dG9tOjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3otaW5kZXg6NTAwMDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2VmZWZmNDt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLC13ZWJraXQtdHJhbnNmb3JtIC4zc30ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGV7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjY1cHg7cGFkZGluZzowIDIwcHg7bGluZS1oZWlnaHQ6MS40O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstbXMtZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweDtjb2xvcjojODg4O2JhY2tncm91bmQ6I2ZjZmNmZH0ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGU6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1hY3Rpb25zaGVldF9fdGl0bGUgLndldWktYWN0aW9uc2hlZXRfX3RpdGxlLXRleHR7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTotd2Via2l0LWJveDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1saW5lLWNsYW1wOjJ9LndldWktYWN0aW9uc2hlZXRfX21lbnV7YmFja2dyb3VuZC1jb2xvcjojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb257bWFyZ2luLXRvcDo2cHg7YmFja2dyb3VuZC1jb2xvcjojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X19jZWxse3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6MTBweCAwO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxOHB4fS53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktYWN0aW9uc2hlZXRfX2NlbGw6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VjZWNlY30ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjUwJTt0b3A6NTAlO2JvdHRvbTphdXRvOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt3aWR0aDoyNzRweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fYWN0aW9ue2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX21lbnV7Ym9yZGVyLXJhZGl1czoycHg7Ym94LXNoYWRvdzowIDZweCAzMHB4IDAgcmdiYSgwLDAsMCwuMSl9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19jZWxse3BhZGRpbmc6MTNweCAyNHB4O2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjEuNDt0ZXh0LWFsaWduOmxlZnR9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmZpcnN0LWNoaWxke2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MnB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjJweH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGw6bGFzdC1jaGlsZHtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjJweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czoycHh9LndldWktYWN0aW9uc2hlZXRfdG9nZ2xley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDApfS53ZXVpLWxvYWRtb3Jle3dpZHRoOjY1JTttYXJnaW46MS41ZW0gYXV0bztsaW5lLWhlaWdodDoxLjZlbTtmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1sb2FkbW9yZV9fdGlwc3tkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktbG9hZG1vcmVfbGluZXtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O21hcmdpbi10b3A6Mi40ZW19LndldWktbG9hZG1vcmVfbGluZSAud2V1aS1sb2FkbW9yZV9fdGlwc3twb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS45ZW07cGFkZGluZzowIC41NWVtO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojOTk5fS53ZXVpLWxvYWRtb3JlX2RvdCAud2V1aS1sb2FkbW9yZV9fdGlwc3twYWRkaW5nOjAgLjE2ZW19LndldWktbG9hZG1vcmVfZG90IC53ZXVpLWxvYWRtb3JlX190aXBzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjt3aWR0aDo0cHg7aGVpZ2h0OjRweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kLWNvbG9yOiNlNWU1ZTU7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246MDt0b3A6LS4xNmVtfS53ZXVpLWJhZGdle2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6LjE1ZW0gLjRlbTttaW4td2lkdGg6OHB4O2JvcmRlci1yYWRpdXM6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiNmNDM1MzA7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDoxLjI7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjEycHg7dmVydGljYWwtYWxpZ246bWlkZGxlfS53ZXVpLWJhZGdlX2RvdHtwYWRkaW5nOi40ZW07bWluLXdpZHRoOjB9LndldWktc2VhcmNoLWJhcntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjhweCAxMHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQtY29sb3I6I2VmZWZmNH0ud2V1aS1zZWFyY2gtYmFyOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZDdkNmRjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1zZWFyY2gtYmFyOmFmdGVyLC53ZXVpLXNlYXJjaC1iYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2Q3ZDZkY30ud2V1aS1zZWFyY2gtYmFyOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkN2Q2ZGM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG57ZGlzcGxheTpibG9ja30ud2V1aS1zZWFyY2gtYmFyLndldWktc2VhcmNoLWJhcl9mb2N1c2luZyAud2V1aS1zZWFyY2gtYmFyX19sYWJlbHtkaXNwbGF5Om5vbmV9LndldWktc2VhcmNoLWJhcl9fZm9ybXtwb3NpdGlvbjpyZWxhdGl2ZTstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6YXV0bztmbGV4OmF1dG87YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0fS53ZXVpLXNlYXJjaC1iYXJfX2Zvcm06YWZ0ZXJ7Y29udGVudDpcXFwiXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MjAwJTtoZWlnaHQ6MjAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNSk7dHJhbnNmb3JtOnNjYWxlKC41KTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwO2JvcmRlci1yYWRpdXM6MTBweDtib3JkZXI6MXB4IHNvbGlkICNlNmU2ZWE7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQ6I2ZmZn0ud2V1aS1zZWFyY2gtYmFyX19ib3h7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjMwcHg7cGFkZGluZy1yaWdodDozMHB4O2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MX0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktc2VhcmNoLWJhcl9faW5wdXR7cGFkZGluZzo0cHggMDt3aWR0aDoxMDAlO2hlaWdodDoxLjQyODU3MTQzZW07Ym9yZGVyOjA7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0M2VtO2JveC1zaXppbmc6Y29udGVudC1ib3g7YmFja2dyb3VuZDp0cmFuc3BhcmVudH0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktc2VhcmNoLWJhcl9faW5wdXQ6Zm9jdXN7b3V0bGluZTpub25lfS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1pY29uLXNlYXJjaHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjEwcHg7dG9wOjA7bGluZS1oZWlnaHQ6MjhweH0ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktaWNvbi1jbGVhcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO3BhZGRpbmc6MCAxMHB4O2xpbmUtaGVpZ2h0OjI4cHh9LndldWktc2VhcmNoLWJhcl9fbGFiZWx7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFweDtyaWdodDoxcHg7Ym90dG9tOjFweDtsZWZ0OjFweDt6LWluZGV4OjI7Ym9yZGVyLXJhZGl1czozcHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzliOWI5YjtiYWNrZ3JvdW5kOiNmZmZ9LndldWktc2VhcmNoLWJhcl9fbGFiZWwgc3BhbntkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MTRweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktc2VhcmNoLWJhcl9fbGFiZWwgLndldWktaWNvbi1zZWFyY2h7bWFyZ2luLXJpZ2h0OjVweH0ud2V1aS1zZWFyY2gtYmFyX19jYW5jZWwtYnRue2Rpc3BsYXk6bm9uZTttYXJnaW4tbGVmdDoxMHB4O2xpbmUtaGVpZ2h0OjI4cHg7Y29sb3I6IzA5YmIwNzt3aGl0ZS1zcGFjZTpub3dyYXB9LndldWktc2VhcmNoLWJhcl9faW5wdXQ6bm90KDp2YWxpZCl+LndldWktaWNvbi1jbGVhcntkaXNwbGF5Om5vbmV9aW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbixpbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9ue2Rpc3BsYXk6bm9uZX0ud2V1aS1waWNrZXJ7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtsZWZ0OjA7Ym90dG9tOjA7ei1pbmRleDo1MDAwOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzLC13ZWJraXQtdHJhbnNmb3JtIC4zc30ud2V1aS1waWNrZXJfX2hke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cGFkZGluZzo5cHggMTVweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE3cHh9LndldWktcGlja2VyX19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7Ym90dG9tOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGlja2VyX19hY3Rpb257ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzFhYWQxOX0ud2V1aS1waWNrZXJfX2FjdGlvbjpmaXJzdC1jaGlsZHt0ZXh0LWFsaWduOmxlZnQ7Y29sb3I6Izg4OH0ud2V1aS1waWNrZXJfX2FjdGlvbjpsYXN0LWNoaWxke3RleHQtYWxpZ246cmlnaHR9LndldWktcGlja2VyX19iZHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtoZWlnaHQ6MjM4cHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXBpY2tlcl9fZ3JvdXB7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlfS53ZXVpLXBpY2tlcl9fbWFza3t0b3A6MDtoZWlnaHQ6MTAwJTttYXJnaW46MCBhdXRvO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZyxoc2xhKDAsMCUsMTAwJSwuOTUpLGhzbGEoMCwwJSwxMDAlLC42KSksbGluZWFyLWdyYWRpZW50KDBkZWcsaHNsYSgwLDAlLDEwMCUsLjk1KSxoc2xhKDAsMCUsMTAwJSwuNikpO2JhY2tncm91bmQtcG9zaXRpb246dG9wLGJvdHRvbTtiYWNrZ3JvdW5kLXNpemU6MTAwJSAxMDJweDtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX0ud2V1aS1waWNrZXJfX2luZGljYXRvciwud2V1aS1waWNrZXJfX21hc2t7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3dpZHRoOjEwMCU7ei1pbmRleDozfS53ZXVpLXBpY2tlcl9faW5kaWNhdG9ye2hlaWdodDozNHB4O3RvcDoxMDJweH0ud2V1aS1waWNrZXJfX2luZGljYXRvcjpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGlja2VyX19pbmRpY2F0b3I6YWZ0ZXIsLndldWktcGlja2VyX19pbmRpY2F0b3I6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNX0ud2V1aS1waWNrZXJfX2luZGljYXRvcjphZnRlcntib3R0b206MDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2NvbnRlbnR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCV9LndldWktcGlja2VyX19pdGVte3BhZGRpbmc6MDtoZWlnaHQ6MzRweDtsaW5lLWhlaWdodDozNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiMwMDA7dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLXBpY2tlcl9faXRlbV9kaXNhYmxlZHtjb2xvcjojOTk5fUAtd2Via2l0LWtleWZyYW1lcyBhezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9fUBrZXlmcmFtZXMgYXswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfX0ud2V1aS1hbmltYXRlLXNsaWRlLXVwey13ZWJraXQtYW5pbWF0aW9uOmEgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmEgZWFzZSAuM3MgZm9yd2FyZHN9QC13ZWJraXQta2V5ZnJhbWVzIGJ7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX19QGtleWZyYW1lcyBiezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9fS53ZXVpLWFuaW1hdGUtc2xpZGUtZG93bnstd2Via2l0LWFuaW1hdGlvbjpiIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpiIGVhc2UgLjNzIGZvcndhcmRzfUAtd2Via2l0LWtleWZyYW1lcyBjezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgY3swJXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX0ud2V1aS1hbmltYXRlLWZhZGUtaW57LXdlYmtpdC1hbmltYXRpb246YyBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246YyBlYXNlIC4zcyBmb3J3YXJkc31ALXdlYmtpdC1rZXlmcmFtZXMgZHswJXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX1Aa2V5ZnJhbWVzIGR7MCV7b3BhY2l0eToxfXRve29wYWNpdHk6MH19LndldWktYW5pbWF0ZS1mYWRlLW91dHstd2Via2l0LWFuaW1hdGlvbjpkIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpkIGVhc2UgLjNzIGZvcndhcmRzfS53ZXVpLWFncmVle2Rpc3BsYXk6YmxvY2s7cGFkZGluZzouNWVtIDE1cHg7Zm9udC1zaXplOjEzcHh9LndldWktYWdyZWUgYXtjb2xvcjojNTg2Yzk0fS53ZXVpLWFncmVlX190ZXh0e2NvbG9yOiM5OTl9LndldWktYWdyZWVfX2NoZWNrYm94ey13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtvdXRsaW5lOjA7Zm9udC1zaXplOjA7Ym9yZGVyOjFweCBzb2xpZCAjZDFkMWQxO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjNweDt3aWR0aDoxM3B4O2hlaWdodDoxM3B4O3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOjA7dG9wOjJweH0ud2V1aS1hZ3JlZV9fY2hlY2tib3g6Y2hlY2tlZDpiZWZvcmV7Zm9udC1mYW1pbHk6d2V1aTtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7Zm9udC12YXJpYW50Om5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO3RleHQtYWxpZ246Y2VudGVyO3NwZWFrOm5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO3RleHQtZGVjb3JhdGlvbjppbmhlcml0O2NvbnRlbnQ6XFxcIlxcXFxFQTA4XFxcIjtjb2xvcjojMDliYjA3O2ZvbnQtc2l6ZToxM3B4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTQ4JSkgc2NhbGUoLjczKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTQ4JSkgc2NhbGUoLjczKX0ud2V1aS1hZ3JlZV9fY2hlY2tib3g6ZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxfS53ZXVpLWFncmVlX19jaGVja2JveDpkaXNhYmxlZDpiZWZvcmV7Y29sb3I6I2FkYWRhZH0ud2V1aS1sb2FkaW5ne3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlOy13ZWJraXQtYW5pbWF0aW9uOmUgMXMgc3RlcHMoMTIpIGluZmluaXRlO2FuaW1hdGlvbjplIDFzIHN0ZXBzKDEyKSBpbmZpbml0ZTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhNakFpSUdobGFXZG9kRDBpTVRJd0lpQjJhV1YzUW05NFBTSXdJREFnTVRBd0lERXdNQ0krUEhCaGRHZ2dabWxzYkQwaWJtOXVaU0lnWkQwaVRUQWdNR2d4TURCMk1UQXdTREI2SWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUlRsRk9VVTVJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLREFnTFRNd0tTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUl6azRPVFk1TnlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d6TUNBeE1EVXVPVGdnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJak9VSTVPVGxCSWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLRFl3SURjMUxqazRJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBFelFURkJNaUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZzVNQ0EyTlNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkJRa0U1UVVFaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTVRJd0lEVTRMalkySURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwSXlRakpDTWlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d4TlRBZ05UUXVNRElnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalFrRkNPRUk1SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLREU0TUNBMU1DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5ETWtNd1F6RWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xURTFNQ0EwTlM0NU9DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5EUWtOQ1EwSWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xURXlNQ0EwTVM0ek5DQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5FTWtReVJESWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb0xUa3dJRE0xSURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwUkJSRUZFUVNJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2d0TmpBZ01qUXVNRElnTmpVcElpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalJUSkZNa1V5SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpY205MFlYUmxLQzB6TUNBdE5TNDVPQ0EyTlNraUx6NDhMM04yWno0PSkgbm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZToxMDAlfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnkgLndldWktbG9hZGluZywud2V1aS1idG5fbG9hZGluZy53ZXVpLWJ0bl93YXJuIC53ZXVpLWxvYWRpbmcsLndldWktbG9hZGluZy53ZXVpLWxvYWRpbmdfdHJhbnNwYXJlbnR7YmFja2dyb3VuZC1pbWFnZTp1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCclM0UlM0NwYXRoIGZpbGw9J25vbmUnIGQ9J00wIDBoMTAwdjEwMEgweicvJTNFJTNDcmVjdCB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNTYpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAgLTMwKScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC40MyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoNjAgNzUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMzgpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDY1IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjgpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE1MCA1NC4wMiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yNSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTgwIDUwIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMTcpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xMjAgNDEuMzQgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMTQpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC05MCAzNSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0zMCAtNS45OCA2NSknLyUzRSUzQy9zdmclM0VcXFwiKX1ALXdlYmtpdC1rZXlmcmFtZXMgZXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMXR1cm4pO3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX1Aa2V5ZnJhbWVzIGV7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMGRlZyl9dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDF0dXJuKTt0cmFuc2Zvcm06cm90YXRlKDF0dXJuKX19LndldWktc2xpZGVye3BhZGRpbmc6MTVweCAxOHB4Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0ud2V1aS1zbGlkZXJfX2lubmVye3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoycHg7YmFja2dyb3VuZC1jb2xvcjojZTllOWU5fS53ZXVpLXNsaWRlcl9fdHJhY2t7aGVpZ2h0OjJweDtiYWNrZ3JvdW5kLWNvbG9yOiMxYWFkMTk7d2lkdGg6MH0ud2V1aS1zbGlkZXJfX2hhbmRsZXJ7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDo1MCU7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDttYXJnaW4tbGVmdDotMTRweDttYXJnaW4tdG9wOi0xNHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3gtc2hhZG93OjAgMCA0cHggcmdiYSgwLDAsMCwuMil9LndldWktc2xpZGVyLWJveHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS53ZXVpLXNsaWRlci1ib3ggLndldWktc2xpZGVyey13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MX0ud2V1aS1zbGlkZXItYm94X192YWx1ZXttYXJnaW4tbGVmdDouNWVtO21pbi13aWR0aDoyNHB4O2NvbG9yOiM4ODg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHh9XCIsIFwiXCJdKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vd2UtdnVlL2xpYi9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gKF92bS5tZW51VmlzaWJsZSkgPyBfYygnd3YtdGFiYmFyJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcImZpeGVkXCI6IFwiXCJcbiAgICB9XG4gIH0sIFtfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6Yk1wiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLpppbpobVcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvY2F0ZWdvcnlcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7piLXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIuWIhuexu1wiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9jYXJ0XCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6YkVwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLotK3nianovaZcIildKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtdGFiYmFyLWl0ZW0nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidG9cIjogXCIvdXNlclwiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumJxcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi5oiR55qEXCIpXSldKV0sIDEpIDogX3ZtLl9lKClcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNjIwMDJkNDVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwifSEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMWRhYWFjYzRcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNjIwMDJkNDVcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==