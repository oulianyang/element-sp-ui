<template>
  <div
    class="sp-select-tree"
    :class="[selectSize ? 'sp-select-tree--' + selectSize : '', {
      'sp-select-tree--borderless': !bordered
    }]"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div
      class="sp-select-tree__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
      @mouseenter="inputHovering = true"
      @mouseleave="inputHovering = false">
      <span v-if="collapseTags && checkedNodes.length">
        <el-tag
          v-for="item in collapseTagsShowList"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="sp-select-tree__tags-text">{{ getLabelValue(item) }}</span>
        </el-tag>
        <el-tag
          v-if="checkedNodes.length > collapseTagsShowLimit"
          :closable="false"
          :size="collapseTagSize"
          disable-transitions>
          <span class="sp-select-tree__tags-text">+ {{ checkedNodes.length - collapseTagsShowLimit }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag
          v-for="item in checkedNodes"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="sp-select-tree__tags-text">{{ getLabelValue(item) }}</span>
        </el-tag>
      </transition-group>

      <input
        type="text"
        class="sp-select-tree__input"
        :class="[selectSize ? `is-${ selectSize }` : '']"
        :disabled="selectDisabled"
        :autocomplete="autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
        ref="input">
    </div>
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="(multiple && filterable) ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="debouncedOnInputChange"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['sp-select-tree__caret', 'sp-select-tree__icon-one', 'sp-input__icon', 'sp-icon-' + iconClass]"></i>
        <i v-if="showClose" class="sp-select-tree__caret sp-input__icon sp-icon-close-circle" @click="handleClearClick"></i>
      </template>
    </el-input>
    <transition
      name="sp-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-tree-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="ul"
          wrap-class="sp-select-tree-dropdown__wrap"
          view-class="sp-select-tree-dropdown__list"
          ref="scrollbar"
          :style="{ maxWidth: inputWidth + 'px' }"
          :class="{ 'is-empty': query && hasFilterDataFlg === false }"
          v-show="treeData.length > 0 && !loading">
          <el-tree ref="treeRef" 
            :width="'auto'"
            :show-checkbox="multiple"
            :data="treeData"
            :node-key="nodeKey"
            :props="props"
            :default-checked-keys="checkedKeys"
            :expand-on-click-node="multiple"
            :check-strictly="checkStrictly"
            :check-on-click-node="false"
            :filter-node-method="treeFilterMethod"
            :disabled="selectDisabled"
            :renderContent="renderContent"
            @hook:mounted="handleTreeMounted"
            @check-change="treeCheckChange"
            @check="treeCheck"
            @current-change="treeNodeClick">
          </el-tree>
        </el-scrollbar>
        <template v-if="emptyText && ( loading || (hasFilterDataFlg === false ))">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="sp-select-tree-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-tree-menu>
    </transition>
  </div>
</template>

<script type="text/babel">
  import Emitter from '@fe/element-sp-ui/src/mixins/emitter';
  import Focus from '@fe/element-sp-ui/src/mixins/focus';
  import Locale from '@fe/element-sp-ui/src/mixins/locale';
  import ElInput from '@fe/element-sp-ui/packages/input';
  import ElSelectTreeMenu from './select-tree-dropdown.vue';
  import ElTag from '@fe/element-sp-ui/packages/tag';
  import ElScrollbar from '@fe/element-sp-ui/packages/scrollbar';
  import ElTree from '@fe/element-sp-ui/packages/tree';
  import debounce from 'throttle-debounce/debounce';
  import Clickoutside from '@fe/element-sp-ui/src/utils/clickoutside';
  import { addResizeListener, removeResizeListener } from '@fe/element-sp-ui/src/utils/resize-event';
  import scrollIntoView from '@fe/element-sp-ui/src/utils/scroll-into-view';
  import { getValueByPath, valueEquals, isIE, isEdge } from '@fe/element-sp-ui/src/utils/util';
  import TreeMixin from './tree-mixin';
  import { isKorean } from '@fe/element-sp-ui/src/utils/shared';
  import { defaultTreeConfig } from './select-tree-utils';

  export default {
    mixins: [Emitter, Locale, Focus('reference'), TreeMixin],

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

    provide() {
      return {
        'select': this
      };
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },

      readonly() {
        return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible);
      },

      showClose() {
        let hasValue = this.multiple
          ? Array.isArray(this.value) && this.value.length > 0
          : this.value !== undefined && this.value !== null && this.value !== '';
        let criteria = this.clearable &&
          !this.selectDisabled &&
          this.inputHovering &&
          hasValue;
        return criteria;
      },

      iconClass() {
        return this.remote && this.filterable ? '' : (this.visible ? 'up is-reverse' : 'up');
      },

      debounce() {
        return this.remote ? 300 : 0;
      },

      emptyText() {
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

      selectSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },

      selectDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },

      collapseTagSize() {
        return ['small', 'mini'].indexOf(this.selectSize) > -1
          ? 'mini'
          : 'small';
      },
      collapseTagsShowList() {
        return this.checkedNodes.slice(0, this.collapseTagsShowLimit);
      },
      propPlaceholder() {
        return typeof this.placeholder !== 'undefined' ? this.placeholder : this.t('el.selecttree.placeholder');
      }
    },

    components: {
      ElInput,
      ElSelectTreeMenu,
      ElTag,
      ElScrollbar,
      ElTree
    },

    directives: { Clickoutside },

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
        default() {
          return {...defaultTreeConfig.treeProps};
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
        default: () => []
      },
      renderContent: Function
    },

    data() {
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
      selectDisabled() {
        this.$nextTick(() => {
          this.resetInputHeight();
        });
      },

      propPlaceholder(val) {
        this.cachedPlaceHolder = this.currentPlaceholder = val;
      },

      value(val, oldVal) {
        this.syncSetCheckedKeys(val);
        this.setCheckedKeys(this.checkedKeysTemp, false);
        if (this.multiple) {
          this.resetInputHeight();
          if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
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
        if (!valueEquals(val, oldVal)) {
          this.dispatch('ElFormItem', 'el.form.change', val);
        }
      },

      visible(val) {
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
          this.$nextTick(() => {
            if (this.$refs.input &&
              this.$refs.input.value === '' &&
              this.checkedNodes.length === 0) {
              this.currentPlaceholder = this.cachedPlaceHolder;
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

      treeData() {
        if (this.$isServer) return;
        this.$nextTick(() => {
          this.broadcast('ElSelectTreeDropdown', 'updatePopper');
        });
        if (this.multiple) {
          this.resetInputHeight();
        }
        let inputs = this.$el.querySelectorAll('input');
        if ([].indexOf.call(inputs, document.activeElement) === -1) {
          // this.setSelected();
          this.getCheckNodes();
          this.setSelectLabel();
        }
      }
    },

    methods: {
      handleComposition(event) {
        const text = event.target.value;
        if (event.type === 'compositionend') {
          this.isOnComposition = false;
          this.$nextTick(_ => this.handleQueryChange(text));
        } else {
          const lastCharacter = text[text.length - 1] || '';
          this.isOnComposition = !isKorean(lastCharacter);
        }
      },
      handleQueryChange(val) {
        if (this.previousQuery === val || this.isOnComposition) return;
        if (
          this.previousQuery === null &&
          (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
        ) {
          this.previousQuery = val;
          return;
        }
        this.previousQuery = val;
        this.$nextTick(() => {
          if (this.visible) this.broadcast('ElSelectTreeDropdown', 'updatePopper');
        });
        if (this.multiple && this.filterable) {
          this.$nextTick(() => {
            const length = this.$refs.input.value.length * 15 + 20;
            this.inputLength = this.collapseTags ? Math.min(50, length) : length;
            this.managePlaceholder();
            this.resetInputHeight();
          });
        }
        if (this.remote && typeof this.remoteMethod === 'function') {
          this.remoteMethod(val);
        } else {
          this.$refs.treeRef.filter(val);
          this.hasFilterDataFlg = !this.$refs.treeRef.isEmpty;
        }
      },

      scrollToOption(option) {
        const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
        if (this.$refs.popper && target) {
          const menu = this.$refs.popper.$el.querySelector('.sp-select-tree-dropdown__wrap');
          scrollIntoView(menu, target);
        }
        this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
      },

      handleMenuEnter() {
        this.$nextTick(() => this.scrollToOption(this.checkedNodes));
      },

      emitChange(val) {
        if (!valueEquals(this.value, val)) {
          this.$emit('change', val);
        }
      },

      handleFocus(event) {
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

      blur() {
        this.visible = false;
        this.$refs.reference.blur();
      },

      handleBlur(event) {
        setTimeout(() => {
          if (this.isSilentBlur) {
            this.isSilentBlur = false;
          } else {
            this.$emit('blur', event);
          }
        }, 50);
        this.softFocus = false;
      },

      handleClearClick(event) {
        this.deleteSelected(event);
      },

      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },

      handleClose() {
        this.visible = false;
      },

      deletePrevTag(e) {
        if (e.target.value.length <= 0) {
          const value = this.value.slice();
          value.pop();
          this.$emit('input', value);
          this.emitChange(value);
        }
      },

      managePlaceholder() {
        if (this.currentPlaceholder !== '') {
          this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
        }
      },

      resetInputState(e) {
        this.inputLength = this.$refs.input.value.length * 15 + 20;
        this.resetInputHeight();
      },

      resetInputHeight() {
        if (this.collapseTags && !this.filterable) return;
        this.$nextTick(() => {
          if (!this.$refs.reference) return;
          let inputChildNodes = this.$refs.reference.$el.childNodes;
          let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
          const tags = this.$refs.tags;
          const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
          const sizeInMap = this.initialInputHeight || 40;
          input.style.height = this.checkedNodes.length === 0
            ? sizeInMap + 'px'
            : Math.max(
              tags ? (tagsHeight + (tagsHeight > sizeInMap ? 6 : 0)) : 0,
              sizeInMap
            ) + 'px';
          if (this.visible && this.emptyText !== false) {
            this.broadcast('ElSelectTreeDropdown', 'updatePopper');
          }
        });
      },

      setSoftFocus() {
        this.softFocus = true;
        const input = this.$refs.input || this.$refs.reference;
        if (input) {
          input.focus();
        }
      },

      toggleMenu() {
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

      deleteSelected(event) {
        event.stopPropagation();
        const value = this.multiple ? [] : '';
        this.$emit('input', value);
        this.emitChange(value);
        this.visible = false;
        this.$emit('clear');
      },

      deleteTag(event, tag) {
        let index = this.checkedNodes.indexOf(tag);
        if (index > -1 && !this.selectDisabled) {
          const value = this.value.slice();
          value.splice(index, 1);
          this.$emit('input', value);
          this.emitChange(value);
          this.$emit('remove-tag', tag.value);
        }
        event.stopPropagation();
      },

      onInputChange() {
        if (this.filterable && this.query !== this.selectedLabel) {
          this.query = this.selectedLabel;
          this.handleQueryChange(this.query);
        }
      },

      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },

      handleResize() {
        this.resetInputWidth();
        if (this.multiple) this.resetInputHeight();
      },

      getValueKey(item) {
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        } else if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
          return item[this.nodeKey];
        } else {
          return getValueByPath(item.value, this.nodeKey);
        }
      },
      getLabelValue(item) {
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        } else {
          return item[this.getDefaultTreeConfig(this.props)['label']];
        }
      }
    },

    created() {
      this.syncSetCheckedKeys(this.value);
      this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
      if (this.multiple && !Array.isArray(this.value)) {
        this.$emit('input', []);
      }
      if (!this.multiple && Array.isArray(this.value)) {
        this.$emit('input', '');
      }

      this.debouncedOnInputChange = debounce(this.debounce, () => {
        this.onInputChange();
      });

      this.debouncedQueryChange = debounce(this.debounce, (e) => {
        this.handleQueryChange(e.target.value);
      });
    },

    mounted() {
      if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
        this.currentPlaceholder = '';
      }
      addResizeListener(this.$el, this.handleResize);

      const reference = this.$refs.reference;
      if (reference && reference.$el) {
        const sizeMap = {
          medium: 36,
          small: 32,
          mini: 28
        };
        const input = reference.$el.querySelector('input');
        this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
      }
      if (this.remote && this.multiple) {
        this.resetInputHeight();
      }
      this.$nextTick(() => {
        if (reference && reference.$el) {
          this.inputWidth = reference.$el.getBoundingClientRect().width;
        }
      });
    },

    beforeDestroy() {
      if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
    }
  };
</script>
