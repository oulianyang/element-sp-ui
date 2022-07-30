module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getI18nSettings */
/* unused harmony export toDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return isDateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return parseQuarterFormatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return parseDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getDayCountOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getDayCountOfYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getFirstDayOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return prevDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return nextDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getStartDateOfMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getWeekNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getRangeHours; });
/* unused harmony export getPrevMonthLastDays */
/* unused harmony export getMonthDays */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getRangeMinutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return modifyDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return modifyTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return modifyWithTimeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clearTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearMilliseconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return limitTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return timeWithinRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeYearMonthAndClampDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return prevMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return nextMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return prevYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return nextYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return extractDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return extractTimeFormat; });
/* unused harmony export validateRangeInOneMonth */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return transformMinDateMaxDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return megerRangeDate; });
/* harmony import */ var _fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__);



var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

var newArray = function newArray(start, end) {
  var result = [];
  for (var i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

var getI18nSettings = function getI18nSettings() {
  return {
    dayNamesShort: weeks.map(function (week) {
      return Object(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    dayNames: weeks.map(function (week) {
      return Object(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    monthNamesShort: months.map(function (month) {
      return Object(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.months.' + month);
    }),
    monthNames: months.map(function (month, index) {
      return Object(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.month' + (index + 1));
    }),
    amPm: ['am', 'pm']
  };
};

var toDate = function toDate(date) {
  return isDate(date) ? new Date(date) : null;
};

var isDate = function isDate(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
};

var isDateObject = function isDateObject(val) {
  return val instanceof Date;
};

var formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  // 添加季度支持
  if (/qq/i.test(format)) {
    var quarter = Math.ceil((date.getMonth() + 1) / 3);
    format = format.replace(/(q)\1/gi, '$1' + quarter);
  }
  return _fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format || 'yyyy-MM-dd', getI18nSettings());
};

var parseQuarterFormatDate = function parseQuarterFormatDate(string) {
  var qs = string.match(/q[1-4]/gi);
  if (qs) {
    for (var _iterator = qs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var q = _ref;

      var month = String((q.substring(1) - 1) * 3 + 1).padStart(2, 0);
      string = string.replace(new RegExp(q, 'g'), month);
    }
  }
  return string;
};

var parseDate = function parseDate(string, format) {
  // 添加季度支持
  var qs = string.match(/q[1-4]/gi);
  if (qs) {
    for (var _iterator2 = qs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var q = _ref2;

      var month = String((q.substring(1) - 1) * 3 + 1).padStart(2, 0);
      string = string.replace(new RegExp(q, 'g'), month);
    }
  }
  if (/qq/i.test(format)) {
    format = format.replace(/qq/gi, 'MM');
  }
  return _fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(string, format || 'yyyy-MM-dd', getI18nSettings());
};

var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

var getDayCountOfYear = function getDayCountOfYear(year) {
  var isLeapYear = year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
  return isLeapYear ? 366 : 365;
};

var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
// {prev, next} Date should work for Daylight Saving Time
// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
var prevDate = function prevDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
};

var nextDate = function nextDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

var getStartDateOfMonth = function getStartDateOfMonth(year, month) {
  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
};

var getWeekNumber = function getWeekNumber(src) {
  if (!isDate(src)) return null;
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

var getRangeHours = function getRangeHours(ranges) {
  var hours = [];
  var disabledHours = [];

  (ranges || []).forEach(function (range) {
    var value = range.map(function (date) {
      return date.getHours();
    });

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (var _i3 = 0; _i3 < 24; _i3++) {
      hours[_i3] = false;
    }
  }

  return hours;
};

var getPrevMonthLastDays = function getPrevMonthLastDays(date, amount) {
  if (amount <= 0) return [];
  var temp = new Date(date.getTime());
  temp.setDate(0);
  var lastDay = temp.getDate();
  return range(amount).map(function (_, index) {
    return lastDay - (amount - index - 1);
  });
};

var getMonthDays = function getMonthDays(date) {
  var temp = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var days = temp.getDate();
  return range(days).map(function (_, index) {
    return index + 1;
  });
};

function setRangeData(arr, start, end, value) {
  for (var i = start; i < end; i++) {
    arr[i] = value;
  }
}

var getRangeMinutes = function getRangeMinutes(ranges, hour) {
  var minutes = new Array(60);

  if (ranges.length > 0) {
    ranges.forEach(function (range) {
      var start = range[0];
      var end = range[1];
      var startHour = start.getHours();
      var startMinute = start.getMinutes();
      var endHour = end.getHours();
      var endMinute = end.getMinutes();
      if (startHour === hour && endHour !== hour) {
        setRangeData(minutes, startMinute, 60, true);
      } else if (startHour === hour && endHour === hour) {
        setRangeData(minutes, startMinute, endMinute + 1, true);
      } else if (startHour !== hour && endHour === hour) {
        setRangeData(minutes, 0, endMinute + 1, true);
      } else if (startHour < hour && endHour > hour) {
        setRangeData(minutes, 0, 60, true);
      }
    });
  } else {
    setRangeData(minutes, 0, 60, true);
  }
  return minutes;
};

var range = function range(n) {
  // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  return Array.apply(null, { length: n }).map(function (_, n) {
    return n;
  });
};

var modifyDate = function modifyDate(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

var modifyTime = function modifyTime(date, h, m, s) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds());
};

var modifyWithTimeString = function modifyWithTimeString(date, time) {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, 'HH:mm:ss');
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
};

var clearTime = function clearTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

var clearMilliseconds = function clearMilliseconds(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
};

var limitTimeRange = function limitTimeRange(date, ranges) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HH:mm:ss';

  // TODO: refactory a more elegant solution
  if (ranges.length === 0) return date;
  var normalizeDate = function normalizeDate(date) {
    return _fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(_fe_element_sp_ui_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format), format);
  };
  var ndate = normalizeDate(date);
  var nranges = ranges.map(function (range) {
    return range.map(normalizeDate);
  });
  if (nranges.some(function (nrange) {
    return ndate >= nrange[0] && ndate <= nrange[1];
  })) return date;

  var minDate = nranges[0][0];
  var maxDate = nranges[0][0];

  nranges.forEach(function (nrange) {
    minDate = new Date(Math.min(nrange[0], minDate));
    maxDate = new Date(Math.max(nrange[1], minDate));
  });

  var ret = ndate < minDate ? minDate : maxDate;
  // preserve Year/Month/Date
  return modifyDate(ret, date.getFullYear(), date.getMonth(), date.getDate());
};

var timeWithinRange = function timeWithinRange(date, selectableRange, format) {
  var limitedDate = limitTimeRange(date, selectableRange, format);
  return limitedDate.getTime() === date.getTime();
};

var changeYearMonthAndClampDate = function changeYearMonthAndClampDate(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  var monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

var prevMonth = function prevMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 0 ? changeYearMonthAndClampDate(date, year - 1, 11) : changeYearMonthAndClampDate(date, year, month - 1);
};

var nextMonth = function nextMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 11 ? changeYearMonthAndClampDate(date, year + 1, 0) : changeYearMonthAndClampDate(date, year, month + 1);
};

var prevYear = function prevYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};

var nextYear = function nextYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};

var extractDateFormat = function extractDateFormat(format) {
  return format.replace(/\W?m{1,2}|\W?ZZ/g, '').replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '').trim();
};

var extractTimeFormat = function extractTimeFormat(format) {
  return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '').trim();
};

var validateRangeInOneMonth = function validateRangeInOneMonth(start, end) {
  return start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
};

var transformMinDateMaxDate = function transformMinDateMaxDate(dateRange) {
  if (Array.isArray(dateRange)) {
    var minDate = dateRange[0],
        maxDate = dateRange[1];

    if (isDate(minDate) && isDate(maxDate)) {
      if (minDate.getTime() > maxDate.getTime()) {
        return [maxDate, minDate];
      } else {
        return dateRange;
      }
    } else {
      return null;
    }
  }
};

var megerRangeDate = function megerRangeDate(dateRange1, dateRange2) {
  if (isDate(dateRange2[0]) && isDate(dateRange2[1])) {
    return transformMinDateMaxDate(dateRange2);
  } else if (isDate(dateRange2[0])) {
    return transformMinDateMaxDate([dateRange2[0], dateRange1[1]]);
  } else if (isDate(dateRange2[1])) {
    return transformMinDateMaxDate([dateRange1[0], dateRange2[1]]);
  } else {
    return dateRange1;
  }
};

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/locale");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/locale");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/vue-popper");

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_0__["t"].apply(this, args);
    },
    t2: function t2(path) {
      return Object(_fe_element_sp_ui_src_locale__WEBPACK_IMPORTED_MODULE_0__["t2"])(path);
    }
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/types");

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/button");

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/clickoutside");

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/date");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* unused harmony export hasOwn */
/* unused harmony export toObject */
/* unused harmony export getValueByPath */
/* unused harmony export getPropByPath */
/* unused harmony export generateId */
/* unused harmony export valueEquals */
/* unused harmony export escapeRegexpString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return arrayFindIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return arrayFind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return coerceTruthyValueToArray; });
/* unused harmony export isIE */
/* unused harmony export isEdge */
/* unused harmony export isFirefox */
/* unused harmony export autoprefixer */
/* unused harmony export kebabCase */
/* unused harmony export capitalize */
/* unused harmony export looseEqual */
/* unused harmony export arrayEquals */
/* unused harmony export isEqual */
/* unused harmony export isEmpty */
/* unused harmony export rafThrottle */
/* unused harmony export objToArray */
/* unused harmony export easeInOutCubic */
/* unused harmony export requestAnimationEaseInOut */
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

var escapeRegexpString = function escapeRegexpString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

// TODO: use native Array.find, Array.findIndex when IE support is dropped
var arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

