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
/******/ 	return __webpack_require__(__webpack_require__.s = 149);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/migrating");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/merge");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/resize-event");

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/input-search/src/input-search.vue?vue&type=template&id=e96f017a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Autocomplete",
    _vm._b(
      {
        ref: "autocomplete",
        class: ["sp-input-search", "is-" + _vm.trigger],
        attrs: {
          "popper-class": _vm.popperClass,
          placeholder: _vm.placeholder,
          "fetch-suggestions": _vm.onFetchSuggestions,
          clearable: _vm.clearable
        },
        on: {
          focus: function($event) {
            return _vm.onFocus()
          },
          blur: function($event) {
            _vm.focused = false
          }
        },
        scopedSlots: _vm._u(
          [
            {
              key: "default",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c(
                    "div",
                    { staticClass: "sp-input-search__item" },
                    [
                      _vm._t("default", [_vm._v(_vm._s(item.value))], {
                        item: item
                      }),
                      _vm.trigger === "manual"
                        ? _c(
                            "span",
                            {
                              staticClass: "sp-input-search__remove",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.onRemoveHistory(item)
                                }
                              }
                            },
                            [_vm._v("╳")]
                          )
                        : _vm._e()
                    ],
                    2
                  ),
                  item === _vm.lastItem
                    ? [
                        _vm.trigger === "auto" && _vm.fetchLoading
                          ? _c(
                              "div",
                              { staticClass: "sp-input-search__loading" },
                              [
                                _c("i", {
                                  staticClass: "sp-icon-loading",
                                  attrs: { "loading-text": _vm.loadingText }
                                })
                              ]
                            )
                          : _vm._e(),
                        _vm.trigger === "manual"
                          ? _c(
                              "div",
                              {
                                staticClass: "sp-input-search__clear",
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                  }
                                }
                              },
                              [
                                _vm.$children.length
                                  ? _c(
                                      "Button",
                                      {
                                        attrs: { type: "text" },
                                        on: {
                                          click: function($event) {
                                            return _vm.onClearHistory()
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.clearText))]
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    : _vm._e()
                ]
              }
            }
          ],
          null,
          true
        ),
        model: {
          value: _vm.model,
          callback: function($$v) {
            _vm.model = $$v
          },
          expression: "model"
        }
      },
      "Autocomplete",
      _vm.$attrs,
      false
    ),
    [
      _vm.trigger === "auto"
        ? _c("i", {
            staticClass: "sp-input-search__icon sp-icon-search",
            attrs: { slot: "prefix" },
            slot: "prefix"
          })
        : _vm.trigger === "manual" && _vm.selectOptions.length
        ? _c(
            "Select",
            {
              attrs: { slot: "prepend", placeholder: _vm.selectPlaceholder },
              slot: "prepend",
              model: {
                value: _vm.selectModel,
                callback: function($$v) {
                  _vm.selectModel = $$v
                },
                expression: "selectModel"
              }
            },
            _vm._l(_vm.selectOptions, function(o, i) {
              return _c("Option", {
                key: i,
                attrs: {
                  label: o[_vm.selectLabelKey],
                  value: o[_vm.selectValueKey]
                }
              })
            }),
            1
          )
        : _vm._e(),
      _vm.trigger === "manual"
        ? _c("template", { slot: "append" }, [
            _c("i", {
              staticClass: "sp-input-search__icon sp-icon-search",
              attrs: { text: _vm.searchText },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.onSearch()
                }
              }
            })
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/input-search/src/input-search.vue?vue&type=template&id=e96f017a&

// EXTERNAL MODULE: ./src/mixins/locale.js
var locale = __webpack_require__(16);

// EXTERNAL MODULE: ./packages/popover/index.js + 6 modules
var popover = __webpack_require__(68);

// EXTERNAL MODULE: ./packages/input/index.js + 6 modules
var input = __webpack_require__(27);

// EXTERNAL MODULE: ./packages/button/index.js + 5 modules
var packages_button = __webpack_require__(35);

// EXTERNAL MODULE: ./packages/select/index.js + 11 modules
var packages_select = __webpack_require__(66);

// EXTERNAL MODULE: ./packages/select/src/option.vue + 4 modules
var src_option = __webpack_require__(36);

// EXTERNAL MODULE: ./packages/autocomplete/index.js + 10 modules
var autocomplete = __webpack_require__(67);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input-search/src/input-search.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//
//










/* harmony default export */ var input_searchvue_type_script_lang_js_ = ({
  name: 'ElInputSearch',

  components: { Popover: popover["default"], Input: input["default"], Button: packages_button["default"], Select: packages_select["default"], Option: src_option["a" /* default */], Autocomplete: autocomplete["default"] },

  mixins: [locale["a" /* default */]],

  props: {
    value: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'auto',
      validator: function validator(value) {
        return ['auto', 'manual'].includes(value) || console.warn('搜索框触发类型只能是 “auto” 或 “manual”') || false;
      }
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    selectPlaceholder: {
      type: String,
      default: '请选择'
    },
    selectOptions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    selectLabelKey: {
      type: String,
      default: 'label'
    },
    selectValueKey: {
      type: String,
      default: 'value'
    },
    selectValue: {
      type: [Number, String],
      default: null
    },
    searchText: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearText: {
      type: String,
      default: locale["a" /* default */].methods.t('el.inputSearch.clear')
    },
    historyPrefix: {
      type: String,
      default: 'search-history:'
    },
    historyKey: {
      type: String,
      default: function _default() {
        return location.pathname;
      }
    },
    showHistory: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: locale["a" /* default */].methods.t('el.inputSearch.loading')
    }
  },

  data: function data() {
    return {
      focused: false,
      fetchIndex: 0,
      fetchLoading: false,
      historyItems: []
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.$emit('input', value);
      }
    },
    selectModel: {
      get: function get() {
        return this.selectValue;
      },
      set: function set(value) {
        var changed = value !== this.selectValue;
        this.$emit('update:selectValue', value);
        if (changed) this.$emit('option-change', value);
      }
    },
    visible: function visible() {
      return this.focused;
    },
    lastItem: function lastItem() {
      var suggestions = this.$refs.autocomplete.suggestions;

      return suggestions[suggestions.length - 1];
    },
    popperClass: function popperClass() {
      return ['sp-input-search__popper', 'is-' + this.trigger].join(' ').trim().replace(/\s{2,}/, ' ');
    }
  },

  mounted: function mounted() {
    this.initHistory();
  },


  methods: {
    initHistory: function initHistory() {
      var _this = this;

      if (!this.showHistory) {
        return;
      }
      if (this.trigger === 'auto') {
        var $suggestions = document.getElementById(this.$refs.autocomplete.id);
        if ($suggestions) {
          $suggestions.parentNode.addEventListener('scroll', function (e) {
            if (!_this.fetchLoading) {
              var _e$target = e.target,
                  offsetHeight = _e$target.offsetHeight,
                  scrollHeight = _e$target.scrollHeight,
                  scrollTop = _e$target.scrollTop;

              var style = window.getComputedStyle(e.target);
              var marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
              if (scrollTop + marginHeight >= scrollHeight - offsetHeight) {
                _this.fetchLoading = true;
                e.target.scrollTop = scrollHeight - offsetHeight - marginHeight - 2;
                var done = function done(list) {
                  if (list && list.length) {
                    var suggestions = _this.$refs.autocomplete.suggestions;

                    suggestions.push.apply(suggestions, list);
                    _this.fetchIndex++;
                  }
                  _this.fetchLoading = false;
                };
                try {
                  var result = _this.$listeners.fetch ? _this.$listeners.fetch(_this.value, _this.fetchIndex) : [];
                  result instanceof window.Promise ? result.then(done) : done(result);
                } catch (error) {
                  done([]);
                }
              }
            }
          });
        }
      } else if (this.trigger === 'manual') {
        this.onLoadHistory();
      }
    },
    onFocus: function onFocus() {
      this.focused = true;
      this.fetchIndex = 0;
      this.onLoadHistory();
    },
    onSearch: function onSearch() {
      this.$refs.autocomplete.close();
      this.$emit('search', this.value);
      if (this.value.trim()) this.onAddHistory({ value: this.value });
    },
    onFetchSuggestions: function onFetchSuggestions(queryString, callback) {
      if (!this.showHistory) {
        // 搜索历史不显示
        return callback([]);
      }
      (({
        auto: function auto() {
          var _this2 = this;

          try {
            var result = this.$listeners.fetch ? this.$listeners.fetch(queryString, this.fetchIndex = 0) : [];
            var done = function done(list) {
              callback(list);
              _this2.fetchIndex++;
            };
            result instanceof window.Promise ? result.then(done) : done(result);
          } catch (error) {
            callback([]);
          }
        },
        manual: function manual() {
          callback(this.historyItems);
        }
      })[this.trigger] || function () {}).bind(this)();
    },
    onLoadHistory: function onLoadHistory() {
      this.historyItems = JSON.parse(localStorage.getItem('' + this.historyPrefix + this.historyKey) || '[]');
    },
    onUpdateHistory: function onUpdateHistory() {
      try {
        localStorage.setItem('' + this.historyPrefix + this.historyKey, JSON.stringify(this.historyItems));
      } catch (error) {}
    },
    onAddHistory: function onAddHistory(item) {
      var index = this.historyItems.findIndex(function (o) {
        return o.value === item.value;
      });
      if (index === -1) {
        this.historyItems.unshift(item);
      } else {
        var _item = this.historyItems.splice(index, 1)[0];
        _item && this.historyItems.unshift(_item);
      }
      this.onUpdateHistory();
    },
    onRemoveHistory: function onRemoveHistory(item) {
      var index = this.historyItems.findIndex(function (o) {
        return o.value === item.value;
      });
      index === -1 || this.historyItems.splice(index, 1);
      this.onUpdateHistory();
    },
    onClearHistory: function onClearHistory() {
      this.historyItems.splice(0, this.historyItems.length);
      this.onUpdateHistory();
    }
  }
});
// CONCATENATED MODULE: ./packages/input-search/src/input-search.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_input_searchvue_type_script_lang_js_ = (input_searchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/input-search/src/input-search.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_input_searchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input_search = (component.exports);
// CONCATENATED MODULE: ./packages/input-search/index.js


