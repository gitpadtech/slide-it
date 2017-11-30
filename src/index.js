import 'core-js/modules/es6.math.sign';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.object.assign';
import { Slide } from './slide';

const defaultOptions = {
  horizontal: false,
  // exclude from scroll
  excludeNodes: [],
  // exclude from scrollWidth caculating
  excludeWidthNodes: [],
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
    const nodes = nodeList.map(node => new Slide(node, mergeOptions));
    return (nodes.length === 1) ? nodes[0] : nodes;
  }
  throw new Error("does't supported params");
}