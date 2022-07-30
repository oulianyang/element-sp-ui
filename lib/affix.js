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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
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

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/getScroll");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/throttleByAnimationFrame");

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(11);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/getScroll"
var getScroll_ = __webpack_require__(34);
var getScroll_default = /*#__PURE__*/__webpack_require__.n(getScroll_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/throttleByAnimationFrame"
var throttleByAnimationFrame_ = __webpack_require__(46);
var throttleByAnimationFrame_default = /*#__PURE__*/__webpack_require__.n(throttleByAnimationFrame_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(17);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/affix/src/affix.vue?vue&type=script&lang=js&


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
}

function getOffset(element, target) {
  var elemRect = element.getBoundingClientRect();
  var targetRect = getTargetRect(target);

  var scrollTop = getScroll_default()(target, true);
  var scrollLeft = getScroll_default()(target, false);

  var docElem = window.document.body;
  var clientTop = docElem.clientTop || 0;
  var clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

function addEventListener(target, eventType, callback, option) {
  if (target.addEventListener) {
    var useCapture = false;
    if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
      useCapture = option.capture || false;
    } else if (typeof option === 'boolean') {
      useCapture = option;
    }
    target.addEventListener(eventType, callback, useCapture);

    return {
      remove: function remove() {
        target.removeEventListener(eventType, callback, useCapture);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, callback);
      }
    };
  }
}

