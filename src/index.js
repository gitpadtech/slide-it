import { Slide } from './slide';

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