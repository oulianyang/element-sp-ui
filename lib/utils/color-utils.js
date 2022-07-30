'use strict';

exports.__esModule = true;
exports.createColor = createColor;

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createColor(c, n) {
  var colorHsv = (0, _tinycolor2.default)(c).toHsv();
  colorHsv.s = colorHsv.s * 100;
  colorHsv.v = colorHsv.v * 100;

  var s = colorHsv.s,
      v = colorHsv.v;


  colorHsv.v = (v - (v - 30) / 5 * (n - 6)) / 100;
  colorHsv.s = s + (n - 6) * 4;

  return (0, _tinycolor2.default)(colorHsv).toHex();
}