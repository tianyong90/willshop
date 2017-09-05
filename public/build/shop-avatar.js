webpackJsonp([3],{

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(197)
}
var Component = __webpack_require__(56)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(201),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d3cbde74",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\UPUPW_NG7.0\\vhosts\\willshop\\resources\\assets\\js\\shop\\components\\avatar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] avatar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3cbde74", Component.options)
  } else {
    hotAPI.reload("data-v-d3cbde74", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(198);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(55)("c3418fce", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3cbde74\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./avatar.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d3cbde74\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./avatar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(true);
// imports


// module
exports.push([module.i, "\n.cropper[data-v-d3cbde74] {\n  display: block;\n  overflow: hidden;\n  margin: 20px auto;\n  position: relative;\n  background-color: #fff;\n  border: 1px dotted #bbb;\n}\n.cropper img[data-v-d3cbde74] {\n    position: absolute;\n}\n.buttons[data-v-d3cbde74] {\n  display: block;\n  overflow: hidden;\n  padding: 1rem;\n}\n.buttons #file[data-v-d3cbde74] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    opacity: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1000;\n}\n", "", {"version":3,"sources":["D:/UPUPW_NG7.0/vhosts/willshop/resources/assets/js/shop/components/avatar.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;EACnB,uBAAuB;EACvB,wBAAwB;CAAE;AAC1B;IACE,mBAAmB;CAAE;AAEzB;EACE,eAAe;EACf,iBAAiB;EACjB,cAAc;CAAE;AAChB;IACE,mBAAmB;IACnB,QAAQ;IACR,OAAO;IACP,WAAW;IACX,YAAY;IACZ,aAAa;IACb,cAAc;CAAE","file":"avatar.vue","sourcesContent":[".cropper {\n  display: block;\n  overflow: hidden;\n  margin: 20px auto;\n  position: relative;\n  background-color: #fff;\n  border: 1px dotted #bbb; }\n  .cropper img {\n    position: absolute; }\n\n.buttons {\n  display: block;\n  overflow: hidden;\n  padding: 1rem; }\n  .buttons #file {\n    position: absolute;\n    left: 0;\n    top: 0;\n    opacity: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1000; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alloyfinger = __webpack_require__(200);

var _alloyfinger2 = _interopRequireDefault(_alloyfinger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      cropperWidth: 300,
      cropperHeight: 300,
      posX: 0,
      posY: 0,
      width: 0,
      height: 0,
      pinchStartWidth: 0,
      pinchStartHeight: 0,
      previewSrc: '',
      af: null
    };
  },


  computed: {
    cropData: function cropData() {
      return {
        x: Math.abs(this.posX),
        y: Math.abs(this.posY),
        width: this.width,
        height: this.height,
        cropWidth: this.cropperWidth,
        cropHeight: this.cropperHeight
      };
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.af = new _alloyfinger2.default(this.$refs.image, {
      multipointStart: function multipointStart(event) {
        event.preventDefault();

        _this.pinchStartWidth = _this.width;
        _this.pinchStartHeight = _this.height;
      },
      touchMove: function touchMove(event) {
        event.preventDefault();

        var targetX = _this.posX + event.deltaX;
        var targetY = _this.posY + event.deltaY;

        if (targetX <= 0 && _this.cropperWidth - targetX <= _this.width) {
          _this.posX = targetX;
        }

        if (targetY <= 0 && _this.cropperHeight - targetY <= _this.height) {
          _this.posY = targetY;
        }
      },
      pinch: function pinch(event) {
        event.preventDefault();

        var targetWidth = _this.pinchStartWidth * event.zoom;
        var targetHeight = _this.pinchStartHeight * event.zoom;

        if (targetWidth >= _this.cropperWidth - _this.posX && targetHeight >= _this.cropperHeight - _this.posY) {
          _this.width = targetWidth;
          _this.height = targetHeight;
        }
      }
    });
  },


  methods: {
    store: function store() {
      var _this2 = this;

      var files = document.getElementById('file').files;

      if (files.length === 0) {
        return false;
      }

      var oMyForm = new FormData();

      oMyForm.append("cropX", this.cropData.x);
      oMyForm.append("cropY", this.cropData.y);
      oMyForm.append("width", this.cropData.width);
      oMyForm.append("height", this.cropData.height);
      oMyForm.append("cropWidth", this.cropData.cropWidth);
      oMyForm.append("cropHeight", this.cropData.cropHeight);

      oMyForm.append("avatar", files[0]);

      this.isLoading = true;
      this.axios.post('user/avatar', oMyForm).then(function (response) {
        var data = response.data;

        if (data.status) {
          _this2.$root.success('设置成功');

          setTimeout(function () {
            _this2.$router.push('/profile');
          }, 1000);
        } else {
          _this2.$root.error(data.info);
        }
      }).catch(function (error) {
        _this2.$root.error('设置失败');
      });
    },
    cancle: function cancle() {
      this.$router.push('/profile');
    },
    fileChange: function fileChange() {
      var _this3 = this;

      var imageFile = document.getElementById('file').files[0];

      window.URL = window.URL || window.webkitURL;

      this.previewSrc = window.URL.createObjectURL(imageFile);

      var img = new Image();

      img.onload = function () {
        var originalWidth = img.width;
        var originalHeight = img.height;

        if (originalWidth >= originalHeight) {
          _this3.height = _this3.cropperHeight + 50;
          _this3.width = parseInt(originalWidth * _this3.height / originalHeight);
        } else {
          _this3.width = _this3.cropperWidth + 50;
          _this3.height = parseInt(originalHeight * _this3.width / originalWidth);
        }

        _this3.startWidth = _this3.width;
        _this3.startHeight = _this3.height;

        _this3.posX = -parseInt((_this3.width - _this3.cropperWidth) / 2);
        _this3.posY = -parseInt((_this3.height - _this3.cropperHeight) / 2);
        _this3.startX = _this3.posX;
        _this3.startY = _this3.posY;
      };
      img.src = this.previewSrc;
    }
  },

  beforeDestroy: function beforeDestroy() {
    if (this.af) {
      this.af.destroy();
    }
  }
};

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

﻿/* AlloyFinger v0.1.7
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */
; (function () {
    function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }

    function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
            angle *= -1;
        }

        return angle * 180 / Math.PI;
    }

    var HandlerAdmin = function(el) {
        this.handlers = [];
        this.el = el;
    };

    HandlerAdmin.prototype.add = function(handler) {
        this.handlers.push(handler);
    }

    HandlerAdmin.prototype.del = function(handler) {
        if(!handler) this.handlers = [];

        for(var i=this.handlers.length; i>=0; i--) {
            if(this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
            }
        }
    }

    HandlerAdmin.prototype.dispatch = function() {
        for(var i=0,len=this.handlers.length; i<len; i++) {
            var handler = this.handlers[i];
            if(typeof handler === 'function') handler.apply(this.el, arguments);
        }
    }

    function wrapFunc(el, handler) {
        var handlerAdmin = new HandlerAdmin(el);
        handlerAdmin.add(handler);

        return handlerAdmin;
    }

    var AlloyFinger = function (el, option) {

        this.element = typeof el == 'string' ? document.querySelector(el) : el;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.cancel = this.cancel.bind(this);
        this.element.addEventListener("touchstart", this.start, false);
        this.element.addEventListener("touchmove", this.move, false);
        this.element.addEventListener("touchend", this.end, false);
        this.element.addEventListener("touchcancel", this.cancel, false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.zoom = 1;
        this.isDoubleTap = false;

        var noop = function () { };

        this.rotate = wrapFunc(this.element, option.rotate || noop);
        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
        this.pinch = wrapFunc(this.element, option.pinch || noop);
        this.swipe = wrapFunc(this.element, option.swipe || noop);
        this.tap = wrapFunc(this.element, option.tap || noop);
        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
        this.longTap = wrapFunc(this.element, option.longTap || noop);
        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    };

    AlloyFinger.prototype = {
        start: function (evt) {
            if (!evt.touches) return;
            this.now = Date.now();
            this.x1 = evt.touches[0].pageX;
            this.y1 = evt.touches[0].pageY;
            this.delta = this.now - (this.last || this.now);
            this.touchStart.dispatch(evt);
            if (this.preTapPosition.x !== null) {
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
            }
            this.preTapPosition.x = this.x1;
            this.preTapPosition.y = this.y1;
            this.last = this.now;
            var preV = this.preV,
                len = evt.touches.length;
            if (len > 1) {
                this._cancelLongTap();
                this._cancelSingleTap();
                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                this.pinchStartLen = getLen(preV);
                this.multipointStart.dispatch(evt);
            }
            this.longTapTimeout = setTimeout(function () {
                this.longTap.dispatch(evt);
            }.bind(this), 750);
        },
        move: function (evt) {
            if (!evt.touches) return;
            var preV = this.preV,
                len = evt.touches.length,
                currentX = evt.touches[0].pageX,
                currentY = evt.touches[0].pageY;
            this.isDoubleTap = false;
            if (len > 1) {
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (this.pinchStartLen > 0) {
                        evt.zoom = getLen(v) / this.pinchStartLen;
                        this.pinch.dispatch(evt);
                    }

                    evt.angle = getRotateAngle(v, preV);
                    this.rotate.dispatch(evt);
                }
                preV.x = v.x;
                preV.y = v.y;
            } else {
                if (this.x2 !== null) {
                    evt.deltaX = currentX - this.x2;
                    evt.deltaY = currentY - this.y2;

                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                this.pressMove.dispatch(evt);
            }

            this.touchMove.dispatch(evt);

            this._cancelLongTap();
            this.x2 = currentX;
            this.y2 = currentY;
            if (len > 1) {
                evt.preventDefault();
            }
        },
        end: function (evt) {
            if (!evt.changedTouches) return;
            this._cancelLongTap();
            var self = this;
            if (evt.touches.length < 2) {
                this.multipointEnd.dispatch(evt);
            }

            //swipe
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                this.swipeTimeout = setTimeout(function () {
                    self.swipe.dispatch(evt);

                }, 0)
            } else {
                this.tapTimeout = setTimeout(function () {
                    self.tap.dispatch(evt);
                    // trigger double tap immediately
                    if (self.isDoubleTap) {
                        self.doubleTap.dispatch(evt);
                        clearTimeout(self.singleTapTimeout);
                        self.isDoubleTap = false;
                    }
                }, 0)

                if (!self.isDoubleTap) {
                    self.singleTapTimeout = setTimeout(function () {
                        self.singleTap.dispatch(evt);
                    }, 250);
                }
            }

            this.touchEnd.dispatch(evt);

            this.preV.x = 0;
            this.preV.y = 0;
            this.zoom = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancel: function (evt) {
            clearTimeout(this.singleTapTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
            this.touchCancel.dispatch(evt);
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout);
        },
        _cancelSingleTap: function () {
            clearTimeout(this.singleTapTimeout);
        },
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },

        on: function(evt, handler) {
            if(this[evt]) {
                this[evt].add(handler);
            }
        },

        off: function(evt, handler) {
            if(this[evt]) {
                this[evt].del(handler);
            }
        },

        destroy: function() {
            if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
            if(this.tapTimeout) clearTimeout(this.tapTimeout);
            if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
            if(this.swipeTimeout) clearTimeout(this.swipeTimeout);

            this.element.removeEventListener("touchstart", this.start);
            this.element.removeEventListener("touchmove", this.move);
            this.element.removeEventListener("touchend", this.end);
            this.element.removeEventListener("touchcancel", this.cancel);

            this.rotate.del();
            this.touchStart.del();
            this.multipointStart.del();
            this.multipointEnd.del();
            this.pinch.del();
            this.swipe.del();
            this.tap.del();
            this.doubleTap.del();
            this.longTap.del();
            this.singleTap.del();
            this.pressMove.del();
            this.touchMove.del();
            this.touchEnd.del();
            this.touchCancel.del();

            this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null;

            return null;
        }
    };

    if (true) {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    }
})();


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "cropper",
    style: ({
      width: _vm.cropperWidth + 'px',
      height: _vm.cropperHeight + 'px'
    })
  }, [_c('img', {
    ref: "image",
    staticClass: "preview",
    style: ({
      left: _vm.posX + 'px',
      top: _vm.posY + 'px',
      width: _vm.width + 'px',
      height: _vm.height + 'px'
    }),
    attrs: {
      "src": _vm.previewSrc
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "buttons"
  }, [_c('wv-button', {
    attrs: {
      "type": "default"
    }
  }, [_vm._v("选择图片\n      "), _c('input', {
    attrs: {
      "type": "file",
      "name": "file",
      "id": "file"
    },
    on: {
      "change": _vm.fileChange
    }
  })]), _vm._v(" "), _c('wv-flex', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "gutter": 20
    }
  }, [_c('wv-flex-item', [_c('wv-button', {
    attrs: {
      "type": "warn"
    },
    nativeOn: {
      "click": function($event) {
        _vm.cancle($event)
      }
    }
  }, [_vm._v("取消")])], 1), _vm._v(" "), _c('wv-flex-item', [_c('wv-button', {
    attrs: {
      "type": "primary"
    },
    nativeOn: {
      "click": function($event) {
        _vm.store($event)
      }
    }
  }, [_vm._v("保存")])], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d3cbde74", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hdmF0YXIudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9jb21wb25lbnRzL2F2YXRhci52dWU/NThiYSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hdmF0YXIudnVlPzJhYzIiLCJ3ZWJwYWNrOi8vL2F2YXRhci52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsbG95ZmluZ2VyL2FsbG95X2Zpbmdlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hdmF0YXIudnVlPzA4N2UiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBcU07QUFDck07QUFDQTtBQUNBO0FBQ0EseUJBQW1PO0FBQ25PO0FBQ0EseUJBQStIO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usc0RBQXNELElBQUk7QUFDekksbUNBQW1DOztBQUVuQztBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHNEQUF1RCxtQkFBbUIscUJBQXFCLHNCQUFzQix1QkFBdUIsMkJBQTJCLDRCQUE0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QUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InNob3AtYXZhdGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kM2NiZGU3NFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2F2YXRhci52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sXFxcImVzMjAxNVxcXCIsXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCJdLFxcXCJjb21tZW50c1xcXCI6ZmFsc2V9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vYXZhdGFyLnZ1ZVwiKSxcbiAgLyogdGVtcGxhdGUgKi9cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZDNjYmRlNzRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9hdmF0YXIudnVlXCIpLFxuICAvKiBzdHlsZXMgKi9cbiAgaW5qZWN0U3R5bGUsXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtZDNjYmRlNzRcIixcbiAgLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiRDpcXFxcVVBVUFdfTkc3LjBcXFxcdmhvc3RzXFxcXHdpbGxzaG9wXFxcXHJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxjb21wb25lbnRzXFxcXGF2YXRhci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGF2YXRhci52dWU6IGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhcmUgbm90IHN1cHBvcnRlZCB3aXRoIHRlbXBsYXRlcywgdGhleSBzaG91bGQgdXNlIHJlbmRlciBmdW5jdGlvbnMuXCIpfVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZDNjYmRlNzRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1kM2NiZGU3NFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvYXZhdGFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kM2NiZGU3NFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2F2YXRhci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImMzNDE4ZmNlXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWQzY2JkZTc0XFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vYXZhdGFyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kM2NiZGU3NFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2F2YXRhci52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZDNjYmRlNzRcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hdmF0YXIudnVlXG4vLyBtb2R1bGUgaWQgPSAxOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5jcm9wcGVyW2RhdGEtdi1kM2NiZGU3NF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgbWFyZ2luOiAyMHB4IGF1dG87XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggZG90dGVkICNiYmI7XFxufVxcbi5jcm9wcGVyIGltZ1tkYXRhLXYtZDNjYmRlNzRdIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG4uYnV0dG9uc1tkYXRhLXYtZDNjYmRlNzRdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBhZGRpbmc6IDFyZW07XFxufVxcbi5idXR0b25zICNmaWxlW2RhdGEtdi1kM2NiZGU3NF0ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgei1pbmRleDogMTAwMDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L1VQVVBXX05HNy4wL3Zob3N0cy93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvY29tcG9uZW50cy9hdmF0YXIudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsd0JBQXdCO0NBQUU7QUFDMUI7SUFDRSxtQkFBbUI7Q0FBRTtBQUV6QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsY0FBYztDQUFFO0FBQ2hCO0lBQ0UsbUJBQW1CO0lBQ25CLFFBQVE7SUFDUixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0lBQ2IsY0FBYztDQUFFXCIsXCJmaWxlXCI6XCJhdmF0YXIudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5jcm9wcGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMjBweCBhdXRvO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IGRvdHRlZCAjYmJiOyB9XFxuICAuY3JvcHBlciBpbWcge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cXG5cXG4uYnV0dG9ucyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwYWRkaW5nOiAxcmVtOyB9XFxuICAuYnV0dG9ucyAjZmlsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB6LWluZGV4OiAxMDAwOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWQzY2JkZTc0XCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvYXZhdGFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMTk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNyb3BwZXJcIiA6c3R5bGU9XCJ7IHdpZHRoOiBjcm9wcGVyV2lkdGggKyAncHgnLCBoZWlnaHQ6IGNyb3BwZXJIZWlnaHQgKyAncHgnIH1cIj5cclxuICAgICAgPGltZyBjbGFzcz1cInByZXZpZXdcIiA6c3JjPVwicHJldmlld1NyY1wiXHJcbiAgICAgICAgICAgOnN0eWxlPVwieyBsZWZ0OiBwb3NYICsgJ3B4Jyx0b3A6IHBvc1kgKyAncHgnLCB3aWR0aDogd2lkdGggKyAncHgnLCBoZWlnaHQ6IGhlaWdodCArICdweCcgfVwiIHJlZj1cImltYWdlXCI+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPlxyXG4gICAgICA8d3YtYnV0dG9uIHR5cGU9XCJkZWZhdWx0XCI+6YCJ5oup5Zu+54mHXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cImZpbGVcIiBpZD1cImZpbGVcIiBAY2hhbmdlPVwiZmlsZUNoYW5nZVwiPlxyXG4gICAgICA8L3d2LWJ1dHRvbj5cclxuICAgICAgPHd2LWZsZXggOmd1dHRlcj1cIjIwXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyNXB4O1wiPlxyXG4gICAgICAgIDx3di1mbGV4LWl0ZW0+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJ3YXJuXCIgQGNsaWNrLm5hdGl2ZT1cImNhbmNsZVwiPuWPlua2iDwvd3YtYnV0dG9uPlxyXG4gICAgICAgIDwvd3YtZmxleC1pdGVtPlxyXG4gICAgICAgIDx3di1mbGV4LWl0ZW0+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgQGNsaWNrLm5hdGl2ZT1cInN0b3JlXCI+5L+d5a2YPC93di1idXR0b24+XHJcbiAgICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICAgIDwvd3YtZmxleD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgQWxsb3lGaW5nZXIgZnJvbSAnYWxsb3lmaW5nZXInXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyb3BwZXJXaWR0aDogMzAwLFxyXG4gICAgICAgIGNyb3BwZXJIZWlnaHQ6IDMwMCxcclxuICAgICAgICBwb3NYOiAwLFxyXG4gICAgICAgIHBvc1k6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIHBpbmNoU3RhcnRXaWR0aDogMCxcclxuICAgICAgICBwaW5jaFN0YXJ0SGVpZ2h0OiAwLFxyXG4gICAgICAgIHByZXZpZXdTcmM6ICcnLFxyXG4gICAgICAgIGFmOiBudWxsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgY3JvcERhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgeDogTWF0aC5hYnModGhpcy5wb3NYKSxcclxuICAgICAgICAgIHk6IE1hdGguYWJzKHRoaXMucG9zWSksXHJcbiAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICBjcm9wV2lkdGg6IHRoaXMuY3JvcHBlcldpZHRoLFxyXG4gICAgICAgICAgY3JvcEhlaWdodDogdGhpcy5jcm9wcGVySGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmFmID0gbmV3IEFsbG95RmluZ2VyKHRoaXMuJHJlZnMuaW1hZ2UsIHtcclxuICAgICAgICBtdWx0aXBvaW50U3RhcnQ6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgIHRoaXMucGluY2hTdGFydFdpZHRoID0gdGhpcy53aWR0aFxyXG4gICAgICAgICAgdGhpcy5waW5jaFN0YXJ0SGVpZ2h0ID0gdGhpcy5oZWlnaHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvdWNoTW92ZTogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0WCA9IHRoaXMucG9zWCArIGV2ZW50LmRlbHRhWFxyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0WSA9IHRoaXMucG9zWSArIGV2ZW50LmRlbHRhWVxyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXRYIDw9IDAgJiYgdGhpcy5jcm9wcGVyV2lkdGggLSB0YXJnZXRYIDw9IHRoaXMud2lkdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3NYID0gdGFyZ2V0WFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXRZIDw9IDAgJiYgdGhpcy5jcm9wcGVySGVpZ2h0IC0gdGFyZ2V0WSA8PSB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc1kgPSB0YXJnZXRZXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaW5jaDogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0V2lkdGggPSB0aGlzLnBpbmNoU3RhcnRXaWR0aCAqIGV2ZW50Lnpvb21cclxuICAgICAgICAgIGNvbnN0IHRhcmdldEhlaWdodCA9IHRoaXMucGluY2hTdGFydEhlaWdodCAqIGV2ZW50Lnpvb21cclxuXHJcbiAgICAgICAgICBpZiAodGFyZ2V0V2lkdGggPj0gdGhpcy5jcm9wcGVyV2lkdGggLSB0aGlzLnBvc1ggJiYgdGFyZ2V0SGVpZ2h0ID49IHRoaXMuY3JvcHBlckhlaWdodCAtIHRoaXMucG9zWSkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGFyZ2V0V2lkdGhcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0YXJnZXRIZWlnaHRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgLy8g5L+d5a2YXHJcbiAgICAgIHN0b3JlICgpIHtcclxuICAgICAgICBsZXQgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZScpLmZpbGVzXHJcblxyXG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9NeUZvcm0gPSBuZXcgRm9ybURhdGEoKVxyXG5cclxuICAgICAgICBvTXlGb3JtLmFwcGVuZChcImNyb3BYXCIsIHRoaXMuY3JvcERhdGEueClcclxuICAgICAgICBvTXlGb3JtLmFwcGVuZChcImNyb3BZXCIsIHRoaXMuY3JvcERhdGEueSlcclxuICAgICAgICBvTXlGb3JtLmFwcGVuZChcIndpZHRoXCIsIHRoaXMuY3JvcERhdGEud2lkdGgpXHJcbiAgICAgICAgb015Rm9ybS5hcHBlbmQoXCJoZWlnaHRcIiwgdGhpcy5jcm9wRGF0YS5oZWlnaHQpXHJcbiAgICAgICAgb015Rm9ybS5hcHBlbmQoXCJjcm9wV2lkdGhcIiwgdGhpcy5jcm9wRGF0YS5jcm9wV2lkdGgpXHJcbiAgICAgICAgb015Rm9ybS5hcHBlbmQoXCJjcm9wSGVpZ2h0XCIsIHRoaXMuY3JvcERhdGEuY3JvcEhlaWdodClcclxuXHJcbiAgICAgICAgLy8gZmlsZUlucHV0RWxlbWVudOS4reW3sue7j+WMheWQq+S6hueUqOaIt+aJgOmAieaLqeeahOaWh+S7tlxyXG4gICAgICAgIG9NeUZvcm0uYXBwZW5kKFwiYXZhdGFyXCIsIGZpbGVzWzBdKVxyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ3VzZXIvYXZhdGFyJywgb015Rm9ybSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuXHJcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCforr7nva7miJDlip8nKVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy9wcm9maWxlJylcclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvb3QuZXJyb3IoZGF0YS5pbmZvKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJvb3QuZXJyb3IoJ+iuvue9ruWksei0pScpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWPlua2iFxyXG4gICAgICBjYW5jbGUgKCkge1xyXG4gICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCcvcHJvZmlsZScpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDpgInmi6nlm77niYdcclxuICAgICAgZmlsZUNoYW5nZSAoKSB7XHJcbiAgICAgICAgbGV0IGltYWdlRmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJykuZmlsZXNbMF1cclxuXHJcbiAgICAgICAgd2luZG93LlVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTFxyXG5cclxuICAgICAgICB0aGlzLnByZXZpZXdTcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUZpbGUpXHJcblxyXG4gICAgICAgIC8v5Y+W5Ye66YCJ5oup55qE5Zu+54mH55qE5Y6f5aeL5bC65a+4XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpXHJcblxyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbFdpZHRoID0gaW1nLndpZHRoXHJcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IGltZy5oZWlnaHRcclxuXHJcbiAgICAgICAgICAvLyDmoLnmja7ljp/lp4vlrr3pq5jorr7nva7pooTop4jlm77niYfnmoTlrr3lkozpq5hcclxuICAgICAgICAgIGlmIChvcmlnaW5hbFdpZHRoID49IG9yaWdpbmFsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jcm9wcGVySGVpZ2h0ICsgNTBcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHBhcnNlSW50KG9yaWdpbmFsV2lkdGggKiB0aGlzLmhlaWdodCAvIG9yaWdpbmFsSGVpZ2h0KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY3JvcHBlcldpZHRoICsgNTBcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUludChvcmlnaW5hbEhlaWdodCAqIHRoaXMud2lkdGggLyBvcmlnaW5hbFdpZHRoKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc3RhcnRXaWR0aCA9IHRoaXMud2lkdGhcclxuICAgICAgICAgIHRoaXMuc3RhcnRIZWlnaHQgPSB0aGlzLmhlaWdodFxyXG5cclxuICAgICAgICAgIC8vIOWxheS4rVxyXG4gICAgICAgICAgdGhpcy5wb3NYID0gLXBhcnNlSW50KCh0aGlzLndpZHRoIC0gdGhpcy5jcm9wcGVyV2lkdGgpIC8gMilcclxuICAgICAgICAgIHRoaXMucG9zWSA9IC1wYXJzZUludCgodGhpcy5oZWlnaHQgLSB0aGlzLmNyb3BwZXJIZWlnaHQpIC8gMilcclxuICAgICAgICAgIHRoaXMuc3RhcnRYID0gdGhpcy5wb3NYXHJcbiAgICAgICAgICB0aGlzLnN0YXJ0WSA9IHRoaXMucG9zWVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbWcuc3JjID0gdGhpcy5wcmV2aWV3U3JjXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYmVmb3JlRGVzdHJveSAoKSB7XHJcbiAgICAgIGlmICh0aGlzLmFmKSB7XHJcbiAgICAgICAgdGhpcy5hZi5kZXN0cm95KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLmNyb3BwZXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgbWFyZ2luOiAyMHB4IGF1dG87XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggZG90dGVkICNiYmI7XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbnMge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgcGFkZGluZzogMXJlbTtcclxuXHJcbiAgICAjZmlsZSB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgdG9wOiAwO1xyXG4gICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGF2YXRhci52dWU/NmNhYjJjZWEiLCLvu78vKiBBbGxveUZpbmdlciB2MC4xLjdcclxuICogQnkgZG50emhhbmdcclxuICogR2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vQWxsb3lUZWFtL0FsbG95RmluZ2VyXHJcbiAqL1xyXG47IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBnZXRMZW4odikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodi54ICogdi54ICsgdi55ICogdi55KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkb3QodjEsIHYyKSB7XHJcbiAgICAgICAgcmV0dXJuIHYxLnggKiB2Mi54ICsgdjEueSAqIHYyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QW5nbGUodjEsIHYyKSB7XHJcbiAgICAgICAgdmFyIG1yID0gZ2V0TGVuKHYxKSAqIGdldExlbih2Mik7XHJcbiAgICAgICAgaWYgKG1yID09PSAwKSByZXR1cm4gMDtcclxuICAgICAgICB2YXIgciA9IGRvdCh2MSwgdjIpIC8gbXI7XHJcbiAgICAgICAgaWYgKHIgPiAxKSByID0gMTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3NzKHYxLCB2Mikge1xyXG4gICAgICAgIHJldHVybiB2MS54ICogdjIueSAtIHYyLnggKiB2MS55O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJvdGF0ZUFuZ2xlKHYxLCB2Mikge1xyXG4gICAgICAgIHZhciBhbmdsZSA9IGdldEFuZ2xlKHYxLCB2Mik7XHJcbiAgICAgICAgaWYgKGNyb3NzKHYxLCB2MikgPiAwKSB7XHJcbiAgICAgICAgICAgIGFuZ2xlICo9IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlICogMTgwIC8gTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgSGFuZGxlckFkbWluID0gZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBIYW5kbGVyQWRtaW4ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgSGFuZGxlckFkbWluLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYoIWhhbmRsZXIpIHRoaXMuaGFuZGxlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpPXRoaXMuaGFuZGxlcnMubGVuZ3RoOyBpPj0wOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYodGhpcy5oYW5kbGVyc1tpXSA9PT0gaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgSGFuZGxlckFkbWluLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZvcih2YXIgaT0wLGxlbj10aGlzLmhhbmRsZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbaV07XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSBoYW5kbGVyLmFwcGx5KHRoaXMuZWwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdyYXBGdW5jKGVsLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZXJBZG1pbiA9IG5ldyBIYW5kbGVyQWRtaW4oZWwpO1xyXG4gICAgICAgIGhhbmRsZXJBZG1pbi5hZGQoaGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBoYW5kbGVyQWRtaW47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIEFsbG95RmluZ2VyID0gZnVuY3Rpb24gKGVsLCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdHlwZW9mIGVsID09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbDtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vdmUgPSB0aGlzLm1vdmUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmVuZCA9IHRoaXMuZW5kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwgPSB0aGlzLmNhbmNlbC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnN0YXJ0LCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3ZlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLmVuZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5jYW5jZWwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmVWID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcbiAgICAgICAgdGhpcy5waW5jaFN0YXJ0TGVuID0gbnVsbDtcclxuICAgICAgICB0aGlzLnpvb20gPSAxO1xyXG4gICAgICAgIHRoaXMuaXNEb3VibGVUYXAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XHJcblxyXG4gICAgICAgIHRoaXMucm90YXRlID0gd3JhcEZ1bmModGhpcy5lbGVtZW50LCBvcHRpb24ucm90YXRlIHx8IG5vb3ApO1xyXG4gICAgICAgIHRoaXMudG91Y2hTdGFydCA9IHdyYXBGdW5jKHRoaXMuZWxlbWVudCwgb3B0aW9uLnRvdWNoU3RhcnQgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBvaW50U3RhcnQgPSB3cmFwRnVuYyh0aGlzLmVsZW1lbnQsIG9wdGlvbi5tdWx0aXBvaW50U3RhcnQgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBvaW50RW5kID0gd3JhcEZ1bmModGhpcy5lbGVtZW50LCBvcHRpb24ubXVsdGlwb2ludEVuZCB8fCBub29wKTtcclxuICAgICAgICB0aGlzLnBpbmNoID0gd3JhcEZ1bmModGhpcy5lbGVtZW50LCBvcHRpb24ucGluY2ggfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy5zd2lwZSA9IHdyYXBGdW5jKHRoaXMuZWxlbWVudCwgb3B0aW9uLnN3aXBlIHx8IG5vb3ApO1xyXG4gICAgICAgIHRoaXMudGFwID0gd3JhcEZ1bmModGhpcy5lbGVtZW50LCBvcHRpb24udGFwIHx8IG5vb3ApO1xyXG4gICAgICAgIHRoaXMuZG91YmxlVGFwID0gd3JhcEZ1bmModGhpcy5lbGVtZW50LCBvcHRpb24uZG91YmxlVGFwIHx8IG5vb3ApO1xyXG4gICAgICAgIHRoaXMubG9uZ1RhcCA9IHdyYXBGdW5jKHRoaXMuZWxlbWVudCwgb3B0aW9uLmxvbmdUYXAgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVUYXAgPSB3cmFwRnVuYyh0aGlzLmVsZW1lbnQsIG9wdGlvbi5zaW5nbGVUYXAgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy5wcmVzc01vdmUgPSB3cmFwRnVuYyh0aGlzLmVsZW1lbnQsIG9wdGlvbi5wcmVzc01vdmUgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy50b3VjaE1vdmUgPSB3cmFwRnVuYyh0aGlzLmVsZW1lbnQsIG9wdGlvbi50b3VjaE1vdmUgfHwgbm9vcCk7XHJcbiAgICAgICAgdGhpcy50b3VjaEVuZCA9IHdyYXBGdW5jKHRoaXMuZWxlbWVudCwgb3B0aW9uLnRvdWNoRW5kIHx8IG5vb3ApO1xyXG4gICAgICAgIHRoaXMudG91Y2hDYW5jZWwgPSB3cmFwRnVuYyh0aGlzLmVsZW1lbnQsIG9wdGlvbi50b3VjaENhbmNlbCB8fCBub29wKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5vdyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50YXBUaW1lb3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNpbmdsZVRhcFRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9uZ1RhcFRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3dpcGVUaW1lb3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLngxID0gdGhpcy54MiA9IHRoaXMueTEgPSB0aGlzLnkyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByZVRhcFBvc2l0aW9uID0geyB4OiBudWxsLCB5OiBudWxsIH07XHJcbiAgICB9O1xyXG5cclxuICAgIEFsbG95RmluZ2VyLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBpZiAoIWV2dC50b3VjaGVzKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy54MSA9IGV2dC50b3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICB0aGlzLnkxID0gZXZ0LnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLm5vdyAtICh0aGlzLmxhc3QgfHwgdGhpcy5ub3cpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoU3RhcnQuZGlzcGF0Y2goZXZ0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJlVGFwUG9zaXRpb24ueCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0RvdWJsZVRhcCA9ICh0aGlzLmRlbHRhID4gMCAmJiB0aGlzLmRlbHRhIDw9IDI1MCAmJiBNYXRoLmFicyh0aGlzLnByZVRhcFBvc2l0aW9uLnggLSB0aGlzLngxKSA8IDMwICYmIE1hdGguYWJzKHRoaXMucHJlVGFwUG9zaXRpb24ueSAtIHRoaXMueTEpIDwgMzApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJlVGFwUG9zaXRpb24ueCA9IHRoaXMueDE7XHJcbiAgICAgICAgICAgIHRoaXMucHJlVGFwUG9zaXRpb24ueSA9IHRoaXMueTE7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IHRoaXMubm93O1xyXG4gICAgICAgICAgICB2YXIgcHJlViA9IHRoaXMucHJlVixcclxuICAgICAgICAgICAgICAgIGxlbiA9IGV2dC50b3VjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGxlbiA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbExvbmdUYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbFNpbmdsZVRhcCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSB7IHg6IGV2dC50b3VjaGVzWzFdLnBhZ2VYIC0gdGhpcy54MSwgeTogZXZ0LnRvdWNoZXNbMV0ucGFnZVkgLSB0aGlzLnkxIH07XHJcbiAgICAgICAgICAgICAgICBwcmVWLnggPSB2Lng7XHJcbiAgICAgICAgICAgICAgICBwcmVWLnkgPSB2Lnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpbmNoU3RhcnRMZW4gPSBnZXRMZW4ocHJlVik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcG9pbnRTdGFydC5kaXNwYXRjaChldnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9uZ1RhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9uZ1RhcC5kaXNwYXRjaChldnQpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDc1MCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGlmICghZXZ0LnRvdWNoZXMpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHByZVYgPSB0aGlzLnByZVYsXHJcbiAgICAgICAgICAgICAgICBsZW4gPSBldnQudG91Y2hlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50WCA9IGV2dC50b3VjaGVzWzBdLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFkgPSBldnQudG91Y2hlc1swXS5wYWdlWTtcclxuICAgICAgICAgICAgdGhpcy5pc0RvdWJsZVRhcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobGVuID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSB7IHg6IGV2dC50b3VjaGVzWzFdLnBhZ2VYIC0gY3VycmVudFgsIHk6IGV2dC50b3VjaGVzWzFdLnBhZ2VZIC0gY3VycmVudFkgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJlVi54ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGluY2hTdGFydExlbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0Lnpvb20gPSBnZXRMZW4odikgLyB0aGlzLnBpbmNoU3RhcnRMZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGluY2guZGlzcGF0Y2goZXZ0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5hbmdsZSA9IGdldFJvdGF0ZUFuZ2xlKHYsIHByZVYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRlLmRpc3BhdGNoKGV2dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcmVWLnggPSB2Lng7XHJcbiAgICAgICAgICAgICAgICBwcmVWLnkgPSB2Lnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54MiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5kZWx0YVggPSBjdXJyZW50WCAtIHRoaXMueDI7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmRlbHRhWSA9IGN1cnJlbnRZIC0gdGhpcy55MjtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5kZWx0YVggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5kZWx0YVkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc01vdmUuZGlzcGF0Y2goZXZ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b3VjaE1vdmUuZGlzcGF0Y2goZXZ0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbExvbmdUYXAoKTtcclxuICAgICAgICAgICAgdGhpcy54MiA9IGN1cnJlbnRYO1xyXG4gICAgICAgICAgICB0aGlzLnkyID0gY3VycmVudFk7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGlmICghZXZ0LmNoYW5nZWRUb3VjaGVzKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbExvbmdUYXAoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnRvdWNoZXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aXBvaW50RW5kLmRpc3BhdGNoKGV2dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vc3dpcGVcclxuICAgICAgICAgICAgaWYgKCh0aGlzLngyICYmIE1hdGguYWJzKHRoaXMueDEgLSB0aGlzLngyKSA+IDMwKSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMueTIgJiYgTWF0aC5hYnModGhpcy55MSAtIHRoaXMueTIpID4gMzApKSB7XHJcbiAgICAgICAgICAgICAgICBldnQuZGlyZWN0aW9uID0gdGhpcy5fc3dpcGVEaXJlY3Rpb24odGhpcy54MSwgdGhpcy54MiwgdGhpcy55MSwgdGhpcy55Mik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXBlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dpcGUuZGlzcGF0Y2goZXZ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YXAuZGlzcGF0Y2goZXZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGRvdWJsZSB0YXAgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc0RvdWJsZVRhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRvdWJsZVRhcC5kaXNwYXRjaChldnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5zaW5nbGVUYXBUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0RvdWJsZVRhcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDApXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmlzRG91YmxlVGFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaW5nbGVUYXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2luZ2xlVGFwLmRpc3BhdGNoKGV2dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50b3VjaEVuZC5kaXNwYXRjaChldnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmVWLnggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnByZVYueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucGluY2hTdGFydExlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMueDEgPSB0aGlzLngyID0gdGhpcy55MSA9IHRoaXMueTIgPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNpbmdsZVRhcFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubG9uZ1RhcFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zd2lwZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2FuY2VsLmRpc3BhdGNoKGV2dCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY2FuY2VsTG9uZ1RhcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5sb25nVGFwVGltZW91dCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY2FuY2VsU2luZ2xlVGFwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNpbmdsZVRhcFRpbWVvdXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3N3aXBlRGlyZWN0aW9uOiBmdW5jdGlvbiAoeDEsIHgyLCB5MSwgeTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHgxIC0geDIpID49IE1hdGguYWJzKHkxIC0geTIpID8gKHgxIC0geDIgPiAwID8gJ0xlZnQnIDogJ1JpZ2h0JykgOiAoeTEgLSB5MiA+IDAgPyAnVXAnIDogJ0Rvd24nKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uOiBmdW5jdGlvbihldnQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgaWYodGhpc1tldnRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2V2dF0uYWRkKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb2ZmOiBmdW5jdGlvbihldnQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgaWYodGhpc1tldnRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2V2dF0uZGVsKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2luZ2xlVGFwVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuc2luZ2xlVGFwVGltZW91dCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGFwVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9uZ1RhcFRpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLmxvbmdUYXBUaW1lb3V0KTtcclxuICAgICAgICAgICAgaWYodGhpcy5zd2lwZVRpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLnN3aXBlVGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5zdGFydCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMubW92ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5lbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuY2FuY2VsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlLmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoU3RhcnQuZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlwb2ludFN0YXJ0LmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcG9pbnRFbmQuZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGluY2guZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGUuZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFwLmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZVRhcC5kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb25nVGFwLmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZVRhcC5kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc01vdmUuZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlLmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kLmRlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoQ2FuY2VsLmRlbCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmVWID0gdGhpcy5waW5jaFN0YXJ0TGVuID0gdGhpcy56b29tID0gdGhpcy5pc0RvdWJsZVRhcCA9IHRoaXMuZGVsdGEgPSB0aGlzLmxhc3QgPSB0aGlzLm5vdyA9IHRoaXMudGFwVGltZW91dCA9IHRoaXMuc2luZ2xlVGFwVGltZW91dCA9IHRoaXMubG9uZ1RhcFRpbWVvdXQgPSB0aGlzLnN3aXBlVGltZW91dCA9IHRoaXMueDEgPSB0aGlzLngyID0gdGhpcy55MSA9IHRoaXMueTIgPSB0aGlzLnByZVRhcFBvc2l0aW9uID0gdGhpcy5yb3RhdGUgPSB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLm11bHRpcG9pbnRTdGFydCA9IHRoaXMubXVsdGlwb2ludEVuZCA9IHRoaXMucGluY2ggPSB0aGlzLnN3aXBlID0gdGhpcy50YXAgPSB0aGlzLmRvdWJsZVRhcCA9IHRoaXMubG9uZ1RhcCA9IHRoaXMuc2luZ2xlVGFwID0gdGhpcy5wcmVzc01vdmUgPSB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoQ2FuY2VsID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gQWxsb3lGaW5nZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5BbGxveUZpbmdlciA9IEFsbG95RmluZ2VyO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hbGxveWZpbmdlci9hbGxveV9maW5nZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFtfYygnZGl2Jywge1xuICAgIHN0YXRpY0NsYXNzOiBcImNyb3BwZXJcIixcbiAgICBzdHlsZTogKHtcbiAgICAgIHdpZHRoOiBfdm0uY3JvcHBlcldpZHRoICsgJ3B4JyxcbiAgICAgIGhlaWdodDogX3ZtLmNyb3BwZXJIZWlnaHQgKyAncHgnXG4gICAgfSlcbiAgfSwgW19jKCdpbWcnLCB7XG4gICAgcmVmOiBcImltYWdlXCIsXG4gICAgc3RhdGljQ2xhc3M6IFwicHJldmlld1wiLFxuICAgIHN0eWxlOiAoe1xuICAgICAgbGVmdDogX3ZtLnBvc1ggKyAncHgnLFxuICAgICAgdG9wOiBfdm0ucG9zWSArICdweCcsXG4gICAgICB3aWR0aDogX3ZtLndpZHRoICsgJ3B4JyxcbiAgICAgIGhlaWdodDogX3ZtLmhlaWdodCArICdweCdcbiAgICB9KSxcbiAgICBhdHRyczoge1xuICAgICAgXCJzcmNcIjogX3ZtLnByZXZpZXdTcmNcbiAgICB9XG4gIH0pXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uc1wiXG4gIH0sIFtfYygnd3YtYnV0dG9uJywge1xuICAgIGF0dHJzOiB7XG4gICAgICBcInR5cGVcIjogXCJkZWZhdWx0XCJcbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLpgInmi6nlm77niYdcXG4gICAgICBcIiksIF9jKCdpbnB1dCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwiZmlsZVwiLFxuICAgICAgXCJuYW1lXCI6IFwiZmlsZVwiLFxuICAgICAgXCJpZFwiOiBcImZpbGVcIlxuICAgIH0sXG4gICAgb246IHtcbiAgICAgIFwiY2hhbmdlXCI6IF92bS5maWxlQ2hhbmdlXG4gICAgfVxuICB9KV0pLCBfdm0uX3YoXCIgXCIpLCBfYygnd3YtZmxleCcsIHtcbiAgICBzdGF0aWNTdHlsZToge1xuICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMjVweFwiXG4gICAgfSxcbiAgICBhdHRyczoge1xuICAgICAgXCJndXR0ZXJcIjogMjBcbiAgICB9XG4gIH0sIFtfYygnd3YtZmxleC1pdGVtJywgW19jKCd3di1idXR0b24nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwidHlwZVwiOiBcIndhcm5cIlxuICAgIH0sXG4gICAgbmF0aXZlT246IHtcbiAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIF92bS5jYW5jbGUoJGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSwgW192bS5fdihcIuWPlua2iFwiKV0pXSwgMSksIF92bS5fdihcIiBcIiksIF9jKCd3di1mbGV4LWl0ZW0nLCBbX2MoJ3d2LWJ1dHRvbicsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJ0eXBlXCI6IFwicHJpbWFyeVwiXG4gICAgfSxcbiAgICBuYXRpdmVPbjoge1xuICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgX3ZtLnN0b3JlKCRldmVudClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtfdm0uX3YoXCLkv53lrZhcIildKV0sIDEpXSwgMSldLCAxKV0pXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWQzY2JkZTc0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1kM2NiZGU3NFwiLFwiaGFzU2NvcGVkXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL2NvbXBvbmVudHMvYXZhdGFyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJzb3VyY2VSb290IjoiIn0=