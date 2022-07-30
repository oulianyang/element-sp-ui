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
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
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

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(11);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: ./packages/affix/index.js + 3 modules
var affix = __webpack_require__(51);

// EXTERNAL MODULE: ./packages/icon/index.js + 5 modules
var icon = __webpack_require__(69);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(17);

// EXTERNAL MODULE: ./src/directives/drag-dom.js
var drag_dom = __webpack_require__(58);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/affix-list/src/affix-list.vue?vue&type=script&lang=js&








/* harmony default export */ var affix_listvue_type_script_lang_js_ = ({
  name: 'AffixList',
  props: {
    target: String,
    position: {
      type: String,
      default: 'left'
    },
    offsetTop: {
      type: String
    },
    offsetBottom: {
      type: String
    },
    offsetRight: {
      type: String
    },
    offsetLeft: {
      type: String
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    visibilityHeight: {
      type: Number,
      default: 400
    },
    dragMove: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElIcons: icon["default"],
    ElAffix: affix["default"]
  },
  directives: {
    dragDom: drag_dom["a" /* default */]
  },
  data: function data() {
    return {
      visible: false,
      container: document,
      horizontalLeft: false // 是否在左侧
    };
  },

  computed: {
    //   el() {
    //     let el;
    //     if (this.target) {
    //       el = document.querySelector(this.target);
    //     }
    //     if (!el) {
    //       el = document.documentElement;
    //       this.container = document;
    //     } else {
    //       this.container = el;
    //     }
    //     return el;
    //   }
  },
  watch: {
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.$nextTick(function () {
          _this.updateHorizontal();
        });
      }
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.init();
      _this2.container.addEventListener('scroll', _this2.throttleScroll);
      _this2.throttleScroll();
    });

    setTimeout(function () {
      _this2.updateHorizontal();
    });
  },

  methods: {
    init: function init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error('target is not existed: ' + this.target);
        }
        this.container = this.el;
      }
    },
    scrollToTop: function scrollToTop() {
      var el = this.el;
      var scrollTop = el.scrollTop;
      Object(util_["requestAnimationEaseInOut"])(function (val) {
        el.scrollTop = scrollTop * val;
      });
    },

    throttleScroll: Object(external_lodash_["throttle"])(function () {
      var scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    }, 300),
    updateHorizontal: function updateHorizontal() {
      var target = this.$el;
      if (target && (target.offsetLeft + target.clientWidth / 2) / document.body.clientWidth > 0.5) {
        this.horizontalLeft = false;
      } else {
        this.horizontalLeft = true;
      }
    },
    dragMoveEndFn: function dragMoveEndFn() {
      this.updateHorizontal();
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var visible = this.visible,
        position = this.position,
        offsetTop = this.offsetTop,
        offsetLeft = this.offsetLeft,
        offsetBottom = this.offsetBottom,
        offsetRight = this.offsetRight,
        list = this.list,
        dragMove = this.dragMove;

    if (!offsetBottom && !offsetTop) {
      offsetTop = '50%';
    }
    if (!offsetRight && !offsetLeft) {
      offsetRight = '40px';
    }

    return visible && h(
      'div',
      external_babel_helper_vue_jsx_merge_props_default()([{
        directives: [{
          name: 'drag-dom',
          value: dragMove
        }]
      }, {
        attrs: {
          'element-drag-mouse-target': 'sp-affix-list__drag-handle'
        },
        'class': ['sp-affix-list', 'sp-affix-list--fix', 'sp-affix-list--' + position, {
          'sp-affix-list--horizontal-left': this.horizontalLeft
        }], style: '\n          --offsetTop: ' + offsetTop + ';\n          --offsetBottom: ' + offsetBottom + ';\n          --offsetLeft: ' + offsetLeft + ';\n          --offsetRight: ' + offsetRight + ';' }]),
      [h(
        'div',
        {
          ref: 'dragTargetRef',
          'class': ['sp-affix-list__drag-handle', {
            'sp-affix-list__drag-disabled': !this.dragMove
          }] },
        [h('i', { 'class': 'sp-icon-draggable' })]
      ), h(
        'div',
        { 'class': 'sp-affix-list--wrap' },
        [list.map(function (item) {
          return h(
            'div',
            external_babel_helper_vue_jsx_merge_props_default()([{ 'class': 'sp-affix-list--item'
            }, {
              on: {
                click: function click() {
                  if (item.scrollToTop) {
                    _this3.scrollToTop();
                  }
                  _this3.$emit('click', item);
                }
              }
            }]),
            [h(
              'div',
              { 'class': 'sp-affix-list--icon' },
              [typeof item.icon === 'string' ? h('el-icons', { 'class': 'sp-icon-' + item.icon }) : item.icon]
            ), item.label && h(
              'div',
              { 'class': 'sp-affix-list__detail' },
              [item.label]
            )]
          );
        })]
      )]
    );
  }
});
// CONCATENATED MODULE: ./packages/affix-list/src/affix-list.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_affix_listvue_type_script_lang_js_ = (affix_listvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/affix-list/src/affix-list.vue
var affix_list_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_affix_listvue_type_script_lang_js_,
  affix_list_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var affix_list = (component.exports);
