/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = now;
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;
/* harmony export (immutable) */ __webpack_exports__["c"] = timer;
/* unused harmony export timerFlush */
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(2);


new __WEBPACK_IMPORTED_MODULE_0__src_index__["a" /* SlideIt */]('.v-slide');
new __WEBPACK_IMPORTED_MODULE_0__src_index__["a" /* SlideIt */]('.h-slide', {
  horizontal: true
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SlideIt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_timer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_ease__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




/**
 * @type {number} bouncing animation duration
 */
var BOUNCE_DURATION = 500;

function clamp(min, max) {
  return function (v) {
    return v < min ? min : v > max ? max : v;
  };
}

/**
 * @param {HTMLElement} dom 
 */
function resetStyle(dom) {
  if (getComputedStyle(dom).overflow !== 'hidden') {
    dom.style.overflow = 'hidden';
  }
}

function mapDistance(touchMoveDistance) {
  return touchMoveDistance / 3;
}

mapDistance.reverse = function (viewDistance) {
  return viewDistance * 3;
};

var clampSpeed = clamp(-3.5, 3.5);

var STATES = {
  DRAGGING: 'DRAGGING',
  BOUNCING_AT_START: 'BOUNCING_AT_START',
  BOUNCING_AT_END: 'BOUNCING_AT_END',
  IDLE: 'IDLE',
  SLIDING: 'SLIDING'
};

var Slide = function () {
  /**
   * @param {HTMLElement} dom 
   */
  function Slide(dom, options) {
    var _this = this;

    _classCallCheck(this, Slide);

    resetStyle(dom);
    /**
     * @type {HTMLElement[]}
     */
    this.options = options;
    this.positionKey = options.horizontal ? 'clientX' : 'clientY';
    this.movables = Array.prototype.slice.call(dom.children, 0);
    this.movestart = this.movestart.bind(this);
    this.moving = this.moving.bind(this);
    this.moveend = this.moveend.bind(this);

    dom.addEventListener('touchstart', this.movestart);
    dom.addEventListener('touchmove', this.moving);
    dom.addEventListener('touchend', this.moveend);

    dom.addEventListener('mousedown', this.movestart);
    dom.addEventListener('mousemove', this.moving);
    dom.addEventListener('mouseup', this.moveend);

    this.bound = {
      start: 0,
      end: options.horizontal ? -(dom.scrollWidth - dom.clientWidth) : -(dom.scrollHeight - dom.clientHeight)
    };
    this.state = STATES.IDLE;
    this.domNode = dom;
    this.startTouchPosition = 0;
    this.lastTouchPosition = 0;
    this.touchPosition = 0;
    this.lastPosition = 0;
    this.bounceStartPosition = 0;
    this.bounceElapsed = 0;
    this.offset = 0;
    this.mass = 1;
    this.lastTime = this.currentTime = Date.now();

    this._currentPosition = 0;
    this._currentSpeed = 0;

    Object(__WEBPACK_IMPORTED_MODULE_0_d3_timer__["a" /* timer */])(function () {
      var lastMoment = 0;
      return function (elapsed) {
        _this.update(elapsed - lastMoment);
        lastMoment = elapsed;
      };
    }());
  }

  _createClass(Slide, [{
    key: 'movestart',

    /**
     * @param {Event} e 
     */
    value: function movestart(e) {
      this.switchState(STATES.DRAGGING);
      this.currentSpeed = 0;
      this.lastPosition = this.currentPosition;
      var touchY = this.eventPosition(e);
      this.startTouchPosition = touchY;
      this.currentTime = Date.now();

      if (this.overStart) {
        // infer touch start position
        this.originPosition = this.startTouchPosition - mapDistance.reverse(this.currentPosition);
      } else if (this.overEnd) {
        this.originPosition = this.startTouchPosition - mapDistance.reverse(this.currentPosition - this.bound.end);
      }
    }
    /**
     * @param {Event} e 
     */

  }, {
    key: 'moving',
    value: function moving(e) {
      if (this.state == STATES.DRAGGING) {
        e.preventDefault();
        this.lastPosition = this.currentPosition;
        this.lastTouchPosition = this.touchPosition;
        this.lastTime = this.currentTime;
        this.currentTime = Date.now();
        this.touchPosition = this.eventPosition(e);

        if (this.exactlyOnStart && this.dragAwayFromEnd) {
          this.currentPosition = 0.01;
          this.originPosition = this.touchPosition;
        } else if (this.exactlyOnEnd && this.dragAwayFromStart) {
          this.currentPosition = this.bound.end - 0.01;
          this.originPosition = this.touchPosition;
        } else if (this.overStart) {
          var distance = (this.touchPosition - this.originPosition) / 3;
          this.currentPosition = distance;
        } else if (this.overEnd) {
          var _distance = (this.touchPosition - this.originPosition) / 3;
          this.currentPosition = this.bound.end + _distance;
        } else {
          // touchmove normally
          this.normalMove(this.touchPosition);
        }
      }
    }
  }, {
    key: 'moveend',
    value: function moveend(e) {
      if (this.overStart) {
        this.switchState(STATES.BOUNCING_AT_START);
      } else if (this.overEnd) {
        this.switchState(STATES.BOUNCING_AT_END);
      } else {
        this.switchState(STATES.SLIDING);
        this.offset = this.currentPosition;
        // infer ended speed
        this.currentSpeed = (this.currentPosition - this.lastPosition) / (this.currentTime - this.lastTime);
      }
    }
  }, {
    key: 'update',
    value: function update(deltaTime) {
      var factor = deltaTime / 1000;
      switch (this.state) {
        case STATES.SLIDING:
          if (this.friction > 0) {
            this.currentSpeed = Math.min(0, this.currentSpeed + this.acceleratedSpeed * factor);
          } else {
            this.currentSpeed = Math.max(0, this.currentSpeed + this.acceleratedSpeed * factor);
          }
          if (this.currentSpeed === 0) {
            if (this.overStart) {
              this.switchState(STATES.BOUNCING_AT_START);
            } else if (this.overEnd) {
              this.switchState(STATES.BOUNCING_AT_END);
            } else {
              this.switchState(STATES.IDLE);
            }
          } else {
            // sliding
            this.currentPosition += this.currentSpeed * deltaTime;
            this.offset = this.currentPosition;
          }
          break;
        case STATES.BOUNCING_AT_START:
          this.bounceElapsed += deltaTime;
          this.currentPosition = this.bounceStartPosition - this.bounceStartPosition * Object(__WEBPACK_IMPORTED_MODULE_1_d3_ease__["a" /* easeCubicOut */])(this.bounceElapsed / BOUNCE_DURATION);
          this.offset = this.currentPosition;
          this.resetOnBouncingEnd();
          break;
        case STATES.BOUNCING_AT_END:
          this.bounceElapsed += deltaTime;
          this.currentPosition = this.bounceStartPosition + (this.bound.end - this.bounceStartPosition) * Object(__WEBPACK_IMPORTED_MODULE_1_d3_ease__["a" /* easeCubicOut */])(this.bounceElapsed / BOUNCE_DURATION);
          this.offset = this.currentPosition;
          this.resetOnBouncingEnd();
          break;
      }
    }
  }, {
    key: 'switchState',
    value: function switchState(state) {
      if (this.state === state) return;
      switch (state) {
        case STATES.BOUNCING_AT_START:
        case STATES.BOUNCING_AT_END:
          this.bounceStartPosition = this.currentPosition;
          this.bounceElapsed = 0;
          break;
      }
      this.state = state;
    }
  }, {
    key: 'normalMove',
    value: function normalMove(position) {
      var moveDistance = position - this.startTouchPosition;
      this.currentPosition = this.offset + moveDistance;
    }
  }, {
    key: 'resetOnBouncingEnd',
    value: function resetOnBouncingEnd() {
      if (this.bounceElapsed > BOUNCE_DURATION) {
        this.currentPosition = this.state === STATES.BOUNCING_AT_START ? this.bound.start : this.bound.end;
        this.lastPosition = 0;
        this.currentSpeed = 0;
        this.switchState(STATES.IDLE);
      }
    }
  }, {
    key: 'eventPosition',
    value: function eventPosition(event) {
      return event instanceof TouchEvent ? event.touches[0][this.positionKey] : event[this.positionKey];
    }
  }, {
    key: 'inBound',
    get: function get() {
      return this.currentPosition <= 0 && this.currentPosition >= this.bound.end;
    }
  }, {
    key: 'dragAwayFromStart',
    get: function get() {
      return this.touchPosition - this.lastTouchPosition < 0;
    }
  }, {
    key: 'dragAwayFromEnd',
    get: function get() {
      return this.touchPosition - this.lastTouchPosition > 0;
    }
  }, {
    key: 'overStart',
    get: function get() {
      return this.currentPosition > 0;
    }
  }, {
    key: 'overEnd',
    get: function get() {
      return this.currentPosition < this.bound.end;
    }
  }, {
    key: 'exactlyOnStart',
    get: function get() {
      return this.currentPosition === 0;
    }
  }, {
    key: 'exactlyOnEnd',
    get: function get() {
      return this.currentPosition === this.bound.end;
    }
  }, {
    key: 'currentPosition',
    get: function get() {
      return this._currentPosition;
    },
    set: function set(val) {
      var _this2 = this;

      this._currentPosition = val;
      this.movables.forEach(function (e) {
        if (_this2.options.horizontal) {
          e.style.transform = 'translate3d(' + val + 'px,0,0)';
        } else {
          e.style.transform = 'translate3d(0,' + val + 'px,0)';
        }
      });
    }
  }, {
    key: 'currentSpeed',
    get: function get() {
      return this._currentSpeed;
    },
    set: function set(val) {
      this._currentSpeed = clampSpeed(val);
    }
  }, {
    key: 'acceleratedSpeed',
    get: function get() {
      return this.friction / this.mass;
    }
  }, {
    key: 'friction',
    get: function get() {
      // three times when not in bound
      var force = this.inBound ? 10 : 30;
      if (this.currentSpeed < 0) {
        return force * 1;
      } else if (this.currentSpeed > 0) {
        return force * -1;
      } else {
        return 0;
      }
    }
  }]);

  return Slide;
}();

function SlideIt(selector) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$horizontal = _ref.horizontal,
      horizontal = _ref$horizontal === undefined ? false : _ref$horizontal;

  if (selector instanceof HTMLElement) {
    return new Slide(selector, {
      horizontal: horizontal
    });
  }
  if (typeof selector === 'string') {
    /**
     * @type {HTMLElement[]}
     */
    var nodeList = Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    return nodeList.map(function (node) {
      return new Slide(node, {
        horizontal: horizontal
      });
    });
  }
  throw new Error("does't supported params");
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_timer__ = __webpack_require__(0);
/* unused harmony reexport now */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_timer__["c"]; });
/* unused harmony reexport timerFlush */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_timeout__ = __webpack_require__(4);
/* unused harmony reexport timeout */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_interval__ = __webpack_require__(5);
/* unused harmony reexport interval */







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer__ = __webpack_require__(0);