/* istanbul ignore next */
input_search.install = function (Vue) {
  Vue.component(input_search.name, input_search);
};

/* harmony default export */ var packages_input_search = __webpack_exports__["default"] = (input_search);

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),

/***/ 16:
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

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/input");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/dom");

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/shared");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/clickoutside");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/scrollbar");

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=template&id=3cc36cad&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        _vm.type === "textarea" ? "sp-textarea" : "sp-input",
        _vm.inputSize ? "sp-input--" + _vm.inputSize : "",
        _vm.inputFixWidthType
          ? "sp-input-fix-width--" + _vm.inputFixWidthType
          : "",
        {
          "is-disabled": _vm.inputDisabled,
          "is-exceed": _vm.inputExceed,
          "sp-input-group": _vm.$slots.prepend || _vm.$slots.append,
          "sp-input-group--append": _vm.$slots.append,
          "sp-input-group--prepend": _vm.$slots.prepend,
          "sp-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
          "sp-input--suffix":
            _vm.$slots.suffix ||
            _vm.suffixIcon ||
            _vm.clearable ||
            _vm.showPassword
        }
      ],
      on: {
        mouseenter: function($event) {
          _vm.hovering = true
        },
        mouseleave: function($event) {
          _vm.hovering = false
        }
      }
    },
    [
      _vm.type !== "textarea"
        ? [
            _vm.$slots.prepend
              ? _c(
                  "div",
                  {
                    class: [
                      "sp-input-group__prepend",
                      { "sp-input-group__sloteditable": _vm.prependEditable }
                    ]
                  },
                  [_vm._t("prepend")],
                  2
                )
              : _vm._e(),
            _vm.type !== "textarea"
              ? _c(
                  "input",
                  _vm._b(
                    {
                      ref: "input",
                      staticClass: "sp-input__inner",
                      attrs: {
                        tabindex: _vm.tabindex,
                        type: _vm.showPassword
                          ? _vm.passwordVisible
                            ? "text"
                            : "password"
                          : _vm.type,
                        disabled: _vm.inputDisabled,
                        readonly: _vm.readonly,
                        autocomplete: _vm.autoComplete || _vm.autocomplete,
                        "aria-label": _vm.label
                      },
                      on: {
                        compositionstart: _vm.handleCompositionStart,
                        compositionupdate: _vm.handleCompositionUpdate,
                        compositionend: _vm.handleCompositionEnd,
                        input: _vm.handleInput,
                        focus: _vm.handleFocus,
                        blur: _vm.handleBlur,
                        change: _vm.handleChange
                      }
                    },
                    "input",
                    _vm.$attrs,
                    false
                  )
                )
              : _vm._e(),
            _vm.$slots.prefix || _vm.prefixIcon
              ? _c(
                  "span",
                  { staticClass: "sp-input__prefix" },
                  [
                    _vm._t("prefix"),
                    _vm.prefixIcon
                      ? _c("i", {
                          staticClass: "sp-input__icon",
                          class: _vm.prefixIcon
                        })
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e(),
            _vm.getSuffixVisible()
              ? _c("span", { staticClass: "sp-input__suffix" }, [
                  _c(
                    "span",
                    { staticClass: "sp-input__suffix-inner" },
                    [
                      !_vm.showClear ||
                      !_vm.showPwdVisible ||
                      !_vm.isWordLimitVisible
                        ? [
                            _vm._t("suffix"),
                            _vm.suffixIcon
                              ? _c("i", {
                                  staticClass: "sp-input__icon",
                                  class: _vm.suffixIcon
                                })
                              : _vm._e()
                          ]
                        : _vm._e(),
                      _vm.showClear
                        ? _c("i", {
                            staticClass:
                              "sp-input__icon sp-icon-close-circle sp-input__clear",
                            on: {
                              mousedown: function($event) {
                                $event.preventDefault()
                              },
                              click: _vm.clear
                            }
                          })
                        : _vm._e(),
                      _vm.showPwdVisible
                        ? _c("i", {
                            class: [
                              "sp-input__icon",
                              _vm.passwordVisible
                                ? "sp-icon-eye"
                                : "sp-icon-eye-close",
                              "sp-input__clear"
                            ],
                            on: { click: _vm.handlePasswordVisible }
                          })
                        : _vm._e(),
                      _vm.isWordLimitVisible
                        ? _c("span", { staticClass: "sp-input__count" }, [
                            _c(
                              "span",
                              { staticClass: "sp-input__count-inner" },
                              [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(_vm.textLength) +
                                    "/" +
                                    _vm._s(_vm.upperLimit) +
                                    "\n          "
                                )
                              ]
                            )
                          ])
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm.validateState
                    ? _c("i", {
                        staticClass: "sp-input__icon",
                        class: ["sp-input__validateIcon", _vm.validateIcon]
                      })
                    : _vm._e()
                ])
              : _vm._e(),
            _vm.$slots.append
              ? _c(
                  "div",
                  { staticClass: "sp-input-group__append" },
                  [_vm._t("append")],
                  2
                )
              : _vm._e()
          ]
        : _c(
            "textarea",
            _vm._b(
              {
                ref: "textarea",
                staticClass: "sp-textarea__inner",
                style: _vm.textareaStyle,
                attrs: {
                  tabindex: _vm.tabindex,
                  disabled: _vm.inputDisabled,
                  readonly: _vm.readonly,
                  autocomplete: _vm.autoComplete || _vm.autocomplete,
                  "aria-label": _vm.label
                },
                on: {
                  compositionstart: _vm.handleCompositionStart,
                  compositionupdate: _vm.handleCompositionUpdate,
                  compositionend: _vm.handleCompositionEnd,
                  input: _vm.handleInput,
                  focus: _vm.handleFocus,
                  blur: _vm.handleBlur,
                  change: _vm.handleChange
                }
              },
              "textarea",
              _vm.$attrs,
              false
            )
          ),
      _vm.isWordLimitVisible && _vm.type === "textarea"
        ? _c("span", { staticClass: "sp-input__count" }, [
            _vm._v(_vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit))
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=template&id=3cc36cad&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(4);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/migrating"
var migrating_ = __webpack_require__(10);
var migrating_default = /*#__PURE__*/__webpack_require__.n(migrating_);

// CONCATENATED MODULE: ./packages/input/src/calcTextareaHeight.js
var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(targetElement) {
  var style = window.getComputedStyle(targetElement);

  var boxSizing = style.getPropertyValue('box-sizing');

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var contextStyle = CONTEXT_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetElement) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calculateNodeStyling = calculateNodeStyling(targetElement),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      contextStyle = _calculateNodeStyling.contextStyle;

  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  var height = hiddenTextarea.scrollHeight;
  var result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/merge"
var merge_ = __webpack_require__(12);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/shared"
var shared_ = __webpack_require__(21);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//








/* harmony default export */ var inputvue_type_script_lang_js_ = ({
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [emitter_default.a, migrating_default.a, locale_default.a],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data: function data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },


  props: {
    value: [String, Number],
    size: String,
    resize: {
      type: String,
      default: 'none'
    },
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator: function validator(val) {
         false && false;
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String,
    fixWidthType: String,
    prependEditable: { // sp 是否可以编辑前置内容
      type: Boolean,
      default: false
    }
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState: function validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon: function needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon: function validateIcon() {
      return {
        validating: 'sp-icon-loading',
        success: 'sp-icon-circle-check',
        error: 'sp-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle: function textareaStyle() {
      return merge_default()({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize: function inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputFixWidthType: function inputFixWidthType() {
      return this.fixWidthType || (this.$ELEMENT || {}).fixWidthType;
    },
    inputDisabled: function inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue: function nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear: function showClear() {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering);
    },
    showPwdVisible: function showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible: function isWordLimitVisible() {
      return this.showWordLimit && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.inputDisabled && !this.readonly && !this.showPassword;
    },
    upperLimit: function upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength: function textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed: function inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    }
  },

  watch: {
    value: function value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [val]);
      }
    },

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue: function nativeInputValue() {
      this.setNativeInputValue();
    },

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type: function type() {
      var _this = this;

      this.$nextTick(function () {
        _this.setNativeInputValue();
        _this.resizeTextarea();
        _this.updateIconOffset();
      });
    }
  },

  methods: {
    focus: function focus() {
      this.getInput().focus();
    },
    blur: function blur() {
      this.getInput().blur();
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur: function handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
      }
    },
    select: function select() {
      this.getInput().select();
    },
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      var autosize = this.autosize,
          type = this.type;

      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setNativeInputValue: function setNativeInputValue() {
      var input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus: function handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart: function handleCompositionStart(event) {
      this.$emit('compositionstart', event);
      this.isComposing = true;
    },
    handleCompositionUpdate: function handleCompositionUpdate(event) {
      this.$emit('compositionupdate', event);
      var text = event.target.value;
      var lastCharacter = text[text.length - 1] || '';
      this.isComposing = !Object(shared_["isKorean"])(lastCharacter);
    },
    handleCompositionEnd: function handleCompositionEnd(event) {
      this.$emit('compositionend', event);
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput: function handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return;

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange: function handleChange(event) {
      this.$emit('change', event.target.value);
    },
    calcIconOffset: function calcIconOffset(place) {
      var elList = [].slice.call(this.$el.querySelectorAll('.sp-input__' + place) || []);
      if (!elList.length) return;
      var el = null;
      for (var i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      var pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };

      var pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = 'translateX(' + (place === 'suffix' ? '-' : '') + this.$el.querySelector('.sp-input-group__' + pendant).offsetWidth + 'px)';
        el.style.transition = 'transform 0s';
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset: function updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear: function clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible: function handlePasswordVisible() {
      var _this2 = this;

      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(function () {
        _this2.focus();
      });
    },
    getInput: function getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible: function getSuffixVisible() {
      return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible || this.validateState && this.needStatusIcon;
    }
  },
  created: function created() {
    this.$on('inputSelect', this.select);
  },
  mounted: function mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated: function updated() {
    this.$nextTick(this.updateIconOffset);
  }
});
// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_inputvue_type_script_lang_js_ = (inputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/input/src/input.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_inputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input = (component.exports);
// CONCATENATED MODULE: ./packages/input/index.js


/* istanbul ignore next */
input.install = function (Vue) {
  Vue.component(input.name, input);
};

/* harmony default export */ var packages_input = __webpack_exports__["default"] = (input);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/util");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/focus");

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=template&id=1f9f136c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "sp-button",
      class: [
        _vm.type ? "sp-button--" + _vm.type : "",
        _vm.buttonSize ? "sp-button--" + _vm.buttonSize : "",
        _vm.icon ? "sp-button--icon" : "",
        _vm.dashed ? "sp-button--dashed" : "",
        {
          "is-disabled": _vm.buttonDisabled,
          "is-loading": _vm.loading,
          "is-plain": _vm.plain,
          "is-round": _vm.round,
          "is-circle": _vm.circle
        }
      ],
      attrs: {
        disabled: _vm.buttonDisabled || _vm.loading,
        autofocus: _vm.autofocus,
        type: _vm.nativeType
      },
      on: { click: _vm.handleClick }
    },
    [
      _vm.loading ? _c("i", { staticClass: "sp-icon-loading" }) : _vm._e(),
      _vm.icon && !_vm.loading ? _c("i", { class: _vm.icon }) : _vm._e(),
      _vm.$slots.default ? _c("span", [_vm._t("default")], 2) : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=template&id=1f9f136c&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=script&lang=js&
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

/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: 'ElButton',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    dashed: Boolean
  },

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize: function buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled: function buttonDisabled() {
      return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
    }
  },

  methods: {
    handleClick: function handleClick(evt) {
      this.$emit('click', evt);
    }
  }
});
// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/button/src/button.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_button = (component.exports);
// CONCATENATED MODULE: ./packages/button/index.js


/* istanbul ignore next */
src_button.install = function (Vue) {
  Vue.component(src_button.name, src_button);
};

/* harmony default export */ var packages_button = __webpack_exports__["default"] = (src_button);

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=template&id=6487cf6c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }
      ],
      staticClass: "sp-select-dropdown__item",
      class: {
        selected: _vm.itemSelected,
        "is-disabled": _vm.disabled || _vm.groupDisabled || _vm.limitReached,
        hover: _vm.hover
      },
      on: {
        mouseenter: _vm.hoverItem,
        click: function($event) {
          $event.stopPropagation()
          return _vm.selectOptionClick($event)
        }
      }
    },
    [_vm._t("default", [_c("span", [_vm._v(_vm._s(_vm.currentLabel))])])],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=template&id=6487cf6c&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(4);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=script&lang=js&
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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




