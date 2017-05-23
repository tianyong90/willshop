webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(46)('wks')
  , uid        = __webpack_require__(50)
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
  , createDesc = __webpack_require__(45);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(25)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(90)
  , toPrimitive    = __webpack_require__(111)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

var shared = __webpack_require__(46)('keys')
  , uid    = __webpack_require__(50);
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
var IObject = __webpack_require__(41)
  , defined = __webpack_require__(23);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 30 */
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
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(7);

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
/* 38 */
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
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(11);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(43)
  , $export        = __webpack_require__(20)
  , redefine       = __webpack_require__(106)
  , hide           = __webpack_require__(5)
  , has            = __webpack_require__(13)
  , Iterators      = __webpack_require__(9)
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
/* 43 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(103)
  , enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(12)
  , invoke             = __webpack_require__(91)
  , html               = __webpack_require__(40)
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 51 */
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
/* 52 */,
/* 53 */
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
    auth: true,
    hideMainmenu: true
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(51)(content, {});
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
var update = __webpack_require__(51)(content, {});
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
  "data-v-62002d45",
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


var _extends2 = __webpack_require__(30);

var _extends3 = _interopRequireDefault(_extends2);

var _promise = __webpack_require__(54);

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

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(31);

var _config2 = _interopRequireDefault(_config);

var _routes = __webpack_require__(53);

var _routes2 = _interopRequireDefault(_routes);

var _vuex = __webpack_require__(7);

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
      return;
    }
  }

  if (error.code === 'ECONNABORTED') {
    app.error('网络繁忙，请重试');
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
}).$mount('#app');

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(30);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(7);

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
  , toLength  = __webpack_require__(48)
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
  , toLength    = __webpack_require__(48)
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