var arrayFind = function arrayFind(arr, pred) {
  var idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

// coerce truthy value to array
var coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

var isIE = function isIE() {
  return !vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$isServer && !isNaN(Number(document.documentMode));
};

var isEdge = function isEdge() {
  return !vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

var isFirefox = function isFirefox() {
  return !vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};

var autoprefixer = function autoprefixer(style) {
  if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') return style;
  var rules = ['transform', 'transition', 'animation'];
  var prefixes = ['ms-', 'webkit-'];
  rules.forEach(function (rule) {
    var value = style[rule];
    if (rule && value) {
      prefixes.forEach(function (prefix) {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

var kebabCase = function kebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};

var capitalize = function capitalize(str) {
  if (!Object(_fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1__["isString"])(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var looseEqual = function looseEqual(a, b) {
  var isObjectA = Object(_fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1__["isObject"])(a);
  var isObjectB = Object(_fe_element_sp_ui_src_utils_types__WEBPACK_IMPORTED_MODULE_1__["isObject"])(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};

var arrayEquals = function arrayEquals(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (var i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

var isEqual = function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};

var isEmpty = function isEmpty(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      {
        return !val.size;
      }
    // Plain Object
    case '[object Object]':
      {
        return !Object.keys(val).length;
      }
  }

  return false;
};

function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function (_) {
      fn.apply(_this, args);
      locked = false;
    });
  };
}

function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return isEmpty(obj) ? [] : [obj];
}

function easeInOutCubic(value) {
  return value < 0.5 ? Math.pow(value * 2, 3) / 2 : 1 - Math.pow((1 - value) * 2, 3) / 2;
}

function requestAnimationEaseInOut(fn) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  var beginTime = Date.now();
  var rAF = window.requestAnimationFrame || function (func) {
    return setTimeout(func, 16);
  };
  var frameFunc = function frameFunc() {
    var progress = (Date.now() - beginTime) / duration;
    if (progress < 1) {
      fn(1 - easeInOutCubic(progress));
      rAF(frameFunc);
    } else {
      fn(0);
    }
  };
  rAF(frameFunc);
}

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export on */
/* unused harmony export off */
/* unused harmony export once */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasClass; });
/* unused harmony export addClass */
/* unused harmony export removeClass */
/* unused harmony export getStyle */
/* unused harmony export setStyle */
/* unused harmony export isScroll */
/* unused harmony export getScrollContainer */
/* unused harmony export isInContainer */
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* istanbul ignore next */



var isServer = vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass));
  }
};

/* istanbul ignore next */
var getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

var isScroll = function isScroll(el, vertical) {
  if (isServer) return;

  var determinedDirection = vertical !== null && vertical !== undefined;
  var overflow = determinedDirection ? vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x') : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto|overlay)/);
};

var getScrollContainer = function getScrollContainer(el, vertical) {
  if (isServer) return;

  var parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};

var isInContainer = function isInContainer(el, container) {
  if (isServer || !el || !container) return false;

  var elRect = el.getBoundingClientRect();
  var containerRect = void 0;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/month-table.vue?vue&type=template&id=0f839cfb&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      staticClass: "sp-month-table",
      on: { click: _vm.handleMonthTableClick, mousemove: _vm.handleMouseMove }
    },
    [
      _c(
        "tbody",
        _vm._l(_vm.rows, function(row, key) {
          return _c(
            "tr",
            { key: key },
            _vm._l(row, function(cell, key) {
              return _c("td", { key: key, class: _vm.getCellStyle(cell) }, [
                _c("div", [
                  _c("a", { staticClass: "cell" }, [
                    _vm._v(
                      _vm._s(
                        _vm.t("el.datepicker.months." + _vm.months[cell.text])
                      )
                    )
                  ])
                ])
              ])
            }),
            0
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue?vue&type=template&id=0f839cfb&

// EXTERNAL MODULE: ./src/mixins/locale.js
var locale = __webpack_require__(16);

// EXTERNAL MODULE: ./src/utils/date-util.js
var date_util = __webpack_require__(1);

// EXTERNAL MODULE: ./src/utils/dom.js
var dom = __webpack_require__(39);

// EXTERNAL MODULE: ./src/utils/util.js
var util = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/month-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var month_tablevue_type_script_lang_js_datesInMonth = function datesInMonth(year, month) {
  var numOfDays = Object(date_util["g" /* getDayCountOfMonth */])(year, month);
  var firstDay = new Date(year, month, 1);
  return Object(date_util["C" /* range */])(numOfDays).map(function (n) {
    return Object(date_util["u" /* nextDate */])(firstDay, n);
  });
};

var clearDate = function clearDate(date) {
  return new Date(date.getFullYear(), date.getMonth());
};

var getMonthTimestamp = function getMonthTimestamp(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};
/* harmony default export */ var month_tablevue_type_script_lang_js_ = ({
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: 'month'
    },
    minDate: {},

    maxDate: {},
    defaultValue: {
      validator: function validator(val) {
        // null or valid Date Object
        return val === null || Object(date_util["n" /* isDate */])(val) || Array.isArray(val) && val.every(date_util["n" /* isDate */]);
      }
    },
    date: {},
    rangeState: {
      default: function _default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  mixins: [locale["a" /* default */]],

  watch: {
    'rangeState.endDate': function rangeStateEndDate(newVal) {
      this.markRange(this.minDate, newVal);
    },
    minDate: function minDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
    maxDate: function maxDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },

  data: function data() {
    return {
      months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      tableRows: [[], [], [], []],
      lastRow: null,
      lastColumn: null
    };
  },


  methods: {
    cellMatchesDate: function cellMatchesDate(cell, date) {
      var value = new Date(date);
      return this.date.getFullYear() === value.getFullYear() && Number(cell.text) === value.getMonth();
    },
    getCellStyle: function getCellStyle(cell) {
      var _this = this;

      var style = {};
      var year = this.date.getFullYear();
      var today = new Date();
      var month = cell.text;
      var defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
      style.disabled = typeof this.disabledDate === 'function' ? month_tablevue_type_script_lang_js_datesInMonth(year, month).every(this.disabledDate) : false;
      style.current = Object(util["b" /* arrayFindIndex */])(Object(util["c" /* coerceTruthyValueToArray */])(this.value), function (date) {
        if (typeof date === 'string') {
          date = new Date(Object(date_util["y" /* parseQuarterFormatDate */])(date));
        }
        return date.getFullYear() === year && date.getMonth() === month;
      }) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
      style.default = defaultValue.some(function (date) {
        return _this.cellMatchesDate(cell, date);
      });

      if (cell.inRange) {
        style['in-range'] = true;

        if (cell.start) {
          style['start-date'] = true;
        }

        if (cell.end) {
          style['end-date'] = true;
        }
      }
      return style;
    },
    getMonthOfCell: function getMonthOfCell(month) {
      var year = this.date.getFullYear();
      return new Date(year, month, 1);
    },
    markRange: function markRange(minDate, maxDate) {
      minDate = getMonthTimestamp(minDate);
      maxDate = getMonthTimestamp(maxDate) || minDate;
      var _ref = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      minDate = _ref[0];
      maxDate = _ref[1];

      var rows = this.rows;
      for (var i = 0, k = rows.length; i < k; i++) {
        var row = rows[i];
        for (var j = 0, l = row.length; j < l; j++) {

          var cell = row[j];
          var index = i * 3 + j;
          var time = new Date(this.date.getFullYear(), index).getTime();

          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove: function handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      var target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;

      var row = target.parentNode.rowIndex;
      var column = target.cellIndex;
      // can not select disabled date
      if (this.rows[row][column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getMonthOfCell(row * 3 + column)
          }
        });
      }
    },
    handleMonthTableClick: function handleMonthTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      if (Object(dom["a" /* hasClass */])(target, 'disabled')) return;
      var column = target.cellIndex;
      var row = target.parentNode.rowIndex;
      var month = row * 3 + column;
      var newDate = this.getMonthOfCell(month);
      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else {
        this.$emit('pick', month);
      }
    }
  },

  computed: {
    rows: function rows() {
      var _this2 = this;

      // TODO: refactory rows / getCellClasses
      var rows = this.tableRows;
      var disabledDate = this.disabledDate;
      var selectedDate = [];
      var now = getMonthTimestamp(new Date());

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        var _loop = function _loop(j) {
          var cell = row[j];
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
          }

          cell.type = 'normal';

          var index = i * 3 + j;
          var time = new Date(_this2.date.getFullYear(), index).getTime();
          cell.inRange = time >= getMonthTimestamp(_this2.minDate) && time <= getMonthTimestamp(_this2.maxDate);
          cell.start = _this2.minDate && time === getMonthTimestamp(_this2.minDate);
          cell.end = _this2.maxDate && time === getMonthTimestamp(_this2.maxDate);
          var isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          var cellDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = Object(util["a" /* arrayFind */])(selectedDate, function (date) {
            return date.getTime() === cellDate.getTime();
          });

          _this2.$set(row, j, cell);
        };

        for (var j = 0; j < 3; j++) {
          _loop(j);
        }
      }
      return rows;
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_month_tablevue_type_script_lang_js_ = (month_tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  basic_month_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var month_table = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/button-group");

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/year-table.vue?vue&type=template&id=2b9a8bb1&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    { staticClass: "sp-year-table", on: { click: _vm.handleYearTableClick } },
    [
      _c("tbody", [
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 0)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 0))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 1)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 1))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 2)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 2))
              ])
            ]
          )
        ]),
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 3)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 3))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 4)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 4))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 5)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 5))
              ])
            ]
          )
        ]),
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 6)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 6))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 7)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 7))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 8)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 8))
              ])
            ]
          )
        ]),
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 9)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 9))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 10)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 10))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 11)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 11))
              ])
            ]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue?vue&type=template&id=2b9a8bb1&

// EXTERNAL MODULE: ./src/utils/dom.js
var dom = __webpack_require__(39);

// EXTERNAL MODULE: ./src/utils/date-util.js
var date_util = __webpack_require__(1);

// EXTERNAL MODULE: ./src/utils/util.js
var util = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/year-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var year_tablevue_type_script_lang_js_datesInYear = function datesInYear(year) {
  var numOfDays = Object(date_util["h" /* getDayCountOfYear */])(year);
  var firstDay = new Date(year, 0, 1);
  return Object(date_util["C" /* range */])(numOfDays).map(function (n) {
    return Object(date_util["u" /* nextDate */])(firstDay, n);
  });
};

