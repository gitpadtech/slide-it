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

    // add support for pc
    // dom.addEventListener('mousedown', this.movestart);
    // dom.addEventListener('mousemove', this.moving);
    // dom.addEventListener('mouseup', this.moveend);
    // dom.addEventListener('mouseout', this.moveend, true);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTZkMjFkMGVmOGZhNjEwODZhN2QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lb3V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvaW50ZXJ2YWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvcXVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvY3ViaWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3BvbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3Npbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZXhwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2JvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZWxhc3RpYy5qcyJdLCJuYW1lcyI6WyJob3Jpem9udGFsIiwiQk9VTkNFX0RVUkFUSU9OIiwiY2xhbXAiLCJtaW4iLCJtYXgiLCJ2IiwicmVzZXRTdHlsZSIsImRvbSIsImdldENvbXB1dGVkU3R5bGUiLCJvdmVyZmxvdyIsInN0eWxlIiwibWFwRGlzdGFuY2UiLCJ0b3VjaE1vdmVEaXN0YW5jZSIsInJldmVyc2UiLCJ2aWV3RGlzdGFuY2UiLCJjbGFtcFNwZWVkIiwiU1RBVEVTIiwiRFJBR0dJTkciLCJCT1VOQ0lOR19BVF9TVEFSVCIsIkJPVU5DSU5HX0FUX0VORCIsIklETEUiLCJTTElESU5HIiwiU2xpZGUiLCJvcHRpb25zIiwicG9zaXRpb25LZXkiLCJtb3ZhYmxlcyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiY2hpbGRyZW4iLCJtb3Zlc3RhcnQiLCJiaW5kIiwibW92aW5nIiwibW92ZWVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJib3VuZCIsInN0YXJ0IiwiZW5kIiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsInN0YXRlIiwiZG9tTm9kZSIsInN0YXJ0VG91Y2hQb3NpdGlvbiIsImxhc3RUb3VjaFBvc2l0aW9uIiwidG91Y2hQb3NpdGlvbiIsImxhc3RQb3NpdGlvbiIsImJvdW5jZVN0YXJ0UG9zaXRpb24iLCJib3VuY2VFbGFwc2VkIiwib2Zmc2V0IiwibWFzcyIsImxhc3RUaW1lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwiX2N1cnJlbnRQb3NpdGlvbiIsIl9jdXJyZW50U3BlZWQiLCJ0aW1lciIsImxhc3RNb21lbnQiLCJ1cGRhdGUiLCJlbGFwc2VkIiwiZSIsInN3aXRjaFN0YXRlIiwiY3VycmVudFNwZWVkIiwiY3VycmVudFBvc2l0aW9uIiwidG91Y2hZIiwiZXZlbnRQb3NpdGlvbiIsIm92ZXJTdGFydCIsIm9yaWdpblBvc2l0aW9uIiwib3ZlckVuZCIsInByZXZlbnREZWZhdWx0IiwiZXhhY3RseU9uU3RhcnQiLCJkcmFnQXdheUZyb21FbmQiLCJleGFjdGx5T25FbmQiLCJkcmFnQXdheUZyb21TdGFydCIsImRpc3RhbmNlIiwibm9ybWFsTW92ZSIsImRlbHRhVGltZSIsImZhY3RvciIsImZyaWN0aW9uIiwiTWF0aCIsImFjY2VsZXJhdGVkU3BlZWQiLCJlYXNlQ3ViaWNPdXQiLCJyZXNldE9uQm91bmNpbmdFbmQiLCJwb3NpdGlvbiIsIm1vdmVEaXN0YW5jZSIsImV2ZW50IiwiVG91Y2hFdmVudCIsInRvdWNoZXMiLCJ2YWwiLCJmb3JFYWNoIiwidHJhbnNmb3JtIiwiZm9yY2UiLCJpbkJvdW5kIiwiU2xpZGVJdCIsInNlbGVjdG9yIiwiSFRNTEVsZW1lbnQiLCJub2RlTGlzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsIm5vZGUiLCJFcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUlBQXFJLG1CQUFtQjs7QUFFeEo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNI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Ozs7Ozs7Ozs7Ozs7OztBQ1ZDOztBQU9BOztBQU9BOztBQU9BOztBQU9BOztBQU9BOztBQU9BOztBQU9BOztBQU9BOztBQU9BOzs7Ozs7Ozs7QUNqRUQ7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVkE7QUFBQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ3BDRDtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDckJBO0FBQUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUNwQ0Q7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLDJCQUEyQjtBQUNoRSxrQ0FBa0MscUJBQXFCOztBQUV2RDtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLDJCQUEyQjtBQUNqRSxtQ0FBbUMscUJBQXFCOztBQUV4RDtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QywyQkFBMkI7QUFDbkUscUNBQXFDLHFCQUFxQjs7QUFFMUQ7QUFDQSxDQUFDIiwiZmlsZSI6ImRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNmQyMWQwZWY4ZmE2MTA4NmE3ZCIsInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZeKAmXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW7igJl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwobnVsbCwgZSk7XG4gICAgdCA9IHQuX25leHQ7XG4gIH1cbiAgLS1mcmFtZTtcbn1cblxuZnVuY3Rpb24gd2FrZSgpIHtcbiAgY2xvY2tOb3cgPSAoY2xvY2tMYXN0ID0gY2xvY2subm93KCkpICsgY2xvY2tTa2V3O1xuICBmcmFtZSA9IHRpbWVvdXQgPSAwO1xuICB0cnkge1xuICAgIHRpbWVyRmx1c2goKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBmcmFtZSA9IDA7XG4gICAgbmFwKCk7XG4gICAgY2xvY2tOb3cgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBva2UoKSB7XG4gIHZhciBub3cgPSBjbG9jay5ub3coKSwgZGVsYXkgPSBub3cgLSBjbG9ja0xhc3Q7XG4gIGlmIChkZWxheSA+IHBva2VEZWxheSkgY2xvY2tTa2V3IC09IGRlbGF5LCBjbG9ja0xhc3QgPSBub3c7XG59XG5cbmZ1bmN0aW9uIG5hcCgpIHtcbiAgdmFyIHQwLCB0MSA9IHRhc2tIZWFkLCB0MiwgdGltZSA9IEluZmluaXR5O1xuICB3aGlsZSAodDEpIHtcbiAgICBpZiAodDEuX2NhbGwpIHtcbiAgICAgIGlmICh0aW1lID4gdDEuX3RpbWUpIHRpbWUgPSB0MS5fdGltZTtcbiAgICAgIHQwID0gdDEsIHQxID0gdDEuX25leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQyID0gdDEuX25leHQsIHQxLl9uZXh0ID0gbnVsbDtcbiAgICAgIHQxID0gdDAgPyB0MC5fbmV4dCA9IHQyIDogdGFza0hlYWQgPSB0MjtcbiAgICB9XG4gIH1cbiAgdGFza1RhaWwgPSB0MDtcbiAgc2xlZXAodGltZSk7XG59XG5cbmZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgaWYgKGZyYW1lKSByZXR1cm47IC8vIFNvb25lc3QgYWxhcm0gYWxyZWFkeSBzZXQsIG9yIHdpbGwgYmUuXG4gIGlmICh0aW1lb3V0KSB0aW1lb3V0ID0gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICB2YXIgZGVsYXkgPSB0aW1lIC0gY2xvY2tOb3c7IC8vIFN0cmljdGx5IGxlc3MgdGhhbiBpZiB3ZSByZWNvbXB1dGVkIGNsb2NrTm93LlxuICBpZiAoZGVsYXkgPiAyNCkge1xuICAgIGlmICh0aW1lIDwgSW5maW5pdHkpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHdha2UsIHRpbWUgLSBjbG9jay5ub3coKSAtIGNsb2NrU2tldyk7XG4gICAgaWYgKGludGVydmFsKSBpbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaW50ZXJ2YWwpIGNsb2NrTGFzdCA9IGNsb2NrLm5vdygpLCBpbnRlcnZhbCA9IHNldEludGVydmFsKHBva2UsIHBva2VEZWxheSk7XG4gICAgZnJhbWUgPSAxLCBzZXRGcmFtZSh3YWtlKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNsaWRlSXQgfSBmcm9tIFwiLi4vLi4vc3JjL2luZGV4XCI7XG5cbm5ldyBTbGlkZUl0KCcudi1zbGlkZScpO1xubmV3IFNsaWRlSXQoJy5oLXNsaWRlJywge1xuICBob3Jpem9udGFsOiB0cnVlXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9leGFtcGxlcy9zY3JpcHRzL2luZGV4LmpzIiwiaW1wb3J0IHsgdGltZXIgfSBmcm9tICdkMy10aW1lcic7XG5pbXBvcnQgeyBlYXNlQ3ViaWNPdXQgfSBmcm9tICdkMy1lYXNlJztcblxuLyoqXG4gKiBAdHlwZSB7bnVtYmVyfSBib3VuY2luZyBhbmltYXRpb24gZHVyYXRpb25cbiAqL1xuY29uc3QgQk9VTkNFX0RVUkFUSU9OID0gNTAwO1xuXG5mdW5jdGlvbiBjbGFtcChtaW4sIG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24odikge1xuICAgIHJldHVybiB2IDwgbWluID8gbWluIDogIHYgPiBtYXggPyBtYXggOiB2O1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tIFxuICovXG5mdW5jdGlvbiByZXNldFN0eWxlKGRvbSkge1xuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShkb20pLm92ZXJmbG93ICE9PSAnaGlkZGVuJykge1xuICAgIGRvbS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3RhbmNlKHRvdWNoTW92ZURpc3RhbmNlKSB7XG4gIHJldHVybiB0b3VjaE1vdmVEaXN0YW5jZSAvIDM7XG59XG5cbm1hcERpc3RhbmNlLnJldmVyc2UgPSBmdW5jdGlvbiAodmlld0Rpc3RhbmNlKSB7XG4gIHJldHVybiB2aWV3RGlzdGFuY2UgKiAzO1xufVxuXG5jb25zdCBjbGFtcFNwZWVkID0gY2xhbXAoLTMuNSwgMy41KTtcblxuY29uc3QgU1RBVEVTID0ge1xuICBEUkFHR0lORzogJ0RSQUdHSU5HJyxcbiAgQk9VTkNJTkdfQVRfU1RBUlQ6ICdCT1VOQ0lOR19BVF9TVEFSVCcsXG4gIEJPVU5DSU5HX0FUX0VORDogJ0JPVU5DSU5HX0FUX0VORCcsXG4gIElETEU6ICdJRExFJyxcbiAgU0xJRElORzogJ1NMSURJTkcnLFxufTtcblxuY2xhc3MgU2xpZGUge1xuICAvKipcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZG9tIFxuICAgKi9cbiAgY29uc3RydWN0b3IoZG9tLCBvcHRpb25zKSB7XG4gICAgcmVzZXRTdHlsZShkb20pO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5wb3NpdGlvbktleSA9IG9wdGlvbnMuaG9yaXpvbnRhbCA/ICdjbGllbnRYJyA6ICdjbGllbnRZJztcbiAgICB0aGlzLm1vdmFibGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9tLmNoaWxkcmVuLCAwKTtcbiAgICB0aGlzLm1vdmVzdGFydCA9IHRoaXMubW92ZXN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3ZpbmcgPSB0aGlzLm1vdmluZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW92ZWVuZCA9IHRoaXMubW92ZWVuZC5iaW5kKHRoaXMpO1xuXG4gICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm1vdmVzdGFydCk7XG4gICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW92aW5nKTtcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm1vdmVlbmQpO1xuICAgIFxuICAgIC8vIGFkZCBzdXBwb3J0IGZvciBwY1xuICAgIC8vIGRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdmVzdGFydCk7XG4gICAgLy8gZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW92aW5nKTtcbiAgICAvLyBkb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW92ZWVuZCk7XG4gICAgLy8gZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5tb3ZlZW5kLCB0cnVlKTtcblxuICAgIHRoaXMuYm91bmQgPSB7XG4gICAgICBzdGFydDogMCxcbiAgICAgIGVuZDogb3B0aW9ucy5ob3Jpem9udGFsID8gIC0oZG9tLnNjcm9sbFdpZHRoIC0gZG9tLmNsaWVudFdpZHRoKVxuICAgICAgICA6IC0oZG9tLnNjcm9sbEhlaWdodCAtIGRvbS5jbGllbnRIZWlnaHQpXG4gICAgfTtcbiAgICB0aGlzLnN0YXRlID0gU1RBVEVTLklETEU7XG4gICAgdGhpcy5kb21Ob2RlID0gZG9tO1xuICAgIHRoaXMuc3RhcnRUb3VjaFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnRvdWNoUG9zaXRpb24gPSAwO1xuICAgIHRoaXMubGFzdFBvc2l0aW9uID0gMDtcbiAgICB0aGlzLmJvdW5jZVN0YXJ0UG9zaXRpb24gPSAwO1xuICAgIHRoaXMuYm91bmNlRWxhcHNlZCA9IDA7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMubWFzcyA9IDE7XG4gICAgdGhpcy5sYXN0VGltZSA9IHRoaXMuY3VycmVudFRpbWUgPSAgRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5fY3VycmVudFNwZWVkID0gMDtcblxuICAgIHRpbWVyKCgoKSA9PiB7XG4gICAgICBsZXQgbGFzdE1vbWVudCA9IDA7XG4gICAgICByZXR1cm4gZWxhcHNlZCA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlKGVsYXBzZWQgLSBsYXN0TW9tZW50KTtcbiAgICAgICAgbGFzdE1vbWVudCA9IGVsYXBzZWQ7XG4gICAgICB9O1xuICAgIH0pKCkpO1xuICB9XG4gIGdldCBpbkJvdW5kKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA8PTAgJiYgdGhpcy5jdXJyZW50UG9zaXRpb24gPj0gdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGRyYWdBd2F5RnJvbVN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoUG9zaXRpb24gLSB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uIDwgMDtcbiAgfVxuICBnZXQgZHJhZ0F3YXlGcm9tRW5kKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoUG9zaXRpb24gLSB0aGlzLmxhc3RUb3VjaFBvc2l0aW9uID4gMDtcbiAgfVxuICBnZXQgb3ZlclN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA+IDA7XG4gIH1cbiAgZ2V0IG92ZXJFbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBvc2l0aW9uIDwgdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGV4YWN0bHlPblN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9PT0gMDtcbiAgfVxuICBnZXQgZXhhY3RseU9uRW5kKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9PT0gdGhpcy5ib3VuZC5lbmQ7XG4gIH1cbiAgZ2V0IGN1cnJlbnRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuICB9XG4gIHNldCBjdXJyZW50UG9zaXRpb24odmFsKSB7XG4gICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gdmFsO1xuICAgIHRoaXMubW92YWJsZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Jpem9udGFsKSB7XG4gICAgICAgIGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dmFsfXB4LDAsMClgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwke3ZhbH1weCwwKWA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNwZWVkO1xuICB9XG4gIHNldCBjdXJyZW50U3BlZWQodmFsKSB7XG4gICAgdGhpcy5fY3VycmVudFNwZWVkID0gY2xhbXBTcGVlZCh2YWwpO1xuICB9XG4gIGdldCBhY2NlbGVyYXRlZFNwZWVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb24gLyB0aGlzLm1hc3M7XG4gIH1cbiAgZ2V0IGZyaWN0aW9uKCkge1xuICAgIC8vIHRocmVlIHRpbWVzIHdoZW4gbm90IGluIGJvdW5kXG4gICAgY29uc3QgZm9yY2UgPSB0aGlzLmluQm91bmQgPyAxMCA6IDMwO1xuICAgIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA8IDApIHtcbiAgICAgIHJldHVybiBmb3JjZSAqIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA+IDApIHtcbiAgICAgIHJldHVybiBmb3JjZSAqIC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgXG4gICAqL1xuICBtb3Zlc3RhcnQoZSkge1xuICAgIHRoaXMuc3dpdGNoU3RhdGUoU1RBVEVTLkRSQUdHSU5HKTtcbiAgICB0aGlzLmN1cnJlbnRTcGVlZCA9IDA7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICBjb25zdCB0b3VjaFkgPSB0aGlzLmV2ZW50UG9zaXRpb24oZSk7XG4gICAgdGhpcy5zdGFydFRvdWNoUG9zaXRpb24gPSB0b3VjaFk7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBpZiAodGhpcy5vdmVyU3RhcnQpIHtcbiAgICAgIC8vIGluZmVyIHRvdWNoIHN0YXJ0IHBvc2l0aW9uXG4gICAgICB0aGlzLm9yaWdpblBvc2l0aW9uID0gdGhpcy5zdGFydFRvdWNoUG9zaXRpb24gLSBtYXBEaXN0YW5jZS5yZXZlcnNlKHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlckVuZCkge1xuICAgICAgdGhpcy5vcmlnaW5Qb3NpdGlvbiA9XG4gICAgICAgIHRoaXMuc3RhcnRUb3VjaFBvc2l0aW9uIC0gbWFwRGlzdGFuY2UucmV2ZXJzZSh0aGlzLmN1cnJlbnRQb3NpdGlvbiAtIHRoaXMuYm91bmQuZW5kKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgXG4gICAqL1xuICBtb3ZpbmcoZSkge1xuICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFUy5EUkFHR0lORykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICAgIHRoaXMubGFzdFRvdWNoUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5jdXJyZW50VGltZTtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgdGhpcy50b3VjaFBvc2l0aW9uID0gdGhpcy5ldmVudFBvc2l0aW9uKGUpO1xuICAgICAgXG4gICAgICBpZiAodGhpcy5leGFjdGx5T25TdGFydCAmJiB0aGlzLmRyYWdBd2F5RnJvbUVuZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IDAuMDE7XG4gICAgICAgIHRoaXMub3JpZ2luUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXhhY3RseU9uRW5kICYmIHRoaXMuZHJhZ0F3YXlGcm9tU3RhcnQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLmJvdW5kLmVuZCAtIDAuMDE7XG4gICAgICAgIHRoaXMub3JpZ2luUG9zaXRpb24gPSB0aGlzLnRvdWNoUG9zaXRpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlclN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHRoaXMudG91Y2hQb3NpdGlvbiAtIHRoaXMub3JpZ2luUG9zaXRpb24pIC8gMztcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSBkaXN0YW5jZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVyRW5kKSB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKHRoaXMudG91Y2hQb3NpdGlvbiAtIHRoaXMub3JpZ2luUG9zaXRpb24pIC8gMztcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLmJvdW5kLmVuZCArIGRpc3RhbmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdG91Y2htb3ZlIG5vcm1hbGx5XG4gICAgICAgIHRoaXMubm9ybWFsTW92ZSh0aGlzLnRvdWNoUG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBtb3ZlZW5kKGUpIHtcbiAgICBpZiAodGhpcy5vdmVyU3RhcnQpIHtcbiAgICAgIHRoaXMuc3dpdGNoU3RhdGUoU1RBVEVTLkJPVU5DSU5HX0FUX1NUQVJUKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlckVuZCkge1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuQk9VTkNJTkdfQVRfRU5EKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuU0xJRElORyk7XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuY3VycmVudFBvc2l0aW9uO1xuICAgICAgLy8gaW5mZXIgZW5kZWQgc3BlZWRcbiAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gKHRoaXMuY3VycmVudFBvc2l0aW9uIC0gdGhpcy5sYXN0UG9zaXRpb24pIC8gKHRoaXMuY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUaW1lKTtcbiAgICB9XG4gIH1cbiAgdXBkYXRlKGRlbHRhVGltZSkge1xuICAgIGNvbnN0IGZhY3RvciA9IGRlbHRhVGltZSAvIDEwMDA7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICBjYXNlIChTVEFURVMuU0xJRElORyk6XG4gICAgICAgIGlmICh0aGlzLmZyaWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gTWF0aC5taW4oMCwgdGhpcy5jdXJyZW50U3BlZWQgKyB0aGlzLmFjY2VsZXJhdGVkU3BlZWQgKiBmYWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gTWF0aC5tYXgoMCwgdGhpcy5jdXJyZW50U3BlZWQgKyB0aGlzLmFjY2VsZXJhdGVkU3BlZWQgKiBmYWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTcGVlZCA9PT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLm92ZXJTdGFydCkge1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVyRW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFN0YXRlKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaFN0YXRlKFNUQVRFUy5JRExFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc2xpZGluZ1xuICAgICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uICs9IHRoaXMuY3VycmVudFNwZWVkICogZGVsdGFUaW1lO1xuICAgICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5jdXJyZW50UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIChTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQpOlxuICAgICAgICB0aGlzLmJvdW5jZUVsYXBzZWQgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiAtIHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiAqIGVhc2VDdWJpY091dCh0aGlzLmJvdW5jZUVsYXBzZWQgLyBCT1VOQ0VfRFVSQVRJT04pO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuY3VycmVudFBvc2l0aW9uO1xuICAgICAgICB0aGlzLnJlc2V0T25Cb3VuY2luZ0VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpOlxuICAgICAgICB0aGlzLmJvdW5jZUVsYXBzZWQgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbiArICh0aGlzLmJvdW5kLmVuZCAtIHRoaXMuYm91bmNlU3RhcnRQb3NpdGlvbilcbiAgICAgICAgICAqIGVhc2VDdWJpY091dCh0aGlzLmJvdW5jZUVsYXBzZWQgLyBCT1VOQ0VfRFVSQVRJT04pXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5jdXJyZW50UG9zaXRpb247XG4gICAgICAgIHRoaXMucmVzZXRPbkJvdW5jaW5nRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzd2l0Y2hTdGF0ZShzdGF0ZSkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSBzdGF0ZSkgcmV0dXJuO1xuICAgIHN3aXRjaChzdGF0ZSkge1xuICAgICAgY2FzZSAoU1RBVEVTLkJPVU5DSU5HX0FUX1NUQVJUKTpcbiAgICAgIGNhc2UgKFNUQVRFUy5CT1VOQ0lOR19BVF9FTkQpOlxuICAgICAgICB0aGlzLmJvdW5jZVN0YXJ0UG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5ib3VuY2VFbGFwc2VkID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxuICBub3JtYWxNb3ZlKHBvc2l0aW9uKSB7XG4gICAgY29uc3QgbW92ZURpc3RhbmNlICA9IHBvc2l0aW9uIC0gdGhpcy5zdGFydFRvdWNoUG9zaXRpb247XG4gICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSB0aGlzLm9mZnNldCArIG1vdmVEaXN0YW5jZTtcbiAgfVxuICByZXNldE9uQm91bmNpbmdFbmQoKSB7XG4gICAgaWYgKHRoaXMuYm91bmNlRWxhcHNlZCA+IEJPVU5DRV9EVVJBVElPTikge1xuICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPVxuICAgICAgICB0aGlzLnN0YXRlID09PSBTVEFURVMuQk9VTkNJTkdfQVRfU1RBUlQgP1xuICAgICAgICAgIHRoaXMuYm91bmQuc3RhcnQgOlxuICAgICAgICAgIHRoaXMuYm91bmQuZW5kO1xuICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5jdXJyZW50U3BlZWQgPSAwO1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZShTVEFURVMuSURMRSk7XG4gICAgfVxuICB9XG4gIGV2ZW50UG9zaXRpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50ID9cbiAgICAgIGV2ZW50LnRvdWNoZXNbMF1bdGhpcy5wb3NpdGlvbktleV0gOlxuICAgICAgZXZlbnRbdGhpcy5wb3NpdGlvbktleV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlSXQoc2VsZWN0b3IsIHsgaG9yaXpvbnRhbCA9IGZhbHNlIH0gPSB7fSkge1xuICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBuZXcgU2xpZGUoc2VsZWN0b3IsIHtcbiAgICAgIGhvcml6b250YWxcbiAgICB9KTtcbiAgfVxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIDApO1xuICAgIHJldHVybiBub2RlTGlzdC5tYXAobm9kZSA9PiBuZXcgU2xpZGUobm9kZSwge1xuICAgICAgaG9yaXpvbnRhbFxuICAgIH0pKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJkb2VzJ3Qgc3VwcG9ydGVkIHBhcmFtc1wiKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQge1xuICBub3csXG4gIHRpbWVyLFxuICB0aW1lckZsdXNoXG59IGZyb20gXCIuL3NyYy90aW1lclwiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHRpbWVvdXRcbn0gZnJvbSBcIi4vc3JjL3RpbWVvdXRcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBpbnRlcnZhbFxufSBmcm9tIFwiLi9zcmMvaW50ZXJ2YWxcIjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7VGltZXJ9IGZyb20gXCIuL3RpbWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgZGVsYXkgPSBkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheTtcbiAgdC5yZXN0YXJ0KGZ1bmN0aW9uKGVsYXBzZWQpIHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtUaW1lciwgbm93fSBmcm9tIFwiLi90aW1lclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXIsIHRvdGFsID0gZGVsYXk7XG4gIGlmIChkZWxheSA9PSBudWxsKSByZXR1cm4gdC5yZXN0YXJ0KGNhbGxiYWNrLCBkZWxheSwgdGltZSksIHQ7XG4gIGRlbGF5ID0gK2RlbGF5LCB0aW1lID0gdGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZTtcbiAgdC5yZXN0YXJ0KGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgIGVsYXBzZWQgKz0gdG90YWw7XG4gICAgdC5yZXN0YXJ0KHRpY2ssIHRvdGFsICs9IGRlbGF5LCB0aW1lKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkKTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy9pbnRlcnZhbC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQge1xuICBsaW5lYXIgYXMgZWFzZUxpbmVhclxufSBmcm9tIFwiLi9zcmMvbGluZWFyXCI7XG5cbmV4cG9ydCB7XG4gIHF1YWRJbk91dCBhcyBlYXNlUXVhZCxcbiAgcXVhZEluIGFzIGVhc2VRdWFkSW4sXG4gIHF1YWRPdXQgYXMgZWFzZVF1YWRPdXQsXG4gIHF1YWRJbk91dCBhcyBlYXNlUXVhZEluT3V0XG59IGZyb20gXCIuL3NyYy9xdWFkXCI7XG5cbmV4cG9ydCB7XG4gIGN1YmljSW5PdXQgYXMgZWFzZUN1YmljLFxuICBjdWJpY0luIGFzIGVhc2VDdWJpY0luLFxuICBjdWJpY091dCBhcyBlYXNlQ3ViaWNPdXQsXG4gIGN1YmljSW5PdXQgYXMgZWFzZUN1YmljSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2N1YmljXCI7XG5cbmV4cG9ydCB7XG4gIHBvbHlJbk91dCBhcyBlYXNlUG9seSxcbiAgcG9seUluIGFzIGVhc2VQb2x5SW4sXG4gIHBvbHlPdXQgYXMgZWFzZVBvbHlPdXQsXG4gIHBvbHlJbk91dCBhcyBlYXNlUG9seUluT3V0XG59IGZyb20gXCIuL3NyYy9wb2x5XCI7XG5cbmV4cG9ydCB7XG4gIHNpbkluT3V0IGFzIGVhc2VTaW4sXG4gIHNpbkluIGFzIGVhc2VTaW5JbixcbiAgc2luT3V0IGFzIGVhc2VTaW5PdXQsXG4gIHNpbkluT3V0IGFzIGVhc2VTaW5Jbk91dFxufSBmcm9tIFwiLi9zcmMvc2luXCI7XG5cbmV4cG9ydCB7XG4gIGV4cEluT3V0IGFzIGVhc2VFeHAsXG4gIGV4cEluIGFzIGVhc2VFeHBJbixcbiAgZXhwT3V0IGFzIGVhc2VFeHBPdXQsXG4gIGV4cEluT3V0IGFzIGVhc2VFeHBJbk91dFxufSBmcm9tIFwiLi9zcmMvZXhwXCI7XG5cbmV4cG9ydCB7XG4gIGNpcmNsZUluT3V0IGFzIGVhc2VDaXJjbGUsXG4gIGNpcmNsZUluIGFzIGVhc2VDaXJjbGVJbixcbiAgY2lyY2xlT3V0IGFzIGVhc2VDaXJjbGVPdXQsXG4gIGNpcmNsZUluT3V0IGFzIGVhc2VDaXJjbGVJbk91dFxufSBmcm9tIFwiLi9zcmMvY2lyY2xlXCI7XG5cbmV4cG9ydCB7XG4gIGJvdW5jZU91dCBhcyBlYXNlQm91bmNlLFxuICBib3VuY2VJbiBhcyBlYXNlQm91bmNlSW4sXG4gIGJvdW5jZU91dCBhcyBlYXNlQm91bmNlT3V0LFxuICBib3VuY2VJbk91dCBhcyBlYXNlQm91bmNlSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2JvdW5jZVwiO1xuXG5leHBvcnQge1xuICBiYWNrSW5PdXQgYXMgZWFzZUJhY2ssXG4gIGJhY2tJbiBhcyBlYXNlQmFja0luLFxuICBiYWNrT3V0IGFzIGVhc2VCYWNrT3V0LFxuICBiYWNrSW5PdXQgYXMgZWFzZUJhY2tJbk91dFxufSBmcm9tIFwiLi9zcmMvYmFja1wiO1xuXG5leHBvcnQge1xuICBlbGFzdGljT3V0IGFzIGVhc2VFbGFzdGljLFxuICBlbGFzdGljSW4gYXMgZWFzZUVsYXN0aWNJbixcbiAgZWxhc3RpY091dCBhcyBlYXNlRWxhc3RpY091dCxcbiAgZWxhc3RpY0luT3V0IGFzIGVhc2VFbGFzdGljSW5PdXRcbn0gZnJvbSBcIi4vc3JjL2VsYXN0aWNcIjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGxpbmVhcih0KSB7XG4gIHJldHVybiArdDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2xpbmVhci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcXVhZEluKHQpIHtcbiAgcmV0dXJuIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVhZE91dCh0KSB7XG4gIHJldHVybiB0ICogKDIgLSB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1YWRJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0IDogLS10ICogKDIgLSB0KSArIDEpIC8gMjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL3F1YWQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZXhwb25lbnQgPSAzO1xuXG5leHBvcnQgdmFyIHBvbHlJbiA9IChmdW5jdGlvbiBjdXN0b20oZSkge1xuICBlID0gK2U7XG5cbiAgZnVuY3Rpb24gcG9seUluKHQpIHtcbiAgICByZXR1cm4gTWF0aC5wb3codCwgZSk7XG4gIH1cblxuICBwb2x5SW4uZXhwb25lbnQgPSBjdXN0b207XG5cbiAgcmV0dXJuIHBvbHlJbjtcbn0pKGV4cG9uZW50KTtcblxuZXhwb3J0IHZhciBwb2x5T3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShlKSB7XG4gIGUgPSArZTtcblxuICBmdW5jdGlvbiBwb2x5T3V0KHQpIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSB0LCBlKTtcbiAgfVxuXG4gIHBvbHlPdXQuZXhwb25lbnQgPSBjdXN0b207XG5cbiAgcmV0dXJuIHBvbHlPdXQ7XG59KShleHBvbmVudCk7XG5cbmV4cG9ydCB2YXIgcG9seUluT3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShlKSB7XG4gIGUgPSArZTtcblxuICBmdW5jdGlvbiBwb2x5SW5PdXQodCkge1xuICAgIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IE1hdGgucG93KHQsIGUpIDogMiAtIE1hdGgucG93KDIgLSB0LCBlKSkgLyAyO1xuICB9XG5cbiAgcG9seUluT3V0LmV4cG9uZW50ID0gY3VzdG9tO1xuXG4gIHJldHVybiBwb2x5SW5PdXQ7XG59KShleHBvbmVudCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9wb2x5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcGkgPSBNYXRoLlBJLFxuICAgIGhhbGZQaSA9IHBpIC8gMjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpbkluKHQpIHtcbiAgcmV0dXJuIDEgLSBNYXRoLmNvcyh0ICogaGFsZlBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbk91dCh0KSB7XG4gIHJldHVybiBNYXRoLnNpbih0ICogaGFsZlBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbkluT3V0KHQpIHtcbiAgcmV0dXJuICgxIC0gTWF0aC5jb3MocGkgKiB0KSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvc2luLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gZXhwSW4odCkge1xuICByZXR1cm4gTWF0aC5wb3coMiwgMTAgKiB0IC0gMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhwT3V0KHQpIHtcbiAgcmV0dXJuIDEgLSBNYXRoLnBvdygyLCAtMTAgKiB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cEluT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gTWF0aC5wb3coMiwgMTAgKiB0IC0gMTApIDogMiAtIE1hdGgucG93KDIsIDEwIC0gMTAgKiB0KSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvZXhwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gY2lyY2xlSW4odCkge1xuICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gdCAqIHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2lyY2xlT3V0KHQpIHtcbiAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaXJjbGVJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IDEgLSBNYXRoLnNxcnQoMSAtIHQgKiB0KSA6IE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpIC8gMjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2NpcmNsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGIxID0gNCAvIDExLFxuICAgIGIyID0gNiAvIDExLFxuICAgIGIzID0gOCAvIDExLFxuICAgIGI0ID0gMyAvIDQsXG4gICAgYjUgPSA5IC8gMTEsXG4gICAgYjYgPSAxMCAvIDExLFxuICAgIGI3ID0gMTUgLyAxNixcbiAgICBiOCA9IDIxIC8gMjIsXG4gICAgYjkgPSA2MyAvIDY0LFxuICAgIGIwID0gMSAvIGIxIC8gYjE7XG5cbmV4cG9ydCBmdW5jdGlvbiBib3VuY2VJbih0KSB7XG4gIHJldHVybiAxIC0gYm91bmNlT3V0KDEgLSB0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZU91dCh0KSB7XG4gIHJldHVybiAodCA9ICt0KSA8IGIxID8gYjAgKiB0ICogdCA6IHQgPCBiMyA/IGIwICogKHQgLT0gYjIpICogdCArIGI0IDogdCA8IGI2ID8gYjAgKiAodCAtPSBiNSkgKiB0ICsgYjcgOiBiMCAqICh0IC09IGI4KSAqIHQgKyBiOTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5jZUluT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gMSAtIGJvdW5jZU91dCgxIC0gdCkgOiBib3VuY2VPdXQodCAtIDEpICsgMSkgLyAyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZDMtZWFzZS9zcmMvYm91bmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgb3ZlcnNob290ID0gMS43MDE1ODtcblxuZXhwb3J0IHZhciBiYWNrSW4gPSAoZnVuY3Rpb24gY3VzdG9tKHMpIHtcbiAgcyA9ICtzO1xuXG4gIGZ1bmN0aW9uIGJhY2tJbih0KSB7XG4gICAgcmV0dXJuIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XG4gIH1cblxuICBiYWNrSW4ub3ZlcnNob290ID0gY3VzdG9tO1xuXG4gIHJldHVybiBiYWNrSW47XG59KShvdmVyc2hvb3QpO1xuXG5leHBvcnQgdmFyIGJhY2tPdXQgPSAoZnVuY3Rpb24gY3VzdG9tKHMpIHtcbiAgcyA9ICtzO1xuXG4gIGZ1bmN0aW9uIGJhY2tPdXQodCkge1xuICAgIHJldHVybiAtLXQgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxO1xuICB9XG5cbiAgYmFja091dC5vdmVyc2hvb3QgPSBjdXN0b207XG5cbiAgcmV0dXJuIGJhY2tPdXQ7XG59KShvdmVyc2hvb3QpO1xuXG5leHBvcnQgdmFyIGJhY2tJbk91dCA9IChmdW5jdGlvbiBjdXN0b20ocykge1xuICBzID0gK3M7XG5cbiAgZnVuY3Rpb24gYmFja0luT3V0KHQpIHtcbiAgICByZXR1cm4gKCh0ICo9IDIpIDwgMSA/IHQgKiB0ICogKChzICsgMSkgKiB0IC0gcykgOiAodCAtPSAyKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDIpIC8gMjtcbiAgfVxuXG4gIGJhY2tJbk91dC5vdmVyc2hvb3QgPSBjdXN0b207XG5cbiAgcmV0dXJuIGJhY2tJbk91dDtcbn0pKG92ZXJzaG9vdCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9iYWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdGF1ID0gMiAqIE1hdGguUEksXG4gICAgYW1wbGl0dWRlID0gMSxcbiAgICBwZXJpb2QgPSAwLjM7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY0luID0gKGZ1bmN0aW9uIGN1c3RvbShhLCBwKSB7XG4gIHZhciBzID0gTWF0aC5hc2luKDEgLyAoYSA9IE1hdGgubWF4KDEsIGEpKSkgKiAocCAvPSB0YXUpO1xuXG4gIGZ1bmN0aW9uIGVsYXN0aWNJbih0KSB7XG4gICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAxMCAqIC0tdCkgKiBNYXRoLnNpbigocyAtIHQpIC8gcCk7XG4gIH1cblxuICBlbGFzdGljSW4uYW1wbGl0dWRlID0gZnVuY3Rpb24oYSkgeyByZXR1cm4gY3VzdG9tKGEsIHAgKiB0YXUpOyB9O1xuICBlbGFzdGljSW4ucGVyaW9kID0gZnVuY3Rpb24ocCkgeyByZXR1cm4gY3VzdG9tKGEsIHApOyB9O1xuXG4gIHJldHVybiBlbGFzdGljSW47XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY091dCA9IChmdW5jdGlvbiBjdXN0b20oYSwgcCkge1xuICB2YXIgcyA9IE1hdGguYXNpbigxIC8gKGEgPSBNYXRoLm1heCgxLCBhKSkpICogKHAgLz0gdGF1KTtcblxuICBmdW5jdGlvbiBlbGFzdGljT3V0KHQpIHtcbiAgICByZXR1cm4gMSAtIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCA9ICt0KSkgKiBNYXRoLnNpbigodCArIHMpIC8gcCk7XG4gIH1cblxuICBlbGFzdGljT3V0LmFtcGxpdHVkZSA9IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGN1c3RvbShhLCBwICogdGF1KTsgfTtcbiAgZWxhc3RpY091dC5wZXJpb2QgPSBmdW5jdGlvbihwKSB7IHJldHVybiBjdXN0b20oYSwgcCk7IH07XG5cbiAgcmV0dXJuIGVsYXN0aWNPdXQ7XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cbmV4cG9ydCB2YXIgZWxhc3RpY0luT3V0ID0gKGZ1bmN0aW9uIGN1c3RvbShhLCBwKSB7XG4gIHZhciBzID0gTWF0aC5hc2luKDEgLyAoYSA9IE1hdGgubWF4KDEsIGEpKSkgKiAocCAvPSB0YXUpO1xuXG4gIGZ1bmN0aW9uIGVsYXN0aWNJbk91dCh0KSB7XG4gICAgcmV0dXJuICgodCA9IHQgKiAyIC0gMSkgPCAwXG4gICAgICAgID8gYSAqIE1hdGgucG93KDIsIDEwICogdCkgKiBNYXRoLnNpbigocyAtIHQpIC8gcClcbiAgICAgICAgOiAyIC0gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHMgKyB0KSAvIHApKSAvIDI7XG4gIH1cblxuICBlbGFzdGljSW5PdXQuYW1wbGl0dWRlID0gZnVuY3Rpb24oYSkgeyByZXR1cm4gY3VzdG9tKGEsIHAgKiB0YXUpOyB9O1xuICBlbGFzdGljSW5PdXQucGVyaW9kID0gZnVuY3Rpb24ocCkgeyByZXR1cm4gY3VzdG9tKGEsIHApOyB9O1xuXG4gIHJldHVybiBlbGFzdGljSW5PdXQ7XG59KShhbXBsaXR1ZGUsIHBlcmlvZCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9lbGFzdGljLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9