module.exports = !__webpack_require__(8) && !__webpack_require__(25)(function(){
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
var Iterators  = __webpack_require__(9)
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
  , descriptor     = __webpack_require__(45)
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
  , macrotask = __webpack_require__(47).set
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
var getKeys  = __webpack_require__(44)
  , gOPS     = __webpack_require__(101)
  , pIE      = __webpack_require__(104)
  , toObject = __webpack_require__(49)
  , IObject  = __webpack_require__(41)
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
  , enumBugKeys = __webpack_require__(39)
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
  __webpack_require__(40).appendChild(iframe);
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
  , getKeys  = __webpack_require__(44);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
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
  , toObject    = __webpack_require__(49)
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
  , DESCRIPTORS = __webpack_require__(8)
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

var classof   = __webpack_require__(38)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(9);
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
  , Iterators        = __webpack_require__(9)
  , toIObject        = __webpack_require__(29);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(42)(Array, 'Array', function(iterated, kind){
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

var LIBRARY            = __webpack_require__(43)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(12)
  , classof            = __webpack_require__(38)
  , $export            = __webpack_require__(20)
  , isObject           = __webpack_require__(14)
  , aFunction          = __webpack_require__(22)
  , anInstance         = __webpack_require__(87)
  , forOf              = __webpack_require__(89)
  , speciesConstructor = __webpack_require__(108)
  , task               = __webpack_require__(47).set
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
__webpack_require__(42)(String, 'String', function(iterated){
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
  , Iterators     = __webpack_require__(9)
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
exports.push([module.i, "\n#tabbar .weui_tabbar[data-v-62002d45] {\n  position: fixed;\n  bottom: 0;\n}\n#tabbar .weui_tabbar .weui_tabbar_item .icon[data-v-62002d45] {\n    font-size: 20px;\n    color: #666;\n}\n#tabbar .weui_tabbar .weui_tabbar_item.weui_bar_item_on .icon[data-v-62002d45] {\n    color: #09bb07;\n}\n", ""]);

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
var update = __webpack_require__(60)("377c8413", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-62002d45\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-62002d45\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mainmenu.vue");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3M/MGZlZSIsIndlYnBhY2s6Ly8vLi9+L3dlLXZ1ZS9saWIvc3R5bGUuY3NzP2Y4YjEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlIiwid2VicGFjazovLy8uL34vdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2luZGV4LmpzIiwid2VicGFjazovLy9tYWlubWVudS52dWUiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3Mvc2hvcC5zY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL21haW5tZW51LnZ1ZT9lZTI1Iiwid2VicGFjazovLy8uL34vd2UtdnVlL2xpYi9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlP2FkMjIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlPzM1YzYiLCJ3ZWJwYWNrOi8vLy4vfi92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiXSwibmFtZXMiOlsiQ29uZmlnIiwiYXBpUm9vdCIsInRpbWVvdXQiLCJzbXNSZXNlbmRDb3VudGRvd24iLCJqd3RUb2tlbk5hbWUiLCJ1c2UiLCJzdGF0ZSIsImlzTG9hZGluZyIsImRpcmVjdGlvbiIsImlzTWFpbk1lbnVWaXNpYmxlIiwiaXNMb2dpbiIsIlN0b3JlIiwibXV0YXRpb25zIiwiVVBEQVRFX0xPQURJTkciLCJ2YWx1ZSIsIlVQREFURV9ESVJFQ1RJT04iLCJVUERBVEVfTUFJTk1FTlVfVklTSUJMRSIsIlVQREFURV9JU19MT0dJTiIsInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJyZXNvbHZlIiwicmVxdWlyZSIsIm1ldGEiLCJhdXRoIiwidGl0bGUiLCJoaWRlTWFpbm1lbnUiLCJyb3V0ZXIiLCJtb2RlIiwiYmFzZSIsImJlZm9yZUVhY2giLCJ0byIsImZyb20iLCJuZXh0IiwiY29tbWl0IiwibWF0Y2hlZCIsInNvbWUiLCJyZWNvcmQiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicXVlcnkiLCJyZWRpcmVjdCIsImZ1bGxQYXRoIiwiYWZ0ZXJFYWNoIiwiZG9jdW1lbnQiLCJkZWZhdWx0cyIsImJhc2VVUkwiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwiY29uZmlnIiwiaGlkZUxvYWRpbmciLCJhcHAiLCJzaG93TG9hZGluZyIsInRva2VuIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJlcnJvciIsInJlamVjdCIsInJlc3BvbnNlIiwibmV3VG9rZW4iLCJhdXRob3JpemF0aW9uIiwic2V0SXRlbSIsInJlcGxhY2UiLCJzdGF0dXMiLCJyZW1vdmVJdGVtIiwicHVzaCIsImNvZGUiLCJzdG9yZSIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzdWNjZXNzIiwibWVzc2FnZSIsImR1cmF0aW9uIiwiVG9hc3QiLCJpY29uIiwiaW5mbyIsInR5cGUiLCJjb25maXJtIiwiY2FsbGJhY2siLCJEaWFsb2ciLCJza2luIiwiaXNpT3MiLCJtc2ciLCJJbmRpY2F0b3IiLCJvcGVuIiwiY2xvc2UiLCIkbW91bnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxnQzs7Ozs7O0FDSHZDLDZCQUE2QjtBQUM3QixxQ0FBcUMsZ0M7Ozs7OztBQ0RyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxnQkFBZ0IsVUFBVSxHQUFHO0FBQ3RFLENBQUMsRTs7Ozs7O0FDSEQsb0I7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsVUFBVTtBQUNiO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2ZBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLEU7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDbkJBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsRTs7Ozs7O0FDSEE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hELElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLHlCOzs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0UsK0JBQStCO0FBQ2pHLEU7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDTEE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7OztBQ3BCQSxJQUFNQSxTQUFTO0FBQ2JDLFdBQVMsV0FESTtBQUViQyxXQUFTLElBRkk7QUFHYkMsc0JBQW9CLEVBSFA7QUFJYkMsZ0JBQWM7QUFKRCxDQUFmOztrQkFPZUosTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGY7Ozs7QUFDQTs7Ozs7O0FBRUEsY0FBSUssR0FBSjs7QUFFQSxJQUFNQyxRQUFRO0FBQ1pDLGFBQVcsS0FEQztBQUVaQyxhQUFXLFNBRkM7QUFHWkMscUJBQW1CLElBSFA7QUFJWkMsV0FBUztBQUpHLENBQWQ7O2tCQU9lLElBQUksZUFBS0MsS0FBVCxDQUFlO0FBQzVCTCxjQUQ0QjtBQUU1Qk0sYUFBVztBQUNUQyxrQkFEUywwQkFDT1AsS0FEUCxFQUNjUSxLQURkLEVBQ3FCO0FBQzVCUixZQUFNQyxTQUFOLEdBQWtCTyxLQUFsQjtBQUNELEtBSFE7QUFJVEMsb0JBSlMsNEJBSVNULEtBSlQsRUFJZ0JRLEtBSmhCLEVBSXVCO0FBQzlCUixZQUFNRSxTQUFOLEdBQWtCTSxLQUFsQjtBQUNELEtBTlE7QUFPVEUsMkJBUFMsbUNBT2dCVixLQVBoQixFQU91QlEsS0FQdkIsRUFPOEI7QUFDckNSLFlBQU1HLGlCQUFOLEdBQTBCSyxLQUExQjtBQUNELEtBVFE7QUFVVEcsbUJBVlMsMkJBVVFYLEtBVlIsRUFVZVEsS0FWZixFQVVzQjtBQUM3QlIsWUFBTUksT0FBTixHQUFnQkksS0FBaEI7QUFDRDtBQVpRO0FBRmlCLENBQWYsQzs7Ozs7O0FDWmY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsa0JBQWtCLEVBQUU7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxVQUFVO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBLGE7Ozs7OztBQ0hBLDZFOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLGFBQWE7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msb0NBQW9DO0FBQzVFLDRDQUE0QyxvQ0FBb0M7QUFDaEYsS0FBSywyQkFBMkIsb0NBQW9DO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQSxpQ0FBaUMsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyRUEsc0I7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNQQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0EsdUNBQXVDO0FBQ3ZDLEU7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCxFOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBLGtCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7QUFDQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsZ0NBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNyUEEsSUFBTUksU0FBUyxDQUNiO0FBQ0VDLFFBQU0sR0FEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0QsR0FKSDtBQUtFQyxRQUFNO0FBQ0pDLFVBQU0sS0FERjtBQUVKQyxXQUFPO0FBRkg7QUFMUixDQURhLEVBV2I7QUFDRU4sUUFBTSxPQURSO0FBRUVDLGFBQVcsbUJBQUNDLE9BQUQsRUFBYTtBQUN0QkMsSUFBQSxtREFBbUI7QUFBQSxhQUFNRCxRQUFRLG1CQUFBQyxDQUFRLEdBQVIsQ0FBUixDQUFOO0FBQUEsS0FBbkI7QUFDRCxHQUpIO0FBS0VDLFFBQU07QUFDSkMsVUFBTSxJQURGO0FBRUpFLGtCQUFjO0FBRlY7QUFMUixDQVhhLEVBcUJiO0FBQ0VQLFFBQU0sV0FEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0Q7QUFKSCxDQXJCYSxFQTJCYjtBQUNFSCxRQUFNLGFBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQTNCYSxFQW9DYjtBQUNFTCxRQUFNLFlBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQXBDYSxFQTZDYjtBQUNFTCxRQUFNLFlBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQTdDYSxFQXNEYjtBQUNFTCxRQUFNLFdBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQXREYSxFQStEYjtBQUNFTCxRQUFNLE9BRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQS9EYSxFQXdFYjtBQUNFTCxRQUFNLFVBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNO0FBREY7QUFMUixDQXhFYSxFQWlGYjtBQUNFTCxRQUFNLFNBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNLElBREY7QUFFSkUsa0JBQWM7QUFGVjtBQUxSLENBakZhLEVBMkZiO0FBQ0VQLFFBQU0sVUFEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0QsR0FKSDtBQUtFQyxRQUFNO0FBQ0pDLFVBQU0sSUFERjtBQUVKRSxrQkFBYztBQUZWO0FBTFIsQ0EzRmEsRUFxR2I7QUFDRVAsUUFBTSxjQURSO0FBRUVDLGFBQVcsbUJBQUNDLE9BQUQsRUFBYTtBQUN0QkMsSUFBQSxtREFBbUI7QUFBQSxhQUFNRCxRQUFRLG1CQUFBQyxDQUFRLEVBQVIsQ0FBUixDQUFOO0FBQUEsS0FBbkI7QUFDRCxHQUpIO0FBS0VDLFFBQU07QUFDSkMsVUFBTSxJQURGO0FBRUpFLGtCQUFjO0FBRlY7QUFMUixDQXJHYSxFQStHYjtBQUNFUCxRQUFNLGNBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsRUFBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKQyxVQUFNLElBREY7QUFFSkUsa0JBQWM7QUFGVjtBQUxSLENBL0dhLEVBeUhiO0FBQ0VQLFFBQU0sV0FEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0Q7QUFKSCxDQXpIYSxFQStIYjtBQUNFSCxRQUFNLE9BRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNEO0FBSkgsQ0EvSGEsRUFxSWI7QUFDRUgsUUFBTSxXQURSO0FBRUVDLGFBQVcsbUJBQUNDLE9BQUQsRUFBYTtBQUN0QkMsSUFBQSxtREFBbUI7QUFBQSxhQUFNRCxRQUFRLG1CQUFBQyxDQUFRLEdBQVIsQ0FBUixDQUFOO0FBQUEsS0FBbkI7QUFDRDtBQUpILENBcklhLEVBMkliO0FBQ0VILFFBQU0sUUFEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0QsR0FKSDtBQUtFQyxRQUFNO0FBQ0pHLGtCQUFjO0FBRFY7QUFMUixDQTNJYSxFQW9KYjtBQUNFUCxRQUFNLFdBRFI7QUFFRUMsYUFBVyxtQkFBQ0MsT0FBRCxFQUFhO0FBQ3RCQyxJQUFBLG1EQUFtQjtBQUFBLGFBQU1ELFFBQVEsbUJBQUFDLENBQVEsR0FBUixDQUFSLENBQU47QUFBQSxLQUFuQjtBQUNELEdBSkg7QUFLRUMsUUFBTTtBQUNKRyxrQkFBYztBQURWO0FBTFIsQ0FwSmEsRUE2SmI7QUFDRVAsUUFBTSxjQURSO0FBRUVDLGFBQVcsbUJBQUNDLE9BQUQsRUFBYTtBQUN0QkMsSUFBQSxtREFBbUI7QUFBQSxhQUFNRCxRQUFRLG1CQUFBQyxDQUFRLEdBQVIsQ0FBUixDQUFOO0FBQUEsS0FBbkI7QUFDRCxHQUpIO0FBS0VDLFFBQU07QUFDSkcsa0JBQWM7QUFEVjtBQUxSLENBN0phLEVBc0tiO0FBQ0VQLFFBQU0sV0FEUjtBQUVFQyxhQUFXLG1CQUFDQyxPQUFELEVBQWE7QUFDdEJDLElBQUEsbURBQW1CO0FBQUEsYUFBTUQsUUFBUSxtQkFBQUMsQ0FBUSxHQUFSLENBQVIsQ0FBTjtBQUFBLEtBQW5CO0FBQ0QsR0FKSDtBQUtFQyxRQUFNO0FBQ0pDLFVBQU07QUFERjtBQUxSLENBdEthLENBQWY7O2tCQWlMZU4sTTs7Ozs7O0FDakxmLGtCQUFrQix3RDs7Ozs7OztBQ0FsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFvRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7O0FDcEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQW9FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDbkJBO0FBQ0EsdUJBQTRLOztBQUU1SztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0UsaURBQWlELElBQUk7QUFDcEksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7OztBQy9CQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE5BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLGNBQUliLEdBQUo7QUFDQSxjQUFJQSxHQUFKO0FBQ0EsY0FBSUEsR0FBSjs7QUFFQSxJQUFNc0IsU0FBUyx3QkFBYztBQUMzQkMsUUFBTSxTQURxQjtBQUUzQkMsUUFBTSxRQUZxQjtBQUczQlg7QUFIMkIsQ0FBZCxDQUFmOztBQU1BUyxPQUFPRyxVQUFQLENBQWtCLFVBQUNDLEVBQUQsRUFBS0MsSUFBTCxFQUFXQyxJQUFYLEVBQW9CO0FBQ3BDLGtCQUFNQyxNQUFOLENBQWEsZ0JBQWIsRUFBK0IsSUFBL0I7O0FBRUEsa0JBQU1BLE1BQU4sQ0FBYSx5QkFBYixFQUF3QyxDQUFDSCxHQUFHUixJQUFILENBQVFHLFlBQWpEOztBQUVBLE1BQUlLLEdBQUdJLE9BQUgsQ0FBV0MsSUFBWCxDQUFnQjtBQUFBLFdBQVVDLE9BQU9kLElBQVAsQ0FBWUMsSUFBdEI7QUFBQSxHQUFoQixLQUErQyxDQUFDYyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixpQkFBVXBDLFlBQXRDLENBQXBELEVBQXlHO0FBRXZHNkIsU0FBSztBQUNIZCxZQUFNLFFBREg7QUFFSHNCLGFBQU8sRUFBQ0MsVUFBVVgsR0FBR1ksUUFBZDtBQUZKLEtBQUw7QUFJRDs7QUFFRFY7QUFDRCxDQWREOztBQWdCQU4sT0FBT2lCLFNBQVAsQ0FBaUIsVUFBQ2IsRUFBRCxFQUFLQyxJQUFMLEVBQWM7QUFFN0JhLFdBQVNwQixLQUFULEdBQWlCTSxHQUFHUixJQUFILENBQVFFLEtBQVIsSUFBaUIsVUFBbEM7O0FBRUEsa0JBQU1TLE1BQU4sQ0FBYSxnQkFBYixFQUErQixLQUEvQjtBQUNELENBTEQ7O0FBT0EsZ0JBQU1ZLFFBQU4sQ0FBZUMsT0FBZixHQUF5QixpQkFBVTlDLE9BQW5DO0FBQ0EsZ0JBQU02QyxRQUFOLENBQWU1QyxPQUFmLEdBQXlCLGlCQUFVQSxPQUFuQzs7QUFHQSxnQkFBTThDLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCNUMsR0FBM0IsQ0FBK0IsVUFBQzZDLE1BQUQsRUFBWTtBQUN6QyxrQkFBTWhCLE1BQU4sQ0FBYSxnQkFBYixFQUErQixJQUEvQjs7QUFFQSxNQUFJZ0IsT0FBT0MsV0FBUCxLQUF1QixJQUEzQixFQUFpQztBQUUvQkMsUUFBSUMsV0FBSjtBQUNEOztBQUVELE1BQUlDLFFBQVFoQixPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixpQkFBVXBDLFlBQXRDLENBQVo7QUFDQThDLFNBQU9LLE9BQVAsQ0FBZUMsYUFBZixHQUErQixZQUFZRixLQUEzQzs7QUFFQSxTQUFPSixNQUFQO0FBQ0QsQ0FaRCxFQVlHLFVBQUNPLEtBQUQsRUFBVztBQUNaLFNBQU8sa0JBQVFDLE1BQVIsQ0FBZUQsS0FBZixDQUFQO0FBQ0QsQ0FkRDs7QUFpQkEsZ0JBQU1ULFlBQU4sQ0FBbUJXLFFBQW5CLENBQTRCdEQsR0FBNUIsQ0FBZ0MsVUFBQ3NELFFBQUQsRUFBYztBQUM1QyxrQkFBTXpCLE1BQU4sQ0FBYSxnQkFBYixFQUErQixLQUEvQjtBQUNBa0IsTUFBSUQsV0FBSjs7QUFFQSxNQUFNUyxXQUFXRCxTQUFTSixPQUFULENBQWlCTSxhQUFsQztBQUNBLE1BQUlELFFBQUosRUFBYztBQUNadEIsV0FBT0MsWUFBUCxDQUFvQnVCLE9BQXBCLENBQTRCLGlCQUFVMUQsWUFBdEMsRUFBb0R3RCxTQUFTRyxPQUFULENBQWlCLFNBQWpCLEVBQTRCLEVBQTVCLENBQXBEO0FBQ0Q7O0FBRUQsU0FBT0osUUFBUDtBQUNELENBVkQsRUFVRyxVQUFDRixLQUFELEVBQVc7QUFDWixrQkFBTXZCLE1BQU4sQ0FBYSxnQkFBYixFQUErQixLQUEvQjs7QUFFQSxNQUFJdUIsTUFBTUUsUUFBVixFQUFvQjtBQUNsQixRQUFNQyxXQUFXSCxNQUFNRSxRQUFOLENBQWVKLE9BQWYsQ0FBdUJNLGFBQXhDO0FBQ0EsUUFBSUQsUUFBSixFQUFjO0FBQ1p0QixhQUFPQyxZQUFQLENBQW9CdUIsT0FBcEIsQ0FBNEIsaUJBQVUxRCxZQUF0QyxFQUFvRHdELFNBQVNHLE9BQVQsQ0FBaUIsU0FBakIsRUFBNEIsRUFBNUIsQ0FBcEQ7QUFDRDs7QUFFRCxRQUFJTixNQUFNRSxRQUFOLENBQWVLLE1BQWYsS0FBMEIsR0FBOUIsRUFBbUM7QUFDakMxQixhQUFPQyxZQUFQLENBQW9CMEIsVUFBcEIsQ0FBK0IsaUJBQVU3RCxZQUF6Qzs7QUFFQXVCLGFBQU91QyxJQUFQLENBQVksUUFBWjtBQUNELEtBSkQsTUFJTyxJQUFJVCxNQUFNRSxRQUFOLENBQWVLLE1BQWYsS0FBMEIsR0FBOUIsRUFBbUM7QUFFeENaLFVBQUlLLEtBQUosQ0FBVSxPQUFWO0FBQ0E7QUFDRDtBQUNGOztBQUdELE1BQUlBLE1BQU1VLElBQU4sS0FBZSxjQUFuQixFQUFtQztBQUNqQ2YsUUFBSUssS0FBSixDQUFVLFVBQVY7QUFDRDs7QUFFRCxTQUFPLGtCQUFRQyxNQUFSLENBQWVELEtBQWYsQ0FBUDtBQUNELENBcENEOztBQXNDQSxJQUFNTCxNQUFNLGtCQUFRO0FBRWxCekIsZ0JBRmtCOztBQUlsQnlDLHdCQUprQjtBQUtsQkMsY0FBWTtBQUNWLGdCQUFZLG1CQUFBL0MsQ0FBUSxFQUFSO0FBREYsR0FMTTs7QUFTbEJnRCx1Q0FDSyxvQkFBUztBQUNWL0QsZUFBVztBQUFBLGFBQVNELE1BQU1DLFNBQWY7QUFBQSxLQUREO0FBRVZFLHVCQUFtQjtBQUFBLGFBQVNILE1BQU1HLGlCQUFmO0FBQUE7QUFGVCxHQUFULENBREwsQ0FUa0I7O0FBZ0JsQjhELFdBQVM7QUFNUEMsV0FOTyxtQkFNRUMsT0FORixFQU00QjtBQUFBLFVBQWpCQyxRQUFpQix1RUFBTixJQUFNOztBQUNqQyxzQkFBTUMsS0FBTixDQUFZO0FBQ1ZGLHdCQURVO0FBRVZDO0FBRlUsT0FBWjtBQUlELEtBWE07QUFhUGpCLFNBYk8saUJBYUFnQixPQWJBLEVBYVNDLFFBYlQsRUFhbUI7QUFDeEIsc0JBQU1DLEtBQU4sQ0FBWTtBQUNWRixpQkFBU0EsT0FEQztBQUVWQyxrQkFBVUEsUUFGQTtBQUdWRSxjQUFNO0FBSEksT0FBWjtBQUtELEtBbkJNO0FBMEJQQyxRQTFCTyxnQkEwQkRKLE9BMUJDLEVBMEJ5QjtBQUFBLFVBQWpCQyxRQUFpQix1RUFBTixJQUFNOztBQUM5QixzQkFBTUMsS0FBTixDQUFZO0FBQ1ZHLGNBQU0sTUFESTtBQUVWTCx3QkFGVTtBQUdWQztBQUhVLE9BQVo7QUFLRCxLQWhDTTtBQXdDUEssV0F4Q08sbUJBd0NFdEQsS0F4Q0YsRUF3Q1NnRCxPQXhDVCxFQXdDa0JPLFFBeENsQixFQXdDNEI7QUFDakMsc0JBQU1DLE1BQU4sQ0FBYTtBQUNYeEQsb0JBRFc7QUFFWGdELHdCQUZXO0FBR1hTLGNBQU0sS0FBS0MsS0FBTCxHQUFhLEtBQWIsR0FBcUI7QUFIaEIsT0FBYixFQUlHSCxRQUpIO0FBS0QsS0E5Q007QUFvRFAzQixlQXBETyx5QkFvRHVCO0FBQUEsVUFBakIrQixHQUFpQix1RUFBWCxTQUFXOztBQUM1QixzQkFBTUMsU0FBTixDQUFnQkMsSUFBaEIsQ0FBcUJGLEdBQXJCO0FBQ0QsS0F0RE07QUEyRFBqQyxlQTNETyx5QkEyRFE7QUFDYixzQkFBTWtDLFNBQU4sQ0FBZ0JFLEtBQWhCO0FBQ0Q7QUE3RE07QUFoQlMsQ0FBUixFQStFVEMsTUEvRVMsQ0ErRUYsTUEvRUUsQ0FBWixDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTs7Ozs7QUFFQTs7bUJBS0E7O0FBSkE7O1dBS0E7QUFQQSxFOzs7Ozs7QUN6QkEsa0JBQWtCLHdEOzs7Ozs7OztBQ0FsQjtBQUNBLHNEOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7QUNKQSw0QkFBNEIsZTs7Ozs7O0FDQTVCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssV0FBVyxlQUFlO0FBQy9CO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQkFBaUIsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGdCQUFnQjtBQUNoRjtBQUNBO0FBQ0EsR0FBRywyQ0FBMkMsZ0NBQWdDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qjs7Ozs7O0FDeEJBO0FBQ0EscUVBQXNFLGdCQUFnQixVQUFVLEdBQUc7QUFDbkcsQ0FBQyxFOzs7Ozs7QUNGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEU7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlGQUFnRixhQUFhLEVBQUU7O0FBRS9GO0FBQ0EscURBQXFELDBCQUEwQjtBQUMvRTtBQUNBLEU7Ozs7OztBQ1pBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixxQkFBcUI7QUFDcEQsK0JBQStCLFNBQVMsRUFBRTtBQUMxQyxDQUFDLFVBQVU7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVMsbUJBQW1CO0FBQ3ZELCtCQUErQixhQUFhO0FBQzVDO0FBQ0EsR0FBRyxVQUFVO0FBQ2I7QUFDQSxFOzs7Ozs7QUNwQkE7QUFDQSxVQUFVO0FBQ1YsRTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsdUNBQXVDLG9CQUFvQixFQUFFO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxFOzs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsVUFBVSxFQUFFO0FBQzlDLG1CQUFtQixzQ0FBc0M7QUFDekQsQ0FBQyxvQ0FBb0M7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsVzs7Ozs7O0FDaENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDWkEseUM7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaEJBLGNBQWMsc0I7Ozs7OztBQ0FkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRTs7Ozs7O0FDTkEsd0M7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQyxHQUFHO0FBQ0gsRTs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGNBQWM7QUFDZCxpQkFBaUI7QUFDakI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCOzs7Ozs7QUNqQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsZ0NBQW9DLEU7Ozs7Ozs7Ozs7Ozs7QUNIOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msc0RBQWlELG9CQUFvQjtBQUNwSDtBQUNBO0FBQ0EsR0FBRyxVQUFVO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsbUJBQW1CLGdDQUFnQztBQUNuRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsdUJBQXVCLEtBQUs7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsd0JBQXdCO0FBQ3hCLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUEwRCxrQkFBa0I7QUFDNUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7O0FDMVNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixjQUFjO0FBQ2Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsQ0FBQyxFOzs7Ozs7QUNoQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3R0FBd0csT0FBTztBQUMvRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDWkE7QUFDQSwrQkFBZ0MsOEJBQThCLEVBQUUsa0JBQWtCLHNCQUFzQixFQUFFLHNCQUFzQixnQkFBZ0IscUJBQXFCLEVBQUUsVTs7Ozs7O0FDRHZLO0FBQ0Esa0VBQW1FLG9CQUFvQixjQUFjLEdBQUcsaUVBQWlFLHNCQUFzQixrQkFBa0IsR0FBRyxrRkFBa0YscUJBQXFCLEdBQUcsVTs7Ozs7O0FDRDlUO0FBQ0EscURBQXNELGFBQWEsV0FBVyxhQUFhLHNCQUFzQixrQ0FBa0Msa0JBQWtCLGNBQWMsT0FBTyxlQUFlLGtCQUFrQixlQUFlLHdDQUF3QyxxREFBcUQsNEJBQTRCLG1DQUFtQyxjQUFjLHVCQUF1QixVQUFVLG1CQUFtQixhQUFhLGVBQWUsNkNBQTZDLGdDQUFnQyw2Q0FBNkMsZ0NBQWdDLHlDQUF5QyxjQUFjLHVCQUF1QixVQUFVLG1CQUFtQixnQ0FBZ0MsNEJBQTRCLGtCQUFrQixXQUFXLFlBQVksK0NBQStDLFdBQVcsa0JBQWtCLGtCQUFrQixPQUFPLFFBQVEsMkJBQTJCLGtDQUFrQyxlQUFlLGtDQUFrQyxXQUFXLFlBQVksYUFBYSxlQUFlLHVEQUF1RCxTQUFTLDJCQUEyQixnQkFBZ0Isa0JBQWtCLFdBQVcsNkNBQTZDLGtCQUFrQixnQkFBZ0IsWUFBWSxpREFBaUQsa0JBQWtCLDRCQUE0QixXQUFXLFlBQVksYUFBYSwyREFBMkQsY0FBYyxlQUFlLGdEQUFnRCxrQkFBa0IsWUFBWSxTQUFTLDJCQUEyQixvRUFBb0UscUJBQXFCLFVBQVUsV0FBVyxrQkFBa0IsYUFBYSxzQkFBc0IsV0FBVyw4RUFBOEUsc0JBQXNCLGdDQUFnQyxjQUFjLHNCQUFzQixlQUFlLFdBQVcsT0FBTyxTQUFTLGFBQWEsMkJBQTJCLHlCQUF5Qiw0QkFBNEIsYUFBYSxtQkFBbUIsc0JBQXNCLFdBQVcsWUFBWSxjQUFjLGVBQWUsU0FBUyxXQUFXLGtCQUFrQixtQkFBbUIsa0NBQWtDLGNBQWMsZ0JBQWdCLFdBQVcsZUFBZSxpQkFBaUIsZ0JBQWdCLDZDQUE2QyxlQUFlLGNBQWMsa0JBQWtCLE9BQU8scUNBQXFDLGVBQWUsT0FBTyxNQUFNLCtCQUErQixjQUFjLHdJQUF3SSwwQkFBMEIsOEJBQThCLEtBQUssZ0JBQWdCLHlEQUF5RCxFQUFFLFNBQVMsVUFBVSxNQUFNLFNBQVMsRUFBRSxxQkFBcUIsMENBQTBDLFdBQVcsZ0JBQWdCLGtCQUFrQixpQkFBaUIsd0NBQXdDLGdrTUFBZ2tNLDZDQUE2QyxxQkFBcUIsc0JBQXNCLHNDQUFzQyxrQkFBa0Isb0JBQW9CLG1DQUFtQywyREFBMkQscUJBQXFCLGlCQUFpQixrQkFBa0IseUJBQXlCLG1CQUFtQiwyQkFBMkIsbUJBQW1CLHVCQUF1QixtQkFBbUIsK0JBQStCLG1CQUFtQiw0QkFBNEIsbUJBQW1CLDBCQUEwQixtQkFBbUIsaUNBQWlDLG1CQUFtQixvQ0FBb0MsbUJBQW1CLDBCQUEwQixtQkFBbUIsaUNBQWlDLG1CQUFtQix1QkFBdUIsbUJBQW1CLDhCQUE4QixtQkFBbUIseUJBQXlCLG1CQUFtQix5QkFBeUIsbUJBQW1CLHdCQUF3QixtQkFBbUIsdUJBQXVCLG1CQUFtQix5QkFBeUIsbUJBQW1CLDJEQUEyRCxTQUFTLG1CQUFtQixlQUFlLGNBQWMsbUJBQW1CLGVBQWUsY0FBYyxnQkFBZ0IsZUFBZSxjQUFjLGdCQUFnQixlQUFlLGNBQWMsdURBQXVELGVBQWUsY0FBYywwQkFBMEIsZUFBZSxjQUFjLGtCQUFrQixlQUFlLGNBQWMsMkNBQTJDLGVBQWUsY0FBYyx3QkFBd0IsY0FBYyxxQkFBcUIsY0FBYyxrQkFBa0IsY0FBYyxlQUFlLG1DQUFtQyxjQUFjLGVBQWUsMkNBQTJDLFdBQVcsZUFBZSxlQUFlLGVBQWUsOEJBQThCLGNBQWMsdUJBQXVCLGVBQWUsc0NBQXNDLGNBQWMsVUFBVSxrQkFBa0IsY0FBYyxpQkFBaUIsa0JBQWtCLGtCQUFrQixtQkFBbUIsc0JBQXNCLGVBQWUsa0JBQWtCLHFCQUFxQixXQUFXLHVCQUF1QixrQkFBa0IsMENBQTBDLGdCQUFnQixnQkFBZ0IsY0FBYyxXQUFXLFlBQVksa0JBQWtCLE1BQU0sT0FBTyxnQ0FBZ0MsNEJBQTRCLG9CQUFvQiw2QkFBNkIscUJBQXFCLHNCQUFzQixtQkFBbUIsaUJBQWlCLHFCQUFxQixrQkFBa0IsV0FBVyx5QkFBeUIsa0RBQWtELFdBQVcsaURBQWlELHFCQUFxQix5QkFBeUIsa0JBQWtCLHlCQUF5QixrREFBa0QsV0FBVyxpREFBaUQseUJBQXlCLHlCQUF5QixlQUFlLHlCQUF5QiwrQ0FBK0MsV0FBVyw4Q0FBOEMseUJBQXlCLHlCQUF5QixtQkFBbUIseUJBQXlCLG9DQUFvQyxxQkFBcUIseUJBQXlCLG9DQUFvQyx5QkFBeUIsaUNBQWlDLHlCQUF5QixnQ0FBZ0MsdUJBQXVCLG1FQUFtRSx5QkFBeUIsbUNBQW1DLHlCQUF5QixnQ0FBZ0MseUJBQXlCLHdCQUF3QixjQUFjLHlCQUF5Qiw2REFBNkQseUJBQXlCLGdDQUFnQyw4QkFBOEIsZUFBZSx3QkFBd0IsY0FBYyx5QkFBeUIsNkRBQTZELHdCQUF3QiwrQkFBK0IsOEJBQThCLGVBQWUseUJBQXlCLHFCQUFxQiw0QkFBNEIsK0JBQStCLFdBQVcsZUFBZSxVQUFVLHdCQUF3QiwyQ0FBMkMsVUFBVSxzRkFBc0YsV0FBVyxzSEFBc0gsaUJBQWlCLDZCQUE2QixlQUFlLHFCQUFxQixpQkFBaUIsZ0JBQWdCLGVBQWUsb0JBQW9CLGdCQUFnQixvREFBb0QsZ0JBQWdCLGlCQUFpQixlQUFlLDhCQUE4QixzQkFBc0Isb0JBQW9CLG9CQUFvQixhQUFhLGdDQUFnQyxnQkFBZ0Isa0JBQWtCLFdBQVcsbUJBQW1CLFdBQVcsT0FBTywyQ0FBMkMsZUFBZSxZQUFZLHdCQUF3QixzQkFBc0IsdUJBQXVCLGVBQWUsZ0JBQWdCLGtCQUFrQixtQkFBbUIsTUFBTSw2QkFBNkIsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLHFDQUFxQyxjQUFjLGtCQUFrQixPQUFPLFFBQVEsV0FBVyxjQUFjLFVBQVUsa0JBQWtCLFNBQVMsZ0NBQWdDLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQixtQkFBbUIsaUJBQWlCLG1CQUFtQixrQkFBa0IsbUJBQW1CLFdBQVcsZUFBZSwrQkFBK0IsYUFBYSxrQkFBa0IsZ0JBQWdCLFdBQVcsa0JBQWtCLG1CQUFtQixlQUFlLFdBQVcsa0JBQWtCLGtCQUFrQixvQkFBb0Isb0JBQW9CLGFBQWEseUJBQXlCLHNCQUFzQixtQkFBbUIsa0JBQWtCLGNBQWMsa0JBQWtCLE9BQU8sTUFBTSxRQUFRLFdBQVcsNkJBQTZCLGNBQWMsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLFVBQVUsVUFBVSw4QkFBOEIsYUFBYSxtQkFBbUIsd0JBQXdCLHFCQUFxQix1QkFBdUIsZUFBZSxtQkFBbUIsV0FBVyxPQUFPLGVBQWUsaUJBQWlCLFdBQVcsa0JBQWtCLGNBQWMsVUFBVSxpQ0FBaUMsa0JBQWtCLFVBQVUsc0JBQXNCLGlDQUFpQyxrQkFBa0IsUUFBUSxNQUFNLFNBQVMsb0JBQW9CLG9CQUFvQixhQUFhLFdBQVcsaUJBQWlCLGNBQWMsaUJBQWlCLHVCQUF1QixjQUFjLHlCQUF5Qix5QkFBeUIsc0JBQXNCLHlCQUF5QixrQkFBa0IsMENBQTBDLGNBQWMseUJBQXlCLHlCQUF5QixpQ0FBaUMsbUJBQW1CLGtCQUFrQix1Q0FBdUMsY0FBYyxxQkFBcUIsV0FBVyxVQUFVLHlCQUF5QixxQkFBcUIsbUJBQW1CLCtDQUErQyx1Q0FBdUMsa0JBQWtCLFNBQVMsa0JBQWtCLFFBQVEsZ0JBQWdCLFVBQVUsZ0JBQWdCLGNBQWMsZUFBZSxtQ0FBbUMsY0FBYyxtQkFBbUIsMENBQTBDLDBCQUEwQix5QkFBeUIsWUFBWSxrQkFBa0IsYUFBYSxpQ0FBaUMsbUJBQW1CLGdFQUFnRSxjQUFjLG1CQUFtQixjQUFjLGVBQWUsb0NBQW9DLG9CQUFvQiwrQ0FBK0MsbUJBQW1CLGNBQWMsZUFBZSxjQUFjLG1FQUFtRSxtQkFBbUIsY0FBYyxZQUFZLGNBQWMsWUFBWSxxQkFBcUIscUJBQXFCLFlBQVksV0FBVyxTQUFTLFVBQVUsd0JBQXdCLDZCQUE2QixrQkFBa0IsY0FBYyxvQkFBb0IsdUJBQXVCLDhFQUE4RSx3QkFBd0IsU0FBUyxlQUFlLGNBQWMsU0FBUyxZQUFZLFdBQVcsY0FBYyxjQUFjLG9CQUFvQixVQUFVLHVCQUF1QixjQUFjLGlCQUFpQix1Q0FBdUMsY0FBYyxjQUFjLGFBQWEsZUFBZSxnQ0FBZ0Msd0JBQXdCLE1BQU0sT0FBTyxRQUFRLFlBQVksZUFBZSxrQkFBa0IsV0FBVyxhQUFhLHFCQUFxQixxQkFBcUIsbUJBQW1CLHlCQUF5QixnQ0FBZ0MsWUFBWSxpQ0FBaUMsYUFBYSw2RUFBNkUsMENBQTBDLGdCQUFnQixjQUFjLGdDQUFnQyxxQkFBcUIsbUJBQW1CLGtCQUFrQixzQkFBc0IsMEJBQTBCLE1BQU0sNkJBQTZCLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQixtREFBbUQsY0FBYyxrQkFBa0IsT0FBTyxRQUFRLFdBQVcsY0FBYyx5QkFBeUIsU0FBUyxnQ0FBZ0MsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIscUJBQXFCLHVCQUF1QixrQkFBa0Isa0JBQWtCLGlCQUFpQixrQkFBa0IsNkJBQTZCLGNBQWMsa0JBQWtCLE9BQU8sU0FBUyxRQUFRLFdBQVcsZ0NBQWdDLGNBQWMsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIscUJBQXFCLFVBQVUsaURBQWlELGtCQUFrQixnQkFBZ0IsdUJBQXVCLGtCQUFrQixlQUFlLGlCQUFpQixXQUFXLGNBQWMsdUJBQXVCLGtCQUFrQixpQkFBaUIsb0JBQW9CLG9CQUFvQixhQUFhLDhCQUE4QixjQUFjLGtCQUFrQixPQUFPLE1BQU0sUUFBUSxXQUFXLDZCQUE2QixjQUFjLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQix5QkFBeUIsZ0JBQWdCLDBCQUEwQixXQUFXLGlCQUFpQixjQUFjLFdBQVcsbUJBQW1CLHdCQUF3QiwwQkFBMEIsY0FBYyxnQkFBZ0Isa0JBQWtCLHFCQUFxQix3QkFBd0Isa0JBQWtCLGNBQWMsbUJBQW1CLFdBQVcsT0FBTyxjQUFjLGtCQUFrQiwwQ0FBMEMsOEJBQThCLDZCQUE2QixTQUFTLFVBQVUsb0JBQW9CLGtCQUFrQiwrQkFBK0Isc0JBQXNCLDhCQUE4QixjQUFjLGtCQUFrQixPQUFPLE1BQU0sVUFBVSxTQUFTLDhCQUE4QixjQUFjLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQiwwQ0FBMEMsYUFBYSxnQ0FBZ0MsV0FBVyxnQ0FBZ0MsY0FBYyxrQkFBa0IsVUFBVSwrQkFBK0IsbUJBQW1CLHVDQUF1QyxjQUFjLHFCQUFxQixXQUFXLFVBQVUseUJBQXlCLHFCQUFxQixtQkFBbUIsK0NBQStDLHVDQUF1QyxrQkFBa0IsU0FBUyxrQkFBa0IsUUFBUSxXQUFXLGdCQUFnQixhQUFhLHdCQUF3QixTQUFTLFVBQVUsNkJBQTZCLFdBQVcsa0JBQWtCLFlBQVksaUJBQWlCLGtCQUFrQixVQUFVLGtCQUFrQix5QkFBeUIsbUJBQW1CLHNDQUFzQyxZQUFZLHNCQUFzQix3Q0FBd0Msa0JBQWtCLDhDQUE4QyxjQUFjLGtCQUFrQixRQUFRLE1BQU0sVUFBVSxTQUFTLCtCQUErQixjQUFjLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQiwrQ0FBK0MsY0FBYyxxQkFBcUIsV0FBVyxVQUFVLHlCQUF5QixxQkFBcUIsbUJBQW1CLCtDQUErQyx1Q0FBdUMsa0JBQWtCLFNBQVMsa0JBQWtCLFFBQVEsV0FBVyxnQkFBZ0Isd0NBQXdDLGtCQUFrQiw4Q0FBOEMsYUFBYSx3QkFBd0Isa0JBQWtCLHFDQUFxQyxlQUFlLGlCQUFpQixjQUFjLGdCQUFnQixpQkFBaUIsZ0NBQWdDLGdCQUFnQixZQUFZLHNCQUFzQixnQkFBZ0IscUJBQXFCLHNCQUFzQiw4QkFBOEIsaUJBQWlCLGVBQWUsY0FBYyxzQkFBc0IsNkJBQTZCLGFBQWEsZUFBZSxnQkFBZ0IsVUFBVSx1QkFBdUIsY0FBYyxjQUFjLGFBQWEsZUFBZSxNQUFNLFFBQVEsU0FBUyxPQUFPLHNCQUFzQixhQUFhLG1CQUFtQixrQkFBa0IsTUFBTSxRQUFRLFlBQVksT0FBTyx5QkFBeUIsd0JBQXdCLG1CQUFtQixrQkFBa0IsUUFBUSxTQUFTLE9BQU8seUJBQXlCLFdBQVcsaUJBQWlCLGtCQUFrQixtQkFBbUIsY0FBYyxrQkFBa0Isa0JBQWtCLHFCQUFxQixhQUFhLHdCQUF3QixxQkFBcUIsZ0JBQWdCLGtDQUFrQyxrQkFBa0IsV0FBVyxZQUFZLHlCQUF5QixVQUFVLG1CQUFtQixzQkFBc0IseUJBQXlCLDJDQUEyQyxnREFBZ0QsY0FBYyxrQkFBa0IsTUFBTSxPQUFPLFdBQVcsWUFBWSxtQkFBbUIseUJBQXlCLDJEQUEyRCxtREFBbUQsbUdBQW1HLDhDQUE4QyxjQUFjLGtCQUFrQixNQUFNLE9BQU8sV0FBVyxZQUFZLG1CQUFtQixzQkFBc0Isb0NBQW9DLCtEQUErRCx1REFBdUQsMkdBQTJHLHlFQUF5RSxxQkFBcUIseUJBQXlCLHVGQUF1RiwyQkFBMkIsbUJBQW1CLHFGQUFxRixtQ0FBbUMsMkJBQTJCLHVCQUF1QixrQkFBa0IsYUFBYSxxQkFBcUIsY0FBYyxtQkFBbUIsb0JBQW9CLG9CQUFvQixhQUFhLG9CQUFvQix5QkFBeUIsc0JBQXNCLG1CQUFtQixzQkFBc0IsbUJBQW1CLFdBQVcsT0FBTyxxQkFBcUIsY0FBYyxtQkFBbUIsbUJBQW1CLGtCQUFrQixnQkFBZ0Isc0JBQXNCLGdCQUFnQixxQkFBcUIsV0FBVyxpQkFBaUIsa0JBQWtCLFdBQVcsWUFBWSx5QkFBeUIsc0JBQXNCLDRCQUE0QixrQkFBa0IsbUNBQW1DLGNBQWMsa0JBQWtCLE1BQU0sUUFBUSxTQUFTLE9BQU8sZ0NBQWdDLHlEQUF5RCxjQUFjLDZCQUE2QixhQUFhLGtCQUFrQixRQUFRLFNBQVMsdUNBQXVDLCtCQUErQixXQUFXLDZDQUE2QyxxQkFBcUIsMEJBQTBCLFdBQVcsa0JBQWtCLGlCQUFpQixrQkFBa0IsV0FBVyxZQUFZLHlCQUF5QixpRUFBaUUsY0FBYyxrQkFBa0IsUUFBUSxTQUFTLHVDQUF1QywrQkFBK0IseUJBQXlCLGlDQUFpQyxVQUFVLGNBQWMsZ0NBQWdDLGFBQWEsV0FBVyxpQ0FBaUMsa0JBQWtCLCtFQUErRSxzQkFBc0Isc0JBQXNCLGtCQUFrQixVQUFVLE1BQU0sT0FBTyxXQUFXLFlBQVksVUFBVSwwQ0FBMEMsVUFBVSxpQkFBaUIsa0JBQWtCLHFCQUFxQixtQkFBbUIscUJBQXFCLG1CQUFtQixlQUFlLHVCQUF1QixjQUFjLGlCQUFpQixrQkFBa0IsZ0JBQWdCLGVBQWUsZ0JBQWdCLGVBQWUsV0FBVyxvQkFBb0IsbUJBQW1CLHNCQUFzQixtQkFBbUIsZUFBZSxXQUFXLHdCQUF3QixjQUFjLHFDQUFxQyxzQkFBc0IsZUFBZSxPQUFPLFNBQVMsV0FBVyxtQkFBbUIsY0FBYyxrQkFBa0IsZUFBZSxzQkFBc0Isb0JBQW9CLGlCQUFpQixlQUFlLGdCQUFnQixtQkFBbUIsaUJBQWlCLGVBQWUsa0NBQWtDLGdCQUFnQixvQkFBb0IsaUJBQWlCLGVBQWUsZ0JBQWdCLGVBQWUsc0JBQXNCLHFCQUFxQixnQkFBZ0IsZ0JBQWdCLGFBQWEsb0JBQW9CLG9CQUFvQixhQUFhLGtCQUFrQixZQUFZLFNBQVMsV0FBVyx5QkFBeUIsb0JBQW9CLGNBQWMsa0JBQWtCLE9BQU8sTUFBTSxRQUFRLFdBQVcsNkJBQTZCLGNBQWMsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLG1CQUFtQixjQUFjLG1CQUFtQixXQUFXLE9BQU8sZ0JBQWdCLFlBQVksV0FBVyxrQkFBa0IsMENBQTBDLDJLQUEySyxjQUFjLG1CQUFtQixxQkFBcUIsV0FBVyxZQUFZLHlDQUF5QyxlQUFlLFdBQVcsdUJBQXVCLFdBQVcsWUFBWSxvQkFBb0Isa0JBQWtCLFdBQVcsZUFBZSxnQkFBZ0IsYUFBYSxvQkFBb0Isb0JBQW9CLGFBQWEsa0JBQWtCLFlBQVksTUFBTSxXQUFXLHlCQUF5QixtQkFBbUIsY0FBYyxrQkFBa0IsT0FBTyxTQUFTLFFBQVEsV0FBVyw2QkFBNkIsV0FBVyxnQ0FBZ0Msd0JBQXdCLDZCQUE2QixxQkFBcUIsOEJBQThCLGlCQUFpQixpQkFBaUIsbUJBQW1CLGtCQUFrQixjQUFjLG1CQUFtQixXQUFXLE9BQU8sZUFBZSxrQkFBa0IsZUFBZSwwQ0FBMEMsMEJBQTBCLHlCQUF5QixxQ0FBcUMseUJBQXlCLHlCQUF5QixjQUFjLGtCQUFrQixRQUFRLE1BQU0sVUFBVSxTQUFTLDRCQUE0QixXQUFXLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQixvQ0FBb0MsYUFBYSxVQUFVLGtCQUFrQixZQUFZLGlCQUFpQixzQkFBc0IsWUFBWSxvQkFBb0IsY0FBYyxpQ0FBaUMsbUJBQW1CLGFBQWEsZUFBZSxvQkFBb0Isb0JBQW9CLGFBQWEseUJBQXlCLHNCQUFzQixtQkFBbUIsb0JBQW9CLHlCQUF5QixXQUFXLG1CQUFtQixXQUFXLE9BQU8sMEJBQTBCLFFBQVEsWUFBWSx5QkFBeUIsb0JBQW9CLGNBQWMsaUJBQWlCLFlBQVksWUFBWSxzQkFBc0IsZ0JBQWdCLGtCQUFrQixnQkFBZ0Isd0JBQXdCLGFBQWEsbUJBQW1CLE1BQU0sNkJBQTZCLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQixxQ0FBcUMsY0FBYyxrQkFBa0IsT0FBTyxRQUFRLFdBQVcsY0FBYyxrQkFBa0IsU0FBUyxnQ0FBZ0MsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIscUJBQXFCLGdCQUFnQix1QkFBdUIsV0FBVyxlQUFlLGtCQUFrQixzQkFBc0IsY0FBYyxrQkFBa0IsT0FBTyxTQUFTLFFBQVEsV0FBVyxnQ0FBZ0MsY0FBYyxnQ0FBZ0Msd0JBQXdCLDZCQUE2QixxQkFBcUIsVUFBVSxnQkFBZ0IsYUFBYSxrQkFBa0IsdUJBQXVCLGNBQWMsa0JBQWtCLE9BQU8sTUFBTSxRQUFRLFdBQVcsNkJBQTZCLGNBQWMsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLFVBQVUsbUNBQW1DLGFBQWEsaUJBQWlCLFdBQVcsMENBQTBDLHdCQUF3Qix5QkFBeUIsdUJBQXVCLGdCQUFnQixlQUFlLFdBQVcsZ0JBQWdCLHVCQUF1QixtQkFBbUIsaUJBQWlCLHFCQUFxQixxQkFBcUIsc0JBQXNCLFdBQVcsZUFBZSxnQkFBZ0IsZ0JBQWdCLHVCQUF1QixvQkFBb0IsNEJBQTRCLHFCQUFxQixzQkFBc0IsZ0JBQWdCLG1CQUFtQixlQUFlLGNBQWMsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsNEJBQTRCLFdBQVcsa0JBQWtCLGtDQUFrQyxpQkFBaUIsOEJBQThCLDRDQUE0QyxrQkFBa0IsdUJBQXVCLG9CQUFvQixvQkFBb0IsYUFBYSx5QkFBeUIsc0JBQXNCLG1CQUFtQiwyQ0FBMkMsa0JBQWtCLFdBQVcsWUFBWSxpQkFBaUIsa0JBQWtCLDhDQUE4QyxXQUFXLGdCQUFnQixtQkFBbUIsMkNBQTJDLG1CQUFtQixXQUFXLE9BQU8sWUFBWSw2QkFBNkIsVUFBVSx5Q0FBeUMsYUFBYSxnREFBZ0QsYUFBYSxZQUFZLGtCQUFrQixnQkFBZ0IsbUJBQW1CLFFBQVEsV0FBVyw2QkFBNkIsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLHFDQUFxQyxjQUFjLGtCQUFrQixPQUFPLE1BQU0sY0FBYyxrQkFBa0IsVUFBVSxTQUFTLDhCQUE4Qiw2QkFBNkIscUJBQXFCLDZCQUE2QixxQkFBcUIsV0FBVyxrQkFBa0IsV0FBVyxrQkFBa0IsbUJBQW1CLHNCQUFzQixrQkFBa0IsTUFBTSxVQUFVLCtCQUErQixnQ0FBZ0Msd0JBQXdCLDZCQUE2QixxQkFBcUIsbUNBQW1DLGNBQWMsa0JBQWtCLFFBQVEsU0FBUyxjQUFjLGlCQUFpQixPQUFPLFdBQVcsZ0NBQWdDLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQixrQkFBa0IseUJBQXlCLGlCQUFpQixXQUFXLFlBQVksY0FBYyxxQkFBcUIsY0FBYyxXQUFXLFlBQVksbUNBQW1DLGVBQWUsa0JBQWtCLGNBQWMsV0FBVyxtQkFBbUIsdUJBQXVCLGdCQUFnQiwrQkFBK0Isa0JBQWtCLGVBQWUsYUFBYSxXQUFXLGVBQWUsY0FBYywwQkFBMEIsZUFBZSxhQUFhLE9BQU8sUUFBUSxvQkFBb0IsWUFBWSxtQkFBbUIscUJBQXFCLG1CQUFtQixlQUFlLGtCQUFrQixlQUFlLDBCQUEwQixjQUFjLGtCQUFrQixPQUFPLE1BQU0sVUFBVSxTQUFTLDhCQUE4QixjQUFjLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQixZQUFZLFVBQVUsYUFBYSxzQ0FBc0MsYUFBYSxtQkFBbUIsZ0JBQWdCLGVBQWUsV0FBVyxvQkFBb0Isb0JBQW9CLGFBQWEsaUJBQWlCLG1CQUFtQixXQUFXLE9BQU8sYUFBYSxlQUFlLGFBQWEsVUFBVSxnQkFBZ0IsUUFBUSxTQUFTLHVDQUF1QywrQkFBK0Isc0JBQXNCLGtCQUFrQixrQkFBa0IsZ0JBQWdCLGlCQUFpQix5QkFBeUIsb0JBQW9CLGdCQUFnQixlQUFlLGlCQUFpQixxQkFBcUIsZ0JBQWdCLGVBQWUsZ0JBQWdCLHFCQUFxQixxQkFBcUIsV0FBVyw2QkFBNkIseUJBQXlCLGNBQWMsaUJBQWlCLGtCQUFrQixpQkFBaUIsZUFBZSxvQkFBb0Isb0JBQW9CLGFBQWEsdUJBQXVCLGNBQWMsa0JBQWtCLE9BQU8sTUFBTSxRQUFRLFdBQVcsNkJBQTZCLGNBQWMsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLGtCQUFrQixjQUFjLG1CQUFtQixXQUFXLE9BQU8sY0FBYyxxQkFBcUIsMENBQTBDLGtCQUFrQix5QkFBeUIsc0JBQXNCLHdCQUF3QixjQUFjLGtCQUFrQixPQUFPLE1BQU0sVUFBVSxTQUFTLDhCQUE4QixjQUFjLDZCQUE2QixxQkFBcUIsNkJBQTZCLHFCQUFxQixvQ0FBb0MsYUFBYSwwQkFBMEIsY0FBYywwQkFBMEIsY0FBYyxnQ0FBZ0MsZ0JBQWdCLHVDQUF1Qyx1Q0FBdUMsZUFBZSxvQ0FBb0MsZ0JBQWdCLG9DQUFvQyxXQUFXLHdCQUF3QixlQUFlLGdCQUFnQixnREFBZ0Qsd0JBQXdCLGNBQWMsb0NBQW9DLGNBQWMsaUJBQWlCLGlCQUFpQixlQUFlLHFCQUFxQiwwQ0FBMEMsYUFBYSxxQ0FBcUMscUJBQXFCLG1CQUFtQixlQUFlLDJDQUEyQyxhQUFhLHlGQUF5RixpQ0FBaUMsZ0RBQWdELG1CQUFtQiw2Q0FBNkMsV0FBVyxxQ0FBcUMsYUFBYSxXQUFXLFlBQVksZUFBZSxhQUFhLFlBQVksaUJBQWlCLFVBQVUsU0FBUyxtQkFBbUIsNEJBQTRCLGtCQUFrQixrQkFBa0IsV0FBVyxpQkFBaUIsZ0JBQWdCLGNBQWMsb0RBQW9ELFdBQVcsZUFBZSw4QkFBOEIsZ0JBQWdCLFdBQVcsWUFBWSx3QkFBd0IscUJBQXFCLGdCQUFnQixXQUFXLDBCQUEwQixrQ0FBa0MsZUFBZSxhQUFhLE1BQU0sUUFBUSxPQUFPLFNBQVMsa0JBQWtCLGVBQWUsT0FBTyxTQUFTLG1DQUFtQywyQkFBMkIsbUNBQW1DLDJCQUEyQixhQUFhLFdBQVcseUJBQXlCLGlDQUFpQyx5QkFBeUIsK0NBQStDLHlCQUF5QixrQkFBa0IsWUFBWSxlQUFlLGdCQUFnQixvQkFBb0Isb0JBQW9CLGFBQWEsd0JBQXdCLHFCQUFxQix1QkFBdUIsNEJBQTRCLDZCQUE2QiwwQkFBMEIsc0JBQXNCLGtCQUFrQixlQUFlLFdBQVcsbUJBQW1CLGdDQUFnQyxjQUFjLGtCQUFrQixPQUFPLFNBQVMsUUFBUSxXQUFXLGdDQUFnQyxjQUFjLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQix1REFBdUQsZ0JBQWdCLHVCQUF1QixvQkFBb0IsNEJBQTRCLHFCQUFxQix3QkFBd0IseUJBQXlCLDBCQUEwQixlQUFlLHlCQUF5Qix3QkFBd0Isa0JBQWtCLGVBQWUsa0JBQWtCLGVBQWUsK0JBQStCLGNBQWMsa0JBQWtCLE9BQU8sTUFBTSxRQUFRLFdBQVcsNkJBQTZCLGNBQWMsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLCtCQUErQix5QkFBeUIsMkNBQTJDLGFBQWEscUNBQXFDLGVBQWUsU0FBUyxRQUFRLFlBQVksdUNBQXVDLCtCQUErQixZQUFZLHNCQUFzQixtQ0FBbUMsMkJBQTJCLHVCQUF1QixpQ0FBaUMseUJBQXlCLCtDQUErQyw2Q0FBNkMsYUFBYSwyQ0FBMkMsa0JBQWtCLHVDQUF1QywyQ0FBMkMsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQix1REFBdUQsMkJBQTJCLDRCQUE0QixzREFBc0QsOEJBQThCLCtCQUErQix5QkFBeUIsK0JBQStCLHVCQUF1QixlQUFlLFVBQVUsa0JBQWtCLGtCQUFrQixlQUFlLGtCQUFrQixxQkFBcUIscUJBQXFCLHNCQUFzQixvQkFBb0IsNkJBQTZCLGlCQUFpQix5Q0FBeUMsa0JBQWtCLFVBQVUsZ0JBQWdCLHNCQUFzQixXQUFXLHdDQUF3QyxnQkFBZ0IsK0NBQStDLGNBQWMsVUFBVSxXQUFXLGtCQUFrQix5QkFBeUIscUJBQXFCLGtCQUFrQixpQkFBaUIsV0FBVyxZQUFZLHFCQUFxQixtQkFBbUIsY0FBYyxtQkFBbUIseUJBQXlCLFdBQVcsZ0JBQWdCLGtCQUFrQixlQUFlLHNCQUFzQixnQkFBZ0IsYUFBYSxZQUFZLGlCQUFpQixrQkFBa0IsaUJBQWlCLG9CQUFvQixvQkFBb0IsYUFBYSxzQkFBc0IseUJBQXlCLHdCQUF3QixNQUFNLDZCQUE2Qiw2QkFBNkIscUJBQXFCLDZCQUE2QixxQkFBcUIsK0NBQStDLGNBQWMsa0JBQWtCLE9BQU8sUUFBUSxXQUFXLGNBQWMsdUJBQXVCLFNBQVMsZ0NBQWdDLGdDQUFnQyx3QkFBd0IsNkJBQTZCLHFCQUFxQix1RUFBdUUsY0FBYyxrRUFBa0UsYUFBYSx1QkFBdUIsa0JBQWtCLG1CQUFtQixjQUFjLFVBQVUseUJBQXlCLDZCQUE2QixhQUFhLGtCQUFrQixPQUFPLE1BQU0sV0FBVyxZQUFZLDRCQUE0QixvQkFBb0IsNkJBQTZCLHFCQUFxQixtQkFBbUIseUJBQXlCLHNCQUFzQixnQkFBZ0Isc0JBQXNCLGtCQUFrQixrQkFBa0IsbUJBQW1CLFlBQVksV0FBVyxzQkFBc0IsVUFBVSw4Q0FBOEMsY0FBYyxXQUFXLG9CQUFvQixTQUFTLGVBQWUseUJBQXlCLHVCQUF1Qix1QkFBdUIsb0RBQW9ELGFBQWEsd0NBQXdDLGtCQUFrQixVQUFVLE1BQU0saUJBQWlCLHVDQUF1QyxrQkFBa0IsTUFBTSxRQUFRLGVBQWUsaUJBQWlCLHdCQUF3QixrQkFBa0IsUUFBUSxVQUFVLFdBQVcsU0FBUyxVQUFVLGtCQUFrQixrQkFBa0IsY0FBYyxnQkFBZ0IsNkJBQTZCLHFCQUFxQixlQUFlLHNCQUFzQiwwQ0FBMEMsaUJBQWlCLDZCQUE2QixhQUFhLGlCQUFpQixpQkFBaUIsY0FBYyxtQkFBbUIscURBQXFELGFBQWEsdU1BQXVNLGFBQWEsYUFBYSxlQUFlLFdBQVcsT0FBTyxTQUFTLGFBQWEsbUNBQW1DLDJCQUEyQixtQ0FBbUMsMkJBQTJCLGlDQUFpQyx5QkFBeUIsK0NBQStDLGlCQUFpQixvQkFBb0Isb0JBQW9CLGFBQWEsaUJBQWlCLHNCQUFzQixrQkFBa0Isa0JBQWtCLGVBQWUsdUJBQXVCLGNBQWMsa0JBQWtCLE9BQU8sU0FBUyxRQUFRLFdBQVcsZ0NBQWdDLGNBQWMsZ0NBQWdDLHdCQUF3Qiw2QkFBNkIscUJBQXFCLHFCQUFxQixjQUFjLG1CQUFtQixXQUFXLE9BQU8sY0FBYyxpQ0FBaUMsZ0JBQWdCLFdBQVcsZ0NBQWdDLGlCQUFpQixpQkFBaUIsb0JBQW9CLG9CQUFvQixhQUFhLGtCQUFrQixzQkFBc0IsYUFBYSxnQkFBZ0Isb0JBQW9CLG1CQUFtQixXQUFXLE9BQU8sa0JBQWtCLFlBQVksbUJBQW1CLE1BQU0sWUFBWSxjQUFjLHVJQUF1SSwrQkFBK0IsMkJBQTJCLDRCQUE0QixnQ0FBZ0Msd0JBQXdCLDJDQUEyQyxrQkFBa0IsT0FBTyxXQUFXLFVBQVUsd0JBQXdCLFlBQVksVUFBVSwrQkFBK0IsTUFBTSw2QkFBNkIsNkJBQTZCLHFCQUFxQiw2QkFBNkIscUJBQXFCLDZEQUE2RCxjQUFjLGtCQUFrQixPQUFPLFFBQVEsV0FBVyxjQUFjLDhCQUE4QixTQUFTLGdDQUFnQyxnQ0FBZ0Msd0JBQXdCLDZCQUE2QixxQkFBcUIsc0JBQXNCLGtCQUFrQixNQUFNLE9BQU8sV0FBVyxtQkFBbUIsVUFBVSxZQUFZLGlCQUFpQixrQkFBa0IsV0FBVyx1QkFBdUIsbUJBQW1CLGdCQUFnQiw0QkFBNEIsV0FBVyxxQkFBcUIsR0FBRyx3Q0FBd0MsZ0NBQWdDLEdBQUcsZ0NBQWdDLHlCQUF5QixhQUFhLEdBQUcsd0NBQXdDLGdDQUFnQyxHQUFHLGdDQUFnQyx5QkFBeUIsdUJBQXVCLHNDQUFzQyw4QkFBOEIscUJBQXFCLEdBQUcsZ0NBQWdDLHdCQUF3QixHQUFHLHdDQUF3QyxpQ0FBaUMsYUFBYSxHQUFHLGdDQUFnQyx3QkFBd0IsR0FBRyx3Q0FBd0MsaUNBQWlDLHlCQUF5QixzQ0FBc0MsOEJBQThCLHFCQUFxQixHQUFHLFVBQVUsR0FBRyxXQUFXLGFBQWEsR0FBRyxVQUFVLEdBQUcsV0FBVyxzQkFBc0Isc0NBQXNDLDhCQUE4QixxQkFBcUIsR0FBRyxVQUFVLEdBQUcsV0FBVyxhQUFhLEdBQUcsVUFBVSxHQUFHLFdBQVcsdUJBQXVCLHNDQUFzQyw4QkFBOEIsWUFBWSxjQUFjLGtCQUFrQixlQUFlLGNBQWMsY0FBYyxrQkFBa0IsV0FBVyxzQkFBc0Isd0JBQXdCLHFCQUFxQixnQkFBZ0IsVUFBVSxZQUFZLHlCQUF5QixzQkFBc0Isa0JBQWtCLFdBQVcsWUFBWSxrQkFBa0IsaUJBQWlCLFFBQVEscUNBQXFDLGlCQUFpQixrQkFBa0IsZ0JBQWdCLG9CQUFvQixvQkFBb0Isa0JBQWtCLFdBQVcscUJBQXFCLHNCQUFzQix3QkFBd0IsbUJBQW1CLGNBQWMsZUFBZSxrQkFBa0IsUUFBUSxTQUFTLGtEQUFrRCwwQ0FBMEMsK0JBQStCLHlCQUF5QixzQ0FBc0MsY0FBYyxjQUFjLFdBQVcsWUFBWSxxQkFBcUIsc0JBQXNCLDBDQUEwQyxrQ0FBa0MsOENBQThDLG0yREFBbTJELHFCQUFxQixzSUFBc0ksMENBQTBDLGlwREFBaXBELHFCQUFxQixHQUFHLCtCQUErQix1QkFBdUIsR0FBRyxnQ0FBZ0MseUJBQXlCLGFBQWEsR0FBRywrQkFBK0IsdUJBQXVCLEdBQUcsZ0NBQWdDLHlCQUF5QixhQUFhLGtCQUFrQix5QkFBeUIsc0JBQXNCLHFCQUFxQixpQkFBaUIsb0JBQW9CLGtCQUFrQixXQUFXLHlCQUF5QixvQkFBb0IsV0FBVyx5QkFBeUIsUUFBUSxzQkFBc0Isa0JBQWtCLE9BQU8sUUFBUSxXQUFXLFlBQVksa0JBQWtCLGlCQUFpQixrQkFBa0Isc0JBQXNCLGtDQUFrQyxpQkFBaUIsb0JBQW9CLG9CQUFvQixhQUFhLHlCQUF5QixzQkFBc0IsbUJBQW1CLDhCQUE4QixtQkFBbUIsV0FBVyxPQUFPLHdCQUF3QixpQkFBaUIsZUFBZSxXQUFXLGtCQUFrQixlQUFlLFE7Ozs7Ozs7Ozs7O0FDRHZpb0QsZ0JBQWdCLG1CQUFtQixhQUFhLDBCQUEwQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDekNBOztBQUVBO0FBQ0EscUNBQWlOO0FBQ2pOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0SUFBNEksb0VBQW9FO0FBQ2hOLHFKQUFxSixvRUFBb0U7QUFDek47QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3QkFBd0I7QUFDM0QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gY29uc3QgZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xyXG5cclxuY29uc3QgQ29uZmlnID0ge1xyXG4gIGFwaVJvb3Q6ICcvYXBpL3Nob3AnLFxyXG4gIHRpbWVvdXQ6IDUwMDAsXHJcbiAgc21zUmVzZW5kQ291bnRkb3duOiA2MCxcclxuICBqd3RUb2tlbk5hbWU6ICd3aWxsc2hvcF9qd3RfdG9rZW4nLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29uZmlnLmpzIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xyXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcclxuXHJcblZ1ZS51c2UoVnVleCk7XHJcblxyXG5jb25zdCBzdGF0ZSA9IHtcclxuICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gIGRpcmVjdGlvbjogJ2ZvcndhcmQnLFxyXG4gIGlzTWFpbk1lbnVWaXNpYmxlOiB0cnVlLFxyXG4gIGlzTG9naW46IGZhbHNlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVleC5TdG9yZSh7XHJcbiAgc3RhdGUsXHJcbiAgbXV0YXRpb25zOiB7XHJcbiAgICBVUERBVEVfTE9BRElORyAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTG9hZGluZyA9IHZhbHVlO1xyXG4gICAgfSxcclxuICAgIFVQREFURV9ESVJFQ1RJT04gKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICBzdGF0ZS5kaXJlY3Rpb24gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBVUERBVEVfTUFJTk1FTlVfVklTSUJMRSAoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgIHN0YXRlLmlzTWFpbk1lbnVWaXNpYmxlID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgVVBEQVRFX0lTX0xPR0lOIChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgc3RhdGUuaXNMb2dpbiA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9zdG9yZS9pbmRleC5qcyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XG5cdFx0dmFyIG1lbW87XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gbWVtbztcblx0XHR9O1xuXHR9LFxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qoc2VsZi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuXHR9KSxcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG5cdH0pLFxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2Vcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XG5cdHJldHVybiBsaW5rRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG5cdFx0aWYobmV3T2JqKSB7XG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdGlmKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XG5cblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKVxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCByb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvaG9tZS52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogJ+mmlumhtSdcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2FydCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9jYXJ0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZSxcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2NhdGVnb3J5JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2NhdGVnb3J5LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9vcmRlci1saXN0JyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL29yZGVyLWxpc3QudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL29yZGVyLzppZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9vcmRlci52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvZmF2b3VyaXRlJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2Zhdm91cml0ZS52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY2hlY2tvdXQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hlY2tvdXQudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3VzZXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvdXNlci52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvcHJvZmlsZScsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9maWxlLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hdmF0YXInLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYXZhdGFyLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZSxcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2FkZHJlc3MnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWRkcmVzcy52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGF1dGg6IHRydWUsXHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9hZGRyZXNzL2FkZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9hZGRyZXNzLWVkaXQudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9LFxyXG4gICAgbWV0YToge1xyXG4gICAgICBhdXRoOiB0cnVlLFxyXG4gICAgICBoaWRlTWFpbm1lbnU6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvYWRkcmVzcy86aWQnLFxyXG4gICAgY29tcG9uZW50OiAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByZXF1aXJlLmVuc3VyZShbXSwgKCkgPT4gcmVzb2x2ZShyZXF1aXJlKCcuL2NvbXBvbmVudHMvYWRkcmVzcy1lZGl0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZSxcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2Fib3V0LXVzJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2Fib3V0LXVzLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9oZWxwJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2hlbHAudnVlJykpLCAnc2hvcC1ob21lJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL2hlbHAvOmlkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL2hlbHAtZGV0YWlsLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9yZWdpc3RlcicsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3Rlci52dWUnKSksICdzaG9wLWhvbWUnKTtcclxuICAgIH0sXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIGhpZGVNYWlubWVudTogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0aDogJy9wcm9kdWN0LzppZCcsXHJcbiAgICBjb21wb25lbnQ6IChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAoKSA9PiByZXNvbHZlKHJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9kdWN0LnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgaGlkZU1haW5tZW51OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXRoOiAnL3Bhc3N3b3JkJyxcclxuICAgIGNvbXBvbmVudDogKHJlc29sdmUpID0+IHtcclxuICAgICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHJlc29sdmUocmVxdWlyZSgnLi9jb21wb25lbnRzL3Bhc3N3b3JkLnZ1ZScpKSwgJ3Nob3AtaG9tZScpO1xyXG4gICAgfSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3JvdXRlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zaG9wLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zaG9wLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc2hvcC5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dlLXZ1ZS9saWIvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcbi8qIHN0eWxlcyAqL1xucmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpXG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj9jYWNoZURpcmVjdG9yeSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL21haW5tZW51LnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwifSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTYyMDAyZDQ1XCIsXG4gIC8qIGNzc01vZHVsZXMgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJEOlxcXFxVUFVQV1xcXFx2aG9zdHNcXFxcd2lsbHNob3BcXFxccmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxzaG9wXFxcXGNvbXBvbmVudHNcXFxcbWFpbm1lbnUudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkgIT09IFwiX19lc01vZHVsZVwifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gbWFpbm1lbnUudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTYyMDAyZDQ1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNjIwMDJkNDVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBzY29wZUlkLFxuICBjc3NNb2R1bGVzXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICAvLyBpbmplY3QgY3NzTW9kdWxlc1xuICBpZiAoY3NzTW9kdWxlcykge1xuICAgIHZhciBjb21wdXRlZCA9IE9iamVjdC5jcmVhdGUob3B0aW9ucy5jb21wdXRlZCB8fCBudWxsKVxuICAgIE9iamVjdC5rZXlzKGNzc01vZHVsZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG1vZHVsZSA9IGNzc01vZHVsZXNba2V5XVxuICAgICAgY29tcHV0ZWRba2V5XSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1vZHVsZSB9XG4gICAgfSlcbiAgICBvcHRpb25zLmNvbXB1dGVkID0gY29tcHV0ZWRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInO1xyXG5pbXBvcnQgV2VWdWUgZnJvbSAnd2UtdnVlJztcclxuaW1wb3J0ICd3ZS12dWUvbGliL3N0eWxlLmNzcyc7XHJcbmltcG9ydCAnLi4vLi4vc2Fzcy9zaG9wLnNjc3MnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgVnVlQXhpb3MgZnJvbSAndnVlLWF4aW9zJztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUvaW5kZXgnO1xyXG5pbXBvcnQgYXBwQ29uZmlnIGZyb20gJy4vY29uZmlnJzsgLy8g6YWN572uXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMuanMnO1xyXG5pbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnO1xyXG5cclxuVnVlLnVzZShWdWVSb3V0ZXIpO1xyXG5WdWUudXNlKFdlVnVlKTtcclxuVnVlLnVzZShWdWVBeGlvcywgYXhpb3MpO1xyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XHJcbiAgbW9kZTogJ2hpc3RvcnknLFxyXG4gIGJhc2U6ICcvc2hvcC8nLFxyXG4gIHJvdXRlc1xyXG59KTtcclxuXHJcbnJvdXRlci5iZWZvcmVFYWNoKCh0bywgZnJvbSwgbmV4dCkgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCB0cnVlKTtcclxuXHJcbiAgc3RvcmUuY29tbWl0KCdVUERBVEVfTUFJTk1FTlVfVklTSUJMRScsICF0by5tZXRhLmhpZGVNYWlubWVudSk7XHJcblxyXG4gIGlmICh0by5tYXRjaGVkLnNvbWUocmVjb3JkID0+IHJlY29yZC5tZXRhLmF1dGgpICYmICF3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSkpIHtcclxuICAgIC8vIOmcgOimgeeZu+W9leWQjuiuv+mXrueahOmhtemdou+8jHJlZGlyZWN0IOWPguaVsOeUqOS6jueZu+W9leWujOaIkOWQjui3s+i9rFxyXG4gICAgbmV4dCh7XHJcbiAgICAgIHBhdGg6ICcvbG9naW4nLFxyXG4gICAgICBxdWVyeToge3JlZGlyZWN0OiB0by5mdWxsUGF0aH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59KTtcclxuXHJcbnJvdXRlci5hZnRlckVhY2goKHRvLCBmcm9tKSA9PiB7XHJcbiAgLy8g5Yqo5oCB6K6+572u6aG16Z2i5qCH6aKYXHJcbiAgZG9jdW1lbnQudGl0bGUgPSB0by5tZXRhLnRpdGxlIHx8ICd3aWxsc2hvcCc7XHJcblxyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSk7XHJcbn0pO1xyXG5cclxuYXhpb3MuZGVmYXVsdHMuYmFzZVVSTCA9IGFwcENvbmZpZy5hcGlSb290O1xyXG5heGlvcy5kZWZhdWx0cy50aW1lb3V0ID0gYXBwQ29uZmlnLnRpbWVvdXQ7XHJcblxyXG4vLyBheGlvcyDor7fmsYLlj5HpgIHliY3lpITnkIZcclxuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9MT0FESU5HJywgdHJ1ZSk7XHJcblxyXG4gIGlmIChjb25maWcuaGlkZUxvYWRpbmcgIT09IHRydWUpIHtcclxuICAgIC8vIOaYvuekuiBsb2FkaW5nIOaPkOekulxyXG4gICAgYXBwLnNob3dMb2FkaW5nKCk7XHJcbiAgfVxyXG5cclxuICBsZXQgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYXBwQ29uZmlnLmp3dFRva2VuTmFtZSk7XHJcbiAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdiZWFyZXIgJyArIHRva2VuO1xyXG5cclxuICByZXR1cm4gY29uZmlnO1xyXG59LCAoZXJyb3IpID0+IHtcclxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG59KTtcclxuXHJcbi8vIGF4aW9zIOW+l+WIsOWTjeW6lOWQjuWkhOeQhlxyXG5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXNwb25zZSkgPT4ge1xyXG4gIHN0b3JlLmNvbW1pdCgnVVBEQVRFX0xPQURJTkcnLCBmYWxzZSk7XHJcbiAgYXBwLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gIGNvbnN0IG5ld1Rva2VuID0gcmVzcG9uc2UuaGVhZGVycy5hdXRob3JpemF0aW9uO1xyXG4gIGlmIChuZXdUb2tlbikge1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUsIG5ld1Rva2VuLnJlcGxhY2UoJ2JlYXJlciAnLCAnJykpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3BvbnNlO1xyXG59LCAoZXJyb3IpID0+IHtcclxuICBzdG9yZS5jb21taXQoJ1VQREFURV9MT0FESU5HJywgZmFsc2UpO1xyXG5cclxuICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IG5ld1Rva2VuID0gZXJyb3IucmVzcG9uc2UuaGVhZGVycy5hdXRob3JpemF0aW9uO1xyXG4gICAgaWYgKG5ld1Rva2VuKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShhcHBDb25maWcuand0VG9rZW5OYW1lLCBuZXdUb2tlbi5yZXBsYWNlKCdiZWFyZXIgJywgJycpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGFwcENvbmZpZy5qd3RUb2tlbk5hbWUpO1xyXG5cclxuICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAvLyDml6DmnYPpmZDml7bnu5/kuIDmj5DnpLpcclxuICAgICAgYXBwLmVycm9yKCfml6Dmk43kvZzmnYPpmZAnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g6LaF5pe25ZCO6L+b6KGM5o+Q56S6XHJcbiAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTkFCT1JURUQnKSB7XHJcbiAgICBhcHAuZXJyb3IoJ+e9kee7nOe5geW/me+8jOivt+mHjeivlScpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxufSk7XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcclxuICAvLyDot6/nlLHlmahcclxuICByb3V0ZXIsXHJcbiAgLy8gdnVleCBzdG9yZVxyXG4gIHN0b3JlLFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgICdtYWlubWVudSc6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYWlubWVudS52dWUnKVxyXG4gIH0sXHJcblxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICAuLi5tYXBTdGF0ZSh7XHJcbiAgICAgIGlzTG9hZGluZzogc3RhdGUgPT4gc3RhdGUuaXNMb2FkaW5nLFxyXG4gICAgICBpc01haW5NZW51VmlzaWJsZTogc3RhdGUgPT4gc3RhdGUuaXNNYWluTWVudVZpc2libGVcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmk43kvZzmiJDlip/mj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgc3VjY2VzcyAobWVzc2FnZSwgZHVyYXRpb24gPSAxMDAwKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIGR1cmF0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvciAobWVzc2FnZSwgZHVyYXRpb24pIHtcclxuICAgICAgV2VWdWUuVG9hc3Qoe1xyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgIGljb246ICd3YXJuJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIDoiKzkv6Hmga/mj5DnpLpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgaW5mbyAobWVzc2FnZSwgZHVyYXRpb24gPSAyMDAwKSB7XHJcbiAgICAgIFdlVnVlLlRvYXN0KHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBkdXJhdGlvblxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoa7orqTlr7nor53moYZcclxuICAgICAqIEBwYXJhbSB0aXRsZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBjb25maXJtICh0aXRsZSwgbWVzc2FnZSwgY2FsbGJhY2spIHtcclxuICAgICAgV2VWdWUuRGlhbG9nKHtcclxuICAgICAgICB0aXRsZSxcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIHNraW46IHRoaXMuaXNpT3MgPyAnaW9zJyA6ICdhbmRyb2lkJ1xyXG4gICAgICB9LCBjYWxsYmFjayk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6IGxvYWRpbmcg5o+Q56S6XHJcbiAgICAgKiBAcGFyYW0gbXNnXHJcbiAgICAgKi9cclxuICAgIHNob3dMb2FkaW5nIChtc2cgPSAnTG9hZGluZycpIHtcclxuICAgICAgV2VWdWUuSW5kaWNhdG9yLm9wZW4obXNnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol48gbG9hZGluZyDmj5DnpLpcclxuICAgICAqL1xyXG4gICAgaGlkZUxvYWRpbmcgKCkge1xyXG4gICAgICBXZVZ1ZS5JbmRpY2F0b3IuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbn0pLiRtb3VudCgnI2FwcCcpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvaW5kZXguanMiLCI8dGVtcGxhdGU+XHJcbiAgPHd2LXRhYmJhciB2LWlmPVwibWVudVZpc2libGVcIiBmaXhlZD5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9cIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjEzOzwvaT5cclxuICAgICAgPHNwYW4+6aaW6aG1PC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi9jYXRlZ29yeVwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnRcIiBzbG90PVwiaWNvblwiPiYjeGU2MGI7PC9pPlxyXG4gICAgICA8c3Bhbj7liIbnsbs8L3NwYW4+XHJcbiAgICA8L3d2LXRhYmJhci1pdGVtPlxyXG4gICAgPHd2LXRhYmJhci1pdGVtIHRvPVwiL2NhcnRcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250XCIgc2xvdD1cImljb25cIj4mI3hlNjExOzwvaT5cclxuICAgICAgPHNwYW4+6LSt54mp6L2mPC9zcGFuPlxyXG4gICAgPC93di10YWJiYXItaXRlbT5cclxuICAgIDx3di10YWJiYXItaXRlbSB0bz1cIi91c2VyXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udFwiIHNsb3Q9XCJpY29uXCI+JiN4ZTYxYzs8L2k+XHJcbiAgICAgIDxzcGFuPuaIkeeahDwvc3Bhbj5cclxuICAgIDwvd3YtdGFiYmFyLWl0ZW0+XHJcbiAgPC93di10YWJiYXI+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IG1hcFN0YXRlIH0gZnJvbSAndnVleCc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgICBtZW51VmlzaWJsZTogc3RhdGUgPT4gc3RhdGUuaXNNYWluTWVudVZpc2libGVcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge31cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gICN0YWJiYXIgLndldWlfdGFiYmFyIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbSB7XHJcbiAgICAgIC5pY29uIHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAud2V1aV90YWJiYXJfaXRlbS53ZXVpX2Jhcl9pdGVtX29uIHtcclxuICAgICAgLmljb24ge1xyXG4gICAgICAgIGNvbG9yOiAjMDliYjA3O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbWFpbm1lbnUudnVlPzY0NWU0MmQyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAsIEJSRUFLICAgICAgID0ge31cbiAgLCBSRVRVUk4gICAgICA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLICA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCBhcmdzLCB0aGF0KXtcbiAgdmFyIHVuID0gdGhhdCA9PT0gdW5kZWZpbmVkO1xuICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiAgICAgICAgICAgICAgZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZShoZWFkKXtcbiAgICAgIGZuICAgPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICBpZihoZWFkKW5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmKGlzTm9kZSl7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICAgIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKXtcbiAgICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gICAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmKCFoZWFkKXtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYyl7XG4gICAgaWYoc2FmZSAmJiB0YXJnZXRba2V5XSl0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjbGFzc29mICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGZvck9mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICwgdGFzayAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIG1pY3JvdGFzayAgICAgICAgICA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKClcbiAgLCBQUk9NSVNFICAgICAgICAgICAgPSAnUHJvbWlzZSdcbiAgLCBUeXBlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCAkUHJvbWlzZSAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgICAgICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgZW1wdHkgICAgICAgICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIEludGVybmFsLCBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlICAgICA9ICRQcm9taXNlLnJlc29sdmUoMSlcbiAgICAgICwgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uKGV4ZWMpeyBleGVjKGVtcHR5LCBlbXB0eSk7IH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gd2l0aCBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIHJldHVybiBhID09PSBiIHx8IGEgPT09ICRQcm9taXNlICYmIGIgPT09IFdyYXBwZXI7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHJldHVybiBzYW1lQ29uc3RydWN0b3IoJFByb21pc2UsIEMpXG4gICAgPyBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICA6IG5ldyBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcbnZhciBwZXJmb3JtID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHByb21pc2UsIGlzUmVqZWN0KXtcbiAgaWYocHJvbWlzZS5fbilyZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIG9rICAgID0gcHJvbWlzZS5fcyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Rpb24pe1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbFxuICAgICAgICAsIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlXG4gICAgICAgICwgcmVqZWN0ICA9IHJlYWN0aW9uLnJlamVjdFxuICAgICAgICAsIGRvbWFpbiAgPSByZWFjdGlvbi5kb21haW5cbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spe1xuICAgICAgICAgICAgaWYocHJvbWlzZS5faCA9PSAyKW9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGhhbmRsZXIgPT09IHRydWUpcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2Upe1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdCAmJiAhcHJvbWlzZS5faClvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBhYnJ1cHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYoaXNVbmhhbmRsZWQocHJvbWlzZSkpe1xuICAgICAgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbil7XG4gICAgICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmKGFicnVwdCl0aHJvdyBhYnJ1cHQuZXJyb3I7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICBpZihwcm9taXNlLl9oID09IDEpcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2NcbiAgICAsIGkgICAgID0gMFxuICAgICwgcmVhY3Rpb247XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYoaXNOb2RlKXtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCl7XG4gICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3Z9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmKCFwcm9taXNlLl9hKXByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZihwcm9taXNlID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge193OiBwcm9taXNlLCBfZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCFVU0VfTkFUSVZFKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gICAgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rICAgICA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCAgID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fYSl0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fcylub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcHJvbWlzZSAgPSBuZXcgSW50ZXJuYWw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ICA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1Byb21pc2U6ICRQcm9taXNlfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgLy8gaW5zdGFuY2VvZiBpbnN0ZWFkIG9mIGludGVybmFsIHNsb3QgY2hlY2sgYmVjYXVzZSB3ZSBzaG91bGQgZml4IGl0IHdpdGhvdXQgcmVwbGFjZW1lbnQgbmF0aXZlIFByb21pc2UgY29yZVxuICAgIGlmKHggaW5zdGFuY2VvZiAkUHJvbWlzZSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlc29sdmUgID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgICQkcmVzb2x2ZSh4KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlc29sdmUgICAgPSBjYXBhYmlsaXR5LnJlc29sdmVcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWVzICAgID0gW11cbiAgICAgICAgLCBpbmRleCAgICAgPSAwXG4gICAgICAgICwgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIHZhciAkaW5kZXggICAgICAgID0gaW5kZXgrK1xuICAgICAgICAgICwgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIGlmKGFscmVhZHlDYWxsZWQpcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWNlYzsgfVxcblxcbi53ZXVpLXRhYmJhciB7XFxuICBmb250LXdlaWdodDogYm9sZDsgfVxcblxcbi53ZXVpLWNlbGxfX2JkIHAge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBmb250LXdlaWdodDogMjAwOyB9XFxuXCIsIFwiXCJdKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9zaG9wLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4jdGFiYmFyIC53ZXVpX3RhYmJhcltkYXRhLXYtNjIwMDJkNDVdIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG59XFxuI3RhYmJhciAud2V1aV90YWJiYXIgLndldWlfdGFiYmFyX2l0ZW0gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgY29sb3I6ICM2NjY7XFxufVxcbiN0YWJiYXIgLndldWlfdGFiYmFyIC53ZXVpX3RhYmJhcl9pdGVtLndldWlfYmFyX2l0ZW1fb24gLmljb25bZGF0YS12LTYyMDAyZDQ1XSB7XFxuICAgIGNvbG9yOiAjMDliYjA3O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9+L3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi53di1uYXZiYXJbZGF0YS12LTQwZjBhNWViXXtkaXNwbGF5OmZsZXg7d2lkdGg6MTAwJTt6LWluZGV4OjUwMDA7YmFja2dyb3VuZC1jb2xvcjojZmZmfS53di1uYXZiYXJfX2l0ZW1bZGF0YS12LThiNGNkYTY2XXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO2ZsZXg6MTtwYWRkaW5nOjEzcHggMDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnR9Lnd2LW5hdmJhcl9faXRlbS53di1uYXZiYXJfX2l0ZW1fb25bZGF0YS12LThiNGNkYTY2XXtib3JkZXItYm90dG9tOjNweCBzb2xpZCByZWR9LnNlYXJjaGJhci1yZXN1bHRbZGF0YS12LWU4NzZhYTJhXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybS1vcmlnaW46MCAwIDA7b3BhY2l0eToxO3RyYW5zZm9ybTpzY2FsZSgxKTttYXJnaW4tdG9wOjA7Zm9udC1zaXplOjE0cHh9LndldWktY2hlY2tfX2xhYmVsLWRpc2FibGVkW2RhdGEtdi0zMjNiOTU3OV17YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC4xKX0ud2V1aS1jaGVja19fbGFiZWwtZGlzYWJsZWRbZGF0YS12LTNkNjNhZTNhXXtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjEpfS5hY3Rpb25zaGVldF9fbWFza19zaG93W2RhdGEtdi00MDk1YzhiZl17ZGlzcGxheTpibG9jazt0cmFuc2Zvcm0tb3JpZ2luOjAgMCAwO29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSk7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC42KX0ud3YtY2lyY2xlW2RhdGEtdi0xMmFiNjQyYV17cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ud3YtY2lyY2xlIC53di1jaXJjbGUtY29udGVudFtkYXRhLXYtMTJhYjY0MmFde3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LndldWktaWNvbl90b2FzdFtkYXRhLXYtYmFmYjFmOGFde2ZvbnQtc2l6ZTo0MHB4fS53ZXVpLXRvYXN0X3RleHRbZGF0YS12LWJhZmIxZjhhXXt3aWR0aDphdXRvO21pbi13aWR0aDowO21pbi1oZWlnaHQ6MDtwYWRkaW5nOi41ZW0gMH0ud2V1aS10b2FzdF90ZXh0IC53ZXVpLXRvYXN0X19jb250ZW50W2RhdGEtdi1iYWZiMWY4YV17bWFyZ2luOjB9Lnd2LXN3aXBlW2RhdGEtdi00NzM3MDUyMV17b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyW2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxMDAlfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlciBkaXZbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSk7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyIGRpdi5pcy1hY3RpdmVbZGF0YS12LTQ3MzcwNTIxXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybTpub25lfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9yc1tkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yW2RhdGEtdi00NzM3MDUyMV17ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7bWFyZ2luOjAgNHB4O2JhY2tncm91bmQtY29sb3I6IzAwMDtvcGFjaXR5Oi4zfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yLmlzLWFjdGl2ZVtkYXRhLXYtNDczNzA1MjFde2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud3YtcG9wdXAtYm9keVtkYXRhLXYtODdhMDhlZjZde2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojZmZmO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7bGVmdDowO2JvdHRvbTowO3otaW5kZXg6NTAwMDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxMDAlKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3N9Lnd2LWhlYWRlcltkYXRhLXYtZjZmNWMxNmFde2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Ym94LXNpemluZzpib3JkZXItYm94O3dpZHRoOjEwMCU7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6MTtwYWRkaW5nOjAgMTBweDttYXJnaW46MDtjb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3doaXRlLXNwYWNlOm5vd3JhcH0ud3YtaGVhZGVyIC5sZWZ0W2RhdGEtdi1mNmY1YzE2YV17ZGlzcGxheTpibG9jaztvdmVyZmxvdzpoaWRkZW47ZmxvYXQ6bGVmdDtmb250LXNpemU6MzVweDtsaW5lLWhlaWdodDozNXB4O2ZvbnQtd2VpZ2h0OjEwMH0ud3YtaGVhZGVyIC53di1oZWFkZXItdGl0bGVbZGF0YS12LWY2ZjVjMTZhXXtmb250LXNpemU6MjNweDtmb250LXdlaWdodDowO3RleHQtYWxpZ246Y2VudGVyO2ZsZXg6MX0ud3YtaGVhZGVyLmlzLWZpeGVkW2RhdGEtdi1mNmY1YzE2YV17cG9zaXRpb246Zml4ZWQ7bGVmdDowO3RvcDowfS53ZXVpLXRvcHRpcHNbZGF0YS12LTFhN2JlYzJiXXtkaXNwbGF5OmJsb2NrfS8qIVxcclxcbiAqIFdlVUkgdjEuMS4yIChodHRwczovL2dpdGh1Yi5jb20vd2V1aS93ZXVpKVxcclxcbiAqIENvcHlyaWdodCAyMDE3IFRlbmNlbnQsIEluYy5cXHJcXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcXHJcXG4gKi9odG1sey1tcy10ZXh0LXNpemUtYWRqdXN0OjEwMCU7LXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OjEwMCV9Ym9keXtsaW5lLWhlaWdodDoxLjY7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbS1mb250LEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWZ9KnttYXJnaW46MDtwYWRkaW5nOjB9YSBpbWd7Ym9yZGVyOjB9YXt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1AZm9udC1mYWNle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LWZhbWlseTp3ZXVpO3NyYzp1cmwoXFxcImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUVBQUFBTEFJQUFBd0F3UjFOVlFyRCtzKzBBQUFFNEFBQUFRazlUTHpKQUtFeCtBQUFCZkFBQUFGWmpiV0Z3NjVjRkhRQUFBaHdBQUFKUVoyeDVadkNSUi9FQUFBU1VBQUFLdEdobFlXUU1QUk90QUFBQTRBQUFBRFpvYUdWaENDd0QrZ0FBQUx3QUFBQWthRzEwZUVKby8vOEFBQUhVQUFBQVNHeHZZMkVZcWhXNEFBQUViQUFBQUNadFlYaHdBU0VBVlFBQUFSZ0FBQUFnYm1GdFplTmNIdGdBQUE5SUFBQUI1bkJ2YzNUNmJMaExBQUFSTUFBQUFPWUFBUUFBQStnQUFBQmFBK2ovLy8vL0Era0FBUUFBQUFBQUFBQUFBQUFBQUFBQUFCSUFBUUFBQUFFQUFDYlpieHRmRHp6MUFBc0Q2QUFBQUFEVW0yZHZBQUFBQU5TYloyLy8vd0FBQStrRDZnQUFBQWdBQWdBQUFBQUFBQUFCQUFBQUVnQkpBQVVBQUFBQUFBSUFBQUFLQUFvQUFBRC9BQUFBQUFBQUFBRUFBQUFLQUI0QUxBQUJSRVpNVkFBSUFBUUFBQUFBQUFBQUFRQUFBQUZzYVdkaEFBZ0FBQUFCQUFBQUFRQUVBQVFBQUFBQkFBZ0FBUUFHQUFBQUFRQUFBQUFBQVFPd0FaQUFCUUFJQW5vQ3ZBQUFBSXdDZWdLOEFBQUI0QUF4QVFJQUFBSUFCUU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVVHWkZaQUJBNmdIcUVRUG9BQUFBV2dQcUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErai8vd1BvQUFBRDZBQUFBQUFBQlFBQUFBTUFBQUFzQUFBQUJBQUFBWFFBQVFBQUFBQUFiZ0FEQUFFQUFBQXNBQU1BQ2dBQUFYUUFCQUJDQUFBQUJBQUVBQUVBQU9vUi8vOEFBT29CLy84QUFBQUJBQVFBQUFBQkFBSUFBd0FFQUFVQUJnQUhBQWdBQ1FBS0FBc0FEQUFOQUE0QUR3QVFBQkVBQUFFR0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBQUFBTndBQUFBQUFBQUFFUUFBNmdFQUFPb0JBQUFBQVFBQTZnSUFBT29DQUFBQUFnQUE2Z01BQU9vREFBQUFBd0FBNmdRQUFPb0VBQUFBQkFBQTZnVUFBT29GQUFBQUJRQUE2Z1lBQU9vR0FBQUFCZ0FBNmdjQUFPb0hBQUFBQndBQTZnZ0FBT29JQUFBQUNBQUE2Z2tBQU9vSkFBQUFDUUFBNmdvQUFPb0tBQUFBQ2dBQTZnc0FBT29MQUFBQUN3QUE2Z3dBQU9vTUFBQUFEQUFBNmcwQUFPb05BQUFBRFFBQTZnNEFBT29PQUFBQURnQUE2ZzhBQU9vUEFBQUFEd0FBNmhBQUFPb1FBQUFBRUFBQTZoRUFBT29SQUFBQUVRQUFBQUFBUmdDTUFOSUJKQUY0QWNRQ01nSmdBcWdDL0FOSUE2WUQvZ1JPQktBRTlBVmFBQUFBQWdBQUFBQURyd090QUJRQUtRQUFBU0lIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0FmVjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVBNjA4TzJSbjhHZGpPenc4TzJObjhHZGtPeno4cnpjMVcxN2JYbHcxTnpjMVhGN2JYbHMxTndBQUFBQUNBQUFBQUFPekE3TUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQndZaUx3RW1OanNCRVRRMk93RXlGaFVSTXpJV0FlNTJaMlE3UFQwN1pHZDJmR3BtT3o0K08yWnBJWFlPS0E1MkRnMFhYUXNISmdjTFhSY05BN00rTzJacWZIWm5aRHM5UFR0a1ozWjlhV1k3UHYzd21oSVNtaElhQVJjSUN3c0kvdWthQUFNQUFBQUFBK1VENVFBWEFDTUFMQUFBQVNJSEJnY0dGUlFYRmhjV016STNOamMyTlRRbkppY21BeFFyQVNJMUF6UTdBVElISnlJbU5EWXlGaFFHQWU2RWNtOUJSRVJCYjNLRWlYWnhRa1JFUW5GMWFRSXhBd2dDUWdNQkl4SVpHU1FaR1FQa1JFSnhkb21FY205QlJFUkJiM0tFaW5WeFFrVDlIUUlDQVdJQ0FqRVpJeGtaSXhrQUFBQUFBZ0FBQUFBRHNRUGtBQmtBTGdBQUFRWUhCZ2MyQlJFVUZ4WVhGaGMyTnpZM05qVVJKQmNtSnlZVEFRWXZBU1kvQVRZeUh3RVdOamNsTmpJZkFSWUI5VlZWUWsrdi90RkhQbXhlYkd4ZGJUMUkvdEd2VDBKVm8vN1ZCQVNLQXdNU0FRVUJjUUVGQWdFU0FnVUJFUVFENHhNWUVoazNZUDZzam5WbFNEOGNIRDlJWlhXT0FWUmdOeGtTR1A2Mi90a0RBNDhFQkJrQ0FWWUNBUUhsQVFJUUJBQUFBQUFEQUFBQUFBT3hBK1FBR3dBcUFETUFBQUVHQndZSEJnY0dOeEVVRnhZWEZoYzJOelkzTmpVUkpCY21KeVlITXpJV0ZRTVVCaXNCSWljRE5EWVRJaVkwTmpJV0ZBWUI5VUZCT0Rzc08zOGdSejVzWG14c1hXMDlTUDdZcUZCQlZXODBCQVlNQXdJbUJRRUxCaDRQRmhZZUZSVUQ1QThTRGhJT0Vpa0svcTJQZFdSSlBoMGRQa2xrZFk4QlUxNDFHUklZL0FZRS9zWUNBd1VCT2dRRy9rQVZIeFVWSHhVQUFBQUNBQUFBQUFQa0ErUUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQVFZaUx3RW1Qd0UyTWg4QkZqSTNBVFl5SHdFV0FlNkVjbTlCUTBOQ2JuT0RpWFZ4UWtSRVFuRjFrZjZnQVFVQm93TURGZ0VGQVlVQ0JRRUJRd0lGQVJVRUErTkVRbkYxaVlOemJrSkRRMEZ2Y29TSmRYRkNSUDZqL3FVQkFhZ0VCUjRDQVdZQkFRRU5BZ0lWQkFBQUFBUUFBQUFBQTY4RHJRQVVBQ2tBUHdCREFBQUJJZ2NHQndZVUZ4WVhGakkzTmpjMk5DY21KeVlESWljbUp5WTBOelkzTmpJWEZoY1dGQWNHQndZVEJRNEJMd0VtQmc4QkJoWWZBUll5TndFK0FTWWlGekFmQVFIMWVHZGtPenc4TzJSbjhHWmtPenc4TzJSbWVHNWVXelkzTnpaYlh0dGVXelkzTnpaYlhtbis5Z1lTQm1BR0R3VURCUUVHZlFVUUJnRWxCUUVMRUJVQkFRT3RQRHRrWi9Cbll6czhQRHRqWi9CblpEczgvSzgzTlZ0ZTIxNWNOVGMzTlZ4ZTIxNWJOVGNDSnQwRkFRVkpCUUlHQkFjUkJvQUdCUUVoQlE4TEJBRUJBQUFCQUFBQUFBTzdBem9BRndBQUV5NEJQd0UrQVI4QkZqWTNBVFlXRnljV0ZBY0JCaUluUFFvR0J3VUhHZ3pMRENFTEFoMExId3NOQ2dyOXVRb2VDZ0d6Q3lFT0N3MEhDWk1KQVFvQnZna0NDZzBMSFF2OXNRc0tBQUFBQUFJQUFBQUFBK1VENWdBWEFDd0FBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTUhCaThCSmljbU5STTBOanNCTWhZVkV4Y2VBUUh2aEhKdlFVTkRRbTV6ZzRsMWNVSkVSRUp4ZFZjUUF3VDZBd0lFRUFNQ0t3SUREc1VDQVFQbFJFSnhkWW1EYzI1Q1EwTkJiM0tFaVhWeFFrVDlWaHdFQW5jQ0FnTUdBWG9DQXdNQy9xMkZBZ1FBQUFRQUFBQUFBNjhEclFBREFCZ0FMUUF6QUFBQk1COEJBeUlIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0F5TVZNelVqQXVVQkFmSjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVteVQ5MlFLREFRRUJMRHc3Wkdmd1oyTTdQRHc3WTJmd1oyUTdQUHl2TnpWYlh0dGVYRFUzTnpWY1h0dGVXelUzQWpIOUpBQUFBQU1BQUFBQUErUUQ1QUFYQUNjQU1BQUFBU0lIQmdjR0ZSUVhGaGNXTXpJM05qYzJOVFFuSmljbUF6TXlGaFVERkFZckFTSW1OUU0wTmhNaUpqUTJNaFlVQmdIdWhISnZRVU5EUW01emc0bDFjVUpFUkVKeGRaNDJCQVlNQXdJbkF3TU1CaDhQRmhZZUZoWUQ0MFJDY1hXSmczTnVRa05EUVc5eWhJbDFjVUpFL3ZZR0JmN0FBZ01EQWdGQUJRYitOaFlmRmhZZkZnQUFCQUFBQUFBRHdBUEFBQWdBRWdBb0FEMEFBQUV5TmpRbUlnWVVGaGNqRlRNUkl4VXpOU01ESWdjR0J3WVZGQllYRmpNeU56WTNOalUwSnk0QkF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBZlFZSVNFd0lTRlJqems1eVRvcmhHNXJQVDk5YW0rRGRtaGxQRDQrUE15RmJWNWJOVGMzTlZ0ZTJsNWJOVGMzTlZ0ZUFxQWlMeUlpTHlJNUhmN0VIQndDc1Q4OWEyNkVkOHc4UGo0OFpXaDJnMjlxZmZ5ak56VmJYdHBlV3pVM056VmJYdHBlV3pVM0FBQURBQUFBQUFPb0E2Z0FDd0FnQURVQUFBRUhKd2NYQnhjM0Z6Y25Od01pQndZSEJoUVhGaGNXTWpjMk56WTBKeVluSmdNaUp5WW5KalEzTmpjMk1oY1dGeFlVQndZSEJnS09tcG9jbXBvY21wb2NtcHEyZG1aaU9qczdPbUptN0daaU9qczdPbUptZG10ZFdUUTJOalJaWGRaZFdUUTJOalJaWFFLcW1wb2NtcG9jbXBvY21wb0JHVHM2WW1ic1ptSTZPenM2WW1ic1ptSTZPL3pDTmpSWlhkWmRXVFEyTmpSWlhkWmRXVFEyQUFNQUFBQUFBK2tENmdBYUFDOEFNQUFBQVFZSEJpTWlKeVluSmpRM05qYzJNaGNXRnhZVkZBY0dCd0VIQVRJM05qYzJOQ2NtSnlZaUJ3WUhCaFFYRmhjV013S09OVUJDUjIxZFdqVTNOelZhWGRwZFd6VTJHQmNyQVNNNS9lQlhTMGdyS3lzclNFdXVTa2txTEN3cVNVcFhBU01yRnhnMk5WdGQybDFhTlRjM05WcGRiVWRDUURYKzNqa0JHU3NyU0V1dVNra3FMQ3dxU1VxdVMwZ3JLd0FDLy84QUFBUG9BK2dBRkFBd0FBQUJJZ2NHQndZUUZ4WVhGaUEzTmpjMkVDY21KeVlURmc0QklpOEJCd1l1QVRRL0FTY21QZ0VXSHdFM05oNEJCZzhCQWZTSWRIRkRSRVJEY1hRQkVIUnhRMFJFUTNGMFNRb0JGQnNLb3FnS0d4TUtxS0lLQVJRYkNxS29DaHNVQVFxb0EraEVRM0YwL3ZCMGNVTkVSRU54ZEFFUWRIRkRSUDFqQ2hzVENxaWlDZ0VVR3dxaXFBb2JGQUVLcUtJS0FSUWJDcUlBQUFJQUFBQUFBK1FENUFBWEFEUUFBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTVVCaU1GRnhZVUR3RUdMd0V1QVQ4Qk5oOEJGaFFQQVFVeUZoMEJBZTZFY205QlEwTkNibk9EaVhWeFFrUkVRbkYxZndRQy9wR0RBUUVWQXdUc0FnRUM3QVFFRkFJQmhBRndBZ01ENDBSQ2NYV0pnM051UWtORFFXOXloSWwxY1VKRS9mWUNBd3VWQWdRQ0ZBUUUwQUlGQXRFRUJCUUNCUUdWQ3dNREp3QUFBQVVBQUFBQUE5UUQwd0FqQUNjQU53QkhBRWdBQUFFUkZBWWpJU0ltTlJFaklpWTlBVFEyTXlFMU5EWXpJVElXSFFFaE1oWWRBUlFHSXlFUklSRUhJZ1lWRVJRV093RXlOalVSTkNZaklTSUdGUkVVRmpzQk1qWTFFVFFtS3dFRGV5WWIvWFliSmtNSkRRMEpBUVlaRWdFdkV4a0JCZ2tORFFuOUNRSmMwUWtORFFrdENRME5DZjdzQ1EwTkNTMEpEUTBKTFFNaS9UUWJKaVliQXN3TUNpd0pEUzRTR1JrU0xnMEpMQW9NL1V3Q3RHc05DZjVOQ1EwTkNRR3pDUTBOQ2Y1TkNRME5DUUd6Q1EwQUFBQUFFQURHQUFFQUFBQUFBQUVBQkFBQUFBRUFBQUFBQUFJQUJ3QUVBQUVBQUFBQUFBTUFCQUFMQUFFQUFBQUFBQVFBQkFBUEFBRUFBQUFBQUFVQUN3QVRBQUVBQUFBQUFBWUFCQUFlQUFFQUFBQUFBQW9BS3dBaUFBRUFBQUFBQUFzQUV3Qk5BQU1BQVFRSkFBRUFDQUJnQUFNQUFRUUpBQUlBRGdCb0FBTUFBUVFKQUFNQUNBQjJBQU1BQVFRSkFBUUFDQUIrQUFNQUFRUUpBQVVBRmdDR0FBTUFBUVFKQUFZQUNBQ2NBQU1BQVFRSkFBb0FWZ0NrQUFNQUFRUUpBQXNBSmdENmQyVjFhVkpsWjNWc1lYSjNaWFZwZDJWMWFWWmxjbk5wYjI0Z01TNHdkMlYxYVVkbGJtVnlZWFJsWkNCaWVTQnpkbWN5ZEhSbUlHWnliMjBnUm05dWRHVnNiRzhnY0hKdmFtVmpkQzVvZEhSd09pOHZabTl1ZEdWc2JHOHVZMjl0QUhjQVpRQjFBR2tBVWdCbEFHY0FkUUJzQUdFQWNnQjNBR1VBZFFCcEFIY0FaUUIxQUdrQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBSGNBWlFCMUFHa0FSd0JsQUc0QVpRQnlBR0VBZEFCbEFHUUFJQUJpQUhrQUlBQnpBSFlBWndBeUFIUUFkQUJtQUNBQVpnQnlBRzhBYlFBZ0FFWUFid0J1QUhRQVpRQnNBR3dBYndBZ0FIQUFjZ0J2QUdvQVpRQmpBSFFBTGdCb0FIUUFkQUJ3QURvQUx3QXZBR1lBYndCdUFIUUFaUUJzQUd3QWJ3QXVBR01BYndCdEFBQUFBZ0FBQUFBQUFBQUtBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBU0FRSUJBd0VFQVFVQkJnRUhBUWdCQ1FFS0FRc0JEQUVOQVE0QkR3RVFBUkVCRWdFVEFBWmphWEpqYkdVSVpHOTNibXh2WVdRRWFXNW1id3h6WVdabFgzTjFZMk5sYzNNSmMyRm1aVjkzWVhKdUIzTjFZMk5sYzNNT2MzVmpZMlZ6Y3kxamFYSmpiR1VSYzNWalkyVnpjeTF1YnkxamFYSmpiR1VIZDJGcGRHbHVadzUzWVdsMGFXNW5MV05wY21Oc1pRUjNZWEp1QzJsdVptOHRZMmx5WTJ4bEJtTmhibU5sYkFaelpXRnlZMmdGWTJ4bFlYSUVZbUZqYXdaa1pXeGxkR1VBQUFBQVxcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKX1bY2xhc3MqPVxcXCIgd2V1aS1pY29uLVxcXCJdLFtjbGFzc149d2V1aS1pY29uLV17ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO2ZvbnQ6bm9ybWFsIG5vcm1hbCBub3JtYWwgMTRweC8xIHdldWk7Zm9udC1zaXplOmluaGVyaXQ7dGV4dC1yZW5kZXJpbmc6YXV0bzstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkfVtjbGFzcyo9XFxcIiB3ZXVpLWljb24tXFxcIl06YmVmb3JlLFtjbGFzc149d2V1aS1pY29uLV06YmVmb3Jle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1sZWZ0Oi4yZW07bWFyZ2luLXJpZ2h0Oi4yZW19LndldWktaWNvbi1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTAxXFxcIn0ud2V1aS1pY29uLWRvd25sb2FkOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwMlxcXCJ9LndldWktaWNvbi1pbmZvOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwM1xcXCJ9LndldWktaWNvbi1zYWZlLXN1Y2Nlc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA0XFxcIn0ud2V1aS1pY29uLXNhZmUtd2FybjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDVcXFwifS53ZXVpLWljb24tc3VjY2VzczpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDZcXFwifS53ZXVpLWljb24tc3VjY2Vzcy1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTA3XFxcIn0ud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwOFxcXCJ9LndldWktaWNvbi13YWl0aW5nOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwOVxcXCJ9LndldWktaWNvbi13YWl0aW5nLWNpcmNsZTpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEFcXFwifS53ZXVpLWljb24td2FybjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEJcXFwifS53ZXVpLWljb24taW5mby1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6XFxcIlxcXFxFQTBDXFxcIn0ud2V1aS1pY29uLWNhbmNlbDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMERcXFwifS53ZXVpLWljb24tc2VhcmNoOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUEwRVxcXCJ9LndldWktaWNvbi1jbGVhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMEZcXFwifS53ZXVpLWljb24tYmFjazpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMTBcXFwifS53ZXVpLWljb24tZGVsZXRlOmJlZm9yZXtjb250ZW50OlxcXCJcXFxcRUExMVxcXCJ9W2NsYXNzKj1cXFwiIHdldWktaWNvbl9cXFwiXTpiZWZvcmUsW2NsYXNzXj13ZXVpLWljb25fXTpiZWZvcmV7bWFyZ2luOjB9LndldWktaWNvbi1zdWNjZXNze2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi13YWl0aW5ne2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMxMGFlZmZ9LndldWktaWNvbi13YXJue2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiNmNDM1MzB9LndldWktaWNvbi1pbmZve2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMxMGFlZmZ9LndldWktaWNvbi1zdWNjZXNzLWNpcmNsZSwud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi13YWl0aW5nLWNpcmNsZXtmb250LXNpemU6MjNweDtjb2xvcjojMTBhZWZmfS53ZXVpLWljb24tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiNjOWM5Yzl9LndldWktaWNvbi1kb3dubG9hZCwud2V1aS1pY29uLWluZm8tY2lyY2xle2ZvbnQtc2l6ZToyM3B4O2NvbG9yOiMwOWJiMDd9LndldWktaWNvbi1zYWZlLXN1Y2Nlc3N7Y29sb3I6IzA5YmIwN30ud2V1aS1pY29uLXNhZmUtd2Fybntjb2xvcjojZmZiZTAwfS53ZXVpLWljb24tY2FuY2Vse2NvbG9yOiNmNDM1MzA7Zm9udC1zaXplOjIycHh9LndldWktaWNvbi1jbGVhciwud2V1aS1pY29uLXNlYXJjaHtjb2xvcjojYjJiMmIyO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWljb24tZGVsZXRlLndldWktaWNvbl9nYWxsZXJ5LWRlbGV0ZXtjb2xvcjojZmZmO2ZvbnQtc2l6ZToyMnB4fS53ZXVpLWljb25fbXNne2ZvbnQtc2l6ZTo5M3B4fS53ZXVpLWljb25fbXNnLndldWktaWNvbi13YXJue2NvbG9yOiNmNzYyNjB9LndldWktaWNvbl9tc2ctcHJpbWFyeXtmb250LXNpemU6OTNweH0ud2V1aS1pY29uX21zZy1wcmltYXJ5LndldWktaWNvbi13YXJue2NvbG9yOiNmZmJlMDB9LndldWktYnRue3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0bztwYWRkaW5nLWxlZnQ6MTRweDtwYWRkaW5nLXJpZ2h0OjE0cHg7Ym94LXNpemluZzpib3JkZXItYm94O2ZvbnQtc2l6ZToxOHB4O3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6Mi41NTU1NTU1Njtib3JkZXItcmFkaXVzOjVweDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTtvdmVyZmxvdzpoaWRkZW59LndldWktYnRuOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3dpZHRoOjIwMCU7aGVpZ2h0OjIwMCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMik7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjUpO3RyYW5zZm9ybTpzY2FsZSguNSk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czoxMHB4fS53ZXVpLWJ0bl9pbmxpbmV7ZGlzcGxheTppbmxpbmUtYmxvY2t9LndldWktYnRuX2RlZmF1bHR7Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmOGY4Zjh9LndldWktYnRuX2RlZmF1bHQ6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZHtjb2xvcjojMDAwfS53ZXVpLWJ0bl9kZWZhdWx0Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDAsMCwwLC42KTtiYWNrZ3JvdW5kLWNvbG9yOiNkZWRlZGV9LndldWktYnRuX3ByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojMWFhZDE5fS53ZXVpLWJ0bl9wcmltYXJ5Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWR7Y29sb3I6I2ZmZn0ud2V1aS1idG5fcHJpbWFyeTpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmV7Y29sb3I6aHNsYSgwLDAlLDEwMCUsLjYpO2JhY2tncm91bmQtY29sb3I6IzE3OWIxNn0ud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlNjQzNDB9LndldWktYnRuX3dhcm46bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZHtjb2xvcjojZmZmfS53ZXVpLWJ0bl93YXJuOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNik7YmFja2dyb3VuZC1jb2xvcjojY2UzYzM5fS53ZXVpLWJ0bl9kaXNhYmxlZHtjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNil9LndldWktYnRuX2Rpc2FibGVkLndldWktYnRuX2RlZmF1bHR7Y29sb3I6cmdiYSgwLDAsMCwuMyk7YmFja2dyb3VuZC1jb2xvcjojZjdmN2Y3fS53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6IzllZDk5ZH0ud2V1aS1idG5fZGlzYWJsZWQud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlYzhiODl9LndldWktYnRuX2xvYWRpbmcgLndldWktbG9hZGluZ3ttYXJnaW46LS4yZW0gLjM0ZW0gMCAwfS53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnksLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2Fybntjb2xvcjpoc2xhKDAsMCUsMTAwJSwuNil9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeXtiYWNrZ3JvdW5kLWNvbG9yOiMxNzliMTZ9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNjZTNjMzl9LndldWktYnRuX3BsYWluLXByaW1hcnl7Y29sb3I6IzFhYWQxOTtib3JkZXI6MXB4IHNvbGlkICMxYWFkMTl9LndldWktYnRuX3BsYWluLXByaW1hcnk6bm90KC53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZCk6YWN0aXZle2NvbG9yOnJnYmEoMjYsMTczLDI1LC42KTtib3JkZXItY29sb3I6cmdiYSgyNiwxNzMsMjUsLjYpfS53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5OmFmdGVye2JvcmRlci13aWR0aDowfS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0e2NvbG9yOiMzNTM1MzU7Ym9yZGVyOjFweCBzb2xpZCAjMzUzNTM1fS53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0Om5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZXtjb2xvcjpyZ2JhKDUzLDUzLDUzLC42KTtib3JkZXItY29sb3I6cmdiYSg1Myw1Myw1MywuNil9LndldWktYnRuX3BsYWluLWRlZmF1bHQ6YWZ0ZXJ7Ym9yZGVyLXdpZHRoOjB9LndldWktYnRuX3BsYWluLWRpc2FibGVke2NvbG9yOnJnYmEoMCwwLDAsLjIpO2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC4yKX1idXR0b24ud2V1aS1idG4saW5wdXQud2V1aS1idG57d2lkdGg6MTAwJTtib3JkZXItd2lkdGg6MDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9YnV0dG9uLndldWktYnRuOmZvY3VzLGlucHV0LndldWktYnRuOmZvY3Vze291dGxpbmU6MH1idXR0b24ud2V1aS1idG5faW5saW5lLGJ1dHRvbi53ZXVpLWJ0bl9taW5pLGlucHV0LndldWktYnRuX2lubGluZSxpbnB1dC53ZXVpLWJ0bl9taW5pe3dpZHRoOmF1dG99YnV0dG9uLndldWktYnRuX3BsYWluLWRlZmF1bHQsYnV0dG9uLndldWktYnRuX3BsYWluLXByaW1hcnksaW5wdXQud2V1aS1idG5fcGxhaW4tZGVmYXVsdCxpbnB1dC53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5e2JvcmRlci13aWR0aDoxcHg7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ud2V1aS1idG5fbWluaXtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjAgMS4zMmVtO2xpbmUtaGVpZ2h0OjIuMztmb250LXNpemU6MTNweH0ud2V1aS1idG4rLndldWktYnRue21hcmdpbi10b3A6MTVweH0ud2V1aS1idG4ud2V1aS1idG5faW5saW5lKy53ZXVpLWJ0bi53ZXVpLWJ0bl9pbmxpbmV7bWFyZ2luLXRvcDphdXRvO21hcmdpbi1sZWZ0OjE1cHh9LndldWktYnRuLWFyZWF7bWFyZ2luOjEuMTc2NDcwNTllbSAxNXB4IC4zZW19LndldWktYnRuLWFyZWFfaW5saW5le2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktYnRuLWFyZWFfaW5saW5lIC53ZXVpLWJ0bnttYXJnaW4tdG9wOmF1dG87bWFyZ2luLXJpZ2h0OjE1cHg7d2lkdGg6MTAwJTstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktYnRuLWFyZWFfaW5saW5lIC53ZXVpLWJ0bjpsYXN0LWNoaWxke21hcmdpbi1yaWdodDowfS53ZXVpLWNlbGxze21hcmdpbi10b3A6MS4xNzY0NzA1OWVtO2JhY2tncm91bmQtY29sb3I6I2ZmZjtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0O2ZvbnQtc2l6ZToxN3B4O292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsczpiZWZvcmV7dG9wOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktY2VsbHM6YWZ0ZXIsLndldWktY2VsbHM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxcHg7Y29sb3I6I2U1ZTVlNTt6LWluZGV4OjJ9LndldWktY2VsbHM6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktY2VsbHNfX3RpdGxle21hcmdpbi10b3A6Ljc3ZW07bWFyZ2luLWJvdHRvbTouM2VtO3BhZGRpbmctbGVmdDoxNXB4O3BhZGRpbmctcmlnaHQ6MTVweDtjb2xvcjojOTk5O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGxzX190aXRsZSsud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjB9LndldWktY2VsbHNfX3RpcHN7bWFyZ2luLXRvcDouM2VtO2NvbG9yOiM5OTk7cGFkZGluZy1sZWZ0OjE1cHg7cGFkZGluZy1yaWdodDoxNXB4O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGx7cGFkZGluZzoxMHB4IDE1cHg7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS1jZWxsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSk7bGVmdDoxNXB4O3otaW5kZXg6Mn0ud2V1aS1jZWxsOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktY2VsbF9wcmltYXJ5ey13ZWJraXQtYm94LWFsaWduOnN0YXJ0Oy1tcy1mbGV4LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnR9LndldWktY2VsbF9fYmR7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWNlbGxfX2Z0e3RleHQtYWxpZ246cmlnaHQ7Y29sb3I6Izk5OX0ud2V1aS1jZWxsX3N3aXBlZHtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MH0ud2V1aS1jZWxsX3N3aXBlZD4ud2V1aS1jZWxsX19iZHtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjE7YmFja2dyb3VuZC1jb2xvcjojZmZmfS53ZXVpLWNlbGxfc3dpcGVkPi53ZXVpLWNlbGxfX2Z0e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7Ym90dG9tOjA7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtjb2xvcjojZmZmfS53ZXVpLXN3aXBlZC1idG57ZGlzcGxheTpibG9jaztwYWRkaW5nOjEwcHggMWVtO2xpbmUtaGVpZ2h0OjEuNDcwNTg4MjQ7Y29sb3I6aW5oZXJpdH0ud2V1aS1zd2lwZWQtYnRuX2RlZmF1bHR7YmFja2dyb3VuZC1jb2xvcjojYzdjN2NjfS53ZXVpLXN3aXBlZC1idG5fd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNmZjNiMzB9LndldWktY2VsbF9hY2Nlc3N7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7Y29sb3I6aW5oZXJpdH0ud2V1aS1jZWxsX2FjY2VzczphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWNlbGxfYWNjZXNzIC53ZXVpLWNlbGxfX2Z0e3BhZGRpbmctcmlnaHQ6MTNweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1jZWxsX2FjY2VzcyAud2V1aS1jZWxsX19mdDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTttYXJnaW4tdG9wOi00cHg7cmlnaHQ6MnB4fS53ZXVpLWNlbGxfbGlua3tjb2xvcjojNTg2Yzk0O2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWNlbGxfbGluazpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpibG9ja30ud2V1aS1jaGVja19fbGFiZWx7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktY2hlY2tfX2xhYmVsOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlY2VjZWN9LndldWktY2hlY2t7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotOTk5OWVtfS53ZXVpLWNlbGxzX3JhZGlvIC53ZXVpLWNlbGxfX2Z0e3BhZGRpbmctbGVmdDouMzVlbX0ud2V1aS1jZWxsc19yYWRpbyAud2V1aS1jaGVjazpjaGVja2VkKy53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7ZGlzcGxheTpibG9jaztjb250ZW50OlxcXCJcXFxcRUEwOFxcXCI7Y29sb3I6IzA5YmIwNztmb250LXNpemU6MTZweH0ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1jZWxsX19oZHtwYWRkaW5nLXJpZ2h0Oi4zNWVtfS53ZXVpLWNlbGxzX2NoZWNrYm94IC53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDFcXFwiO2NvbG9yOiNjOWM5Yzk7Zm9udC1zaXplOjIzcHg7ZGlzcGxheTpibG9ja30ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1jaGVjazpjaGVja2VkKy53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmV7Y29udGVudDpcXFwiXFxcXEVBMDZcXFwiO2NvbG9yOiMwOWJiMDd9LndldWktbGFiZWx7ZGlzcGxheTpibG9jazt3aWR0aDoxMDVweDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbH0ud2V1aS1pbnB1dHt3aWR0aDoxMDAlO2JvcmRlcjowO291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2ZvbnQtc2l6ZTppbmhlcml0O2NvbG9yOmluaGVyaXQ7aGVpZ2h0OjEuNDcwNTg4MjRlbTtsaW5lLWhlaWdodDoxLjQ3MDU4ODI0fS53ZXVpLWlucHV0Ojotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLC53ZXVpLWlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lO21hcmdpbjowfS53ZXVpLXRleHRhcmVhe2Rpc3BsYXk6YmxvY2s7Ym9yZGVyOjA7cmVzaXplOm5vbmU7d2lkdGg6MTAwJTtjb2xvcjppbmhlcml0O2ZvbnQtc2l6ZToxZW07bGluZS1oZWlnaHQ6aW5oZXJpdDtvdXRsaW5lOjB9LndldWktdGV4dGFyZWEtY291bnRlcntjb2xvcjojYjJiMmIyO3RleHQtYWxpZ246cmlnaHR9LndldWktY2VsbF93YXJuIC53ZXVpLXRleHRhcmVhLWNvdW50ZXJ7Y29sb3I6I2U2NDM0MH0ud2V1aS10b3B0aXBze2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjpmaXhlZDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RvcDowO2xlZnQ6MDtyaWdodDowO3BhZGRpbmc6NXB4O2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiNmZmY7ei1pbmRleDo1MDAwO3dvcmQtd3JhcDpicmVhay13b3JkO3dvcmQtYnJlYWs6YnJlYWstYWxsfS53ZXVpLXRvcHRpcHNfd2FybntiYWNrZ3JvdW5kLWNvbG9yOiNlNjQzNDB9LndldWktY2VsbHNfZm9ybSAud2V1aS1jZWxsX19mdHtmb250LXNpemU6MH0ud2V1aS1jZWxsc19mb3JtIC53ZXVpLWljb24td2FybntkaXNwbGF5Om5vbmV9LndldWktY2VsbHNfZm9ybSBpbnB1dCwud2V1aS1jZWxsc19mb3JtIGxhYmVsW2Zvcl0sLndldWktY2VsbHNfZm9ybSB0ZXh0YXJlYXstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1jZWxsX3dhcm57Y29sb3I6I2U2NDM0MH0ud2V1aS1jZWxsX3dhcm4gLndldWktaWNvbi13YXJue2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLWZvcm0tcHJldmlld3twb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndldWktZm9ybS1wcmV2aWV3OmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXc6YWZ0ZXIsLndldWktZm9ybS1wcmV2aWV3OmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTV9LndldWktZm9ybS1wcmV2aWV3OmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWZvcm0tcHJldmlld19faGR7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4IDE1cHg7dGV4dC1hbGlnbjpyaWdodDtsaW5lLWhlaWdodDoyLjVlbX0ud2V1aS1mb3JtLXByZXZpZXdfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KTtsZWZ0OjE1cHh9LndldWktZm9ybS1wcmV2aWV3X19oZCAud2V1aS1mb3JtLXByZXZpZXdfX3ZhbHVle2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToxLjZlbX0ud2V1aS1mb3JtLXByZXZpZXdfX2Jke3BhZGRpbmc6MTBweCAxNXB4O2ZvbnQtc2l6ZTouOWVtO3RleHQtYWxpZ246cmlnaHQ7Y29sb3I6Izk5OTtsaW5lLWhlaWdodDoyfS53ZXVpLWZvcm0tcHJldmlld19fZnR7cG9zaXRpb246cmVsYXRpdmU7bGluZS1oZWlnaHQ6NTBweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWZvcm0tcHJldmlld19fZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q1ZDVkNjtjb2xvcjojZDVkNWQ2Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1mb3JtLXByZXZpZXdfX2l0ZW17b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWZvcm0tcHJldmlld19fbGFiZWx7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6MWVtO21pbi13aWR0aDo0ZW07Y29sb3I6Izk5OTt0ZXh0LWFsaWduOmp1c3RpZnk7dGV4dC1hbGlnbi1sYXN0Omp1c3RpZnl9LndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjt3b3JkLWJyZWFrOm5vcm1hbDt3b3JkLXdyYXA6YnJlYWstd29yZH0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtjb2xvcjojM2NjNTFmO3RleHQtYWxpZ246Y2VudGVyOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfWJ1dHRvbi53ZXVpLWZvcm0tcHJldmlld19fYnRue2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7b3V0bGluZTowO2xpbmUtaGVpZ2h0OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXR9LndldWktZm9ybS1wcmV2aWV3X19idG46YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2VlZX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bjphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZDVkNWQ2O2NvbG9yOiNkNWQ1ZDY7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWZvcm0tcHJldmlld19fYnRuOmZpcnN0LWNoaWxkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1mb3JtLXByZXZpZXdfX2J0bl9kZWZhdWx0e2NvbG9yOiM5OTl9LndldWktZm9ybS1wcmV2aWV3X19idG5fcHJpbWFyeXtjb2xvcjojMGJiMjBjfS53ZXVpLWNlbGxfc2VsZWN0e3BhZGRpbmc6MH0ud2V1aS1jZWxsX3NlbGVjdCAud2V1aS1zZWxlY3R7cGFkZGluZy1yaWdodDozMHB4fS53ZXVpLWNlbGxfc2VsZWN0IC53ZXVpLWNlbGxfX2JkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDo2cHg7d2lkdGg6NnB4O2JvcmRlci13aWR0aDoycHggMnB4IDAgMDtib3JkZXItY29sb3I6I2M4YzhjZDtib3JkZXItc3R5bGU6c29saWQ7LXdlYmtpdC10cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTt0cmFuc2Zvcm06bWF0cml4KC43MSwuNzEsLS43MSwuNzEsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3JpZ2h0OjE1cHg7bWFyZ2luLXRvcDotNHB4fS53ZXVpLXNlbGVjdHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtib3JkZXI6MDtvdXRsaW5lOjA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2hlaWdodDo0NXB4O2xpbmUtaGVpZ2h0OjQ1cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO3BhZGRpbmctbGVmdDoxNXB4fS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZXtwYWRkaW5nLXJpZ2h0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLXNlbGVjdHt3aWR0aDoxMDVweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hke3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSAud2V1aS1jZWxsX19oZDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlNWU1ZTU7Y29sb3I6I2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MTAwJSAwO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NnB4O3dpZHRoOjZweDtib3JkZXItd2lkdGg6MnB4IDJweCAwIDA7Ym9yZGVyLWNvbG9yOiNjOGM4Y2Q7Ym9yZGVyLXN0eWxlOnNvbGlkOy13ZWJraXQtdHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7dHJhbnNmb3JtOm1hdHJpeCguNzEsLjcxLC0uNzEsLjcxLDAsMCk7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtyaWdodDoxNXB4O21hcmdpbi10b3A6LTRweH0ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktY2VsbF9fYmR7cGFkZGluZy1sZWZ0OjE1cHh9LndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2JkOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1jZWxsX3NlbGVjdC1hZnRlcntwYWRkaW5nLWxlZnQ6MTVweH0ud2V1aS1jZWxsX3NlbGVjdC1hZnRlciAud2V1aS1zZWxlY3R7cGFkZGluZy1sZWZ0OjB9LndldWktY2VsbF92Y29kZXtwYWRkaW5nLXRvcDowO3BhZGRpbmctcmlnaHQ6MDtwYWRkaW5nLWJvdHRvbTowfS53ZXVpLXZjb2RlLWJ0biwud2V1aS12Y29kZS1pbWd7bWFyZ2luLWxlZnQ6NXB4O2hlaWdodDo0NXB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS12Y29kZS1idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIC42ZW0gMCAuN2VtO2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjZTVlNWU1O2xpbmUtaGVpZ2h0OjQ1cHg7Zm9udC1zaXplOjE3cHg7Y29sb3I6IzNjYzUxZn1idXR0b24ud2V1aS12Y29kZS1idG57YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wOjA7Ym9yZGVyLXJpZ2h0OjA7Ym9yZGVyLWJvdHRvbTowO291dGxpbmU6MH0ud2V1aS12Y29kZS1idG46YWN0aXZle2NvbG9yOiM1MmEzNDF9LndldWktZ2FsbGVyeXtkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtsZWZ0OjA7YmFja2dyb3VuZC1jb2xvcjojMDAwO3otaW5kZXg6MTAwMH0ud2V1aS1nYWxsZXJ5X19pbWd7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDtib3R0b206NjBweDtsZWZ0OjA7YmFja2dyb3VuZDo1MCUgbm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTpjb250YWlufS53ZXVpLWdhbGxlcnlfX29wcntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtiYWNrZ3JvdW5kLWNvbG9yOiMwZDBkMGQ7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDo2MHB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLWdhbGxlcnlfX2RlbHtkaXNwbGF5OmJsb2NrfS53ZXVpLWNlbGxfc3dpdGNoe3BhZGRpbmctdG9wOjYuNXB4O3BhZGRpbmctYm90dG9tOjYuNXB4fS53ZXVpLXN3aXRjaHstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmV9LndldWktc3dpdGNoLC53ZXVpLXN3aXRjaC1jcF9fYm94e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjUycHg7aGVpZ2h0OjMycHg7Ym9yZGVyOjFweCBzb2xpZCAjZGZkZmRmO291dGxpbmU6MDtib3JkZXItcmFkaXVzOjE2cHg7Ym94LXNpemluZzpib3JkZXItYm94O2JhY2tncm91bmQtY29sb3I6I2RmZGZkZjt0cmFuc2l0aW9uOmJhY2tncm91bmQtY29sb3IgLjFzLGJvcmRlciAuMXN9LndldWktc3dpdGNoLWNwX19ib3g6YmVmb3JlLC53ZXVpLXN3aXRjaDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjUwcHg7aGVpZ2h0OjMwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZkZmRmZDt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpLC13ZWJraXQtdHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40NSwxLC40LDEpfS53ZXVpLXN3aXRjaC1jcF9fYm94OmFmdGVyLC53ZXVpLXN3aXRjaDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjQpO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zNXMgY3ViaWMtYmV6aWVyKC40LC40LC4yNSwxLjM1KTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllciguNCwuNCwuMjUsMS4zNSksLXdlYmtpdC10cmFuc2Zvcm0gLjM1cyBjdWJpYy1iZXppZXIoLjQsLjQsLjI1LDEuMzUpfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveCwud2V1aS1zd2l0Y2g6Y2hlY2tlZHtib3JkZXItY29sb3I6IzA0YmUwMjtiYWNrZ3JvdW5kLWNvbG9yOiMwNGJlMDJ9LndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2Vkfi53ZXVpLXN3aXRjaC1jcF9fYm94OmJlZm9yZSwud2V1aS1zd2l0Y2g6Y2hlY2tlZDpiZWZvcmV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZH4ud2V1aS1zd2l0Y2gtY3BfX2JveDphZnRlciwud2V1aS1zd2l0Y2g6Y2hlY2tlZDphZnRlcnstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKDIwcHgpfS53ZXVpLXN3aXRjaC1jcF9faW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotOTk5OXB4fS53ZXVpLXN3aXRjaC1jcF9fYm94e2Rpc3BsYXk6YmxvY2t9LndldWktdXBsb2FkZXJfX2hke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cGFkZGluZy1ib3R0b206MTBweDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ud2V1aS11cGxvYWRlcl9fdGl0bGV7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXVwbG9hZGVyX19pbmZve2NvbG9yOiNiMmIyYjJ9LndldWktdXBsb2FkZXJfX2Jke21hcmdpbi1ib3R0b206LTRweDttYXJnaW4tcmlnaHQ6LTlweDtvdmVyZmxvdzpoaWRkZW59LndldWktdXBsb2FkZXJfX2ZpbGVze2xpc3Qtc3R5bGU6bm9uZX0ud2V1aS11cGxvYWRlcl9fZmlsZXtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDo5cHg7bWFyZ2luLWJvdHRvbTo5cHg7d2lkdGg6NzlweDtoZWlnaHQ6NzlweDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCA1MCU7YmFja2dyb3VuZC1zaXplOmNvdmVyfS53ZXVpLXVwbG9hZGVyX19maWxlX3N0YXR1c3twb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNSl9LndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVzIC53ZXVpLXVwbG9hZGVyX19maWxlLWNvbnRlbnR7ZGlzcGxheTpibG9ja30ud2V1aS11cGxvYWRlcl9fZmlsZS1jb250ZW50e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtjb2xvcjojZmZmfS53ZXVpLXVwbG9hZGVyX19maWxlLWNvbnRlbnQgLndldWktaWNvbi13YXJue2Rpc3BsYXk6aW5saW5lLWJsb2NrfS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3h7ZmxvYXQ6bGVmdDtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW4tcmlnaHQ6OXB4O21hcmdpbi1ib3R0b206OXB4O3dpZHRoOjc3cHg7aGVpZ2h0Ojc3cHg7Ym9yZGVyOjFweCBzb2xpZCAjZDlkOWQ5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWZ0ZXIsLndldWktdXBsb2FkZXJfX2lucHV0LWJveDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7YmFja2dyb3VuZC1jb2xvcjojZDlkOWQ5fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YmVmb3Jle3dpZHRoOjJweDtoZWlnaHQ6MzkuNXB4fS53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWZ0ZXJ7d2lkdGg6MzkuNXB4O2hlaWdodDoycHh9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmV7Ym9yZGVyLWNvbG9yOiM5OTl9LndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YWZ0ZXIsLndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6Izk5OX0ud2V1aS11cGxvYWRlcl9faW5wdXR7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO29wYWNpdHk6MDstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX0ud2V1aS1tc2d7cGFkZGluZy10b3A6MzZweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1tc2dfX2ljb24tYXJlYXttYXJnaW4tYm90dG9tOjMwcHh9LndldWktbXNnX190ZXh0LWFyZWF7bWFyZ2luLWJvdHRvbToyNXB4O3BhZGRpbmc6MCAyMHB4fS53ZXVpLW1zZ19fdGV4dC1hcmVhIGF7Y29sb3I6IzU4NmM5NH0ud2V1aS1tc2dfX3RpdGxle21hcmdpbi1ib3R0b206NXB4O2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MjBweH0ud2V1aS1tc2dfX2Rlc2N7Zm9udC1zaXplOjE0cHg7Y29sb3I6Izk5OX0ud2V1aS1tc2dfX29wci1hcmVhe21hcmdpbi1ib3R0b206MjVweH0ud2V1aS1tc2dfX2V4dHJhLWFyZWF7bWFyZ2luLWJvdHRvbToxNXB4O2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM5OTl9LndldWktbXNnX19leHRyYS1hcmVhIGF7Y29sb3I6IzU4NmM5NH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLWhlaWdodDo0MzhweCl7LndldWktbXNnX19leHRyYS1hcmVhe3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyfX0ud2V1aS1hcnRpY2xle3BhZGRpbmc6MjBweCAxNXB4O2ZvbnQtc2l6ZToxNXB4fS53ZXVpLWFydGljbGUgc2VjdGlvbnttYXJnaW4tYm90dG9tOjEuNWVtfS53ZXVpLWFydGljbGUgaDF7Zm9udC1zaXplOjE4cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi1ib3R0b206LjllbX0ud2V1aS1hcnRpY2xlIGgye2ZvbnQtc2l6ZToxNnB4fS53ZXVpLWFydGljbGUgaDIsLndldWktYXJ0aWNsZSBoM3tmb250LXdlaWdodDo0MDA7bWFyZ2luLWJvdHRvbTouMzRlbX0ud2V1aS1hcnRpY2xlIGgze2ZvbnQtc2l6ZToxNXB4fS53ZXVpLWFydGljbGUgKnttYXgtd2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7d29yZC13cmFwOmJyZWFrLXdvcmR9LndldWktYXJ0aWNsZSBwe21hcmdpbjowIDAgLjhlbX0ud2V1aS10YWJiYXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjUwMDtib3R0b206MDt3aWR0aDoxMDAlO2JhY2tncm91bmQtY29sb3I6I2Y3ZjdmYX0ud2V1aS10YWJiYXI6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2MwYmZjNDtjb2xvcjojYzBiZmM0Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS10YWJiYXJfX2l0ZW17ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7cGFkZGluZzo1cHggMCAwO2ZvbnQtc2l6ZTowO2NvbG9yOiM5OTk7dGV4dC1hbGlnbjpjZW50ZXI7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9LndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9faWNvbiwud2V1aS10YWJiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb24gLndldWktdGFiYmFyX19pY29uPmksLndldWktdGFiYmFyX19pdGVtLndldWktYmFyX19pdGVtX29uIC53ZXVpLXRhYmJhcl9fbGFiZWx7Y29sb3I6IzA5YmIwN30ud2V1aS10YWJiYXJfX2ljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MjdweDtoZWlnaHQ6MjdweH0ud2V1aS10YWJiYXJfX2ljb24+aSxpLndldWktdGFiYmFyX19pY29ue2ZvbnQtc2l6ZToyNHB4O2NvbG9yOiM5OTl9LndldWktdGFiYmFyX19pY29uIGltZ3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS53ZXVpLXRhYmJhcl9fbGFiZWx7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6Izk5OTtmb250LXNpemU6MTBweDtsaW5lLWhlaWdodDoxLjh9LndldWktbmF2YmFye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo1MDA7dG9wOjA7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOiNmYWZhZmF9LndldWktbmF2YmFyOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztjb2xvcjojY2NjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1uYXZiYXIrLndldWktdGFiX19wYW5lbHtwYWRkaW5nLXRvcDo1MHB4O3BhZGRpbmctYm90dG9tOjB9LndldWktbmF2YmFyX19pdGVte3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxO3BhZGRpbmc6MTNweCAwO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNXB4Oy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApfS53ZXVpLW5hdmJhcl9faXRlbTphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWRlZGVkfS53ZXVpLW5hdmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbntiYWNrZ3JvdW5kLWNvbG9yOiNlYWVhZWF9LndldWktbmF2YmFyX19pdGVtOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7d2lkdGg6MXB4O2JvdHRvbTowO2JvcmRlci1yaWdodDoxcHggc29saWQgI2NjYztjb2xvcjojY2NjOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7dHJhbnNmb3JtLW9yaWdpbjoxMDAlIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KX0ud2V1aS1uYXZiYXJfX2l0ZW06bGFzdC1jaGlsZDphZnRlcntkaXNwbGF5Om5vbmV9LndldWktdGFie3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlfS53ZXVpLXRhYl9fcGFuZWx7Ym94LXNpemluZzpib3JkZXItYm94O2hlaWdodDoxMDAlO3BhZGRpbmctYm90dG9tOjUwcHg7b3ZlcmZsb3c6YXV0bzstd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzp0b3VjaH0ud2V1aS10YWJfX2NvbnRlbnR7ZGlzcGxheTpub25lfS53ZXVpLXByb2dyZXNze2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktcHJvZ3Jlc3NfX2JhcntiYWNrZ3JvdW5kLWNvbG9yOiNlYmViZWI7aGVpZ2h0OjNweDstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjF9LndldWktcHJvZ3Jlc3NfX2lubmVyLWJhcnt3aWR0aDowO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6IzA5YmIwN30ud2V1aS1wcm9ncmVzc19fb3Bye2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6MTVweDtmb250LXNpemU6MH0ud2V1aS1wYW5lbHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bWFyZ2luLXRvcDoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ud2V1aS1wYW5lbDpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjB9LndldWktcGFuZWw6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBhbmVsOmFmdGVyLC53ZXVpLXBhbmVsOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2NvbG9yOiNlNWU1ZTV9LndldWktcGFuZWw6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktcGFuZWxfX2hke3BhZGRpbmc6MTRweCAxNXB4IDEwcHg7Y29sb3I6Izk5OTtmb250LXNpemU6MTNweDtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1wYW5lbF9faGQ6YWZ0ZXJ7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweH0ud2V1aS1tZWRpYS1ib3h7cGFkZGluZzoxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS53ZXVpLW1lZGlhLWJveDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpO2xlZnQ6MTVweH0ud2V1aS1tZWRpYS1ib3g6Zmlyc3QtY2hpbGQ6YmVmb3Jle2Rpc3BsYXk6bm9uZX1hLndldWktbWVkaWEtYm94e2NvbG9yOiMwMDA7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCl9YS53ZXVpLW1lZGlhLWJveDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLW1lZGlhLWJveF9fdGl0bGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxN3B4O3dpZHRoOmF1dG87b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO3dvcmQtd3JhcDpub3JtYWw7d29yZC13cmFwOmJyZWFrLXdvcmQ7d29yZC1icmVhazpicmVhay1hbGx9LndldWktbWVkaWEtYm94X19kZXNje2NvbG9yOiM5OTk7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MS4yO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6LXdlYmtpdC1ib3g7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtbGluZS1jbGFtcDoyfS53ZXVpLW1lZGlhLWJveF9faW5mb3ttYXJnaW4tdG9wOjE1cHg7cGFkZGluZy1ib3R0b206NXB4O2ZvbnQtc2l6ZToxM3B4O2NvbG9yOiNjZWNlY2U7bGluZS1oZWlnaHQ6MWVtO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzpoaWRkZW59LndldWktbWVkaWEtYm94X19pbmZvX19tZXRhe2Zsb2F0OmxlZnQ7cGFkZGluZy1yaWdodDoxZW19LndldWktbWVkaWEtYm94X19pbmZvX19tZXRhX2V4dHJhe3BhZGRpbmctbGVmdDoxZW07Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNjZWNlY2V9LndldWktbWVkaWEtYm94X3RleHQgLndldWktbWVkaWEtYm94X190aXRsZXttYXJnaW4tYm90dG9tOjhweH0ud2V1aS1tZWRpYS1ib3hfYXBwbXNne2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktbWVkaWEtYm94X2FwcG1zZyAud2V1aS1tZWRpYS1ib3hfX2hke21hcmdpbi1yaWdodDouOGVtO3dpZHRoOjYwcHg7aGVpZ2h0OjYwcHg7bGluZS1oZWlnaHQ6NjBweDt0ZXh0LWFsaWduOmNlbnRlcn0ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9fdGh1bWJ7d2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCU7dmVydGljYWwtYWxpZ246dG9wfS53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X19iZHstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7bWluLXdpZHRoOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZ3twYWRkaW5nOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZyAud2V1aS1jZWxsc3ttYXJnaW4tdG9wOjB9LndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZyAud2V1aS1jZWxsczpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWdyaWRze3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ud2V1aS1ncmlkczpiZWZvcmV7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWdyaWRzOmFmdGVyLC53ZXVpLWdyaWRzOmJlZm9yZXtjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7Y29sb3I6I2Q5ZDlkOX0ud2V1aS1ncmlkczphZnRlcnt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWdyaWR7cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjIwcHggMTBweDt3aWR0aDozMy4zMzMzMzMzMyU7Ym94LXNpemluZzpib3JkZXItYm94fS53ZXVpLWdyaWQ6YmVmb3Jle3RvcDowO3dpZHRoOjFweDtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNkOWQ5ZDk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDt0cmFuc2Zvcm0tb3JpZ2luOjEwMCUgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVgoLjUpO3RyYW5zZm9ybTpzY2FsZVgoLjUpfS53ZXVpLWdyaWQ6YWZ0ZXIsLndldWktZ3JpZDpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtib3R0b206MDtjb2xvcjojZDlkOWQ5fS53ZXVpLWdyaWQ6YWZ0ZXJ7bGVmdDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2Q5ZDlkOTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZ3JpZDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWdyaWRfX2ljb257d2lkdGg6MjhweDtoZWlnaHQ6MjhweDttYXJnaW46MCBhdXRvfS53ZXVpLWdyaWRfX2ljb24gaW1ne2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ud2V1aS1ncmlkX19pY29uKy53ZXVpLWdyaWRfX2xhYmVse21hcmdpbi10b3A6NXB4fS53ZXVpLWdyaWRfX2xhYmVse2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzAwMDt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1vdmVyZmxvdzplbGxpcHNpcztvdmVyZmxvdzpoaWRkZW59LndldWktZm9vdGVyLC53ZXVpLWdyaWRfX2xhYmVse3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWZvb3Rlcntjb2xvcjojOTk5fS53ZXVpLWZvb3RlciBhe2NvbG9yOiM1ODZjOTR9LndldWktZm9vdGVyX2ZpeGVkLWJvdHRvbXtwb3NpdGlvbjpmaXhlZDtib3R0b206LjUyZW07bGVmdDowO3JpZ2h0OjB9LndldWktZm9vdGVyX19saW5rc3tmb250LXNpemU6MH0ud2V1aS1mb290ZXJfX2xpbmt7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wO21hcmdpbjowIC42MmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtc2l6ZToxNHB4fS53ZXVpLWZvb3Rlcl9fbGluazpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjFweDtib3R0b206MDtib3JkZXItbGVmdDoxcHggc29saWQgI2M3YzdjNztjb2xvcjojYzdjN2M3Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVYKC41KTt0cmFuc2Zvcm06c2NhbGVYKC41KTtsZWZ0Oi0uNjVlbTt0b3A6LjM2ZW07Ym90dG9tOi4zNmVtfS53ZXVpLWZvb3Rlcl9fbGluazpmaXJzdC1jaGlsZDpiZWZvcmV7ZGlzcGxheTpub25lfS53ZXVpLWZvb3Rlcl9fdGV4dHtwYWRkaW5nOjAgLjM0ZW07Zm9udC1zaXplOjEycHh9LndldWktZmxleHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4fS53ZXVpLWZsZXhfX2l0ZW17LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLWRpYWxvZ3twb3NpdGlvbjpmaXhlZDt6LWluZGV4OjUwMDA7d2lkdGg6ODAlO21heC13aWR0aDozMDBweDt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7Ym9yZGVyLXJhZGl1czozcHg7b3ZlcmZsb3c6aGlkZGVufS53ZXVpLWRpYWxvZ19faGR7cGFkZGluZzoxLjNlbSAxLjZlbSAuNWVtfS53ZXVpLWRpYWxvZ19fdGl0bGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxOHB4fS53ZXVpLWRpYWxvZ19fYmR7cGFkZGluZzowIDEuNmVtIC44ZW07bWluLWhlaWdodDo0MHB4O2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjEuMzt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOmJyZWFrLWFsbDtjb2xvcjojOTk5fS53ZXVpLWRpYWxvZ19fYmQ6Zmlyc3QtY2hpbGR7cGFkZGluZzoyLjdlbSAyMHB4IDEuN2VtO2NvbG9yOiMzNTM1MzV9LndldWktZGlhbG9nX19mdHtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo0OHB4O2ZvbnQtc2l6ZToxOHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9LndldWktZGlhbG9nX19mdDphZnRlcntjb250ZW50OlxcXCIgXFxcIjtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtoZWlnaHQ6MXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktZGlhbG9nX19idG57ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7Y29sb3I6IzNjYzUxZjt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTtwb3NpdGlvbjpyZWxhdGl2ZX0ud2V1aS1kaWFsb2dfX2J0bjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWVlfS53ZXVpLWRpYWxvZ19fYnRuOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxcHg7Ym90dG9tOjA7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNkNWQ1ZDY7Y29sb3I6I2Q1ZDVkNjstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAwO3RyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWCguNSk7dHJhbnNmb3JtOnNjYWxlWCguNSl9LndldWktZGlhbG9nX19idG46Zmlyc3QtY2hpbGQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLWRpYWxvZ19fYnRuX2RlZmF1bHR7Y29sb3I6IzM1MzUzNX0ud2V1aS1kaWFsb2dfX2J0bl9wcmltYXJ5e2NvbG9yOiMwYmIyMGN9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ3t0ZXh0LWFsaWduOmxlZnQ7Ym94LXNoYWRvdzowIDZweCAzMHB4IDAgcmdiYSgwLDAsMCwuMSl9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fdGl0bGV7Zm9udC1zaXplOjIxcHh9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19faGR7dGV4dC1hbGlnbjpsZWZ0fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Jke2NvbG9yOiM5OTk7cGFkZGluZzouMjVlbSAxLjZlbSAyZW07Zm9udC1zaXplOjE3cHg7dGV4dC1hbGlnbjpsZWZ0fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2JkOmZpcnN0LWNoaWxke3BhZGRpbmc6MS42ZW0gMS42ZW0gMmVtO2NvbG9yOiMzNTM1MzV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fZnR7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOnJpZ2h0O2xpbmUtaGVpZ2h0OjQycHg7Zm9udC1zaXplOjE2cHg7cGFkZGluZzowIDEuNmVtIC43ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fZnQ6YWZ0ZXJ7ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3A7cGFkZGluZzowIC44ZW19LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmFmdGVye2Rpc3BsYXk6bm9uZX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46YWN0aXZlLC53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjp2aXNpdGVke2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuMDYpfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2J0bjpsYXN0LWNoaWxke21hcmdpbi1yaWdodDotLjhlbX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG5fZGVmYXVsdHtjb2xvcjpncmF5fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTAyNHB4KXsud2V1aS1kaWFsb2d7d2lkdGg6MzUlfX0ud2V1aS10b2FzdHtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjUwMDA7d2lkdGg6Ny42ZW07bWluLWhlaWdodDo3LjZlbTt0b3A6MTgwcHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTMuOGVtO2JhY2tncm91bmQ6aHNsYSgwLDAlLDclLC43KTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjVweDtjb2xvcjojZmZmfS53ZXVpLWljb25fdG9hc3R7bWFyZ2luOjIycHggMCAwO2Rpc3BsYXk6YmxvY2t9LndldWktaWNvbl90b2FzdC53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGU6YmVmb3Jle2NvbG9yOiNmZmY7Zm9udC1zaXplOjU1cHh9LndldWktaWNvbl90b2FzdC53ZXVpLWxvYWRpbmd7bWFyZ2luOjMwcHggMCAwO3dpZHRoOjM4cHg7aGVpZ2h0OjM4cHg7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LndldWktdG9hc3RfX2NvbnRlbnR7bWFyZ2luOjAgMCAxNXB4fS53ZXVpLW1hc2t7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC42KX0ud2V1aS1tYXNrLC53ZXVpLW1hc2tfdHJhbnNwYXJlbnR7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwO3RvcDowO3JpZ2h0OjA7bGVmdDowO2JvdHRvbTowfS53ZXVpLWFjdGlvbnNoZWV0e3Bvc2l0aW9uOmZpeGVkO2xlZnQ6MDtib3R0b206MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47ei1pbmRleDo1MDAwO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0O3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZXtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6NjVweDtwYWRkaW5nOjAgMjBweDtsaW5lLWhlaWdodDoxLjQ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjstbXMtZmxleC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsOy1tcy1mbGV4LWRpcmVjdGlvbjpjb2x1bW47ZmxleC1kaXJlY3Rpb246Y29sdW1uO3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxNHB4O2NvbG9yOiM4ODg7YmFja2dyb3VuZDojZmNmY2ZkfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZTpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3JpZ2h0OjA7aGVpZ2h0OjFweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O2NvbG9yOiNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLWFjdGlvbnNoZWV0X190aXRsZSAud2V1aS1hY3Rpb25zaGVldF9fdGl0bGUtdGV4dHtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5Oi13ZWJraXQtYm94Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWxpbmUtY2xhbXA6Mn0ud2V1aS1hY3Rpb25zaGVldF9fbWVudXtiYWNrZ3JvdW5kLWNvbG9yOiNmY2ZjZmR9LndldWktYWN0aW9uc2hlZXRfX2FjdGlvbnttYXJnaW4tdG9wOjZweDtiYWNrZ3JvdW5kLWNvbG9yOiNmY2ZjZmR9LndldWktYWN0aW9uc2hlZXRfX2NlbGx7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4IDA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE4cHh9LndldWktYWN0aW9uc2hlZXRfX2NlbGw6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZWNlY2VjfS53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmZpcnN0LWNoaWxkOmJlZm9yZXtkaXNwbGF5Om5vbmV9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0e3Bvc2l0aW9uOmZpeGVkO2xlZnQ6NTAlO3RvcDo1MCU7Ym90dG9tOmF1dG87LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3dpZHRoOjI3NHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcywtd2Via2l0LXRyYW5zZm9ybSAuM3N9LndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb257ZGlzcGxheTpub25lfS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fbWVudXtib3JkZXItcmFkaXVzOjJweDtib3gtc2hhZG93OjAgNnB4IDMwcHggMCByZ2JhKDAsMCwwLC4xKX0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGx7cGFkZGluZzoxM3B4IDI0cHg7Zm9udC1zaXplOjE2cHg7bGluZS1oZWlnaHQ6MS40O3RleHQtYWxpZ246bGVmdH0ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGw6Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czoycHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MnB4fS53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpsYXN0LWNoaWxke2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MnB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjJweH0ud2V1aS1hY3Rpb25zaGVldF90b2dnbGV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDApO3RyYW5zZm9ybTp0cmFuc2xhdGUoMCl9LndldWktbG9hZG1vcmV7d2lkdGg6NjUlO21hcmdpbjoxLjVlbSBhdXRvO2xpbmUtaGVpZ2h0OjEuNmVtO2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS53ZXVpLWxvYWRtb3JlX190aXBze2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS1sb2FkbW9yZV9saW5le2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTU7bWFyZ2luLXRvcDoyLjRlbX0ud2V1aS1sb2FkbW9yZV9saW5lIC53ZXVpLWxvYWRtb3JlX190aXBze3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotLjllbTtwYWRkaW5nOjAgLjU1ZW07YmFja2dyb3VuZC1jb2xvcjojZmZmO2NvbG9yOiM5OTl9LndldWktbG9hZG1vcmVfZG90IC53ZXVpLWxvYWRtb3JlX190aXBze3BhZGRpbmc6MCAuMTZlbX0ud2V1aS1sb2FkbW9yZV9kb3QgLndldWktbG9hZG1vcmVfX3RpcHM6YmVmb3Jle2NvbnRlbnQ6XFxcIiBcXFwiO3dpZHRoOjRweDtoZWlnaHQ6NHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2U1ZTVlNTtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjowO3RvcDotLjE2ZW19LndldWktYmFkZ2V7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzouMTVlbSAuNGVtO21pbi13aWR0aDo4cHg7Ym9yZGVyLXJhZGl1czoxOHB4O2JhY2tncm91bmQtY29sb3I6I2Y0MzUzMDtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjEuMjt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTJweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LndldWktYmFkZ2VfZG90e3BhZGRpbmc6LjRlbTttaW4td2lkdGg6MH0ud2V1aS1zZWFyY2gtYmFye3Bvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmc6OHB4IDEwcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZC1jb2xvcjojZWZlZmY0fS53ZXVpLXNlYXJjaC1iYXI6YmVmb3Jle3RvcDowO2JvcmRlci10b3A6MXB4IHNvbGlkICNkN2Q2ZGM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXNlYXJjaC1iYXI6YWZ0ZXIsLndldWktc2VhcmNoLWJhcjpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZDdkNmRjfS53ZXVpLXNlYXJjaC1iYXI6YWZ0ZXJ7Ym90dG9tOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2Q3ZDZkYzstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46MCAxMDAlO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlWSguNSk7dHJhbnNmb3JtOnNjYWxlWSguNSl9LndldWktc2VhcmNoLWJhci53ZXVpLXNlYXJjaC1iYXJfZm9jdXNpbmcgLndldWktc2VhcmNoLWJhcl9fY2FuY2VsLWJ0bntkaXNwbGF5OmJsb2NrfS53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2xhYmVse2Rpc3BsYXk6bm9uZX0ud2V1aS1zZWFyY2gtYmFyX19mb3Jte3Bvc2l0aW9uOnJlbGF0aXZlOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDphdXRvO2ZsZXg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNlZmVmZjR9LndldWktc2VhcmNoLWJhcl9fZm9ybTphZnRlcntjb250ZW50OlxcXCJcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoyMDAlO2hlaWdodDoyMDAlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC41KTt0cmFuc2Zvcm06c2NhbGUoLjUpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7Ym9yZGVyLXJhZGl1czoxMHB4O2JvcmRlcjoxcHggc29saWQgI2U2ZTZlYTtib3gtc2l6aW5nOmJvcmRlci1ib3g7YmFja2dyb3VuZDojZmZmfS53ZXVpLXNlYXJjaC1iYXJfX2JveHtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MzBweDtwYWRkaW5nLXJpZ2h0OjMwcHg7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxfS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1zZWFyY2gtYmFyX19pbnB1dHtwYWRkaW5nOjRweCAwO3dpZHRoOjEwMCU7aGVpZ2h0OjEuNDI4NTcxNDNlbTtib3JkZXI6MDtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxLjQyODU3MTQzZW07Ym94LXNpemluZzpjb250ZW50LWJveDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50fS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1zZWFyY2gtYmFyX19pbnB1dDpmb2N1c3tvdXRsaW5lOm5vbmV9LndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLWljb24tc2VhcmNoe3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTBweDt0b3A6MDtsaW5lLWhlaWdodDoyOHB4fS53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1pY29uLWNsZWFye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7cGFkZGluZzowIDEwcHg7bGluZS1oZWlnaHQ6MjhweH0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4O3JpZ2h0OjFweDtib3R0b206MXB4O2xlZnQ6MXB4O3otaW5kZXg6Mjtib3JkZXItcmFkaXVzOjNweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojOWI5YjliO2JhY2tncm91bmQ6I2ZmZn0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbCBzcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc2l6ZToxNHB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ud2V1aS1zZWFyY2gtYmFyX19sYWJlbCAud2V1aS1pY29uLXNlYXJjaHttYXJnaW4tcmlnaHQ6NXB4fS53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG57ZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHg7bGluZS1oZWlnaHQ6MjhweDtjb2xvcjojMDliYjA3O3doaXRlLXNwYWNlOm5vd3JhcH0ud2V1aS1zZWFyY2gtYmFyX19pbnB1dDpub3QoOnZhbGlkKX4ud2V1aS1pY29uLWNsZWFye2Rpc3BsYXk6bm9uZX1pbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLGlucHV0W3R5cGU9c2VhcmNoXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb257ZGlzcGxheTpub25lfS53ZXVpLXBpY2tlcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2xlZnQ6MDtib3R0b206MDt6LWluZGV4OjUwMDA7LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfS53ZXVpLXBpY2tlcl9faGR7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDtwYWRkaW5nOjlweCAxNXB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTdweH0ud2V1aS1waWNrZXJfX2hkOmFmdGVye2NvbnRlbnQ6XFxcIiBcXFwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDtyaWdodDowO2hlaWdodDoxcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNTtjb2xvcjojZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7dHJhbnNmb3JtLW9yaWdpbjowIDEwMCU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2FjdGlvbntkaXNwbGF5OmJsb2NrOy13ZWJraXQtYm94LWZsZXg6MTstbXMtZmxleDoxO2ZsZXg6MTtjb2xvcjojMWFhZDE5fS53ZXVpLXBpY2tlcl9fYWN0aW9uOmZpcnN0LWNoaWxke3RleHQtYWxpZ246bGVmdDtjb2xvcjojODg4fS53ZXVpLXBpY2tlcl9fYWN0aW9uOmxhc3QtY2hpbGR7dGV4dC1hbGlnbjpyaWdodH0ud2V1aS1waWNrZXJfX2Jke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2hlaWdodDoyMzhweDtvdmVyZmxvdzpoaWRkZW59LndldWktcGlja2VyX19ncm91cHstd2Via2l0LWJveC1mbGV4OjE7LW1zLWZsZXg6MTtmbGV4OjE7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCV9LndldWktcGlja2VyX19tYXNre3RvcDowO2hlaWdodDoxMDAlO21hcmdpbjowIGF1dG87YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLGhzbGEoMCwwJSwxMDAlLC45NSksaHNsYSgwLDAlLDEwMCUsLjYpKSxsaW5lYXItZ3JhZGllbnQoMGRlZyxoc2xhKDAsMCUsMTAwJSwuOTUpLGhzbGEoMCwwJSwxMDAlLC42KSk7YmFja2dyb3VuZC1wb3NpdGlvbjp0b3AsYm90dG9tO2JhY2tncm91bmQtc2l6ZToxMDAlIDEwMnB4O2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yLC53ZXVpLXBpY2tlcl9fbWFza3twb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7d2lkdGg6MTAwJTt6LWluZGV4OjN9LndldWktcGlja2VyX19pbmRpY2F0b3J7aGVpZ2h0OjM0cHg7dG9wOjEwMnB4fS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmJlZm9yZXt0b3A6MDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1Oy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGVZKC41KTt0cmFuc2Zvcm06c2NhbGVZKC41KX0ud2V1aS1waWNrZXJfX2luZGljYXRvcjphZnRlciwud2V1aS1waWNrZXJfX2luZGljYXRvcjpiZWZvcmV7Y29udGVudDpcXFwiIFxcXCI7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjFweDtjb2xvcjojZTVlNWU1fS53ZXVpLXBpY2tlcl9faW5kaWNhdG9yOmFmdGVye2JvdHRvbTowO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTt0cmFuc2Zvcm0tb3JpZ2luOjAgMTAwJTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZVkoLjUpO3RyYW5zZm9ybTpzY2FsZVkoLjUpfS53ZXVpLXBpY2tlcl9fY29udGVudHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJX0ud2V1aS1waWNrZXJfX2l0ZW17cGFkZGluZzowO2hlaWdodDozNHB4O2xpbmUtaGVpZ2h0OjM0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzAwMDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW59LndldWktcGlja2VyX19pdGVtX2Rpc2FibGVke2NvbG9yOiM5OTl9QC13ZWJraXQta2V5ZnJhbWVzIGF7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9dG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX19QGtleWZyYW1lcyBhezAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVooMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVooMCl9fS53ZXVpLWFuaW1hdGUtc2xpZGUtdXB7LXdlYmtpdC1hbmltYXRpb246YSBlYXNlIC4zcyBmb3J3YXJkczthbmltYXRpb246YSBlYXNlIC4zcyBmb3J3YXJkc31ALXdlYmtpdC1rZXlmcmFtZXMgYnswJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApfXRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApfX1Aa2V5ZnJhbWVzIGJ7MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX10b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwJSwwKX19LndldWktYW5pbWF0ZS1zbGlkZS1kb3duey13ZWJraXQtYW5pbWF0aW9uOmIgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmIgZWFzZSAuM3MgZm9yd2FyZHN9QC13ZWJraXQta2V5ZnJhbWVzIGN7MCV7b3BhY2l0eTowfXRve29wYWNpdHk6MX19QGtleWZyYW1lcyBjezAle29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS53ZXVpLWFuaW1hdGUtZmFkZS1pbnstd2Via2l0LWFuaW1hdGlvbjpjIGVhc2UgLjNzIGZvcndhcmRzO2FuaW1hdGlvbjpjIGVhc2UgLjNzIGZvcndhcmRzfUAtd2Via2l0LWtleWZyYW1lcyBkezAle29wYWNpdHk6MX10b3tvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZHswJXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX0ud2V1aS1hbmltYXRlLWZhZGUtb3V0ey13ZWJraXQtYW5pbWF0aW9uOmQgZWFzZSAuM3MgZm9yd2FyZHM7YW5pbWF0aW9uOmQgZWFzZSAuM3MgZm9yd2FyZHN9LndldWktYWdyZWV7ZGlzcGxheTpibG9jaztwYWRkaW5nOi41ZW0gMTVweDtmb250LXNpemU6MTNweH0ud2V1aS1hZ3JlZSBhe2NvbG9yOiM1ODZjOTR9LndldWktYWdyZWVfX3RleHR7Y29sb3I6Izk5OX0ud2V1aS1hZ3JlZV9fY2hlY2tib3h7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO291dGxpbmU6MDtmb250LXNpemU6MDtib3JkZXI6MXB4IHNvbGlkICNkMWQxZDE7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6M3B4O3dpZHRoOjEzcHg7aGVpZ2h0OjEzcHg7cG9zaXRpb246cmVsYXRpdmU7dmVydGljYWwtYWxpZ246MDt0b3A6MnB4fS53ZXVpLWFncmVlX19jaGVja2JveDpjaGVja2VkOmJlZm9yZXtmb250LWZhbWlseTp3ZXVpO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXZhcmlhbnQ6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7dGV4dC1hbGlnbjpjZW50ZXI7c3BlYWs6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dGV4dC1kZWNvcmF0aW9uOmluaGVyaXQ7Y29udGVudDpcXFwiXFxcXEVBMDhcXFwiO2NvbG9yOiMwOWJiMDc7Zm9udC1zaXplOjEzcHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNDglKSBzY2FsZSguNzMpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNDglKSBzY2FsZSguNzMpfS53ZXVpLWFncmVlX19jaGVja2JveDpkaXNhYmxlZHtiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTF9LndldWktYWdyZWVfX2NoZWNrYm94OmRpc2FibGVkOmJlZm9yZXtjb2xvcjojYWRhZGFkfS53ZXVpLWxvYWRpbmd7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC1hbmltYXRpb246ZSAxcyBzdGVwcygxMikgaW5maW5pdGU7YW5pbWF0aW9uOmUgMXMgc3RlcHMoMTIpIGluZmluaXRlO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQgdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1qQWlJR2hsYVdkb2REMGlNVEl3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStQSEJoZEdnZ1ptbHNiRDBpYm05dVpTSWdaRDBpVFRBZ01HZ3hNREIyTVRBd1NEQjZJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpSVGxGT1VVNUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtEQWdMVE13S1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSXprNE9UWTVOeUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3pNQ0F4TURVdU9UZ2dOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqT1VJNU9UbEJJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtEWXdJRGMxTGprNElEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMEV6UVRGQk1pSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnNU1DQTJOU0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlOQlFrRTVRVUVpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9NVEl3SURVNExqWTJJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBJeVFqSkNNaUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3hOVEFnTlRRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUWtGQ09FSTVJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtERTRNQ0ExTUNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRNa013UXpFaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFMU1DQTBOUzQ1T0NBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRRa05DUTBJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFeU1DQTBNUzR6TkNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkVNa1F5UkRJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRrd0lETTFJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBSQlJFRkVRU0lnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3ROakFnTWpRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUlRKRk1rVXlJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtDMHpNQ0F0TlM0NU9DQTJOU2tpTHo0OEwzTjJaejQ9KSBuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOjEwMCV9LndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeSAud2V1aS1sb2FkaW5nLC53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm4gLndldWktbG9hZGluZywud2V1aS1sb2FkaW5nLndldWktbG9hZGluZ190cmFuc3BhcmVudHtiYWNrZ3JvdW5kLWltYWdlOnVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyMCcgaGVpZ2h0PScxMjAnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJyUzRSUzQ3BhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8lM0UlM0NyZWN0IHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41NiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMCAtMzApJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMzAgMTA1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNjUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMzIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCA1OC42NiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI1KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTE1MCA0NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTkwIDM1IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjEpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC02MCAyNC4wMiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvJTNFJTNDL3N2ZyUzRVxcXCIpfUAtd2Via2l0LWtleWZyYW1lcyBlezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDBkZWcpfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxdHVybik7dHJhbnNmb3JtOnJvdGF0ZSgxdHVybil9fUBrZXlmcmFtZXMgZXswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgwZGVnKX10b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMXR1cm4pO3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pfX0ud2V1aS1zbGlkZXJ7cGFkZGluZzoxNXB4IDE4cHg7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS53ZXVpLXNsaWRlcl9faW5uZXJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjJweDtiYWNrZ3JvdW5kLWNvbG9yOiNlOWU5ZTl9LndldWktc2xpZGVyX190cmFja3toZWlnaHQ6MnB4O2JhY2tncm91bmQtY29sb3I6IzFhYWQxOTt3aWR0aDowfS53ZXVpLXNsaWRlcl9faGFuZGxlcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjUwJTt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbi1sZWZ0Oi0xNHB4O21hcmdpbi10b3A6LTE0cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JveC1zaGFkb3c6MCAwIDRweCByZ2JhKDAsMCwwLC4yKX0ud2V1aS1zbGlkZXItYm94e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LndldWktc2xpZGVyLWJveCAud2V1aS1zbGlkZXJ7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS53ZXVpLXNsaWRlci1ib3hfX3ZhbHVle21hcmdpbi1sZWZ0Oi41ZW07bWluLXdpZHRoOjI0cHg7Y29sb3I6Izg4ODt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTRweH1cIiwgXCJcIl0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi93ZS12dWUvbGliL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiAoX3ZtLm1lbnVWaXNpYmxlKSA/IF9jKCd3di10YWJiYXInLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiZml4ZWRcIjogXCJcIlxuICAgIH1cbiAgfSwgW19jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9cIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7piTXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIummlumhtVwiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi9jYXRlZ29yeVwiXG4gICAgfVxuICB9LCBbX2MoJ2knLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaWNvbiBpY29uZm9udFwiLFxuICAgIHNsb3Q6IFwiaWNvblwiXG4gIH0sIFtfdm0uX3YoXCLumItcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCBbX3ZtLl92KFwi5YiG57G7XCIpXSldKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3d2LXRhYmJhci1pdGVtJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInRvXCI6IFwiL2NhcnRcIlxuICAgIH1cbiAgfSwgW19jKCdpJywge1xuICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnRcIixcbiAgICBzbG90OiBcImljb25cIlxuICB9LCBbX3ZtLl92KFwi7piRXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgW192bS5fdihcIui0reeJqei9plwiKV0pXSksIF92bS5fdihcIiBcIiksIF9jKCd3di10YWJiYXItaXRlbScsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0b1wiOiBcIi91c2VyXCJcbiAgICB9XG4gIH0sIFtfYygnaScsIHtcbiAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250XCIsXG4gICAgc2xvdDogXCJpY29uXCJcbiAgfSwgW192bS5fdihcIu6YnFwiKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIFtfdm0uX3YoXCLmiJHnmoRcIildKV0pXSwgMSkgOiBfdm0uX2UoKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi02MjAwMmQ0NVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTYyMDAyZDQ1XCJ9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9tYWlubWVudS52dWVcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNjIwMDJkNDVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9tYWlubWVudS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjM3N2M4NDEzXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcImlkXFxcIjpcXFwiZGF0YS12LTYyMDAyZDQ1XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vbWFpbm1lbnUudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02MjAwMmQ0NVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvbWFpbm1lbnUudnVlXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=