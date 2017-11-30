import { timer } from 'd3-timer';
import { easeCubicOut } from 'd3-ease';
import {
  clamp,
  mapDistance,
} from './algorithm';
import {
  resetStyle,
  enableHardwareAcceleration,
  updateLoop,
  maxScroll,
  transform,
  inViewport
} from './utils';
import './index.css';
/**
 * @type {number} bouncing animation duration
 */
const EASE_DURATION = 600;

// max slide speed === 1.5
const clampSpeed = clamp(-1.5, 1.5);

const STATES = {
  DRAGGING: 0,
  EASING_TO_START: 1,
  EASING_TO_END: 2,
  IDLE: 3,
  SLIDING: 4,
  SLIDE_TO: 5,
};

export class Slide {
  /**
   * @param {HTMLElement} dom 
   */
  constructor(dom, options) {
    resetStyle(dom);
    /**
     * @type {HTMLElement}
     */
    this.domNode = dom;
    this.options = options;
    this._cacheChildList();
    this.movables.forEach(enableHardwareAcceleration);

    this._attachListener();
    this._monitorChildList();
    this._cache();

    this._bound = {
      start: 0,
      end: -this._scrollSize(this.movables)
    };
    this.state = STATES.IDLE;

    this._startTouchPosition = 0;
    this._lastTouchPosition = 0;
    this._touchPosition = 0;
    this._lastPosition = 0;
    this._bounceStartPosition = 0;
    this._easeElapsed = 0;
    this._slideToStartPosition = 0;
    this._slideToTargetPosition = 0;
    this._mass = 1;
    this._lastFrameMoment = this._frameMoment =  Date.now();
    this._currentPosition = 0;
    this._speed = 0;
    updateLoop(this.update.bind(this));
    
  }
  _attachListener() {
    const dom = this.domNode;
    this.movestart = this.movestart.bind(this);
    this.moving = this.moving.bind(this);
    this.moveend = this.moveend.bind(this);

    dom.addEventListener('touchstart', this.movestart);
  }
  _monitorChildList() {
    new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        this._cacheChildList();
      });
    }).observe(this.domNode, {
      childList: true
    });
  }
  _cacheChildList() {
    this.movables = Array.prototype.slice.call(this.domNode.children, 0);
  }
  _cache() {
    const { horizontal } = this.options;

    this.eventPosition = (function(key) {
      return function(event) {
        return event.touches[0][key];
      }
    })(horizontal ? 'clientX' : 'clientY');
    this._scrollSize = maxScroll(this.domNode, horizontal);
  }
  get inBound() {
    return this.currentPosition <=0 && this.currentPosition >= this._bound.end;
  }
  get overStart() {
    return this.currentPosition > 0;
  }
  get overEnd() {
    return this.currentPosition < this._bound.end;
  }
  get currentPosition() {
    return this._currentPosition;
  }
  set currentPosition(val) {
    this._lastPosition = this._currentPosition;
    this._currentPosition = val;
    const { horizontal } = this.options
    this.movables.forEach((e) => {
      if (this.options.excludeNodes.indexOf(e) !== -1) return;
      transform(
        e,
        horizontal ? `translateX(${val}px)` : `translateY(${val}px)`
      );
    });
  }
  get speed() {
    return this._speed;
  }
  set speed(val) {
    this._speed = clampSpeed(val);
  }
  get acceleratedSpeed() {
    // accelerated velocity unit in (px/ms²)
    return this.friction / this._mass;
  }
  get friction() {
    // larger when not in bound
    const force = this.inBound ? 0.028 :  0.2;
    const direction = -Math.sign(this.speed);
    return force * direction;
  }
  /**
   * @param {Event} e 
   */
  movestart(e) {
    this.domNode.addEventListener('touchmove', this.moving);
    this.domNode.addEventListener('touchend', this.moveend);
    e.preventDefault();
    this.switchState(STATES.DRAGGING);
    const touchY = this.eventPosition(e);
    this._startTouchPosition = touchY;
    this._lastTouchPosition = touchY;
    this._touchPosition = touchY;
    this._frameMoment = Date.now();
  }
  /**
   * @param {Event} e 
   */
  moving(e) {
    e.preventDefault();
    const { clientX, clientY } = e.touches[0];
    // trigger touchend manually
    if (!inViewport(clientX, clientY)) {
      this.domNode.removeEventListener('touchmove', this.moving);
      this.domNode.dispatchEvent(new Event('touchend'));
    }

    this._lastTouchPosition = this._touchPosition;
    this._touchPosition = this.eventPosition(e);
    this._lastFrameMoment = this._frameMoment;
    this._frameMoment = Date.now();

    this.reactMove();
  }
  moveend(e) {
    if (this.overStart) {
      this.switchState(STATES.EASING_TO_START);
    } else if (this.overEnd) {
      this.switchState(STATES.EASING_TO_END);
    } else {
      this.switchState(STATES.SLIDING);
      // infer ended speed
      this.speed = (this.currentPosition - this._lastPosition) / (this._frameMoment - this._lastFrameMoment);
    }
    this.domNode.removeEventListener('touchend', this.moveend);
  }
  update(deltaTime) {
    // read scrollWidth or scrollHeight in every frame
    this._bound.end = -this._scrollSize(this.movables);
    switch (this.state) {
      case (STATES.SLIDING):
      case (STATES.IDLE):
        this.slowDown();
        if (this.speed === 0) {
          if (this.overStart) {
            this.switchState(STATES.EASING_TO_START);
          } else if (this.overEnd) {
            this.switchState(STATES.EASING_TO_END);
          } else {
            this.switchState(STATES.IDLE);
          }
        } else {
          // sliding
          this.currentPosition += this.speed * deltaTime;
        }
        break;
      case (STATES.EASING_TO_START):
        this.easeToNextFrame(deltaTime, this._bounceStartPosition);
        break;
      case (STATES.EASING_TO_END):
        this.easeToNextFrame(deltaTime, (this._bounceStartPosition - this._bound.end));
        break;
      case (STATES.SLIDE_TO):
        const distance = this._slideToStartPosition - this._slideToTargetPosition;
        this.slideToNextFrame(deltaTime, distance);
    }
  }
  switchState(state) {
    if (this.state === state) return;
    switch(state) {
      case (STATES.EASING_TO_START):
      case (STATES.EASING_TO_END):
        this._bounceStartPosition = this.currentPosition;
        this._easeElapsed = 0;
        break;
      case (STATES.DRAGGING):
        this.speed = 0;
        break;
      case (STATES.SLIDE_TO):
        this._easeElapsed = 0;
        break;
    }
    this.state = state;
  }
  reactMove() {
    let deltaDistance = this._touchPosition - this._lastTouchPosition;
    if (this.overEnd || this.overStart) {
      deltaDistance = mapDistance(deltaDistance);
    }
    this.currentPosition += deltaDistance;
  }
  slowDown() {
    if (this.friction > 0) {
      this.speed = Math.min(0, this.speed + this.acceleratedSpeed);
    } else {
      this.speed = Math.max(0, this.speed + this.acceleratedSpeed);
    }
  }
  easeToNextFrame(deltaTime, distance) {
    this._easeElapsed += deltaTime;
    this.currentPosition = this._bounceStartPosition - distance * easeCubicOut(this._easeElapsed / EASE_DURATION);
    this.resetOnBouncingEnd();
  }
  slideToNextFrame(deltTime, distance) {
    this._easeElapsed += deltTime;
    this.currentPosition = this._slideToStartPosition - distance * easeCubicOut(this._easeElapsed / EASE_DURATION);
    if (this._easeElapsed > EASE_DURATION) {
      this.speed = 0;
      this.currentPosition = this._slideToTargetPosition;
      this.switchState(STATES.IDLE);
    }
  }
  resetOnBouncingEnd() {
    if (this._easeElapsed > EASE_DURATION) {
      this.currentPosition =
        this.state === STATES.EASING_TO_START ?
          this._bound.start :
          this._bound.end;
      this.speed = 0;
      this.switchState(STATES.IDLE);
    }
  }
  // ========= public area =========
  /**
   * @public
   * @param {number} slideToTargetPosition the same as scrollHeight or scrollWidth of HTMLElement
   */
  slideTo(scrollPosition) {
    const { start, end } = this._bound;
    this._slideToStartPosition = this.currentPosition;
    this._slideToTargetPosition = clamp(end, start)(-scrollPosition);
    this.switchState(STATES.SLIDE_TO);
  }
}