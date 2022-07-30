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
/******/ 	return __webpack_require__(__webpack_require__.s = 94);
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

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/resize-event");

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/input");

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

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/util");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/focus");

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

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/mixins/locale");

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/tree");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@fe/element-sp-ui/lib/utils/vue-popper");

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree.vue?vue&type=template&id=745d3abf&
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
      staticClass: "sp-select-tree",
      class: [
        _vm.selectSize ? "sp-select-tree--" + _vm.selectSize : "",
        {
          "sp-select-tree--borderless": !_vm.bordered
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
              staticClass: "sp-select-tree__tags",
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
              _vm.collapseTags && _vm.checkedNodes.length
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
                              { staticClass: "sp-select-tree__tags-text" },
                              [_vm._v(_vm._s(_vm.getLabelValue(item)))]
                            )
                          ]
                        )
                      }),
                      _vm.checkedNodes.length > _vm.collapseTagsShowLimit
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
                                { staticClass: "sp-select-tree__tags-text" },
                                [
                                  _vm._v(
                                    "+ " +
                                      _vm._s(
                                        _vm.checkedNodes.length -
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
                    _vm._l(_vm.checkedNodes, function(item) {
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
                            { staticClass: "sp-select-tree__tags-text" },
                            [_vm._v(_vm._s(_vm.getLabelValue(item)))]
                          )
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
                    staticClass: "sp-select-tree__input",
                    class: [_vm.selectSize ? "is-" + _vm.selectSize : ""],
                    style: {
                      "flex-grow": "1",
                      width: _vm.inputLength / (_vm.inputWidth - 32) + "%",
                      "max-width": _vm.inputWidth - 42 + "px"
                    },
                    attrs: {
                      type: "text",
                      disabled: _vm.selectDisabled,
                      autocomplete: _vm.autocomplete
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
            autocomplete: _vm.autocomplete,
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
                "sp-select-tree__caret",
                "sp-select-tree__icon-one",
                "sp-input__icon",
                "sp-icon-" + _vm.iconClass
              ]
            }),
            _vm.showClose
              ? _c("i", {
                  staticClass:
                    "sp-select-tree__caret sp-input__icon sp-icon-close-circle",
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
            "el-select-tree-menu",
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
                      value: _vm.treeData.length > 0 && !_vm.loading,
                      expression: "treeData.length > 0 && !loading"
                    }
                  ],
                  ref: "scrollbar",
                  class: {
                    "is-empty": _vm.query && _vm.hasFilterDataFlg === false
                  },
                  style: { maxWidth: _vm.inputWidth + "px" },
                  attrs: {
                    tag: "ul",
                    "wrap-class": "sp-select-tree-dropdown__wrap",
                    "view-class": "sp-select-tree-dropdown__list"
                  }
                },
                [
                  _c("el-tree", {
                    ref: "treeRef",
                    attrs: {
                      width: "auto",
                      "show-checkbox": _vm.multiple,
                      data: _vm.treeData,
                      "node-key": _vm.nodeKey,
                      props: _vm.props,
                      "default-checked-keys": _vm.checkedKeys,
                      "expand-on-click-node": _vm.multiple,
                      "check-strictly": _vm.checkStrictly,
                      "check-on-click-node": false,
                      "filter-node-method": _vm.treeFilterMethod,
                      disabled: _vm.selectDisabled,
                      renderContent: _vm.renderContent
                    },
                    on: {
                      "hook:mounted": _vm.handleTreeMounted,
                      "check-change": _vm.treeCheckChange,
                      check: _vm.treeCheck,
                      "current-change": _vm.treeNodeClick
                    }
                  })
                ],
                1
              ),
              _vm.emptyText && (_vm.loading || _vm.hasFilterDataFlg === false)
                ? [
                    _vm.$slots.empty
                      ? _vm._t("empty")
                      : _c(
                          "p",
                          { staticClass: "sp-select-tree-dropdown__empty" },
                          [
                            _vm._v(
                              "\n          " +
                                _vm._s(_vm.emptyText) +
                                "\n        "
                            )
                          ]
                        )
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


// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue?vue&type=template&id=745d3abf&

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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree-dropdown.vue?vue&type=template&id=0fee9d38&
var select_tree_dropdownvue_type_template_id_0fee9d38_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "sp-select-tree-dropdown sp-popper",
      class: [{ "is-multiple": _vm.$parent.multiple }, _vm.popperClass],
      style: { minWidth: _vm.minWidth }
    },
    [_vm._t("default")],
    2
  )
}
var select_tree_dropdownvue_type_template_id_0fee9d38_staticRenderFns = []
select_tree_dropdownvue_type_template_id_0fee9d38_render._withStripped = true


