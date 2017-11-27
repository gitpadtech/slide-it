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
  transform
} from './utils';
import './index.css';

/**
 * @type {number} bouncing animation duration
 */
const BOUNCE_DURATION = 500;

// max slide speed === 3.5
const clampSpeed = clamp(-3.5, 3.5);

const STATES = {
  DRAGGING: 0,
  BOUNCING_AT_START: 1,
  BOUNCING_AT_END: 2,
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
     * @type {HTMLElement[]}
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
    this._currentSpeed = 0;
    updateLoop(this.update.bind(this));
    
  }
  _attachListener() {
    const dom = this.domNode;
    this.movestart = this.movestart.bind(this);
    this.moving = this.moving.bind(this);
    this.moveend = this.moveend.bind(this);

    dom.addEventListener('touchstart', this.movestart);
    dom.addEventListener('touchmove', this.moving);
    dom.addEventListener('touchend', this.moveend);
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
    this._currentPosition = val;
    const { horizontal } = this.options
    this.movables.forEach((e) => {
      transform(
        e,
        horizontal ? `translateX(${val}px)` : `translateY(${val}px)`
      );
    });
  }
  get currentSpeed() {
    return this._currentSpeed;
  }
  set currentSpeed(val) {
    this._currentSpeed = clampSpeed(val);
  }
  get acceleratedSpeed() {
    return this.friction / this.mass;
  }
  get friction() {
    // larger when not in bound
    const force = this.inBound ? 8 : 25;
    const direction = -Math.sign(this.currentSpeed);
    return force * direction;
  }
  /**
   * @param {Event} e 
   */
  movestart(e) {
    this.switchState(STATES.DRAGGING);
    this.currentSpeed = 0;
    // this.lastPosition = this.currentPosition;
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
    if (this.state == STATES.DRAGGING) {
      e.preventDefault();
      this.lastPosition = this.currentPosition;
      this.lastTouchPosition = this.touchPosition;
      this.touchPosition = this.eventPosition(e);
      this.lastFrameMoment = this.frameMoment;
      this.frameMoment = Date.now();

      this.reactMove();
    }
  }
  moveend(e) {
    if (this.overStart) {
      this.switchState(STATES.BOUNCING_AT_START);
    } else if (this.overEnd) {
      this.switchState(STATES.BOUNCING_AT_END);
    } else {
      this.switchState(STATES.SLIDING);
      // infer ended speed
      this.currentSpeed = (this.currentPosition - this.lastPosition) / (this.frameMoment - this.lastFrameMoment);
    }
  }
  update(deltaTime) {
    const factor = deltaTime / 1000;
    switch (this.state) {
      case (STATES.SLIDING):
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
        }
        break;
      case (STATES.BOUNCING_AT_START):
        this.bounceElapsed += deltaTime;
        this.currentPosition = this.bounceStartPosition - this.bounceStartPosition * easeCubicOut(this.bounceElapsed / BOUNCE_DURATION);
        this.resetOnBouncingEnd();
        break;
      case (STATES.BOUNCING_AT_END):
        this.bounceElapsed += deltaTime;
        this.currentPosition = this.bounceStartPosition + (this.bound.end - this.bounceStartPosition)
          * easeCubicOut(this.bounceElapsed / BOUNCE_DURATION)
        this.resetOnBouncingEnd();
        break;
    }
  }
  switchState(state) {
    if (this.state === state) return;
    switch(state) {
      case (STATES.BOUNCING_AT_START):
      case (STATES.BOUNCING_AT_END):
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
  resetOnBouncingEnd() {
    if (this.bounceElapsed > BOUNCE_DURATION) {
      this.currentPosition =
        this.state === STATES.BOUNCING_AT_START ?
          this.bound.start :
          this.bound.end;
      this.lastPosition = 0;
      this.currentSpeed = 0;
      this.switchState(STATES.IDLE);
    }
  }
}