/* harmony default export */ var year_tablevue_type_script_lang_js_ = ({
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator: function validator(val) {
        // null or valid Date Object
        return val === null || val instanceof Date && Object(date_util["n" /* isDate */])(val);
      }
    },
    date: {},
    customerDate: {}
  },

  computed: {
    startYear: function startYear() {
      if (this.customerDate) {
        return this.customerDate.getFullYear();
      } else {
        return Math.floor(this.date.getFullYear() / 10) * 10;
      }
    }
  },

  methods: {
    getCellStyle: function getCellStyle(year) {
      var style = {};
      var today = new Date();

      style.disabled = typeof this.disabledDate === 'function' ? year_tablevue_type_script_lang_js_datesInYear(year).every(this.disabledDate) : false;
      style.current = Object(util["b" /* arrayFindIndex */])(Object(util["c" /* coerceTruthyValueToArray */])(this.value), function (date) {
        if (typeof date === 'string') {
          date = new Date(Object(date_util["y" /* parseQuarterFormatDate */])(date));
        }
        return date.getFullYear() === year;
      }) >= 0;
      style.today = today.getFullYear() === year;
      style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

      return style;
    },
    handleYearTableClick: function handleYearTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        if (Object(dom["a" /* hasClass */])(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.$emit('pick', Number(year));
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_year_tablevue_type_script_lang_js_ = (year_tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  basic_year_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var year_table = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/select");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/option");

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/date-util");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("lodash/isNil");

/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(28);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(11);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/select"
var select_ = __webpack_require__(55);
var select_default = /*#__PURE__*/__webpack_require__.n(select_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/button"
var button_ = __webpack_require__(20);
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/button-group"
var button_group_ = __webpack_require__(53);
var button_group_default = /*#__PURE__*/__webpack_require__.n(button_group_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/option"
var option_ = __webpack_require__(56);
var option_default = /*#__PURE__*/__webpack_require__.n(option_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(8);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(5);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(17);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/month-table.vue + 4 modules
var month_table = __webpack_require__(44);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/year-table.vue + 4 modules
var year_table = __webpack_require__(54);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/header/YearTableHead.vue?vue&type=template&id=147a7563&
var YearTableHeadvue_type_template_id_147a7563_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sp-date-picker__header" }, [
    _c("button", {
      staticClass:
        "sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-doubleleft",
      attrs: { type: "button", "aria-label": _vm.t("el.datepicker.prevYear") },
      on: { click: _vm.prevYear }
    }),
    _c("span", { staticClass: "sp-date-picker__header-center" }, [
      _c(
        "span",
        {
          staticClass: "sp-date-picker__header-label",
          attrs: { role: "button" }
        },
        [_vm._v(_vm._s(_vm.yearLabel))]
      )
    ]),
    _c("button", {
      staticClass:
        "sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-doubleright",
      attrs: { type: "button", "aria-label": _vm.t("el.datepicker.nextYear") },
      on: { click: _vm.nextYear }
    })
  ])
}
var staticRenderFns = []
YearTableHeadvue_type_template_id_147a7563_render._withStripped = true


// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearTableHead.vue?vue&type=template&id=147a7563&

// EXTERNAL MODULE: ./src/mixins/locale.js
var mixins_locale = __webpack_require__(16);

// EXTERNAL MODULE: ./src/utils/date-util.js
var date_util = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/header/YearTableHead.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var YearTableHeadvue_type_script_lang_js_ = ({
  props: {
    date: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    }
  },
  mixins: [mixins_locale["a" /* default */]],
  computed: {
    year: function year() {
      return this.date.getFullYear();
    },
    yearLabel: function yearLabel() {
      var yearTranslation = this.t('el.datepicker.year');
      var startYear = Math.floor(this.year / 10) * 10;
      if (yearTranslation) {
        return startYear + yearTranslation + ' - ' + (startYear + 11) + yearTranslation;
      }
      return startYear + ' - ' + (startYear + 11);
    }
  },
  methods: {
    prevYear: function prevYear() {
      this.$emit('preYear', Object(date_util["B" /* prevYear */])(this.date, 10));
    },
    nextYear: function nextYear() {
      this.$emit('nextYear', Object(date_util["w" /* nextYear */])(this.date, 10));
    }
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearTableHead.vue?vue&type=script&lang=js&
 /* harmony default export */ var header_YearTableHeadvue_type_script_lang_js_ = (YearTableHeadvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearTableHead.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  header_YearTableHeadvue_type_script_lang_js_,
  YearTableHeadvue_type_template_id_147a7563_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var YearTableHead = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/header/YearMonthPanel.vue?vue&type=script&lang=js&








/* harmony default export */ var YearMonthPanelvue_type_script_lang_js_ = ({
  component: {
    MonthTable: month_table["a" /* default */],
    YearTable: year_table["a" /* default */],
    Button: button_default.a,
    ButtonGroup: button_group_default.a,
    YearTableHead: YearTableHead
  },
  mixins: [locale_default.a],
  props: {
    prefixCls: String,
    fullscreen: {
      type: Boolean
    },
    yearSelectOffset: {
      type: Number,
      default: 10
    },
    yearSelectTotal: {
      type: Number,
      default: 20
    },
    type: {
      type: String
    },
    // onValueChange: PropTypes.(value: moment.Moment) => void,
    // onTypeChange: PropTypes.(type: string) => void,
    value: {},
    validRange: {
      type: Array
    },
    headerRender: {
      tyep: Function
    },
    headerRenderType: {
      type: String
    }
  },
  data: function data() {
    return {
      valueTemp: this.value ? this.value._d : new Date(),
      date: this.value ? this.value._d : new Date(),
      visiable: false,
      viewType: 'month'
    };
  },

  computed: {
    offsetValue: function offsetValue() {
      var date = new Date(this.valueTemp);
      date.setFullYear(date.getFullYear() - 4);
      return date;
    }
  },
  methods: {
    setViewType: function setViewType(type) {
      this.viewType = type;
    },
    setValue: function setValue(value) {
      this.valueTemp = value;
      this.date = value;
    },
    handlePickMonth: function handlePickMonth(month) {
      this.$emit('pick', {
        type: 'month',
        value: month
      });
    },
    handlePickYear: function handlePickYear(year) {
      this.$emit('pick', {
        type: 'year',
        value: year
      });
    },
    changeDate: function changeDate(date) {
      this.date = date;
    }
  },
  render: function render() {
    var h = arguments[0];
    var viewType = this.viewType,
        visiable = this.visiable;

    return h(
      'div',
      { 'class': {
          'sp-a-fullcalendar--popperpanel': true,
          'is-hide': !visiable,
          'sp-popper': true
        } },
      [visiable ? viewType === 'month' ? h(month_table["a" /* default */], {
        props: {
          defaultValue: null,
          date: this.valueTemp,
          value: this.valueTemp
        },
        on: {
          'pick': this.handlePickMonth
        }
      }) : h('div', [h(YearTableHead, external_babel_helper_vue_jsx_merge_props_default()([{
        on: {
          'preYear': this.changeDate,
          'nextYear': this.changeDate
        }
      }, {
        attrs: { date: this.date }
      }])), h(year_table["a" /* default */], {
        props: {
          defaultValue: null,
          // customerDate: this.offsetValue,
          value: this.valueTemp,
          date: this.date
        },
        on: {
          'pick': this.handlePickYear
        }
      })]) : null]
    );
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearMonthPanel.vue?vue&type=script&lang=js&
 /* harmony default export */ var header_YearMonthPanelvue_type_script_lang_js_ = (YearMonthPanelvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearMonthPanel.vue
var YearMonthPanel_render, YearMonthPanel_staticRenderFns




/* normalize component */

var YearMonthPanel_component = Object(componentNormalizer["a" /* default */])(
  header_YearMonthPanelvue_type_script_lang_js_,
  YearMonthPanel_render,
  YearMonthPanel_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var YearMonthPanel = (YearMonthPanel_component.exports);
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/date-util"
var date_util_ = __webpack_require__(64);

// CONCATENATED MODULE: ./packages/a-calendar/src/header/YearMonthPanelMixin.js


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/* harmony default export */ var YearMonthPanelMixin = ({
  component: {
    YearMonthPanel: YearMonthPanel
  },
  data: function data() {
    return {
      popperVisable: false,
      popperPanelType: 'month'
    };
  },

  watch: {
    popperVisable: function popperVisable(val) {
      if (val) {
        this.showPanel();
      } else {
        this.hidenPanel();
      }
    },
    value: function value(_value) {
      if (_value && _value._d) {
        this.updatePopperPanelValue(_value._d);
      }
    }
  },
  methods: {
    popperPrevMonth: function popperPrevMonth() {
      this.popperChangeMonth(Object(date_util_["prevMonth"])(this.value._d));
    },
    popperNextMonth: function popperNextMonth() {
      this.popperChangeMonth(Object(date_util_["nextMonth"])(this.value._d));
    },
    popperPrevYear: function popperPrevYear() {
      this.popperChangeYear(Object(date_util_["prevYear"])(this.value._d, 10));
    },
    popperNextYear: function popperNextYear() {
      this.popperChangeYear(Object(date_util_["nextYear"])(this.value._d, 10));
    },
    popperChangeMonth: function popperChangeMonth(date) {
      this.onMonthChange(date.getMonth());
      // this.updatePopperPanelValue(date);
    },
    popperChangeYear: function popperChangeYear(date) {
      this.onYearChange(date.getFullYear());
      // this.updatePopperPanelValue(date);
    },
    updatePopperPanelValue: function updatePopperPanelValue(date) {
      if (Object(external_lodash_["get"])(this, 'panelPopTable.$refs.panel')) {
        this.panelPopTable.$refs.panel.setValue(date);
      }
    },
    popperOutsideClick: function popperOutsideClick() {
      this.popperVisable = false;
    },
    popperSwitch: function popperSwitch(type) {
      if (type === 'year') {
        this.referenceElm = this.$refs.referenceYear;
      } else {
        this.referenceElm = this.$refs.referenceMonth;
      }
      if (this.popperPanelType === type) {
        this.popperVisable = !this.popperVisable;
        this.doDestroy(true);
      } else {
        this.doDestroy(true);
        this.popperPanelType = type;
        this.popperVisable = true;
        this.showPanel();
      }
    },
    showPanel: function showPanel() {
      var _this2 = this;

      var type = this.popperPanelType;
      var panelPromis = this.popperElm ? Promise.resolve() : this.createYearMonthPopperPanel();
      panelPromis.then(function () {
        _this2.panelPopTable.$refs.panel.setViewType(type);
        _this2.panelPopTable.$refs.panel.visiable = true;
        _this2.$nextTick(function () {
          _this2.updatePopper();
        });
      });
    },
    hidenPanel: function hidenPanel() {
      if (this.panelPopTable) {
        this.panelPopTable.$refs.panel.visiable = false;
        this.destroyPopper();
      }
    },
    onPopperPick: function onPopperPick(_ref) {
      var type = _ref.type,
          value = _ref.value;

      var newValue = this.value.clone();
      if (type === 'year') {
        newValue.year(value);
        this.popperChangeYear(newValue._d);
      } else {
        newValue.month(value);
        this.popperChangeMonth(newValue._d);
      }

      this.popperVisable = false;
    },
    getPanelHeader: function getPanelHeader() {
      var _this3 = this;

      var h = this.$createElement;

      // 这里的样式需要需要重写，目前引用的日期组件的样式, 按需加载有问题
      return h(
        'div',
        { 'class': this.prefixCls + '--header' },
        [h('button', external_babel_helper_vue_jsx_merge_props_default()([{
          on: {
            click: this.popperPrevYear
          }
        }, {
          attrs: { type: 'button' },
          'class': 'sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-doubleleft' }])), h('button', external_babel_helper_vue_jsx_merge_props_default()([{
          on: {
            click: this.popperPrevMonth
          }
        }, {
          attrs: {
            type: 'button'
          },
          'class': 'sp-picker-panel__icon-btn sp-date-picker__prev-btn sp-icon-left' }])), h(
          'span',
          external_babel_helper_vue_jsx_merge_props_default()([{
            directives: [{
              name: 'clickoutside',
              value: this.popperOutsideClick
            }]
          }, {
            'class': 'sp-date-picker__header-center' }]),
          [h(
            'span',
            external_babel_helper_vue_jsx_merge_props_default()([{
              ref: 'referenceYear'
            }, {
              on: {
                click: function click() {
                  _this3.popperSwitch('year');
                }
              }
            }, {
              'class': 'sp-date-picker__header-label' }]),
            [this.value.year() + this.t('el.acalendar.year')]
          ), h(
            'span',
            external_babel_helper_vue_jsx_merge_props_default()([{
              ref: 'referenceMonth'
            }, {
              on: {
                click: function click() {
                  _this3.popperSwitch('month');
                }
              }
            }, {
              'class': 'sp-date-picker__header-label' }]),
            [this.value.month() + 1 + this.t('el.acalendar.month')]
          )]
        ), h('button', external_babel_helper_vue_jsx_merge_props_default()([{
          on: {
            click: this.popperNextMonth
          }
        }, {
          attrs: {
            type: 'button'
          },
          'class': 'sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-right' }])), h('button', external_babel_helper_vue_jsx_merge_props_default()([{
          on: {
            click: this.popperNextYear
          }
        }, {
          attrs: {
            type: 'button'
          },
          'class': 'sp-picker-panel__icon-btn sp-date-picker__next-btn sp-icon-doubleright' }]))]
      );
    },
    createYearMonthPopperPanel: function createYearMonthPopperPanel() {
      var _this4 = this;

      var h = this.$createElement;

      var panelTablePromise = new Promise(function (resolve) {
        var _this = _this4;
        new external_vue_default.a({
          mounted: function mounted() {
            resolve(this);
          },
          render: function render() {
            var h = arguments[0];

            return h(YearMonthPanel, {
              props: _extends({}, _this.$props),
              scopedSlots: this.$scopedSlots,
              ref: 'panel'
            });
          }
        }).$mount();
      });
      return panelTablePromise.then(function (panelTable) {
        _this4.panelPopTable = panelTable;
        _this4.panelPopTable.$refs.panel.$on('pick', _this4.onPopperPick);
        _this4.popperElm = panelTable.$el;
      });
    },
    destoryYearMonthPopperPanel: function destoryYearMonthPopperPanel() {
      if (this.panelPopTable) {
        this.panelPopTable.$destroy();
        this.panelPopTable.$off();
        this.panelPopTable.$el.remove();
        this.panelPopTable = null;
      }
    }
  }
});
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(22);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/header/header.vue?vue&type=script&lang=js&


var _name$props$component;

/* eslint-disable */









/* harmony default export */ var headervue_type_script_lang_js_ = (_name$props$component = {
  name: "ElACalendarHeader",
  props: {
    prefixCls: String,
    fullscreen: {
      type: Boolean
    },
    yearSelectOffset: {
      type: Number,
      default: 10
    },
    yearSelectTotal: {
      type: Number,
      default: 20
    },
    type: {
      type: String
    },
    // onValueChange: PropTypes.(value: moment.Moment) => void,
    // onTypeChange: PropTypes.(type: string) => void,
    value: {},
    validRange: {
      type: Array
    },
    headerRender: {
      tyep: Function
    },
    headerRenderType: {
      type: String
    },
    visibleArrow: {
      default: true
    },
    arrowOffset: {
      default: 0
    }
  },
  components: {
    Select: select_default.a,
    Button: button_default.a,
    ButtonGroup: button_group_default.a,
    Option: option_default.a
  },
  mixins: [locale_default.a, vue_popper_default.a, YearMonthPanelMixin],
  directives: {
    Clickoutside: clickoutside_default.a
  },
  data: function data() {
    return {};
  },

  computed: {},
  watch: {},
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    getYearSelectElement: function getYearSelectElement(year) {
      var h = this.$createElement;
      var yearSelectOffset = this.yearSelectOffset,
          yearSelectTotal = this.yearSelectTotal,
          fullscreen = this.fullscreen,
          validRange = this.validRange;

      var start = year - yearSelectOffset;
      var end = start + yearSelectTotal;
      if (validRange) {
        start = validRange[0].get("year");
        end = validRange[1].get("year") + 1;
      }
      var suffix = this.t("el.acalendar.year");

      var options = [];
      for (var index = start; index < end; index++) {
        options.push(h(option_default.a, external_babel_helper_vue_jsx_merge_props_default()([{
          key: "" + index
        }, {
          props: {
            value: String(index),
            label: "" + index + suffix
          }
        }])));
      }
      return h(
        select_default.a,
        {
          style: { width: "70px" },
          attrs: { size: fullscreen ? "default" : "small",

            value: String(year)
          },
          "class": this.prefixCls + "-year-select",
          on: {
            "change": this.onYearChange
          }
        },
        [options]
      );
    },
    getMonthSelectElement: function getMonthSelectElement(month) {
      var _this = this;

      var h = this.$createElement;
      var fullscreen = this.fullscreen,
          validRange = this.validRange,
          value = this.value;

      var months = this.t2("el.acalendar.months");
      var options = [];
      var start = 0;
      var end = 12;
      if (validRange) {
        var rangeStart = validRange[0],
            rangeEnd = validRange[1];

        var currentYear = value.get("year");
        if (rangeEnd.get("year") === currentYear) {
          end = rangeEnd.get("month") + 1;
        }
        if (rangeStart.get("year") === currentYear) {
          start = rangeStart.get("month");
        }
      }
      for (var index = start; index < end; index++) {
        options.push(h(option_default.a, external_babel_helper_vue_jsx_merge_props_default()([{
          key: "" + index
        }, {
          props: {
            value: String(index),
            label: months[index]
          }
        }])));
      }

      return h(
        select_default.a,
        {
          style: { width: "70px" },
          attrs: { size: fullscreen ? "default" : "small",
            dropdownMatchSelectWidth: false,

            value: String(month),

            getPopupContainer: function getPopupContainer() {
              return _this.getCalenderHeaderNode();
            }
          },
          "class": this.prefixCls + "-month-select", on: {
            "change": this.onMonthChange
          }
        },
        [options]
      );
    },
    onYearChange: function onYearChange(year) {
      var value = this.value,
          validRange = this.validRange;

      var newValue = value.clone();
      newValue.year(parseInt(year, 10));
      // switch the month so that it remains within range when year changes
      if (validRange) {
        var start = validRange[0],
            end = validRange[1];

        var newYear = newValue.get("year");
        var newMonth = newValue.get("month");
        if (newYear === end.get("year") && newMonth > end.get("month")) {
          newValue.month(end.get("month"));
        }
        if (newYear === start.get("year") && newMonth < start.get("month")) {
          newValue.month(start.get("month"));
        }
      }
      this.$emit("valueChange", newValue);
    },
    onMonthChange: function onMonthChange(month) {
      var newValue = this.value.clone();
      newValue.month(parseInt(month, 10));
      this.$emit("valueChange", newValue);
    },
    onInternalTypeChange: function onInternalTypeChange(e) {
      this.onTypeChange(e.target.value);
    },
    onTypeChange: function onTypeChange(val) {
      this.$emit("typeChange", val);
    },
    getCalenderHeaderNode: function getCalenderHeaderNode() {
      return this.$refs.calenderHeaderNode;
    },
    getMonthYearSelections: function getMonthYearSelections() {
      var _$props = this.$props,
          type = _$props.type,
          value = _$props.value;

      var yearReactNode = this.getYearSelectElement(value.year());
      var monthReactNode = type === "month" ? this.getMonthSelectElement(value.month()) : null;

      return {
        yearReactNode: yearReactNode,
        monthReactNode: monthReactNode
      };
    },
    getTypeSwitch: function getTypeSwitch() {
      var _this2 = this;

      var h = this.$createElement;
      var _$props2 = this.$props,
          type = _$props2.type,
          fullscreen = _$props2.fullscreen;

      var size = fullscreen ? "default" : "small";
      return h(
        button_group_default.a,
        {
          attrs: { size: size }
        },
        [h(
          button_default.a,
          {
            attrs: {
              size: size,

              value: "month"
            },
            on: {
              "click": function click() {
                _this2.onInternalTypeChange({
                  target: {
                    value: "month"
                  }
                });
              }
            }
          },
          [this.t("el.acalendar.month")]
        ), h(
          button_default.a,
          {
            attrs: {
              size: size,

              value: "year"
            },
            on: {
              "click": function click() {
                _this2.onInternalTypeChange({
                  target: {
                    value: "year"
                  }
                });
              }
            }
          },
          [this.t("el.acalendar.year")]
        )]
      );
    },
    onValueChange: function onValueChange() {
      this.$emit.apply(this, ["valueChange"].concat(Array.prototype.slice.call(arguments)));
    },
    headerRenderCustom: function headerRenderCustom(headerRender) {
      var _$props3 = this.$props,
          type = _$props3.type,
          value = _$props3.value;

      return headerRender({
        value: value,
        type: type || "month",
        onChange: this.onValueChange,
        onTypeChange: this.onTypeChange
      });
    }
  }
}, _name$props$component["mounted"] = function mounted() {
  var _this3 = this;

  setInterval(function () {
    _this3.xx++;
  }, 1000);
}, _name$props$component.render = function render() {
  var h = arguments[0];
  var headerRender = this.headerRender,
      headerRenderType = this.headerRenderType;

  var typeSwitch = this.getTypeSwitch();

  var _getMonthYearSelectio = this.getMonthYearSelections(),
      yearReactNode = _getMonthYearSelectio.yearReactNode,
      monthReactNode = _getMonthYearSelectio.monthReactNode;

  return headerRender ? this.headerRenderCustom(headerRender) : headerRenderType === 'panel' ? this.getPanelHeader() : h(
    "div",
    { "class": this.prefixCls + "-header", ref: "calenderHeaderNode" },
    [yearReactNode, monthReactNode, typeSwitch]
  );
}, _name$props$component);
// CONCATENATED MODULE: ./packages/a-calendar/src/header/header.vue?vue&type=script&lang=js&
 /* harmony default export */ var header_headervue_type_script_lang_js_ = (headervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/header/header.vue
var header_render, header_staticRenderFns




/* normalize component */

var header_component = Object(componentNormalizer["a" /* default */])(
  header_headervue_type_script_lang_js_,
  header_render,
  header_staticRenderFns,
  false,
  null,
  "2d4727d7",
  null
  
)

/* harmony default export */ var header_header = (header_component.exports);
// EXTERNAL MODULE: external "lodash/isPlainObject"
var isPlainObject_ = __webpack_require__(48);
var isPlainObject_default = /*#__PURE__*/__webpack_require__.n(isPlainObject_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(31);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./packages/a-calendar/src/utils/props-util.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var props_util_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};
var parseStyleText = function parseStyleText() {
  var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var camel = arguments[1];

  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

var hasProp = function hasProp(instance, prop) {
  var $options = instance.$options || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};
var slotHasProp = function slotHasProp(slot, prop) {
  var $options = slot.componentOptions || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};
var filterProps = function filterProps(props) {
  var propsData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var res = {};
  Object.keys(props).forEach(function (k) {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k];
    }
  });
  return res;
};

var getScopedSlots = function getScopedSlots(ele) {
  return ele.data && ele.data.scopedSlots || {};
};

var getSlots = function getSlots(ele) {
  var componentOptions = ele.componentOptions || {};
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }
  var children = ele.children || componentOptions.children || [];
  var slots = {};
  children.forEach(function (child) {
    if (!isEmptyElement(child)) {
      var name = child.data && child.data.slot || 'default';
      slots[name] = slots[name] || [];
      slots[name].push(child);
    }
  });
  return props_util_extends({}, slots, getScopedSlots(ele));
};
var getSlot = function getSlot(self) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return self.$scopedSlots && self.$scopedSlots[name] && self.$scopedSlots[name](options) || self.$slots[name] || [];
};

var getAllChildren = function getAllChildren(ele) {
  var componentOptions = ele.componentOptions || {};
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }
  return ele.children || componentOptions.children || [];
};
var getSlotOptions = function getSlotOptions(ele) {
  if (ele.fnOptions) {
    // 函数式组件
    return ele.fnOptions;
  }
  var componentOptions = ele.componentOptions;
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }
  return componentOptions ? componentOptions.Ctor.options || {} : {};
};
var getOptionProps = function getOptionProps(instance) {
  if (instance.componentOptions) {
    var componentOptions = instance.componentOptions;
    var _componentOptions$pro = componentOptions.propsData,
        propsData = _componentOptions$pro === undefined ? {} : _componentOptions$pro,
        _componentOptions$Cto = componentOptions.Ctor,
        Ctor = _componentOptions$Cto === undefined ? {} : _componentOptions$Cto;

    var props = (Ctor.options || {}).props || {};
    var res = {};
    for (var _iterator = Object.entries(props), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _ref = _ref2;
      var k = _ref[0];
      var v = _ref[1];

      var def = v.default;
      if (def !== undefined) {
        res[k] = typeof def === 'function' && getType(v.type) !== 'Function' ? def.call(instance) : def;
      }
    }
    return props_util_extends({}, res, propsData);
  }
  var _instance$$options = instance.$options,
      $options = _instance$$options === undefined ? {} : _instance$$options,
      _instance$$props = instance.$props,
      $props = _instance$$props === undefined ? {} : _instance$$props;

  return filterProps($props, $options.propsData);
};

var getComponentFromProp = function getComponentFromProp(instance, prop) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance;
  var execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (instance.$createElement) {
    var h = instance.$createElement;
    var temp = instance[prop];
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp;
    }
    return instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options) || instance.$scopedSlots[prop] || instance.$slots[prop] || undefined;
  } else {
    var _h = instance.context.$createElement;
    var _temp = getPropsData(instance)[prop];
    if (_temp !== undefined) {
      return typeof _temp === 'function' && execute ? _temp(_h, options) : _temp;
    }
    var slotScope = getScopedSlots(instance)[prop];
    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute ? slotScope(_h, options) : slotScope;
    }
    var slotsProp = [];
    var componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach(function (child) {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot;
        }
        if (child.tag === 'template') {
          slotsProp.push(child.children);
        } else {
          slotsProp.push(child);
        }
      }
    });
    return slotsProp.length ? slotsProp : undefined;
  }
};

