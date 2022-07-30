import Vue from 'vue';

let scrollBarWidth = {};

export default function(className) {
  if (Vue.prototype.$isServer) return 0;
  if (scrollBarWidth[className] !== undefined) return scrollBarWidth[className];

  const outer = document.createElement('div');
  outer.className = 'sp-scrollbar__wrap ' + (className || '');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth[className] = widthNoScroll - widthWithScroll;

  return scrollBarWidth[className];
};
