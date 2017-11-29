import 'core-js/modules/es6.math.sign';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.object.assign';
import { Slide } from './slide';

const defaultOptions = {
  horizontal: false,
  excludeNodes: []
};

export function SlideIt(selector, options = {}) {
  const mergeOptions = Object.assign({}, defaultOptions, options);
  if (selector instanceof HTMLElement) {
    return new Slide(selector, mergeOptions);
  }
  if (typeof selector === 'string') {
    /**
     * @type {HTMLElement[]}
     */
    const nodeList = Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    return nodeList.map(node => new Slide(node, mergeOptions));
  }
  throw new Error("does't supported params");
}