var getAllProps = function getAllProps(ele) {
  var data = ele.data || {};
  var componentOptions = ele.componentOptions || {};
  if (ele.$vnode) {
    data = ele.$vnode.data || {};
    componentOptions = ele.$vnode.componentOptions || {};
  }
  return props_util_extends({}, data.props, data.attrs, componentOptions.propsData);
};

var getPropsData = function getPropsData(ele) {
  var componentOptions = ele.componentOptions;
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }
  return componentOptions ? componentOptions.propsData || {} : {};
};
var getValueByProp = function getValueByProp(ele, prop) {
  return getPropsData(ele)[prop];
};

var getAttrs = function getAttrs(ele) {
  var data = ele.data;
  if (ele.$vnode) {
    data = ele.$vnode.data;
  }
  return data ? data.attrs || {} : {};
};

var getKey = function getKey(ele) {
  var key = ele.key;
  if (ele.$vnode) {
    key = ele.$vnode.key;
  }
  return key;
};

function getEvents(child) {
  var events = {};
  if (child.componentOptions && child.componentOptions.listeners) {
    events = child.componentOptions.listeners;
  } else if (child.data && child.data.on) {
    events = child.data.on;
  }
  return props_util_extends({}, events);
}

// 获取 xxx.native 或者 原生标签 事件
function getDataEvents(child) {
  var events = {};
  if (child.data && child.data.on) {
    events = child.data.on;
  }
  return props_util_extends({}, events);
}

