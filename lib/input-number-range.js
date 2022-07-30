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
/******/ 	return __webpack_require__(__webpack_require__.s = 161);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(11);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(17);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/input-number"
var input_number_ = __webpack_require__(60);
var input_number_default = /*#__PURE__*/__webpack_require__.n(input_number_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input-number/src/input-number-range.vue?vue&type=script&lang=js&


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ var input_number_rangevue_type_script_lang_js_ = ({
  name: 'ElInputNumberRange',
  props: {
    childConfig: {
      type: [Object, Array],
      default: function _default() {
        return {};
      }
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    disabled: Boolean,
    size: String,
    placeholder: String,
    value: {
      type: [Array, Object],
      default: function _default() {
        return {};
      }
    },
    checkLimit: { // 是否验证区间输入
      type: Boolean,
      default: false
    },
    separateText: {
      type: String,
      default: '至'
    }
  },
  components: {
    inputNumber: input_number_default.a
  },
  data: function data() {
    return {
      currentValue: [0, 0],
      inputDefaultProps: {
        controls: false
      }
    };
  },

  computed: {
    childInputProps: function childInputProps() {
      var inputProps1 = _extends({}, this.inputDefaultProps, this._childProps[0], {
        disabled: this.inputNumberRangeDisabled[0],
        size: this.inputNumberRangeSize,
        value: this.currentValue[0]
      });
      var inputProps2 = _extends({}, this.inputDefaultProps, this._childProps[1], {
        disabled: this.inputNumberRangeDisabled[1],
        size: this.inputNumberRangeSize,
        value: this.currentValue[1]
      });

      this._inputLimit.max && (inputProps1.max = this._inputLimit.max);
      this._inputLimit.min && (inputProps2.min = this._inputLimit.min);

      return [inputProps1, inputProps2];
    },
    _childProps: function _childProps() {
      var childConfig = this.childConfig;
      var isObjct = Object.prototype.toString.call(childConfig).toLowerCase() === '[object object]';
      if (isObjct) {
        return [childConfig.props, childConfig.props];
      } else {
        return [(childConfig[0] || {}).props, (childConfig[1] || {}).props];
      }
    },
    _inputLimit: function _inputLimit(config) {
      if (!this.checkLimit) {
        return {};
      } // 不验证区间直接返回
      var currentValue = this.currentValue;
      var limitConfig = {};
      if (currentValue[0] !== undefined && currentValue[0] > config.min) {
        limitConfig.min = currentValue[0];
      }
      if (currentValue[1] !== undefined && currentValue[0] < config.max) {
        limitConfig.max = currentValue[1];
      }
      return limitConfig;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberRangeSize: function inputNumberRangeSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputNumberRangeDisabled: function inputNumberRangeDisabled() {
      var disabledArray = [!!Object(external_lodash_["get"])(this._childProps, '[0].disabled') || this.disabled || !!(this.elForm || {}).disabled, !!Object(external_lodash_["get"])(this._childProps, '[1].disabled') || this.disabled || !!(this.elForm || {}).disabled];
      disabledArray[2] = disabledArray[0] && disabledArray[1];
      return disabledArray;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(value) {
        this.currentValue = value || {};
      }
    }
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    changeValue: function changeValue() {
      this.$emit('change', this.currentValue);
    },
    inputValue: function inputValue(event, index) {
      var _extends2;

      if (event === this.currentValue[index]) {
        return;
      };
      var forceFlg = false; // 越界强制更新标识
      // 大小区间验证
      if (index === 0 && !Object(util_["isEmpty"])(this.currentValue[1])) {
        forceFlg = true;
        event > this.currentValue[1] && (event = this.currentValue[1]);
      } else if (!Object(util_["isEmpty"])(this.currentValue[0])) {
        forceFlg = true;
        event < this.currentValue[0] && (event = this.currentValue[0]);
      }
      var newValue = _extends({}, this.currentValue, (_extends2 = {}, _extends2[index] = event, _extends2));

      this.setCurrentValue(newValue, forceFlg);
    },
    setCurrentValue: function setCurrentValue(newVal, forceFlg) {
      if (!forceFlg && Object(util_["isEqual"])(this.currentValue, newVal)) {
        return;
      }
      this.$emit('input', newVal);
      this.currentValue = newVal;
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var $slots = this.$slots;

    return h(
      'div',
      { 'class': ['sp-input-number-range', this.inputNumberRangeSize ? 'sp-input-number-range--' + this.inputNumberRangeSize : '', { 'is-disabled': this.inputNumberRangeDisabled[2] }, {
          'sp-input-number-range-group': $slots.prepend || $slots.append,
          'sp-input-number-range-group--append': $slots.append,
          'sp-input-number-range-group--prepend': $slots.prepend
        }] },
      [$slots.prepend &&
      // 前置元素
      h(
        'div',
        { 'class': 'sp-input-number-range-group__prepend' },
        [$slots.prepend]
      ), h(
        'div',
        { 'class': 'sp-input-number-range__local' },
        [h('input-number', external_babel_helper_vue_jsx_merge_props_default()([{
          attrs: { placeholder: Object(external_lodash_["get"])(this.childInputProps, '[0].placeholder') || this.placeholder },
          'class': 'sp-input-number-range__local-child' }, {
          props: _extends({}, this.props, this.childInputProps[0]),
          on: _extends({}, this.$listeners, {
            change: this.changeValue,
            input: function input($event) {
              _this.inputValue($event, 0);
            }
          })
        }])), h(
          'span',
          { 'class': 'sp-input-number-range__separate sp-input-number-range__local-child' },
          [this.separateText]
        ), h('input-number', external_babel_helper_vue_jsx_merge_props_default()([{
          attrs: { placeholder: Object(external_lodash_["get"])(this.childInputProps, '[1].placeholder') || this.placeholder },
          'class': 'sp-input-number-range__local-child' }, {
          props: _extends({}, this.props, this.childInputProps[1]),
          on: _extends({}, this.$listeners, {
            change: this.changeValue,
            input: function input($event) {
              _this.inputValue($event, 1);
            }
          })
        }]))]
      ), $slots.append &&
      // 后置元素
      h(
        'div',
        { 'class': 'sp-input-number-range-group__append' },
        [$slots.append]
      )]
    );
  }
});
// CONCATENATED MODULE: ./packages/input-number/src/input-number-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_input_number_rangevue_type_script_lang_js_ = (input_number_rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/input-number/src/input-number-range.vue
var input_number_range_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_input_number_rangevue_type_script_lang_js_,
  input_number_range_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input_number_range = (component.exports);
// CONCATENATED MODULE: ./packages/input-number-range/index.js


/* istanbul ignore next */
input_number_range.install = function (Vue) {
  Vue.component(input_number_range.name, input_number_range);
};

/* harmony default export */ var packages_input_number_range = __webpack_exports__["default"] = (input_number_range);

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/util");

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/input-number");

/***/ })

/******/ });