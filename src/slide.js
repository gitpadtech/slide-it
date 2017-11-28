import { timer } from 'd3-timer';
import { easeCubicOut } from 'd3-ease';
import 'core-js/modules/es6.math.sign';
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
const BOUNCE_DURATION = 600;

// max slide speed === 1.5
const clampSpeed = clamp(-1.5, 1.5);

const STATES = {
  DRAGGING: 0,
  EASING_TO_START: 1,
  EASING_TO_END: 2,
  IDLE: 3,
  SLIDING: 4,
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
    this.movables = Array.prototype.slice.call(dom.children, 0);
    this.movables.forEach(enableHardwareAcceleration);

    this._attachListener();
    this._cache();

    this.bound = {
      start: 0,
      end: -(options.horizontal ? maxScroll(dom, false) : maxScroll(dom))
    };
    this.state = STATES.IDLE;

    this.startTouchPosition = 0;
    this.lastTouchPosition = 0;
    this.touchPosition = 0;
    this.lastPosition = 0;
    this.bounceStartPosition = 0;
    this.bounceElapsed = 0;
    this.mass = 1;
    this.lastFrameMoment = this.frameMoment =  Date.now();
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
  _cache() {
    const { horizontal } = this.options;
    this.eventPosition = (function(key) {
      return function(event) {
        return event.touches[0][key];
      }
    })(horizontal ? 'clientX' : 'clientY');
  }
  get inBound() {
    return this.currentPosition <=0 && this.currentPosition >= this.bound.end;
  }
  get overStart() {
    return this.currentPosition > 0;
  }
  get overEnd() {
    return this.currentPosition < this.bound.end;
  }
  get currentPosition() {
    return this._currentPosition;
  }
  set currentPosition(val) {
    this.lastPosition = this._currentPosition;
    this._currentPosition = val;
    const { horizontal } = this.options
    this.movables.forEach((e) => {
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
    return this.friction / this.mass;
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
    this.speed = 0;
    const touchY = this.eventPosition(e);
    this.startTouchPosition = touchY;
    this.lastTouchPosition = touchY;
    this.touchPosition = touchY;
    this.frameMoment = Date.now();
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

    this.lastTouchPosition = this.touchPosition;
    this.touchPosition = this.eventPosition(e);
    this.lastFrameMoment = this.frameMoment;
    this.frameMoment = Date.now();

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
      this.speed = (this.currentPosition - this.lastPosition) / (this.frameMoment - this.lastFrameMoment);
    }
    this.domNode.removeEventListener('touchend', this.moveend);
  }
  update(deltaTime) {
    switch (this.state) {
      case (STATES.SLIDING):
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
        this.ease(deltaTime, this.bounceStartPosition);
        break;
      case (STATES.EASING_TO_END):
        this.ease(deltaTime, (this.bounceStartPosition - this.bound.end));
        break;
    }
  }
  switchState(state) {
    if (this.state === state) return;
    switch(state) {
      case (STATES.EASING_TO_START):
      case (STATES.EASING_TO_END):
        this.bounceStartPosition = this.currentPosition;
        this.bounceElapsed = 0;
        break;
    }
    this.state = state;
  }
  reactMove() {
    let deltaDistance = this.touchPosition - this.lastTouchPosition;
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
  ease(deltaTime, distance) {
    this.bounceElapsed += deltaTime;
    this.currentPosition = this.bounceStartPosition - distance * easeCubicOut(this.bounceElapsed / BOUNCE_DURATION);
    this.resetOnBouncingEnd();
  }
  resetOnBouncingEnd() {
    if (this.bounceElapsed > BOUNCE_DURATION) {
      this.currentPosition =
        this.state === STATES.EASING_TO_START ?
          this.bound.start :
          this.bound.end;
      this.speed = 0;
      this.switchState(STATES.IDLE);
    }
  }
}