// use getListeners instead this.$listeners
// https://github.com/vueComponent/ant-design-vue/issues/1705
function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {};
}
function getClass(ele) {
  var data = {};
  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }
  var tempCls = data.class || {};
  var staticClass = data.staticClass;
  var cls = {};
  staticClass && staticClass.split(' ').forEach(function (c) {
    cls[c.trim()] = true;
  });
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    external_classnames_default()(tempCls).split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = props_util_extends({}, cls, tempCls);
  }
  return cls;
}
function getStyle(ele, camel) {
  var data = {};
  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }
  var style = data.style || data.staticStyle;
  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    // 驼峰化
    var res = {};
    Object.keys(style).forEach(function (k) {
      return res[camelize(k)] = style[k];
    });
    return res;
  }
  return style;
}

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() !== '');
}

function isStringElement(c) {
  return !c.tag;
}

function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}
var initDefaultProps = function initDefaultProps(propTypes, defaultProps) {
  Object.keys(defaultProps).forEach(function (k) {
    if (propTypes[k]) {
      propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]));
    } else {
      throw new Error('not have ' + k + ' prop');
    }
  });
  return propTypes;
};

function mergeProps() {
  var args = [].slice.call(arguments, 0);
  var props = {};
  args.forEach(function () {
    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _iterator2 = Object.entries(p), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref4 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref4 = _i2.value;
      }

      var _ref3 = _ref4;
      var k = _ref3[0];
      var v = _ref3[1];

      props[k] = props[k] || {};
      if (isPlainObject_default()(v)) {
        Object.assign(props[k], v);
      } else {
        props[k] = v;
      }
    }
  });
  return props;
}

function isValidElement(element) {
  return element && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && 'componentOptions' in element && 'context' in element && element.tag !== undefined; // remove text node
}


/* harmony default export */ var props_util = (hasProp);
// CONCATENATED MODULE: ./packages/a-calendar/src/utils/interopDefault.js
// https://github.com/moment/moment/issues/3650
function interopDefault(m) {
  return m.default || m;
}
// EXTERNAL MODULE: external "lodash/isNil"
var isNil_ = __webpack_require__(65);
var isNil_default = /*#__PURE__*/__webpack_require__.n(isNil_);

// CONCATENATED MODULE: ./packages/a-calendar/src/utils/moment-util.js




function warning() {
  console.log('test warning', arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
}

var TimeType = {
  validator: function validator(value) {
    return typeof value === 'string' || isNil_default()(value) || external_moment_["isMoment"](value);
  }
};

var TimesType = {
  validator: function validator(value) {
    if (Array.isArray(value)) {
      return value.length === 0 || value.findIndex(function (val) {
        return typeof val !== 'string';
      }) === -1 || value.findIndex(function (val) {
        return !isNil_default()(val) && !external_moment_["isMoment"](val);
      }) === -1;
    }
    return false;
  }
};

var TimeOrTimesType = {
  validator: function validator(value) {
    if (Array.isArray(value)) {
      return value.length === 0 || value.findIndex(function (val) {
        return typeof val !== 'string';
      }) === -1 || value.findIndex(function (val) {
        return !isNil_default()(val) && !external_moment_["isMoment"](val);
      }) === -1;
    } else {
      return typeof value === 'string' || isNil_default()(value) || external_moment_["isMoment"](value);
    }
  }
};

function checkValidate(componentName, value, propName, valueFormat) {
  var values = Array.isArray(value) ? value : [value];
  values.forEach(function (val) {
    if (!val) return;
    valueFormat && warning(interopDefault(external_moment_)(val, valueFormat).isValid(), componentName, 'When set `valueFormat`, `' + propName + '` should provides invalidate string time. ');
    !valueFormat && warning(interopDefault(external_moment_).isMoment(val) && val.isValid(), componentName, '`' + propName + '` provides invalidate moment time. If you want to set empty value, use `null` instead.');
  });
}
var moment_util_stringToMoment = function stringToMoment(value, valueFormat) {
  if (Array.isArray(value)) {
    return value.map(function (val) {
      return typeof val === 'string' && val ? interopDefault(external_moment_)(val, valueFormat) : val || null;
    });
  } else {
    return typeof value === 'string' && value ? interopDefault(external_moment_)(value, valueFormat) : value || null;
  }
};

var moment_util_momentToString = function momentToString(value, valueFormat) {
  if (Array.isArray(value)) {
    return value.map(function (val) {
      return interopDefault(external_moment_).isMoment(val) ? val.format(valueFormat) : val;
    });
  } else {
    return interopDefault(external_moment_).isMoment(value) ? value.format(valueFormat) : value;
  }
};
// CONCATENATED MODULE: ./packages/a-calendar/src/mixin/BaseMixin.js
var BaseMixin_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ var BaseMixin = ({
  methods: {
    setState: function setState() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var newState = typeof state === 'function' ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        var s = this.getDerivedStateFromProps(getOptionProps(this), BaseMixin_extends({}, this.$data, newState));
        if (s === null) {
          return;
        } else {
          newState = BaseMixin_extends({}, newState, s || {});
        }
      }
      Object.assign(this.$data, newState);
      this.$forceUpdate();
      this.$nextTick(function () {
        callback && callback();
      });
    },
    __emit: function __emit() {
      // 直接调用listeners，底层组件不需要vueTool记录events
      var args = [].slice.call(arguments, 0);
      var eventName = args[0];
      var event = this.$listeners[eventName];
      if (args.length && event) {
        if (Array.isArray(event)) {
          for (var i = 0, l = event.length; i < l; i++) {
            event[i].apply(event, args.slice(1));
          }
        } else {
          event.apply(undefined, args.slice(1));
        }
      }
    }
  }
});
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/locale"
var lib_locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/date/DateTHead.vue?vue&type=script&lang=js&

// import DateConstants from './DateConstants';
// import moment from 'moment';


