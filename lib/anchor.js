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
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
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

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(31);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: ./packages/affix/index.js + 3 modules
var packages_affix = __webpack_require__(51);

// EXTERNAL MODULE: external "raf"
var external_raf_ = __webpack_require__(73);
var external_raf_default = /*#__PURE__*/__webpack_require__.n(external_raf_);

// CONCATENATED MODULE: ./packages/anchor/src/utils/getScroll.js
function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';
  var isWindow = target === window;

  var ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}
// CONCATENATED MODULE: ./packages/anchor/src/utils/easings.js
function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
// CONCATENATED MODULE: ./packages/anchor/src/utils/scrollTo.js




// interface ScrollToOptions {
//   /** Scroll container, default as window */
//   getContainer?: () => HTMLElement | Window;
//   /** Scroll end callback */
//   callback?: () => any;
//   /** Animation duration, default as 450 */
//   duration?: number;
// }

function scrollTo(y) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$getContainer = options.getContainer,
      getContainer = _options$getContainer === undefined ? function () {
    return window;
  } : _options$getContainer,
      callback = options.callback,
      _options$duration = options.duration,
      duration = _options$duration === undefined ? 450 : _options$duration;


  var container = getContainer();
  var scrollTop = getScroll(container, true);
  var startTime = Date.now();

  var frameFunc = function frameFunc() {
    var timestamp = Date.now();
    var time = timestamp - startTime;
    var nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      container.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      external_raf_default()(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  external_raf_default()(frameFunc);
}
// EXTERNAL MODULE: ./packages/anchor/src/utils/props-util.js
var props_util = __webpack_require__(62);

// CONCATENATED MODULE: ./packages/anchor/src/utils/BaseMixin.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ var BaseMixin = ({
  methods: {
    setState: function setState() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var newState = typeof state === 'function' ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        var s = this.getDerivedStateFromProps(Object(props_util["b" /* getOptionProps */])(this), _extends({}, this.$data, newState));
        if (s === null) {
          return;
        } else {
          newState = _extends({}, newState, s || {});
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
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/anchor/src/anchor.vue?vue&type=script&lang=js&
var anchorvue_type_script_lang_js_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








function getDefaultContainer() {
  return window;
}
function getOffsetTop(element, container) {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }
    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}
var sharpMatcherRegx = /#([^#]+)$/;

/* harmony default export */ var anchorvue_type_script_lang_js_ = ({
  name: 'ElAnchor',

  components: {
    ElAffix: packages_affix["default"]
  },

  mixins: [BaseMixin],

  props: {
    offsetTop: Number,
    bounds: Number,
    wrapperClass: String,
    wrapperStyle: Object,
    getCurrentAnchor: Function,
    targetOffset: Number,
    affix: {
      type: Boolean,
      default: true
    },
    showInkInFixed: false,
    getContainer: {
      type: Function,
      default: getDefaultContainer
    },
    activeLinkBorder: { // 薯片 激活时展示边框
      type: Boolean,
      default: false
    },
    clickPrevent: { // 薯片 点击时阻止默认行为
      type: Boolean,
      default: false
    },
    showTooltip: { // 薯片 是否显示提示
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    this.links = [];
    this._sPrefixCls = '';
    this.prefixCls = 'sp-anchor';
    return {
      activeLink: null
    };
  },
  provide: function provide() {
    var _this = this;

    return {
      antAnchor: {
        registerLink: function registerLink(link) {
          if (!_this.links.includes(link)) {
            _this.links.push(link);
          }
        },
        unregisterLink: function unregisterLink(link) {
          var index = _this.links.indexOf(link);
          if (index !== -1) {
            _this.links.splice(index, 1);
          }
        },
        $data: this.$data,
        scrollTo: this.handleScrollTo
      },
      antAnchorContext: this
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      var getContainer = _this2.getContainer;

      _this2.scrollContainer = getContainer();
      _this2.scrollEvent = Object(dom_["on"])(_this2.scrollContainer, 'scroll', _this2.handleScroll);
      _this2.handleScroll();
    });
  },
  updated: function updated() {
    var _this3 = this;

    this.$nextTick(function () {
      if (_this3.scrollEvent) {
        var getContainer = _this3.getContainer;

        var currentContainer = getContainer();
        if (_this3.scrollContainer !== currentContainer) {
          _this3.scrollContainer = currentContainer;
          _this3.scrollEvent.remove();
          _this3.scrollEvent = Object(dom_["on"])(_this3.scrollContainer, 'scroll', _this3.handleScroll);
          _this3.handleScroll();
        }
      }
      _this3.updateInk();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  },


  methods: {
    getCurrentActiveLink: function getCurrentActiveLink() {
      var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var getCurrentAnchor = this.getCurrentAnchor;


      if (typeof getCurrentAnchor === 'function') {
        return getCurrentAnchor();
      }
      var activeLink = '';
      if (typeof document === 'undefined') {
        return activeLink;
      }

      var linkSections = [];
      var getContainer = this.getContainer;

      var container = getContainer();
      this.links.forEach(function (link) {
        var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch) {
          return;
        }
        var target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          var top = getOffsetTop(target, container);
          if (top < offsetTop + bounds) {
            linkSections.push({
              link: link,
              top: top
            });
          }
        }
      });

      if (linkSections.length) {
        var maxSection = linkSections.reduce(function (prev, curr) {
          return curr.top > prev.top ? curr : prev;
        });
        return maxSection.link;
      }
      return '';
    },
    handleScrollTo: function handleScrollTo(link) {
      var _this4 = this;

      var offsetTop = this.offsetTop,
          getContainer = this.getContainer,
          targetOffset = this.targetOffset;


      this.setCurrentActiveLink(link);
      var container = getContainer();
      var scrollTop = getScroll(container, true);
      var sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch) {
        return;
      }
      var targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      var eleOffsetTop = getOffsetTop(targetElement, container);
      var y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      this.animating = true;

      scrollTo(y, {
        callback: function callback() {
          _this4.animating = false;
        },
        getContainer: getContainer
      });
    },
    setCurrentActiveLink: function setCurrentActiveLink(link) {
      var activeLink = this.activeLink;


      if (activeLink !== link) {
        this.setState({
          activeLink: link
        });
        this.$emit('change', link);
      }
    },
    handleScroll: function handleScroll() {
      if (this.animating) {
        return;
      }
      var offsetTop = this.offsetTop,
          bounds = this.bounds,
          targetOffset = this.targetOffset;

      var currentActiveLink = this.getCurrentActiveLink(targetOffset !== undefined ? targetOffset : offsetTop || 0, bounds);
      this.setCurrentActiveLink(currentActiveLink);
    },
    updateInk: function updateInk() {
      if (typeof document === 'undefined') {
        return;
      }
      var _sPrefixCls = this._sPrefixCls;

      var linkNode = this.$el.getElementsByClassName(_sPrefixCls + '-link-title-active')[0];
      if (linkNode) {
        this.$refs.inkNode.style.top = linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5 + 'px';
      }
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        offsetTop = this.offsetTop,
        affix = this.affix,
        showInkInFixed = this.showInkInFixed,
        activeLink = this.activeLink,
        $slots = this.$slots,
        getContainer = this.getContainer,
        activeLinkBorder = this.activeLinkBorder;


    this._sPrefixCls = prefixCls;

    var inkClass = external_classnames_default()(prefixCls + '-ink-ball', {
      visible: activeLink
    });

    var wrapperClass = external_classnames_default()(this.wrapperClass, prefixCls + '-wrapper');

    var anchorClass = external_classnames_default()(prefixCls, {
      fixed: !affix && !showInkInFixed,
      'sp-anchor-active-link-border': activeLinkBorder
    });

    var wrapperStyle = anchorvue_type_script_lang_js_extends({
      maxHeight: offsetTop ? 'calc(100vh - ' + offsetTop + 'px)' : '100vh'
    }, this.wrapperStyle);

    var anchorContent = h(
      'div',
      { 'class': wrapperClass, style: wrapperStyle },
      [h(
        'div',
        { 'class': anchorClass },
        [h(
          'div',
          { 'class': prefixCls + '-ink' },
          [h('span', { 'class': inkClass, ref: 'inkNode' })]
        ), $slots.default]
      )]
    );

    return !affix ? anchorContent : h(
      packages_affix["default"],
      {
        attrs: { offsetTop: offsetTop, target: getContainer }
      },
      [anchorContent]
    );
  }
});
// CONCATENATED MODULE: ./packages/anchor/src/anchor.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_anchorvue_type_script_lang_js_ = (anchorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/anchor/src/anchor.vue
var anchor_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_anchorvue_type_script_lang_js_,
  anchor_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_anchor = (component.exports);
// CONCATENATED MODULE: ./packages/anchor/index.js


/* istanbul ignore next */
src_anchor.install = function (Vue) {
  Vue.component(src_anchor.name, src_anchor);
};

/* harmony default export */ var packages_anchor = __webpack_exports__["default"] = (src_anchor);

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/dom");

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/getScroll");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/throttleByAnimationFrame");

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = require("lodash/isPlainObject");

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

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getEvents */
/* unused harmony export getDataEvents */
/* unused harmony export getListeners */
/* unused harmony export getClass */
/* unused harmony export getStyle */
/* unused harmony export getComponentName */
/* unused harmony export isEmptyElement */
/* unused harmony export isStringElement */
/* unused harmony export filterEmpty */
/* unused harmony export mergeProps */
/* unused harmony export hasProp */
/* unused harmony export filterProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getOptionProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getComponentFromProp; });
/* unused harmony export getSlotOptions */
/* unused harmony export slotHasProp */
/* unused harmony export getPropsData */
/* unused harmony export getKey */
/* unused harmony export getAttrs */
/* unused harmony export getValueByProp */
/* unused harmony export parseStyleText */
/* unused harmony export initDefaultProps */
/* unused harmony export isValidElement */
/* unused harmony export camelize */
/* unused harmony export getSlots */
/* unused harmony export getSlot */
/* unused harmony export getAllProps */
/* unused harmony export getAllChildren */
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



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
  return _extends({}, slots, getScopedSlots(ele));
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
    return _extends({}, res, propsData);
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
  return _extends({}, data.props, data.attrs, componentOptions.propsData);
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
  return _extends({}, events);
}

// 获取 xxx.native 或者 原生标签 事件
function getDataEvents(child) {
  var events = {};
  if (child.data && child.data.on) {
    events = child.data.on;
  }
  return _extends({}, events);
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
    classnames__WEBPACK_IMPORTED_MODULE_1___default()(tempCls).split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = _extends({}, cls, tempCls);
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
      if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(v)) {
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


/* unused harmony default export */ var _unused_webpack_default_export = (hasProp);

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

module.exports = require("raf");

/***/ })

/******/ });