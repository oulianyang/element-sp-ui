'use strict';

exports.__esModule = true;

var _locale = require('@fe/element-sp-ui/lib/locale');

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    },
    t2: function t2(path) {
      return (0, _locale.t2)(path);
    }
  }
};