/* harmony default export */ var DateTHeadvue_type_script_lang_js_ = ({
  functional: true,
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props;
    // const value = props.value;
    // const localeData = value.localeData();

    var prefixCls = props.prefixCls;
    var veryShortWeekdays = [];
    var weekDays = [];
    // const firstDayOfWeek = localeData.firstDayOfWeek();
    // const firstDayOfWeek = 0;
    var showWeekNumberEl = void 0;
    // const now = moment();
    // for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
    //   const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
    //   now.day(index);
    //   veryShortWeekdays[dateColIndex] = this.t2('el.acalendar.weeks');
    //   weekDays[dateColIndex] = localeData.weekdaysShort(now);
    // }
    veryShortWeekdays = Object(lib_locale_["t2"])('el.acalendar.weeks');
    weekDays = Object(lib_locale_["t2"])('el.acalendar.weeks');

    if (props.showWeekNumber) {
      showWeekNumberEl = h(
        'th',
        {
          attrs: {
            role: 'columnheader'
          },
          'class': prefixCls + '-column-header ' + prefixCls + '-week-number-header'
        },
        [h(
          'span',
          { 'class': prefixCls + '-column-header-inner' },
          ['x']
        )]
      );
    }
    var weekDaysEls = weekDays.map(function (day, xindex) {
      return h(
        'th',
        { key: xindex, attrs: { role: 'columnheader', title: day },
          'class': prefixCls + '-column-header' },
        [h(
          'span',
          { 'class': prefixCls + '-column-header-inner' },
          [veryShortWeekdays[xindex]]
        )]
      );
    });
    return h('thead', [h(
      'tr',
      {
        attrs: { role: 'row' }
      },
      [showWeekNumberEl, weekDaysEls]
    )]);
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTHead.vue?vue&type=script&lang=js&
 /* harmony default export */ var date_DateTHeadvue_type_script_lang_js_ = (DateTHeadvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTHead.vue
var DateTHead_render, DateTHead_staticRenderFns




/* normalize component */

var DateTHead_component = Object(componentNormalizer["a" /* default */])(
  date_DateTHeadvue_type_script_lang_js_,
  DateTHead_render,
  DateTHead_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateTHead = (DateTHead_component.exports);
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateConstants.js
/* harmony default export */ var DateConstants = ({
  DATE_ROW_COUNT: 6,
  DATE_COL_COUNT: 7
});
// CONCATENATED MODULE: ./packages/a-calendar/src/utils/vc-utils.js
var vc_utils_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var defaultDisabledTime = {
  disabledHours: function disabledHours() {
    return [];
  },
  disabledMinutes: function disabledMinutes() {
    return [];
  },
  disabledSeconds: function disabledSeconds() {
    return [];
  }
};

function getTodayTime(value) {
  var today = external_moment_default()();
  today.locale(value.locale()).utcOffset(value.utcOffset());
  return today;
}

function getTitleString(value) {
  return value.format('LL');
}

function getTodayTimeStr(value) {
  var today = getTodayTime(value);
  return getTitleString(today);
}

function getMonthName(month) {
  var locale = month.locale();
  var localeData = month.localeData();
  return localeData[locale === 'zh-cn' ? 'months' : 'monthsShort'](month);
}

function syncTime(from, to) {
  if (!external_moment_default.a.isMoment(from) || !external_moment_default.a.isMoment(to)) return;
  to.hour(from.hour());
  to.minute(from.minute());
  to.second(from.second());
  to.millisecond(from.millisecond());
}

function getTimeConfig(value, disabledTime) {
  var disabledTimeConfig = disabledTime ? disabledTime(value) : {};
  disabledTimeConfig = vc_utils_extends({}, defaultDisabledTime, disabledTimeConfig);
  return disabledTimeConfig;
}

function isTimeValidByConfig(value, disabledTimeConfig) {
  var invalidTime = false;
  if (value) {
    var hour = value.hour();
    var minutes = value.minute();
    var seconds = value.second();
    var disabledHours = disabledTimeConfig.disabledHours();
    if (disabledHours.indexOf(hour) === -1) {
      var disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
      if (disabledMinutes.indexOf(minutes) === -1) {
        var disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
      } else {
        invalidTime = true;
      }
    } else {
      invalidTime = true;
    }
  }
  return !invalidTime;
}

function isTimeValid(value, disabledTime) {
  var disabledTimeConfig = getTimeConfig(value, disabledTime);
  return isTimeValidByConfig(value, disabledTimeConfig);
}

function vc_utils_isAllowedDate(value, disabledDate, disabledTime) {
  if (disabledDate) {
    if (disabledDate(value)) {
      return false;
    }
  }
  if (disabledTime) {
    if (!isTimeValid(value, disabledTime)) {
      return false;
    }
  }
  return true;
}

function formatDate(value, format) {
  if (!value) {
    return '';
  }

  if (Array.isArray(format)) {
    format = format[0];
  }

  if (typeof format === 'function') {
    var result = format(value);
    if (typeof result === 'string') {
      return result;
    } else {
      throw new Error('The function of format does not return a string');
    }
  }

  return value.format(format);
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/date/DateTBody.vue?vue&type=script&lang=js&





function noop() {}
function isSameDay(one, two) {
  return one && two && one.isSame(two, 'day');
}

function beforeCurrentMonthYear(current, today) {
  if (current.year() < today.year()) {
    return 1;
  }
  return current.year() === today.year() && current.month() < today.month();
}

function afterCurrentMonthYear(current, today) {
  if (current.year() > today.year()) {
    return 1;
  }
  return current.year() === today.year() && current.month() > today.month();
}

function getIdFromDate(date) {
  return 'rc-calendar-' + date.year() + '-' + date.month() + '-' + date.date();
}

var DateTBody = {
  props: {
    contentRender: Function,
    dateRender: Function,
    disabledDate: Function,
    prefixCls: String,
    selectedValue: null,
    value: Object,
    hoverValue: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showWeekNumber: Boolean
  },

  render: function render() {
    var h = arguments[0];

    var props = getOptionProps(this);
    var contentRender = props.contentRender,
        prefixCls = props.prefixCls,
        selectedValue = props.selectedValue,
        value = props.value,
        showWeekNumber = props.showWeekNumber,
        dateRender = props.dateRender,
        disabledDate = props.disabledDate,
        hoverValue = props.hoverValue;

    var _getListeners = getListeners(this),
        _getListeners$select = _getListeners.select,
        select = _getListeners$select === undefined ? noop : _getListeners$select,
        _getListeners$dayHove = _getListeners.dayHover,
        dayHover = _getListeners$dayHove === undefined ? noop : _getListeners$dayHove;

    var iIndex = void 0;
    var jIndex = void 0;
    var current = void 0;
    var dateTable = [];
    var today = getTodayTime(value);
    var cellClass = prefixCls + '-cell';
    var weekNumberCellClass = prefixCls + '-week-number-cell';
    var dateClass = prefixCls + '-date';
    var todayClass = prefixCls + '-today';
    var selectedClass = prefixCls + '-selected-day';
    var selectedDateClass = prefixCls + '-selected-date'; // do not move with mouse operation
    var selectedStartDateClass = prefixCls + '-selected-start-date';
    var selectedEndDateClass = prefixCls + '-selected-end-date';
    var inRangeClass = prefixCls + '-in-range-cell';
    var lastMonthDayClass = prefixCls + '-last-month-cell';
    var nextMonthDayClass = prefixCls + '-next-month-btn-day';
    var disabledClass = prefixCls + '-disabled-cell';
    var firstDisableClass = prefixCls + '-disabled-cell-first-of-row';
    var lastDisableClass = prefixCls + '-disabled-cell-last-of-row';
    var lastDayOfMonthClass = prefixCls + '-last-day-of-month';
    var month1 = value.clone();
    month1.date(1);
    var day = month1.day();
    var lastMonthDiffDay = (day + 7 - value.localeData().firstDayOfWeek()) % 7;
    // calculate last month
    var lastMonth1 = month1.clone();
    lastMonth1.add(0 - lastMonthDiffDay, 'days');
    var passed = 0;
    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.add(passed, 'days');
        }
        dateTable.push(current);
        passed++;
      }
    }
    var tableHtml = [];
    passed = 0;

    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
      var _cx;

      var isCurrentWeek = void 0;
      var weekNumberCell = void 0;
      var isActiveWeek = false;
      var dateCells = [];
      if (showWeekNumber) {
        weekNumberCell = h(
          'td',
          { key: 'week-' + dateTable[passed].week(), attrs: { role: 'gridcell' },
            'class': weekNumberCellClass },
          [dateTable[passed].week()]
        );
      }
      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
        var next = null;
        var last = null;
        current = dateTable[passed];
        if (jIndex < DateConstants.DATE_COL_COUNT - 1) {
          next = dateTable[passed + 1];
        }
        if (jIndex > 0) {
          last = dateTable[passed - 1];
        }
        var cls = cellClass;
        var disabled = false;
        var selected = false;

        if (isSameDay(current, today)) {
          cls += ' ' + todayClass;
          isCurrentWeek = true;
        }

        var isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
        var isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

        if (selectedValue && Array.isArray(selectedValue)) {
          var rangeValue = hoverValue.length ? hoverValue : selectedValue;
          if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
            var startValue = rangeValue[0];
            var endValue = rangeValue[1];
            if (startValue) {
              if (isSameDay(current, startValue)) {
                selected = true;
                isActiveWeek = true;
                cls += ' ' + selectedStartDateClass;
              }
            }
            if (startValue || endValue) {
              if (isSameDay(current, endValue)) {
                selected = true;
                isActiveWeek = true;
                cls += ' ' + selectedEndDateClass;
              } else if ((startValue === null || startValue === undefined) && current.isBefore(endValue, 'day')) {
                cls += ' ' + inRangeClass;
              } else if ((endValue === null || endValue === undefined) && current.isAfter(startValue, 'day')) {
                cls += ' ' + inRangeClass;
              } else if (current.isAfter(startValue, 'day') && current.isBefore(endValue, 'day')) {
                cls += ' ' + inRangeClass;
              }
            }
          }
        } else if (isSameDay(current, value)) {
          // keyboard change value, highlight works
          selected = true;
          isActiveWeek = true;
        }

        if (isSameDay(current, selectedValue)) {
          cls += ' ' + selectedDateClass;
        }

        if (isBeforeCurrentMonthYear) {
          cls += ' ' + lastMonthDayClass;
        }
        if (isAfterCurrentMonthYear) {
          cls += ' ' + nextMonthDayClass;
        }

        if (current.clone().endOf('month').date() === current.date()) {
          cls += ' ' + lastDayOfMonthClass;
        }

        if (disabledDate) {
          if (disabledDate(current, value)) {
            disabled = true;

            if (!last || !disabledDate(last, value)) {
              cls += ' ' + firstDisableClass;
            }

            if (!next || !disabledDate(next, value)) {
              cls += ' ' + lastDisableClass;
            }
          }
        }

        if (selected) {
          cls += ' ' + selectedClass;
        }

        if (disabled) {
          cls += ' ' + disabledClass;
        }

        var dateHtml = void 0;
        if (dateRender) {
          dateHtml = dateRender(current, value);
        } else {
          var content = contentRender ? contentRender(current, value) : current.date();
          dateHtml = h(
            'div',
            {
              key: getIdFromDate(current),
              'class': dateClass,
              attrs: { 'aria-selected': selected,
                'aria-disabled': disabled
              }
            },
            [content]
          );
        }

        dateCells.push(h(
          'td',
          {
            key: passed,
            on: {
              'click': disabled ? noop : select.bind(null, current),
              'mouseenter': disabled ? noop : dayHover.bind(null, current)
            },
            attrs: {
              role: 'gridcell',
              title: getTitleString(current)
            },
            'class': cls
          },
          [dateHtml]
        ));

        passed++;
      }

      tableHtml.push(h(
        'tr',
        {
          key: iIndex,
          attrs: { role: 'row'
          },
          'class': external_classnames_default()((_cx = {}, _cx[prefixCls + '-current-week'] = isCurrentWeek, _cx[prefixCls + '-active-week'] = isActiveWeek, _cx))
        },
        [weekNumberCell, dateCells]
      ));
    }
    return h(
      'tbody',
      { 'class': prefixCls + '-tbody' },
      [tableHtml]
    );
  }
};