/* harmony default export */ var affixvue_type_script_lang_js_ = ({
  name: 'ElAffix',
  props: {
    /**
     * 距离窗口顶部达到指定偏移量后触发
     */
    offsetTop: {
      type: Number
    },
    offset: {
      type: Number
    },
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom: {
      type: Number
    },
    /** 固定状态改变时触发的回调函数 */
    // onChange?: (affixed?: boolean) => void;
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target: {
      type: Function
    }
  },
  data: function data() {
    this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
    this.eventHandlers = {};
    return {
      affixStyle: undefined,
      placeholderStyle: undefined
    };
  },

  computed: {},
  watch: {
    target: function target(val) {
      var _this = this;

      this.$nextTick(function () {
        _this.clearEventListeners();
        _this.setTargetEventListeners(val);
        // Mock Event object.
        _this.updatePosition({});
      });
    }
  },
  created: function created() {},
  beforeMount: function beforeMount() {
    this.updatePosition = throttleByAnimationFrame_default()(this.updatePosition);
  },
  mounted: function mounted() {
    var _this2 = this;

    var target = this.target || getDefaultTarget;

    this.timeout = setTimeout(function () {
      _this2.setTargetEventListeners(target);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    this.updatePosition.cancel();
  },

  methods: {
    setState: function setState(state, callback) {
      Object.assign(this.$data, typeof state === 'function' ? state(this.$data) : state);
      this.$nextTick(function () {
        callback && callback();
      });
    },
    setAffixStyle: function setAffixStyle(e, affixStyle) {
      var _this3 = this;

      var _target = this.target,
          target = _target === undefined ? getDefaultTarget : _target;

      var originalAffixStyle = this.affixStyle;
      var isWindow = target() === window;
      if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
        return;
      }
      if (Object(external_lodash_["isEqual"])(affixStyle, originalAffixStyle)) {
        return;
      }
      this.setState({ affixStyle: affixStyle }, function () {
        var affixed = !!_this3.affixStyle;
        if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
          _this3.$emit('change', affixed);
        }
      });
    },
    setPlaceholderStyle: function setPlaceholderStyle(placeholderStyle) {
      var originalPlaceholderStyle = this.placeholderStyle;
      if (Object(external_lodash_["isEqual"])(placeholderStyle, originalPlaceholderStyle)) {
        return;
      }
      this.setState({ placeholderStyle: placeholderStyle });
    },
    syncPlaceholderStyle: function syncPlaceholderStyle(e) {
      var affixStyle = this.affixStyle;

      if (!affixStyle) {
        return;
      }
      this.$refs.placeholderNode.style.cssText = '';
      this.setAffixStyle(e, _extends({}, affixStyle, {
        width: this.$refs.placeholderNode.offsetWidth + 'px'
      }));
      this.setPlaceholderStyle({
        width: this.$refs.placeholderNode.offsetWidth + 'px'
      });
    },
    setTargetEventListeners: function setTargetEventListeners(getTarget) {
      var _this4 = this;

      var target = getTarget();

      this.clearEventListeners();

      this.events.forEach(function (eventName) {
        _this4.eventHandlers[eventName] = addEventListener(target, eventName, _this4.updatePosition);
      });
    },
    clearEventListeners: function clearEventListeners() {
      var _this5 = this;

      this.events.forEach(function (eventName) {
        var handle = _this5.eventHandlers[eventName];
        if (handle && handle.remove) {
          handle.remove();
        }
      });
    },

    // 更新位置
    updatePosition: function updatePosition(e) {
      var offsetTop = this.offsetTop;
      var offsetBottom = this.offsetBottom,
          offset = this.offset,
          _target2 = this.target,
          target = _target2 === undefined ? getDefaultTarget : _target2;

      var targetNode = target();

      // Backwards support
      offsetTop = offsetTop || offset;
      var scrollTop = getScroll_default()(targetNode, true);
      var affixNode = this.$el;
      var elemOffset = getOffset(affixNode, targetNode);
      var elemSize = {
        width: this.$refs.fixedNode.offsetWidth,
        height: this.$refs.fixedNode.offsetHeight
      };

      var offsetMode = {
        top: false,
        bottom: false
      };
      // Default to `offsetTop=0`.
      if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
        offsetMode.top = true;
        offsetTop = 0;
      } else {
        offsetMode.top = typeof offsetTop === 'number';
        offsetMode.bottom = typeof offsetBottom === 'number';
      }

      var targetRect = getTargetRect(targetNode);
      var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
      if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
        // Fixed Top
        var width = elemOffset.width + 'px';
        var top = targetRect.top + offsetTop + 'px';
        this.setAffixStyle(e, {
          position: 'fixed',
          top: top,
          left: targetRect.left + elemOffset.left + 'px',
          width: width
        });
        this.setPlaceholderStyle({
          width: width,
          height: elemSize.height + 'px'
        });
      } else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
        // Fixed Bottom
        var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
        var _width = elemOffset.width + 'px';
        this.setAffixStyle(e, {
          position: 'fixed',
          bottom: targetBottomOffet + offsetBottom + 'px',
          left: targetRect.left + elemOffset.left + 'px',
          width: _width
        });
        this.setPlaceholderStyle({
          width: _width,
          height: elemOffset.height + 'px'
        });
      } else {
        var affixStyle = this.affixStyle;

        if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
          this.setAffixStyle(e, _extends({}, affixStyle, { width: affixNode.offsetWidth + 'px' }));
        } else {
          this.setAffixStyle(e, null);
        }
        this.setPlaceholderStyle(null);
      }
      if (e.type === 'resize') {
        this.syncPlaceholderStyle(e);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var affixStyle = this.affixStyle,
        placeholderStyle = this.placeholderStyle,
        $slots = this.$slots,
        $props = this.$props;


    var props = {
      attrs: Object(external_lodash_["omit"])($props, ['offsetTop', 'offsetBottom', 'target'])
    };

    return h(
      'div',
      external_babel_helper_vue_jsx_merge_props_default()([props, { 'class': 'sp-affix', style: placeholderStyle, ref: 'placeholderNode' }]),
      [h(
        'div',
        { 'class': {
            'sp-affix__content': affixStyle
          }, style: affixStyle, ref: 'fixedNode' },
        [$slots.default]
      )]
    );
  }
});
// CONCATENATED MODULE: ./packages/affix/src/affix.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_affixvue_type_script_lang_js_ = (affixvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/affix/src/affix.vue
var affix_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_affixvue_type_script_lang_js_,
  affix_render,
  staticRenderFns,
  false,
  null,
  "164a372a",
  null
  
)

/* harmony default export */ var affix = (component.exports);
// CONCATENATED MODULE: ./packages/affix/index.js


/* istanbul ignore next */
affix.install = function (Vue) {
  Vue.component(affix.name, affix);
};

/* harmony default export */ var packages_affix = __webpack_exports__["default"] = (affix);

/***/ })

/******/ });