// CONCATENATED MODULE: ./packages/select-tree/src/select-tree-dropdown.vue?vue&type=template&id=0fee9d38&

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(8);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree-dropdown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var select_tree_dropdownvue_type_script_lang_js_ = ({
  name: 'ElSelectTreeDropdown',

  componentName: 'ElSelectTreeDropdown',

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
// CONCATENATED MODULE: ./packages/select-tree/src/select-tree-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_tree_dropdownvue_type_script_lang_js_ = (select_tree_dropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/select-tree/src/select-tree-dropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_select_tree_dropdownvue_type_script_lang_js_,
  select_tree_dropdownvue_type_template_id_0fee9d38_render,
  select_tree_dropdownvue_type_template_id_0fee9d38_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var select_tree_dropdown = (component.exports);
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/tag"
var tag_ = __webpack_require__(37);
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/scrollbar"
var scrollbar_ = __webpack_require__(26);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/tree"
var tree_ = __webpack_require__(76);
var tree_default = /*#__PURE__*/__webpack_require__.n(tree_);

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

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(17);

// CONCATENATED MODULE: ./packages/select-tree/src/select-tree-utils.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// 组件默认配置
var defaultTreeConfig = {
  treeProps: {
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf',
    disabled: 'disabled'
  }
};

// 默认配置获取
var getDefaultTreeConfig = function getDefaultTreeConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends({}, defaultTreeConfig, config);
};

var getCheckNodesChildInfo = function getCheckNodesChildInfo(checkedKeys, data) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenKey: 'children',
    key: 'id'
  };
  var parentId = arguments[3];

  var nodes = [];
  var key = config.key,
      childrenKey = config.childrenKey;

  data.forEach(function (m) {
    var nodeKey = m[key];
    if (checkedKeys.includes(nodeKey)) {
      nodes.push(m);
    } else if (m[childrenKey]) {
      nodes = nodes.concat(getCheckNodesChildInfo(checkedKeys, m[childrenKey], config, nodeKey));
    }
  });
  return nodes;
};

// 获取子节点
var getChildNodeKeys = function getChildNodeKeys(node) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    childrenKey: 'children',
    key: 'id'
  };

  var nodesKey = [];
  var key = config.key,
      childrenKey = config.childrenKey;

  var children = node[childrenKey];
  if (children) {
    children.forEach(function (m) {
      nodesKey.push(m[key]);
      if (deep) {
        nodesKey.push.apply(nodesKey, getChildNodeKeys(m, deep, config));
      }
    });
  }
  return nodesKey;
};
// CONCATENATED MODULE: ./packages/select-tree/src/tree-mixin.js
// tree mixin



