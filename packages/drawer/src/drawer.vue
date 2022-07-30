<template>
  <transition
    name="sp-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      class="sp-drawer__wrapper"
      tabindex="-1"
      v-show="visible">
      <div
        class="sp-drawer__container"
        :class="visible && 'sp-drawer__open'"
        @click.self="handleWrapperClick"
        role="document"
        tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="sp-drawer__title"
          :aria-label="title"
          class="sp-drawer"
          :class="[direction, customClass]"
          :style="isHorizontal ? `width: ${drawerSize}` : `height: ${drawerSize}`"
          ref="drawer"
          role="dialog"
          tabindex="-1"
          >
          <header class="sp-drawer__header" id="sp-drawer__title" v-if="withHeader">
            <span class="sp-close-title">
           
              <slot name="title">
                <span class="sp-title" role="heading" :title="title">{{ title }}</span>
              </slot> 
               
            </span>    
            <span class="sp-handle-weapper" v-if="handleButtons && handleButtons.length > 0">
                <el-button style="margin-left: 8px" v-for="(item, i) in handleButtons" :key="i" :type="i === handleButtons.length-1 ? 'primary' : ''" @click="handleBtn(item)" >{{item}}</el-button>
            </span>
              <button
                :aria-label="`close ${title || 'drawer'}`"
                class="sp-drawer__close-btn"
                type="button"
                v-if="showClose"
                @click="closeDrawer">
                <i class="sp-dialog__close sp-icon sp-icon-close"></i>
              </button> 
          </header>
          <section class="sp-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
          <div class="sp-drawer__footer" v-if="withFooter">
            <slot name="footer">
              <el-button @click="$emit('cancel')">{{ cancelText }}</el-button>
              <el-button type="primary" @click="$emit('confirm')">{{ confirmText }}</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '@fe/element-sp-ui/src/utils/popup';
import emitter from '@fe/element-sp-ui/src/mixins/emitter';

export default {
  name: 'ElDrawer',
  mixins: [Popup, emitter],
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    handleButtons: {
      type: Array,
      default: null
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    withFooter: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    isHorizontal() {
      return this.direction === 'rtl' || this.direction === 'ltr';
    },
    drawerSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size;
    }
  },
  data() {
    return {
      closed: false,
      prevActiveElement: null,
      rendered: true
    };
  },
  watch: {
    visible(val) {
      // 再次打开关闭抽屉时候 关闭遮罩
      if (!this.mask) {
        this.open({modal: false});
      };
      if (val) {
        this.closed = false;
        this.$emit('open');
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
      } else {
        if (!this.closed) {
          this.$emit('close');
          if (this.destroyOnClose === true) {
            this.rendered = false;
          }
        }
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        });
      }
    }
  },
  methods: {
    handleBtn(item) {
      this.$emit('handleBtn', item);
    },
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        if (this.destroyOnClose === true) {
          this.rendered = false;
        }
        this.closed = true;
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    handleClose() {
      // This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
      // pressing `ESC` will call this method, and also close the drawer.
      // This method also calls `beforeClose` if there was one.
      this.closeDrawer();
    }
  },
  mounted() {
    // 首次打开抽屉 关闭遮罩
    if (!this.mask) {
      this.open({modal: false});
    };
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
