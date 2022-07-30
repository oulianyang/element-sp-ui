'use strict';

exports.__esModule = true;
exports.default = throttleByAnimationFrame;
exports.throttleByAnimationFrameDecorator = throttleByAnimationFrameDecorator;

var _getRequestAnimationFrame = require('./getRequestAnimationFrame');

var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reqAnimFrame = (0, _getRequestAnimationFrame2.default)();

function throttleByAnimationFrame(fn) {
  var requestId = void 0;

  var later = function later(args) {
    return function () {
      requestId = null;
      fn.apply(undefined, args);
    };
  };

  var throttled = function throttled() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (requestId == null) {
      requestId = reqAnimFrame(later(args));
    }
  };

  throttled.cancel = function () {
    return (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestId);
  };

  return throttled;
}

function throttleByAnimationFrameDecorator() {
  return function (target, key, descriptor) {
    var fn = descriptor.value;
    var definingProperty = false;
    return {
      configurable: true,
      get: function get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn;
        }

        var boundFn = throttleByAnimationFrame(fn.bind(this));
        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true
        });
        definingProperty = false;
        return boundFn;
      }
    };
  };
}