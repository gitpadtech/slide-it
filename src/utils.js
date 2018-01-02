import { timer } from 'd3-timer';

/**
* @param {HTMLElement} dom 
*/
export function resetStyle(dom) {
 if (getComputedStyle(dom).overflow !== 'hidden') {
   dom.style.overflow = 'hidden';
 }
}

export function enableHardwareAcceleration(dom) {
  dom.classList.add('hardware-acceleration');
}

export function updateLoop(update) {
  timer(
    (function() {
      let lastMoment = 0;
      return function (elapsed) {
        update(elapsed - lastMoment);
        lastMoment = elapsed;
      };
    })()
  );
}
/**
 * 
 * @param {HTMLElement} dom 
 * @param {bool} vertical
 * @param {HTMLElement} excludesNodes exclude from calculating scrollWidth
 */
export function maxScroll(dom, horizontal = false, excludeNodes = []) {
  if (horizontal) {
    return function (childList) {
      let scrollWidth = 0;
      childList
        .filter(e => excludeNodes.indexOf(e) === -1)
        .forEach(e => scrollWidth += e.clientWidth);
      scrollWidth -= dom.clientWidth;
      return scrollWidth > dom.clientWidth ? scrollWidth : 0;
    }
  }
  return function () {
    return (dom.scrollHeight - dom.clientHeight);
  }
}

export const transform = (function () {
  const transforms = {
    'webkitTransform':'-webkit-transform',
    'OTransform':'-o-transform',
    'msTransform':'-ms-transform',
    'MozTransform':'-moz-transform',
    'transform':'transform'
  };
  let key = '';

  for (const i in transforms) {
    if (getComputedStyle(document.body)[transforms[i]]) {
      key = i;
    }
  }
  return function (dom, cssText) {
    dom.style[key] = cssText;
  }
})();

export function inViewport(x, y) {
  if (
   x > 0 && x < window.innerWidth - 2 &&
   y > 0 && y < window.innerHeight - 2
  ) {
    return true;
  }
  return false;
}