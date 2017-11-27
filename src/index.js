import { timer } from 'd3-timer';
import { easeCubicOut } from 'd3-ease';

/**
 * @type {number} bouncing animation duration
 */
const BOUNCE_DURATION = 500;

function clamp(min, max) {
  return function(v) {
    return v < min ? min :  v > max ? max : v;
  }
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
}

const clampSpeed = clamp(-3.5, 3.5);

const STATES = {
  DRAGGING: 'DRAGGING',
  BOUNCING_AT_START: 'BOUNCING_AT_START',
  BOUNCING_AT_END: 'BOUNCING_AT_END',
  IDLE: 'IDLE',
  SLIDING: 'SLIDING',
};

class Slide {
  /**
   * @param {HTMLElement} dom 
   */
  constructor(dom, options) {
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
      end: options.horizontal ?  -(dom.scrollWidth - dom.clientWidth)
        : -(dom.scrollHeight - dom.clientHeight)
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
    this.lastTime = this.currentTime =  Date.now();

    this._currentPosition = 0;
    this._currentSpeed = 0;

    timer((() => {
      let lastMoment = 0;
      return elapsed => {
        this.update(elapsed - lastMoment);
        lastMoment = elapsed;
      };
    })());
  }
  get inBound() {
    return this.currentPosition <=0 && this.currentPosition >= this.bound.end;
  }
  get dragAwayFromStart() {
    return this.touchPosition - this.lastTouchPosition < 0;
  }
  get dragAwayFromEnd() {
    return this.touchPosition - this.lastTouchPosition > 0;
  }
  get overStart() {
    return this.currentPosition > 0;
  }
  get overEnd() {
    return this.currentPosition < this.bound.end;
  }
  get exactlyOnStart() {
    return this.currentPosition === 0;
  }
  get exactlyOnEnd() {
    return this.currentPosition === this.bound.end;
  }
  get currentPosition() {
    return this._currentPosition;
  }
  set currentPosition(val) {
    this._currentPosition = val;
    this.movables.forEach((e) => {
      if (this.options.horizontal) {
        e.style.transform = `translate3d(${val}px,0,0)`;
      } else {
        e.style.transform = `translate3d(0,${val}px,0)`;
      }
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
    // three times when not in bound
    const force = this.inBound ? 10 : 30;
    if (this.currentSpeed < 0) {
      return force * 1;
    } else if (this.currentSpeed > 0) {
      return force * -1;
    } else {
      return 0;
    }
  }
  /**
   * @param {Event} e 
   */
  movestart(e) {
    this.switchState(STATES.DRAGGING);
    this.currentSpeed = 0;
    this.lastPosition = this.currentPosition;
    const touchY = this.eventPosition(e);
    this.startTouchPosition = touchY;
    this.currentTime = Date.now();

    if (this.overStart) {
      // infer touch start position
      this.originPosition = this.startTouchPosition - mapDistance.reverse(this.currentPosition);
    } else if (this.overEnd) {
      this.originPosition =
        this.startTouchPosition - mapDistance.reverse(this.currentPosition - this.bound.end);
    }
  }
  /**
   * @param {Event} e 
   */
  moving(e) {
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
        const distance = (this.touchPosition - this.originPosition) / 3;
        this.currentPosition = distance;
      } else if (this.overEnd) {
        const distance = (this.touchPosition - this.originPosition) / 3;
        this.currentPosition = this.bound.end + distance;
      } else {
        // touchmove normally
        this.normalMove(this.touchPosition);
      }
    }
  }
  moveend(e) {
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
          this.offset = this.currentPosition;
        }
        break;
      case (STATES.BOUNCING_AT_START):
        this.bounceElapsed += deltaTime;
        this.currentPosition = this.bounceStartPosition - this.bounceStartPosition * easeCubicOut(this.bounceElapsed / BOUNCE_DURATION);
        this.offset = this.currentPosition;
        this.resetOnBouncingEnd();
        break;
      case (STATES.BOUNCING_AT_END):
        this.bounceElapsed += deltaTime;
        this.currentPosition = this.bounceStartPosition + (this.bound.end - this.bounceStartPosition)
          * easeCubicOut(this.bounceElapsed / BOUNCE_DURATION)
        this.offset = this.currentPosition;
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
  normalMove(position) {
    const moveDistance  = position - this.startTouchPosition;
    this.currentPosition = this.offset + moveDistance;
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
  eventPosition(event) {
    return event instanceof TouchEvent ?
      event.touches[0][this.positionKey] :
      event[this.positionKey];
  }
}

export function SlideIt(selector, { horizontal = false } = {}) {
  if (selector instanceof HTMLElement) {
    return new Slide(selector, {
      horizontal
    });
  }
  if (typeof selector === 'string') {
    /**
     * @type {HTMLElement[]}
     */
    const nodeList = Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    return nodeList.map(node => new Slide(node, {
      horizontal
    }));
  }
  throw new Error("does't supported params");
}