/* harmony default export */ var tree_mixin = ({
  data: function data() {
    return {
      checkedKeys: [], // 勾选的节点key
      checkedKeysTemp: [], // 勾选的节点
      _treeData: [], // 树数据
      checkedNodes: [] // 勾选的节点
    };
  },

  computed: {
    // 下拉树 父子关联关系
    checkStrictly: function checkStrictly() {
      if (!this.multiple) {
        return true;
      }
      if (this.checkStrategy === 'checkAll') {
        return false;
      } else {
        return true;
      }
    },

    // 是否监听下拉树选择事件
    isListenSelectTreeChecked: function isListenSelectTreeChecked() {
      if (this.multiple && ['checkChildren', 'auto'].indexOf(this.checkStrategy) >= 0) {
        return false;
      } else {
        return true;
      }
    },

    // 标识手动选中子节点
    checkedExcludeChildFlg: function checkedExcludeChildFlg() {
      var multiple = this.multiple,
          checkStrategy = this.checkStrategy;

      var strategy = {
        checkAll: true,
        checkStrictly: false,
        checkChildren: true,
        auto: {
          0: false,
          1: true
        }
      };

      if (checkStrategy === 'auto') {
        return strategy.auto[multiple ? 1 : 0];
      } else {
        return strategy[checkStrategy];
      }
    }
  },
  watch: {
    treeData: {
      handler: function handler(value, old) {
        if (Object(external_lodash_["isEqual"])(value, old)) {
          return;
        }
        this._treeData = Object(external_lodash_["cloneDeep"])(value);
      },

      immediate: true
    }
  },
  created: function created() {
    // 节流更新选中项改变
    this.updateCheckedKeysDebounce = Object(external_lodash_["debounce"])(this.updateCheckedKeys, 300);
  },

  methods: {
    // 单选， 多选 数组，字符串 检查 重置 value
    checkResetValue: function checkResetValue(value) {
      if (this.multiple && !Array.isArray(value)) {
        value = [];
      } else if (!this.multiple && Array.isArray(value)) {
        value = '';
      }
      return value;
    },

    // 勾选节点
    treeCheckChange: function treeCheckChange() {
      if (this.isListenSelectTreeChecked) {
        this.listenCheckChange.apply(this, arguments);
      }
    },

    // 更新选中的节点
    listenCheckChange: function listenCheckChange(data, nodeFlg) {
      // if (!this.multiple) { return; }
      if (nodeFlg) {
        this.addCheckedKeys(data);
      } else {
        this.removeCheckedKeys(data);
      }
      this.updateCheckedKeysDebounce();
    },

    // 过滤并添加勾选的节点
    addCheckedKeys: function addCheckedKeys(data) {
      var checkedKeys = this.checkedKeysTemp;
      var nodeKey = data[this.nodeKey];
      var flg = checkedKeys.find(function (item) {
        return item === data[nodeKey];
      });
      if (flg === -1) {
        checkedKeys.push(nodeKey);
      }
    },

    // 删除选中的节点
    removeCheckedKeys: function removeCheckedKeys(data) {
      var checkedKeys = this.checkedKeysTemp;
      var nodeKey = data[this.nodeKey];
      var index = checkedKeys.findIndex(function (item) {
        return item === nodeKey;
      });
      if (~index) {
        checkedKeys.splice(index, 1);
      }
    },
    updateCheckedKeys: function updateCheckedKeys() {
      var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.getCheckNodes();
      this.setSelectLabel();
      if (trigger) {
        this.emitInputChange(this.checkedKeysTemp);
      }
    },
    emitInputChange: function emitInputChange(checkeds) {
      checkeds = [].concat(checkeds);
      if (!this.multiple) {
        checkeds = checkeds[0];
        this.visible = false;
      }
      this.$emit('input', checkeds);
      this.$emit('change', checkeds);
    },

    // 获取勾选的节点
    getCheckNodes: function getCheckNodes() {
      if (!this.treeData || this.treeData.length === 0) {
        this.checkedNodes = [].concat(this.checkedKeysTemp);
        return;
      }
      if (this.checkStrictly) {
        this.checkedNodes = this.$refs.treeRef.getCheckedNodes();
      } else {
        this.checkedNodes = getCheckNodesChildInfo(this.checkedKeysTemp, this.treeData);
      }
    },

    // 父节点选中排除子节点
    setSelectLabel: function setSelectLabel() {
      var _this = this;

      if (this.multiple) {
        return;
      }
      this.selectedLabel = this.checkedNodes.map(function (item) {
        if (typeof item === 'string') {
          return item;
        } else {
          return item[getDefaultTreeConfig(_this.props).label];
        }
      }).join(',');
    },
    syncSetCheckedKeys: function syncSetCheckedKeys(value) {
      // 验证初始 单选，多选值
      value = this.checkResetValue(value);
      if (value === undefined) {
        this.checkedKeys = [];
      } else if (typeof value === 'string' || typeof value === 'number') {
        this.checkedKeys = value === '' ? [] : [value];
      } else {
        this.checkedKeys = Object(external_lodash_["cloneDeep"])(value);
      }
      this.checkedKeysTemp = Object(external_lodash_["cloneDeep"])(this.checkedKeys);
    },

    // 设置选中项
    setCheckedKeys: function setCheckedKeys(keys) {
      var _this2 = this;

      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.checkedKeysTemp = keys;
      this.$refs.treeRef.setCheckedKeys(keys);
      this.$nextTick(function () {
        _this2.updateCheckedKeys(trigger);
      });
    },

    // 树组件挂载后初始化选中项
    handleTreeMounted: function handleTreeMounted() {
      this.getCheckNodes();
      this.setSelectLabel();
    },

    // 获取 是否 子级需要选中节点
    getCheckedFeatures: function getCheckedFeatures(node) {
      var checkedExcludeChildFlg = this.checkedExcludeChildFlg;

      var keysFeatures = [];
      if (checkedExcludeChildFlg) {
        return keysFeatures.concat(getChildNodeKeys(node, true));
      } else {
        return keysFeatures;
      }
    },

    // 节点click
    treeNodeClick: function treeNodeClick(data) {
      if (this.multiple) {
        return;
      }
      this.setCheckedKeys([data[this.nodeKey]]);
    },

    // 下拉树 复选框选中事件
    treeCheck: function treeCheck(node, data) {
      if (!this.multiple) {
        return;
      }
      var checkedKeys = data.checkedKeys;

      var nodeKey = node[this.nodeKey];
      if (checkedKeys.indexOf(nodeKey) >= 0) {
        checkedKeys = Object(external_lodash_["uniq"])([].concat(checkedKeys, this.getCheckedFeatures(node)));
      }
      this.setCheckedKeys(checkedKeys);
    },

    // 过滤树
    treeFilterMethod: function treeFilterMethod(value, data) {
      if (!value) {
        return true;
      }
      if (this.filterMethod) {
        return this.filterMethod(value, data);
      } else {
        var label = data[getDefaultTreeConfig(this.props).label];
        if (label && label.indexOf(value) > -1) {
          return true;
        } else {
          return false;
        }
      }
    },

    getDefaultTreeConfig: getDefaultTreeConfig
  }
});
// EXTERNAL MODULE: external "@fe/element-sp-ui/lib/utils/shared"
var shared_ = __webpack_require__(21);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select-tree/src/select-tree.vue?vue&type=script&lang=js&
var select_treevue_type_script_lang_js_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


