// CONCATENATED MODULE: ./packages/affix-list/index.js


affix_list.install = function (Vue) {
  Vue.component(affix_list.name, affix_list);
};

/* harmony default export */ var packages_affix_list = __webpack_exports__["default"] = (affix_list);

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/util");

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

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isDragging = false;
// 获取dom
function getDragDom(el, attr) {
  var domClass = el.getAttribute(attr);
  var dom = void 0;
  if (domClass) {
    dom = el.querySelector('.' + domClass);
  }
  if (!dom) {
    dom = el;
  }
  return dom;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  bind: function bind(el, binding, vnode) {
    if (!binding.value) {
      return;
    }
    var dragTarget = getDragDom(el, 'element-drag-mouse-target');
    var dragDom = getDragDom(el, 'element-drag-dom');

    dragTarget.style.cssText += ';cursor:move;';

    var getStyle = function () {
      if (window.document.currentStyle) {
        return function (dom, attr) {
          return dom.currentStyle[attr];
        };
      } else {
        return function (dom, attr) {
          return getComputedStyle(dom, null)[attr];
        };
      }
    }();

    dragTarget.onmousedown = function (e) {
      if (isDragging) return;
      document.onselectstart = function () {
        return false;
      };
      document.ondragstart = function () {
        return false;
      };

      var startX = e.clientX;
      var startY = e.clientY;

      var dragDomWidth = dragDom.offsetWidth;
      var dragDomHeight = dragDom.offsetHeight;

      var screenWidth = document.body.clientWidth;
      var screenHeight = document.body.clientHeight;

      var minDragDomLeft = dragDom.offsetLeft;
      var maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      var minDragDomTop = dragDom.offsetTop;
      var maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      var styL = getStyle(dragDom, 'left');
      var styT = getStyle(dragDom, 'top');

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL / 100);
        styT = +document.body.clientHeight * (+styT / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      }

      isDragging = true;
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', upFn);

      return false;
      function moveFn(e) {
        var left = e.clientX - startX;
        var top = e.clientY - startY;

        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        dragDom.style.cssText += ';left:' + (styL + left) + 'px;top:' + (styT + top) + 'px; right: inherit; bottom: inherit;';
      }

      function upFn() {
        document.removeEventListener('mousemove', moveFn);
        document.removeEventListener('mouseup', upFn);
        document.onselectstart = null;
        document.ondragstart = null;
        vnode.context && typeof vnode.context.dragMoveEndFn === 'function' && vnode.context.dragMoveEndFn();
        isDragging = false;
      }
    };
  }
});

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/icon/src/icon.vue?vue&type=template&id=347ac0c9&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", { class: "sp-icon-" + _vm.name })
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/icon/src/icon.vue?vue&type=template&id=347ac0c9&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/icon/src/icon.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var iconvue_type_script_lang_js_ = ({
  name: 'ElIcon',

  props: {
    name: String
  }
});
// CONCATENATED MODULE: ./packages/icon/src/icon.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_iconvue_type_script_lang_js_ = (iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/icon/src/icon.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_iconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon = (component.exports);
// CONCATENATED MODULE: ./packages/icon/index.js


/* istanbul ignore next */
icon.install = function (Vue) {
  Vue.component(icon.name, icon);
};

/* harmony default export */ var packages_icon = __webpack_exports__["default"] = (icon);

/***/ })

/******/ });