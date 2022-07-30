'use strict';

exports.__esModule = true;

exports.default = function (className) {
  if (_vue2.default.prototype.$isServer) return 0;
  if (scrollBarWidth[className] !== undefined) return scrollBarWidth[className];

  var outer = document.createElement('div');
  outer.className = 'sp-scrollbar__wrap ' + (className || '');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth[className] = widthNoScroll - widthWithScroll;

  return scrollBarWidth[className];
};

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollBarWidth = {};

;