/* harmony default export */ var select_treevue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, locale_default.a, focus_default()('reference'), tree_mixin],

  name: 'ElSelectTree',

  componentName: 'ElSelectTree',

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
        return this.loadingText || this.t('el.selecttree.loading');
      } else {
        if (this.remote && this.query === '' && this.treeData.length === 0) return false;
        if (this.filterable && this.query && this.treeData.length > 0 && this.hasFilterDataFlg === false) {
          return this.noMatchText || this.t('el.selecttree.noMatch');
        }
        if (this.treeData.length === 0) {
          return this.noDataText || this.t('el.selecttree.noData');
        }
      }
      return null;
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
      return this.checkedNodes.slice(0, this.collapseTagsShowLimit);
    },
    propPlaceholder: function propPlaceholder() {
      return typeof this.placeholder !== 'undefined' ? this.placeholder : this.t('el.selecttree.placeholder');
    }
  },

  components: {
    ElInput: input_default.a,
    ElSelectTreeMenu: select_tree_dropdown,
    ElTag: tag_default.a,
    ElScrollbar: scrollbar_default.a,
    ElTree: tree_default.a
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
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    placeholder: {
      type: String,
      required: false
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
    nodeKey: {
      type: String,
      default: 'id'
    },
    props: {
      type: Object,
      default: function _default() {
        return select_treevue_type_script_lang_js_extends({}, defaultTreeConfig.treeProps);
      }
    },
    /**
     * @description
     * {string} auto 单选时同 checkStrictly， 多选同 checkChildren
     * {string} checkStrictly 父子节点不关联
     * {stirng} checkChildren 多选时生效 子节点全选中不关联父节点，父节点选中关联子节点
     * {string} checkAll 多选时生效 全选时关联父子节点
     */
    checkStrategy: {
      type: String,
      default: 'auto'
    },
    treeData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    renderContent: Function
  },

  data: function data() {
    return {
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      hasFilterDataFlg: false,
      visible: false,
      softFocus: false,
      selectedLabel: '',
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
      var _this = this;

      this.$nextTick(function () {
        _this.resetInputHeight();
      });
    },
    propPlaceholder: function propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value: function value(val, oldVal) {
      this.syncSetCheckedKeys(val);
      this.setCheckedKeys(this.checkedKeysTemp, false);
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!Object(util_["valueEquals"])(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    visible: function visible(val) {
      var _this2 = this;

      if (!val) {
        this.broadcast('ElSelectTreeDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.$nextTick(function () {
          if (_this2.$refs.input && _this2.$refs.input.value === '' && _this2.checkedNodes.length === 0) {
            _this2.currentPlaceholder = _this2.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.checkedNodes) {
            this.setSelectLabel();
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast('ElSelectTreeDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.$refs.treeRef.filter('');
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
    treeData: function treeData() {
      var _this3 = this;

      if (this.$isServer) return;
      this.$nextTick(function () {
        _this3.broadcast('ElSelectTreeDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        // this.setSelected();
        this.getCheckNodes();
        this.setSelectLabel();
      }
    }
  },

  methods: {
    handleComposition: function handleComposition(event) {
      var _this4 = this;

      var text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick(function (_) {
          return _this4.handleQueryChange(text);
        });
      } else {
        var lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !Object(shared_["isKorean"])(lastCharacter);
      }
    },
    handleQueryChange: function handleQueryChange(val) {
      var _this5 = this;

      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(function () {
        if (_this5.visible) _this5.broadcast('ElSelectTreeDropdown', 'updatePopper');
      });
      if (this.multiple && this.filterable) {
        this.$nextTick(function () {
          var length = _this5.$refs.input.value.length * 15 + 20;
          _this5.inputLength = _this5.collapseTags ? Math.min(50, length) : length;
          _this5.managePlaceholder();
          _this5.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.remoteMethod(val);
      } else {
        this.$refs.treeRef.filter(val);
        this.hasFilterDataFlg = !this.$refs.treeRef.isEmpty;
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.popper.$el.querySelector('.sp-select-tree-dropdown__wrap');
        scroll_into_view_default()(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this6 = this;

      this.$nextTick(function () {
        return _this6.scrollToOption(_this6.checkedNodes);
      });
    },
    emitChange: function emitChange(val) {
      if (!Object(util_["valueEquals"])(this.value, val)) {
        this.$emit('change', val);
      }
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
      var _this7 = this;

      setTimeout(function () {
        if (_this7.isSilentBlur) {
          _this7.isSilentBlur = false;
        } else {
          _this7.$emit('blur', event);
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
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0) {
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
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight: function resetInputHeight() {
      var _this8 = this;

      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(function () {
        if (!_this8.$refs.reference) return;
        var inputChildNodes = _this8.$refs.reference.$el.childNodes;
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        var tags = _this8.$refs.tags;
        var tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        var sizeInMap = _this8.initialInputHeight || 40;
        input.style.height = _this8.checkedNodes.length === 0 ? sizeInMap + 'px' : Math.max(tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0, sizeInMap) + 'px';
        if (_this8.visible && _this8.emptyText !== false) {
          _this8.broadcast('ElSelectTreeDropdown', 'updatePopper');
        }
      });
    },
    setSoftFocus: function setSoftFocus() {
      this.softFocus = true;
      var input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
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
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      var value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.checkedNodes.indexOf(tag);
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
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize: function handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    getValueKey: function getValueKey(item) {
      if (typeof item === 'string' || typeof item === 'number') {
        return item;
      } else if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item[this.nodeKey];
      } else {
        return Object(util_["getValueByPath"])(item.value, this.nodeKey);
      }
    },
    getLabelValue: function getLabelValue(item) {
      if (typeof item === 'string' || typeof item === 'number') {
        return item;
      } else {
        return item[this.getDefaultTreeConfig(this.props)['label']];
      }
    }
  },

  created: function created() {
    var _this9 = this;

    this.syncSetCheckedKeys(this.value);
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce_default()(this.debounce, function () {
      _this9.onInputChange();
    });

    this.debouncedQueryChange = debounce_default()(this.debounce, function (e) {
      _this9.handleQueryChange(e.target.value);
    });
  },
  mounted: function mounted() {
    var _this10 = this;

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
        _this10.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.handleResize) Object(resize_event_["removeResizeListener"])(this.$el, this.handleResize);
  }
});
// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_treevue_type_script_lang_js_ = (select_treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select-tree/src/select-tree.vue





/* normalize component */

var select_tree_component = Object(componentNormalizer["a" /* default */])(
  src_select_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var select_tree = (select_tree_component.exports);
// CONCATENATED MODULE: ./packages/select-tree/index.js


/* istanbul ignore next */
select_tree.install = function (Vue) {
  Vue.component(select_tree.name, select_tree);
};

/* harmony default export */ var packages_select_tree = __webpack_exports__["default"] = (select_tree);

/***/ })

/******/ });