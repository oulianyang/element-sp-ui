<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="sp-dialog__wrapper"
      :class="[centered ? 'sp-dialog__wrapper--centered' : '']"
      @click.self="handleWrapperClick">
      <div
        v-dragDom="dragMove"
        element-drag-mouse-target="sp-dialog__header"
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['sp-dialog', { 'is-fullscreen': fullscreen, 'sp-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="sp-dialog__header">
          <slot name="title">
            <span class="sp-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="sp-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="sp-dialog__close sp-icon sp-icon-close"></i>
          </button>
        </div>
        <div class="sp-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="sp-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from '@fe/element-sp-ui/src/utils/popup';
  import Migrating from '@fe/element-sp-ui/src/mixins/migrating';
  import emitter from '@fe/element-sp-ui/src/mixins/emitter';
  import dragDom from '@fe/element-sp-ui/src/directives/drag-dom';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter, Migrating],

    directives: {
      dragDom
    },

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: false
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean,
      centered: { // 居中弹窗
        type: Boolean,
        default: false
      },
      dragMove: { // 薯片 拖拽移动
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        closed: false,
        key: 0
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          if (!this.centered) {
            style.marginTop = this.top;
          }
          if (this.width) {
            style.width = this.width;
          }
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      }
    },

    mounted() {
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