/* harmony default export */ var DateTBodyvue_type_script_lang_js_ = (DateTBody);
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTBody.vue?vue&type=script&lang=js&
 /* harmony default export */ var date_DateTBodyvue_type_script_lang_js_ = (DateTBodyvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTBody.vue
var DateTBody_render, DateTBody_staticRenderFns




/* normalize component */

var DateTBody_component = Object(componentNormalizer["a" /* default */])(
  date_DateTBodyvue_type_script_lang_js_,
  DateTBody_render,
  DateTBody_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var date_DateTBody = (DateTBody_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/date/DateTable.vue?vue&type=script&lang=js&

/* eslint-disable */



/* harmony default export */ var DateTablevue_type_script_lang_js_ = ({
  functional: true,
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props,
        _context$listeners = context.listeners,
        listeners = _context$listeners === undefined ? {} : _context$listeners;

    var prefixCls = props.prefixCls;
    var bodyProps = {
      props: props,
      on: listeners
    };

    return h(
      'table',
      { 'class': prefixCls + '-table', attrs: { cellSpacing: '0', role: 'grid' }
      },
      [h(DateTHead, bodyProps), h(date_DateTBody, bodyProps)]
    );
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var date_DateTablevue_type_script_lang_js_ = (DateTablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/date/DateTable.vue
var DateTable_render, DateTable_staticRenderFns




/* normalize component */

var DateTable_component = Object(componentNormalizer["a" /* default */])(
  date_DateTablevue_type_script_lang_js_,
  DateTable_render,
  DateTable_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DateTable = (DateTable_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/month/MonthTable.vue?vue&type=script&lang=js&




var ROW = 4;
var COL = 3;

function MonthTablevue_type_script_lang_js_noop() {}

var MonthTable = {
  name: 'MonthTable',
  mixins: [BaseMixin],
  props: {
    cellRender: Function,
    prefixCls: String,
    value: Object,
    contentRender: {
      type: null
    },
    disabledDate: Function
  },
  data: function data() {
    return {
      sValue: this.value
    };
  },

  watch: {
    value: function value(val) {
      this.setState({
        sValue: val
      });
    }
  },
  methods: {
    setAndSelectValue: function setAndSelectValue(value) {
      this.setState({
        sValue: value
      });
      this.__emit('select', value);
    },
    chooseMonth: function chooseMonth(month) {
      var next = this.sValue.clone();
      next.month(month);
      this.setAndSelectValue(next);
    },
    months: function months() {
      var value = this.sValue;
      var current = value.clone();
      var months = [];
      var index = 0;
      for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
        months[rowIndex] = [];
        for (var colIndex = 0; colIndex < COL; colIndex++) {
          current.month(index);
          var content = getMonthName(current);
          months[rowIndex][colIndex] = {
            value: index,
            content: content,
            title: content
          };
          index++;
        }
      }
      return months;
    }
  },

  render: function render() {
    var _this = this;

    var h = arguments[0];

    var props = this.$props;
    var value = this.sValue;
    var today = getTodayTime(value);
    var months = this.months();
    var currentMonth = value.month();
    var prefixCls = props.prefixCls,
        locale = props.locale,
        contentRender = props.contentRender,
        cellRender = props.cellRender,
        disabledDate = props.disabledDate;

    var monthsEls = months.map(function (month, index) {
      var tds = month.map(function (monthData) {
        var _classNameMap;

        var disabled = false;
        if (disabledDate) {
          var testValue = value.clone();
          testValue.month(monthData.value);
          disabled = disabledDate(testValue);
        }
        var classNameMap = (_classNameMap = {}, _classNameMap[prefixCls + '-cell'] = 1, _classNameMap[prefixCls + '-cell-disabled'] = disabled, _classNameMap[prefixCls + '-selected-cell'] = monthData.value === currentMonth, _classNameMap[prefixCls + '-current-cell'] = today.year() === value.year() && monthData.value === today.month(), _classNameMap);
        var cellEl = void 0;
        if (cellRender) {
          var currentValue = value.clone();
          currentValue.month(monthData.value);
          cellEl = cellRender(currentValue, locale);
        } else {
          var content = void 0;
          if (contentRender) {
            var _currentValue = value.clone();
            _currentValue.month(monthData.value);
            content = contentRender(_currentValue, locale);
          } else {
            content = monthData.content;
          }
          cellEl = h(
            'a',
            { 'class': prefixCls + '-month' },
            [content]
          );
        }
        return h(
          'td',
          {
            attrs: {
              role: 'gridcell',

              title: monthData.title
            },
            key: monthData.value,
            on: {
              'click': disabled ? MonthTablevue_type_script_lang_js_noop : function () {
                return _this.chooseMonth(monthData.value);
              }
            },
            'class': classNameMap
          },
          [cellEl]
        );
      });
      return h(
        'tr',
        { key: index, attrs: { role: 'row' }
        },
        [tds]
      );
    });

    return h(
      'table',
      { 'class': prefixCls + '-table', attrs: { cellSpacing: '0', role: 'grid' }
      },
      [h(
        'tbody',
        { 'class': prefixCls + '-tbody' },
        [monthsEls]
      )]
    );
  }
};

/* harmony default export */ var MonthTablevue_type_script_lang_js_ = (MonthTable);
// CONCATENATED MODULE: ./packages/a-calendar/src/month/MonthTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var month_MonthTablevue_type_script_lang_js_ = (MonthTablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/month/MonthTable.vue
var MonthTable_render, MonthTable_staticRenderFns




/* normalize component */

var MonthTable_component = Object(componentNormalizer["a" /* default */])(
  month_MonthTablevue_type_script_lang_js_,
  MonthTable_render,
  MonthTable_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var month_MonthTable = (MonthTable_component.exports);
// CONCATENATED MODULE: ./packages/a-calendar/src/mixin/CalendarMixin.js



function CalendarMixin_noop() {}

function getNowByCurrentStateValue(value) {
  var ret = void 0;
  if (value) {
    ret = getTodayTime(value);
  } else {
    ret = external_moment_default()();
  }
  return ret;
}
var CalendarMixin = {
  name: 'CalendarMixinWrapper',
  props: {
    value: Object,
    defaultValue: Object
  },

  data: function data() {
    var props = this.$props;
    var sValue = props.value || props.defaultValue || getNowByCurrentStateValue();
    return {
      sValue: sValue,
      sSelectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },

  watch: {
    value: function value(val) {
      var sValue = val || this.defaultValue || getNowByCurrentStateValue(this.sValue);
      this.sValue = sValue;
    },
    selectedValue: function selectedValue(val) {
      this.sSelectedValue = val;
    }
  },
  methods: {
    onSelect: function onSelect(value, cause) {
      if (value) {
        this.setValue(value);
      }
      this.setSelectedValue(value, cause);
    },
    renderRoot: function renderRoot(newProps) {
      var _className;

      var h = this.$createElement;

      var props = this.$props;
      var prefixCls = props.prefixCls;

      var className = (_className = {}, _className[prefixCls] = 1, _className[prefixCls + '-hidden'] = !props.visible, _className[newProps.class] = !!newProps.class, _className);
      return h(
        'div',
        {
          ref: 'rootInstance',
          'class': className,
          attrs: { tabIndex: '0'
          },
          on: {
            'keydown': this.onKeyDown || CalendarMixin_noop,
            'blur': this.onBlur || CalendarMixin_noop
          }
        },
        [newProps.children]
      );
    },
    setSelectedValue: function setSelectedValue(selectedValue, cause) {
      // if (this.isAllowedDate(selectedValue)) {
      if (!hasProp(this, 'selectedValue')) {
        this.sSelectedValue = selectedValue;
      }
      this.__emit('select', selectedValue, cause);
      // }
    },
    setValue: function setValue(value) {
      var originalValue = this.sValue;
      if (!hasProp(this, 'value')) {
        this.sValue = value;
      }
      if (originalValue && value && !originalValue.isSame(value) || !originalValue && value || originalValue && !value) {
        this.__emit('change', value);
      }
    },
    isAllowedDate: function isAllowedDate(value) {
      var disabledDate = this.disabledDate;
      var disabledTime = this.disabledTime;
      return vc_utils_isAllowedDate(value, disabledDate, disabledTime);
    }
  }
};

/* harmony default export */ var mixin_CalendarMixin = (CalendarMixin);
// CONCATENATED MODULE: ./packages/a-calendar/src/mixin/CommonMixin.js
/* harmony default export */ var CommonMixin = ({
  methods: {
    getFormat: function getFormat() {
      var format = this.format;
      var locale = this.locale,
          timePicker = this.timePicker;

      if (!format) {
        if (timePicker) {
          format = locale.dateTimeFormat;
        } else {
          format = locale.dateFormat;
        }
      }
      return format;
    },
    focus: function focus() {
      if (this.focusElement) {
        this.focusElement.focus();
      } else if (this.$refs.rootInstance) {
        this.$refs.rootInstance.focus();
      }
    },
    saveFocusElement: function saveFocusElement(focusElement) {
      this.focusElement = focusElement;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/full-calendar.vue?vue&type=script&lang=js&
var full_calendarvue_type_script_lang_js_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable */







// import CalendarHeader from './CalendarHeader';
/* harmony default export */ var full_calendarvue_type_script_lang_js_ = ({
  name: 'ElAFullCalendar',
  props: {
    format: {
      type: [String, Array, Function]
    },
    visible: {
      type: Boolean,
      default: true
    },
    prefixCls: {
      default: 'sp-a-calendar'
    },
    defaultType: {
      type: String,
      default: 'date'
    },
    type: {
      type: String
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    monthCellRender: Function,
    dateCellRender: Function,
    showTypeSwitch: {
      type: Boolean,
      default: true
    },
    Select: {
      required: true
    },
    headerComponents: Array,
    headerComponent: Object, // The whole header component
    headerRender: Function,
    showHeader: {
      type: Boolean,
      default: true
    },
    disabledDate: Function,
    value: Object,
    defaultValue: Object,
    selectedValue: Object,
    defaultSelectedValue: Object,
    renderFooter: {
      type: Function,
      default: function _default() {
        return null;
      }
    },
    renderSidebar: {
      type: Function,
      default: function _default() {
        return null;
      }
    }
  },
  mixins: [BaseMixin, CommonMixin, mixin_CalendarMixin],
  components: {},
  data: function data() {
    var type = void 0;
    if (hasProp(this, 'type')) {
      type = this.type;
    } else {
      type = this.defaultType;
    }
    var props = this.$props;
    return {
      sType: type,
      sValue: props.value || props.defaultValue || external_moment_default()(),
      sSelectedValue: props.selectedValue || props.defaultSelectedValue
    };
  },

  computed: {},
  watch: {
    type: function type(val) {
      this.sType = val;
    },
    value: function value(val) {
      var sValue = val || this.defaultValue || getNowByCurrentStateValue(this.sValue);
      this.sValue = sValue;
    },
    selectedValue: function selectedValue(val) {
      this.sSelectedValue = val;
    }
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    onMonthSelect: function onMonthSelect(value) {
      this.onSelect(value, {
        target: 'month'
      });
    },
    setType: function setType(type) {
      if (!hasProp(this, 'type')) {
        this.setState({
          sType: type
        });
      }
      this.__emit('typeChange', type);
    }
  },
  render: function render() {
    var h = arguments[0];

    var props = getOptionProps(this);
    var locale = props.locale,
        fullscreen = props.fullscreen,
        showHeader = props.showHeader,
        headerComponent = props.headerComponent,
        headerRender = props.headerRender,
        disabledDate = props.disabledDate;
    var value = this.sValue,
        type = this.sType,
        prefixCls = this.prefixCls;


    var header = null;
    if (showHeader) {
      if (headerRender) {
        header = headerRender(value, type, locale);
      } else {
        var TheHeader = headerComponent || CalendarHeader;
        var headerProps = {
          props: full_calendarvue_type_script_lang_js_extends({}, props, {
            prefixCls: prefixCls + '-full',
            type: type,
            value: value
          }),
          on: full_calendarvue_type_script_lang_js_extends({}, getListeners(this), {
            typeChange: this.setType,
            valueChange: this.setValue
          }),
          key: 'calendar-header'
        };
        header = h(TheHeader, headerProps);
      }
    }

    var table = type === 'date' ? h(DateTable, {
      attrs: {
        dateRender: props.dateCellRender,
        contentRender: props.dateCellContentRender,
        prefixCls: prefixCls,

        value: value,
        disabledDate: disabledDate
      },
      on: {
        'select': this.onSelect
      }
    }) : h(month_MonthTable, {
      attrs: {
        cellRender: props.monthCellRender,
        contentRender: props.monthCellContentRender,
        locale: locale,

        prefixCls: prefixCls + '-month-panel',
        value: value,
        disabledDate: disabledDate
      },
      on: {
        'select': this.onMonthSelect
      }
    });

    var children = [header, h(
      'div',
      { key: 'calendar-body', 'class': prefixCls + '-calendar-body' },
      [table]
    )];

    var className = [prefixCls + '-full'];

    if (fullscreen) {
      className.push(prefixCls + '-fullscreen');
    }

    return this.renderRoot({
      children: children,
      class: className.join(' ')
    });
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/full-calendar.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_full_calendarvue_type_script_lang_js_ = (full_calendarvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/full-calendar.vue
var full_calendar_render, full_calendar_staticRenderFns




/* normalize component */

var full_calendar_component = Object(componentNormalizer["a" /* default */])(
  src_full_calendarvue_type_script_lang_js_,
  full_calendar_render,
  full_calendar_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var full_calendar = (full_calendar_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/a-calendar/src/index.vue?vue&type=script&lang=js&
var srcvue_type_script_lang_js_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable */







function srcvue_type_script_lang_js_noop() {
  return null;
}

function zerofixed(v) {
  if (v < 10) {
    return '0' + v;
  }
  return '' + v;
}

/* harmony default export */ var srcvue_type_script_lang_js_ = ({
  name: 'ElACalendar',
  props: {
    value: [String, Object],
    defaultValue: [String, Object],
    mode: {
      type: String,
      default: 'month'
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    monthCellRender: {
      type: Function
    },
    monthFullCellRender: {
      type: Function
    },
    headerRender: {
      type: Function
    },
    headerRenderType: {
      type: String,
      default: 'panel' // panel | select
    },
    validRange: {
      type: Array
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    disabledDate: {
      type: Function
    }
  },
  components: {
    Header: header_header,
    FullCalendar: full_calendar
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data: function data() {
    var value = this.value,
        defaultValue = this.defaultValue,
        valueFormat = this.valueFormat;

    var sValue = value || defaultValue || interopDefault(external_moment_)();
    checkValidate('Calendar', defaultValue, 'defaultValue', valueFormat);
    checkValidate('Calendar', value, 'value', valueFormat);
    this._sPrefixCls = 'sp-a-fullcalendar';
    return {
      sValue: moment_util_stringToMoment(sValue, valueFormat),
      sMode: this.mode || 'month'
    };
  },

  computed: {},
  watch: {
    value: function value(val) {
      checkValidate('Calendar', val, 'value', this.valueFormat);
      this.sValue = moment_util_stringToMoment(val, this.valueFormat);
    },
    mode: function mode(val) {
      this.sMode = val;
    }
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    onHeaderValueChange: function onHeaderValueChange(value) {
      this.setValue(value, 'changePanel');
    },
    onHeaderTypeChange: function onHeaderTypeChange(mode) {
      this.sMode = mode;
      this.onPanelChange(this.sValue, mode);
    },
    onPanelChange: function onPanelChange(value, mode) {
      var val = this.valueFormat ? moment_util_momentToString(value, this.valueFormat) : value;
      this.$emit('panelChange', val, mode);
      if (value !== this.sValue) {
        this.$emit('change', val);
      }
    },
    onSelect: function onSelect(value) {
      this.setValue(value, 'select');
    },
    setValue: function setValue(value, way) {
      var prevValue = this.value ? moment_util_stringToMoment(this.value, this.valueFormat) : this.sValue;
      var mode = this.sMode,
          valueFormat = this.valueFormat;

      if (!hasProp(this, 'value')) {
        this.sValue = value;
      }
      if (way === 'select') {
        if (prevValue && prevValue.month() !== value.month()) {
          this.onPanelChange(value, mode);
        }
        this.$emit('select', valueFormat ? moment_util_momentToString(value, valueFormat) : value);
      } else if (way === 'changePanel') {
        this.onPanelChange(value, mode);
      }
    },
    getDateRange: function getDateRange(validRange, disabledDate) {
      return function (current) {
        if (!current) {
          return false;
        }
        var startDate = validRange[0],
            endDate = validRange[1];

        var inRange = !current.isBetween(startDate, endDate, 'days', '[]');
        if (disabledDate) {
          return disabledDate(current) || inRange;
        }
        return inRange;
      };
    },
    monthCellRender2: function monthCellRender2(value) {
      var h = this.$createElement;
      var _sPrefixCls = this._sPrefixCls,
          $scopedSlots = this.$scopedSlots;

      var monthCellRender = this.monthCellRender || $scopedSlots.monthCellRender || srcvue_type_script_lang_js_noop;
      return h(
        'div',
        { 'class': _sPrefixCls + '-month' },
        [h(
          'div',
          { 'class': _sPrefixCls + '-value' },
          [value.localeData().monthsShort(value)]
        ), h(
          'div',
          { 'class': _sPrefixCls + '-content' },
          [monthCellRender(value)]
        )]
      );
    },
    dateCellRender2: function dateCellRender2(value) {
      var h = this.$createElement;
      var _sPrefixCls = this._sPrefixCls,
          $scopedSlots = this.$scopedSlots;

      var dateCellRender = this.dateCellRender || $scopedSlots.dateCellRender || srcvue_type_script_lang_js_noop;
      return h(
        'div',
        { 'class': _sPrefixCls + '-date' },
        [h(
          'div',
          { 'class': _sPrefixCls + '-value' },
          [zerofixed(value.date())]
        ), h(
          'div',
          { 'class': _sPrefixCls + '-content' },
          [dateCellRender(value)]
        )]
      );
    }
  },
  render: function render(h) {
    var props = getOptionProps(this);
    var value = this.sValue,
        mode = this.sMode,
        $scopedSlots = this.$scopedSlots;
    var fullscreen = props.fullscreen,
        dateFullCellRender = props.dateFullCellRender,
        monthFullCellRender = props.monthFullCellRender;

    var headerRender = this.headerRender || $scopedSlots.headerRender;

    var monthCellRender = monthFullCellRender || $scopedSlots.monthFullCellRender || this.monthCellRender2;
    var dateCellRender = dateFullCellRender || $scopedSlots.dateFullCellRender || this.dateCellRender2;

    var disabledDate = props.disabledDate;

    if (props.validRange) {
      disabledDate = this.getDateRange(props.validRange, disabledDate);
    }
    var fullCalendarProps = {
      props: srcvue_type_script_lang_js_extends({}, props, {
        Select: {},
        type: mode === 'year' ? 'month' : 'date',
        prefixCls: this._sPrefixCls,
        showHeader: false,
        value: value,
        monthCellRender: monthCellRender,
        dateCellRender: dateCellRender,
        disabledDate: disabledDate
      }),
      on: srcvue_type_script_lang_js_extends({}, getListeners(this), {
        select: this.onSelect
      })
    };
    return h('div', [h(header_header, {
      attrs: {
        headerRenderType: this.headerRenderType,
        fullscreen: fullscreen,
        type: mode,
        headerRender: headerRender,
        value: value,
        prefixCls: this._sPrefixCls,

        validRange: props.validRange
      },
      on: {
        'typeChange': this.onHeaderTypeChange,
        'valueChange': this.onHeaderValueChange
      }
    }), h(full_calendar, fullCalendarProps)]);
  }
});
// CONCATENATED MODULE: ./packages/a-calendar/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var a_calendar_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/a-calendar/src/index.vue
var src_render, src_staticRenderFns




/* normalize component */

var src_component = Object(componentNormalizer["a" /* default */])(
  a_calendar_srcvue_type_script_lang_js_,
  src_render,
  src_staticRenderFns,
  false,
  null,
  "0e3cad83",
  null
  
)

/* harmony default export */ var src = (src_component.exports);
// CONCATENATED MODULE: ./packages/a-calendar/index.js


src.install = function (Vue) {
  Vue.component(src.name, src);
};

/* harmony default export */ var a_calendar = __webpack_exports__["default"] = (src);

/***/ })
/******/ ]);