/* harmony default export */ var optionvue_type_script_lang_js_ = ({
  mixins: [emitter_default.a],

  name: 'ElOption',

  componentName: 'ElOption',

  inject: ['select'],

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },


  computed: {
    isObject: function isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel: function currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue: function currentValue() {
      return this.value || this.label || '';
    },
    itemSelected: function itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached: function limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },

  watch: {
    currentLabel: function currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch('ElSelect', 'setSelected');
    },
    value: function value(val, oldVal) {
      var _select = this.select,
          remote = _select.remote,
          valueKey = _select.valueKey;

      if (!this.created && !remote) {
        if (valueKey && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && (typeof oldVal === 'undefined' ? 'undefined' : _typeof(oldVal)) === 'object' && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        this.dispatch('ElSelect', 'setSelected');
      }
    }
  },

  methods: {
    isEqual: function isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        var valueKey = this.select.valueKey;
        return Object(util_["getValueByPath"])(a, valueKey) === Object(util_["getValueByPath"])(b, valueKey);
      }
    },
    contains: function contains() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var target = arguments[1];

      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1;
      } else {
        var valueKey = this.select.valueKey;
        return arr && arr.some(function (item) {
          return Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(target, valueKey);
        });
      }
    },
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
      }
    },
    queryChange: function queryChange(query) {
      this.visible = new RegExp(Object(util_["escapeRegexpString"])(query), 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },

  created: function created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },
  beforeDestroy: function beforeDestroy() {
    var _select2 = this.select,
        selected = _select2.selected,
        multiple = _select2.multiple;

    var selectedOptions = multiple ? selected : [selected];
    var index = this.select.cachedOptions.indexOf(this);
    var selectedIndex = selectedOptions.indexOf(this);

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
});
// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_optionvue_type_script_lang_js_ = (optionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/select/src/option.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_optionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_option = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/tag");

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/scroll-into-view");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/emitter");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/locale");

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=template&id=3b692308&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.handleClose,
          expression: "handleClose"
        }
      ],
      staticClass: "sp-select",
      class: [
        _vm.selectSize ? "sp-select--" + _vm.selectSize : "",
        {
          "sp-select--borderless": !_vm.bordered
        }
      ],
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.toggleMenu($event)
        }
      }
    },
    [
      _vm.multiple
        ? _c(
            "div",
            {
              ref: "tags",
              staticClass: "sp-select__tags",
              style: { "max-width": _vm.inputWidth - 32 + "px", width: "100%" },
              on: {
                mouseenter: function($event) {
                  _vm.inputHovering = true
                },
                mouseleave: function($event) {
                  _vm.inputHovering = false
                }
              }
            },
            [
              _vm.collapseTags && _vm.selected.length
                ? _c(
                    "span",
                    [
                      _vm._l(_vm.collapseTagsShowList, function(item) {
                        return _c(
                          "el-tag",
                          {
                            key: _vm.getValueKey(item),
                            attrs: {
                              closable: !_vm.selectDisabled,
                              size: _vm.collapseTagSize,
                              hit: item.hitState,
                              "disable-transitions": ""
                            },
                            on: {
                              close: function($event) {
                                return _vm.deleteTag($event, item)
                              }
                            }
                          },
                          [
                            _c(
                              "span",
                              { staticClass: "sp-select__tags-text" },
                              [_vm._v(_vm._s(item.currentLabel))]
                            )
                          ]
                        )
                      }),
                      _vm.selected.length > _vm.collapseTagsShowLimit
                        ? _c(
                            "el-tag",
                            {
                              attrs: {
                                closable: false,
                                size: _vm.collapseTagSize,
                                "disable-transitions": ""
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "sp-select__tags-text" },
                                [
                                  _vm._v(
                                    "+ " +
                                      _vm._s(
                                        _vm.selected.length -
                                          _vm.collapseTagsShowLimit
                                      )
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    2
                  )
                : _vm._e(),
              !_vm.collapseTags
                ? _c(
                    "transition-group",
                    { on: { "after-leave": _vm.resetInputHeight } },
                    _vm._l(_vm.selected, function(item) {
                      return _c(
                        "el-tag",
                        {
                          key: _vm.getValueKey(item),
                          attrs: {
                            closable: !_vm.selectDisabled,
                            size: _vm.collapseTagSize,
                            hit: item.hitState,
                            "disable-transitions": ""
                          },
                          on: {
                            close: function($event) {
                              return _vm.deleteTag($event, item)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "sp-select__tags-text" }, [
                            _vm._v(_vm._s(item.currentLabel))
                          ])
                        ]
                      )
                    }),
                    1
                  )
                : _vm._e(),
              _vm.filterable
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.query,
                        expression: "query"
                      }
                    ],
                    ref: "input",
                    staticClass: "sp-select__input",
                    class: [_vm.selectSize ? "is-" + _vm.selectSize : ""],
                    style: {
                      "flex-grow": "1",
                      width: _vm.inputLength / (_vm.inputWidth - 32) + "%",
                      "max-width": _vm.inputWidth - 42 + "px"
                    },
                    attrs: {
                      type: "text",
                      disabled: _vm.selectDisabled,
                      autocomplete: _vm.autoComplete || _vm.autocomplete
                    },
                    domProps: { value: _vm.query },
                    on: {
                      focus: _vm.handleFocus,
                      blur: function($event) {
                        _vm.softFocus = false
                      },
                      keyup: _vm.managePlaceholder,
                      keydown: [
                        _vm.resetInputState,
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "down", 40, $event.key, [
                              "Down",
                              "ArrowDown"
                            ])
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.handleNavigate("next")
                        },
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "up", 38, $event.key, [
                              "Up",
                              "ArrowUp"
                            ])
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.handleNavigate("prev")
                        },
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          $event.preventDefault()
                          return _vm.selectOption($event)
                        },
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "esc", 27, $event.key, [
                              "Esc",
                              "Escape"
                            ])
                          ) {
                            return null
                          }
                          $event.stopPropagation()
                          $event.preventDefault()
                          _vm.visible = false
                        },
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "delete",
                              [8, 46],
                              $event.key,
                              ["Backspace", "Delete", "Del"]
                            )
                          ) {
                            return null
                          }
                          return _vm.deletePrevTag($event)
                        },
                        function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                          ) {
                            return null
                          }
                          _vm.visible = false
                        }
                      ],
                      compositionstart: _vm.handleComposition,
                      compositionupdate: _vm.handleComposition,
                      compositionend: _vm.handleComposition,
                      input: [
                        function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.query = $event.target.value
                        },
                        _vm.debouncedQueryChange
                      ]
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _c(
        "el-input",
        {
          ref: "reference",
          class: { "is-focus": _vm.visible },
          attrs: {
            type: "text",
            placeholder: _vm.currentPlaceholder,
            name: _vm.name,
            id: _vm.id,
            autocomplete: _vm.autoComplete || _vm.autocomplete,
            size: _vm.selectSize,
            disabled: _vm.selectDisabled,
            readonly: _vm.readonly,
            "validate-event": false,
            tabindex: _vm.multiple && _vm.filterable ? "-1" : null
          },
          on: {
            focus: _vm.handleFocus,
            blur: _vm.handleBlur,
            input: _vm.debouncedOnInputChange,
            compositionstart: _vm.handleComposition,
            compositionupdate: _vm.handleComposition,
            compositionend: _vm.handleComposition
          },
          nativeOn: {
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.handleNavigate("next")
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                return _vm.handleNavigate("prev")
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.selectOption($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape"
                  ])
                ) {
                  return null
                }
                $event.stopPropagation()
                $event.preventDefault()
                _vm.visible = false
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                ) {
                  return null
                }
                _vm.visible = false
              }
            ],
            mouseenter: function($event) {
              _vm.inputHovering = true
            },
            mouseleave: function($event) {
              _vm.inputHovering = false
            }
          },
          model: {
            value: _vm.selectedLabel,
            callback: function($$v) {
              _vm.selectedLabel = $$v
            },
            expression: "selectedLabel"
          }
        },
        [
          _vm.$slots.prefix
            ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
            : _vm._e(),
          _c("template", { slot: "suffix" }, [
            _c("i", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.showClose,
                  expression: "!showClose"
                }
              ],
              class: [
                "sp-select__caret",
                "sp-select__icon-one",
                "sp-input__icon",
                "sp-icon-" + _vm.iconClass
              ]
            }),
            _vm.showClose
              ? _c("i", {
                  staticClass:
                    "sp-select__caret sp-input__icon sp-icon-close-circle",
                  on: { click: _vm.handleClearClick }
                })
              : _vm._e()
          ])
        ],
        2
      ),
      _c(
        "transition",
        {
          attrs: { name: "sp-zoom-in-top" },
          on: {
            "before-enter": _vm.handleMenuEnter,
            "after-leave": _vm.doDestroy
          }
        },
        [
          _c(
            "el-select-menu",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible && _vm.emptyText !== false,
                  expression: "visible && emptyText !== false"
                }
              ],
              ref: "popper",
              attrs: { "append-to-body": _vm.popperAppendToBody }
            },
            [
              _c(
                "el-scrollbar",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.options.length > 0 && !_vm.loading,
                      expression: "options.length > 0 && !loading"
                    }
                  ],
                  ref: "scrollbar",
                  class: {
                    "is-empty":
                      !_vm.allowCreate &&
                      _vm.query &&
                      _vm.filteredOptionsCount === 0
                  },
                  attrs: {
                    tag: "ul",
                    "wrap-class": "sp-select-dropdown__wrap",
                    "view-class": "sp-select-dropdown__list"
                  }
                },
                [
                  _vm.showNewOption
                    ? _c("el-option", {
                        attrs: { value: _vm.query, created: "" }
                      })
                    : _vm._e(),
                  _vm.showSelectAll && _vm.multiple
                    ? _c(
                        "div",
                        { staticClass: "sp-select-dropdown__list-operate" },
                        [
                          _c(
                            "span",
                            {
                              staticClass: "sp-select-dropdown__select-all",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.selectAll($event)
                                }
                              }
                            },
                            [_vm._v("全选")]
                          ),
                          _c(
                            "span",
                            {
                              staticClass: "sp-select-dropdown__deselect-all",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.deSelectAll($event)
                                }
                              }
                            },
                            [_vm._v("取消全选")]
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._t("default")
                ],
                2
              ),
              _vm.emptyText &&
              (!_vm.allowCreate ||
                _vm.loading ||
                (_vm.allowCreate && _vm.options.length === 0))
                ? [
                    _vm.$slots.empty
                      ? _vm._t("empty")
                      : _c("p", { staticClass: "sp-select-dropdown__empty" }, [
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.emptyText) +
                              "\n        "
                          )
                        ])
                  ]
                : _vm._e()
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=template&id=3b692308&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(4);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/focus"
var focus_ = __webpack_require__(30);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/locale"
var locale_ = __webpack_require__(7);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/input"
var input_ = __webpack_require__(19);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=template&id=1ffc2407&
var select_dropdownvue_type_template_id_1ffc2407_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "sp-select-dropdown sp-popper",
      class: [{ "is-multiple": _vm.$parent.multiple }, _vm.popperClass],
      style: { minWidth: _vm.minWidth }
    },
    [_vm._t("default")],
    2
  )
}
var select_dropdownvue_type_template_id_1ffc2407_staticRenderFns = []
select_dropdownvue_type_template_id_1ffc2407_render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=template&id=1ffc2407&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(8);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var select_dropdownvue_type_script_lang_js_ = ({
  name: 'ElSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [vue_popper_default.a],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    },

    visibleArrow: {
      default: false
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
});
// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_dropdownvue_type_script_lang_js_ = (select_dropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_select_dropdownvue_type_script_lang_js_,
  select_dropdownvue_type_template_id_1ffc2407_render,
  select_dropdownvue_type_template_id_1ffc2407_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var select_dropdown = (component.exports);
// EXTERNAL MODULE: ./packages/select/src/option.vue + 4 modules
var src_option = __webpack_require__(36);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/tag"
var tag_ = __webpack_require__(37);
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/scrollbar"
var scrollbar_ = __webpack_require__(26);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: external "throttle-debounce/debounce"
var debounce_ = __webpack_require__(15);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(22);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/resize-event"
var resize_event_ = __webpack_require__(13);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/scroll-into-view"
var scroll_into_view_ = __webpack_require__(38);
var scroll_into_view_default = /*#__PURE__*/__webpack_require__.n(scroll_into_view_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// CONCATENATED MODULE: ./packages/select/src/navigation-mixin.js
/* harmony default export */ var navigation_mixin = ({
  data: function data() {
    return {
      hoverOption: -1
    };
  },


  computed: {
    optionsAllDisabled: function optionsAllDisabled() {
      return this.options.filter(function (option) {
        return option.visible;
      }).every(function (option) {
        return option.disabled;
      });
    }
  },

  watch: {
    hoverIndex: function hoverIndex(val) {
      var _this = this;

      if (typeof val === 'number' && val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach(function (option) {
        option.hover = _this.hoverOption === option;
      });
    }
  },

  methods: {
    navigateOptions: function navigateOptions(direction) {
      var _this2 = this;

      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
        } else if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
        }
        var option = this.options[this.hoverIndex];
        if (option.disabled === true || option.groupDisabled === true || !option.visible) {
          this.navigateOptions(direction);
        }
        this.$nextTick(function () {
          return _this2.scrollToOption(_this2.hoverOption);
        });
      }
    }
  }
});
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/shared"
var shared_ = __webpack_require__(21);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=script&lang=js&
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

















