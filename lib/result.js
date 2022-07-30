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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
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

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/index.vue?vue&type=template&id=10d2e2cc&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sp-result" }, [
    _c(
      "div",
      { staticClass: "sp-result__icon" },
      [
        _vm._t("icon", [
          _c("i", {
            class: _vm.iconElement.i + " sp-result--icon " + _vm.iconElement.c
          })
        ])
      ],
      2
    ),
    _vm.title || _vm.$slots.title
      ? _c(
          "div",
          { staticClass: "sp-result__title" },
          [_vm._t("title", [_c("p", [_vm._v(_vm._s(_vm.title))])])],
          2
        )
      : _vm._e(),
    _vm.subTitle || _vm.$slots.subTitle
      ? _c(
          "div",
          { staticClass: "sp-result__subtitle" },
          [_vm._t("subTitle", [_c("p", [_vm._v(_vm._s(_vm.subTitle))])])],
          2
        )
      : _vm._e(),
    _vm.$slots.extra
      ? _c("div", { staticClass: "sp-result__extra" }, [_vm._t("extra")], 2)
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/result/src/index.vue?vue&type=template&id=10d2e2cc&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-success.vue?vue&type=template&id=bbd41f44&
var icon_successvue_type_template_id_bbd41f44_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-icon", {
    staticClass: "sp-result--icon",
    attrs: { name: "check-circle-fill" }
  })
}
var icon_successvue_type_template_id_bbd41f44_staticRenderFns = []
icon_successvue_type_template_id_bbd41f44_render._withStripped = true


// CONCATENATED MODULE: ./packages/result/src/icon-success.vue?vue&type=template&id=bbd41f44&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-success.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var icon_successvue_type_script_lang_js_ = ({
  name: 'IconSuccess'
});
// CONCATENATED MODULE: ./packages/result/src/icon-success.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_icon_successvue_type_script_lang_js_ = (icon_successvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/result/src/icon-success.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_icon_successvue_type_script_lang_js_,
  icon_successvue_type_template_id_bbd41f44_render,
  icon_successvue_type_template_id_bbd41f44_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon_success = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-error.vue?vue&type=template&id=168fb664&
var icon_errorvue_type_template_id_168fb664_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-icon", {
    staticClass: "sp-result--icon",
    attrs: { name: "close-circle-fill" }
  })
}
var icon_errorvue_type_template_id_168fb664_staticRenderFns = []
icon_errorvue_type_template_id_168fb664_render._withStripped = true


// CONCATENATED MODULE: ./packages/result/src/icon-error.vue?vue&type=template&id=168fb664&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-error.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var icon_errorvue_type_script_lang_js_ = ({
  name: 'IconError'
});
// CONCATENATED MODULE: ./packages/result/src/icon-error.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_icon_errorvue_type_script_lang_js_ = (icon_errorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/result/src/icon-error.vue





/* normalize component */

var icon_error_component = Object(componentNormalizer["a" /* default */])(
  src_icon_errorvue_type_script_lang_js_,
  icon_errorvue_type_template_id_168fb664_render,
  icon_errorvue_type_template_id_168fb664_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon_error = (icon_error_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-warning.vue?vue&type=template&id=44fef4b0&
var icon_warningvue_type_template_id_44fef4b0_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-icon", {
    staticClass: "sp-result--icon",
    attrs: { name: "warning-circle-fill" }
  })
}
var icon_warningvue_type_template_id_44fef4b0_staticRenderFns = []
icon_warningvue_type_template_id_44fef4b0_render._withStripped = true


// CONCATENATED MODULE: ./packages/result/src/icon-warning.vue?vue&type=template&id=44fef4b0&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-warning.vue?vue&type=script&lang=ts&





/* harmony default export */ var icon_warningvue_type_script_lang_ts_ = ({
  name: 'IconWarning'
});

// CONCATENATED MODULE: ./packages/result/src/icon-warning.vue?vue&type=script&lang=ts&
 /* harmony default export */ var src_icon_warningvue_type_script_lang_ts_ = (icon_warningvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./packages/result/src/icon-warning.vue





/* normalize component */

var icon_warning_component = Object(componentNormalizer["a" /* default */])(
  src_icon_warningvue_type_script_lang_ts_,
  icon_warningvue_type_template_id_44fef4b0_render,
  icon_warningvue_type_template_id_44fef4b0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon_warning = (icon_warning_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-info.vue?vue&type=template&id=e57bdb94&
var icon_infovue_type_template_id_e57bdb94_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-icon", {
    staticClass: "sp-result--icon",
    attrs: { name: "info-circle-fill" }
  })
}
var icon_infovue_type_template_id_e57bdb94_staticRenderFns = []
icon_infovue_type_template_id_e57bdb94_render._withStripped = true


// CONCATENATED MODULE: ./packages/result/src/icon-info.vue?vue&type=template&id=e57bdb94&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/icon-info.vue?vue&type=script&lang=ts&





/* harmony default export */ var icon_infovue_type_script_lang_ts_ = ({
  name: 'IconInfo'
});

// CONCATENATED MODULE: ./packages/result/src/icon-info.vue?vue&type=script&lang=ts&
 /* harmony default export */ var src_icon_infovue_type_script_lang_ts_ = (icon_infovue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./packages/result/src/icon-info.vue





/* normalize component */

var icon_info_component = Object(componentNormalizer["a" /* default */])(
  src_icon_infovue_type_script_lang_ts_,
  icon_infovue_type_template_id_e57bdb94_render,
  icon_infovue_type_template_id_e57bdb94_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon_info = (icon_info_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/result/src/index.vue?vue&type=script&lang=js&
var _components;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var IconMap = {
  success: {
    i: 'sp-icon-check-circle-fill',
    c: 'sp-icon-success'
  },
  warning: {
    i: 'sp-icon-exclamation-circle-fill',
    c: 'sp-icon-warning'
  },
  error: {
    i: 'sp-icon-close-circle-fill',
    c: 'sp-icon-error'
  },
  info: {
    i: 'sp-icon-info-circle-fill',
    c: 'sp-icon-info'
  }
};

/* harmony default export */ var srcvue_type_script_lang_js_ = ({
  name: 'ElResult',
  components: (_components = {}, _components[icon_success.name] = icon_success, _components[icon_error.name] = icon_error, _components[icon_warning.name] = icon_warning, _components[icon_info.name] = icon_info, _components),
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    iconElement: function iconElement() {
      var icon = this.icon;

      var iconItem = IconMap[icon || 'info'];
      if (!iconItem) {
        iconItem = IconMap['info'];
      }
      return iconItem;
    }
  }
});
// CONCATENATED MODULE: ./packages/result/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var result_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/result/src/index.vue





/* normalize component */

var src_component = Object(componentNormalizer["a" /* default */])(
  result_srcvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src = (src_component.exports);
// CONCATENATED MODULE: ./packages/result/index.js


/* istanbul ignore next */
src.install = function (Vue) {
  Vue.component(src.name, src);
};

/* harmony default export */ var result = __webpack_exports__["default"] = (src);

/***/ })

/******/ });