/* unused harmony default export */ var _unused_webpack_default_export = (function(callback, delay, time) {
  var t = new __WEBPACK_IMPORTED_MODULE_0__timer__["a" /* Timer */];
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer__ = __webpack_require__(0);


/* unused harmony default export */ var _unused_webpack_default_export = (function(callback, delay, time) {
  var t = new __WEBPACK_IMPORTED_MODULE_0__timer__["a" /* Timer */], total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? Object(__WEBPACK_IMPORTED_MODULE_0__timer__["b" /* now */])() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_linear__ = __webpack_require__(7);
/* unused harmony reexport easeLinear */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_quad__ = __webpack_require__(8);
/* unused harmony reexport easeQuad */
/* unused harmony reexport easeQuadIn */
/* unused harmony reexport easeQuadOut */
/* unused harmony reexport easeQuadInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubic__ = __webpack_require__(9);
/* unused harmony reexport easeCubic */
/* unused harmony reexport easeCubicIn */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* unused harmony reexport easeCubicInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_poly__ = __webpack_require__(10);
/* unused harmony reexport easePoly */
/* unused harmony reexport easePolyIn */
/* unused harmony reexport easePolyOut */
/* unused harmony reexport easePolyInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_sin__ = __webpack_require__(11);
/* unused harmony reexport easeSin */
/* unused harmony reexport easeSinIn */
/* unused harmony reexport easeSinOut */
/* unused harmony reexport easeSinInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_exp__ = __webpack_require__(12);
/* unused harmony reexport easeExp */
/* unused harmony reexport easeExpIn */
/* unused harmony reexport easeExpOut */
/* unused harmony reexport easeExpInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_circle__ = __webpack_require__(13);
/* unused harmony reexport easeCircle */
/* unused harmony reexport easeCircleIn */
/* unused harmony reexport easeCircleOut */
/* unused harmony reexport easeCircleInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_bounce__ = __webpack_require__(14);
/* unused harmony reexport easeBounce */
/* unused harmony reexport easeBounceIn */
/* unused harmony reexport easeBounceOut */
/* unused harmony reexport easeBounceInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_back__ = __webpack_require__(15);
/* unused harmony reexport easeBack */
/* unused harmony reexport easeBackIn */
/* unused harmony reexport easeBackOut */
/* unused harmony reexport easeBackInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_elastic__ = __webpack_require__(16);
/* unused harmony reexport easeElastic */
/* unused harmony reexport easeElasticIn */
/* unused harmony reexport easeElasticOut */
/* unused harmony reexport easeElasticInOut */





















/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export linear */
function linear(t) {
  return +t;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export quadIn */
/* unused harmony export quadOut */
/* unused harmony export quadInOut */
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cubicIn */
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicOut;
/* unused harmony export cubicInOut */
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export polyIn */
/* unused harmony export polyOut */
/* unused harmony export polyInOut */
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sinIn */
/* unused harmony export sinOut */
/* unused harmony export sinInOut */
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export expIn */
/* unused harmony export expOut */
/* unused harmony export expInOut */
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export circleIn */
/* unused harmony export circleOut */
/* unused harmony export circleInOut */
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export bounceIn */
/* unused harmony export bounceOut */
/* unused harmony export bounceInOut */
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export backIn */
/* unused harmony export backOut */
/* unused harmony export backInOut */
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export elasticIn */
/* unused harmony export elasticOut */
/* unused harmony export elasticInOut */
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2FhZjBmZTU1NzFjNGFiYjJlN2QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lb3V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvaW50ZXJ2YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvcXVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvY3ViaWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3BvbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3Npbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZXhwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2JvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZWxhc3RpYy5qcyJdLCJuYW1lcyI6WyJob3Jpem9udGFsIiwiQk9VTkNFX0RVUkFUSU9OIiwiY2xhbXAiLCJtaW4iLCJtYXgiLCJ2IiwicmVzZXRTdHlsZSIsImRvbSIsImdldENvbXB1dGVkU3R5bGUiLCJvdmVyZmxvdyIsInN0eWxlIiwibWFwRGlzdGFuY2UiLCJ0b3VjaE1vdmVEaXN0YW5jZSIsInJldmVyc2UiLCJ2aWV3RGlzdGFuY2UiLCJjbGFtcFNwZWVkIiwiU1RBVEVTIiwiRFJBR0dJTkciLCJCT1VOQ0lOR19BVF9TVEFSVCIsIkJPVU5DSU5HX0FUX0VORCIsIklETEUiLCJTTElESU5HIiwiU2xpZGUiLCJvcHRpb25zIiwicG9zaXRpb25LZXkiLCJtb3ZhYmxlcyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiY2hpbGRyZW4iLCJtb3Zlc3RhcnQiLCJiaW5kIiwibW92aW5nIiwibW92ZWVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib3VuZCIsInN0YXJ0IiwiZW5kIiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsInN0YXRlIiwiZG9tTm9kZSIsInN0YXJ0VG91Y2hQb3NpdGlvbiIsImxhc3RUb3VjaFBvc2l0aW9uIiwidG91Y2hQb3NpdGlvbiIsImxhc3RQb3NpdGlvbiIsImJvdW5jZVN0YXJ0UG9zaXRpb24iLCJib3VuY2VFbGFwc2VkIiwib2Zmc2V0IiwibWFzcyIsImxhc3RUaW1lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiX2N1cnJlbnRQb3NpdGlvbiIsIl9jdXJyZW50U3BlZWQiLCJ0aW1lciIsImxhc3RNb21lbnQiLCJ1cGRhdGUiLCJlbGFwc2VkIiwiZSIsInN3aXRjaFN0YXRlIiwiY3VycmVudFNwZWVkIiwiY3VycmVudFBvc2l0aW9uIiwidG91Y2hZIiwiZXZlbnRQb3NpdGlvbiIsIm92ZXJTdGFydCIsIm9yaWdpblBvc2l0aW9uIiwib3ZlckVuZCIsInByZXZlbnREZWZhdWx0IiwiZXhhY3RseU9uU3RhcnQiLCJkcmFnQXdheUZyb21FbmQiLCJleGFjdGx5T25FbmQiLCJkcmFnQXdheUZyb21TdGFydCIsImRpc3RhbmNlIiwibm9ybWFsTW92ZSIsImRlbHRhVGltZSIsImZhY3RvciIsImZyaWN0aW9uIiwiTWF0aCIsImFjY2VsZXJhdGVkU3BlZWQiLCJlYXNlQ3ViaWNPdXQiLCJyZXNldE9uQm91bmNpbmdFbmQiLCJwb3NpdGlvbiIsIm1vdmVEaXN0YW5jZSIsImV2ZW50IiwiVG91Y2hFdmVudCIsInRvdWNoZXMiLCJ2YWwiLCJmb3JFYWNoIiwidHJhbnNmb3JtIiwiZm9yY2UiLCJpbkJvdW5kIiwiU2xpZGVJdCIsInNlbGVjdG9yIiwiSFRNTEVsZW1lbnQiLCJub2RlTGlzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsIm5vZGUiLCJFcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQXFJLG1CQUFtQjs7QUFFeEo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNI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QUNIO0FBQ0E7Ozs7Ozs7OztBQ1ZtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkM7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7O0FBT0E7Ozs7Ozs7OztBQ2pFRDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNWQTtBQUFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7O0FDcENEO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ3BDRDtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsMkJBQTJCO0FBQ2hFLGtDQUFrQyxxQkFBcUI7O0FBRXZEO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0MsMkJBQTJCO0FBQ2pFLG1DQUFtQyxxQkFBcUI7O0FBRXhEO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLDJCQUEyQjtBQUNuRSxxQ0FBcUMscUJBQXFCOztBQUUxRDtBQUNBLENBQUMiLCJmaWxlIjoiZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNhYWYwZmU1NTcxYzRhYmIyZTdkIiwidmFyIGZyYW1lID0gMCwgLy8gaXMgYW4gYW5pbWF0aW9uIGZyYW1lIHBlbmRpbmc/XG4gICAgdGltZW91dCA9IDAsIC8vIGlzIGEgdGltZW91dCBwZW5kaW5nP1xuICAgIGludGVydmFsID0gMCwgLy8gYXJlIGFueSB0aW1lcnMgYWN0aXZlP1xuICAgIHBva2VEZWxheSA9IDEwMDAsIC8vIGhvdyBmcmVxdWVudGx5IHdlIGNoZWNrIGZvciBjbG9jayBza2V3XG4gICAgdGFza0hlYWQsXG4gICAgdGFza1RhaWwsXG4gICAgY2xvY2tMYXN0ID0gMCxcbiAgICBjbG9ja05vdyA9IDAsXG4gICAgY2xvY2tTa2V3ID0gMCxcbiAgICBjbG9jayA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJvYmplY3RcIiAmJiBwZXJmb3JtYW5jZS5ub3cgPyBwZXJmb3JtYW5jZSA6IERhdGUsXG4gICAgc2V0RnJhbWUgPSB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSA6IGZ1bmN0aW9uKGYpIHsgc2V0VGltZW91dChmLCAxNyk7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBjbG9ja05vdyB8fCAoc2V0RnJhbWUoY2xlYXJOb3cpLCBjbG9ja05vdyA9IGNsb2NrLm5vdygpICsgY2xvY2tTa2V3KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJOb3coKSB7XG4gIGNsb2NrTm93ID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICB0aGlzLl9jYWxsID1cbiAgdGhpcy5fdGltZSA9XG4gIHRoaXMuX25leHQgPSBudWxsO1xufVxuXG5UaW1lci5wcm90b3R5cGUgPSB0aW1lci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUaW1lcixcbiAgcmVzdGFydDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgdGltZSA9ICh0aW1lID09IG51bGwgPyBub3coKSA6ICt0aW1lKSArIChkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheSk7XG4gICAgaWYgKCF0aGlzLl9uZXh0ICYmIHRhc2tUYWlsICE9PSB0aGlzKSB7XG4gICAgICBpZiAodGFza1RhaWwpIHRhc2tUYWlsLl9uZXh0ID0gdGhpcztcbiAgICAgIGVsc2UgdGFza0hlYWQgPSB0aGlzO1xuICAgICAgdGFza1RhaWwgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgc2xlZXAoKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbGwpIHtcbiAgICAgIHRoaXMuX2NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5fdGltZSA9IEluZmluaXR5O1xuICAgICAgc2xlZXAoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIHQucmVzdGFydChjYWxsYmFjaywgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyRmx1c2goKSB7XG4gIG5vdygpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZSwgaWYgbm90IGFscmVhZHkgc2V0LlxuICArK2ZyYW1lOyAvLyBQcmV0ZW5kIHdl4oCZdmUgc2V0IGFuIGFsYXJtLCBpZiB3ZSBoYXZlbuKAmXQgYWxyZWFkeS5cbiAgdmFyIHQgPSB0YXNrSGVhZCwgZTtcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAoKGUgPSBjbG9ja05vdyAtIHQuX3RpbWUpID49IDApIHQuX2NhbGwuY2FsbChudWxsLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU2xpZGVJdCB9IGZyb20gXCIuLi8uLi9zcmMvaW5kZXhcIjtcblxubmV3IFNsaWRlSXQoJy52LXNsaWRlJyk7XG5uZXcgU2xpZGVJdCgnLmgtc2xpZGUnLCB7XG4gIGhvcml6b250YWw6IHRydWVcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2V4YW1wbGVzL3NjcmlwdHMvaW5kZXguanMiLCJpbXBvcnQgeyB0aW1lciB9IGZyb20gJ2QzLXRpbWVyJztcbmltcG9ydCB7IGVhc2VDdWJpY091dCB9IGZyb20gJ2QzLWVhc2UnO1xuXG4vKipcbiAqIEB0eXBlIHtudW1iZXJ9IGJvdW5jaW5nIGFuaW1hdGlvbiBkdXJhdGlvblxuICovXG5jb25zdCBCT1VOQ0VfRFVSQVRJT04gPSA1MDA7XG5cbmZ1bmN0aW9uIGNsYW1wKG1pbiwgbWF4KSB7XG4gIHJldHVybiBmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiAgdiA+IG1heCA/IG1heCA6IHY7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb20gXG4gKi9cbmZ1bmN0aW9uIHJlc2V0U3R5bGUoZG9tKSB7XG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKGRvbSkub3ZlcmZsb3cgIT09ICdoaWRkZW4nKSB7XG4gICAgZG9tLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwRGlzdGFuY2UodG91Y2hNb3ZlRGlzdGFuY2UpIHtcbiAgcmV0dXJuIHRvdWNoTW92ZURpc3RhbmNlIC8gMztcbn1cblxubWFwRGlzdGFuY2UucmV2ZXJzZSA9IGZ1bmN0aW9uICh2aWV3RGlzdGFuY2UpIHtcbiAgcmV0dXJuIHZpZXdEaXN0YW5jZSAqIDM7XG59XG5cbmNvbnN0IGNsYW1wU3BlZWQgPSBjbGFtcCgtMy41LCAzLjUpO1xuXG5jb25zdCBTVEFURVMgPSB7XG4gIERSQUdHSU5HOiAnRFJBR0dJTkcnLFxuICBCT1VOQ0lOR19BVF9TVEFSVDogJ0JPVU5DSU5HX0FUX1NUQVJUJyxcbiAgQk9VTkNJTkdfQVRfRU5EOiAnQk9VTkNJTkdfQVRfRU5EJyxcbiAgSURMRTogJ0lETEUnLFxuICBTTElESU5HOiAnU0xJRElORycsXG59O1xuXG5jbGFzcyBTbGlkZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkb20gXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihkb20sIG9wdGlvbnMpIHtcbiAgICByZXNldFN0eWxlKGRvbSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnBvc2l0aW9uS2V5ID0gb3B0aW9ucy5ob3Jpem9udGFsID8gJ2NsaWVudFgnIDogJ2NsaWVudFknO1xuICAgIHRoaXMubW92YWJsZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb20uY2hpbGRyZW4sIDApO1xuICAgIHRoaXMubW92ZXN0YXJ0ID0gdGhpcy5tb3Zlc3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdmluZyA9IHRoaXMubW92aW5nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3ZlZW5kID0gdGhpcy5tb3ZlZW5kLmJpbmQodGhpcyk7XG5cbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMubW92ZXN0YXJ0KTtcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3ZpbmcpO1xuICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW92ZWVuZCk7XG4gICAgXG4gICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW92ZXN0YXJ0KTtcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3ZpbmcpO1xuICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3ZlZW5kKTtcblxuICAgIHRoaXMuYm91bmQgPSB7XG4gICAgICBzdGFydDogMCxcbiAgICAgIGVuZDogb3B0aW9ucy5ob3Jpem9udGFsID8gIC0oZG9tLnNjcm9sbFdpZHRoIC0gZG9tLmNsaWVudFdpZHRoKVxuICAgICAgICA6IC0oZG9tLnNjcm9sbEhlaWdodCAtIGRvbS5jbGllbnRIZWlnaHQpXG4gICAgfTtcbiAgICB0aGlzLnN0YXRlID0gU1RBVEVTLklETEU7XG4gICAgdGhpcy5kb21Ob2RlID0gZG9tO1xuICAgIHRoaXMuc3RhcnRUb3VjaFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnRvdWNoUG9zaXRpb24gPSAwO1xuICAgIHRoaXMubGFzdFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLmJvdW5jZVN0YXJ0UG9zaXRpb24gPSAwO1xuICAgIHRoaXMuYm91bmNlRWxhcHNlZCA9IDA7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMubWFzcyA9IDE7XG4gICAgdGhpcy5sYXN0VGltZSA9IHRoaXMuY3VycmVudFRpbWUgPSAgRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcblxuICAgIHRpbWVyKCgoKSA9PiB7XG4gICAgICBsZXQgbGFzdE1vbWVudCA9IDA7XG4gICAgICByZXR1cm4gZWxhcHNlZCA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlKGVsYXBzZWQgLSBsYXN0TW9tZW50KTtcbiAgICAgICAgbGFzdE1vbWVudCA9IGVsYXBzZWQ7XG4gICAgICB9O1xuICAgIH0pKCkpO1xuICB9XG4gIGdldCBpbkJvdW5kKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA8PTAgJiYgdGhpcy5jdXJyZW50UG9zaXRpb24gPj0gdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGRyYWdBd2F5RnJvbVN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoUG9zaXRpb24gLSB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uIDwgMDtcbiAgfVxuICBnZXQgZHJhZ0F3YXlGcm9tRW5kKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoUG9zaXRpb24gLSB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uID4gMDtcbiAgfVxuICBnZXQgb3ZlclN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA+IDA7XG4gIH1cbiAgZ2V0IG92ZXJFbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBvc2l0aW9uIDwgdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGV4YWN0bHlPblN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9PT0gMDtcbiAgfVxuICBnZXQgZXhhY3RseU9uRW5kKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9PT0gdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGN1cnJlbnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuICB9XG4gIHNldCBjdXJyZW50UG9zaXRpb24odmFsKSB7XG4gICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gdmFsO1xuICAgIHRoaXMubW92YWJsZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Jpem9udGFsKSB7XG4gICAgICAgIGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dmFsfXB4LDAsMClgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwke3ZhbH1weCwwKWA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNwZWVkO1xuICB9XG4gIHNldCBjdXJyZW50U3BlZWQodmFsKSB7XG4gICAgdGhpcy5fY3VycmVudFNwZWVkID0gY2xhbXBTcGVlZCh2YWwpO1xuICB9XG4gIGdldCBhY2NlbGVyYXRlZFNwZWVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb24gLyB0aGlzLm1hc3M7XG4gIH1cbiAgZ2V0IGZyaWN0aW9uKCkge1xuICAgIC8vIHRocmVlIHRpbWVzIHdoZW4gbm90IGluIGJvdW5kXG4gICAgY29uc3QgZm9yY2UgPSB0aGlzLmluQm91bmQgPyAxMCA6IDMwO1xuICAgIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA8IDApIHtcbiAgICAgIHJldHVybiBmb3JjZSAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA+IDApIHtcbiAgICAgIHJldHVybiBmb3JjZSAqIC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgXG4gICAqL1xuICBtb3Zlc3RhcnQoZSkge1xuICAgIHRoaXMuc3dpdGNoU3RhdGUoU1RBVEVTLkRSQUdHSU5HKTtcbiAgICB0aGlzLmN1cnJlbnRTcGVlZCA9IDA7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICBjb25zdCB0b3VjaFkgPSB0aGlzLmV2ZW50UG9zaXRpb24oZSk7XG4gICAgdGhpcy5zdGFydFRvdWNoUG9zaXRpb24gPSB0b3VjaFk7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBpZiAodGhpcy5vdmVyU3RhcnQpIHtcbiAgICAgIC8vIGluZmVyIHRvdWNoIHN0YXJ0IHBvc2l0aW9uXG4gICAgICB0aGlzLm9yaWdpblBvc2l0aW9uID0gdGhpcy5zdGFydFRvdWNoUG9zaXRpb24gLSBtYXBEaXN0YW5jZS5yZXZlcnNlKHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlckVuZCkge1xuICAgICAgdGhpcy5vcmlnaW5Qb3NpdGlvbiA9XG4gICAgICAgIHRoaXMuc3RhcnRUb3VjaFBvc2l0aW9uIC0gbWFwRGlzdGFuY2UucmV2ZXJzZSh0aGlzLmN1cnJlbnRQb3NpdGlvbiAtIHRoaXMuYm91bmQuZW5kKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgXG4gICAqL1xuICBtb3ZpbmcoZSkge1xuICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFUy5EUkFHR0lORykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICAgIHRoaXMubGFzdFRvdWNoUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5jdXJyZW50VGltZTtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgdGhpcy50b3VjaFBvc2l0aW9uID0gdGhpcy5ldmVudFBvc2l0aW9uKGUpO1xuICAgICAgXG4gICAgICBpZiAodGhpcy5leGFjdGx5T25TdGFydCAmJiB0aGlzLmRyYWdBd2F5RnJvbUVuZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IDAuMDE7XG4gICAgICAgIHRoaXMub3JpZ2luUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXhhY3RseU9uRW5kICYmIHRoaXMuZHJhZ0F3YXlGcm9tU3RhcnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLmJvdW5kLmVuZCAtIDAuMDE7XG4gICAgICAgIHRoaXMub3JpZ2luUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlclN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHRoaXMudG91Y2hQb3NpdGlvbiAtIHRoaXMub3JpZ2luUG9zaXRpb24pIC8gMztcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSBkaXN0YW5jZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVyRW5kKSB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHRoaXMudG91Y2hQb3NpdGlvbiAtIHRoaXMub3JpZ2luUG9zaXRpb24pIC8gMztcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLmJvdW5kLmVuZCArIGRpc3RhbmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdG91Y2htb3ZlIG5vcm1hbGx5XG4gICAgICAgIHRoaXMubm9ybWFsTW92ZSh0aGlzLnRvdWNoUG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBtb3ZlZW5kKGUpIHtcbiAgICBpZiAodGhpcy5vdmVyU3RhcnQpIHtcbiAgICAgIHRoaXMuc3dpdGNoU3RhdGUoU1RBVEVTLkJPVU5DSU5HX0FUX1NUQVJUKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlckVuZCkge1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuQk9VTkNJTkdfQVRfRU5EKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuU0xJRElORyk7XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuY3VycmVudFBvc2l0aW9uO1xuICAgICAgLy8gaW5mZXIgZW5kZWQgc3BlZWRcbiAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gKHRoaXMuY3VycmVudFBvc2l0aW9uIC0gdGhpcy5sYXN0UG9zaXRpb24pIC8gKHRoaXMuY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUaW1lKTtcbiAgICB9XG4gIH1cbiAgdXBkYXRlKGRlbHRhVGltZSkge1xuICAgIGNvbnN0IGZhY3RvciA9IGRlbHRhVGltZSAvIDEwMDA7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICBjYXNlIChTVEFURVMuU0xJRElORyk6XG4gICAgICAgIGlmICh0aGlzLmZyaWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gTWF0aC5taW4oMCwgdGhpcy5jdXJyZW50U3BlZWQgKyB0aGlzLmFjY2VsZXJhdGVkU3BlZWQgKiBmYWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gTWF0aC5tYXgoMCwgdGhpcy5jdXJyZW50U3BlZWQgKyB0aGlzLmFjY2VsZXJhdGVkU3BlZWQgKiBmYWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA9PT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLm92ZXJTdGFydCkge1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVyRW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFN0YXRlKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFN0YXRlKFNUQVRFUy5JRExFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc2xpZGluZ1xuICAgICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uICs9IHRoaXMuY3VycmVudFNwZWVkICogZGVsdGFUaW1lO1xuICAgICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5jdXJyZW50UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIChTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQpOlxuICAgICAgICB0aGlzLmJvdW5jZUVsYXBzZWQgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiAtIHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiAqIGVhc2VDdWJpY091dCh0aGlzLmJvdW5jZUVsYXBzZWQgLyBCT1VOQ0VfRFVSQVRJT04pO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuY3VycmVudFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnJlc2V0T25Cb3VuY2luZ0VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpOlxuICAgICAgICB0aGlzLmJvdW5jZUVsYXBzZWQgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiArICh0aGlzLmJvdW5kLmVuZCAtIHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbilcbiAgICAgICAgICAqIGVhc2VDdWJpY091dCh0aGlzLmJvdW5jZUVsYXBzZWQgLyBCT1VOQ0VfRFVSQVRJT04pXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5jdXJyZW50UG9zaXRpb247XG4gICAgICAgIHRoaXMucmVzZXRPbkJvdW5jaW5nRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzd2l0Y2hTdGF0ZShzdGF0ZSkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSBzdGF0ZSkgcmV0dXJuO1xuICAgIHN3aXRjaChzdGF0ZSkge1xuICAgICAgY2FzZSAoU1RBVEVTLkJPVU5DSU5HX0FUX1NUQVJUKTpcbiAgICAgIGNhc2UgKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpOlxuICAgICAgICB0aGlzLmJvdW5jZVN0YXJ0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5ib3VuY2VFbGFwc2VkID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuICBub3JtYWxNb3ZlKHBvc2l0aW9uKSB7XG4gICAgY29uc3QgbW92ZURpc3RhbmNlICA9IHBvc2l0aW9uIC0gdGhpcy5zdGFydFRvdWNoUG9zaXRpb247XG4gICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLm9mZnNldCArIG1vdmVEaXN0YW5jZTtcbiAgfVxuICByZXNldE9uQm91bmNpbmdFbmQoKSB7XG4gICAgaWYgKHRoaXMuYm91bmNlRWxhcHNlZCA+IEJPVU5DRV9EVVJBVElPTikge1xuICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPVxuICAgICAgICB0aGlzLnN0YXRlID09PSBTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQgP1xuICAgICAgICAgIHRoaXMuYm91bmQuc3RhcnQgOlxuICAgICAgICAgIHRoaXMuYm91bmQuZW5kO1xuICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5jdXJyZW50U3BlZWQgPSAwO1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuSURMRSk7XG4gICAgfVxuICB9XG4gIGV2ZW50UG9zaXRpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50ID9cbiAgICAgIGV2ZW50LnRvdWNoZXNbMF1bdGhpcy5wb3NpdGlvbktleV0gOlxuICAgICAgZXZlbnRbdGhpcy5wb3NpdGlvbktleV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlSXQoc2VsZWN0b3IsIHsgaG9yaXpvbnRhbCA9IGZhbHNlIH0gPSB7fSkge1xuICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBuZXcgU2xpZGUoc2VsZWN0b3IsIHtcbiAgICAgIGhvcml6b250YWxcbiAgICB9KTtcbiAgfVxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIDApO1xuICAgIHJldHVybiBub2RlTGlzdC5tYXAobm9kZSA9PiBuZXcgU2xpZGUobm9kZSwge1xuICAgICAgaG9yaXpvbnRhbFxuICAgIH0pKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJkb2VzJ3Qgc3VwcG9ydGVkIHBhcmFtc1wiKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQge1xuICBub3csXG4gIHRpbWVyLFxuICB0aW1lckZsdXNoXG59IGZyb20gXCIuL3NyYy90aW1lclwiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHRpbWVvdXRcbn0gZnJvbSBcIi4vc3JjL3RpbWVvdXRcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBpbnRlcnZhbFxufSBmcm9tIFwiLi9zcmMvaW50ZXJ2YWxcIjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7VGltZXJ9IGZyb20gXCIuL3RpbWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgZGVsYXkgPSBkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheTtcbiAgdC5yZXN0YXJ0KGZ1bmN0aW9uKGVsYXBzZWQpIHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtUaW1lciwgbm93fSBmcm9tIFwiLi90aW1lclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXIsIHRvdGFsID0gZGVsYXk7XG4gIGlmIChkZWxheSA9PSBudWxsKSByZXR1cm4gdC5yZXN0YXJ0KGNhbGxiYWNrLCBkZWxheSwgdGltZSksIHQ7XG4gIGRlbGF5ID0gK2RlbGF5LCB0aW1lID0gdGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZTtcbiAgdC5yZXN0YXJ0KGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgIGVsYXBzZWQgKz0gdG90YWw7XG4gICAgdC5yZXN0YXJ0KHRpY2ssIHRvdGFsICs9IGRlbGF5LCB0aW1lKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkKTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy9pbnRlcnZhbC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQge1xuICBsaW5lYXIgYXMgZWFzZUxpbmVhclxufSBmcm9tIFwiLi9zcmMvbGluZWFyXCI7XG5cbmV4cG9ydCB7XG4gIHF1YWRJbk91dCBhcyBlYXNlUXVhZCxcbiAgcXVhZEluIGFzIGVhc2VRdWFkSW4sXG4gIHF1YWRPdXQgYXMgZWFzZVF1YWRPdXQsXG4gIHF1YWRJbk91dCBhcyBlYXNlUXVhZEluT3V0XG59IGZyb20gXCIuL3NyYy9xdWFkXCI7XG5cbmV4cG9ydCB7XG4gIGN1YmljSW5PdXQgYXMgZWFzZUN1YmljLFxuICBjdWJpY0luIGFzIGVhc2VDdWJpY0luLFxuICBjdWJpY091dCBhcyBlYXNlQ3ViaWNPdXQsXG4gIGN1YmljSW5PdXQgYXMgZWFzZUN1YmljSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2N1YmljXCI7XG5cbmV4cG9ydCB7XG4gIHBvbHlJbk91dCBhcyBlYXNlUG9seSxcbiAgcG9seUluIGFzIGVhc2VQb2x5SW4sXG4gIHBvbHlPdXQgYXMgZWFzZVBvbHlPdXQsXG4gIHBvbHlJbk91dCBhcyBlYXNlUG9seUluT3V0XG59IGZyb20gXCIuL3NyYy9wb2x5XCI7XG5cbmV4cG9ydCB7XG4gIHNpbkluT3V0IGFzIGVhc2VTaW4sXG4gIHNpbkluIGFzIGVhc2VTaW5JbixcbiAgc2luT3V0IGFzIGVhc2VTaW5PdXQsXG4gIHNpbkluT3V0IGFzIGVhc2VTaW5Jbk91dFxufSBmcm9tIFwiLi9zcmMvc2luXCI7XG5cbmV4cG9ydCB7XG4gIGV4cEluT3V0IGFzIGVhc2VFeHAsXG4gIGV4cEluIGFzIGVhc2VFeHBJbixcbiAgZXhwT3V0IGFzIGVhc2VFeHBPdXQsXG4gIGV4cEluT3V0IGFzIGVhc2VFeHBJbk91dFxufSBmcm9tIFwiLi9zcmMvZXhwXCI7XG5cbmV4cG9ydCB7XG4gIGNpcmNsZUluT3V0IGFzIGVhc2VDaXJjbGUsXG4gIGNpcmNsZUluIGFzIGVhc2VDaXJjbGVJbixcbiAgY2lyY2xlT3V0IGFzIGVhc2VDaXJjbGVPdXQsXG4gIGNpcmNsZUluT3V0IGFzIGVhc2VDaXJjbGVJbk91dFxufSBmcm9tIFwiLi9zcmMvY2lyY2xlXCI7XG5cbmV4cG9ydCB7XG4gIGJvdW5jZU91dCBhcyBlYXNlQm91bmNlLFxuICBib3VuY2VJbiBhcyBlYXNlQm91bmNlSW4sXG4gIGJvdW5jZU91dCBhcyBlYXNlQm91bmNlT3V0LFxuICBib3VuY2VJbk91dCBhcyBlYXNlQm91bmNlSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2JvdW5jZVwiO1xuXG5leHBvcnQge1xuICBiYWNrSW5PdXQgYXMgZWFzZUJhY2ssXG4gIGJhY2tJbiBhcyBlYXNlQmFja0luLFxuICBiYWNrT3V0IGFzIGVhc2VCYWNrT3V0LFxuICBiYWNrSW5PdXQgYXMgZWFzZUJhY2tJbk91dFxufSBmcm9tIFwiLi9zcmMvYmFja1wiO1xuXG5leHBvcnQge1xuICBlbGFzdGljT3V0IGFzIGVhc2VFbGFzdGljLFxuICBlbGFzdGljSW4gYXMgZWFzZUVsYXN0aWNJbixcbiAgZWxhc3RpY091dCBhcyBlYXNlRWxhc3RpY091dCxcbiAgZWxhc3RpY0luT3V0IGFzIGVhc2VFbGFzdGljSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2VsYXN0aWNcIjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGxpbmVhcih0KSB7XG4gIHJldHVybiArdDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcXVhZEluKHQpIHtcbiAgcmV0dXJuIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhZE91dCh0KSB7XG4gIHJldHVybiB0ICogKDIgLSB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YWRJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0IDogLS10ICogKDIgLSB0KSArIDEpIC8gMjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3F1YWQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXhwb25lbnQgPSAzO1xuXG5leHBvcnQgdmFyIHBvbHlJbiA9IChmdW5jdGlvbiBjdXN0b20oZSkge1xuICBlID0gK2U7XG5cbiAgZnVuY3Rpb24gcG9seUluKHQpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codCwgZSk7XG4gIH1cblxuICBwb2x5SW4uZXhwb25lbnQgPSBjdXN0b207XG5cbiAgcmV0dXJuIHBvbHlJbjtcbn0pKGV4cG9uZW50KTtcblxuZXhwb3J0IHZhciBwb2x5T3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShlKSB7XG4gIGUgPSArZTtcblxuICBmdW5jdGlvbiBwb2x5T3V0KHQpIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSB0LCBlKTtcbiAgfVxuXG4gIHBvbHlPdXQuZXhwb25lbnQgPSBjdXN0b207XG5cbiAgcmV0dXJuIHBvbHlPdXQ7XG59KShleHBvbmVudCk7XG5cbmV4cG9ydCB2YXIgcG9seUluT3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShlKSB7XG4gIGUgPSArZTtcblxuICBmdW5jdGlvbiBwb2x5SW5PdXQodCkge1xuICAgIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IE1hdGgucG93KHQsIGUpIDogMiAtIE1hdGgucG93KDIgLSB0LCBlKSkgLyAyO1xuICB9XG5cbiAgcG9seUluT3V0LmV4cG9uZW50ID0gY3VzdG9tO1xuXG4gIHJldHVybiBwb2x5SW5PdXQ7XG59KShleHBvbmVudCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9wb2x5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcGkgPSBNYXRoLlBJLFxuICAgIGhhbGZQaSA9IHBpIC8gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpbkluKHQpIHtcbiAgcmV0dXJuIDEgLSBNYXRoLmNvcyh0ICogaGFsZlBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbk91dCh0KSB7XG4gIHJldHVybiBNYXRoLnNpbih0ICogaGFsZlBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbkluT3V0KHQpIHtcbiAgcmV0dXJuICgxIC0gTWF0aC5jb3MocGkgKiB0KSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvc2luLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gZXhwSW4odCkge1xuICByZXR1cm4gTWF0aC5wb3coMiwgMTAgKiB0IC0gMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwT3V0KHQpIHtcbiAgcmV0dXJuIDEgLSBNYXRoLnBvdygyLCAtMTAgKiB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cEluT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gTWF0aC5wb3coMiwgMTAgKiB0IC0gMTApIDogMiAtIE1hdGgucG93KDIsIDEwIC0gMTAgKiB0KSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZXhwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gY2lyY2xlSW4odCkge1xuICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gdCAqIHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2lyY2xlT3V0KHQpIHtcbiAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaXJjbGVJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IDEgLSBNYXRoLnNxcnQoMSAtIHQgKiB0KSA6IE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpIC8gMjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2NpcmNsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGIxID0gNCAvIDExLFxuICAgIGIyID0gNiAvIDExLFxuICAgIGIzID0gOCAvIDExLFxuICAgIGI0ID0gMyAvIDQsXG4gICAgYjUgPSA5IC8gMTEsXG4gICAgYjYgPSAxMCAvIDExLFxuICAgIGI3ID0gMTUgLyAxNixcbiAgICBiOCA9IDIxIC8gMjIsXG4gICAgYjkgPSA2MyAvIDY0LFxuICAgIGIwID0gMSAvIGIxIC8gYjE7XG5cbmV4cG9ydCBmdW5jdGlvbiBib3VuY2VJbih0KSB7XG4gIHJldHVybiAxIC0gYm91bmNlT3V0KDEgLSB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZU91dCh0KSB7XG4gIHJldHVybiAodCA9ICt0KSA8IGIxID8gYjAgKiB0ICogdCA6IHQgPCBiMyA/IGIwICogKHQgLT0gYjIpICogdCArIGI0IDogdCA8IGI2ID8gYjAgKiAodCAtPSBiNSkgKiB0ICsgYjcgOiBiMCAqICh0IC09IGI4KSAqIHQgKyBiOTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZUluT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gMSAtIGJvdW5jZU91dCgxIC0gdCkgOiBib3VuY2VPdXQodCAtIDEpICsgMSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvYm91bmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgb3ZlcnNob290ID0gMS43MDE1ODtcblxuZXhwb3J0IHZhciBiYWNrSW4gPSAoZnVuY3Rpb24gY3VzdG9tKHMpIHtcbiAgcyA9ICtzO1xuXG4gIGZ1bmN0aW9uIGJhY2tJbih0KSB7XG4gICAgcmV0dXJuIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XG4gIH1cblxuICBiYWNrSW4ub3ZlcnNob290ID0gY3VzdG9tO1xuXG4gIHJldHVybiBiYWNrSW47XG59KShvdmVyc2hvb3QpO1xuXG5leHBvcnQgdmFyIGJhY2tPdXQgPSAoZnVuY3Rpb24gY3VzdG9tKHMpIHtcbiAgcyA9ICtzO1xuXG4gIGZ1bmN0aW9uIGJhY2tPdXQodCkge1xuICAgIHJldHVybiAtLXQgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxO1xuICB9XG5cbiAgYmFja091dC5vdmVyc2hvb3QgPSBjdXN0b207XG5cbiAgcmV0dXJuIGJhY2tPdXQ7XG59KShvdmVyc2hvb3QpO1xuXG5leHBvcnQgdmFyIGJhY2tJbk91dCA9IChmdW5jdGlvbiBjdXN0b20ocykge1xuICBzID0gK3M7XG5cbiAgZnVuY3Rpb24gYmFja0luT3V0KHQpIHtcbiAgICByZXR1cm4gKCh0ICo9IDIpIDwgMSA/IHQgKiB0ICogKChzICsgMSkgKiB0IC0gcykgOiAodCAtPSAyKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDIpIC8gMjtcbiAgfVxuXG4gIGJhY2tJbk91dC5vdmVyc2hvb3QgPSBjdXN0b207XG5cbiAgcmV0dXJuIGJhY2tJbk91dDtcbn0pKG92ZXJzaG9vdCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9iYWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdGF1ID0gMiAqIE1hdGguUEksXG4gICAgYW1wbGl0dWRlID0gMSxcbiAgICBwZXJpb2QgPSAwLjM7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY0luID0gKGZ1bmN0aW9uIGN1c3RvbShhLCBwKSB7XG4gIHZhciBzID0gTWF0aC5hc2luKDEgLyAoYSA9IE1hdGgubWF4KDEsIGEpKSkgKiAocCAvPSB0YXUpO1xuXG4gIGZ1bmN0aW9uIGVsYXN0aWNJbih0KSB7XG4gICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAxMCAqIC0tdCkgKiBNYXRoLnNpbigocyAtIHQpIC8gcCk7XG4gIH1cblxuICBlbGFzdGljSW4uYW1wbGl0dWRlID0gZnVuY3Rpb24oYSkgeyByZXR1cm4gY3VzdG9tKGEsIHAgKiB0YXUpOyB9O1xuICBlbGFzdGljSW4ucGVyaW9kID0gZnVuY3Rpb24ocCkgeyByZXR1cm4gY3VzdG9tKGEsIHApOyB9O1xuXG4gIHJldHVybiBlbGFzdGljSW47XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY091dCA9IChmdW5jdGlvbiBjdXN0b20oYSwgcCkge1xuICB2YXIgcyA9IE1hdGguYXNpbigxIC8gKGEgPSBNYXRoLm1heCgxLCBhKSkpICogKHAgLz0gdGF1KTtcblxuICBmdW5jdGlvbiBlbGFzdGljT3V0KHQpIHtcbiAgICByZXR1cm4gMSAtIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCA9ICt0KSkgKiBNYXRoLnNpbigodCArIHMpIC8gcCk7XG4gIH1cblxuICBlbGFzdGljT3V0LmFtcGxpdHVkZSA9IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGN1c3RvbShhLCBwICogdGF1KTsgfTtcbiAgZWxhc3RpY091dC5wZXJpb2QgPSBmdW5jdGlvbihwKSB7IHJldHVybiBjdXN0b20oYSwgcCk7IH07XG5cbiAgcmV0dXJuIGVsYXN0aWNPdXQ7XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY0luT3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShhLCBwKSB7XG4gIHZhciBzID0gTWF0aC5hc2luKDEgLyAoYSA9IE1hdGgubWF4KDEsIGEpKSkgKiAocCAvPSB0YXUpO1xuXG4gIGZ1bmN0aW9uIGVsYXN0aWNJbk91dCh0KSB7XG4gICAgcmV0dXJuICgodCA9IHQgKiAyIC0gMSkgPCAwXG4gICAgICAgID8gYSAqIE1hdGgucG93KDIsIDEwICogdCkgKiBNYXRoLnNpbigocyAtIHQpIC8gcClcbiAgICAgICAgOiAyIC0gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHMgKyB0KSAvIHApKSAvIDI7XG4gIH1cblxuICBlbGFzdGljSW5PdXQuYW1wbGl0dWRlID0gZnVuY3Rpb24oYSkgeyByZXR1cm4gY3VzdG9tKGEsIHAgKiB0YXUpOyB9O1xuICBlbGFzdGljSW5PdXQucGVyaW9kID0gZnVuY3Rpb24ocCkgeyByZXR1cm4gY3VzdG9tKGEsIHApOyB9O1xuXG4gIHJldHVybiBlbGFzdGljSW5PdXQ7XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9lbGFzdGljLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9