/* harmony default export */ var selectvue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, locale_default.a, focus_default()('reference'), navigation_mixin],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide: function provide() {
    return {
      'select': this
    };
  },


  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    readonly: function readonly() {
      return !this.filterable || this.multiple || !Object(util_["isIE"])() && !Object(util_["isEdge"])() && !this.visible;
    },
    showClose: function showClose() {
      var hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== undefined && this.value !== null && this.value !== '';
      var criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },
    iconClass: function iconClass() {
      return this.remote && this.filterable ? '' : this.visible ? 'up is-reverse' : 'up';
    },
    debounce: function debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText: function emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading');
      } else {
        if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
      }
      return null;
    },
    showNewOption: function showNewOption() {
      var _this = this;

      var hasExistingOption = this.options.filter(function (option) {
        return !option.created;
      }).some(function (option) {
        return option.currentLabel === _this.query;
      });
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },
    selectSize: function selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled: function selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    collapseTagSize: function collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    },
    collapseTagsShowList: function collapseTagsShowList() {
      return this.selected.slice(0, this.collapseTagsShowLimit);
    },
    propPlaceholder: function propPlaceholder() {
      return typeof this.placeholder !== 'undefined' ? this.placeholder : this.t('el.select.placeholder');
    }
  },

  components: {
    ElInput: input_default.a,
    ElSelectMenu: select_dropdown,
    ElOption: src_option["a" /* default */],
    ElTag: tag_default.a,
    ElScrollbar: scrollbar_default.a
  },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator: function validator(val) {
         false && false;
        return true;
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      required: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    collapseTagsShowLimit: {
      type: Number,
      default: 1
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    showSelectAll: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },


  watch: {
    selectDisabled: function selectDisabled() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.resetInputHeight();
      });
    },
    propPlaceholder: function propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value: function value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!Object(util_["valueEquals"])(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    visible: function visible(val) {
      var _this3 = this;

      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(function () {
          if (_this3.$refs.input && _this3.$refs.input.value === '' && _this3.selected.length === 0) {
            _this3.currentPlaceholder = _this3.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('ElOption', 'queryChange', '');
              this.broadcast('ElOptionGroup', 'queryChange');
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }
      this.$emit('visible-change', val);
    },
    options: function options() {
      var _this4 = this;

      if (this.$isServer) return;
      this.$nextTick(function () {
        _this4.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
    handleNavigate: function handleNavigate(direction) {
      if (this.isOnComposition) return;

      this.navigateOptions(direction);
    },
    handleComposition: function handleComposition(event) {
      var _this5 = this;

      var text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick(function (_) {
          return _this5.handleQueryChange(text);
        });
      } else {
        var lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !Object(shared_["isKorean"])(lastCharacter);
      }
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this6 = this;

      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(function () {
        if (_this6.visible) _this6.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(function () {
          var length = _this6.$refs.input.value.length * 15 + 20;
          _this6.inputLength = _this6.collapseTags ? Math.min(50, length) : length;
          _this6.managePlaceholder();
          _this6.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
        this.broadcast('ElOptionGroup', 'queryChange');
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('ElOption', 'queryChange', val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.popper.$el.querySelector('.sp-select-dropdown__wrap');
        scroll_into_view_default()(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this7 = this;

      this.$nextTick(function () {
        return _this7.scrollToOption(_this7.selected);
      });
    },
    emitChange: function emitChange(val) {
      if (!Object(util_["valueEquals"])(this.value, val)) {
        this.$emit('change', val);
      }
    },
    getOption: function getOption(value) {
      var option = void 0;
      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      var isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      var isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (var i = this.cachedOptions.length - 1; i >= 0; i--) {
        var cachedOption = this.cachedOptions[i];
        var isEqual = isObject ? Object(util_["getValueByPath"])(cachedOption.value, this.valueKey) === Object(util_["getValueByPath"])(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      var label = !isObject && !isNull && !isUndefined ? String(value) : '';
      var newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected: function setSelected() {
      var _this8 = this;

      if (!this.multiple) {
        var option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      var result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach(function (value) {
          result.push(_this8.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(function () {
        _this8.resetInputHeight();
      });
    },
    handleFocus: function handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          if (this.filterable && !this.visible) {
            this.menuVisibleOnFocus = true;
          }
          this.visible = true;
        }
        this.$emit('focus', event);
      } else {
        this.softFocus = false;
      }
    },
    blur: function blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleBlur: function handleBlur(event) {
      var _this9 = this;

      setTimeout(function () {
        if (_this9.isSilentBlur) {
          _this9.isSilentBlur = false;
        } else {
          _this9.$emit('blur', event);
        }
      }, 50);
      this.softFocus = false;
    },
    handleClearClick: function handleClearClick(event) {
      this.deleteSelected(event);
    },
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState: function toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      var option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var value = this.value.slice();
        value.pop();
        this.$emit('input', value);
        this.emitChange(value);
      }
    },
    managePlaceholder: function managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },
    resetInputState: function resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight: function resetInputHeight() {
      var _this10 = this;

      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(function () {
        if (!_this10.$refs.reference) return;
        var inputChildNodes = _this10.$refs.reference.$el.childNodes;
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        var tags = _this10.$refs.tags;
        var tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        var sizeInMap = _this10.initialInputHeight || 40;
        input.style.height = _this10.selected.length === 0 ? sizeInMap + 'px' : Math.max(tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + 'px';
        if (_this10.visible && _this10.emptyText !== false) {
          _this10.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },
    resetHoverIndex: function resetHoverIndex() {
      var _this11 = this;

      setTimeout(function () {
        if (!_this11.multiple) {
          _this11.hoverIndex = _this11.options.indexOf(_this11.selected);
        } else {
          if (_this11.selected.length > 0) {
            _this11.hoverIndex = Math.min.apply(null, _this11.selected.map(function (item) {
              return _this11.options.indexOf(item);
            }));
          } else {
            _this11.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect: function handleOptionSelect(option, byClick) {
      var _this12 = this;

      if (this.multiple) {
        var value = (this.value || []).slice();
        var optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option.value);
        }
        this.$emit('input', value);
        this.emitChange(value);
        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(function () {
        _this12.scrollToOption(option);
      });
    },
    setSoftFocus: function setSoftFocus() {
      this.softFocus = true;
      var input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },
    getValueIndex: function getValueIndex() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var value = arguments[1];

      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        var valueKey = this.valueKey;
        var index = -1;
        arr.some(function (item, i) {
          if (Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(value, valueKey)) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },
    toggleMenu: function toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    selectOption: function selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      var value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        var value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },
    onInputChange: function onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    onOptionDestroy: function onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index, 1);
      }
    },
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize: function handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      var hasCreated = false;
      for (var i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (var _i = 0; _i !== this.options.length; ++_i) {
        var option = this.options[_i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = _i;
            break;
          }
        } else {
          // highlight currently selected option
          if (option.itemSelected) {
            this.hoverIndex = _i;
            break;
          }
        }
      }
    },
    getValueKey: function getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return Object(util_["getValueByPath"])(item.value, this.valueKey);
      }
    },
    selectAll: function selectAll() {
      if (this.multiple) {
        var options = this.options;
        var value = options.map(function (item) {
          return item.value;
        });
        this.$emit('input', value);
        this.emitChange(value);
      }
    },
    deSelectAll: function deSelectAll() {
      if (this.multiple) {
        var value = [];
        this.$emit('input', value);
        this.emitChange(value);
      }
    }
  },

  created: function created() {
    var _this13 = this;

    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce_default()(this.debounce, function () {
      _this13.onInputChange();
    });

    this.debouncedQueryChange = debounce_default()(this.debounce, function (e) {
      _this13.handleQueryChange(e.target.value);
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
  },
  mounted: function mounted() {
    var _this14 = this;

    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    Object(resize_event_["addResizeListener"])(this.$el, this.handleResize);

    var reference = this.$refs.reference;
    if (reference && reference.$el) {
      var sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      var input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(function () {
      if (reference && reference.$el) {
        _this14.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.handleResize) Object(resize_event_["removeResizeListener"])(this.$el, this.handleResize);
  }
});
// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_selectvue_type_script_lang_js_ = (selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select/src/select.vue





/* normalize component */

var select_component = Object(componentNormalizer["a" /* default */])(
  src_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_select = (select_component.exports);
// CONCATENATED MODULE: ./packages/select/index.js


/* istanbul ignore next */
src_select.install = function (Vue) {
  Vue.component(src_select.name, src_select);
};

/* harmony default export */ var packages_select = __webpack_exports__["default"] = (src_select);

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete.vue?vue&type=template&id=3a38e14a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.close,
          expression: "close"
        }
      ],
      staticClass: "sp-autocomplete",
      attrs: {
        "aria-haspopup": "listbox",
        role: "combobox",
        "aria-expanded": _vm.suggestionVisible,
        "aria-owns": _vm.id
      }
    },
    [
      _c(
        "el-input",
        _vm._b(
          {
            ref: "input",
            on: {
              input: _vm.handleInput,
              change: _vm.handleChange,
              focus: _vm.handleFocus,
              blur: _vm.handleBlur,
              clear: _vm.handleClear
            },
            nativeOn: {
              keydown: [
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "up", 38, $event.key, [
                      "Up",
                      "ArrowUp"
                    ])
                  ) {
                    return null
                  }
                  $event.preventDefault()
                  return _vm.highlight(_vm.highlightedIndex - 1)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "down", 40, $event.key, [
                      "Down",
                      "ArrowDown"
                    ])
                  ) {
                    return null
                  }
                  $event.preventDefault()
                  return _vm.highlight(_vm.highlightedIndex + 1)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.handleKeyEnter($event)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                  ) {
                    return null
                  }
                  return _vm.close($event)
                }
              ]
            }
          },
          "el-input",
          [_vm.$props, _vm.$attrs],
          false
        ),
        [
          _vm.$slots.prepend
            ? _c("template", { slot: "prepend" }, [_vm._t("prepend")], 2)
            : _vm._e(),
          _vm.$slots.append
            ? _c("template", { slot: "append" }, [_vm._t("append")], 2)
            : _vm._e(),
          _vm.$slots.prefix
            ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
            : _vm._e(),
          _vm.$slots.suffix
            ? _c("template", { slot: "suffix" }, [_vm._t("suffix")], 2)
            : _vm._e()
        ],
        2
      ),
      _c(
        "el-autocomplete-suggestions",
        {
          ref: "suggestions",
          class: [_vm.popperClass ? _vm.popperClass : ""],
          attrs: {
            "visible-arrow": "",
            "popper-options": _vm.popperOptions,
            "append-to-body": _vm.popperAppendToBody,
            placement: _vm.placement,
            id: _vm.id
          }
        },
        _vm._l(_vm.suggestions, function(item, index) {
          return _c(
            "li",
            {
              key: index,
              class: { highlighted: _vm.highlightedIndex === index },
              attrs: {
                id: _vm.id + "-item-" + index,
                role: "option",
                "aria-selected": _vm.highlightedIndex === index
              },
              on: {
                click: function($event) {
                  return _vm.select(item)
                }
              }
            },
            [
              _vm._t(
                "default",
                [
                  _vm._v("\n        " + _vm._s(item[_vm.valueKey]) + "\n      ")
                ],
                { item: item }
              )
            ],
            2
          )
        }),
        0
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue?vue&type=template&id=3a38e14a&

// EXTERNAL MODULE: external "throttle-debounce/debounce"
var debounce_ = __webpack_require__(15);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/input"
var input_ = __webpack_require__(19);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(22);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=template&id=3fbf8f32&
var autocomplete_suggestionsvue_type_template_id_3fbf8f32_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    { attrs: { name: "sp-zoom-in-top" }, on: { "after-leave": _vm.doDestroy } },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showPopper,
              expression: "showPopper"
            }
          ],
          staticClass: "sp-autocomplete-suggestion sp-popper",
          class: {
            "is-loading": !_vm.parent.hideLoading && _vm.parent.loading
          },
          style: { width: _vm.dropdownWidth },
          attrs: { role: "region" }
        },
        [
          _c(
            "el-scrollbar",
            {
              attrs: {
                tag: "ul",
                "wrap-class": "sp-autocomplete-suggestion__wrap",
                "view-class": "sp-autocomplete-suggestion__list"
              }
            },
            [
              !_vm.parent.hideLoading && _vm.parent.loading
                ? _c("li", [_c("i", { staticClass: "sp-icon-loading" })])
                : _vm._t("default")
            ],
            2
          )
        ],
        1
      )
    ]
  )
}
var autocomplete_suggestionsvue_type_template_id_3fbf8f32_staticRenderFns = []
autocomplete_suggestionsvue_type_template_id_3fbf8f32_render._withStripped = true


// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=template&id=3fbf8f32&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(8);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/emitter"
var emitter_ = __webpack_require__(4);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/scrollbar"
var scrollbar_ = __webpack_require__(26);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=script&lang=js&
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





/* harmony default export */ var autocomplete_suggestionsvue_type_script_lang_js_ = ({
  components: { ElScrollbar: scrollbar_default.a },
  mixins: [vue_popper_default.a, emitter_default.a],

  componentName: 'ElAutocompleteSuggestions',

  data: function data() {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    };
  },


  props: {
    options: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    id: String,
    visibleArrow: {
      default: false
    }
  },

  methods: {
    select: function select(item) {
      this.dispatch('ElAutocomplete', 'item-click', item);
    }
  },

  updated: function updated() {
    var _this = this;

    this.$nextTick(function (_) {
      _this.popperJS && _this.updatePopper();
    });
  },
  mounted: function mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
    this.referenceList = this.$el.querySelector('.sp-autocomplete-suggestion__list');
    this.referenceList.setAttribute('role', 'listbox');
    this.referenceList.setAttribute('id', this.id);
  },
  created: function created() {
    var _this2 = this;

    this.$on('visible', function (val, inputWidth) {
      _this2.dropdownWidth = inputWidth + 'px';
      _this2.showPopper = val;
    });
  }
});
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_autocomplete_suggestionsvue_type_script_lang_js_ = (autocomplete_suggestionsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_autocomplete_suggestionsvue_type_script_lang_js_,
  autocomplete_suggestionsvue_type_template_id_3fbf8f32_render,
  autocomplete_suggestionsvue_type_template_id_3fbf8f32_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var autocomplete_suggestions = (component.exports);
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/migrating"
var migrating_ = __webpack_require__(10);
var migrating_default = /*#__PURE__*/__webpack_require__.n(migrating_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/mixins/focus"
var focus_ = __webpack_require__(30);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//










/* harmony default export */ var autocompletevue_type_script_lang_js_ = ({
  name: 'ElAutocomplete',

  mixins: [emitter_default.a, focus_default()('input'), migrating_default.a],

  inheritAttrs: false,

  componentName: 'ElAutocomplete',

  components: {
    ElInput: input_default.a,
    ElAutocompleteSuggestions: autocomplete_suggestions
  },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    popperClass: String,
    popperOptions: Object,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
    label: String,
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    hideLoading: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      activated: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1,
      suggestionDisabled: false
    };
  },

  computed: {
    suggestionVisible: function suggestionVisible() {
      var suggestions = this.suggestions;
      var isValidData = Array.isArray(suggestions) && suggestions.length > 0;
      return (isValidData || this.loading) && this.activated;
    },
    id: function id() {
      return 'sp-autocomplete-' + Object(util_["generateId"])();
    }
  },
  watch: {
    suggestionVisible: function suggestionVisible(val) {
      var $input = this.getInput();
      if ($input) {
        this.broadcast('ElAutocompleteSuggestions', 'visible', [val, $input.offsetWidth]);
      }
    }
  },
  methods: {
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'custom-item': 'custom-item is removed, use scoped slot instead.',
          'props': 'props is removed, use value-key instead.'
        }
      };
    },
    getData: function getData(queryString) {
      var _this = this;

      if (this.suggestionDisabled) {
        return;
      }
      this.loading = true;
      this.fetchSuggestions(queryString, function (suggestions) {
        _this.loading = false;
        if (_this.suggestionDisabled) {
          return;
        }
        if (Array.isArray(suggestions)) {
          _this.suggestions = suggestions;
          _this.highlightedIndex = _this.highlightFirstItem ? 0 : -1;
        } else {
          console.error('[Element Error][Autocomplete]autocomplete suggestions must be an array');
        }
      });
    },
    handleInput: function handleInput(value) {
      this.$emit('input', value);
      this.suggestionDisabled = false;
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true;
        this.suggestions = [];
        return;
      }
      this.debouncedGetData(value);
    },
    handleChange: function handleChange(value) {
      this.$emit('change', value);
    },
    handleFocus: function handleFocus(event) {
      this.activated = true;
      this.$emit('focus', event);
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.value);
      }
    },
    handleBlur: function handleBlur(event) {
      this.$emit('blur', event);
    },
    handleClear: function handleClear() {
      this.activated = false;
      this.$emit('clear');
    },
    close: function close(e) {
      this.activated = false;
    },
    handleKeyEnter: function handleKeyEnter(e) {
      var _this2 = this;

      if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        e.preventDefault();
        this.select(this.suggestions[this.highlightedIndex]);
      } else if (this.selectWhenUnmatched) {
        this.$emit('select', { value: this.value });
        this.$nextTick(function (_) {
          _this2.suggestions = [];
          _this2.highlightedIndex = -1;
        });
      }
    },
    select: function select(item) {
      var _this3 = this;

      this.$emit('input', item[this.valueKey]);
      this.$emit('select', item);
      this.$nextTick(function (_) {
        _this3.suggestions = [];
        _this3.highlightedIndex = -1;
      });
    },
    highlight: function highlight(index) {
      if (!this.suggestionVisible || this.loading) {
        return;
      }
      if (index < 0) {
        this.highlightedIndex = -1;
        return;
      }
      if (index >= this.suggestions.length) {
        index = this.suggestions.length - 1;
      }
      var suggestion = this.$refs.suggestions.$el.querySelector('.sp-autocomplete-suggestion__wrap');
      var suggestionList = suggestion.querySelectorAll('.sp-autocomplete-suggestion__list li');

      var highlightItem = suggestionList[index];
      var scrollTop = suggestion.scrollTop;
      var offsetTop = highlightItem.offsetTop;

      if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += highlightItem.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight;
      }
      this.highlightedIndex = index;
      var $input = this.getInput();
      $input.setAttribute('aria-activedescendant', this.id + '-item-' + this.highlightedIndex);
    },
    getInput: function getInput() {
      return this.$refs.input.getInput();
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.debouncedGetData = debounce_default()(this.debounce, this.getData);
    this.$on('item-click', function (item) {
      _this4.select(item);
    });
    var $input = this.getInput();
    $input.setAttribute('role', 'textbox');
    $input.setAttribute('aria-autocomplete', 'list');
    $input.setAttribute('aria-controls', 'id');
    $input.setAttribute('aria-activedescendant', this.id + '-item-' + this.highlightedIndex);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.suggestions.$destroy();
  }
});
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_autocompletevue_type_script_lang_js_ = (autocompletevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue





/* normalize component */

var autocomplete_component = Object(componentNormalizer["a" /* default */])(
  src_autocompletevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var autocomplete = (autocomplete_component.exports);
// CONCATENATED MODULE: ./packages/autocomplete/index.js


/* istanbul ignore next */
autocomplete.install = function (Vue) {
  Vue.component(autocomplete.name, autocomplete);
};

/* harmony default export */ var packages_autocomplete = __webpack_exports__["default"] = (autocomplete);

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/popover/src/main.vue?vue&type=template&id=11fa9c4e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      _c(
        "transition",
        {
          attrs: { name: _vm.transition },
          on: {
            "after-enter": _vm.handleAfterEnter,
            "after-leave": _vm.handleAfterLeave
          }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.disabled && _vm.showPopper,
                  expression: "!disabled && showPopper"
                }
              ],
              ref: "popper",
              staticClass: "sp-popover sp-popper",
              class: [_vm.popperClass, _vm.content && "sp-popover--plain"],
              style: { width: _vm.width + "px" },
              attrs: {
                role: "tooltip",
                id: _vm.tooltipId,
                "aria-hidden":
                  _vm.disabled || !_vm.showPopper ? "true" : "false"
              }
            },
            [
              _vm.title
                ? _c("div", {
                    staticClass: "sp-popover__title",
                    domProps: { textContent: _vm._s(_vm.title) }
                  })
                : _vm._e(),
              _vm._t("default", [
                _c(
                  "div",
                  { staticClass: "sp-popover__content" },
                  [_vm._t("default", [_vm._v(_vm._s(_vm.content))])],
                  2
                )
              ])
            ],
            2
          )
        ]
      ),
      _c(
        "span",
        { ref: "wrapper", staticClass: "sp-popover__reference-wrapper" },
        [_vm._t("reference")],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/popover/src/main.vue?vue&type=template&id=11fa9c4e&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(8);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/popover/src/main.vue?vue&type=script&lang=js&
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






/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'ElPopover',

  mixins: [vue_popper_default.a],

  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: function validator(value) {
        return ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1;
      }
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    title: String,
    disabled: Boolean,
    content: String,
    reference: {},
    popperClass: String,
    width: {},
    visibleArrow: {
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  computed: {
    tooltipId: function tooltipId() {
      return 'sp-popover-' + Object(util_["generateId"])();
    }
  },
  watch: {
    showPopper: function showPopper(val) {
      if (this.disabled) {
        return;
      }
      val ? this.$emit('show') : this.$emit('hide');
    }
  },

  mounted: function mounted() {
    var _this = this;

    var reference = this.referenceElm = this.reference || this.$refs.reference;
    var popper = this.popper || this.$refs.popper;

    if (!reference && this.$refs.wrapper.children) {
      reference = this.referenceElm = this.$refs.wrapper.children[0];
    }
    // 可访问性
    if (reference) {
      Object(dom_["addClass"])(reference, 'sp-popover__reference');
      reference.setAttribute('aria-describedby', this.tooltipId);
      reference.setAttribute('tabindex', this.tabindex); // tab序列
      popper.setAttribute('tabindex', 0);

      if (this.trigger !== 'click') {
        Object(dom_["on"])(reference, 'focusin', function () {
          _this.handleFocus();
          var instance = reference.__vue__;
          if (instance && typeof instance.focus === 'function') {
            instance.focus();
          }
        });
        Object(dom_["on"])(popper, 'focusin', this.handleFocus);
        Object(dom_["on"])(reference, 'focusout', this.handleBlur);
        Object(dom_["on"])(popper, 'focusout', this.handleBlur);
      }
      Object(dom_["on"])(reference, 'keydown', this.handleKeydown);
      Object(dom_["on"])(reference, 'click', this.handleClick);
    }
    if (this.trigger === 'click') {
      Object(dom_["on"])(reference, 'click', this.doToggle);
      Object(dom_["on"])(document, 'click', this.handleDocumentClick);
    } else if (this.trigger === 'hover') {
      Object(dom_["on"])(reference, 'mouseenter', this.handleMouseEnter);
      Object(dom_["on"])(popper, 'mouseenter', this.handleMouseEnter);
      Object(dom_["on"])(reference, 'mouseleave', this.handleMouseLeave);
      Object(dom_["on"])(popper, 'mouseleave', this.handleMouseLeave);
    } else if (this.trigger === 'focus') {
      if (this.tabindex < 0) {
        console.warn('[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key');
      }
      if (reference.querySelector('input, textarea')) {
        Object(dom_["on"])(reference, 'focusin', this.doShow);
        Object(dom_["on"])(reference, 'focusout', this.doClose);
      } else {
        Object(dom_["on"])(reference, 'mousedown', this.doShow);
        Object(dom_["on"])(reference, 'mouseup', this.doClose);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.cleanup();
  },
  deactivated: function deactivated() {
    this.cleanup();
  },


  methods: {
    doToggle: function doToggle() {
      this.showPopper = !this.showPopper;
    },
    doShow: function doShow() {
      this.showPopper = true;
    },
    doClose: function doClose() {
      this.showPopper = false;
    },
    handleFocus: function handleFocus() {
      Object(dom_["addClass"])(this.referenceElm, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = true;
    },
    handleClick: function handleClick() {
      Object(dom_["removeClass"])(this.referenceElm, 'focusing');
    },
    handleBlur: function handleBlur() {
      Object(dom_["removeClass"])(this.referenceElm, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = false;
    },
    handleMouseEnter: function handleMouseEnter() {
      var _this2 = this;

      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(function () {
          _this2.showPopper = true;
        }, this.openDelay);
      } else {
        this.showPopper = true;
      }
    },
    handleKeydown: function handleKeydown(ev) {
      if (ev.keyCode === 27 && this.trigger !== 'manual') {
        // esc
        this.doClose();
      }
    },
    handleMouseLeave: function handleMouseLeave() {
      var _this3 = this;

      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(function () {
          _this3.showPopper = false;
        }, this.closeDelay);
      } else {
        this.showPopper = false;
      }
    },
    handleDocumentClick: function handleDocumentClick(e) {
      var reference = this.reference || this.$refs.reference;
      var popper = this.popper || this.$refs.popper;

      if (!reference && this.$refs.wrapper.children) {
        reference = this.referenceElm = this.$refs.wrapper.children[0];
      }
      if (!this.$el || !reference || this.$el.contains(e.target) || reference.contains(e.target) || !popper || popper.contains(e.target)) return;
      this.showPopper = false;
    },
    handleAfterEnter: function handleAfterEnter() {
      this.$emit('after-enter');
    },
    handleAfterLeave: function handleAfterLeave() {
      this.$emit('after-leave');
      this.doDestroy();
    },
    cleanup: function cleanup() {
      if (this.openDelay || this.closeDelay) {
        clearTimeout(this._timer);
      }
    }
  },

  destroyed: function destroyed() {
    var reference = this.reference;

    Object(dom_["off"])(reference, 'click', this.doToggle);
    Object(dom_["off"])(reference, 'mouseup', this.doClose);
    Object(dom_["off"])(reference, 'mousedown', this.doShow);
    Object(dom_["off"])(reference, 'focusin', this.doShow);
    Object(dom_["off"])(reference, 'focusout', this.doClose);
    Object(dom_["off"])(reference, 'mousedown', this.doShow);
    Object(dom_["off"])(reference, 'mouseup', this.doClose);
    Object(dom_["off"])(reference, 'mouseleave', this.handleMouseLeave);
    Object(dom_["off"])(reference, 'mouseenter', this.handleMouseEnter);
    Object(dom_["off"])(document, 'click', this.handleDocumentClick);
  }
});
// CONCATENATED MODULE: ./packages/popover/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/popover/src/main.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./packages/popover/src/directive.js
var getReference = function getReference(el, binding, vnode) {
  var _ref = binding.expression ? binding.value : binding.arg;
  var popper = vnode.context.$refs[_ref];
  if (popper) {
    if (Array.isArray(popper)) {
      popper[0].$refs.reference = el;
    } else {
      popper.$refs.reference = el;
    }
  }
};

/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode) {
    getReference(el, binding, vnode);
  },
  inserted: function inserted(el, binding, vnode) {
    getReference(el, binding, vnode);
  }
});
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(5);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./packages/popover/index.js




external_vue_default.a.directive('popover', directive);

/* istanbul ignore next */
main.install = function (Vue) {
  Vue.directive('popover', directive);
  Vue.component(main.name, main);
};
main.directive = directive;

/* harmony default export */ var popover = __webpack_exports__["default"] = (main);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/locale");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/vue-popper");

/***/ })

/******/ });